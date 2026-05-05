"use client";

import { MovieCard } from "@/components/movie-card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { genres, mockMovies } from "@/lib/mock";
import { t } from "@/i18n";
import { useMemo } from "react";

export default function SearchPage() {
  const { searchQuery, setSearchQuery, selectedGenre, setSelectedGenre, selectedType, setSelectedType, locale } = useAppStore();

  const filteredMovies = useMemo(() => {
    return mockMovies.filter(m => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q ||
        m.title.toLowerCase().includes(q) ||
        m.titleEn.toLowerCase().includes(q) ||
        m.actors.some(a => a.toLowerCase().includes(q)) ||
        m.director.toLowerCase().includes(q);
      const matchesGenre = selectedGenre === 'all' || m.genre.includes(selectedGenre);
      const matchesType = selectedType === 'all' || m.type === selectedType;
      return matchesSearch && matchesGenre && matchesType;
    });
  }, [searchQuery, selectedGenre, selectedType]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder={t(locale, 'searchPlaceholder')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-11 h-12 rounded-full border-gray-200 bg-gray-50 focus:bg-white text-base"
        />
      </div>

      {/* Type Filter */}
      <div className="flex gap-2 mb-4">
        {(['all', 'tv', 'movie'] as const).map(type => (
          <Badge
            key={type}
            variant={selectedType === type ? "default" : "outline"}
            className={selectedType === type 
              ? "bg-red-600 hover:bg-red-700 cursor-pointer" 
              : "cursor-pointer hover:bg-gray-100"}
            onClick={() => setSelectedType(type)}
          >
            {type === 'all' ? t(locale, 'all') : type === 'tv' ? t(locale, 'tvDramas') : t(locale, 'movies')}
          </Badge>
        ))}
      </div>

      {/* Genre Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {genres.map(g => (
          <Badge
            key={g}
            variant={selectedGenre === g ? "default" : "outline"}
            className={selectedGenre === g 
              ? "bg-red-600 hover:bg-red-700 cursor-pointer" 
              : "cursor-pointer hover:bg-gray-100"}
            onClick={() => setSelectedGenre(g)}
          >
            {g === '全部' ? t(locale, 'all') : g}
          </Badge>
        ))}
      </div>

      {/* Results */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">
          {filteredMovies.length} {t(locale, 'results')}
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
            <p className="text-muted-foreground">{t(locale, 'noResults')}</p>
            <p className="text-sm text-muted-foreground mt-1">{t(locale, 'noResultsHint')}</p>
          </div>
        </div>
      )}
    </div>
  );
}
