"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const BRANDS = [
  { image: "/brandlogos/Ekla.png" },
  { image: "/brandlogos/Coloured Logo.png" },
  { image: "/brandlogos/Elonna_Foods.png" },
  { image: "/brandlogos/FullLogo_Transparent_NoBuffer White.png" },
  { image: "/brandlogos/Gourmet Twist Rays Logo.png" },
  { image: "/brandlogos/IMG_5402.png" },
  { image: "/brandlogos/IMG-20250704-WA0052.jpg" },
  { image: "/brandlogos/Koshe Logo White.png" },
  { image: "/brandlogos/Maison Veil Logo.jpeg" },
  { image: "/brandlogos/Mom's Pride Logo.png" },
  { image: "/brandlogos/NXXN.png" },
  { image: "/brandlogos/SIMPLY JOLLOF LOGO.png" },
  { image: "/brandlogos/Sooo Pro Logo.jpg" },
  { image: "/brandlogos/Este Blare.png" },
  { image: "/brandlogos/Uncle Stan's.png" },
  { image: "/brandlogos/NINI.png" },
  { image: "/brandlogos/Agricyclers.jpg" },
];

const duplicatedBrands = [...BRANDS, ...BRANDS];

function MarqueeRow({
  direction = "left",
  speed = 40,
}: {
  direction?: "left" | "right";
  speed?: number;
}) {
  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="flex w-max items-center"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {duplicatedBrands.map((brand, index) => (
          <div
            key={index}
            className="flex shrink-0 items-center"
          >
            <div className="relative h-14 w-20 md:h-20 md:w-28 lg:h-18 lg:w-24">
              <Image
                src={brand.image}
                alt={`Brand logo ${index + 1}`}
                fill
                className="object-contain"
              />
            </div>
            <div className="ml-6 h-6 w-px bg-white/15 md:ml-10" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function BrandsMarquee() {
  return (
    <section className="relative flex flex-col justify-center overflow-hidden z-10 bg-linear-to-b from-black via-black to-transparent p-5">
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-linear-to-r from-black to-transparent md:w-32 lg:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-linear-to-l from-black to-transparent md:w-32 lg:w-40" />

      {/* Header */}
      {/* <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mb-14 flex items-center justify-center gap-4 px-6"
      >
        <span className="h-px w-10 bg-white/20 md:w-16" />
        <p className="text-center text-lg font-light text-[#FEE9CE] md:text-2xl lg:text-4xl">
          Brands We&apos;ve Worked With
        </p>
        <span className="h-px w-10 bg-white/20 md:w-16" />
      </motion.div> */}

      {/* Marquee Rows */}
      <div className="space-y-8">
        <MarqueeRow direction="left" speed={40} />
        {/* <MarqueeRow direction="right" speed={40} /> */}
      </div>
    </section>
  );
}