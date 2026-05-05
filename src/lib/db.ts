import { MongoClient, Db } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://placeholder:placeholder@cluster0.mongodb.net/yoofoo';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function getDb(): Promise<Db> {
  if (cachedDb) return cachedDb;

  if (!cachedClient) {
    cachedClient = new MongoClient(MONGODB_URI);
    await cachedClient.connect();
  }

  cachedDb = cachedClient.db('yoofoo');
  return cachedDb;
}

export interface DbMovie {
  _id?: string;
  id: string;
  title: string;
  titleEn: string;
  year: number;
  type: 'movie' | 'tv';
  genre: string[];
  poster: string;
  backdrop?: string;
  description: string;
  descriptionEn: string;
  rating: number;
  actors: string[];
  actorsEn: string[];
  director: string;
  directorEn: string;
  episodes?: number;
  duration?: string;
  region: string;
  language: string;
  tags: string[];
  links: Array<{
    platform: string;
    url: string;
    quality: string;
    region: string;
  }>;
  featured?: boolean;
  trending?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Fallback to mock data when DB is not connected
export async function getMovies(filter?: {
  type?: string;
  genre?: string;
  search?: string;
  limit?: number;
  skip?: number;
  sortBy?: string;
}): Promise<{ movies: DbMovie[]; total: number }> {
  try {
    const db = await getDb();
    const collection = db.collection('movies');
    
    const query: Record<string, unknown> = {};
    if (filter?.type && filter.type !== 'all') query.type = filter.type;
    if (filter?.genre && filter.genre !== 'all') query.genre = filter.genre;
    if (filter?.search) {
      query.$or = [
        { title: { $regex: filter.search, $options: 'i' } },
        { titleEn: { $regex: filter.search, $options: 'i' } },
        { actors: { $regex: filter.search, $options: 'i' } },
        { director: { $regex: filter.search, $options: 'i' } },
      ];
    }

    const total = await collection.countDocuments(query);
    const cursor = collection
      .find(query)
      .sort(filter?.sortBy === 'rating' ? { rating: -1 } : { createdAt: -1 })
      .skip(filter?.skip || 0)
      .limit(filter?.limit || 20);
    
    const movies = await cursor.toArray();
    return { movies: movies as unknown as DbMovie[], total };
  } catch {
    // DB not available, use mock data
    const { mockMovies } = await import('./mock');
    let filtered = [...mockMovies];
    
    if (filter?.type && filter.type !== 'all') {
      filtered = filtered.filter(m => m.type === filter.type);
    }
    if (filter?.genre && filter.genre !== 'all') {
      filtered = filtered.filter(m => m.genre.includes(filter.genre as string));
    }
    if (filter?.search) {
      const q = filter.search.toLowerCase();
      filtered = filtered.filter(m =>
        m.title.toLowerCase().includes(q) ||
        m.titleEn.toLowerCase().includes(q) ||
        m.actors.some(a => a.toLowerCase().includes(q)) ||
        m.director.toLowerCase().includes(q)
      );
    }

    if (filter?.sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }
    
    const skip = filter?.skip || 0;
    const limit = filter?.limit || 20;
    const total = filtered.length;
    const movies = filtered.slice(skip, skip + limit).map(m => ({
      ...m,
      descriptionEn: m.description,
      actorsEn: m.actors,
      directorEn: m.director,
      language: 'Chinese',
      tags: m.genre,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    
    return { movies: movies as unknown as DbMovie[], total };
  }
}

export async function getMovieById(id: string): Promise<DbMovie | null> {
  try {
    const db = await getDb();
    const movie = await db.collection('movies').findOne({ id });
    return movie as unknown as DbMovie | null;
  } catch {
    const { getMovieById: mockGet } = await import('./mock');
    const movie = mockGet(id);
    if (!movie) return null;
    return {
      ...movie,
      descriptionEn: movie.description,
      actorsEn: movie.actors,
      directorEn: movie.director,
      language: 'Chinese',
      tags: movie.genre,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as DbMovie;
  }
}

export async function getGenres(): Promise<string[]> {
  try {
    const db = await getDb();
    const genres = await db.collection('movies').distinct('genre');
    return genres.sort();
  } catch {
    const { genres: mockGenres } = await import('./mock');
    return mockGenres.filter(g => g !== '全部');
  }
}
