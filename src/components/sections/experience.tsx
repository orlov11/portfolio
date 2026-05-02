import { useTranslations, useLocale } from "next-intl";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion-primitives";
import { experience, education } from "@/data/experience";
import { personal } from "@/data/personal";
import { ArrowUpRight, GraduationCap } from "lucide-react";

function formatPeriod(start: string, end: string | null, present: string) {
  const formatMonth = (dateStr: string) => {
    const [year, month] = dateStr.split("-");
    return `${month}.${year}`;
  };
  return `${formatMonth(start)} — ${end ? formatMonth(end) : present}`;
}

export function Experience() {
  const t = useTranslations("experience");
  const locale = useLocale() as "ru" | "en";

  return (
    <section id="experience" className="py-section">
      <Container>
        <Reveal>
          <SectionHeading>{t("title")}</SectionHeading>
        </Reveal>

        <Stagger className="mt-12 space-y-8" stagger={0.08}>
          {experience.map((job) => (
            <StaggerItem key={job.company} className="relative border-l-2 border-border pl-6">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-heading font-semibold">{job.position[locale]}</h3>
                  <p className="text-muted-foreground">{job.company}</p>
                </div>
                <span className="text-sm text-muted-foreground">
                  {formatPeriod(job.period.start, job.period.end, t("present"))}
                </span>
              </div>
              <ul className="mt-4 space-y-2">
                {job.description[locale].map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1} className="mt-16">
          <h3 className="flex items-center gap-2 text-heading font-semibold">
            <GraduationCap size={20} className="text-muted-foreground" />
            {t("educationTitle")}
          </h3>
        </Reveal>

        <Stagger className="mt-6 space-y-4" stagger={0.06}>
          {education.map((edu) => {
            const content = (
              <div className="flex flex-col gap-1 border-l-2 border-border pl-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-medium">{edu.school}</p>
                  <p className="text-sm text-muted-foreground">{edu.program[locale]}</p>
                </div>
                {edu.url && (
                  <ArrowUpRight size={16} className="text-muted-foreground" />
                )}
              </div>
            );
            return (
              <StaggerItem key={edu.school}>
                {edu.url ? (
                  <a
                    href={edu.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block transition-colors hover:[&_p:first-child]:text-accent"
                  >
                    {content}
                  </a>
                ) : (
                  content
                )}
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal delay={0.1} className="mt-10">
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("petProjectsLink")}
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
