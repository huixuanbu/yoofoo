"use client";

import Link from "next/link";
import { Search, Menu, X, Heart, Globe, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/store";
import { t, type Locale } from "@/i18n";
import { useRouter, usePathname } from "next/navigation";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { locale, setLocale, favorites } = useAppStore();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (l: Locale) => {
    setLocale(l);
    setLangOpen(false);
  };

  const navItems = [
    { href: "/", label: t(locale, 'home') },
    { href: "/tv", label: t(locale, 'tvDramas') },
    { href: "/movie", label: t(locale, 'movies') },
    { href: "/search", label: t(locale, 'search') },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur-lg">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-xl font-bold text-red-600">
            {locale === 'zh' ? '有福' : 'Yoofoo'}
          </span>
          {locale === 'zh' && (
            <span className="hidden text-sm text-muted-foreground sm:inline">Yoofoo</span>
          )}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors ${
                pathname === item.href
                  ? 'text-red-600'
                  : 'hover:text-red-600 text-gray-700'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-1 md:flex">
          {/* Language Switcher */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLangOpen(!langOpen)}
              className="gap-1 text-xs"
            >
              <Globe className="h-3.5 w-3.5" />
              {locale === 'zh' ? '中文' : 'EN'}
              <ChevronDown className="h-3 w-3" />
            </Button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 w-24 rounded-lg border bg-white py-1 shadow-lg">
                <button
                  onClick={() => switchLocale('en')}
                  className={`w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 ${
                    locale === 'en' ? 'text-red-600 font-medium' : ''
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => switchLocale('zh')}
                  className={`w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 ${
                    locale === 'zh' ? 'text-red-600 font-medium' : ''
                  }`}
                >
                  中文
                </button>
              </div>
            )}
          </div>

          <Link href="/search">
            <Button variant="ghost" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </Link>

          {favorites.length > 0 && (
            <Link href="/favorites">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-4 w-4" />
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                  {favorites.length}
                </span>
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t bg-white md:hidden">
          <div className="flex flex-col gap-1 p-4">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`rounded-md px-3 py-2 text-sm font-medium ${
                  pathname === item.href
                    ? 'bg-red-50 text-red-600'
                    : 'hover:bg-gray-100'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="border-t my-2" />
            <div className="flex gap-2 px-3">
              <button
                onClick={() => { switchLocale('en'); setMenuOpen(false); }}
                className={`rounded-md px-3 py-1.5 text-sm ${
                  locale === 'en' ? 'bg-red-50 text-red-600 font-medium' : 'hover:bg-gray-100'
                }`}
              >
                English
              </button>
              <button
                onClick={() => { switchLocale('zh'); setMenuOpen(false); }}
                className={`rounded-md px-3 py-1.5 text-sm ${
                  locale === 'zh' ? 'bg-red-50 text-red-600 font-medium' : 'hover:bg-gray-100'
                }`}
              >
                中文
              </button>
            </div>
            {favorites.length > 0 && (
              <Link
                href="/favorites"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100"
              >
                <Heart className="h-4 w-4" />
                {locale === 'zh' ? '我的收藏' : 'My Favorites'} ({favorites.length})
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
