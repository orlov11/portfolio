import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div className={cn(
      "rounded-2xl border border-border bg-card p-6 text-card-foreground",
      hover && "transition-all hover:border-muted-foreground/30 hover:shadow-sm",
      className
    )}>
      {children}
    </div>
  );
}
