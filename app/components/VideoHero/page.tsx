"use client";

import Link from "next/link";
import ButtonWorks from "../ButtonWorks";

export default function VideoHero() {
  return (
    <section className="relative z-50 h-screen w-full overflow-hidden bg-black">
      {/* Background Video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src="/reels/HeroVideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-black via-black/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-black via-black/70 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-end px-6 sm:px-10 lg:px-20 pb-12 sm:pb-16 lg:pb-20 text-white">
        <div className="max-w-7xl w-full">
          {/* Heading */}
          <div className="">
            <div className="flex flex-wrap items-end gap-3 sm:gap-5 mb-1 sm:mb-2">
              <h1 className="text-xl sm:text-xl lg:text-2xl font-light tracking-tight leading-[0.9] text-white/70">
                We bring products to life through
              </h1>
            </div>

            <div className="flex flex-wrap items-end gap-3 sm:gap-5">
              <h2 className="text-[clamp(4rem,10vw,6rem)] font-bold tracking-tight leading-none text-[#FEE9CE]">
                Cinematic Storytelling
              </h2>
            </div>
          </div>

          {/* Description + CTA */}
          <div className="flex flex-col gap-6 mt-4">
            <p className="text-xl sm:text-xl lg:text-2xl font-light text-white/70">
              We help brands around the world tell great stories.
            </p>

            <div className="flex items-center gap-4">
              <ButtonWorks
                text="View our Works"
                textsecond="See Projects"
                textColor="text-[#fff]"
                border="border border-white"
              />
            </div>
          </div>
        </div>

        {/* Scroll Cue */}
        <div className="absolute bottom-8 right-0 lg:left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">
            Scroll
          </span>
          <div className="h-10 w-px bg-linear-to-b from-white/40 to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  );
}
