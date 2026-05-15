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

  const title = isRu
    ? "Орлов — Frontend / Mobile-разработчик"
    : "Orlov — Frontend / Mobile Developer";
  const description = isRu
    ? "Frontend / Mobile-разработчик. React, TypeScript, Capacitor, Next.js. Портфолио и проекты."
    : "Frontend / Mobile Developer. React, TypeScript, Capacitor, Next.js. Portfolio and projects.";

  return {
    metadataBase: new URL("https://sorlov.tech"),
    title: {
      default: title,
      template: isRu ? "%s | Орлов" : "%s | Orlov",
    },
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ru: "/ru",
        en: "/en",
      },
    },
    openGraph: {
      type: "website",
      locale: isRu ? "ru_RU" : "en_US",
      siteName: "orlov.tech",
      url: `/${locale}`,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
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

  const themeScript = `
(function(){try{
  var stored=localStorage.getItem('theme');
  var prefers=window.matchMedia('(prefers-color-scheme: dark)').matches;
  var theme=stored==='light'||stored==='dark'?stored:(prefers?'dark':'light');
  if(theme==='dark')document.documentElement.classList.add('dark');
  document.documentElement.style.colorScheme=theme;
}catch(e){}})();`;

  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
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
