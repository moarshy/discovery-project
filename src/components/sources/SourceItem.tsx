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
}

export function SourceItem({ source, isSelected, isHighlighted, onClick }: SourceItemProps) {
  const Icon = iconMap[source.icon] || FileText;

  return (
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
  );
}
