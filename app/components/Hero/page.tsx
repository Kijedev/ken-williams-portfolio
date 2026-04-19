// // "use client";

// // import { useEffect, useRef } from "react";
// // import gsap from "gsap";
// // import { ScrollTrigger } from "gsap/ScrollTrigger";
// // import Navbar from "../components/Navbar";

// // gsap.registerPlugin(ScrollTrigger);


// // interface ImageSequenceConfig {
// //   urls: string[];
// //   canvas: HTMLCanvasElement;
// //   clear?: boolean;
// //   onUpdate?: (index: number, image: HTMLImageElement) => void;
// //   scrollTrigger?: ScrollTrigger.Vars;
// //   fps?: number;
// //   paused?: boolean;
// // }


// // function imageSequence(config: ImageSequenceConfig): gsap.core.Tween {
// //   const playhead = { frame: 0 };
// //   const canvas = config.canvas;
// //   const ctx = canvas.getContext("2d")!;
// //   let curFrame = -1;
// //   const onUpdate = config.onUpdate;

// //   const updateImage = function (this: gsap.core.Tween) {
// //     const frame = Math.round(playhead.frame);
// //     if (frame !== curFrame) {
// //       if (config.clear) ctx.clearRect(0, 0, canvas.width, canvas.height);
// //       ctx.drawImage(images[Math.round(playhead.frame)], 0, 0);
// //       curFrame = frame;
// //       onUpdate && onUpdate.call(this, frame, images[frame]);
// //     }
// //   };

// //   const images: HTMLImageElement[] = config.urls.map((url, i) => {
// //     const img = new Image();
// //     img.src = url;
// //     if (i === 0) img.onload = () => updateImage.call({} as gsap.core.Tween);
// //     return img;
// //   });

// //   return gsap.to(playhead, {
// //     frame: images.length - 1,
// //     ease: "none",
// //     onUpdate: updateImage,
// //     duration: images.length / (config.fps ?? 30),
// //     paused: !!config.paused,
// //     scrollTrigger: config.scrollTrigger,
// //   });
// // }

// // const HERO_SCROLL_HEIGHT = "300vh";

// // export default function AirPodsSequence() {
// //   const canvasRef = useRef<HTMLCanvasElement>(null);
// //   const tweenRef = useRef<gsap.core.Tween | null>(null);
// //   const spacerRef = useRef<HTMLDivElement>(null);

// //   useEffect(() => {
// //     const canvas = canvasRef.current;
// //     const spacer = spacerRef.current;
// //     if (!canvas || !spacer) return;

// //     const FRAME_COUNT = 147;
// //     const urls = Array.from({ length: FRAME_COUNT }, (_, i) => {
// //       const idx = (i + 1).toString().padStart(4, "0");
// //       return `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${idx}.jpg`;
// //     });

// //     tweenRef.current = imageSequence({
// //       urls,
// //       canvas,
// //       scrollTrigger: {
// //         trigger: spacer,
// //         start: "top top",
// //         end: "bottom bottom",
// //         scrub: true,
// //         pin: false,
// //       },
// //     });

// //     return () => {
// //       tweenRef.current?.kill();
// //       ScrollTrigger.getAll().forEach((t) => t.kill());
// //     };
// //   }, []);

// //   return (
// //     <>
// //       <style>{`
// //         html, body {
// //           margin: 0;
// //           padding: 0;
// //           background: #000;
// //           overflow-x: hidden;
// //         }
// //       `}</style>

// //       <div
// //         ref={spacerRef}
// //         style={{ height: HERO_SCROLL_HEIGHT, position: "relative" }}
// //       >
// //         <canvas
// //           ref={canvasRef}
// //           id="image-sequence"
// //           width={1158}
// //           height={770}
// //           style={{
// //             position: "fixed",
// //             left: "50%",
// //             top: "50%",
// //             transform: "translate(-50%, -50%)",
// //             maxWidth: "80vw",
// //             maxHeight: "80vh",
// //             zIndex: 0,
// //           }}
// //         />

// //         <div
// //           style={{
// //             position: "fixed",
// //             inset: 0,
// //             zIndex: 0,
// //             pointerEvents: "auto",
// //             color: "white",
// //           }}
// //         >
// //           <div className="flex flex-col justify-center items-center h-screen">
// //             <h1 className="lg:text-[8rem] text-[3rem] font-bold text-[#d1d5db] font-800 text-center select-none">
// //               Ekho Studios
// //             </h1>
// //             <p className="text-lg text-white/40 text-center font-light">We help brands around the world tell stories through cinematic product videos.</p>
// //           </div>

