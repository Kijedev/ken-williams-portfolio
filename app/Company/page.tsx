"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CoreValues from "../components/CoreValues";
import FAQs from "../components/FAQs";
import Whoweare from "../components/Whoweare";
import Mission from "../components/Mission";

gsap.registerPlugin(ScrollTrigger);

const STORY_PARAGRAPHS = [
    `I tested positive for COVID on the 31st of December, 2020. The result came in very late at night and I couldn't travel home. I spent the entire January looking for food vendors to deliver food to me — but the available food delivery providers didn't deliver during public holidays. I eventually found one after so many hours and ended up paying 4× the regular amount.`,
    `During my 14-day isolation, I realised no one was really looking into the logistics problem with the care and attention I would have wished for. I started asking questions; most answers ended with "dispatch riders are not reliable." I made a lot of research and discovered delivery companies in countries like India made millions of deliveries daily. No one comes close locally — and it didn't make sense that at such a small scale, we Africans couldn't figure it out.`,
    // `We initially approached the problem from a technical standpoint, then realised the problem was more operations than tech — and we needed to deconstruct operations before trying again. We went back to first principles. We pulled funds from our pockets, got three bikes and riders, and gave two of them to Korede Spaghetti and one to NiFries. We held weekly meetings with our riders and that gave us so much insight.`,
    // `With a better understanding of what we believed the problem was, we knew our solution had to be efficient and easy to use. This was hard to pull as we struggled — but every obstacle sharpened our resolve and deepened our conviction that what we were building mattered.`,
];

