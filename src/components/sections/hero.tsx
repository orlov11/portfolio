"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, useScroll, useTransform } from "motion/react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Magnetic, Reveal } from "@/components/ui/motion-primitives";
import { Mail, FileDown, ArrowDown } from "lucide-react";
import { personal } from "@/data/personal";
import { cn } from "@/lib/utils";

function Avatar({ alt }: { alt: string }) {
  const [errored, setErrored] = useState(false);
  const showImage = personal.avatar && !errored;

  return (
    <div className="relative mx-auto h-28 w-28 overflow-hidden rounded-full border border-border bg-gradient-to-br from-accent/20 to-muted shadow-sm sm:h-32 sm:w-32">
      {showImage && (
        <Image
          src={personal.avatar!}
          alt={alt}
          fill
          priority
          sizes="128px"
          className="object-cover"
          onError={() => setErrored(true)}
        />
      )}
      <div
        className={cn(
          "absolute inset-0 grid place-items-center text-2xl font-semibold text-foreground/80",
          showImage && "-z-10"
        )}
      >
        {personal.initials}
      </div>
    </div>
  );
}

export function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale() as "ru" | "en";
  const { scrollY } = useScroll();
  const orbY = useTransform(scrollY, [0, 600], [0, 120]);
  const orbScale = useTransform(scrollY, [0, 600], [1, 0.8]);
  const fullName = `${personal.firstName[locale]} ${personal.lastName[locale]}`;

  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden py-12 sm:min-h-[calc(100vh-4rem)] sm:py-0">
      <motion.div
        aria-hidden
        style={{ y: orbY, scale: orbScale }}
        className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-accent/15 blur-3xl"
      />

      <Container className="flex flex-col items-center text-center">
        <Reveal duration={0.8}>
          <Avatar alt={fullName} />
        </Reveal>

        <Reveal delay={0.1} blur>
          <p className="mt-4 text-body-lg text-muted-foreground sm:mt-6">{t("greeting")}</p>
        </Reveal>

        <Reveal delay={0.15} blur>
          <h1 className="mt-1 text-display-xl font-bold tracking-tight sm:mt-2">
            {personal.firstName[locale]}{" "}
            <span className="text-muted-foreground">{personal.lastName[locale]}</span>
          </h1>
        </Reveal>

        <Reveal delay={0.25}>
          <p className="mt-1 text-xl text-muted-foreground font-light sm:mt-2 sm:text-2xl">
            {t("role")}
          </p>
        </Reveal>

        <Reveal delay={0.35}>
          <p className="mt-4 max-w-xl text-body-lg text-muted-foreground sm:mt-6">
            {t("description")}
          </p>
        </Reveal>

        <Reveal delay={0.45}>
          <div className="mt-6 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
            <Magnetic>
              <Button href={`mailto:${personal.email}`} size="lg">
                <Mail className="mr-2" size={16} />
                {t("ctaPrimary")}
              </Button>
            </Magnetic>
            <Button href={`/orlov-resume-${locale}.pdf`} variant="secondary" size="lg">
              <FileDown className="mr-2" size={16} />
              {t("ctaSecondary")}
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.7}>
          <a
            href="#projects"
            className="mt-10 inline-flex flex-col items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground sm:mt-16"
          >
            <span>{t("scrollHint")}</span>
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
            >
              <ArrowDown size={14} />
            </motion.span>
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
