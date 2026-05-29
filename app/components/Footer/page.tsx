"use client";

import { motion } from "framer-motion";
import { FaLinkedinIn, FaFacebookF, FaTiktok } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";

const NAV_LINKS = [
  { label: "Our Story", href: "/Our-story" },
  { label: "What we offer", href: "/What-we-offer" },
  { label: "Our Works", href: "/Our-works" },
  { label: "Pricing", href: "/Pricing" },
  { label: "Contact", href: "/Contact" },
];

const SOCIALS = [
  {
    Icon: IoLogoInstagram,
    label: "Instagram",
    href: "https://www.instagram.com/darawilliam.s/",
  },
  {
    Icon: FaLinkedinIn,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ken-williams-2828111b5/",
  },
  {
    Icon: FaFacebookF,
    label: "Facebook",
    href: "https://www.facebook.com/share/1FVERFwxfo/?mibextid=wwXIfr",
  },
  {
    Icon: FaTiktok,
    label: "TikTok",
    href: "https://www.tiktok.com/@dara__studios",
  },
];

const BRAND_LETTERS = [
  "E", "k", "h", "o", "\u00A0", "S", "t", "u", "d", "i", "o", "s",
];

const letterVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: "easeOut" as const,
      delay: i * 0.045,
    },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: "easeOut" as const },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.9, ease: "easeOut" as const },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const linkItem = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const socialItem = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export default function Footer() {
  return (
    <footer className="relative bg-black text-white overflow-hidden">

      {/* Gradient Glow Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-150 h-150 bg-[#000000] blur-[180px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">

        {/* ─── TOP SECTION ───────────────── */}
        <div className="flex lg:flex-row flex-col gap-10 lg:gap-0 justify-between">

          {/* Navigation */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col gap-4"
          >
            <motion.h4
              variants={fadeUp}
              className="text-sm text-white/20"
            >
              Quick Links
            </motion.h4>

            <div className="flex flex-col lg:flex-row gap-3">
              {NAV_LINKS.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  variants={linkItem}
                  className="group relative w-fit text-lg text-white/50 hover:text-white transition"
                >
                  {link.label}
                  <span className="absolute left-0 bottom-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Socials */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col gap-4"
          >
            <motion.h4
              variants={fadeUp}
              className="text-sm text-white/20"
            >
              Follow us on
            </motion.h4>

            <div className="flex gap-4">
              {SOCIALS.map(({ Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  variants={socialItem}
                  className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/30 transition"
                >
                  <Icon size={18} />
                  <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 bg-white/10 blur-md transition" />
                </motion.a>
              ))}
            </div>
          </motion.div>

        </div>
        {/* ─── END TOP SECTION ───────────────── */}

        {/* ─── BRAND WORDMARK ───────────────── */}
        <div className="my-10 md:my-14 overflow-hidden">
          <motion.div
            className="flex flex-wrap"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.4 }}
          >
            {BRAND_LETTERS.map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                className="inline-block font-black leading-none tracking-tight text-white"
                style={{
                  fontSize: "clamp(1rem, 14vw, 12rem)",
                  lineHeight: 0.9,
                }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>
        </div>
        {/* ─── END BRAND WORDMARK ───────────────── */}

        {/* ─── LEGAL / DESCRIPTION ───────────────── */}
        <motion.p
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-white/40 text-sm font-light leading-relaxed"
        >
          Ekho Studios (&quot;Ekho&quot;) is a creative production studio offering
          professional product videography services to brands, businesses, and
          individual clients across Nigeria and beyond. All video productions
          are executed by our in-house creative team and delivered in
          high-definition formats optimised for digital platforms including
          Instagram, TikTok, YouTube, and e-commerce storefronts.{" "}
          <br />
          Each project scope, timeline, and deliverable specification is agreed
          upon in writing prior to production commencement. Any previews, mood
          boards, or reference materials shared during pre-production are
          illustrative in nature and may not reflect the exact outcome of the
          final production, which is subject to creative direction, available
          equipment, location conditions, and client-approved briefs. Pricing
          displayed on our rate card reflects standard package rates and may
          vary based on project complexity, travel requirements, usage rights,
          and the number of revisions requested beyond the agreed allowance.{" "}
          <br />
          By engaging Ekho Studios for a project, clients confirm acceptance of
          our production terms, payment schedule, and intellectual property
          agreement, copies of which are provided at the time of booking. Ekho
          Studios retains the right to feature completed work in its portfolio
          and on its social media channels unless a confidentiality clause is
          explicitly agreed upon in the project contract.
        </motion.p>

        {/* ─── BOTTOM BAR ───────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="mt-12 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-white font-light text-sm">
            © {new Date().getFullYear()} Ekho Studios
          </p>
        </motion.div>
        {/* ─── END BOTTOM BAR ───────────────── */}

      </div>

    </footer>
  );
}