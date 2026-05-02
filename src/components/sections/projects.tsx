import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">
                      {project.shortDescription[locale]}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.stack.slice(0, 4).map((tech) => (
                        <Badge key={tech}>{tech}</Badge>
                      ))}
                      {project.stack.length > 4 && (
                        <Badge>+{project.stack.length - 4}</Badge>
                      )}
                    </div>
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
