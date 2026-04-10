"use client";
import { FaLinkedinIn, FaFacebookF, FaTiktok } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";

const NAV_LINKS = ["Company", "What We Do", "Projects", "Courses"];
const SOCIALS = [
  { Icon: IoLogoInstagram, label: "Instagram", href: "https://www.instagram.com/darawilliam.s" },
  { Icon: FaLinkedinIn, label: "LinkedIn", href: "https://www.linkedin.com/in/ken-williams-2828111b5/" },
  { Icon: FaFacebookF, label: "Facebook", href: "https://www.facebook.com/share/18ZDG6NeKN/?mibextid=wwXIfr" },
  { Icon: FaTiktok, label: "TikTok", href: "https://www.tiktok.com/@dara__studios?_r=1&_t=ZS-95QzCaowHtR" },
];

// Shapes rendered at the bottom of the footer
function FooterShapes() {
  return (
    <div className="relative w-full h-48 md:h-64 overflow-hidden pointer-events-none select-none" aria-hidden="true">

      {/* Large circle — left anchor */}
      <div className="absolute -bottom-16 -left-16 w-64 h-64 md:w-80 md:h-80 rounded-full border border-white/5 bg-white/[0.10]" />

      {/* Medium circle — overlapping left */}
      <div className="absolute -bottom-8 left-24 w-40 h-40 md:w-56 md:h-56 rounded-full border border-white/[0.06] bg-white/[0.10]" />

      {/* Rotated square — centre */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-20 h-20 md:w-28 md:h-28 rounded-2xl border border-white/[0.07] bg-white/[0.10] rotate-[22deg]" />

      {/* Blob — centre-right */}
      <div
        className="absolute -bottom-10 right-1/4 w-52 h-52 md:w-72 md:h-72 bg-white/[0.10] border border-white/[0.04]"
        style={{ borderRadius: "60% 40% 70% 30% / 40% 60% 30% 70%" }}
      />

      {/* Small circle — far right */}
      <div className="absolute -bottom-12 -right-8 w-48 h-48 md:w-64 md:h-64 rounded-full border border-white/[0.05] bg-white/[0.10]" />

      {/* Tiny pill — floating accent */}
      <div className="absolute bottom-12 right-1/3 w-24 h-8 rounded-full border border-white/[0.08] bg-white/[0.10]" />

      {/* Bottom fade so shapes dissolve into black */}
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black to-transparent" />
      {/* Top fade so shapes emerge from the section above */}
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black to-transparent" />
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative w-full bg-black z-50 overflow-hidden">

      {/* ── Thin top rule ─────────────────────────────────────── */}
      <div className="relative z-10 mx-6 sm:mx-10 md:mx-20 lg:mx-32">
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      {/* ── Main content ──────────────────────────────────────── */}
      <div className="relative z-10 px-6 sm:px-10 md:px-20 lg:px-20 pt-16 pb-4 md:pt-24 md:pb-6">

        {/* Top row: name + nav */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 md:gap-0">

          {/* Name block */}
          <div className="flex flex-col gap-3">
            {/* <span className="text-[10px] tracking-[0.3em] text-white/30 uppercase">
              Product Videographer
            </span> */}
            <h2
              className="text-[clamp(3rem,10vw,6rem)] font-black leading-[0.9] tracking-tight text-white"
              style={{ textShadow: "0 0 80px rgba(255,255,255,0.07)" }}
            >
              Ekho<br />Studios
            </h2>
            <p className="mt-2 text-sm lg:text-xl text-white/30 max-w-xs leading-tight">
              Crafting visual narratives that make products impossible to ignore.
            </p>
          </div>

          {/* Right column: nav + socials */}
          <div className="flex flex-col items-start gap-6">
            <nav className="flex flex-col items-start gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative text-xl md:text-2xl font-light text-white/40 hover:text-white transition-colors duration-300"
                >
                  {link}
                  <span className="absolute -bottom-0.5 left-0 md:left-auto md:right-0 h-px w-0 group-hover:w-full bg-white transition-all duration-300 ease-out" />
                </a>
              ))}
            </nav>

            <div className="flex gap-2">
              {SOCIALS.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
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
        <div className="mt-12 md:mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-[11px] lg:text-[16px] text-white/90 capitalize">
            &copy; {new Date().getFullYear()} Ekho Studios. All rights reserved.
          </p>
          <p className="text-[11px] lg:text-[16px] text-white/90 capitalize">
            📍Based in Lagos, Nigeria
          </p>
        </div>
      </div>

      {/* ── Geometric shapes at the bottom ───────────────────── */}
      <FooterShapes />

    </footer>
  );
}