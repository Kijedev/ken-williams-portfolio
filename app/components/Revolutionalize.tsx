"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function Revolutionalize() {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    // Slide values
    const slideLeft = useTransform(scrollYProgress, [0, 1], ["-50%", "50%"]);
    const slideRight = useTransform(scrollYProgress, [0, 1], ["50%", "-50%"]);

    return (
        <section ref={ref} className="bg-black flex flex-col lg:h-screen h-[60vh] relative z-50 items-center justify-center overflow-hidden">
            {/* <div
                className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] opacity-[0.05] z-1"
                style={{ background: "radial-gradient(ellipse, #fff 0%, transparent 65%)" }}
                aria-hidden="true"
            /> */}
            <div className="flex flex-col lg:gap-0 gap-5 lg:pt-10 pt-5 px-4 lg:px-0 py-12 lg:py-0">
                2
                {/* WHATS */}
                <motion.h1
                    style={{ x: slideLeft }}
                    className="text-[3rem] lg:text-[10rem] capitalize text-center flex justify-center lg:justify-center text-[#FEE9CE]/60 lg:h-44 h-10"
                >
                    Revolutionalizing
                </motion.h1>

                {/* EVERYONE */}
                <motion.h1
                    style={{ x: slideRight }}
                    className="text-[3rem] lg:text-[10rem] capitalize font-extrabold text-center flex justify-center lg:justify-center text-[#E8A25C] lg:h-44 h-10"
                >
                    Product
                </motion.h1>

                {/* TALKING */}
                <motion.h1
                    style={{ x: slideLeft }}
                    className="text-[3rem] lg:text-[10rem] capitalize text-center flex justify-center lg:justify-center text-[#FEE9CE]/60"
                >
                    Visualization
                </motion.h1>
            </div>
        </section>
    );
}
