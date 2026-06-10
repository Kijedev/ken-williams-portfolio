"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const logo = logoRef.current;
    const line = lineRef.current;
    const counter = counterRef.current;
    if (!overlay || !logo || !line || !counter) return;

    // Lock scroll while preloader is active
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Entrance — logo fades + slides up
      tl.from(logo, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      })

      // 2. Line grows
      .from(line, {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 0.8,
        ease: "power2.inOut",
      }, "-=0.3")

      // 3. Counter counts up 0 → 100
      .to({}, {
        duration: 1.4,
        ease: "power1.inOut",
        onUpdate() {
          const p = Math.round(this.progress() * 100);
          if (counter) counter.textContent = `${p}`;
        },
      }, "-=0.8")

      // 4. Hold briefly
      .to({}, { duration: 0.3 })

      // 5. Fade out logo/line before the slam
      .to([logo, line, counter], {
        opacity: 0,
        y: -20,
        duration: 0.45,
        ease: "power2.in",
        stagger: 0.06,
      })

      // 6. The cinematic upward slam with elastic wobble
      .to(overlay, {
        yPercent: -100,
        duration: 1.1,
        ease: "elastic.out(1, 0.75)",
        onComplete: () => {
          document.body.style.overflow = "";
          // Refresh ScrollTrigger now that the page is visible
          ScrollTrigger.refresh(true);
          onComplete();
        },
      });
    });

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-black"
      style={{ willChange: "transform" }}
    >
      {/* Logo / brand name */}
      <div ref={logoRef} className="flex flex-col items-center gap-4">
        <span
          style={{
            fontSize: "clamp(2.5rem, 8vw, 5rem)",
            fontWeight: 300,
            letterSpacing: "-0.03em",
            color: "#FEE9CE",
            lineHeight: 1,
          }}
        >
          Ekho Studios
        </span>

        {/* Thin line */}
        <div
          ref={lineRef}
          className="w-full h-px bg-white/20"
          style={{ width: "clamp(160px, 30vw, 320px)" }}
        />

        {/* Counter */}
        <span
          ref={counterRef}
          className="text-white/30 tabular-nums"
          style={{ fontSize: "clamp(0.75rem, 1.5vw, 0.9rem)", letterSpacing: "0.15em" }}
        >
          0
        </span>
      </div>
    </div>
  );
}