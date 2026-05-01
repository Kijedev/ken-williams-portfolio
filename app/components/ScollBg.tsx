import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "",
    description: "",
};

export default function ScollBg() {
    return (
        <section id="uniquely-yours" className="relative bg-black">
            <div className="fixed z-0 top-0 h-screen w-full flex flex-col gap-10 items-center justify-center pointer-events-none">
                <h1 className="text-white/5 text-[3rem] lg:text-[7rem] font-bold text-center leading-none lg:max-w-3xl">
                    What Makes Us Different
                </h1>
            </div>

            {/* SCROLLING CARDS (NORMAL FLOW) */}
            <div className="relative max-w-6xl mx-auto -mt-[10vh] py-48 flex flex-col gap-32">
                {[
                    {
                        title: "Cinematic Product Storytelling",
                        description:
                            "Transform everyday products into compelling visual stories that capture attention, build desire, and drive customer action across every platform.",
                        image: "/banana-bread.png",
                    },
                    {
                        title: "Designed for Social Impact",
                        description:
                            "Create scroll-stopping product videos optimized for Instagram, TikTok, YouTube, and paid campaigns—built to engage audiences instantly.",
                        image: "/jiffy-jollof.png",
                    },
                    {
                        title: "Showcase Every Detail",
                        description:
                            "From texture and craftsmanship to functionality and finish, every frame highlights what makes your product exceptional and worth buying.",
                        image: "/aloe-vera.png",
                    },
                    {
                        title: "Built to Elevate Your Brand",
                        description:
                            "Premium visuals that strengthen brand identity, increase trust, and position your products as the obvious choice in a competitive market.",
                        image: "/cake.png",
                    },
                ].map((card, index) => (
                    <div
                        key={index}
                        className={`backdrop-blur-xl bg-black/10 w-96 border border-white/5 rounded-xl p-5 flex flex-col gap-6 items-center
        ${index % 2 === 0 ? "self-end" : "self-start"}`}
                    >
                        <div className="w-[98%]">
                            <img
                                src={card.image}
                                alt={card.title}
                                className="w-full h-[50vh] rounded-2xl object-cover"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <h2 className="text-xl font-semibold text-[#EF5143]">
                                {card.title}
                            </h2>
                            <p className="text-[#FEE9CE]/70 text-md">{card.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}