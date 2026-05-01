"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, Flip);

const IMAGES = [
  "/jiffy-jollof.png",
  "hair.png",
  "/comfortsoles.png",
  "/banana-bread.png",
  "/cake.png",
  "/aloe-vera.png",
  "/agegebread.png",
  "/jiffy-jollof.png",
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
          start: "top top",
          end: "+=120%",
          scrub: 1,
          pin: wrap,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });

      tl.add(flip);

      return () => gsap.set(items, { clearProps: "all" });
    });
  };

  useEffect(() => {
    ScrollTrigger.normalizeScroll(true);

    ScrollTrigger.config({
      ignoreMobileResize: true,
    });

    createTween();

    const handleResize = () => {
      createTween();
      ScrollTrigger.refresh(true);
    };

    window.addEventListener("resize", handleResize);

    // Refresh after images/layout settle
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 300);

    return () => {
      clearTimeout(refreshTimeout);
      window.removeEventListener("resize", handleResize);
      flipCtxRef.current?.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <style>{`
        /* Bento grid — default (compact) state */
        .bento-gallery {
          position: relative;
          width: 100%;
          display: grid;
          gap: 1vh;
          grid-template-columns: repeat(3, 32.5vw);
          grid-template-rows: repeat(4, 23vh);
          justify-content: center;
          align-content: center;
          background-color: black;
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
        className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden"
      >
        <div ref={galleryRef} id="bento-gallery" className="bento-gallery">
          {IMAGES.map((src, i) => (
            <div key={i} className="bento-item overflow-hidden">
              <img
                src={src}
                alt={`Gallery image ${i + 1}`}
                className="w-full h-full object-cover object-center"
              />
            </div>
          ))}
        </div>

        {/* Top Gradient Overlay */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-linear-to-b from-black via-black/70 to-transparent" />

        {/* Bottom Gradient Overlay */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-linear-to-t from-black via-black/70 to-transparent" />
      </div>
    </>
  );
}