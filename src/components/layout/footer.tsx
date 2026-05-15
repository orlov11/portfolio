import { useTranslations, useLocale } from "next-intl";
import { Container } from "@/components/ui/container";
import { LocaleSwitcher } from "./locale-switcher";
import { personal } from "@/data/personal";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-8">
      <Container className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} {personal.firstName.en} {personal.lastName.en}. {t("copyright")}
        </p>
        <div className="flex items-center gap-6">
          <a
            href={`/orlov-resume-${locale}.pdf`}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {tNav("downloadResume")}
          </a>
          <LocaleSwitcher />
        </div>
      </Container>
    </footer>
  );
}
