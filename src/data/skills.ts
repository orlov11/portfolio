export interface Skill {
  name: string;
  category: "frontend" | "backend" | "tools" | "infrastructure" | "ai";
  featured?: boolean;
}

export const skills: Skill[] = [
  { name: "React", category: "frontend", featured: true },
  { name: "TypeScript", category: "frontend", featured: true },
  { name: "Next.js", category: "frontend", featured: true },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "Vite", category: "frontend" },
  { name: "Radix UI", category: "frontend" },
  { name: "Motion", category: "frontend" },
  { name: "React Hook Form", category: "frontend" },
  { name: "TanStack Query", category: "frontend" },
  { name: "NestJS", category: "backend", featured: true },
  { name: "Node.js", category: "backend" },
  { name: "PostgreSQL", category: "backend" },
  { name: "Redis", category: "backend" },
  { name: "Drizzle ORM", category: "backend" },
  { name: "Capacitor", category: "tools", featured: true },
  { name: "Telegram Bot API", category: "tools" },
  { name: "Firebase FCM", category: "tools" },
  { name: "Chrome Extensions API", category: "tools" },
  { name: "n8n", category: "tools" },
  { name: "Git", category: "tools" },
  { name: "Docker", category: "infrastructure" },
  { name: "Docker Compose", category: "infrastructure" },
  { name: "Nginx", category: "infrastructure" },
  { name: "GitHub Actions", category: "infrastructure" },
  { name: "Claude Code", category: "ai", featured: true },
  { name: "MCP servers", category: "ai" },
  { name: "Claude Skills", category: "ai" },
  { name: "Lovable", category: "ai" },
];
