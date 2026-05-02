import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion-primitives";
import { skills, type Skill } from "@/data/skills";

const categories = ["frontend", "backend", "ai", "tools", "infrastructure"] as const;

export function Skills() {
  const t = useTranslations("skills");

  const featured = skills.filter((s) => s.featured);
  const grouped = categories.reduce(
    (acc, category) => {
      acc[category] = skills.filter((s) => s.category === category);
      return acc;
    },
    {} as Record<string, Skill[]>
  );

  return (
    <section id="skills" className="py-section">
      <Container>
        <Reveal>
          <SectionHeading>{t("title")}</SectionHeading>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {t("mainStackLabel")}
          </p>
        </Reveal>

        <Stagger className="mt-3 flex flex-wrap gap-2" stagger={0.04}>
          {featured.map((skill) => (
            <StaggerItem key={skill.name}>
              <span className="inline-flex items-center rounded-full border border-foreground/20 bg-foreground/[0.04] px-4 py-1.5 text-sm font-medium text-foreground">
                {skill.name}
              </span>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {categories.map((category, index) => (
            <Reveal key={category} delay={index * 0.05}>
              <h3 className="text-heading font-semibold">{t(category)}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {grouped[category].map((skill) => (
                  <Badge key={skill.name}>{skill.name}</Badge>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
