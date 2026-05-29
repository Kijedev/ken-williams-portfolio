"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import FAQs from "../components/FAQs";
import { motion, Variants } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const SHARED_DELIVERABLES = [
  "One orientation (vertical or horizontal)",
  "Delivered in HD",
  "Optimised for social media",
  "Colour graded",
];

const SERVICES = [
  {
    index: "01",
    title: "Full Story Commercial",
    category: "Signature",
    duration: "1 minute",
    price: "₦900,000 - ₦1,200,000",
    description:
      "For brands looking to create a strong, cinematic narrative around their product. Best suited for campaigns, launches, and premium brand positioning. Includes:",
    deliverables: [
      "Full creative direction & concept development Story-driven execution",
      "Advanced lighting & custom set design",
      "Multiple scenes and transitions",
      "Cinematic pacing & composition",
      "Detailed sound design",
      "2 revisions",
    ],
    accent: "#E8A25C",
    // tag: "",
  },
  {
    index: "02",
    title: "Story Burst",
    category: "Performance",
    duration: "30 seconds",
    price: "₦600,000 – ₦900,000",
    description:
      "A balanced mix of storytelling and visual impact—engaging, concise, and effective. Ideal for social media campaigns and brand awareness. Includes:",
    deliverables: [
      "Creative concept development",
      "Controlled set design",
      "Clean, engaging visuals",
      "Moderate scene variation",
      "Sound design",
      "1–2 revisions",
    ],
    accent: "#a8c4e8",
    // tag: "",
  },
  {
    index: "03",
    title: "Quick Impact",
    category: "Awareness",
    duration: "15 seconds",
    price: "₦300,000 – ₦600,000",
    description:
      "Short, sharp, and designed to capture attention instantly. Perfect for ads, promos, and quick product highlights. Includes:",
    deliverables: [
      "Simple, focused concept",
      "Clean production setup",
      "Strong product-focused visuals",
      "Minimal scene changes",
      "Basic sound design",
      "1 revision",
    ],
    accent: "#c4e8a8",
    // tag: "",
  },
  {
    index: "04",
    title: "Custom Request",
    description:
      "For projects that require a more tailored approach, our Custom Request option is designed to accommodate unique creative directions, specialized production requirements, and brand-specific executions beyond our standard packages. Each project is carefully developed to align with your objectives, ensuring a refined and strategic visual outcome.",
    accent: "#FEE9CE",
    isCustom: true,
  },
];

