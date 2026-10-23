"use client";

import React, { useState } from "react";
import { Search, Heart } from "lucide-react";
import { MEMORIAL_DATA } from "@/data/brochureData";

export const HymnsSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedHymnId, setSelectedHymnId] = useState<string>("mhb-99");

  const filteredHymns = MEMORIAL_DATA.hymns.filter(
    (h) =>
      h.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentHymn =
    MEMORIAL_DATA.hymns.find((h) => h.id === selectedHymnId) || MEMORIAL_DATA.hymns[0];

  return (
    <div className="w-full max-w-[430px] mx-auto px-4 py-6 space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="text-center space-y-1">
        <span className="text-[10px] uppercase font-cinzel tracking-[0.3em] text-[#877971]">
          Sacred Songs & Praises
        </span>
        <h2 className="text-2xl font-cinzel font-bold text-[#DEC596] tracking-wide">
          Hymns & Lyrics
        </h2>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#DEC596]/60 to-transparent mx-auto mt-2" />
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#877971] absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search by MHB / PHB number or title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#141414] border border-[#DEC596]/20 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#DEC596]"
        />
      </div>

      {/* Hymn Selector Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {filteredHymns.map((hymn) => (
          <button
            key={hymn.id}
            onClick={() => setSelectedHymnId(hymn.id)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-cinzel transition-all ${
              selectedHymnId === hymn.id
                ? "bg-[#B48836] text-[#050505] font-bold shadow-md"
                : "bg-[#141414] text-[#877971] hover:text-[#DEC596] border border-white/5"
            }`}
          >
            {hymn.code}
          </button>
        ))}
      </div>

      {/* Current Hymn Lyrics Card */}
      {currentHymn && (
        <div className="rounded-2xl bg-[#0c0c0c] border border-[#DEC596]/30 p-6 shadow-2xl space-y-4">
          <div className="flex items-start justify-between border-b border-[#DEC596]/20 pb-3">
            <div>
              <span className="text-xs font-mono font-bold text-[#B48836]">
                {currentHymn.code}
              </span>
              <h3 className="text-base font-cinzel font-bold text-[#DEC596] mt-0.5">
                {currentHymn.title}
              </h3>
            </div>
            <span className="text-[10px] font-cinzel uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 text-[#877971]">
              {currentHymn.language}
            </span>
          </div>

          <div className="space-y-4 pt-1">
            {currentHymn.stanzas.map((stanza, idx) => (
              <div key={idx} className="space-y-1">
                <p className="whitespace-pre-line text-[14px] font-caladea text-[#dedede] leading-relaxed">
                  {stanza}
                </p>
                {currentHymn.refrain && (
                  <p className="whitespace-pre-line text-[13px] font-caladea italic text-[#DEC596]/90 pl-3 border-l-2 border-[#B48836]/40 mt-2">
                    {currentHymn.refrain}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Appreciation Banner */}
      <div className="rounded-2xl bg-[#0c0c0c] border border-[#DEC596]/20 p-5 text-center space-y-2 mt-8">
        <Heart className="w-5 h-5 text-[#B48836] mx-auto" />
        <h4 className="text-sm font-cinzel font-bold text-[#DEC596]">
          {MEMORIAL_DATA.appreciation.title}
        </h4>
        <p className="text-xs text-[#877971] font-caladea">
          {MEMORIAL_DATA.appreciation.subtitle}
        </p>
        <p className="text-xs text-[#cccccc] font-caladea leading-relaxed px-2">
          {MEMORIAL_DATA.appreciation.message}
        </p>
        <p className="text-xs font-cinzel font-semibold text-gold-shimmer pt-1">
          {MEMORIAL_DATA.appreciation.blessing}
        </p>
      </div>
    </div>
  );
};
