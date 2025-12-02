import { isNonEmptyString, asNumber, taskBuilder } from './utils';

describe('isNonEmptyString (exercises)', () => {
  it('returns true for non-empty strings', () => {
    expect(isNonEmptyString('abc')).toBe(true);
    expect(isNonEmptyString(' x ')).toBe(true);
  });

  it('returns false for empty or non-strings', () => {
    expect(isNonEmptyString('')).toBe(false);
    expect(isNonEmptyString('  ')).toBe(false);
    expect(isNonEmptyString(123)).toBe(false);
    expect(isNonEmptyString(null)).toBe(false);
  });
});

describe('asNumber (exercises)', () => {
  it('accepts numbers and numeric strings', () => {
    expect(asNumber(42)).toBe(42);
    expect(asNumber('123')).toBe(123);
  });

  it('throws on invalid input', () => {
    expect(() => asNumber('abc')).toThrow(TypeError);
    expect(() => asNumber(null)).toThrow(TypeError);
  });
});

describe('taskBuilder (exercises)', () => {
  it('builds with defaults', () => {
    const t = taskBuilder();
    expect(t).toEqual({ id: 1, title: 'Task' });
  });

  it('applies overrides', () => {
    const t = taskBuilder({ title: 'Custom' });
    expect(t.title).toBe('Custom');
  });
});
