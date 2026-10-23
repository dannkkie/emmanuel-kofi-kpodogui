"use client";

import Image from "next/image";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import { brochureData } from "@/data/brochureData";

interface CoverPageProps {
  onOpenBiography: () => void;
  onOpenCalendar: () => void;
  onOpenVenue: () => void;
  onOpenShareModal: () => void;
  mode?: "brochure" | "reader";
}

export default function CoverPage({
  onOpenBiography,
  onOpenCalendar,
  onOpenVenue,
  onOpenShareModal,
  mode = "brochure",
}: CoverPageProps) {
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const toggleZoom = () => {
    setZoomLevel((prev) => (prev === 1 ? 1.35 : 1));
  };

  return (
    <div className="relative w-full flex flex-col items-center select-none bg-[#050505]">
      {/* Subtle Zoom & Pan controls for Brochure Mode */}
      {mode === "brochure" && (
        <div className="w-full flex items-center justify-between px-3 py-1.5 text-[11px] text-[#877971] border-b border-[#DEC596]/10 bg-black/40 backdrop-blur-sm z-20">
          <span className="font-cinzel text-[10px] tracking-widest uppercase text-[#B48836]">
            Memorial Brochure Cover
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleZoom}
              title="Toggle Zoom"
              className="p-1 rounded text-[#877971] hover:text-[#DEC596] hover:bg-white/5 transition-colors"
            >
              {zoomLevel === 1 ? <ZoomIn className="w-3.5 h-3.5" /> : <ZoomOut className="w-3.5 h-3.5" />}
            </button>
            {zoomLevel > 1 && (
              <button
                onClick={() => setZoomLevel(1)}
                title="Reset Zoom"
                className="p-1 rounded text-[#877971] hover:text-[#DEC596] hover:bg-white/5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Main Aspect-Ratio Brochure Canvas (Native 418/598 PDF proportion) */}
      <div className="relative w-full overflow-hidden bg-[#050505] flex items-center justify-center">
        <motion.div
          animate={{ scale: zoomLevel }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative w-full aspect-[418/598] max-w-full origin-top"
        >
          {/* Base Vector-Rendered High-Definition Cover Artwork */}
          <Image
            src={brochureData.honoree.photoUrl}
            alt="Official Funeral Brochure Cover for Ex-WO1 Emmanuel Kofi Kpodogui (1954 - 2026)"
            fill
            sizes="(max-width: 430px) 100vw, 430px"
            priority
            className="object-contain"
          />

          {/* =========================================================================
              CLEAN, DISCREET INTERACTIVE HOTSPOTS
              These touch zones match the exact geometry of the PDF layout without
              pasting ugly stickers over the portrait and sacred typography.
             ========================================================================= */}

          {/* 1. PORTRAIT & RANK HOTSPOT: Tapping navigates to Biography */}
          <button
            onClick={onOpenBiography}
            aria-label="View biography and military honors of Ex-WO1 Emmanuel Kofi Kpodogui"
            title="Read Biography & Military Honors"
            className="absolute top-[16%] left-[12%] right-[12%] h-[56%] rounded-3xl cursor-pointer hover:ring-1 hover:ring-[#DEC596]/20 focus:outline-none transition-all group"
          >
            <span className="sr-only">Read Biography</span>
          </button>

          {/* 2. INTERACTIVE DATE: "Saturday 24th October, 2026" (matches Y=92% in PDF) */}
          <button
            onClick={onOpenCalendar}
            aria-label="Add funeral service to calendar (Saturday 24th October, 2026)"
            title="Tap to add to Google Calendar / Apple (.ics)"
            className="absolute bottom-[4.8%] left-[12%] right-[12%] h-[3.8%] rounded-md cursor-pointer hover:bg-[#DEC596]/10 active:bg-[#DEC596]/20 focus:outline-none transition-colors"
          >
            <span className="sr-only">Add to Calendar</span>
          </button>

          {/* 3. INTERACTIVE VENUE: "Garrison Methodist and Presbyterian Church, Burma Camp" (matches Y=95% in PDF) */}
          <button
            onClick={onOpenVenue}
            aria-label="Get directions to Garrison Methodist and Presbyterian Church, Burma Camp"
            title="Tap for Burma Camp Google Maps directions"
            className="absolute bottom-[1.2%] left-[8%] right-[8%] h-[3.8%] rounded-md cursor-pointer hover:bg-[#DEC596]/10 active:bg-[#DEC596]/20 focus:outline-none transition-colors"
          >
            <span className="sr-only">Burma Camp Directions</span>
          </button>

          {/* 4. INTERACTIVE QR CODE: Matching exact bottom-right position in PDF */}
          <button
            onClick={onOpenShareModal}
            aria-label="Scan or share digital memorial brochure"
            title="Tap to share digital brochure or download PDF"
            className="absolute bottom-[7.5%] right-[4.8%] w-[21.5%] aspect-square rounded-sm cursor-pointer hover:ring-2 hover:ring-[#DEC596]/60 active:scale-95 transition-all"
          >
            <span className="sr-only">Scan or Share Memorial Brochure</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
