"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollTextReveal() {
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
          backgroundPosition: "0% 100%", // ✅ start = gray visible
        },
        {
          backgroundPosition: "0% 0%", // ✅ scroll down → red comes from top
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=200%",
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
      className="relative h-screen flex items-center justify-center bg-black"
    >
      <h1
        ref={textRef}
        className="text-center font-bold"
        style={{
          fontSize: "clamp(4rem, 12vw, 9rem)",
          lineHeight: 0.85,
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
        "over 7 <br /> years
        helping <br /> brands
        tell <br /> their stories"
      </h1>
    </section>
  );
}