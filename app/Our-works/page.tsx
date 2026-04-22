"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Present from "../components/ui/Present";
import Button from "../components/Button";
import { CgInstagram } from "react-icons/cg";
import { Ctasections } from "../components/Ctasections";

gsap.registerPlugin(ScrollTrigger);

const VIDEOS = [
  { src: "/reels/TIFE2949.mp4", name: "Elonna Foods", rotate: -6, yOffset: 30, zIndex: 1 },
  { src: "/reels/IPMI9840.mp4", name: "Hav Palm Oil", rotate:  5, yOffset: 20, zIndex: 2 },
  { src: "/reels/VOOR3333.mp4", name: "Uncle Stan's", rotate: -5, yOffset: 20, zIndex: 3 },
  { src: "/reels/GPSX1245.mp4", name: "Jiffy Jollof", rotate:  5, yOffset: 30, zIndex: 4 },
];

// ─── Video card (shared between desktop + mobile) ─────────────────────────────
function VideoCard({
  vid,
  index,
  cardRef,
  mobile,
}: {
  vid: typeof VIDEOS[0];
  index: number;
  cardRef?: (el: HTMLDivElement | null) => void;
  mobile?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);

  const play = () => {
    setHovered(true);
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;
      videoRef.current.play().catch(() => {});
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
        width: mobile ? "min(82vw, 500px)" : "clamp(350px, 17vw, 500px)",
        height: mobile ? "min(146vw, 570px)" : "clamp(570px, 30vw, 570px)",
        borderRadius: "clamp(10px, 1.2vw, 20px)",
        overflow: "hidden",
        border: "3px solid #FEE9CE",
        top: mobile ? 0 : vid.yOffset,
        zIndex: vid.zIndex,
        boxShadow: hovered
          ? "0 30px 90px rgba(0,0,0,0.9)"
          : "0 16px 50px rgba(0,0,0,0.75), 0 4px 16px rgba(0,0,0,0.5)",
        transition: "box-shadow 0.4s ease",
        cursor: "pointer",
        background: "#000",
        willChange: "transform, opacity",
      }}
    >
      <video
        ref={videoRef}
        src={vid.src}
        // muted
        loop
        playsInline
        preload="metadata"
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover",
          filter: hovered ? "saturate(1) brightness(1)" : "saturate(0.8) brightness(0.78)",
          transition: "filter 0.5s ease, transform 0.5s ease",
          transform: hovered ? "scale(1.04)" : "scale(1)",
        }}
      />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 50%)",
        pointerEvents: "none",
      }} />
      {!hovered && (
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          pointerEvents: "none",
        }}>
          <div style={{
            width: 38, height: 38, borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.3)",
            background: "rgba(0,0,0,0.35)", backdropFilter: "blur(4px)",
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
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "0.7rem 0.8rem",
        display: "flex", alignItems: "center", gap: 6,
        opacity: hovered ? 1 : 0.7,
        transform: hovered ? "translateY(0)" : "translateY(2px)",
        transition: "opacity 0.35s ease, transform 0.35s ease",
      }}>
        <div style={{
          width: 26, height: 26, borderRadius: "50%",
          border: "1.5px solid rgba(255,255,255,0.65)",
          background: "#222", flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "11px", color: "rgba(255,255,255,0.7)", fontWeight: 600,
        }}>
          {vid.name[0]}
        </div>
        <span style={{
          fontSize: "clamp(1rem, 0.9vw, 2rem)",
          color: "#fff", letterSpacing: "0.02em",
          textShadow: "0 1px 4px rgba(0,0,0,0.9)",
          whiteSpace: "nowrap",
        }}>
          {vid.name}
        </span>
      </div>
      <div style={{ position: "absolute", top: "0.7rem", left: "0.8rem" }}>
        <span style={{ fontSize: "8px", letterSpacing: "0.12em", color: "rgba(255,255,255,0.25)" }}>
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function ProjectsPage() {
  // Desktop refs
  const desktopPinnerRef  = useRef<HTMLDivElement>(null);
  const desktopProgressRef = useRef<HTMLDivElement>(null);
  const desktopCardRefs   = useRef<(HTMLDivElement | null)[]>([]);

  // Mobile refs
  const mobileCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // ── DESKTOP: pinned fan reveal ────────────────────────────────────────
    const pinner   = desktopPinnerRef.current;
    const dCards   = desktopCardRefs.current.filter(Boolean) as HTMLDivElement[];
    const progress = desktopProgressRef.current;

    if (pinner && dCards.length) {
      dCards.forEach((card, i) => {
        gsap.set(card, {
          x: window.innerWidth,
          opacity: 0,
          scale: 0.82,
          rotationZ: VIDEOS[i].rotate + 10,
          transformOrigin: "center center",
        });
      });

      const tl = gsap.timeline({ paused: true });
      dCards.forEach((card, i) => {
        tl.to(card, {
          x: 0, opacity: 1, scale: 1,
          rotationZ: VIDEOS[i].rotate,
          duration: 1, ease: "power2.out",
        }, i);
      });

      const totalScroll = window.innerHeight * (VIDEOS.length * 0.55);

      ScrollTrigger.create({
        trigger: pinner,
        pin: true,
        start: "top top",
        end: `+=${totalScroll}`,
        scrub: 0.6,
        animation: tl,
        onUpdate: (self) => {
          if (progress) progress.style.transform = `scaleX(${self.progress})`;
        },
      });
    }

    // ── MOBILE: scroll-in stacked cards ──────────────────────────────────
    // Uses Intersection Observer instead of GSAP ScrollTrigger to avoid
    // any DOM manipulation that could conflict with React's reconciler.
    const mCards = mobileCardRefs.current.filter(Boolean) as HTMLDivElement[];

    if (mCards.length) {
      // Set initial hidden state
      mCards.forEach((card) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(60px)";
        card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      });

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const el = entry.target as HTMLElement;
            if (entry.isIntersecting) {
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
            } else {
              // Re-hide if scrolled back above
              const rect = entry.boundingClientRect;
              if (rect.top > 0) {
                // Element is below viewport — keep hidden for next reveal
                el.style.opacity = "0";
                el.style.transform = "translateY(60px)";
              }
            }
          });
        },
        { threshold: 0.15 }
      );

      mCards.forEach((card) => observer.observe(card));

      return () => {
        observer.disconnect();
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
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
          0%, 100% { opacity: 0.45; transform: translateX(-50%) translateY(0px); }
          50%       { opacity: 1;   transform: translateX(-50%) translateY(6px); }
        }

        html, body {
          max-width: 100%;
          overflow-x: hidden;
        }

        /* Desktop layout visible, mobile hidden by default */
        .showcase-desktop { display: block; }
        .showcase-mobile  { display: none;  }

        @media (max-width: 768px) {
          .showcase-desktop { display: none;  }
          .showcase-mobile  { display: flex;  }
        }
      `}</style>

      <div style={{ background: "#000", color: "#fff", overflowX: "hidden", maxWidth: "100vw" }}>

        <Present />

        {/* Section header */}
        <div style={{
          padding: "clamp(2.5rem,5vh,4rem) clamp(1.2rem,5vw,5rem) clamp(1rem,2vh,1.5rem)",
          display: "flex", alignItems: "flex-end", justifyContent: "space-between",
          flexWrap: "wrap", gap: "1rem",
        }}>
          <div>
            {/* <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "0.8rem" }}>
              <span style={{ width: 22, height: 1, background: "rgba(255,255,255,0.2)", display: "block" }} />
              <span style={{
                fontSize: "clamp(0.48rem, 0.82vw, 0.6rem)",
                letterSpacing: "0.44em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.2)",
              }}>
                Selected Work
              </span>
            </div> */}
            <h2 style={{
              fontSize: "clamp(2.5rem, 5vw, 5rem)",
              fontWeight: 300, color: "#E8A25C",
              margin: 0, lineHeight: 0.92, letterSpacing: "-0.025em",
            }}>
              The Work<br />
              <em style={{ color: "rgba(255,255,255,0.17)", fontStyle: "italic" }}>speaks.</em>
            </h2>
          </div>
        </div>

        {/* ══ DESKTOP showcase — always in DOM, hidden on mobile via CSS ══ */}
        <div className="showcase-desktop">
          <div
            ref={desktopPinnerRef}
            style={{ position: "relative", height: "100vh", overflow: "hidden", background: "black" }}
          >
            {/* Grain */}
            {/* <div style={{
              position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", opacity: 0.03,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "180px",
            }} aria-hidden="true" /> */}

            {/* Edge fades */}
            <div style={{
              position: "absolute", inset: 0, zIndex: 5, pointerEvents: "none",
              background: "linear-gradient(to right, rgba(0,0,0,0.55) 0%, transparent 12%, transparent 88%, rgba(0,0,0,0.55) 100%)",
            }} aria-hidden="true" />

            {/* Progress bar */}
            {/* <div style={{
              position: "absolute", top: 0, left: 0, right: 0,
              height: "1px", background: "rgba(255,255,255,0.07)", zIndex: 20,
            }}>
              <div ref={desktopProgressRef} style={{
                height: "100%",
                background: "linear-gradient(to right, #FEE9CE, rgba(254,233,206,0.15))",
                transformOrigin: "left", transform: "scaleX(0)",
              }} />
            </div> */}

            {/* Background REELS text */}
            <div style={{
              position: "absolute", inset: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              zIndex: 0, pointerEvents: "none",
            }}>
              <span style={{
                fontSize: "clamp(6rem, 22vw, 30rem)",
                color: "rgba(255,255,255,0.025)",
                lineHeight: 0.9, whiteSpace: "nowrap", userSelect: "none",
                fontWeight: 900, letterSpacing: "-0.02em",
                textAlign: "center",
              }}>
                REELS
              </span>
            </div>

            {/* Cards */}
            <div style={{
              position: "absolute", inset: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              zIndex: 2,
              gap: "clamp(-20px, -2vw, -10px)",
              paddingLeft: "clamp(1rem, 5vw, 4rem)",
              paddingRight: "clamp(1rem, 5vw, 4rem)",
            }}>
              {VIDEOS.map((vid, i) => (
                <VideoCard
                  key={i} vid={vid} index={i} mobile={false}
                  cardRef={(el) => { desktopCardRefs.current[i] = el; }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ══ MOBILE showcase — always in DOM, hidden on desktop via CSS ══ */}
        <div
          className="showcase-mobile"
          style={{
            flexDirection: "column",
            alignItems: "center",
            gap: "1.5rem",
            padding: "2rem 0 3rem",
            width: "100%",
            background: "#000",
          }}
        >
          {VIDEOS.map((vid, i) => (
            <VideoCard
              key={i} vid={vid} index={i} mobile={true}
              cardRef={(el) => { mobileCardRefs.current[i] = el; }}
            />
          ))}
        </div>

        <Ctasections />

        <div style={{
          height: 1,
          background: "linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)",
        }} />
      </div>
    </>
  );
}