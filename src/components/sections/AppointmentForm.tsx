"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { site } from "@/data/site";

type Values = {
  name: string;
  phone: string;
  service: string;
  date: string;
  slot: string;
  message: string;
  consent: boolean;
};
type Errors = Partial<Record<keyof Values, string>>;

const EMPTY: Values = {
  name: "",
  phone: "",
  service: "",
  date: "",
  slot: "",
  message: "",
  consent: false,
};

const SLOTS = [
  { value: "morning", label: "Morning (10am–1pm)" },
  { value: "afternoon", label: "Afternoon (1pm–5pm)" },
  { value: "evening", label: "Evening (5pm–8pm)" },
  { value: "any", label: "Any time" },
];

const field =
  "min-h-12 rounded-xl border-border/80 bg-background text-base focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-0 md:text-base";

// Tomorrow as yyyy-mm-dd in local time. Server snapshot is "" (no clock reads during prerender).
function tomorrowISO() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function validate(v: Values, minDate: string): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please enter your full name.";
  if (!/^\d{10}$/.test(v.phone)) e.phone = "Enter a 10-digit mobile number.";
  if (!v.service) e.service = "Please choose a service.";
  if (!v.date) e.date = "Please pick a preferred date.";
  else if (minDate && v.date < minDate) e.date = "Please pick a date from tomorrow onwards.";
  if (!v.consent) e.consent = "Please agree to be contacted.";
  return e;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <div aria-live="polite" id={id}>
      {message && (
        <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
          <AlertCircle className="size-3.5 shrink-0" aria-hidden />
          {message}
        </p>
      )}
    </div>
  );
}

function Req() {
  return (
    <span className="text-red-500" aria-hidden>
      {" "}
      *
    </span>
  );
}

