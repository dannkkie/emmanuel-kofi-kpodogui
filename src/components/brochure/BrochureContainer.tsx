"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, Smartphone, Share2, Download } from "lucide-react";
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
  const [viewMode, setViewMode] = useState<"brochure" | "reader">("brochure");
  const [activeTab, setActiveTab] = useState<BrochureTab>("cover");
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState<boolean>(false);
  const [calendarInitialTab, setCalendarInitialTab] = useState<"calendar" | "venue">("calendar");

  const openCalendar = () => {
    setCalendarInitialTab("calendar");
    setIsCalendarModalOpen(true);
  };

  const openVenue = () => {
    setCalendarInitialTab("venue");
    setIsCalendarModalOpen(true);
  };

  const navigateToSection = (tab: BrochureTab) => {
    setViewMode("reader");
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen w-full bg-[#030303] flex flex-col items-center justify-start md:justify-center md:py-8 md:px-4 font-caladea text-[#DEC596]">
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

      {/* Floating Mode Switcher (Brochure Mode vs Reader Mode) */}
      <div className="sticky top-2 z-40 mb-2 px-2">
        <div className="flex items-center gap-1 p-1 rounded-full bg-[#0A0A0A]/90 border border-[#DEC596]/30 shadow-xl backdrop-blur-md">
          <button
            onClick={() => {
              setViewMode("brochure");
              setActiveTab("cover");
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-cinzel tracking-wider transition-all ${
              viewMode === "brochure"
                ? "bg-[#DEC596] text-black font-bold shadow-md"
                : "text-[#877971] hover:text-[#DEC596]"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Brochure View</span>
          </button>

          <button
            onClick={() => setViewMode("reader")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-cinzel tracking-wider transition-all ${
              viewMode === "reader"
                ? "bg-[#DEC596] text-black font-bold shadow-md"
                : "text-[#877971] hover:text-[#DEC596]"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Reader Mode</span>
          </button>
        </div>
      </div>

      {/* Main Viewport Container (max-w-[430px] mx-auto min-h-dvh) with subtle gold border illumination */}
      <div className="relative w-full max-w-[430px] min-h-dvh md:min-h-[850px] md:max-h-[92vh] md:rounded-3xl bg-[#050505] md:border border-[#DEC596]/15 md:shadow-2xl flex flex-col overflow-y-auto no-scrollbar">
        {/* Content based on Active Mode & Tab */}
        <main className="flex-1 w-full flex flex-col">
          {viewMode === "brochure" ? (
            /* EXACT REPLICA VIEW (BROCHURE MODE): Clean, pristine, native 418/598 aspect ratio */
            <div className="w-full flex-1 flex flex-col items-center justify-center">
              <CoverPage
                mode="brochure"
                onOpenBiography={() => navigateToSection("biography")}
                onOpenCalendar={openCalendar}
                onOpenVenue={openVenue}
                onOpenShareModal={() => setIsShareModalOpen(true)}
              />
            </div>
          ) : (
            /* INTERACTIVE MOBILE EXPERIENCE (READER MODE): Tabbed memorial portal */
            <div className="w-full flex-1 flex flex-col pb-20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="w-full flex-1"
                >
                  {activeTab === "cover" && (
                    <CoverPage
                      mode="reader"
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
            </div>
          )}
        </main>

        {/* Sticky Glassmorphic Bottom Navigation Bar (Active in Reader Mode) */}
        {viewMode === "reader" && (
          <BottomNav activeTab={activeTab} onTabChange={(tab) => setActiveTab(tab)} />
        )}

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

      {/* Desktop Companion Footer */}
      <div className="hidden md:flex items-center gap-4 text-[11px] text-[#877971] mt-3 font-cinzel tracking-wider">
        <span>Ex-WO1 Emmanuel Kofi Kpodogui (1954 – 2026)</span>
        <span>•</span>
        <button
          onClick={() => setIsShareModalOpen(true)}
          className="text-[#DEC596] hover:underline flex items-center gap-1"
        >
          <Share2 className="w-3 h-3 text-[#B48836]" />
          <span>Keepsake QR Code</span>
        </button>
        <span>•</span>
        <a
          href={brochureData.honoree.pdfDownloadUrl}
          download="Ex-WO1-Emmanuel-Kofi-Kpodogui-Brochure.pdf"
          className="text-[#DEC596] hover:underline flex items-center gap-1"
        >
          <Download className="w-3 h-3 text-[#B48836]" />
          <span>Download PDF</span>
        </a>
      </div>
    </div>
  );
}
