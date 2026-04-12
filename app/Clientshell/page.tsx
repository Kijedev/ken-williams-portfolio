"use client";

import { useState } from "react";
import Preloader from "../components/Preloader";
import Navbar from "../components/Navbar";
import Footer from "../Footer/page";
import SmoothScroll from "../components/SmoothScroll";

export default function ClientShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <SmoothScroll>
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      <Navbar />
      {children}
      <Footer />
    </SmoothScroll>
  );
}