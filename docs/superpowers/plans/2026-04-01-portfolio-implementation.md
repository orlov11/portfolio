# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a minimalist Apple-inspired portfolio site with i18n, project case pages, and PDF resume generation.

**Architecture:** Next.js 15 App Router with `[locale]` routing via next-intl. All content stored as TypeScript data files (no DB). Puppeteer renders `/resume` page to PDF via API route. Docker + Nginx for VPS deployment.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS, next-intl, Motion (framer-motion), Puppeteer, Docker

**Spec:** `docs/superpowers/specs/2026-04-01-portfolio-design.md`

---

## File Structure

```
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx              # Locale layout with NextIntlClientProvider
│   │   ├── page.tsx                # Landing page (assembles sections)
│   │   ├── projects/
│   │   │   └── [slug]/
│   │   │       └── page.tsx        # Project case page
│   │   └── resume/
│   │       └── page.tsx            # Web resume page
│   ├── api/
│   │   └── resume/
│   │       └── pdf/
│   │           └── route.ts        # PDF generation endpoint
│   ├── layout.tsx                  # Root layout (html, body, fonts)
│   └── not-found.tsx               # 404 page
├── components/
│   ├── sections/
│   │   ├── hero.tsx
│   │   ├── about.tsx
│   │   ├── skills.tsx
│   │   ├── ai-stack.tsx
│   │   ├── projects.tsx
│   │   ├── experience.tsx
│   │   └── contacts.tsx
│   ├── ui/
│   │   ├── container.tsx
│   │   ├── section-heading.tsx
│   │   ├── button.tsx
│   │   ├── badge.tsx
│   │   ├── card.tsx
│   │   └── animate-in.tsx          # Scroll animation wrapper
│   └── layout/
│       ├── header.tsx
│       ├── footer.tsx
│       └── locale-switcher.tsx
├── data/
│   ├── personal.ts
│   ├── skills.ts
│   ├── projects.ts
│   └── experience.ts
├── lib/
│   ├── utils.ts                    # cn() helper
│   └── fonts.ts                    # Font configuration
├── i18n/
│   ├── routing.ts                  # next-intl routing config
│   └── request.ts                  # getRequestConfig
└── messages/
    ├── ru.json
    └── en.json
```

---

## Phase 1: Foundation

### Task 1: Initialize Next.js Project

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.mjs`, `src/app/layout.tsx`, `src/app/page.tsx`

- [ ] **Step 1: Create Next.js project**

```bash
cd /c/Users/79777/portfolio
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```

When prompted about overwriting existing files, accept. Choose defaults for all other options.

- [ ] **Step 2: Install dependencies**

```bash
npm install next-intl motion clsx tailwind-merge class-variance-authority lucide-react
```

- [ ] **Step 3: Install dev dependencies**

```bash
npm install -D @types/node
```

- [ ] **Step 4: Verify the app runs**

```bash
npm run dev
```

Expected: App starts on http://localhost:3000 without errors.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: initialize Next.js 15 project with dependencies"
```

---

### Task 2: Design Tokens & Tailwind Config

**Files:**
- Modify: `tailwind.config.ts`
- Create: `src/app/globals.css`
- Create: `src/lib/utils.ts`
- Create: `src/lib/fonts.ts`

- [ ] **Step 1: Configure Tailwind with Apple-inspired design tokens**

Replace `tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        border: "hsl(var(--border))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["4.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-lg": ["3.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display": ["2.5rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "heading": ["1.5rem", { lineHeight: "1.3" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6" }],
      },
      spacing: {
        section: "8rem",
        "section-sm": "4rem",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
      maxWidth: {
        content: "64rem",
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 2: Set up CSS variables for light/dark themes**

Replace `src/app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 7%;
    --muted: 0 0% 96%;
    --muted-foreground: 0 0% 45%;
    --accent: 215 100% 50%;
    --accent-foreground: 0 0% 100%;
    --border: 0 0% 90%;
    --card: 0 0% 98%;
    --card-foreground: 0 0% 7%;
  }

  .dark {
    --background: 0 0% 5%;
    --foreground: 0 0% 95%;
    --muted: 0 0% 12%;
    --muted-foreground: 0 0% 55%;
    --accent: 215 100% 55%;
    --accent-foreground: 0 0% 100%;
    --border: 0 0% 18%;
    --card: 0 0% 10%;
    --card-foreground: 0 0% 95%;
  }

  * {
    border-color: hsl(var(--border));
  }

  body {
    background-color: hsl(var(--background));
    color: hsl(var(--foreground));
  }
}

html {
  scroll-behavior: smooth;
}
```

- [ ] **Step 3: Create utility helpers**

Create `src/lib/utils.ts`:

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 4: Configure Inter font**

Create `src/lib/fonts.ts`:

```typescript
import { Inter } from "next/font/google";

export const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});
```

- [ ] **Step 5: Commit**

```bash
git add tailwind.config.ts src/app/globals.css src/lib/utils.ts src/lib/fonts.ts
git commit -m "feat: configure Tailwind with Apple-inspired design tokens"
```

---

### Task 3: i18n Setup (next-intl)

**Files:**
- Create: `src/i18n/routing.ts`
- Create: `src/i18n/request.ts`
- Create: `src/middleware.ts`
- Create: `src/messages/ru.json`
- Create: `src/messages/en.json`
- Modify: `next.config.ts`

- [ ] **Step 1: Create routing config**

Create `src/i18n/routing.ts`:

```typescript
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ru", "en"],
  defaultLocale: "ru",
});
```

- [ ] **Step 2: Create request config**

Create `src/i18n/request.ts`:

```typescript
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as "ru" | "en")) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

