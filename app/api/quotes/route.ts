import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getQuotes, addQuote } from '@/lib/dataStorage';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const quotes = getQuotes();
  return NextResponse.json(quotes);
}

export async function POST(request: NextRequest) {
  // Public endpoint for generating quotes
  try {
    const data = await request.json();
    const quote = addQuote({
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      requirements: data.requirements,
      pdfPath: data.pdfPath
    });
    return NextResponse.json({ success: true, quote });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }
}

