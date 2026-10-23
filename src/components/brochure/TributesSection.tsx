"use client";

import { useState, useEffect } from "react";
import { Flame, MessageSquare, Plus, Filter, Sparkles, X, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { brochureData, Tribute } from "@/data/brochureData";

export default function TributesSection() {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [tributes, setTributes] = useState<Tribute[]>(brochureData.tributes);
  const [candleCount, setCandleCount] = useState<number>(184);
  const [hasLitCandle, setHasLitCandle] = useState<boolean>(false);
  const [candleToast, setCandleToast] = useState<boolean>(false);
  const [isTributeModalOpen, setIsTributeModalOpen] = useState<boolean>(false);

  // Form state
  const [authorName, setAuthorName] = useState("");
  const [roleTitle, setRoleTitle] = useState("");
  const [relationship, setRelationship] = useState<Tribute["relationship"]>("Church & Friends");
  const [tributeText, setTributeText] = useState("");
  const [tributeSubmitted, setTributeSubmitted] = useState(false);

  // Load from localStorage safely after mount
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const savedCount = localStorage.getItem("memorial_candle_count");
        if (savedCount) setCandleCount(parseInt(savedCount, 10));

        const savedLit = localStorage.getItem("memorial_user_lit_candle");
        if (savedLit === "true") setHasLitCandle(true);

        const savedTributes = localStorage.getItem("memorial_user_tributes");
        if (savedTributes) {
          const parsed = JSON.parse(savedTributes);
          setTributes([...parsed, ...brochureData.tributes]);
        }
      } catch {
        // Ignore localStorage errors
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const handleLightCandle = () => {
    const newCount = candleCount + 1;
    setCandleCount(newCount);
    setHasLitCandle(true);
    setCandleToast(true);

    try {
      localStorage.setItem("memorial_candle_count", newCount.toString());
      localStorage.setItem("memorial_user_lit_candle", "true");
    } catch {
      // Ignore
    }

    setTimeout(() => {
      setCandleToast(false);
    }, 3500);
  };

  const handleTributeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !tributeText.trim()) return;

    const newTribute: Tribute = {
      id: `user-${Date.now()}`,
      author: authorName.trim(),
      relationship,
      roleTitle: roleTitle.trim() || "Sympathizer",
      quote: tributeText.length > 70 ? `${tributeText.slice(0, 70)}...` : tributeText,
      content: tributeText.trim(),
      date: "October 2026",
    };

    const updated = [newTribute, ...tributes];
    setTributes(updated);
    setTributeSubmitted(true);

    try {
      const userCustomOnly = updated.filter((t) => t.id.startsWith("user-"));
      localStorage.setItem("memorial_user_tributes", JSON.stringify(userCustomOnly));
    } catch {
      // Ignore
    }

    setTimeout(() => {
      setTributeSubmitted(false);
      setIsTributeModalOpen(false);
      setAuthorName("");
      setRoleTitle("");
      setTributeText("");
    }, 1500);
  };

  const filterOptions = [
    "All",
    "Widow & Children",
    "Grandchildren",
    "Ghana Armed Forces",
    "Church & Friends",
  ];

  const filteredTributes =
    selectedFilter === "All"
      ? tributes
      : tributes.filter((t) => t.relationship === selectedFilter);

  return (
    <div className="w-full flex flex-col p-4 space-y-6">
      {/* Section Header */}
      <div className="text-center space-y-1.5 border-b border-[#DEC596]/15 pb-4">
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#B48836] font-cinzel">
          Reflections of Love & Honour
        </span>
        <h2 className="font-cinzel text-xl font-bold text-[#DEC596] tracking-wide">
          Tributes & Condolences
        </h2>
        <p className="text-xs text-[#877971] font-caladea max-w-xs mx-auto">
          Words from family, Ghana Armed Forces comrades, church brethren, and loved ones.
        </p>
      </div>

      {/* Interactive Light A Candle Component */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#1A160F] to-[#0D0B08] border border-[#B48836]/35 p-5 text-center shadow-lg">
        {/* Warm Glow Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(222,197,150,0.15)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center space-y-3">
          {/* Animated Flame Icon */}
          <div className="relative">
            <motion.div
              animate={{
                scale: [1, 1.08, 0.96, 1.04, 1],
                filter: [
                  "drop-shadow(0 0 12px rgba(245,190,80,0.8))",
                  "drop-shadow(0 0 20px rgba(245,190,80,1))",
                  "drop-shadow(0 0 12px rgba(245,190,80,0.8))",
                ],
              }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              className="w-12 h-12 rounded-full bg-[#2A1F10] border border-[#B48836]/50 flex items-center justify-center text-[#F5C452]"
            >
              <Flame className="w-6 h-6 fill-[#F5C452] text-[#F5C452]" />
            </motion.div>
          </div>

          <div>
            <div className="text-xl font-cinzel font-bold text-[#DEC596]">
              {candleCount.toLocaleString()} Candles Lit
            </div>
            <p className="text-xs text-[#877971] mt-0.5">
              Light a virtual memorial candle in remembrance of Ex-WO1 Kpodogui
            </p>
          </div>

          <button
            onClick={handleLightCandle}
            disabled={hasLitCandle}
            className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-cinzel text-xs font-semibold tracking-wider transition-all shadow-md ${
              hasLitCandle
                ? "bg-[#2A2315] text-[#DEC596] border border-[#B48836]/30 cursor-default"
                : "bg-gradient-to-r from-[#B48836] via-[#DEC596] to-[#AD8330] text-black hover:brightness-110 active:scale-95"
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>{hasLitCandle ? "You Have Lit a Candle" : "Light a Candle"}</span>
          </button>
        </div>

        {/* Temporary Toast Notification */}
        <AnimatePresence>
          {candleToast && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute bottom-2 left-4 right-4 bg-black/95 border border-[#DEC596]/40 py-1.5 px-3 rounded-lg text-xs text-[#DEC596] shadow-xl flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B48836]" />
              <span>Your candle has been lit in loving memory of Ago Die.</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Filter Tabs & "Leave Tribute" CTA */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-[#877971]">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter by:</span>
          </div>

          <button
            onClick={() => setIsTributeModalOpen(true)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#1A1813] border border-[#DEC596]/30 text-[#DEC596] text-xs font-cinzel hover:bg-[#25221B] active:scale-95 transition-all"
          >
            <Plus className="w-3.5 h-3.5 text-[#B48836]" />
            <span>Leave a Tribute</span>
          </button>
        </div>

        {/* Scrollable Filter Chips */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {filterOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setSelectedFilter(opt)}
              className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-all ${
                selectedFilter === opt
                  ? "bg-[#DEC596] text-black font-semibold shadow-sm"
                  : "bg-[#121212] border border-white/5 text-[#877971] hover:text-[#DEC596]"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Tribute Cards List */}
      <div className="space-y-4">
        {filteredTributes.map((tribute) => (
          <div
            key={tribute.id}
            className="p-5 rounded-2xl bg-[#0D0D0D] border border-[#DEC596]/15 space-y-3 shadow-md"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className="font-cinzel text-sm font-bold text-[#DEC596]">
                  {tribute.author}
                </h4>
                {tribute.roleTitle && (
                  <span className="text-[11px] text-[#B48836] font-medium block">
                    {tribute.roleTitle}
                  </span>
                )}
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[#877971] shrink-0">
                {tribute.relationship}
              </span>
            </div>

            {tribute.quote && (
              <div className="p-3 rounded-xl bg-black/40 border-l-2 border-[#DEC596]/50 text-xs text-[#DEC596]/90 italic font-caladea">
                &ldquo;{tribute.quote}&rdquo;
              </div>
            )}

            <p className="text-xs sm:text-sm text-[#A89F96] font-caladea leading-relaxed whitespace-pre-line">
              {tribute.content}
            </p>

            {tribute.date && (
              <div className="text-[10px] text-[#877971] text-right font-mono">
                {tribute.date}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Leave a Tribute Drawer / Modal */}
      <AnimatePresence>
        {isTributeModalOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsTributeModalOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ type: "spring", damping: 25, stiffness: 280 }}
              className="relative w-full max-w-md max-h-[90vh] rounded-t-3xl sm:rounded-2xl bg-[#0A0A0A] border border-[#DEC596]/30 flex flex-col shadow-2xl z-10 overflow-hidden"
            >
              <div className="p-5 border-b border-[#DEC596]/15 flex items-center justify-between bg-[#121212]">
                <div className="flex items-center gap-2 text-[#DEC596]">
                  <MessageSquare className="w-4 h-4 text-[#B48836]" />
                  <h3 className="font-cinzel text-base font-bold">Leave a Tribute</h3>
                </div>
                <button
                  onClick={() => setIsTributeModalOpen(false)}
                  className="rounded-full p-1.5 text-[#877971] hover:text-[#DEC596] bg-white/5"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {tributeSubmitted ? (
                <div className="p-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-cinzel text-base font-bold text-[#DEC596]">
                    Thank You for Your Condolence
                  </h4>
                  <p className="text-xs text-[#877971]">
                    Your tribute in honour of Ex-WO1 Emmanuel Kofi Kpodogui has been recorded.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleTributeSubmit} className="p-5 space-y-4 overflow-y-auto">
                  <div className="space-y-1">
                    <label className="text-[11px] font-cinzel uppercase text-[#DEC596] block">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sgt. Kwame Mensah / Auntie Faustina"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#141414] border border-[#DEC596]/20 text-xs text-white placeholder-[#877971]/50 focus:outline-none focus:border-[#DEC596]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-cinzel uppercase text-[#DEC596] block">
                      Title or Role (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. GAF Veteran / Family Friend / Niece"
                      value={roleTitle}
                      onChange={(e) => setRoleTitle(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#141414] border border-[#DEC596]/20 text-xs text-white placeholder-[#877971]/50 focus:outline-none focus:border-[#DEC596]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-cinzel uppercase text-[#DEC596] block">
                      Relationship / Category
                    </label>
                    <select
                      value={relationship}
                      onChange={(e) => setRelationship(e.target.value as Tribute["relationship"])}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#141414] border border-[#DEC596]/20 text-xs text-white focus:outline-none focus:border-[#DEC596]"
                    >
                      <option value="Church & Friends">Church & Friends</option>
                      <option value="Ghana Armed Forces">Ghana Armed Forces / Military Colleague</option>
                      <option value="Family">Family / Extended Relative</option>
                      <option value="Widow & Children">Widow & Children</option>
                      <option value="Grandchildren">Grandchildren</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-cinzel uppercase text-[#DEC596] block">
                      Your Tribute Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Share a cherished memory, prayer, or farewell message..."
                      value={tributeText}
                      onChange={(e) => setTributeText(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#141414] border border-[#DEC596]/20 text-xs text-white placeholder-[#877971]/50 focus:outline-none focus:border-[#DEC596]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#B48836] via-[#DEC596] to-[#AD8330] text-black font-semibold text-xs tracking-wider uppercase font-cinzel shadow-lg hover:brightness-110 active:scale-[0.98] transition-all"
                  >
                    Post Condolence Tribute
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
