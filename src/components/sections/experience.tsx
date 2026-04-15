import { useTranslations, useLocale } from "next-intl";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { experience } from "@/data/experience";

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
        <SectionHeading>{t("title")}</SectionHeading>
        <div className="mt-12 space-y-8">
          {experience.map((job) => (
            <div key={job.company} className="border-l-2 border-border pl-6">
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
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
