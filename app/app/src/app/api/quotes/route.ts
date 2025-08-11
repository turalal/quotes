import { NextRequest, NextResponse } from 'next/server';
import { getAllQuotes, getRandomQuote, getDailyQuote } from '@/lib/database';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');

  try {
    let quotes;
    
    switch (type) {
      case 'random':
        quotes = await getRandomQuote();
        break;
      case 'daily':
        quotes = await getDailyQuote();
        break;
      case 'all':
      default:
        quotes = await getAllQuotes(page, limit);
        break;
    }

    return NextResponse.json(quotes);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quotes' },
      { status: 500 }
    );
  }
}