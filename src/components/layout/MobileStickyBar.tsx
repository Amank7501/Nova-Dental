"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";
import { useScrolledPastHero } from "@/lib/useScrolledPastHero";

export function MobileStickyBar() {
  const visible = useScrolledPastHero();
  const reduce = useReducedMotion();

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reduce ? false : { y: "100%" }}
          animate={{ y: 0 }}
          exit={reduce ? undefined : { y: "100%" }}
          transition={{ duration: reduce ? 0 : 0.3, ease: "easeOut" }}
          className="fixed inset-x-0 bottom-0 z-30 flex gap-2 border-t border-border bg-surface-raised p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden"
        >
          <a
            href={site.phoneHref}
            aria-label={`Call ${site.name}`}
            className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"
          >
            <Phone className="size-5" aria-hidden />
          </a>
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700"
          >
            <MessageCircle className="size-5" aria-hidden />
          </a>
          <Button asChild className="h-12 flex-1 rounded-xl text-base">
            <a href="#appointment">Book</a>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default MobileStickyBar;
