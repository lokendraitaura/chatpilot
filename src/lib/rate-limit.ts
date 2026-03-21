/**
 * Simple in-memory rate limiter optimized for Vercel Edge.
 * Note: Edge functions run in isolates. Memory is not entirely shared globally,
 * but this provides basic abuse protection without needing an external Redis database.
 */
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(ip: string): { success: boolean; limit: number; remaining: number; reset: number } {
  const limit = 20; // 20 requests per rolling window
  const windowMs = 60 * 1000; // 1 minute window
  const now = Date.now();
  
  const record = rateLimitMap.get(ip);
  if (!record || record.resetTime < now) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return { success: true, limit, remaining: limit - 1, reset: now + windowMs };
  }
  
  if (record.count >= limit) {
    return { success: false, limit, remaining: 0, reset: record.resetTime };
  }
  
  record.count++;
  return { success: true, limit, remaining: limit - record.count, reset: record.resetTime };
}
