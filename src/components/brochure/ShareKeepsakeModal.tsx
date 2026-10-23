"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Share2, Copy, Check, Download, QrCode } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { brochureData } from "@/data/brochureData";

interface ShareKeepsakeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShareKeepsakeModal({ isOpen, onClose }: ShareKeepsakeModalProps) {
  const [copied, setCopied] = useState(false);
  const [sharing, setSharing] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleNativeShare = async () => {
    setSharing(true);
    const shareData = {
      title: `Memorial Brochure: ${brochureData.honoree.rank} ${brochureData.honoree.fullName}`,
      text: `In Loving Memory of ${brochureData.honoree.rank} ${brochureData.honoree.fullName} (${brochureData.honoree.alias}, 1954 - 2026). View the official digital funeral brochure and order of service.`,
      url: window.location.href,
    };

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User dismissed or aborted share
      }
    } else {
      await handleCopyLink();
    }
    setSharing(false);
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
            className="relative w-full max-w-sm rounded-2xl bg-[#0A0A0A] border border-[#DEC596]/30 p-6 text-center shadow-[0_0_50px_rgba(222,197,150,0.15)] z-10"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 rounded-full p-1.5 text-[#877971] hover:text-[#DEC596] hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center justify-center gap-2 mb-2 text-[#DEC596]">
              <QrCode className="w-5 h-5 text-[#B48836]" />
              <h3 className="font-cinzel text-lg font-semibold tracking-wide text-[#DEC596]">
                Digital Keepsake & Share
              </h3>
            </div>
            <p className="text-xs text-[#877971] mb-5">
              Scan this code with another phone to open the digital brochure or share directly with family and friends.
            </p>

            {/* Stylized QR Code with White Frame */}
            <div className="mx-auto w-48 h-48 bg-white p-3 rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center justify-center relative mb-5">
              <Image
                src={brochureData.honoree.qrCodeUrl}
                alt="Memorial QR Code with portrait"
                width={200}
                height={200}
                className="w-full h-full object-contain"
                priority
              />
            </div>

            <div className="text-xs text-[#DEC596]/80 font-cinzel tracking-wider uppercase mb-5">
              {brochureData.honoree.rank} {brochureData.honoree.fullName}
              <span className="block text-[11px] text-[#877971] mt-0.5 font-caladea">
                1954 – 2026 • Burma Camp, Accra
              </span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5">
              {/* Native Web Share */}
              <button
                onClick={handleNativeShare}
                disabled={sharing}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#B48836] via-[#DEC596] to-[#AD8330] text-black font-semibold text-sm py-3 px-4 shadow-lg hover:brightness-110 active:scale-[0.98] transition-all"
              >
                <Share2 className="w-4 h-4" />
                <span>Share via WhatsApp / Phone</span>
              </button>

              {/* Copy Link */}
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#141414] border border-[#DEC596]/25 text-[#DEC596] text-sm py-2.5 px-4 hover:bg-[#1E1E1E] active:scale-[0.98] transition-all"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 font-medium">Link Copied to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#DEC596]" />
                    <span>Copy Web App Link</span>
                  </>
                )}
              </button>

              {/* Download Original PDF */}
              <a
                href={brochureData.honoree.pdfDownloadUrl}
                download="Ex-WO1-Emmanuel-Kofi-Kpodogui-Brochure.pdf"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-transparent border border-white/10 text-[#877971] hover:text-[#DEC596] hover:border-[#DEC596]/30 text-xs py-2 px-4 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Official PDF Brochure (2 MB)</span>
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
