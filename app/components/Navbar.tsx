"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Company", href: "/Company" },
  { label: "What We Do", href: "/services" },
  { label: "Projects",   href: "/projects" },
];

export default function Navbar() {
  const [isOpen,   setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <nav
        style={{ zIndex: 9999 }}
        className={`
          fixed top-0 left-0 w-full
          transition-all duration-500 ease-in-out
          ${scrolled
            ? "py-3 bg-black/60 backdrop-blur-md border-b border-white/5"
            : "py-6 bg-transparent"}
        `}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2.5 shrink-0">
            <span className="
              relative flex items-center justify-center
              w-8 h-8 rounded-full border border-white/20
              group-hover:border-white/60 transition-colors duration-300
            ">
              <span className="w-1.5 h-1.5 rounded-full bg-white group-hover:scale-125 transition-transform duration-300" />
            </span>
            <span className="
              text-white text-sm font-light tracking-[0.2em] uppercase
              group-hover:tracking-[0.28em] transition-all duration-500
            ">
              Ekho Studios
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="
                    group relative text-[11px] font-light tracking-[0.18em] uppercase
                    text-white/40 hover:text-white transition-colors duration-300
                  "
                >
                  {label}
                  <span className="
                    absolute -bottom-0.5 left-0 h-px w-0 bg-white/60
                    group-hover:w-full transition-all duration-300 ease-out
                  " />
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA + mobile burger */}
          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="
                hidden md:inline-flex items-center gap-2
                px-5 py-2 rounded-full
                border border-white/20 hover:border-white/60
                text-[11px] tracking-[0.18em] uppercase font-light text-white/70 hover:text-white
                transition-all duration-300
              "
            >
              Contact Us
              <span className="w-1 h-1 rounded-full bg-white/50" />
            </Link>

            {/* Burger */}
            <button
              aria-label={isOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsOpen((v) => !v)}
              className="md:hidden flex flex-col justify-center items-end gap-1.5 w-8 h-8 relative"
              style={{ zIndex: 10000 }} // always above the overlay
            >
              <span className={`
                block h-px bg-white transition-all duration-300 origin-right
                ${isOpen ? "w-6 -rotate-45 translate-y-[3px]" : "w-6"}
              `} />
              <span className={`
                block h-px bg-white transition-all duration-300
                ${isOpen ? "w-0 opacity-0" : "w-4"}
              `} />
              <span className={`
                block h-px bg-white transition-all duration-300 origin-right
                ${isOpen ? "w-6 rotate-45 -translate-y-[3px]" : "w-6"}
              `} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile fullscreen overlay — z-[9998] ──────────────── */}
      <div
        style={{ zIndex: 9998 }}
        className={`
          fixed inset-0 flex flex-col
          bg-black backdrop-blur-lg
          transition-all duration-500 ease-in-out
          ${isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"}
        `}
      >
        {/* Links */}
        <div className="flex flex-col justify-center flex-1 px-8 pt-24 pb-12 gap-2">
          {NAV_LINKS.map(({ label, href }, i) => (
            <Link
              key={label}
              href={href}
              onClick={() => setIsOpen(false)}
              className={`
                group flex items-baseline gap-4
                py-5 border-b border-white/10
                transition-all duration-500
                ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}
              `}
              style={{ transitionDelay: isOpen ? `${i * 80 + 100}ms` : "0ms" }}
            >
              <span className="text-[10px] text-white/20 tabular-nums w-4">
                0{i + 1}
              </span>
              <span className="text-4xl font-extralight tracking-tight text-white/60 group-hover:text-white transition-colors duration-300">
                {label}
              </span>
            </Link>
          ))}

          {/* Mobile CTA */}
          <div
            className={`
              mt-10 transition-all duration-500
              ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
            `}
            style={{ transitionDelay: isOpen ? "380ms" : "0ms" }}
          >
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="
                inline-flex items-center gap-3
                px-7 py-3.5 rounded-full
                border border-white/20 hover:border-white/50
                text-[11px] tracking-[0.2em] uppercase font-light text-white/60 hover:text-white
                transition-all duration-300
              "
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Bottom strip */}
        <div
          className={`
            px-8 pb-10 flex items-center justify-between
            transition-opacity duration-500
            ${isOpen ? "opacity-100" : "opacity-0"}
          `}
          style={{ transitionDelay: isOpen ? "440ms" : "0ms" }}
        >
          <span className="text-[10px] tracking-widest text-white/20 uppercase">Ekho Studios</span>
          <span className="text-[10px] tracking-widest text-white/20 uppercase">© {new Date().getFullYear()}</span>
        </div>
      </div>
    </>
  );
}