import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowDown, FileDown } from "lucide-react";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-center">
      <Container className="flex flex-col items-center text-center">
        <p className="text-body-lg text-muted-foreground">{t("greeting")}</p>
        <h1 className="mt-4 text-display-xl font-bold">
          Orlov
        </h1>
        <p className="mt-2 text-display text-muted-foreground font-light">
          {t("role")}
        </p>
        <p className="mt-6 max-w-lg text-body-lg text-muted-foreground">
          {t("description")}
        </p>
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
      </Container>
    </section>
  );
}
