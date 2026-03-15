import { NextRequest, NextResponse } from 'next/server';
import { aiService } from '@/lib/ai-service';

export async function POST(req: NextRequest) {
  try {
    const { topic } = await req.json();

    if (!topic) {
      return NextResponse.json({ success: false, error: 'Topic is required' }, { status: 400 });
    }

    const result = await aiService.generate('ctaGenerator', { topic });

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error('AI Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
