"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

// ─── data ─────────────────────────────────────────────────────────────────────
// Replace videoId with your actual YouTube/Vimeo IDs, or use src for direct mp4
// thumbnail: path in /public  e.g. "/projects/skincare-thumb.jpg"

const PROJECTS = [
  {
    id: 1,
    title: "Lumière Skincare",
    client: "Lumière Beauty Co.",
    category: "Hero Film",
    duration: "1:00",
    year: "2024",
    thumbnail: "/projects/thumb-01.jpg",
    videoId: "GJ46w3qVVf4", // ← replace with real YouTube ID
    platform: "youtube",
    size: "large", // large | medium | small — controls grid layout
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
    platform: "youtube",
    size: "medium",
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
    platform: "youtube",
    size: "small",
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
    platform: "youtube",
    size: "small",
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
    platform: "youtube",
    size: "large",
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
    platform: "youtube",
    size: "medium",
  },
];

const FILTERS = ["All", "Hero Film", "Brand Film", "Social Content", "E-Commerce"];

// ─── types ────────────────────────────────────────────────────────────────────

type Project = (typeof PROJECTS)[0];

// ─── Lightbox ─────────────────────────────────────────────────────────────────

function Lightbox({ project, onClose }: { project: Project; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const boxRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const ctx = gsap.context(() => {
      gsap.from(overlayRef.current, { opacity: 0, duration: 0.4, ease: "power2.out" });
      gsap.from(boxRef.current, { scale: 0.94, opacity: 0, duration: 0.5, ease: "power3.out", delay: 0.1 });
    });
    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, []);

  const close = useCallback(() => {
    const ctx = gsap.context(() => {
      gsap.to(boxRef.current, { scale: 0.94, opacity: 0, duration: 0.35, ease: "power3.in" });
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.4, ease: "power2.in", delay: 0.1,
        onComplete: onClose });
    });
  }, [onClose]);

  // Close on overlay click
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) close();
  };

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  const embedSrc = project.platform === "youtube"
    ? `https://www.youtube.com/embed/${project.videoId}?autoplay=1&rel=0&modestbranding=1`
    : `https://player.vimeo.com/video/${project.videoId}?autoplay=1&title=0&byline=0`;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[99990] flex items-center justify-center p-4 md:p-10"
      style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(12px)" }}
    >
      <div ref={boxRef} className="relative w-full max-w-5xl">

        {/* Close button */}
        <button
          onClick={close}
          className="absolute -top-12 right-0 flex items-center gap-2 text-white/40 hover:text-white transition-colors duration-200 group"
          aria-label="Close"
        >
          <span className="text-[10px] tracking-[0.25em] uppercase" style={{ fontFamily: "Barlow, sans-serif" }}>
            Close
          </span>
          <span className="relative flex items-center justify-center w-7 h-7 border border-white/20 group-hover:border-white/50 transition-colors">
            <span className="absolute w-3 h-px bg-white/50 rotate-45" />
            <span className="absolute w-3 h-px bg-white/50 -rotate-45" />
          </span>
        </button>

        {/* Video embed */}
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            src={embedSrc}
            title={project.title}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
            style={{ border: "none" }}
          />
        </div>

        {/* Meta strip below video */}
        <div className="flex items-start justify-between mt-5 px-1">
          <div>
            <h3
              className="text-white font-light text-xl md:text-2xl tracking-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {project.title}
            </h3>
            <p className="text-white/30 text-[11px] tracking-[0.2em] uppercase mt-1"
              style={{ fontFamily: "Barlow, sans-serif" }}>
              {project.client} · {project.category}
            </p>
          </div>
          <span className="text-white/15 text-[10px] tracking-[0.2em] uppercase mt-1"
            style={{ fontFamily: "Barlow, sans-serif" }}>
            {project.year}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Project card ─────────────────────────────────────────────────────────────