// //           <div
// //             style={{
// //               position: "absolute",
// //               left: 0,
// //               top: 0,
// //               height: "100%",
// //               width: "8px",
// //               background: "rgba(255,255,255,0)",
// //               filter: "blur(6px)",
// //             }}
// //           />
// //           <div
// //             style={{
// //               position: "absolute",
// //               right: 0,
// //               top: 0,
// //               height: "100%",
// //               width: "8px",
// //               background: "rgba(255,255,255,0)",
// //               filter: "blur(6px)",
// //             }}
// //           />
// //         </div>
// //       </div>
// //     </>
// //   );
// // }

// "use client";

// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { SplitText } from "gsap/SplitText";
// import Link from "next/link";

// gsap.registerPlugin(ScrollTrigger, SplitText);

// interface ImageSequenceConfig {
//   urls: string[];
//   canvas: HTMLCanvasElement;
//   clear?: boolean;
//   onUpdate?: (index: number, image: HTMLImageElement) => void;
//   scrollTrigger?: ScrollTrigger.Vars;
//   fps?: number;
//   paused?: boolean;
// }

// function imageSequence(config: ImageSequenceConfig): gsap.core.Tween {
//   const playhead = { frame: 0 };
//   const canvas = config.canvas;
//   const ctx = canvas.getContext("2d")!;
//   let curFrame = -1;
//   const onUpdate = config.onUpdate;

//   const updateImage = function (this: gsap.core.Tween) {
//     const frame = Math.round(playhead.frame);
//     if (frame !== curFrame) {
//       if (config.clear) ctx.clearRect(0, 0, canvas.width, canvas.height);
//       ctx.drawImage(images[Math.round(playhead.frame)], 0, 0);
//       curFrame = frame;
//       onUpdate && onUpdate.call(this, frame, images[frame]);
//     }
//   };

//   const images: HTMLImageElement[] = config.urls.map((url, i) => {
//     const img = new Image();
//     img.src = url;
//     if (i === 0) img.onload = () => updateImage.call({} as gsap.core.Tween);
//     return img;
//   });

//   return gsap.to(playhead, {
//     frame: images.length - 1,
//     ease: "none",
//     onUpdate: updateImage,
//     duration: images.length / (config.fps ?? 30),
//     paused: !!config.paused,
//     scrollTrigger: config.scrollTrigger,
//   });
// }

// const HERO_SCROLL_HEIGHT = "200vh";

// export default function Page() {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const tweenRef = useRef<gsap.core.Tween | null>(null);
//   const spacerRef = useRef<HTMLDivElement>(null);
//   const headingRef = useRef<HTMLHeadingElement>(null);
//   const subRef = useRef<HTMLParagraphElement>(null);
//   const eyebrowRef = useRef<HTMLDivElement>(null);
//   const ctaRef = useRef<HTMLDivElement>(null);
//   const scrollCueRef = useRef<HTMLDivElement>(null);
//   const leftMetaRef = useRef<HTMLDivElement>(null);
//   const rightMetaRef = useRef<HTMLDivElement>(null);
//   const ring1Ref = useRef<HTMLDivElement>(null);
//   const ring2Ref = useRef<HTMLDivElement>(null);
//   const uiWrapperRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const spacer = spacerRef.current;
//     if (!canvas || !spacer) return;

//     const FRAME_COUNT = 147;
//     const urls = Array.from({ length: FRAME_COUNT }, (_, i) => {
//       const idx = (i + 1).toString().padStart(4, "0");
//       return `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${idx}.jpg`;
//     });

//     tweenRef.current = imageSequence({
//       urls,
//       canvas,
//       scrollTrigger: {
//         trigger: spacer,
//         start: "top top",
//         end: "bottom bottom",
//         scrub: true,
//         pin: false,
//       },
//     });

//     const ctx = gsap.context(() => {
//       const splitHeading = headingRef.current
//         ? new SplitText(headingRef.current, { type: "chars,words" })
//         : null;

//       const entranceTl = gsap.timeline({ defaults: { ease: "power3.out" } });

//       if (splitHeading) {
//         entranceTl.from(splitHeading.chars, {
//           opacity: 0, y: 40, rotationX: -20,
//           stagger: 0.025, duration: 0.9,
//         }, 0.4);
//       }

