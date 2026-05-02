"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import Button from "./Button";

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
    a: "You do not need to come with a finished concept. After we discuss your brand, product and what you want the video to achieve, we develop a creative treatment—a document that details the concept, visual direction, mood, story and overall plan for the shoot. This helps make sure we fully understand your vision and that everyone is aligned before production begins. Of course, if you already have ideas or references, we’re happy to build on them.",
  },
  {
    q: "What's included in a standard product video package?",
    a: "A standard product video package typically includes creative direction, a creative treatment, shoot planning, set design, filming, editing, sound design and final delivery of the video. You’ll also receive revisions to make sure the final result feels right for your brand. Additional versions or aspect ratios for different platforms can also be created, but these come at an additional cost.",
  },
  {
    q: "Can you travel for on-location shoots?",
    a: "We majorly film in the studio, as that gives us the most control over the look and feel of the video. However, if your concept requires an on-location shoot, we can make provisions for it. On-location shoots are priced separately depending on the location and production requirements.",
  },
  {
    q: "How do we get started?",
    a: "Getting started is simple. Reach out with a bit about your product, brand and what you are looking for. We’ll then have a conversation to understand your vision, goals and any ideas you may already have. From there, we develop a creative treatment and quote for the project. Once everything is approved, we move into planning, production and finally delivery.",
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
  return (
    <motion.div
      layout
      className="group border-b border-white/8 last:border-b-0"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.08 }}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-start cursor-pointer justify-between gap-6 py-7 text-left md:py-8"
        aria-expanded={isOpen}
      >
        <div className="flex items-start gap-5 md:gap-8">
          <span className="shrink-0 pt-1 text-[10px] tabular-nums text-white/20 lg:text-lg">
            {String(index + 1).padStart(2, "0")}
          </span>

          <span
            className={`text-base md:text-2xl font-light leading-snug tracking-wide transition-colors duration-300 ${isOpen
                ? "text-white"
                : "text-white/50 group-hover:text-white/80"
              }`}
          >
            {item.q}
          </span>
        </div>

        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className={`relative mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${isOpen
              ? "border-white/40"
              : "border-white/15 group-hover:border-white/35"
            }`}
        >
          <Plus className="h-4 w-4 text-white/70" />
        </motion.span>
      </button>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isOpen ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="h-px origin-left bg-linear-to-r from-white/0 via-white/20 to-white/0"
      />

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.45, ease: "easeInOut" },
              opacity: { duration: 0.3 },
            }}
            className="overflow-hidden"
          >
            <p className="pb-8 pt-8 pl-13 text-sm font-light leading-relaxed tracking-wide text-white/40 md:pl-19 md:text-base">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <section className="relative z-50 w-full overflow-hidden bg-black py-24 md:py-20">
      <div className="relative mx-auto max-w-7xl px-6 md:px-0">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative mb-12 flex items-center justify-center lg:mt-10"
        >
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap lg:text-[12vw] text-[20vw] font-black tracking-tighter text-white/3 select-none">
              Questions
            </h1>
          </div>

          <div className="relative z-10 flex items-center justify-center gap-4">
            <span
              style={{
                fontSize: "clamp(2rem, 2vw, 3rem)",
                textTransform: "capitalize",
                color: "#FEE9CE",
                fontWeight: 300,
                whiteSpace: "nowrap",
              }}
            >
              Frequently Asked
            </span>
          </div>
        </motion.div>

        {/* <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-2 h-px w-full origin-center bg-linear-to-r from-white/0 via-white/15 lg:mt-32 mt-10 to-white/0"
        /> */}

        <div className="lg:mt-32 mt-10">
          {FAQS.map((item, i) => (
            <FAQItem
              key={i}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>

        <section className="relative z-10 border-t border-black bg-black">
          <motion.div
            custom={0}
            // variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="px-6 py-20 md:py-28 flex flex-col md:flex-row md:items-end justify-between gap-10"
          >

            <motion.div
              custom={1}
              // variants={fadeUp}
              className="flex flex-col gap-4 max-w-2xl"
            >
              <h2 className="font-cormorant text-[clamp(2rem,5vw,4rem)] font-light leading-none tracking-tight text-[#FEE9CE]">
                Ready to make your<br />
                <em className="not-italic text-white/30">
                  product unforgettable?
                </em>
              </h2>
            </motion.div>

            <motion.div
              custom={2}
              // variants={fadeUp}
              className="flex flex-col gap-4 items-start md:items-end shrink-0"
            >
              <Button
                text="Start a project"
                textsecond="Start a project"
                textColor="text-[#fff]"
                border="border border-white"
              />
            </motion.div>

          </motion.div>
        </section>
      </div>
    </section>
  );
}