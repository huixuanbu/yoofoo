"use client";

import { MovieCard } from "@/components/movie-card";
import { mockMovies } from "@/lib/mock";

export default function MoviePage() {
  const movies = mockMovies.filter(m => m.type === 'movie');

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">🎬 Movies</h1>
        <p className="text-sm text-muted-foreground mt-1">Discover Chinese cinema</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