//       entranceTl
//         .from(eyebrowRef.current, { y: 16, opacity: 0, duration: 0.7 }, 0.2)
//         .from(subRef.current, { y: 20, opacity: 0, duration: 0.8 }, 0.9)
//         .from(ctaRef.current, { y: 16, opacity: 0, duration: 0.65 }, 1.05)
//         .from(leftMetaRef.current, { x: -20, opacity: 0, duration: 0.7 }, 1.1)
//         .from(rightMetaRef.current, { x: 20, opacity: 0, duration: 0.7 }, 1.1)
//         .from(scrollCueRef.current, { opacity: 0, duration: 0.8 }, 1.3);

//       gsap.fromTo(
//         uiWrapperRef.current,
//         { opacity: 1, y: 0 },
//         {
//           opacity: 0,
//           y: -28,
//           ease: "none",
//           scrollTrigger: {
//             trigger: spacer,
//             start: "top+=4% top",
//             end: "top+=18% top",
//             scrub: true,
//           },
//         }
//       );

//       const pulse = gsap.timeline({ repeat: -1, repeatDelay: 1.2 });
//       pulse
//         .fromTo(ring1Ref.current,
//           { scale: 1, opacity: 0.15 },
//           { scale: 1.6, opacity: 0, duration: 1.8, ease: "power2.out" }
//         )
//         .fromTo(ring2Ref.current,
//           { scale: 1, opacity: 0.1 },
//           { scale: 2.2, opacity: 0, duration: 2.2, ease: "power2.out" },
//           "-=1.5"
//         );

//     });

//     return () => {
//       tweenRef.current?.kill();
//       ScrollTrigger.getAll().forEach((t) => t.kill());
//       ctx.revert();
//     };
//   }, []);

//   return (
//     <>
//       <div ref={spacerRef} style={{ height: HERO_SCROLL_HEIGHT, position: "relative" }} className="bg-black">
//         <canvas
//           ref={canvasRef}
//           width={1158}
//           height={770}
//           style={{
//             position: "fixed",
//             left: "50%",
//             top: "50%",
//             transform: "translate(-50%, -50%)",

//             // ✅ Bigger on mobile, controlled on desktop
//             width: "110vw",       // mobile = fills more than screen
//             height: "auto",

//             maxWidth: "none",     // remove restriction
//             maxHeight: "none",

//             // ✅ keep aspect ratio clean
//             objectFit: "cover",

//             zIndex: 0,
//           }}
//         />

//         {/* Vignette top/bottom */}
//         <div style={{
//           position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none",
//           background: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.6) 100%)"
//         }}
//           aria-hidden="true" />
//         {/* Vignette left/right */}
//         <div style={{
//           position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none",
//           background: "linear-gradient(to right, rgba(0,0,0,0.35) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.35) 100%)"
//         }}
//           aria-hidden="true" />

//         {/* Grain */}
//         <div style={{
//           position: "fixed", inset: 0, zIndex: 2, pointerEvents: "none", opacity: 0.03,
//           backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
//           backgroundSize: "180px 180px",
//         }} aria-hidden="true" />

//         {/* Echo rings (outside wrapper so they don't fade) */}
//         <div style={{ position: "fixed", top: "50%", left: "50%", zIndex: 2, pointerEvents: "none" }} aria-hidden="true">
//           <div ref={ring1Ref} style={{ position: "absolute", width: "240px", height: "240px", marginLeft: "-120px", marginTop: "-120px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.15)" }} />
//           <div ref={ring2Ref} style={{ position: "absolute", width: "240px", height: "240px", marginLeft: "-120px", marginTop: "-120px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.08)" }} />
//         </div>

//         <div
//           ref={uiWrapperRef}
//           style={{
//             position: "fixed", inset: 0, zIndex: 10,
//             color: "white",
//             display: "flex", flexDirection: "column",
//             alignItems: "center", justifyContent: "center",
//           }}
//         >
//           <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", maxWidth: "900px", padding: "0 24px" }}>
//             {/* Heading */}
//             <h1
//               ref={headingRef}
//               style={{
//                 fontSize: "clamp(3rem, 10vw, 8.5rem)",
//                 fontWeight: 600, lineHeight: "0.92",
//                 letterSpacing: "-0.02em",
//                 color: "#FEE9CE",
//                 margin: "0 0 clamp(1rem, 2.5vh, 1.8rem)",
//                 perspective: "800px", pointerEvents: "none",
//               }}
//             >
//               Ekho Studios
//             </h1>

//             {/* Sub */}
//             <p
//               ref={subRef}
//               style={{
//                 fontSize: "clamp(0.78rem, 1.6vw, 1rem)", fontWeight: 300,
//                 color: "rgba(255,255,255,0.32)", letterSpacing: "0.06em",
//                 lineHeight: "1.65", maxWidth: "500px",
//                 margin: "0 0 clamp(1.5rem, 3vh, 2.5rem)",
//                 pointerEvents: "none",
//               }}
//             >
//               We help brands around the world tell stories through cinematic product videos.
//             </p>

