import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, PanelLeftOpen } from 'lucide-react';
import { useApp } from '../store';
import { useProjectData } from '../hooks/useProjectData';
import { seededProjectIds } from '../data/project-registry';
import { SourcePanel } from './sources/SourcePanel';
import { ContextGraph } from './graph/ContextGraph';
import { OutputPanel } from './outputs/OutputPanel';
import { ReportViewer } from './outputs/ReportViewer';
import { ScheduleModal } from './outputs/ScheduleModal';
import { OutputTemplateModal } from './outputs/OutputTemplateModal';
import type { GraphSyncStatus } from '../types';

const SOURCE_MIN = 200;
const SOURCE_MAX = 400;
const SOURCE_DEFAULT = 280;
const SOURCE_COLLAPSED = 0;
const GRAPH_MIN = 300;
const OUTPUT_MIN = 260;

export function ProjectWorkspace() {
  const { state, dispatch } = useApp();
  const project = state.projects.find((p) => p.id === state.activeProjectId);
  const projectData = useProjectData();
  const isSeeded = state.activeProjectId ? seededProjectIds.has(state.activeProjectId) : false;
  const { graphSyncStatus, outputGenStatuses } = state;

  // Phased data gating
  const hasEntities = ['graphing', 'synced'].includes(graphSyncStatus);
  const hasGraph = graphSyncStatus === 'synced';

  const activeReport =
    state.activeOutputId && projectData
      ? projectData.reports.find((r) => r.id === state.activeOutputId)
      : null;

  // Check if this report is done before showing the viewer
  const reportDone = state.activeOutputId ? outputGenStatuses[state.activeOutputId] === 'done' : false;

  // Graph sync timer: extracting → graphing → synced (2s each)
  useEffect(() => {
    if (graphSyncStatus === 'idle' || graphSyncStatus === 'synced') return;

    const next: Record<string, GraphSyncStatus> = {
      extracting: 'graphing',
      graphing: 'synced',
    };

    const timer = setTimeout(() => {
      const nextStatus = next[graphSyncStatus];
      dispatch({ type: 'SET_GRAPH_SYNC_STATUS', payload: nextStatus });

      // Auto-generate all outputs when sync completes
      if (nextStatus === 'synced' && projectData) {
        const idleIds = projectData.reports
          .filter((r) => (outputGenStatuses[r.id] ?? 'idle') === 'idle')
          .map((r) => r.id);
        if (idleIds.length > 0) {
          dispatch({ type: 'GENERATE_ALL_OUTPUTS', payload: idleIds });
        }
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [graphSyncStatus, dispatch]);

  // Per-output generation timer: generating → done (2.5s each)
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (const [reportId, status] of Object.entries(outputGenStatuses)) {
      if (status === 'generating') {
        timers.push(
          setTimeout(() => {
            dispatch({ type: 'SET_OUTPUT_GEN_STATUS', payload: { reportId, status: 'done' } });
          }, 2500)
        );
      }
    }
    return () => timers.forEach(clearTimeout);
  }, [outputGenStatuses, dispatch]);

  // Schedule modal
  const scheduleReport =
    state.scheduleModalOutputId && projectData
      ? projectData.reports.find((r) => r.id === state.scheduleModalOutputId)
      : null;

  const containerRef = useRef<HTMLDivElement>(null);
  const [sourceWidth, setSourceWidth] = useState(SOURCE_DEFAULT);
  const [sourceCollapsed, setSourceCollapsed] = useState(false);
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

        {/* Resize handle: source <-> graph */}
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
          <ContextGraph hasEntities={hasEntities} graphSyncStatus={graphSyncStatus} isSeeded={isSeeded} />
        </div>

        {/* Resize handle: graph <-> output */}
        <div
          onPointerDown={(e) => handlePointerDown('graph', e)}
          className="w-1 shrink-0 cursor-col-resize group relative z-10 -ml-px"
        >
          <div className="absolute inset-y-0 -left-1 w-3" />
          <div className="absolute inset-y-0 left-0 w-px bg-transparent group-hover:bg-[var(--color-accent)]/50 transition-colors" />
        </div>

        {/* Output panel */}
        <div className="flex-1 min-w-0 overflow-hidden">
          {activeReport && reportDone ? (
            <ReportViewer report={activeReport} />
          ) : (
            <OutputPanel graphSynced={hasGraph} />
          )}
        </div>
      </div>

      {/* Schedule modal */}
      {scheduleReport && state.scheduleModalOutputId && (
        <ScheduleModal
          report={scheduleReport}
          existingSchedule={state.outputSchedules[state.scheduleModalOutputId]}
          onSave={(schedule) =>
            dispatch({
              type: 'SET_OUTPUT_SCHEDULE',
              payload: { reportId: state.scheduleModalOutputId!, schedule },
            })
          }
          onRemove={() =>
            dispatch({ type: 'REMOVE_OUTPUT_SCHEDULE', payload: state.scheduleModalOutputId! })
          }
          onClose={() => dispatch({ type: 'CLOSE_SCHEDULE_MODAL' })}
        />
      )}

      {/* Output template gallery modal */}
      {state.showOutputTemplateModal && <OutputTemplateModal />}
    </div>
  );
}
