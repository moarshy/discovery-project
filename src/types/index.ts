export interface Project {
  id: string;
  name: string;
  projectType: string;
  date: string;
  inputCount: number;
  outputCount: number;
}

export type IntegrationId = 'jira' | 'confluence' | 'google-drive' | 'slack' | 'local-files'
  | 'intercom' | 'airtable' | 'mixpanel' | 'discord';

export interface Integration {
  id: IntegrationId;
  name: string;
  description: string;
  icon: string;
  color: string;
  connected: boolean;
  authType: 'oauth' | 'api-key' | 'local';
}

export interface IntegrationItem {
  id: string;
  integrationId: IntegrationId;
  name: string;
  type: string;
  icon: string;
  description?: string;
}

export interface Source {
  id: string;
  name: string;
  category: string;
  type: string;
  icon: string;
  integrationId?: IntegrationId;
}

export interface SourceCategory {
  id: string;
  label: string;
  sources: Source[];
}

export interface ExtractedEntity {
  id: string;
  name: string;
  type: EntityTypeName;
  description: string;
  sourceRefs: string[];
}

export type EntityTypeName = string;

export interface EntityType {
  id: EntityTypeName;
  label: string;
  color: string;
  entities: ExtractedEntity[];
}

export interface GraphNode {
  id: string;
  label: string;
  type: 'entity' | 'source';
  color: string;
  group: string;
}

export type EdgeType = 'mentions' | 'supports' | 'contradicts' | 'related';

export interface GraphEdge {
  source: string;
  target: string;
  relationship: EdgeType;
  weight: number;
}

export interface Citation {
  sourceId: string;
  quote: string;
  relevance: number;
}

export interface ReportSection {
  heading: string;
  content: string;
  citations: Citation[];
}

export interface Report {
  id: string;
  title: string;
  type: string;
  description: string;
  sections: ReportSection[];
  sourceCount: number;
  generatedAt: string;
}

// Processing pipeline
export type ProcessingStatus = 'idle' | 'extracting' | 'graphing' | 'generating' | 'done';

// Theme
export type Theme = 'dark' | 'light';

// App state
// Skills
export type SkillCategory = 'data-source' | 'extraction' | 'synthesis';

export type SkillId = string;

export interface Skill {
  id: SkillId;
  name: string;
  description: string;
  instructions: string;
  category: SkillCategory;
  enabled: boolean;
  githubUrl?: string;
  icon: string;
  color: string;
}

export type SourceSkillAssignments = Record<string, SkillId[]>;

export type SourceWeights = Record<string, number>;  // sourceId → weight (0..2, default 1)

export type Screen = 'projects' | 'workspace' | 'integrations' | 'skills';
export type GraphViewMode = 'table' | 'graph';
export type AddSourceStep = 'closed' | 'pick-integration' | 'browse-items';

export interface GraphFilterState {
  hiddenEntityTypes: Set<EntityTypeName>;
  hiddenEdgeTypes: Set<EdgeType>;
}

export interface AppState {
  screen: Screen;
  projects: Project[];
  activeProjectId: string | null;
  selectedSourceId: string | null;
  selectedEntityId: string | null;
  graphView: GraphViewMode;
  activeOutputId: string | null;
  integrations: Integration[];
  addSourceStep: AddSourceStep;
  addSourceActiveIntegration: IntegrationId | null;
  hoveredNodeId: string | null;
  focusNodeId: string | null;
  graphFilters: GraphFilterState;
  processingStatus: ProcessingStatus;
  theme: Theme;
  skills: Skill[];
  sourceSkillAssignments: SourceSkillAssignments;
  showImportSkillModal: boolean;
  skillPopoverSourceId: string | null;
  editingSkillId: SkillId | null;
  sourceWeights: SourceWeights;
}

export type AppAction =
  | { type: 'NAVIGATE_TO_PROJECT'; payload: string }
  | { type: 'NAVIGATE_TO_PROJECTS' }
  | { type: 'NAVIGATE_TO_INTEGRATIONS' }
  | { type: 'CREATE_PROJECT'; payload: { name: string; projectType: string } }
  | { type: 'SELECT_SOURCE'; payload: string | null }
  | { type: 'SELECT_ENTITY'; payload: string | null }
  | { type: 'SET_GRAPH_VIEW'; payload: GraphViewMode }
  | { type: 'OPEN_OUTPUT'; payload: string }
  | { type: 'CLOSE_OUTPUT' }
  | { type: 'TOGGLE_INTEGRATION'; payload: IntegrationId }
  | { type: 'OPEN_ADD_SOURCE_MODAL' }
  | { type: 'CLOSE_ADD_SOURCE_MODAL' }
  | { type: 'BROWSE_INTEGRATION_ITEMS'; payload: IntegrationId }
  | { type: 'BACK_TO_INTEGRATIONS_LIST' }
  | { type: 'ADD_SOURCES_FROM_INTEGRATION'; payload: IntegrationItem[] }
  | { type: 'SET_HOVERED_NODE'; payload: string | null }
  | { type: 'SET_FOCUS_NODE'; payload: string | null }
  | { type: 'TOGGLE_ENTITY_TYPE_FILTER'; payload: EntityTypeName }
  | { type: 'TOGGLE_EDGE_TYPE_FILTER'; payload: EdgeType }
  | { type: 'CLEAR_FOCUS_MODE' }
  | { type: 'START_PROCESSING' }
  | { type: 'SET_PROCESSING_STATUS'; payload: ProcessingStatus }
  | { type: 'TOGGLE_THEME' }
  | { type: 'NAVIGATE_TO_SKILLS' }
  | { type: 'TOGGLE_SKILL'; payload: SkillId }
  | { type: 'IMPORT_SKILL'; payload: { url: string } }
  | { type: 'OPEN_IMPORT_SKILL_MODAL' }
  | { type: 'CLOSE_IMPORT_SKILL_MODAL' }
  | { type: 'OPEN_SKILL_POPOVER'; payload: string }
  | { type: 'CLOSE_SKILL_POPOVER' }
  | { type: 'TOGGLE_SOURCE_SKILL'; payload: { sourceId: string; skillId: SkillId } }
  | { type: 'SELECT_SKILL'; payload: SkillId }
  | { type: 'DESELECT_SKILL' }
  | { type: 'UPDATE_SKILL'; payload: { id: SkillId; name: string; description: string; instructions: string } }
  | { type: 'SET_SOURCE_WEIGHT'; payload: { sourceId: string; weight: number } };
