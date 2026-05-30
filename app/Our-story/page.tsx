"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CoreValues from "../components/CoreValues";
import FAQs from "../components/FAQs";
import Whoweare from "../components/Whoweare";
import Mission from "../components/Mission";
import BrandsMarquee from "../components/ui/Brands";
import { motion, Variants } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const STORY_PARAGRAPHS = [
  `Hi, I’m Ken, the founder of Ekho Studios, where I create cinematic product videos for brands.`,
  `Growing up, I was obsessed with cartoons, movies and music. I was always fascinated by how a scene in a movie, a soundtrack or even a cartoon could make you feel something instantly. I’d watch things over and over, paying attention to the little details without even realizing it, the lighting, the colours, the camera angles, the sound and the way everything came together to tell a story.`,
  `That curiosity is a big part of why I do what I do today.`,
  `I love taking products that might seem ordinary and giving them personality, emotion and a story of their own. For me, creating product videos is a bit like making a tiny movie, using lighting, movement, sound and atmosphere to make people stop, smile, feel something and remember it.`,
  `When I’m creating, I’m usually drawing inspiration from the things I love: movies, music, cartoons and all the little creative details that make something feel special.`,
];

const EKHO_PARAGRAPHS = [
  `Most products are seen as objects. We see them differently. Behind every product is a feeling, a story and an experience waiting to be brought to life.`,
  `Founded by Ken Oluwadara Williams, Ekho Studios creates cinematic product videos that add depth, emotion and meaning to products. We do more than show what a product looks like, we create visuals that make people feel it.`,
  `Every movement, texture, light and sound is carefully crafted to transform products from simple objects into experiences. The goal is to create videos that capture attention, stir emotion and leave a lasting impression.`,
  `The name “Ekho” comes from the idea of an echo: something that stays with you long after the moment has passed. That is the kind of work we create. Story-driven product videos that remain in the minds of the people who watch them.`,
  `At Ekho Studios, we bring products to life and create stories that echo beyond the screen.`,
];

