import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { skills, type Skill } from "@/data/skills";

const categories = ["frontend", "backend", "tools", "infrastructure"] as const;

export function Skills() {
  const t = useTranslations("skills");

  const grouped = categories.reduce(
    (acc, category) => {
      acc[category] = skills.filter((skill) => skill.category === category);
      return acc;
    },
    {} as Record<string, Skill[]>
  );

  return (
    <section id="skills" className="py-section">
      <Container>
        <SectionHeading>{t("title")}</SectionHeading>
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {categories.map((category) => (
            <div key={category}>
              <h3 className="text-heading font-semibold">{t(category)}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {grouped[category].map((skill) => (
                  <Badge key={skill.name}>{skill.name}</Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
