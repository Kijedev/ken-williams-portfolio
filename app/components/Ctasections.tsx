"use client";

import { useEffect, useRef } from "react";
import { CgInstagram } from "react-icons/cg";
import Button from "../components/Button";
import ButtonTrans from "./ui/ButtonTrans";

function useReveal(refs: React.RefObject<HTMLElement | null>[], options?: { delay?: number; threshold?: number }) {
  useEffect(() => {
    const elements = refs.map((r) => r.current).filter(Boolean) as HTMLElement[];
    if (!elements.length) return;

    elements.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(40px)";
      el.style.transition = `opacity 0.9s ease ${(options?.delay ?? 0) + i * 120}ms, transform 0.9s ease ${(options?.delay ?? 0) + i * 120}ms`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            observer.unobserve(el);
          }
        });
      },
      { threshold: options?.threshold ?? 0.2 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── Project CTA section ───────
export function Ctasections() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const eyebrowRef  = useRef<HTMLDivElement>(null);
  const headingRef  = useRef<HTMLHeadingElement>(null);
  const subRef      = useRef<HTMLParagraphElement>(null);
  const btnRef      = useRef<HTMLDivElement>(null);
  const dividerRef  = useRef<HTMLDivElement>(null);

  useReveal([eyebrowRef as any, headingRef as any, subRef as any, btnRef as any]);

  // Divider line animation
  useEffect(() => {
    const el = dividerRef.current;
    if (!el) return;
    el.style.transform = "scaleX(0)";
    el.style.transition = "transform 1.2s ease 0.3s";
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          el.style.transform = "scaleX(1)";
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#000",
      }}
    >
      <div style={{
        position: "absolute",
        top: "40%", left: "50%",
        transform: "translate(-50%,-50%)",
        width: "80vw", height: "50vh",
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(254,233,206,0.04) 0%, transparent 75%)",
        pointerEvents: "none",
      }} aria-hidden="true" />

      <div style={{
        padding: "clamp(5rem,12vh,9rem) clamp(1.5rem,6vw,6rem)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 0,
        position: "relative",
        zIndex: 1,
      }}>
        <h2
          ref={headingRef}
          style={{
            fontSize: "clamp(3rem,7vw,6.5rem)",
            fontWeight: 300,
            color: "#FEE9CE",
            lineHeight: 0.9,
            letterSpacing: "-0.03em",
            margin: "0 0 clamp(1.5rem,3vh,2.5rem)",
            maxWidth: "clamp(400px,70vw,900px)",
          }}
        >
          Watch more on
          <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.3)" }}> Instagram</em>
        </h2>

        <div
          ref={dividerRef}
          style={{
            width: "clamp(40px,6vw,80px)", height: "1px",
            background: "linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent)",
            margin: "0 0 clamp(1.5rem,3vh,2.5rem)",
            transformOrigin: "center",
          }}
        />

        {/* Sub copy */}
        <p
          ref={subRef}
          style={{
            fontSize: "clamp(0.7rem,1.1vw,0.85rem)",
            color: "rgba(255,255,255,0.2)",
            letterSpacing: "0.06em",
            lineHeight: 1.9,
            margin: "0 0 clamp(2rem,4vh,3.5rem)",
            maxWidth: 360,
          }}
        >
          We craft product films that make people<br />
          stop scrolling and start buying.
        </p>

        {/* Button */}
        {/* <div ref={btnRef}> */}
          <ButtonTrans text="Watch on Instagram" textsecond="@darawilliam.s" />
        {/* </div> */}
      </div>
    </div>
  );
}