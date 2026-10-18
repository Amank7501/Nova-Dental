"use client";

import { MessageCircle, Phone } from "lucide-react";
import { site } from "@/data/site";
import { useScrolledPastHero } from "@/lib/useScrolledPastHero";

const base =
  "relative inline-flex size-14 items-center justify-center rounded-full text-white shadow-soft transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export function FloatingActions() {
  // On mobile the sticky bar takes over once the hero is scrolled past.
  const stickyBarShowing = useScrolledPastHero();

  return (
    <div
      className={`fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-[max(1.5rem,env(safe-area-inset-right))] z-40 flex flex-col gap-3 ${
        stickyBarShowing ? "max-md:hidden" : ""
      }`}
    >
      <a
        href={site.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className={`${base} bg-[#25D366]`}
      >
        <span
          aria-hidden
          className="wa-pulse pointer-events-none absolute inset-0 rounded-full bg-[#25D366]"
        />
        <MessageCircle className="relative size-7" aria-hidden />
      </a>
      <a
        href={site.phoneHref}
        aria-label={`Call ${site.name}`}
        className={`${base} bg-primary md:hidden`}
      >
        <Phone className="size-6" aria-hidden />
      </a>
    </div>
  );
}

export default FloatingActions;
