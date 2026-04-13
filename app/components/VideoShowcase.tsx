"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── CONFIG ───────────────────────────────────────────────────────────────────
// Fan positions: x in vw and rotation in degrees for each of the 5 cards
const FAN_X_VW = [-40, -20, 0, 20, 40];
const FAN_ROT  = [-18,  -9, 0,  9, 18];

// ─── DATA ─────────────────────────────────────────────────────────────────────
// Put your .mp4 files in /public/reels/
// poster is optional — a frame from the video shown before hover

const VIDEOS = [
  {
    id: 1,
    title: "Skincare Hero",
    category: "Hero Film · 1:00",
    videoSrc: "/reels/TIFE2949.mp4",
    poster: "/reels/thumb-01.jpg",
  },
  {
    id: 2,
    title: "Fragrance Reel",
    category: "Brand Film · 0:45",
    videoSrc: "/reels/reel-02.mp4",
    poster: "/reels/thumb-02.jpg",
  },
  {
    id: 3,
    title: "Sneaker Drop",
    category: "Social · 0:30",
    videoSrc: "/reels/TIFE2949.mp4",
    poster: "/reels/thumb-03.jpg",
  },
  {
    id: 4,
    title: "Jewellery Edit",
    category: "E-Commerce · 0:30",
    videoSrc: "/reels/reel-04.mp4",
    poster: "/reels/thumb-04.jpg",
  },
  {
    id: 5,
    title: "Spirits Campaign",
    category: "Hero Film · 1:00",
    videoSrc: "/reels/reel-05.mp4",
    poster: "/reels/thumb-05.jpg",
  },
];

// ─── CARD ─────────────────────────────────────────────────────────────────────

