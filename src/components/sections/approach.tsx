import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion-primitives";

const points = ["one", "two", "three", "four"] as const;

export function Approach() {
  const t = useTranslations("approach");

  return (
    <section id="approach" className="py-section">
      <Container>
        <Reveal>
          <SectionHeading>{t("title")}</SectionHeading>
        </Reveal>

        <Stagger className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2" stagger={0.08}>
          {points.map((key, index) => (
            <StaggerItem key={key} className="flex gap-5">
              <span className="font-mono text-sm text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-heading font-semibold">
                  {t(`${key}.title`)}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {t(`${key}.body`)}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
