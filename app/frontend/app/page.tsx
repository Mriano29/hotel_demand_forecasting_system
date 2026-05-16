import { HeroSection } from "@/components/heroSection";
import NavBar from "@/components/navBar";
import Footer from "@/components/footer";
import { FeaturesSection } from "@/components/features";


export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-5 items-center">
        <NavBar />
        <HeroSection />
        <FeaturesSection />
        <Footer />
      </div>
    </main>
  );
}
