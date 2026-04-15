"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { LocaleSwitcher } from "./locale-switcher";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = ["about", "skills", "projects", "experience", "contacts"] as const;

export function Header() {
  const t = useTranslations("nav");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <Container className="flex h-16 items-center justify-between">
        <a href="#" className="text-lg font-semibold">
          orlov<span className="text-muted-foreground">.tech</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {t(item)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <LocaleSwitcher />
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </Container>

      <div className={cn("border-b border-border bg-background md:hidden", mobileMenuOpen ? "block" : "hidden")}>
        <Container className="flex flex-col gap-4 py-4">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t(item)}
            </a>
          ))}
        </Container>
      </div>
    </header>
  );
}