export function AppointmentForm() {
  const reduce = useReducedMotion();
  const minDate = useSyncExternalStore(
    () => () => {},
    tomorrowISO,
    () => "",
  );
  const [values, setValues] = useState<Values>(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!success) return;
    const id = setTimeout(() => setSuccess(false), 5000);
    return () => clearTimeout(id);
  }, [success]);

  const errors = validate(values, minDate);
  const isValid = Object.keys(errors).length === 0;
  const show = (k: keyof Values) => (touched[k] || submitted ? errors[k] : undefined);

  const set = <K extends keyof Values>(k: K, v: Values[K]) =>
    setValues((prev) => ({ ...prev, [k]: v }));
  const blur = (k: keyof Values) => setTouched((t) => ({ ...t, [k]: true }));

  // TODO: wire to backend (Formspree / Resend / custom API route)
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    if (!isValid) {
      // Show every error, then move focus to the first invalid field (DOM order).
      const order: (keyof Values)[] = ["name", "phone", "service", "date", "consent"];
      const first = order.find((k) => errors[k]);
      if (first) {
        const ids = { name: "ap-name", phone: "ap-phone", service: "ap-service", date: "ap-date", consent: "ap-consent" } as const;
        document.getElementById(ids[first as keyof typeof ids])?.focus();
      }
      toast.error("Please fix the highlighted fields");
      return;
    }
    setSubmitting(true);
    console.log("[Appointment request]", { ...values, phone: `+91${values.phone}` });
    await new Promise((r) => setTimeout(r, 600)); // simulate network
    toast.success("Request received", {
      description: `We'll call or WhatsApp you within an hour. For urgent care, dial ${site.phone} now.`,
    });
    setValues(EMPTY);
    setTouched({});
    setSubmitted(false);
    setSubmitting(false);
    setSuccess(true);
  }

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-[640px] rounded-3xl border border-border/60 bg-surface-raised p-6 shadow-soft lg:p-10"
    >
      {success && (
        <div
          role="status"
          className="mb-6 flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-900"
        >
          <CheckCircle2 className="size-5 shrink-0 text-emerald-600" aria-hidden />
          Request sent. We&apos;ll be in touch shortly.
        </div>
      )}

      <form onSubmit={onSubmit} noValidate className="space-y-5" aria-busy={submitting}>
        <div>
          <Label htmlFor="ap-name" className="mb-1.5 block text-sm font-medium text-ink">
            Full name<Req />
          </Label>
          <Input
            id="ap-name"
            name="name"
            autoComplete="name"
            placeholder="e.g. Priya Sharma"
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            onBlur={() => blur("name")}
            aria-required
            aria-invalid={!!show("name")}
            aria-describedby="ap-name-err"
            className={field}
          />
          <FieldError id="ap-name-err" message={show("name")} />
        </div>

        <div>
          <Label htmlFor="ap-phone" className="mb-1.5 block text-sm font-medium text-ink">
            Phone<Req />
          </Label>
          <div className="relative">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 flex w-14 items-center justify-center border-r border-border/80 text-sm text-slate-600"
            >
              +91
            </span>
            <Input
              id="ap-phone"
              name="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              pattern="[0-9]{10}"
              maxLength={10}
              placeholder="10-digit mobile number"
              value={values.phone}
              onChange={(e) => set("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
              onBlur={() => blur("phone")}
              aria-required
              aria-invalid={!!show("phone")}
              aria-describedby="ap-phone-err"
              className={`${field} pl-[4.25rem]`}
            />
          </div>
          <FieldError id="ap-phone-err" message={show("phone")} />
        </div>

        <div>
          <Label htmlFor="ap-service" className="mb-1.5 block text-sm font-medium text-ink">
            Service required<Req />
          </Label>
          <Select
            value={values.service}
            onValueChange={(v) => set("service", v)}
            onOpenChange={(o) => !o && blur("service")}
          >
            <SelectTrigger
              id="ap-service"
              aria-required
              aria-invalid={!!show("service")}
              aria-describedby="ap-service-err"
              className={`${field} w-full`}
            >
              <SelectValue placeholder="What do you need help with?" />
            </SelectTrigger>
            <SelectContent>
              {site.services.map((s) => (
                <SelectItem key={s.slug} value={s.slug} className="min-h-11">
                  {s.title}
                </SelectItem>
              ))}
              <SelectItem value="consultation" className="min-h-11">
                Not sure — I&apos;d like a consultation
              </SelectItem>
            </SelectContent>
          </Select>
          <FieldError id="ap-service-err" message={show("service")} />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="ap-date" className="mb-1.5 block text-sm font-medium text-ink">
              Preferred date<Req />
            </Label>
            <Input
              id="ap-date"
              name="date"
              type="date"
              min={minDate || undefined}
              value={values.date}
              onChange={(e) => set("date", e.target.value)}
              onBlur={() => blur("date")}
              aria-required
              aria-invalid={!!show("date")}
              aria-describedby="ap-date-err ap-date-hint"
              className={field}
            />
            <p id="ap-date-hint" className="mt-1 text-xs text-slate-600">
              We&apos;ll confirm the exact time.
            </p>
            <FieldError id="ap-date-err" message={show("date")} />
          </div>

          <div>
            <Label htmlFor="ap-slot" className="mb-1.5 block text-sm font-medium text-ink">
              Preferred time slot
            </Label>
            <Select value={values.slot} onValueChange={(v) => set("slot", v)}>
              <SelectTrigger id="ap-slot" className={`${field} w-full`}>
                <SelectValue placeholder="Select a slot" />
              </SelectTrigger>
              <SelectContent>
                {SLOTS.map((s) => (
                  <SelectItem key={s.value} value={s.value} className="min-h-11">
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="ap-message" className="mb-1.5 block text-sm font-medium text-ink">
            Anything we should know?
          </Label>
          <Textarea
            id="ap-message"
            name="message"
            rows={3}
            placeholder="e.g. 'I get anxious at the dentist' or 'tooth pain on upper left side'"
            value={values.message}
            onChange={(e) => set("message", e.target.value)}
            className={`${field} min-h-24`}
          />
          <p className="mt-1 text-xs text-slate-600">
            Anxiety, specific symptoms, previous treatments — anything helps.
          </p>
        </div>

        <div>
          <label
            htmlFor="ap-consent"
            className="flex min-h-11 cursor-pointer items-start gap-3 text-sm leading-relaxed text-ink"
          >
            <input
              id="ap-consent"
              type="checkbox"
              checked={values.consent}
              onChange={(e) => set("consent", e.target.checked)}
              onBlur={() => blur("consent")}
              aria-required
              aria-invalid={!!show("consent")}
              aria-describedby="ap-consent-err"
              className="mt-0.5 size-5 shrink-0 cursor-pointer rounded accent-primary"
            />
            <span>
              I agree to be contacted by {site.name} about this appointment via call, SMS,
              or WhatsApp. Read our{" "}
              <a href="#" className="text-primary underline underline-offset-2">
                Privacy Policy
              </a>
              .<Req />
            </span>
          </label>
          <FieldError id="ap-consent-err" message={show("consent")} />
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={submitting}
          aria-busy={submitting}
          className="h-12 w-full text-base"
        >
          {submitting ? (
            <>
              <Loader2 className="animate-spin" aria-hidden />
              Sending...
            </>
          ) : (
            "Request Appointment"
          )}
        </Button>
      </form>
    </motion.div>
  );
}

export default AppointmentForm;
