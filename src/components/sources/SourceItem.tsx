import { motion } from 'framer-motion';
import {
  Building2,
  Target,
  FileText,
  TicketCheck,
  Mic,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import type { Source } from '../../types';
import { IntegrationBadge } from './IntegrationBadge';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2,
  Target,
  FileText,
  TicketCheck,
  Mic,
};

interface SourceItemProps {
  source: Source;
  isSelected: boolean;
  isHighlighted: boolean;
  onClick: () => void;
  weight: number;
  onWeightChange: (weight: number) => void;
}

export function SourceItem({ source, isSelected, isHighlighted, onClick, weight, onWeightChange }: SourceItemProps) {
  const Icon = iconMap[source.icon] || FileText;

  return (
    <div>
      <motion.button
        onClick={onClick}
        className={cn(
          'flex items-center gap-2 px-3 py-1.5 rounded-lg text-left w-full transition-all text-xs',
          isSelected
            ? 'bg-[var(--color-accent)]/15 text-[var(--color-accent)] border border-[var(--color-accent)]/30'
            : isHighlighted
              ? 'bg-[var(--color-accent)]/10 text-[var(--color-text-primary)] border border-[var(--color-accent)]/20'
              : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-text-primary)] border border-transparent'
        )}
        whileTap={{ scale: 0.98 }}
      >
        <Icon className="w-3.5 h-3.5 shrink-0" />
        <span className="truncate flex-1">{source.name}</span>
        <IntegrationBadge integrationId={source.integrationId} />
      </motion.button>
      <div
        className="flex items-center gap-2 px-3 pb-1"
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <div className="w-3.5 shrink-0" />
        <input
          type="range"
          min={0}
          max={2}
          step={0.1}
          value={weight}
          onChange={(e) => onWeightChange(parseFloat(e.target.value))}
          className="flex-1 h-1 accent-[var(--color-accent)]"
        />
        <span className="text-[10px] text-[var(--color-text-tertiary)] tabular-nums w-6 text-right">
          {weight.toFixed(1)}×
        </span>
      </div>
    </div>
  );
}
