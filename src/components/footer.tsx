"use client";

import { useAppStore } from "@/lib/store";
import { t } from "@/i18n";

export function Footer() {
  const { locale } = useAppStore();

  return (
    <footer className="border-t bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold text-red-600">
              {locale === 'zh' ? '有福' : 'Yoofoo'}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {t(locale, 'footer.aboutDesc')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold">{t(locale, 'footer.quickLinks')}</h4>
            <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
              <li><a href="/" className="hover:text-red-600">{t(locale, 'home')}</a></li>
              <li><a href="/tv" className="hover:text-red-600">{t(locale, 'tvDramas')}</a></li>
              <li><a href="/movie" className="hover:text-red-600">{t(locale, 'movies')}</a></li>
              <li><a href="/search" className="hover:text-red-600">{t(locale, 'search')}</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold">{t(locale, 'footer.resources')}</h4>
            <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-red-600">{t(locale, 'footer.help')}</a></li>
              <li><a href="#" className="hover:text-red-600">{t(locale, 'footer.terms')}</a></li>
              <li><a href="#" className="hover:text-red-600">{t(locale, 'footer.privacy')}</a></li>
              <li><a href="#" className="hover:text-red-600">{t(locale, 'footer.contact')}</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {locale === 'zh' ? '有福' : 'Yoofoo'}. {t(locale, 'footer.rights')}
        </div>
      </div>
    </footer>
  );
}
