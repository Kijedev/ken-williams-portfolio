"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

export default function NotFound() {
  const rootRef    = useRef<HTMLDivElement>(null);
  const fourRef    = useRef<HTMLDivElement>(null);
  const zeroRef    = useRef<HTMLDivElement>(null);
  const four2Ref   = useRef<HTMLDivElement>(null);
  const labelRef   = useRef<HTMLParagraphElement>(null);
  const msgRef     = useRef<HTMLParagraphElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);
  const ring1Ref   = useRef<HTMLDivElement>(null);
  const ring2Ref   = useRef<HTMLDivElement>(null);
  const ring3Ref   = useRef<HTMLDivElement>(null);
  const scanRef    = useRef<HTMLDivElement>(null);
  const orbitRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Slow orbit ──────────────────────────────────────────
      gsap.to(orbitRef.current, {
        rotation: 360,
        duration: 30,
        ease: "none",
        repeat: -1,
      });

      // ── Scan line loop ──────────────────────────────────────
      gsap.fromTo(
        scanRef.current,
        { top: "-2%", opacity: 0 },
        { top: "102%", opacity: 1, duration: 6, ease: "none", repeat: -1, repeatDelay: 1.5 }
      );

      // ── Echo rings pulse (like the preloader heartbeat) ─────
      const pulse = gsap.timeline({ repeat: -1, repeatDelay: 0.8 });
      pulse
        .fromTo(ring1Ref.current,
          { scale: 1, opacity: 0.3 },
          { scale: 1.8, opacity: 0, duration: 1.6, ease: "power2.out" }
        )
        .fromTo(ring2Ref.current,
          { scale: 1, opacity: 0.2 },
          { scale: 2.3, opacity: 0, duration: 2.0, ease: "power2.out" },
          "-=1.3"
        )
        .fromTo(ring3Ref.current,
          { scale: 1, opacity: 0.12 },
          { scale: 2.8, opacity: 0, duration: 2.4, ease: "power2.out" },
          "-=1.7"
        );

      // ── Entrance timeline ───────────────────────────────────
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // "404" digits drop in with stagger
      tl.from([fourRef.current, zeroRef.current, four2Ref.current], {
          y: -60,
          opacity: 0,
          stagger: 0.1,
          duration: 1.0,
          ease: "back.out(1.4)",
        }, 0.2)
        .from(labelRef.current,  { y: 20, opacity: 0, duration: 0.7 }, 0.65)
        .from(msgRef.current,    { y: 16, opacity: 0, duration: 0.7 }, 0.8)
        .from(ctaRef.current,    { y: 16, opacity: 0, duration: 0.65 }, 0.95);

      // Subtle flicker on the "0" digit — like a broken signal
      gsap.to(zeroRef.current, {
        opacity: 0.6,
        duration: 0.08,
        repeat: 5,
        yoyo: true,
        ease: "none",
        delay: 1.8,
        repeatDelay: 0.05,
      });

    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Barlow:wght@300;400;500&display=swap');
        .font-cormorant { font-family: 'Cormorant Garamond', serif; }
        .font-barlow    { font-family: 'Barlow', sans-serif; }
      `}</style>

      <div
        ref={rootRef}
        className="font-barlow relative w-full min-h-screen bg-black text-white flex flex-col items-center justify-center overflow-hidden px-6"
      >

        {/* ── Grain ──────────────────────────────────────────── */}
        <div
          className="pointer-events-none absolute inset-0 z-1 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "180px 180px",
          }}
          aria-hidden="true"
        />

        {/* ── Orbit ring ─────────────────────────────────────── */}
        <div
          ref={orbitRef}
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-white/[0.03] z-[1]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-white/[0.02] z-[1]"
          aria-hidden="true"
        />

        {/* ── Echo rings (centred on the 404) ────────────────── */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] z-2">
          <div ref={ring1Ref} className="absolute inset-0 w-48 h-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20" style={{ left: "50%", top: "50%" }} />
          <div ref={ring2Ref} className="absolute inset-0 w-48 h-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15" style={{ left: "50%", top: "50%" }} />
          <div ref={ring3Ref} className="absolute inset-0 w-48 h-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" style={{ left: "50%", top: "50%" }} />
        </div>

        {/* ── Scan line ──────────────────────────────────────── */}
        <div
          ref={scanRef}
          className="pointer-events-none absolute left-0 right-0 h-px z-3"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
            top: "-2%",
          }}
          aria-hidden="true"
        />

        {[
          "top-6 left-6",
          "top-6 right-6 scale-x-[-1]",
          "bottom-6 left-6 scale-y-[-1]",
          "bottom-6 right-6 scale-[-1]",
        ].map((pos, i) => (
          <div key={i} className={`absolute ${pos} w-5 h-5 z-4`} aria-hidden="true">
            <div className="absolute top-0 left-0 w-full h-px bg-white/15" />
            <div className="absolute top-0 left-0 w-px h-full bg-white/15" />
          </div>
        ))}

        <div className="relative z-10 flex flex-col items-center text-center max-w-lg">

          {/* 404 digits */}
          <div className="flex items-end gap-1 md:gap-2 mb-8 leading-none select-none">
            <span
              ref={fourRef}
              className="font-cormorant font-light text-[clamp(7rem,22vw,14rem)] leading-none text-white/90 tracking-tighter"
            >
              4
            </span>
            <span
              ref={zeroRef}
              className="font-cormorant font-light text-[clamp(7rem,22vw,14rem)] leading-none text-white/25 tracking-tighter"
            >
              0
            </span>
            <span
              ref={four2Ref}
              className="font-cormorant font-light text-[clamp(7rem,22vw,14rem)] leading-none text-white/90 tracking-tighter"
            >
              4
            </span>
          </div>

          {/* Label */}
          <p
            ref={labelRef}
            className="text-[16px] capitalize text-white/25 mb-5"
          >
            Frame not found
          </p>

          {/* Thin rule */}
          <div className="w-16 h-px bg-linear-to-r from-transparent via-white/20 to-transparent mb-5" />

          {/* Message */}
          <p
            ref={msgRef}
            className="text-sm text-white/30 font-light leading-relaxed tracking-wide max-w-xs"
          >
            This page has been cut from the final edit. Let's get you back to something that made it through post-production.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row items-center gap-4 mt-10">
            <Link
              href="/"
              className="group inline-flex items-center gap-2.5 px-7 py-3 rounded-full border border-white/15 hover:border-white/45 text-[16px] capitalize font-light text-white/50 hover:text-white transition-all duration-300"
            >
              Back to home
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none"
                className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300">
                <path d="M1 5.5h9M6 2l3.5 3.5L6 9" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>

            {/* <Link
              href="/contact"
              className="text-[10px] tracking-[0.22em] uppercase text-white/18 hover:text-white/45 transition-colors duration-300 border-b border-white/[0.08] hover:border-white/25 pb-0.5"
            >
              Contact us
            </Link> */}
          </div>

          {/* Studio mark */}
          <div className="flex items-center gap-2.5 mt-16">
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <span className="text-[9px] tracking-[0.35em] uppercase text-white/15">
              Ekho Studios
            </span>
          </div>
        </div>

      </div>
    </>
  );
}