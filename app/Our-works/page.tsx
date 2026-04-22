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
  { src: "/reels/IPMI9840.mp4", name: "Hav Palm Oil", rotate:  5, yOffset: 20, zIndex: 2 },
  { src: "/reels/VOOR3333.mp4", name: "Uncle Stan's", rotate: -5, yOffset: 20, zIndex: 3 },
  { src: "/reels/GPSX1245.mp4", name: "Jiffy Jollof", rotate:  5, yOffset: 30, zIndex: 4 },
];

// ─── Single video card ────────────────────────────────────────────────────────
function VideoCard({
  vid,
  index,
  cardRef,
  isMobile,
}: {
  vid: typeof VIDEOS[0];
  index: number;
  cardRef: (el: HTMLDivElement | null) => void;
  isMobile: boolean;
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
      className="vid-card"
      onMouseEnter={play}
      onMouseLeave={pause}
      onTouchStart={play}
      onTouchEnd={pause}
      style={{
        position: "relative",
        flexShrink: 0,
        width: isMobile ? "min(82vw, 340px)" : "clamp(200px, 18vw, 340px)",
        height: isMobile ? "min(146vw, 600px)" : "clamp(350px, 32vw, 600px)",
        borderRadius: "clamp(10px, 1.2vw, 20px)",
        overflow: "hidden",
        border: "3px solid #FEE9CE",
        top: isMobile ? 0 : vid.yOffset,
        zIndex: vid.zIndex,
        boxShadow: hovered
          ? "0 30px 90px rgba(0,0,0,0.9), 0 0 0 1.5px rgba(255,255,255,0.5)"
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
        muted
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

      {/* Bottom gradient */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 50%)",
        pointerEvents: "none",
      }} />

      {/* Play icon */}
      {!hovered && (
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          pointerEvents: "none",
        }}>
          <div style={{
            width: 38, height: 38, borderRadius: "50%",
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
          fontSize: "clamp(0.7rem, 0.9vw, 0.85rem)",
          color: "#fff",
          letterSpacing: "0.02em",
          textShadow: "0 1px 4px rgba(0,0,0,0.9)",
          whiteSpace: "nowrap",
        }}>
          {vid.name}
        </span>
      </div>

      {/* Index */}
      <div style={{ position: "absolute", top: "0.7rem", left: "0.8rem" }}>
        <span style={{ fontSize: "8px", letterSpacing: "0.12em", color: "rgba(255,255,255,0.25)" }}>
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

// ─── Desktop showcase (pinned fan) ───────────────────────────────────────────
function DesktopShowcase() {
  const pinnerRef   = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const cardRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const triggerRef  = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const pinner   = pinnerRef.current;
    const cards    = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    const progress = progressRef.current;
    if (!pinner || !cards.length) return;

    cards.forEach((card, i) => {
      gsap.set(card, {
        x: window.innerWidth,
        opacity: 0,
        scale: 0.82,
        rotationZ: VIDEOS[i].rotate + 10,
        transformOrigin: "center center",
      });
    });

    const tl = gsap.timeline({ paused: true });
    cards.forEach((card, i) => {
      tl.to(card, {
        x: 0, opacity: 1, scale: 1,
        rotationZ: VIDEOS[i].rotate,
        duration: 1, ease: "power2.out",
      }, i);
    });

    const totalScroll = window.innerHeight * (VIDEOS.length * 0.55);

    triggerRef.current = ScrollTrigger.create({
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

    return () => {
      // Kill only this specific trigger
      if (triggerRef.current) {
        triggerRef.current.kill();
        triggerRef.current = null;
      }
      // Kill the timeline
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={pinnerRef}
      style={{ position: "relative", height: "100vh", overflow: "hidden", background: "#000" }}
    >
      {/* Grain */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", opacity: 0.03,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "180px",
      }} aria-hidden="true" />

      {/* Edge fades */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 5, pointerEvents: "none",
        background: "linear-gradient(to right, rgba(0,0,0,0.55) 0%, transparent 12%, transparent 88%, rgba(0,0,0,0.55) 100%)",
      }} aria-hidden="true" />

      {/* Progress bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: "1px", background: "rgba(255,255,255,0.07)", zIndex: 20,
      }}>
        <div ref={progressRef} style={{
          height: "100%",
          background: "linear-gradient(to right, #FEE9CE, rgba(254,233,206,0.15))",
          transformOrigin: "left", transform: "scaleX(0)",
        }} />
      </div>

      {/* Background REELS text */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 0, pointerEvents: "none",
      }}>
        <h1 style={{
          fontSize: "clamp(6rem, 22vw, 28rem)",
          color: "rgba(255,255,255,0.025)",
          lineHeight: 0.9, whiteSpace: "nowrap", userSelect: "none",
          fontWeight: 900,
        }}>
          REELS
        </h1>
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
            key={i} vid={vid} index={i} isMobile={false}
            cardRef={(el) => { cardRefs.current[i] = el; }}
          />
        ))}
      </div>

      {/* Scroll hint */}
      <div style={{
        position: "absolute", bottom: "2rem", left: "50%",
        transform: "translateX(-50%)",
        zIndex: 10, pointerEvents: "none",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
        animation: "breathe 2.5s ease-in-out infinite",
      }}>
        <span style={{
          fontSize: "7px", letterSpacing: "0.42em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.14)",
        }}>
          Scroll to reveal
        </span>
        <div style={{ width: 1, height: 28, background: "linear-gradient(to bottom, rgba(255,255,255,0.14), transparent)" }} />
      </div>
    </div>
  );
}

