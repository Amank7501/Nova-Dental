import { CheckCircle2, MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { AppointmentForm } from "@/components/sections/AppointmentForm";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";
import { hoursSummary } from "@/lib/hours";

export function Appointment() {
  const { appointment } = site;
  return (
    <section id="appointment" className="bg-surface py-20 lg:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="text-xs font-medium uppercase tracking-widest text-primary">
              {appointment.eyebrow}
            </p>
            <h2
              className="mt-3 max-w-[14ch] font-display font-semibold leading-tight tracking-tight text-ink"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              {appointment.heading}
            </h2>
            <p className="mt-5 max-w-[36ch] text-lg leading-relaxed text-slate-600">
              {appointment.subheading}
            </p>

            <ul className="mt-8 space-y-3">
              {appointment.trustPoints.map((t) => (
                <li key={t} className="flex items-start gap-3 text-ink">
                  <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-primary" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>

            <hr className="my-8 border-border" />

            <h3 className="font-display text-lg font-semibold text-ink">Prefer to talk?</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button asChild variant="ghost" className="h-11 px-4">
                <a href={site.phoneHref}>
                  <Phone aria-hidden /> Call {site.phone}
                </a>
              </Button>
              <Button asChild variant="ghost" className="h-11 px-4">
                <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
                  <MessageCircle aria-hidden /> WhatsApp
                </a>
              </Button>
            </div>
            <p className="mt-3 max-w-[40ch] text-sm text-slate-600">{hoursSummary()}</p>
          </div>

          <div className="lg:col-span-7 lg:flex lg:justify-end">
            <AppointmentForm />
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Appointment;
