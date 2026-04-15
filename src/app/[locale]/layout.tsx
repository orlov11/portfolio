import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { inter } from "@/lib/fonts";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

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

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
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
