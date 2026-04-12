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
            zIndex: 0,
            pointerEvents: "auto",
            color: "white",
          }}
        >
          <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="lg:text-[8rem] text-[3rem] font-bold text-[#d1d5db] font-800 text-center select-none">
              Ekho Studios
            </h1>
            <p className="text-lg text-white/40 text-center font-light">We help brands around the world tell stories through cinematic product videos.</p>
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