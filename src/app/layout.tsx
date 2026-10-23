import type { Metadata, Viewport } from "next";
import { Cinzel, Caladea, Great_Vibes } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const caladea = Caladea({
  variable: "--font-caladea",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: ["400"],
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
  title: "In Loving Memory: Ex-WO1 Emmanuel Kofi Kpodogui (1954 – 2026)",
  description:
    "Official memorial brochure & celebration of life for Ex-WO1 Emmanuel Kofi Kpodogui (A.K.A. 'Ago Die'). Saturday 24th October, 2026 at Garrison Methodist and Presbyterian Church, Burma Camp.",
  openGraph: {
    title: "Ex-WO1 Emmanuel Kofi Kpodogui (1954 – 2026) | Memorial Brochure",
    description:
      "A.K.A. 'Ago Die' • Forever in our hearts • Garrison Methodist and Presbyterian Church, Burma Camp",
    images: [
      {
        url: "/images/memorial.webp",
        width: 715,
        height: 1024,
        alt: "Memorial Brochure Cover - Ex-WO1 Emmanuel Kofi Kpodogui",
      },
    ],
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
      className={`${cinzel.variable} ${caladea.variable} ${greatVibes.variable} h-full antialiased dark`}
    >
      <body className="min-h-full bg-[#050505] text-[#ededed] selection:bg-[#DEC596]/30 selection:text-[#DEC596] overflow-x-hidden font-sans">
        {children}
      </body>
    </html>
  );
}