export default function Company() {
    const pageRef = useRef<HTMLElement>(null);
    const eyebrowRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const founderRef = useRef<HTMLDivElement>(null);
    const storyRef = useRef<HTMLDivElement>(null);
    const paraRefs = useRef<(HTMLParagraphElement | null)[]>([]);
    const orbitRef = useRef<HTMLDivElement>(null);
    const dividerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {

            // ── Hero entrance ──────────────────────────────────────
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
            tl.from(eyebrowRef.current, { y: 20, opacity: 0, duration: 0.7 }, 0.2)
                .from(headingRef.current, { y: 60, opacity: 0, duration: 1.1 }, 0.35)
                .from(dividerRef.current, { scaleX: 0, transformOrigin: "center", duration: 1, ease: "power4.out" }, 0.7);

            // ── Orbit spin ─────────────────────────────────────────
            gsap.to(orbitRef.current, { rotation: 360, duration: 40, ease: "none", repeat: -1 });

            // ── Founder image reveal ───────────────────────────────
            gsap.from(imageRef.current, {
                y: 40, opacity: 0, duration: 1, ease: "power3.out",
                scrollTrigger: { trigger: imageRef.current, start: "top 85%" },
            });

            // ── Founder name/title ─────────────────────────────────
            gsap.from(founderRef.current, {
                y: 20, opacity: 0, duration: 0.8, ease: "power3.out",
                scrollTrigger: { trigger: founderRef.current, start: "top 88%" },
            });

            // ── Story paragraphs ───────────────────────────────────
            paraRefs.current.filter(Boolean).forEach((p, i) => {
                gsap.from(p, {
                    y: 28, opacity: 0, duration: 0.75, ease: "power3.out",
                    scrollTrigger: { trigger: p, start: "top 88%" },
                    delay: i * 0.05,
                });
            });

        }, pageRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
            <main
                ref={pageRef}
                className="font-barlow relative w-full min-h-screen bg-black text-white overflow-hidden"
            >
                {/* ── Glow ─────────────────────────────────────────────── */}
                <div
                    className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] opacity-[0.05] z-1"
                    style={{ background: "radial-gradient(ellipse, #fff 0%, transparent 65%)" }}
                    aria-hidden="true"
                />

                {/* ── Orbit ring ───────────────────────────────────────── */}
                <div
                    ref={orbitRef}
                    className="pointer-events-none absolute -top-56 -right-56 w-[600px] h-[600px] rounded-full border border-white/10 z-1"
                    aria-hidden="true"
                />

                <div>
                    <Whoweare />
                </div>

                {/* <section className="relative z-10 flex flex-col items-center justify-center text-center min-h-[55vh] px-6 pt-36 pb-12">
                    <div ref={eyebrowRef} className="flex items-center justify-center gap-3 mb-6">
                        <span className="w-6 h-px bg-white/20" />
                        <span className="text-[10px] tracking-[0.4em] uppercase text-white/25 font-light">
                            About Us
                        </span>
                        <span className="w-6 h-px bg-white/20" />
                    </div>
                    <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] opacity-[0.05] z-1"
                        style={{ background: "radial-gradient(ellipse, #fff 0%, transparent 65%)" }} aria-hidden="true" />

                    <h1
                        ref={headingRef}
                        className="font-cormorant text-[clamp(3.5rem,10vw,8rem)] font-light leading-[0.92] tracking-tight"
                    >
                        Who we{" "}
                        <em className="not-italic text-white/25">are</em>
                    </h1>
                    <div
                        ref={dividerRef}
                        className="mt-10 w-24 h-px bg-linear-to-r from-transparent via-white/25 to-transparent"
                    />
                </section> */}

                <section className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 pb-24 md:pb-10">
                    {/* Section label */}
                    <div className="flex items-center gap-3 mb-14">
                        <span className="w-6 h-px bg-white/20" />
                        <span className="text-[16px] tracking-[0.35em] uppercase text-white/25 font-light">
                            Founder's Story
                        </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-12 lg:gap-20 items-start">

                        {/* ── Left: portrait ───────────────────────────────── */}
                        <div className="flex flex-col items-center lg:items-start gap-6 lg:sticky lg:top-28">

                            {/* Image frame */}
                            <div ref={imageRef} className="relative w-full max-w-[300px] lg:max-w-none">

                                {/* Corner accents */}
                                {[
                                    "top-[-1px] left-[-1px]",
                                    "top-[-1px] right-[-1px] scale-x-[-1]",
                                    "bottom-[-1px] left-[-1px] scale-y-[-1]",
                                    "bottom-[-1px] right-[-1px] scale-[-1]",
                                ].map((pos, i) => (
                                    <div key={i} className={`absolute ${pos} w-5 h-5 z-10`} aria-hidden="true">
                                        <div className="absolute top-0 left-0 w-full h-px bg-white/20" />
                                        <div className="absolute top-0 left-0 w-px h-full bg-white/20" />
                                    </div>
                                ))}

                                <div className="overflow-hidden">
                                    <Image
                                        src="/kenprofile.jpeg"
                                        alt="Ken Williams — Founder, Ekho Studios"
                                        width={400}
                                        height={500}
                                        className="object-cover w-full rounded cursor-pointer grayscale hover:grayscale-0 transition-all duration-700"
                                    />
                                </div>
                            </div>

                            {/* Founder identity */}
                            <div ref={founderRef} className="flex flex-col gap-1 text-center lg:text-left">
                                <h3 className="text-2xl md:text-3xl font-light text-white tracking-tight">
                                    Ken Williams
                                </h3>
                                <p className="text-[14px] capitalize text-white/40 font-light">
                                    Founder & Creative Director
                                </p>
                                <p className="text-[14px] capitalize text-white/40 font-light">
                                    Ekho Studios
                                </p>
                            </div>
                        </div>

                        {/* ── Right: story ─────────────────────────────────── */}
                        <div className="flex flex-col gap-0">

                            {/* Pull quote */}
                            <blockquote className="text-[clamp(1.4rem,3.2vw,2.2rem)] font-light leading-[1.2] tracking-tight text-[#FEE9CE] mb-10 italic border-l border-white/10 pl-6">
                                "No one was really looking into the problem with the care and attention it deserved."
                            </blockquote>

                            {/* Thin divider */}
                            <div className="h-px mb-10 bg-linear-to-r from-white/10 via-white/5 to-transparent" />

                            {/* Story paragraphs */}
                            <div className="flex flex-col gap-7">
                                {STORY_PARAGRAPHS.map((para, i) => (
                                    <p
                                        key={i}
                                        ref={(el) => { paraRefs.current[i] = el; }}
                                        className="text-sm md:text-[15px] text-white/40 font-light leading-relaxed tracking-wide"
                                    >
                                        {para}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <Mission />

                <CoreValues />
                <FAQs />
            </main>
        </>
    );
}