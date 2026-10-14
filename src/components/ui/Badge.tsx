import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'new' | 'best-seller' | 'eco';
  children: React.ReactNode;
}

export function Badge({ 
  children, 
  variant = 'new', 
  className = '',
  ...props 
}: BadgeProps) {
  
  const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider";
  
  const variants = {
    'new': "bg-[var(--color-butter)] text-[var(--color-cocoa)]",
    'best-seller': "bg-[var(--color-blush)] text-[var(--color-cocoa)]",
    'eco': "bg-[var(--color-mint)] text-[var(--color-cocoa)]",
  };

  return (
    <span 
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
