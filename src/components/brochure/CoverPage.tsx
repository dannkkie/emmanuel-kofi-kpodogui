"use client";

import Image from "next/image";
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
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center bg-[#050505] p-2 sm:p-4 select-none">
      {/* Pristine Brochure Frame - Preserving exact 418 / 598 proportion */}
      <div className="relative w-full max-w-[560px] aspect-[418/598] flex items-center justify-center">
        {/* Vector-Rendered High-Definition Cover */}
        <Image
          src={brochureData.honoree.photoUrl}
          alt="Official Funeral Brochure Cover for Ex-WO1 Emmanuel Kofi Kpodogui (1954 - 2026)"
          fill
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 560px"
          className="object-contain drop-shadow-[0_0_50px_rgba(0,0,0,0.9)]"
        />

        {/* =========================================================================
            CLEAN, INVISIBLE INTERACTIVE HOTSPOTS
            Zero visual badges or clutter obscuring the sacred portrait and typography.
            Natural cursor cues and tap interactions.
           ========================================================================= */}

        {/* 1. PORTRAIT & RANK HOTSPOT: Tapping opens Biography */}
        <button
          onClick={onOpenBiography}
          aria-label="View biography and military service of Ex-WO1 Emmanuel Kofi Kpodogui"
          className="absolute top-[16%] left-[12%] right-[12%] h-[56%] rounded-3xl cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#DEC596]/40 transition-colors"
        />

        {/* 2. INTERACTIVE DATE: "Saturday 24th October, 2026" */}
        <button
          onClick={onOpenCalendar}
          aria-label="Add funeral service to calendar (Saturday 24th October, 2026)"
          className="absolute bottom-[4.5%] left-[10%] right-[10%] h-[3.8%] rounded-md cursor-pointer hover:bg-[#DEC596]/10 active:bg-[#DEC596]/20 focus:outline-none transition-colors"
        />

        {/* 3. INTERACTIVE VENUE: "Garrison Methodist and Presbyterian Church, Burma Camp" */}
        <button
          onClick={onOpenVenue}
          aria-label="Get directions to Garrison Methodist and Presbyterian Church, Burma Camp"
          className="absolute bottom-[1.2%] left-[6%] right-[6%] h-[3.6%] rounded-md cursor-pointer hover:bg-[#DEC596]/10 active:bg-[#DEC596]/20 focus:outline-none transition-colors"
        />

        {/* 4. INTERACTIVE QR CODE: Matching exact bottom-right position */}
        <button
          onClick={onOpenShareModal}
          aria-label="Scan or share digital memorial brochure"
          className="absolute bottom-[7.2%] right-[4.8%] w-[21.5%] aspect-square rounded-sm cursor-pointer hover:ring-2 hover:ring-[#DEC596]/60 active:scale-95 transition-all"
        />
      </div>

      {/* Gentle Scroll Prompt to the Memorial Program */}
      <div className="mt-4 flex flex-col items-center gap-1.5 text-center text-xs text-[#877971]">
        <span className="font-cinzel text-[10px] tracking-[0.25em] uppercase text-[#DEC596]/70">
          Order of Service & Tributes Below
        </span>
        <svg
          className="w-4 h-4 text-[#DEC596]/60 animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
