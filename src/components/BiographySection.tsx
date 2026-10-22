"use client";

import { Award, Compass, Shield, Heart } from "lucide-react";
import { FUNERAL_DATA } from "@/data/funeralData";

export function BiographySection() {
  const chapterIcons = [Compass, Shield, Heart, Award];

  return (
    <section id="biography" className="py-16 sm:py-24 px-4 bg-black border-t border-zinc-900 relative">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-amber-400 font-medium">
            His Life & Times (1954 – 2026)
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-zinc-100 font-bold mt-2">
            The Biography of Ex-WO1 Emmanuel Kofi Kpodogui
          </h2>
          <div className="w-16 h-0.5 bg-amber-500/60 mx-auto mt-3 rounded-full" />
          <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto mt-3">
            A patriot, disciplined soldier, beloved patriarch, and faithful servant of God affectionately known as <span className="text-amber-300 font-semibold">“AGO DIE”</span>.
          </p>
        </div>

        {/* Highlight Stats / Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12">
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-center">
            <p className="text-2xl sm:text-3xl font-serif font-bold text-amber-300">72</p>
            <p className="text-xs text-zinc-400 mt-1 uppercase tracking-wider">Years of Grace</p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-center">
            <p className="text-2xl sm:text-3xl font-serif font-bold text-amber-300">WO1</p>
            <p className="text-xs text-zinc-400 mt-1 uppercase tracking-wider">Warrant Officer 1</p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-center">
            <p className="text-2xl sm:text-3xl font-serif font-bold text-amber-300">GAF</p>
            <p className="text-xs text-zinc-400 mt-1 uppercase tracking-wider">Ghana Armed Forces</p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-center">
            <p className="text-xl sm:text-2xl font-serif font-bold text-amber-300 truncate">“AGO DIE”</p>
            <p className="text-xs text-zinc-400 mt-1 uppercase tracking-wider">Enduring Moniker</p>
          </div>
        </div>

        {/* Chapters */}
        <div className="space-y-8">
          {FUNERAL_DATA.biographyChapters.map((chapter, index) => {
            const Icon = chapterIcons[index % chapterIcons.length];
            return (
              <div
                key={index}
                className="relative rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-amber-500/30 p-6 sm:p-8 transition-all shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2.5 sm:p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0 mt-1">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                      <h3 className="text-lg sm:text-xl font-serif font-semibold text-zinc-100">
                        {chapter.title}
                      </h3>
                      <span className="text-[11px] font-mono text-amber-400/90 uppercase tracking-wider">
                        Chapter 0{index + 1}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-amber-300/80 mb-4">
                      {chapter.subtitle}
                    </p>
                    <div className="space-y-3 text-zinc-300 text-sm leading-relaxed">
                      {chapter.content.map((paragraph, pIdx) => (
                        <p key={pIdx}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Memorial Quote Card */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-amber-500/10 via-zinc-900/60 to-amber-500/10 border border-amber-500/30 text-center">
          <p className="text-lg sm:text-xl font-serif italic text-amber-200">
            “I have fought the good fight, I have finished the race, I have kept the faith. Now there is in store for me the crown of righteousness.”
          </p>
          <p className="text-xs uppercase tracking-widest text-zinc-400 mt-3 font-semibold">
            — 2 Timothy 4:7–8
          </p>
        </div>
      </div>
    </section>
  );
}