// ─── Mobile showcase (stacked scroll-in cards) ────────────────────────────────
function MobileShowcase() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const triggersRef = useRef<ScrollTrigger[]>([]);
  const tlsRef = useRef<gsap.core.Tween[]>([]);
  const cleanupDoneRef = useRef(false);

  useEffect(() => {
    // Delay to ensure all cards are mounted
    const timer = setTimeout(() => {
      // Kill and clear previous animations/triggers
      triggersRef.current.forEach((trigger) => {
        try {
          trigger.kill();
        } catch (e) {
          // Ignore errors from already-killed triggers
        }
      });
      tlsRef.current.forEach((tl) => {
        try {
          tl.kill();
        } catch (e) {
          // Ignore errors
        }
      });
      triggersRef.current = [];
      tlsRef.current = [];

      // Filter cards and verify they're still in the DOM
      const cards = cardRefs.current.filter((card) => {
        if (!card) return false;
        // Ensure the card is actually in the document and has a valid parent
        return document.contains(card) && card.parentNode !== null;
      }) as HTMLDivElement[];

      if (!cards.length) return;

      // Each card starts below viewport, slides up as you scroll
      cards.forEach((card) => {
        try {
          // Kill any existing tweens on this card first
          gsap.killTweensOf(card);
          gsap.set(card, { y: 80, opacity: 0 });

          const tween = gsap.to(card, {
            y: 0, opacity: 1,
            duration: 0.7, ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          });

          // Store the trigger and timeline for cleanup
          if (tween.scrollTrigger) {
            triggersRef.current.push(tween.scrollTrigger);
          }
          tlsRef.current.push(tween);
        } catch (e) {
          // Skip cards that fail animation setup
          console.log("[v0] Skipping card animation:", e);
        }
      });

      cleanupDoneRef.current = true;
    }, 50);

    return () => {
      clearTimeout(timer);
      
      if (cleanupDoneRef.current) {
        // Kill all timelines first
        tlsRef.current.forEach((tl) => {
          try {
            tl.kill();
          } catch (e) {
            // Ignore errors
          }
        });
        tlsRef.current = [];
        
        // Then kill the triggers
        triggersRef.current.forEach((trigger) => {
          try {
            trigger.kill();
          } catch (e) {
            // Ignore errors
          }
        });
        triggersRef.current = [];
      }
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.5rem",
        padding: "2rem 0 3rem",
        width: "100%",
      }}
    >
      {VIDEOS.map((vid, i) => (
        <VideoCard
          key={i} vid={vid} index={i} isMobile={true}
          cardRef={(el) => { cardRefs.current[i] = el; }}
        />
      ))}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function ProjectsPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&family=Barlow:wght@300;400&display=swap');

        @keyframes breathe {
          0%, 100% { opacity: 0.45; transform: translateX(-50%) translateY(0px); }
          50%       { opacity: 1;   transform: translateX(-50%) translateY(6px); }
        }

        /* Global overflow fix — the main source of mobile horizontal scroll */
        html, body {
          max-width: 100%;
          overflow-x: hidden;
        }
      `}</style>

      <div style={{ background: "#000", color: "#fff", overflowX: "hidden", maxWidth: "100vw" }}>

        {/* Present component */}
        <Present />

        {/* Section header */}
        <div style={{
          padding: "clamp(2.5rem,5vh,4rem) clamp(1.2rem,5vw,5rem) clamp(1rem,2vh,1.5rem)",
          display: "flex", alignItems: "flex-end", justifyContent: "space-between",
          flexWrap: "wrap", gap: "1rem",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "0.8rem" }}>
              <span style={{ width: 22, height: 1, background: "rgba(255,255,255,0.2)", display: "block" }} />
              <span style={{
                fontSize: "clamp(0.48rem, 0.82vw, 0.6rem)",
                letterSpacing: "0.44em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.2)",
              }}>
                Selected Work
              </span>
            </div>
            <h2 style={{
              fontSize: "clamp(1.8rem, 5vw, 4.5rem)",
              fontWeight: 300, color: "#FEE9CE",
              margin: 0, lineHeight: 0.92, letterSpacing: "-0.025em",
              fontFamily: "'Cormorant Garamond', serif",
            }}>
              The Work<br />
              <em style={{ color: "rgba(255,255,255,0.17)", fontStyle: "italic" }}>speaks.</em>
            </h2>
          </div>
          <p style={{
            fontSize: "clamp(0.62rem, 0.95vw, 0.76rem)",
            color: "rgba(255,255,255,0.17)",
            letterSpacing: "0.05em", lineHeight: 1.85,
            maxWidth: 240, margin: 0,
          }}>
            {isMobile ? "Scroll through each film." : "Scroll to reveal each film."}<br />
            Hover to play.
          </p>
        </div>

        {/* Showcase — completely different component per breakpoint */}
        {isMobile ? <MobileShowcase /> : <DesktopShowcase />}

        {/* Instagram CTA */}
        <div style={{
          display: "flex", flexDirection: "column",
          alignItems: "center", textAlign: "center",
          padding: "clamp(2.5rem,6vh,5rem) 1.2rem",
          gap: "1rem",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}>
          <h2 style={{
            fontSize: "clamp(1.2rem, 2.5vw, 2rem)",
            fontWeight: 500, color: "rgba(255,255,255,0.85)",
            letterSpacing: "0.02em", margin: 0,
          }}>
            Watch more on Instagram
          </h2>
          <a
            href="https://www.instagram.com/darawilliam.s"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              padding: "0.65rem 1.1rem",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(255,255,255,0.04)",
              color: "#fff",
              fontSize: "clamp(0.78rem, 1vw, 0.9rem)",
              textDecoration: "none",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.4)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)";
            }}
          >
            <CgInstagram size={16} />
            @darawilliam.s
          </a>
          <p style={{
            fontSize: "0.7rem", color: "rgba(255,255,255,0.3)",
            letterSpacing: "0.08em", textTransform: "uppercase", margin: 0,
          }}>
            Explore more reels & content
          </p>
        </div>

        {/* CTA */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          padding: "clamp(3.5rem, 8vh, 7rem) clamp(1.2rem, 5vw, 5rem)",
          display: "flex", flexDirection: "column", alignItems: "center",
          textAlign: "center", gap: "clamp(1.5rem, 3vh, 2.5rem)",
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
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1.8rem, 5vw, 4.5rem)",
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
