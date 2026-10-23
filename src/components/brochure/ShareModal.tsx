"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Copy, Check, Share2, Download, QrCode } from "lucide-react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyLink = async () => {
    try {
      const url = typeof window !== "undefined" ? window.location.href : "https://emmanuel-kofi-kpodogui.vercel.app";
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "In Loving Memory: Ex-WO1 Emmanuel Kofi Kpodogui (1954 – 2026)",
          text: "Memorial brochure & Celebration of Life for Ex-WO1 Emmanuel Kofi Kpodogui (Ago Die) at Burma Camp, Accra.",
          url: window.location.href,
        });
      } catch {
        // user cancelled or share failed
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl bg-[#0c0c0c] border border-[#DEC596]/30 p-6 shadow-2xl text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#877971] hover:text-[#DEC596] rounded-full transition-colors focus:outline-none"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-center gap-2 mb-2">
          <QrCode className="w-5 h-5 text-[#B48836]" />
          <span className="text-xs font-cinzel uppercase tracking-[0.2em] text-[#DEC596]">
            Digital Keepsake
          </span>
        </div>

        <h3 id="share-modal-title" className="text-lg font-cinzel font-bold text-[#DEC596]">
          Share Memorial Brochure
        </h3>
        <p className="text-xs text-[#877971] mt-1 mb-5">
          Scan this QR code with any smartphone camera to open the digital brochure directly.
        </p>

        {/* High-contrast QR Container */}
        <div className="relative mx-auto w-52 h-52 bg-white p-3 rounded-xl shadow-lg border border-[#DEC596]/40 flex items-center justify-center mb-5">
          <Image
            src="/images/memorial.webp"
            alt="Memorial QR Code"
            width={200}
            height={200}
            className="w-full h-full object-cover rounded-lg"
            priority
          />
          {/* Halftone / portrait overlay simulation if needed */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="bg-black/80 text-[10px] text-[#DEC596] px-2 py-0.5 rounded font-cinzel">
              Ago Die
            </span>
          </div>
        </div>

        <div className="space-y-2.5">
          <button
            onClick={handleNativeShare}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#B48836] to-[#DEC596] text-[#050505] font-semibold text-xs tracking-wider uppercase transition-transform active:scale-95 shadow-md hover:brightness-110"
          >
            <Share2 className="w-4 h-4" />
            Share via WhatsApp / SMS
          </button>

          <button
            onClick={handleCopyLink}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#171717] hover:bg-[#222222] border border-[#DEC596]/20 text-[#DEC596] text-xs font-medium transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            {copied ? "Link Copied to Clipboard" : "Copy Web App Link"}
          </button>

          <a
            href="/web-brochure.pdf"
            download="Ex-WO1-Emmanuel-Kofi-Kpodogui-Memorial-Brochure.pdf"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-transparent hover:bg-white/[0.04] border border-white/10 text-[#877971] hover:text-white text-xs font-medium transition-colors"
          >
            <Download className="w-4 h-4" />
            Download Offline Brochure (PDF)
          </a>
        </div>
      </div>
    </div>
  );
};
