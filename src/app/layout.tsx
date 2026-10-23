import type { Metadata, Viewport } from "next";
import { Cinzel, Caladea, Great_Vibes, Geist } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const caladea = Caladea({
  variable: "--font-caladea",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://emmanuel-kofi-kpodogui.vercel.app"
  ),
  title: "In Loving Memory of Ex-WO1 Emmanuel Kofi Kpodogui (1954 - 2026)",
  description:
    "Official memorial brochure and celebration of life for Ex-WO1 Emmanuel Kofi Kpodogui (A. K. A 'AGO DIE'). Garrison Methodist and Presbyterian Church, Burma Camp.",
  openGraph: {
    title: "In Loving Memory of Ex-WO1 Emmanuel Kofi Kpodogui (1954 - 2026)",
    description:
      "Forever in our hearts. Celebrating the life of Ex-WO1 Emmanuel Kofi Kpodogui (A. K. A 'AGO DIE'). Saturday 24th October, 2026 at Garrison Methodist and Presbyterian Church, Burma Camp.",
    images: [
      {
        url: "/images/brochure-cover-hq.webp",
        width: 1045,
        height: 1495,
        alt: "Memorial brochure cover for Ex-WO1 Emmanuel Kofi Kpodogui",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${caladea.variable} ${greatVibes.variable} ${geistSans.variable} h-full dark`}
    >
      <body className="min-h-full bg-[#050505] text-[#DEC596] antialiased selection:bg-[#DEC596]/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
