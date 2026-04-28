import HeroPage from "@/app/components/Hero/page"
import Revolutionalize from "@/app/components/Revolutionalize";
import FAQs from "@/app/components/FAQs";
import BentoGallery from "@/app/components/ui/Bentogallery";
import ScrollTextReveal from "@/app/components/ui/ScrollTextReveal";
import Brands from "@/app/components/ui/Brands"

export default function Page() {
  return (
    <div className="overflow-x-hidden bg-black">
      <HeroPage />
      <Revolutionalize />
      <Brands />
      <ScrollTextReveal />
      <BentoGallery />
      <FAQs />
    </div>
  );
}