//             {/* CTAs */}
//             <div ref={ctaRef} style={{ display: "flex", alignItems: "center", gap: "20px", pointerEvents: "auto" }}>
//               <Link href="/Contact" style={{
//                 display: "inline-flex", alignItems: "center", gap: "10px",
//                 padding: "12px 28px", borderRadius: "9999px",
//                 border: "1px solid rgba(255,255,255,0.18)",
//                 fontSize: "16px", textTransform: "capitalize",
//                 fontWeight: 400, color: "rgba(255,255,255,0.55)", textDecoration: "none",
//                 transition: "all 0.3s ease",
//               }}
//                 onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.5)"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
//                 onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.18)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.55)"; }}
//               >
//                 Start a project
//                 <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
//                   <path d="M1 5h8M6 2l3 3-3 3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
//                 </svg>
//               </Link>

//             </div>
//           </div>

//           {/* Scroll cue */}
//           <div ref={scrollCueRef} style={{
//             position: "absolute",
//             bottom: "clamp(2rem, 4vh, 3.5rem)", left: "50%", transform: "translateX(-50%)",
//             display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
//             pointerEvents: "none",
//           }}>
//             <span style={{ fontSize: "8px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.18)" }}>Scroll</span>
//             <div style={{ width: "1px", height: "36px", background: "linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)", animation: "scrollPulse 2s ease-in-out infinite" }} />
//           </div>

//         </div>
//       </div>
//     </>
//   );
// }

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger, SplitText);

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

const HERO_SCROLL_HEIGHT = "200vh";

