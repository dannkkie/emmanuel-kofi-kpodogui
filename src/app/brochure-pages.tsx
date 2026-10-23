import type { ReactNode } from "react";
import brochureData from "./brochure-data.json";

type Block = {
  kind: string;
  text?: string;
  title?: string;
  items?: string[];
  verses?: string[];
  name?: string;
  side?: string;
  width?: number;
  height?: number;
  dropcap?: boolean;
  clear?: boolean;
  italic?: boolean;
  bold?: boolean;
  emphasis?: string[];
};

type BrochurePage = {
  number: number;
  label?: string;
  id: string;
  kind: string;
  title?: string;
  subtitle?: string;
  quote?: string;
  blocks: Block[];
  columns?: Block[][];
};

const pages: BrochurePage[] = brochureData;
const widths = [480, 840, 1260];

function sources(name: string, format: string) {
  return widths.map((width) => `/brochure/complete/${name}-${width}.${format} ${width}w`).join(", ");
}

function OriginalImage({ block, gallery = false }: { block: Block; gallery?: boolean }) {
  const name = block.name!;
  const sizes = gallery || block.side === "full"
    ? "(max-width: 840px) 100vw, 840px"
    : "(max-width: 599px) 85vw, 360px";

  return (
    <picture className={`source-photo source-photo--${block.side || "full"}`}>
      <source type="image/avif" srcSet={sources(name, "avif")} sizes={sizes} />
      <source type="image/webp" srcSet={sources(name, "webp")} sizes={sizes} />
      <img
        src={`/brochure/complete/${name}-840.webp`}
        width={block.width}
        height={block.height}
        alt=""
        loading="lazy"
        decoding="async"
      />
    </picture>
  );
}

function Emphasis({ text, phrases }: { text: string; phrases?: string[] }) {
  let pieces: ReactNode[] = [text];
  for (const phrase of phrases || []) {
    if (!phrase) continue;
    pieces = pieces.flatMap((piece, index) => {
      if (typeof piece !== "string" || !piece.includes(phrase)) return [piece];
      return piece.split(phrase).flatMap((part, partIndex) =>
        partIndex === 0 ? [part] : [<strong key={`${phrase}-${index}-${partIndex}`}>{phrase}</strong>, part]
      );
    });
  }
  return pieces;
}

function ContentBlock({ block, gallery }: { block: Block; gallery?: boolean }) {
  switch (block.kind) {
    case "image":
      return <OriginalImage block={block} gallery={gallery} />;
    case "heading":
      return <h3 className="service-heading">{block.text}</h3>;
    case "lines":
      return <div className="service-lines">{block.items?.map((item, i) => <p key={i}>{item}</p>)}</div>;
    case "list":
      return <ul className="source-list">{block.items?.map((item, i) => <li key={i}>{item}</li>)}</ul>;
    case "hymn":
      return (
        <section className="hymn" aria-label={block.title}>
          <h3>{block.title}</h3>
          {block.verses?.map((verse, i) => <p className="hymn-verse" key={i}>{verse}</p>)}
        </section>
      );
    default:
      return (
        <p className={[
          "source-paragraph", block.dropcap && "dropcap", block.clear && "clear",
          block.italic && "source-italic", block.bold && "source-bold",
        ].filter(Boolean).join(" ")}>
          <Emphasis text={block.text || ""} phrases={block.emphasis} />
        </p>
      );
  }
}

export default function BrochurePages() {
  return pages.map((page) => (
    <section
      key={page.number}
      id={page.id}
      className={`brochure-sheet brochure-sheet--${page.kind}`}
      data-source-page={page.number}
      aria-labelledby={page.title ? `heading-${page.number}` : undefined}
      aria-label={page.title ? undefined : `Page ${page.label}`}
    >
      {page.kind === "appreciation" && (
        <picture className="appreciation-art">
          <source type="image/avif" srcSet={sources("appreciation", "avif")} sizes="(max-width: 840px) 100vw, 840px" />
          <source type="image/webp" srcSet={sources("appreciation", "webp")} sizes="(max-width: 840px) 100vw, 840px" />
          <img src="/brochure/complete/appreciation-840.webp" width="840" height="1202" alt="" loading="lazy" decoding="async" />
        </picture>
      )}
      <div className="sheet-content">
        {page.title && (
          <header className="sheet-header">
            <h2 id={`heading-${page.number}`} className={page.title.length > 30 ? "long-heading" : undefined}>{page.title}</h2>
            {page.subtitle && <p className={page.kind === "gallery" ? "gallery-caption" : "sheet-subtitle"}>{page.subtitle}</p>}
            {page.quote && <blockquote>{page.quote}</blockquote>}
          </header>
        )}
        <div className="sheet-body">
          {page.blocks.map((block, i) => <ContentBlock key={i} block={block} gallery={page.kind === "gallery"} />)}
          {page.columns && (
            <div className="source-columns">
              {page.columns.map((column, i) => (
                <div className="source-column" key={i}>
                  {column.map((block, j) => <ContentBlock key={j} block={block} />)}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {page.label && <footer className="source-page-number">{page.label}</footer>}
    </section>
  ));
}
