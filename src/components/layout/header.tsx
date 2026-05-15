"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Menu, X } from "lucide-react";

const navItems = ["about", "projects", "skills", "experience", "contacts"] as const;

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

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mobileMenuOpen ? "x" : "menu"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="block"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </Container>

      <AnimatePresence initial={false}>
        {mobileMenuOpen && (
          <>
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-x-0 bottom-0 top-16 z-40 bg-foreground/20 backdrop-blur-sm md:hidden"
              aria-hidden
            />
            <motion.nav
              key="mobile-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed right-0 top-16 z-50 flex h-[calc(100vh-4rem)] w-72 max-w-[80vw] flex-col gap-1 border-l border-border bg-background p-6 shadow-2xl md:hidden"
            >
              {navItems.map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item}`}
                  initial={{ x: 16, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.08 + index * 0.05, duration: 0.3 }}
                  className="rounded-lg py-3 text-base text-muted-foreground transition-colors hover:text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t(item)}
                </motion.a>
              ))}
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
