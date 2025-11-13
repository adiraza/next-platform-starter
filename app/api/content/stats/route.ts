import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getStats, saveStats } from '@/lib/dataStorage';

export async function GET() {
  try {
    const stats = getStats();
    console.log('GET /api/content/stats - Returning', stats.length, 'stats');
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error in GET /api/content/stats:', error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const stats = await request.json();
    console.log('PUT /api/content/stats - Saving', stats.length, 'stats');
    console.log('PUT /api/content/stats - Stats data:', JSON.stringify(stats, null, 2));
    saveStats(stats);
    const verify = getStats();
    console.log('PUT /api/content/stats - Verified saved stats:', verify.length);
    return NextResponse.json({ success: true, savedCount: verify.length });
  } catch (error) {
    console.error('PUT /api/content/stats - Error:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Invalid data' }, { status: 400 });
  }
}

