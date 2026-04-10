"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

// ─── config ──────────────────────────────────────────────────────────────────

const LINES = ["SplitText", "SplitText", "SplitText", "SplitText"];
const ANIM_TIME = 0.9;
const STAGGER_CHARS = 0.08;
const STAGGER_LINES = 0.45;

// ─── component ───────────────────────────────────────────────────────────────

export default function SplitTextTube() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const lines = lineRefs.current.filter(Boolean) as HTMLHeadingElement[];
    if (!container || lines.length === 0) return;

    // Make container visible
    gsap.set(container, { visibility: "visible" });

    const depth = -window.innerWidth / 8;
    const transformOrigin = `50% 50% ${depth}px`;

    // Split each line into chars
    const splitLines = lines.map(
      (line) => new SplitText(line, { type: "chars", charsClass: "char" })
    );

    // 3D perspective on every line
    gsap.set(lines, {
      perspective: 700,
      transformStyle: "preserve-3d",
    });

    // Build the looping timeline
    const tl = gsap.timeline({ repeat: -1 });
    tlRef.current = tl;

    splitLines.forEach((split, index) => {
      tl.fromTo(
        split.chars,
        { rotationX: -90 },
        {
          rotationX: 90,
          stagger: STAGGER_CHARS,
          duration: ANIM_TIME,
          ease: "none",
          transformOrigin,
        },
        index * STAGGER_LINES
      );
    });

    return () => {
      tl.kill();
      splitLines.forEach((s) => s.revert());
    };
  }, []);

  return (
    /*
     * Outer wrapper — full viewport, centred, invisible until GSAP sets
     * visibility: visible (matches original behaviour).
     */
    <div
      ref={containerRef}
      className="flex items-center justify-center w-full h-full"
      style={{ visibility: "hidden" }}
    >
      {/* Tube — relative container that all absolute lines sit inside */}
      <div className="relative w-full" style={{ height: "24vw" }}>
        {LINES.map((text, i) => (
          <h1
            key={i}
            ref={(el) => {
              lineRefs.current[i] = el;
            }}
            className="absolute top-1/2 left-1/2 m-0 leading-none text-center whitespace-nowrap"
            style={{
              transform: "translate(-50%, -50%)",
              fontSize: "18vw",
              letterSpacing: "-0.6vw",
            }}
          >
            {text}
          </h1>
        ))}
      </div>
    </div>
  );
}