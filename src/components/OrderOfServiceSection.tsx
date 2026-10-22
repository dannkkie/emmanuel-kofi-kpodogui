"use client";

import { useState } from "react";
import { Clock, BookOpen, Music, Shield, Church, Sparkles, ChevronRight } from "lucide-react";
import { FUNERAL_DATA } from "@/data/funeralData";

export function OrderOfServiceSection() {
  const [activeTab, setActiveTab] = useState(FUNERAL_DATA.programmeParts[1].id); // Default to Part II: Burial Service

  const currentPart =
    FUNERAL_DATA.programmeParts.find((p) => p.id === activeTab) ||
    FUNERAL_DATA.programmeParts[1];

  const scrollToHymn = (hymnNumber?: string) => {
    if (!hymnNumber) return;
    const el = document.getElementById("hymns");
    if (el) {
      const yOffset = -60;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const getTabIcon = (id: string) => {
    switch (id) {
      case "part-1":
        return Clock;
      case "part-2":
        return Church;
      case "part-3":
        return Shield;
      case "part-4":
        return Sparkles;
      default:
        return BookOpen;
    }
  };

  return (
    <section id="programme" className="py-16 sm:py-20 px-4 bg-zinc-950 border-t border-zinc-900">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-amber-400 font-medium">
            Order of Solemnity
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-zinc-100 font-bold mt-2">
            Order of Service
          </h2>
          <div className="w-16 h-0.5 bg-amber-500/60 mx-auto mt-3 rounded-full" />
          <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto mt-3">
            Garrison Methodist and Presbyterian Church, Burma Camp &bull; Saturday 24th October, 2026
          </p>
        </div>

        {/* Programme Part Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
          {FUNERAL_DATA.programmeParts.map((part) => {
            const Icon = getTabIcon(part.id);
            const isActive = activeTab === part.id;
            return (
              <button
                key={part.id}
                onClick={() => setActiveTab(part.id)}
                className={`flex items-center gap-2 p-3 rounded-xl border text-left transition-all ${
                  isActive
                    ? "bg-amber-500/15 border-amber-500/50 text-amber-200 shadow-md scale-[1.02]"
                    : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-amber-400" : "text-zinc-500"}`} />
                <div className="truncate">
                  <p className="text-xs font-semibold truncate">{part.name}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Current Part Content Card */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-sm p-4 sm:p-8 shadow-xl">
          <div className="border-b border-zinc-800/80 pb-4 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <h3 className="text-lg sm:text-xl font-serif font-semibold text-amber-200">
                {currentPart.name}
              </h3>
              <span className="text-xs text-amber-400/90 font-medium bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20 w-fit">
                {currentPart.subtitle}
              </span>
            </div>
          </div>

          {/* Timeline Items */}
          <div className="space-y-4">
            {currentPart.items.map((item, idx) => (
              <div
                key={idx}
                className="group relative pl-6 sm:pl-8 border-l-2 border-zinc-800 hover:border-amber-500/60 transition-colors py-1.5"
              >
                {/* Timeline Dot */}
                <div className="absolute -left-[9px] top-3 w-4 h-4 rounded-full bg-zinc-950 border-2 border-zinc-700 group-hover:border-amber-400 transition-colors flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 group-hover:bg-amber-400 transition-colors" />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-zinc-500 font-mono">
                      {String(idx + 1).padStart(2, "0")}.
                    </span>
                    <h4 className="text-sm sm:text-base font-medium text-zinc-200 group-hover:text-amber-200 transition-colors">
                      {item.title}
                    </h4>

                    {item.hymnNumber && (
                      <button
                        onClick={() => scrollToHymn(item.hymnNumber)}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 px-2 py-0.5 rounded-full border border-amber-500/30 transition-colors cursor-pointer"
                        title="View hymn lyrics"
                      >
                        <Music className="w-3 h-3 text-amber-400" />
                        <span>{item.hymnNumber}</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  {item.leader && (
                    <span className="text-xs text-zinc-400 font-medium sm:text-right shrink-0">
                      {item.leader}
                    </span>
                  )}
                </div>

                {item.description && (
                  <p className="text-xs text-zinc-400 mt-1 pl-6 sm:pl-6 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
