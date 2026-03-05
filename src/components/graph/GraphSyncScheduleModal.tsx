import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown } from 'lucide-react';
import type { GraphSyncSchedule } from '../../types';

interface GraphSyncScheduleModalProps {
  existingSchedule: GraphSyncSchedule | null;
  onSave: (schedule: GraphSyncSchedule) => void;
  onRemove: () => void;
  onClose: () => void;
}

const frequencies = ['daily', 'weekly'] as const;
const times = ['06:00', '09:00', '12:00', '15:00', '18:00'];

function formatTimeLabel(time: string): string {
  const [h] = time.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${hour12}:00 ${suffix}`;
}

export function GraphSyncScheduleModal({ existingSchedule, onSave, onRemove, onClose }: GraphSyncScheduleModalProps) {
  const [frequency, setFrequency] = useState<GraphSyncSchedule['frequency']>(existingSchedule?.frequency ?? 'daily');
  const [time, setTime] = useState(existingSchedule?.time ?? '06:00');

  function handleSave() {
    onSave({ frequency, time });
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/50" onClick={onClose} />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 8 }}
          transition={{ duration: 0.2 }}
          className="relative w-[340px] rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-border)]">
            <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
              Schedule Graph Sync
            </h3>
            <button
              onClick={onClose}
              className="p-1.5 rounded-md text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-elevated)] transition-colors shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="px-5 py-4 space-y-5">
            {/* Frequency */}
            <div>
              <label className="text-[11px] font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider">
                Frequency
              </label>
              <div className="mt-1.5 flex rounded-lg border border-[var(--color-border)] overflow-hidden">
                {frequencies.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFrequency(f)}
                    className={`flex-1 px-3 py-1.5 text-xs font-medium transition-colors capitalize ${
                      frequency === f
                        ? 'bg-[var(--color-accent)] text-white'
                        : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)]'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Time */}
            <div>
              <label className="text-[11px] font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider">
                Time
              </label>
              <div className="mt-1.5 relative">
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full appearance-none px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-sm text-[var(--color-text-primary)] hover:border-[var(--color-border-bright)] transition-colors cursor-pointer pr-8"
                >
                  {times.map((t) => (
                    <option key={t} value={t}>
                      {formatTimeLabel(t)}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-[var(--color-text-tertiary)] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-5 py-3 border-t border-[var(--color-border)] bg-[var(--color-bg)]">
            <div>
              {existingSchedule && (
                <button
                  onClick={onRemove}
                  className="px-3 py-1.5 rounded-md text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                >
                  Remove Schedule
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="px-3 py-1.5 rounded-md text-xs font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-elevated)] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-1.5 rounded-md text-xs font-medium bg-[var(--color-accent)] text-white hover:brightness-110 transition-all"
              >
                Save
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
