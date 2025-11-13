import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getAnalytics, incrementVisitor } from '@/lib/dataStorage';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const analytics = getAnalytics();
  return NextResponse.json(analytics);
}

export async function POST(request: NextRequest) {
  // Public endpoint to track visitors
  incrementVisitor();
  return NextResponse.json({ success: true });
}

