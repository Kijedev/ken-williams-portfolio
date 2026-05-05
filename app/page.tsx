import type { Metadata } from "next";
import Home from "@/app/Home/page"

export const metadata: Metadata = {
  title: "Ekho Studios",
  description: "We help brands bring their products to life.",
};

export default function page() {
  return (
    <Home />
  );
}