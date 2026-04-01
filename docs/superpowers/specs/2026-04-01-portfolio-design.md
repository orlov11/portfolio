# Portfolio Website — Design Spec

## Overview

Минималистичное портфолио-сайт в стиле Apple для frontend-разработчика с ~10 мес. опыта. Цель — презентовать навыки, проекты и AI-стек потенциальным работодателям.

**Домен:** orlov.tech (или аналог, reg.ru)
**Хостинг:** VPS (reg.ru) + Docker
**Языки контента:** RU / EN с переключателем

## Tech Stack

- **Framework:** Next.js 15 (App Router, SSG/SSR)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **i18n:** next-intl
- **PDF:** Puppeteer (серверная генерация из страницы /resume)
- **Deployment:** Docker + docker-compose, Nginx reverse proxy
- **Font:** Inter или SF Pro Display (Apple-vibe)

## Architecture

```
portfolio/
├── src/
│   ├── app/
│   │   ├── [locale]/                # i18n routing (ru/en)
│   │   │   ├── page.tsx             # Landing page
│   │   │   ├── layout.tsx           # Locale layout
│   │   │   ├── projects/
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx     # Project case page
│   │   │   └── resume/
│   │   │       └── page.tsx         # Web resume (HH-style)
│   │   ├── api/
│   │   │   └── resume/
│   │   │       └── pdf/
│   │   │           └── route.ts     # PDF generation endpoint
│   │   ├── layout.tsx               # Root layout
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── sections/                # Landing page sections
│   │   │   ├── hero.tsx
│   │   │   ├── about.tsx
│   │   │   ├── skills.tsx
│   │   │   ├── ai-stack.tsx
│   │   │   ├── projects.tsx
│   │   │   ├── experience.tsx
│   │   │   └── contacts.tsx
│   │   ├── ui/                      # Reusable UI primitives
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── section-heading.tsx
│   │   │   └── container.tsx
│   │   └── layout/
│   │       ├── header.tsx           # Navbar + locale switcher
│   │       ├── footer.tsx
│   │       └── locale-switcher.tsx
│   ├── data/                        # Content as TypeScript
│   │   ├── projects.ts             # Project descriptions
│   │   ├── skills.ts               # Skills list
│   │   ├── experience.ts           # Work experience
│   │   └── personal.ts             # Name, bio, contacts
│   ├── lib/
│   │   ├── i18n.ts                 # next-intl config
│   │   └── utils.ts                # cn() helper etc.
│   └── messages/                    # i18n translation files
│       ├── ru.json
│       └── en.json
├── public/
│   ├── images/
│   │   ├── projects/               # Screenshots for project cases
│   │   └── og-image.png            # Open Graph image
│   └── favicon.ico
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Pages & Sections

### 1. Landing (`/[locale]`)

Single-page scroll с навигацией по якорям. Секции:

#### Hero
- Имя, должность "Frontend Developer"
- Одна строка-intro (например: "Создаю продукты, которые работают")
- CTA: "Смотреть проекты" (скролл вниз) + "Скачать резюме" (ссылка на PDF)
- Минимализм: много whitespace, крупная типографика

#### About
- 2-3 предложения о себе и подходе к работе
- Фокус: продуктовый подход, автоматизация, AI-augmented development

#### Skills
- Категории: Frontend, Backend, Tools, Infrastructure
- Frontend: React, TypeScript, Next.js, Tailwind CSS, Vite, Radix UI, Framer Motion
- Backend: NestJS, Node.js, PostgreSQL, Redis, Drizzle ORM
- Tools: Docker, Git, n8n, Chrome Extensions API, Telegram Bot API
- Infrastructure: Docker Compose, Nginx, CI/CD

#### AI Stack
- Отдельная секция, визуально выделенная
- Claude Code — AI-ассистент в разработке + MCP-серверы
- Lovable — генерация UI-компонентов
- Подача: "Использую AI как инструмент, а не замену" — показываем осознанный подход

#### Projects
- 4 карточки в сетке (2x2 на десктопе, 1 колонка на мобайле)
- Каждая карточка: название, короткое описание, стек-бейджи, скриншот/превью
- Клик → переход на детальную страницу `/projects/[slug]`

#### Experience
- Таймлайн или список
- Компания Loov, позиция Frontend Developer, период (июнь 2025 — н.в.)
- Ключевые достижения/обязанности буллет-поинтами

#### Contacts
- Telegram, GitHub, Email
- Простая форма или просто ссылки (без усложнений)
- CTA: "Скачать резюме PDF"

### 2. Project Case Page (`/[locale]/projects/[slug]`)

Детальная страница для каждого проекта:

- **Заголовок + короткое описание**
- **Проблема** — какую задачу решали
- **Решение** — что сделали и как
- **Мой вклад** — конкретно что делал ты
- **Стек** — технологии с пояснением выбора
- **Результат** — метрики, итог
- **Скриншоты/демо** — визуал
- **Ссылки** — GitHub, live demo (если есть)

#### Проекты:

**Loov Care** (`/projects/loov-care`)
- Монорепо: Telegram WebApp + бот + веб-панель для оптики
- Стек: React, NestJS, Drizzle ORM, PostgreSQL, Redis, Docker
- Твой вклад: frontend (Telegram WebApp), интеграции, архитектура

**Staff Focus** (`/projects/staff-focus`)
- Мобильное веб-приложение для сотрудников — KPI, задачи, мотивация
- Стек: React + Vite + TS + Tailwind (FSD), NestJS, Frappe ERP, Docker
- Твой вклад: frontend, FSD-архитектура, интеграция с Frappe

**Jarvis** (`/projects/jarvis`)
- Chrome-расширение, расширяющее CRM Itigris
- Стек: React, Webpack, Chrome Extension Manifest V3, Docker
- Твой вклад: разработка расширения, React-компоненты для инъекции в DOM

**Rachel** (`/projects/rachel`)
- Telegram-бот уведомлений из Яндекс.Трекера
- Стек: n8n, no-code DB, Telegram Bot API
- Твой вклад: проектирование workflow, настройка автоматизаций

### 3. Resume Page (`/[locale]/resume`)

- Веб-страница, стилизованная как классическое резюме (формат HH/PDF)
- Кнопка "Скачать PDF" — вызывает API `/api/resume/pdf`
- Содержимое берётся из тех же data-файлов что и сайт
- Секции: Контакты, О себе, Навыки, Опыт работы, Проекты, Образование

### 4. PDF Generation (`/api/resume/pdf`)

- API route в Next.js
- Puppeteer рендерит страницу `/resume` в PDF
- Возвращает PDF-файл для скачивания
- Формат A4, чистая типографика без навигации сайта

## Design System

### Стиль: Apple Minimalism

- **Whitespace:** много воздуха между секциями
- **Типографика:** крупные заголовки (48-72px), тонкий body text
- **Цвета:** монохром (чёрный/белый/серый) + один акцент (можно синий как у Apple)
- **Анимации:** плавный fade-in при скролле, subtle hover-эффекты
- **Карточки:** без теней или с минимальной тенью, тонкие бордеры
- **Скругления:** умеренные (8-16px)

### Responsive

- Desktop-first, но mobile-friendly
- Breakpoints: mobile (< 768px), tablet (768-1024px), desktop (> 1024px)
- Навигация: горизонтальная на десктопе, бургер на мобайле

### Dark/Light Mode

- Переключатель темы (опционально, но для Apple-стиля подходит)
- По умолчанию: light mode
- Уважаем `prefers-color-scheme`

## i18n

- `next-intl` с App Router middleware
- URL-based routing: `/ru/...`, `/en/...`
- Дефолтный язык: RU
- Весь контент в `messages/ru.json` и `messages/en.json`
- Данные проектов/навыков/опыта в `data/*.ts` — тоже двуязычные

## Docker

```dockerfile
# Dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

```yaml
# docker-compose.yml
services:
  portfolio:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - /etc/letsencrypt:/etc/letsencrypt
    depends_on:
      - portfolio
    restart: unless-stopped
```

## SEO & Meta

- Open Graph tags на каждой странице
- `og:image` — красивый OG-image с именем и должностью
- `robots.txt`, `sitemap.xml` (генерируется Next.js)
- Semantic HTML (h1-h6, section, article, nav)
- Structured data (JSON-LD для Person)

## Out of Scope

- Блог (можно добавить позже)
- CMS / admin-панель (контент в коде)
- Аналитика (можно добавить Yandex.Metrika позже)
- Форма обратной связи (пока просто ссылки на контакты)
- CI/CD pipeline (настроим отдельно при деплое)