function ProjectCard({ project, index, onPlay }: {
  project: Project;
  index: number;
  onPlay: (p: Project) => void;
}) {
  const cardRef    = useRef<HTMLDivElement>(null);
  const imgRef     = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    gsap.from(cardRef.current, {
      y: 50, opacity: 0, duration: 0.85, ease: "power3.out",
      scrollTrigger: { trigger: cardRef.current, start: "top 88%" },
      delay: (index % 3) * 0.1,
    });
  }, [index]);

  const sizeClasses: Record<string, string> = {
    large:  "md:col-span-2 md:row-span-2",
    medium: "md:col-span-1 md:row-span-2",
    small:  "md:col-span-1 md:row-span-1",
  };

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden cursor-pointer group ${sizeClasses[project.size] ?? ""}`}
      style={{ minHeight: project.size === "small" ? "240px" : "380px" }}
      onClick={() => onPlay(project)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter") onPlay(project); }}
      aria-label={`Play ${project.title}`}
    >
      {/* Thumbnail */}
      <div ref={imgRef} className="absolute inset-0 overflow-hidden">
        {/* Fallback gradient when no real thumbnail */}
        <div
          className="w-full h-full transition-transform duration-700 ease-out"
          style={{
            backgroundImage: `url(${project.thumbnail}), linear-gradient(135deg, #111 0%, #1a1a1a 50%, #0d0d0d 100%)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: hovered ? "scale(1.06)" : "scale(1)",
          }}
        />

        {/* Cinematic vignette */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: hovered
              ? "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.1) 100%)"
              : "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0.05) 100%)",
          }}
        />
      </div>

      {/* Play button */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-all duration-400"
        style={{ opacity: hovered ? 1 : 0 }}
      >
        <div
          className="flex items-center justify-center w-14 h-14 rounded-full border border-white/30 backdrop-blur-sm transition-all duration-300"
          style={{
            background: "rgba(255,255,255,0.08)",
            transform: hovered ? "scale(1)" : "scale(0.8)",
          }}
        >
          {/* Play triangle */}
          <div
            className="ml-1"
            style={{
              width: 0, height: 0,
              borderTop: "8px solid transparent",
              borderBottom: "8px solid transparent",
              borderLeft: "14px solid rgba(255,255,255,0.85)",
            }}
          />
        </div>
      </div>

      {/* Bottom meta */}
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 flex items-end justify-between">
        <div className="flex flex-col gap-1">
          {/* Category pill */}
          <span
            className="text-[8px] tracking-[0.25em] uppercase text-white/40 mb-1"
            style={{ fontFamily: "Barlow, sans-serif" }}
          >
            {project.category}
          </span>
          <h3
            className="text-white font-light leading-tight transition-all duration-300"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: project.size === "large" ? "clamp(1.4rem, 2.5vw, 2rem)" : "clamp(1.1rem, 2vw, 1.5rem)",
              transform: hovered ? "translateY(-2px)" : "translateY(0)",
            }}
          >
            {project.title}
          </h3>
          <p
            className="text-white/35 text-[10px] tracking-[0.15em] uppercase"
            style={{ fontFamily: "Barlow, sans-serif" }}
          >
            {project.client}
          </p>
        </div>

        {/* Duration badge */}
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 border border-white/10 backdrop-blur-sm"
          style={{ background: "rgba(0,0,0,0.4)", fontFamily: "Barlow, sans-serif" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
          <span className="text-[9px] text-white/40 tracking-[0.15em]">{project.duration}</span>
        </div>
      </div>

      {/* Index number — top left */}
      <div className="absolute top-4 left-5">
        <span
          className="text-[9px] text-white/20 tabular-nums"
          style={{ fontFamily: "Barlow, sans-serif", letterSpacing: "0.15em" }}
        >
          {String(project.id).padStart(2, "0")}
        </span>
      </div>

      {/* Year — top right */}
      <div className="absolute top-4 right-5">
        <span
          className="text-[9px] text-white/15 tabular-nums"
          style={{ fontFamily: "Barlow, sans-serif", letterSpacing: "0.15em" }}
        >
          {project.year}
        </span>
      </div>

      {/* Corner accent on hover */}
      <div
        className="absolute top-0 right-0 w-8 h-8 transition-opacity duration-300"
        style={{ opacity: hovered ? 1 : 0 }}
        aria-hidden="true"
      >
        <div className="absolute top-0 right-0 w-full h-px bg-white/30" />
        <div className="absolute top-0 right-0 w-px h-full bg-white/30" />
      </div>
    </div>
  );
}

