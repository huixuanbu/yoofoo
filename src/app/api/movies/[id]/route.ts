import { NextResponse } from 'next/server';
import { getMovieById } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const movie = await getMovieById(id);

  if (!movie) {
    return NextResponse.json(
      { success: false, error: 'Movie not found' },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, data: movie });
}
