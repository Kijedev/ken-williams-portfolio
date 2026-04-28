"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Present() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;

    if (!section || !text) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        text,
        {
          backgroundPosition: "0% 100%",
        },
        {
          backgroundPosition: "0% 0%",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=100%",
            scrub: true,
            pin: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full flex items-center justify-center bg-black"
    >
      <h1
        ref={textRef}
        className="text-center font-bold capitalize lg:max-w-3xl max-w-xl mx-auto"
        style={{
          fontSize: "clamp(3rem, 12vw, 5rem)",
          lineHeight: 1,
          letterSpacing: "-0.02em",
          backgroundImage: `
            linear-gradient(
              to bottom,
              #E8A25C 0%,
              #E8A25C 50%,
              #3a3a3a 50%,
              #3a3a3a 100%
            )
          `,
          backgroundSize: "100% 200%",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        "We Present to You, the Guys We made Superstars on the Big Screen"
      </h1>
      <div style={{
            position: "absolute",
            bottom: "clamp(2rem, 4vh, 3.5rem)",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            pointerEvents: "none",
          }}
            className="lg:left-1/2 left-60"
          >
            <span style={{ fontSize: "8px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.18)" }}>Scroll</span>
            <div style={{
              width: "1px",
              height: "36px",
              background: "linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)",
              animation: "scrollPulse 2s ease-in-out infinite",
            }} />
          </div>
    </section>
  );
}