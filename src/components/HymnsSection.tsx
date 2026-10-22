"use client";

import { useState } from "react";
import { Music, Copy, Check, Type } from "lucide-react";
import { FUNERAL_DATA } from "@/data/funeralData";

export function HymnsSection() {
  const [selectedHymnNumber, setSelectedHymnNumber] = useState<string>(
    FUNERAL_DATA.hymns[0].number
  );
  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg">("base");
  const [copied, setCopied] = useState(false);

  const currentHymn =
    FUNERAL_DATA.hymns.find((h) => h.number === selectedHymnNumber) ||
    FUNERAL_DATA.hymns[0];

  const copyLyrics = () => {
    const text = `${currentHymn.number} - ${currentHymn.title}\n\n` +
      currentHymn.verses
        .map((verse, vIdx) => `[Verse ${vIdx + 1}]\n` + verse.join("\n"))
        .join("\n\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case "sm":
        return "text-xs sm:text-sm";
      case "lg":
        return "text-base sm:text-lg";
      default:
        return "text-sm sm:text-base";
    }
  };

  return (
    <section id="hymns" className="py-16 sm:py-24 px-4 bg-black border-t border-zinc-900">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-xs uppercase tracking-[0.25em] text-amber-400 font-medium">
            Songs of Hope & Eternal Life
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-zinc-100 font-bold mt-2">
            Funeral Hymns & Anthems
          </h2>
          <div className="w-16 h-0.5 bg-amber-500/60 mx-auto mt-3 rounded-full" />
          <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto mt-3">
            Hymns from the Methodist Hymn Book (MHB) sung during the Pre-Burial, Burial, and Graveside services.
          </p>
        </div>

        {/* Hymn Selection Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {FUNERAL_DATA.hymns.map((hymn) => {
            const isActive = selectedHymnNumber === hymn.number;
            return (
              <button
                key={hymn.number}
                onClick={() => setSelectedHymnNumber(hymn.number)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap border transition-all flex items-center gap-2 ${
                  isActive
                    ? "bg-amber-500/20 text-amber-200 border-amber-500/50 shadow-md scale-[1.02]"
                    : "bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 border-zinc-800"
                }`}
              >
                <Music className={`w-3.5 h-3.5 ${isActive ? "text-amber-400" : "text-zinc-500"}`} />
                <span>{hymn.number}</span>
              </button>
            );
          })}
        </div>

        {/* Hymn Container Card */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-10 shadow-2xl relative">
          {/* Header with Title and Font Size Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 mb-6 border-b border-zinc-800/80 gap-3">
            <div>
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
                {currentHymn.number}
              </span>
              <h3 className="text-lg sm:text-2xl font-serif font-semibold text-zinc-100 mt-2">
                {currentHymn.title}
              </h3>
            </div>

            {/* Utility Controls (Font Size & Copy) */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <div className="flex items-center bg-zinc-900 rounded-lg border border-zinc-800 p-0.5 text-xs text-zinc-400">
                <span className="px-2 flex items-center gap-1 text-[11px] text-zinc-500">
                  <Type className="w-3 h-3" />
                </span>
                <button
                  onClick={() => setFontSize("sm")}
                  className={`px-2 py-1 rounded ${fontSize === "sm" ? "bg-zinc-800 text-amber-300 font-bold" : "hover:text-zinc-200"}`}
                >
                  A-
                </button>
                <button
                  onClick={() => setFontSize("base")}
                  className={`px-2 py-1 rounded ${fontSize === "base" ? "bg-zinc-800 text-amber-300 font-bold" : "hover:text-zinc-200"}`}
                >
                  A
                </button>
                <button
                  onClick={() => setFontSize("lg")}
                  className={`px-2 py-1 rounded ${fontSize === "lg" ? "bg-zinc-800 text-amber-300 font-bold" : "hover:text-zinc-200"}`}
                >
                  A+
                </button>
              </div>

              <button
                onClick={copyLyrics}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 hover:text-amber-300 hover:bg-zinc-850 transition-colors"
                title="Copy Hymn Lyrics"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-400" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Verses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {currentHymn.verses.map((verse, vIdx) => (
              <div
                key={vIdx}
                className="relative pl-5 border-l-2 border-amber-500/30 group hover:border-amber-400 transition-colors"
              >
                <span className="text-xs font-mono font-semibold text-amber-400/80 mb-2 block">
                  Verse {vIdx + 1}
                </span>
                <div className={`space-y-1 font-serif text-zinc-200 leading-relaxed ${getFontSizeClass()}`}>
                  {verse.map((line, lIdx) => (
                    <p key={lIdx}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
