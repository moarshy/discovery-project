import type { EntityTypeName, EdgeType } from '../types';

const entityTypeColors: Record<EntityTypeName, string> = {
  'strategic-bet': '#6366F1',
  'experiment': '#8B5CF6',
  'opportunity': '#10B981',
  'pain-point': '#F59E0B',
  'feature-request': '#06B6D4',
};

export function getEntityTypeColor(type: EntityTypeName): string {
  return entityTypeColors[type];
}

const entityTypeLabels: Record<EntityTypeName, string> = {
  'strategic-bet': 'Strategic Bet',
  'experiment': 'Experiment',
  'opportunity': 'Opportunity',
  'pain-point': 'Pain Point',
  'feature-request': 'Feature Request',
};

export function getEntityTypeLabel(type: EntityTypeName): string {
  return entityTypeLabels[type];
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
