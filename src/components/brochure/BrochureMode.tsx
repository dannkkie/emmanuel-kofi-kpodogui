"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  BookOpen,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  X,
} from "lucide-react";
import { MEMORIAL_DATA } from "@/data/brochureData";

interface BrochureModeProps {
  onClose: () => void;
  initialPage?: number;
}

export const BrochureMode: React.FC<BrochureModeProps> = ({
  onClose,
  initialPage = 1,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const totalPages = MEMORIAL_DATA.brochurePages.length;
  const currentPageData = MEMORIAL_DATA.brochurePages[currentPage - 1];

  const goToNextPage = useCallback(() => {
    setCurrentPage((prev) => {
      if (prev < totalPages) {
        setZoomLevel(1);
        return prev + 1;
      }
      return prev;
    });
  }, [totalPages]);

  const goToPrevPage = useCallback(() => {
    setCurrentPage((prev) => {
      if (prev > 1) {
        setZoomLevel(1);
        return prev - 1;
      }
      return prev;
    });
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goToNextPage();
      if (e.key === "ArrowLeft") goToPrevPage();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNextPage, goToPrevPage, onClose]);

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 40 && zoomLevel === 1) {
      if (diff > 0) goToNextPage();
      else goToPrevPage();
    }
    touchStartX.current = null;
  };

  const toggleZoom = () => {
    setZoomLevel((prev) => (prev === 1 ? 1.8 : 1));
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full min-h-dvh flex flex-col bg-[#050505] text-[#ededed] pb-12 ${
        isFullscreen ? "fixed inset-0 z-50 p-2 sm:p-4" : ""
      }`}
    >
      {/* Top Header Controls */}
      <div className="w-full max-w-[430px] mx-auto flex items-center justify-between py-2.5 px-3 border-b border-[#DEC596]/15 bg-[#0a0a0a]/90 backdrop-blur-md sticky top-0 z-30">
        <button
          onClick={onClose}
          className="flex items-center gap-1 py-1.5 px-2.5 rounded-lg bg-[#141414] hover:bg-[#202020] text-[#DEC596] text-xs font-cinzel transition-colors"
        >
          <BookOpen className="w-3.5 h-3.5" />
          Reader Mode
        </button>

        <div className="flex flex-col items-center">
          <span className="text-xs font-cinzel font-bold text-[#DEC596]">
            Page {currentPage} of {totalPages}
          </span>
          <span className="text-[10px] text-[#877971] truncate max-w-[170px]">
            {currentPageData?.title}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={toggleZoom}
            className="p-1.5 rounded-lg bg-[#141414] text-[#877971] hover:text-[#DEC596] transition-colors"
            title="Toggle Zoom"
          >
            {zoomLevel > 1 ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-lg bg-[#141414] text-[#877971] hover:text-[#DEC596] transition-colors"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#141414] text-[#877971] hover:text-white transition-colors"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Page Viewer Frame */}
      <div
        className="flex-1 w-full max-w-[430px] mx-auto flex items-center justify-center p-2 relative overflow-hidden select-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="relative w-full aspect-[418/598] rounded-xl overflow-hidden border border-[#DEC596]/20 shadow-2xl bg-black transition-transform duration-300 ease-out"
          style={{
            transform: `scale(${zoomLevel})`,
            cursor: zoomLevel > 1 ? "grab" : "default",
          }}
        >
          <Image
            src={currentPageData?.image || `/brochure/page-${currentPage}.webp`}
            alt={`Brochure Page ${currentPage}: ${currentPageData?.title}`}
            fill
            sizes="(max-width: 430px) 100vw, 430px"
            priority={currentPage <= 3}
            className="object-contain"
          />
        </div>

        {/* Floating Quick Prev / Next Buttons */}
        {currentPage > 1 && (
          <button
            onClick={goToPrevPage}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-[#DEC596] text-[#DEC596] hover:text-black border border-[#DEC596]/30 shadow-xl transition-all active:scale-95"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {currentPage < totalPages && (
          <button
            onClick={goToNextPage}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-[#DEC596] text-[#DEC596] hover:text-black border border-[#DEC596]/30 shadow-xl transition-all active:scale-95"
            aria-label="Next page"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Bottom Page Navigation Controls */}
      <div className="w-full max-w-[430px] mx-auto px-3 py-2 flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className="flex-1 py-2 px-3 rounded-xl bg-[#141414] hover:bg-[#202020] disabled:opacity-30 disabled:pointer-events-none text-[#DEC596] text-xs font-cinzel uppercase tracking-wider flex items-center justify-center gap-1 border border-[#DEC596]/20 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          {/* Quick Page Jump Select */}
          <select
            value={currentPage}
            onChange={(e) => {
              setCurrentPage(Number(e.target.value));
              setZoomLevel(1);
            }}
            className="py-2 px-2.5 rounded-xl bg-[#141414] border border-[#DEC596]/20 text-[#DEC596] text-xs font-cinzel text-center focus:outline-none"
          >
            {MEMORIAL_DATA.brochurePages.map((p) => (
              <option key={p.pageNumber} value={p.pageNumber} className="bg-[#0c0c0c] text-white">
                Page {p.pageNumber}: {p.title}
              </option>
            ))}
          </select>

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="flex-1 py-2 px-3 rounded-xl bg-[#141414] hover:bg-[#202020] disabled:opacity-30 disabled:pointer-events-none text-[#DEC596] text-xs font-cinzel uppercase tracking-wider flex items-center justify-center gap-1 border border-[#DEC596]/20 transition-colors"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Thumbnail scrubber */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-2 scrollbar-thin">
          {MEMORIAL_DATA.brochurePages.map((p) => (
            <button
              key={p.pageNumber}
              onClick={() => {
                setCurrentPage(p.pageNumber);
                setZoomLevel(1);
              }}
              className={`shrink-0 w-8 h-12 rounded border transition-all relative overflow-hidden ${
                currentPage === p.pageNumber
                  ? "border-[#DEC596] ring-2 ring-[#DEC596]/40 scale-105"
                  : "border-white/10 opacity-50 hover:opacity-100"
              }`}
            >
              <Image
                src={p.image}
                alt={`Thumbnail ${p.pageNumber}`}
                fill
                sizes="32px"
                className="object-cover"
              />
              <span className="absolute bottom-0 inset-x-0 bg-black/80 text-[8px] text-white text-center font-mono">
                {p.pageNumber}
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs pt-1 border-t border-white/5">
          <span className="text-[11px] text-[#877971]">
            Tip: Swipe left/right or tap arrows to flip pages.
          </span>
          <a
            href="/web-brochure.pdf"
            download="Ex-WO1-Emmanuel-Kofi-Kpodogui-Memorial.pdf"
            className="flex items-center gap-1 text-[#DEC596] hover:underline text-[11px]"
          >
            <Download className="w-3 h-3" />
            Download PDF
          </a>
        </div>
      </div>
    </div>
  );
};
