"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
// import "@fontsource/bebas-neue";

export default function Whoweare() {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    // Slide values
    const slideLeft = useTransform(scrollYProgress, [0, 1], ["-50%", "50%"]);
    const slideRight = useTransform(scrollYProgress, [0, 1], ["50%", "-50%"]);

    return (
        <section ref={ref} className="flex flex-col h-screen items-center justify-center overflow-hidden">
            <div className="flex flex-col lg:gap-0 gap-5 lg:pt-10 pt-5 px-4 lg:px-0 py-12 lg:py-0">

                {/* WHATS */}
                <motion.h1
                    style={{ x: slideLeft }}
                    className="text-[8rem] lg:text-[14rem] opacity-10 font-extrabold text-center flex justify-center lg:justify-center text-[#E8A25C] lg:h-44 h-20"
                >
                    WHO
                </motion.h1>

                {/* EVERYONE */}
                <motion.h1
                    style={{ x: slideRight }}
                    className="text-[8rem] lg:text-[14rem] font-extrabold text-center flex justify-center lg:justify-center text-[#EF5143] lg:h-44 h-20"
                >
                    WE
                </motion.h1>

                {/* TALKING */}
                <motion.h1
                    style={{ x: slideLeft }}
                    className="text-[8rem] lg:text-[14rem] opacity-10 font-extrabold text-center flex justify-center lg:justify-center text-[#E8A25C]"
                >
                    ARE
                </motion.h1>
                <div className="flex flex-col items-center gap-3">
                    <span className="text-[9px] tracking-[0.3em] uppercase text-white/20">Scroll</span>
                    <div className="w-px h-10 bg-linear-to-b from-white/20 to-transparent" />
                </div>

            </div>

        </section>
    );
}
