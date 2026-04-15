import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { GitBranch, Send, Mail } from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-8">
      <Container className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} orlov.tech. {t("copyright")}
        </p>
        <div className="flex items-center gap-4">
          <a href="https://github.com/your-github" target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-foreground" aria-label="GitHub">
            <GitBranch size={20} />
          </a>
          <a href="https://t.me/your-telegram" target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-foreground" aria-label="Telegram">
            <Send size={20} />
          </a>
          <a href="mailto:your@email.com" className="text-muted-foreground transition-colors hover:text-foreground" aria-label="Email">
            <Mail size={20} />
          </a>
        </div>
      </Container>
    </footer>
  );
}
