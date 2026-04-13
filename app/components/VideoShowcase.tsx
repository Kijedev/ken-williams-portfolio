"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

// ─── CONFIG ───────────────────────────────────────────────────────────────────
// Reduced fan spread for tighter card spacing
const FAN_X_VW = [-28, -14, 0, 14, 28];
const FAN_ROT  = [-16,  -8, 0,  8, 16];

// ─── DATA ─────────────────────────────────────────────────────────────────────
// Replace videoId with your actual YouTube video IDs
// YouTube thumbnail URLs are free to use — no API key needed:
//   maxresdefault.jpg  = 1280×720 (best quality, may not exist for all videos)
//   hqdefault.jpg      = 480×360  (always exists)
//   mqdefault.jpg      = 320×180

const VIDEOS = [
  {
    id: 1,
    title: "Skincare Hero Film",
    category: "Hero Film · 1:00",
    videoId: "GJ46w3qVVf4", // ← replace with real YouTube ID
  },
  {
    id: 2,
    title: "Fragrance Reel",
    category: "Brand Film · 0:45",
    videoId: "dQw4w9WgXcQ",
  },
  {
    id: 3,
    title: "Sneaker Drop",
    category: "Social Content · 0:30",
    videoId: "dQw4w9WgXcQ",
  },
  {
    id: 4,
    title: "Jewellery Edit",
    category: "E-Commerce · 0:30",
    videoId: "dQw4w9WgXcQ",
  },
  {
    id: 5,
    title: "Spirits Campaign",
    category: "Hero Film · 1:00",
    videoId: "dQw4w9WgXcQ",
  },
];

// YouTube thumbnail helpers
const thumbHQ  = (id: string) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
const thumbMax = (id: string) => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;

// ─── MODAL ────────────────────────────────────────────────────────────────────

