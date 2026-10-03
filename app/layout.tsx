import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer/page"
import ScrollToTop from "./components/ScrollToTop";

const clashDisplay = localFont({
  src: [
    { path: "../public/fonts/ClashDisplay-Extralight.otf", weight: "200", style: "normal" },
    { path: "../public/fonts/ClashDisplay-Light.otf", weight: "300", style: "normal" },
    { path: "../public/fonts/ClashDisplay-Regular.otf", weight: "400", style: "normal" },
    { path: "../public/fonts/ClashDisplay-Medium.otf", weight: "500", style: "normal" },
    { path: "../public/fonts/ClashDisplay-Semibold.otf", weight: "600", style: "normal" },
    { path: "../public/fonts/ClashDisplay-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-clash-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ekho Studios",
  description: "We help brands bring their products to life.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={clashDisplay.variable} suppressHydrationWarning>
      <body>
        <SmoothScroll>
          <Navbar />
          <ScrollToTop />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
