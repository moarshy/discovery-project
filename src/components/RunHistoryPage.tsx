import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText, ClipboardList, TrendingUp, CheckCircle2,
  Map, BookOpen, AlertTriangle, BarChart3, Target, FlaskConical,
  ListChecks, Loader2, XCircle,
} from 'lucide-react';
import { useApp } from '../store';
import { runHistory, getRunStats } from '../data/run-history';
import { formatRelativeTime, formatDuration } from '../lib/schedule-utils';
import type { RunHistoryFilter, RunHistoryEntry } from '../types';

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

function StatusDot({ status }: { status: RunHistoryEntry['status'] }) {
  if (status === 'success') return <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />;
  if (status === 'running') return <Loader2 className="w-4 h-4 text-[var(--color-accent)] animate-spin shrink-0" />;
  return <XCircle className="w-4 h-4 text-red-400 shrink-0" />;
}

export function RunHistoryPage() {
  const { dispatch } = useApp();
  const [filter, setFilter] = useState<RunHistoryFilter>('all');
  const stats = getRunStats();

  const sorted = [...runHistory].sort(
    (a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime()
  );

  const filtered = sorted.filter((r) => {
    if (filter === 'all') return true;
    if (filter === 'running') return r.status === 'running';
    if (filter === 'completed') return r.status === 'success';
    return r.status === 'failed';
  });

  const filters: { key: RunHistoryFilter; label: string; count?: number }[] = [
    { key: 'all', label: 'All' },
    { key: 'running', label: 'Running', count: stats.running },
    { key: 'completed', label: 'Completed' },
    { key: 'failed', label: 'Failed', count: stats.failed },
  ];

  return (
    <div className="h-full p-8 overflow-y-auto">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-lg font-semibold text-[var(--color-text-primary)]">
              Run History
            </h1>
            <p className="text-xs text-[var(--color-text-tertiary)] mt-1">
              {stats.total} runs &middot; {stats.successRate}% success rate
            </p>
          </div>
        </div>

        {/* Filter pills */}
        <div className="flex items-center gap-2 mb-5">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filter === f.key
                  ? 'bg-[var(--color-accent)] text-white'
                  : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-border-bright)]'
              }`}
            >
              {f.label}
              {f.count !== undefined && f.count > 0 && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                    filter === f.key
                      ? 'bg-white/20 text-white'
                      : 'bg-[var(--color-surface-elevated)] text-[var(--color-text-tertiary)]'
                  }`}
                >
                  {f.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Rows */}
        <div className="space-y-1">
          {filtered.map((run, i) => {
            const Icon = outputIcons[run.reportType] || FileText;
            return (
              <motion.div
                key={run.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03, duration: 0.2 }}
                onClick={() =>
                  dispatch({
                    type: 'VIEW_RUN_OUTPUT',
                    payload: { projectId: run.projectId, reportId: run.reportId },
                  })
                }
                className="flex items-center gap-3 px-4 py-3 rounded-lg border border-transparent hover:bg-[var(--color-surface-elevated)] hover:border-[var(--color-border)] transition-all cursor-pointer group"
              >
                {/* Status */}
                <StatusDot status={run.status} />

                {/* Icon */}
                <div className="w-7 h-7 rounded-md flex items-center justify-center bg-[var(--color-surface-elevated)] shrink-0">
                  <Icon className="w-3.5 h-3.5 text-[var(--color-text-tertiary)]" />
                </div>

                {/* Title + project */}
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium text-[var(--color-text-primary)] truncate block">
                    {run.reportTitle}
                  </span>
                  <span className="text-[11px] text-[var(--color-text-tertiary)]">
                    {run.projectName}
                  </span>
                </div>

                {/* Trigger pill */}
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full shrink-0 ${
                    run.triggerType === 'scheduled'
                      ? 'bg-[var(--color-accent)]/10 text-[var(--color-accent)] border border-[var(--color-accent)]/20'
                      : 'bg-[var(--color-surface-elevated)] text-[var(--color-text-tertiary)] border border-[var(--color-border)]'
                  }`}
                >
                  {run.triggerType === 'scheduled' ? 'Scheduled' : 'Manual'}
                </span>

                {/* Duration */}
                <span className="text-[11px] text-[var(--color-text-tertiary)] w-14 text-right shrink-0">
                  {run.status === 'running'
                    ? 'Running...'
                    : run.duration !== null
                    ? formatDuration(run.duration)
                    : '—'}
                </span>

                {/* Time */}
                <span className="text-[11px] text-[var(--color-text-tertiary)] w-16 text-right shrink-0">
                  {formatRelativeTime(run.startedAt)}
                </span>
              </motion.div>
            );
          })}

          {filtered.length === 0 && (
            <div className="text-center py-12 text-sm text-[var(--color-text-tertiary)]">
              No runs match this filter.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
