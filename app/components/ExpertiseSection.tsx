"use client";

import { motion, Variants } from "framer-motion";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.96 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.8,
            ease: "easeOut",
            delay: i * 0.12,
        },
    }),
};

export default function ExpertiseSection() {
    return (
        <section className="w-full bg-[#E8A25C] text-black">
            <div className="px-6 md:px-16 py-16 md:py-24">

                {/* Top label */}
                <motion.p
                    custom={0}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="text-[16px] mb-10"
                >
                    Backed by years of experience
                </motion.p>

                {/* Grid */}
                <div className="grid md:grid-cols-2 gap-16">

                    {/* LEFT BIG TEXT */}
                    <motion.div
                        custom={1}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <h1 className="font-extrabold leading-[0.85] tracking-tight text-[clamp(3rem,8vw,8rem)]">
                            My <br /> Expertise
                        </h1>
                    </motion.div>

                    {/* RIGHT CONTENT */}
                    <div className="grid sm:grid-cols-2 gap-y-16 gap-x-10">

                        <ExpertiseCard
                            index={2}
                            title="Product Videography"
                            items={[
                                "Cinematic Product Films",
                                "Brand Storytelling Videos",
                                "High-Converting Commercial Content",
                            ]}
                        />

                        <ExpertiseCard
                            index={3}
                            title="Brand Visibility"
                            items={[
                                "Stronger Social Media Presence",
                                "Higher Audience Engagement",
                                "Expanded Brand Reach",
                            ]}
                        />

                        <ExpertiseCard
                            index={4}
                            title="Brand Credibility"
                            items={[
                                "Premium Visual Presentation",
                                "Consistent Brand Storytelling",
                                "Deeper Customer Trust",
                            ]}
                        />

                        <ExpertiseCard
                            index={5}
                            title="Sales Growth"
                            items={[
                                "Higher Conversion Rates",
                                "Increased Purchase Confidence",
                                "Improved Customer Retention",
                            ]}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

function ExpertiseCard({
    title,
    items,
    index,
}: {
    title: string;
    items: string[];
    index: number;
}) {
    return (
        <motion.div
            custom={index}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative z-50"
        >
            {/* Top line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-black/40" />

            <div className="pt-8">

                {/* Icon */}
                <div className="w-10 h-10 rounded-full border border-black/40 flex items-center justify-center mb-6">
                    <div className="w-2 h-2 bg-black rounded-full" />
                </div>

                {/* Title */}
                <h3 className="text-3xl font-semibold mb-6">
                    {title}
                </h3>

                {/* List */}
                <ul className="space-y-1 text-[16px]">
                    {items.map((item, i) => (
                        <li key={i}>{item}</li>
                    ))}
                </ul>
            </div>
        </motion.div>
    );
}