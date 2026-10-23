"use client";

import { useState } from "react";
import { Clock, Music, BookOpen, ChevronRight, X, Shield, Users } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { brochureData, Hymn, ServiceEvent } from "@/data/brochureData";

export default function OrderOfServiceSection() {
  const [activeTab, setActiveTab] = useState<"liturgy" | "military">("liturgy");
  const [selectedHymn, setSelectedHymn] = useState<Hymn | null>(null);

  const openHymnModal = (hymnId?: string) => {
    if (hymnId && brochureData.hymns[hymnId]) {
      setSelectedHymn(brochureData.hymns[hymnId]);
    }
  };

  return (
    <div className="w-full flex flex-col p-4 space-y-6">
      {/* Section Header */}
      <div className="text-center space-y-1.5 border-b border-[#DEC596]/15 pb-4">
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#B48836] font-cinzel">
          Solemn Burial & Thanksgiving
        </span>
        <h2 className="font-cinzel text-xl font-bold text-[#DEC596] tracking-wide">
          Order of Service
        </h2>
        <p className="text-xs text-[#877971] font-caladea max-w-xs mx-auto">
          {brochureData.service.venueName}, {brochureData.service.venueAddress}
        </p>
      </div>

      {/* Segmented Program Filter */}
      <div className="grid grid-cols-2 p-1 bg-[#141414] rounded-xl border border-white/5">
        <button
          onClick={() => setActiveTab("liturgy")}
          className={`flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
            activeTab === "liturgy"
              ? "bg-[#DEC596] text-black shadow-md"
              : "text-[#877971] hover:text-[#DEC596]"
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Church Liturgy</span>
        </button>
        <button
          onClick={() => setActiveTab("military")}
          className={`flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
            activeTab === "military"
              ? "bg-[#DEC596] text-black shadow-md"
              : "text-[#877971] hover:text-[#DEC596]"
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          <span>Military Honours</span>
        </button>
      </div>

      {/* Liturgy View */}
      {activeTab === "liturgy" && (
        <div className="space-y-6">
          {/* Part 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[#DEC596]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B48836]" />
              <h3 className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#DEC596]">
                {brochureData.orderOfService.part1.title}
              </h3>
            </div>

            <div className="relative border-l-2 border-[#DEC596]/20 ml-2.5 pl-4 space-y-4">
              {brochureData.orderOfService.part1.events.map((event, idx) => (
                <ServiceEventCard
                  key={idx}
                  event={event}
                  onOpenHymn={openHymnModal}
                />
              ))}
            </div>
          </div>

          {/* Part 2 */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2 text-[#DEC596]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B48836]" />
              <h3 className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#DEC596]">
                {brochureData.orderOfService.part2.title}
              </h3>
            </div>

            <div className="relative border-l-2 border-[#DEC596]/20 ml-2.5 pl-4 space-y-4">
              {brochureData.orderOfService.part2.events.map((event, idx) => (
                <ServiceEventCard
                  key={idx}
                  event={event}
                  onOpenHymn={openHymnModal}
                />
              ))}
            </div>
          </div>

          {/* Officiating Clergy Box */}
          <div className="border border-[#DEC596]/20 bg-[#0F0F0F] rounded-2xl p-4 mt-6">
            <div className="flex items-center gap-2 text-[#DEC596] mb-3">
              <Users className="w-4 h-4 text-[#B48836]" />
              <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider">
                Officiating Clergy & Chaplains
              </h4>
            </div>
            <div className="grid grid-cols-1 gap-2.5">
              {brochureData.officiatingClergy.map((minister, idx) => (
                <div
                  key={idx}
                  className="flex items-start justify-between py-1.5 border-b border-white/5 last:border-b-0 text-xs"
                >
                  <div>
                    <span className="text-[#DEC596] font-medium block">{minister.name}</span>
                    <span className="text-[11px] text-[#877971]">{minister.role}</span>
                  </div>
                  {minister.denomination && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-[#877971] shrink-0">
                      {minister.denomination}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Military Honours View */}
      {activeTab === "military" && (
        <div className="space-y-4">
          <div className="border border-[#B48836]/30 bg-[#14120D] p-4 rounded-2xl text-xs space-y-2">
            <div className="flex items-center gap-2 text-[#DEC596] font-cinzel font-bold text-sm">
              <Shield className="w-4 h-4 text-[#B48836]" />
              <span>Ghana Armed Forces Ceremonial Protocol</span>
            </div>
            <p className="text-[#877971] leading-relaxed text-[11px]">
              In recognition of distinguished military service, Ex-WO1 Emmanuel Kofi Kpodogui receives full ceremonial honors according to Ghana Armed Forces standing funeral customs.
            </p>
          </div>

          <div className="space-y-3">
            {brochureData.orderOfService.militaryRites.events.map((rite, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#0D0D0D] border border-[#DEC596]/15 space-y-1.5"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#B48836]" />
                  <h4 className="font-cinzel text-sm font-semibold text-[#DEC596]">
                    {rite.title}
                  </h4>
                </div>
                <p className="text-xs text-[#877971] leading-relaxed pl-4">
                  {rite.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Fullscreen Sing-Along Hymn Sheet / Modal */}
      <AnimatePresence>
        {selectedHymn && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedHymn(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ type: "spring", damping: 25, stiffness: 280 }}
              className="relative w-full max-w-md max-h-[85vh] rounded-t-3xl sm:rounded-2xl bg-[#0A0A0A] border border-[#DEC596]/30 flex flex-col shadow-2xl z-10 overflow-hidden"
            >
              {/* Hymn Header */}
              <div className="p-5 border-b border-[#DEC596]/15 flex items-start justify-between bg-[#121212]">
                <div>
                  <div className="text-[10px] text-[#B48836] font-cinzel uppercase tracking-widest">
                    {selectedHymn.number} • Tune: {selectedHymn.tune}
                  </div>
                  <h3 className="font-cinzel text-lg font-bold text-[#DEC596] mt-0.5">
                    {selectedHymn.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedHymn(null)}
                  className="rounded-full p-1.5 text-[#877971] hover:text-[#DEC596] bg-white/5"
                  aria-label="Close hymn"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Hymn Stanzas for Congregational Singing */}
              <div className="p-6 overflow-y-auto space-y-6 text-sm text-[#E2DACB] font-caladea leading-relaxed">
                {selectedHymn.stanzas.map((stanza, sIdx) => (
                  <div key={sIdx} className="relative pl-6 border-l border-[#DEC596]/20">
                    <span className="absolute left-1 top-0 text-xs font-bold text-[#B48836]">
                      {sIdx + 1}.
                    </span>
                    <div className="whitespace-pre-line text-sm sm:text-base">
                      {stanza}
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Singing Helper */}
              <div className="p-3 border-t border-[#DEC596]/15 bg-[#0D0D0D] text-center text-xs text-[#877971]">
                Tap anywhere outside or the close button when finished singing
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ServiceEventCard({
  event,
  onOpenHymn,
}: {
  event: ServiceEvent;
  onOpenHymn: (id?: string) => void;
}) {
  const hasHymn = !!event.hymnId;

  return (
    <div className="relative group">
      {/* Timeline Dot */}
      <span className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-[#050505] bg-[#DEC596]" />

      <div
        onClick={() => hasHymn && onOpenHymn(event.hymnId)}
        className={`p-3.5 rounded-xl border border-[#DEC596]/15 bg-[#0D0D0D] transition-all ${
          hasHymn ? "cursor-pointer hover:border-[#DEC596]/40 hover:bg-[#141414] active:scale-[0.99]" : ""
        }`}
      >
        <div className="flex items-center justify-between gap-2 mb-1">
          {event.time && (
            <span className="inline-flex items-center gap-1 text-[11px] text-[#B48836] font-mono">
              <Clock className="w-3 h-3" />
              {event.time}
            </span>
          )}
          {hasHymn && (
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#B48836]/20 text-[#DEC596] border border-[#B48836]/30">
              <Music className="w-2.5 h-2.5" />
              <span>Sing Hymn</span>
              <ChevronRight className="w-2.5 h-2.5" />
            </span>
          )}
        </div>

        <h4 className="text-sm font-cinzel font-semibold text-[#DEC596] leading-snug">
          {event.title}
        </h4>

        {event.person && (
          <p className="text-xs text-[#DEC596]/80 font-medium mt-0.5">
            {event.person}
          </p>
        )}

        {event.description && (
          <p className="text-xs text-[#877971] leading-relaxed mt-1">
            {event.description}
          </p>
        )}
      </div>
    </div>
  );
}
