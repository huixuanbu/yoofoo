import { create } from 'zustand';

interface AppState {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedGenre: string;
  setSelectedGenre: (g: string) => void;
  selectedType: 'all' | 'movie' | 'tv';
  setSelectedType: (t: 'all' | 'movie' | 'tv') => void;
}

export const useAppStore = create<AppState>((set) => ({
  searchQuery: '',
  setSearchQuery: (q) => set({ searchQuery: q }),
  selectedGenre: '全部',
  setSelectedGenre: (g) => set({ selectedGenre: g }),
  selectedType: 'all',
  setSelectedType: (t) => set({ selectedType: t }),
}));
