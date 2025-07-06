import { getTextColor, getBorderColor, getBackgroundColor } from './helper';
import type { ButtonVariant } from './Button';

describe('Button helper functions', () => {
  const variants: ButtonVariant[] = ['primary', 'secondary'];

  describe('getTextColor', () => {
    it('returns GRAY_300 when disabled', () => {
      variants.forEach((variant) => {
        expect(getTextColor(variant, true)).toBe('#C4C4C2');
      });
    });

    it('returns correct colors when enabled', () => {
      expect(getTextColor('primary', false)).toBe('white');
      expect(getTextColor('secondary', false)).toBe('#CF182E');
    });
  });

  describe('getBorderColor', () => {
    it('returns GRAY_100 or SECOND for primary variant', () => {
      expect(getBorderColor('primary', true)).toBe('#F4F4F2');
      expect(getBorderColor('primary', false)).toBe('#AD7410');
    });

    it('returns TRANSPARENT for secondary variant', () => {
      expect(getBorderColor('secondary', true)).toBe('transparent');
      expect(getBorderColor('secondary', false)).toBe('transparent');
    });
  });

  describe('getBackgroundColor', () => {
    it('returns GRAY_100 or SECOND for primary variant', () => {
      expect(getBackgroundColor('primary', true)).toBe('#F4F4F2');
      expect(getBackgroundColor('primary', false)).toBe('#AD7410');
    });

    it('returns TRANSPARENT for secondary variant', () => {
      expect(getBackgroundColor('secondary', true)).toBe('transparent');
      expect(getBackgroundColor('secondary', false)).toBe('transparent');
    });
  });
});
