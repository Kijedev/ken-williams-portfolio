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
  { Icon: IoLogoInstagram, label: "Instagram", href: "https://www.instagram.com/darawilliam.s/" },
  { Icon: FaLinkedinIn, label: "LinkedIn", href: "https://www.linkedin.com/in/ken-williams-2828111b5/" },
  { Icon: FaFacebookF, label: "Facebook", href: "https://www.facebook.com/share/1FVERFwxfo/?mibextid=wwXIfr" },
  { Icon: FaTiktok, label: "TikTok", href: "https://www.tiktok.com/@dara__studios" },
];

export default function Footer() {
  return (
    <footer className="relative bg-black text-white overflow-hidden">

      {/* Gradient Glow Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-150 h-150 bg-[#000000] blur-[180px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">

        {/* ─── TOP SECTION ───────────────── */}
        <div className="flex lg:flex-row flex-col justify-between items-center gap-4">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <h2 className="text-[clamp(3rem,7vw,5rem)] font-black leading-[0.7] tracking-tight">
              Ekho <br /> Studios
            </h2>
            <p className="text-white/40 max-w-xs text-sm leading-relaxed">
              Crafting cinematic product stories that elevate brands, capture attention, and drive real results.
            </p>
          </motion.div>

          <div className="w-px h-48 bg-linear-to-b from-transparent via-white/20 to-transparent lg:flex hidden" />

          <div className="flex lg:flex-row flex-col gap-10 lg:ml-0 -ml-20 lg:mt-0 mt-6">
            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col gap-4"
            >
              <h4 className="text-sm text-white/20">
                Quick Links
              </h4>

              <div className="flex flex-col gap-3">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="group relative w-fit text-lg text-white/50 hover:text-white transition"
                  >
                    {link.label}
                    <span className="absolute left-0 bottom-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col gap-4"
            >
              <h4 className="text-sm text-white/20">
                Follow us on
              </h4>

              <div className="flex gap-4">
                {SOCIALS.map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    aria-label={label}
                    className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/30 transition"
                  >
                    <Icon size={18} />

                    {/* glow */}
                    <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 bg-white/10 blur-md transition" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ─── MIDDLE DIVIDER ───────────────── */}
        <div className="my-16 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

        {/* ─── LEGAL / DESCRIPTION ───────────────── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-white/40 text-sm font-light leading-relaxed text-justify"
        >
          Ekho Studios ("Ekho") is a creative production studio offering professional product videography services to brands, businesses, and individual clients across Nigeria and beyond. All video productions are executed by our in-house creative team and delivered in high-definition formats optimised for digital platforms including Instagram, TikTok, YouTube, and e-commerce storefronts. Each project scope, timeline, and deliverable specification is agreed upon in writing prior to production commencement. Any previews, mood boards, or reference materials shared during pre-production are illustrative in nature and may not reflect the exact outcome of the final production, which is subject to creative direction, available equipment, location conditions, and client-approved briefs. Pricing displayed on our rate card reflects standard package rates and may vary based on project complexity, travel requirements, usage rights, and the number of revisions requested beyond the agreed allowance. By engaging Ekho Studios for a project, clients confirm acceptance of our production terms, payment schedule, and intellectual property agreement, copies of which are provided at the time of booking. Ekho Studios retains the right to feature completed work in its portfolio and on its social media channels unless a confidentiality clause is explicitly agreed upon in the project contract
        </motion.p>

        {/* ─── BOTTOM BAR ───────────────── */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white font-light text-sm">
            © {new Date().getFullYear()} Ekho Studios
          </p>
        </div>
      </div>
    </footer>
  );
}