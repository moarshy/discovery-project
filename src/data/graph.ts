import type { GraphNode, GraphEdge } from '../types';
import { entities } from './entities';
import { sources } from './sources';
import { getEntityTypeColor } from '../lib/graph-utils';

// Generate graph nodes from entities
export const entityNodes: GraphNode[] = entities.map((e) => ({
  id: e.id,
  label: e.name,
  type: 'entity' as const,
  color: getEntityTypeColor(e.type),
  group: e.type,
}));

// Generate graph nodes from sources
export const sourceNodes: GraphNode[] = sources.map((s) => ({
  id: s.id,
  label: s.name,
  type: 'source' as const,
  color: '#6b7280',
  group: s.category,
}));

export const graphNodes: GraphNode[] = [...entityNodes, ...sourceNodes];

// Generate edges: each entity mentions its source refs
const mentionEdges: GraphEdge[] = entities.flatMap((e) =>
  e.sourceRefs.map((srcId) => ({
    source: e.id,
    target: srcId,
    relationship: 'mentions' as const,
    weight: 0.5,
  }))
);

// Cross-entity relationships
const relationEdges: GraphEdge[] = [
  { source: 'ent-self-serve', target: 'ent-onboarding-slow', relationship: 'supports', weight: 0.8 },
  { source: 'ent-ai-workflow', target: 'ent-manual-export', relationship: 'supports', weight: 0.7 },
  { source: 'ent-mid-market', target: 'ent-self-serve', relationship: 'related', weight: 0.6 },
  { source: 'ent-integrations', target: 'ent-csv-import', relationship: 'related', weight: 0.5 },
  { source: 'ent-usage-pricing', target: 'ent-mid-market', relationship: 'supports', weight: 0.6 },
  { source: 'ent-help-widget', target: 'ent-onboarding-slow', relationship: 'supports', weight: 0.7 },
  { source: 'ent-sso', target: 'ent-mid-market', relationship: 'supports', weight: 0.5 },
  { source: 'ent-usage-pricing', target: 'ent-self-serve', relationship: 'contradicts', weight: 0.4 },
];

export const graphEdges: GraphEdge[] = [...mentionEdges, ...relationEdges];
