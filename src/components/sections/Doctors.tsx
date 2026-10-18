import { Container } from "@/components/layout/Container";
import { DoctorCard } from "@/components/sections/DoctorCard";
import { FounderSpotlight } from "@/components/sections/FounderSpotlight";
import { site } from "@/data/site";

export function Doctors() {
  const founder = site.doctors[0];
  const specialists = site.doctors.slice(1);
  const narrow = specialists.length <= 2;

  return (
    <section id="doctors" className="overflow-hidden bg-surface py-20 lg:py-28">
      <Container>
        <div className="mb-12">
          <p className="text-xs font-medium uppercase tracking-widest text-primary">
            Meet the team
          </p>
          <h2
            className="mt-3 max-w-[22ch] font-display font-semibold leading-tight tracking-tight text-ink"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
          >
            Specialists who put you at ease.
          </h2>
          <p className="mt-4 max-w-[48ch] text-slate-600">
            Led by {founder.name}, our team combines years of experience with a
            gentle, modern approach.
          </p>
        </div>

        <FounderSpotlight />

        {specialists.length > 0 && (
          <div className="mt-20">
            <p className="text-xs font-medium uppercase tracking-widest text-slate-600">
              Also at Novu
            </p>
            <h3 className="mt-2 font-display text-2xl font-semibold text-ink">
              Our visiting specialists
            </h3>

            <div
              role="region"
              aria-label="Visiting specialists"
              className={`-mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0 ${
                narrow ? "md:mx-auto md:max-w-[800px]" : "lg:grid-cols-3"
              }`}
            >
              {specialists.map((d) => (
                <DoctorCard
                  key={d.name}
                  doctor={d}
                  className="w-[260px] shrink-0 snap-start md:w-auto"
                />
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}

export default Doctors;
