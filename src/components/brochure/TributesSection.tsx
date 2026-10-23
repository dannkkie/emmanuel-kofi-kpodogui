"use client";

import React, { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { Flame, Heart, MessageSquarePlus, Send, X, Check } from "lucide-react";
import { MEMORIAL_DATA, Tribute } from "@/data/brochureData";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

export const TributesSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [leaveModalOpen, setLeaveModalOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [userRelation, setUserRelation] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Sync state from localStorage without cascading renders
  const candleCount = useSyncExternalStore(
    subscribe,
    () => {
      const saved = localStorage.getItem("memorial_candles_kpodogui");
      return saved ? Number(saved) : 47;
    },
    () => 47
  );

  const hasLitCandle = useSyncExternalStore(
    subscribe,
    () => localStorage.getItem("memorial_has_lit_candle") === "true",
    () => false
  );

  const communityTributes = useSyncExternalStore(
    subscribe,
    () => {
      const saved = localStorage.getItem("memorial_community_tributes");
      if (saved) {
        try {
          return JSON.parse(saved) as Tribute[];
        } catch {
          return [];
        }
      }
      return [];
    },
    () => [] as Tribute[]
  );

  const handleLightCandle = () => {
    if (hasLitCandle) return;
    const newCount = candleCount + 1;
    try {
      localStorage.setItem("memorial_candles_kpodogui", String(newCount));
      localStorage.setItem("memorial_has_lit_candle", "true");
      window.dispatchEvent(new Event("storage"));
    } catch {
      // ignore
    }
  };

  const handlePostTribute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userMessage.trim()) return;

    const newTribute: Tribute = {
      id: `comm-${Date.now()}`,
      author: userName.trim(),
      relation: (userRelation.trim() || "Family") as Tribute["relation"],
      paragraphs: [userMessage.trim()],
      signOff: `Remembered with love by ${userName.trim()}`,
    };

    const updated = [newTribute, ...communityTributes];
    try {
      localStorage.setItem("memorial_community_tributes", JSON.stringify(updated));
      window.dispatchEvent(new Event("storage"));
    } catch {
      // ignore
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setLeaveModalOpen(false);
      setUserName("");
      setUserRelation("");
      setUserMessage("");
    }, 1800);
  };

  const categories = [
    "All",
    "Wife",
    "Children",
    "Grandchildren",
    "Family",
    "In-Laws",
    "Dzita Welfare",
  ];

  const allTributes = [...communityTributes, ...MEMORIAL_DATA.tributes];

  const filteredTributes =
    activeFilter === "All"
      ? allTributes
      : allTributes.filter((t) => t.relation.toLowerCase() === activeFilter.toLowerCase());

  return (
    <div className="w-full max-w-[430px] mx-auto px-4 py-6 space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="text-center space-y-1">
        <span className="text-[10px] uppercase font-cinzel tracking-[0.3em] text-[#877971]">
          Eulogies & Reflections
        </span>
        <h2 className="text-2xl font-cinzel font-bold text-[#DEC596] tracking-wide">
          Tributes
        </h2>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#DEC596]/60 to-transparent mx-auto mt-2" />
      </div>

      {/* Light a Candle & Leave Tribute Action Bar */}
      <div className="rounded-2xl bg-gradient-to-b from-[#161616] to-[#0c0c0c] border border-[#DEC596]/30 p-4 shadow-xl flex items-center justify-between gap-3">
        {/* Virtual Candle Button */}
        <button
          onClick={handleLightCandle}
          disabled={hasLitCandle}
          className={`flex-1 flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
            hasLitCandle
              ? "bg-[#B48836]/15 border-[#DEC596]/40 cursor-default"
              : "bg-[#1f1f1f] border-white/10 hover:border-[#DEC596]/40 active:scale-95"
          }`}
        >
          <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
            <Flame
              className={`w-6 h-6 transition-all ${
                hasLitCandle
                  ? "text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]"
                  : "text-[#877971]"
              }`}
            />
          </div>
          <div>
            <span className="block text-[11px] font-cinzel font-bold text-[#DEC596]">
              {hasLitCandle ? "Candle Lit for Ago Die" : "Light a Candle"}
            </span>
            <span className="text-[10px] text-[#877971]">
              {candleCount} {candleCount === 1 ? "candle" : "candles"} lit in honor
            </span>
          </div>
        </button>

        {/* Leave Tribute Button */}
        <button
          onClick={() => setLeaveModalOpen(true)}
          className="p-3 rounded-xl bg-[#1f1f1f] hover:bg-[#282828] border border-[#DEC596]/30 text-[#DEC596] hover:text-white transition-all flex flex-col items-center justify-center shrink-0 active:scale-95"
          title="Leave a tribute"
        >
          <MessageSquarePlus className="w-4 h-4 text-[#B48836]" />
          <span className="text-[9px] uppercase font-cinzel tracking-wider mt-1">
            Write
          </span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-cinzel transition-all ${
              activeFilter === cat
                ? "bg-[#B48836] text-[#050505] font-bold shadow-md"
                : "bg-[#141414] text-[#877971] hover:text-[#DEC596] border border-white/5"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tributes List */}
      <div className="space-y-6">
        {filteredTributes.map((tribute) => (
          <article
            key={tribute.id}
            className="rounded-2xl bg-[#0c0c0c] border border-[#DEC596]/20 p-5 shadow-lg space-y-3 relative overflow-hidden"
          >
            <div className="flex items-start justify-between border-b border-[#DEC596]/15 pb-2">
              <div>
                <span className="text-[10px] uppercase font-cinzel font-semibold tracking-wider text-[#B48836] bg-[#B48836]/10 px-2 py-0.5 rounded">
                  {tribute.relation}
                </span>
                <h3 className="text-base font-cinzel font-bold text-[#DEC596] mt-1">
                  Tribute by {tribute.author}
                </h3>
              </div>
              <Heart className="w-4 h-4 text-[#B48836]/60 shrink-0 mt-1" />
            </div>

            {/* Scripture Header if present */}
            {tribute.scripture && (
              <blockquote className="p-3 rounded-xl bg-[#141414] border-l-2 border-[#DEC596]/50 text-xs italic font-caladea text-[#877971] leading-relaxed">
                {tribute.scripture}
              </blockquote>
            )}

            {/* Photo if present */}
            {tribute.image && (
              <div className="relative w-full h-44 rounded-xl overflow-hidden border border-[#DEC596]/20 my-2">
                <Image
                  src={tribute.image}
                  alt={`Tribute image - ${tribute.author}`}
                  fill
                  sizes="(max-width: 430px) 100vw, 430px"
                  className="object-cover object-top"
                />
              </div>
            )}

            {/* Paragraphs */}
            <div className="space-y-3 pt-1">
              {tribute.paragraphs.map((para, pIdx) => (
                <p
                  key={pIdx}
                  className="text-[13px] font-caladea text-[#cccccc] leading-relaxed"
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Sign Off */}
            {tribute.signOff && (
              <div className="pt-2 border-t border-white/5 text-xs font-caladea italic text-[#DEC596]/90">
                {tribute.signOff}
              </div>
            )}
          </article>
        ))}
      </div>

      {/* Leave Tribute Modal Drawer */}
      {leaveModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setLeaveModalOpen(false)}
        >
          <div
            className="relative w-full max-w-sm rounded-2xl bg-[#0c0c0c] border border-[#DEC596]/30 p-6 shadow-2xl text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLeaveModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-[#877971] hover:text-[#DEC596] rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-cinzel font-bold text-[#DEC596] mb-1">
              Leave a Memorial Tribute
            </h3>
            <p className="text-xs text-[#877971] mb-4">
              Your words of condolence and tribute will appear on this memorial page.
            </p>

            {submitted ? (
              <div className="py-8 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-cinzel font-bold text-[#ededed]">
                  Tribute Published
                </h4>
                <p className="text-xs text-[#877971]">
                  Thank you for honoring Ex-WO1 Emmanuel Kofi Kpodogui.
                </p>
              </div>
            ) : (
              <form onSubmit={handlePostTribute} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-cinzel uppercase text-[#877971] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="e.g. Kwame Mensah"
                    className="w-full px-3 py-2 rounded-xl bg-[#141414] border border-[#DEC596]/20 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#DEC596]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-cinzel uppercase text-[#877971] mb-1">
                    Relationship
                  </label>
                  <input
                    type="text"
                    value={userRelation}
                    onChange={(e) => setUserRelation(e.target.value)}
                    placeholder="e.g. Friend / Air Force Colleague / In-Law"
                    className="w-full px-3 py-2 rounded-xl bg-[#141414] border border-[#DEC596]/20 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#DEC596]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-cinzel uppercase text-[#877971] mb-1">
                    Your Tribute / Memory *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    placeholder="Share your heartfelt message or memory of Ago Die..."
                    className="w-full px-3 py-2 rounded-xl bg-[#141414] border border-[#DEC596]/20 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#DEC596] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#B48836] to-[#DEC596] text-[#050505] font-semibold text-xs tracking-wider uppercase transition-transform active:scale-95 shadow-md hover:brightness-110"
                >
                  <Send className="w-4 h-4" />
                  Publish Tribute
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
