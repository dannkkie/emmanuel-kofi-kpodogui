"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { QrCode, Calendar, MapPin, User, Sparkles, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { brochureData } from "@/data/brochureData";

interface CoverPageProps {
  onOpenBiography: () => void;
  onOpenCalendar: () => void;
  onOpenVenue: () => void;
  onOpenShareModal: () => void;
}

export default function CoverPage({
  onOpenBiography,
  onOpenCalendar,
  onOpenVenue,
  onOpenShareModal,
}: CoverPageProps) {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showHotspotHints, setShowHotspotHints] = useState<boolean>(true);

  const toggleZoom = () => {
    setZoomLevel((prev) => (prev === 1 ? 1.4 : 1));
  };

  return (
    <div className="relative w-full flex flex-col items-center select-none">
      {/* Viewport Control Strip (Mobile friendly) */}
      <div className="w-full flex items-center justify-between px-3 py-2 text-[11px] text-[#877971] border-b border-[#DEC596]/15 bg-black/60 backdrop-blur-sm z-20">
        <div className="flex items-center gap-1.5 text-[#DEC596]">
          <Sparkles className="w-3.5 h-3.5 text-[#B48836]" />
          <span className="font-cinzel tracking-wider uppercase text-[10px]">Official Memorial Cover</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowHotspotHints((prev) => !prev)}
            className={`px-2 py-0.5 rounded text-[10px] transition-colors ${
              showHotspotHints
                ? "bg-[#DEC596]/15 text-[#DEC596] border border-[#DEC596]/30"
                : "bg-white/5 text-[#877971]"
            }`}
          >
            {showHotspotHints ? "Hotspots: On" : "Hotspots: Off"}
          </button>
          <button
            onClick={toggleZoom}
            aria-label="Toggle zoom"
            className="p-1 rounded hover:bg-white/10 text-[#877971] hover:text-[#DEC596] transition-colors"
          >
            {zoomLevel === 1 ? <ZoomIn className="w-3.5 h-3.5" /> : <ZoomOut className="w-3.5 h-3.5" />}
          </button>
          {zoomLevel > 1 && (
            <button
              onClick={() => setZoomLevel(1)}
              aria-label="Reset zoom"
              className="p-1 rounded hover:bg-white/10 text-[#877971] hover:text-[#DEC596]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Aspect-Ratio Container (Exact 418/598 brochure proportion) */}
      <div className="relative w-full overflow-hidden bg-[#050505] flex items-center justify-center">
        <motion.div
          animate={{ scale: zoomLevel }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative w-full aspect-[418/598] max-w-full origin-top"
        >
          {/* Base High-Resolution Cover Image */}
          <Image
            src={brochureData.honoree.photoUrl}
            alt="Official Funeral Brochure Cover for Ex-WO1 Emmanuel Kofi Kpodogui (1954 - 2026)"
            fill
            sizes="(max-width: 430px) 100vw, 430px"
            priority
            placeholder="blur"
            blurDataURL="data:image/webp;base64,UklGRkIAAABXRUJQVlA4IDYAAADQAQCdASoCAAMAPm0ukUekIqGYBADABbSNDAE1/4j7z2fAAAD+/d5qW4U1uF76yT4K2s6AAAAA"
            className="object-contain"
          />

          {/* Golden Radial Spotlight Overlay */}
          <div className="absolute inset-0 gold-radial-spotlight pointer-events-none mix-blend-screen opacity-50" />

          {/* =========================================================================
              INTERACTIVE HOTSPOTS LAYER
              Positioned to align with the PDF typography & graphical elements
             ========================================================================= */}

          {/* 1. TOP BANNER HOTSPOT: "FOREVER IN OUR HEARTS" */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute top-[2.2%] left-[5%] right-[5%] h-[4.5%] flex items-center justify-center cursor-pointer group"
            onClick={onOpenBiography}
          >
            {showHotspotHints && (
              <span className="absolute -bottom-4 px-1.5 py-0.5 rounded text-[8px] font-sans tracking-tight bg-black/80 text-[#DEC596] border border-[#DEC596]/30 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity pointer-events-none shadow-lg">
                View Life & Legacy
              </span>
            )}
          </motion.div>

          {/* 2. PORTRAIT & RANK HOTSPOT: "Ex-WO1 Emmanuel Kofi KPODOGUI - A.K.A. 'AGO DIE'" */}
          <div
            onClick={onOpenBiography}
            className="absolute top-[16%] left-[10%] right-[10%] h-[58%] rounded-2xl cursor-pointer group"
            title="Tap to read the life story and military career of Ex-WO1 Emmanuel Kofi Kpodogui"
          >
            {showHotspotHints && (
              <div className="absolute bottom-[24%] left-1/2 -translate-x-1/2 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/75 border border-[#DEC596]/30 text-[#DEC596] text-[10px] font-cinzel tracking-wider backdrop-blur-md opacity-80 group-hover:opacity-100 group-hover:scale-105 active:scale-95 transition-all shadow-[0_4px_15px_rgba(0,0,0,0.8)]">
                <User className="w-3 h-3 text-[#B48836]" />
                <span>Read Life Story & Ranks</span>
              </div>
            )}
          </div>

          {/* 3. INTERACTIVE DATE BADGE: "Saturday 24th October, 2026" */}
          <div
            onClick={onOpenCalendar}
            className="absolute bottom-[4.8%] left-[8%] right-[8%] h-[3.8%] flex items-center justify-center cursor-pointer group rounded-lg hover:bg-[#DEC596]/10 active:bg-[#DEC596]/20 transition-all"
            title="Tap to add funeral service to your calendar"
          >
            {showHotspotHints && (
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center gap-1 px-2 py-0.5 rounded bg-black/90 text-[#DEC596] text-[9px] border border-[#DEC596]/30 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
                <Calendar className="w-2.5 h-2.5 text-[#B48836]" />
                <span>Add to Calendar (.ics / Google)</span>
              </div>
            )}
          </div>

          {/* 4. INTERACTIVE VENUE LINK: "Garrison Methodist and Presbyterian Church, Burma Camp" */}
          <div
            onClick={onOpenVenue}
            className="absolute bottom-[1.2%] left-[5%] right-[5%] h-[3.8%] flex items-center justify-center cursor-pointer group rounded-lg hover:bg-[#DEC596]/10 active:bg-[#DEC596]/20 transition-all"
            title="Tap for Google Maps directions to Garrison Church, Burma Camp"
          >
            {showHotspotHints && (
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center gap-1 px-2 py-0.5 rounded bg-black/90 text-[#DEC596] text-[9px] border border-[#DEC596]/30 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
                <MapPin className="w-2.5 h-2.5 text-[#B48836]" />
                <span>Burma Camp Directions</span>
              </div>
            )}
          </div>

          {/* 5. INTERACTIVE QR CODE: Matching exact bottom-right position on the cover */}
          <div
            onClick={onOpenShareModal}
            className="absolute bottom-[7.5%] right-[4.8%] w-[21%] aspect-square cursor-pointer group rounded-sm"
            title="Tap to scan or share digital brochure"
          >
            {/* Subtle pulsator ring around QR code to encourage tapping */}
            <span className="absolute -inset-1 rounded-sm border border-[#DEC596]/40 animate-pulse pointer-events-none" />

            {showHotspotHints && (
              <div className="absolute -top-7 right-0 flex items-center gap-1 px-2 py-0.5 rounded bg-black/95 text-[#DEC596] text-[9px] border border-[#DEC596]/40 opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all whitespace-nowrap shadow-lg">
                <QrCode className="w-2.5 h-2.5 text-[#B48836]" />
                <span>Tap to Share / Scan</span>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Mobile Guest Quick-Action Bar */}
      <div className="w-full grid grid-cols-3 gap-2 px-3 py-3 bg-[#0A0A0A] border-t border-[#DEC596]/15">
        <button
          onClick={onOpenBiography}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#141414] border border-[#DEC596]/15 text-[#DEC596] hover:bg-[#1E1E1E] transition-all"
        >
          <User className="w-4 h-4 text-[#B48836] mb-1" />
          <span className="text-[10px] font-cinzel font-semibold">Biography</span>
        </button>

        <button
          onClick={onOpenCalendar}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#141414] border border-[#DEC596]/15 text-[#DEC596] hover:bg-[#1E1E1E] transition-all"
        >
          <Calendar className="w-4 h-4 text-[#B48836] mb-1" />
          <span className="text-[10px] font-cinzel font-semibold">Service Date</span>
        </button>

        <button
          onClick={onOpenShareModal}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#141414] border border-[#DEC596]/15 text-[#DEC596] hover:bg-[#1E1E1E] transition-all"
        >
          <QrCode className="w-4 h-4 text-[#B48836] mb-1" />
          <span className="text-[10px] font-cinzel font-semibold">Share & PDF</span>
        </button>
      </div>
    </div>
  );
}
