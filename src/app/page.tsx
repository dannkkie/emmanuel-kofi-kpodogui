import Image from "next/image";
import memorialImage from "../../public/images/memorial.webp";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-black p-2 sm:p-4">
      <h1 className="sr-only">
        In Loving Memory of Ex-WO1 Emmanuel Kofi Kpodogui (1954 - 2026)
      </h1>
      <div className="relative flex items-center justify-center max-w-full">
        <Image
          src={memorialImage}
          alt="Memorial announcement: In Loving Memory of Ex-WO1 Emmanuel Kofi Kpodogui (1954 - 2026), A. K. A 'AGO DIE'. Saturday 24th October, 2026 at Garrison Methodist and Presbyterian Church, Burma Camp."
          priority
          placeholder="blur"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 715px"
          className="h-auto w-auto max-h-[96vh] max-w-full object-contain shadow-2xl"
        />
      </div>
    </main>
  );
}
