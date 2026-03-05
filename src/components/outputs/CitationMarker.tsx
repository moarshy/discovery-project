import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Citation } from '../../types';
import { useProjectData } from '../../hooks/useProjectData';

interface CitationMarkerProps {
  index: number;
  citation: Citation;
}

export function CitationMarker({ index, citation }: CitationMarkerProps) {
  const [hovered, setHovered] = useState(false);
  const projectData = useProjectData();
  const sources = projectData?.sources ?? [];
  const source = sources.find((s) => s.id === citation.sourceId);

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[var(--color-accent)]/20 text-[var(--color-accent)] text-[8px] font-bold cursor-default ml-0.5 -translate-y-1">
        {index}
      </span>

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-lg shadow-xl p-3 z-50 pointer-events-none"
          >
            <p className="text-[10px] text-[var(--color-text-secondary)] italic leading-relaxed">
              &ldquo;{citation.quote}&rdquo;
            </p>
            {source && (
              <p className="mt-1.5 text-[9px] font-medium text-[var(--color-accent)]">
                — {source.name}
              </p>
            )}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-[var(--color-surface-elevated)] border-r border-b border-[var(--color-border)] rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
