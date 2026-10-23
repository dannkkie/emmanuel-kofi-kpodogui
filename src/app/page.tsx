import BrochurePages from "./brochure-pages";

/* The artwork contains the portrait and original gold signature only.
 * All brochure copy is rendered as real, selectable text below. */
const artworkWidths = [480, 840, 1260, 1680];

function artworkSources(format: "avif" | "webp") {
  return artworkWidths
    .map((width) => `/brochure/artwork-${width}.${format} ${width}w`)
    .join(", ");
}

export default function Home() {
  return (
    <main aria-labelledby="memorial-name">
      <section className="brochure cover" data-source-page="1" aria-labelledby="memorial-name">
      <div className="composition">
        <picture className="artwork">
          <source type="image/avif" srcSet={artworkSources("avif")} sizes="(max-width: 840px) 100vw, 840px" />
          <source type="image/webp" srcSet={artworkSources("webp")} sizes="(max-width: 840px) 100vw, 840px" />
          {/* Pre-encoded assets avoid a cold image-optimization request. */}
          <img src="/brochure/artwork-840.webp" width="840" height="1202" alt="" fetchPriority="high" decoding="async" />
        </picture>

        <p className="dedication">FOREVER IN OUR HEARTS</p>
        <p className="rank">Ex-WO1</p>
        <p className="remembrance">IN<br />LOVING<br />MEMORY</p>
        <h1 id="memorial-name" className="name">
          <span className="sr-only">Emmanuel Kofi </span>KPODOGUI
        </h1>
        <p className="alias">A. K. A “Ago Die”</p>
        <p className="years">1954 - 2026</p>

        {/* Preserve every QR pixel; lossy compression can damage the code. */}
        <picture className="qr-code">
          <source type="image/webp" srcSet="/brochure/qr.webp" />
          <img src="/brochure/qr.png" width="237" height="237" alt="Graphical QR code" decoding="async" />
        </picture>
      </div>

      <footer className="service">
        <p className="service-date">
          <time dateTime="2026-10-24">Saturday 24<sup>th</sup> October, 2026</time>
        </p>
        <p className="service-venue">Garrison Methodist and Presbyterian Church, Burma Camp</p>
      </footer>
      </section>
      <div className="brochure-book">
        <BrochurePages />
      </div>
    </main>
  );
}
