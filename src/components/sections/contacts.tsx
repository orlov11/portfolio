import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { personal } from "@/data/personal";
import { FileDown, Send, Mail } from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";

// GitHub SVG icon (since lucide-react v1 may not have it)
function GithubIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export function Contacts() {
  const t = useTranslations("contacts");
  const tNav = useTranslations("nav");

  return (
    <section id="contacts" className="py-section">
      <Container className="flex flex-col items-center text-center">
        <AnimateIn>
          <SectionHeading>{t("title")}</SectionHeading>
          <p className="mt-4 text-body-lg text-muted-foreground">
            {t("subtitle")}
          </p>
          <div className="mt-8 flex items-center gap-6">
            <a
              href={personal.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <Send size={24} />
              <span className="text-sm">Telegram</span>
            </a>
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <GithubIcon size={24} />
              <span className="text-sm">GitHub</span>
            </a>
            <a
              href={`mailto:${personal.email}`}
              className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail size={24} />
              <span className="text-sm">Email</span>
            </a>
          </div>
          <div className="mt-8">
            <Button href="/api/resume/pdf" variant="secondary" size="lg">
              {tNav("downloadResume")}
              <FileDown className="ml-2" size={16} />
            </Button>
          </div>
        </AnimateIn>
      </Container>
    </section>
  );
}
