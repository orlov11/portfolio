import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimateIn } from "@/components/ui/animate-in";

export function About() {
  const t = useTranslations("about");

  return (
    <section id="about" className="py-section">
      <Container className="max-w-2xl">
        <AnimateIn>
          <SectionHeading>{t("title")}</SectionHeading>
          <p className="mt-6 text-body-lg leading-relaxed text-muted-foreground">
            {t("text")}
          </p>
        </AnimateIn>
      </Container>
    </section>
  );
}
