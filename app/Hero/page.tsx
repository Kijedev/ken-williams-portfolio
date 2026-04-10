"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";

gsap.registerPlugin(ScrollTrigger);


interface ImageSequenceConfig {
  urls: string[];
  canvas: HTMLCanvasElement;
  clear?: boolean;
  onUpdate?: (index: number, image: HTMLImageElement) => void;
  scrollTrigger?: ScrollTrigger.Vars;
  fps?: number;
  paused?: boolean;
}


function imageSequence(config: ImageSequenceConfig): gsap.core.Tween {
  const playhead = { frame: 0 };
  const canvas = config.canvas;
  const ctx = canvas.getContext("2d")!;
  let curFrame = -1;
  const onUpdate = config.onUpdate;

  const updateImage = function (this: gsap.core.Tween) {
    const frame = Math.round(playhead.frame);
    if (frame !== curFrame) {
      if (config.clear) ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(images[Math.round(playhead.frame)], 0, 0);
      curFrame = frame;
      onUpdate && onUpdate.call(this, frame, images[frame]);
    }
  };

  const images: HTMLImageElement[] = config.urls.map((url, i) => {
    const img = new Image();
    img.src = url;
    if (i === 0) img.onload = () => updateImage.call({} as gsap.core.Tween);
    return img;
  });

  return gsap.to(playhead, {
    frame: images.length - 1,
    ease: "none",
    onUpdate: updateImage,
    duration: images.length / (config.fps ?? 30),
    paused: !!config.paused,
    scrollTrigger: config.scrollTrigger,
  });
}

const HERO_SCROLL_HEIGHT = "300vh";

export default function AirPodsSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const spacerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const spacer = spacerRef.current;
    if (!canvas || !spacer) return;

    const FRAME_COUNT = 147;
    const urls = Array.from({ length: FRAME_COUNT }, (_, i) => {
      const idx = (i + 1).toString().padStart(4, "0");
      return `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${idx}.jpg`;
    });

    tweenRef.current = imageSequence({
      urls,
      canvas,
      scrollTrigger: {
        trigger: spacer,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        pin: false,
      },
    });

    return () => {
      tweenRef.current?.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      <style>{`
        html, body {
          margin: 0;
          padding: 0;
          background: #000;
          overflow-x: hidden;
        }
      `}</style>

      <div
        ref={spacerRef}
        style={{ height: HERO_SCROLL_HEIGHT, position: "relative" }}
      >
        <canvas
          ref={canvasRef}
          id="image-sequence"
          width={1158}
          height={770}
          style={{
            position: "fixed",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "80vw",
            maxHeight: "80vh",
            zIndex: 0,
          }}
        />

        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10,
            pointerEvents: "auto",
            color: "white",
          }}
        >
          {/* <Navbar /> */}
          <div className="flex flex-col justify-center items-center h-screen gap-6">
            {/* <p
              style={{
                fontSize: "0.7rem",
                color: "#9ca3af",
                textAlign: "left",
                lineHeight: 1.7,
                letterSpacing: "0.05em",
              }}
            >
              A 3D DESIGNER PASSIONATE ABOUT CRAFTING BOLD AND MEMORABLE
              PROJECTS 👋
            </p> */}

            <p className="text-xl text-white/40">You've found</p>
            <h1
              style={{
                fontSize: "clamp(2.5rem, 10vw, 10rem)",
                fontWeight: 800,
                lineHeight: 1,
                color: "#d1d5db",
                margin: 0,
                textAlign: "center",
                userSelect: "none",
              }}
            >
              Ekho Studios
            </h1>

            <button
              style={{
                padding: "0.75rem 1.5rem",
                borderRadius: "9999px",
                background: "linear-gradient(to right, #a855f7, #f97316)",
                border: "none",
                color: "white",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.05em",
                cursor: "pointer",
                boxShadow: "0 10px 25px rgba(168,85,247,0.35)",
                transition: "transform 0.2s",
                pointerEvents: "auto",
              }}
              onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.transform =
                "translateY(-50%) scale(1.06)")
              }
              onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.transform =
                "translateY(-50%) scale(1)")
              }
            >
              CONTACT ME
            </button>
          </div>

          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              height: "100%",
              width: "8px",
              background: "rgba(255,255,255,0)",
              filter: "blur(6px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              height: "100%",
              width: "8px",
              background: "rgba(255,255,255,0)",
              filter: "blur(6px)",
            }}
          />
        </div>
      </div>
    </>
  );
}