"use client";

import { Badge } from "@/components/ui/badge";
import { mockMovies } from "@/lib/mock";
import { Star, Play, ExternalLink, Calendar, Clock, MapPin, Heart, Share2 } from "lucide-react";
import { Movie } from "@/lib/types";
import { useAppStore } from "@/lib/store";
import { t } from "@/i18n";

interface MovieDetailProps {
  movie: Movie;
}

export function MovieDetail({ movie }: MovieDetailProps) {
  const { locale, favorites, toggleFavorite, addToHistory } = useAppStore();
  const isFav = favorites.includes(movie.id);
  const title = locale === 'zh' ? movie.title : movie.titleEn;
  const desc = locale === 'zh' ? movie.description : (movie.descriptionEn || movie.description);
  const director = locale === 'zh' ? movie.director : (movie.directorEn || movie.director);
  const actors = locale === 'zh' ? movie.actors : (movie.actorsEn || movie.actors);

  // Record watch history
  if (typeof window !== 'undefined') {
    addToHistory(movie.id);
  }

  const handleShare = async () => {
    const shareData = {
      title: `${movie.title} - Yoofoo`,
      text: locale === 'zh' 
        ? `推荐你看${movie.title}（${movie.titleEn}），评分${movie.rating}分！`
        : `Check out ${movie.titleEn} (${movie.title}), rated ${movie.rating}!`,
      url: window.location.href,
    };
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
    }
  };

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
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-muted-foreground mt-1">
            {locale === 'zh' ? movie.titleEn : movie.title}
          </p>

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
                <span>{movie.episodes} {t(locale, 'episodes')}</span>
              </div>
            )}
            {movie.duration && (
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{movie.duration}</span>
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
            <span className="text-sm text-muted-foreground">{t(locale, 'director')}: </span>
            <span className="text-sm font-medium">{director}</span>
          </div>

          {/* Cast */}
          <div className="mt-2">
            <span className="text-sm text-muted-foreground">{t(locale, 'cast')}: </span>
            <span className="text-sm">{actors.join(' / ')}</span>
          </div>

          {/* Description */}
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{desc}</p>

          {/* Actions */}
          <div className="flex items-center gap-3 mt-6">
            <button
              onClick={() => toggleFavorite(movie.id)}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                isFav
                  ? 'bg-red-50 text-red-600 border border-red-200'
                  : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              <Heart className={`h-4 w-4 ${isFav ? 'fill-red-500 text-red-500' : ''}`} />
              {isFav ? (locale === 'zh' ? '已收藏' : 'Favorited') : (locale === 'zh' ? '收藏' : 'Favorite')}
            </button>
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 rounded-lg bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 hover:bg-gray-100 transition-colors"
            >
              <Share2 className="h-4 w-4" />
              {locale === 'zh' ? '分享' : 'Share'}
            </button>
          </div>

          {/* Watch Links */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold mb-3">{t(locale, 'whereToWatch')}</h3>
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
        <h2 className="text-lg font-semibold mb-4">{t(locale, 'youMayAlsoLike')}</h2>
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
                <h3 className="text-sm font-medium line-clamp-1">
                  {locale === 'zh' ? m.title : m.titleEn}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {locale === 'zh' ? m.titleEn : m.title}
                </p>
              </a>
            ))}
        </div>
      </div>
    </div>
  );
}
