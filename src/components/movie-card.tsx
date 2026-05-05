"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Play, Calendar } from "lucide-react";
import { Movie } from "@/lib/types";

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Rating badge */}
          <div className="absolute top-2 left-2 flex items-center gap-1 rounded-full bg-black/70 px-2 py-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-semibold text-white">{movie.rating}</span>
          </div>

          {/* Type badge */}
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-red-600 text-white text-[10px] px-1.5 py-0">
              {movie.type === 'tv' ? 'TV' : 'Movie'}
            </Badge>
          </div>

          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="rounded-full bg-red-600 p-3 shadow-lg">
              <Play className="h-5 w-5 fill-white text-white" />
            </div>
          </div>

          {/* Bottom info */}
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <h3 className="text-sm font-bold text-white line-clamp-1">{movie.title}</h3>
            <p className="text-[11px] text-white/70 line-clamp-1">{movie.titleEn}</p>
          </div>
        </div>

        {/* Content */}
        <CardContent className="p-3">
          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
            <Calendar className="h-3 w-3" />
            <span>{movie.year}</span>
            {movie.episodes && <span>· {movie.episodes}集</span>}
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
