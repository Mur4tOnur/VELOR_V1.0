import type { TestimonialCardProps } from "@/components/ui/twitter-testimonial-cards";
import Testimonials from "@/components/ui/twitter-testimonial-cards";

const VELOR_TESTIMONIALS: TestimonialCardProps[] = [
  {
    className:
      "[grid-area:stack] grayscale-[100%] before:absolute before:left-0 before:top-0 before:h-[100%] before:w-[100%] before:rounded-2xl before:bg-background/60 before:bg-blend-overlay before:outline-1 before:outline-border before:transition-opacity before:duration-500 before:content-[''] hover:-translate-y-10 hover:grayscale-0 hover:before:opacity-0",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ElenaMarquez",
    username: "Elena Marquez",
    handle: "@elena_risk",
    content:
      "HTF exhaustion markers finally match how I read extension. The indicator engine flagged two stretched legs early this quarter—less guesswork, tighter risk.",
    date: "Mar 12, 2026",
    verified: true,
    likes: 184,
    retweets: 31,
    tweetUrl: "https://x.com",
  },
  {
    className:
      "[grid-area:stack] translate-x-8 translate-y-6 grayscale-[100%] before:absolute before:left-0 before:top-0 before:h-[100%] before:w-[100%] before:rounded-2xl before:bg-background/60 before:bg-blend-overlay before:outline-1 before:outline-border before:transition-opacity before:duration-500 before:content-[''] hover:-translate-y-1 hover:grayscale-0 hover:before:opacity-0 sm:translate-x-16 sm:translate-y-10",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=JamesOkonkwo",
    username: "James Okonkwo",
    handle: "@jayo_fx",
    content:
      "Seeing positions next to portfolio framing in one place changed how I size. I spot concentration fast without five tabs open—boring in the best way.",
    date: "Mar 8, 2026",
    verified: true,
    likes: 96,
    retweets: 14,
    tweetUrl: "https://x.com",
  },
  {
    className:
      "[grid-area:stack] translate-x-16 translate-y-12 hover:translate-y-6 sm:translate-x-32 sm:translate-y-20 sm:hover:translate-y-10",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=MiraLindholm",
    username: "Mira Lindholm",
    handle: "@mira_lindholm",
    content:
      "Smart alerts hit my levels without spamming me. I touch the book when it matters; the noise is gone. This actually fits a disciplined workflow.",
    date: "Mar 4, 2026",
    verified: true,
    likes: 241,
    retweets: 52,
    tweetUrl: "https://x.com",
  },
];

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="dark scroll-mt-20 border-t border-white/[0.06] bg-black py-16 md:py-28"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-6xl px-6">
        <h2
          id="testimonials-heading"
          className="mb-10 text-center text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground md:mb-14"
        >
          Testimonials
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-center text-sm text-muted-foreground md:mb-12 md:text-base">
          Fictional trader voices—illustrative only, not investment advice or
          performance claims.
        </p>
        <div className="mx-auto flex min-h-[min(520px,72vh)] w-full max-w-4xl items-center justify-center overflow-x-hidden py-4 sm:py-8">
          <Testimonials cards={VELOR_TESTIMONIALS} />
        </div>
      </div>
    </section>
  );
}
