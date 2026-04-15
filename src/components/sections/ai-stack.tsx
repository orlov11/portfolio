import { useTranslations, useLocale } from "next-intl";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { aiTools } from "@/data/skills";
import { Sparkles } from "lucide-react";

export function AiStack() {
  const t = useTranslations("aiStack");
  const locale = useLocale() as "ru" | "en";

  return (
    <section className="py-section bg-muted/30">
      <Container>
        <div className="flex items-center gap-3">
          <Sparkles className="text-accent" size={28} />
          <SectionHeading>{t("title")}</SectionHeading>
        </div>
        <p className="mt-4 max-w-xl text-body-lg text-muted-foreground">
          {t("description")}
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {aiTools.map((tool) => (
            <Card key={tool.name} hover>
              <h3 className="text-heading font-semibold">{tool.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {tool.description[locale]}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
