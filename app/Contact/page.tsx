"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type FormState = "idle" | "sending" | "sent";

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

const CONTACT_DETAILS = [
  { label: "Email",    value: "contact@ekhostudios.com", href: "mailto:contact@ekhostudios.com" },
  { label: "Phone",    value: "+234 915 775 6380",        href: "tel:+2349157756380" },
  { label: "Location", value: "Lagos, Nigeria",           href: null },
];

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm lg:text-base capitalize text-white/70 font-light">
        {label}{required && <span className="ml-1 text-white/50">*</span>}
      </label>
      {children}
    </div>
  );
}

export default function ContactPage() {
  const [form, setForm]     = useState<FormData>({ name: "", email: "", company: "", message: "" });
  const [status, setStatus] = useState<FormState>("idle");

  const wrapperRef   = useRef<HTMLDivElement>(null);
  const heroRef      = useRef<HTMLDivElement>(null);
  const formPanelRef = useRef<HTMLDivElement>(null);
  const headingRef   = useRef<HTMLHeadingElement>(null);
  const subRef       = useRef<HTMLParagraphElement>(null);
  const dividerRef   = useRef<HTMLDivElement>(null);
  const detailsRef   = useRef<HTMLDivElement>(null);
  const orbitRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper   = wrapperRef.current;
    const hero      = heroRef.current;
    const formPanel = formPanelRef.current;
    if (!wrapper || !hero || !formPanel) return;

    const ctx = gsap.context(() => {

      // ── Entrance animations ──────────────────────────────────
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(headingRef.current,  { y: 50, opacity: 0, duration: 1.0 }, 0.15)
        .from(subRef.current,      { y: 24, opacity: 0, duration: 0.8 }, 0.4)
        .from(dividerRef.current,  { scaleX: 0, opacity: 0, duration: 0.9, transformOrigin: "left" }, 0.5)
        .from(detailsRef.current!.children, { y: 28, opacity: 0, stagger: 0.1, duration: 0.7 }, 0.6);
      gsap.to(orbitRef.current, { opacity: 1, duration: 1.2, delay: 0.8 });

      // ── The slide-over effect ────────────────────────────────
      //
      // Strategy:
      //   1. The wrapper is 200vh tall — it gives us scroll distance.
      //   2. ScrollTrigger pins the wrapper (not the hero directly).
      //      This means the wrapper stays fixed for 200vh of scroll travel.
      //   3. The form panel starts at translateY(100vh) — below the viewport.
      //   4. GSAP scrubs it to translateY(0) as the user scrolls,
      //      making it slide up OVER the hero which is sitting behind it.
      //   5. The hero fades + scales back simultaneously.
      //
      // The key: formPanel has position:absolute inside the pinned wrapper,
      // so it moves relative to the viewport, creating the "slides on top" illusion.

      // Form starts below viewport
      gsap.set(formPanel, { yPercent: 100 });

      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "+=100%",       // 1 viewport of scroll travel
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Form slides up from below
      tl2.to(formPanel, {
        yPercent: 0,
        ease: "power2.inOut",
        duration: 1,
      }, 0);

      // Hero dims and scales back
      tl2.to(hero, {
        scale: 0.94,
        opacity: 0.25,
        ease: "power2.inOut",
        duration: 1,
      }, 0);

    }, wrapper);

    return () => ctx.revert();
  }, []);

  const update = (k: keyof FormData, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1800));
    setStatus("sent");
  };

  const inputCls = `
    w-full bg-transparent border-b border-white/20
    focus:border-white/50 hover:border-white/30
    text-white/80 placeholder:text-white/25
    text-sm lg:text-lg font-light tracking-wide
    py-3 outline-none transition-colors duration-300
  `;

  return (
    <>
      <style>{`
        @keyframes orbit-spin { to { transform: rotate(360deg); } }
      `}</style>

      {/*
        ── Wrapper: 200vh tall, gets pinned by GSAP ──────────────
        Both hero + form panel live INSIDE this wrapper as stacked layers.
        Pinning the wrapper keeps everything in place while scroll progresses.
      */}
      <div
        ref={wrapperRef}
        style={{ height: "100vh", position: "relative", background: "#000" }}
      >

        {/*
          ── Hero layer: absolute, fills wrapper, sits behind form ──
          z-index 0 — the form (z-index 10) slides over this
        */}
        <div
          ref={heroRef}
          className="absolute inset-x-0 top-0 w-full overflow-hidden flex flex-col justify-center"
          style={{ height: "100vh", zIndex: 0 }}
        >
          {/* Glow */}
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] opacity-[0.05]"
            style={{ background: "radial-gradient(ellipse,#fff 0%,transparent 65%)" }} aria-hidden="true" />

          {/* Orbit rings */}
          <div ref={orbitRef}
            className="pointer-events-none absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full border border-white/10 opacity-0"
            style={{ animation: "orbit-spin 18s linear infinite" }} aria-hidden="true" />
          <div className="pointer-events-none absolute -top-20 -right-20 w-[320px] h-[320px] rounded-full border border-white/10" aria-hidden="true" />

          <div className="relative z-10 w-full px-6 sm:px-10 md:px-16 lg:px-24 pt-32 pb-24">
            <div className="flex flex-col gap-10">

              <h1
                ref={headingRef}
                className="text-[clamp(2.8rem,7vw,8rem)] uppercase font-extrabold leading-[0.95] tracking-tighter text-[#FEE9CE]"
              >
                Let's make <br /> something<br />
                <em className="not-italic text-[#EF5143] capitalize">unforgettable.</em>
              </h1>

              <p ref={subRef} className="max-w-2xl text-sm lg:text-lg text-white/35 font-light leading-relaxed">
                Whether you have a full brief or just a product and a vision, reach out and we'll figure out the rest together.
              </p>

              <div ref={dividerRef} className="h-px bg-gradient-to-r from-white/15 via-white/8 to-transparent" />

              <div ref={detailsRef} className="flex flex-col lg:flex-row gap-10 w-full">
                {CONTACT_DETAILS.map(({ label, value, href }) => (
                  <div key={label} className="flex flex-col gap-1">
                    <span className="text-lg capitalize text-[#FEE9CE]">{label}</span>
                    {href ? (
                      <a href={href} className="text-sm font-light text-white/50 hover:text-white transition-colors duration-300">{value}</a>
                    ) : (
                      <span className="text-sm font-light text-white/60">{value}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/*
          ── Form panel: absolute, starts BELOW viewport (yPercent:100) ──
          z-index 10 — slides up over the hero
          borderRadius on top gives the "card lifting" feel
        */}
        <div
          ref={formPanelRef}
          className="absolute inset-x-0 top-0 w-full flex flex-col justify-center overflow-y-hidden"
          style={{
            height: "100vh",
            zIndex: 10,
            background: "black",
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
            boxShadow: "0 -24px 80px rgba(0,0,0,0.9), 0 -1px 0 rgba(255,255,255,0.06)",
            willChange: "transform",
          }}
        >
          {/* Thin top handle line */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-white/10" aria-hidden="true" />

          <div className="relative w-full mx-auto px-6 sm:px-10 md:px-16 lg:px-24 py-16 md:py-20">

            {/* Panel heading */}
            <div className="mb-10">
              <p className="text-[10px] tracking-[0.35em] uppercase text-white/20 mb-3">
                Get in touch
              </p>
              <h2
                className="text-[clamp(1.8rem,4vw,3.5rem)] font-extralight text-white/80 leading-tight tracking-tight"
                style={{ fontFamily: "'Cormorant Garamond',serif" }}
              >
                Tell us about <br />
                <em className="not-italic text-white/30">your project.</em>
              </h2>
            </div>

            {status === "sent" ? (
              <div className="flex flex-col items-start gap-6">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M3 9l4.5 4.5L15 5" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-2xl font-extralight text-white tracking-tight">Message received.</h3>
                <p className="text-sm text-white/35 font-light leading-relaxed max-w-xs">
                  Thanks for reaching out. I'll get back to you shortly.
                </p>
                <button
                  onClick={() => { setStatus("idle"); setForm({ name: "", email: "", company: "", message: "" }); }}
                  className="mt-2 text-sm text-white/30 hover:text-white transition-colors duration-300 border-b border-white/10 hover:border-white/40 pb-0.5"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <Field label="Name" required>
                    <input type="text" required placeholder="John Doe"
                      value={form.name} onChange={(e) => update("name", e.target.value)} className={inputCls} />
                  </Field>
                  <Field label="Email" required>
                    <input type="email" required placeholder="johndoe@gmail.com"
                      value={form.email} onChange={(e) => update("email", e.target.value)} className={inputCls} />
                  </Field>
                </div>

                <Field label="Company / Brand (Optional)">
                  <input type="text" placeholder="Meta"
                    value={form.company} onChange={(e) => update("company", e.target.value)} className={inputCls} />
                </Field>

                <Field label="Project brief" required>
                  <textarea required rows={4}
                    placeholder="Tell me about your product, the feel you're going for, and your timeline…"
                    value={form.message} onChange={(e) => update("message", e.target.value)}
                    className={`${inputCls} resize-none`} />
                </Field>

                <div className="flex items-center justify-between gap-6 pt-2">
                  <p className="text-xs text-white/25 font-light">* Required fields</p>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-white/20 hover:border-white/50 text-sm font-light text-white/60 hover:text-white transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "sending" ? (
                      <>
                        <span className="inline-flex gap-1">
                          {[0, 1, 2].map((i) => (
                            <span key={i} className="w-1 h-1 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                          ))}
                        </span>
                        Sending
                      </>
                    ) : (
                      <>
                        Send message
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                          className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300">
                          <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

      </div>
    </>
  );
}