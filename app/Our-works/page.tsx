// "use client";

// import { useEffect, useRef, useState } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { Ctasections } from "../components/Ctasections";
// import Ourworkshero from "../components/Ourworkshero/page";

// gsap.registerPlugin(ScrollTrigger);

// const VIDEOS = [
//   { src: "/reels/TIFE2949.mp4", name: "Elonna Foods", rotate: -6, yOffset: 30, zIndex: 1 },
//   { src: "/reels/IPMI9840.MP4", name: "Hav Palm Oil", rotate: 5, yOffset: 20, zIndex: 2 },
//   { src: "/reels/VOOR3333.MP4", name: "Uncle Stan's", rotate: -5, yOffset: 20, zIndex: 3 },
//   { src: "/reels/GPSX1245.MP4", name: "Jiffy Jollof", rotate: 5, yOffset: 30, zIndex: 4 },
// ];

// function VideoCard({
//   vid,
//   index,
//   cardRef,
//   mobile,
// }: {
//   vid: typeof VIDEOS[0];
//   index: number;
//   cardRef?: (el: HTMLDivElement | null) => void;
//   mobile?: boolean;
// }) {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [hovered, setHovered] = useState(false);
//   const [loaded, setLoaded] = useState(false);

//   const play = async () => {
//     setHovered(true);
//     const v = videoRef.current;
//     if (!v) return;

//     // Ensure muted before play (required by all browsers for autoplay)
//     v.muted = true;
//     v.playbackRate = 0.75;

//     try {
//       await v.play();
//     } catch (err) {
//       // If play fails, try loading first then play
//       v.load();
//       try {
//         await v.play();
//       } catch (_) { }
//     }
//   };

//   const pause = () => {
//     setHovered(false);
//     videoRef.current?.pause();
//   };

//   return (
//     <div
//       ref={cardRef}
//       onMouseEnter={play}
//       onMouseLeave={pause}
//       onTouchStart={play}
//       onTouchEnd={pause}
//       style={{
//         position: "relative",
//         flexShrink: 0,
//         width: mobile ? "min(82vw, 500px)" : "clamp(350px, 17vw, 500px)",
//         height: mobile ? "min(146vw, 570px)" : "clamp(570px, 30vw, 570px)",
//         borderRadius: "clamp(10px, 1.2vw, 20px)",
//         overflow: "hidden",
//         border: "3px solid #FEE9CE",
//         top: mobile ? 0 : vid.yOffset,
//         zIndex: vid.zIndex,
//         boxShadow: hovered
//           ? "0 30px 90px rgba(0,0,0,0.9)"
//           : "0 16px 50px rgba(0,0,0,0.75), 0 4px 16px rgba(0,0,0,0.5)",
//         transition: "box-shadow 0.4s ease",
//         cursor: "pointer",
//         background: "#111",
//         willChange: "transform, opacity",
//       }}
//     >
//       <video
//         ref={videoRef}
//         src={vid.src}
//         muted={true}
//         loop
//         playsInline
//         preload="none"
//         onLoadedData={() => setLoaded(true)}
//         style={{
//           position: "absolute", inset: 0,
//           width: "100%", height: "100%",
//           objectFit: "cover",
//           filter: hovered ? "saturate(1) brightness(1)" : "saturate(0.8) brightness(0.78)",
//           transition: "filter 0.5s ease, transform 0.5s ease",
//           transform: hovered ? "scale(1.04)" : "scale(1)",
//           // opacity: loaded || !hovered ? 1 : 0,
//         }}
//       />

//       {/* Placeholder shown before video loads on hover */}
//       {!loaded && hovered && (
//         <div style={{
//           position: "absolute", inset: 0,
//           display: "flex", alignItems: "center", justifyContent: "center",
//           background: "#0a0a0a",
//         }}>
//           <div style={{
//             width: 24, height: 24, borderRadius: "50%",
//             border: "2px solid rgba(255,255,255,0.15)",
//             borderTopColor: "rgba(255,255,255,0.5)",
//             animation: "spin 0.8s linear infinite",
//           }} />
//         </div>
//       )}

//       {/* Play icon */}
//       {!hovered && (
//         <div style={{
//           position: "absolute", inset: 0,
//           display: "flex", alignItems: "center", justifyContent: "center",
//           pointerEvents: "none",
//         }}>
//           <div style={{
//             width: 44, height: 44, borderRadius: "50%",
//             border: "1px solid rgba(255,255,255,0.3)",
//             background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)",
//             display: "flex", alignItems: "center", justifyContent: "center",
//             opacity: 0.7,
//           }}>
//             <div style={{
//               marginLeft: 3, width: 0, height: 0,
//               borderTop: "6px solid transparent",
//               borderBottom: "6px solid transparent",
//               borderLeft: "10px solid rgba(255,255,255,0.9)",
//             }} />
//           </div>
//         </div>
//       )}

