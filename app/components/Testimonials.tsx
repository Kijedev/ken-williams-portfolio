"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Rita & Nathan",
    quote:
      "Working with your company was amazing, you definitely took my business to heart and delivered way more than I envisioned. You absolutely blew my mind and will work with you all day everyday because your heart truly reflects in all that you do. I know God hasn’t finished with you yet, I can’t wait for all the other brilliant ideas you are yet to unleash.",
  },
  {
    id: 2,
    name: "Elonna Foods",
    quote:
      "Thank you for creating the brand visuals for elonnafoods.ng, it was top notch. I was blown away, far more than what I was expecting. Thank you once again for a job well done.",
  },
  {
    id: 3,
    name: "Simply Jollof",
    quote:
      "From the outset, your creative direction was thoughtful, intentional, and clearly aligned with the brand vision. You took the time to understand the essence of Simply Jollof not just as a food brand, but as an experience rooted in culture, flavour, and nostalgia. The quality of the videos delivered was strong, with a cinematic feel and clear attention to detail. I would be happy to work together again in the future.",
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const navigate = (next: number) => {
    const idx =
      ((next % testimonials.length) + testimonials.length) %
      testimonials.length;
    setDirection(next > current ? 1 : -1);
    setCurrent(idx);
  };

  const active = testimonials[current];

  const variants = {
    enter: (dir: number) => ({ opacity: 0, y: dir > 0 ? 14 : -14 }),
    center: { opacity: 1, y: 0 },
    exit: (dir: number) => ({ opacity: 0, y: dir > 0 ? -10 : 10 }),
  };

  return (
    <section className="relative w-full bg-black overflow-hidden px-6 md:px-16 py-24 md:py-32">
      {/* Top rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#FEE9CE]/15 to-transparent" />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative mb-12 flex items-center justify-center lg:mt-10"
        >
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap lg:text-[12vw] text-[20vw] font-black tracking-tighter text-white/3 select-none">
              Testimonials
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
              What our clients say
            </span>
          </div>
        </motion.div>

        {/* Quote */}
        <div className="min-h-48 mt-20">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.blockquote
              key={active.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="italic text-[#FEE9CE] text-xl md:text-2xl leading-relaxed"
            >
              "{active.quote}"
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {/* Divider */}
        <div className="w-10 h-px bg-[#FEE9CE]/20 mb-7 mt-7" />

        {/* Meta row */}
        <div className="flex items-center justify-between">
          <AnimatePresence mode="wait">
            <motion.p
              key={active.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="text-sm tracking-widest capitalize text-[#FEE9CE]/50"
            >
              {active.name}
            </motion.p>
          </AnimatePresence>
          <div className="flex gap-2 items-center">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => navigate(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-1 rounded-full transition-all duration-400 ${
                  i === current ? "w-5 bg-white/55" : "w-1 bg-white/15"
                }`}
              />
            ))}
          </div>
          {/* <span className="text-[11px] tracking-[0.15em] text-[#FEE9CE]/20">
            {String(current + 1).padStart(2, "0")} /{" "}
            {String(testimonials.length).padStart(2, "0")}
          </span> */}
        </div>

        {/* Controls */}
        <div className="md:flex-row flex flex-col gap-5 md:gap-0 md:items-center items-start justify-between mt-10 lg:mt-0">
          <div className="flex gap-3">
            <button
              onClick={() => navigate(current - 1)}
              aria-label="Previous"
              className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center text-[#FFF] hover:bg-white/10 transition-colors duration-300 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate(current + 1)}
              aria-label="Next"
              className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center text-[#FFF] hover:bg-white/10 transition-colors duration-300 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Watermark */}
          <AnimatePresence mode="wait">
            <motion.span
              key={active.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="pointer-events-none select-none italic text-[16vw] font-black tracking-tighter text-white/3 md:text-[130px] leading-none whitespace-nowrap"
            >
              {active.name}
            </motion.span>
          </AnimatePresence>

          {/* Dots */}
          
        </div>
      </div>
    </section>
  );
}
