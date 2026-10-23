"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { brochureData } from "@/data/brochureData";

export default function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ["All", "Memorial", "Military", "Tradition"];

  const filteredPhotos =
    selectedCategory === "All"
      ? brochureData.gallery
      : brochureData.gallery.filter((p) => p.category === selectedCategory);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : filteredPhotos.length - 1));
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev! < filteredPhotos.length - 1 ? prev! + 1 : 0));
    }
  };

  return (
    <div className="w-full flex flex-col p-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-1.5 border-b border-[#DEC596]/15 pb-4">
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#B48836] font-cinzel">
          Visual Memories & Honors
        </span>
        <h2 className="font-cinzel text-xl font-bold text-[#DEC596] tracking-wide">
          Photo Gallery
        </h2>
        <p className="text-xs text-[#877971] font-caladea max-w-xs mx-auto">
          Honouring the service, traditional elegance, and cherished moments of Ex-WO1 Emmanuel Kofi Kpodogui.
        </p>
      </div>

      {/* Category Filter Chips */}
      <div className="flex justify-center gap-1.5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs transition-all ${
              selectedCategory === cat
                ? "bg-[#DEC596] text-black font-semibold shadow-sm"
                : "bg-[#121212] border border-white/5 text-[#877971] hover:text-[#DEC596]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Responsive Gallery Grid */}
      <div className="grid grid-cols-2 gap-3">
        {filteredPhotos.map((photo, index) => (
          <div
            key={photo.id}
            onClick={() => setLightboxIndex(index)}
            className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-[#121212] border border-[#DEC596]/20 cursor-pointer shadow-md"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 430px) 50vw, 200px"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity flex flex-col justify-end p-2.5">
              <span className="text-[10px] font-cinzel text-[#DEC596] font-semibold line-clamp-2 leading-tight">
                {photo.caption}
              </span>
              <span className="text-[9px] text-[#B48836] mt-0.5 uppercase tracking-wider">
                {photo.category}
              </span>
            </div>
            <div className="absolute top-2 right-2 p-1 rounded-full bg-black/60 text-[#DEC596] opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn className="w-3.5 h-3.5" />
            </div>
          </div>
        ))}
      </div>

      {/* Full-screen Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && filteredPhotos[lightboxIndex] && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/95 backdrop-blur-xl">
            {/* Top Close & Counter Bar */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs text-[#DEC596] z-20">
              <span className="font-mono text-xs text-[#877971]">
                {lightboxIndex + 1} / {filteredPhotos.length}
              </span>
              <button
                onClick={() => setLightboxIndex(null)}
                className="rounded-full p-2 text-[#877971] hover:text-[#DEC596] bg-white/10"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Left Nav */}
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 border border-[#DEC596]/30 text-[#DEC596] hover:bg-black/90 z-20"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Right Nav */}
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 border border-[#DEC596]/30 text-[#DEC596] hover:bg-black/90 z-20"
              aria-label="Next photo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Active Image Container */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-sm w-full max-h-[75vh] flex flex-col items-center"
            >
              <div className="relative w-full aspect-[418/598] max-h-[60vh] rounded-2xl overflow-hidden border border-[#DEC596]/30 shadow-2xl bg-black">
                <Image
                  src={filteredPhotos[lightboxIndex].src}
                  alt={filteredPhotos[lightboxIndex].alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>

              {/* Caption */}
              <div className="mt-4 text-center max-w-xs space-y-1">
                <p className="text-xs sm:text-sm text-[#DEC596] font-caladea leading-snug">
                  {filteredPhotos[lightboxIndex].caption}
                </p>
                <span className="text-[10px] text-[#B48836] uppercase tracking-wider font-cinzel block">
                  Category: {filteredPhotos[lightboxIndex].category}
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
