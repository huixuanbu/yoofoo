"use client";

import { Badge } from "@/components/ui/badge";
import { mockMovies } from "@/lib/mock";
import { Star, Play, ExternalLink, Calendar, Clock, MapPin } from "lucide-react";
import { Movie } from "@/lib/types";

interface MovieDetailProps {
  movie: Movie;
}

export function MovieDetail({ movie }: MovieDetailProps) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Poster */}
        <div className="shrink-0">
          <div className="w-64 aspect-[2/3] rounded-xl overflow-hidden shadow-xl bg-gray-100 mx-auto md:mx-0">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${movie.poster})` }}
            />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{movie.title}</h1>
          <p className="text-muted-foreground mt-1">{movie.titleEn}</p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-foreground">{movie.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{movie.year}</span>
            </div>
            {movie.episodes && (
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{movie.episodes} Episodes</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{movie.region}</span>
            </div>
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-2 mt-4">
            {movie.genre.map(g => (
              <Badge key={g} variant="secondary">{g}</Badge>
            ))}
          </div>

          {/* Director */}
          <div className="mt-4">
            <span className="text-sm text-muted-foreground">Director: </span>
            <span className="text-sm font-medium">{movie.director}</span>
          </div>

          {/* Cast */}
          <div className="mt-2">
            <span className="text-sm text-muted-foreground">Cast: </span>
            <span className="text-sm">{movie.actors.join(' / ')}</span>
          </div>

          {/* Description */}
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {movie.description}
          </p>

          {/* Watch Links */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold mb-3">Where to Watch</h3>
            <div className="flex flex-wrap gap-3">
              {movie.links.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors"
                >
                  <Play className="h-4 w-4" />
                  {link.platform}
                  <ExternalLink className="h-3 w-3" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Similar */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-4">You May Also Like</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {mockMovies
            .filter(m => m.id !== movie.id && m.genre.some(g => movie.genre.includes(g)))
            .slice(0, 4)
            .map(m => (
              <a key={m.id} href={`/detail/${m.id}`} className="group">
                <div className="aspect-[2/3] rounded-lg overflow-hidden bg-gray-100 mb-2">
                  <div
                    className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform"
                    style={{ backgroundImage: `url(${m.poster})` }}
                  />
                </div>
                <h3 className="text-sm font-medium line-clamp-1">{m.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-1">{m.titleEn}</p>
              </a>
            ))}
        </div>
      </div>
    </div>
  );
}
