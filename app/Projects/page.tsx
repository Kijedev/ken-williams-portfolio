"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

// ─── Data ─────────────────────────────────────────────────────────────────────
// Set featured: true on the one video to show as the full-bleed hero.
// videoId = YouTube ID. thumbnail = /public path (fallback when video not loaded).

const PROJECTS = [
  {
    id: 1,
    title: "Lumière Skincare",
    client: "Lumière Beauty Co.",
    category: "Hero Film",
    duration: "1:00",
    year: "2024",
    thumbnail: "/projects/thumb-01.jpg",
    videoId: "GJ46w3qVVf4",
    featured: true,
    accent: "#C9A96E",
  },
  {
    id: 2,
    title: "Noir Fragrance",
    client: "Maison Noir",
    category: "Brand Film",
    duration: "0:45",
    year: "2024",
    thumbnail: "/projects/thumb-02.jpg",
    videoId: "dQw4w9WgXcQ",
    featured: false,
    accent: "#8B7355",
  },
  {
    id: 3,
    title: "Apex Sneakers",
    client: "Apex Co.",
    category: "Social Content",
    duration: "0:30",
    year: "2024",
    thumbnail: "/projects/thumb-03.jpg",
    videoId: "dQw4w9WgXcQ",
    featured: false,
    accent: "#6B8CAE",
  },
  {
    id: 4,
    title: "Velvet Jewels",
    client: "Velvet & Co.",
    category: "E-Commerce",
    duration: "0:30",
    year: "2024",
    thumbnail: "/projects/thumb-04.jpg",
    videoId: "dQw4w9WgXcQ",
    featured: false,
    accent: "#A0856C",
  },
  {
    id: 5,
    title: "Botanical Spirits",
    client: "Roots Distillery",
    category: "Hero Film",
    duration: "1:00",
    year: "2023",
    thumbnail: "/projects/thumb-05.jpg",
    videoId: "dQw4w9WgXcQ",
    featured: false,
    accent: "#7A9E7E",
  },
  {
    id: 6,
    title: "Kinetic Watches",
    client: "Kinetic Co.",
    category: "Brand Film",
    duration: "0:45",
    year: "2023",
    thumbnail: "/projects/thumb-06.jpg",
    videoId: "dQw4w9WgXcQ",
    featured: false,
    accent: "#B8A99A",
  },
];

type Project = (typeof PROJECTS)[0];

// ─── Lightbox ─────────────────────────────────────────────────────────────────

function Lightbox({ project, onClose }: { project: Project; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const ctx = gsap.context(() => {
      gsap.from(overlayRef.current, { opacity: 0, duration: 0.5, ease: "power2.out" });
      gsap.from(boxRef.current, { scale: 0.92, opacity: 0, y: 30, duration: 0.6, ease: "expo.out", delay: 0.1 });
    });
    return () => { ctx.revert(); document.body.style.overflow = ""; };
  }, []);

  const close = useCallback(() => {
    const ctx = gsap.context(() => {
      gsap.to(boxRef.current, { scale: 0.94, opacity: 0, y: -20, duration: 0.4, ease: "power3.in" });
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.45, ease: "power2.in", delay: 0.1, onComplete: onClose });
    });
    return ctx;
  }, [onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  const embedSrc = `https://www.youtube.com/embed/${project.videoId}?autoplay=1&rel=0&modestbranding=1`;

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) close(); }}
      style={{
        position: "fixed", inset: 0, zIndex: 99999,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "clamp(1rem, 4vw, 3rem)",
        background: "rgba(0,0,0,0.95)",
        backdropFilter: "blur(16px)",
      }}
    >
      <div ref={boxRef} style={{ position: "relative", width: "100%", maxWidth: "1000px" }}>
        {/* Letterbox bars */}
        <div style={{ position: "absolute", top: "-20px", left: 0, right: 0, height: "20px", background: "#000" }} />
        <div style={{ position: "absolute", bottom: "-20px", left: 0, right: 0, height: "20px", background: "#000" }} />

        {/* Close */}
        <button
          onClick={() => close()}
          style={{
            position: "absolute", top: "-44px", right: 0,
            display: "flex", alignItems: "center", gap: "8px",
            color: "rgba(255,255,255,0.35)", background: "none", border: "none",
            cursor: "pointer", padding: 0, transition: "color 0.2s",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#fff"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.35)"; }}
          aria-label="Close"
        >
          <span style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase" }}>Close</span>
          <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, border: "1px solid currentColor", position: "relative" }}>
            <span style={{ position: "absolute", width: 12, height: 1, background: "currentColor", transform: "rotate(45deg)" }} />
            <span style={{ position: "absolute", width: 12, height: 1, background: "currentColor", transform: "rotate(-45deg)" }} />
          </span>
        </button>

        {/* Embed */}
        <div style={{ position: "relative", paddingBottom: "56.25%", background: "#000" }}>
          <iframe
            src={embedSrc}
            title={project.title}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
          />
        </div>

        {/* Meta */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-start",
          marginTop: "1rem", padding: "0 2px",
        }}>
          <div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(1.1rem,2.5vw,1.6rem)", color: "#FEE9CE", margin: 0 }}>
              {project.title}
            </h3>
            <p style={{ fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginTop: "4px" }}>
              {project.client} · {project.category}
            </p>
          </div>
          <span style={{ fontSize: "9px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.15)", marginTop: "4px" }}>{project.year}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Reel Card (horizontal strip) ────────────────────────────────────────────

