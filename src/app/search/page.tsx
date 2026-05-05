"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MovieCard } from "@/components/movie-card";
import { Badge } from "@/components/ui/badge";
import { Search, SlidersHorizontal } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { genres, mockMovies } from "@/lib/mock";
import { Movie } from "@/lib/types";
import { useMemo } from "react";

export default function SearchPage() {
  const { searchQuery, setSearchQuery, selectedGenre, setSelectedGenre, selectedType } = useAppStore();

  const filteredMovies = useMemo(() => {
    return mockMovies.filter(m => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q ||
        m.title.toLowerCase().includes(q) ||
        m.titleEn.toLowerCase().includes(q) ||
        m.actors.some(a => a.toLowerCase().includes(q)) ||
        m.director.toLowerCase().includes(q);
      const matchesGenre = selectedGenre === '全部' || m.genre.includes(selectedGenre);
      const matchesType = selectedType === 'all' || m.type === selectedType;
      return matchesSearch && matchesGenre && matchesType;
    });
  }, [searchQuery, selectedGenre, selectedType]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search dramas, movies, actors..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 h-11 rounded-full border-gray-200 bg-gray-50 focus:bg-white"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {genres.map(g => (
          <Badge
            key={g}
            variant={selectedGenre === g ? "default" : "outline"}
            className={selectedGenre === g ? "bg-red-600 hover:bg-red-700 cursor-pointer" : "cursor-pointer hover:bg-gray-100"}
            onClick={() => setSelectedGenre(g)}
          >
            {g}
          </Badge>
        ))}
      </div>

      {/* Results */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">
          {filteredMovies.length} Result{filteredMovies.length !== 1 ? 's' : ''}
        </h2>
      </div>

      {filteredMovies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[30vh] items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground">No results found.</p>
            <p className="text-sm text-muted-foreground mt-1">Try different keywords or filters.</p>
          </div>
        </div>
      )}
    </div>
  );
}
