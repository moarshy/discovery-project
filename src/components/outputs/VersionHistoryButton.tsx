import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { getRunsForReport } from '../../data/run-history';
import { formatRelativeTime, formatDuration } from '../../lib/schedule-utils';

interface VersionHistoryButtonProps {
  reportId: string;
}

export function VersionHistoryButton({ reportId }: VersionHistoryButtonProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const runs = getRunsForReport(reportId);

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

  if (runs.length === 0) return null;

  const latestVersion = runs[0].version;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
        className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-medium text-[var(--color-text-secondary)] bg-[var(--color-surface-elevated)] border border-[var(--color-border)] hover:border-[var(--color-border-bright)] transition-colors"
      >
        v{latestVersion}
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.12 }}
            className="absolute left-0 bottom-full mb-1 w-56 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] shadow-xl z-20"
          >
            <div className="px-3 py-2 border-b border-[var(--color-border)]">
              <span className="text-[11px] font-semibold text-[var(--color-text-primary)]">
                Version History
              </span>
            </div>
            <div className="py-1">
              {runs.map((run, i) => (
                <div
                  key={run.id}
                  className={`flex items-center gap-2 px-3 py-2 text-[11px] ${
                    i === 0
                      ? 'bg-[var(--color-accent)]/5'
                      : 'hover:bg-[var(--color-surface-elevated)]'
                  } transition-colors`}
                >
                  <span className="font-medium text-[var(--color-text-primary)] w-6">
                    v{run.version}
                  </span>
                  <span className="text-[var(--color-text-tertiary)] flex-1">
                    {formatRelativeTime(run.startedAt)}
                    {run.duration !== null && ` \u00b7 ${formatDuration(run.duration)}`}
                  </span>
                  {run.status === 'success' && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0" />
                  )}
                  {run.status === 'failed' && (
                    <XCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                  )}
                  {run.status === 'running' && (
                    <Loader2 className="w-3.5 h-3.5 text-[var(--color-accent)] animate-spin shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
