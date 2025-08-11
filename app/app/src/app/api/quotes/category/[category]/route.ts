import { NextRequest, NextResponse } from 'next/server';
import { getQuotesByCategory, getRandomQuoteByCategory } from '@/lib/database';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ category: string }> }
) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  
  const { category } = await params;

  try {
    let quotes;
    
    if (type === 'random') {
      quotes = await getRandomQuoteByCategory(category);
    } else {
      quotes = await getQuotesByCategory(category, page, limit);
    }

    return NextResponse.json(quotes);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quotes by category' },
      { status: 500 }
    );
  }
}