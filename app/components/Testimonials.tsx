"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
    {
        id: 1,
        name: "Gourmet Twist",
        role: "Founder, Gourmet Twist",
        image: "/banana-bread.png",
        quote:
            "Working with this team completely transformed how our products are perceived. Every shot feels cinematic, luxurious, and crafted to convert viewers into customers.",
    },
    {
        id: 2,
        name: "Jiffy Jollof",
        role: "Marketing Director, Jiffy Jollof",
        image: "/jiffy-jollof.png",
        quote:
            "Their ability to capture product details and tell a compelling story is unmatched. Our campaign engagement increased dramatically after launch.",
    },
    {
        id: 3,
        name: "Essence Atelier",
        role: "CEO, Essence Atelier",
        image: "/aloe-vera.png",
        quote:
            "From concept to final delivery, the process was seamless. The visuals elevated our brand and gave our products the premium presence they deserve.",
    },
    {
        id: 4,
        name: "Hair",
        role: "Brand Manager, Hair",
        image: "/hair.png",
        quote:
            "Exceptional creativity, attention to detail, and storytelling. The final videos didn't just showcase our product—they made people want it instantly.",
    },
];

export default function TestimonialsSection() {
    const [items, setItems] = useState(testimonials);
    const [isAnimating, setIsAnimating] = useState(false);

    const nextSlide = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setTimeout(() => {
            setItems((prev) => [...prev.slice(1), prev[0]]);
            setIsAnimating(false);
        }, 400);
    };

    const prevSlide = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setTimeout(() => {
            setItems((prev) => [prev[prev.length - 1], ...prev.slice(0, -1)]);
            setIsAnimating(false);
        }, 400);
    };

    const active = items[0];

    return (
        <section className="w-full relative h-screen bg-[#020202] flex items-center justify-center px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="relative lg:mt-10 flex items-center justify-center">
                    {/* Background Text */}
                    <motion.div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                        <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[16vw] lg:text-[10vw] font-black tracking-tighter text-white/3 whitespace-nowrap select-none">
                            Testimonials
                        </h1>
                    </motion.div>

                    {/* Foreground Heading */}
                    <div className="relative z-10 flex items-center justify-center gap-4">
                        <span
                            style={{
                                fontSize: "clamp(1.5rem, 2vw, 3rem)",
                                textTransform: "capitalize",
                                color: "#FEE9CE",
                                fontWeight: "light",
                                whiteSpace: "nowrap",
                            }}
                        >
                            What our clients say
                        </span>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:mt-32 mt-16 items-center">
                    <div>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={active.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                            >
                                <blockquote className="text-2xl md:text-4xl leading-tight font-light text-[#FEE9CE] mb-8">
                                    “{active.quote}”
                                </blockquote>

                                <div>
                                    <h3 className="text-2xl text-white">{active.name}</h3>
                                    <p className="text-white/30">{active.role}</p>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        <div className="flex gap-4 mt-10">
                            <button
                                onClick={prevSlide}
                                className="w-12 h-12 rounded-full bg-black border border-white/10 cursor-pointer flex items-center justify-center text-white hover:bg-white/5 hover:text-white transition"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="w-12 h-12 rounded-full bg-black border border-white/10 cursor-pointer text-white flex items-center justify-center hover:bg-white/5 transition"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="overflow-hidden md:flex hidden">
                        <div className="flex gap-4">
                            {items.map((item, index) => (
                                <motion.div
                                    key={`${item.id}-${index}`}
                                    layout
                                    transition={{ duration: 0.5 }}
                                    className={`relative shrink-0 rounded-3xl overflow-hidden ${index === 0
                                        ? "w-[350px] md:w-[450px] h-[420px]"
                                        : "w-[140px] md:w-[200px] h-[420px]"
                                        }`}
                                >
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}