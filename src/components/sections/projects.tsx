import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/data/projects";
import { ArrowRight } from "lucide-react";

export function Projects() {
  const t = useTranslations("projects");
  const locale = useLocale() as "ru" | "en";

  return (
    <section id="projects" className="py-section">
      <Container>
        <SectionHeading>{t("title")}</SectionHeading>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/${locale}/projects/${project.slug}`}
              className="group"
            >
              <Card hover className="flex h-full flex-col">
                <div className="mb-4 aspect-video overflow-hidden rounded-xl bg-muted flex items-center justify-center text-muted-foreground text-sm">
                  {project.title}
                </div>
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
                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
                  {t("viewProject")}
                  <ArrowRight size={14} />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
