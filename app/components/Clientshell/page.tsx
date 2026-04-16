"use client";

import { useState } from "react";
import Preloader from "../Preloader";
import Navbar from "../Navbar";
import Footer from "../Footer/page";
import SmoothScroll from "../SmoothScroll";

export default function Page({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <SmoothScroll>
      {/* {!loaded && <Preloader onComplete={() => setLoaded(true)} />} */}
      <Navbar />
      {children}
      <Footer />
    </SmoothScroll>
  );
}