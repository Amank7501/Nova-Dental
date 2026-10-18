"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Clock, Mail, MapPin, MessageCircle, Phone, type LucideIcon } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { site } from "@/data/site";
import { getOpenStatus } from "@/lib/openStatus";

const linkClass =
  "text-primary underline underline-offset-2 hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm";

function DetailRow({
  icon: Icon,
  label,
  children,
  note,
}: {
  icon: LucideIcon;
  label: string;
  children: ReactNode;
  note?: ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="size-5" aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-widest text-slate-600">{label}</p>
        <div className="mt-1 text-ink">{children}</div>
        {note && <div className="mt-1 text-xs text-slate-600">{note}</div>}
      </div>
    </div>
  );
}

// Snapshot is a string so useSyncExternalStore sees a stable value between minute ticks.
// "" on the server: the clock is only read in the browser.
function subscribeMinute(cb: () => void) {
  const id = setInterval(cb, 60_000);
  return () => clearInterval(id);
}
function statusSnapshot() {
  const s = getOpenStatus(site.hours, new Date());
  return `${s.isOpen ? "1" : "0"}|${s.label}|${s.nextChange}`;
}

function OpenNow() {
  const snap = useSyncExternalStore(subscribeMinute, statusSnapshot, () => "");
  const [open, label, nextChange] = snap.split("|");
  return (
    <div aria-live="polite" className="mt-2 min-h-[1.5rem]">
      {snap && (
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
              open === "1" ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
            }`}
          >
            {label}
          </span>
          {nextChange && <span className="text-xs text-slate-600">{nextChange}</span>}
        </div>
      )}
    </div>
  );
}

export function Contact() {
  const reduce = useReducedMotion();
  const { address, contact } = site;
  const fullAddress = [address.line1, address.line2, address.city, address.state, address.pin].join(", ");
  const directions = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.name}, ${fullAddress}`)}`;
  const hasMap = !!site.mapEmbedUrl && !/PLACEHOLDER/i.test(site.mapEmbedUrl);

  const reveal = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  });

  return (
    <section id="contact" className="bg-surface py-20 lg:py-28">
      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-stretch lg:gap-8">
          <motion.div
            {...reveal(0)}
            className="rounded-3xl border border-border/60 bg-surface-raised p-8 shadow-soft lg:col-span-5 lg:p-10"
          >
            <p className="text-xs font-medium uppercase tracking-widest text-primary">
              {contact.eyebrow}
            </p>
            <h2
              className="mt-3 max-w-[14ch] font-display font-semibold leading-tight tracking-tight text-ink"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
            >
              {contact.heading}
            </h2>
            <p className="mb-8 mt-4 text-slate-600">{contact.subheading}</p>

            <div className="space-y-6">
              <DetailRow
                icon={MapPin}
                label="Address"
                note={
                  <a href={directions} target="_blank" rel="noopener noreferrer" className={`${linkClass} inline-flex min-h-11 items-center text-sm`}>
                    Open in Google Maps →
                  </a>
                }
              >
                <address className="not-italic leading-relaxed">
                  {address.line1}
                  <br />
                  {address.line2}
                  <br />
                  {address.city}, {address.state} {address.pin}
                </address>
              </DetailRow>

              <DetailRow icon={Clock} label="Hours" note={<OpenNow />}>
                <ul className="space-y-1 text-sm">
                  {site.hours.map((h) => (
                    <li key={h.day} className="flex flex-col sm:flex-row sm:justify-between sm:gap-4">
                      <span className="font-medium">{h.day}</span>
                      <span className="text-slate-600">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </DetailRow>

              <DetailRow icon={Phone} label="Phone" note="Call for urgent care or same-day appointments.">
                <a href={site.phoneHref} className={`${linkClass} inline-flex min-h-11 items-center sm:min-h-0`}>
                  {site.phone}
                </a>
              </DetailRow>

              <DetailRow
                icon={MessageCircle}
                label="WhatsApp"
                note="Fastest for questions, photos of concerns, and quick scheduling."
              >
                <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className={`${linkClass} inline-flex min-h-11 items-center sm:min-h-0`}>
                  Message us
                </a>
              </DetailRow>

              <DetailRow icon={Mail} label="Email" note="For insurance queries, invoices, and detailed questions.">
                <a href={`mailto:${site.email}`} className={`${linkClass} inline-flex min-h-11 items-center break-all sm:min-h-0`}>
                  {site.email}
                </a>
              </DetailRow>
            </div>

            <div className="mt-8 border-t border-border pt-8">
              <h3 className="font-display text-sm font-semibold text-ink">Finding us</h3>
              <ul className="mt-3 space-y-2">
                {contact.landmarks.map((l) => (
                  <li key={l} className="flex gap-3 text-sm text-slate-600">
                    <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            {...reveal(0.1)}
            className="relative min-h-[500px] overflow-hidden rounded-3xl border border-border/60 shadow-soft lg:col-span-7 lg:min-h-0"
          >
            {hasMap ? (
              <iframe
                src={site.mapEmbedUrl}
                title={`${site.name} location on Google Maps`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0"
                allowFullScreen
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-muted text-slate-600">
                <MapPin className="size-8" aria-hidden />
                <p className="text-sm">Map loading...</p>
              </div>
            )}
            <div className="absolute left-4 top-4 rounded-xl bg-white p-3 shadow-soft">
              <p className="font-display text-sm font-semibold text-ink">{site.name}</p>
              <p className="text-xs text-slate-600">{address.line1}</p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

export default Contact;
