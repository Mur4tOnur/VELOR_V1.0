import { FAQWithSpiral, type FAQEntry } from "@/components/ui/faq-section";

const VELOR_FAQS: FAQEntry[] = [
  {
    q: "Is VELOR financial advice?",
    a: "No. VELOR is a market intelligence platform that helps users interpret market conditions and manage portfolio context. It does not provide personalized financial advice.",
  },
  {
    q: "What do FADE, OVERHEAT, DISCOUNT, and VALUE mean?",
    a: "These are condition labels used inside VELOR to describe expensive, overheated, discounted, and deep value zones based on the platform’s market logic.",
  },
  {
    q: "Can I connect multiple brokers to one account?",
    a: "Yes. Depending on your plan, you can connect multiple brokers and review positions, allocation, and account activity from one place.",
  },
  {
    q: "Which markets does VELOR support?",
    a: "VELOR is designed to support crypto, indices, commodities, and forex through market-specific views and dashboard modules.",
  },
  {
    q: "Does VELOR place trades automatically?",
    a: "Not in the standard dashboard experience. VELOR is built to provide visibility, context, and alerts first.",
  },
  {
    q: "Who is VELOR built for?",
    a: "VELOR is built for investors and traders who want cleaner decision-making, stronger portfolio visibility, and less fragmentation across platforms.",
  },
];

export function FAQSection() {
  return (
    <section
      id="faq"
      className="dark scroll-mt-20 border-t border-white/[0.06] bg-black"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-6xl px-4 pt-12 sm:px-6 md:pt-16">
        <p className="mb-6 text-center text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground md:mb-8">
          FAQ
        </p>
        <FAQWithSpiral
          faqs={VELOR_FAQS}
          titleId="faq-heading"
          title="FAQ"
          description="Straight answers about how VELOR fits your workflow."
          showFooter={false}
          className="px-0 sm:px-0"
        />
      </div>
    </section>
  );
}
