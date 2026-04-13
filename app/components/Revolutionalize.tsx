"use client";

import type { Metadata } from "next";
import { motion } from "framer-motion";
import { easeOut } from "framer-motion";
import BrandsMarquee from "./ui/Brands";

export const metadata: Metadata = {
    title: "",
    description: "",
};

// Animation variants
const textVariant = {
    hidden: {
        opacity: 0,
        y: 80,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: easeOut,
        },
    },
};

export default function Revolutionalize() {
    const texts = ["Revolutionalizing", "Product", "Visualization"];

    return (
        <main className="lg:min-h-screen relative z-50 bg-[#010101] border-t border-white/10 overflow-hidden">
            <div className="flex flex-col justify-center h-full px-6 md:px-12 lg:px-20 py-24">

                {texts.map((text, i) => (
                    <motion.h1
                        key={text}
                        custom={i}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={textVariant}
                        transition={{
                            delay: i * 0.2,
                        }}
                        className={`
              text-white font-light text-4xl sm:text-5xl md:text-7xl lg:text-[9rem] xl:text-[11rem] leading-[0.9]
              
              ${i === 1 ? "italic" : ""}
              ${i !== 0 ? "mt-4 sm:mt-4 md:mt-6 lg:mt-8 text-white/70" : ""}
            `}
                    >
                        {text}
                    </motion.h1>
                ))}

            </div>

            {/* <BrandsMarquee /> */}
        </main>
    );
}