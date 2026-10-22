"use client";

import { MapPin, Navigation as NavIcon, Calendar, Clock, AlertCircle, ExternalLink } from "lucide-react";
import { FUNERAL_DATA } from "@/data/funeralData";
import { downloadFuneralCalendarEvent } from "@/lib/calendar";

export function VenueDirectionsSection() {
  return (
    <section id="venue" className="py-16 sm:py-24 px-4 bg-black border-t border-zinc-900">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-xs uppercase tracking-[0.25em] text-amber-400 font-medium">
            Location & Service Details
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-zinc-100 font-bold mt-2">
            Venue & Directions
          </h2>
          <div className="w-16 h-0.5 bg-amber-500/60 mx-auto mt-3 rounded-full" />
          <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto mt-3">
            {FUNERAL_DATA.service.venue} &bull; {FUNERAL_DATA.service.location}
          </p>
        </div>

        {/* Schedule Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Saturday Card */}
          <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 shadow-xl">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-5 h-5 text-amber-400" />
              <h3 className="text-base sm:text-lg font-serif font-semibold text-zinc-100">
                Saturday, 24th October, 2026
              </h3>
            </div>
            <p className="text-xs text-amber-300 font-medium mb-4">
              Burial & Memorial Service &bull; Attire: {FUNERAL_DATA.service.attire.saturday}
            </p>
            <ul className="space-y-2.5 text-xs text-zinc-300">
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
                <span>
                  <strong>07:00 AM – 08:15 AM:</strong> Pre-Burial Filing Past
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
                <span>
                  <strong>08:30 AM:</strong> Burial Service at GMPC Burma Camp
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Immediately Following:</strong> Military Honours & Committal at {FUNERAL_DATA.service.gravesideVenue}
                </span>
              </li>
            </ul>
          </div>

          {/* Sunday Card */}
          <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 shadow-xl">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-5 h-5 text-amber-400" />
              <h3 className="text-base sm:text-lg font-serif font-semibold text-zinc-100">
                Sunday, 25th October, 2026
              </h3>
            </div>
            <p className="text-xs text-amber-300 font-medium mb-4">
              Thanksgiving Service &bull; Attire: {FUNERAL_DATA.service.attire.sunday}
            </p>
            <ul className="space-y-2.5 text-xs text-zinc-300">
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
                <span>
                  <strong>09:00 AM:</strong> Memorial Thanksgiving Service at GMPC Burma Camp
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Post-Service:</strong> Family Reception & Fellowship at Burma Camp
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Map / Directions Card */}
        <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-serif font-semibold text-zinc-100">
                  {FUNERAL_DATA.service.venue}
                </h3>
              </div>
              <p className="text-xs text-zinc-400 mt-1">
                Burma Camp, Cantonments, Accra (Opposite Burma Hall / Military HQ)
              </p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={FUNERAL_DATA.service.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 text-black text-xs font-semibold hover:bg-amber-400 transition-colors shadow-md"
              >
                <NavIcon className="w-4 h-4" />
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3 ml-0.5" />
              </a>

              <button
                onClick={downloadFuneralCalendarEvent}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 text-zinc-200 hover:text-white hover:bg-zinc-700 text-xs font-semibold border border-zinc-700 transition-colors"
              >
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>Add to Calendar</span>
              </button>
            </div>
          </div>

          {/* Access & Security Notice for Burma Camp */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-300">Burma Camp Access Protocol for Civilian Guests</p>
              <p className="mt-1 text-zinc-300 leading-relaxed">
                Entry is permitted through the Burma Camp main security checkpoints (accessible from 37 Roundabout / Giffard Road). Kindly notify sentries that you are attending the funeral of Ex-WO1 Emmanuel Kofi Kpodogui at the Garrison Methodist and Presbyterian Church. Please ensure you have a valid National ID.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-2">
            Frequently Asked Questions
          </h4>
          {FUNERAL_DATA.faqs.map((faq, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-zinc-900/30 border border-zinc-800/80 text-xs"
            >
              <p className="font-semibold text-zinc-200">{faq.question}</p>
              <p className="text-zinc-400 mt-1 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
