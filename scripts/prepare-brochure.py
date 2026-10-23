"""Extract the supplied brochure's artwork and fonts without changing its content.

Usage: python scripts/prepare-brochure.py /path/to/web-brochure.pdf
Requires pypdf, Pillow with AVIF/WebP support, and pdftoppm.
"""

from pathlib import Path
import subprocess
import sys
import tempfile

from PIL import Image
from pypdf import PdfReader, PdfWriter
from pypdf.generic import ContentStream


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "brochure"
OUTPUT.mkdir(parents=True, exist_ok=True)
(OUTPUT / "fonts").mkdir(exist_ok=True)

reader = PdfReader(sys.argv[1])
if len(reader.pages) != 1:
    raise ValueError("This implementation expects the supplied one-page brochure.")

page = reader.pages[0]
for source_image in page.images:
    if source_image.name == "X32.png":
        # Keep every pixel of the original QR code, including its portrait.
        source_image.image.save(OUTPUT / "qr.png", optimize=True)
        source_image.image.save(OUTPUT / "qr.webp", lossless=True, method=6)


def extract_resources(obj):
    resources = obj.get("/Resources", {}).get_object()
    for font_reference in resources.get("/Font", {}).values():
        font = font_reference.get_object()
        name = str(font["/BaseFont"]).split("+")[-1].lower()
        descriptor = font["/DescendantFonts"][0].get_object()["/FontDescriptor"]
        (OUTPUT / "fonts" / f"{name}.ttf").write_bytes(
            descriptor["/FontFile2"].get_data()
        )
    for key, reference in resources.get("/XObject", {}).items():
        child = reference.get_object()
        if child.get("/Subtype") == "/Form":
            extract_resources(child)
            content = ContentStream(child, reader)
            filtered = []
            in_text = False
            for operands, operator in content.operations:
                if operator == b"BT":
                    in_text = True
                if not in_text and not (
                    operator == b"Do" and operands[0] == "/X32"
                ):
                    filtered.append((operands, operator))
                if operator == b"ET":
                    in_text = False
            content.operations = filtered
            child.set_data(content.get_data())


extract_resources(page)
writer = PdfWriter()
writer.add_page(page)

with tempfile.TemporaryDirectory(prefix="brochure-") as temporary:
    directory = Path(temporary)
    artwork_pdf = directory / "artwork.pdf"
    with artwork_pdf.open("wb") as output:
        writer.write(output)
    subprocess.run(
        ["pdftoppm", "-scale-to-x", "1680", "-scale-to-y", "-1", "-singlefile",
         "-png", str(artwork_pdf), str(directory / "artwork")],
        check=True,
    )
    artwork = Image.open(directory / "artwork.png").convert("RGB")
    # Replace the starter favicon with the portrait already in the brochure.
    artwork.crop((620, 430, 1000, 810)).resize(
        (64, 64), Image.Resampling.LANCZOS
    ).convert("RGBA").save(
        ROOT / "src" / "app" / "favicon.ico", sizes=[(16, 16), (32, 32), (64, 64)]
    )
    for width in (480, 840, 1260, 1680):
        height = round(artwork.height * width / artwork.width)
        responsive = artwork.resize((width, height), Image.Resampling.LANCZOS)
        responsive.save(OUTPUT / f"artwork-{width}.avif", quality=68, speed=6)
        responsive.save(OUTPUT / f"artwork-{width}.webp", quality=85, method=6)

    # Social previews retain the complete, unmodified brochure.
    subprocess.run(
        ["pdftoppm", "-scale-to-x", "840", "-scale-to-y", "-1", "-singlefile",
         "-png", sys.argv[1], str(directory / "brochure")],
        check=True,
    )
    Image.open(directory / "brochure.png").convert("RGB").save(
        OUTPUT / "brochure.jpg", quality=88, optimize=True
    )

print("Extracted original fonts, QR code, artwork, and social preview.")
