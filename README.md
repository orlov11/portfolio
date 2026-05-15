# orlov.tech — портфолио

Личный сайт Frontend / Mobile-разработчика. Делаю Telegram WebApp'ы и нативные Android-приложения через Capacitor — от первого коммита до Google Play.

🔗 Live: [https://sorlov.tech](https://sorlov.tech)

## Стек

- **Next.js 16** (App Router, Turbopack, RSC)
- **React 19** + TypeScript
- **Tailwind CSS 4** — стили
- **next-intl 4** — две локали (RU/EN), автодетект по `Accept-Language`
- **Motion 12** (бывший Framer Motion) — анимации, magnetic CTA, drag-n-drop примитивы
- **lucide-react** — иконки
- **Puppeteer** — рендер резюме в PDF (только для локальной перегенерации)

## Структура

```
src/
├── app/
│   ├── [locale]/              # i18n-сегмент
│   │   ├── page.tsx           # главная (Hero + секции)
│   │   ├── layout.tsx         # html, theme-no-flash, providers
│   │   ├── projects/[slug]/   # детальная страница проекта
│   │   └── resume/            # резюме как HTML-страница
│   ├── api/resume/pdf/        # rebuild PDF (только локально)
│   ├── icon.svg               # favicon (Next.js auto-picks)
│   └── layout.tsx             # root metadata
├── components/
│   ├── layout/                # Header, Footer, ThemeToggle, LocaleSwitcher
│   ├── sections/              # Hero, About, Approach, Projects, Skills, Experience, Contacts
│   └── ui/                    # Button, Card, Badge, motion-primitives, ...
├── data/                      # projects, skills, experience, personal — все «данные» отдельно
├── i18n/                      # routing + request config next-intl
├── messages/                  # ru.json, en.json
└── middleware.ts              # i18n routing
```

## Команды

```bash
npm install         # установка зависимостей
npm run dev         # dev-сервер (Turbopack), http://localhost:3000
npm run build       # продакшн-сборка
npm run start       # запуск продакшн-сборки
npm run lint        # ESLint
```

## Обновить резюме (PDF)

Резюме лежит в репозитории как **статические файлы** для быстрой отдачи:

- `public/orlov-resume-ru.pdf`
- `public/orlov-resume-en.pdf`

Когда меняются данные в `src/data/` или текст в `src/app/[locale]/resume/page.tsx` — PDF'ы нужно перегенерировать локально:

```bash
# 1. Поднять dev-сервер
npm run dev

# 2. В другом терминале — запросить обе версии (puppeteer внутри сам отрисует страницу)
curl http://localhost:3000/api/resume/pdf?locale=ru -o public/orlov-resume-ru.pdf
curl http://localhost:3000/api/resume/pdf?locale=en -o public/orlov-resume-en.pdf
```

Для работы `puppeteer` нужен Chrome — при первом запуске установить:

```bash
npx puppeteer browsers install chrome
```

## Темы

Светлая / тёмная тема. Логика выбора:

1. При первом визите — берётся из системной настройки (`prefers-color-scheme`)
2. После ручного переключения — сохраняется в `localStorage` под ключом `theme`
3. No-flash скрипт в `<head>` применяет тему до первого рендера

Источник: `src/components/layout/theme-toggle.tsx` + inline-скрипт в `src/app/[locale]/layout.tsx`.

## Деплой

Прод-сборка собирается как Next.js приложение. Варианты:

- **VPS + Docker** — в корне есть `Dockerfile` и `docker-compose.yml`
- **Vercel / Cloudflare Pages** — Git-импорт работает «из коробки» (без `/api/resume/pdf` — puppeteer не запустится в serverless; PDF и так лежат статикой)
- **Виртуальный shared-хостинг (reg.ru Host-0, etc.)** — нужен `output: 'export'` в `next.config.ts`, загрузить содержимое `out/` по FTP

## Лицензия

Личный проект, всех прав осталось ровно столько, чтобы я мог быть единственным юристом по этому делу. Использовать как референс — пожалуйста, копировать целиком — спросите.

---

Сделано Святославом Орловым. Контакты — на сайте.
