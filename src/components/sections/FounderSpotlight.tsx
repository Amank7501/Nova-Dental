"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { SafeImage } from "@/components/common/SafeImage";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { site } from "@/data/site";
import { placeholder } from "@/lib/img";

const BIO_LIMIT = 200;

export function FounderSpotlight() {
  const reduce = useReducedMotion();
  const d = site.doctors[0];
  const firstName = d.name.replace(/^Dr\.?\s+/i, "").split(" ")[0];
  const long = d.bio.length > BIO_LIMIT;
  const bio = long ? `${d.bio.slice(0, BIO_LIMIT).trimEnd()}…` : d.bio;

  const from = (x: number, delay: number) => ({
    initial: reduce ? false : { opacity: 0, x },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  });

  return (
    <div className="grid items-center gap-10 lg:grid-cols-12">
      <motion.div {...from(-24, 0)} className="relative isolate lg:col-span-5">
        <div
          aria-hidden
          className="absolute -left-10 top-1/4 -z-10 size-3/4 rounded-full bg-primary/30 blur-3xl"
        />
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-[#134E4A] lg:rounded-[2.5rem]">
          <SafeImage
            src={d.image}
            fallback={placeholder(800, 1000, d.name)}
            alt={`${d.name}, ${d.role} at ${site.name}`}
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="tint-duotone object-cover"
          />
          <div className="absolute right-4 top-4 rounded-2xl bg-white p-4 shadow-soft">
            <p className="font-display text-lg font-semibold text-ink">
              {d.yearsExperience}+ years
            </p>
            {d.regNumber && (
              <p className="text-xs text-slate-600">Reg. {d.regNumber}</p>
            )}
          </div>
        </div>
      </motion.div>

      <motion.div {...from(24, 0.1)} className="lg:col-span-7">
        <p className="text-xs font-medium uppercase tracking-widest text-primary">
          Founder
        </p>
        <h3 className="mt-3 font-display text-3xl font-semibold text-ink lg:text-4xl">
          {d.name}
        </h3>
        <p className="mt-2 text-base text-slate-600">{d.role}</p>
        <p className="mt-1 text-sm text-slate-600">{d.qualifications}</p>

        <div className="my-6 h-0.5 w-16 bg-primary" aria-hidden />

        <p className="max-w-[42ch] font-display text-lg italic leading-relaxed text-ink">
          {bio}
        </p>
        {long && (
          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                className="mt-2 inline-flex min-h-11 items-center text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                Read more
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-display">{d.name}</DialogTitle>
                <DialogDescription>{d.role}</DialogDescription>
              </DialogHeader>
              <p className="text-sm leading-relaxed text-ink">{d.bio}</p>
            </DialogContent>
          </Dialog>
        )}

        {d.specialties && (
          <ul className="mt-6 flex flex-wrap gap-2">
            {d.specialties.map((s) => (
              <li
                key={s}
                className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
              >
                {s}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="h-12 px-8 text-base">
            <a href="#appointment">Book with Dr. {firstName}</a>
          </Button>
          <Button asChild size="lg" variant="ghost" className="h-12 px-6 text-base">
            <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="size-5" aria-hidden />
              Message on WhatsApp
            </a>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

export default FounderSpotlight;
