"use client";

import Link from "next/link";
import { MovieCard } from "@/components/movie-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { categories, mockMovies } from "@/lib/mock";
import { Star, TrendingUp, Play } from "lucide-react";

export default function HomePage() {
  const topRated = [...mockMovies].sort((a, b) => b.rating - a.rating).slice(0, 5);
  const latestMovies = mockMovies.filter(m => m.year >= 2023);
  const tvDramas = mockMovies.filter(m => m.type === 'tv').slice(0, 5);
  const movies = mockMovies.filter(m => m.type === 'movie').slice(0, 5);

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-b from-red-600 to-red-800 text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              有福 <span className="text-red-200">· Yoofoo</span>
            </h1>
            <p className="mt-4 text-lg text-red-100 md:text-xl">
              Discover the best Chinese TV dramas, movies, and shows. Curated for global audiences.
            </p>
            <p className="mt-2 text-sm text-red-200">
              向世界讲好中国故事
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/tv">
                <Button size="lg" className="bg-white text-red-600 hover:bg-red-50 font-semibold">
                  <Play className="mr-2 h-4 w-4" />
                  Browse TV Dramas
                </Button>
              </Link>
              <Link href="/search">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  Explore All
                </Button>
              </Link>
            </div>
          </div>
        </div>
        {/* Decorative circles */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5" />
        <div className="absolute right-10 bottom-0 h-40 w-40 rounded-full bg-white/5" />
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
                {cat.name}
              </Badge>
            </Link>
          ))}
        </div>
      </section>

      {/* Top Rated */}
      <section className="mx-auto max-w-6xl px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-red-600" />
            <h2 className="text-xl font-bold">Top Rated</h2>
          </div>
          <Link href="/search" className="text-sm text-red-600 hover:underline">View All →</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {topRated.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      {/* TV Dramas */}
      <section className="mx-auto max-w-6xl px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">📺 TV Dramas</h2>
          <Link href="/tv" className="text-sm text-red-600 hover:underline">View All →</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {tvDramas.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      {/* Movies */}
      <section className="mx-auto max-w-6xl px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">🎬 Movies</h2>
          <Link href="/movie" className="text-sm text-red-600 hover:underline">View All →</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      {/* 2023+ Latest */}
      {latestMovies.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">✨ Latest Releases</h2>
            <Link href="/search" className="text-sm text-red-600 hover:underline">View All →</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {latestMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
