"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import Button from "./Button";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Our Story", href: "/Our-story" },
  { label: "What we offer", href: "/What-we-offer" },
  { label: "Our Works", href: "/Our-works" },
  { label: "Pricing", href: "/Pricing" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
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

  // Scroll to top instantly whenever the route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  // Called on every nav link click — scrolls to top before navigation
  const handleNavClick = useCallback(() => {
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  return (
    <section>
      <nav
        style={{ zIndex: 9999 }}
        className={`
          fixed top-0 left-0 w-full
          transition-all duration-500 ease-in-out
          ${scrolled
            ? "py-3 bg-linear-to-b from-black to-transparent backdrop-blur-xs"
            : "py-6 bg-transparent"}
        `}
      >
        <div className="px-6 md:px-10 flex items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            onClick={handleNavClick}
            className="group flex items-center gap-2.5 shrink-0 border border-white/10 rounded-full px-4 py-2"
          >
            <Image src="/Logo.png" alt="Logo" width={20} height={20} style={{ height: "auto" }} />
            <span className="text-white text-sm lg:text-lg font-light group-hover:tracking-widest transition-all duration-500">
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
                    onClick={handleNavClick}
                    className={`
                      group relative text-lg font-light transition-colors duration-300
                      ${active ? "text-white" : "text-white/40 hover:text-white"}
                    `}
                  >
                    {label}
                    <span className="absolute left-0 -bottom-2 w-full overflow-hidden pointer-events-none">
                      <svg
                        viewBox="0 0 100 10"
                        preserveAspectRatio="none"
                        className={`
                          w-full h-[6px] origin-left
                          transition-all duration-300 ease-out
                          ${active
                            ? "opacity-100 scale-x-100 stroke-white"
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
            <div className="hidden md:flex items-center gap-4 lg:gap-10">
              <Button
                text="Let's get started"
                textsecond="Contact us"
                textColor="text-[#fff]"
                border="border border-white"
              />
            </div>

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

      {/* ── Mobile fullscreen overlay ── */}
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
                onClick={handleNavClick}
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
              onClick={handleNavClick}
              className="
                inline-flex items-center gap-3 px-7 py-3.5 rounded-full
                border border-white/20 hover:border-white/50
                text-[16px] capitalize font-light text-white/60 hover:text-white
                transition-all duration-300
              "
            >
              Let's get started
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div
          className={`px-8 pb-10 flex items-center justify-between transition-opacity duration-500 ${isOpen ? "opacity-100" : "opacity-0"}`}
          style={{ transitionDelay: isOpen ? "440ms" : "0ms" }}
        >
          <span className="text-[14px] text-white/20">Ekho Studios</span>
          <span className="text-[14px] text-white/20">© {new Date().getFullYear()}</span>
        </div>
      </div>
    </section>
  );
}