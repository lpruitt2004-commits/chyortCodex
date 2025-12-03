import { isNonEmptyString, asNumber, taskBuilder } from './utils';

describe('[solutions] utils', () => {
  describe('isNonEmptyString', () => {
    it('works', () => {
      expect(isNonEmptyString('a')).toBe(true);
      expect(isNonEmptyString('  ')).toBe(false);
      expect(isNonEmptyString(123)).toBe(false);
    });
  });

  describe('asNumber', () => {
    it('converts or throws', () => {
      expect(asNumber(7)).toBe(7);
      expect(asNumber('99')).toBe(99);
      expect(() => asNumber('x')).toThrow(TypeError);
    });
  });

  describe('taskBuilder', () => {
    it('defaults and overrides', () => {
      expect(taskBuilder()).toEqual({ id: 1, title: 'Task' });
      expect(taskBuilder({ title: 'Mine' }).title).toBe('Mine');
    });
  });
});
