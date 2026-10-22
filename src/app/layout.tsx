import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://emmanuel-kofi-kpodogui.vercel.app"
  ),
  title: "In Loving Memory of Ex-WO1 Emmanuel Kofi Kpodogui (1954 - 2026)",
  description:
    "Forever in our hearts. Celebrating the life of Ex-WO1 Emmanuel Kofi Kpodogui (A. K. A 'AGO DIE').",
  openGraph: {
    title: "In Loving Memory of Ex-WO1 Emmanuel Kofi Kpodogui (1954 - 2026)",
    description:
      "Forever in our hearts. Celebrating the life of Ex-WO1 Emmanuel Kofi Kpodogui (A. K. A 'AGO DIE').",
    images: [
      {
        url: "/images/memorial.webp",
        width: 715,
        height: 1024,
        alt: "Memorial announcement for Ex-WO1 Emmanuel Kofi Kpodogui",
      },
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">{children}</body>
    </html>
  );
}
