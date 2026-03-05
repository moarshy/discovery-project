import { useEffect, useRef, useCallback, useState } from 'react';
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
  forceCollide,
  type SimulationNodeDatum,
  type SimulationLinkDatum,
} from 'd3-force';
import type { GraphNode, GraphEdge, EdgeType } from '../types';

interface SimNode extends SimulationNodeDatum {
  id: string;
  nodeType: 'entity' | 'source';
  data: GraphNode;
}

interface SimLink extends SimulationLinkDatum<SimNode> {
  relationship: EdgeType;
  weight: number;
}

export interface GraphSimNode {
  id: string;
  nodeType: 'entity' | 'source';
  data: GraphNode;
  x?: number;
  y?: number;
}

export interface GraphSimLink {
  source: string;
  target: string;
  relationship: EdgeType;
  weight: number;
}

export interface SimulationOutput {
  nodes: GraphSimNode[];
  links: GraphSimLink[];
}

interface UseGraphOptions {
  nodes: GraphNode[];
  edges: GraphEdge[];
  width: number;
  height: number;
}

export function useGraph({ nodes, edges, width, height }: UseGraphOptions) {
  const simulationRef = useRef<ReturnType<typeof forceSimulation<SimNode>> | null>(null);
  const nodesRef = useRef<SimNode[]>([]);
  const linksRef = useRef<SimLink[]>([]);
  const rafRef = useRef<number>(0);
  const [output, setOutput] = useState<SimulationOutput>({ nodes: [], links: [] });

  useEffect(() => {
    if (!width || !height) return;

    if (simulationRef.current) {
      simulationRef.current.stop();
      cancelAnimationFrame(rafRef.current);
    }

    const simNodes: SimNode[] = nodes.map((n) => ({
      id: n.id,
      nodeType: n.type,
      data: n,
    }));

    const nodeIds = new Set(simNodes.map((n) => n.id));

    const simLinks: SimLink[] = edges
      .filter((e) => nodeIds.has(e.source) && nodeIds.has(e.target))
      .map((e) => ({
        source: e.source,
        target: e.target,
        relationship: e.relationship,
        weight: e.weight,
      }));

    nodesRef.current = simNodes;
    linksRef.current = simLinks;

    // Compute mention counts per node for collide radius
    const mentionCounts = new Map<string, number>();
    for (const link of simLinks) {
      if (link.relationship === 'mentions') {
        const src = typeof link.source === 'object' ? (link.source as SimNode).id : String(link.source);
        mentionCounts.set(src, (mentionCounts.get(src) ?? 0) + 1);
      }
    }

    const simulation = forceSimulation<SimNode>(simNodes)
      .force(
        'link',
        forceLink<SimNode, SimLink>(simLinks)
          .id((d) => d.id)
          .distance((d) => (d.relationship === 'mentions' ? 120 : 80))
          .strength((d) => d.weight * 0.3)
      )
      .force('charge', forceManyBody<SimNode>().strength(-150))
      .force('center', forceCenter(width / 2, height / 2))
      .force('collide', forceCollide<SimNode>().radius((d) => {
        if (d.nodeType === 'source') return 35;
        const refCount = mentionCounts.get(d.id) ?? 1;
        return 35 * (1 + Math.min(refCount - 1, 3) * 0.15);
      }))
      .alphaDecay(0.02);

    simulationRef.current = simulation;

    let lastTick = 0;
    simulation.on('tick', () => {
      const now = performance.now();
      if (now - lastTick < 33) return;
      lastTick = now;

      rafRef.current = requestAnimationFrame(() => {
        setOutput({
          nodes: nodesRef.current.map((n) => ({
            id: n.id,
            nodeType: n.nodeType,
            data: n.data,
            x: n.x,
            y: n.y,
          })),
          links: linksRef.current.map((l) => ({
            source: typeof l.source === 'object' ? (l.source as SimNode).id : String(l.source),
            target: typeof l.target === 'object' ? (l.target as SimNode).id : String(l.target),
            relationship: l.relationship,
            weight: l.weight,
          })),
        });
      });
    });

    return () => {
      simulation.stop();
      cancelAnimationFrame(rafRef.current);
    };
  }, [nodes, edges, width, height]);

  const onDragStart = useCallback((nodeId: string, x: number, y: number) => {
    const sim = simulationRef.current;
    if (!sim) return;
    sim.alphaTarget(0.3).restart();
    const node = nodesRef.current.find((n) => n.id === nodeId);
    if (node) {
      node.fx = x;
      node.fy = y;
    }
  }, []);

  const onDrag = useCallback((nodeId: string, x: number, y: number) => {
    const node = nodesRef.current.find((n) => n.id === nodeId);
    if (node) {
      node.fx = x;
      node.fy = y;
    }
  }, []);

  const onDragEnd = useCallback((nodeId: string) => {
    const sim = simulationRef.current;
    if (!sim) return;
    sim.alphaTarget(0);
    const node = nodesRef.current.find((n) => n.id === nodeId);
    if (node) {
      node.fx = null;
      node.fy = null;
    }
  }, []);

  return { output, onDragStart, onDrag, onDragEnd };
}
