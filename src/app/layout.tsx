import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Orlov — Frontend / Mobile Developer",
  description: "Frontend / Mobile-разработчик. React, TypeScript, Capacitor, Next.js.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
