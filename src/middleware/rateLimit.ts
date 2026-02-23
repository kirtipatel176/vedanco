/**
 * In-memory IP rate limiter specifically for Next.js 16/15 serverless edge/node runtime.
 * Usage: Call at the start of an API route to enforce maximum hits per window.
 * For true scalable multi-instance deployment, replace the Map with Redis (Upstash).
 */
export class RateLimiter {
    private static readonly cache = new Map<string, { count: number; resetTime: number }>();

    /**
     * Rate limit algorithm logic
     */
    static checkLimit(ip: string, limit = 5, windowMs = 60 * 1000): { success: boolean; limit: number; remaining: number; reset: number } {
        const now = Date.now();
        const record = this.cache.get(ip);

        if (!record) {
            const resetTime = now + windowMs;
            this.cache.set(ip, { count: 1, resetTime });
            return { success: true, limit, remaining: limit - 1, reset: resetTime };
        }

        // Window naturally expired, reset the counter
        if (now > record.resetTime) {
            const resetTime = now + windowMs;
            this.cache.set(ip, { count: 1, resetTime });
            return { success: true, limit, remaining: limit - 1, reset: resetTime };
        }

        // Limit fully consumed during the valid window
        if (record.count >= limit) {
            return { success: false, limit, remaining: 0, reset: record.resetTime };
        }

        // Under limit, increment
        record.count += 1;
        return { success: true, limit, remaining: limit - record.count, reset: record.resetTime };
    }
}
