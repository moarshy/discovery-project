import { cn } from '../../lib/utils';

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info';

interface BadgeProps {
  text?: string;
  label?: string;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-gray-500/15 text-gray-400',
  success: 'bg-green-500/15 text-green-400',
  warning: 'bg-yellow-500/15 text-yellow-400',
  error: 'bg-red-500/15 text-red-400',
  info: 'bg-blue-500/15 text-blue-400',
};

export function Badge({ text, label, variant = 'default', className }: BadgeProps): React.ReactElement {
  const displayText = text ?? label ?? '';
  return (
    <span
      className={cn(
        'rounded-full px-2 py-0.5 text-xs font-medium',
        variantClasses[variant],
        className
      )}
    >
      {displayText}
    </span>
  );
}
