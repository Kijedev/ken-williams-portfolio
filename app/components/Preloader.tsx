"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete?: () => void;
}

const BLADE_COUNT = 6;

export default function Preloader({ onComplete }: PreloaderProps) {
  const rootRef     = useRef<HTMLDivElement>(null);
  const bladesRef   = useRef<(HTMLDivElement | null)[]>([]);
  const labelRef    = useRef<HTMLDivElement>(null);
  const counterRef  = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const frameRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root     = rootRef.current;
    const blades   = bladesRef.current.filter(Boolean) as HTMLDivElement[];
    const label    = labelRef.current;
    const counter  = counterRef.current;
    const progress = progressRef.current;
    const frame    = frameRef.current;

    if (!root || !blades.length || !label || !counter || !progress || !frame) return;

    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {

      // Blades start off-screen above — slam down on load
      gsap.set(blades, { yPercent: -100 });

      const entranceTl = gsap.timeline({ defaults: { ease: "power4.out" } });

      entranceTl
        .to(blades, {
          yPercent: 0,
          duration: 0.7,
          stagger: { each: 0.07, from: "edges" },
        })
        .from(frame, { scale: 1.06, opacity: 0, duration: 0.5, ease: "power3.out" }, "-=0.2")
        .from(label, { y: 24, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.3");

      const progressObj = { val: 0 };
      entranceTl.to(progressObj, {
        val: 100,
        duration: 2.2,
        ease: "power1.inOut",
        onUpdate() {
          const v = Math.round(progressObj.val);
          if (counter)  counter.textContent = String(v).padStart(2, "0") + "%";
          if (progress) progress.style.transform = `scaleX(${v / 100})`;
        },
      }, "+=0.1");

      entranceTl
        .to([label, frame], { opacity: 0, y: -12, duration: 0.35, stagger: 0.06, ease: "power2.in" }, "+=0.25")
        .to(blades, {
          yPercent: -100,
          duration: 0.65,
          stagger: { each: 0.06, from: "center" },
          ease: "power4.inOut",
          onComplete: () => {
            document.body.style.overflow = "";
            onComplete?.();
          },
        }, "-=0.05");

    }, root);

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Barlow:wght@300;400;500&display=swap');
      `}</style>

      {/*
        ✅ FIX 1: opacity is 1 here in the JSX, not set by GSAP.
        This means the preloader is immediately visible on first render,
        before useEffect fires — no flash of the homepage.
      */}
      <div
        ref={rootRef}
        className="fixed inset-0 z-[99999] overflow-hidden"
        style={{ opacity: 1 }}
        aria-label="Loading Ekho Studios"
        role="status"
      >
        {/* Shutter blades */}
        <div className="absolute inset-0 flex">
          {Array.from({ length: BLADE_COUNT }).map((_, i) => (
            <div
              key={i}
              ref={(el) => { bladesRef.current[i] = el; }}
              className="flex-1 h-full relative"
              style={{ background: i % 2 === 0 ? "#0a0a0a" : "#080808" }}
            >
              {i < BLADE_COUNT - 1 && (
                <div className="absolute right-0 top-0 bottom-0 w-px bg-white/[0.04]" aria-hidden="true" />
              )}
              <div
                className="absolute left-1/2 top-[15%] bottom-[15%] w-px"
                style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.04), transparent)" }}
                aria-hidden="true"
              />
            </div>
          ))}
        </div>

        {/* Centre overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div ref={frameRef} className="relative flex flex-col items-center justify-center gap-6 px-12 py-10">
            <span className="absolute top-0 left-0 w-5 h-5 border-t border-l border-white/20" aria-hidden="true" />
            <span className="absolute top-0 right-0 w-5 h-5 border-t border-r border-white/20" aria-hidden="true" />
            <span className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-white/20" aria-hidden="true" />
            <span className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-white/20" aria-hidden="true" />

            <div ref={labelRef} className="flex flex-col items-center gap-2">
              <h1
                className="text-white leading-none tracking-[0.06em]"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.8rem, 8vw, 6rem)", fontWeight: 300 }}
              >
                Ekho
              </h1>
              <span
                className="text-white/25 tracking-[0.5em] uppercase"
                style={{ fontFamily: "Barlow, sans-serif", fontSize: "clamp(0.55rem, 1.2vw, 0.75rem)", fontWeight: 400 }}
              >
                Studios
              </span>
              <div className="w-12 h-px bg-white/15 mt-1" />
              <div className="flex flex-col items-center gap-3 mt-2 w-32">
                <span
                  ref={counterRef}
                  className="text-white/20 tabular-nums"
                  style={{ fontFamily: "Barlow, sans-serif", fontSize: "10px", letterSpacing: "0.22em" }}
                >
                  00%
                </span>
                <div className="w-full h-px bg-white/10 overflow-hidden rounded-full">
                  <div
                    ref={progressRef}
                    className="h-full bg-white/40 origin-left"
                    style={{ transform: "scaleX(0)" }}
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </div>

          <p
            className="absolute bottom-8 text-white/15 tracking-[0.35em] uppercase"
            style={{ fontFamily: "Barlow, sans-serif", fontSize: "9px" }}
          >
            Product Videography
          </p>
        </div>
      </div>
    </>
  );
}