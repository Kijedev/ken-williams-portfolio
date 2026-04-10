"use client";

import Image from "next/image";
import CoreValues from "../components/CoreValues";
import FAQs from "../components/FAQs";
import Footer from "../Footer/page";

export default function Company() {
    return (
        <section className="w-full bg-[#010101] py-16 px-4 md:px-10">
            <div className="max-w-7xl mx-auto mt-20">
                <h1 className="lg:text-[10rem] text-white bg-clip-text text-6xl text-center">Who we are</h1>
            </div>

            <div className="max-w-7xl mt-20 mx-auto border-[3px] border-black rounded-2xl overflow-hidden grid md:grid-cols-2">
                <div className="bg-[#d9d9d9] relative">
                    <div className="bg-[#145c45] text-white px-6 py-5 flex items-center gap-3">
                        <span className="w-3 h-3 rounded-full bg-yellow-400 border-2 border-black"></span>
                        <h2 className="text-lg md:text-xl font-medium">
                            Founder’s Story
                        </h2>
                    </div>

                    <div className="flex flex-col items-center justify-center px-6 py-10">
                        <div className="border-[3px] border-black rounded-2xl overflow-hidden">
                            <Image
                                src="/ken.jpeg"
                                alt="Founder"
                                width={400}
                                height={500}
                                className="object-cover"
                            />
                        </div>

                        <h3 className="mt-6 text-xl md:text-2xl font-medium text-black">
                            Ken Williams
                        </h3>
                    </div>
                </div>

                <div className="bg-[#eeeeee] px-6 md:px-10 py-10 text-[#1a1a1a] leading-relaxed text-[15px] md:text-base">

                    <p className="mb-6">
                        I tested positive for COVID on the 31st of December, 2020. The result came in very late at night and I couldn’t travel home. I spent the entire January looking for food vendors to deliver food to me but the available food delivery providers didn’t deliver during public holidays. I eventually found one after so many hours and ended up paying 4× the regular amount.
                    </p>

                    <p className="mb-6">
                        During my 14– day isolation, I realised no one was really looking into the logistics problem with the care and attention I would have wished for. I started asking questions; most answers ended with “dispatch riders are not reliable”, then I made a lot of research and discovered delivery companies in countries like India made millions of deliveries daily. No one comes close locally and it didn’t make sense that at such a small scale, we Africans couldn’t figure it out.
                    </p>

                    <p className="mb-6">
                        We initially approached the problem from a technical standpoint then realised the problem was more operations than tech and we needed to deconstruct operations before trying again. We went back to first principles to figure this out. We pulled funds from our pockets, got three bikes and riders - gave two of them to Korede Spaghetti and one of them to NiFries. We held meetings weekly with our riders and that gave us so much insight we needed.
                    </p>

                    <p>
                        With a better understanding of what we believed the problem was, we knew our solution had to be efficient and easy to use. This was hard to pull as we struggled...
                    </p>

                </div>
            </div>

            <CoreValues />
            <FAQs />
        </section>
    );
}