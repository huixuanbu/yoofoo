import { NextResponse } from 'next/server';
import { getMovies } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'all';
  const genre = searchParams.get('genre') || 'all';
  const search = searchParams.get('q') || '';
  const limit = parseInt(searchParams.get('limit') || '20');
  const skip = parseInt(searchParams.get('skip') || '0');
  const sortBy = searchParams.get('sort') || '';

  const { movies, total } = await getMovies({ type, genre, search, limit, skip, sortBy });

  return NextResponse.json({
    success: true,
    data: movies,
    pagination: {
      total,
      limit,
      skip,
      hasMore: skip + limit < total,
    },
  });
}
