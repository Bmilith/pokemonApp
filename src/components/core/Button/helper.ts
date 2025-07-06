import type { ButtonVariant } from './Button';

const BUTTON_COLORS = {
  PRIMARY: 'white',
  GRAY_100: '#F4F4F2',
  GRAY_300: '#C4C4C2',
  BRAND: '#CF182E',
  SECOND: '#AD7410',
  TRANSPARENT: 'transparent',
};

export function getTextColor(
  variant: ButtonVariant,
  disabled: boolean | undefined
): string {
  if (disabled) {
    return BUTTON_COLORS.GRAY_300;
  }
  switch (variant) {
    case 'primary':
      return BUTTON_COLORS.PRIMARY;

    case 'secondary':
      return BUTTON_COLORS.BRAND;
  }
}

export function getBorderColor(
  variant: ButtonVariant,
  disabled: boolean | undefined
): string {
  switch (variant) {
    case 'primary':
      return disabled ? BUTTON_COLORS.GRAY_100 : BUTTON_COLORS.SECOND;
    case 'secondary':
      return BUTTON_COLORS.TRANSPARENT;
  }
}

export function getBackgroundColor(
  variant: ButtonVariant,
  disabled: boolean | undefined
): string {
  switch (variant) {
    case 'primary':
      return disabled ? BUTTON_COLORS.GRAY_100 : BUTTON_COLORS.SECOND;
    case 'secondary':
      return BUTTON_COLORS.TRANSPARENT;
  }
}
