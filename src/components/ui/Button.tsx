import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'md' | 'sm' | 'lg';
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  ...props 
}: ButtonProps) {
  
  const baseClasses = "inline-flex items-center justify-center font-heading transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 min-h-[44px]";
  
  const variants = {
    primary: "bg-[var(--color-peach)] text-[var(--color-cocoa)] hover:bg-[var(--color-peach-deep)] rounded-full",
    secondary: "bg-[var(--color-paper)] border-2 border-[var(--color-cocoa)] text-[var(--color-cocoa)] hover:bg-[var(--color-cream)] rounded-full",
    danger: "bg-[var(--color-berry)] text-white hover:opacity-90 rounded-full",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-2.5 text-base",
    lg: "px-8 py-3 text-lg",
  };

  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
