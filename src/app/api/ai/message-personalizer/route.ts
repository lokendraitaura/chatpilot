export const runtime = 'edge';
import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rate-limit';
import { aiService } from '@/lib/ai-service';

export async function POST(req: NextRequest) {
  try {
    const ip = req.ip || req.headers.get('x-forwarded-for') || 'anonymous';
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.success) {
      return NextResponse.json({ success: false, error: 'Rate limit exceeded. Try again in a minute.' }, { status: 429 });
    }

    const { message, name, city, product } = await req.json();

    if (!message || !name || !city || !product) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const result = await aiService.generate('messagePersonalizer', { message, name, city, product });

    return NextResponse.json({ success: true, data: result });
  } catch (error: unknown) {
    console.error('AI Error:', error);
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}
