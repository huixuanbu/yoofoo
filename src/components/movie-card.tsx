"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Play, Calendar, Heart } from "lucide-react";
import { Movie } from "@/lib/types";
import { useAppStore } from "@/lib/store";
import { t } from "@/i18n";
import { useMemo } from "react";

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  const { locale, favorites, toggleFavorite } = useAppStore();
  const isFav = useMemo(() => favorites.includes(movie.id), [favorites, movie.id]);
  const title = locale === 'zh' ? movie.title : movie.titleEn;
  const desc = locale === 'zh' ? movie.description : (movie.descriptionEn || movie.description);

  return (
    <Link href={`/detail/${movie.id}`}>
      <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer bg-white">
        {/* Poster */}
        <div className="relative aspect-[2/3] overflow-hidden bg-gray-100">
          <div
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
            style={{ backgroundImage: `url(${movie.poster})` }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          
          {/* Favorite button */}
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(movie.id); }}
            className="absolute top-2 left-2 z-10 flex items-center justify-center rounded-full bg-black/50 p-1.5 hover:bg-black/70 transition-colors"
          >
            <Heart className={`h-3.5 w-3.5 ${isFav ? 'fill-red-500 text-red-500' : 'text-white'}`} />
          </button>

          {/* Rating badge */}
          <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-black/70 px-2 py-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-semibold text-white">{movie.rating}</span>
          </div>

          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="rounded-full bg-red-600/90 p-3 shadow-lg backdrop-blur-sm">
              <Play className="h-6 w-6 fill-white text-white" />
            </div>
          </div>

          {/* Bottom info */}
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <h3 className="text-sm font-bold text-white line-clamp-1">{title}</h3>
            <p className="text-[11px] text-white/70 line-clamp-1">
              {locale === 'zh' ? movie.titleEn : movie.title}
            </p>
          </div>
        </div>

        {/* Content */}
        <CardContent className="p-3">
          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
            <Calendar className="h-3 w-3" />
            <span>{movie.year}</span>
            {movie.episodes && <span>· {movie.episodes}{t(locale, 'episodes')}</span>}
            {movie.duration && <span>· {movie.duration}</span>}
          </div>
          <div className="flex flex-wrap gap-1">
            {movie.genre.slice(0, 3).map(g => (
              <Badge key={g} variant="outline" className="text-[10px] px-1.5 py-0 border-gray-200">
                {g}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
