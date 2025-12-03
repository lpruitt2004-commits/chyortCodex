export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function retry<T>(fn: () => Promise<T>, attempts: number): Promise<T> {
  const max = Math.max(1, attempts);
  let lastErr: unknown;
  for (let i = 0; i < max; i++) {
    try {
      return await fn();
    } catch (e) {
      lastErr = e;
      if (i === max - 1) break;
    }
  }
  throw lastErr as Error;
}
