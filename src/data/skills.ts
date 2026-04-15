export interface Skill {
  name: string;
  category: "frontend" | "backend" | "tools" | "infrastructure";
}

export const skills: Skill[] = [
  { name: "React", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "Vite", category: "frontend" },
  { name: "Radix UI", category: "frontend" },
  { name: "Framer Motion", category: "frontend" },
  { name: "React Hook Form", category: "frontend" },
  { name: "TanStack Query", category: "frontend" },
  { name: "NestJS", category: "backend" },
  { name: "Node.js", category: "backend" },
  { name: "PostgreSQL", category: "backend" },
  { name: "Redis", category: "backend" },
  { name: "Drizzle ORM", category: "backend" },
  { name: "Docker", category: "tools" },
  { name: "Git", category: "tools" },
  { name: "n8n", category: "tools" },
  { name: "Chrome Extensions API", category: "tools" },
  { name: "Telegram Bot API", category: "tools" },
  { name: "Capacitor", category: "tools" },
  { name: "Firebase FCM", category: "tools" },
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
    name: "Claude Code + MCP + Skills",
    description: {
      ru: "AI-агент для полного цикла разработки: архитектура, код, ревью, деплой. MCP-серверы для интеграции с GitHub, браузером, файловой системой и внешними API — автоматизация рутины на стероидах",
      en: "AI agent for full development cycle: architecture, code, review, deploy. MCP servers for GitHub, browser, filesystem and external API integration — routine automation on steroids",
    },
  },
  {
    name: "Lovable",
    description: {
      ru: "AI-генерация полноценных UI из описания. Быстрое прототипирование и итерация интерфейсов за минуты вместо часов",
      en: "AI-powered full UI generation from descriptions. Rapid prototyping and interface iteration in minutes instead of hours",
    },
  },
];
