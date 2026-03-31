import { Features } from "@/components/blocks/features-10";
import { HowItWorks } from "@/components/blocks/how-it-works";
import { FAQSection } from "@/components/blocks/faq-section";
import { FinalCtaSection } from "@/components/blocks/final-cta-section";
import { FooterSection } from "@/components/blocks/footer-section";
import { PricingSection } from "@/components/blocks/pricing-section";
import { TestimonialsSection } from "@/components/blocks/testimonials-section";
import { HeroSection } from "@/components/HeroSection";
import { LandingHud } from "@/components/LandingHud";
import { VelorIntro } from "@/components/VelorIntro";

export default function Home() {
  return (
    <>
      <VelorIntro />
      <main className="min-h-full bg-black text-white">
        <LandingHud />
        <HeroSection />
        <Features />
        <HowItWorks />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <FinalCtaSection />
        <FooterSection />
      </main>
    </>
  );
}
