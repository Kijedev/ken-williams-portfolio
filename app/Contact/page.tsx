"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FAQs from "../components/FAQs";
import Plan from "../components/Plan";

gsap.registerPlugin(ScrollTrigger);

type FormState = "idle" | "sending" | "sent" | "error";

interface FormData {
    name: string;
    email: string;
    company: string;
    budget: string;
    message: string;
}


const BUDGET_OPTIONS = [
    "Under $1,000",
    "$1,000 – $3,000",
    "$3,000 – $8,000",
    "$8,000+",
];

const CONTACT_DETAILS = [
    { label: "Email", value: "contact@ekhostudios.com", href: "contact@ekhostudios.com" },
    { label: "Phone", value: "+234 816 755 5952", href: "tel:+2348167555952" },
    { label: "Location", value: "Lagos, Nigeria", href: null },
];

function Field({
    label,
    required,
    children,
}: {
    label: string;
    required?: boolean;
    children: React.ReactNode;
}) {
    return (
        <div className="group flex flex-col gap-2">
            <label className="text-[10px] lg:text-xl capitalize text-white/80 font-light">
                {label}
                {required && <span className="ml-1 text-white/80">*</span>}
            </label>
            {children}
        </div>
    );
}

export default function page() {
    const [form, setForm] = useState<FormData>({ name: "", email: "", company: "", budget: "", message: "" });
    const [status, setStatus] = useState<FormState>("idle");

    // refs for GSAP
    const pageRef = useRef<HTMLElement>(null);
    const eyebrowRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const subRef = useRef<HTMLParagraphElement>(null);
    const detailsRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLDivElement>(null);
    const dividerRef = useRef<HTMLDivElement>(null);
    const orbitRef = useRef<HTMLDivElement>(null);

    // ── entrance animations ───
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.from(eyebrowRef.current, { y: 20, opacity: 0, duration: 0.7 }, 0.1)
                .from(headingRef.current, { y: 50, opacity: 0, duration: 1.0 }, 0.2)
                .from(subRef.current, { y: 24, opacity: 0, duration: 0.8 }, 0.45)
                .from(dividerRef.current, { scaleX: 0, opacity: 0, duration: 0.9, transformOrigin: "left" }, 0.55)
                .from(detailsRef.current!.children, { y: 28, opacity: 0, stagger: 0.1, duration: 0.7 }, 0.65)
                .from(formRef.current, { y: 40, opacity: 0, duration: 0.9 }, 0.5);

            // Orbit ring slow spin (CSS handles it but we set initial opacity)
            gsap.to(orbitRef.current, { opacity: 1, duration: 1.2, delay: 0.8 });

        }, pageRef);

        return () => ctx.revert();
    }, []);

    // ── form handling 
    const update = (k: keyof FormData, v: string) =>
        setForm((p) => ({ ...p, [k]: v }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");

        // Simulated send — replace with your real API call / EmailJS / Resend / etc.
        await new Promise((r) => setTimeout(r, 1800));
        setStatus("sent");
    };

    // ── shared input class ────────────────────────────────────────
    const inputCls = `
    w-full bg-transparent border-b border-white/20
    focus:border-white/40 hover:border-white/20
    text-white/80 placeholder:text-white/40
    text-sm lg:text-xl font-light tracking-wide
    py-3 outline-none transition-colors duration-300
  `;

    return (
        <>
            <style>{`
        @keyframes orbit-spin { to { transform: rotate(360deg); } }
        .orbit-ring { animation: orbit-spin 18s linear infinite; }
      `}</style>

            <main
                ref={pageRef}
                className="relative min-h-screen w-full bg-black text-white overflow-hidden"
            >

                {/* ── atmospheric glow ──────────────────────────────────── */}
                {/* <div
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] opacity-[0.055]"
          style={{ background: "radial-gradient(ellipse at center, #fff 0%, transparent 68%)" }}
          aria-hidden="true"
        /> */}

                {/* ── noise grain overlay ───────────────────────────────── */}
                {/* <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "180px 180px",
          }}
          aria-hidden="true"
        /> */}

                {/* ── decorative orbit ring (top-right) ────────────────── */}
                <div
                    ref={orbitRef}
                    className="orbit-ring pointer-events-none absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full border border-white/10 opacity-0"
                    aria-hidden="true"
                />
                <div
                    className="pointer-events-none absolute -top-20 -right-20 w-[320px] h-[320px] rounded-full border border-white/10"
                    aria-hidden="true"
                />

                {/* ── main grid ─────────────────────────────────────────── */}
                <div className="relative z-10 max-w-8xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 pt-32 md:pt-44 pb-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 xl:gap-32">

                        {/* ── LEFT: heading + info ────────────────────────────── */}
                        <div className="flex flex-col gap-10">

                            {/* Eyebrow */}
                            {/* <div ref={eyebrowRef}>
                <span className="inline-flex items-center gap-3 text-[10px] tracking-[0.35em] uppercase text-white/25">
                  <span className="w-6 h-px bg-white/20" />
                  Get in touch
                </span>
              </div> */}

                            {/* Heading */}
                            <h1
                                ref={headingRef}
                                className="text-[clamp(2.8rem,7vw,5.5rem)] font-extralight leading-none tracking-tight text-white"
                            >
                                Let's make something<br />
                                <em className="not-italic text-white/35">unforgettable.</em>
                            </h1>

                            {/* Sub */}
                            <p ref={subRef} className="text-sm lg:text-xl text-white/35 font-light leading-relaxed">
                                Whether you have a full brief or just a product and a vision, reach out and we'll
                                figure out the rest together.
                            </p>

                            {/* Divider */}
                            <div
                                ref={dividerRef}
                                className="h-px bg-linear-to-r from-white/15 via-white/8 to-transparent"
                            />

                            {/* Contact details */}
                            <div ref={detailsRef} className="flex flex-col lg:flex-row gap-5">
                                {CONTACT_DETAILS.map(({ label, value, href }) => (
                                    <div key={label} className="flex flex-col gap-1">
                                        <span className="text-[9px] tracking-[0.3em] uppercase text-white/50">
                                            {label}
                                        </span>
                                        {href ? (
                                            <a
                                                href={href}
                                                className="text-sm font-light text-white/80 hover:text-white transition-colors duration-300 tracking-wide"
                                            >
                                                {value}
                                            </a>
                                        ) : (
                                            <span className="text-sm font-light text-white/80 tracking-wide">{value}</span>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Availability badge */}
                            {/* <div className="inline-flex items-center gap-2.5 mt-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/40 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white/60" />
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-white/25">
                  Available for projects — Q3 2025
                </span>
              </div> */}
                        </div>

                        {/* ── RIGHT: form ─────────────────────────────────────── */}
                        <div ref={formRef}>
                            {status === "sent" ? (
                                // Success state
                                <div className="flex flex-col items-start justify-center h-full gap-6 py-16 ">
                                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                            <path d="M3 9l4.5 4.5L15 5" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <h2 className="text-2xl font-extralight text-white tracking-tight">
                                        Message received.
                                    </h2>
                                    <p className="text-sm text-white/35 font-light leading-relaxed max-w-xs">
                                        Thanks for reaching out. I'll review your project details and get back to you within 24 hours.
                                    </p>
                                    <button
                                        onClick={() => { setStatus("idle"); setForm({ name: "", email: "", company: "", budget: "", message: "" }); }}
                                        className="mt-4 text-[11px] tracking-[0.2em] uppercase text-white/30 hover:text-white transition-colors duration-300 border-b border-white/10 hover:border-white/40 pb-0.5"
                                    >
                                        Send another
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">

                                    {/* Name + Email */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                        <Field label="Name" required>
                                            <input
                                                type="text"
                                                required
                                                placeholder="Alex Carter"
                                                value={form.name}
                                                onChange={(e) => update("name", e.target.value)}
                                                className={inputCls}
                                            />
                                        </Field>
                                        <Field label="Email" required>
                                            <input
                                                type="email"
                                                required
                                                placeholder="alex@brand.com"
                                                value={form.email}
                                                onChange={(e) => update("email", e.target.value)}
                                                className={inputCls}
                                            />
                                        </Field>
                                    </div>

                                    {/* Company */}
                                    <Field label="Company / Brand">
                                        <input
                                            type="text"
                                            placeholder="Optional"
                                            value={form.company}
                                            onChange={(e) => update("company", e.target.value)}
                                            className={inputCls}
                                        />
                                    </Field>

                                    {/* Message */}
                                    <Field label="Project brief" required>
                                        <textarea
                                            required
                                            rows={5}
                                            placeholder="Tell me about your product, the feel you're going for, and your timeline…"
                                            value={form.message}
                                            onChange={(e) => update("message", e.target.value)}
                                            className={`${inputCls} resize-none`}
                                        />
                                    </Field>

                                    {/* Submit */}
                                    <div className="flex items-center justify-between gap-6 pt-2">
                                        <p className="text-[10px] lg:text-xl text-white/40 tracking-wide font-light">
                                            * Required fields
                                        </p>

                                        <button
                                            type="submit"
                                            disabled={status === "sending"}
                                            className="
                        group relative inline-flex items-center gap-3 overflow-hidden
                        px-8 py-3.5 rounded-full
                        border border-white/20 hover:border-white/50
                        text-[11px] tracking-[0.22em] uppercase font-light
                        text-white/60 hover:text-white
                        transition-all duration-300
                        disabled:opacity-50 disabled:cursor-not-allowed
                      "
                                        >
                                            {status === "sending" ? (
                                                <>
                                                    <span className="inline-flex gap-1">
                                                        {[0, 1, 2].map((i) => (
                                                            <span
                                                                key={i}
                                                                className="w-1 h-1 rounded-full bg-white/50 animate-bounce"
                                                                style={{ animationDelay: `${i * 0.15}s` }}
                                                            />
                                                        ))}
                                                    </span>
                                                    Sending
                                                </>
                                            ) : (
                                                <>
                                                    Send message
                                                    <svg
                                                        width="12"
                                                        height="12"
                                                        viewBox="0 0 12 12"
                                                        fill="none"
                                                        className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300"
                                                    >
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

                <div className="absolute bottom-0 inset-x-0 h-px bg-lineaar-to-r from-transparent via-white/8 to-transparent" />
                <FAQs />
            </main>
        </>
    );
}