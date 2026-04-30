"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const BRANDS = [
  { Image: "/brandlogos/Ekla.png" },
  { Image: "/brandlogos/Coloured Logo.png" },
  { Image: "/brandlogos/Elonna_Foods.png" },
  { Image: "/brandlogos/FullLogo_NoBuffer.png" },
  { Image: "/brandlogos/FullLogo_Transparent_NoBuffer White.png" },
  { Image: "/brandlogos/Gourmet Twist Rays Logo.png" },
  { Image: "/brandlogos/IMG_5402.png" },
  { Image: "/brandlogos/IMG-20250704-WA0052.jpg" },
  { Image: "/brandlogos/Koshe Logo White.png" },
  { Image: "/brandlogos/Maison Veil Logo.jpeg" },
  { Image: "/brandlogos/Mom's Pride Logo.png" },
  { Image: "/brandlogos/NXXN.png" },
  { Image: "/brandlogos/SIMPLY JOLLOF LOGO.png" },
  { Image: "/brandlogos/Sooo Pro Logo.jpg" },
  { Image: "/brandlogos/Este Blare.png" },
  { Image: "/brandlogos/Uncle Stan's.png" },
  { Image: "/brandlogos/NINI.png" },
  { Image: "/brandlogos/Agricyclers.jpg" },
];

const DUPES = 4;
const TRACK_ITEMS = Array.from({ length: DUPES }, () => BRANDS).flat();

export default function BrandsMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const lineLeftRef = useRef<HTMLSpanElement>(null);
  const lineRightRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track1 = track1Ref.current;
    const track2 = track2Ref.current;
    const eyebrow = eyebrowRef.current;

    if (!section || !track1 || !track2 || !eyebrow) return;
    let x1 = 0;
    let x2 = 0;
    let halfWidth1 = 0;
    let halfWidth2 = 0;
    const speed1 = 0.5;
    const speed2 = 0.5;

    const tick = () => {
      x1 -= speed1;
      x2 += speed2;
      if (Math.abs(x1) >= halfWidth1) x1 = 0;
      if (x2 >= 0) x2 = -halfWidth2;
      gsap.set(track1, { x: x1 });
      gsap.set(track2, { x: x2 });
    };

    const rafId = requestAnimationFrame(() => {
      halfWidth1 = track1.scrollWidth / 2;
      halfWidth2 = track2.scrollWidth / 2;
      x2 = -halfWidth2 / 2;
      gsap.ticker.add(tick);
    });

    const ctx = gsap.context(() => {
      gsap.from(eyebrow, {
        y: 24,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(lineLeftRef.current, {
        scaleX: 0,
        transformOrigin: "right",
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: section,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(lineRightRef.current, {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: section,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });

      gsap.from([track1, track2], {
        opacity: 0,
        duration: 1.4,
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, section);

    return () => {
      cancelAnimationFrame(rafId);
      gsap.ticker.remove(tick);
      ctx.revert();
    };
  }, []);

  const dividerStyle: React.CSSProperties = {
    flexShrink: 0,
    width: "1px",
    height: "clamp(12px, 2vh, 20px)",
    background: "rgba(255,255,255,0.15)",
    alignSelf: "center",
  };

  const renderTrack = (
    ref: React.RefObject<HTMLDivElement | null>,
    items: typeof TRACK_ITEMS,
  ) => (
    <div
      ref={ref}
      style={{
        display: "flex",
        alignItems: "center",
        whiteSpace: "nowrap",
        willChange: "transform",
      }}
    >
      {items.map((brand, i) => (
        <div
          key={i}
          style={{ display: "inline-flex", alignItems: "center", flexShrink: 0 }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "0 clamp(1.2rem, 3.5vw, 3rem)",
              height: "clamp(44px, 7vh, 72px)",
            }}
          >
            <Image src={brand.Image} alt={brand.Image} width={80} height={80} className="object-cover" />
          </div>
          {i < items.length - 1 && (
            <span style={dividerStyle} aria-hidden="true" />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        backgroundColor: "black",
        paddingTop: "clamp(2.5rem, 5vh, 4rem)",
        paddingBottom: "clamp(2.5rem, 5vh, 4rem)",
        overflow: "hidden",
      }}
      aria-label="Companies we've worked with"
      className="lg:h-[80vh] h-[50vh] flex flex-col justify-center items-center z-50"
    >
      {/* Edge fades */}
      <div aria-hidden="true" style={{
        position: "absolute", top: 0, left: 0, bottom: 0,
        width: "clamp(60px, 10vw, 160px)",
        background: "linear-gradient(to right, #000 0%, transparent 100%)",
        zIndex: 10, pointerEvents: "none",
      }} />
      <div aria-hidden="true" style={{
        position: "absolute", top: 0, right: 0, bottom: 0,
        width: "clamp(60px, 10vw, 160px)",
        background: "linear-gradient(to left, #000 0%, transparent 100%)",
        zIndex: 10, pointerEvents: "none",
      }} />

      {/* Eyebrow */}
      <div
        ref={eyebrowRef}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "clamp(0.6rem, 1.5vw, 1.2rem)",
          marginBottom: "clamp(1.5rem, 3.5vh, 2.5rem)",
          position: "relative",
          zIndex: 5,
        }}
      >
        <span ref={lineLeftRef} aria-hidden="true" style={{
          display: "block",
          width: "clamp(20px, 4vw, 52px)",
          height: "1px",
          background: "rgba(255,255,255,0.15)",
        }} />
        <span style={{
          fontSize: "clamp(0.9rem, 0.9vw, 1rem)",
          letterSpacing: "0.2em",
          textTransform: "capitalize",
          color: "rgba(255,255,255,0.2)",
          fontWeight: 400,
          whiteSpace: "nowrap",
        }}>
          Brands we've worked with
        </span>
        <span ref={lineRightRef} aria-hidden="true" style={{
          display: "block",
          width: "clamp(20px, 4vw, 52px)",
          height: "1px",
          background: "rgba(255,255,255,0.15)",
        }} />
      </div>

      {/* Track 1 — left */}
      <div style={{ overflow: "hidden", marginBottom: "clamp(0.4rem, 1vh, 2rem)" }}>
        {renderTrack(track1Ref, TRACK_ITEMS)}
      </div>

      {/* Track 2 — right */}
      <div style={{ overflow: "hidden" }} className="mt-10">
        {renderTrack(track2Ref, [...TRACK_ITEMS].reverse())}
      </div>
    </section>
  );
}