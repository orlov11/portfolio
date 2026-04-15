import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Orlov — Frontend Developer",
  description: "Frontend-разработчик. React, TypeScript, Next.js.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
