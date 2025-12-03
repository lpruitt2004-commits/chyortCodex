export function sum(a: number, b: number): number {
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    throw new TypeError('Inputs must be finite numbers');
  }
  return a + b;
}