function VideoCard({
  video,
  index,
  cardRef,
}: {
  video: (typeof VIDEOS)[0];
  index: number;
  cardRef: (el: HTMLDivElement | null) => void;
}) {
  const wrapRef    = useRef<HTMLDivElement>(null);
  const videoRef   = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted]     = useState(true);

  // Merge refs so parent GSAP and internal ref both point to the same node
  const setRefs = useCallback((el: HTMLDivElement | null) => {
    (wrapRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
    cardRef(el);
  }, [cardRef]);

  // Pre-buffer as soon as the card mounts
  useEffect(() => {
    const vid = videoRef.current;
    if (vid) vid.load();
  }, []);

  const handleMouseEnter = useCallback(() => {
    const vid = videoRef.current;
    if (!vid) return;

    vid.muted = true;
    vid.currentTime = 0;

    const doPlay = () => {
      vid.play()
        .then(() => {
          setPlaying(true);
          gsap.to(overlayRef.current, { opacity: 0, duration: 0.45, ease: "power2.out" });
        })
        .catch((err) => {
          if (err.name !== "AbortError") console.warn("play() blocked:", err.message);
        });
    };

    // readyState 3 = HAVE_FUTURE_DATA, 4 = HAVE_ENOUGH_DATA
    if (vid.readyState >= 3) {
      doPlay();
    } else {
      const onReady = () => {
        doPlay();
        vid.removeEventListener("canplaythrough", onReady);
      };
      vid.addEventListener("canplaythrough", onReady);
      vid.load();
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.pause();
    vid.currentTime = 0;
    setPlaying(false);
    setMuted(true);
    gsap.to(overlayRef.current, { opacity: 1, duration: 0.45, ease: "power2.out" });
  }, []);

  // Click toggles mute once playing
  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const vid = videoRef.current;
    if (!vid || !playing) return;
    const next = !muted;
    vid.muted = next;
    setMuted(next);
  }, [playing, muted]);

  const depth = Math.abs(index - 2); // 0 = centre, 2 = edges

  return (
    <div
      ref={setRefs}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        position: "absolute",
        width: "clamp(190px, 21vw, 290px)",
        aspectRatio: "9/16",
        borderRadius: "20px",
        overflow: "hidden",
        cursor: "pointer",
        // Edges are slightly darker-shadowed to feel "behind" centre
        boxShadow: `0 ${28 + depth * 14}px ${70 + depth * 14}px rgba(0,0,0,${0.58 + depth * 0.09}), 0 0 0 1px rgba(255,255,255,0.06)`,
        transformOrigin: "bottom center",
        willChange: "transform, opacity",
        // Start stacked at centre, invisible — GSAP fans them out
        opacity: 0,
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%) rotate(0deg) scale(0.84)",
      }}
    >
      {/* ── Video ── */}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="auto"
        // poster={video.poster || undefined}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      >
        <source src={video.videoSrc} type="video/mp4" />
      </video>

      {/* Fallback gradient (shows if video hasn't loaded yet) */}
      <div style={{
        position: "absolute", inset: 0, zIndex: -1,
        background: `linear-gradient(155deg, hsl(${video.id * 52},12%,12%) 0%, hsl(${video.id * 52 + 25},8%,7%) 100%)`,
      }} />

      {/* Vignette — fades on hover */}
      <div ref={overlayRef} style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.12) 50%, rgba(0,0,0,0.04) 100%)",
      }} />

      {/* Top gradient */}
      <div style={{
        position: "absolute", left: 0, right: 0, top: 0, height: "90px",
        pointerEvents: "none",
        background: "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)",
      }} />

      {/* Index number — top-left */}
      <div style={{ position: "absolute", top: "16px", left: "18px", pointerEvents: "none" }}>
        <span style={{
          fontFamily: "Barlow, sans-serif", fontSize: "9px",
          color: "rgba(255,255,255,0.28)", letterSpacing: "0.2em",
        }}>
          0{video.id}
        </span>
      </div>

      {/* Sound bars when playing — top-right */}
      {playing && (
        <div style={{
          position: "absolute", top: "14px", right: "14px",
          display: "flex", alignItems: "flex-end", gap: "3px", height: "16px",
          pointerEvents: "none",
        }}>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} style={{
              width: "3px", height: "100%", borderRadius: "2px",
              background: "rgba(255,255,255,0.6)", transformOrigin: "bottom",
              animation: "soundBar 0.7s ease-in-out infinite",
              animationDelay: `${i * 0.12}s`,
            }} />
          ))}
        </div>
      )}

      {/* Muted hint */}
      {playing && muted && (
        <div style={{ position: "absolute", top: "14px", right: "44px", pointerEvents: "none", opacity: 0.38 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path d="M11 5L6 9H2v6h4l5 4V5z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
            <line x1="23" y1="9" x2="17" y2="15" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="17" y1="9" x2="23" y2="15" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
      )}

      {/* Bottom meta */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px" }}>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
          color: "rgba(255,255,255,0.88)", fontSize: "1.05rem",
          lineHeight: 1.25, marginBottom: "5px",
        }}>
          {video.title}
        </p>
        <span style={{
          fontFamily: "Barlow, sans-serif", fontSize: "8px",
          letterSpacing: "0.22em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.28)",
        }}>
          {video.category}
        </span>
      </div>

      {/* Corner accent */}
      <div style={{ position: "absolute", top: 0, right: 0, width: "22px", height: "22px", pointerEvents: "none" }} aria-hidden="true">
        <div style={{ position: "absolute", top: 0, right: 0, width: "100%", height: "1px", background: "rgba(255,255,255,0.12)" }} />
        <div style={{ position: "absolute", top: 0, right: 0, width: "1px", height: "100%", background: "rgba(255,255,255,0.12)" }} />
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
        }, i * 0.13);
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
        @keyframes soundBar {
          0%, 100% { transform: scaleY(0.3); opacity: 0.4; }
          50%       { transform: scaleY(1.0); opacity: 1.0; }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="relative bg-black"
        style={{ height: "400vh" }}
      >
        <div
          ref={stickyRef}
          className="w-full h-screen flex flex-col items-center justify-center overflow-hidden"
        >

          {/* Grain */}
          <div
            className="pointer-events-none absolute inset-0 z-[1] opacity-[0.028]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "180px 180px",
            }}
            aria-hidden="true"
          />

          {/* Glow */}
          <div
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1]"
            style={{ width: "900px", height: "900px", background: "radial-gradient(ellipse, #fff 0%, transparent 60%)", opacity: 0.038 }}
            aria-hidden="true"
          />

          {/* Ghost word */}
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center z-[2] select-none"
            aria-hidden="true"
          >
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(8rem, 26vw, 30rem)",
              color: "rgba(255,255,255,0.018)",
              fontWeight: 900, lineHeight: 1, textTransform: "uppercase",
            }}>
              Work
            </span>
          </div>

          {/* Eyebrow */}
          <div
            ref={headingRef}
            className="absolute top-[9%] left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
          >
            <div className="flex items-center gap-3">
              <span className="w-6 h-px bg-white/20" />
              <span style={{ fontFamily: "Barlow, sans-serif", fontSize: "9px", letterSpacing: "0.42em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)" }}>
                Selected Work
              </span>
              <span className="w-6 h-px bg-white/20" />
            </div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              color: "rgba(255,255,255,0.75)", fontWeight: 300,
              lineHeight: 1, textAlign: "center",
            }}>
              Hover to preview
            </h2>
          </div>

          {/* Zero-size anchor — all cards position relative to screen centre */}
          <div className="relative z-10" style={{ width: 0, height: 0 }}>
            {VIDEOS.map((video, i) => (
              <VideoCard
                key={video.id}
                video={video}
                index={i}
                cardRef={(el) => { cardRefs.current[i] = el; }}
              />
            ))}
          </div>

          {/* Bottom */}
          <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20">
            <p
              ref={subRef}
              style={{ fontFamily: "Barlow, sans-serif", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.18)", textAlign: "center" }}
            >
              {VIDEOS.length} films · hover to play · click to unmute
            </p>
            <div ref={ctaRef}>
              <a
                href="/projects"
                className="group inline-flex items-center gap-2.5 border border-white/[0.11] hover:border-white/40 transition-all duration-300"
                style={{ padding: "12px 28px", fontFamily: "Barlow, sans-serif", fontSize: "10px", letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", textDecoration: "none" }}
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