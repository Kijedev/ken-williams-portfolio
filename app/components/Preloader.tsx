"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface PreloaderProps {
    onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
    const rootRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const counterRef = useRef<HTMLSpanElement>(null);
    const logoMarkRef = useRef<HTMLDivElement>(null);
    const logoTextRef = useRef<HTMLDivElement>(null);
    // const taglineRef = useRef<HTMLParagraphElement>(null);
    const ring1Ref = useRef<HTMLDivElement>(null);
    const ring2Ref = useRef<HTMLDivElement>(null);
    const ring3Ref = useRef<HTMLDivElement>(null);
    const linesRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const root = rootRef.current;
        const progress = progressRef.current;
        const counter = counterRef.current;
        const logoMark = logoMarkRef.current;
        const logoText = logoTextRef.current;
        // const tagline = taglineRef.current;
        const ring1 = ring1Ref.current;
        const ring2 = ring2Ref.current;
        const ring3 = ring3Ref.current;

        if (!root || !progress || !counter || !logoMark || !logoText || !ring1 || !ring2 || !ring3) return;

        document.body.style.overflow = "hidden";

        const ctx = gsap.context(() => {

            // ── Heartbeat / echo pulse on the rings ─────────────────
            // Each ring pulses outward and fades — staggered like a sonar ping
            const pulse = gsap.timeline({ repeat: -1, repeatDelay: 0.6 });

            pulse
                .fromTo(ring1,
                    { scale: 1, opacity: 0.35 },
                    { scale: 1.55, opacity: 0, duration: 1.4, ease: "power2.out" }
                )
                .fromTo(ring2,
                    { scale: 1, opacity: 0.25 },
                    { scale: 1.8, opacity: 0, duration: 1.7, ease: "power2.out" },
                    "-=1.2"
                )
                .fromTo(ring3,
                    { scale: 1, opacity: 0.15 },
                    { scale: 2.2, opacity: 0, duration: 2.0, ease: "power2.out" },
                    "-=1.5"
                );

            // ── Main entrance timeline ───────────────────────────────
            const tl = gsap.timeline({
                onComplete: () => {
                    pulse.kill();
                    document.body.style.overflow = "";
                    onComplete?.();
                },
            });

            tl.set(root, { opacity: 1, yPercent: 0 })

                // Logo mark bounces in
                .from(logoMark, {
                    scale: 0.3,
                    opacity: 0,
                    duration: 0.9,
                    ease: "back.out(2)",
                })
                .from(
                    logoText,
                    { y: 20, opacity: 0, duration: 0.7, ease: "power3.out" },
                    "-=0.35"
                )
                // .from(
                //     tagline,
                //     { y: 10, opacity: 0, duration: 0.55, ease: "power2.out" },
                //     "-=0.25"
                // );

            // Scan lines stagger in
            tl.from(
                linesRef.current.filter(Boolean),
                {
                    scaleX: 0,
                    opacity: 0,
                    duration: 1.1,
                    stagger: 0.16,
                    ease: "power2.out",
                },
                "<"
            );

            // ── Progress counter ─────────────────────────────────────
            const progressObj = { val: 0 };
            tl.to(
                progressObj,
                {
                    val: 100,
                    duration: 2.4,
                    ease: "power1.inOut",
                    onUpdate() {
                        const v = Math.round(progressObj.val);
                        if (counter) counter.textContent = String(v).padStart(3, "0");
                        if (progress) progress.style.transform = `scaleX(${v / 100})`;
                    },
                },
                "+=0.1"
            );

            // ── Exit: page pushes preloader UP ───────────────────────
            // 1. Content fades out quickly
            tl.to(
                [logoMark, logoText, counter, progress],
                { opacity: 0, duration: 0.35, stagger: 0.04, ease: "power2.in" },
                "+=0.3"
            )
                // 2. The entire preloader slides up and off screen,
                //    as if the hero page is rising from beneath and pushing it out
                .to(root, {
                    yPercent: -100,
                    duration: 0.95,
                    ease: "power4.inOut",
                }, "+=0.05");

        }, root);

        return () => {
            ctx.revert();
            document.body.style.overflow = "";
        };
    }, [onComplete]);

    return (
        <>
            {/*
        Keyframes injected once.
        "orbit" spins the faint outer orbit ring.
      */}
            <style>{`
        @keyframes orbit { to { transform: rotate(360deg); } }
      `}</style>

            <div
                ref={rootRef}
                className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black overflow-hidden"
                style={{ opacity: 0 }}
                aria-label="Loading Ekho Studios"
                role="status"
            >
                {/* ── Scan lines ──────────────────────────────────────── */}
                {["top-[18%]", "top-[36%]", "top-[64%]", "top-[82%]"].map((pos, i) => (
                    <div
                        key={i}
                        ref={(el) => { linesRef.current[i] = el; }}
                        className={`absolute inset-x-0 h-px bg-white/[0.04] ${pos} origin-left`}
                        style={{ transform: "scaleX(0)" }}
                        aria-hidden="true"
                    />
                ))}

                {/* ── Centre content ──────────────────────────────────── */}
                <div className="relative flex flex-col items-center gap-5 px-6 text-center">

                    {/* Logo mark + echo rings */}
                    <div ref={logoMarkRef} className="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24">

                        {/* Echo rings — absolutely positioned, centred on the mark */}
                        {/* Ring 3 — outermost */}
                        <div
                            ref={ring3Ref}
                            className="absolute inset-0 rounded-full border border-white/10"
                            style={{ transform: "scale(1)" }}
                            aria-hidden="true"
                        />
                        {/* Ring 2 */}
                        <div
                            ref={ring2Ref}
                            className="absolute inset-0 rounded-full border border-white/15"
                            style={{ transform: "scale(1)" }}
                            aria-hidden="true"
                        />
                        {/* Ring 1 — innermost pulse */}
                        <div
                            ref={ring1Ref}
                            className="absolute inset-0 rounded-full border border-white/25"
                            style={{ transform: "scale(1)" }}
                            aria-hidden="true"
                        />

                        {/* Static outer orbit ring (slow spin) */}
                        <div
                            className="absolute w-[calc(100%+24px)] h-[calc(100%+24px)] rounded-full border border-white/[0.07]"
                            style={{ animation: "orbit 8s linear infinite" }}
                            aria-hidden="true"
                        />

                        {/* Stable logo circle */}
                        <div className="relative z-10 w-full h-full rounded-full border border-white/20 flex items-center justify-center">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white/30 flex items-center justify-center">
                                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white" />
                            </div>
                        </div>
                    </div>

                    {/* Wordmark */}
                    <div ref={logoTextRef} className="flex flex-col items-center gap-1">
                        <span className="text-white text-4xl md:text-6xl font-light uppercase">
                            Ekho
                        </span>
                        <span className="text-white/30 text-sm md:text-xl tracking-[0.45em] uppercase">
                            Studios
                        </span>
                    </div>

                    {/* Tagline */}
                    {/* <p
                        ref={taglineRef}
                        className="text-[10px] sm:text-[11px] text-white/25 tracking-[0.25em] uppercase mt-1"
                    >
                        Product Videography
                    </p> */}
                </div>

                {/* ── Progress bar + counter ───────────────────────────── */}
                <div className="absolute bottom-10 sm:bottom-14 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 w-[min(280px,70vw)]">
                    <span
                        ref={counterRef}
                        className="text-[11px] text-white/25 tabular-nums tracking-[0.2em] font-light"
                    >
                        000
                    </span>
                    <div className="w-full h-px bg-white/10 overflow-hidden rounded-full">
                        <div
                            ref={progressRef}
                            className="h-full bg-white/60 origin-left"
                            style={{ transform: "scaleX(0)" }}
                            aria-hidden="true"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}