export default function Page() {
  const pageRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const founderRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const paraRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const orbitRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Hero entrance ───
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(eyebrowRef.current, { y: 20, opacity: 0, duration: 0.7 }, 0.2)
        .from(headingRef.current, { y: 60, opacity: 0, duration: 1.1 }, 0.35)
        .from(
          dividerRef.current,
          {
            scaleX: 0,
            transformOrigin: "center",
            duration: 1,
            ease: "power4.out",
          },
          0.7,
        );

      // ── Orbit spin ───
      gsap.to(orbitRef.current, {
        rotation: 360,
        duration: 40,
        ease: "none",
        repeat: -1,
      });

      // ── Founder image reveal ───
      gsap.from(imageRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: imageRef.current, start: "top 85%" },
      });

      // ── Founder name/title ────
      gsap.from(founderRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: founderRef.current, start: "top 88%" },
      });

      // ── Story paragraphs ─────
      paraRefs.current.filter(Boolean).forEach((p, i) => {
        gsap.from(p, {
          y: 28,
          opacity: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: { trigger: p, start: "top 88%" },
          delay: i * 0.05,
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const fadeUp: Variants = {
    hidden: {
      opacity: 0,
      y: 40,
      filter: "blur(6px)",
    },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.9,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <main
        ref={pageRef}
        className="font-barlow relative w-full min-h-screen bg-black text-white overflow-hidden"
      >
        {/* ── Glow ─── */}
        <div
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] opacity-[0.05] z-1"
          style={{
            background: "radial-gradient(ellipse, #fff 0%, transparent 65%)",
          }}
          aria-hidden="true"
        />

        {/* ── Orbit ring ─── */}
        {/* <div
          ref={orbitRef}
          className="pointer-events-none absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full border border-white/5 opacity-0"
          style={{ animation: "orbit-spin 18s linear infinite" }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -top-20 -right-20 w-[320px] h-[320px] rounded-full border border-white/7"
          aria-hidden="true"
        /> */}

        <div>
          <Whoweare />
        </div>

        <motion.section
          className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 pb-24 md:pt-32 md:pb-10"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative mb-12 flex items-center justify-center"
          >
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap lg:text-[8vw] text-[14vw] font-black tracking-tighter text-white/6 select-none">
                Ekho Studios
              </h1>
            </div>

            <div className="relative z-10 flex items-center justify-center gap-4">
              <span
                style={{
                  fontSize: "clamp(1.5rem, 2vw, 3rem)",
                  textTransform: "capitalize",
                  color: "#FEE9CE",
                  fontWeight: 300,
                  whiteSpace: "nowrap",
                }}
              >
                About us
              </span>
            </div>
          </motion.div>

          <div>
            <div className="flex flex-col gap-0 lg:mt-16 mt-10 ">
              {/* Pull quote */}
              <motion.blockquote
                variants={fadeUp}
                className="text-[clamp(1.2rem,3.2vw,1.8rem)] text-center font-light leading-[1.2] tracking-tight text-[#FEE9CE] mb-10 italic"
              >
                "At Ekho Studios, we believe products should feel alive."
              </motion.blockquote>

              {/* Divider */}
              <motion.div
                variants={fadeUp}
                className="h-px mb-10 bg-linear-to-r from-white/10 via-white/5 to-transparent"
              />

              {/* Story paragraphs */}
              <div className="flex flex-col gap-5">
                {EKHO_PARAGRAPHS.map((para, i) => (
                  <motion.p
                    key={i}
                    ref={(el) => {
                      paraRefs.current[i] = el;
                    }}
                    variants={fadeUp}
                    className="text-sm md:text-xl text-white/40 font-light leading-relaxed"
                  >
                    {para}
                  </motion.p>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        <div className="lg:mt-10 mt-0 lg:mb-0 mb-20">
          <BrandsMarquee />
        </div>

        <section className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 pb-24 md:pt-32 md:pb-10">
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative mb-12 flex items-center justify-center"
          >
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap lg:text-[8vw] text-[13vw] font-black tracking-tighter text-white/6 select-none">
                Founder's Story
              </h1>
            </div>

            <div className="relative z-10 flex items-center justify-center gap-4">
              <span
                style={{
                  fontSize: "clamp(1.5rem, 2vw, 3rem)",
                  textTransform: "capitalize",
                  color: "#FEE9CE",
                  fontWeight: 300,
                  whiteSpace: "nowrap",
                }}
              >
                Founder's Story
              </span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-12 lg:gap-20 lg:mt-20 mt-10 items-start">
            {/* ── Left: portrait ───── */}
            <div className="flex flex-col items-center lg:items-start gap-6 lg:sticky lg:top-28">
              {/* Image frame */}
              <div
                ref={imageRef}
                className="relative w-full max-w-[300px] lg:max-w-none"
              >
                {/* Corner accents */}
                {[
                  "top-[-1px] left-[-1px]",
                  "top-[-1px] right-[-1px] scale-x-[-1]",
                  "bottom-[-1px] left-[-1px] scale-y-[-1]",
                  "bottom-[-1px] right-[-1px] scale-[-1]",
                ].map((pos, i) => (
                  <div
                    key={i}
                    className={`absolute ${pos} w-5 h-5 z-10`}
                    aria-hidden="true"
                  >
                    <div className="absolute top-0 left-0 w-full h-px bg-white/20" />
                    <div className="absolute top-0 left-0 w-px h-full bg-white/20" />
                  </div>
                ))}

                <div className="overflow-hidden">
                  <Image
                    src="/kenprofile.jpeg"
                    alt="Ken Williams — Founder, Ekho Studios"
                    width={400}
                    height={500}
                    className="object-cover w-full rounded cursor-pointer grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              </div>

              {/* Founder identity */}
              <div
                ref={founderRef}
                className="flex flex-col gap-1 text-center lg:text-left"
              >
                <h3 className="text-2xl md:text-3xl font-light text-white tracking-tight">
                  Ken Oluwadara Williams
                </h3>
                <p className="text-[14px] capitalize text-white/40 font-light">
                  Founder & Creative Director
                </p>
                <p className="text-[14px] capitalize text-white/40 font-light">
                  Ekho Studios
                </p>
              </div>
            </div>

            {/* ── Right: story ───── */}
            <div className="flex flex-col gap-0">
              {/* Pull quote */}
              <blockquote className="text-[clamp(1.4rem,3.2vw,1.8rem)] font-light leading-[1.2] tracking-tight text-[#FEE9CE] italic mb-8">
                "Behind every product is a feeling, a story and an experience
                waiting to be brought to life."
              </blockquote>

              {/* Thin divider */}
              {/* <div className="h-px mb-10 bg-linear-to-r from-white/10 via-white/5 to-transparent" /> */}

              {/* Story paragraphs */}
              <div className="flex flex-col gap-5">
                {STORY_PARAGRAPHS.map((para, i) => (
                  <p
                    key={i}
                    ref={(el) => {
                      paraRefs.current[i] = el;
                    }}
                    className="text-sm md:text-xl text-white/40 font-light leading-relaxed"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Mission />
        <CoreValues />
        <div className="mt-20">
          <FAQs />
        </div>
      </main>
    </>
  );
}
