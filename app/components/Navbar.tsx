"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Company",       href: "/Company"     },
  { label: "What we offer", href: "/Ourservices" },
  { label: "Projects",      href: "/Projects"    },
];

// Reusable zigzag SVG so we don't repeat markup
function Zigzag({ visible }: { visible: boolean }) {
  return (
    <span className="absolute left-0 -bottom-2 w-full overflow-hidden pointer-events-none">
      <svg
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
        className={`
          w-full h-[6px] origin-left
          transition-all duration-300 ease-out
          ${visible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"}
        `}
      >
        <path
          d="M0 5 L5 0 L10 5 L15 0 L20 5 L25 0 L30 5 L35 0 L40 5 L45 0 L50 5 L55 0 L60 5 L65 0 L70 5 L75 0 L80 5 L85 0 L90 5 L95 0 L100 5"
          fill="none"
          strokeWidth="1.5"
          // Active = full white, hover = white/60 (controlled by group-hover on parent)
          className="stroke-white/60"
        />
      </svg>
    </span>
  );
}

export default function Navbar() {
  const [isOpen,   setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Exact match OR sub-path match (e.g. /Company/team still highlights Company)
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <section>
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
        <div className="max-w-360 mx-auto px-6 md:px-10 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2.5 shrink-0">
            <span className="
              relative flex items-center justify-center
              w-8 h-8 rounded-full border border-white/20
              group-hover:border-white/60 transition-colors duration-300
            ">
              <span className="w-1.5 h-1.5 rounded-full bg-white group-hover:scale-125 transition-transform duration-300" />
            </span>
            <span className="text-white text-sm lg:text-lg font-light group-hover:tracking-[0.28em] transition-all duration-500">
              Ekho Studios
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map(({ label, href }) => {
              const active = isActive(href);
              return (
                <li key={label}>
                  <Link
                    href={href}
                    className={`
                      group relative text-lg font-light transition-colors duration-300
                      ${active ? "text-white" : "text-white/80 hover:text-white"}
                    `}
                  >
                    {label}
                    {/*
                      Show zigzag when:
                      - active  → always visible (scale-x-100, opacity-100)
                      - !active → only on group-hover (handled inside Zigzag via group-hover classes)

                      We pass visible=true for active links.
                      For inactive links, visible=false so the base state is hidden,
                      but the group-hover CSS on the svg overrides that.
                    */}
                    <span className="absolute left-0 -bottom-2 w-full overflow-hidden pointer-events-none">
                      <svg
                        viewBox="0 0 100 10"
                        preserveAspectRatio="none"
                        className={`
                          w-full h-[6px] origin-left
                          transition-all duration-300 ease-out
                          ${active
                            // Active: always fully visible, full white
                            ? "opacity-100 scale-x-100 stroke-white"
                            // Inactive: hidden by default, appears on hover at 60% white
                            : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100 stroke-white/60"
                          }
                        `}
                      >
                        <path
                          d="M0 5 L5 0 L10 5 L15 0 L20 5 L25 0 L30 5 L35 0 L40 5 L45 0 L50 5 L55 0 L60 5 L65 0 L70 5 L75 0 L80 5 L85 0 L90 5 L95 0 L100 5"
                          fill="none"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA + mobile burger */}
          <div className="flex items-center gap-4">
            <Link
              href="/Contact"
              className="
                hidden md:inline-flex items-center gap-2
                px-5 py-2 rounded-full
                border border-white/20 hover:border-white/60
                text-[11px] lg:text-lg capitalize font-light text-white/70 hover:text-white
                transition-all duration-300
              "
            >
              Contact Us
            </Link>

            {/* Burger */}
            <button
              aria-label={isOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsOpen((v) => !v)}
              className="md:hidden relative flex flex-col items-center justify-center w-8 h-8"
              style={{ zIndex: 10000 }}
            >
              <span className={`absolute h-px bg-white transition-all duration-300 ease-in-out origin-center ${isOpen ? "w-5 rotate-45 translate-y-0" : "w-5 -translate-y-[5px]"}`} />
              <span className={`absolute h-px bg-white transition-all duration-300 ease-in-out origin-center ${isOpen ? "w-0 opacity-0" : "w-3 opacity-100"}`} />
              <span className={`absolute h-px bg-white transition-all duration-300 ease-in-out origin-center ${isOpen ? "w-5 -rotate-45 translate-y-0" : "w-5 translate-y-[5px]"}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile fullscreen overlay ─────────────────────────── */}
      <div
        style={{ zIndex: 9998 }}
        className={`
          fixed inset-0 flex flex-col bg-black backdrop-blur-lg
          transition-all duration-500 ease-in-out
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      >
        <div className="flex flex-col justify-center flex-1 px-8 pt-24 pb-12 gap-2">
          {NAV_LINKS.map(({ label, href }, i) => {
            const active = isActive(href);
            return (
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
                <span className={`
                  text-4xl font-extralight tracking-tight transition-colors duration-300
                  ${active ? "text-white" : "text-white/60 group-hover:text-white"}
                `}>
                  {label}
                  {/* Active dot indicator on mobile */}
                  {active && (
                    <span className="inline-block ml-3 w-1.5 h-1.5 rounded-full bg-white/50 align-middle" />
                  )}
                </span>
              </Link>
            );
          })}

          {/* Mobile CTA */}
          <div
            className={`mt-10 transition-all duration-500 ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: isOpen ? "380ms" : "0ms" }}
          >
            <Link
              href="/Contact"
              onClick={() => setIsOpen(false)}
              className="
                inline-flex items-center gap-3 px-7 py-3.5 rounded-full
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
          className={`px-8 pb-10 flex items-center justify-between transition-opacity duration-500 ${isOpen ? "opacity-100" : "opacity-0"}`}
          style={{ transitionDelay: isOpen ? "440ms" : "0ms" }}
        >
          <span className="text-[10px] tracking-widest text-white/20 uppercase">Ekho Studios</span>
          <span className="text-[10px] tracking-widest text-white/20 uppercase">© {new Date().getFullYear()}</span>
        </div>
      </div>
    </section>
  );
}