"use client";

import React, { useState } from "react";
import { Music, ChevronDown, ChevronUp, UserCheck, Clock, BookOpen, MapPin } from "lucide-react";
import { MEMORIAL_DATA } from "@/data/brochureData";

export const OrderOfServiceSection: React.FC = () => {
  const [expandedHymn, setExpandedHymn] = useState<string | null>(null);

  const toggleHymn = (code: string) => {
    setExpandedHymn((prev) => (prev === code ? null : code));
  };

  const getHymnByCode = (code?: string) => {
    if (!code) return null;
    return MEMORIAL_DATA.hymns.find(
      (h) => h.code.toLowerCase().replace(/\s+/g, "") === code.toLowerCase().replace(/\s+/g, "")
    );
  };

  return (
    <div className="w-full max-w-[430px] mx-auto px-4 py-6 space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="text-center space-y-1">
        <span className="text-[10px] uppercase font-cinzel tracking-[0.3em] text-[#877971]">
          Liturgical Programme
        </span>
        <h2 className="text-2xl font-cinzel font-bold text-[#DEC596] tracking-wide">
          Order of Service
        </h2>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#DEC596]/60 to-transparent mx-auto mt-2" />
      </div>

      {/* Officiating Clergy Box */}
      <div className="rounded-2xl bg-[#0c0c0c] border border-[#DEC596]/20 p-5 shadow-lg space-y-3">
        <div className="flex items-center gap-2 text-[#DEC596] border-b border-[#DEC596]/15 pb-2">
          <UserCheck className="w-4 h-4 text-[#B48836]" />
          <h3 className="text-xs uppercase font-cinzel font-bold tracking-wider">
            Officiating Clergy
          </h3>
        </div>
        <ul className="space-y-2 text-xs">
          {MEMORIAL_DATA.officiatingClergy.map((clergy, i) => (
            <li key={i} className="flex flex-col sm:flex-row sm:items-center justify-between text-[#d1d1d1]">
              <span className="font-caladea text-sm text-[#ededed]">{clergy.name}</span>
              {clergy.role && (
                <span className="text-[11px] text-[#877971] italic">{clergy.role}</span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Pre-Burial Service */}
      <div className="rounded-2xl bg-[#0c0c0c] border border-[#DEC596]/20 p-5 shadow-lg space-y-2">
        <div className="flex items-center justify-between border-b border-[#DEC596]/15 pb-2">
          <div className="flex items-center gap-2 text-[#DEC596]">
            <Clock className="w-4 h-4 text-[#B48836]" />
            <h3 className="text-xs uppercase font-cinzel font-bold tracking-wider">
              Pre-Burial Service
            </h3>
          </div>
          <span className="font-mono text-xs text-[#B48836] bg-[#B48836]/10 px-2 py-0.5 rounded">
            {MEMORIAL_DATA.preBurialService.time}
          </span>
        </div>
        <p className="text-xs text-[#cccccc] font-caladea pt-1">
          {MEMORIAL_DATA.preBurialService.activity}
        </p>
      </div>

      {/* Burial Service Timeline */}
      <div className="rounded-2xl bg-[#0c0c0c] border border-[#DEC596]/20 p-5 shadow-lg space-y-4">
        <div className="flex items-center justify-between border-b border-[#DEC596]/15 pb-2">
          <div className="flex items-center gap-2 text-[#DEC596]">
            <BookOpen className="w-4 h-4 text-[#B48836]" />
            <h3 className="text-xs uppercase font-cinzel font-bold tracking-wider">
              Burial Service
            </h3>
          </div>
          <span className="text-[10px] text-[#877971] uppercase tracking-wider font-mono">
            Main Chapel
          </span>
        </div>

        <ol className="relative border-l border-[#DEC596]/20 ml-2.5 space-y-4">
          {MEMORIAL_DATA.burialServiceOrder.map((item) => {
            const hymn = item.hymnRef ? getHymnByCode(item.hymnRef) : null;
            const isExpanded = hymn && expandedHymn === hymn.code;

            return (
              <li key={item.id} className="ml-4 space-y-1.5">
                <div className="absolute -left-1.5 mt-1.5 w-3 h-3 rounded-full border border-[#DEC596] bg-[#050505]" />
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-mono text-[#B48836] mr-2">
                      {item.number}.
                    </span>
                    <span className="text-sm font-caladea text-[#ededed] font-medium">
                      {item.title}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#877971] shrink-0 font-caladea italic">
                    {item.actor}
                  </span>
                </div>

                {/* Inline Hymn Sing-Along Drawer */}
                {hymn && (
                  <div className="pt-1">
                    <button
                      onClick={() => toggleHymn(hymn.code)}
                      className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-[#191919] hover:bg-[#222222] border border-[#DEC596]/25 text-[11px] text-[#DEC596] transition-colors"
                    >
                      <Music className="w-3 h-3 text-[#B48836]" />
                      <span>{isExpanded ? "Hide Hymn Lyrics" : `Sing Along: ${hymn.code}`}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-3 h-3 ml-0.5 text-[#877971]" />
                      ) : (
                        <ChevronDown className="w-3 h-3 ml-0.5 text-[#877971]" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="mt-2.5 p-3.5 rounded-xl bg-[#141414] border border-[#DEC596]/20 text-xs space-y-3 animate-in fade-in duration-200">
                        <div className="flex justify-between items-center text-[#DEC596] font-cinzel text-xs border-b border-white/5 pb-1">
                          <span className="font-bold">{hymn.code}: {hymn.title}</span>
                          <span className="text-[10px] text-[#877971] uppercase">{hymn.language}</span>
                        </div>
                        {hymn.stanzas.slice(0, 3).map((stanza, idx) => (
                          <p
                            key={idx}
                            className="whitespace-pre-line text-[#cccccc] font-caladea leading-relaxed text-[13px]"
                          >
                            {stanza}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </div>

      {/* Service at Graveside */}
      <div className="rounded-2xl bg-[#0c0c0c] border border-[#DEC596]/20 p-5 shadow-lg space-y-4">
        <div className="flex items-center justify-between border-b border-[#DEC596]/15 pb-2">
          <div className="flex items-center gap-2 text-[#DEC596]">
            <MapPin className="w-4 h-4 text-[#B48836]" />
            <h3 className="text-xs uppercase font-cinzel font-bold tracking-wider">
              Service at Graveside
            </h3>
          </div>
          <span className="text-[10px] text-[#877971] uppercase tracking-wider font-mono">
            Military Cemetery
          </span>
        </div>

        <ol className="relative border-l border-[#DEC596]/20 ml-2.5 space-y-4">
          {MEMORIAL_DATA.gravesideServiceOrder.map((item) => {
            const hymn = item.hymnRef ? getHymnByCode(item.hymnRef) : null;
            const isExpanded = hymn && expandedHymn === hymn.code;

            return (
              <li key={item.id} className="ml-4 space-y-1.5">
                <div className="absolute -left-1.5 mt-1.5 w-3 h-3 rounded-full border border-[#B48836] bg-[#050505]" />
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-mono text-[#B48836] mr-2">
                      {item.number}.
                    </span>
                    <span className="text-sm font-caladea text-[#ededed] font-medium">
                      {item.title}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#877971] shrink-0 font-caladea italic">
                    {item.actor}
                  </span>
                </div>

                {hymn && (
                  <div className="pt-1">
                    <button
                      onClick={() => toggleHymn(hymn.code)}
                      className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-[#191919] hover:bg-[#222222] border border-[#DEC596]/25 text-[11px] text-[#DEC596] transition-colors"
                    >
                      <Music className="w-3 h-3 text-[#B48836]" />
                      <span>{isExpanded ? "Hide Hymn Lyrics" : `Sing Along: ${hymn.code}`}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-3 h-3 ml-0.5 text-[#877971]" />
                      ) : (
                        <ChevronDown className="w-3 h-3 ml-0.5 text-[#877971]" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="mt-2.5 p-3.5 rounded-xl bg-[#141414] border border-[#DEC596]/20 text-xs space-y-3 animate-in fade-in duration-200">
                        <div className="flex justify-between items-center text-[#DEC596] font-cinzel text-xs border-b border-white/5 pb-1">
                          <span className="font-bold">{hymn.code}: {hymn.title}</span>
                          <span className="text-[10px] text-[#877971] uppercase">{hymn.language}</span>
                        </div>
                        {hymn.stanzas.slice(0, 3).map((stanza, idx) => (
                          <p
                            key={idx}
                            className="whitespace-pre-line text-[#cccccc] font-caladea leading-relaxed text-[13px]"
                          >
                            {stanza}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};
