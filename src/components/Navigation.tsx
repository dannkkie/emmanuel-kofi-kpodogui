"use client";

import { useEffect, useState } from "react";
import { 
  BookOpen, 
  Heart, 
  Music, 
  MapPin, 
  Calendar, 
  Share2, 
  Image as ImageIcon,
  Check,
  ChevronUp,
  Award
} from "lucide-react";
import { downloadFuneralCalendarEvent } from "@/lib/calendar";

const NAV_ITEMS = [
  { id: "cover", label: "Cover", icon: Award },
  { id: "programme", label: "Programme", icon: BookOpen },
  { id: "biography", label: "Life Story", icon: Award },
  { id: "tributes", label: "Tributes", icon: Heart },
  { id: "hymns", label: "Hymns", icon: Music },
  { id: "gallery", label: "Gallery", icon: ImageIcon },
  { id: "venue", label: "Venue", icon: MapPin },
];

export function Navigation() {
  const [activeSection, setActiveSection] = useState("cover");
  const [copied, setCopied] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);

      const sections = NAV_ITEMS.map((item) => {
        const el = document.getElementById(item.id);
        if (!el) return { id: item.id, top: 0, bottom: 0 };
        const rect = el.getBoundingClientRect();
        return {
          id: item.id,
          top: rect.top,
          bottom: rect.bottom,
        };
      });

      const current = sections.find(
        (s) => s.top <= 200 && s.bottom >= 150
      );
      if (current) {
        setActiveSection(current.id);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -60;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "In Loving Memory: Ex-WO1 Emmanuel Kofi Kpodogui (1954 - 2026)",
          text: "Funeral Brochure & Memorial Service for Ex-WO1 Emmanuel Kofi Kpodogui (Ago Die) at Burma Camp, Accra.",
          url: window.location.href,
        });
      } catch {
        // Ignored or cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-black/80 border-b border-zinc-800/80 transition-all">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <button
            onClick={() => scrollTo("cover")}
            className="flex items-center gap-2 text-left group"
          >
            <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <div>
              <p className="text-xs font-semibold tracking-wider text-amber-300 uppercase">
                Ex-WO1 Emmanuel Kofi Kpodogui
              </p>
              <p className="text-[10px] text-zinc-400">1954 – 2026 • Burma Camp</p>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  activeSection === item.id
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={downloadFuneralCalendarEvent}
              title="Add to Calendar"
              className="p-2 rounded-full text-zinc-300 hover:text-amber-300 hover:bg-zinc-800/70 transition-colors border border-zinc-800"
            >
              <Calendar className="w-4 h-4" />
              <span className="sr-only">Add to Calendar</span>
            </button>
            <button
              onClick={handleShare}
              title="Share Memorial Brochure"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 border border-amber-500/30 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-400" />
                  <span className="hidden sm:inline">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Share</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-20 right-4 z-40 p-2.5 rounded-full bg-zinc-900/90 text-amber-400 border border-amber-500/30 shadow-lg backdrop-blur-sm hover:bg-zinc-800 transition-all md:bottom-6"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

      {/* Mobile Bottom Dock Navigation (Optimized for Mobile Touch) */}
      <nav className="md:hidden fixed bottom-2 left-2 right-2 z-40 bg-zinc-950/90 backdrop-blur-lg border border-amber-500/20 rounded-2xl shadow-2xl px-2 py-1.5">
        <div className="flex items-center justify-around">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`flex flex-col items-center justify-center py-1 px-1.5 rounded-xl transition-all ${
                  isActive
                    ? "text-amber-300 font-semibold scale-105"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-amber-400" : ""}`} />
                <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
