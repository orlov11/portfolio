import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { personal } from "@/data/personal";
import { skills } from "@/data/skills";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { FileDown, Mail, MapPin } from "lucide-react";

interface ResumePageProps {
  params: Promise<{ locale: string }>;
}

export default async function ResumePage({ params }: ResumePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("resume");
  const loc = locale as "ru" | "en";

  const categories = ["frontend", "backend", "tools", "infrastructure"] as const;

  return (
    <div className="py-section-sm print:py-0">
      <Container className="max-w-3xl">
        <div className="mb-8 flex justify-end print:hidden">
          <Button href={`/orlov-resume-${loc}.pdf`} variant="accent">
            <FileDown size={16} className="mr-2" />
            {t("download")}
          </Button>
        </div>

        <div id="resume-content" className="space-y-8">
          {/* Header */}
          <div className="border-b border-border pb-6">
            <h1 className="text-display font-bold">
              {personal.firstName[loc]} {personal.lastName[loc]}
            </h1>
            <p className="mt-1 text-xl text-muted-foreground">{t("position")}</p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Mail size={14} />
                {personal.email}
              </span>
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-foreground"
              >
                GitHub
              </a>
              <span className="flex items-center gap-1">
                <MapPin size={14} />
                {personal.location[loc]}
              </span>
            </div>
          </div>

          {/* About */}
          <div>
            <h2 className="text-heading font-semibold">{t("aboutTitle")}</h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {loc === "ru"
                ? "Frontend / Mobile-разработчик с продуктовым подходом. Строю веб-приложения на React и TypeScript и конвертирую их в нативные Android-приложения через Capacitor — от Telegram WebApp до корпоративных систем с публикацией в Google Play. Активно использую AI-инструменты для ускорения разработки."
                : "Frontend / Mobile developer with a product-focused approach. I build web apps with React and TypeScript and ship them as native Android apps via Capacitor — from Telegram WebApps to enterprise systems with Google Play releases. Actively use AI tools to speed up development."}
            </p>
          </div>

          {/* Skills */}
          <div>
            <h2 className="text-heading font-semibold">{t("skillsTitle")}</h2>
            <div className="mt-3 space-y-2">
              {categories.map((category) => {
                const categorySkills = skills.filter((s) => s.category === category);
                return (
                  <div key={category} className="flex items-start gap-2 text-sm">
                    <span className="font-medium capitalize min-w-[110px]">{category}:</span>
                    <span className="text-muted-foreground">
                      {categorySkills.map((s) => s.name).join(", ")}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Experience */}
          <div>
            <h2 className="text-heading font-semibold">{t("experienceTitle")}</h2>
            <div className="mt-3 space-y-4">
              {experience.map((job) => (
                <div key={job.company}>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">{job.position[loc]}</span>
                      <span className="text-muted-foreground"> — {job.company}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {job.period.start} — {job.period.end ?? (loc === "ru" ? "н.в." : "Present")}
                    </span>
                  </div>
                  <ul className="mt-2 space-y-1">
                    {job.description[loc].map((item, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div>
            <h2 className="text-heading font-semibold">{t("projectsTitle")}</h2>
            <div className="mt-3 space-y-3">
              {projects.map((project) => (
                <div key={project.slug}>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{project.title}</span>
                    <div className="flex gap-1">
                      {project.stack.slice(0, 3).map((tech) => (
                        <Badge key={tech}>{tech}</Badge>
                      ))}
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {project.shortDescription[loc]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
