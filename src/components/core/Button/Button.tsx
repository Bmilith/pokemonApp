import React, { forwardRef, type CSSProperties } from 'react';
import { Spinner } from '../index';
import { getBackgroundColor, getBorderColor, getTextColor } from './helper';

export type ButtonVariant = 'primary' | 'secondary';
export type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  readonly disabled?: boolean;
  readonly isLoading?: boolean;
  readonly label?: string;
  readonly onClick: () => void;
  readonly variant: ButtonVariant;
  readonly width?: number;
  readonly icon?: React.ReactNode;
  readonly iconPosition?: 'left' | 'right';
  readonly iconClassName?: string;
  selected?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      label = '',
      onClick,
      disabled,
      isLoading,
      width,
      icon,
      iconPosition = 'left',
      iconClassName,
      selected,
    },
    ref
  ) => {
    const finalDisabled = !!disabled || !!isLoading;

    const textColor = selected ? 'white' : getTextColor(variant, finalDisabled);
    const backgroundColor = selected
      ? 'green'
      : getBackgroundColor(variant, finalDisabled);
    const borderColor = selected
      ? 'green'
      : getBorderColor(variant, finalDisabled);

    const styles: CSSProperties = {
      color: textColor,
      width,
      backgroundColor,
      borderColor,
    };

    const iconElement = icon ? (
      <span className={`flex items-center ${iconClassName ?? ''}`}>{icon}</span>
    ) : null;

    const iconContent = (
      <>
        {iconElement && (
          <span className={iconPosition === 'left' ? 'mr-2' : 'mr-2'}>
            {iconElement}
          </span>
        )}
        {label}
      </>
    );

    const content = isLoading ? (
      <Spinner size="small" appearance="invert" />
    ) : (
      iconContent
    );

    return (
      <button
        ref={ref}
        className={`flex h-10 items-center justify-center rounded-sm border-2 px-2.5 py-0  hover:opacity-80 ${finalDisabled ? 'hover:cursor-not-allowed' : 'hover:cursor-pointer'}`}
        style={styles}
        onClick={onClick}
        disabled={finalDisabled}
      >
        {content}
      </button>
    );
  }
);
