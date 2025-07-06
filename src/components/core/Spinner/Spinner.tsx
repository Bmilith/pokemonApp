export type SpinnerSize = 'small' | 'medium' | 'large';

export type SpinnerAppearance = 'default' | 'invert';

const SIZE_MAPS: Record<SpinnerSize, string> = {
  small: 'w-4 h-4 border-2',
  medium: 'w-8 h-8 border-4',
  large: 'w-16 h-16 border-8',
};

const APPEARANCE_MAPS: Record<SpinnerAppearance, string> = {
  default: 'border-gray-300 border-t-blue-500',
  invert: 'border-gray-700 border-t-white',
};

export type SpinnerProps = {
  appearance?: SpinnerAppearance;
  size?: SpinnerSize;
};

export const Spinner = ({
  size = 'medium',
  appearance = 'default',
}: SpinnerProps) => {
  const baseClasses = 'rounded-full animate-spin';
  const finalClasses = `${baseClasses} ${SIZE_MAPS[size]} ${APPEARANCE_MAPS[appearance]}`;

  return <div className={finalClasses} />;
};