function ReelCard({ project, onPlay }: { project: Project; onPlay: (p: Project) => void }) {
  const [hov, setHov] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      onClick={() => onPlay(project)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "relative",
        flexShrink: 0,
        width: "clamp(220px, 28vw, 380px)",
        height: "clamp(290px, 38vw, 500px)",
        cursor: "pointer",
        overflow: "hidden",
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter") onPlay(project); }}
      aria-label={`Play ${project.title}`}
    >
      {/* Thumbnail */}
      <div
        ref={imgRef}
        style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${project.thumbnail}), linear-gradient(160deg, #1a1410 0%, #0d0b09 100%)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: hov ? "scale(1.07)" : "scale(1)",
          transition: "transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)",
        }}
      />

      {/* Overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: hov
          ? "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.15) 100%)"
          : "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%)",
        transition: "background 0.5s ease",
      }} />

      {/* Play */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        opacity: hov ? 1 : 0,
        transition: "opacity 0.4s ease",
      }}>
        <div style={{
          width: 52, height: 52, borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.3)",
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(8px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          transform: hov ? "scale(1)" : "scale(0.75)",
          transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
        }}>
          <div style={{
            marginLeft: 3,
            width: 0, height: 0,
            borderTop: "7px solid transparent",
            borderBottom: "7px solid transparent",
            borderLeft: "12px solid rgba(255,255,255,0.8)",
          }} />
        </div>
      </div>

      {/* Bottom meta */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "clamp(1rem,2.5vw,1.5rem)",
        transform: hov ? "translateY(0)" : "translateY(4px)",
        transition: "transform 0.4s ease",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
          <span style={{
            width: 4, height: 4, borderRadius: "50%",
            background: project.accent, display: "block", flexShrink: 0,
          }} />
          <span style={{ fontSize: "8px", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>
            {project.category}
          </span>
        </div>
        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(1rem,2vw,1.4rem)",
          fontWeight: 300,
          color: "#FEE9CE",
          margin: "0 0 4px",
          lineHeight: 1.1,
        }}>
          {project.title}
        </h3>
        <p style={{ fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", margin: 0 }}>
          {project.client}
        </p>
      </div>

      {/* Index */}
      <div style={{ position: "absolute", top: "clamp(0.8rem,1.5vw,1.2rem)", left: "clamp(0.8rem,1.5vw,1.2rem)" }}>
        <span style={{ fontSize: "9px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.18)", fontVariantNumeric: "tabular-nums" }}>
          {String(project.id).padStart(2, "0")}
        </span>
      </div>

      {/* Accent corner line */}
      <div style={{
        position: "absolute", top: 0, left: 0,
        width: hov ? "100%" : "0%",
        height: "1px",
        background: `linear-gradient(to right, ${project.accent}, transparent)`,
        transition: "width 0.6s cubic-bezier(0.25,0.46,0.45,0.94)",
      }} />
    </div>
  );
}

// ─── Feature Row (scroll-reveal alternating) ──────────────────────────────────

function FeatureRow({ project, index, onPlay }: {
  project: Project;
  index: number;
  onPlay: (p: Project) => void;
}) {
  const rowRef  = useRef<HTMLDivElement>(null);
  const imgRef  = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const numRef  = useRef<HTMLDivElement>(null);
  const [hov, setHov] = useState(false);
  const isEven = index % 2 === 0;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image parallax reveal
      gsap.fromTo(imgRef.current,
        { clipPath: isEven ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.2,
          ease: "expo.inOut",
          scrollTrigger: { trigger: rowRef.current, start: "top 80%" },
        }
      );

      // Text stagger
      gsap.from(textRef.current?.children ?? [], {
        y: 30, opacity: 0, duration: 0.9, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: rowRef.current, start: "top 75%" },
        delay: 0.3,
      });

      // Number count-up feel
      gsap.from(numRef.current, {
        opacity: 0, x: isEven ? -20 : 20, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: rowRef.current, start: "top 80%" },
      });

      // Subtle image parallax on scroll
      gsap.to(imgRef.current, {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: rowRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, rowRef);

    return () => ctx.revert();
  }, [isEven]);

  return (
    <div
      ref={rowRef}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 0,
        minHeight: "clamp(320px, 55vw, 680px)",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
      className="feature-row"
    >
      {/* ── Image side ── */}
      <div
        style={{
          order: isEven ? 0 : 1,
          position: "relative",
          overflow: "hidden",
          cursor: "pointer",
        }}
        onClick={() => onPlay(project)}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter") onPlay(project); }}
        aria-label={`Play ${project.title}`}
      >
        <div
          ref={imgRef}
          style={{
            position: "absolute", inset: "-8% 0",
            backgroundImage: `url(${project.thumbnail}), linear-gradient(160deg, #1a1410 0%, #0d0b09 100%)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: hov ? "scale(1.04)" : "scale(1)",
            transition: "transform 1s cubic-bezier(0.25,0.46,0.45,0.94)",
          }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: hov
            ? "rgba(0,0,0,0.25)"
            : "rgba(0,0,0,0.15)",
          transition: "background 0.5s ease",
        }} />

        {/* Top accent line */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "2px",
          background: `linear-gradient(to right, ${project.accent}66, transparent)`,
        }} />

        {/* Play overlay */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: hov ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}>
          <div style={{
            width: 64, height: 64, borderRadius: "50%",
            border: `1px solid ${project.accent}66`,
            background: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(10px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            transform: hov ? "scale(1)" : "scale(0.8)",
            transition: "transform 0.5s cubic-bezier(0.34,1.56,0.64,1)",
          }}>
            <div style={{
              marginLeft: 4,
              width: 0, height: 0,
              borderTop: "8px solid transparent",
              borderBottom: "8px solid transparent",
              borderLeft: `14px solid ${project.accent}`,
            }} />
          </div>
        </div>

        {/* Duration badge */}
        <div style={{
          position: "absolute", bottom: "1.2rem", right: "1.2rem",
          padding: "4px 10px",
          border: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(8px)",
        }}>
          <span style={{ fontSize: "9px", letterSpacing: "0.15em", color: "rgba(255,255,255,0.35)" }}>
            {project.duration}
          </span>
        </div>
      </div>

      {/* ── Text side ── */}
      <div style={{
        order: isEven ? 1 : 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "clamp(2rem,6vw,6rem) clamp(2rem,5vw,5rem)",
        position: "relative",
        background: "#050505",
      }}>
        {/* Large background number */}
        <div
          ref={numRef}
          style={{
            position: "absolute",
            top: "50%", transform: "translateY(-50%)",
            [isEven ? "right" : "left"]: "clamp(1rem,3vw,3rem)",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(6rem,14vw,16rem)",
            fontWeight: 300,
            color: "rgba(255,255,255,0.025)",
            lineHeight: 1,
            userSelect: "none",
            pointerEvents: "none",
          }}
          aria-hidden="true"
        >
          {String(project.id).padStart(2, "0")}
        </div>

        <div ref={textRef} style={{ position: "relative", zIndex: 1 }}>
          {/* Category */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "clamp(1rem,2.5vw,2rem)" }}>
            <span style={{
              width: 24, height: 1,
              background: project.accent, display: "block", flexShrink: 0,
            }} />
            <span style={{
              fontSize: "clamp(0.5rem,0.9vw,0.65rem)",
              letterSpacing: "0.38em",
              textTransform: "uppercase",
              color: project.accent,
              opacity: 0.75,
            }}>
              {project.category}
            </span>
          </div>

          {/* Title */}
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1.8rem,4.5vw,4rem)",
            fontWeight: 300,
            color: "#FEE9CE",
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
            margin: "0 0 clamp(0.5rem,1.5vw,1rem)",
          }}>
            {project.title}
          </h2>

          {/* Client */}
          <p style={{
            fontSize: "clamp(0.65rem,1.2vw,0.85rem)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.25)",
            margin: "0 0 clamp(1.5rem,3vw,2.5rem)",
          }}>
            {project.client} · {project.year}
          </p>

          {/* Divider */}
          <div style={{
            width: "clamp(32px,5vw,52px)", height: "1px",
            background: "rgba(255,255,255,0.1)",
            margin: "0 0 clamp(1.5rem,3vw,2.5rem)",
          }} />

          {/* CTA */}
          <button
            onClick={() => onPlay(project)}
            style={{
              display: "inline-flex", alignItems: "center", gap: 12,
              background: "none", border: "none", cursor: "pointer", padding: 0,
              color: "rgba(255,255,255,0.4)",
              fontSize: "clamp(0.65rem,1vw,0.78rem)",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = project.accent; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)"; }}
          >
            Watch Film
            <svg width="32" height="1" viewBox="0 0 32 1" fill="none" style={{ overflow: "visible" }}>
              <line x1="0" y1="0.5" x2="28" y2="0.5" stroke="currentColor" strokeWidth="1" />
              <path d="M26 -3 L32 0.5 L26 4" stroke="currentColor" strokeWidth="1" fill="none" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProjectsPage() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const pageRef       = useRef<HTMLDivElement>(null);
  const heroRef       = useRef<HTMLDivElement>(null);
  const heroBgRef     = useRef<HTMLDivElement>(null);
  const heroTextRef   = useRef<HTMLDivElement>(null);
  const heroTitleRef  = useRef<HTMLHeadingElement>(null);
  const heroSubRef    = useRef<HTMLParagraphElement>(null);
  const reelRef       = useRef<HTMLDivElement>(null);
  const reelTrackRef  = useRef<HTMLDivElement>(null);
  const reelLabelRef  = useRef<HTMLDivElement>(null);
  const featuredRef   = useRef<HTMLDivElement>(null);

  const featuredProject = PROJECTS.find((p) => p.featured) ?? PROJECTS[0];
  const reelProjects    = PROJECTS.filter((p) => !p.featured);
  const featureProjects = PROJECTS.filter((p) => !p.featured);

  // ── Entrance + scroll animations ────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {

      // Hero text entrance
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTl
        .from(heroTextRef.current?.children ?? [], {
          y: 60, opacity: 0, duration: 1.1, stagger: 0.12,
        }, 0.4);

      // Hero background slow zoom
      gsap.to(heroBgRef.current, {
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Hero text parallax out
      gsap.to(heroTextRef.current, {
        y: -80, opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "40% top",
          scrub: true,
        },
      });

      // Reel label entrance
      gsap.from(reelLabelRef.current, {
        y: 30, opacity: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: reelRef.current, start: "top 85%" },
      });

      // Reel horizontal scroll
      const reelTrack = reelTrackRef.current;
      if (reelTrack) {
        const totalScroll = reelTrack.scrollWidth - window.innerWidth;
        gsap.to(reelTrack, {
          x: -totalScroll,
          ease: "none",
          scrollTrigger: {
            trigger: reelRef.current,
            pin: true,
            start: "top top",
            end: () => `+=${totalScroll + window.innerHeight}`,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }

    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Barlow:wght@300;400;500&display=swap');

        * { box-sizing: border-box; }

        .feature-row {
          grid-template-columns: 1fr 1fr;
        }
        @media (max-width: 768px) {
          .feature-row {
            grid-template-columns: 1fr !important;
          }
          .feature-row > div {
            order: unset !important;
            min-height: 260px;
          }
        }
      `}</style>

      {activeProject && (
        <Lightbox project={activeProject} onClose={() => setActiveProject(null)} />
      )}

      <div ref={pageRef} style={{ background: "#000", color: "#fff", overflowX: "hidden" }}>

        {/* ══════════════════════════════════════════════════════════════
            SCENE 1 — Full-bleed featured hero
        ══════════════════════════════════════════════════════════════ */}
        <div
          ref={heroRef}
          style={{
            position: "relative",
            height: "100vh",
            minHeight: 500,
            overflow: "hidden",
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          {/* Background — muted autoplay iframe or gradient fallback */}
          <div
            ref={heroBgRef}
            style={{
              position: "absolute", inset: 0,
              backgroundImage: `url("/jump.png"), linear-gradient(160deg, #1a1208 0%, #0a0907 50%, #000 100%)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transformOrigin: "center",
            }}
          />

          {/* Cinematic letterbox bars */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "clamp(40px,5vh,60px)",
            background: "#000", zIndex: 2,
          }} />
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: "clamp(40px,5vh,60px)",
            background: "#000", zIndex: 2,
          }} />

          {/* Gradient overlay */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 1,
            background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.5) 100%)",
          }} />
          <div style={{
            position: "absolute", inset: 0, zIndex: 1,
            background: "linear-gradient(to right, rgba(0,0,0,0.6) 0%, transparent 50%)",
          }} />

          {/* Grain */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none", opacity: 0.04,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "180px",
          }} aria-hidden="true" />

          {/* Hero text */}
          <div
            ref={heroTextRef}
            style={{
              position: "relative", zIndex: 10,
              padding: "0 clamp(1.5rem,6vw,6rem) clamp(5rem,10vh,8rem)",
              width: "100%",
            }}
          >
            {/* Eyebrow */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "clamp(1rem,2vw,1.5rem)" }}>
              <span style={{ width: 32, height: 1, background: "rgba(255,255,255,0.25)", display: "block" }} />
              <span style={{ fontSize: "9px", letterSpacing: "0.42em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
                Selected Work
              </span>
            </div>

            {/* Title */}
            <h1
              ref={heroTitleRef}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(3rem,9vw,8rem)",
                fontWeight: 300,
                lineHeight: 0.9,
                letterSpacing: "-0.025em",
                color: "#FEE9CE",
                margin: "0 0 clamp(1rem,2vw,1.5rem)",
                maxWidth: "clamp(300px,65vw,900px)",
              }}
            >
              The Work
              <em style={{ display: "block", fontStyle: "italic", color: "rgba(255,255,255,0.2)", fontSize: "0.85em" }}>
                speaks.
              </em>
            </h1>

            {/* Sub row */}
            <div style={{
              display: "flex", flexWrap: "wrap",
              alignItems: "center", gap: "clamp(1rem,3vw,3rem)",
            }}>
              <p
                ref={heroSubRef}
                style={{
                  fontSize: "clamp(0.7rem,1.2vw,0.85rem)",
                  color: "rgba(255,255,255,0.25)",
                  letterSpacing: "0.04em",
                  lineHeight: 1.7,
                  margin: 0,
                  maxWidth: 340,
                }}
              >
                {featuredProject.title} — {featuredProject.category}<br />
                {featuredProject.client}, {featuredProject.year}
              </p>

              <button
                onClick={() => setActiveProject(featuredProject)}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 12,
                  padding: "12px 28px",
                  border: "1px solid rgba(255,255,255,0.18)",
                  background: "rgba(255,255,255,0.03)",
                  color: "rgba(255,255,255,0.55)",
                  fontSize: "clamp(0.65rem,1vw,0.78rem)",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  backdropFilter: "blur(8px)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(255,255,255,0.45)";
                  el.style.color = "#fff";
                  el.style.background = "rgba(255,255,255,0.06)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(255,255,255,0.18)";
                  el.style.color = "rgba(255,255,255,0.55)";
                  el.style.background = "rgba(255,255,255,0.03)";
                }}
              >
                Watch Film
                <div style={{
                  width: 0, height: 0,
                  borderTop: "5px solid transparent",
                  borderBottom: "5px solid transparent",
                  borderLeft: "8px solid currentColor",
                }} />
              </button>

              {/* Scroll cue */}
              <div style={{
                marginLeft: "auto",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
              }}>
                <span style={{ fontSize: "7px", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(255,255,255,0.15)" }}>
                  Scroll
                </span>
                <div style={{
                  width: 1, height: 40,
                  background: "linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)",
                  animation: "pulse 2s ease-in-out infinite",
                }} />
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            SCENE 2 — Horizontal scroll reel
        ══════════════════════════════════════════════════════════════ */}
        <div ref={reelRef} style={{ position: "relative", background: "#000", overflow: "hidden" }}>

          {/* Label — pinned at top while reel scrolls */}
          <div
            ref={reelLabelRef}
            style={{
              padding: "clamp(2rem,4vh,3.5rem) clamp(1.5rem,6vw,6rem) clamp(1rem,2vh,1.5rem)",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              borderBottom: "1px solid rgba(255,255,255,0.04)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 28, height: 1, background: "rgba(255,255,255,0.2)", display: "block" }} />
              <span style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(0.7rem,1.2vw,0.9rem)",
                letterSpacing: "0.2em",
                color: "rgba(255,255,255,0.3)",
                textTransform: "uppercase",
              }}>
                Full Reel
              </span>
            </div>
            <span style={{ fontSize: "8px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.15)" }}>
              {reelProjects.length} Films
            </span>
          </div>

          {/* Horizontal track */}
          <div style={{ overflow: "hidden" }}>
            <div
              ref={reelTrackRef}
              style={{
                display: "flex",
                alignItems: "stretch",
                gap: "2px",
                paddingLeft: "clamp(1.5rem,6vw,6rem)",
                paddingRight: "clamp(1.5rem,6vw,6rem)",
                paddingTop: "clamp(1.5rem,3vh,2.5rem)",
                paddingBottom: "clamp(1.5rem,3vh,2.5rem)",
                width: "max-content",
              }}
            >
              {reelProjects.map((p) => (
                <ReelCard key={p.id} project={p} onPlay={setActiveProject} />
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            SCENE 3 — Alternating feature rows
        ══════════════════════════════════════════════════════════════ */}
        <div ref={featuredRef}>

          {/* Section header */}
          <div style={{
            padding: "clamp(4rem,8vh,7rem) clamp(1.5rem,6vw,6rem) clamp(2rem,4vh,3rem)",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            display: "flex", alignItems: "flex-end", justifyContent: "space-between",
            flexWrap: "wrap", gap: "1rem",
          }}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem,5vw,4rem)",
              fontWeight: 300,
              color: "#FEE9CE",
              margin: 0,
              letterSpacing: "-0.02em",
              lineHeight: 0.95,
            }}>
              In Detail
            </h2>
            <p style={{
              fontSize: "clamp(0.65rem,1vw,0.78rem)",
              letterSpacing: "0.08em",
              color: "rgba(255,255,255,0.2)",
              margin: 0,
              maxWidth: 280,
              lineHeight: 1.7,
            }}>
              Every frame is intentional. Every film has a story behind the story.
            </p>
          </div>

          {featureProjects.map((p, i) => (
            <FeatureRow key={p.id} project={p} index={i} onPlay={setActiveProject} />
          ))}
        </div>

        {/* ══════════════════════════════════════════════════════════════
            SCENE 4 — CTA
        ══════════════════════════════════════════════════════════════ */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          padding: "clamp(4rem,10vh,8rem) clamp(1.5rem,6vw,6rem)",
          display: "flex", flexDirection: "column", alignItems: "center",
          textAlign: "center", gap: "clamp(1.5rem,3vh,2.5rem)",
          position: "relative",
        }}>
          {/* Glow */}
          <div style={{
            position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)",
            width: 600, height: 300, borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(254,233,206,0.03) 0%, transparent 70%)",
            pointerEvents: "none",
          }} aria-hidden="true" />

          <span style={{ fontSize: "8px", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)" }}>
            Next
          </span>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2rem,6vw,5rem)",
            fontWeight: 300,
            color: "#FEE9CE",
            margin: 0,
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
            maxWidth: 700,
          }}>
            Want your product<br />
            <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.22)" }}>in this reel?</em>
          </h2>
          <p style={{
            fontSize: "clamp(0.65rem,1.1vw,0.82rem)",
            letterSpacing: "0.06em",
            color: "rgba(255,255,255,0.2)",
            margin: 0,
            lineHeight: 1.7,
            maxWidth: 380,
          }}>
            We craft product films that make people stop scrolling and start buying.
          </p>
          <Link
            href="/contact"
            style={{
              display: "inline-flex", alignItems: "center", gap: 12,
              marginTop: "0.5rem",
              padding: "16px 40px",
              border: "1px solid rgba(255,255,255,0.15)",
              background: "transparent",
              color: "rgba(255,255,255,0.5)",
              fontSize: "clamp(0.65rem,1vw,0.78rem)",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "all 0.35s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "rgba(255,255,255,0.4)";
              el.style.color = "#FEE9CE";
              el.style.background = "rgba(254,233,206,0.03)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "rgba(255,255,255,0.15)";
              el.style.color = "rgba(255,255,255,0.5)";
              el.style.background = "transparent";
            }}
          >
            Start a project
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* Bottom line */}
        <div style={{
          height: 1,
          background: "linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)",
        }} />

        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 1; }
          }
        `}</style>
      </div>
    </>
  );
}

// import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Projects - Ken Williams",
//   description: "Projects - Ken Williams",
// };

// export default function Page() {
//   return (
//     <main>
      
//     </main>
//   );
// }