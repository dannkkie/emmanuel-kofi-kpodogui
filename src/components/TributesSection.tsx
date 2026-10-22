"use client";

import { useState } from "react";
import { Heart, Search, Quote, Share2, Check, ChevronDown, ChevronUp, User } from "lucide-react";
import { FUNERAL_DATA, Tribute } from "@/data/funeralData";

export function TributesSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedTributes, setExpandedTributes] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: "all", label: "All Tributes" },
    { id: "widow", label: "Widow" },
    { id: "children", label: "Children" },
    { id: "grandchildren", label: "Grandchildren" },
    { id: "military", label: "Comrades (GAF)" },
    { id: "church", label: "Church" },
    { id: "family", label: "Family Clan" },
  ];

  const filteredTributes = FUNERAL_DATA.tributes.filter((t) => {
    const matchesCategory =
      selectedCategory === "all" || t.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      t.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.relation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.content.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedTributes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const shareTribute = async (tribute: Tribute) => {
    const text = `Tribute to Ex-WO1 Emmanuel Kofi Kpodogui (Ago Die) by ${tribute.author} (${tribute.relation}):\n\n${tribute.excerpt}\n\nRead full tribute at: ${window.location.href}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Tribute by ${tribute.author}`,
          text,
          url: window.location.href,
        });
      } catch {
        // cancelled
      }
    } else {
      navigator.clipboard.writeText(text);
      setCopiedId(tribute.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <section id="tributes" className="py-16 sm:py-24 px-4 bg-zinc-950 border-t border-zinc-900">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-xs uppercase tracking-[0.25em] text-amber-400 font-medium">
            Words of Love & Remembrance
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-zinc-100 font-bold mt-2">
            Tributes & Memorials
          </h2>
          <div className="w-16 h-0.5 bg-amber-500/60 mx-auto mt-3 rounded-full" />
          <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto mt-3">
            Cherished memories, reflections, and salutes from his devoted family, comrades-in-arms, church, and loved ones.
          </p>
        </div>

        {/* Filter Pills & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-8">
          {/* Scrollable category pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                    : "bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tributes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-500/50"
            />
          </div>
        </div>

        {/* Tribute Cards */}
        {filteredTributes.length === 0 ? (
          <div className="text-center py-12 rounded-2xl bg-zinc-900/30 border border-zinc-800">
            <Heart className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
            <p className="text-sm text-zinc-400">No tributes matched your search.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredTributes.map((tribute) => {
              const isExpanded = !!expandedTributes[tribute.id];
              return (
                <div
                  key={tribute.id}
                  className="rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-amber-500/30 transition-all p-6 sm:p-8 shadow-xl"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-300">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-serif font-semibold text-zinc-100">
                          {tribute.author}
                        </h3>
                        <p className="text-xs text-amber-400 font-medium">
                          {tribute.relation}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => shareTribute(tribute)}
                      title="Share Tribute"
                      className="p-2 rounded-full text-zinc-400 hover:text-amber-300 hover:bg-zinc-800 border border-zinc-800 transition-colors"
                    >
                      {copiedId === tribute.id ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Share2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Excerpt with quote styling */}
                  <div className="relative pl-6 border-l-2 border-amber-500/40 italic text-amber-100/90 text-sm mb-4">
                    <Quote className="w-4 h-4 text-amber-400/40 absolute -left-2 -top-1 fill-amber-400/20" />
                    <p>{tribute.excerpt}</p>
                  </div>

                  {/* Full Content (Expandable) */}
                  <div
                    className={`space-y-3 text-zinc-300 text-sm leading-relaxed overflow-hidden transition-all duration-300 ${
                      isExpanded ? "max-h-[2000px] opacity-100 pt-2" : "max-h-0 opacity-0"
                    }`}
                  >
                    {tribute.content.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>

                  {/* Toggle Button */}
                  <button
                    onClick={() => toggleExpand(tribute.id)}
                    className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-amber-300 hover:text-amber-200 transition-colors"
                  >
                    <span>{isExpanded ? "Show Less" : "Read Full Tribute"}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
