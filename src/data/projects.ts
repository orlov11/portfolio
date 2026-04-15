export interface Project {
  slug: string;
  title: string;
  shortDescription: { ru: string; en: string };
  problem: { ru: string; en: string };
  solution: { ru: string; en: string };
  contribution: { ru: string[]; en: string[] };
  stack: string[];
  result: { ru: string; en: string };
  links: { github?: string; demo?: string };
  image?: string;
}

export const projects: Project[] = [
  {
    slug: "loov-care",
    title: "Loov Care",
    shortDescription: {
      ru: "Веб-система для управления услугами оптики: Telegram WebApp + бот + панель управления",
      en: "Web system for optical services management: Telegram WebApp + bot + admin panel",
    },
    problem: {
      ru: "Оптике нужна была единая система для управления клиентами, заказами и лояльностью, интегрированная с Telegram.",
      en: "The optical store needed a unified system for managing customers, orders, and loyalty programs, integrated with Telegram.",
    },
    solution: {
      ru: "Монорепо с тремя приложениями: Telegram WebApp для клиентов, бот для уведомлений, веб-панель для администрирования. Интеграция с Shopify и внутренней CRM.",
      en: "Monorepo with three apps: Telegram WebApp for clients, bot for notifications, web panel for administration. Integration with Shopify and internal CRM.",
    },
    contribution: {
      ru: ["Разработка фронтенда Telegram WebApp на React", "Интеграция с Telegram Bot API", "Архитектура монорепо с общими пакетами", "Настройка Docker Compose для всех окружений"],
      en: ["Frontend development of Telegram WebApp with React", "Integration with Telegram Bot API", "Monorepo architecture with shared packages", "Docker Compose setup for all environments"],
    },
    stack: ["React", "NestJS", "Drizzle ORM", "PostgreSQL", "Redis", "Docker", "Telegram Bot API"],
    result: {
      ru: "Работающий продукт, используемый клиентами оптики для записи, просмотра заказов и участия в программе лояльности.",
      en: "Working product used by optical store clients for appointments, order tracking, and loyalty program participation.",
    },
    links: {},
    image: "/images/projects/loov-care.png",
  },
  {
    slug: "staff-focus",
    title: "Staff Focus",
    shortDescription: {
      ru: "Мобильное веб-приложение для сотрудников: KPI, задачи, мотивация, база знаний",
      en: "Mobile web app for employees: KPI, tasks, motivation, knowledge base",
    },
    problem: {
      ru: "Сотрудникам нужен был удобный инструмент для отслеживания задач, KPI и доступа к корпоративной базе знаний прямо с телефона.",
      en: "Employees needed a convenient tool for tracking tasks, KPIs, and accessing the knowledge base from their phones.",
    },
    solution: {
      ru: "PWA-приложение с FSD-архитектурой. NestJS бэкенд интегрирован с Frappe ERP и Outline Wiki. SSE для real-time уведомлений.",
      en: "PWA application with FSD architecture. NestJS backend integrated with Frappe ERP and Outline Wiki. SSE for real-time notifications.",
    },
    contribution: {
      ru: ["Архитектура фронтенда по FSD-методологии", "Leader Dashboard с мульти-магазинной аналитикой", "Калькулятор мотивации с расчётом зарплаты", "Интеграция с Frappe ERP через BFF"],
      en: ["Frontend architecture using FSD methodology", "Leader Dashboard with multi-store analytics", "Motivation calculator with salary computation", "Frappe ERP integration via BFF pattern"],
    },
    stack: ["React", "Vite", "TypeScript", "Tailwind CSS", "NestJS", "Frappe ERP", "Redis", "Docker"],
    result: {
      ru: "Внутренний продукт компании, используемый сотрудниками ежедневно для управления задачами и отслеживания метрик.",
      en: "Internal company product used daily by employees for task management and metrics tracking.",
    },
    links: {},
    image: "/images/projects/staff-focus.png",
  },
  {
    slug: "jarvis",
    title: "Jarvis",
    shortDescription: {
      ru: "Chrome-расширение, расширяющее возможности CRM Itigris",
      en: "Chrome extension enhancing Itigris CRM capabilities",
    },
    problem: {
      ru: "CRM Itigris имела ограниченный интерфейс. Нужно было расширить функциональность без доступа к исходному коду CRM.",
      en: "Itigris CRM had a limited interface. Needed to extend functionality without access to CRM source code.",
    },
    solution: {
      ru: "Chrome-расширение на Manifest V3, которое инъектирует React-компоненты в страницы CRM.",
      en: "Chrome extension on Manifest V3 that injects React components into CRM pages.",
    },
    contribution: {
      ru: ["Разработка Chrome-расширения на Manifest V3", "React-компоненты для инъекции в DOM CRM", "API-клиент для работы с заказами", "CI/CD через GitHub Actions"],
      en: ["Chrome extension development on Manifest V3", "React components for CRM DOM injection", "API client for order management", "CI/CD via GitHub Actions"],
    },
    stack: ["React", "Webpack", "Chrome Extension Manifest V3", "Express.js", "Docker"],
    result: {
      ru: "Расширение используется командой для ежедневной работы с CRM.",
      en: "Extension used by the team daily for CRM work.",
    },
    links: { github: "https://github.com/LoovTeam/jarvis" },
    image: "/images/projects/jarvis.png",
  },
  {
    slug: "rachel",
    title: "Rachel",
    shortDescription: {
      ru: "Telegram-бот для уведомлений о задачах из Яндекс.Трекера",
      en: "Telegram bot for Yandex Tracker task notifications",
    },
    problem: {
      ru: "Команде нужно было оперативно получать уведомления о задачах из Яндекс.Трекера, не заходя в сам трекер.",
      en: "The team needed timely notifications about Yandex Tracker tasks without opening the tracker.",
    },
    solution: {
      ru: "No-code решение на n8n: webhook от Яндекс.Трекера триггерит workflow, который отправляет уведомление в Telegram.",
      en: "No-code solution on n8n: webhook from Yandex Tracker triggers a workflow that sends Telegram notifications.",
    },
    contribution: {
      ru: ["Проектирование workflow в n8n", "Настройка webhook-интеграции с Яндекс.Трекером", "Форматирование сообщений для Telegram", "Настройка no-code базы данных для хранения состояний"],
      en: ["Workflow design in n8n", "Webhook integration with Yandex Tracker", "Telegram message formatting", "No-code database setup for state management"],
    },
    stack: ["n8n", "Telegram Bot API", "Yandex Tracker API", "No-code DB"],
    result: {
      ru: "Команда получает мгновенные уведомления о задачах.",
      en: "Team receives instant task notifications.",
    },
    links: { github: "https://github.com/LoovTeam/Rachel" },
    image: "/images/projects/rachel.png",
  },
];
