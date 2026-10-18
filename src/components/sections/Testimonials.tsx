"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { site } from "@/data/site";

const AUTO_MS = 7000;
const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary";

function Stars({ rating, size }: { rating: number; size: number }) {
  return (
    <span
      role="img"
      aria-label={`Rated ${rating} out of 5`}
      className="inline-flex gap-0.5"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          aria-hidden
          className={i < rating ? "fill-amber-300 text-amber-300" : "text-white/30"}
        />
      ))}
    </span>
  );
}

export function Testimonials() {
  const reduce = useReducedMotion();
  const items = site.testimonials;
  const { reviewsSummary } = site;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const featuredRef = useRef<HTMLDivElement>(null);

  const go = useCallback(
    (i: number) => setActive(((i % items.length) + items.length) % items.length),
    [items.length],
  );

  // Auto-advance; re-running on `active` resets the timer after any manual change.
  useEffect(() => {
    if (reduce || paused) return;
    const id = setTimeout(() => setActive((a) => (a + 1) % items.length), AUTO_MS);
    return () => clearTimeout(id);
  }, [active, paused, reduce, items.length]);

  const t = items[active];
  const others = items.map((item, i) => ({ item, i })).filter(({ i }) => i !== active);

  const promote = (i: number) => {
    setActive(i);
    featuredRef.current?.focus({ preventScroll: true });
    featuredRef.current?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "center",
    });
  };

  return (
    <section
      id="testimonials"
      className="relative isolate overflow-hidden bg-primary py-20 text-primary-foreground lg:py-28"
    >
      <div
        aria-hidden
        className="absolute -right-24 -top-24 -z-10 size-[28rem] rounded-full bg-[#134E4A] opacity-40 blur-3xl"
      />

      <Container>
        <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:items-end lg:justify-between lg:text-left">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-accent">
              Patient stories
            </p>
            <h2
              className="mt-3 max-w-[20ch] font-display font-semibold leading-tight tracking-tight text-white"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
            >
              Real people. Real results.
            </h2>
          </div>
          <a
            href={site.socials.google}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur ${focusRing}`}
          >
            <Star size={16} aria-hidden className="fill-amber-300 text-amber-300" />
            {reviewsSummary.rating} · {reviewsSummary.count} reviews on{" "}
            {reviewsSummary.source}
          </a>
        </div>

        {/* Featured quote */}
        <div
          className="mx-auto mt-14 max-w-[760px] text-center"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <span
            aria-hidden
            className="-mb-12 block font-display text-[8rem] leading-none text-accent/30"
          >
            “
          </span>

          <div
            ref={featuredRef}
            tabIndex={-1}
            aria-live="polite"
            className="min-h-[15rem] outline-none sm:min-h-[13rem]"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.figure
                key={active}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: reduce ? 0 : 0.35 }}
              >
                <blockquote
                  className="font-display font-normal italic leading-snug text-white"
                  style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.875rem)" }}
                >
                  {t.quote}
                </blockquote>
                <figcaption className="mt-8 flex flex-col items-center gap-3">
                  <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
                    <span
                      aria-hidden
                      className="flex size-12 items-center justify-center rounded-full border border-white/20 bg-white/10 font-display text-sm text-white"
                    >
                      {t.initials}
                    </span>
                    <span className="font-semibold text-white">{t.name}</span>
                    {(t.treatment || t.date) && (
                      <>
                        <span aria-hidden className="text-white/60">
                          ·
                        </span>
                        <span className="text-sm text-white/85">
                          {[t.treatment, t.date].filter(Boolean).join(" · ")}
                        </span>
                      </>
                    )}
                  </div>
                  <Stars rating={t.rating} size={16} />
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => go(active - 1)}
              className={`hidden size-11 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20 md:flex ${focusRing}`}
            >
              <ChevronLeft size={20} aria-hidden />
            </button>
            <div role="tablist" aria-label="Testimonials" className="flex items-center">
              {items.map((item, i) => (
                <button
                  key={item.name}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Show testimonial ${i + 1} of ${items.length}`}
                  onClick={() => go(i)}
                  className={`group flex size-11 items-center justify-center rounded-full ${focusRing}`}
                >
                  <span
                    aria-hidden
                    className={`size-2.5 rounded-full transition-colors ${
                      i === active ? "bg-white" : "bg-white/30 group-hover:bg-white/60"
                    }`}
                  />
                </button>
              ))}
            </div>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => go(active + 1)}
              className={`hidden size-11 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20 md:flex ${focusRing}`}
            >
              <ChevronRight size={20} aria-hidden />
            </button>
          </div>
        </div>

        {/* Other reviews */}
        <div
          role="region"
          aria-label="More patient reviews"
          className="-mx-5 mt-16 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-5"
        >
          {others.map(({ item, i }) => (
            <button
              key={item.name}
              type="button"
              aria-label={`Read full review from ${item.name}`}
              onClick={() => promote(i)}
              className={`flex w-[280px] shrink-0 snap-start cursor-pointer flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 text-left backdrop-blur transition-colors hover:border-white/20 hover:bg-white/10 md:w-auto ${focusRing}`}
            >
              <Stars rating={item.rating} size={14} />
              <p className="line-clamp-3 text-sm leading-relaxed text-white/90">
                {item.quote}
              </p>
              <span className="mt-auto flex items-center gap-2 pt-1">
                <span
                  aria-hidden
                  className="flex size-8 items-center justify-center rounded-full border border-white/20 bg-white/10 font-display text-xs text-white"
                >
                  {item.initials}
                </span>
                <span className="text-xs font-medium text-white">{item.name}</span>
              </span>
            </button>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href={site.socials.google}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex min-h-11 items-center text-sm text-white/90 underline-offset-4 hover:underline ${focusRing}`}
          >
            Read all {reviewsSummary.count}+ reviews on {reviewsSummary.source} →
          </a>
          <p className="mt-1 text-xs text-white/80">
            Verified reviews. We never incentivise or edit patient feedback.
          </p>
        </div>
      </Container>
    </section>
  );
}

export default Testimonials;
