"use client";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "",
  description: "",
};

type CardType = {
  title: string;
  description: string;
  src: string;
  type: "image" | "video";
};

export default function ScollBg() {
  const CARDS: CardType[] = [
    {
      title: "Cinematic Product Storytelling",
      description:
        "Transform everyday products into compelling visual stories that capture attention, build desire, and drive customer action.",
      src: "/reels/Gourmet Twist Banana Bread 2.mp4",
      type: "video",
    },
    {
      title: "Designed for Social Impact",
      description:
        "Scroll-stopping visuals crafted for Instagram, TikTok, and campaigns—built to hook attention instantly.",
      src: "/reels/Go Vita Chocolate Drink Video 3.mp4",
      type: "video",
    },
    {
      title: "Showcase Every Detail",
      description:
        "Highlight textures, craftsmanship, and product quality with precision-driven visuals.",
      src: "/reels/Iphone.mp4",
      type: "video",
    },
    {
      title: "Built to Elevate Your Brand",
      description:
        "Premium visuals that increase trust and position your product as the obvious choice.",
      src: "/reels/Maison Veil Body Oil Video.mp4",
      type: "video",
    },
  ];

  return (
    <section id="uniquely-yours" className="relative bg-black">
      {/* Background Heading */}
      <div className="fixed z-0 top-0 h-screen w-full flex items-center justify-center pointer-events-none">
        <h1 className="text-white/10 text-[3rem] lg:text-[7rem] font-bold text-center capitalize italic leading-10 lg:leading-22 max-w-3xl">
          What Makes Us Different
        </h1>
      </div>

      {/* Cards */}
      <div className="relative max-w-6xl mx-auto -mt-[10vh] py-32 lg:py-48 flex flex-col gap-32 lg:gap-48">
        {CARDS.map((card, index) => (
          <div
            key={index}
            className={`group backdrop-blur-lg border border-white/10 rounded-2xl p-5 flex flex-col gap-6 w-[90%] sm:w-[420px] transition duration-500
            ${index % 2 === 0 ? "self-end" : "self-start"}`}
          >
            {/* MEDIA */}
            <div className="relative w-full h-[45vh] overflow-hidden rounded-xl">
              {card.type === "video" ? (
                <video
                  src={card.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="none"
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                />
              ) : (
                <img
                  src={card.src}
                  alt={card.title}
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                />
              )}

              {/* Cinematic overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
            </div>

            {/* TEXT */}
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-semibold text-[#EF5143]">
                {card.title}
              </h2>
              <p className="text-[#FEE9CE]/70 text-sm leading-relaxed">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}