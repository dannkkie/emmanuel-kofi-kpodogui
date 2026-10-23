"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { MEMORIAL_DATA } from "@/data/brochureData";

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const filteredPhotos =
    activeCategory === "all"
      ? MEMORIAL_DATA.galleryPhotos
      : MEMORIAL_DATA.galleryPhotos.filter((p) => p.category === activeCategory);

  const openLightbox = (photoId: string) => {
    const idx = filteredPhotos.findIndex((p) => p.id === photoId);
    if (idx !== -1) setSelectedPhotoIndex(idx);
  };

  const closeLightbox = () => setSelectedPhotoIndex(null);

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null && selectedPhotoIndex < filteredPhotos.length - 1) {
      setSelectedPhotoIndex(selectedPhotoIndex + 1);
    }
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null && selectedPhotoIndex > 0) {
      setSelectedPhotoIndex(selectedPhotoIndex - 1);
    }
  };

  return (
    <div className="w-full max-w-[430px] mx-auto px-4 py-6 space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="text-center space-y-1">
        <span className="text-[10px] uppercase font-cinzel tracking-[0.3em] text-[#877971]">
          Cherished Moments
        </span>
        <h2 className="text-2xl font-cinzel font-bold text-[#DEC596] tracking-wide">
          Photo Gallery
        </h2>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#DEC596]/60 to-transparent mx-auto mt-2" />
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {MEMORIAL_DATA.galleryCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              setSelectedPhotoIndex(null);
            }}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-cinzel transition-all ${
              activeCategory === cat.id
                ? "bg-[#B48836] text-[#050505] font-bold shadow-md"
                : "bg-[#141414] text-[#877971] hover:text-[#DEC596] border border-white/5"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {filteredPhotos.map((photo) => (
          <div
            key={photo.id}
            onClick={() => openLightbox(photo.id)}
            className="group relative aspect-square rounded-xl overflow-hidden bg-[#141414] border border-[#DEC596]/15 hover:border-[#DEC596]/50 cursor-pointer shadow-md transition-all active:scale-95"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 430px) 50vw, 200px"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
              <span className="text-[10px] text-[#DEC596] font-caladea truncate">
                {photo.caption || photo.alt}
              </span>
            </div>
            <div className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/60 text-[#DEC596] opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn className="w-3 h-3" />
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {selectedPhotoIndex !== null && filteredPhotos[selectedPhotoIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in duration-200 select-none"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white rounded-full bg-black/50 transition-colors z-20"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev Photo */}
          {selectedPhotoIndex > 0 && (
            <button
              onClick={prevPhoto}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 text-[#DEC596] hover:bg-[#DEC596] hover:text-black border border-[#DEC596]/30 shadow-xl transition-all z-20"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Current Photo */}
          <div
            className="relative w-full max-w-md max-h-[80vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full aspect-square sm:aspect-[4/5] rounded-2xl overflow-hidden border border-[#DEC596]/30 shadow-2xl bg-black">
              <Image
                src={filteredPhotos[selectedPhotoIndex].src}
                alt={filteredPhotos[selectedPhotoIndex].alt}
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-contain"
                priority
              />
            </div>
            {filteredPhotos[selectedPhotoIndex].caption && (
              <p className="text-xs text-[#DEC596] font-caladea mt-3 text-center px-4">
                {filteredPhotos[selectedPhotoIndex].caption}
              </p>
            )}
            <span className="text-[10px] text-[#877971] font-mono mt-1">
              {selectedPhotoIndex + 1} of {filteredPhotos.length}
            </span>
          </div>

          {/* Next Photo */}
          {selectedPhotoIndex < filteredPhotos.length - 1 && (
            <button
              onClick={nextPhoto}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 text-[#DEC596] hover:bg-[#DEC596] hover:text-black border border-[#DEC596]/30 shadow-xl transition-all z-20"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
