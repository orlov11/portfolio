"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";
import { useRef, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

const easeOut = [0.16, 1, 0.3, 1] as const;

type RevealDirection = "up" | "down" | "left" | "right";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: RevealDirection;
  distance?: number;
  duration?: number;
  blur?: boolean;
  once?: boolean;
}

const offsetByDirection: Record<RevealDirection, { x: number; y: number }> = {
  up: { x: 0, y: 24 },
  down: { x: 0, y: -24 },
  left: { x: 24, y: 0 },
  right: { x: -24, y: 0 },
};

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  distance,
  duration = 0.7,
  blur = false,
  once = true,
}: RevealProps) {
  const offset = offsetByDirection[direction];
  const dx = distance !== undefined ? Math.sign(offset.x) * distance : offset.x;
  const dy = distance !== undefined ? Math.sign(offset.y) * distance : offset.y;

  return (
    <motion.div
      initial={{ opacity: 0, x: dx, y: dy, filter: blur ? "blur(8px)" : "none" }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration, delay, ease: easeOut }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "div" | "ul" | "section";
}

export function Stagger({
  children,
  className,
  delay = 0,
  stagger = 0.06,
  as = "div",
}: StaggerProps) {
  const variants: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };
  const MotionTag = motion[as];
  return (
    <MotionTag
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className={cn(className)}
    >
      {children}
    </MotionTag>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  direction?: RevealDirection;
  as?: "div" | "li" | "article";
}

export function StaggerItem({
  children,
  className,
  direction = "up",
  as = "div",
}: StaggerItemProps) {
  const offset = offsetByDirection[direction];
  const variants: Variants = {
    hidden: { opacity: 0, x: offset.x, y: offset.y },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.6, ease: easeOut },
    },
  };
  const MotionTag = motion[as];
  return (
    <MotionTag variants={variants} className={cn(className)}>
      {children}
    </MotionTag>
  );
}

interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export function Magnetic({ children, className, strength = 0.25 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  function handleMove(event: MouseEvent<HTMLDivElement>) {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    x.set(dx * strength);
    y.set(dy * strength);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className={cn("inline-block will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}

interface TiltProps {
  children: ReactNode;
  className?: string;
  max?: number;
}

export function Tilt({ children, className, max = 6 }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const springX = useSpring(rx, { stiffness: 200, damping: 20 });
  const springY = useSpring(ry, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(springY, (value) => `${value}deg`);
  const rotateY = useTransform(springX, (value) => `${value}deg`);

  function handleMove(event: MouseEvent<HTMLDivElement>) {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rx.set(px * max * 2);
    ry.set(-py * max * 2);
  }

  function handleLeave() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}

interface GradientCoverProps {
  seed: string;
  label: string;
  className?: string;
}

const palettes: Array<[string, string, string]> = [
  ["#0f172a", "#1e3a8a", "#06b6d4"],
  ["#1f1147", "#7c3aed", "#f472b6"],
  ["#0b132b", "#1c7c54", "#a3e635"],
  ["#111827", "#9333ea", "#f59e0b"],
  ["#0c0a09", "#ea580c", "#fde047"],
  ["#082f49", "#0ea5e9", "#a7f3d0"],
];

function pickPalette(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return palettes[hash % palettes.length];
}

export function GradientCover({ seed, label, className }: GradientCoverProps) {
  const [a, b, c] = pickPalette(seed);
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl",
        className
      )}
      style={{ background: `linear-gradient(135deg, ${a} 0%, ${b} 55%, ${c} 100%)` }}
    >
      <motion.div
        aria-hidden
        className="absolute inset-0 opacity-60"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${c}33, transparent 55%), radial-gradient(circle at 80% 70%, ${b}55, transparent 60%)`,
        }}
        animate={{ scale: [1, 1.08, 1], rotate: [0, 8, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 grid place-items-center px-6 text-center">
        <span className="text-xl font-semibold tracking-tight text-white drop-shadow-md sm:text-2xl">
          {label}
        </span>
      </div>
    </div>
  );
}