// ─── page ─────────────────────────────────────────────────────────────────────

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const pageRef     = useRef<HTMLDivElement>(null);
  const heroRef     = useRef<HTMLDivElement>(null);
  const eyebrowRef  = useRef<HTMLDivElement>(null);
  const headingRef  = useRef<HTMLHeadingElement>(null);
  const filterRef   = useRef<HTMLDivElement>(null);
  const orbitRef    = useRef<HTMLDivElement>(null);
  const countRef    = useRef<HTMLDivElement>(null);

  const filtered = activeFilter === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeFilter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(eyebrowRef.current,  { y: 20, opacity: 0, duration: 0.7 }, 0.2)
        .from(headingRef.current,  { y: 60, opacity: 0, duration: 1.1 }, 0.35)
        .from(countRef.current,    { y: 20, opacity: 0, duration: 0.7 }, 0.55)
        .from(filterRef.current,   { y: 20, opacity: 0, duration: 0.7 }, 0.65);

      gsap.to(orbitRef.current, { rotation: 360, duration: 40, ease: "none", repeat: -1 });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Barlow:wght@300;400;500&display=swap');
      `}</style>

      {/* Lightbox */}
      {activeProject && (
        <Lightbox project={activeProject} onClose={() => setActiveProject(null)} />
      )}

      <div ref={pageRef} className="relative min-h-screen w-full bg-black text-white overflow-hidden">

        {/* Grain */}
        <div className="pointer-events-none fixed inset-0 z-[1] opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "180px 180px",
          }} aria-hidden="true" />

        {/* Glow */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] opacity-[0.05] z-[1]"
          style={{ background: "radial-gradient(ellipse, #fff 0%, transparent 65%)" }} aria-hidden="true" />

        {/* Orbit */}
        <div ref={orbitRef}
          className="pointer-events-none absolute -top-56 -right-56 w-[600px] h-[600px] rounded-full border border-white/[0.025] z-[1]"
          aria-hidden="true" />

        {/* ══════════════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════════════ */}
        <div ref={heroRef} className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 pt-36 md:pt-48 pb-12">

          <div ref={eyebrowRef} className="flex items-center gap-3 mb-7">
            <span className="w-8 h-px bg-white/20" />
            <span className="text-[10px] tracking-[0.38em] uppercase text-white/25 font-light"
              style={{ fontFamily: "Barlow, sans-serif" }}>
              Selected Work
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <h1
              ref={headingRef}
              className="font-light leading-[0.92] tracking-tight text-white"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(3.5rem, 9vw, 7.5rem)",
              }}
            >
              The Work
              <em className="block" style={{ color: "rgba(255,255,255,0.22)", fontStyle: "italic" }}>
                speaks.
              </em>
            </h1>

            {/* Project count */}
            <div ref={countRef} className="flex flex-col gap-1 md:text-right mb-2">
              <span
                className="font-light leading-none"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "rgba(255,255,255,0.1)" }}
              >
                {String(PROJECTS.length).padStart(2, "0")}
              </span>
              <span className="text-[9px] tracking-[0.3em] uppercase text-white/20"
                style={{ fontFamily: "Barlow, sans-serif" }}>
                Films
              </span>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            FILTER BAR
        ══════════════════════════════════════════════════════ */}
        <div ref={filterRef} className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 mb-10">
          <div className="flex flex-wrap gap-2 items-center">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="px-5 py-2 text-[10px] tracking-[0.2em] uppercase font-light transition-all duration-300 border"
                style={{
                  fontFamily: "Barlow, sans-serif",
                  borderColor: activeFilter === f ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.08)",
                  color: activeFilter === f ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)",
                  background: activeFilter === f ? "rgba(255,255,255,0.04)" : "transparent",
                }}
              >
                {f}
              </button>
            ))}

            {/* Divider */}
            <div className="ml-auto hidden sm:flex items-center gap-2 text-white/15">
              <span className="w-px h-4 bg-white/10" />
              <span className="text-[9px] tracking-[0.2em] uppercase" style={{ fontFamily: "Barlow, sans-serif" }}>
                {filtered.length} film{filtered.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            VIDEO GRID — asymmetric cinematic layout
        ══════════════════════════════════════════════════════ */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 pb-24 md:pb-36">
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4"
            style={{ gridAutoRows: "220px" }}
          >
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onPlay={setActiveProject}
              />
            ))}
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <span className="text-white/15 text-[10px] tracking-[0.3em] uppercase"
                style={{ fontFamily: "Barlow, sans-serif" }}>
                No films in this category yet
              </span>
            </div>
          )}
        </div>

        {/* ══════════════════════════════════════════════════════
            CTA
        ══════════════════════════════════════════════════════ */}
        <div className="relative z-10 border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 py-16 md:py-24 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <p
              className="font-light leading-tight tracking-tight text-white max-w-lg"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
            >
              Want your product in this reel?
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 px-8 py-4 border border-white/15 hover:border-white/45 text-[11px] tracking-[0.24em] uppercase font-light text-white/50 hover:text-white transition-all duration-300"
              style={{ fontFamily: "Barlow, sans-serif" }}
            >
              Start a project
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300">
                <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
      </div>
    </>
  );
}