import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import {
  GradientCover,
  Reveal,
  Stagger,
  StaggerItem,
  Tilt,
} from "@/components/ui/motion-primitives";
import { projects } from "@/data/projects";
import { ArrowRight } from "lucide-react";

export function Projects() {
  const t = useTranslations("projects");
  const locale = useLocale() as "ru" | "en";

  return (
    <section id="projects" className="py-section">
      <Container>
        <Reveal>
          <SectionHeading>{t("title")}</SectionHeading>
        </Reveal>

        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2" stagger={0.08}>
          {projects.map((project) => (
            <StaggerItem key={project.slug} as="article" className="h-full">
              <Tilt className="h-full">
                <Link
                  href={`/${locale}/projects/${project.slug}`}
                  className="group block h-full"
                >
                  <Card hover className="flex h-full flex-col">
                    <GradientCover
                      seed={project.slug}
                      label={project.title}
                      className="mb-4 aspect-video"
                    />
                    <h3 className="text-heading font-semibold">{project.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {project.shortDescription[locale]}
                    </p>

                    <ul className="mt-4 flex-1 space-y-1.5">
                      {project.metrics.map((m, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm text-foreground/80"
                        >
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                          {m[locale]}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-4 flex items-center gap-1 text-sm font-medium text-accent">
                      {t("viewProject")}
                      <ArrowRight
                        size={14}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </div>
                  </Card>
                </Link>
              </Tilt>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
