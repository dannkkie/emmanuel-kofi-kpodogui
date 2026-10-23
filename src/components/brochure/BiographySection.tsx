"use client";

import React from "react";
import Image from "next/image";
import { Award, Shield, Plane, Wrench, Heart, GraduationCap } from "lucide-react";
import { MEMORIAL_DATA } from "@/data/brochureData";

export const BiographySection: React.FC = () => {
  return (
    <div className="w-full max-w-[430px] mx-auto px-4 py-6 space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="text-center space-y-2">
        <span className="text-[10px] uppercase font-cinzel tracking-[0.3em] text-[#877971]">
          Life & Military Service
        </span>
        <h2 className="text-2xl font-cinzel font-bold text-[#DEC596] tracking-wide">
          Biography
        </h2>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#DEC596]/60 to-transparent mx-auto mt-2" />
        <blockquote className="pt-2 text-xs italic font-caladea text-[#877971] max-w-sm mx-auto leading-relaxed border-l-2 border-[#B48836]/40 pl-3">
          “I have fought the good fight, I have finished the race, I have kept the faith. Now there is in store for me the crown of righteousness...”
          <span className="block mt-1 font-sans text-[10px] not-italic text-[#DEC596] font-semibold">
            — 2 Timothy 4:7–8
          </span>
        </blockquote>
      </div>

      {/* Military Hero Profile Card */}
      <div className="rounded-2xl bg-gradient-to-b from-[#141414] to-[#0c0c0c] border border-[#DEC596]/30 p-5 shadow-2xl relative overflow-hidden">
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-24 rounded-xl overflow-hidden border border-[#DEC596]/40 shrink-0 shadow-md">
            <Image
              src="/biography/page_3_img_2.jpeg"
              alt="Ex-WO1 Emmanuel Kofi Kpodogui in Ghana Air Force Uniform"
              fill
              sizes="80px"
              className="object-cover object-top"
            />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-cinzel font-semibold tracking-wider text-[#B48836] bg-[#B48836]/15 px-2 py-0.5 rounded">
              Service No: 177288
            </span>
            <h3 className="text-base font-cinzel font-bold text-[#DEC596]">
              Ex-WO1 E. K. Kpodogui
            </h3>
            <p className="text-xs text-[#877971] font-caladea">
              A.K.A. <strong className="text-[#DEC596]">“Ago Die”</strong> • 1954 – 2026
            </p>
            <p className="text-[11px] text-[#cccccc] font-caladea">
              Engineering Wing • Ghana Air Force
            </p>
          </div>
        </div>

        {/* Career Badges Grid */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/5 text-center">
          <div className="p-2 rounded-xl bg-black/40 border border-white/5">
            <Shield className="w-3.5 h-3.5 mx-auto text-[#DEC596] mb-1" />
            <span className="block text-[10px] text-[#877971] uppercase">Rank</span>
            <span className="text-xs font-semibold text-[#ededed]">WO1</span>
          </div>
          <div className="p-2 rounded-xl bg-black/40 border border-white/5">
            <Plane className="w-3.5 h-3.5 mx-auto text-[#B48836] mb-1" />
            <span className="block text-[10px] text-[#877971] uppercase">Service</span>
            <span className="text-xs font-semibold text-[#ededed]">33 Years</span>
          </div>
          <div className="p-2 rounded-xl bg-black/40 border border-white/5">
            <Award className="w-3.5 h-3.5 mx-auto text-[#DEC596] mb-1" />
            <span className="block text-[10px] text-[#877971] uppercase">UN Missions</span>
            <span className="text-xs font-semibold text-[#ededed]">4 Medals</span>
          </div>
        </div>
      </div>

      {/* Chapters */}
      <div className="space-y-6">
        {MEMORIAL_DATA.biographyChapters.map((chapter, index) => {
          return (
            <div
              key={chapter.id}
              className="rounded-2xl bg-[#0c0c0c] border border-[#DEC596]/20 p-5 shadow-lg space-y-3 relative"
            >
              <div className="flex items-center justify-between border-b border-[#DEC596]/15 pb-2">
                <div>
                  <span className="text-[9px] font-mono text-[#B48836] uppercase tracking-widest">
                    Chapter 0{index + 1}
                  </span>
                  <h3 className="text-sm font-cinzel font-bold text-[#DEC596]">
                    {chapter.title}
                  </h3>
                </div>
                {chapter.id === "early-life" && <GraduationCap className="w-4 h-4 text-[#B48836]" />}
                {chapter.id === "military-career" && <Shield className="w-4 h-4 text-[#B48836]" />}
                {chapter.id === "technical-mastery" && <Wrench className="w-4 h-4 text-[#B48836]" />}
                {chapter.id === "peacekeeper" && <Award className="w-4 h-4 text-[#B48836]" />}
                {chapter.id === "scholar-patriarch" && <Heart className="w-4 h-4 text-[#B48836]" />}
              </div>

              {chapter.subtitle && (
                <p className="text-xs text-[#877971] font-caladea italic">
                  {chapter.subtitle}
                </p>
              )}

              {/* Chapter Photo if present */}
              {chapter.image && (
                <div className="relative w-full h-48 rounded-xl overflow-hidden border border-[#DEC596]/20 my-3 shadow-inner">
                  <Image
                    src={chapter.image}
                    alt={chapter.title}
                    fill
                    sizes="(max-width: 430px) 100vw, 430px"
                    className="object-cover object-center"
                  />
                </div>
              )}

              {/* Special Highlight for AYEEKOOO Citation */}
              {chapter.id === "technical-mastery" && (
                <div className="p-3.5 rounded-xl bg-[#B48836]/15 border border-[#B48836]/40 text-xs space-y-1">
                  <span className="text-[10px] font-cinzel uppercase tracking-wider text-[#DEC596] font-bold block">
                    Special Military Citation • Air Force Base Accra (2004)
                  </span>
                  <p className="text-[13px] text-[#ededed] font-caladea leading-relaxed">
                    Spearheaded returning the Agusta Bell A109 (GH71) helicopter to active service after sitting grounded for 5 consecutive years. Hailed with the military citation: <strong className="text-[#DEC596]">“AYEEKOOO !!!!!”</strong>
                  </p>
                </div>
              )}

              <div className="space-y-3 pt-1">
                {chapter.paragraphs.map((p, pIdx) => (
                  <p
                    key={pIdx}
                    className="text-[13px] font-caladea text-[#cccccc] leading-relaxed whitespace-pre-line"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Solemn Farewell Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-[#171717] via-[#0f0f0f] to-[#171717] border border-[#DEC596]/25 p-5 text-center space-y-1">
        <p className="text-xs font-cinzel text-[#DEC596] tracking-widest uppercase">
          May his gallant soul rest in eternal peace
        </p>
        <p className="text-base font-cinzel font-bold text-gold-shimmer">
          Hede Nyuie! • Damirifa Due!
        </p>
      </div>
    </div>
  );
};
