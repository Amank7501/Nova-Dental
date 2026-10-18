"use client";

import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { CalendarClock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/layout/Container";
import { site } from "@/data/site";
import { placeholder } from "@/lib/img";
import { getOpenStatus } from "@/lib/openStatus";

const HERO_SRC = "/placeholders/hero.jpg";
const HERO_FALLBACK = placeholder(800, 1000);

function StatsStrip({ className = "" }: { className?: string }) {
  const stats = site.stats.slice(0, 3);
  return (
    <dl
      className={`flex items-stretch divide-x divide-border rounded-2xl border border-border bg-surface-raised py-4 ${className}`}
    >
      {stats.map((s) => (
        <div key={s.label} className="flex-1 px-3 text-center sm:px-6">
          <dt className="sr-only">{s.label}</dt>
          <dd className="font-display text-xl font-semibold text-ink sm:text-2xl">
            {s.value}
          </dd>
          <p className="mt-0.5 text-xs text-slate-600 sm:text-sm">{s.label}</p>
        </div>
      ))}
    </dl>
  );
}

// Driven by getOpenStatus so closed days (Sunday) read correctly. Server snapshot is "" (static output).
function todaySnapshot() {
  const st = getOpenStatus(site.hours, new Date());
  return st.isOpen
    ? `Open today till ${st.nextChange.replace("Closes at ", "").replace(":00", "")}`
    : st.label;
}

function OpenToday() {
  const text = useSyncExternalStore(() => () => {}, todaySnapshot, () => "");
  return <>{text || "Open six days a week"}</>;
}

export function Hero() {
  const reduce = useReducedMotion();
  const [src, setSrc] = useState(HERO_SRC);
  const doctor = site.doctors[0];

  const reveal = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  });

  return (
    <section id="home" className="relative overflow-hidden bg-surface py-16 lg:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[3fr_2fr] lg:gap-16">
          <div>
            <motion.div {...reveal(0)}>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-raised px-3 py-1.5 text-xs font-medium uppercase tracking-widest text-slate-600">
                <span className="size-2 rounded-full bg-accent-warm" aria-hidden />
                Now accepting new patients
              </span>
            </motion.div>

            <motion.h1
              {...reveal(0.1)}
              className="mt-6 max-w-[16ch] font-display font-semibold leading-[1.05] tracking-tight text-ink"
              style={{ fontSize: "clamp(2.25rem, 7vw, 3.5rem)" }}
            >
              Expert dental care, <span className="italic text-primary">every smile</span>{" "}
              matters.
            </motion.h1>

            <motion.p
              {...reveal(0.2)}
              className="mt-5 max-w-[42ch] text-base text-slate-600 lg:text-lg"
            >
              A modern dental clinic in {site.address.city} offering gentle, honest,
              specialist-led care — from routine check-ups to full-mouth
              rehabilitation.
            </motion.p>

            <motion.div
              {...reveal(0.3)}
              className="mt-8 flex flex-col gap-3 sm:max-w-sm lg:max-w-none lg:flex-row"
            >
              <Button asChild size="lg" className="h-12 w-full px-8 text-base lg:w-auto">
                <a href="#appointment">Book Appointment</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 w-full px-8 text-base lg:w-auto"
              >
                <a href="#services">See Services</a>
              </Button>
            </motion.div>

            <motion.div {...reveal(0.4)} className="mt-10 lg:hidden">
              <StatsStrip />
            </motion.div>
          </div>

          <motion.div {...reveal(0.3)} className="relative isolate mx-auto w-full max-w-sm lg:max-w-none">
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 -z-10 h-[110%] w-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/40 blur-3xl lg:h-[120%] lg:w-[120%] lg:bg-primary/40"
            />
            <div className="relative overflow-hidden rounded-3xl bg-primary lg:rounded-[2.5rem] lg:bg-gradient-to-br lg:from-primary lg:to-[#134E4A]">
              <Image
                src={src}
                alt={`${doctor.name}, Founder at ${site.name}`}
                width={800}
                height={1000}
                priority
                ref={(img) => {
                  // Catch a 404 that happened before hydration attached onError.
                  if (img?.complete && img.naturalWidth === 0) setSrc(HERO_FALLBACK);
                }}
                sizes="(min-width: 1024px) 480px, (min-width: 640px) 384px, 90vw"
                onError={() => src !== HERO_FALLBACK && setSrc(HERO_FALLBACK)}
                className="aspect-[4/5] h-auto w-full object-cover lg:tint-duotone"
              />
            </div>

            <Card className="absolute -left-6 bottom-8 hidden w-fit items-center gap-3 border-border bg-white p-4 shadow-soft lg:flex">
              <div>
                <p className="flex items-center gap-1.5 font-display text-xl font-semibold text-ink">
                  {site.rating.score}
                  <span className="flex" aria-hidden>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                    ))}
                  </span>
                </p>
                <p className="text-xs text-slate-600">
                  on Google · {site.rating.reviews} reviews
                </p>
              </div>
            </Card>

            <Card className="absolute -right-4 top-8 hidden w-fit flex-row items-center gap-2 border-border bg-white px-4 py-3 shadow-soft lg:flex">
              <CalendarClock className="size-5 text-primary" aria-hidden />
              <span className="text-sm font-medium text-ink">
                <OpenToday />
              </span>
            </Card>
          </motion.div>
        </div>

        <motion.div {...reveal(0.5)} className="mt-16 hidden lg:block">
          <StatsStrip className="mx-auto" />
        </motion.div>
      </Container>
    </section>
  );
}

export default Hero;
