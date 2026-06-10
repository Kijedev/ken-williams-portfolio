import HeroPage from "@/app/components/Hero/page"
import Revolutionalize from "@/app/components/Revolutionalize";
import FAQs from "@/app/components/FAQs";
import BentoGallery from "@/app/components/ui/Bentogallery";
import ScrollTextReveal from "@/app/components/ui/ScrollTextReveal";
import Brands from "@/app/components/ui/Brands"
import VideoHero from "@/app/components/VideoHero/page"
import ScrollBg from "@/app/components/ScollBg"
import TestimonialsCarousel from "../components/Testimonials";
import BrandsMarquee from "@/app/components/ui/Brands";

export default function Page() {
  return (
    <div className="overflow-x-hidden bg-black">
      {/* <HeroPage /> */}
      <VideoHero />
      {/* <Revolutionalize /> */}
      <ScrollBg />
      <BrandsMarquee />
      <ScrollTextReveal />
      <BentoGallery />
      <TestimonialsCarousel />
      <FAQs />
    </div>
  );
}
