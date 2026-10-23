"use client";

import React, { useState, useEffect } from "react";
import { InteractiveCover } from "@/components/brochure/InteractiveCover";
import { OrderOfServiceSection } from "@/components/brochure/OrderOfServiceSection";
import { BiographySection } from "@/components/brochure/BiographySection";
import { TributesSection } from "@/components/brochure/TributesSection";
import { GallerySection } from "@/components/brochure/GallerySection";
import { HymnsSection } from "@/components/brochure/HymnsSection";
import { BottomNav, NavTab } from "@/components/brochure/BottomNav";
import { BrochureMode } from "@/components/brochure/BrochureMode";

export default function Home() {
  const [activeTab, setActiveTab] = useState<NavTab>("cover");
  const [isBrochureMode, setIsBrochureMode] = useState<boolean>(false);

  // Scroll to top when changing tabs
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [activeTab]);

  if (isBrochureMode) {
    return (
      <BrochureMode
        onClose={() => setIsBrochureMode(false)}
        initialPage={activeTab === "cover" ? 1 : 2}
      />
    );
  }

  return (
    <div className="min-h-dvh w-full bg-[#050505] text-[#ededed] flex flex-col justify-between selection:bg-[#DEC596]/30 selection:text-[#DEC596]">
      {/* Centered Mobile Container in ambient dark frame on desktop viewports */}
      <div className="w-full max-w-[430px] mx-auto min-h-dvh flex flex-col pb-24 relative sm:border-x sm:border-[#DEC596]/15 sm:shadow-[0_0_50px_rgba(180,136,54,0.08)]">
        {/* Main Section Content */}
        <main className="flex-1 w-full flex flex-col justify-center">
          {activeTab === "cover" && (
            <div className="py-4 px-2">
              <InteractiveCover
                onNavigateTab={(tab) => setActiveTab(tab)}
                onToggleBrochureMode={() => setIsBrochureMode(true)}
              />
            </div>
          )}

          {activeTab === "service" && <OrderOfServiceSection />}
          {activeTab === "biography" && <BiographySection />}
          {activeTab === "tributes" && <TributesSection />}
          {activeTab === "gallery" && <GallerySection />}
          {activeTab === "hymns" && <HymnsSection />}
        </main>

        {/* Sticky Mobile Glassmorphic Bottom Navigation */}
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
}
