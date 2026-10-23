"use client";

import { useState, useRef } from "react";
import { BookOpen, ListOrdered, Award, Heart, Images, Share2, Download, ArrowUp } from "lucide-react";
import CoverPage from "./CoverPage";
import OrderOfServiceSection from "./OrderOfServiceSection";
import BiographySection from "./BiographySection";
import TributesSection from "./TributesSection";
import GallerySection from "./GallerySection";
import ShareKeepsakeModal from "./ShareKeepsakeModal";
import CalendarVenueModal from "./CalendarVenueModal";
import { brochureData } from "@/data/brochureData";

export default function BrochureContainer() {
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState<boolean>(false);
  const [calendarInitialTab, setCalendarInitialTab] = useState<"calendar" | "venue">("calendar");

  const coverRef = useRef<HTMLDivElement>(null);
  const serviceRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const tributesRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const openCalendar = () => {
    setCalendarInitialTab("calendar");
    setIsCalendarModalOpen(true);
  };

  const openVenue = () => {
    setCalendarInitialTab("venue");
    setIsCalendarModalOpen(true);
  };

  return (
    <div className="min-h-screen w-full bg-[#050505] text-[#DEC596] font-caladea flex flex-col items-center selection:bg-[#DEC596]/30">
      {/* SECTION 1: Exact Replica Cover (Pristine, 100% Faithful to PDF) */}
      <div ref={coverRef} className="w-full flex justify-center">
        <CoverPage
          onOpenBiography={() => scrollTo(bioRef)}
          onOpenCalendar={openCalendar}
          onOpenVenue={openVenue}
          onOpenShareModal={() => setIsShareModalOpen(true)}
        />
      </div>

      {/* SECTIONS CONTAINER: Elegant, readable flow for mobile and desktop */}
      <div className="w-full max-w-2xl px-3 sm:px-6 py-10 space-y-16 pb-28">
        {/* Quick Venue & Date Highlight Card */}
        <div className="p-5 rounded-2xl bg-[#0D0D0D] border border-[#DEC596]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <div className="text-[10px] uppercase font-cinzel text-[#B48836] tracking-widest">
              Service Details
            </div>
            <div className="text-sm sm:text-base font-cinzel font-semibold text-[#DEC596]">
              {brochureData.service.dateDisplay}
            </div>
            <div className="text-xs text-[#877971] mt-0.5">
              {brochureData.service.venueName}, {brochureData.service.venueAddress}
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={openCalendar}
              className="px-3.5 py-2 rounded-xl bg-[#1A1813] border border-[#DEC596]/30 text-xs font-cinzel text-[#DEC596] hover:bg-[#25221B] transition-colors"
            >
              Add to Calendar
            </button>
            <button
              onClick={openVenue}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#B48836] via-[#DEC596] to-[#AD8330] text-black font-semibold text-xs font-cinzel hover:brightness-110 transition-all"
            >
              Directions
            </button>
          </div>
        </div>

        {/* SECTION 2: Order of Service & Sing-along Hymns */}
        <div ref={serviceRef} className="scroll-mt-6">
          <OrderOfServiceSection />
        </div>

        {/* SECTION 3: Biography & Military Career of Ex-WO1 */}
        <div ref={bioRef} className="scroll-mt-6">
          <BiographySection />
        </div>

        {/* SECTION 4: Tributes & Interactive Candle Lighting */}
        <div ref={tributesRef} className="scroll-mt-6">
          <TributesSection />
        </div>

        {/* SECTION 5: Photo Gallery */}
        <div ref={galleryRef} className="scroll-mt-6">
          <GallerySection />
        </div>
      </div>

      {/* Floating Low-Profile Navigation Pill (Discreet, unobtrusive) */}
      <nav
        aria-label="Quick memorial navigation"
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1.5 p-1.5 rounded-full bg-[#0A0A0A]/95 border border-[#DEC596]/30 shadow-[0_10px_35px_rgba(0,0,0,0.9)] backdrop-blur-md max-w-[95vw]"
      >
        <button
          onClick={() => scrollTo(coverRef)}
          title="Brochure Cover"
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] font-cinzel text-[#877971] hover:text-[#DEC596] hover:bg-white/5 transition-colors"
        >
          <BookOpen className="w-3.5 h-3.5 text-[#B48836]" />
          <span className="hidden sm:inline">Cover</span>
        </button>

        <button
          onClick={() => scrollTo(serviceRef)}
          title="Order of Service"
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] font-cinzel text-[#877971] hover:text-[#DEC596] hover:bg-white/5 transition-colors"
        >
          <ListOrdered className="w-3.5 h-3.5 text-[#B48836]" />
          <span className="hidden sm:inline">Service</span>
        </button>

        <button
          onClick={() => scrollTo(bioRef)}
          title="Biography"
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] font-cinzel text-[#877971] hover:text-[#DEC596] hover:bg-white/5 transition-colors"
        >
          <Award className="w-3.5 h-3.5 text-[#B48836]" />
          <span className="hidden sm:inline">Biography</span>
        </button>

        <button
          onClick={() => scrollTo(tributesRef)}
          title="Tributes & Light a Candle"
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] font-cinzel text-[#877971] hover:text-[#DEC596] hover:bg-white/5 transition-colors"
        >
          <Heart className="w-3.5 h-3.5 text-[#B48836]" />
          <span className="hidden sm:inline">Tributes</span>
        </button>

        <button
          onClick={() => scrollTo(galleryRef)}
          title="Photo Gallery"
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] font-cinzel text-[#877971] hover:text-[#DEC596] hover:bg-white/5 transition-colors"
        >
          <Images className="w-3.5 h-3.5 text-[#B48836]" />
          <span className="hidden sm:inline">Gallery</span>
        </button>

        <div className="w-[1px] h-4 bg-[#DEC596]/20 mx-0.5" />

        <button
          onClick={() => setIsShareModalOpen(true)}
          title="Share & QR Code"
          className="p-1.5 rounded-full bg-[#1A1813] border border-[#DEC596]/30 text-[#DEC596] hover:bg-[#25221B] transition-colors"
        >
          <Share2 className="w-3.5 h-3.5 text-[#B48836]" />
        </button>

        <a
          href={brochureData.honoree.pdfDownloadUrl}
          download="Ex-WO1-Emmanuel-Kofi-Kpodogui-Brochure.pdf"
          title="Download PDF"
          className="p-1.5 rounded-full bg-white/5 text-[#877971] hover:text-[#DEC596] transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
        </a>

        <button
          onClick={() => scrollTo(coverRef)}
          title="Back to Top"
          className="p-1.5 rounded-full bg-white/5 text-[#877971] hover:text-[#DEC596] transition-colors"
        >
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </nav>

      {/* Interactive Modals */}
      <ShareKeepsakeModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />

      <CalendarVenueModal
        isOpen={isCalendarModalOpen}
        onClose={() => setIsCalendarModalOpen(false)}
        initialTab={calendarInitialTab}
      />
    </div>
  );
}
