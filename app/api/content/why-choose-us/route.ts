import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getWhyChooseUs, saveWhyChooseUs } from '@/lib/dataStorage';

export async function GET() {
  try {
    const items = getWhyChooseUs();
    console.log('GET /api/content/why-choose-us - Returning', items.length, 'items');
    return NextResponse.json(items);
  } catch (error) {
    console.error('Error in GET /api/content/why-choose-us:', error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const items = await request.json();
    console.log('PUT /api/content/why-choose-us - Saving', items.length, 'items');
    console.log('PUT /api/content/why-choose-us - Items data:', JSON.stringify(items, null, 2));
    saveWhyChooseUs(items);
    const verify = getWhyChooseUs();
    console.log('PUT /api/content/why-choose-us - Verified saved items:', verify.length);
    return NextResponse.json({ success: true, savedCount: verify.length });
  } catch (error) {
    console.error('PUT /api/content/why-choose-us - Error:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Invalid data' }, { status: 400 });
  }
}

