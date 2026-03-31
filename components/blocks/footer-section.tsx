import Link from "next/link";
import { Globe, Link2, Mail, MessageCircle, Share2 } from "lucide-react";

import { FooterBackgroundGradient, TextHoverEffect } from "@/components/ui/hover-footer";
import { VelorLogo } from "@/components/VelorLogo";

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Indicator Engine", href: "#features" },
      { label: "Smart Alerts", href: "#features" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "FAQ", href: "#faq" },
      { label: "Contact", href: "mailto:hello@velor.app" },
      { label: "Terms", href: "/terms" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
] as const;

const contactInfo = [
  {
    icon: <Mail size={18} className="shrink-0 text-primary" aria-hidden />,
    text: "hello@velor.app",
    href: "mailto:hello@velor.app",
  },
  {
    icon: <Mail size={18} className="shrink-0 text-primary" aria-hidden />,
    text: "support@velor.app",
    href: "mailto:support@velor.app",
  },
] as const;

const socialLinks = [
  { icon: <Share2 size={20} aria-hidden />, label: "Social", href: "https://velor.app" },
  { icon: <MessageCircle size={20} aria-hidden />, label: "Community", href: "https://velor.app" },
  { icon: <Link2 size={20} aria-hidden />, label: "Links", href: "https://velor.app" },
  { icon: <Globe size={20} aria-hidden />, label: "Website", href: "https://velor.app" },
] as const;

export function FooterSection() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="footer"
      className="dark scroll-mt-20 border-t border-white/[0.08] bg-black pb-6 pt-4 sm:pb-8 sm:pt-6"
      aria-labelledby="footer-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="relative m-0 overflow-hidden rounded-2xl border border-white/10 bg-black sm:m-0 md:rounded-3xl">
          <FooterBackgroundGradient />
          <div className="relative z-10 mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-12 md:p-14">
            <div className="grid grid-cols-1 gap-10 sm:gap-12 md:grid-cols-2 md:gap-8 lg:grid-cols-4 lg:gap-14">
              <div className="flex flex-col space-y-4">
                <VelorLogo />
                <p className="text-sm leading-relaxed text-white/75">
                  VELOR is a market intelligence platform designed to help investors and traders bring clarity,
                  structure, and control into one dashboard.
                </p>
              </div>

              {footerLinks.map((section) => (
                <div key={section.title}>
                  <h3 className="mb-5 text-lg font-semibold text-white sm:mb-6">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.links.map((link) => {
                      const isMail = link.href.startsWith("mailto:");
                      const isTel = link.href.startsWith("tel:");
                      const isAppRoute = link.href.startsWith("/") && !link.href.startsWith("//");
                      const isHash = link.href.startsWith("#");
                      const useNext = isHash || isAppRoute;
                      const external = !useNext && !isMail && !isTel && link.href.startsWith("http");
                      const className = "text-white/75 transition-colors hover:text-primary";
                      return (
                        <li key={link.label} className="relative text-sm">
                          {useNext ? (
                            <Link href={link.href} className={className}>
                              {link.label}
                            </Link>
                          ) : (
                            <a
                              href={link.href}
                              className={className}
                              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            >
                              {link.label}
                            </a>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}

              <div>
                <h3 className="mb-5 text-lg font-semibold text-white sm:mb-6">Contact</h3>
                <ul className="space-y-4">
                  {contactInfo.map((item) => (
                    <li key={item.text} className="flex items-start gap-3 text-sm">
                      {item.icon}
                      <a href={item.href} className="text-white/75 transition-colors hover:text-primary">
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="hidden w-full overflow-x-hidden py-4 sm:py-6 lg:block" aria-hidden>
              <TextHoverEffect text="VELOR" />
            </div>

            <hr className="my-8 border-t border-white/10" />

            <div className="flex flex-col items-center justify-between gap-6 text-sm text-white/55 md:flex-row md:gap-4">
              <div className="flex flex-wrap justify-center gap-5 sm:gap-6 md:justify-start">
                {socialLinks.map(({ icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-primary"
                  >
                    {icon}
                  </a>
                ))}
              </div>
              <p className="text-center md:text-right">
                © {year} VELOR. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
