"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SafeImage } from "@/components/common/SafeImage";
import type { Doctor } from "@/data/site";
import { placeholder } from "@/lib/img";

type Props = { doctor: Doctor; variant?: "specialist"; className?: string };

export function DoctorCard({ doctor, className = "" }: Props) {
  const reduce = useReducedMotion();

  return (
    <motion.a
      href="#appointment"
      aria-label={`Book with ${doctor.name}`}
      initial="rest"
      whileHover="hover"
      variants={{ rest: { y: 0 }, hover: { y: reduce ? 0 : -4 } }}
      className={`block rounded-3xl border border-border/60 bg-surface-raised p-6 transition-[box-shadow,border-color] hover:border-primary/20 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-[#134E4A]">
        <motion.div
          className="absolute inset-0"
          variants={{ rest: { scale: 1 }, hover: { scale: reduce ? 1 : 1.05 } }}
          transition={{ duration: 0.4 }}
        >
          <SafeImage
            src={doctor.image}
            fallback={placeholder(600, 750, doctor.name)}
            alt={`${doctor.name}, ${doctor.role}`}
            fill
            sizes="(min-width: 1024px) 280px, (min-width: 768px) 40vw, 260px"
            className="tint-duotone object-cover"
          />
        </motion.div>
      </div>

      <div className="pt-5">
        <h4 className="font-display text-xl font-semibold text-ink">{doctor.name}</h4>
        <p className="mt-1 text-sm text-slate-600">{doctor.role}</p>
        <p className="mt-1 text-xs text-slate-600">{doctor.qualifications}</p>
        {doctor.specialties && (
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {doctor.specialties.map((s) => (
              <li
                key={s}
                className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary"
              >
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.a>
  );
}

export default DoctorCard;
