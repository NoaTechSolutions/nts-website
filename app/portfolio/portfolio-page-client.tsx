"use client";

import Link from "next/link";
import { useLanguage } from "@/app/components/language-provider";
import { translations } from "@/lib/i18n";
import { portfolioProjects } from "@/lib/portfolio-projects";

function formatDomain(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export function PortfolioPageClient() {
  const { locale } = useLanguage();
  const t = translations[locale];
  const viewLabel = locale === "es" ? "Ver" : "View";

  return (
    <main className="min-h-screen bg-[var(--bg-page)] px-4 py-16 sm:px-6 lg:px-10">
      <section className="mx-auto flex max-w-7xl flex-col gap-10">
        <div className="flex flex-col gap-6">
          <span className="brand-kicker">Portfolio</span>
          <h1 className="section-title max-w-[15ch]">
            {t.portfolioSection.title}
          </h1>
          <p className="section-copy max-w-3xl">{t.portfolioSection.copy}</p>
          <p className="section-copy max-w-3xl font-medium text-[#ff9900]">
            {t.portfolioSection.accent}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/" className="button-outline">
              {t.nav.home}
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {portfolioProjects.map((project) => (
            <a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="group overflow-hidden rounded-[2rem] border border-[#d8e3fb] bg-white shadow-[0_20px_60px_rgba(2,41,119,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(2,41,119,0.16)]"
            >
              <div className="relative aspect-[5/4] overflow-hidden bg-[#edf4ff]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="h-full w-full object-cover object-left-top transition duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <div className="flex items-center justify-between gap-4 px-6 py-5">
                <div className="min-w-0">
                  <h2
                    className="truncate text-[1.2rem] font-medium text-[#022977]"
                    style={{ fontFamily: "var(--font-display-stack)" }}
                  >
                    {project.title}
                  </h2>
                  <p className="truncate text-sm text-[#5f7398]">
                    {formatDomain(project.link)}
                  </p>
                </div>
                <span className="text-sm font-medium uppercase tracking-[0.18em] text-[#0400f0]">
                  {viewLabel}
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
