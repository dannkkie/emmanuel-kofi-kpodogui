"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Share2, Calendar, MapPin, BookOpen, QrCode } from "lucide-react";
import { ShareModal } from "./ShareModal";
import { CalendarVenueModal } from "./CalendarVenueModal";

interface InteractiveCoverProps {
  onNavigateTab: (tab: "service" | "biography" | "tributes" | "gallery" | "hymns") => void;
  onToggleBrochureMode: () => void;
}

export const InteractiveCover: React.FC<InteractiveCoverProps> = ({
  onNavigateTab,
  onToggleBrochureMode,
}) => {
  const [shareOpen, setShareOpen] = useState(false);
  const [calendarVenueOpen, setCalendarVenueOpen] = useState(false);
  const [modalTab, setModalTab] = useState<"calendar" | "venue">("venue");

  const openCalendar = () => {
    setModalTab("calendar");
    setCalendarVenueOpen(true);
  };

  const openVenue = () => {
    setModalTab("venue");
    setCalendarVenueOpen(true);
  };

  return (
    <div className="relative w-full flex flex-col items-center justify-center">
      {/* Viewport Frame with subtle gold illumination on larger screens */}
      <div className="relative w-full max-w-[430px] aspect-[418/598] rounded-xl sm:rounded-2xl overflow-hidden border border-[#DEC596]/15 shadow-2xl bg-[#050505]">
        {/* Subtle radial warm golden-brown spotlight as requested */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(circle at 38% 28%, rgba(180, 136, 54, 0.28) 0%, rgba(5, 5, 5, 0) 60%)",
          }}
        />

        {/* High-Fidelity Rendered Page 1 */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/brochure/page-1.webp"
            alt="Memorial Cover: Ex-WO1 Emmanuel Kofi Kpodogui (1954 - 2026)"
            fill
            sizes="(max-width: 430px) 100vw, 430px"
            priority
            className="object-cover object-center select-none"
          />
        </div>

        {/* Interactive Hotspot Layer */}
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-4 pointer-events-none">
          {/* Top Inscription Hotspot */}
          <div className="w-full text-center pt-2 pointer-events-auto">
            <span
              className="inline-block px-3 py-1 text-[11px] font-cinzel text-[#877971] tracking-[0.45em] uppercase hover:text-[#DEC596] transition-colors cursor-default animate-pulse duration-1000"
              title="Forever in our hearts"
            >
              FOREVER IN OUR HEARTS
            </span>
          </div>

          {/* Central Portrait & Title Hotspot (Click to read Biography) */}
          <button
            onClick={() => onNavigateTab("biography")}
            className="w-full flex-1 my-4 cursor-pointer pointer-events-auto focus:outline-none group relative rounded-lg"
            aria-label="Read Biography of Ex-WO1 Emmanuel Kofi Kpodogui"
          >
            <div className="absolute inset-x-8 top-12 bottom-16 rounded-xl border border-transparent group-hover:border-[#DEC596]/30 group-hover:bg-[#B48836]/10 transition-all flex items-end justify-center pb-2">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 backdrop-blur-sm border border-[#DEC596]/40 text-[#DEC596] text-[10px] uppercase font-cinzel tracking-widest px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1.5">
                <BookOpen className="w-3 h-3 text-[#B48836]" />
                Explore Life & Military Career
              </span>
            </div>
          </button>

          {/* Bottom Interactive Strip */}
          <div className="w-full pb-3 flex flex-col items-center pointer-events-auto">
            {/* Date Button Hotspot */}
            <button
              onClick={openCalendar}
              className="group/date flex items-center justify-center gap-1.5 py-1 px-3 rounded-full hover:bg-black/60 hover:border hover:border-[#DEC596]/30 transition-all text-[#877971] hover:text-[#DEC596] text-xs font-caladea"
              title="Add Service to Calendar"
            >
              <Calendar className="w-3 h-3 opacity-60 group-hover/date:opacity-100 text-[#DEC596]" />
              <span>Saturday 24th October, 2026</span>
            </button>

            {/* Venue Button Hotspot */}
            <button
              onClick={openVenue}
              className="group/venue flex items-center justify-center gap-1 py-1 px-3 mt-0.5 rounded-full hover:bg-black/60 hover:border hover:border-[#DEC596]/30 transition-all text-[#877971] hover:text-[#DEC596] text-[11px] font-caladea text-center"
              title="Get Directions to Church"
            >
              <MapPin className="w-3 h-3 opacity-60 group-hover/venue:opacity-100 text-[#DEC596]" />
              <span>Garrison Methodist and Presbyterian Church, Burma Camp</span>
            </button>
          </div>

          {/* Interactive QR Code Button (Bottom-Right, matching brochure placement) */}
          <div className="absolute right-4 bottom-14 sm:right-5 sm:bottom-16 pointer-events-auto z-20">
            <button
              onClick={() => setShareOpen(true)}
              className="relative p-1 rounded-md bg-white shadow-xl hover:scale-105 active:scale-95 transition-transform border border-[#DEC596]/50 group"
              aria-label="Scan or Share Memorial Brochure"
              title="Tap to scan or share brochure"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 relative overflow-hidden rounded">
                <Image
                  src="/images/memorial.webp"
                  alt="QR Code"
                  fill
                  sizes="60px"
                  className="object-cover"
                />
              </div>
              <span className="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B48836] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#DEC596] items-center justify-center">
                  <Share2 className="w-2 h-2 text-black" />
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Action Strip beneath cover */}
      <div className="w-full max-w-[430px] flex items-center justify-between gap-2 mt-3 px-1 text-xs">
        <button
          onClick={onToggleBrochureMode}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#141414] hover:bg-[#1f1f1f] border border-[#DEC596]/20 text-[#DEC596] font-cinzel text-[11px] uppercase tracking-wider transition-all active:scale-95 shadow-md"
        >
          <BookOpen className="w-3.5 h-3.5 text-[#B48836]" />
          Flip Brochure (24 Pages)
        </button>

        <button
          onClick={() => setShareOpen(true)}
          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#141414] hover:bg-[#1f1f1f] border border-[#DEC596]/20 text-[#877971] hover:text-[#DEC596] text-[11px] uppercase tracking-wider transition-all"
        >
          <QrCode className="w-3.5 h-3.5 text-[#B48836]" />
          Share
        </button>

        <a
          href="/web-brochure.pdf"
          download="Ex-WO1-Emmanuel-Kofi-Kpodogui-Memorial.pdf"
          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#141414] hover:bg-[#1f1f1f] border border-[#DEC596]/20 text-[#877971] hover:text-[#DEC596] text-[11px] uppercase tracking-wider transition-all"
        >
          PDF
        </a>
      </div>

      {/* Modals */}
      <ShareModal isOpen={shareOpen} onClose={() => setShareOpen(false)} />
      <CalendarVenueModal
        key={modalTab}
        isOpen={calendarVenueOpen}
        onClose={() => setCalendarVenueOpen(false)}
        initialTab={modalTab}
      />
    </div>
  );
};
