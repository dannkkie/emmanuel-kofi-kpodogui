"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, FolderPlus } from "lucide-react";
import { FUNERAL_DATA } from "@/data/funeralData";

export function PhotoGallerySection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: "all", label: "All Photos" },
    { id: "military", label: "Military Honours" },
    { id: "family", label: "Family & Loved Ones" },
    { id: "traditional", label: "Ceremonial & Cultural" },
    { id: "golden", label: "Golden Years" },
  ];

  const filteredPhotos = FUNERAL_DATA.galleryPhotos.filter(
    (photo) => selectedCategory === "all" || photo.category === selectedCategory
  );

  useEffect(() => {
    if (activeLightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeLightboxIndex]);

  const openLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const nextPhoto = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % filteredPhotos.length);
    }
  };

  const prevPhoto = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex(
        (activeLightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length
      );
    }
  };

  return (
    <section id="gallery" className="py-16 sm:py-24 px-4 bg-zinc-950 border-t border-zinc-900">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-xs uppercase tracking-[0.25em] text-amber-400 font-medium">
            Cherished Memories in Pictures
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-zinc-100 font-bold mt-2">
            Photo Gallery & Milestones
          </h2>
          <div className="w-16 h-0.5 bg-amber-500/60 mx-auto mt-3 rounded-full" />
          <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto mt-3">
            Moments capturing the valor, smiles, family warmth, and 72-year journey of Ex-WO1 Emmanuel Kofi Kpodogui.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                  : "bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {filteredPhotos.map((photo, idx) => (
            <div
              key={photo.id}
              onClick={() => openLightbox(idx)}
              className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-amber-500/40 cursor-pointer shadow-lg transition-all"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src !== FUNERAL_DATA.deceased.coverImage) {
                    target.src = FUNERAL_DATA.deceased.coverImage;
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

              <div className="absolute bottom-0 inset-x-0 p-3 text-left">
                {photo.year && (
                  <span className="text-[10px] font-mono text-amber-400/90 font-bold block">
                    {photo.year}
                  </span>
                )}
                <p className="text-xs font-medium text-zinc-100 truncate group-hover:text-amber-200">
                  {photo.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Instructions for Adding More Photos */}
        <div className="mt-10 p-4 rounded-xl bg-zinc-900/40 border border-dashed border-zinc-800 flex items-center justify-between gap-3 text-xs text-zinc-400">
          <div className="flex items-center gap-2.5">
            <FolderPlus className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              To add additional pictures, drop your JPG/WebP files into{" "}
              <code className="text-amber-300 font-mono text-[11px] bg-black/40 px-1.5 py-0.5 rounded">
                public/images/gallery/
              </code>
            </span>
          </div>
          <span className="hidden sm:inline-block text-[11px] text-zinc-500">
            Auto-optimized on static build
          </span>
        </div>

        {/* Lightbox Modal */}
        {activeLightboxIndex !== null && (
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-2 rounded-full bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-700"
              aria-label="Close photo preview"
            >
              <X className="w-5 h-5" />
            </button>

            <button
              onClick={prevPhoto}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-zinc-900/80 text-zinc-300 hover:text-white border border-zinc-700"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextPhoto}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-zinc-900/80 text-zinc-300 hover:text-white border border-zinc-700"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="max-w-2xl max-h-[85vh] flex flex-col items-center">
              <div className="relative w-[85vw] max-w-lg aspect-[3/4] max-h-[70vh]">
                <Image
                  src={filteredPhotos[activeLightboxIndex].src}
                  alt={filteredPhotos[activeLightboxIndex].alt}
                  fill
                  className="object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src !== FUNERAL_DATA.deceased.coverImage) {
                      target.src = FUNERAL_DATA.deceased.coverImage;
                    }
                  }}
                />
              </div>
              <div className="text-center mt-4">
                <p className="text-sm font-semibold text-zinc-100">
                  {filteredPhotos[activeLightboxIndex].title}
                </p>
                {filteredPhotos[activeLightboxIndex].year && (
                  <p className="text-xs text-amber-400 mt-0.5">
                    {filteredPhotos[activeLightboxIndex].year}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
