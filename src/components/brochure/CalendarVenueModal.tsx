"use client";

import React from "react";
import { X, Calendar, MapPin, Navigation, Clock, ExternalLink } from "lucide-react";
import { MEMORIAL_DATA } from "@/data/brochureData";
import { generateIcsFile } from "@/lib/calendar";

interface CalendarVenueModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "calendar" | "venue";
}

export const CalendarVenueModal: React.FC<CalendarVenueModalProps> = ({
  isOpen,
  onClose,
  initialTab = "venue",
}) => {
  const [activeTab, setActiveTab] = React.useState<"calendar" | "venue">(initialTab);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="calendar-venue-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl bg-[#0c0c0c] border border-[#DEC596]/30 p-6 shadow-2xl text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#877971] hover:text-[#DEC596] rounded-full transition-colors focus:outline-none"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tab Switcher */}
        <div className="flex border-b border-[#DEC596]/20 pb-3 mb-5 pr-8">
          <button
            onClick={() => setActiveTab("venue")}
            className={`flex items-center gap-1.5 pb-2 text-xs font-cinzel uppercase tracking-wider transition-colors relative ${
              activeTab === "venue"
                ? "text-[#DEC596] font-bold"
                : "text-[#877971] hover:text-[#DEC596]/70"
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            Church Venue
            {activeTab === "venue" && (
              <span className="absolute bottom-[-13px] left-0 right-0 h-[2px] bg-[#DEC596]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("calendar")}
            className={`flex items-center gap-1.5 pb-2 ml-6 text-xs font-cinzel uppercase tracking-wider transition-colors relative ${
              activeTab === "calendar"
                ? "text-[#DEC596] font-bold"
                : "text-[#877971] hover:text-[#DEC596]/70"
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            Service Date
            {activeTab === "calendar" && (
              <span className="absolute bottom-[-13px] left-0 right-0 h-[2px] bg-[#DEC596]" />
            )}
          </button>
        </div>

        {activeTab === "venue" ? (
          <div>
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-[#B48836]/15 border border-[#B48836]/30 text-[#DEC596] shrink-0">
                <MapPin className="w-5 h-5 text-[#DEC596]" />
              </div>
              <div>
                <h4 id="calendar-venue-modal-title" className="text-sm font-cinzel font-bold text-[#DEC596]">
                  {MEMORIAL_DATA.service.venueName}
                </h4>
                <p className="text-xs text-[#877971] mt-0.5">
                  Burma Camp, Cantonments, Accra, Ghana
                </p>
                <span className="inline-block mt-1 text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 bg-[#B48836]/20 text-[#DEC596] rounded">
                  Ghana Armed Forces Chapel
                </span>
              </div>
            </div>

            <div className="bg-[#141414] border border-white/5 rounded-xl p-3.5 mb-5 text-xs space-y-2 text-[#cccccc]">
              <div className="flex items-center gap-2 text-[#877971]">
                <Clock className="w-3.5 h-3.5 text-[#B48836]" />
                <span>Service begins promptly at <strong>07:00 AM GMT</strong></span>
              </div>
              <p className="text-[11px] text-[#877971] leading-relaxed">
                The church is situated inside Burma Camp, the central military headquarters in Accra. Please allow time for entry identification.
              </p>
            </div>

            <a
              href={MEMORIAL_DATA.service.googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#B48836] to-[#DEC596] text-[#050505] font-semibold text-xs tracking-wider uppercase transition-transform active:scale-95 shadow-md hover:brightness-110"
            >
              <Navigation className="w-4 h-4" />
              Open in Google Maps
              <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-70" />
            </a>
          </div>
        ) : (
          <div>
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-[#B48836]/15 border border-[#B48836]/30 text-[#DEC596] shrink-0">
                <Calendar className="w-5 h-5 text-[#DEC596]" />
              </div>
              <div>
                <h4 className="text-sm font-cinzel font-bold text-[#DEC596]">
                  {MEMORIAL_DATA.service.dateFormatted}
                </h4>
                <p className="text-xs text-[#877971] mt-0.5">
                  07:00 – 13:00 GMT (Burial & Committal)
                </p>
              </div>
            </div>

            <div className="bg-[#141414] border border-white/5 rounded-xl p-3.5 mb-5 text-xs space-y-1.5">
              <div className="flex justify-between items-center text-[#DEC596]">
                <span>Filing Past:</span>
                <span className="font-mono text-[11px]">07:00 – 08:45</span>
              </div>
              <div className="flex justify-between items-center text-[#ededed]">
                <span>Burial Service:</span>
                <span className="font-mono text-[11px]">09:00 – 11:30</span>
              </div>
              <div className="flex justify-between items-center text-[#877971]">
                <span>Interment:</span>
                <span className="text-[11px]">Military Cemetery</span>
              </div>
            </div>

            <div className="space-y-2.5">
              <a
                href={MEMORIAL_DATA.service.googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#B48836] to-[#DEC596] text-[#050505] font-semibold text-xs tracking-wider uppercase transition-transform active:scale-95 shadow-md hover:brightness-110"
              >
                <Calendar className="w-4 h-4" />
                Add to Google Calendar
              </a>

              <button
                onClick={generateIcsFile}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#171717] hover:bg-[#222222] border border-[#DEC596]/20 text-[#DEC596] text-xs font-medium transition-colors"
              >
                Download Apple / Outlook (.ics)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
