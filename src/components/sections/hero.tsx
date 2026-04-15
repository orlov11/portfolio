import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowDown, FileDown } from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-center">
      <Container className="flex flex-col items-center text-center">
        <AnimateIn>
          <p className="text-body-lg text-muted-foreground">{t("greeting")}</p>
        </AnimateIn>
        <AnimateIn delay={0.1}>
          <h1 className="mt-4 text-display-xl font-bold">Orlov</h1>
        </AnimateIn>
        <AnimateIn delay={0.2}>
          <p className="mt-2 text-display text-muted-foreground font-light">
            {t("role")}
          </p>
        </AnimateIn>
        <AnimateIn delay={0.3}>
          <p className="mt-6 max-w-lg text-body-lg text-muted-foreground">
            {t("description")}
          </p>
        </AnimateIn>
        <AnimateIn delay={0.4}>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href="#projects" size="lg">
              {t("cta")}
              <ArrowDown className="ml-2" size={16} />
            </Button>
            <Button href="/api/resume/pdf" variant="secondary" size="lg">
              {t("downloadResume")}
              <FileDown className="ml-2" size={16} />
            </Button>
          </div>
        </AnimateIn>
      </Container>
    </section>
  );
}
