import { NextRequest, NextResponse } from 'next/server';
import { aiService } from '@/lib/ai-service';

export async function POST(req: NextRequest) {
  try {
    const { message, name, city, product } = await req.json();

    if (!message || !name || !city || !product) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const result = await aiService.generate('messagePersonalizer', { message, name, city, product });

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error('AI Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
