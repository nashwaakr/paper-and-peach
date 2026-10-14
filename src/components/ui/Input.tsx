import React, { useId } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    const id = useId();
    
    return (
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor={id} className="text-sm font-semibold text-[var(--color-cocoa)]">
          {label}
        </label>
        <input
          id={id}
          ref={ref}
          className={`
            w-full px-4 py-3 min-h-[44px]
            bg-[var(--color-paper)] text-[var(--color-cocoa)]
            border-[1.5px] border-[var(--color-border-warm)]
            rounded-[16px]
            focus:outline-none focus:border-[var(--color-peach-deep)] focus:ring-1 focus:ring-[var(--color-peach-deep)]
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-colors
            ${error ? 'border-[var(--color-berry)] focus:border-[var(--color-berry)] focus:ring-[var(--color-berry)]' : ''}
            ${className}
          `}
          {...props}
        />
        {error && (
          <span className="text-xs text-[var(--color-berry)] mt-1">{error}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
