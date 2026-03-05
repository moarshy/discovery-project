import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ClipboardList, TrendingUp, Plus, CheckCircle2, FileOutput, Map, BookOpen, AlertTriangle, BarChart3, Target, FlaskConical, ListChecks } from 'lucide-react';
import { useApp } from '../../store';
import { useProjectData } from '../../hooks/useProjectData';
import { ProcessingOverlay } from '../ProcessingOverlay';
import type { ProcessingStatus } from '../../types';

const outputIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  report: FileText,
  prd: ClipboardList,
  'business-case': TrendingUp,
  'vocabulary-map': Map,
  'brand-strategy': BookOpen,
  'tensions-report': AlertTriangle,
  'activation-report': BarChart3,
  'okr-report': Target,
  'experiment-report': FlaskConical,
  'progress-report': ListChecks,
};

interface OutputPanelProps {
  hasOutputs: boolean;
  processingStatus: ProcessingStatus;
}

export function OutputPanel({ hasOutputs, processingStatus }: OutputPanelProps) {
  const { dispatch } = useApp();
  const projectData = useProjectData();
  const isProcessing = !['idle', 'done'].includes(processingStatus);

  const reports = projectData?.reports ?? [];

  return (
    <div className="h-full flex flex-col bg-[var(--color-bg)]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border)]">
        <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
          Outputs
        </h3>
        <button className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-dashed border-[var(--color-border-bright)] text-xs text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] hover:border-[var(--color-accent)]/40 transition-colors">
          <Plus className="w-3 h-3" />
          Add Output Template
        </button>
      </div>

      <AnimatePresence mode="wait">
        {hasOutputs ? (
          /* Output cards */
          <motion.div
            key="output-cards"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 overflow-y-auto px-4 py-3 space-y-3"
          >
            {reports.map((report, i) => {
              const Icon = outputIcons[report.type] || FileText;

              return (
                <motion.button
                  key={report.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.3 }}
                  onClick={() => dispatch({ type: 'OPEN_OUTPUT', payload: report.id })}
                  className="w-full text-left p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-elevated)] hover:border-[var(--color-border-bright)] transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-[var(--color-accent)]/10 text-[var(--color-accent)] shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-text-primary)] transition-colors">
                          {report.title}
                        </h4>
                        <span className="flex items-center gap-1 text-[10px] font-medium text-green-400">
                          <CheckCircle2 className="w-3 h-3" />
                          Ready
                        </span>
                      </div>
                      <p className="text-xs text-[var(--color-text-tertiary)] mt-1">
                        {report.description}
                      </p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        ) : isProcessing ? (
          <div key="processing" className="flex-1">
            <ProcessingOverlay status={processingStatus} context="output" />
          </div>
        ) : (
          /* Empty state */
          <div key="empty" className="flex-1 flex flex-col items-center justify-center px-8">
            <div className="p-3 rounded-xl bg-[var(--color-surface)] border border-dashed border-[var(--color-border-bright)] mb-4">
              <FileOutput className="w-6 h-6 text-[var(--color-text-tertiary)]" />
            </div>
            <p className="text-sm font-medium text-[var(--color-text-secondary)] text-center">
              No outputs yet
            </p>
            <p className="text-xs text-[var(--color-text-tertiary)] text-center mt-1.5 leading-relaxed max-w-[240px]">
              Run analysis to generate reports, PRDs, and business cases from your sources.
            </p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
