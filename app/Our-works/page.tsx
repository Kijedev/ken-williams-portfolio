"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Present from "../components/ui/Present";
import Button from "../components/Button";
import { CgInstagram } from "react-icons/cg";


gsap.registerPlugin(ScrollTrigger);

const VIDEOS = [
  { src: "/reels/TIFE2949.mp4", name: "Elonna Foods", rotate: -6, yOffset: 30, zIndex: 1 },
  { src: "/reels/TIFE2949.mp4", name: "Alexander", rotate: -3, yOffset: 10, zIndex: 2 },
  { src: "/reels/TIFE2949.mp4", name: "Andrew", rotate: 0, yOffset: -20, zIndex: 3 },
  { src: "/reels/TIFE2949.mp4", name: "Bryan", rotate: 2, yOffset: 0, zIndex: 4 },
  // { src: "/reels/TIFE2949.mp4", name: "Chris", rotate: -2, yOffset: 25, zIndex: 3 },
];

// ─── Single video card ────────────────────────────────────────────────────────
function VideoCard({
  vid,
  index,
  cardRef,
}: {
  vid: typeof VIDEOS[0];
  index: number;
  cardRef: (el: HTMLDivElement | null) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);

  const play = () => {
    setHovered(true);
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;
      videoRef.current.play().catch(() => { });
    }
  };
  const pause = () => {
    setHovered(false);
    videoRef.current?.pause();
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={play}
      onMouseLeave={pause}
      onTouchStart={play}
      onTouchEnd={pause}
      style={{
        position: "relative",
        flexShrink: 0,
        // Portrait phone proportions matching the reference image
        width: "clamp(300px, 20vw, 500px)",
        height: "clamp(400px, 40vw, 550px)",
        borderRadius: "clamp(10px, 1.2vw, 18px)",
        overflow: "hidden",
        border: "3px solid #FEE9CE",
        // Staggered vertical position — the fan effect
        top: vid.yOffset,
        zIndex: vid.zIndex,
        boxShadow: hovered
          ? "0 30px 90px rgba(0,0,0,0.9), 0 0 0 1.5px rgba(255,255,255,0.5)"
          : "0 16px 50px rgba(0,0,0,0.75), 0 4px 16px rgba(0,0,0,0.5)",
        transition: "box-shadow 0.4s ease",
        cursor: "pointer",
        background: "#000000",
        // Will be animated by GSAP — rotationZ set via gsap.set
        willChange: "transform, opacity",
      }}
    >
      <video
        ref={videoRef}
        src={vid.src}
        muted
        loop
        playsInline
        preload="metadata"
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover",
          filter: hovered ? "saturate(1) brightness(1)" : "saturate(0.8) brightness(0.78)",
          scale: hovered ? 1.05 : 1,
          transition: "filter 0.5s ease",
        }}
      />

      {/* Bottom gradient */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 0%)",
        pointerEvents: "none",
      }} />

      {/* Play icon (visible when not hovered) */}
      {!hovered && (
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          pointerEvents: "none",
        }}>
          <div style={{
            width: 34, height: 34, borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.3)",
            background: "rgba(0,0,0,0.35)",
            backdropFilter: "blur(4px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            opacity: 0.6,
          }}>
            <div style={{
              marginLeft: 3, width: 0, height: 0,
              borderTop: "5px solid transparent",
              borderBottom: "5px solid transparent",
              borderLeft: "9px solid rgba(255,255,255,0.85)",
            }} />
          </div>
        </div>
      )}

      {/* Name strip */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "0.6rem 0.65rem",
        display: "flex", alignItems: "center",
        gap: 5,
        opacity: hovered ? 1 : 0.65,
        transform: hovered ? "translateY(0)" : "translateY(2px)",
        transition: "opacity 0.35s ease, transform 0.35s ease",
      }}>
        <div style={{
          width: 30, height: 30, borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.65)",
          background: "#222",
          flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "15px", color: "white",
          fontWeight: 500,
        }}>
          {vid.name[0]}
        </div>
        <span style={{
          fontSize: "clamp(0.5rem,0.85vw,2rem)",
          color: "#fff",
          letterSpacing: "0.02em",
          textShadow: "0 1px 4px rgba(0,0,0,0.9)",
          whiteSpace: "nowrap",
        }}>
          {vid.name}
        </span>
      </div>

      {/* Index number */}
      <div style={{ position: "absolute", top: "0.6rem", left: "0.7rem" }}>
        <span style={{
          fontSize: "8px", letterSpacing: "0.12em",
          color: "rgba(255,255,255,0.22)",
        }}>
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function ProjectsPage() {
  const pinnerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const pinner = pinnerRef.current;
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    const progress = progressRef.current;

    if (!pinner || !cards.length) return;

    // ── Step 1: set ALL cards invisible and off-screen RIGHT ──────────────
    // We do this BEFORE creating any ScrollTrigger so the initial state
    // is correct from the very first frame. Using numeric values only —
    // no CSS calc(), no template literal rotation strings.
    cards.forEach((card, i) => {
      gsap.set(card, {
        x: window.innerWidth,   // all start at exactly 1 viewport width to the right
        opacity: 0,
        scale: 0.82,
        rotationZ: VIDEOS[i].rotate + 10,  // extra tilt while off-screen
        transformOrigin: "center center",
      });
    });

    // ── Step 2: build a single GSAP timeline, one step per card ──────────
    // Each card gets a 1-unit slot in the timeline.
    // ScrollTrigger scrubs this timeline as the user scrolls.
    // This is the KEY fix — one timeline, one scrub, perfectly synced.
    const tl = gsap.timeline({ paused: true });

    cards.forEach((card, i) => {
      // Each card animates in during its own 1-unit window
      tl.to(card, {
        x: 0,
        opacity: 1,
        scale: 1,
        rotationZ: VIDEOS[i].rotate,  // settle at its final tilt
        duration: 1,
        ease: "power2.out",
      }, i);  // position label = i, so card 0 at t=0, card 1 at t=1, etc.
    });

    // ── Step 3: one ScrollTrigger scrubs the whole timeline ───────────────
    // scrub: 1.5 = 1.5s lag for smooth cinematic feel
    // end = viewport height × number of cards (reasonable scroll distance)
    const totalScroll = window.innerHeight * VIDEOS.length;

    ScrollTrigger.create({
      trigger: pinner,
      pin: true,
      start: "top top",
      end: `+=${totalScroll}`,
      scrub: 1.5,
      animation: tl,
      // Progress bar driven by same trigger
      onUpdate: (self) => {
        if (progress) {
          progress.style.transform = `scaleX(${self.progress})`;
        }
      },
    });

    // ── Step 4: header entrance ───────────────────────────────────────────
    if (headerRef.current) {
      gsap.from(Array.from(headerRef.current.children), {
        y: 35, opacity: 0, duration: 0.9, stagger: 0.1, ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&family=Barlow:wght@300;400&display=swap');

        @keyframes breathe {
          0%, 100% { opacity: 0.45; transform: translateX(-50%) translateY(0px);  }
          50%       { opacity: 1;   transform: translateX(-50%) translateY(6px); }
        }

        /* ── Mobile: unpin, vertical stack, no tilt ─────────────────────── */
        @media (max-width: 768px) {
          .showcase-pinner  { height: auto !important; }
          .showcase-track   {
            position: relative !important;
            inset: auto !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: flex-start !important;
            gap: 1.2rem !important;
            padding: 2rem 1rem 3rem !important;
            width: 100% !important;
          }
          /* Reset ALL GSAP inline transforms on mobile via CSS */
          .vid-card {
            width: 72vw !important;
            height: 128vw !important;
            top: 0 !important;
            transform: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>

      <div style={{ background: "#000", color: "#fff" }}>

        {/* ══ Present component ══ */}
        <Present />

        {/* ══ Video showcase ══ */}
        <section style={{ position: "relative", background: "#000" }}>
          {/* Progress bar */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0,
            height: "1px", background: "rgba(255,255,255,0.07)", zIndex: 30,
          }}>
            <div
              ref={progressRef}
              style={{
                height: "100%",
                background: "linear-gradient(to right, #FEE9CE, rgba(254,233,206,0.15))",
                transformOrigin: "left",
                transform: "scaleX(0)",
              }}
            />
          </div>

          {/* ── Pinned viewport ── */}
          <div
            ref={pinnerRef}
            className="showcase-pinner"
            style={{
              position: "relative",
              height: "100vh",
              overflow: "hidden",
              background: "#000",
            }}
          >
            {/* Grain */}
            <div style={{
              position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", opacity: 0.03,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "180px",
            }} aria-hidden="true" />

            {/* Left/right edge softening */}
            <div style={{
              position: "absolute", inset: 0, zIndex: 5, pointerEvents: "none",
              background: "linear-gradient(to right, rgba(0,0,0,0.55) 0%, transparent 12%, transparent 88%, rgba(0,0,0,0.55) 100%)",
            }} aria-hidden="true" />

            {/* ── Card track ── */}
            <div
              className="showcase-track"
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "clamp(0px, -3vw, -18px)",
                paddingLeft: "clamp(0rem, 6vw, 5rem)",
                paddingRight: "clamp(0rem, 6vw, 5rem)",
                width: "100%",
                overflow: "hidden",
              }}
            >
              {/* BACKGROUND TEXT */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 0, // 👈 behind videos
                  pointerEvents: "none",
                }}
              >
                <h1
                  style={{
                    fontSize: "clamp(6rem, 23vw, 30rem)",
                    color: "rgba(255,255,255,0.03)",
                    textAlign: "center",
                    lineHeight: 0.9,
                    whiteSpace: "nowrap",
                    userSelect: "none",
                  }}
                >
                  REELS
                </h1>
              </div>

              {/* VIDEOS */}
              <div
                style={{
                  position: "relative",
                  zIndex: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {VIDEOS.map((vid, i) => (
                  <VideoCard
                    key={i}
                    vid={vid}
                    index={i}
                    cardRef={(el) => {
                      cardRefs.current[i] = el;
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>



        {/* Watch more on Instagram */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            padding: "clamp(4rem,10vh,8rem) clamp(1.5rem,6vw,6rem)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "clamp(1.2rem,2.5vh,2rem)",
            position: "relative",
            background: "linear-gradient(to bottom, rgba(0,0,0,0.4), #000)",
          }}
        >
          {/* Heading */}
          <h2
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2.4rem)",
              fontWeight: 500,
              color: "rgba(255,255,255,0.9)",
              letterSpacing: "0.02em",
            }}
          >
            Watch more on Instagram
          </h2>

          {/* Link Button */}
          <a
            href="https://www.instagram.com/darawilliam.s"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              padding: "0.7rem 1.2rem",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(6px)",
              color: "#fff",
              fontSize: "clamp(0.8rem, 1vw, 0.95rem)",
              textDecoration: "none",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              e.currentTarget.style.border = "1px solid rgba(255,255,255,0.4)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.04)";
              e.currentTarget.style.border = "1px solid rgba(255,255,255,0.2)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <CgInstagram size={18} />
            @darawilliam.s
          </a>

          {/* Subtle hint text */}
          <p
            style={{
              fontSize: "0.75rem",
              color: "rgba(255,255,255,0.35)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Explore more reels & content
          </p>
        </div>

        {/* ══ CTA ══ */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          padding: "clamp(4rem,10vh,8rem) clamp(1.5rem,6vw,6rem)",
          display: "flex", flexDirection: "column", alignItems: "center",
          textAlign: "center", gap: "clamp(1.5rem,3vh,2.5rem)",
          position: "relative",
        }}>
          <div style={{
            position: "absolute", top: "30%", left: "50%",
            transform: "translate(-50%,-50%)",
            width: 600, height: 300, borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(254,233,206,0.03) 0%, transparent 70%)",
            pointerEvents: "none",
          }} aria-hidden="true" />
          <h2 style={{
            fontSize: "clamp(2rem,6vw,5rem)",
            fontWeight: 300, color: "#FEE9CE",
            margin: 0, lineHeight: 0.95,
            letterSpacing: "-0.02em", maxWidth: 700,
          }}>
            Want your product<br />
            <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.22)" }}>in this reel?</em>
          </h2>
          <Button text="Start a project" textsecond="Contact us" />
        </div>

        <div style={{ height: 1, background: "linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)" }} />
      </div>
    </>
  );
}