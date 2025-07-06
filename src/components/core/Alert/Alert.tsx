import {
  forwardRef,
  useMemo,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { Sucess } from '@/assets';
import { ICON_WIDTH } from '@/constants/baseConstants';
import type { AlertType } from '@/types/base';

export type AlertProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  type: AlertType;
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ type, children, ...props }, ref) => {
    const icon = useMemo(() => {
      switch (type) {
        case 'success':
          return <img src={Sucess} width={ICON_WIDTH} alt="Success" />;
        case 'error':
          return <img src={Sucess} width={ICON_WIDTH} alt="Error" />;
      }
    }, [type]);

    return (
      <div
        role="alert"
        ref={ref}
        className={`alert flex items-start gap-2 p-3 sm:p-6 border rounded-sm text-cui-text-primary text-sm sm:text-base ${
          type === 'success'
            ? 'bg-success-100 border-success-200'
            : 'bg-error-100 border-error-200'
        }`}
        {...props}
      >
        <div className="flex-shrink-0">{icon}</div>
        {children}
      </div>
    );
  }
);
