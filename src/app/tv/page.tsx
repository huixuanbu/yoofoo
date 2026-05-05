"use client";

import { MovieCard } from "@/components/movie-card";
import { useAppStore } from "@/lib/store";
import { t } from "@/i18n";
import { mockMovies } from "@/lib/mock";

export default function TVPage() {
  const { locale } = useAppStore();
  const tvDramas = mockMovies.filter(m => m.type === 'tv');

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">📺 {t(locale, 'tvDramas')}</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {tvDramas.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