//       {/* Name strip */}
//       <div style={{
//         position: "absolute", bottom: 0, left: 0, right: 0,
//         padding: "0.7rem 0.8rem",
//         display: "flex", alignItems: "center", gap: 6,
//         opacity: hovered ? 1 : 0.7,
//         transform: hovered ? "translateY(0)" : "translateY(2px)",
//         transition: "opacity 0.35s ease, transform 0.35s ease",
//       }}>
//         <div style={{
//           width: 28, height: 28, borderRadius: "50%",
//           border: "1.5px solid rgba(255,255,255,0.65)",
//           background: "#222", flexShrink: 0,
//           display: "flex", alignItems: "center", justifyContent: "center",
//           fontSize: "11px", color: "rgba(255,255,255,0.7)", fontWeight: 600,
//         }}>
//           {vid.name[0]}
//         </div>
//         <span style={{
//           fontSize: "clamp(0.8rem, 1vw, 1rem)",
//           color: "#fff", letterSpacing: "0.02em",
//           textShadow: "0 1px 4px rgba(0,0,0,0.9)",
//           whiteSpace: "nowrap",
//         }}>
//           {vid.name}
//         </span>
//       </div>

//       {/* Index */}
//       <div style={{ position: "absolute", top: "0.7rem", left: "0.8rem" }}>
//         <span style={{ fontSize: "8px", letterSpacing: "0.12em", color: "rgba(255,255,255,0.25)" }}>
//           {String(index + 1).padStart(2, "0")}
//         </span>
//       </div>
//     </div>
//   );
// }

// export default function ProjectsPage() {
//   const desktopPinnerRef = useRef<HTMLDivElement>(null);
//   const desktopProgressRef = useRef<HTMLDivElement>(null);
//   const desktopCardRefs = useRef<(HTMLDivElement | null)[]>([]);
//   const mobileCardRefs = useRef<(HTMLDivElement | null)[]>([]);

//   useEffect(() => {
//     const pinner = desktopPinnerRef.current;
//     const dCards = desktopCardRefs.current.filter(Boolean) as HTMLDivElement[];
//     const progress = desktopProgressRef.current;

//     if (pinner && dCards.length) {
//       dCards.forEach((card, i) => {
//         gsap.set(card, {
//           x: window.innerWidth,
//           opacity: 0,
//           scale: 0.82,
//           rotationZ: VIDEOS[i].rotate + 10,
//           transformOrigin: "center center",
//         });
//       });

//       const tl = gsap.timeline({ paused: true });
//       dCards.forEach((card, i) => {
//         tl.to(card, {
//           x: 0, opacity: 1, scale: 1,
//           rotationZ: VIDEOS[i].rotate,
//           duration: 1, ease: "power2.out",
//         }, i);
//       });

//       const totalScroll = window.innerHeight * (VIDEOS.length * 0.55);

//       ScrollTrigger.create({
//         trigger: pinner,
//         pin: true,
//         start: "top top",
//         end: `+=${totalScroll}`,
//         scrub: 0.6,
//         animation: tl,
//         onUpdate: (self) => {
//           if (progress) progress.style.transform = `scaleX(${self.progress})`;
//         },
//       });
//     }

//     const mCards = mobileCardRefs.current.filter(Boolean) as HTMLDivElement[];
//     if (mCards.length) {
//       mCards.forEach((card) => {
//         card.style.opacity = "0";
//         card.style.transform = "translateY(60px)";
//         card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
//       });

//       const observer = new IntersectionObserver(
//         (entries) => {
//           entries.forEach((entry) => {
//             const el = entry.target as HTMLElement;
//             if (entry.isIntersecting) {
//               el.style.opacity = "1";
//               el.style.transform = "translateY(0)";
//             } else {
//               const rect = entry.boundingClientRect;
//               if (rect.top > 0) {
//                 el.style.opacity = "0";
//                 el.style.transform = "translateY(60px)";
//               }
//             }
//           });
//         },
//         { threshold: 0.15 }
//       );

//       mCards.forEach((card) => observer.observe(card));

//       return () => {
//         observer.disconnect();
//         ScrollTrigger.getAll().forEach((t) => t.kill());
//       };
//     }

//     return () => ScrollTrigger.getAll().forEach((t) => t.kill());
//   }, []);

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&family=Barlow:wght@300;400&display=swap');

//         @keyframes breathe {
//           0%, 100% { opacity: 0.45; transform: translateX(-50%) translateY(0px); }
//           50%       { opacity: 1;   transform: translateX(-50%) translateY(6px); }
//         }
//         @keyframes spin {
//           to { transform: rotate(360deg); }
//         }

//         html, body { max-width: 100%; overflow-x: hidden; }
//         .showcase-desktop { display: block; }
//         .showcase-mobile  { display: none;  }

//         @media (max-width: 768px) {
//           .showcase-desktop { display: none; }
//           .showcase-mobile  { display: flex; }
//         }
//       `}</style>

//       <div style={{ background: "#000", color: "#fff", overflowX: "hidden", maxWidth: "100vw" }}>
//         <Ourworkshero />

