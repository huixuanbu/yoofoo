import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { FilterType, GenreFilter, Locale } from './types';

interface AppState {
  // Search & Filter
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedGenre: GenreFilter;
  setSelectedGenre: (g: GenreFilter) => void;
  selectedType: FilterType;
  setSelectedType: (t: FilterType) => void;

  // Locale
  locale: Locale;
  setLocale: (l: Locale) => void;

  // Favorites
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;

  // Watch History
  watchHistory: string[];
  addToHistory: (id: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Search
      searchQuery: '',
      setSearchQuery: (q) => set({ searchQuery: q }),
      selectedGenre: 'all',
      setSelectedGenre: (g) => set({ selectedGenre: g }),
      selectedType: 'all',
      setSelectedType: (t) => set({ selectedType: t }),

      // Locale
      locale: 'en',
      setLocale: (l) => set({ locale: l }),

      // Favorites
      favorites: [],
      toggleFavorite: (id) => {
        const favs = get().favorites;
        set({
          favorites: favs.includes(id) ? favs.filter(f => f !== id) : [...favs, id],
        });
      },
      isFavorite: (id) => get().favorites.includes(id),

      // History
      watchHistory: [],
      addToHistory: (id) => {
        const h = get().watchHistory.filter(h => h !== id);
        set({ watchHistory: [id, ...h].slice(0, 50) });
      },
    }),
    {
      name: 'yoofoo-store',
      partialize: (state) => ({
        locale: state.locale,
        favorites: state.favorites,
        watchHistory: state.watchHistory,
      }),
    }
  )
);
