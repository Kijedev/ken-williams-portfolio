import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer/page"
import ScrollToTop from "./components/ScrollToTop";

const myFont = localFont({
  src: "../public/fonts/ClashDisplay.ttf",
  variable: "--font-myfont",
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
    <html lang="en" suppressHydrationWarning>
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