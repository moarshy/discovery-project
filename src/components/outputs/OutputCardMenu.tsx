import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoreHorizontal, Calendar, RefreshCw } from 'lucide-react';
import type { OutputGenStatus } from '../../types';

interface OutputCardMenuProps {
  reportId: string;
  status: OutputGenStatus;
  onSchedule: () => void;
  onRegenerate: () => void;
}

export function OutputCardMenu({ reportId, status, onSchedule, onRegenerate }: OutputCardMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
        className="p-1 rounded-md text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)] transition-colors"
      >
        <MoreHorizontal className="w-4 h-4" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.12 }}
            className="absolute right-0 top-full mt-1 w-44 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] shadow-xl z-20 py-1"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
                onSchedule();
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-elevated)] transition-colors"
            >
              <Calendar className="w-3.5 h-3.5" />
              Schedule
            </button>
            {status === 'done' && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(false);
                  onRegenerate();
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-elevated)] transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Regenerate
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
