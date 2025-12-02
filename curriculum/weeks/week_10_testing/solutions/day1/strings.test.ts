import { capitalize } from './strings';

describe('[solutions] capitalize', () => {
  it('handles empty and various cases', () => {
    expect(capitalize('')).toBe('');
    expect(capitalize('a')).toBe('A');
    expect(capitalize('abc')).toBe('Abc');
    expect(capitalize('hELLO')).toBe('HELLO');
    expect(capitalize('hello world')).toBe('Hello world');
  });
});
