"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import FAQs from "../components/FAQs";
import Ready from "../components/Ready";
import ScrollTextReveal from "../components/ui/ScrollTextReveal";
import ExpertiseSection from "../components/ExpertiseSection";

gsap.registerPlugin(ScrollTrigger);

const SHARED_DELIVERABLES = [
    "One orientation (vertical or horizontal)",
    "Delivered in HD",
    "Optimised for social media",
    "Colour graded",
];

const SERVICES = [
    {
        index: "01",
        title: "Long Video",
        category: "Signature",
        duration: "1 minute",
        price: "₦800,000",
        description:
            "A cinematic centrepiece built around your product. Story-driven and meticulously crafted — this is the film that defines your brand's visual identity and commands attention across every platform.",
        deliverables: [
            "1-min master cut",
            "Colour graded",
            "Original score / sound design",
            "4K / HD delivery",
            "One orientation (vertical or horizontal)",
            "Social media optimised",
        ],
        accent: "#e8c49a",
        tag: "Most Comprehensive",
    },
    {
        index: "02",
        title: "Short Video",
        category: "Performance",
        duration: "30 seconds",
        price: "₦500,000",
        description:
            "Built for scroll-stopping performance. A tightly edited, platform-optimised product film engineered to convert — ideal for Reels, TikTok, paid ads, and story placements.",
        deliverables: [
            "30-sec master cut",
            "Colour graded",
            "HD delivery",
            "One orientation (vertical or horizontal)",
            "Social media optimised",
            "Caption overlays optional",
        ],
        accent: "#a8c4e8",
        tag: "Most Popular",
    },
    {
        index: "03",
        title: "Mini Video",
        category: "Awareness",
        duration: "15 seconds",
        price: "₦250,000",
        description:
            "Maximum impact in minimum time. A punchy, attention-grabbing product clip engineered for the first three seconds that matter most — stories, bumper ads, and viral-format content.",
        deliverables: [
            "15-sec master cut",
            "Colour graded",
            "HD delivery",
            "One orientation (vertical or horizontal)",
            "Social media optimised",
            "Reel / Story format ready",
        ],
        accent: "#c4e8a8",
        tag: "Best Entry Point",
    },
];

const PROCESS = [
    { step: "01", label: "Discovery", detail: "Brief, references, objectives" },
    { step: "02", label: "Concept", detail: "Moodboard, treatment, storyboard" },
    { step: "03", label: "Production", detail: "Shoot day — controlled, efficient" },
    { step: "04", label: "Post", detail: "Edit, grade, sound, motion" },
    { step: "05", label: "Delivery", detail: "All formats, all platforms" },
];


