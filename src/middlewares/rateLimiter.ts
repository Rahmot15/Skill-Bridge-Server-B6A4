import { Request, Response, NextFunction } from "express";

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type RateLimitOptions = {
  windowMs: number;
  max: number;
  message?: string;
};

const stores = new Map<string, Map<string, RateLimitEntry>>();

function getStore(key: string): Map<string, RateLimitEntry> {
  if (!stores.has(key)) {
    stores.set(key, new Map());
  }
  return stores.get(key)!;
}

// Cleanup expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [, store] of stores) {
    for (const [key, entry] of store) {
      if (now > entry.resetAt) {
        store.delete(key);
      }
    }
  }
}, 5 * 60 * 1000);

export function rateLimit(options: RateLimitOptions) {
  const { windowMs, max, message } = options;

  return (req: Request, res: Response, next: NextFunction) => {
    const key = req.ip || req.socket.remoteAddress || "unknown";
    const store = getStore(key);
    const now = Date.now();
    const resetAt = now + windowMs;

    let entry = store.get(key);

    if (!entry || now > entry.resetAt) {
      entry = { count: 0, resetAt };
      store.set(key, entry);
    }

    entry.count++;

    // Set rate limit headers
    res.setHeader("X-RateLimit-Limit", max);
    res.setHeader("X-RateLimit-Remaining", Math.max(0, max - entry.count));
    res.setHeader("X-RateLimit-Reset", Math.ceil(entry.resetAt / 1000));

    if (entry.count > max) {
      const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
      res.setHeader("Retry-After", retryAfter);

      return res.status(429).json({
        success: false,
        message: message || "Too many requests. Please try again later.",
      });
    }

    next();
  };
}

// Preset limiters
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50,
  message: "Too many auth attempts. Please try again after 15 minutes.",
});

export const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60,
  message: "Too many requests. Please slow down.",
});

export const strictLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: "Too many attempts. Please try again after 15 minutes.",
});
