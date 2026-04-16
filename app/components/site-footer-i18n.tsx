"use client";

import { useLanguage } from "./language-provider";
import { translations } from "@/lib/i18n";
import { SiteFooter } from "./site-footer";

export function SiteFooterI18n() {
  const { locale } = useLanguage();
  const footer = translations[locale].footerSection;
  return (
    <SiteFooter
      eyebrow={footer.eyebrow}
      watermark={footer.watermark}
      copyright={footer.copyright}
      columns={footer.columns}
    />
  );
}
