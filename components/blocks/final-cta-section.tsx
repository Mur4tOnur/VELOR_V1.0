import { CtaCard } from "@/components/ui/call-to-action-cta";

const CTA_IMAGE =
  "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=1600&q=80";

export function FinalCtaSection() {
  return (
    <section
      id="final-cta"
      className="dark scroll-mt-20 border-t border-white/[0.06] bg-black py-12 sm:py-16 md:py-20"
      aria-labelledby="final-cta-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="mb-6 text-center text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground md:mb-8">
          Get started
        </p>
        <CtaCard
          titleId="final-cta-heading"
          imageSrc={CTA_IMAGE}
          title="Build your market command center"
          description="Bring signals, sentiment, portfolio visibility, and broker oversight into one focused dashboard with VELOR."
          buttonText="Open Dashboard"
          primaryHref="/dashboard"
          secondaryButtonText="Get Started"
          secondaryHref="#pricing"
          className="rounded-2xl"
        />
      </div>
    </section>
  );
}