//         {/* Desktop showcase */}
//         <div className="showcase-desktop">
//           <div
//             ref={desktopPinnerRef}
//             style={{ position: "relative", height: "100vh", overflow: "hidden", background: "black" }}
//           >
//             <div style={{
//               position: "absolute", inset: 0, zIndex: 5, pointerEvents: "none",
//               background: "linear-gradient(to right, rgba(0,0,0,0.55) 0%, transparent 12%, transparent 88%, rgba(0,0,0,0.55) 100%)",
//             }} aria-hidden="true" />

//             <div style={{
//               position: "absolute", inset: 0,
//               display: "flex", alignItems: "center", justifyContent: "center",
//               zIndex: 0, pointerEvents: "none",
//             }}>
//               <span style={{
//                 fontSize: "clamp(6rem, 22vw, 30rem)",
//                 color: "rgba(255,255,255,0.025)",
//                 lineHeight: 0.9, whiteSpace: "nowrap", userSelect: "none",
//                 fontWeight: 900, letterSpacing: "-0.02em",
//               }}>
//                 REELS
//               </span>
//             </div>

//             <div style={{
//               position: "absolute", inset: 0,
//               display: "flex", alignItems: "center", justifyContent: "center",
//               zIndex: 2,
//               gap: "clamp(-20px, -2vw, -10px)",
//               paddingLeft: "clamp(1rem, 5vw, 4rem)",
//               paddingRight: "clamp(1rem, 5vw, 4rem)",
//             }}>
//               {VIDEOS.map((vid, i) => (
//                 <VideoCard
//                   key={i} vid={vid} index={i} mobile={false}
//                   cardRef={(el) => { desktopCardRefs.current[i] = el; }}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Mobile showcase */}
//         <div
//           className="showcase-mobile"
//           style={{
//             flexDirection: "column", alignItems: "center",
//             gap: "1.5rem", padding: "2rem 0 3rem",
//             width: "100%", background: "#000",
//           }}
//         >
//           {VIDEOS.map((vid, i) => (
//             <VideoCard
//               key={i} vid={vid} index={i} mobile={true}
//               cardRef={(el) => { mobileCardRefs.current[i] = el; }}
//             />
//           ))}
//         </div>

//         <Ctasections />

//         <div style={{ height: 1, background: "linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)" }} />
//       </div>
//     </>
//   );
// }

"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play, Volume2 } from "lucide-react";
import { Ctasections } from "../components/Ctasections";
import Ourworkshero from "../components/Ourworkshero/page";

const VIDEOS = [
  { src: "/reels/TIFE2949.mp4", name: "Elonna Foods", category: "Food Commercial" },
  { src: "/reels/IPMI9840.MP4", name: "Hav Palm Oil", category: "Product Film" },
  { src: "/reels/VOOR3333.MP4", name: "Uncle Stan's", category: "Brand Story" },
  { src: "/reels/GPSX1245.MP4", name: "Jiffy Jollof", category: "Campaign Reel" },
];

function VideoCard({ video, index }: { video: (typeof VIDEOS)[0]; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleEnter = async () => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = true;
    try {
      await el.play();
      setIsPlaying(true);
    } catch { }
  };

  const handleLeave = () => {
    const el = videoRef.current;
    if (!el) return;
    el.pause();
    setIsPlaying(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, delay: index * 0.12 }}
      whileHover={{ y: -12, scale: 1.02 }}
      className="group relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div className="relative aspect-9/16 overflow-hidden rounded-2xl hover:cursor-pointer border border-white/10 bg-white/5 shadow-2xl">
        <video
          ref={videoRef}
          src={video.src}
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black via-black/10 to-transparent" />

        <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />

        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-xl">
              <Play className="ml-1 h-5 w-5 text-white" fill="currentColor" />
            </div>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-3">
          <div className="mb-3 flex items-center justify-between">
            <span className="rounded-full border border-white/15 bg-white/5 px-4 py-1 font-light text-xs capitalize text-white backdrop-blur-md">
              {video.category}
            </span>
            <span className="text-sm text-white/40">{String(index + 1).padStart(2, "0")}</span>
          </div>

          <h3 className="text-xl font-light text-white">{video.name}</h3>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <div className="bg-black text-white overflow-x-hidden">
      <Ourworkshero />

      <section ref={sectionRef} className="relative py-24 lg:py-36">
        <motion.div style={{ y }} className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-20 -translate-x-1/2 text-[20vw] font-black tracking-tighter text-white/[0.03]">
            REELS
          </div>
        </motion.div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
          {/* <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <h2 className="mx-auto max-w-4xl text-5xl font-semibold leading-tight md:text-7xl">
              Cinematic Stories Crafted Frame by Frame
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60">
              A curated collection of product films, brand stories, and commercial reels designed to captivate, convert, and leave a lasting impression.
            </p>
          </motion.div> */}

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
            {VIDEOS.map((video, index) => (
              <VideoCard key={video.src} video={video} index={index} />
            ))}
          </div>
        </div>
      </section>

      <Ctasections />
    </div>
  );
}
