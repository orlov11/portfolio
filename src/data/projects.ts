export interface Project {
  slug: string;
  title: string;
  shortDescription: { ru: string; en: string };
  problem: { ru: string; en: string };
  solution: { ru: string; en: string };
  contribution: { ru: string[]; en: string[] };
  stack: string[];
  metrics: { ru: string; en: string }[];
  result: { ru: string; en: string };
  links: { github?: string; demo?: string };
  image?: string;
}

export const projects: Project[] = [
  {
    slug: "loov-care",
    title: "Loov Care",
    shortDescription: {
      ru: "Веб-система для управления услугами оптики: PWA для клиентов + Telegram WebApp + бот + админка с управлением уведомлениями",
      en: "Web system for optical services management: client-facing PWA + Telegram WebApp + bot + admin panel with notification management",
    },
    problem: {
      ru: "Оптике нужна была единая система для управления клиентами, заказами и лояльностью — с возможностью точечно отправлять уведомления любому пользователю прямо из админки.",
      en: "The optical store needed a unified system for managing customers, orders, and loyalty — with the ability to send targeted notifications to any user straight from the admin panel.",
    },
    solution: {
      ru: "Монорепо с приложениями: PWA для клиентов, Telegram WebApp как альтернативный канал входа, бот для авто-уведомлений и веб-админка. В админке — система управления нотификациями: можно выбрать пользователя (или сегмент), составить сообщение и отправить через push в PWA или через бота в Telegram. Интеграция с Shopify и внутренней CRM.",
      en: "Monorepo with multiple apps: a PWA for customers, a Telegram WebApp as an alternative entry point, a bot for automated notifications and a web admin. The admin includes a notification management system — select a user (or segment), compose a message and dispatch it via PWA push or Telegram bot. Integrated with Shopify and the internal CRM.",
    },
    contribution: {
      ru: [
        "Разработка PWA и Telegram WebApp на React + TypeScript",
        "Система управления уведомлениями в админке: адресная отправка push в PWA и сообщений через бота",
        "Интеграция с Telegram Bot API и Web Push API",
        "Архитектура монорепо с общими пакетами",
        "Настройка Docker Compose для всех окружений",
      ],
      en: [
        "Built the PWA and Telegram WebApp with React + TypeScript",
        "Notification management system in the admin: targeted push to PWA and bot messages to Telegram",
        "Integrated with the Telegram Bot API and Web Push API",
        "Monorepo architecture with shared packages",
        "Docker Compose setup for all environments",
      ],
    },
    stack: ["React", "PWA", "Web Push", "NestJS", "Drizzle ORM", "PostgreSQL", "Redis", "Docker", "Telegram Bot API"],
    metrics: [
      { ru: "PWA + Telegram WebApp + Bot + Admin", en: "PWA + Telegram WebApp + Bot + Admin" },
      { ru: "Адресные push-уведомления из админки", en: "Targeted push notifications from the admin" },
      { ru: "Интеграция с Shopify и CRM", en: "Shopify and CRM integration" },
    ],
    result: {
      ru: "Работающий продукт: клиенты оптики получают push в PWA и сообщения от бота, администратор управляет рассылками одной кнопкой.",
      en: "Working product: optics customers get push in the PWA and messages from the bot, while the admin runs targeted broadcasts in one click.",
    },
    links: {},
    image: "/images/projects/loov-care.png",
  },
  {
    slug: "staff-focus",
    title: "Staff Focus",
    shortDescription: {
      ru: "PWA + Android для сотрудников: KPI, задачи, мотивация, биометрия по WebAuthn, push, drag-n-drop дашборд, глубокая интеграция с Frappe ERP",
      en: "PWA + Android for employees: KPI, tasks, motivation, WebAuthn biometrics, push, drag-n-drop dashboard, deep Frappe ERP integration",
    },
    problem: {
      ru: "Сотрудникам и руководителям нужен был быстрый канал к KPI, задачам, базе знаний и мотивации прямо с телефона — с нативными ощущениями, биометрическим входом, офлайн-устойчивостью и адаптацией под особенности Telegram Mini App.",
      en: "Employees and managers needed a fast channel to KPIs, tasks, knowledge base and motivation right from their phones — with native feel, biometric login, offline resilience and adaptation to the quirks of a Telegram Mini App.",
    },
    solution: {
      ru: "PWA с FSD-архитектурой на React + Vite, превращённая в нативный Android через Capacitor. Бэкенд — NestJS поверх Frappe ERP и Outline Wiki. Кастомный Service Worker с авто-обновлением и MessageChannel-коммуникацией. Биометрия — через WebAuthn / Passkey (а не Capacitor-плагин). Загрузка фото с историей и галереей. Drag-and-Drop реордеринг карточек на дашборде. Recharts-визуализация KPI. Отдельная админка управления мотивацией: руководитель настраивает правила, бонусы и штрафы и видит расчёт зарплаты по сотрудникам в реальном времени.",
      en: "A React + Vite PWA with FSD architecture, packaged into a native Android app via Capacitor. The backend is NestJS on top of Frappe ERP and Outline Wiki. A custom Service Worker with auto-update and MessageChannel communication. Biometrics — via WebAuthn / Passkey (not a Capacitor plugin). Profile photo upload with history and gallery. Drag-and-drop reordering of dashboard cards. Recharts-based KPI visualisation. A dedicated motivation admin: a manager configures rules, bonuses and penalties and sees per-employee salary calculations in real time.",
    },
    contribution: {
      ru: [
        "Архитектура фронтенда по FSD-методологии",
        "Конвертация PWA в Android-приложение через Capacitor и публикация в Google Play",
        "Биометрическая аутентификация через WebAuthn / Passkey (FIDO2): challenge → attestation, поддержка TouchID/FaceID",
        "Загрузка фото профиля с историей: API, swipe-галерея на Embla Carousel, нативная камера через input capture",
        "Глубокая интеграция с Frappe ERP: CRUD над сотрудниками/должностями/ролями, sessionStorage-кеш с cache-bust для Telegram WebView",
        "Кросс-девайс синхронизация настроек через Frappe User Settings DocType (shared vs per-device для mobile_tg / desktop_tg / mobile_web / desktop_web)",
        "Drag-and-Drop реордеринг карточек дашборда через @dnd-kit + persistence layout",
        "Кастомный Service Worker с авто-обновлением для Telegram Mini App, MessageChannel-коммуникацией, pull-to-refresh",
        "Push-уведомления через Web Push API (VAPID) и Firebase Cloud Messaging",
        "Leader Dashboard с мульти-магазинной аналитикой и Recharts (KPI gauge/donut, динамика, процентные графики со swipe-навигацией)",
        "Lens Matrix — 2D-матрица категорий × сегментов с экспортом в XLSX",
        "Админка управления мотивацией и калькулятор зарплат с реал-тайм прогнозом по KPI-слайдерам",
      ],
      en: [
        "Frontend architecture using FSD methodology",
        "PWA → native Android via Capacitor with Google Play release",
        "Biometric authentication via WebAuthn / Passkey (FIDO2): challenge → attestation, TouchID/FaceID support",
        "Profile photo upload with history: API, swipe gallery on Embla Carousel, native camera via input capture",
        "Deep Frappe ERP integration: CRUD over employees/positions/roles, sessionStorage cache with cache-bust for Telegram WebView",
        "Cross-device user settings sync via Frappe User Settings DocType (shared vs per-device for mobile_tg / desktop_tg / mobile_web / desktop_web)",
        "Drag-and-drop dashboard card reordering via @dnd-kit with layout persistence",
        "Custom Service Worker with auto-update for Telegram Mini App, MessageChannel communication, pull-to-refresh",
        "Push notifications via Web Push API (VAPID) and Firebase Cloud Messaging",
        "Leader Dashboard with multi-store analytics and Recharts (KPI gauge/donut, trends, percentage charts with swipe nav)",
        "Lens Matrix — 2D category × segment grid with XLSX export",
        "Motivation admin and salary calculator with real-time KPI-slider forecast",
      ],
    },
    stack: ["React", "Vite", "TypeScript", "Tailwind CSS", "Capacitor", "WebAuthn", "Web Push", "Firebase FCM", "Recharts", "@dnd-kit", "Embla Carousel", "Service Worker", "NestJS", "Frappe ERP", "Redis", "Docker"],
    metrics: [
      { ru: "PWA → нативный Android (Capacitor) · Google Play", en: "PWA → native Android (Capacitor) · Google Play" },
      { ru: "WebAuthn биометрия + Web Push + FCM", en: "WebAuthn biometrics + Web Push + FCM" },
      { ru: "Drag-n-Drop дашборд + Recharts + XLSX-экспорт", en: "Drag-n-drop dashboard + Recharts + XLSX export" },
      { ru: "Frappe ERP: CRUD + кросс-девайс настройки", en: "Frappe ERP: CRUD + cross-device settings" },
    ],
    result: {
      ru: "Нативное Android-приложение с биометрией и пуш-уведомлениями, используемое сотрудниками ежедневно для управления задачами и отслеживания KPI.",
      en: "Native Android app with biometrics and push notifications, used daily by employees for task management and KPI tracking.",
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
    metrics: [
      { ru: "Manifest V3", en: "Manifest V3" },
      { ru: "Инъекция React в DOM CRM", en: "React injection into CRM DOM" },
      { ru: "Используется командой ежедневно", en: "Used by the team daily" },
    ],
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
      ru: "Email → Telegram: бот пересылает письма с общей почты лично адресату в Telegram",
      en: "Email → Telegram: a bot forwards messages from a shared inbox to the right person in Telegram",
    },
    problem: {
      ru: "Часть рабочей переписки шла на общие почтовые ящики, и письма терялись среди уведомлений — реальный адресат узнавал о них слишком поздно. Нужен был способ автоматически направлять каждое письмо конкретному человеку, не открывая почтовый клиент.",
      en: "Part of the team correspondence landed in shared inboxes, where messages got lost among notifications — the real recipient saw them too late. We needed a way to route each email to a specific person without opening a mail client.",
    },
    solution: {
      ru: "No-code пайплайн на n8n: участники команды настраивают пересылку своих писем на общий ящик Rachel; webhook ловит входящее сообщение, n8n парсит тему, отправителя и тело, по правилам определяет получателя и отправляет ему форматированное уведомление в Telegram. Стейты обращений хранятся в no-code базе.",
      en: "A no-code pipeline on n8n: team members forward their emails to a shared Rachel mailbox; a webhook receives each incoming message, n8n parses the subject, sender and body, applies routing rules to find the recipient and posts a formatted notification to their Telegram. Conversation state is stored in a no-code database.",
    },
    contribution: {
      ru: [
        "Проектирование workflow в n8n: приём webhook → парсинг письма → маршрутизация → Telegram",
        "Парсинг входящих email (тема, отправитель, тело, вложения)",
        "Правила маршрутизации: куда уходит письмо на основании отправителя и темы",
        "Форматирование сообщений для Telegram (Markdown, цитирование, ссылки)",
        "No-code база для хранения состояний обращений",
      ],
      en: [
        "Workflow design in n8n: webhook → email parsing → routing → Telegram",
        "Inbound email parsing (subject, sender, body, attachments)",
        "Routing rules: where the email goes based on sender and subject",
        "Telegram message formatting (Markdown, quoting, links)",
        "No-code database for tracking conversation state",
      ],
    },
    stack: ["n8n", "Telegram Bot API", "IMAP / Email", "No-code DB"],
    metrics: [
      { ru: "Email forwarding → n8n → Telegram", en: "Email forwarding → n8n → Telegram" },
      { ru: "No-code пайплайн без собственного бэкенда", en: "No-code pipeline, zero custom backend" },
      { ru: "Адресная маршрутизация писем в личку", en: "Targeted email routing to private chats" },
    ],
    result: {
      ru: "Письма больше не теряются в общем ящике: каждое уведомление приходит лично адресату в Telegram, время реакции — минуты.",
      en: "Emails no longer get lost in the shared inbox: every notification reaches the right person in Telegram, reaction time drops to minutes.",
    },
    links: { github: "https://github.com/LoovTeam/Rachel" },
    image: "/images/projects/rachel.png",
  },
];
