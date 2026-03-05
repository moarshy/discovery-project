import { useState } from 'react';
import { Network, RefreshCw, Loader2, CheckCircle2, Calendar } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useApp } from '../../store';
import { TableView } from './TableView';
import { GraphView } from './GraphView';
import { ProcessingOverlay } from '../ProcessingOverlay';
import { GraphSyncScheduleModal } from './GraphSyncScheduleModal';
import { formatSyncSchedule } from '../../lib/schedule-utils';
import type { GraphSyncStatus } from '../../types';

interface ContextGraphProps {
  hasEntities: boolean;
  graphSyncStatus: GraphSyncStatus;
  isSeeded: boolean;
}

export function ContextGraph({ hasEntities, graphSyncStatus, isSeeded }: ContextGraphProps) {
  const { state, dispatch } = useApp();
  const isSyncing = graphSyncStatus === 'extracting' || graphSyncStatus === 'graphing';
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  return (
    <div className="h-full flex flex-col bg-[var(--color-bg)]">
      {/* Header with toggle */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border)]">
        <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
          Context Graph
        </h3>

        <div className="flex items-center gap-2">
          {/* Sync schedule hint */}
          {graphSyncStatus === 'synced' && state.graphSyncSchedule && (
            <span className="text-[10px] text-[var(--color-text-tertiary)] mr-1">
              {formatSyncSchedule(state.graphSyncSchedule)}
            </span>
          )}

          {/* Sync status / button */}
          <AnimatePresence mode="wait">
            {graphSyncStatus === 'idle' && isSeeded && (
              <motion.button
                key="sync-btn"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={() => dispatch({ type: 'START_GRAPH_SYNC' })}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[var(--color-accent)] text-white text-xs font-medium hover:brightness-110 transition-all"
              >
                <RefreshCw className="w-3 h-3" />
                Sync
              </motion.button>
            )}

            {graphSyncStatus === 'extracting' && (
              <motion.div
                key="extracting-pill"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 text-xs font-medium text-[var(--color-accent)]"
              >
                <Loader2 className="w-3 h-3 animate-spin" />
                Extracting...
              </motion.div>
            )}

            {graphSyncStatus === 'graphing' && (
              <motion.div
                key="graphing-pill"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 text-xs font-medium text-[var(--color-accent)]"
              >
                <Loader2 className="w-3 h-3 animate-spin" />
                Building graph...
              </motion.div>
            )}

            {graphSyncStatus === 'synced' && (
              <motion.div
                key="synced-controls"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex items-center gap-1"
              >
                <button
                  onClick={() => dispatch({ type: 'START_GRAPH_SYNC' })}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-green-500/10 border border-green-500/20 text-xs font-medium text-green-400 hover:bg-green-500/20 transition-colors"
                  title="Click to re-sync"
                >
                  <CheckCircle2 className="w-3 h-3" />
                  Synced
                </button>
                <button
                  onClick={() => setShowScheduleModal(true)}
                  className={`p-1 rounded-md transition-colors ${
                    state.graphSyncSchedule
                      ? 'text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10'
                      : 'text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)]'
                  }`}
                  title="Schedule sync"
                >
                  <Calendar className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Table / Graph toggle */}
          {hasEntities && (
            <div className="flex rounded-lg border border-[var(--color-border)] overflow-hidden">
              <button
                onClick={() => dispatch({ type: 'SET_GRAPH_VIEW', payload: 'table' })}
                className={`px-3 py-1 text-xs font-medium transition-colors ${
                  state.graphView === 'table'
                    ? 'bg-[var(--color-accent)] text-white'
                    : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)]'
                }`}
              >
                Table
              </button>
              <button
                onClick={() => dispatch({ type: 'SET_GRAPH_VIEW', payload: 'graph' })}
                className={`px-3 py-1 text-xs font-medium transition-colors ${
                  state.graphView === 'graph'
                    ? 'bg-[var(--color-accent)] text-white'
                    : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)]'
                }`}
              >
                Graph
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-h-0">
        <AnimatePresence mode="wait">
          {hasEntities ? (
            state.graphView === 'table' ? <TableView /> : <GraphView />
          ) : isSyncing ? (
            <ProcessingOverlay status={graphSyncStatus} />
          ) : (
            <div className="h-full flex flex-col items-center justify-center px-8">
              <div className="p-3 rounded-xl bg-[var(--color-surface)] border border-dashed border-[var(--color-border-bright)] mb-4">
                <Network className="w-6 h-6 text-[var(--color-text-tertiary)]" />
              </div>
              <p className="text-sm font-medium text-[var(--color-text-secondary)] text-center">
                No entities extracted yet
              </p>
              <p className="text-xs text-[var(--color-text-tertiary)] text-center mt-1.5 leading-relaxed max-w-[240px]">
                {isSeeded
                  ? 'Click "Sync" to extract entities and build a knowledge graph from your sources.'
                  : 'Add sources and run analysis to extract entities and build a knowledge graph.'}
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Graph sync schedule modal */}
      {showScheduleModal && (
        <GraphSyncScheduleModal
          existingSchedule={state.graphSyncSchedule}
          onSave={(schedule) => {
            dispatch({ type: 'SET_GRAPH_SYNC_SCHEDULE', payload: schedule });
            setShowScheduleModal(false);
          }}
          onRemove={() => {
            dispatch({ type: 'SET_GRAPH_SYNC_SCHEDULE', payload: null });
            setShowScheduleModal(false);
          }}
          onClose={() => setShowScheduleModal(false)}
        />
      )}
    </div>
  );
}
