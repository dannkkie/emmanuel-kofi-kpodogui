"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Share2, Download } from "lucide-react";
import CoverPage from "./CoverPage";
import OrderOfServiceSection from "./OrderOfServiceSection";
import BiographySection from "./BiographySection";
import TributesSection from "./TributesSection";
import GallerySection from "./GallerySection";
import BottomNav, { BrochureTab } from "./BottomNav";
import ShareKeepsakeModal from "./ShareKeepsakeModal";
import CalendarVenueModal from "./CalendarVenueModal";
import { brochureData } from "@/data/brochureData";

export default function BrochureContainer() {
  const [activeTab, setActiveTab] = useState<BrochureTab>("cover");
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState<boolean>(false);
  const [calendarInitialTab, setCalendarInitialTab] = useState<"calendar" | "venue">("calendar");

  const touchStartX = useRef<number | null>(null);

  const tabsOrder: BrochureTab[] = ["cover", "service", "biography", "tributes", "gallery"];

  // Touch Swipe for mobile page turn
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    const currentIndex = tabsOrder.indexOf(activeTab);

    // Swipe threshold 65px
    if (diff > 65 && currentIndex < tabsOrder.length - 1) {
      setActiveTab(tabsOrder[currentIndex + 1]);
    } else if (diff < -65 && currentIndex > 0) {
      setActiveTab(tabsOrder[currentIndex - 1]);
    }

    touchStartX.current = null;
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
    <div className="min-h-dvh w-full bg-[#030303] flex flex-col items-center justify-start md:justify-center md:py-8 md:px-4 font-caladea text-[#DEC596]">
      {/* Desktop Ambient Background Accents */}
      <div className="fixed inset-0 pointer-events-none hidden md:block overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(180,136,54,0.08)_0%,transparent_70%)]" />
        <div className="absolute top-10 left-10 text-xs font-cinzel text-[#877971]/40 tracking-widest uppercase">
          Burma Camp • Accra • 1954 – 2026
        </div>
        <div className="absolute top-10 right-10 text-xs font-cinzel text-[#877971]/40 tracking-widest uppercase">
          Garrison Methodist & Presbyterian Church
        </div>
      </div>

      {/* Main Mobile-First Frame */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative w-full max-w-[430px] min-h-dvh md:min-h-[880px] md:max-h-[92vh] md:rounded-[36px] bg-[#050505] md:border border-[#DEC596]/20 md:shadow-[0_0_60px_rgba(180,136,54,0.12)] flex flex-col overflow-y-auto no-scrollbar pb-20"
      >
        {/* Subtle Top Status Bar / Header */}
        <header className="sticky top-0 z-30 w-full px-4 py-2.5 bg-[#050505]/95 backdrop-blur-md border-b border-[#DEC596]/15 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B48836] animate-pulse" />
            <h1 className="font-cinzel text-[11px] font-bold tracking-wider text-[#DEC596] truncate max-w-[240px]">
              {brochureData.honoree.rank} {brochureData.honoree.fullName}
            </h1>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsShareModalOpen(true)}
              aria-label="Share digital brochure"
              className="p-1.5 rounded-full hover:bg-white/5 text-[#DEC596] transition-colors"
            >
              <Share2 className="w-3.5 h-3.5 text-[#B48836]" />
            </button>
            <a
              href={brochureData.honoree.pdfDownloadUrl}
              download="Ex-WO1-Emmanuel-Kofi-Kpodogui-Brochure.pdf"
              title="Download PDF"
              aria-label="Download official PDF brochure"
              className="p-1.5 rounded-full hover:bg-white/5 text-[#877971] hover:text-[#DEC596] transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
            </a>
          </div>
        </header>

        {/* Section Router Views with Smooth Transition */}
        <main className="flex-1 w-full flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="w-full flex-1 flex flex-col"
            >
              {activeTab === "cover" && (
                <CoverPage
                  onOpenBiography={() => setActiveTab("biography")}
                  onOpenCalendar={openCalendar}
                  onOpenVenue={openVenue}
                  onOpenShareModal={() => setIsShareModalOpen(true)}
                />
              )}

              {activeTab === "service" && <OrderOfServiceSection />}

              {activeTab === "biography" && <BiographySection />}

              {activeTab === "tributes" && <TributesSection />}

              {activeTab === "gallery" && <GallerySection />}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Sticky Glassmorphic Bottom Thumb Navigation */}
        <BottomNav activeTab={activeTab} onTabChange={(tab) => setActiveTab(tab)} />

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

      {/* Desktop Footer Companion Note */}
      <div className="hidden md:flex items-center gap-4 text-[11px] text-[#877971] mt-4 font-cinzel tracking-wider">
        <span>Memorial App for Ex-WO1 Emmanuel Kofi Kpodogui (1954 – 2026)</span>
        <span>•</span>
        <button
          onClick={() => setIsShareModalOpen(true)}
          className="text-[#DEC596] hover:underline flex items-center gap-1"
        >
          <Share2 className="w-3 h-3 text-[#B48836]" />
          <span>Keepsake QR Code</span>
        </button>
      </div>
    </div>
  );
}
