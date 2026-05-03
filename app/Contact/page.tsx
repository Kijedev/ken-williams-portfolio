"use client";

import { useRef, useState } from "react";
import { motion, Variants } from "framer-motion";

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

const CONTACT_DETAILS = [
  { label: "Email", value: "kendarawilliams1@gmail.com", href: "mailto:[kendarawilliams1@gmail.com]" },
  { label: "Phone", value: "+234 708 2313 155", href: "tel:+2347082313155" },
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
    <div className="flex flex-col gap-2">
      <label className="text-sm lg:text-base capitalize text-white/70 font-light">
        {label}
        {required && <span className="ml-1 text-white/50">*</span>}
      </label>
      {children}
    </div>
  );
}

export default function Page() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", company: "", message: "" });
      } else {
        setStatus(data.error || "Something went wrong.");
      }
    } catch (error: any) {
      console.error("EMAIL ERROR:", error);
      setStatus(error.message || "Something went wrong.");
    }

    setLoading(false);
  };

  const inputCls = `
    w-full bg-transparent border-b border-white/20
    focus:border-white/50 hover:border-white/30
    text-white/80 placeholder:text-white/25
    text-sm lg:text-lg font-light tracking-wide
    py-3 outline-none transition-colors duration-300
  `;

  // const containerVariants = {
  //   hidden: { opacity: 0 },
  //   visible: {
  //     opacity: 1,
  //     transition: {
  //       staggerChildren: 0.1,
  //       delayChildren: 0.15,
  //     },
  //   },
  // };

  // const itemVariants = {
  //   hidden: { y: 50, opacity: 0 },
  //   visible: {
  //     y: 0,
  //     opacity: 1,
  //     transition: { duration: 0.8, ease: "easeOut" },
  //   },
  // };

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 60,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <div
      style={{ background: "#000" }}
      className="w-full xl:overflow-visible lg:overflow-visible md:overflow-visible overflow-hidden"
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 0,
        }}
        className="lg:h-screen h-[90vh]"
      >
        <motion.div className="w-full h-full flex flex-col justify-center">

          {/* Glow */}
          <div
            className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] max-w-[800px] h-[500px] opacity-[0.05]"
            style={{ background: "radial-gradient(ellipse,#fff 0%,transparent 65%)" }}
          />

          {/* Orbit rings */}
          <motion.div
            className="pointer-events-none absolute -top-40 right-0 w-[500px] h-[500px] rounded-full border border-white/5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -top-20 right-0 w-[50vw] max-w-[320px] h-[50vw] max-h-[320px] rounded-full border border-white/7"
          />

          <div className="z-10 w-full px-6 sm:px-10 md:px-16 lg:px-24 pt-32 pb-24">

            <motion.div
              className="flex flex-col gap-10 overflow-hidden"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
            >

              {/* TITLE */}
              <motion.h1
                className="text-[clamp(2.8rem,7vw,8rem)] uppercase font-extrabold leading-[0.95] tracking-tighter text-[#FEE9CE]"
                variants={itemVariants}
              >
                Let's create <br /> something <br />
                <em className="not-italic text-[#EF5143] capitalize">
                  unforgettable.
                </em>
              </motion.h1>

              {/* PARAGRAPH */}
              <motion.p
                className="max-w-2xl text-sm lg:text-lg text-white/35 font-light leading-relaxed"
                variants={itemVariants}
              >
                Whether you have a full brief or just a product and a vision, reach out
                and we'll figure out the rest together.
              </motion.p>

              {/* DIVIDER */}
              <motion.div
                className="h-px bg-linear-to-r from-white/15 via-white/8 to-transparent"
                variants={itemVariants}
              />

              {/* CONTACT GRID */}
              <motion.div
                className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10 w-full"
                variants={containerVariants}
              >
                {CONTACT_DETAILS.map(({ label, value, href }) => (
                  <motion.div
                    key={label}
                    className="flex flex-col gap-1"
                    variants={itemVariants}
                  >
                    <span className="text-lg capitalize text-[#FEE9CE]">
                      {label}
                    </span>

                    {href ? (
                      <a
                        href={href}
                        className="text-sm font-light text-white/50 hover:text-white transition-colors duration-300"
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="text-sm font-light text-white/60">
                        {value}
                      </span>
                    )}
                  </motion.div>
                ))}
              </motion.div>

            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ── Form panel  ── */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          background: "black",
          borderTopLeftRadius: "24px",
          borderTopRightRadius: "24px",
          boxShadow: "0 -24px 80px rgba(0,0,0,0.9), 0 -1px 0 rgba(255,255,255,0.06)",
          overflow: "hidden",
        }}
        className="h-screen flex flex-col justify-center items-center"
      >
        <div className="relative w-full px-6 sm:px-10 md:px-16 lg:px-24 py-16 md:py-10 pb-40">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative mb-12 flex items-center justify-center lg:pt-10 pt-10"
          >
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap lg:text-[13vw] text-[20vw] font-black tracking-tighter text-white/3 select-none">
                Contact
              </h1>
            </div>

            <div className="relative z-10 flex items-center justify-center gap-4">
              <span
                style={{
                  fontSize: "clamp(1.3rem, 2vw, 3rem)",
                  textTransform: "capitalize",
                  color: "#FEE9CE",
                  fontWeight: "light",
                  whiteSpace: "nowrap",
                }}
              >
                Tell us about your project
              </span>
            </div>
          </motion.div>

          <div className="lg:mt-20 mt-10">
            {status === "sent" ? (
              <motion.div
                className="flex flex-col items-start gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path
                      d="M3 9l4.5 4.5L15 5"
                      stroke="white"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-extralight text-white tracking-tight">
                  Message received.
                </h3>
                <p className="text-sm text-white/35 font-light leading-relaxed max-w-xs">
                  Thanks for reaching out. I'll get back to you shortly.
                </p>
                <button
                  onClick={() => {
                    setStatus("");
                    setForm({ name: "", email: "", company: "", message: "" });
                  }}
                  className="mt-2 text-sm text-white/30 hover:text-white transition-colors duration-300 border-b border-white/10 hover:border-white/40 pb-0.5"
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <Field label="Name" required>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Email" required>
                    <input
                      type="email"
                      required
                      placeholder="johndoe@gmail.com"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className={inputCls}
                    />
                  </Field>
                </div>

                <Field label="Company / Brand (Optional)">
                  <input
                    type="text"
                    placeholder="Meta"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    className={inputCls}
                  />
                </Field>

                <Field label="Project brief" required>
                  <textarea
                    required
                    rows={2}
                    placeholder="Tell me about your product, the feel you're going for, and your timeline…"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    className={`${inputCls} resize-none`}
                  />
                </Field>

                <div className="flex items-center justify-between gap-6 pt-2">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-white/20 hover:border-white/50 text-sm font-light text-white/60 hover:text-white transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
                          <path
                            d="M1 6h10M7 2l4 4-4 4"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
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

    </div>
  );
}