"use client";

import { useState } from "react";
import { X, Calendar, MapPin, ExternalLink, Download, Clock, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { brochureData } from "@/data/brochureData";

interface CalendarVenueModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "calendar" | "venue";
}

export default function CalendarVenueModal({
  isOpen,
  onClose,
  initialTab = "calendar",
}: CalendarVenueModalProps) {
  const [activeTab, setActiveTab] = useState<"calendar" | "venue">(initialTab);

  const downloadIcsFile = () => {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Emmanuel Kofi Kpodogui Memorial//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      "UID:memorial-emmanuel-kofi-kpodogui-20261024@burmacamp",
      "DTSTAMP:20261022T000000Z",
      "DTSTART:20261024T080000Z",
      "DTEND:20261024T130000Z",
      `SUMMARY:${brochureData.service.calendarDetails.title}`,
      `DESCRIPTION:${brochureData.service.calendarDetails.description}`,
      `LOCATION:${brochureData.service.venueName}, ${brochureData.service.venueAddress}, ${brochureData.service.venueCity}`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "Ex-WO1-Kpodogui-Funeral-Service.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-sm rounded-2xl bg-[#0A0A0A] border border-[#DEC596]/30 p-5 text-left shadow-[0_0_50px_rgba(222,197,150,0.15)] z-10"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 rounded-full p-1.5 text-[#877971] hover:text-[#DEC596] hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Segmented Tab Bar */}
            <div className="grid grid-cols-2 p-1 bg-[#141414] rounded-xl border border-white/5 mb-5 mt-1">
              <button
                onClick={() => setActiveTab("calendar")}
                className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  activeTab === "calendar"
                    ? "bg-[#DEC596] text-black shadow-md"
                    : "text-[#877971] hover:text-[#DEC596]"
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Service Date</span>
              </button>
              <button
                onClick={() => setActiveTab("venue")}
                className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  activeTab === "venue"
                    ? "bg-[#DEC596] text-black shadow-md"
                    : "text-[#877971] hover:text-[#DEC596]"
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Burma Camp Venue</span>
              </button>
            </div>

            {/* Calendar Tab Content */}
            {activeTab === "calendar" && (
              <div className="space-y-4">
                <div className="border border-[#DEC596]/20 bg-[#121212] p-4 rounded-xl">
                  <div className="text-[11px] text-[#B48836] font-cinzel tracking-widest uppercase mb-1">
                    Order of Burial & Memorial
                  </div>
                  <h4 className="text-base font-cinzel font-semibold text-[#DEC596] leading-tight">
                    {brochureData.service.dateDisplay}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-[#877971] mt-2">
                    <Clock className="w-3.5 h-3.5 text-[#DEC596]" />
                    <span>
                      {brochureData.service.startTime} – {brochureData.service.endTime} GMT
                    </span>
                  </div>
                </div>

                <div className="text-xs text-[#877971] space-y-1">
                  <p>
                    <strong className="text-[#DEC596]">07:30 AM:</strong> Pre-service filing past & viewing
                  </p>
                  <p>
                    <strong className="text-[#DEC596]">08:30 AM:</strong> Burial Service & Church Rites
                  </p>
                  <p>
                    <strong className="text-[#DEC596]">11:45 AM:</strong> Military Honors by Ghana Armed Forces
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <a
                    href={brochureData.service.calendarDetails.googleCalendarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#B48836] via-[#DEC596] to-[#AD8330] text-black font-semibold text-xs py-3 px-4 shadow-lg hover:brightness-110 transition-all"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Add to Google Calendar</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-0.5 opacity-75" />
                  </a>

                  <button
                    onClick={downloadIcsFile}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#141414] border border-[#DEC596]/25 text-[#DEC596] text-xs py-2.5 px-4 hover:bg-[#1E1E1E] transition-all"
                  >
                    <Download className="w-3.5 h-3.5 text-[#B48836]" />
                    <span>Download Apple / Outlook (.ics)</span>
                  </button>
                </div>
              </div>
            )}

            {/* Venue Tab Content */}
            {activeTab === "venue" && (
              <div className="space-y-4">
                <div className="border border-[#DEC596]/20 bg-[#121212] p-4 rounded-xl">
                  <div className="flex items-start gap-2.5">
                    <div className="p-2 rounded-lg bg-[#DEC596]/10 text-[#DEC596] shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-cinzel font-semibold text-[#DEC596] leading-tight">
                        {brochureData.service.venueName}
                      </h4>
                      <p className="text-xs text-[#877971] mt-1">
                        {brochureData.service.venueAddress}, {brochureData.service.venueCity}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Military Protocol Alert */}
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#1A1813] border border-[#B48836]/30 text-xs text-[#DEC596]/90">
                  <ShieldCheck className="w-4 h-4 text-[#B48836] shrink-0 mt-0.5" />
                  <p className="text-[11px] leading-relaxed text-[#DEC596]/80">
                    {brochureData.service.directionsNote}
                  </p>
                </div>

                <div className="pt-2">
                  <a
                    href={brochureData.service.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#B48836] via-[#DEC596] to-[#AD8330] text-black font-semibold text-xs py-3 px-4 shadow-lg hover:brightness-110 transition-all"
                  >
                    <MapPin className="w-4 h-4" />
                    <span>Open in Google Maps (Directions)</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-0.5 opacity-75" />
                  </a>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
