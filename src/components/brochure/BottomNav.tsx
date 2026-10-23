"use client";

import { BookOpen, ListOrdered, Award, Heart, Images } from "lucide-react";
import { motion } from "motion/react";

export type BrochureTab = "cover" | "service" | "biography" | "tributes" | "gallery";

interface BottomNavProps {
  activeTab: BrochureTab;
  onTabChange: (tab: BrochureTab) => void;
}

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: "cover" as BrochureTab, label: "Cover", icon: BookOpen },
    { id: "service" as BrochureTab, label: "Service", icon: ListOrdered },
    { id: "biography" as BrochureTab, label: "Biography", icon: Award },
    { id: "tributes" as BrochureTab, label: "Tributes", icon: Heart },
    { id: "gallery" as BrochureTab, label: "Gallery", icon: Images },
  ];

  return (
    <nav
      aria-label="Brochure sections"
      className="fixed bottom-0 left-0 right-0 z-40 max-w-[430px] mx-auto backdrop-blur-md bg-[#050505]/90 border-t border-[#DEC596]/20 px-2 py-1.5 shadow-[0_-10px_25px_rgba(0,0,0,0.8)]"
    >
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="relative flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all"
            >
              {/* Active Golden Glow Pill Indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeTabPill"
                  className="absolute inset-0 bg-[#DEC596]/15 rounded-xl border border-[#DEC596]/30 shadow-[0_0_15px_rgba(222,197,150,0.2)]"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}

              <Icon
                className={`w-4 h-4 mb-1 transition-colors relative z-10 ${
                  isActive ? "text-[#DEC596]" : "text-[#877971] hover:text-[#DEC596]/70"
                }`}
              />

              <span
                className={`text-[9px] font-cinzel tracking-wider uppercase relative z-10 transition-colors ${
                  isActive ? "text-[#DEC596] font-bold" : "text-[#877971]"
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
