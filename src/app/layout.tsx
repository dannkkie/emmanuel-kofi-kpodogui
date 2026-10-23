import type { Metadata } from "next";
import "./globals.css";
import "./brochure-fonts.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://emmanuel-kofi-kpodogui.vercel.app"
  ),
  title: "In Loving Memory of Ex-WO1 Emmanuel Kofi Kpodogui (1954 - 2026)",
  description:
    "FOREVER IN OUR HEARTS. Ex-WO1 Emmanuel Kofi KPODOGUI. A. K. A “Ago Die”. 1954 - 2026. Saturday 24th October, 2026. Garrison Methodist and Presbyterian Church, Burma Camp.",
  openGraph: {
    title: "In Loving Memory of Ex-WO1 Emmanuel Kofi Kpodogui (1954 - 2026)",
    description:
      "FOREVER IN OUR HEARTS. Saturday 24th October, 2026. Garrison Methodist and Presbyterian Church, Burma Camp.",
    images: [
      {
        url: "/brochure/brochure.jpg",
        width: 840,
        height: 1202,
        alt: "Memorial announcement for Ex-WO1 Emmanuel Kofi Kpodogui",
      },
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/brochure/fonts/caladea-regular.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="/brochure/fonts/cinzel-regular.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
