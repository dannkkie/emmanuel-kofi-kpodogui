import { Navigation } from "@/components/Navigation";
import { HeroCover } from "@/components/HeroCover";
import { OrderOfServiceSection } from "@/components/OrderOfServiceSection";
import { BiographySection } from "@/components/BiographySection";
import { TributesSection } from "@/components/TributesSection";
import { HymnsSection } from "@/components/HymnsSection";
import { PhotoGallerySection } from "@/components/PhotoGallerySection";
import { VenueDirectionsSection } from "@/components/VenueDirectionsSection";
import { InteractiveCondolences } from "@/components/InteractiveCondolences";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black text-zinc-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Header & Mobile Bottom Dock Navigation */}
      <Navigation />

      <main className="flex-1 w-full">
        {/* Cover / Hero (Reflecting Brochure Cover) */}
        <HeroCover />

        {/* Order of Service (Part I, II, III, IV) */}
        <OrderOfServiceSection />

        {/* Biography & Military Journey */}
        <BiographySection />

        {/* Family, Comrades & Church Tributes */}
        <TributesSection />

        {/* Methodist & Presbyterian Hymns */}
        <HymnsSection />

        {/* Photo Gallery & Milestones */}
        <PhotoGallerySection />

        {/* Venue, Schedule, Maps & Burma Camp Directions */}
        <VenueDirectionsSection />

        {/* Interactive Digital Condolence Book */}
        <InteractiveCondolences />
      </main>

      {/* Memorial Footer */}
      <Footer />
    </div>
  );
}
