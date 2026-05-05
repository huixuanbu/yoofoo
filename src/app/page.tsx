"use client";

import Link from "next/link";
import { MovieCard } from "@/components/movie-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { categories, mockMovies } from "@/lib/mock";
import { Star, TrendingUp, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { t } from "@/i18n";
import { useState, useEffect, useCallback } from "react";

function HeroCarousel() {
  const { locale } = useAppStore();
  const featured = mockMovies.filter(m => m.rating >= 9.0);
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent(prev => (prev + 1) % featured.length);
  }, [featured.length]);

  const prev = useCallback(() => {
    setCurrent(prev => (prev - 1 + featured.length) % featured.length);
  }, [featured.length]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const movie = featured[current];
  if (!movie) return null;
  const title = locale === 'zh' ? movie.title : movie.titleEn;

  return (
    <section className="relative h-[70vh] min-h-[400px] overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url(${movie.poster})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center px-4">
        <div className="max-w-xl">
          <Badge className="mb-3 bg-red-600 text-white hover:bg-red-700">
            <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
            {movie.rating}
          </Badge>
          <h1 className="text-3xl font-bold text-white md:text-5xl">{title}</h1>
          <p className="text-white/80 mt-1">{locale === 'zh' ? movie.titleEn : movie.title}</p>
          <p className="mt-3 text-sm text-white/70 line-clamp-2">
            {locale === 'zh' ? movie.description : (movie.descriptionEn || movie.description)}
          </p>
          <div className="mt-3 flex gap-2">
            {movie.genre.slice(0, 3).map(g => (
              <Badge key={g} variant="secondary" className="bg-white/20 text-white border-white/30 text-xs">
                {g}
              </Badge>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={`/detail/${movie.id}`}>
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white font-semibold">
                <Play className="mr-2 h-4 w-4" />
                {locale === 'zh' ? '立即观看' : 'Watch Now'}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white backdrop-blur-sm hover:bg-black/60 transition-colors"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white backdrop-blur-sm hover:bg-black/60 transition-colors"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {featured.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === current ? 'w-6 bg-red-500' : 'w-1.5 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </section>
  );
}

function SectionTitle({ icon, label, href }: { icon: string; label: string; href: string }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <span className="text-xl">{icon}</span>
        <h2 className="text-xl font-bold">{label}</h2>
      </div>
      <Link href={href} className="text-sm text-red-600 hover:underline">
        {useAppStore.getState().locale === 'zh' ? '查看全部 →' : 'View All →'}
      </Link>
    </div>
  );
}

export default function HomePage() {
  const { locale } = useAppStore();
  const topRated = [...mockMovies].sort((a, b) => b.rating - a.rating).slice(0, 10);
  const tvDramas = mockMovies.filter(m => m.type === 'tv').sort((a, b) => b.rating - a.rating);
  const movies = mockMovies.filter(m => m.type === 'movie').sort((a, b) => b.rating - a.rating);
  const latestMovies = [...mockMovies].sort((a, b) => b.year - a.year).slice(0, 10);

  return (
    <div>
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Brand Bar */}
      <section className="bg-red-600 text-white py-3">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <p className="text-sm">
            {t(locale, 'slogan')}
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-wrap gap-3">
          {categories.map(cat => (
            <Link key={cat.id} href={cat.id === 'all' ? '/' : `/${cat.id}`}>
              <Badge
                variant="outline"
                className="px-4 py-2 text-sm cursor-pointer hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors rounded-full"
              >
                <span className="mr-1">{cat.icon}</span>
                {locale === 'zh' ? cat.name : cat.nameEn}
              </Badge>
            </Link>
          ))}
        </div>
      </section>

      {/* Top Rated */}
      <section className="mx-auto max-w-6xl px-4 py-4">
        <SectionTitle icon="🏆" label={t(locale, 'topRated')} href="/search?sort=rating" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {topRated.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      {/* TV Dramas */}
      <section className="mx-auto max-w-6xl px-4 py-4">
        <SectionTitle icon="📺" label={t(locale, 'tvDramas')} href="/tv" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {tvDramas.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      {/* Movies */}
      <section className="mx-auto max-w-6xl px-4 py-4">
        <SectionTitle icon="🎬" label={t(locale, 'movies')} href="/movie" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      {/* Latest */}
      <section className="mx-auto max-w-6xl px-4 py-4 pb-10">
        <SectionTitle icon="✨" label={t(locale, 'latestReleases')} href="/search" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {latestMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </div>
  );
}
