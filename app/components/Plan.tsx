"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

// ─── data ──────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    num: "01",
    title: "Long Video",
    detail: "1 minute · Full Edit · Colour Grade",
    price: "₦800,000",
  },
  {
    num: "02",
    title: "Short Video",
    detail: "30 seconds · Social Ready",
    price: "₦500,000",
  },
  {
    num: "03",
    title: "Mini Video",
    detail: "15 seconds · Reel / Story Format",
    price: "₦250,000",
  },
];

// ─── page ──────────────────────────────────────────────────────────────────────

export default function Plan() {
  // refs
  const pageRef     = useRef<HTMLDivElement>(null);
  const headerRef   = useRef<HTMLDivElement>(null);
  const brandRef    = useRef<HTMLDivElement>(null);
  const dividerRef  = useRef<HTMLDivElement>(null);
  const tableHeadRef = useRef<HTMLDivElement>(null);
  const rowsRef     = useRef<(HTMLDivElement | null)[]>([]);
  const footerRef   = useRef<HTMLDivElement>(null);
  const availRef    = useRef<HTMLDivElement>(null);
  const scanRef     = useRef<HTMLDivElement>(null);
  const orbitRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Header drops in
      tl.from(headerRef.current,  { y: -28, opacity: 0, duration: 0.8 }, 0.2)
        .from(brandRef.current,   { opacity: 0, duration: 0.6 }, 0.55)
        .from(dividerRef.current, { scaleX: 0, opacity: 0, duration: 0.9, transformOrigin: "left", ease: "power4.out" }, 0.7)
        .from(tableHeadRef.current, { opacity: 0, duration: 0.5 }, 0.95);

      // Rows stagger in from left
      tl.from(
        rowsRef.current.filter(Boolean),
        { x: -24, opacity: 0, stagger: 0.14, duration: 0.65, ease: "power3.out" },
        1.0
      );

      // Footer
      tl.from(footerRef.current, { opacity: 0, y: 12, duration: 0.6 }, 1.55)
        .from(availRef.current,  { opacity: 0, duration: 0.5 }, 1.75);

      // Slow orbit ring
      gsap.to(orbitRef.current, { rotation: 360, duration: 28, ease: "none", repeat: -1 });

      // Scan line loop
      if (scanRef.current) {
        gsap.fromTo(
          scanRef.current,
          { top: "-2%", opacity: 0 },
          { top: "102%", opacity: 1, duration: 7, ease: "none", repeat: -1, repeatDelay: 2 }
        );
      }

    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Google fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Barlow:wght@300;400;500;600&display=swap');
        .font-cormorant { font-family: 'Cormorant Garamond', serif; }
        .font-barlow    { font-family: 'Barlow', sans-serif; }
      `}</style>

      {/* ── full-page wrapper ─────────────────────────────────── */}
      <div
        ref={pageRef}
        className="font-barlow relative min-h-screen w-full bg-[#0a0a0a] flex items-center justify-center px-4 py-16"
      >

        {/* ── Card ─────────────────────────────────────────────── */}
        <div className="relative w-full max-w-[540px] aspect-square bg-[#0e0e0e] border border-white/[0.06] overflow-hidden">

          {/* Grain */}
          <div
            className="pointer-events-none absolute inset-0 z-20 opacity-[0.04]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "150px 150px",
            }}
            aria-hidden="true"
          />

          {/* Atmospheric glow */}
          <div
            className="pointer-events-none absolute -top-32 -left-24 w-[420px] h-[420px] z-[1]"
            style={{ background: "radial-gradient(ellipse, rgba(210,120,50,0.13) 0%, transparent 65%)" }}
            aria-hidden="true"
          />

          {/* Orbit ring */}
          <div
            ref={orbitRef}
            className="pointer-events-none absolute -top-40 -right-40 w-[420px] h-[420px] rounded-full border border-white/[0.03] z-[1]"
            aria-hidden="true"
          />

          {/* Scan line */}
          <div
            ref={scanRef}
            className="pointer-events-none absolute left-0 right-0 h-px z-10"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
              top: "-2%",
            }}
            aria-hidden="true"
          />

          {/* Corner brackets */}
          {[
            "top-[14px] left-[14px]",
            "top-[14px] right-[14px] scale-x-[-1]",
            "bottom-[14px] left-[14px] scale-y-[-1]",
            "bottom-[14px] right-[14px] scale-[-1]",
          ].map((pos, i) => (
            <div key={i} className={`absolute ${pos} w-[18px] h-[18px] z-10`} aria-hidden="true">
              <div className="absolute top-0 left-0 w-full h-px bg-[rgba(210,120,50,0.5)]" />
              <div className="absolute top-0 left-0 w-px h-full bg-[rgba(210,120,50,0.5)]" />
            </div>
          ))}

          {/* ── Inner layout ───────────────────────────────────── */}
          <div className="relative z-10 flex flex-col h-full w-full p-[7%]">

            {/* Header row */}
            <div className="flex items-start justify-between mb-[6%]">

              {/* Title */}
              <div ref={headerRef}>
                <p className="text-[9px] tracking-[0.32em] text-[rgba(210,120,50,0.7)] uppercase font-medium mb-1">
                  2025 Pricing
                </p>
                <h1 className="font-cormorant text-[clamp(2.2rem,8vw,3.2rem)] font-light leading-[0.92] tracking-tight text-white">
                  Rate<br />
                  <em className="not-italic text-[rgba(210,120,50,0.9)]">Card.</em>
                </h1>
                <p className="text-[9px] tracking-[0.22em] text-white/20 uppercase mt-2">
                  Product Videography
                </p>
              </div>

              {/* Brand */}
              <div ref={brandRef} className="text-right">
                <div className="flex items-center justify-end gap-1.5">
                  <span className="w-[5px] h-[5px] rounded-full bg-[rgba(210,120,50,0.8)]" />
                  <span className="font-cormorant text-[clamp(1rem,3.5vw,1.4rem)] font-semibold text-white tracking-wide">
                    Dara Studios
                  </span>
                </div>
                <p className="text-[8px] tracking-[0.3em] text-white/20 uppercase mt-1">
                  Visual Production
                </p>
              </div>
            </div>

            {/* Divider */}
            <div
              ref={dividerRef}
              className="h-px mb-[4%]"
              style={{ background: "linear-gradient(90deg, rgba(210,120,50,0.45), rgba(255,255,255,0.06), transparent)" }}
            />

            {/* Table head */}
            <div
              ref={tableHeadRef}
              className="grid grid-cols-[30px_1fr_auto] gap-2 pb-3"
            >
              {["S/N", "Description", "Price"].map((h, i) => (
                <p key={h} className={`text-[8px] tracking-[0.28em] text-white/20 uppercase font-medium ${i === 2 ? "text-right" : ""}`}>
                  {h}
                </p>
              ))}
            </div>

            {/* Rows */}
            <div className="flex flex-col flex-1">
              {SERVICES.map((s, i) => (
                <div
                  key={s.num}
                  ref={(el) => { rowsRef.current[i] = el; }}
                  className="group grid grid-cols-[30px_1fr_auto] gap-2 items-center py-[3.5%] border-t border-white/[0.05] relative overflow-hidden"
                >
                  {/* Left accent bar on hover */}
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[rgba(210,120,50,0.6)] scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-300" />

                  {/* Number */}
                  <span className="text-[9px] font-medium tracking-[0.1em] text-[rgba(210,120,50,0.5)] pl-[3px]">
                    {s.num}
                  </span>

                  {/* Description */}
                  <div>
                    <p className="text-[clamp(0.8rem,2.8vw,1rem)] font-light text-white/70 group-hover:text-white/90 transition-colors duration-300 tracking-wide">
                      {s.title}
                    </p>
                    <p className="text-[8px] tracking-[0.18em] text-white/20 uppercase mt-[2px]">
                      {s.detail}
                    </p>
                  </div>

                  {/* Price */}
                  <p className="font-cormorant text-[clamp(1rem,3.8vw,1.5rem)] font-normal text-[rgba(210,120,50,0.85)] group-hover:text-[rgba(210,120,50,1)] transition-colors duration-300 text-right whitespace-nowrap">
                    {s.price}
                  </p>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div
              ref={footerRef}
              className="flex items-end justify-between pt-[4%] mt-auto border-t border-white/[0.05]"
            >
              <div>
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  <a
                    href="mailto:darastudios00@gmail.com"
                    className="text-[8px] tracking-[0.16em] text-white/20 hover:text-[rgba(210,120,50,0.8)] transition-colors duration-300 uppercase"
                  >
                    darastudios00@gmail.com
                  </a>
                  <span className="text-white/10 text-[8px]">·</span>
                  <a
                    href="tel:+2347082313155"
                    className="text-[8px] tracking-[0.16em] text-white/20 hover:text-[rgba(210,120,50,0.8)] transition-colors duration-300 uppercase"
                  >
                    +234 708 231 3155
                  </a>
                </div>

                {/* Availability pulse */}
                <div ref={availRef} className="flex items-center gap-2 mt-2">
                  <span className="relative flex h-[5px] w-[5px]">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[rgba(210,120,50,0.5)] opacity-75" />
                    <span className="relative inline-flex rounded-full h-[5px] w-[5px] bg-[rgba(210,120,50,0.8)]" />
                  </span>
                  <span className="text-[8px] tracking-[0.2em] text-white/18 uppercase">
                    Accepting new projects
                  </span>
                </div>
              </div>

              <p className="font-cormorant text-[clamp(0.75rem,2.5vw,0.9rem)] italic text-white/12 tracking-widest">
                2025
              </p>
            </div>

          </div>
        </div>

        {/* ── CTA below card ────────────────────────────────────── */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <Link
            href="/contact"
            className="
              inline-flex items-center gap-2
              text-[9px] tracking-[0.28em] uppercase text-white/20
              hover:text-[rgba(210,120,50,0.7)] transition-colors duration-300
              border-b border-white/[0.08] hover:border-[rgba(210,120,50,0.3)] pb-0.5
            "
          >
            Book a project
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1 5h8M6 2l3 3-3 3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

      </div>
    </>
  );
}