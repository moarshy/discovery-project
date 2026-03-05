import React from 'react';
import { cn } from '../../lib/utils';

type ButtonVariant = 'primary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white',
  outline:
    'border border-[var(--color-border-bright)] hover:bg-[var(--color-surface-elevated)] text-[var(--color-text-primary)]',
  ghost:
    'hover:bg-[var(--color-surface-elevated)] text-[var(--color-text-secondary)]',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'text-xs px-2.5 py-1.5 gap-1.5',
  md: 'text-sm px-3.5 py-2 gap-2',
  lg: 'text-sm px-5 py-2.5 gap-2',
};

const iconSizeClasses: Record<ButtonSize, string> = {
  sm: 'w-3.5 h-3.5',
  md: 'w-4 h-4',
  lg: 'w-4 h-4',
};

export function Button({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  children,
  onClick,
  disabled = false,
  className,
}: ButtonProps): React.ReactElement {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'rounded-lg font-medium transition-colors flex items-center justify-center',
        variantClasses[variant],
        sizeClasses[size],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {Icon && <Icon className={iconSizeClasses[size]} />}
      {children}
    </button>
  );
}
