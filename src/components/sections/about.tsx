import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/motion-primitives";

export function About() {
  const t = useTranslations("about");

  return (
    <section id="about" className="py-section">
      <Container className="max-w-2xl">
        <Reveal>
          <SectionHeading>{t("title")}</SectionHeading>
        </Reveal>
        <Reveal delay={0.1} blur>
          <p className="mt-6 text-body-lg leading-relaxed text-muted-foreground">
            {t("text")}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
