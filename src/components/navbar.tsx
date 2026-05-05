"use client";

import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-red-600">有福</span>
          <span className="hidden text-sm text-muted-foreground sm:inline">Yoofoo</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-sm font-medium hover:text-red-600 transition-colors">
            首页
          </Link>
          <Link href="/tv" className="text-sm font-medium hover:text-red-600 transition-colors">
            电视剧
          </Link>
          <Link href="/movie" className="text-sm font-medium hover:text-red-600 transition-colors">
            电影
          </Link>
          <Link href="/search" className="text-sm font-medium hover:text-red-600 transition-colors">
            搜索
          </Link>
        </nav>

        {/* Desktop Search */}
        <div className="hidden items-center gap-2 md:flex">
          <Link href="/search">
            <Button variant="ghost" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </Link>
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
            <Link href="/" onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100">首页</Link>
            <Link href="/tv" onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100">电视剧</Link>
            <Link href="/movie" onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100">电影</Link>
            <Link href="/search" onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100">搜索</Link>
          </div>
        </div>
      )}
    </header>
  );
}
