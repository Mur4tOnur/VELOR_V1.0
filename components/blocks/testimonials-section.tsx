import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="dark scroll-mt-20 border-t border-white/[0.06] bg-black py-16 md:py-28"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2
          id="testimonials-heading"
          className="mb-10 text-center text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground md:mb-14"
        >
          Testimonials
        </h2>
        <p className="mx-auto mb-8 max-w-xl px-1 text-center text-sm text-muted-foreground sm:mb-10 md:mb-12 md:text-base">
          Illustrative feedback only—not investment advice or performance claims.
        </p>
        <div className="velor-testimonials-fade-in mx-auto w-full max-w-[min(100%,calc(100vw-1.5rem))] overflow-x-hidden rounded-none sm:max-w-5xl sm:rounded-lg">
          <StaggerTestimonials />
        </div>
      </div>
    </section>
  );
}
