"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    requestAnimationFrame(() => {
      (window as any).lenis?.scrollTo(0, {
        immediate: true,
      }) || window.scrollTo(0, 0);
    });
  }, [pathname]);

  return null;
}