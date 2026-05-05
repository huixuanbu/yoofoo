import { NextResponse } from 'next/server';
import { getMovies, getGenres } from '@/lib/db';

export async function GET() {
  const genres = await getGenres();
  return NextResponse.json({ success: true, data: genres });
}
