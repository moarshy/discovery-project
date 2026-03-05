import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, CheckCircle2, Hash } from 'lucide-react';
import type { Report } from '../../types';

interface ShareToSlackModalProps {
  report: Report;
  onClose: () => void;
}

function SlackIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zm10.124 2.521a2.528 2.528 0 0 1 2.52-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.52V8.834zm-1.271 0a2.528 2.528 0 0 1-2.521 2.521 2.528 2.528 0 0 1-2.521-2.521V2.522A2.528 2.528 0 0 1 15.166 0a2.528 2.528 0 0 1 2.521 2.522v6.312zm-2.521 10.124a2.528 2.528 0 0 1 2.521 2.52A2.528 2.528 0 0 1 15.166 24a2.528 2.528 0 0 1-2.521-2.522v-2.52h2.521zm0-1.271a2.528 2.528 0 0 1-2.521-2.521 2.528 2.528 0 0 1 2.521-2.521h6.312A2.528 2.528 0 0 1 24 15.166a2.528 2.528 0 0 1-2.522 2.521h-6.312z" />
    </svg>
  );
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function stripMarkup(text: string): string {
  return text
    .replace(/\[metric:[^\]]+\]/g, '')
    .replace(/>\s*\[(conflict|recommendation)\]\s*/g, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\[\d+\]/g, '')
    .replace(/\(P[012]\)/g, '')
    .replace(/\|[^|]+/g, '')
    .replace(/---+/g, '')
    .replace(/\n+/g, ' ')
    .trim();
}

function extractSummary(report: Report): string {
  // Try each section until we find one with usable text
  for (const section of report.sections) {
    const plain = stripMarkup(section.content);
    if (plain.length > 20) {
      return plain.length > 180 ? plain.slice(0, 177) + '...' : plain;
    }
  }
  return report.description;
}

const typeLabels: Record<string, string> = {
  report: 'Report',
  prd: 'PRD',
  'business-case': 'Business Case',
  'vocabulary-map': 'Vocabulary Map',
  'brand-strategy': 'Brand Strategy',
  'tensions-report': 'Tensions Report',
  'activation-report': 'Activation Report',
  'okr-report': 'OKR Report',
  'experiment-report': 'Experiment Report',
  'progress-report': 'Progress Report',
};

export function ShareToSlackModal({ report, onClose }: ShareToSlackModalProps) {
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (sent) {
      const t = setTimeout(onClose, 1500);
      return () => clearTimeout(t);
    }
  }, [sent, onClose]);

  const summary = extractSummary(report);
  const typeLabel = typeLabels[report.type] ?? report.type;

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
          className="relative w-[420px] max-h-[85vh] rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-2xl overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {sent ? (
              /* Success state */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 px-6"
              >
                <div className="p-3 rounded-full bg-green-500/10 mb-3">
                  <CheckCircle2 className="w-8 h-8 text-green-400" />
                </div>
                <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                  Shared to #product-updates
                </p>
                <p className="text-xs text-[var(--color-text-tertiary)] mt-1">
                  Your team will see this in Slack
                </p>
              </motion.div>
            ) : (
              /* Form state */
              <motion.div key="form" exit={{ opacity: 0 }}>
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-border)]">
                  <div className="flex items-center gap-2.5">
                    <SlackIcon className="w-5 h-5 text-[var(--color-text-primary)]" />
                    <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
                      Share to Slack
                    </h3>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-1.5 rounded-md text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-elevated)] transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Channel selector */}
                <div className="px-5 pt-4 pb-3">
                  <label className="text-[11px] font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider">
                    Channel
                  </label>
                  <button className="mt-1.5 w-full flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-left hover:border-[var(--color-border-bright)] transition-colors">
                    <Hash className="w-3.5 h-3.5 text-[var(--color-text-tertiary)]" />
                    <span className="text-sm text-[var(--color-text-primary)] flex-1">
                      product-updates
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-[var(--color-text-tertiary)]" />
                  </button>
                </div>

                {/* Message preview */}
                <div className="px-5 pb-4">
                  <label className="text-[11px] font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider">
                    Preview
                  </label>
                  <div className="mt-1.5 rounded-lg border border-[var(--color-border)] bg-[#1a1d21] overflow-hidden">
                    {/* Slack message */}
                    <div className="p-3">
                      {/* Bot header */}
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shrink-0">
                          <span className="text-white text-xs font-bold">D</span>
                        </div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-[13px] font-bold text-white">
                            Discovery
                          </span>
                          <span className="text-[10px] px-1 py-0.5 rounded bg-[#2e3138] text-[#9ea3a9] font-medium">
                            APP
                          </span>
                          <span className="text-[11px] text-[#9ea3a9]">
                            {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>

                      {/* Message text */}
                      <p className="text-[13px] text-[#d1d2d3] mb-2 ml-10">
                        New {typeLabel.toLowerCase()} is ready for review
                      </p>

                      {/* Attachment card */}
                      <div className="ml-10 rounded-md overflow-hidden border border-[#3a3d42]">
                        <div className="flex">
                          {/* Color bar */}
                          <div className="w-1 shrink-0 bg-indigo-500" />
                          <div className="p-3 flex-1 bg-[#222529]">
                            <p className="text-[13px] font-bold text-[#1d9bd1] hover:underline cursor-pointer">
                              {report.title}
                            </p>
                            <p className="text-[12px] text-[#abadaf] mt-1 leading-relaxed">
                              {summary}
                            </p>
                            <div className="flex items-center gap-1.5 mt-2 text-[11px] text-[#7c7e83]">
                              <span>{typeLabel}</span>
                              <span>&middot;</span>
                              <span>Synthesized from {report.sourceCount} sources</span>
                              <span>&middot;</span>
                              <span>{formatDate(report.generatedAt)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-2 px-5 py-3 border-t border-[var(--color-border)] bg-[var(--color-bg)]">
                  <button
                    onClick={onClose}
                    className="px-3 py-1.5 rounded-md text-xs font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-elevated)] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setSent(true)}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-md text-xs font-medium bg-[#007a5a] text-white hover:bg-[#148567] transition-colors"
                  >
                    <SlackIcon className="w-3.5 h-3.5" />
                    Send to Slack
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
