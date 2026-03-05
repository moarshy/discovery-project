import { motion } from 'framer-motion';
import {
  FileText, ClipboardList, TrendingUp, Plus, CheckCircle2,
  Map, BookOpen, AlertTriangle, BarChart3, Target, FlaskConical,
  ListChecks, Sparkles, Loader2, Calendar, Lock,
} from 'lucide-react';
import { useApp } from '../../store';
import { useProjectData } from '../../hooks/useProjectData';
import { OutputCardMenu } from './OutputCardMenu';
import { VersionHistoryButton } from './VersionHistoryButton';
import { formatSchedule } from '../../lib/schedule-utils';
import type { OutputGenStatus } from '../../types';

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
  graphSynced: boolean;
}

export function OutputPanel({ graphSynced }: OutputPanelProps) {
  const { state, dispatch } = useApp();
  const projectData = useProjectData();
  const reports = projectData?.reports ?? [];
  const { outputGenStatuses, outputSchedules } = state;

  const getStatus = (id: string): OutputGenStatus => outputGenStatuses[id] ?? 'idle';

  const hasIdleOutputs = graphSynced && reports.some((r) => getStatus(r.id) === 'idle');

  return (
    <div className="h-full flex flex-col bg-[var(--color-bg)]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border)]">
        <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
          Outputs
        </h3>
        <div className="flex items-center gap-2">
          {hasIdleOutputs && (
            <button
              onClick={() =>
                dispatch({
                  type: 'GENERATE_ALL_OUTPUTS',
                  payload: reports
                    .filter((r) => getStatus(r.id) === 'idle')
                    .map((r) => r.id),
                })
              }
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[var(--color-accent)] text-white text-xs font-medium hover:brightness-110 transition-all"
            >
              <Sparkles className="w-3 h-3" />
              Generate All
            </button>
          )}
          <button className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-dashed border-[var(--color-border-bright)] text-xs text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] hover:border-[var(--color-accent)]/40 transition-colors">
            <Plus className="w-3 h-3" />
            Add Output Template
          </button>
        </div>
      </div>

      {/* Cards — always visible */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {reports.map((report, i) => {
          const Icon = outputIcons[report.type] || FileText;
          const status = getStatus(report.id);
          const schedule = outputSchedules[report.id];
          const isLocked = !graphSynced;
          const isGenerating = status === 'generating';
          const isDone = status === 'done';

          return (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              className={`relative p-4 rounded-xl border transition-all ${
                isLocked
                  ? 'border-[var(--color-border)] bg-[var(--color-surface)] opacity-60'
                  : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-elevated)] hover:border-[var(--color-border-bright)]'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`p-2 rounded-lg shrink-0 ${
                    isDone
                      ? 'bg-green-500/10 text-green-400'
                      : isGenerating
                      ? 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]'
                      : 'bg-[var(--color-surface-elevated)] text-[var(--color-text-tertiary)]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-[var(--color-text-primary)]">
                      {report.title}
                    </h4>
                    <div className="flex items-center gap-1.5">
                      {/* Status badge */}
                      {isDone && (
                        <span className="flex items-center gap-1 text-[10px] font-medium text-green-400">
                          <CheckCircle2 className="w-3 h-3" />
                          Ready
                        </span>
                      )}
                      {isGenerating && (
                        <span className="flex items-center gap-1 text-[10px] font-medium text-[var(--color-accent)]">
                          <Loader2 className="w-3 h-3 animate-spin" />
                          Generating...
                        </span>
                      )}
                      {isLocked && (
                        <span className="flex items-center gap-1 text-[10px] font-medium text-[var(--color-text-tertiary)]">
                          <Lock className="w-3 h-3" />
                        </span>
                      )}

                      {/* 3-dot menu */}
                      {!isLocked && (
                        <OutputCardMenu
                          reportId={report.id}
                          status={status}
                          onSchedule={() => dispatch({ type: 'OPEN_SCHEDULE_MODAL', payload: report.id })}
                          onRegenerate={() => dispatch({ type: 'START_OUTPUT_GENERATION', payload: report.id })}
                        />
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-[var(--color-text-tertiary)] mt-1">
                    {isLocked ? 'Sync context graph first' : report.description}
                  </p>

                  {/* Schedule badge */}
                  {schedule && (
                    <div className="flex items-center gap-1.5 mt-2 text-[10px] text-[var(--color-text-tertiary)]">
                      <Calendar className="w-3 h-3" />
                      {formatSchedule(schedule)}
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="mt-3">
                    {isLocked && (
                      <span className="text-[10px] text-[var(--color-text-tertiary)] italic">
                        Waiting for graph sync...
                      </span>
                    )}
                    {!isLocked && status === 'idle' && (
                      <button
                        onClick={() => dispatch({ type: 'START_OUTPUT_GENERATION', payload: report.id })}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--color-accent)] text-white text-xs font-medium hover:brightness-110 transition-all"
                      >
                        <Sparkles className="w-3 h-3" />
                        Generate
                      </button>
                    )}
                    {isDone && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => dispatch({ type: 'OPEN_OUTPUT', payload: report.id })}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors"
                        >
                          <FileText className="w-3 h-3" />
                          View Report
                        </button>
                        <VersionHistoryButton reportId={report.id} />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Shimmer progress bar for generating state */}
              {isGenerating && (
                <div className="mt-3 w-full h-1 rounded-full bg-[var(--color-surface-elevated)] overflow-hidden">
                  <motion.div
                    className="h-full w-1/3 rounded-full bg-[var(--color-accent)]/60"
                    animate={{ x: ['-100%', '400%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
