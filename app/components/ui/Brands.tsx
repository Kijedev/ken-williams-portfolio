"use client";
import Image from "next/image";

const BRANDS = [
  { image: "/brandlogos/Ekla.png" },
  { image: "/brandlogos/Coloured Logo.png" },
  { image: "/brandlogos/Elonna_Foods.png" },
  { image: "/brandlogos/FullLogo_Transparent_NoBuffer White.png" },
  { image: "/brandlogos/Gourmet Twist Rays Logo.png" },
  { image: "/brandlogos/pocketprice.png" },
  { image: "/brandlogos/IMG-20250704-WA0052.png" },
  { image: "/brandlogos/Koshe Logo White.png" },
  { image: "/brandlogos/maisonveil.png" },
  { image: "/brandlogos/Mom's Pride Logo.png" },
  { image: "/brandlogos/NXXN.png" },
  { image: "/brandlogos/Sooo Pro Logo.jpg" },
  { image: "/brandlogos/Este Blare.png" },
  { image: "/brandlogos/Uncle_Stan.png" },
  { image: "/brandlogos/NINI.png" },
  { image: "/brandlogos/Agricyclers.jpg" },
];

const doubled = [...BRANDS, ...BRANDS];

export default function BrandsMarquee() {
  return (
    <section className="relative overflow-hidden bg-black py-10">
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-inner {
          animation: marquee 32s linear infinite;
          will-change: transform;
        }
        .marquee-inner:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Track */}
      <div className="relative" style={{ contain: "layout style" }}>
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-black to-transparent md:w-36" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-black to-transparent md:w-36" />

        {/* Scrolling strip */}
        <div className="marquee-inner flex w-max items-center">
          {doubled.map((brand, i) => (
            <div key={i} className="flex shrink-0 items-center gap-8 px-8">
              <div className="relative h-13 w-25">
                <Image
                  src={brand.image}
                  alt=""
                  fill
                  sizes="100px"
                  className="object-contain  duration-300 hover:opacity-100"
                  // style={{ filter: "brightness(0) invert(1)" }}
                />
              </div>
              <div className="h-7 w-px bg-white/10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}