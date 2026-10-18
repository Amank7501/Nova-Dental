import { Suspense } from "react";
import { cacheLife } from "next/cache";
import { Globe } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { navLinks } from "@/data/nav";
import { site } from "@/data/site";

// lucide-react v1 no longer ships brand icons, so these two are inline SVGs.
async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

const socialClass =
  "inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-background transition-colors hover:bg-primary";

const headingClass = "mb-4 font-display text-lg font-semibold text-background";
const linkClass = "text-background/70 transition-colors hover:text-background";

export function Footer() {
  const { address } = site;
  return (
    <footer className="bg-slate-900 text-background">
      <Container className="py-12 max-md:pb-28 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div>
            <p className="font-display text-2xl font-semibold text-accent">
              {site.name}
            </p>
            <p className="mt-3 text-sm text-background/70">{site.tagline}.</p>
            <p className="mt-1 text-sm text-background/70">
              Trusted by {site.stats[0].value} {site.stats[0].label.toLowerCase()}{" "}
              in {address.city}.
            </p>
          </div>

          <div>
            <h3 className={headingClass}>Quick Links</h3>
            <ul className="space-y-1 text-sm">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className={`${linkClass} inline-flex min-h-11 items-center md:min-h-0 md:py-1`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={headingClass}>Contact</h3>
            <address className="space-y-3 text-sm not-italic text-background/70">
              <p>
                {address.line1}
                <br />
                {address.line2}
                <br />
                {address.city}, {address.state} {address.pin}
              </p>
              <p>
                <a
                  href={site.phoneHref}
                  className={`${linkClass} inline-flex min-h-11 items-center md:min-h-0`}
                >
                  {site.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${site.email}`}
                  className={`${linkClass} inline-flex min-h-11 items-center break-all md:min-h-0`}
                >
                  {site.email}
                </a>
              </p>
            </address>
          </div>

          <div>
            <h3 className={headingClass}>Hours</h3>
            <ul className="space-y-2 text-sm text-background/70">
              {site.hours.map((h) => (
                <li key={h.day}>
                  <span className="block text-background">{h.day}</span>
                  {h.time}
                </li>
              ))}
            </ul>
            <h3 className={`${headingClass} mt-8`}>Follow us</h3>
            <div className="flex gap-3">
              <a
                href={site.socials.instagram}
                aria-label="Instagram"
                className={socialClass}
              >
                <InstagramIcon className="size-5" />
              </a>
              <a
                href={site.socials.facebook}
                aria-label="Facebook"
                className={socialClass}
              >
                <FacebookIcon className="size-5" />
              </a>
              <a
                href={site.socials.google}
                aria-label="Google reviews"
                className={socialClass}
              >
                <Globe className="size-5" aria-hidden />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-background/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <Suspense fallback={null}><CurrentYear /></Suspense> {site.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-3">
            <a href="#" className="inline-flex min-h-11 items-center hover:text-background sm:min-h-0">
              Privacy Policy
            </a>
            <span aria-hidden>·</span>
            <span>Made with care</span>
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
