"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Award, ShieldCheck, Star, Users } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { site } from "@/data/site";

const badges = [
  { icon: Star, text: `${site.rating.score} Google` },
  { icon: Award, text: `${site.stats[1].value} Years` },
  { icon: Users, text: `${site.stats[0].value} Patients` },
  { icon: ShieldCheck, text: "Sterile & Safe" },
];

export function TrustBar() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="bg-primary py-5 text-primary-foreground md:py-6"
    >
      <Container className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm opacity-90">
          Trusted by families across {site.address.city} since {site.since}
        </p>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-3 md:flex md:gap-0">
          {badges.map(({ icon: Icon, text }) => (
            <li
              key={text}
              className="flex items-center gap-2 text-sm font-medium md:border-l md:border-white/20 md:px-6 md:first:border-l-0 md:last:pr-0"
            >
              <Icon size={18} aria-hidden />
              {text}
            </li>
          ))}
        </ul>
      </Container>
    </motion.div>
  );
}

export default TrustBar;
