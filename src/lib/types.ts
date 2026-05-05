export interface Movie {
  id: string;
  title: string;
  titleEn: string;
  year: number;
  type: 'movie' | 'tv';
  genre: string[];
  poster: string;
  description: string;
  rating: number;
  actors: string[];
  director: string;
  episodes?: number;
  links: MovieLink[];
  region: string;
}

export interface MovieLink {
  platform: string;
  url: string;
  quality: string;
  region: string;
}

export interface Category {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
}

export type FilterType = 'all' | 'movie' | 'tv';
export type GenreFilter = 'all' | string;
