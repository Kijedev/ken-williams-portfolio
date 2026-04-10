"use client";
import { FaLinkedinIn, FaFacebookF, FaTiktok } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";

const NAV_LINKS = ["Work", "Services", "About", "Contact"];
const SOCIALS = [
  { Icon: IoLogoInstagram, label: "Instagram" },
  { Icon: FaLinkedinIn,   label: "LinkedIn"  },
  { Icon: FaFacebookF,    label: "Facebook"  },
  { Icon: FaTiktok,       label: "TikTok"    },
];

export default function Footer() {
  return (
    <footer className="relative w-full bg-black relative z-50 overflow-hidden">

      {/* ── Cinematic image backdrop ──────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <img
          src="/geoshapes.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center opacity-30"
        />
        {/* vignette — top */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-transparent" />
        {/* vignette — bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        {/* vignette — sides */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
      </div>

      {/* ── Thin top rule ─────────────────────────────────────── */}
      <div className="relative z-10 mx-6 sm:mx-10 md:mx-20 lg:mx-32">
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      {/* ── Main content ──────────────────────────────────────── */}
      <div className="relative z-10 px-6 sm:px-10 md:px-20 lg:px-32 pt-16 pb-12 md:pt-24 md:pb-16">

        {/* Top row: name + nav */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 md:gap-0">

          {/* Name block */}
          <div className="flex flex-col gap-3">
            {/* Eyebrow */}
            <span className="text-[10px] tracking-[0.3em] text-white/30 uppercase">
              Product Videographer
            </span>

            {/* Big name — letterpress feel */}
            <h2
              className="text-[clamp(3rem,10vw,8rem)] font-black leading-[0.9] tracking-tight text-white"
              style={{ textShadow: "0 0 80px rgba(255,255,255,0.07)" }}
            >
              Dara<br />Williams
            </h2>

            {/* Tagline */}
            <p className="mt-2 text-sm text-white/30 max-w-xs leading-relaxed">
              Crafting visual narratives that make products impossible to ignore.
            </p>
          </div>

          {/* Right column: nav + socials */}
          <div className="flex flex-col items-start md:items-end gap-6">
            <nav className="flex flex-col items-start md:items-end gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="group relative text-xl md:text-2xl font-light text-white/40 hover:text-white transition-colors duration-300"
                >
                  {link}
                  {/* underline slide-in */}
                  <span className="absolute -bottom-0.5 left-0 md:left-auto md:right-0 h-px w-0 group-hover:w-full bg-white transition-all duration-300 ease-out" />
                </a>
              ))}
            </nav>

            {/* Social icons */}
            <div className="flex gap-2">
              {SOCIALS.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="
                    flex items-center justify-center w-10 h-10
                    border border-white/10 rounded-full
                    text-white/40 hover:text-white hover:border-white/40
                    transition-all duration-300
                  "
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom bar ──────────────────────────────────────── */}
        <div className="mt-16 md:mt-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-[11px] tracking-widest text-white/20 uppercase">
            &copy; {new Date().getFullYear()} Dara Williams. All rights reserved.
          </p>
          <p className="text-[11px] tracking-widest text-white/20 uppercase">
            Based in Los Angeles, CA
          </p>
        </div>
      </div>

    </footer>
  );
}