import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Magnetic, Reveal } from "@/components/ui/motion-primitives";
import { personal } from "@/data/personal";
import { Send, Mail } from "lucide-react";
import { GithubIcon } from "@/components/ui/github-icon";

export function Contacts() {
  const t = useTranslations("contacts");

  return (
    <section id="contacts" className="py-section">
      <Container className="flex flex-col items-center text-center">
        <Reveal>
          <SectionHeading>{t("title")}</SectionHeading>
        </Reveal>

        <Reveal delay={0.1} blur>
          <p className="mt-4 max-w-md text-body-lg text-muted-foreground">
            {t("subtitle")}
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-10">
            <Magnetic strength={0.3}>
              <Button href={personal.telegram} size="lg">
                <Send className="mr-2" size={16} />
                {t("primaryCta")}
                <span className="ml-2 text-sm opacity-70">{personal.telegramHandle}</span>
              </Button>
            </Magnetic>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
            <span>{t("or")}</span>
            <a
              href={`mailto:${personal.email}`}
              className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
            >
              <Mail size={14} />
              {t("email")}
            </a>
            <span aria-hidden>·</span>
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
            >
              <GithubIcon size={14} />
              {t("github")}
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
