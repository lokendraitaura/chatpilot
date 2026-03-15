import { cn, formatPhoneNumber, validatePhoneNumber } from '../utils';

describe('General Utilities', () => {
  describe('cn (Tailwind class merger)', () => {
    it('should merge classes correctly', () => {
      const result = cn('base-class', { 'active-class': true, 'hidden-class': false }, ['array-class']);
      expect(result).toContain('base-class');
      expect(result).toContain('active-class');
      expect(result).toContain('array-class');
      expect(result).not.toContain('hidden-class');
    });

    it('should handle tailwind conflict resolution', () => {
      const result = cn('px-2 py-2', 'px-4');
      // twMerge should prefer the last px-4
      expect(result).toContain('px-4');
      expect(result).toContain('py-2');
      expect(result).not.toContain('px-2');
    });
  });

  describe('formatPhoneNumber', () => {
    it('should remove everything except digits', () => {
      expect(formatPhoneNumber('+91 (987) 654-3210')).toBe('919876543210');
      expect(formatPhoneNumber('91-987-6543210')).toBe('919876543210');
    });
  });

  describe('validatePhoneNumber', () => {
    it('should return true for valid phone numbers', () => {
      expect(validatePhoneNumber('919876543210')).toBe(true);
      expect(validatePhoneNumber('+91 9876543210')).toBe(true);
    });

    it('should return false for too short numbers', () => {
      expect(validatePhoneNumber('12345')).toBe(false);
    });

    it('should return false for too long numbers', () => {
      expect(validatePhoneNumber('1'.repeat(20))).toBe(false);
    });
  });
});
