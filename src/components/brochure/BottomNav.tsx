"use client";

import React from "react";
import { BookMarked, ScrollText, User, HeartHandshake, Image as ImageIcon, Music } from "lucide-react";

export type NavTab = "cover" | "service" | "biography" | "tributes" | "gallery" | "hymns";

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: "cover" as NavTab, label: "Cover", icon: BookMarked },
    { id: "service" as NavTab, label: "Service", icon: ScrollText },
    { id: "biography" as NavTab, label: "Life", icon: User },
    { id: "tributes" as NavTab, label: "Tributes", icon: HeartHandshake },
    { id: "gallery" as NavTab, label: "Gallery", icon: ImageIcon },
    { id: "hymns" as NavTab, label: "Hymns", icon: Music },
  ];

  return (
    <nav
      aria-label="Memorial Navigation"
      className="fixed bottom-0 inset-x-0 z-40 backdrop-blur-md bg-[#050505]/90 border-t border-[#DEC596]/20 shadow-[0_-8px_20px_rgba(0,0,0,0.8)] pb-safe"
    >
      <div className="w-full max-w-[430px] mx-auto flex items-center justify-around px-1 py-1.5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl transition-all relative ${
                isActive
                  ? "text-[#DEC596] font-semibold scale-105"
                  : "text-[#877971] hover:text-[#DEC596]/80"
              }`}
            >
              {isActive && (
                <span className="absolute top-0 w-8 h-[2px] bg-gradient-to-r from-transparent via-[#DEC596] to-transparent rounded-full" />
              )}
              <Icon
                className={`w-4 h-4 transition-transform ${
                  isActive ? "text-[#DEC596] stroke-[2.2]" : "stroke-[1.8]"
                }`}
              />
              <span className="text-[10px] font-cinzel mt-1 tracking-tight">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
