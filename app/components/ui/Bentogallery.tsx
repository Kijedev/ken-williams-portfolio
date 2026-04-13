"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, Flip);

const IMAGES = [
  "/Bastardo.png",
  "https://assets.codepen.io/16327/portrait-image-12.jpg",
  "/Durex.png",
  "https://assets.codepen.io/16327/portrait-pattern-2.jpg",
  "https://assets.codepen.io/16327/portrait-image-4.jpg",
  "https://assets.codepen.io/16327/portrait-image-3.jpg",
  "https://assets.codepen.io/16327/portrait-pattern-3.jpg",
  "https://assets.codepen.io/16327/portrait-image-1.jpg",
];

const CONTENT_PARAS = [
  "Every frame is a deliberate choice. Before the camera rolls we've already built the world your product will inhabit — the light, the texture, the pace of the edit. That intentionality is what separates product films people skip from films people share.",
  "We work with brands at every stage: emerging labels launching their first hero film, established names refreshing their visual identity, and e-commerce operators who need volume without sacrificing quality. The output changes. The standard never does.",
  "Post-production is where the magic becomes invisible. Colour grading that feels like a mood rather than a filter. Sound design that makes the viewer lean in. Motion that serves the product, not the editor's ego. Every deliverable is optimised for the platforms where your audience actually lives.",
  "The result is content that converts — not because it follows a formula, but because it was made with a clear point of view and an obsessive attention to detail.",
];

export default function BentoGallery() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const flipCtxRef = useRef<gsap.Context | null>(null);

  const createTween = () => {
    const gallery = galleryRef.current;
    const wrap = wrapRef.current;
    if (!gallery || !wrap) return;

    const items = gallery.querySelectorAll<HTMLDivElement>(".bento-item");

    flipCtxRef.current?.revert();
    gallery.classList.remove("bento--final");

    flipCtxRef.current = gsap.context(() => {
      gallery.classList.add("bento--final");
      const flipState = Flip.getState(items);
      gallery.classList.remove("bento--final");

      const flip = Flip.to(flipState, {
        simple: true,
        ease: "expoScale(1, 5)",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: gallery,
          start: "center center",
          end: "+=100%",
          scrub: true,
          pin: wrap,
        },
      });

      tl.add(flip);

      return () => gsap.set(items, { clearProps: "all" });
    });
  };

  useEffect(() => {
    createTween();
    window.addEventListener("resize", createTween);
    return () => {
      window.removeEventListener("resize", createTween);
      flipCtxRef.current?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* ── Scoped styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Barlow:wght@300;400&display=swap');

        /* Bento grid — default (compact) state */
        .bento-gallery {
          position: relative;
          width: 100%;
          height: 100%;
          display: grid;
          gap: 1vh;
          grid-template-columns: repeat(3, 32.5vw);
          grid-template-rows: repeat(4, 23vh);
          justify-content: center;
          align-content: center;
        }

        /* Expanded (final) state — fills viewport */
        .bento-gallery.bento--final {
          grid-template-columns: repeat(3, 100vw);
          grid-template-rows: repeat(4, 49.5vh);
          gap: 1vh;
        }

        /* Grid placements */
        .bento-item:nth-child(1) { grid-area: 1 / 1 / 3 / 2; }
        .bento-item:nth-child(2) { grid-area: 1 / 2 / 2 / 3; }
        .bento-item:nth-child(3) { grid-area: 2 / 2 / 4 / 3; }
        .bento-item:nth-child(4) { grid-area: 1 / 3 / 3 / 3; }
        .bento-item:nth-child(5) { grid-area: 3 / 1 / 3 / 2; }
        .bento-item:nth-child(6) { grid-area: 3 / 3 / 5 / 4; }
        .bento-item:nth-child(7) { grid-area: 4 / 1 / 5 / 2; }
        .bento-item:nth-child(8) { grid-area: 4 / 2 / 5 / 3; }
      `}</style>

      <div
        ref={wrapRef}
        className="relative w-full bg-black h-screen flex items-center justify-center overflow-hidden"
      >
        <div ref={galleryRef} id="bento-gallery" className="bento-gallery">
          {IMAGES.map((src, i) => (
            <div key={i} className="bento-item overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`Gallery image ${i + 1}`}
                className="w-full h-full object-cover object-center"
              />
            </div>
          ))}
        </div>
      </div>

      {/* <section
        className="relative bg-black text-white px-8 sm:px-16 md:px-24 lg:px-32 py-20 md:py-28"
        style={{ fontFamily: "'Barlow', sans-serif" }}
      >
        <div className="flex items-center gap-3 mb-10">
          <span className="w-8 h-px bg-white/20" />
          <span className="text-[10px] tracking-[0.35em] uppercase text-white/25 font-light">
            Our Work
          </span>
        </div>

        <p
          className="mb-12 max-w-2xl leading-[1.1] tracking-tight text-white/80"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)",
            fontWeight: 300,
          }}
        >
          Frames built to{" "}
          <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.35)" }}>
            stop the scroll.
          </em>
        </p>

        <div className="h-px mb-10 max-w-2xl bg-linear-to-r from-white/10 via-white/5 to-transparent" />

        <div className="max-w-2xl relative z-100 flex flex-col gap-6">
          {CONTENT_PARAS.map((p, i) => (
            <p
              key={i}
              className="text-sm md:text-base text-white/38 font-light leading-relaxed tracking-wide"
            >
              {p}
            </p>
          ))}
        </div>
      </section> */}
    </>
  );
}