"use client";
import { FaLinkedinIn, FaFacebookF, FaTiktok } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";

const NAV_LINKS = [
  { label: "Our Story", href: "/Our-story" },
  { label: "What we offer", href: "/What-we-offer" },
  { label: "Our Works", href: "/Our-works" },
  { label: "Pricing", href: "/Pricing" },
  { label: "Contact Us", href: "/Contact" },
];
const SOCIALS = [
  { Icon: IoLogoInstagram, label: "Instagram", href: "https://www.instagram.com/darawilliam.s" },
  { Icon: FaLinkedinIn, label: "LinkedIn", href: "https://www.linkedin.com/in/ken-williams-2828111b5/" },
  { Icon: FaFacebookF, label: "Facebook", href: "https://www.facebook.com/share/18ZDG6NeKN/?mibextid=wwXIfr" },
  { Icon: FaTiktok, label: "TikTok", href: "https://www.tiktok.com/@dara__studios?_r=1&_t=ZS-95QzCaowHtR" },
];

function FooterShapes() {
  return (
    <div className="relative w-full h-48 md:h-48 overflow-hidden pointer-events-none select-none" aria-hidden="true">
      {/* Large circle — left anchor */}
      <div className="absolute -bottom-16 left-0 w-64 h-64 md:w-80 md:h-80 rounded-full border border-white/5 bg-white/10" />

      {/* Medium circle — overlapping left */}
      <div className="absolute -bottom-8 lg:left-80 left-24 w-40 h-40 md:w-56 md:h-56 rounded-full border border-white/6 bg-white/10" />

      {/* Blob — centre-right */}
      <div
        className="absolute -bottom-10 right-56 w-52 h-52 md:w-72 md:h-72 bg-white/10 border border-white/4"
        style={{ borderRadius: "60% 40% 70% 30% / 40% 60% 30% 70%" }}
      />

      {/* Small circle — far right */}
      <div className="absolute -bottom-12 -right-8 w-48 h-48 md:w-64 md:h-64 rounded-full border border-white/5 bg-white/10" />

      <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-black to-transparent" />
      <div className="absolute inset-x-0 top-0 h-16 bg-linear-to-b from-black to-transparent" />
    </div>
  );
}

export default function Page() {
  return (
    <footer className="relative w-full bg-black overflow-hidden">
      {/* ── Thin top rule ── */}
      {/* <div className="relative z-10 mx-6 sm:mx-10 md:mx-20 lg:mx-32">
        <div className="h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
      </div> */}

      {/* ── Main content ── */}
      <div className="relative z-10 px-6 sm:px-10 md:px-20 lg:px-20 pt-16 pb-4 md:pt-24 md:pb-6">

        {/* Top row: name + nav */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 md:gap-0">

          {/* Name block */}
          <div className="flex flex-col gap-3">
            <h2
              className="text-[clamp(3rem,10vw,6rem)] font-black leading-[0.9] tracking-tight text-white"
              style={{ textShadow: "0 0 80px rgba(255,255,255,0.07)" }}
            >
              Ekho Studios
            </h2>
            <p className="mt-2 text-sm lg:text-lg text-white/30 max-w-sm leading-tight">
              Crafting visual narratives that make products impossible to ignore.
            </p>
          </div>

          {/* Right column: nav + socials */}
          <div className="flex flex-col items-start lg:items-end gap-6">
            <nav className="flex flex-col items-start lg:items-start gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  rel="noopener noreferrer"
                  className="group relative text-xl md:text-2xl font-light text-white/40 hover:text-white transition-colors duration-300"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 md:left-auto md:right-0 h-px w-0 group-hover:w-full bg-linear-to-r from-white/40 to-transparent transition-all duration-300 ease-out" />
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="flex flex-col justify-center mt-10 gap-4">
          <p className="text-white/30 text-sm text-center hover:text-white transition-colors duration-300">Follow us on all our socials</p>
          <div className="flex justify-center mt-2 gap-4">
            {SOCIALS.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                className="
                    flex items-center justify-center w-20 h-20
                    border border-white/5 rounded-full
                    text-white/50 hover:text-white hover:border-white/40
                    transition-all duration-300
                  "
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        <p className="text-[13px] lg:text-justify lg:text-[16px] leading-relaxed text-white/30 font-light capitalize mt-10">Ekho Studios ("Ekho") is a creative production studio offering professional product videography services to brands, businesses, and individual clients across Nigeria and beyond. All video productions are executed by our in-house creative team and delivered in high-definition formats optimised for digital platforms including Instagram, TikTok, YouTube, and e-commerce storefronts. Each project scope, timeline, and deliverable specification is agreed upon in writing prior to production commencement. Any previews, mood boards, or reference materials shared during pre-production are illustrative in nature and may not reflect the exact outcome of the final production, which is subject to creative direction, available equipment, location conditions, and client-approved briefs. Pricing displayed on our rate card reflects standard package rates and may vary based on project complexity, travel requirements, usage rights, and the number of revisions requested beyond the agreed allowance. By engaging Ekho Studios for a project, clients confirm acceptance of our production terms, payment schedule, and intellectual property agreement, copies of which are provided at the time of booking. Ekho Studios retains the right to feature completed work in its portfolio and on its social media channels unless a confidentiality clause is explicitly agreed upon in the project contract</p>

        <div className="mt-12 md:mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-[13px] lg:text-[16px] font-light text-white/90 capitalize">
            &copy; {new Date().getFullYear()} Ekho Studios. All rights reserved.
          </p>
        </div>
      </div>
      <FooterShapes />
    </footer>
  );
}