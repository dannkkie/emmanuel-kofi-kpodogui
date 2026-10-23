# Emmanuel Kofi Kpodogui

A mobile-first web version of the complete 24-page memorial brochure supplied as
`web-complete.pdf`. The cover, service order, biography, tributes, six galleries,
hymns, appreciation, and original printed page numbers appear in source order.
There is no added editorial copy.

## Getting started

```bash
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). Scroll through the complete brochure.
Sections also have stable fragments, including `#order-of-service`, `#biography`,
`#tribute-wife`, `#tribute-children`, `#gallery`, `#hymns`, and `#appreciation`.

## Implementation

- `src/app/page.tsx`: the cover and complete brochure assembly.
- `src/app/brochure-pages.tsx`: semantic, server-rendered interior pages.
- `src/app/brochure-data.json`: exact extracted text and source page mapping.
- `src/app/globals.css`: responsive layouts and the original visual styling.
- `src/app/brochure-fonts.css`: original embedded font subsets, with disjoint
  Unicode ranges to avoid downloading duplicate character coverage.
- `src/app/layout.tsx`: metadata, original cover social preview, and font preloads.
- `public/brochure/`: optimized original artwork, photographs, QR code, and fonts.

Interior text is at least 17px on phones. Printed columns become a single reading
column. The photo montages retain their original ordering and crops. Typography,
floral decoration, and source page numbers are retained.

The route is prerendered. There are no application client components, PDF viewer
libraries, third-party requests, or external font requests. Native image lazy
loading and CSS content visibility defer interior images and rendering. AVIF has
WebP fallbacks; the QR code is encoded losslessly. The full 7.7 MB source PDF is
not required or downloaded by the site. Text remains readable without JavaScript.

## Validation and production

```bash
npm run lint
npm run build
npm start
```

Set `NEXT_PUBLIC_SITE_URL` to the deployed origin to override the existing Vercel
URL used by social metadata.

## Source extraction

The source PDFs are supplied separately. To reproduce the checked-in assets, use
Python with `pypdf`, `pdfplumber`, and `Pillow` (AVIF/WebP support), plus Poppler's
`pdftoppm` on your PATH:

```bash
python scripts/prepare-complete-brochure.py /path/to/web-complete.pdf
```

The script verifies all visible interior-page characters against the extracted
content. It preserves punctuation, source repetitions, names, dates, and hymn
lyrics. It removes only invisible white placeholder letters and coincident
printing overprints, as checked against rendered pages. Results and the source
SHA-256 are saved to `public/brochure/complete/source-audit.json`.

The cover extractor remains available separately:

```bash
python scripts/prepare-brochure.py /path/to/web-brochure.pdf
```

Font subsets contain only the supplied brochure's characters. For content
changes, regenerate from an updated source PDF or provide complete fonts. The
extraction scripts never modify the source PDFs.
