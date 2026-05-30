"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import FAQs from "../components/FAQs";
import ExpertiseSection from "../components/ExpertiseSection";
import Help from "../components/Help";
import Button from "../components/Button";
import { motion, Variants } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const PROCESS = [
    { step: "01", label: "Discovery", detail: "Brief, references, objectives" },
    { step: "02", label: "Concept", detail: "Moodboard, treatment, storyboard" },
    { step: "03", label: "Production", detail: "Shoot day — controlled, efficient" },
    { step: "04", label: "Post", detail: "Edit, grade, sound, motion" },
    { step: "05", label: "Delivery", detail: "All formats, all platforms" },
];


export default function Page() {
    const pageRef = useRef<HTMLDivElement>(null);
    const processTitleRef = useRef<HTMLDivElement>(null);
    const processRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const orbitRef = useRef<HTMLDivElement>(null);

    const fadeUp: Variants = {
        hidden: { opacity: 0, y: 60 },
        visible: (i = 0) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.9,
                ease: "easeOut",
                delay: i * 0.12,
            },
        }),
    };

    return (
        <>
            <div ref={pageRef} className="relative min-h-screen w-full bg-black text-white overflow-hidden">
                <div className="pointer-events-none fixed inset-0 z-1 opacity-[0.025]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                        backgroundSize: "180px 180px",
                    }} aria-hidden="true" />

                <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] opacity-[0.05] z-1"
                    style={{ background: "radial-gradient(ellipse, #fff 0%, transparent 65%)" }} aria-hidden="true" />

                <div ref={orbitRef}
                    className="pointer-events-none absolute -top-64 -right-64 w-[700px] h-[700px] rounded-full border border-white/3 z-1"
                    aria-hidden="true" />

                {/* Hero */}
                <section className="relative z-10 flex flex-col items-center justify-center w-full lg:min-h-screen px-6 lg:px-20">

                    <div className="w-full pt-48 lg:pt-20">

                        <div className="flex flex-col">

                            <motion.h1
                                custom={0}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="uppercase text-[clamp(3.2rem,9vw,10rem)] font-extrabold leading-[0.95] tracking-tighter text-[#FEE9CE] mb-8"
                            >
                                Let us <br />
                            </motion.h1>

                            <motion.h1
                                custom={1}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="lg:-mt-12 -mt-8 uppercase text-[clamp(4rem,9vw,10rem)] font-extrabold leading-[0.95] tracking-tighter text-[#FEE9CE] mb-8"
                            >
                                help you <br />
                            </motion.h1>

                        </div>

                        <div>
                            <motion.h1
                                custom={2}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="lg:-mt-12 -mt-8 uppercase text-[clamp(5rem,9vw,10rem)] font-extrabold leading-[0.95] tracking-tighter text-[#EF5143] mb-8"
                            >
                                achieve
                            </motion.h1>

                            <motion.h1
                                custom={3}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="lg:-mt-12 -mt-8 uppercase text-[clamp(5rem,9vw,10rem)] font-extrabold leading-[0.95] tracking-tighter text-[#EF5143] mb-8"
                            >
                                your Brand
                            </motion.h1>

                            <motion.h1
                                custom={4}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="lg:-mt-12 -mt-8 uppercase text-[clamp(5rem,9vw,10rem)] font-extrabold leading-[0.95] tracking-tighter text-[#EF5143] mb-8"
                            >
                                Goals
                            </motion.h1>
                        </div>
                    </div>

                    {/* Scroll cue */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="absolute lg:bottom-0 -bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
                    >
                        <span className="text-[9px] tracking-[0.3em] uppercase text-white/20">
                            Scroll
                        </span>
                        <div className="w-px h-10 bg-linear-to-b from-white/20 to-transparent" />
                    </motion.div>
                </section>

                <section className="h-screen w-full flex items-center justify-center text-white">
                    <Help />
                </section>

                <div className="relative z-20 lg:mt-[50vh] mt-[20vh]">
                    <ExpertiseSection />
                </div>

                <section className="relative z-10 h-screen bg-black flex items-center justify-center">
                    <div className="max-w-8xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 py-20 md:py-28">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.9, ease: "easeOut" }}
                            className="relative mb-12 flex items-center justify-center lg:mt-0 mt-20"
                        >
                            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap lg:text-[8vw] text-[14vw] font-black tracking-tighter text-white/6 select-none">
                                    The Process
                                </h1>
                            </div>

                            <div className="relative z-10 flex items-center justify-center gap-4">
                                <span
                                    style={{
                                        fontSize: "clamp(2rem, 2vw, 3rem)",
                                        textTransform: "capitalize",
                                        color: "#FEE9CE",
                                        fontWeight: 300,
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    The Process
                                </span>
                            </div>
                        </motion.div>

                        <div className="relative lg:mt-32 mt-10">
                            <div
                                data-process-line
                                className="hidden md:block absolute top-[18px] left-[20px] right-[20px] h-px bg-white/6"
                                aria-hidden="true"
                            />

                            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-8 md:gap-4">
                                {PROCESS.map((p, i) => (
                                    <motion.div
                                        key={p.step}
                                        custom={i + 1}
                                        variants={fadeUp}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        className="relative flex flex-col gap-10"
                                    >
                                        <div className="w-9 h-9 rounded-full border border-white/12 flex items-center justify-center bg-[#080808] shrink-0 relative z-10">
                                            <span className="text-[12px] tracking-[0.15em] text-white/30 font-light tabular-nums">
                                                {p.step}
                                            </span>
                                        </div>

                                        <div className="flex flex-col gap-1.5">
                                            <span className="text-[20px] font-light text-[#FEE9CE]">
                                                {p.label}
                                            </span>
                                            <span className="text-[14px] text-white/40 capitalize font-light">
                                                {p.detail}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* <section className="relative z-10 bg-black">
                    <motion.div
                        custom={0}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="max-w-8xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 py-20 md:py-28 flex flex-col md:flex-row md:items-end justify-between gap-10"
                    >

                        <motion.div
                            custom={1}
                            variants={fadeUp}
                            className="flex flex-col gap-4 max-w-2xl"
                        >
                            <h2 className="font-cormorant text-[clamp(2rem,5vw,4rem)] font-light leading-none tracking-tight text-[#FEE9CE]">
                                Ready to make your<br />
                                <em className="not-italic text-white/30">
                                    product unforgettable?
                                </em>
                            </h2>
                        </motion.div>

                        <motion.div
                            custom={2}
                            variants={fadeUp}
                            className="flex flex-col gap-4 items-start md:items-end shrink-0"
                        >
                            <Button
                                text="Start a project"
                                textsecond="Start a project"
                                textColor="text-[#fff]"
                                border="border border-white"
                            />
                        </motion.div>
                    </motion.div>
                </section> */}

                <FAQs />
            </div>
        </>
    );
}