export default function ServicesPage() {
    const pageRef = useRef<HTMLDivElement>(null);
    const eyebrowRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const subRef = useRef<HTMLParagraphElement>(null);
    const pinSectionRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const fillRef = useRef<HTMLDivElement>(null);
    const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
    const listItemsRef = useRef<(HTMLLIElement | null)[]>([]);
    const processTitleRef = useRef<HTMLDivElement>(null);
    const processRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const orbitRef = useRef<HTMLDivElement>(null);
    const sharedRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const hero = gsap.timeline({ defaults: { ease: "power3.out" } });
            hero
                .from(eyebrowRef.current, { y: 20, opacity: 0, duration: 0.7 }, 0.15)
                .from(headingRef.current, { y: 56, opacity: 0, duration: 1.1 }, 0.3)
                .from(subRef.current, { y: 24, opacity: 0, duration: 0.8 }, 0.55);

            gsap.to(orbitRef.current, { rotation: 360, duration: 38, ease: "none", repeat: -1 });

            const listItems = listItemsRef.current.filter(Boolean) as HTMLLIElement[];
            const slides = slidesRef.current.filter(Boolean) as HTMLDivElement[];
            const fill = fillRef.current;

            if (!listItems.length || !slides.length || !fill || !pinSectionRef.current) return;

            gsap.set(fill, { scaleY: 1 / listItems.length, transformOrigin: "top left" });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: pinSectionRef.current,
                    start: "top top",
                    end: "+=" + listItems.length * 50 + "%",
                    pin: true,
                    scrub: true,
                },
            });

            listItems.forEach((item, i) => {
                const prevItem = listItems[i - 1];
                const prevSlide = slides[i - 1];

                if (prevItem) {
                    tl.set(item, { color: SERVICES[i]?.accent ?? "#e8c49a" }, 0.5 * i)
                        .to(slides[i], { autoAlpha: 1, duration: 0.2 }, "<")
                        .set(prevItem, { color: "rgba(255,255,255,0.18)" }, "<")
                        .to(prevSlide, { autoAlpha: 0, duration: 0.2 }, "<");
                } else {
                    gsap.set(item, { color: SERVICES[0]?.accent ?? "#e8c49a" });
                    gsap.set(slides[0], { autoAlpha: 1 });
                }
            });

            tl.to(fill, {
                scaleY: 1,
                transformOrigin: "top left",
                ease: "none",
                duration: tl.duration(),
            }, 0).to({}, {});

            gsap.from(sharedRef.current!.children, {
                y: 20, opacity: 0, stagger: 0.08, duration: 0.6, ease: "power3.out",
                scrollTrigger: { trigger: sharedRef.current, start: "top 85%" },
            });

            gsap.from(processTitleRef.current, {
                y: 32, opacity: 0, duration: 0.8, ease: "power3.out",
                scrollTrigger: { trigger: processTitleRef.current, start: "top 85%" },
            });

            const steps = processRef.current?.querySelectorAll("[data-step]");
            if (steps) {
                gsap.from(steps, {
                    y: 24, opacity: 0, stagger: 0.1, duration: 0.65, ease: "power3.out",
                    scrollTrigger: { trigger: processRef.current, start: "top 80%" },
                });
            }
            const procLine = processRef.current?.querySelector("[data-process-line]");
            if (procLine) {
                gsap.from(procLine, {
                    scaleX: 0, transformOrigin: "left", duration: 1.2, ease: "power3.out",
                    scrollTrigger: { trigger: processRef.current, start: "top 80%" },
                });
            }

            gsap.from(ctaRef.current, {
                y: 32, opacity: 0, duration: 0.8, ease: "power3.out",
                scrollTrigger: { trigger: ctaRef.current, start: "top 88%" },
            });

        }, pageRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
            <div ref={pageRef} className="relative min-h-screen w-full bg-black text-white overflow-hidden">
                <div className="pointer-events-none fixed inset-0 z-1 opacity-[0.025]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                        backgroundSize: "180px 180px",
                    }} aria-hidden="true" />

                <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] opacity-[0.05] z-1"
                    style={{ background: "radial-gradient(ellipse, #fff 0%, transparent 65%)" }} aria-hidden="true" />

                <div ref={orbitRef}
                    className="pointer-events-none absolute -top-64 -right-64 w-[700px] h-[700px] rounded-full border border-white/3 z-1"
                    aria-hidden="true" />

                {/* Hero */}
                <section className="relative z-10 flex flex-col items-center justify-center w-full min-h-screen px-6 lg:px-20">
                    <div className="w-full pt-24 lg:pt-20">
                        <div className="flex flex-col">
                            <h1
                                className="lg:ml-14 uppercase text-[clamp(3.2rem,9vw,10rem)] font-extrabold leading-[0.95] tracking-tighter text-[#FEE9CE] mb-8">
                                Let us <br />
                            </h1>
                            <h1
                                className="lg:-mt-12 -mt-8 uppercase text-[clamp(4rem,9vw,10rem)] font-extrabold leading-[0.95] tracking-tighter text-[#FEE9CE] mb-8">
                                help you <br />
                            </h1>
                        </div>
                        <div>
                            <h1 className="lg:-mt-12 -mt-8 uppercase text-[clamp(5rem,9vw,10rem)] font-extrabold leading-[0.95] tracking-tighter text-[#EF5143] mb-8">achieve</h1>
                            <h1 className="lg:-mt-12 -mt-8 uppercase text-[clamp(5rem,9vw,10rem)] font-extrabold leading-[0.95] tracking-tighter text-[#EF5143] mb-8">your Brand</h1>
                            <h1 className="lg:-mt-12 -mt-8 uppercase text-[clamp(5rem,9vw,10rem)] font-extrabold leading-[0.95] tracking-tighter text-[#EF5143] mb-8">Goals</h1>
                        </div>
                    </div>

                    {/* Scroll cue */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 lg:mt-10">
                        <span className="text-[9px] tracking-[0.3em] uppercase text-white/20">Scroll</span>
                        <div className="w-px h-10 bg-linear-to-b from-white/20 to-transparent" />
                    </div>
                </section>

                <section className="h-screen w-full flex items-center justify-center text-white">
                    <Ready />
                </section>

                <div className="relative z-20 mt-[100vh]">
                    <ExpertiseSection />
                </div>

                {/* Scroll list */}
                <section
                    ref={pinSectionRef}
                    className="bg-black relative z-10 w-full min-h-screen flex items-center justify-center border-t border-b border-dashed border-white/8"
                >
                    <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8 relative">

                        {/* Left: fill bar + titles */}
                        <div className="relative shrink-0 pr-8 md:pr-16 flex items-center">
                            <div ref={fillRef}
                                className="absolute left-0 top-0 w-[2px] h-full origin-top"
                                style={{ background: "linear-gradient(to bottom, #e8c49a, #a8c4e8, #c4e8a8)" }}
                                aria-hidden="true" />

                            <ul ref={listRef} className="list-none m-0 p-0 pl-6 flex flex-col gap-8 md:gap-10">
                                {SERVICES.map((s, i) => (
                                    <li key={s.title}
                                        ref={(el) => { listItemsRef.current[i] = el; }}
                                        className="cursor-default select-none transition-colors duration-300"
                                        style={{ color: "rgba(255,255,255,0.18)" }}>
                                        <span className="block text-[9px] tracking-[0.28em] uppercase font-light mb-1.5"
                                            style={{ color: "rgba(255,255,255,0.2)" }}>
                                            {s.category}
                                        </span>
                                        <span className="font-cormorant block text-[clamp(1.6rem,3.8vw,2.8rem)] font-light leading-tight tracking-tight">
                                            {s.title}
                                        </span>
                                        <span className="block text-[10px] tracking-[0.15em] mt-1 font-light"
                                            style={{ color: "rgba(255,255,255,0.15)" }}>
                                            {s.duration}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Right */}
                        <div className="flex-1 relative min-h-[420px] md:min-h-[480px]">
                            {SERVICES.map((s, i) => (
                                <div key={s.title}
                                    ref={(el) => { slidesRef.current[i] = el; }}
                                    className="absolute inset-0 flex flex-col justify-center"
                                    style={{ opacity: 0, visibility: "hidden" }}>

                                    <div className="relative border border-white/[0.07] p-7 md:p-10 bg-[#010101] rounded-2xl overflow-hidden max-w-lg ml-auto w-full">
                                        {/* Accent glow */}
                                        <div className="pointer-events-none absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-[0.07]"
                                            style={{ background: `radial-gradient(ellipse, ${s.accent} 0%, transparent 65%)` }}
                                            aria-hidden="true" />

                                        {/* Corner bracket */}
                                        <div className="absolute top-4 right-4 w-4 h-4" aria-hidden="true">
                                            <div className="absolute top-0 right-0 w-full h-px" style={{ background: s.accent, opacity: 0.4 }} />
                                            <div className="absolute top-0 right-0 w-px h-full" style={{ background: s.accent, opacity: 0.4 }} />
                                        </div>

                                        {/* Tag badge */}
                                        {s.tag && (
                                            <div className="inline-flex items-center gap-2 mb-5">
                                                <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.accent }} />
                                                <span className="text-[9px] tracking-[0.28em] uppercase font-light"
                                                    style={{ fontFamily: "Barlow, sans-serif", color: s.accent, opacity: 0.7 }}>
                                                    {s.tag}
                                                </span>
                                            </div>
                                        )}

                                        {/* Price */}
                                        <div className="flex items-baseline gap-3 mb-1">
                                            <span className="font-cormorant text-[clamp(2rem,5vw,3.2rem)] font-light leading-none"
                                                style={{ color: s.accent }}>
                                                {s.price}
                                            </span>
                                            <span className="text-[9px] tracking-[0.2em] uppercase text-white/20 font-light"
                                                style={{ fontFamily: "Barlow, sans-serif" }}>
                                                {s.duration}
                                            </span>
                                        </div>

                                        {/* Divider */}
                                        <div className="h-px mb-5 mt-4 opacity-15"
                                            style={{ background: `linear-gradient(90deg, ${s.accent}, transparent)` }} />

                                        {/* Description */}
                                        <p className="text-sm text-white/45 font-light leading-relaxed mb-7 tracking-wide">
                                            {s.description}
                                        </p>

                                        {/* Deliverables */}
                                        <div className="flex flex-col gap-2.5 mb-7">
                                            <span className="text-[9px] tracking-[0.28em] uppercase text-white/20 mb-1"
                                                style={{ fontFamily: "Barlow, sans-serif" }}>
                                                What's included
                                            </span>
                                            {s.deliverables.map((d) => (
                                                <div key={d} className="flex items-center gap-3">
                                                    <span className="w-3 h-px shrink-0" style={{ background: s.accent, opacity: 0.4 }} />
                                                    <span className="text-xs text-white/40 font-light tracking-wide">{d}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* CTA */}
                                        <Link href="/contact"
                                            className="group inline-flex items-center gap-2.5 px-6 py-2.5 border text-[10px] tracking-[0.2em] uppercase font-light transition-all duration-300"
                                            style={{
                                                borderColor: `${s.accent}30`,
                                                color: `${s.accent}90`,
                                                fontFamily: "Barlow, sans-serif",
                                            }}
                                            onMouseEnter={(e) => {
                                                (e.currentTarget as HTMLElement).style.borderColor = `${s.accent}70`;
                                                (e.currentTarget as HTMLElement).style.color = s.accent;
                                            }}
                                            onMouseLeave={(e) => {
                                                (e.currentTarget as HTMLElement).style.borderColor = `${s.accent}30`;
                                                (e.currentTarget as HTMLElement).style.color = `${s.accent}90`;
                                            }}
                                        >
                                            Book this package
                                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                                <path d="M1 5h8M6 2l3 3-3 3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Package */}
                <section className="relative z-10 border-t border-white/6">
                    <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 py-16 md:py-20">
                        <div className="flex flex-col md:flex-row md:items-start gap-10 md:gap-20">

                            <div className="shrink-0">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="w-5 h-px bg-white/20" />
                                    <span className="text-[14px] tracking-[0.15em] uppercase text-white/20 font-light">
                                        Every package includes
                                    </span>
                                </div>
                            </div>

                            <div ref={sharedRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                                {SHARED_DELIVERABLES.map((d) => (
                                    <div key={d} className="flex items-center gap-3 py-3 border-b border-white/5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-white/20 shrink-0" />
                                        <span className="text-lg text-white/40 font-light tracking-wide">{d}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Process */}
                <section className="relative z-10 border-t border-white/6 bg-[#010101]">
                    <div className="max-w-8xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 py-20 md:py-28">
                        <div ref={processTitleRef} className="flex items-center gap-3 mb-14">
                            <span className="w-6 h-px bg-white/20" />
                            <span className="text-[14px] tracking-[0.15em] uppercase text-white/25 font-light">The Process</span>
                        </div>

                        <div ref={processRef} className="relative">
                            <div data-process-line
                                className="hidden md:block absolute top-[18px] left-[20px] right-[20px] h-px bg-white/6"
                                aria-hidden="true" />

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 md:gap-4">
                                {PROCESS.map((p) => (
                                    <div key={p.step} data-step className="relative flex flex-col gap-10">
                                        <div className="w-9 h-9 rounded-full border border-white/12 flex items-center justify-center bg-[#080808] shrink-0 relative z-10">
                                            <span className="text-[12px] tracking-[0.15em] text-white/30 font-light tabular-nums">{p.step}</span>
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <span className="text-[20px] font-light text-white tracking-wide">{p.label}</span>
                                            <span className="text-[14px] text-white/25 capitalize font-light leading-relaxed">{p.detail}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="relative z-10 border-t border-white/6">
                    <div ref={ctaRef}
                        className="max-w-8xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 py-20 md:py-28 flex flex-col md:flex-row md:items-end justify-between gap-10">
                        <div className="flex flex-col gap-4 max-w-2xl">
                            <h2 className="font-cormorant text-[clamp(2rem,5vw,4rem)] font-light leading-none tracking-tight text-white">
                                Ready to make your<br />
                                <em className="not-italic text-white/30">product unforgettable?</em>
                            </h2>
                        </div>

                        <div className="flex flex-col gap-4 items-start md:items-end shrink-0">
                            <Link href="/Contact"
                                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/15 hover:border-white/45 text-[16px] capitalize font-light text-white/50 hover:text-white transition-all duration-300">
                                Start a project
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                    className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300">
                                    <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </section>


                <div className="h-px bg-linear-to-r from-transparent via-white/[0.07] to-transparent" />
                {/* <div className="relative z-10">
                    <Ready />
                </div> */}
                <FAQs />
            </div>
        </>
    );
}