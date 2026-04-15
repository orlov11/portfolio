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
        "Построение архитектуры фронтенда по FSD-методологии",
        "Интеграция с внешними API через BFF-паттерн (NestJS)",
        "Создание Chrome-расширения для CRM",
        "No-code автоматизации на n8n",
      ],
      en: [
        "Telegram WebApp and web panel development with React + TypeScript",
        "Frontend architecture using FSD methodology",
        "External API integration via BFF pattern (NestJS)",
        "Chrome extension development for CRM",
        "No-code automations with n8n",
      ],
    },
  },
];
