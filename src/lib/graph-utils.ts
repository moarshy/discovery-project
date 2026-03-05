import type { EntityType, EntityTypeName, EdgeType, GraphNode, GraphEdge, ExtractedEntity, Source } from '../types';

export function getEntityTypeColor(type: EntityTypeName, entityTypes: EntityType[]): string {
  const et = entityTypes.find((e) => e.id === type);
  return et?.color ?? '#6b7280';
}

export function getEntityTypeLabel(type: EntityTypeName, entityTypes: EntityType[]): string {
  const et = entityTypes.find((e) => e.id === type);
  return et?.label ?? type;
}

const edgeColors: Record<EdgeType, string> = {
  mentions: '#6b7280',
  supports: '#4ade80',
  contradicts: '#f87171',
  related: '#60a5fa',
};

export function getEdgeColor(type: EdgeType): string {
  return edgeColors[type];
}

const edgeLabels: Record<EdgeType, string> = {
  mentions: 'Mentions',
  supports: 'Supports',
  contradicts: 'Contradicts',
  related: 'Related',
};

export function getEdgeLabel(type: EdgeType): string {
  return edgeLabels[type];
}

/**
 * Build graph nodes and edges from entities, sources, and cross-entity relationships.
 */
export function buildGraphData(
  sources: Source[],
  entities: ExtractedEntity[],
  entityTypes: EntityType[],
  crossEdges: GraphEdge[],
): { nodes: GraphNode[]; edges: GraphEdge[] } {
  const entityNodes: GraphNode[] = entities.map((e) => ({
    id: e.id,
    label: e.name,
    type: 'entity' as const,
    color: getEntityTypeColor(e.type, entityTypes),
    group: e.type,
  }));

  const sourceNodes: GraphNode[] = sources.map((s) => ({
    id: s.id,
    label: s.name,
    type: 'source' as const,
    color: '#6b7280',
    group: s.category,
  }));

  const mentionEdges: GraphEdge[] = entities.flatMap((e) =>
    e.sourceRefs.map((srcId) => ({
      source: e.id,
      target: srcId,
      relationship: 'mentions' as const,
      weight: 0.5,
    }))
  );

  return {
    nodes: [...entityNodes, ...sourceNodes],
    edges: [...mentionEdges, ...crossEdges],
  };
}
