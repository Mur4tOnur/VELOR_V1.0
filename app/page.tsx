import { Features } from "@/components/blocks/features-10";
import { HowItWorks } from "@/components/blocks/how-it-works";
import { TestimonialsSection } from "@/components/blocks/testimonials-section";
import { HeroSection } from "@/components/HeroSection";

export default function Home() {
  return (
    <main className="min-h-full bg-black text-white">
      <HeroSection />
      <Features />
      <HowItWorks />
      <TestimonialsSection />
    </main>
  );
}
