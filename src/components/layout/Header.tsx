"use client";

import { Menu, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks } from "@/data/nav";
import { site } from "@/data/site";

const linkClass =
  "text-sm font-medium text-foreground/80 transition-colors hover:text-primary";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between gap-4 px-5 lg:h-20 lg:px-8">
        <a
          href="#home"
          className="font-display text-xl font-semibold text-primary lg:text-2xl"
        >
          {site.name}
        </a>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className={linkClass}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={site.phoneHref}
            className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary"
          >
            <Phone className="size-4 text-primary" aria-hidden />
            {site.phone}
          </a>
          <Button asChild>
            <a href="#appointment">Book Appointment</a>
          </Button>
        </div>

        {/* Mobile / tablet actions */}
        <div className="flex items-center gap-1 lg:hidden">
          <a
            href={site.phoneHref}
            aria-label={`Call ${site.name}`}
            className="inline-flex size-11 items-center justify-center rounded-full text-primary hover:bg-accent"
          >
            <Phone className="size-5" aria-hidden />
          </a>
          <Sheet>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className="inline-flex size-11 items-center justify-center rounded-full text-foreground hover:bg-muted"
              >
                <Menu className="size-6" aria-hidden />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="flex w-[85vw] max-w-sm flex-col overflow-y-auto"
            >
              <SheetHeader className="text-left">
                <SheetTitle className="font-display text-xl text-primary">
                  {site.name}
                </SheetTitle>
                <SheetDescription className="sr-only">
                  Site navigation
                </SheetDescription>
              </SheetHeader>

              <nav aria-label="Mobile" className="mt-4 flex flex-col">
                {navLinks.map((l) => (
                  <SheetClose asChild key={l.href}>
                    <a
                      href={l.href}
                      className="flex min-h-11 items-center border-b border-border py-4 text-lg font-medium text-foreground hover:text-primary"
                    >
                      {l.label}
                    </a>
                  </SheetClose>
                ))}
              </nav>

              <div className="mt-6 flex flex-col gap-3">
                <SheetClose asChild>
                  <Button asChild size="lg" className="h-12 w-full text-base">
                    <a href="#appointment">Book Appointment</a>
                  </Button>
                </SheetClose>
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center justify-center gap-2 rounded-md border border-border py-3 text-base font-medium text-foreground hover:bg-muted"
                >
                  <MessageCircle className="size-5 text-[#25D366]" aria-hidden />
                  Chat on WhatsApp
                </a>
              </div>

              <div className="mt-auto pt-8 text-sm text-muted-foreground">
                <a
                  href={site.phoneHref}
                  className="mb-3 flex min-h-11 items-center gap-2 text-base font-medium text-foreground"
                >
                  <Phone className="size-4 text-primary" aria-hidden />
                  {site.phone}
                </a>
                <ul className="space-y-1">
                  {site.hours.map((h) => (
                    <li key={h.day} className="flex justify-between gap-4">
                      <span>{h.day}</span>
                      <span className="text-right">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default Header;
