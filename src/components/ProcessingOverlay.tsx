import { motion } from 'framer-motion';
import type { ProcessingStatus } from '../types';

interface ProcessingOverlayProps {
  status: ProcessingStatus;
  context: 'graph' | 'output';
}

const phaseLabels: Record<string, Record<ProcessingStatus, string>> = {
  graph: {
    idle: '',
    extracting: 'Extracting entities...',
    graphing: 'Building knowledge graph...',
    generating: 'Finalizing graph...',
    done: '',
  },
  output: {
    idle: '',
    extracting: 'Waiting for entities...',
    graphing: 'Analyzing relationships...',
    generating: 'Generating reports...',
    done: '',
  },
};

export function ProcessingOverlay({ status, context }: ProcessingOverlayProps) {
  const label = phaseLabels[context]?.[status] || '';
  if (!label) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex flex-col items-center justify-center px-8"
    >
      {/* Pulsing dot indicator */}
      <div className="flex items-center gap-2 mb-4">
        <div className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--color-accent)]" />
        </div>
      </div>

      {/* Label */}
      <p className="text-sm font-medium text-[var(--color-text-secondary)] text-center">
        {label}
      </p>

      {/* Shimmer bar */}
      <div className="mt-4 w-40 h-1 rounded-full bg-[var(--color-surface-elevated)] overflow-hidden">
        <motion.div
          className="h-full w-1/3 rounded-full bg-[var(--color-accent)]/60"
          animate={{ x: ['-100%', '400%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  );
}
