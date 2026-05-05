"use client";

import { use } from "react";
import { useEffect, useState } from "react";
import { Movie } from "@/lib/types";
import { getMovieById, mockMovies } from "@/lib/mock";
import { MovieDetail } from "@/components/movie-detail";

export default function MovieDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const movie = getMovieById(id);

  if (!movie) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-medium">Content Not Found</p>
          <p className="text-sm text-muted-foreground mt-1">This title is not available yet.</p>
        </div>
      </div>
    );
  }

  return <MovieDetail movie={movie} />;
}
