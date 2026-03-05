import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, PanelLeftOpen, Play, Loader2, CheckCircle2 } from 'lucide-react';
import { useApp } from '../store';
import { useProjectData } from '../hooks/useProjectData';
import { seededProjectIds } from '../data/project-registry';
import { SourcePanel } from './sources/SourcePanel';
import { ContextGraph } from './graph/ContextGraph';
import { OutputPanel } from './outputs/OutputPanel';
import { ReportViewer } from './outputs/ReportViewer';
import type { ProcessingStatus } from '../types';

const SOURCE_MIN = 200;
const SOURCE_MAX = 400;
const SOURCE_DEFAULT = 280;
const SOURCE_COLLAPSED = 0;
const GRAPH_MIN = 300;
const OUTPUT_MIN = 260;

const statusLabels: Record<ProcessingStatus, string> = {
  idle: '',
  extracting: 'Extracting entities...',
  graphing: 'Building graph...',
  generating: 'Generating reports...',
  done: 'Complete',
};

export function ProjectWorkspace() {
  const { state, dispatch } = useApp();
  const project = state.projects.find((p) => p.id === state.activeProjectId);
  const projectData = useProjectData();
  const isSeeded = state.activeProjectId ? seededProjectIds.has(state.activeProjectId) : false;
  const { processingStatus } = state;

  // Phased data gating
  const hasEntities = ['graphing', 'generating', 'done'].includes(processingStatus);
  const hasGraph = ['generating', 'done'].includes(processingStatus);
  const hasOutputs = processingStatus === 'done';

  const activeReport =
    hasOutputs && state.activeOutputId && projectData
      ? projectData.reports.find((r) => r.id === state.activeOutputId)
      : null;

  // Timer orchestration for processing phases
  useEffect(() => {
    if (processingStatus === 'idle' || processingStatus === 'done') return;

    const nextPhase: Record<string, ProcessingStatus> = {
      extracting: 'graphing',
      graphing: 'generating',
      generating: 'done',
    };

    const next = nextPhase[processingStatus];
    if (!next) return;

    const timer = setTimeout(() => {
      // Auto-switch to graph view when graphing starts
      if (processingStatus === 'extracting') {
        dispatch({ type: 'SET_GRAPH_VIEW', payload: 'graph' });
      }
      dispatch({ type: 'SET_PROCESSING_STATUS', payload: next });
    }, 2000);

    return () => clearTimeout(timer);
  }, [processingStatus, dispatch]);

  const containerRef = useRef<HTMLDivElement>(null);
  const [sourceWidth, setSourceWidth] = useState(SOURCE_DEFAULT);
  const [sourceCollapsed, setSourceCollapsed] = useState(false);
  // graphRatio is the fraction of remaining space (after source) that goes to the graph panel
  const [graphRatio, setGraphRatio] = useState(0.55);

  const draggingRef = useRef<'source' | 'graph' | null>(null);

  const handlePointerDown = useCallback(
    (handle: 'source' | 'graph', e: React.PointerEvent) => {
      e.preventDefault();
      draggingRef.current = handle;
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    },
    []
  );

  useEffect(() => {
    function onPointerMove(e: PointerEvent) {
      if (!draggingRef.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const totalWidth = rect.width;

      if (draggingRef.current === 'source') {
        const clamped = Math.max(SOURCE_MIN, Math.min(SOURCE_MAX, x));
        // Ensure remaining space can fit graph + output minimums
        const remaining = totalWidth - clamped;
        if (remaining >= GRAPH_MIN + OUTPUT_MIN) {
          setSourceWidth(clamped);
          setSourceCollapsed(false);
        }
      } else if (draggingRef.current === 'graph') {
        const sw = sourceCollapsed ? SOURCE_COLLAPSED : sourceWidth;
        const remaining = totalWidth - sw;
        const graphX = x - sw;
        const ratio = graphX / remaining;
        // Enforce minimums
        const graphPx = ratio * remaining;
        const outputPx = remaining - graphPx;
        if (graphPx >= GRAPH_MIN && outputPx >= OUTPUT_MIN) {
          setGraphRatio(ratio);
        }
      }
    }

    function onPointerUp() {
      if (draggingRef.current) {
        draggingRef.current = null;
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      }
    }

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [sourceWidth, sourceCollapsed]);

  if (!project) return null;

  const COLLAPSED_RAIL = 40;
  const effectiveSourceWidth = sourceCollapsed ? COLLAPSED_RAIL : sourceWidth;
  const isProcessing = !['idle', 'done'].includes(processingStatus);
  const canRun = isSeeded && processingStatus === 'idle';

  return (
    <div className="h-full flex flex-col">
      {/* Project header */}
      <div className="flex items-center gap-3 px-5 py-3 border-b border-[var(--color-border)] bg-[var(--color-surface)] shrink-0">
        <button
          onClick={() => dispatch({ type: 'NAVIGATE_TO_PROJECTS' })}
          className="p-1.5 rounded-md text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-elevated)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h2 className="text-sm font-semibold text-[var(--color-text-primary)]">
          {project.name}
        </h2>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Run button / status pill */}
        <AnimatePresence mode="wait">
          {canRun && (
            <motion.button
              key="run-btn"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={() => dispatch({ type: 'START_PROCESSING' })}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--color-accent)] text-white text-xs font-medium hover:brightness-110 transition-all"
            >
              <Play className="w-3.5 h-3.5" />
              Run Analysis
            </motion.button>
          )}

          {isProcessing && (
            <motion.div
              key="status-pill"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 text-xs font-medium text-[var(--color-accent)]"
            >
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              {statusLabels[processingStatus]}
            </motion.div>
          )}

          {processingStatus === 'done' && (
            <motion.div
              key="done-pill"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-xs font-medium text-green-400"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Complete
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Three-panel layout */}
      <div ref={containerRef} className="flex flex-1 min-h-0 relative">
        {/* Collapsed: expand button */}
        {sourceCollapsed && (
          <div className="shrink-0 w-10 border-r border-[var(--color-border)] flex flex-col items-center pt-3">
            <button
              onClick={() => setSourceCollapsed(false)}
              className="p-1.5 rounded-md text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-elevated)] transition-colors"
              title="Show sources"
            >
              <PanelLeftOpen className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Source panel */}
        <AnimatePresence initial={false}>
          {!sourceCollapsed && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: sourceWidth, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="shrink-0 overflow-hidden border-r border-[var(--color-border)]"
            >
              <div style={{ width: sourceWidth }} className="h-full">
                <SourcePanel hasData={isSeeded} onCollapse={() => setSourceCollapsed(true)} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Resize handle: source ↔ graph */}
        {!sourceCollapsed && (
          <div
            onPointerDown={(e) => handlePointerDown('source', e)}
            className="w-1 shrink-0 cursor-col-resize group relative z-10 -ml-px"
          >
            <div className="absolute inset-y-0 -left-1 w-3" />
            <div className="absolute inset-y-0 left-0 w-px bg-transparent group-hover:bg-[var(--color-accent)]/50 transition-colors" />
          </div>
        )}

        {/* Graph panel */}
        <div
          className="shrink-0 overflow-hidden border-r border-[var(--color-border)]"
          style={{ width: `calc((100% - ${effectiveSourceWidth}px) * ${graphRatio})` }}
        >
          <ContextGraph hasEntities={hasEntities} processingStatus={processingStatus} />
        </div>

        {/* Resize handle: graph ↔ output */}
        <div
          onPointerDown={(e) => handlePointerDown('graph', e)}
          className="w-1 shrink-0 cursor-col-resize group relative z-10 -ml-px"
        >
          <div className="absolute inset-y-0 -left-1 w-3" />
          <div className="absolute inset-y-0 left-0 w-px bg-transparent group-hover:bg-[var(--color-accent)]/50 transition-colors" />
        </div>

        {/* Output panel */}
        <div className="flex-1 min-w-0 overflow-hidden">
          {activeReport ? (
            <ReportViewer report={activeReport} />
          ) : (
            <OutputPanel hasOutputs={hasOutputs} processingStatus={processingStatus} />
          )}
        </div>
      </div>
    </div>
  );
}
