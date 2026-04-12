"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Card = {
    title: string;
    type: "circles" | "blob" | "oval" | "square" | "mix" | "rotate";
};

const cards: Card[] = [
    { title: "Clear Communication", type: "circles" },
    { title: "Creativity", type: "blob" },
    { title: "Integrity", type: "oval" },
    { title: "Reliability", type: "square" },
    { title: "Innovation", type: "mix" },
    { title: "Discipline", type: "rotate" },
];

export default function HorizontalGallery() {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const stripRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const strip = stripRef.current;

        if (!section || !strip) return;

        let pinWrapWidth = strip.scrollWidth;
        let horizontalScrollLength = pinWrapWidth - window.innerWidth;

        const tween = gsap.to(strip, {
            x: -horizontalScrollLength,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "center center",
                end: () => `+=${pinWrapWidth}`,
                scrub: true,
                pin: true,
                invalidateOnRefresh: true,
            },
        });

        const handleRefresh = () => {
            pinWrapWidth = strip.scrollWidth;
            horizontalScrollLength = pinWrapWidth - window.innerWidth;
        };

        ScrollTrigger.addEventListener("refreshInit", handleRefresh);

        return () => {
            tween.kill();
            ScrollTrigger.removeEventListener("refreshInit", handleRefresh);
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    // 🎨 Shape Renderer
    const renderShapes = (type: Card["type"]) => {
        switch (type) {
            case "circles":
                return (
                    <div className="absolute bottom-0 w-full h-[65%] flex flex-wrap justify-center items-end">
                        <div className="w-[55%] aspect-square bg-black rounded-full -mr-10" />
                        <div className="w-[55%] aspect-square bg-black rounded-full" />
                        <div className="w-[55%] aspect-square bg-black rounded-full -mr-10 -mt-10" />
                        <div className="w-[55%] aspect-square bg-black rounded-full -mt-10" />
                    </div>
                );

            case "blob":
                return (
                    <div className="absolute bottom-0 w-full h-[65%] flex justify-center items-end">
                        <div className="w-[80%] aspect-square bg-black rounded-[60%_40%_70%_30%/40%_60%_30%_70%]" />
                    </div>
                );

            case "oval":
                return (
                    <div className="absolute bottom-0 w-full h-[65%] flex flex-col items-center justify-end gap-4">
                        <div className="w-[70%] h-24 bg-black rounded-full" />
                        <div className="w-[50%] h-20 bg-black rounded-full" />
                    </div>
                );

            case "square":
                return (
                    <div className="absolute bottom-0 w-full h-[65%] flex flex-wrap justify-center gap-3">
                        <div className="w-[40%] aspect-square bg-black rounded-2xl" />
                        <div className="w-[40%] aspect-square bg-black rounded-2xl" />
                        <div className="w-[40%] aspect-square bg-black rounded-2xl" />
                    </div>
                );

            case "mix":
                return (
                    <div className="absolute bottom-0 w-full h-[65%] flex flex-wrap justify-center gap-3">
                        <div className="w-[40%] aspect-square bg-black rounded-full" />
                        <div className="w-[40%] aspect-square bg-black rounded-2xl" />
                        <div className="w-[40%] h-20 bg-black rounded-full" />
                    </div>
                );

            case "rotate":
                return (
                    <div className="absolute bottom-0 w-full h-[65%] flex justify-center items-end">
                        <div className="w-32 h-32 bg-black rounded-xl rotate-12" />
                        <div className="w-32 h-32 bg-black rounded-full -ml-10 opacity-80" />
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="overflow-x-hidden bg-black">
            <section ref={sectionRef} className="relative mt-32 lg:px-20 px-5">
                <div className="flex lg:flex-row flex-col gap-2 mb-10">
                    <h1 className="text-white text-[3rem] lg:text-[6rem] text-left">
                        Core Values
                    </h1>
                    <p className="text-white/50 text-sm lg:text-xl lg:mt-20 text-left">
                        Principles that guide our work.
                    </p>
                </div>

                <div className="flex pr-56">
                    <div ref={stripRef} className="flex flex-nowrap">
                        {cards.map((card, i) => (
                            <div
                                key={i}
                                className="w-[85vw] sm:w-[65vw] md:w-[45vw] lg:w-[30vw] xl:w-[25vw] p-4 shrink-0"
                            >
                                <div className="relative w-full h-[420px] rounded-3xl bg-[#c9c6de] overflow-hidden flex flex-col items-center pt-10 hover:scale-[1.03] transition">

                                    <h2 className="text-black text-2xl md:text-3xl font-semibold text-center px-4">
                                        {card.title}
                                    </h2>

                                    {renderShapes(card.type)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom */}
            {/* <section className="h-screen flex items-center justify-center">
                <h3 className="text-white text-2xl md:text-4xl">
                    That's it!
                </h3>
            </section> */}
        </div>
    );
}