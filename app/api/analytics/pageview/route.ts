import { NextRequest, NextResponse } from 'next/server';
import { getAnalytics, saveAnalytics } from '@/lib/dataStorage';

export async function POST(request: NextRequest) {
  try {
    const { page } = await request.json();
    if (!page) {
      return NextResponse.json({ error: 'Page name required' }, { status: 400 });
    }

    const analytics = getAnalytics();
    const pageIndex = analytics.pageViews.findIndex((p: any) => p.page === page);
    
    if (pageIndex >= 0) {
      analytics.pageViews[pageIndex].views++;
    } else {
      analytics.pageViews.push({ page, views: 1 });
    }

    analytics.lastUpdated = new Date().toISOString();
    saveAnalytics(analytics);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error tracking page view:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