- [ ] **Step 3: Create middleware**

Create `src/middleware.ts`:

```typescript
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
```

- [ ] **Step 4: Update next.config.ts**

Replace `next.config.ts`:

```typescript
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  output: "standalone",
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

export default withNextIntl(nextConfig);
```

- [ ] **Step 5: Create initial message files**

Create `src/messages/ru.json`:

```json
{
  "nav": {
    "about": "Обо мне",
    "skills": "Навыки",
    "projects": "Проекты",
    "experience": "Опыт",
    "contacts": "Контакты",
    "resume": "Резюме",
    "downloadResume": "Скачать PDF"
  },
  "hero": {
    "greeting": "Привет, я",
    "role": "Frontend-разработчик",
    "description": "Создаю продукты, которые работают. Использую современные технологии и AI для быстрой и качественной разработки.",
    "cta": "Смотреть проекты",
    "downloadResume": "Скачать резюме"
  },
  "about": {
    "title": "Обо мне",
    "text": "Frontend-разработчик с продуктовым подходом. Строю веб-приложения на React и TypeScript — от Telegram WebApp до корпоративных систем. Активно использую AI-инструменты для ускорения разработки без потери качества."
  },
  "skills": {
    "title": "Навыки",
    "frontend": "Frontend",
    "backend": "Backend",
    "tools": "Инструменты",
    "infrastructure": "Инфраструктура"
  },
  "aiStack": {
    "title": "AI-стек",
    "description": "Использую AI как инструмент, а не замену. Осознанный подход к AI-augmented разработке."
  },
  "projects": {
    "title": "Проекты",
    "viewProject": "Подробнее",
    "back": "Назад к проектам"
  },
  "experience": {
    "title": "Опыт работы",
    "present": "н.в."
  },
  "contacts": {
    "title": "Контакты",
    "subtitle": "Открыт к предложениям и интересным проектам"
  },
  "resume": {
    "title": "Резюме",
    "download": "Скачать PDF",
    "position": "Frontend-разработчик",
    "aboutTitle": "О себе",
    "skillsTitle": "Навыки",
    "experienceTitle": "Опыт работы",
    "projectsTitle": "Проекты",
    "educationTitle": "Образование"
  },
  "projectCase": {
    "problem": "Проблема",
    "solution": "Решение",
    "contribution": "Мой вклад",
    "stack": "Стек",
    "result": "Результат",
    "links": "Ссылки",
    "github": "GitHub",
    "demo": "Демо"
  },
  "footer": {
    "copyright": "Все права защищены."
  }
}
```

Create `src/messages/en.json`:

```json
{
  "nav": {
    "about": "About",
    "skills": "Skills",
    "projects": "Projects",
    "experience": "Experience",
    "contacts": "Contacts",
    "resume": "Resume",
    "downloadResume": "Download PDF"
  },
  "hero": {
    "greeting": "Hi, I'm",
    "role": "Frontend Developer",
    "description": "Building products that work. Using modern technologies and AI for fast, high-quality development.",
    "cta": "View Projects",
    "downloadResume": "Download Resume"
  },
  "about": {
    "title": "About Me",
    "text": "Frontend developer with a product-focused approach. Building web applications with React and TypeScript — from Telegram WebApps to enterprise systems. Actively leveraging AI tools to accelerate development without sacrificing quality."
  },
  "skills": {
    "title": "Skills",
    "frontend": "Frontend",
    "backend": "Backend",
    "tools": "Tools",
    "infrastructure": "Infrastructure"
  },
  "aiStack": {
    "title": "AI Stack",
    "description": "Using AI as a tool, not a replacement. A conscious approach to AI-augmented development."
  },
  "projects": {
    "title": "Projects",
    "viewProject": "View Details",
    "back": "Back to Projects"
  },
  "experience": {
    "title": "Experience",
    "present": "Present"
  },
  "contacts": {
    "title": "Contacts",
    "subtitle": "Open to opportunities and interesting projects"
  },
  "resume": {
    "title": "Resume",
    "download": "Download PDF",
    "position": "Frontend Developer",
    "aboutTitle": "About",
    "skillsTitle": "Skills",
    "experienceTitle": "Experience",
    "projectsTitle": "Projects",
    "educationTitle": "Education"
  },
  "projectCase": {
    "problem": "Problem",
    "solution": "Solution",
    "contribution": "My Contribution",
    "stack": "Stack",
    "result": "Result",
    "links": "Links",
    "github": "GitHub",
    "demo": "Demo"
  },
  "footer": {
    "copyright": "All rights reserved."
  }
}
```

- [ ] **Step 6: Commit**

```bash
git add src/i18n/ src/middleware.ts src/messages/ next.config.ts
git commit -m "feat: configure next-intl with RU/EN locale routing"
```

---

### Task 4: UI Primitives

**Files:**
- Create: `src/components/ui/container.tsx`
- Create: `src/components/ui/section-heading.tsx`
- Create: `src/components/ui/button.tsx`
- Create: `src/components/ui/badge.tsx`
- Create: `src/components/ui/card.tsx`

- [ ] **Step 1: Create Container**

Create `src/components/ui/container.tsx`:

```tsx
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function Container({ children, className, as: Component = "div" }: ContainerProps) {
  return (
    <Component className={cn("mx-auto max-w-content px-6 sm:px-8", className)}>
      {children}
    </Component>
  );
}
```

- [ ] **Step 2: Create SectionHeading**

Create `src/components/ui/section-heading.tsx`:

```tsx
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionHeading({ children, className }: SectionHeadingProps) {
  return (
    <h2 className={cn("text-display font-bold tracking-tight", className)}>
      {children}
    </h2>
  );
}
```