export default function Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const uiWrapperRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const ring1Ref = useRef<HTMLDivElement>(null);
  const ring2Ref = useRef<HTMLDivElement>(null);

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

    const ctx = gsap.context(() => {
      const entranceTl = gsap.timeline({ defaults: { ease: "power3.out" } });

      entranceTl
        .from(line1Ref.current, { y: 80, opacity: 0, duration: 1.0 }, 0.2)
        .from(line2Ref.current, { y: 80, opacity: 0, duration: 1.0 }, 0.4)
        .from(subRef.current, { y: 20, opacity: 0, duration: 0.8 }, 0.85)
        .from(ctaRef.current, { y: 16, opacity: 0, duration: 0.65 }, 1.0)
        .from(scrollCueRef.current, { opacity: 0, duration: 0.8 }, 1.2);

      gsap.fromTo(
        uiWrapperRef.current,
        { opacity: 1, y: 0 },
        {
          opacity: 0,
          y: -28,
          ease: "none",
          scrollTrigger: {
            trigger: spacer,
            start: "top+=4% top",
            end: "top+=18% top",
            scrub: true,
          },
        }
      );

      const pulse = gsap.timeline({ repeat: -1, repeatDelay: 1.2 });
      pulse
        .fromTo(ring1Ref.current,
          { scale: 1, opacity: 0.15 },
          { scale: 1.6, opacity: 0, duration: 1.8, ease: "power2.out" }
        )
        .fromTo(ring2Ref.current,
          { scale: 1, opacity: 0.1 },
          { scale: 2.2, opacity: 0, duration: 2.2, ease: "power2.out" },
          "-=1.5"
        );
    });

    return () => {
      tweenRef.current?.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      ctx.revert();
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @keyframes badgeFloat {
          0%, 100% { transform: rotate(-2deg) translateY(0px); }
          50% { transform: rotate(-2deg) translateY(-5px); }
        }
        @keyframes ribbonWave {
          0%, 100% { transform: rotate(-1.5deg) translateY(0px); }
          50% { transform: rotate(-1.5deg) translateY(-4px); }
        }
      `}</style>

      <div ref={spacerRef} style={{ height: HERO_SCROLL_HEIGHT, position: "relative", background: "#000" }}>

        {/* Canvas image sequence */}
        <canvas
          ref={canvasRef}
          width={1158}
          height={770}
          style={{
            position: "fixed",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "110vw",
            height: "auto",
            maxWidth: "none",
            maxHeight: "none",
            objectFit: "cover",
            zIndex: 0,
          }}
        />

        {/* Vignette top/bottom */}
        <div style={{
          position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none",
          background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, transparent 30%, transparent 55%, rgba(0,0,0,0) 100%)"
        }} aria-hidden="true" />

        {/* Vignette left/right */}
        <div style={{
          position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none",
          background: "linear-gradient(to right, rgba(0,0,0,0) 0%, transparent 25%, transparent 75%, rgba(0,0,0,0) 100%)"
        }} aria-hidden="true" />

        {/* Grain */}
        <div style={{
          position: "fixed", inset: 0, zIndex: 2, pointerEvents: "none", opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px",
        }} aria-hidden="true" />

        {/* ── Main UI ── */}
        <div
          ref={uiWrapperRef}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10,
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "0 clamp(1.5rem, 5vw, 5rem) clamp(3rem, 7vh, 5rem)",
          }}
        >
          {/* ── Heading block ── */}
          <div style={{ width: "100%", overflow: "hidden" }}>

            {/* Line 1: italic word + floating badge */}
            <div
              ref={line1Ref}
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: "clamp(10px, 1.8vw, 26px)",
                marginBottom: "clamp(-6px, -0.8vw, -12px)",
                flexWrap: "wrap",
              }}
            >
              <span style={{
                fontSize: "clamp(4rem, 10.5vw, 10rem)",
                // fontWeight: "light",
                letterSpacing: "-0.035em",
                color: "#FEE9CE",
                lineHeight: 0.9,
                // fontStyle: "italic",
              }}>
                Experience
              </span>

              {/* Floating purple pill badge */}
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                background: "#EF5143",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(167,139,250,0.35)",
                borderRadius: "12px",
                padding: "clamp(7px, 1vh, 11px) clamp(14px, 1.5vw, 22px)",
                fontSize: "clamp(0.65rem, 1.2vw, 0.9rem)",
                fontWeight: 500,
                color: "#fff",
                letterSpacing: "0.01em",
                animation: "badgeFloat 3s ease-in-out infinite",
                whiteSpace: "nowrap",
                marginBottom: "clamp(0.6rem, 1.8vw, 1.6rem)",
              }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
                  <path d="M6 1L7.06 4.47H10.73L7.83 6.53L8.9 10L6 7.94L3.1 10L4.17 6.53L1.27 4.47H4.94L6 1Z" fill="white" />
                </svg>
                a new Dimension of
              </div>
            </div>

            {/* Line 2: word + ribbon + word */}
            <div
              ref={line2Ref}
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: "clamp(10px, 1.5vw, 22px)",
                flexWrap: "wrap",
              }}
            >
              <span style={{
                fontSize: "clamp(3.5rem, 10.5vw, 8rem)",
                fontWeight: 800,
                letterSpacing: "-0.035em",
                color: "#ffffff",
                lineHeight: 0.9,
              }}>
                Product
              </span>

              <span style={{
                fontSize: "clamp(3.5rem, 10.5vw, 8rem)",
                fontWeight: 800,
                letterSpacing: "-0.035em",
                color: "#ffffff",
                lineHeight: 0.9,
              }}>
                Videography
              </span>
            </div>

          </div>

          <div style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "clamp(1.2rem, 2.5vh, 2.2rem)",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}>
            <p
              ref={subRef}
              style={{
                fontSize: "clamp(0.75rem, 1.3vw, 1.2rem)",
                fontWeight: 300,
                color: "rgba(255,255,255,0.3)",
                letterSpacing: "0.04em",
                lineHeight: "1.75",
                margin: 0,
              }}
            >
              We help brands around the world tell stories<br />
              through cinematic product videos.
            </p>

            <div ref={ctaRef} style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <Link
                href="/Contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "13px 30px",
                  borderRadius: "9999px",
                  border: "1px solid rgba(255,255,255,0.2)",
                  fontSize: "clamp(0.78rem, 1.1vw, 0.92rem)",
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.6)",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(255,255,255,0.55)";
                  el.style.color = "#fff";
                  el.style.background = "rgba(255,255,255,0.05)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(255,255,255,0.2)";
                  el.style.color = "rgba(255,255,255,0.6)";
                  el.style.background = "transparent";
                }}
              >
                Start a project
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1 5h8M6 2l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Scroll cue */}
          <div ref={scrollCueRef} style={{
            position: "absolute",
            bottom: "clamp(2rem, 4vh, 3.5rem)",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            pointerEvents: "none",
          }}
          className="lg:left-1/2 left-60"
          >
            <span style={{ fontSize: "8px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.18)" }}>Scroll</span>
            <div style={{
              width: "1px",
              height: "36px",
              background: "linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)",
              animation: "scrollPulse 2s ease-in-out infinite",
            }} />
          </div>

        </div>
      </div>
    </>
  );
}