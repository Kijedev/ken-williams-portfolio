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
  { src: "/reels/Gourmet Twist Banana Bread 2.mp4", name: "Gourmet Twist", category: "Food" },
  { src: "/reels/Rita and Nathan Product Video.mp4", name: "Rita & Nathan", category: "Fashion" },
  { src: "/reels/Maison Veil Body Oil Video.mp4", name: "Maison Veil", category: "Scent" },
  { src: "/reels/Aymiie Lip Oil Video with VO.mp4", name: "Aymiie", category: "Cosmetics" },
  { src: "/reels/Estebare Video 2 VO.mp4", name: "Estebare", category: "Cosmetics" },
  { src: "/reels/Sooo Pro Lip Liner Product Video VO.mp4", name: "Sooo Pro", category: "Cosmetics" },
  { src: "/reels/Iphone.mp4", name: "Iphone Case", category: "Tech" },

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
            {/* <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs text-white backdrop-blur-md">
              {video.category}
            </span> */}
            <h3 className="text-xl font-light text-white">{video.name}</h3>
            <span className="text-sm text-white/30">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

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

        <div className="relative z-10 mx-auto max-w-400 px-6 lg:px-10">
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