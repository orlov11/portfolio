import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

const BASE_URL = "https://orlov.tech";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["ru", "en"];

  return locales.flatMap((locale) => [
    {
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    {
      url: `${BASE_URL}/${locale}/resume`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    ...projects.map((project) => ({
      url: `${BASE_URL}/${locale}/projects/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ]);
}
