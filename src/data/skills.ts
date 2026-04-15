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
