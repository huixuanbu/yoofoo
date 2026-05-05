"use client";

import { MovieCard } from "@/components/movie-card";
import { useAppStore } from "@/lib/store";
import { mockMovies } from "@/lib/mock";
import { Heart } from "lucide-react";

export default function FavoritesPage() {
  const { locale, favorites } = useAppStore();
  const favMovies = mockMovies.filter(m => favorites.includes(m.id));

  if (favMovies.length === 0) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <Heart className="mx-auto h-12 w-12 text-gray-300" />
          <p className="mt-4 text-lg font-medium text-muted-foreground">
            {locale === 'zh' ? '还没有收藏' : 'No favorites yet'}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {locale === 'zh' 
              ? '点击影视卡片上的❤️来收藏' 
              : 'Click the ❤️ on any card to add favorites'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="flex items-center gap-2 mb-6">
        <Heart className="h-5 w-5 text-red-500" />
        <h1 className="text-xl font-bold">
          {locale === 'zh' ? '我的收藏' : 'My Favorites'}
        </h1>
        <span className="text-sm text-muted-foreground">({favMovies.length})</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {favMovies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
