"use client";

export default function ExpertiseSection() {
    return (
        <section className="w-full bg-[#E8A25C] text-black">
            <div className="px-6 md:px-16 py-16 md:py-24">

                {/* Top label */}
                <p className="text-[10px] tracking-[0.25em] uppercase mb-10">
                    Backed by decades of experience
                </p>

                {/* Grid */}
                <div className="grid md:grid-cols-2 gap-16">

                    {/* LEFT BIG TEXT */}
                    <div>
                        <h1 className="font-extrabold leading-[0.85] tracking-tight text-[clamp(3rem,8vw,8rem)]">
                            My <br /> Expertise
                        </h1>
                    </div>

                    {/* RIGHT CONTENT */}
                    <div className="grid sm:grid-cols-2 gap-y-16 gap-x-10">

                        {/* CARD */}
                        <ExpertiseCard
                            title="Product Design"
                            items={[
                                "User Research",
                                "Design Research",
                                "Service Research",
                                // "ResearchOps",
                                // "Competitive Analysis",
                            ]}
                        />

                        <ExpertiseCard
                            title="Brand Visibility"
                            items={[
                                "Improved Search Rankings",
                                "Better Social Media Reach",
                                "Increased Time on Page",
                                // "Stakeholder Management",
                                // "Information Architecture",
                            ]}
                        />

                        <ExpertiseCard
                            title="Brand Credibility"
                            items={[
                                "High Production Quality",
                                "Consistent Messaging",
                                "Humanizing the Brand",
                                // "Art Direction",
                                // "Interaction Design",
                                // "DesignOps",
                            ]}
                        />

                        <ExpertiseCard
                            title="Increase in Sales"
                            items={[
                                "Boosted Purchase Confidence",
                                "Immersive Experience",
                                "Reduced Returns",
                                // "Rapid Prototyping",
                                // "Wordpress",
                                // "Webflow",
                            ]}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ─── Reusable Card ───────────────────────────── */

function ExpertiseCard({
    title,
    items,
}: {
    title: string;
    items: string[];
}) {
    return (
        <div className="relative z-50">

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
                <ul className="space-y-1 text-[15px] leading-relaxed">
                    {items.map((item, i) => (
                        <li key={i}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}