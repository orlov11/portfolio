import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GradientCover } from "@/components/ui/motion-primitives";
import { GithubIcon } from "@/components/ui/github-icon";
import { projects } from "@/data/projects";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";

interface ProjectPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  const locales = ["ru", "en"];
  return locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug }))
  );
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("projectCase");
  const tProjects = await getTranslations("projects");
  const loc = locale as "ru" | "en";

  const projectIndex = projects.findIndex((p) => p.slug === slug);
  if (projectIndex === -1) notFound();
  const project = projects[projectIndex];
  const nextProject = projects[(projectIndex + 1) % projects.length];

  const sections = [
    { title: t("problem"), content: project.problem[loc] },
    { title: t("solution"), content: project.solution[loc] },
    { title: t("result"), content: project.result[loc] },
  ];

  return (
    <article className="py-section-sm">
      <Container className="max-w-3xl">
        <Link
          href={`/${locale}/#projects`}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft size={14} />
          {tProjects("back")}
        </Link>

        <h1 className="mt-8 text-display-lg font-bold">{project.title}</h1>
        <p className="mt-4 text-body-lg text-muted-foreground">
          {project.shortDescription[loc]}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>

        <GradientCover
          seed={project.slug}
          label={project.title}
          className="mt-8 aspect-video"
        />

        <div className="mt-12 space-y-10">
          {sections.map(({ title, content }) => (
            <div key={title}>
              <h2 className="text-heading font-semibold">{title}</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">{content}</p>
            </div>
          ))}

          <div>
            <h2 className="text-heading font-semibold">{t("contribution")}</h2>
            <ul className="mt-3 space-y-2">
              {project.contribution[loc].map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-heading font-semibold">{t("stack")}</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
          </div>
        </div>

        {(project.links.github || project.links.demo) && (
          <div className="mt-12 flex flex-wrap gap-4">
            {project.links.github && (
              <Button href={project.links.github} variant="secondary">
                <GithubIcon size={14} className="mr-2" />
                GitHub
              </Button>
            )}
            {project.links.demo && (
              <Button href={project.links.demo} variant="secondary">
                <ExternalLink size={14} className="mr-2" />
                Demo
              </Button>
            )}
          </div>
        )}

        <Link
          href={`/${locale}/projects/${nextProject.slug}`}
          className="group mt-20 block rounded-2xl border border-border p-6 transition-colors hover:border-foreground/30"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {tProjects("next")}
          </p>
          <div className="mt-3 flex items-center justify-between gap-4">
            <div>
              <h3 className="text-heading font-semibold">{nextProject.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {nextProject.shortDescription[loc]}
              </p>
            </div>
            <ArrowRight
              size={20}
              className="shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground"
            />
          </div>
        </Link>
      </Container>
    </article>
  );
}
