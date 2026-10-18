import { About } from "@/components/sections/About";
import { Appointment } from "@/components/sections/Appointment";
import { Contact } from "@/components/sections/Contact";
import { Doctors } from "@/components/sections/Doctors";
import { FAQ } from "@/components/sections/FAQ";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { TrustBar } from "@/components/sections/TrustBar";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Services />
      <Doctors />
      <About />
      <Testimonials />
      <Appointment />
      <FAQ />
      <Contact />
    </>
  );
}
