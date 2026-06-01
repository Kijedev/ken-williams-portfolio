"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Help() {
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
            end: "+=50%",
            scrub: true,
            pin: true,
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative lg:h-screen h-[50vh] w-full flex items-center justify-center bg-[#000000]"
    >
      <h1
        ref={textRef}
        className="text-center font-bold capitalize lg:max-w-6xl"
        style={{
          fontSize: "clamp(4rem, 20vw, 8rem)",
          lineHeight: 1,
          letterSpacing: "-0.02em",
          backgroundImage: `
            linear-gradient(
              to bottom,
              #FEE9CE 0%,
              #FEE9CE 50%,
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
        "We can Increase your Brand Visibility."
      </h1>
    </section>
  );
}
