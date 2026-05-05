export interface Movie {
  id: string;
  title: string;
  titleEn: string;
  year: number;
  type: 'movie' | 'tv';
  genre: string[];
  poster: string;
  description: string;
  descriptionEn?: string;
  rating: number;
  actors: string[];
  actorsEn?: string[];
  director: string;
  directorEn?: string;
  episodes?: number;
  duration?: string;
  links: MovieLink[];
  region: string;
  language?: string;
  backdrop?: string;
  featured?: boolean;
  trending?: boolean;
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
export type Locale = 'en' | 'zh';
