"use client";

import { useEffect, useRef } from "react";
import { CgInstagram } from "react-icons/cg";
import Button from "../components/Button";
import ButtonTrans from "./ui/ButtonTrans";

// ─── Reusable scroll-reveal hook using IntersectionObserver ──────────────────
function useReveal(refs: React.RefObject<HTMLElement | null>[], options?: { delay?: number; threshold?: number }) {
  useEffect(() => {
    const elements = refs.map((r) => r.current).filter(Boolean) as HTMLElement[];
    if (!elements.length) return;

    elements.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(40px)";
      el.style.transition = `opacity 0.9s ease ${(options?.delay ?? 0) + i * 120}ms, transform 0.9s ease ${(options?.delay ?? 0) + i * 120}ms`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            observer.unobserve(el); // fire once
          }
        });
      },
      { threshold: options?.threshold ?? 0.2 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── Instagram CTA section ────────────────────────────────────────────────────
// export function InstagramCTA() {
//   const sectionRef  = useRef<HTMLDivElement>(null);
//   const eyebrowRef  = useRef<HTMLDivElement>(null);
//   const headingRef  = useRef<HTMLHeadingElement>(null);
//   const linkRef     = useRef<HTMLAnchorElement>(null);
//   const subRef      = useRef<HTMLParagraphElement>(null);
//   const lineLeftRef = useRef<HTMLSpanElement>(null);
//   const lineRightRef= useRef<HTMLSpanElement>(null);

//   useReveal([eyebrowRef as any, headingRef as any, linkRef as any, subRef as any]);

//   // Line expand animation
//   useEffect(() => {
//     const lines = [lineLeftRef.current, lineRightRef.current].filter(Boolean) as HTMLElement[];
//     lines.forEach((el) => {
//       el.style.transform = "scaleX(0)";
//       el.style.transition = "transform 1.1s ease 0.2s";
//     });

//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             lines.forEach((el) => { el.style.transform = "scaleX(1)"; });
//             observer.disconnect();
//           }
//         });
//       },
//       { threshold: 0.3 }
//     );

//     if (sectionRef.current) observer.observe(sectionRef.current);
//     return () => observer.disconnect();
//   }, []);

//   return (
//     <div
//       ref={sectionRef}
//       style={{
//         position: "relative",
//         overflow: "hidden",
//         borderTop: "1px solid rgba(255,255,255,0.05)",
//         padding: "clamp(5rem,12vh,9rem) clamp(1.5rem,6vw,6rem)",
//         background: "#000",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         textAlign: "center",
//         gap: 0,
//       }}
//     >
//       {/* Ambient glow */}
//       <div style={{
//         position: "absolute",
//         top: "50%", left: "50%",
//         transform: "translate(-50%,-50%)",
//         width: "clamp(300px,60vw,700px)",
//         height: "clamp(200px,40vw,400px)",
//         borderRadius: "50%",
//         background: "radial-gradient(ellipse, rgba(193,100,67,0.06) 0%, transparent 70%)",
//         pointerEvents: "none",
//       }} aria-hidden="true" />

//       {/* Grain texture */}
//       <div style={{
//         position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.025,
//         backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
//         backgroundSize: "180px",
//       }} aria-hidden="true" />

//       {/* Eyebrow with expanding lines */}
//       <div
//         ref={eyebrowRef as any}
//         style={{
//           display: "flex", alignItems: "center",
//           gap: "clamp(0.6rem,1.5vw,1.2rem)",
//           marginBottom: "clamp(1.8rem,3.5vh,2.8rem)",
//         }}
//       >
//         <span
//           ref={lineLeftRef}
//           style={{
//             display: "block",
//             width: "clamp(28px,5vw,60px)", height: "1px",
//             background: "rgba(255,255,255,0.15)",
//             transformOrigin: "right",
//           }}
//         />
//         <span style={{
//           fontSize: "clamp(0.5rem,0.85vw,0.62rem)",
//           letterSpacing: "0.42em",
//           textTransform: "uppercase",
//           color: "rgba(255,255,255,0.2)",
//         }}>
//           Follow the work
//         </span>
//         <span
//           ref={lineRightRef}
//           style={{
//             display: "block",
//             width: "clamp(28px,5vw,60px)", height: "1px",
//             background: "rgba(255,255,255,0.15)",
//             transformOrigin: "left",
//           }}
//         />
//       </div>

//       {/* Heading */}
//       <h2
//         ref={headingRef}
//         style={{
//           fontFamily: "'Cormorant Garamond', serif",
//           fontSize: "clamp(2.2rem,6vw,5.5rem)",
//           fontWeight: 300,
//           color: "#FEE9CE",
//           lineHeight: 0.92,
//           letterSpacing: "-0.025em",
//           margin: "0 0 clamp(2rem,4vh,3.5rem)",
//           maxWidth: 700,
//         }}
//       >
//         Watch more<br />
//         <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.2)" }}>on Instagram</em>
//       </h2>

//       {/* Instagram button */}
//       <a
//         ref={linkRef}
//         href="https://www.instagram.com/darawilliam.s"
//         target="_blank"
//         rel="noopener noreferrer"
//         style={{
//           display: "inline-flex", alignItems: "center", gap: "0.7rem",
//           padding: "clamp(0.7rem,1.5vh,1rem) clamp(1.4rem,3vw,2rem)",
//           border: "1px solid rgba(255,255,255,0.15)",
//           background: "rgba(255,255,255,0.03)",
//           color: "rgba(255,255,255,0.6)",
//           fontSize: "clamp(0.75rem,1vw,0.88rem)",
//           letterSpacing: "0.18em",
//           textTransform: "uppercase",
//           textDecoration: "none",
//           transition: "all 0.35s ease",
//           backdropFilter: "blur(8px)",
//           marginBottom: "clamp(1.2rem,2.5vh,1.8rem)",
//           position: "relative",
//         }}
//         onMouseEnter={(e) => {
//           const el = e.currentTarget as HTMLElement;
//           el.style.background = "rgba(255,255,255,0.07)";
//           el.style.borderColor = "rgba(255,255,255,0.35)";
//           el.style.color = "#fff";
//           el.style.transform = "translateY(-2px)";
//         }}
//         onMouseLeave={(e) => {
//           const el = e.currentTarget as HTMLElement;
//           el.style.background = "rgba(255,255,255,0.03)";
//           el.style.borderColor = "rgba(255,255,255,0.15)";
//           el.style.color = "rgba(255,255,255,0.6)";
//           el.style.transform = "translateY(0)";
//         }}
//       >
//         <CgInstagram size={18} />
//         @darawilliam.s
//         {/* Animated underline */}
//         <span style={{
//           position: "absolute", bottom: -1, left: 0, right: 0,
//           height: "1px",
//           background: "linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent)",
//         }} />
//       </a>

//       {/* Sub */}
//       <p
//         ref={subRef}
//         style={{
//           fontSize: "clamp(0.55rem,0.85vw,0.68rem)",
//           color: "rgba(255,255,255,0.18)",
//           letterSpacing: "0.35em",
//           textTransform: "uppercase",
//           margin: 0,
//           lineHeight: 1.8,
//         }}
//       >
//         Reels · Behind the scenes · Brand stories
//       </p>
//     </div>
//   );
// }

// ─── Project CTA section ──────────────────────────────────────────────────────
export function Ctasections() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const eyebrowRef  = useRef<HTMLDivElement>(null);
  const headingRef  = useRef<HTMLHeadingElement>(null);
  const subRef      = useRef<HTMLParagraphElement>(null);
  const btnRef      = useRef<HTMLDivElement>(null);
  const dividerRef  = useRef<HTMLDivElement>(null);

  useReveal([eyebrowRef as any, headingRef as any, subRef as any, btnRef as any]);

  // Divider line animation
  useEffect(() => {
    const el = dividerRef.current;
    if (!el) return;
    el.style.transform = "scaleX(0)";
    el.style.transition = "transform 1.2s ease 0.3s";
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          el.style.transform = "scaleX(1)";
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#000",
        // borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Full-width ambient glow */}
      <div style={{
        position: "absolute",
        top: "40%", left: "50%",
        transform: "translate(-50%,-50%)",
        width: "80vw", height: "50vh",
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(254,233,206,0.04) 0%, transparent 65%)",
        pointerEvents: "none",
      }} aria-hidden="true" />

      {/* Grain */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.025,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "180px",
      }} aria-hidden="true" />

      <div style={{
        padding: "clamp(5rem,12vh,9rem) clamp(1.5rem,6vw,6rem)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 0,
        position: "relative",
        zIndex: 1,
      }}>

        {/* Eyebrow */}
        {/* <div
          ref={eyebrowRef as any}
          style={{
            display: "flex", alignItems: "center", gap: 10,
            marginBottom: "clamp(1.5rem,3vh,2.5rem)",
          }}
        >
          <span style={{ width: 20, height: 1, background: "rgba(255,255,255,0.15)", display: "block" }} />
          <span style={{
            fontSize: "clamp(0.5rem,0.85vw,0.62rem)",
            letterSpacing: "0.44em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.2)",
          }}>
            Next
          </span>
          <span style={{ width: 20, height: 1, background: "rgba(255,255,255,0.15)", display: "block" }} />
        </div> */}

        {/* <InstagramCTA /> */}

        {/* Large heading */}
        <h2
          ref={headingRef}
          style={{
            fontSize: "clamp(3rem,7vw,6.5rem)",
            fontWeight: 300,
            color: "#FEE9CE",
            lineHeight: 0.9,
            letterSpacing: "-0.03em",
            margin: "0 0 clamp(1.5rem,3vh,2.5rem)",
            maxWidth: "clamp(300px,70vw,900px)",
          }}
        >
          Watch more on<br />
          <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.18)" }}>Instagram</em>
        </h2>

        {/* Animated divider */}
        <div
          ref={dividerRef}
          style={{
            width: "clamp(40px,6vw,80px)", height: "1px",
            background: "linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent)",
            margin: "0 0 clamp(1.5rem,3vh,2.5rem)",
            transformOrigin: "center",
          }}
        />

        {/* Sub copy */}
        <p
          ref={subRef}
          style={{
            fontSize: "clamp(0.7rem,1.1vw,0.85rem)",
            color: "rgba(255,255,255,0.2)",
            letterSpacing: "0.06em",
            lineHeight: 1.9,
            margin: "0 0 clamp(2rem,4vh,3.5rem)",
            maxWidth: 360,
          }}
        >
          We craft product films that make people<br />
          stop scrolling and start buying.
        </p>

        {/* Button */}
        {/* <div ref={btnRef}> */}
          <ButtonTrans text="Watch on Instagram" textsecond="@darawilliam.s" />
        {/* </div> */}
      </div>
    </div>
  );
}