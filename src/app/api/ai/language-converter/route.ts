import { NextRequest, NextResponse } from 'next/server';
import { aiService } from '@/lib/ai-service';

export async function POST(req: NextRequest) {
  try {
    const { message, targetLanguage } = await req.json();

    if (!message || !targetLanguage) {
      return NextResponse.json({ success: false, error: 'Message and target language are required' }, { status: 400 });
    }

    const result = await aiService.generate('languageConverter', { message, targetLanguage });

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error('AI Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
