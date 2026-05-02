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

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play } from "lucide-react";
import { Ctasections } from "../components/Ctasections";
import Ourworkshero from "../components/Ourworkshero/page";

const VIDEOS = [
  { src: "/reels/Elonna Foods Product Video 1.mp4", name: "Elonna Foods", category: "Food" },
  { src: "/reels/12 Basket Rice Product Video.mp4", name: "12 Basket Rice", category: "Food" },
  { src: "/reels/Go Vita Chocolate Drink Video 3.mp4", name: "Go Vita", category: "Food" },
  { src: "/reels/Gourmet Twist Banana Bread 2.MP4", name: "Gourmet Twist", category: "Food" },
  // { src: "/reels/Uncle Stan's Product Video 1.mp4", name: "Uncle Stan's", category: "Food" },
  { src: "/reels/Rita and Nathan Product Video.mp4", name: "Rita & Nathan", category: "Fashion" },
  { src: "/reels/Maison Veil Body Oil Video.mp4", name: "Maison Veil", category: "Scent" },
  // { src: "/reels/Birch Scent Product Video with Text Voice over.mp4", name: "Birch Scent", category: "Scent" },
  { src: "/reels/Aymiie Lip Oil Video with VO.mp4", name: "Aymiie", category: "Cosmetics" },
  { src: "/reels/Estebare Video 2 VO.mp4", name: "Estebare", category: "Cosmetics" },
  { src: "/reels/Sooo Pro Lip Liner Product Video VO.mp4", name: "Sooo Pro", category: "Cosmetics" },
  { src: "/reels/Iphone Case 1 Product Video new.MP4", name: "Iphone Case", category: "Tech" },
  // { src: "/reels/Pocket Price Power Bank Video 1.MP4", name: "Pocket Price", category: "Tech" },
  // { src: "/reels/Ogi Product Video.MP4", name: "Ogi", category: "Brand" },
];

const TABS = ["All", "Tech", "Food", "Cosmetics", "Scent", "Fashion",];

function VideoCard({
  video,
  index,
}: {
  video: (typeof VIDEOS)[0];
  index: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    const node = cardRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    if (isVisible) {
      videoEl
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    } else {
      videoEl.pause();
      videoEl.muted = true;
      setShowControls(false);
      setIsPlaying(false);
    }
  }, [isVisible]);

  const handleVideoClick = () => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    setShowControls(true);
    videoEl.controls = true;
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.08 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-xl border border-[#FEE9CE] shadow-2xl">
        <video
          ref={videoRef}
          src={video.src}
          muted
          loop
          playsInline
          autoPlay
          controls={showControls}
          preload="none"
          onClick={handleVideoClick}
          className="h-full w-100 cursor-pointer object-cover transition duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/30 to-transparent pointer-events-none" />
        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none" />

        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-xl">
              <Play className="ml-1 h-5 w-5 text-white" fill="currentColor" />
            </div>
          </div>
        )}

        <div className="absolute top-0 left-0 right-0 p-4 pointer-events-none">
          <div className="flex items-center justify-between">
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs text-white backdrop-blur-md">
              {video.category}
            </span>
            <span className="text-sm text-white/50">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <h3 className="text-lg font-light text-white">{video.name}</h3>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("All");

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const filteredVideos = useMemo(() => {
    if (activeTab === "All") return VIDEOS;
    return VIDEOS.filter(
      (video) => video.category.toLowerCase() === activeTab.toLowerCase()
    );
  }, [activeTab]);

  return (
    <div className="overflow-x-hidden bg-black text-white">
      <Ourworkshero />

      <section ref={sectionRef} className="relative py-24 lg:py-32">
        <motion.div style={{ y }} className="pointer-events-none absolute inset-0">
          <h1 className="absolute left-1/2 top-0 -translate-x-1/2 lg:text-[18vw] text-[25vw] font-black tracking-tighter text-white/3">
            REELS
          </h1>
        </motion.div>

        <div className="relative z-10 mx-auto max-w-8xl px-6 lg:px-10">
          <div className="mb-14 flex flex-col items-center gap-8">
            <h1 className="lg:text-7xl text-4xl text-center mt-10 lg:mt-16 font-light text-[#FEE9CE]">Our Products Categories</h1>
            <div className="flex flex-wrap justify-center gap-3 ">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-full px-6 py-3 cursor-pointer text-sm transition-all duration-300 ${activeTab === tab
                    ? "bg-white text-black"
                    : "border border-white/15 bg-white/5 text-white font-light hover:bg-white/10"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            layout
            className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4 mt-20 lg:mt-32"
          >
            {filteredVideos.map((video, index) => (
              <VideoCard key={video.src} video={video} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      <Ctasections />
    </div>
  );
}