- [ ] **Step 3: Create Button**

Create `src/components/ui/button.tsx`:

```tsx
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-foreground text-background hover:opacity-90",
        secondary: "border border-border bg-transparent hover:bg-muted",
        accent: "bg-accent text-accent-foreground hover:opacity-90",
      },
      size: {
        default: "h-11 px-6 text-sm",
        lg: "h-13 px-8 text-base",
        sm: "h-9 px-4 text-sm",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
}

export function Button({ className, variant, size, href, ...props }: ButtonProps) {
  if (href) {
    return (
      <a
        href={href}
        className={cn(buttonVariants({ variant, size }), className)}
      >
        {props.children}
      </a>
    );
  }

  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
```

- [ ] **Step 4: Create Badge**

Create `src/components/ui/badge.tsx`:

```tsx
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground",
        className
      )}
    >
      {children}
    </span>
  );
}
```

- [ ] **Step 5: Create Card**

Create `src/components/ui/card.tsx`:

```tsx
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-6 text-card-foreground",
        hover && "transition-all hover:border-muted-foreground/30 hover:shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 6: Commit**

```bash
git add src/components/ui/
git commit -m "feat: add UI primitives (container, heading, button, badge, card)"
```

---

## Phase 2: Layout

### Task 5: Header with Navigation & Locale Switcher

**Files:**
- Create: `src/components/layout/header.tsx`
- Create: `src/components/layout/locale-switcher.tsx`

- [ ] **Step 1: Create LocaleSwitcher**

Create `src/components/layout/locale-switcher.tsx`:

```tsx
"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(newLocale: string) {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  }

  return (
    <div className="flex items-center gap-1 rounded-full border border-border p-0.5 text-sm">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          className={cn(
            "rounded-full px-3 py-1 transition-colors",
            locale === loc
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Create Header**

Create `src/components/layout/header.tsx`:

```tsx
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { LocaleSwitcher } from "./locale-switcher";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = ["about", "skills", "projects", "experience", "contacts"] as const;

export function Header() {
  const t = useTranslations("nav");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <Container className="flex h-16 items-center justify-between">
        <a href="#" className="text-lg font-semibold">
          orlov<span className="text-muted-foreground">.tech</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {t(item)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <LocaleSwitcher />

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </Container>

      {/* Mobile nav */}
      <div
        className={cn(
          "border-b border-border bg-background md:hidden",
          mobileMenuOpen ? "block" : "hidden"
        )}
      >
        <Container className="flex flex-col gap-4 py-4">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t(item)}
            </a>
          ))}
        </Container>
      </div>
    </header>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/header.tsx src/components/layout/locale-switcher.tsx
git commit -m "feat: add header with navigation and locale switcher"
```

---

### Task 6: Footer

**Files:**
- Create: `src/components/layout/footer.tsx`

- [ ] **Step 1: Create Footer**

Create `src/components/layout/footer.tsx`:

```tsx
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Github, Send, Mail } from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-8">
      <Container className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} orlov.tech. {t("copyright")}
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/your-github"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href="https://t.me/your-telegram"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Telegram"
          >
            <Send size={20} />
          </a>
          <a
            href="mailto:your@email.com"
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
        </div>
      </Container>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/footer.tsx
git commit -m "feat: add footer with social links"
```

---

### Task 7: Root & Locale Layouts

**Files:**
- Modify: `src/app/layout.tsx`
- Create: `src/app/[locale]/layout.tsx`
- Create: `src/app/[locale]/page.tsx` (placeholder)
- Delete: `src/app/page.tsx` (old root page)

- [ ] **Step 1: Update root layout**

Replace `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { inter } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Orlov — Frontend Developer",
  description: "Frontend-разработчик. React, TypeScript, Next.js.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
```

- [ ] **Step 2: Create locale layout**

Create `src/app/[locale]/layout.tsx`:

```tsx
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { inter } from "@/lib/fonts";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "ru" | "en")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="pt-16">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Create placeholder landing page**

Create `src/app/[locale]/page.tsx`:

```tsx
export default function HomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1 className="text-display-lg font-bold">orlov.tech</h1>
    </div>
  );
}
```

- [ ] **Step 4: Delete old root page**

```bash
rm src/app/page.tsx 2>/dev/null; echo "done"
```

- [ ] **Step 5: Verify i18n routing works**

```bash
npm run dev
```

Visit http://localhost:3000 — should redirect to /ru. Visit /en — should show English locale. Header nav and locale switcher should work.

- [ ] **Step 6: Commit**

```bash
git add src/app/
git commit -m "feat: add root and locale layouts with i18n routing"
```

---

## Phase 3: Data Layer

### Task 8: Content Data Files

**Files:**
- Create: `src/data/personal.ts`
- Create: `src/data/skills.ts`
- Create: `src/data/projects.ts`
- Create: `src/data/experience.ts`

- [ ] **Step 1: Create personal data**

Create `src/data/personal.ts`:

```typescript
export const personal = {
  name: {
    ru: "Орлов",
    en: "Orlov",
  },
  firstName: {
    ru: "Имя",
    en: "Name",
  },
  role: {
    ru: "Frontend-разработчик",
    en: "Frontend Developer",
  },
  email: "your@email.com",
  telegram: "https://t.me/your-telegram",
  github: "https://github.com/your-github",
  location: {
    ru: "Россия",
    en: "Russia",
  },
} as const;
```

> **Note:** Replace placeholder values (name, email, telegram, github) with real data before deployment.

- [ ] **Step 2: Create skills data**

Create `src/data/skills.ts`:

```typescript
export interface Skill {
  name: string;
  category: "frontend" | "backend" | "tools" | "infrastructure";
}

export const skills: Skill[] = [
  // Frontend
  { name: "React", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "Vite", category: "frontend" },
  { name: "Radix UI", category: "frontend" },
  { name: "Framer Motion", category: "frontend" },
  { name: "React Hook Form", category: "frontend" },
  { name: "TanStack Query", category: "frontend" },

  // Backend
  { name: "NestJS", category: "backend" },
  { name: "Node.js", category: "backend" },
  { name: "PostgreSQL", category: "backend" },
  { name: "Redis", category: "backend" },
  { name: "Drizzle ORM", category: "backend" },

  // Tools
  { name: "Docker", category: "tools" },
  { name: "Git", category: "tools" },
  { name: "n8n", category: "tools" },
  { name: "Chrome Extensions API", category: "tools" },
  { name: "Telegram Bot API", category: "tools" },

  // Infrastructure
  { name: "Docker Compose", category: "infrastructure" },
  { name: "Nginx", category: "infrastructure" },
  { name: "GitHub Actions", category: "infrastructure" },
];

export interface AiTool {
  name: string;
  description: {
    ru: string;
    en: string;
  };
}

export const aiTools: AiTool[] = [
  {
    name: "Claude Code",
    description: {
      ru: "AI-ассистент для разработки в терминале + MCP-серверы для интеграций",
      en: "AI coding assistant in terminal + MCP servers for integrations",
    },
  },
  {
    name: "Lovable",
    description: {
      ru: "Генерация UI-компонентов и прототипирование интерфейсов",
      en: "UI component generation and interface prototyping",
    },
  },
];
```

- [ ] **Step 3: Create projects data**

Create `src/data/projects.ts`:

```typescript
export interface Project {
  slug: string;
  title: string;
  shortDescription: {
    ru: string;
    en: string;
  };
  problem: {
    ru: string;
    en: string;
  };
  solution: {
    ru: string;
    en: string;
  };
  contribution: {
    ru: string[];
    en: string[];
  };
  stack: string[];
  result: {
    ru: string;
    en: string;
  };
  links: {
    github?: string;
    demo?: string;
  };
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
      ru: "Оптике нужна была единая система для управления клиентами, заказами и лояльностью, интегрированная с Telegram для удобства пользователей.",
      en: "The optical store needed a unified system for managing customers, orders, and loyalty programs, integrated with Telegram for user convenience.",
    },
    solution: {
      ru: "Монорепо с тремя приложениями: Telegram WebApp для клиентов, бот для уведомлений, веб-панель для администрирования. Интеграция с Shopify и внутренней CRM.",
      en: "Monorepo with three apps: Telegram WebApp for clients, bot for notifications, web panel for administration. Integration with Shopify and internal CRM.",
    },
    contribution: {
      ru: [
        "Разработка фронтенда Telegram WebApp на React",
        "Интеграция с Telegram Bot API",
        "Архитектура монорепо с общими пакетами",
        "Настройка Docker Compose для всех окружений",
      ],
      en: [
        "Frontend development of Telegram WebApp with React",
        "Integration with Telegram Bot API",
        "Monorepo architecture with shared packages",
        "Docker Compose setup for all environments",
      ],
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
      en: "Employees needed a convenient tool for tracking tasks, KPIs, and accessing the corporate knowledge base from their phones.",
    },
    solution: {
      ru: "PWA-приложение с FSD-архитектурой на фронтенде. NestJS бэкенд интегрирован с Frappe ERP и Outline Wiki. SSE для real-time уведомлений.",
      en: "PWA application with FSD architecture on frontend. NestJS backend integrated with Frappe ERP and Outline Wiki. SSE for real-time notifications.",
    },
    contribution: {
      ru: [
        "Архитектура фронтенда по FSD-методологии",
        "Leader Dashboard с мульти-магазинной аналитикой",
        "Калькулятор мотивации с расчётом зарплаты",
        "Интеграция с Frappe ERP через BFF",
      ],
      en: [
        "Frontend architecture using FSD methodology",
        "Leader Dashboard with multi-store analytics",
        "Motivation calculator with salary computation",
        "Frappe ERP integration via BFF pattern",
      ],
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
      ru: "CRM-система Itigris имела ограниченный интерфейс и не позволяла эффективно управлять заказами. Нужно было расширить функциональность без доступа к исходному коду CRM.",
      en: "Itigris CRM had a limited interface that didn't allow efficient order management. Needed to extend functionality without access to CRM source code.",
    },
    solution: {
      ru: "Chrome-расширение на Manifest V3, которое инъектирует React-компоненты в страницы CRM, добавляя модальные окна, уведомления и расширенное управление заказами.",
      en: "Chrome extension on Manifest V3 that injects React components into CRM pages, adding modals, notifications, and enhanced order management.",
    },
    contribution: {
      ru: [
        "Разработка Chrome-расширения на Manifest V3",
        "React-компоненты для инъекции в DOM CRM",
        "API-клиент для работы с заказами",
        "CI/CD через GitHub Actions",
      ],
      en: [
        "Chrome extension development on Manifest V3",
        "React components for CRM DOM injection",
        "API client for order management",
        "CI/CD via GitHub Actions",
      ],
    },
    stack: ["React", "Webpack", "Chrome Extension Manifest V3", "Express.js", "Docker"],
    result: {
      ru: "Расширение используется командой для ежедневной работы с CRM, значительно ускоряя обработку заказов.",
      en: "Extension used by the team daily for CRM work, significantly speeding up order processing.",
    },
    links: {
      github: "https://github.com/LoovTeam/jarvis",
    },
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
      ru: "Команде нужно было оперативно получать уведомления о новых и изменённых задачах из Яндекс.Трекера, не заходя в сам трекер.",
      en: "The team needed timely notifications about new and updated tasks from Yandex Tracker without opening the tracker.",
    },
    solution: {
      ru: "No-code решение на n8n: webhook от Яндекс.Трекера триггерит workflow, который форматирует данные и отправляет уведомление в Telegram-группу.",
      en: "No-code solution on n8n: webhook from Yandex Tracker triggers a workflow that formats data and sends notifications to a Telegram group.",
    },
    contribution: {
      ru: [
        "Проектирование workflow в n8n",
        "Настройка webhook-интеграции с Яндекс.Трекером",
        "Форматирование сообщений для Telegram",
        "Настройка no-code базы данных для хранения состояний",
      ],
      en: [
        "Workflow design in n8n",
        "Webhook integration with Yandex Tracker",
        "Telegram message formatting",
        "No-code database setup for state management",
      ],
    },
    stack: ["n8n", "Telegram Bot API", "Yandex Tracker API", "No-code DB"],
    result: {
      ru: "Команда получает мгновенные уведомления о задачах, время реакции на новые задачи сократилось.",
      en: "Team receives instant task notifications, response time to new tasks decreased.",
    },
    links: {
      github: "https://github.com/LoovTeam/Rachel",
    },
    image: "/images/projects/rachel.png",
  },
];
```

- [ ] **Step 4: Create experience data**

Create `src/data/experience.ts`:

```typescript
export interface Experience {
  company: string;
  position: {
    ru: string;
    en: string;
  };
  period: {
    start: string;
    end: null | string;
  };
  description: {
    ru: string[];
    en: string[];
  };
}

