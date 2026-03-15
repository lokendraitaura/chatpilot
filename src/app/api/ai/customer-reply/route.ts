import { NextRequest, NextResponse } from 'next/server';
import { aiService } from '@/lib/ai-service';

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();

    if (!query) {
      return NextResponse.json({ success: false, error: 'Query is required' }, { status: 400 });
    }

    const result = await aiService.generate('customerReply', { query });

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error('AI Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
