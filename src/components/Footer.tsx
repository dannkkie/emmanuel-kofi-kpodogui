"use client";

import { Award, ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="pb-24 md:pb-12 pt-16 px-4 bg-black border-t border-zinc-900 text-center">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Emblem / Star */}
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-px bg-amber-500/30" />
          <Award className="w-6 h-6 text-amber-400" />
          <div className="w-12 h-px bg-amber-500/30" />
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-amber-300 font-semibold">
            In Loving Memory
          </p>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-zinc-100 mt-1">
            Ex-WO1 Emmanuel Kofi Kpodogui
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            A. K. A “AGO DIE” &bull; 1954 – 2026
          </p>
        </div>

        {/* Family Gratitude */}
        <div className="max-w-xl mx-auto p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80 text-xs text-zinc-300 leading-relaxed">
          <p className="font-semibold text-amber-200 mb-1">
            Acknowledgement & Appreciation
          </p>
          <p>
            The Widow, Children, Grandchildren, and the entire Agorkpo & Kpodogui families express their sincere appreciation to the Ghana Armed Forces, the Clergy and congregation of the Garrison Methodist and Presbyterian Church, Burma Camp, friends, and sympathizers for your prayers, love, and solidarity.
          </p>
        </div>

        {/* Back to top & copyright */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-500 gap-3 border-t border-zinc-900">
          <p>
            &copy; 2026 The Kpodogui Family Memorial Archive. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-amber-300 transition-colors"
          >
            <span>Return to Cover</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
