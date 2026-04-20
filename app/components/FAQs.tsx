"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FAQS = [
  {
    q: "What types of products do you specialize in filming?",
    a: "We specialize in filming a wide range of products including food, skincare, beauty, fashion, tech, lifestyle products and more. At Ekho Studios, we focus on creating cinematic videos that bring out the personality and story behind a product, so whether it’s a bottle, a snack, a shoe or a gadget, we approach each one in a way that makes it feel alive and memorable.",
  },
  {
    q: "How long does a typical project take from brief to delivery?",
    a: "The timeline depends on the complexity of the project, but most product videos take between 1–3 weeks from brief to final delivery. Simpler projects can be completed faster, while more detailed concepts, custom sets or multiple videos may take longer. Once we discuss your project, you’ll receive a clear timeline so you know exactly what to expect.",
  },
  {
    q: "Do you handle creative direction, or do I need to bring a concept?",
    a: "Both work. I can lead the full creative — brief, concept, storyboard, styling, and execution — or slot seamlessly into a brief you've already developed. Many clients come with a vibe reference and trust me to build the world around it.",
  },
  {
    q: "What's included in a standard product video package?",
    a: "A standard package includes a pre-production call, one shoot day, professional lighting and grip, up to two rounds of revisions, and delivery of the final cut optimised for web, social, and broadcast specs. Raw footage licensing is available as an add-on.",
  },
  {
    q: "Can you travel for on-location shoots?",
    a: "Yes — I'm based in Lagos Nigeria but regularly shoot across Africa. Travel costs are factored into project quotes. For international projects, I can also work with trusted local production partners I've vetted personally.",
  },
  {
    q: "How do we get started?",
    a: "Fill out the contact form or send a direct email with your product, rough timeline, and any references you love. I'll respond within 24 hours with availability and an outline of how I'd approach the project.",
  },
];

function FAQItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: (typeof FAQS)[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const didMount = useRef(false);

  // Animate open / close
  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return;

    if (!didMount.current) {
      gsap.set(body, { height: 0, opacity: 0 });
      didMount.current = true;
      return;
    }

    if (isOpen) {
      gsap.to(body, {
        height: "auto",
        opacity: 1,
        duration: 0.55,
        ease: "power3.out",
      });
    } else {
      gsap.to(body, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power3.in",
      });
    }
  }, [isOpen]);

  // Animate the horizontal rule on open
  useEffect(() => {
    if (!lineRef.current) return;
    gsap.to(lineRef.current, {
      scaleX: isOpen ? 1 : 0,
      duration: 0.5,
      ease: "power2.out",
    });
  }, [isOpen]);

  return (
    <div className="group border-b border-white/8 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-6 py-7 md:py-8 text-left"
        aria-expanded={isOpen}
      >
        {/* Index + question */}
        <div className="flex items-start gap-5 md:gap-8">
          <span
            className="shrink-0 lg:text-2xl text-[10px] text-white/20 tabular-nums pt-1"
            aria-hidden="true"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className={`
              text-base md:text-2xl font-light leading-snug tracking-wide cursor-pointer
              transition-colors duration-300
              ${isOpen ? "text-white" : "text-white/50 group-hover:text-white/80"}
            `}
          >
            {item.q}
          </span>
        </div>

        {/* Plus / minus icon */}
        <span
          className={`
            shrink-0 relative flex items-center justify-center
            w-7 h-7 mt-0.5 rounded-full border
            transition-all duration-400
            ${isOpen
              ? "border-white/40 rotate-45"
              : "border-white/15 group-hover:border-white/35"}
          `}
          aria-hidden="true"
        >
          {/* horizontal bar */}
          <span className="absolute w-[11px] h-px bg-white/70" />
          {/* vertical bar — fades out when open because of rotate-45 */}
          <span className="absolute w-px h-[11px] bg-white/70" />
        </span>
      </button>

      {/* Expand line accent */}
      <div
        ref={lineRef}
        className="h-px bg-linear-to-r from-white/0 via-white/20 to-white/0 origin-left"
        style={{ transform: "scaleX(0)" }}
        aria-hidden="true"
      />

      {/* Answer body */}
      <div ref={bodyRef} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
        <p className="pl-13 md:pl-19 pt-8 pb-8 text-sm md:text-base text-white/40 font-light leading-relaxed tracking-wide">
          {item.a}
        </p>
      </div>
    </div>
  );
}

// ─── section ──────────────────────────────────────────────────────────────────

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Scroll-triggered entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Eyebrow + heading slide up
      gsap.from(headingRef.current!.children, {
        y: 48,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
        },
      });

      // FAQ rows fade + slide
      const rows = itemsRef.current?.querySelectorAll("[data-faq-row]");
      if (rows) {
        gsap.from(rows, {
          y: 32,
          opacity: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: itemsRef.current,
            start: "top 80%",
          },
        });
      }

      // CTA fade
      gsap.from(ctaRef.current!, {
        y: 24,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 90%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggle = (i: number) =>
    setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black z-50 overflow-hidden py-24 md:py-36"
    >
      <div className="relative max-w-7xl mx-auto px-6 md:px-0">

        {/* ── Heading block ─────────────────────────────────── */}
        <div ref={headingRef} className="mb-16 md:mb-20">
          <p className="text-[10px] lg:text-sm tracking-[0.35em] text-white/40 uppercase mb-4">
            Questions
          </p>
          <h2 className="text-[clamp(2.2rem,6vw,4.5rem)] font-extralight leading-[1.05] tracking-tight text-[#FEE9CE]">
            Everything you<br />
            <em className="not-italic text-white/40">need to know</em>
          </h2>
        </div>

        {/* ── Divider ───────────────────────────────────────── */}
        <div className="h-px w-full bg-linear-to-r from-white/0 via-white/15 to-white/0 mb-2" />

        {/* ── FAQ rows ──────────────────────────────────────── */}
        <div ref={itemsRef}>
          {FAQS.map((item, i) => (
            <div key={i} data-faq-row>
              <FAQItem
                item={item}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
              />
            </div>
          ))}
        </div>

        <div
          ref={ctaRef}
          className="mt-16 md:mt-20 flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-10 border-t border-white/8"
        >
          <p className="text-sm lg:text-4xl text-white/50 max-w-2xl mx-auto font-light leading-relaxed">
            Still have questions? I'm happy to walk through anything before you commit.
          </p>
          <a
            href="/Contact"
            className="
              shrink-0 inline-flex items-center gap-3
              px-7 py-3.5 rounded-full
              border border-white/15 hover:border-white/45
              text-[16px] capitalize font-light
              text-white/50 hover:text-white
              transition-all duration-300 group
            "
          >
            Get in touch
            {/* animated arrow */}
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300"
            >
              <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}