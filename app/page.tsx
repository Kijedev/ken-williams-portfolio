import Image from "next/image";
import Footer from "./Footer/page"
import HeroPage from "./Hero/page"
import Revolutionalize from "./components/Revolutionalize";

export default function Home() {
  return (
    <div>
      <HeroPage />
      <Revolutionalize />
      <Footer />
    </div>
  );
}
