import type { Source, SourceCategory, ExtractedEntity, EntityType, Report, GraphNode, GraphEdge } from '../types';

export interface ProjectData {
  sources: Source[];
  sourceCategories: SourceCategory[];
  entities: ExtractedEntity[];
  entityTypes: EntityType[];
  reports: Report[];
  graphNodes: GraphNode[];
  graphEdges: GraphEdge[];
}
