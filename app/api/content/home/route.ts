import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getHomeContent, saveHomeContent } from '@/lib/dataStorage';

export async function GET() {
  const content = getHomeContent();
  return NextResponse.json(content);
}

export async function PUT(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const content = await request.json();
    saveHomeContent(content);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }
}

