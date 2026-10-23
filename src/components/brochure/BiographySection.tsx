"use client";

import Image from "next/image";
import { Award, Shield, Sparkles, Download } from "lucide-react";
import { brochureData } from "@/data/brochureData";

export default function BiographySection() {
  const { honoree, biography } = brochureData;

  return (
    <div className="w-full flex flex-col p-4 space-y-6">
      {/* Header Profile Banner */}
      <div className="text-center space-y-2 border-b border-[#DEC596]/15 pb-6">
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#B48836] font-cinzel">
          Life & Military Legacy
        </span>
        <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#DEC596] tracking-wide">
          Biography of {honoree.rank}
        </h2>
        <div className="font-script text-2xl sm:text-3xl gold-gradient-text">
          {honoree.forenames} {honoree.surname}
        </div>
        <div className="inline-block px-3 py-1 rounded-full bg-[#1A1813] border border-[#B48836]/40 text-xs font-cinzel text-[#DEC596]">
          A. K. A &ldquo;{honoree.alias}&rdquo; • {honoree.birthYear} – {honoree.deathYear}
        </div>
      </div>

      {/* Featured Portrait with Ambient Halo */}
      <div className="relative w-full max-w-[280px] mx-auto aspect-[3/4] rounded-2xl overflow-hidden border border-[#DEC596]/30 shadow-[0_0_40px_rgba(180,136,54,0.2)]">
        <Image
          src="/images/portrait-large.webp"
          alt={honoree.fullName}
          fill
          sizes="(max-width: 430px) 280px, 320px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
        <div className="absolute bottom-3 left-3 right-3 text-center">
          <div className="text-xs font-cinzel text-[#DEC596] font-semibold">
            {honoree.rank} {honoree.fullName}
          </div>
          <div className="text-[10px] text-[#877971] tracking-wider uppercase font-caladea">
            Burma Camp, Accra • Ghana
          </div>
        </div>
      </div>

      {/* Military Honors Crest Card */}
      <div className="border border-[#B48836]/30 bg-[#12100B] rounded-2xl p-5 space-y-3.5 shadow-lg">
        <div className="flex items-center gap-2.5 text-[#DEC596]">
          <div className="p-2 rounded-xl bg-[#B48836]/20 text-[#B48836]">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#B48836] font-cinzel block">
              Ghana Armed Forces (GAF)
            </span>
            <h4 className="font-cinzel text-sm font-bold text-[#DEC596]">
              {biography.militaryService.rankAchieved}
            </h4>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-white/5">
          <div className="bg-black/40 p-2.5 rounded-lg border border-white/5">
            <span className="text-[10px] text-[#877971] block">Headquarters</span>
            <span className="text-[#DEC596] font-medium font-caladea">
              {biography.militaryService.headquarters}
            </span>
          </div>
          <div className="bg-black/40 p-2.5 rounded-lg border border-white/5">
            <span className="text-[10px] text-[#877971] block">Service Status</span>
            <span className="text-[#DEC596] font-medium font-caladea">
              Ex-WO1 (Meritorious)
            </span>
          </div>
        </div>

        {/* Core Military Values */}
        <div className="pt-1">
          <span className="text-[10px] text-[#877971] uppercase tracking-wider block mb-1.5 font-cinzel">
            Military Principles
          </span>
          <div className="flex flex-wrap gap-1.5">
            {biography.militaryService.values.map((val, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md bg-[#DEC596]/10 border border-[#DEC596]/20 text-[10px] text-[#DEC596]"
              >
                {val}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Introduction Quote */}
      <div className="relative p-5 rounded-2xl bg-[#0D0D0D] border-l-4 border-[#B48836] border-y border-r border-white/5">
        <Sparkles className="w-4 h-4 text-[#B48836] absolute top-4 right-4" />
        <p className="text-xs sm:text-sm text-[#DEC596]/90 font-caladea italic leading-relaxed">
          &ldquo;{biography.introduction}&rdquo;
        </p>
      </div>

      {/* Detailed Life Chapters */}
      <div className="space-y-6 pt-2">
        {biography.sections.map((section, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-[#0B0B0B] border border-[#DEC596]/15 space-y-3"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#B48836]" />
              <h3 className="font-cinzel text-sm sm:text-base font-bold text-[#DEC596]">
                {section.heading}
              </h3>
            </div>

            <div className="space-y-2.5 text-xs sm:text-sm text-[#A89F96] font-caladea leading-relaxed">
              {section.body.map((paragraph, pIdx) => (
                <p key={pIdx}>{paragraph}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Military Salute & Silhouette Feature */}
      <div className="p-5 rounded-2xl bg-[#101010] border border-[#DEC596]/20 flex items-center gap-4">
        <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-[#DEC596]/30 bg-black">
          <Image
            src="/images/silhouette-isolated.webp"
            alt="Military salute"
            fill
            className="object-contain p-1"
          />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-cinzel text-[#DEC596] font-bold">
            <Award className="w-3.5 h-3.5 text-[#B48836]" />
            <span>Honourable Discharge & Peace</span>
          </div>
          <p className="text-[11px] text-[#877971] leading-snug">
            &ldquo;A soldier does not die; he merely stands down from his earthly watch and reports for duty in the heavenly kingdom.&rdquo;
          </p>
        </div>
      </div>

      {/* PDF Download Keepsake Button */}
      <div className="pt-2">
        <a
          href={honoree.pdfDownloadUrl}
          download="Ex-WO1-Emmanuel-Kofi-Kpodogui-Brochure.pdf"
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#B48836] via-[#DEC596] to-[#AD8330] text-black font-semibold text-xs py-3 px-4 shadow-lg hover:brightness-110 active:scale-[0.98] transition-all"
        >
          <Download className="w-4 h-4" />
          <span>Download Official PDF Brochure (2 MB)</span>
        </a>
      </div>
    </div>
  );
}
