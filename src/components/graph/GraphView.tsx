import { useState, useRef, useCallback, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { select } from 'd3-selection';
import { zoom as d3Zoom, zoomIdentity, type D3ZoomEvent } from 'd3-zoom';
import { useApp } from '../../store';
import { useGraph } from '../../hooks/useGraph';
import { useProjectData } from '../../hooks/useProjectData';
import { getEdgeColor } from '../../lib/graph-utils';
import { GraphFilterBar } from './GraphFilterBar';
import { EntityDetailPanel } from './EntityDetailPanel';

export function GraphView() {
  const { state, dispatch } = useApp();
  const projectData = useProjectData();
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [transform, setTransform] = useState({ x: 0, y: 0, k: 1 });
  const draggingRef = useRef<string | null>(null);
  const dragStartPosRef = useRef({ x: 0, y: 0 });
  const lastClickRef = useRef<{ nodeId: string; time: number } | null>(null);

  const graphNodes = projectData?.graphNodes ?? [];
  const graphEdges = projectData?.graphEdges ?? [];
  const entities = projectData?.entities ?? [];

  // Measure container
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // D3 zoom
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || !dimensions.width) return;

    const zoomBehavior = d3Zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.3, 3])
      .on('zoom', (event: D3ZoomEvent<SVGSVGElement, unknown>) => {
        setTransform({
          x: event.transform.x,
          y: event.transform.y,
          k: event.transform.k,
        });
      });

    const sel = select(svg);
    sel.call(zoomBehavior);
    sel.call(zoomBehavior.transform, zoomIdentity);

    return () => {
      sel.on('.zoom', null);
    };
  }, [dimensions.width, dimensions.height]);

  const { output, onDragStart, onDrag, onDragEnd } = useGraph({
    nodes: graphNodes,
    edges: graphEdges,
    width: dimensions.width,
    height: dimensions.height,
  });

  // Compute ref counts for entity sizing
  const refCountMap = new Map<string, number>();
  for (const e of entities) {
    refCountMap.set(e.id, e.sourceRefs.length);
  }

  // Hover neighbor computation
  const hoverNeighborIds = new Set<string>();
  if (state.hoveredNodeId) {
    hoverNeighborIds.add(state.hoveredNodeId);
    for (const edge of graphEdges) {
      if (edge.source === state.hoveredNodeId) hoverNeighborIds.add(edge.target);
      if (edge.target === state.hoveredNodeId) hoverNeighborIds.add(edge.source);
    }
  }

  // Focus mode neighbor computation
  const focusNeighborIds = new Set<string>();
  if (state.focusNodeId) {
    focusNeighborIds.add(state.focusNodeId);
    for (const edge of graphEdges) {
      if (edge.source === state.focusNodeId) focusNeighborIds.add(edge.target);
      if (edge.target === state.focusNodeId) focusNeighborIds.add(edge.source);
    }
  }

  // Selection-based highlighting
  const selectionHighlightIds = new Set<string>();
  if (state.selectedSourceId) {
    selectionHighlightIds.add(state.selectedSourceId);
    entities.forEach((e) => {
      if (e.sourceRefs.includes(state.selectedSourceId!)) {
        selectionHighlightIds.add(e.id);
      }
    });
  }
  if (state.selectedEntityId) {
    selectionHighlightIds.add(state.selectedEntityId);
    const entity = entities.find((e) => e.id === state.selectedEntityId);
    if (entity) {
      entity.sourceRefs.forEach((id) => selectionHighlightIds.add(id));
    }
  }

  // Filter nodes by entity type and focus mode
  const { hiddenEntityTypes, hiddenEdgeTypes } = state.graphFilters;
  const hiddenEntityNodeIds = new Set<string>();
  for (const e of entities) {
    if (hiddenEntityTypes.has(e.type)) {
      hiddenEntityNodeIds.add(e.id);
    }
  }

  const visibleNodes = output.nodes.filter((n) => {
    if (hiddenEntityNodeIds.has(n.id)) return false;
    if (state.focusNodeId && !focusNeighborIds.has(n.id)) return false;
    return true;
  });

  const visibleNodeIds = new Set(visibleNodes.map((n) => n.id));

  const visibleLinks = output.links.filter((link) => {
    if (hiddenEdgeTypes.has(link.relationship)) return false;
    if (!visibleNodeIds.has(link.source) || !visibleNodeIds.has(link.target)) return false;
    return true;
  });

  const handlePointerDown = useCallback(
    (nodeId: string, e: React.PointerEvent) => {
      e.stopPropagation();
      draggingRef.current = nodeId;
      const svgRect = svgRef.current?.getBoundingClientRect();
      if (!svgRect) return;
      const x = (e.clientX - svgRect.left - transform.x) / transform.k;
      const y = (e.clientY - svgRect.top - transform.y) / transform.k;
      dragStartPosRef.current = { x: e.clientX, y: e.clientY };
      onDragStart(nodeId, x, y);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [onDragStart, transform]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!draggingRef.current) return;
      const svgRect = svgRef.current?.getBoundingClientRect();
      if (!svgRect) return;
      const x = (e.clientX - svgRect.left - transform.x) / transform.k;
      const y = (e.clientY - svgRect.top - transform.y) / transform.k;
      onDrag(draggingRef.current, x, y);
    },
    [onDrag, transform]
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!draggingRef.current) return;
      const dist = Math.hypot(
        e.clientX - dragStartPosRef.current.x,
        e.clientY - dragStartPosRef.current.y
      );
      const nodeId = draggingRef.current;
      onDragEnd(nodeId);
      draggingRef.current = null;

      if (dist < 5) {
        const now = Date.now();
        const last = lastClickRef.current;

        // Double-click detection
        if (last && last.nodeId === nodeId && now - last.time < 300) {
          lastClickRef.current = null;
          const node = output.nodes.find((n) => n.id === nodeId);
          if (node?.nodeType === 'entity') {
            dispatch({
              type: 'SET_FOCUS_NODE',
              payload: state.focusNodeId === nodeId ? null : nodeId,
            });
          }
          return;
        }

        lastClickRef.current = { nodeId, time: now };

        const node = output.nodes.find((n) => n.id === nodeId);
        if (node?.nodeType === 'entity') {
          dispatch({
            type: 'SELECT_ENTITY',
            payload: state.selectedEntityId === nodeId ? null : nodeId,
          });
        } else if (node?.nodeType === 'source') {
          dispatch({
            type: 'SELECT_SOURCE',
            payload: state.selectedSourceId === nodeId ? null : nodeId,
          });
        }
      }
    },
    [onDragEnd, output.nodes, dispatch, state.selectedEntityId, state.selectedSourceId, state.focusNodeId]
  );

  // Position map for edges
  const posMap = new Map<string, { x: number; y: number }>();
  for (const n of output.nodes) {
    if (n.x != null && n.y != null) {
      posMap.set(n.id, { x: n.x, y: n.y });
    }
  }

  // Determine highlighting: hover takes precedence over selection
  const hasHover = state.hoveredNodeId !== null;
  const hasSelectionHighlights = selectionHighlightIds.size > 0;
  const hasAnyHighlight = hasHover || hasSelectionHighlights;

  function getNodeOpacity(nodeId: string): number {
    if (!hasAnyHighlight) return 1;
    if (hasHover) {
      return hoverNeighborIds.has(nodeId) ? 1 : 0.15;
    }
    return selectionHighlightIds.has(nodeId) ? 1 : 0.15;
  }

  function getEdgeOpacity(sourceId: string, targetId: string, relationship: string): number {
    if (hasHover) {
      const bothInHover = hoverNeighborIds.has(sourceId) && hoverNeighborIds.has(targetId);
      if (!bothInHover) return 0.08;
      return relationship === 'mentions' ? 0.3 : 0.6;
    }
    if (hasSelectionHighlights) {
      const bothHighlighted = selectionHighlightIds.has(sourceId) && selectionHighlightIds.has(targetId);
      if (!bothHighlighted) return 0.08;
      return relationship === 'mentions' ? 0.3 : 0.6;
    }
    return relationship === 'mentions' ? 0.3 : 0.6;
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden bg-[var(--color-bg)]"
      onPointerLeave={() => {
        if (state.hoveredNodeId) {
          dispatch({ type: 'SET_HOVERED_NODE', payload: null });
        }
      }}
    >
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        className="absolute inset-0"
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{ cursor: draggingRef.current ? 'grabbing' : 'grab' }}
      >
        <g transform={`translate(${transform.x},${transform.y}) scale(${transform.k})`}>
          {/* Edges */}
          {visibleLinks.map((link, i) => {
            const s = posMap.get(link.source);
            const t = posMap.get(link.target);
            if (!s || !t) return null;

            return (
              <line
                key={`link-${i}`}
                x1={s.x}
                y1={s.y}
                x2={t.x}
                y2={t.y}
                stroke={getEdgeColor(link.relationship)}
                strokeWidth={link.relationship === 'mentions' ? 0.8 : 1.5}
                strokeOpacity={getEdgeOpacity(link.source, link.target, link.relationship)}
                strokeDasharray={link.relationship === 'mentions' ? '3,3' : undefined}
              />
            );
          })}

          {/* Source nodes (circles) */}
          {visibleNodes
            .filter((n) => n.nodeType === 'source')
            .map((n) => {
              const x = n.x ?? 0;
              const y = n.y ?? 0;
              const opacity = getNodeOpacity(n.id);
              const isSelected = state.selectedSourceId === n.id;

              return (
                <g
                  key={n.id}
                  transform={`translate(${x},${y})`}
                  opacity={opacity}
                  style={{ transition: 'opacity 0.3s', cursor: 'pointer' }}
                  onPointerDown={(e) => handlePointerDown(n.id, e)}
                  onPointerEnter={() =>
                    dispatch({ type: 'SET_HOVERED_NODE', payload: n.id })
                  }
                  onPointerLeave={() =>
                    dispatch({ type: 'SET_HOVERED_NODE', payload: null })
                  }
                >
                  {isSelected && (
                    <circle r={18} fill="none" stroke="var(--color-accent)" strokeWidth={2} opacity={0.6} />
                  )}
                  <circle r={14} fill="var(--color-graph-node-fill)" fillOpacity={0.5} stroke="var(--color-graph-node-stroke)" strokeWidth={1} />
                  <text
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="var(--color-graph-node-text)"
                    fontSize={7}
                    fontWeight={500}
                    style={{ pointerEvents: 'none', userSelect: 'none' }}
                  >
                    {n.data.label.length > 10 ? n.data.label.slice(0, 9) + '...' : n.data.label}
                  </text>
                </g>
              );
            })}

          {/* Entity nodes (rounded rects with size by ref count) */}
          {visibleNodes
            .filter((n) => n.nodeType === 'entity')
            .map((n) => {
              const x = n.x ?? 0;
              const y = n.y ?? 0;
              const opacity = getNodeOpacity(n.id);
              const isSelected = state.selectedEntityId === n.id;
              const refCount = refCountMap.get(n.id) ?? 1;
              const sizeFactor = 1 + Math.min(refCount - 1, 3) * 0.15;
              const baseLabelWidth = Math.min(n.data.label.length * 6.5 + 16, 140);
              const labelWidth = baseLabelWidth * sizeFactor;
              const nodeHeight = 24 * sizeFactor;
              const fontSize = 9 * sizeFactor;
              const maxLabelLen = Math.floor(20 * sizeFactor);
              const displayLabel =
                n.data.label.length > maxLabelLen
                  ? n.data.label.slice(0, maxLabelLen - 2) + '...'
                  : n.data.label;

              return (
                <g
                  key={n.id}
                  transform={`translate(${x},${y})`}
                  opacity={opacity}
                  style={{ transition: 'opacity 0.3s', cursor: 'pointer' }}
                  onPointerDown={(e) => handlePointerDown(n.id, e)}
                  onPointerEnter={() =>
                    dispatch({ type: 'SET_HOVERED_NODE', payload: n.id })
                  }
                  onPointerLeave={() =>
                    dispatch({ type: 'SET_HOVERED_NODE', payload: null })
                  }
                >
                  {isSelected && (
                    <rect
                      x={-labelWidth / 2 - 3}
                      y={-nodeHeight / 2 - 3}
                      width={labelWidth + 6}
                      height={nodeHeight + 6}
                      rx={9}
                      fill="none"
                      stroke="var(--color-accent)"
                      strokeWidth={2}
                      opacity={0.6}
                    />
                  )}
                  <rect
                    x={-labelWidth / 2}
                    y={-nodeHeight / 2}
                    width={labelWidth}
                    height={nodeHeight}
                    rx={6}
                    fill={n.data.color}
                    fillOpacity={0.2}
                    stroke={n.data.color}
                    strokeWidth={1}
                    strokeOpacity={0.4}
                  />
                  <text
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={n.data.color}
                    fontSize={fontSize}
                    fontWeight={600}
                    style={{ pointerEvents: 'none', userSelect: 'none' }}
                  >
                    {displayLabel}
                  </text>
                </g>
              );
            })}
        </g>
      </svg>

      {/* Filter bar (replaces old static legend) */}
      <GraphFilterBar />

      {/* Entity detail panel */}
      <AnimatePresence>
        {state.selectedEntityId && <EntityDetailPanel />}
      </AnimatePresence>

      {/* Focus mode indicator */}
      {state.focusNodeId && (
        <button
          onClick={() => dispatch({ type: 'CLEAR_FOCUS_MODE' })}
          className="absolute top-4 left-1/2 -translate-x-1/2 z-20 px-3 py-1.5 rounded-full text-[11px] font-medium bg-[var(--color-accent)]/15 text-[var(--color-accent)] border border-[var(--color-accent)]/30 hover:bg-[var(--color-accent)]/25 transition-colors"
        >
          Focus mode &mdash; Show all nodes
        </button>
      )}
    </div>
  );
}