function Modal({ video, onClose }: { video: (typeof VIDEOS)[0]; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const boxRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const ctx = gsap.context(() => {
      gsap.from(overlayRef.current, { opacity: 0, duration: 0.35, ease: "power2.out" });
      gsap.from(boxRef.current, { scale: 0.92, opacity: 0, duration: 0.45, ease: "power3.out", delay: 0.1 });
    });
    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, []);

  const close = useCallback(() => {
    const ctx = gsap.context(() => {
      gsap.to(boxRef.current, { scale: 0.92, opacity: 0, duration: 0.3, ease: "power3.in" });
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.38, ease: "power2.in", delay: 0.08,
        onComplete: onClose });
    });
  }, [onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  const src = `https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0&modestbranding=1&color=white`;

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) close(); }}
      style={{
        position: "fixed", inset: 0, zIndex: 99999,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "16px",
        background: "rgba(0,0,0,0.88)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
    >
      <div ref={boxRef} style={{ position: "relative", width: "100%", maxWidth: "860px" }}>

        {/* Close */}
        <button
          onClick={close}
          style={{
            position: "absolute", top: "-44px", right: 0,
            display: "flex", alignItems: "center", gap: "8px",
            background: "none", border: "none", cursor: "pointer",
            color: "rgba(255,255,255,0.4)",
            fontFamily: "Barlow,sans-serif", fontSize: "10px",
            letterSpacing: "0.22em", textTransform: "uppercase",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "white"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)"; }}
        >
          Close
          <span style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: "26px", height: "26px",
            border: "1px solid rgba(255,255,255,0.2)", position: "relative",
          }}>
            <span style={{ position: "absolute", width: "10px", height: "1px", background: "rgba(255,255,255,0.5)", transform: "rotate(45deg)" }} />
            <span style={{ position: "absolute", width: "10px", height: "1px", background: "rgba(255,255,255,0.5)", transform: "rotate(-45deg)" }} />
          </span>
        </button>

        {/* Embed */}
        <div style={{ position: "relative", width: "100%", paddingBottom: "56.25%" }}>
          <iframe
            src={src}
            title={video.title}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
          />
        </div>

        {/* Meta */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginTop: "16px", padding: "0 2px" }}>
          <div>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", color: "rgba(255,255,255,0.85)", fontWeight: 300, fontSize: "1.25rem", lineHeight: 1.2, margin: 0 }}>
              {video.title}
            </p>
            <span style={{ fontFamily: "Barlow,sans-serif", fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)" }}>
              {video.category}
            </span>
          </div>
          <a
            href={`https://www.youtube.com/watch?v=${video.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: "Barlow,sans-serif", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", textDecoration: "none", marginTop: "4px" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.25)"; }}
          >
            Open on YouTube ↗
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── CARD ─────────────────────────────────────────────────────────────────────

function VideoCard({
  video,
  index,
  cardRef,
  onOpen,
}: {
  video: (typeof VIDEOS)[0];
  index: number;
  cardRef: (el: HTMLDivElement | null) => void;
  onOpen: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const depth = Math.abs(index - 2);

  const handleEnter = () => {
    setHovered(true);
    gsap.to(overlayRef.current, { opacity: 0.3, duration: 0.4 });
  };
  const handleLeave = () => {
    setHovered(false);
    gsap.to(overlayRef.current, { opacity: 1, duration: 0.4 });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={onOpen}
      style={{
        position: "absolute",
        width: "clamp(170px, 18vw, 250px)",
        aspectRatio: "9/16",
        borderRadius: "18px",
        overflow: "hidden",
        cursor: "pointer",
        boxShadow: `0 ${24 + depth * 12}px ${60 + depth * 12}px rgba(0,0,0,${0.55 + depth * 0.09}), 0 0 0 1px rgba(255,255,255,0.07)`,
        transformOrigin: "bottom center",
        willChange: "transform, opacity",
        opacity: 0,
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%) rotate(0deg) scale(0.84)",
        transition: "transform 0.15s ease",
      }}
    >
      {/* YouTube thumbnail — fills the card */}
      <Image
        src={thumbMax(video.videoId)}
        alt={video.title}
        fill
        sizes="(max-width: 768px) 50vw, 20vw"
        style={{ objectFit: "cover", objectPosition: "center" }}
        // Fallback to hq if maxres doesn't exist
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = thumbHQ(video.videoId);
        }}
        unoptimized // YouTube CDN images don't need Next.js optimisation
      />

      {/* Fallback gradient */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        background: `linear-gradient(155deg,hsl(${video.id*52},12%,12%)0%,hsl(${video.id*52+25},8%,7%)100%)`,
      }} />

      {/* Vignette — lightens on hover */}
      <div ref={overlayRef} style={{
        position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
        background: "linear-gradient(to top,rgba(0,0,0,0.80)0%,rgba(0,0,0,0.15)50%,rgba(0,0,0,0.05)100%)",
      }} />

      {/* Top vignette */}
      <div style={{
        position: "absolute", left: 0, right: 0, top: 0, height: "80px", zIndex: 2,
        pointerEvents: "none",
        background: "linear-gradient(to bottom,rgba(0,0,0,0.55),transparent)",
      }} />

      {/* Play button — shows on hover */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 3,
        display: "flex", alignItems: "center", justifyContent: "center",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.3s ease",
        pointerEvents: "none",
      }}>
        <div style={{
          width: "52px", height: "52px", borderRadius: "50%",
          background: "rgba(255,255,255,0.12)",
          border: "1px solid rgba(255,255,255,0.3)",
          backdropFilter: "blur(8px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          transform: hovered ? "scale(1)" : "scale(0.8)",
          transition: "transform 0.3s ease",
        }}>
          {/* Play triangle */}
          <div style={{
            marginLeft: "4px",
            width: 0, height: 0,
            borderTop: "9px solid transparent",
            borderBottom: "9px solid transparent",
            borderLeft: "16px solid rgba(255,255,255,0.9)",
          }} />
        </div>
      </div>

      {/* Index — top left */}
      <div style={{ position: "absolute", top: "14px", left: "16px", zIndex: 4 }}>
        <span style={{ fontFamily: "Barlow,sans-serif", fontSize: "9px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.2em" }}>
          0{video.id}
        </span>
      </div>

      {/* Bottom meta */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "18px", zIndex: 4 }}>
        <p style={{
          fontFamily: "'Cormorant Garamond',serif", fontWeight: 300,
          color: "rgba(255,255,255,0.9)", fontSize: "1rem",
          lineHeight: 1.25, marginBottom: "4px",
        }}>
          {video.title}
        </p>
        <span style={{
          fontFamily: "Barlow,sans-serif", fontSize: "8px",
          letterSpacing: "0.22em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.32)",
        }}>
          {video.category}
        </span>
      </div>

      {/* Corner */}
      <div style={{ position: "absolute", top: 0, right: 0, width: "20px", height: "20px", zIndex: 4, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: "100%", height: "1px", background: "rgba(255,255,255,0.14)" }} />
        <div style={{ position: "absolute", top: 0, right: 0, width: "1px", height: "100%", background: "rgba(255,255,255,0.14)" }} />
      </div>
    </div>
  );
}

// ─── SECTION ──────────────────────────────────────────────────────────────────

export default function VideoShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef  = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const subRef     = useRef<HTMLParagraphElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);
  const cardRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const [activeVideo, setActiveVideo] = useState<(typeof VIDEOS)[0] | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const sticky  = stickyRef.current;
    const cards   = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!section || !sticky || !cards.length) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=300%",
          pin: sticky,
          scrub: 1.5,
          anticipatePin: 1,
        },
      });

      tl.from(headingRef.current, { y: 32, opacity: 0, duration: 0.2 }, 0);

      cards.forEach((card, i) => {
        tl.to(card, {
          opacity: 1,
          rotation: FAN_ROT[i],
          x: `${FAN_X_VW[i]}vw`,
          y: 0,
          scale: 1,
          duration: 0.55,
          ease: "back.out(1.1)",
        }, i * 0.12);
      });

      tl.from(subRef.current,  { y: 16, opacity: 0, duration: 0.2  }, 0.76);
      tl.from(ctaRef.current,  { y: 12, opacity: 0, duration: 0.18 }, 0.90);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Barlow:wght@300;400;500&display=swap');
      `}</style>

      {/* Modal */}
      {activeVideo && (
        <Modal video={activeVideo} onClose={() => setActiveVideo(null)} />
      )}

      <section ref={sectionRef} className="relative bg-black" style={{ height: "400vh" }}>
        <div ref={stickyRef} className="w-full h-screen flex flex-col items-center justify-center overflow-hidden">

          {/* Grain */}
          <div className="pointer-events-none absolute inset-0 z-[1] opacity-[0.028]"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "180px" }} aria-hidden="true" />

          {/* Glow */}
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1]"
            style={{ width: "900px", height: "900px", background: "radial-gradient(ellipse,#fff 0%,transparent 60%)", opacity: 0.036 }} aria-hidden="true" />

          {/* Ghost word */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-[2] select-none" aria-hidden="true">
            <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(8rem,26vw,30rem)", color: "rgba(255,255,255,0.018)", fontWeight: 900, lineHeight: 1, textTransform: "uppercase" }}>
              Work
            </span>
          </div>

          {/* Eyebrow */}
          <div ref={headingRef} className="absolute top-[9%] left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20">
            <div className="flex items-center gap-3">
              <span className="w-6 h-px bg-white/20" />
              <span style={{ fontFamily: "Barlow,sans-serif", fontSize: "9px", letterSpacing: "0.42em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)" }}>Selected Work</span>
              <span className="w-6 h-px bg-white/20" />
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.8rem,4vw,3rem)", color: "rgba(255,255,255,0.75)", fontWeight: 300, lineHeight: 1, textAlign: "center" }}>
              Click to watch
            </h2>
          </div>

          {/* Zero-size anchor */}
          <div className="relative z-10" style={{ width: 0, height: 0 }}>
            {VIDEOS.map((video, i) => (
              <VideoCard
                key={video.id}
                video={video}
                index={i}
                cardRef={(el) => { cardRefs.current[i] = el; }}
                onOpen={() => setActiveVideo(video)}
              />
            ))}
          </div>

          {/* Bottom */}
          <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20">
            <p ref={subRef} style={{ fontFamily: "Barlow,sans-serif", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.18)", textAlign: "center" }}>
              {VIDEOS.length} films · scroll to reveal · click to play
            </p>
            <div ref={ctaRef}>
              <a href="/projects"
                className="inline-flex items-center gap-2.5 border border-white/[0.11] hover:border-white/40 transition-all duration-300"
                style={{ padding: "12px 28px", fontFamily: "Barlow,sans-serif", fontSize: "10px", letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", textDecoration: "none" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "white"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.3)"; }}
              >
                View all projects
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" style={{ opacity: 0.38 }}>
                  <path d="M1 5.5h9M6 2l3.5 3.5L6 9" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}