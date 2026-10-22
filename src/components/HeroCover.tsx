"use client";

import Image from "next/image";
import { Calendar, MapPin, BookOpen, Heart, ArrowDown } from "lucide-react";
import { FUNERAL_DATA } from "@/data/funeralData";
import { downloadFuneralCalendarEvent } from "@/lib/calendar";

export function HeroCover() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -60;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section id="cover" className="relative min-h-[92vh] flex flex-col items-center justify-between px-4 py-8 sm:py-12 bg-black overflow-hidden">
      {/* Radiant ambient gold glow behind portrait */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] sm:w-[500px] sm:h-[500px] bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Spaced Header from Brochure */}
      <div className="relative z-10 text-center mb-4 sm:mb-6 animate-fade-in">
        <p className="text-xs sm:text-sm md:text-base font-light tracking-[0.35em] text-amber-200/90 uppercase">
          F O R E V E R &nbsp; I N &nbsp; O U R &nbsp; H E A R T S
        </p>
      </div>

      {/* Main Brochure Portrait Card */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto flex flex-col items-center">
        <div className="relative group w-full rounded-2xl overflow-hidden border border-amber-500/25 shadow-[0_0_50px_rgba(212,175,55,0.15)] bg-zinc-950">
          <Image
            src={FUNERAL_DATA.deceased.coverImage}
            alt="Funeral brochure cover: In Loving Memory of Ex-WO1 Emmanuel Kofi Kpodogui (1954 - 2026), A.K.A Ago Die"
            width={715}
            height={1024}
            priority
            placeholder="blur"
            blurDataURL="data:image/webp;base64,UklGRmAAAABXRUJQVlA4TFMAAAAvB0AAAAcQ/Ue2ZJm9j1t5zL+/b5i2rUkd5V+e2Z/Q7g4m7v8Yx4zQ0ZkU13o2Z/o7b8bM5s35f992z+fU6b9e/317/s+e7V3Z3Y82672/8Qc="
            className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.01]"
          />
        </div>

        {/* Quick Date and Church Tagline directly beneath portrait */}
        <div className="mt-5 text-center">
          <p className="text-sm sm:text-base font-serif text-amber-100 font-medium tracking-wide">
            {FUNERAL_DATA.service.dateFormatted}
          </p>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 flex items-center justify-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-amber-400 inline shrink-0" />
            {FUNERAL_DATA.service.venue}, {FUNERAL_DATA.service.location}
          </p>
        </div>
      </div>

      {/* Action Navigation Buttons */}
      <div className="relative z-10 w-full max-w-md mx-auto mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 text-center">
        <button
          onClick={() => scrollTo("programme")}
          className="flex flex-col items-center justify-center p-3 rounded-xl bg-zinc-900/90 border border-amber-500/30 text-amber-300 hover:bg-zinc-800 transition-all hover:border-amber-400 active:scale-95 shadow-md"
        >
          <BookOpen className="w-5 h-5 mb-1.5 text-amber-400" />
          <span className="text-xs font-medium">Order of Service</span>
        </button>

        <button
          onClick={() => scrollTo("tributes")}
          className="flex flex-col items-center justify-center p-3 rounded-xl bg-zinc-900/90 border border-amber-500/30 text-amber-300 hover:bg-zinc-800 transition-all hover:border-amber-400 active:scale-95 shadow-md"
        >
          <Heart className="w-5 h-5 mb-1.5 text-amber-400" />
          <span className="text-xs font-medium">Read Tributes</span>
        </button>

        <button
          onClick={downloadFuneralCalendarEvent}
          className="flex flex-col items-center justify-center p-3 rounded-xl bg-zinc-900/90 border border-amber-500/30 text-amber-300 hover:bg-zinc-800 transition-all hover:border-amber-400 active:scale-95 shadow-md"
        >
          <Calendar className="w-5 h-5 mb-1.5 text-amber-400" />
          <span className="text-xs font-medium">Add to Calendar</span>
        </button>

        <button
          onClick={() => scrollTo("venue")}
          className="flex flex-col items-center justify-center p-3 rounded-xl bg-zinc-900/90 border border-amber-500/30 text-amber-300 hover:bg-zinc-800 transition-all hover:border-amber-400 active:scale-95 shadow-md"
        >
          <MapPin className="w-5 h-5 mb-1.5 text-amber-400" />
          <span className="text-xs font-medium">Directions</span>
        </button>
      </div>

      {/* Gentle Scroll Prompt */}
      <button
        onClick={() => scrollTo("programme")}
        className="mt-6 sm:mt-8 flex items-center gap-1.5 text-xs text-zinc-400 hover:text-amber-300 transition-colors animate-bounce"
        aria-label="Scroll to explore brochure"
      >
        <span>Explore Funeral Brochure</span>
        <ArrowDown className="w-3.5 h-3.5" />
      </button>
    </section>
  );
}
