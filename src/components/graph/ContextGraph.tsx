import { Network } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { useApp } from '../../store';
import { TableView } from './TableView';
import { GraphView } from './GraphView';
import { ProcessingOverlay } from '../ProcessingOverlay';
import type { ProcessingStatus } from '../../types';

interface ContextGraphProps {
  hasEntities: boolean;
  processingStatus: ProcessingStatus;
}

export function ContextGraph({ hasEntities, processingStatus }: ContextGraphProps) {
  const { state, dispatch } = useApp();
  const isProcessing = !['idle', 'done'].includes(processingStatus);

  return (
    <div className="h-full flex flex-col bg-[var(--color-bg)]">
      {/* Header with toggle */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border)]">
        <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
          Context Graph
        </h3>
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

      {/* Content */}
      <div className="flex-1 min-h-0">
        <AnimatePresence mode="wait">
          {hasEntities ? (
            state.graphView === 'table' ? <TableView /> : <GraphView />
          ) : isProcessing ? (
            <ProcessingOverlay status={processingStatus} context="graph" />
          ) : (
            <div className="h-full flex flex-col items-center justify-center px-8">
              <div className="p-3 rounded-xl bg-[var(--color-surface)] border border-dashed border-[var(--color-border-bright)] mb-4">
                <Network className="w-6 h-6 text-[var(--color-text-tertiary)]" />
              </div>
              <p className="text-sm font-medium text-[var(--color-text-secondary)] text-center">
                No entities extracted yet
              </p>
              <p className="text-xs text-[var(--color-text-tertiary)] text-center mt-1.5 leading-relaxed max-w-[240px]">
                Add sources and run analysis to extract entities and build a knowledge graph.
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
