import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Approach } from "@/components/sections/approach";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Contacts } from "@/components/sections/contacts";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <About />
      <Approach />
      <Projects />
      <Skills />
      <Experience />
      <Contacts />
    </>
  );
}
