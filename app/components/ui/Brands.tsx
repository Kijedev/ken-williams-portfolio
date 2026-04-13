"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

// ─── Brand data ───────────────────────────────────────────────────────────────
// Replace src with your actual brand logo paths from /public
// e.g. src: "/brands/nike.png"
// name is used for alt text only

const BRANDS = [
    { src: "/cedaa.png", name: "cedaa" },
    { src: "/havoil.png", name: "hav oil" },
    { src: "/jiffyjollof.png", name: "jiffy jollof" },
    { src: "/Unclestans.jpeg", name: "Unclestans" },
    { src: "/skintivity.jpg", name: "skintivity" },
    //   { src: "/brands/brand-06.png", name: "Brand 06" },
    //   { src: "/brands/brand-07.png", name: "Brand 07" },
    //   { src: "/brands/brand-08.png", name: "Brand 08" },
    //   { src: "/brands/brand-09.png", name: "Brand 09" },
];

export default function BrandsMarquee() {
    const wrapperRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const wrapper = wrapperRef.current;
        const track = trackRef.current;
        const items = itemsRef.current.filter(Boolean) as HTMLDivElement[];

        if (!wrapper || !track || !items.length) return;

        const ctx = gsap.context(() => {

            // ── Horizontal scroll tween ──────────────────────────────
            // The track slides from right (starts off-screen via padding-left: 100vw)
            // to fully scrolled left. This tween drives all child animations.
            const scrollTween = gsap.to(track, {
                xPercent: -100,
                ease: "none",
                scrollTrigger: {
                    trigger: wrapper,
                    pin: true,
                    end: "+=5000px",
                    scrub: true,
                },
            });

            // ── Per-image entrance via containerAnimation ────────────
            // Each image flies in from a random y offset and rotation
            // as it enters the left edge of the viewport during horizontal scroll.
            items.forEach((item) => {
                gsap.from(item, {
                    yPercent: () => gsap.utils.random(-140, 140),
                    rotation: () => gsap.utils.random(-18, 18),
                    opacity: 0,
                    scale: 0.75,
                    ease: "back.out(1.4)",
                    scrollTrigger: {
                        trigger: item,
                        containerAnimation: scrollTween, // ← drives this off the horizontal tween
                        start: "left 100%",
                        end: "left 40%",
                        scrub: 1,
                    },
                });
            });

        }, wrapper);

        return () => ctx.revert();
    }, []);

    return (
        <>
            {/* <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500&display=swap');
      `}</style> */}

            <section
                ref={wrapperRef}
                className="relative overflow-hidden h-[50vh] flex flex-col justify-center bg-black border-t border-white/[0.06]"
                aria-label="Brands we've worked with"
            >
                <div
                    className="pointer-events-none absolute inset-0 z-[1] opacity-[0.025]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                        backgroundSize: "180px 180px",
                    }}
                    aria-hidden="true"
                />

                {/* ── Left & right edge fades so images appear/disappear softly */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-32 z-10"
                    style={{ background: "linear-gradient(to right, #000 0%, transparent 100%)" }}
                    aria-hidden="true" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-32 z-10"
                    style={{ background: "linear-gradient(to left, #000 0%, transparent 100%)" }}
                    aria-hidden="true" />

                {/* ── Eyebrow label — fixed in place above the track ─── */}
                {/* <div className="absolute top-12 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
                    <span className="w-5 h-px bg-white/20" />
                    <span
                        className="text-[9px] tracking-[0.38em] uppercase text-white/20"
                        style={{ fontFamily: "Barlow, sans-serif" }}
                    >
                        Brands we've worked with
                    </span>
                    <span className="w-5 h-px bg-white/20" />
                </div> */}

                <div
                    ref={trackRef}
                    className="flex items-center gap-[2vw] w-max"
                    style={{ paddingLeft: "100vw", paddingRight: "10vw" }}
                >
                    {BRANDS.map((brand, i) => (
                        <div
                            key={i}
                            ref={(el) => { itemsRef.current[i] = el; }}
                            className="relative shrink-0 flex items-center justify-center"
                            style={{ width: "clamp(100px, 14vw, 200px)", height: "clamp(60px, 8vw, 110px)" }}
                        >
                            {/* Brand logo */}
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            {/* <div className="relative w-full h-full"> */}
                            <Image
                                src={brand.src}
                                alt={brand.name}
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 100px, 200px"
                            />
                            {/* </div> */}

                            {/* Fallback placeholder shown while image loads or if src is missing */}
                            <div
                                className="absolute inset-0 flex items-center justify-center border border-white/[0.06] rounded-sm"
                                style={{ zIndex: -1 }}
                                aria-hidden="true"
                            >
                                <span
                                    className="text-[9px] tracking-[0.22em] uppercase text-white/10"
                                    style={{ fontFamily: "Barlow, sans-serif" }}
                                >
                                    {brand.name}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

            </section>
        </>
    );
}



// "use client";

// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// type Brand = {
//   src: string;
//   name: string;
// };

// const BRANDS: Brand[] = [
//   { src: "/cedaa.png", name: "Cedaa" },
//   { src: "/havoil.png", name: "Hav Oil" },
//   { src: "/jiffyjollof.png", name: "Jiffy Jollof" },
//   { src: "/Unclestans.jpeg", name: "Unclestans" },
//   { src: "/skintivity.jpg", name: "Skintivity" },
// ];

// export default function BrandsMarquee() {
//   const wrapperRef = useRef<HTMLElement | null>(null);
//   const trackRef = useRef<HTMLDivElement | null>(null);
//   const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

//   useEffect(() => {
//     const wrapper = wrapperRef.current;
//     const track = trackRef.current;
//     const items = itemsRef.current.filter(Boolean) as HTMLDivElement[];

//     if (!wrapper || !track || !items.length) return;

//     const ctx = gsap.context(() => {
//       // Horizontal scroll animation
//       const scrollTween = gsap.to(track, {
//         x: () => -(track.scrollWidth - window.innerWidth),
//         ease: "none",
//         scrollTrigger: {
//           trigger: wrapper,
//           pin: true,
//           scrub: true,
//           end: () => `+=${track.scrollWidth}`, // ✅ dynamic height fix
//         },
//       });

//       // Individual item animation
//       items.forEach((item) => {
//         gsap.from(item, {
//           yPercent: () => gsap.utils.random(-100, 100),
//           rotation: () => gsap.utils.random(-10, 10),
//           opacity: 0,
//           scale: 0.8,
//           ease: "power3.out",
//           scrollTrigger: {
//             trigger: item,
//             containerAnimation: scrollTween,
//             start: "left 100%",
//             end: "left 60%",
//             scrub: true,
//           },
//         });
//       });
//     }, wrapper);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section
//       ref={wrapperRef}
//       className="relative overflow-hidden min-h-[60vh] py-20 flex flex-col justify-center bg-black border-t border-white/[0.06]"
//     >
//       {/* Grain overlay */}
//       <div
//         className="pointer-events-none absolute inset-0 opacity-[0.03]"
//         style={{
//           backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
//           backgroundSize: "180px 180px",
//         }}
//       />

//       {/* Edge fades */}
//       <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent z-10" />
//       <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent z-10" />

//       {/* Title */}
//       <div className="absolute top-10 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
//         <span className="w-5 h-px bg-white/20" />
//         <span className="text-[10px] tracking-[0.3em] uppercase text-white/30">
//           Brands we've worked with
//         </span>
//         <span className="w-5 h-px bg-white/20" />
//       </div>

//       {/* Track */}
//       <div
//         ref={trackRef}
//         className="flex items-center gap-6 md:gap-10 w-max"
//         style={{ paddingLeft: "100vw", paddingRight: "10vw" }}
//       >
//         {BRANDS.map((brand, i) => (
//           <div
//             key={i}
//             ref={(el) => {
//               itemsRef.current[i] = el;
//             }}
//             className="shrink-0 flex items-center justify-center"
//             style={{
//               width: "clamp(100px, 12vw, 180px)",
//               height: "clamp(60px, 7vw, 100px)",
//             }}
//           >
//             <img
//               src={brand.src}
//               alt={brand.name}
//               className="w-full h-full object-contain"
//               style={{
//                 filter: "brightness(0) invert(1)",
//                 opacity: 0.4,
//                 transition: "opacity 0.3s ease",
//               }}
//               onMouseEnter={(e) =>
//                 (e.currentTarget.style.opacity = "0.9")
//               }
//               onMouseLeave={(e) =>
//                 (e.currentTarget.style.opacity = "0.4")
//               }
//             />
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }