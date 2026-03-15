import { NextRequest, NextResponse } from 'next/server';
import { aiService } from '@/lib/ai-service';

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ success: false, error: 'Message is required' }, { status: 400 });
    }

    const result = await aiService.generate('emojiSuggester', { message });

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error('AI Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
