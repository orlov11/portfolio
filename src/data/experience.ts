export interface Experience {
  company: string;
  position: { ru: string; en: string };
  period: { start: string; end: null | string };
  description: { ru: string[]; en: string[] };
}

export const experience: Experience[] = [
  {
    company: "Loov",
    position: {
      ru: "Frontend-разработчик",
      en: "Frontend Developer",
    },
    period: { start: "2025-06", end: null },
    description: {
      ru: [
        "Разработка Telegram WebApp и веб-панелей на React + TypeScript",
        "Конвертация PWA в Android-приложение через Capacitor + публикация в Google Play",
        "Архитектура фронтенда по FSD-методологии",
        "Интеграция с внешними API через BFF-паттерн (NestJS)",
        "Chrome-расширение для CRM Itigris (Manifest V3)",
        "No-code автоматизации на n8n",
      ],
      en: [
        "Telegram WebApp and admin panels on React + TypeScript",
        "PWA → Android conversion via Capacitor + Google Play release",
        "FSD-based frontend architecture",
        "External API integration through BFF pattern (NestJS)",
        "Chrome extension for Itigris CRM (Manifest V3)",
        "No-code automations on n8n",
      ],
    },
  },
];

export interface Education {
  school: string;
  program: { ru: string; en: string };
  url?: string;
}

export const education: Education[] = [
  {
    school: "Result School",
    program: {
      ru: "Frontend-разработка",
      en: "Frontend Development",
    },
    url: "https://result.school/",
  },
  {
    school: "Campfire School · Иван Петриченко",
    program: {
      ru: "Авторские курсы по React и архитектуре",
      en: "Author's courses on React and architecture",
    },
    url: "https://campfire-school.com/",
  },
];

export interface PetProject {
  name: string;
  url: string;
  description: { ru: string; en: string };
}

export const petProjects: PetProject[] = [];
