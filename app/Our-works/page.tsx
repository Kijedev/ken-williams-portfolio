"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Present from "../components/ui/Present";
import { Ctasections } from "../components/Ctasections";

gsap.registerPlugin(ScrollTrigger);

const VIDEOS = [
  { src: "/reels/TIFE2949.MP4", name: "Elonna Foods", rotate: -6, yOffset: 30, zIndex: 1 },
  { src: "/reels/IPMI9840.MP4", name: "Hav Palm Oil", rotate:  5, yOffset: 20, zIndex: 2 },
  { src: "/reels/VOOR3333.MP4", name: "Uncle Stan's", rotate: -5, yOffset: 20, zIndex: 3 },
  { src: "/reels/GPSX1245.MP4", name: "Jiffy Jollof", rotate:  5, yOffset: 30, zIndex: 4 },
];

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
  const [loaded, setLoaded] = useState(false);

  const play = async () => {
    setHovered(true);
    const v = videoRef.current;
    if (!v) return;

    // Ensure muted before play (required by all browsers for autoplay)
    v.muted = true;
    v.playbackRate = 0.75;

    try {
      await v.play();
    } catch (err) {
      // If play fails, try loading first then play
      v.load();
      try {
        await v.play();
      } catch (_) {}
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
        background: "#111",
        willChange: "transform, opacity",
      }}
    >
      {/*
        KEY FIXES:
        1. muted={true}  — required for autoplay in all browsers, including on Vercel
        2. preload="none" — don't load until hover, prevents Vercel from getting
           hammered with 8+ simultaneous video requests on page load
        3. onLoadedData — marks video as ready so we know it can play
        4. No autoPlay prop — we control play/pause manually on hover
      */}
      <video
        ref={videoRef}
        src={vid.src}
        muted={true}
        loop
        playsInline
        preload="none"
        onLoadedData={() => setLoaded(true)}
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover",
          filter: hovered ? "saturate(1) brightness(1)" : "saturate(0.8) brightness(0.78)",
          transition: "filter 0.5s ease, transform 0.5s ease",
          transform: hovered ? "scale(1.04)" : "scale(1)",
          opacity: loaded || !hovered ? 1 : 0,
        }}
      />

      {/* Placeholder shown before video loads on hover */}
      {!loaded && hovered && (
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "#0a0a0a",
        }}>
          <div style={{
            width: 24, height: 24, borderRadius: "50%",
            border: "2px solid rgba(255,255,255,0.15)",
            borderTopColor: "rgba(255,255,255,0.5)",
            animation: "spin 0.8s linear infinite",
          }} />
        </div>
      )}

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
            width: 44, height: 44, borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.3)",
            background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            opacity: 0.7,
          }}>
            <div style={{
              marginLeft: 3, width: 0, height: 0,
              borderTop: "6px solid transparent",
              borderBottom: "6px solid transparent",
              borderLeft: "10px solid rgba(255,255,255,0.9)",
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
          width: 28, height: 28, borderRadius: "50%",
          border: "1.5px solid rgba(255,255,255,0.65)",
          background: "#222", flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "11px", color: "rgba(255,255,255,0.7)", fontWeight: 600,
        }}>
          {vid.name[0]}
        </div>
        <span style={{
          fontSize: "clamp(0.8rem, 1vw, 1rem)",
          color: "#fff", letterSpacing: "0.02em",
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

export default function ProjectsPage() {
  const desktopPinnerRef   = useRef<HTMLDivElement>(null);
  const desktopProgressRef = useRef<HTMLDivElement>(null);
  const desktopCardRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const mobileCardRefs     = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
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

    const mCards = mobileCardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (mCards.length) {
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
              const rect = entry.boundingClientRect;
              if (rect.top > 0) {
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

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&family=Barlow:wght@300;400&display=swap');

        @keyframes breathe {
          0%, 100% { opacity: 0.45; transform: translateX(-50%) translateY(0px); }
          50%       { opacity: 1;   transform: translateX(-50%) translateY(6px); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        html, body { max-width: 100%; overflow-x: hidden; }
        .showcase-desktop { display: block; }
        .showcase-mobile  { display: none;  }

        @media (max-width: 768px) {
          .showcase-desktop { display: none; }
          .showcase-mobile  { display: flex; }
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
          <h2 style={{
            fontSize: "clamp(2.5rem, 5vw, 5rem)",
            fontWeight: 300, color: "#E8A25C",
            margin: 0, lineHeight: 0.92, letterSpacing: "-0.025em",
          }}>
            The Work<br />
            <em style={{ color: "rgba(255,255,255,0.17)", fontStyle: "italic" }}>speaks.</em>
          </h2>
        </div>

        {/* Desktop showcase */}
        <div className="showcase-desktop">
          <div
            ref={desktopPinnerRef}
            style={{ position: "relative", height: "100vh", overflow: "hidden", background: "black" }}
          >
            <div style={{
              position: "absolute", inset: 0, zIndex: 5, pointerEvents: "none",
              background: "linear-gradient(to right, rgba(0,0,0,0.55) 0%, transparent 12%, transparent 88%, rgba(0,0,0,0.55) 100%)",
            }} aria-hidden="true" />

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
              }}>
                REELS
              </span>
            </div>

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
        </div>

        {/* Mobile showcase */}
        <div
          className="showcase-mobile"
          style={{
            flexDirection: "column", alignItems: "center",
            gap: "1.5rem", padding: "2rem 0 3rem",
            width: "100%", background: "#000",
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

        <div style={{ height: 1, background: "linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)" }} />
      </div>
    </>
  );
}