export default function Page() {
  const pageRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const listItemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const processTitleRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const sharedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const hero = gsap.timeline({ defaults: { ease: "power3.out" } });
      hero
        .from(eyebrowRef.current, { y: 20, opacity: 0, duration: 0.7 }, 0.15)
        .from(headingRef.current, { y: 56, opacity: 0, duration: 1.1 }, 0.3)
        .from(subRef.current, { y: 24, opacity: 0, duration: 0.8 }, 0.55);

      gsap.to(orbitRef.current, {
        rotation: 360,
        duration: 38,
        ease: "none",
        repeat: -1,
      });

      const listItems = listItemsRef.current.filter(Boolean) as HTMLLIElement[];
      const slides = slidesRef.current.filter(Boolean) as HTMLDivElement[];
      const fill = fillRef.current;

      if (
        !listItems.length ||
        !slides.length ||
        !fill ||
        !pinSectionRef.current
      )
        return;

      gsap.set(fill, {
        scaleY: 1 / listItems.length,
        transformOrigin: "top left",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinSectionRef.current,
          start: "top top",
          end: "+=" + listItems.length * 50 + "%",
          pin: true,
          scrub: true,
        },
      });

      listItems.forEach((item, i) => {
        const prevItem = listItems[i - 1];
        const prevSlide = slides[i - 1];

        if (prevItem) {
          tl.set(item, { color: SERVICES[i]?.accent ?? "#e8c49a" }, 0.5 * i)
            .to(slides[i], { autoAlpha: 1, duration: 0.2 }, "<")
            .set(prevItem, { color: "rgba(255,255,255,0.18)" }, "<")
            .to(prevSlide, { autoAlpha: 0, duration: 0.2 }, "<");
        } else {
          gsap.set(item, { color: SERVICES[0]?.accent ?? "#e8c49a" });
          gsap.set(slides[0], { autoAlpha: 1 });
        }
      });

      tl.to(
        fill,
        {
          scaleY: 1,
          transformOrigin: "top left",
          ease: "none",
          duration: tl.duration(),
        },
        0,
      ).to({}, {});

      gsap.from(sharedRef.current!.children, {
        y: 20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: sharedRef.current, start: "top 85%" },
      });

      gsap.from(processTitleRef.current, {
        y: 32,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: processTitleRef.current, start: "top 85%" },
      });

      const steps = processRef.current?.querySelectorAll("[data-step]");
      if (steps) {
        gsap.from(steps, {
          y: 24,
          opacity: 0,
          stagger: 0.1,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: { trigger: processRef.current, start: "top 80%" },
        });
      }
      const procLine = processRef.current?.querySelector("[data-process-line]");
      if (procLine) {
        gsap.from(procLine, {
          scaleX: 0,
          transformOrigin: "left",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: processRef.current, start: "top 80%" },
        });
      }

      gsap.from(ctaRef.current, {
        y: 32,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ctaRef.current, start: "top 88%" },
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <div
        ref={pageRef}
        className="relative min-h-screen w-full bg-black text-white overflow-hidden"
      >
        <div
          className="pointer-events-none fixed inset-0 z-1 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "180px 180px",
          }}
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-200 h-125 opacity-[0.05] z-1"
          style={{
            background: "radial-gradient(ellipse, #fff 0%, transparent 65%)",
          }}
          aria-hidden="true"
        />

        <div
          ref={orbitRef}
          className="pointer-events-none absolute -top-64 -right-64 w-175 h-175 rounded-full border border-white/3 z-1"
          aria-hidden="true"
        />

        {/* Hero */}
        <section className="relative z-10 flex flex-col items-center justify-center w-full min-h-screen px-6 lg:px-20">
          <div className="lg:pt-32 pt-20 lg:px-20 px-5">
            {/* BIG TITLE WRAPPER */}
            <motion.h1
              initial={{ opacity: 0, y: 80, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="text-[clamp(5rem,9vw,10rem)] lg:text-left text-center font-extrabold leading-none tracking-tighter mb-8 bg-linear-to-b from-[#FEE9CE] via-[#FEE9CE] to-black bg-clip-text text-transparent"
            >
              OUR{" "}
              <motion.span
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ delay: 0.15, duration: 0.8 }}
                className="bg-linear-to-b from-[#EF5143] via-[#EF5143] to-black bg-clip-text text-transparent"
              >
                PRICING
              </motion.span>
            </motion.h1>
          </div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.4 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 lg:mt-10"
          >
            <span className="text-[9px] tracking-[0.3em] uppercase text-white/20">
              Scroll
            </span>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.6,
                ease: "easeInOut",
              }}
              className="w-px h-10 bg-linear-to-b from-white/20 to-transparent"
            />
          </motion.div>
        </section>

        {/* Scroll list */}
        <section className="bg-black">
          <section
            ref={pinSectionRef}
            className="relative z-10 w-full min-h-screen flex items-center justify-center lg:-mt-32"
          >
            <div className="w-full mx-auto px-6 sm:px-10 md:px-16 lg:px-24 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8 relative">
              {/* Left: fill bar + titles */}
              <div className="relative shrink-0 pr-8 md:pr-16 flex items-center">
                <div
                  ref={fillRef}
                  className="absolute left-0 top-0 w-0.5 origin-top"
                  style={{
                    background:
                      "linear-gradient(to bottom, #FEE9CE, #a8c4e8, #c4e8a8)",
                  }}
                  aria-hidden="true"
                />

                <ul
                  ref={listRef}
                  className="list-none m-0 p-0 pl-6 flex flex-col gap-8 md:gap-10"
                >
                  {SERVICES.map((s, i) => (
                    <li
                      key={s.title}
                      ref={(el) => {
                        listItemsRef.current[i] = el;
                      }}
                      className="cursor-default select-none transition-colors duration-300"
                      style={{ color: "rgba(255,255,255,0.18)" }}
                    >
                      <span className="block text-[clamp(1.6rem,3.8vw,2.8rem)] font-light leading-tight tracking-tight">
                        {s.title}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: slides */}
              <div className="relative lg:mt-0 -mt-5 min-h-115 md:min-h-120">
                {SERVICES.map((s, i) => (
                  <div
                    key={s.title}
                    ref={(el) => {
                      slidesRef.current[i] = el;
                    }}
                    className="absolute inset-0 flex flex-col justify-center"
                    style={{ opacity: 0, visibility: "hidden" }}
                  >
                    {s.isCustom ? (
                      /* ── Ghost card for Custom Request ── */
                      <div className="relative max-w-lg ml-auto w-full p-7 md:p-10 rounded-2xl overflow-hidden border border-dashed border-white/20 bg-transparent flex flex-col justify-between min-h-80">
                        <div
                          className="absolute top-4 right-4 w-4 h-4"
                          aria-hidden="true"
                        >
                          <div className="absolute top-0 right-0 w-full h-px bg-[#FEE9CE] opacity-25" />
                          <div className="absolute top-0 right-0 w-px h-full bg-[#FEE9CE] opacity-25" />
                        </div>
                        <div
                          className="pointer-events-none absolute inset-0 opacity-[0.04]"
                          style={{
                            background:
                              "radial-gradient(ellipse at center, #FEE9CE 0%, transparent 70%)",
                          }}
                          aria-hidden="true"
                        />
                        <div className="relative z-10 flex flex-col gap-6 h-full justify-between">
                          <p className="text-sm text-white/40 font-light leading-relaxed">
                            {s.description}
                          </p>
                          <div className="flex flex-col gap-4">
                            {/* <div className="h-px w-full bg-white/10" /> */}
                            <div className="flex items-center justify-between">
                              <span className="text-[14px] uppercase text-white/25">
                                Pricing on request
                              </span>
                              <Link
                                href="/contact"
                                className="text-[12px] tracking-widest capitalize text-[#FEE9CE]/70 hover:text-[#FEE9CE] transition-colors duration-300 border border-white/15 hover:border-[#FEE9CE]/40 px-4 py-2 rounded-full"
                              >
                                Let's talk
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* ── Standard card ── */
                      <div className="relative border border-white/[0.07] p-7 md:p-10 bg-[#010101] rounded-2xl overflow-hidden max-w-lg ml-auto w-full">
                        <div
                          className="pointer-events-none absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-[0.07]"
                          style={{
                            background: `radial-gradient(ellipse, ${s.accent} 0%, transparent 65%)`,
                          }}
                          aria-hidden="true"
                        />
                        <div
                          className="absolute top-4 right-4 w-4 h-4"
                          aria-hidden="true"
                        >
                          <div
                            className="absolute top-0 right-0 w-full h-px"
                            style={{ background: s.accent, opacity: 0.4 }}
                          />
                          <div
                            className="absolute top-0 right-0 w-px h-full"
                            style={{ background: s.accent, opacity: 0.4 }}
                          />
                        </div>
                        <div className="flex items-baseline gap-3 mb-1">
                          <span
                            className="font-cormorant text-[clamp(1rem,5vw,2rem)] font-light leading-none"
                            style={{ color: s.accent }}
                          >
                            {s.price}
                          </span>
                          <span className="text-[12px] capitalize text-[#FEE9CE] font-light">
                            {s.duration}
                          </span>
                        </div>
                        <div
                          className="h-px mb-5 mt-4 opacity-15"
                          style={{
                            background: `linear-gradient(90deg, ${s.accent}, transparent)`,
                          }}
                        />
                        <p className="text-sm text-white/45 font-light leading-relaxed mb-7">
                          {s.description}
                        </p>
                        <div className="flex flex-col gap-2.5 mb-7">
                          <span className="text-[12px] capitalize text-[#FEE9CE] mb-1">
                            What's included
                          </span>
                          {s.deliverables?.map((d) => (
                            <div key={d} className="flex items-center gap-3">
                              <span
                                className="w-3 h-px shrink-0"
                                style={{ background: s.accent, opacity: 0.4 }}
                              />
                              <span className="text-xs text-white/40 font-light tracking-wide">
                                {d}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </section>

        {/* Package */}
        <section className="relative z-10 bg-black h-screen flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative mb-12 flex items-center justify-center lg:pt-48"
          >
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap lg:text-[12vw] text-[20vw] font-black tracking-tighter text-white/6 select-none">
                Package
              </h1>
            </div>

            <div className="relative z-10 lg:-mt-48 flex items-center justify-center gap-4">
              <span
                style={{
                  fontSize: "clamp(1.5rem, 2vw, 3rem)",
                  textTransform: "capitalize",
                  color: "#FEE9CE",
                  fontWeight: 300,
                  whiteSpace: "nowrap",
                }}
              >
                Content Package
              </span>
            </div>
          </motion.div>

          <div className=" px-6 sm:px-10 md:px-16 lg:px-24 py-6 md:py-0">
            <h1 className="text-left text-[12px] lg:text-xl text-white/40 font-light mb-10">
              These ranges serve as a guide depending on the creative direction
              and production depth required. All packages cover the production
              of one (1) final video, delivered in HD format. Additional
              versions, alternate orientations, or format variations are
              available at an extra cost. Final pricing is determined by the
              specific needs of your project—including factors such as concept
              complexity, use of talent, voice-over requirements, custom set
              design, and whether the shoot takes place in-studio or on
              location. This ensures every project is executed at the highest
              standard it deserves.
            </h1>

            <div className="flex flex-col md:flex-row md:items-start gap-10 md:gap-20">
              <div className="shrink-0">
                <div className="flex items-center gap-3 mb-2">
                  <span className="lg:text-2xl text-[15px] capitalize text-[#FEE9CE] font-light">
                    Every package includes
                  </span>
                </div>
              </div>

              <div
                ref={sharedRef}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1"
              >
                {SHARED_DELIVERABLES.map((d) => (
                  <div key={d} className="flex items-center gap-3 py-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FEE9CE] shrink-0" />
                    <span className="lg:text-lg text-[15px] text-white/40 font-light tracking-wide">
                      {d}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <FAQs />
      </div>
    </>
  );
}
