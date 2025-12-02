import { sum } from './sum';

describe('sum', () => {
  it('adds two positive numbers', () => {
    expect(sum(2, 3)).toBe(5);
  });

  it('adds negatives and zero', () => {
    expect(sum(-2, 0)).toBe(-2);
    expect(sum(-2, -3)).toBe(-5);
  });

  it('throws on NaN or non-finite', () => {
    expect(() => sum(NaN as any, 1)).toThrow(TypeError);
    expect(() => sum(1 as any, Infinity as any)).toThrow(TypeError);
  });
});
