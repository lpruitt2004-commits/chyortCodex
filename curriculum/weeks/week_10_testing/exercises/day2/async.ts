export function delay(ms: number): Promise<void> {
  // TODO: Return a promise that resolves after ms using setTimeout
  throw new Error('Not implemented');
}

export async function retry<T>(fn: () => Promise<T>, attempts: number): Promise<T> {
  // TODO: Try invoking fn; on rejection, retry until attempts exhausted, then throw last error
  // Edge cases: attempts < 1 should call once
  throw new Error('Not implemented');
}
