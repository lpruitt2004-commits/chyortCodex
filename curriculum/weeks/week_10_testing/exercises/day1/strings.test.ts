import { capitalize } from './strings';

describe('capitalize', () => {
  it('returns empty for empty input', () => {
    expect(capitalize('')).toBe('');
  });

  it('uppercases first char only', () => {
    expect(capitalize('a')).toBe('A');
    expect(capitalize('abc')).toBe('Abc');
  });

  it('keeps rest unchanged', () => {
    expect(capitalize('hELLO')).toBe('HELLO');
    expect(capitalize('hello world')).toBe('Hello world');
  });
});
