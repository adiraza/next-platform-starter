import { NextResponse } from 'next/server';
import { initializeDefaultData } from '@/lib/initDefaultData';

export async function POST() {
  try {
    initializeDefaultData();
    return NextResponse.json({ success: true, message: 'Default data initialized' });
  } catch (error) {
    console.error('Error initializing data:', error);
    return NextResponse.json({ success: false, error: 'Failed to initialize data' }, { status: 500 });
  }
}

