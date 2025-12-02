import { sum } from './sum';

describe('[solutions] sum', () => {
  it('adds numbers and validates inputs', () => {
    expect(sum(1, 2)).toBe(3);
    expect(sum(-1, 1)).toBe(0);
    expect(() => sum(NaN as any, 1)).toThrow(TypeError);
    expect(() => sum(1 as any, Infinity as any)).toThrow(TypeError);
  });
});