export const experience: Experience[] = [
  {
    company: "Loov",
    position: {
      ru: "Frontend-разработчик",
      en: "Frontend Developer",
    },
    period: {
      start: "2025-06",
      end: null,
    },
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
```

- [ ] **Step 5: Commit**

```bash
git add src/data/
git commit -m "feat: add content data files (personal, skills, projects, experience)"
```

---

## Phase 4: Landing Page Sections

### Task 9: Hero Section

**Files:**
- Create: `src/components/sections/hero.tsx`

- [ ] **Step 1: Create Hero**

Create `src/components/sections/hero.tsx`:

```tsx
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowDown, FileDown } from "lucide-react";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-center">
      <Container className="flex flex-col items-center text-center">
        <p className="text-body-lg text-muted-foreground">{t("greeting")}</p>
        <h1 className="mt-4 text-display-xl font-bold sm:text-display-xl">
          Orlov
        </h1>
        <p className="mt-2 text-display text-muted-foreground font-light">
          {t("role")}
        </p>
        <p className="mt-6 max-w-lg text-body-lg text-muted-foreground">
          {t("description")}
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button href="#projects" size="lg">
            {t("cta")}
            <ArrowDown className="ml-2" size={16} />
          </Button>
          <Button href="/api/resume/pdf" variant="secondary" size="lg">
            {t("downloadResume")}
            <FileDown className="ml-2" size={16} />
          </Button>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/hero.tsx
git commit -m "feat: add hero section"
```

---

### Task 10: About Section

**Files:**
- Create: `src/components/sections/about.tsx`

- [ ] **Step 1: Create About**

Create `src/components/sections/about.tsx`:

```tsx
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export function About() {
  const t = useTranslations("about");

  return (
    <section id="about" className="py-section">
      <Container className="max-w-2xl">
        <SectionHeading>{t("title")}</SectionHeading>
        <p className="mt-6 text-body-lg leading-relaxed text-muted-foreground">
          {t("text")}
        </p>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/about.tsx
git commit -m "feat: add about section"
```

---

### Task 11: Skills Section

**Files:**
- Create: `src/components/sections/skills.tsx`

- [ ] **Step 1: Create Skills**

Create `src/components/sections/skills.tsx`:

```tsx
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { skills, type Skill } from "@/data/skills";

const categories = ["frontend", "backend", "tools", "infrastructure"] as const;

export function Skills() {
  const t = useTranslations("skills");

  const grouped = categories.reduce(
    (acc, category) => {
      acc[category] = skills.filter((skill) => skill.category === category);
      return acc;
    },
    {} as Record<string, Skill[]>
  );

  return (
    <section id="skills" className="py-section">
      <Container>
        <SectionHeading>{t("title")}</SectionHeading>
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {categories.map((category) => (
            <div key={category}>
              <h3 className="text-heading font-semibold">{t(category)}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {grouped[category].map((skill) => (
                  <Badge key={skill.name}>{skill.name}</Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/skills.tsx
git commit -m "feat: add skills section"
```

---

### Task 12: AI Stack Section

**Files:**
- Create: `src/components/sections/ai-stack.tsx`

- [ ] **Step 1: Create AI Stack**

Create `src/components/sections/ai-stack.tsx`:

```tsx
import { useTranslations, useLocale } from "next-intl";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { aiTools } from "@/data/skills";
import { Sparkles } from "lucide-react";

export function AiStack() {
  const t = useTranslations("aiStack");
  const locale = useLocale() as "ru" | "en";

  return (
    <section className="py-section bg-muted/30">
      <Container>
        <div className="flex items-center gap-3">
          <Sparkles className="text-accent" size={28} />
          <SectionHeading>{t("title")}</SectionHeading>
        </div>
        <p className="mt-4 max-w-xl text-body-lg text-muted-foreground">
          {t("description")}
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {aiTools.map((tool) => (
            <Card key={tool.name} hover>
              <h3 className="text-heading font-semibold">{tool.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {tool.description[locale]}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/ai-stack.tsx
git commit -m "feat: add AI stack section"
```

---

### Task 13: Projects Section (Cards)

**Files:**
- Create: `src/components/sections/projects.tsx`

- [ ] **Step 1: Create Projects grid**

Create `src/components/sections/projects.tsx`:

```tsx
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
                {project.image && (
                  <div className="mb-4 aspect-video overflow-hidden rounded-xl bg-muted">
                    <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
                      {/* Placeholder for project screenshot */}
                      {project.title}
                    </div>
                  </div>
                )}
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/projects.tsx
git commit -m "feat: add projects section with card grid"
```

---

### Task 14: Experience Section

**Files:**
- Create: `src/components/sections/experience.tsx`

- [ ] **Step 1: Create Experience**

Create `src/components/sections/experience.tsx`:

```tsx
import { useTranslations, useLocale } from "next-intl";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { experience } from "@/data/experience";

function formatPeriod(start: string, end: string | null, present: string) {
  const formatMonth = (dateStr: string) => {
    const [year, month] = dateStr.split("-");
    return `${month}.${year}`;
  };

  return `${formatMonth(start)} — ${end ? formatMonth(end) : present}`;
}

export function Experience() {
  const t = useTranslations("experience");
  const locale = useLocale() as "ru" | "en";

  return (
    <section id="experience" className="py-section">
      <Container>
        <SectionHeading>{t("title")}</SectionHeading>
        <div className="mt-12 space-y-8">
          {experience.map((job) => (
            <div key={job.company} className="border-l-2 border-border pl-6">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-heading font-semibold">{job.position[locale]}</h3>
                  <p className="text-muted-foreground">{job.company}</p>
                </div>
                <span className="text-sm text-muted-foreground">
                  {formatPeriod(job.period.start, job.period.end, t("present"))}
                </span>
              </div>
              <ul className="mt-4 space-y-2">
                {job.description[locale].map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/experience.tsx
git commit -m "feat: add experience section with timeline"
```

---

### Task 15: Contacts Section

**Files:**
- Create: `src/components/sections/contacts.tsx`

- [ ] **Step 1: Create Contacts**

Create `src/components/sections/contacts.tsx`:

```tsx
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { personal } from "@/data/personal";
import { Github, Send, Mail, FileDown } from "lucide-react";

const contactLinks = [
  { icon: Send, href: personal.telegram, label: "Telegram" },
  { icon: Github, href: personal.github, label: "GitHub" },
  { icon: Mail, href: `mailto:${personal.email}`, label: "Email" },
];

export function Contacts() {
  const t = useTranslations("contacts");
  const tNav = useTranslations("nav");

  return (
    <section id="contacts" className="py-section">
      <Container className="flex flex-col items-center text-center">
        <SectionHeading>{t("title")}</SectionHeading>
        <p className="mt-4 text-body-lg text-muted-foreground">
          {t("subtitle")}
        </p>
        <div className="mt-8 flex items-center gap-6">
          {contactLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              aria-label={label}
            >
              <Icon size={24} />
              <span className="text-sm">{label}</span>
            </a>
          ))}
        </div>
        <div className="mt-8">
          <Button href="/api/resume/pdf" variant="secondary" size="lg">
            {tNav("downloadResume")}
            <FileDown className="ml-2" size={16} />
          </Button>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/contacts.tsx
git commit -m "feat: add contacts section"
```

---

### Task 16: Assemble Landing Page

**Files:**
- Modify: `src/app/[locale]/page.tsx`

- [ ] **Step 1: Assemble all sections into landing page**

Replace `src/app/[locale]/page.tsx`:

```tsx
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { AiStack } from "@/components/sections/ai-stack";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Contacts } from "@/components/sections/contacts";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <AiStack />
      <Projects />
      <Experience />
      <Contacts />
    </>
  );
}
```

- [ ] **Step 2: Verify landing page renders**

```bash
npm run dev
```

Visit http://localhost:3000/ru — all sections should render. Switch to /en — translations should change.

- [ ] **Step 3: Commit**

```bash
git add src/app/[locale]/page.tsx
git commit -m "feat: assemble landing page with all sections"
```

---

## Phase 5: Inner Pages

### Task 17: Project Case Page

**Files:**
- Create: `src/app/[locale]/projects/[slug]/page.tsx`

- [ ] **Step 1: Create project case page**

Create `src/app/[locale]/projects/[slug]/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/projects";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";

interface ProjectPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations("projectCase");
  const tProjects = await getTranslations("projects");
  const loc = locale as "ru" | "en";

  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

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

        {/* Project image placeholder */}
        {project.image && (
          <div className="mt-8 aspect-video overflow-hidden rounded-2xl bg-muted">
            <div className="flex h-full items-center justify-center text-muted-foreground">
              Screenshot placeholder
            </div>
          </div>
        )}

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

        {/* Links */}
        {(project.links.github || project.links.demo) && (
          <div className="mt-12 flex gap-4">
            {project.links.github && (
              <Button href={project.links.github} variant="secondary">
                <Github size={16} className="mr-2" />
                {t("github")}
              </Button>
            )}
            {project.links.demo && (
              <Button href={project.links.demo} variant="secondary">
                <ExternalLink size={16} className="mr-2" />
                {t("demo")}
              </Button>
            )}
          </div>
        )}
      </Container>
    </article>
  );
}
```

- [ ] **Step 2: Verify project pages render**

```bash
npm run dev
```

Visit http://localhost:3000/ru/projects/loov-care — should show case page. Click "Back to Projects" — should navigate to landing.

- [ ] **Step 3: Commit**

```bash
git add src/app/[locale]/projects/
git commit -m "feat: add project case pages with dynamic routing"
```

---

### Task 18: Resume Page

**Files:**
- Create: `src/app/[locale]/resume/page.tsx`

- [ ] **Step 1: Create resume page**

Create `src/app/[locale]/resume/page.tsx`:

```tsx
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { personal } from "@/data/personal";
import { skills } from "@/data/skills";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { FileDown, Mail, Send, Github, MapPin } from "lucide-react";

interface ResumePageProps {
  params: Promise<{ locale: string }>;
}

export default async function ResumePage({ params }: ResumePageProps) {
  const { locale } = await params;
  const t = await getTranslations("resume");
  const loc = locale as "ru" | "en";

  const categories = ["frontend", "backend", "tools", "infrastructure"] as const;

  return (
    <div className="py-section-sm print:py-0">
      <Container className="max-w-3xl">
        {/* Download button — hidden in print */}
        <div className="mb-8 flex justify-end print:hidden">
          <Button href="/api/resume/pdf" variant="accent">
            <FileDown size={16} className="mr-2" />
            {t("download")}
          </Button>
        </div>

        {/* Resume content */}
        <div id="resume-content" className="space-y-8">
          {/* Header */}
          <div className="border-b border-border pb-6">
            <h1 className="text-display font-bold">
              {personal.firstName[loc]} {personal.name[loc]}
            </h1>
            <p className="mt-1 text-xl text-muted-foreground">{t("position")}</p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Mail size={14} />
                {personal.email}
              </span>
              <a
                href={personal.telegram}
                className="flex items-center gap-1 hover:text-foreground"
              >
                <Send size={14} />
                Telegram
              </a>
              <a
                href={personal.github}
                className="flex items-center gap-1 hover:text-foreground"
              >
                <Github size={14} />
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
                ? "Frontend-разработчик с продуктовым подходом. Строю веб-приложения на React и TypeScript — от Telegram WebApp до корпоративных систем. Активно использую AI-инструменты для ускорения разработки."
                : "Frontend developer with a product-focused approach. Building web applications with React and TypeScript — from Telegram WebApps to enterprise systems. Actively leveraging AI tools to accelerate development."}
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
                    <span className="font-medium capitalize min-w-[110px]">
                      {category}:
                    </span>
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
```

- [ ] **Step 2: Verify resume page renders**

```bash
npm run dev
```

Visit http://localhost:3000/ru/resume — should look like a structured resume.

- [ ] **Step 3: Commit**

```bash
git add src/app/[locale]/resume/
git commit -m "feat: add web resume page"
```

---

## Phase 6: PDF, Docker & SEO

### Task 19: PDF Generation API

**Files:**
- Create: `src/app/api/resume/pdf/route.ts`

- [ ] **Step 1: Install puppeteer**

```bash
npm install puppeteer
```

- [ ] **Step 2: Create PDF API route**

Create `src/app/api/resume/pdf/route.ts`:

```typescript
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") || "ru";

  try {
    const puppeteer = await import("puppeteer");
    const browser = await puppeteer.default.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    await page.goto(`${baseUrl}/${locale}/resume`, {
      waitUntil: "networkidle0",
      timeout: 15000,
    });

    // Hide the download button and nav for PDF
    await page.addStyleTag({
      content: `
        .print\\:hidden, header, footer { display: none !important; }
        body { padding: 0; }
        main { padding-top: 0; }
      `,
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      margin: { top: "20mm", right: "15mm", bottom: "20mm", left: "15mm" },
      printBackground: true,
    });

    await browser.close();

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="orlov-resume-${locale}.pdf"`,
      },
    });
  } catch (error) {
    console.error("PDF generation failed:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 3: Add NEXT_PUBLIC_BASE_URL to environment**

Create `.env.local`:

```
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

- [ ] **Step 4: Verify PDF generation**

```bash
npm run dev
```

Visit http://localhost:3000/api/resume/pdf — should download a PDF file.

- [ ] **Step 5: Commit**

```bash
git add src/app/api/resume/pdf/ .env.local
git commit -m "feat: add PDF resume generation via Puppeteer"
```

---

### Task 20: Docker Setup

**Files:**
- Create: `Dockerfile`
- Create: `docker-compose.yml`
- Create: `nginx.conf`
- Create: `.dockerignore`

- [ ] **Step 1: Create .dockerignore**

Create `.dockerignore`:

```
node_modules
.next
.git
.gitignore
*.md
docs/
```

- [ ] **Step 2: Create Dockerfile**

Create `Dockerfile`:

```dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_BASE_URL=http://localhost:3000

RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Install Chromium for Puppeteer PDF generation
RUN apk add --no-cache chromium
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
```

- [ ] **Step 3: Create nginx.conf**

Create `nginx.conf`:

```nginx
events {
    worker_connections 1024;
}

http {
    upstream nextjs {
        server portfolio:3000;
    }

    server {
        listen 80;
        server_name orlov.tech www.orlov.tech;

        location / {
            proxy_pass http://nextjs;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
        }
    }
}
```

- [ ] **Step 4: Create docker-compose.yml**

Create `docker-compose.yml`:

```yaml
services:
  portfolio:
    build: .
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_BASE_URL=http://localhost:3000
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - portfolio
    restart: unless-stopped
```

- [ ] **Step 5: Commit**

```bash
git add Dockerfile docker-compose.yml nginx.conf .dockerignore
git commit -m "feat: add Docker setup with Nginx reverse proxy"
```

---

### Task 21: SEO & Metadata

**Files:**
- Modify: `src/app/[locale]/layout.tsx`
- Create: `src/app/robots.ts`
- Create: `src/app/sitemap.ts`
- Create: `src/app/not-found.tsx`

- [ ] **Step 1: Add generateMetadata to locale layout**

Add the following to the top of `src/app/[locale]/layout.tsx` (before the component, after imports):

```tsx
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isRu = locale === "ru";

  return {
    title: {
      default: isRu ? "Орлов — Frontend-разработчик" : "Orlov — Frontend Developer",
      template: isRu ? "%s | Орлов" : "%s | Orlov",
    },
    description: isRu
      ? "Frontend-разработчик. React, TypeScript, Next.js. Портфолио и проекты."
      : "Frontend Developer. React, TypeScript, Next.js. Portfolio and projects.",
    openGraph: {
      type: "website",
      locale: isRu ? "ru_RU" : "en_US",
      siteName: "orlov.tech",
    },
  };
}
```

- [ ] **Step 2: Create robots.ts**

Create `src/app/robots.ts`:

```typescript
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://orlov.tech/sitemap.xml",
  };
}
```

- [ ] **Step 3: Create sitemap.ts**

Create `src/app/sitemap.ts`:

```typescript
import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

const BASE_URL = "https://orlov.tech";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["ru", "en"];

  const pages = locales.flatMap((locale) => [
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

  return pages;
}
```

- [ ] **Step 4: Create not-found page**

Create `src/app/not-found.tsx`:

```tsx
export default function NotFound() {
  return (
    <html>
      <body className="flex min-h-screen items-center justify-center bg-white font-sans">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900">404</h1>
          <p className="mt-4 text-gray-500">Page not found</p>
          <a href="/" className="mt-6 inline-block text-blue-500 hover:underline">
            Go home
          </a>
        </div>
      </body>
    </html>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add src/app/robots.ts src/app/sitemap.ts src/app/not-found.tsx src/app/[locale]/layout.tsx
git commit -m "feat: add SEO metadata, robots.txt, sitemap, and 404 page"
```

---

## Phase 7: Animations

### Task 22: Scroll Animations with Motion

**Files:**
- Create: `src/components/ui/animate-in.tsx`
- Modify: all section files to wrap with AnimateIn

- [ ] **Step 1: Create AnimateIn wrapper**

Create `src/components/ui/animate-in.tsx`:

```tsx
"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface AnimateInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function AnimateIn({ children, className, delay = 0 }: AnimateInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Wrap each section's content with AnimateIn**

For each section file (`about.tsx`, `skills.tsx`, `ai-stack.tsx`, `projects.tsx`, `experience.tsx`, `contacts.tsx`), wrap the inner content (inside `<section>` → `<Container>`) with `<AnimateIn>`.

Example pattern for `about.tsx`:

```tsx
import { AnimateIn } from "@/components/ui/animate-in";

// Inside the return:
<section id="about" className="py-section">
  <Container className="max-w-2xl">
    <AnimateIn>
      <SectionHeading>{t("title")}</SectionHeading>
      <p className="mt-6 text-body-lg leading-relaxed text-muted-foreground">
        {t("text")}
      </p>
    </AnimateIn>
  </Container>
</section>
```

For the Hero section, use a staggered animation:

```tsx
// hero.tsx — wrap each element with AnimateIn and increasing delay:
<AnimateIn>
  <p className="text-body-lg text-muted-foreground">{t("greeting")}</p>
</AnimateIn>
<AnimateIn delay={0.1}>
  <h1 className="mt-4 text-display-xl font-bold">Orlov</h1>
</AnimateIn>
<AnimateIn delay={0.2}>
  <p className="mt-2 text-display text-muted-foreground font-light">{t("role")}</p>
</AnimateIn>
// ... etc
```

For the Projects section, stagger each card:

```tsx
// Inside the grid, wrap each Link with AnimateIn:
{projects.map((project, index) => (
  <AnimateIn key={project.slug} delay={index * 0.1}>
    <Link ...>
      <Card ...>...</Card>
    </Link>
  </AnimateIn>
))}
```

- [ ] **Step 3: Verify animations**

```bash
npm run dev
```

Scroll through the page — elements should fade in smoothly as they enter the viewport.

- [ ] **Step 4: Commit**

```bash
git add src/components/
git commit -m "feat: add scroll animations with Motion"
```

---

### Task 23: Final Build Verification

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: Build completes without errors.

- [ ] **Step 2: Test production server**

```bash
npm start
```

Visit http://localhost:3000 — verify all pages work: landing, project cases, resume, locale switching.

- [ ] **Step 3: Test Docker build**

```bash
docker compose build
```

Expected: Docker image builds successfully.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "chore: verify production build and Docker setup"
```

---

## Summary

| Phase | Tasks | Description |
|-------|-------|-------------|
| 1. Foundation | 1-4 | Next.js + Tailwind + i18n + UI primitives |
| 2. Layout | 5-7 | Header, Footer, Layouts |
| 3. Data | 8 | Content data files |
| 4. Sections | 9-16 | All landing page sections |
| 5. Pages | 17-18 | Project cases + Resume page |
| 6. Infra | 19-21 | PDF generation, Docker, SEO |
| 7. Polish | 22-23 | Animations + final build |

**Total:** 23 tasks, ~60 steps

**Important notes:**
- Replace placeholder personal data in `src/data/personal.ts` before deployment
- Add project screenshots to `public/images/projects/` when available
- Set `NEXT_PUBLIC_BASE_URL` to actual domain in production env
- Configure SSL (Let's Encrypt) on VPS separately
