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

// Graph sync pipeline (independent from output generation)
export type GraphSyncStatus = 'idle' | 'extracting' | 'graphing' | 'synced';
export type OutputGenStatus = 'idle' | 'generating' | 'done';

export interface OutputSchedule {
  frequency: 'daily' | 'weekly' | 'monthly';
  day?: string;        // 'Mon', 'Tue', etc. — for weekly
  dayOfMonth?: number; // 1-28 — for monthly
  time: string;        // '09:00'
}

export interface GraphSyncSchedule {
  frequency: 'daily' | 'weekly';
  time: string;
}

// Run history
export type RunStatus = 'success' | 'running' | 'failed';

export interface RunHistoryEntry {
  id: string;
  projectId: string;
  projectName: string;
  reportId: string;
  reportTitle: string;
  reportType: string;
  status: RunStatus;
  startedAt: string;       // ISO 8601
  duration: number | null;  // seconds, null if running
  version: number;
  triggerType: 'manual' | 'scheduled';
}

export type RunHistoryFilter = 'all' | 'running' | 'completed' | 'failed';

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

export type Screen = 'projects' | 'workspace' | 'integrations' | 'skills' | 'history' | 'memory';
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
  graphSyncStatus: GraphSyncStatus;
  outputGenStatuses: Record<string, OutputGenStatus>;
  outputSchedules: Record<string, OutputSchedule>;
  graphSyncSchedule: GraphSyncSchedule | null;
  scheduleModalOutputId: string | null;
  theme: Theme;
  skills: Skill[];
  sourceSkillAssignments: SourceSkillAssignments;
  showImportSkillModal: boolean;
  skillPopoverSourceId: string | null;
  editingSkillId: SkillId | null;
  sourceWeights: SourceWeights;
  showOutputTemplateModal: boolean;
  addedOutputTemplates: Record<string, string[]>; // projectId → added template IDs
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
  | { type: 'START_GRAPH_SYNC' }
  | { type: 'SET_GRAPH_SYNC_STATUS'; payload: GraphSyncStatus }
  | { type: 'START_OUTPUT_GENERATION'; payload: string }
  | { type: 'SET_OUTPUT_GEN_STATUS'; payload: { reportId: string; status: OutputGenStatus } }
  | { type: 'GENERATE_ALL_OUTPUTS'; payload: string[] }
  | { type: 'OPEN_SCHEDULE_MODAL'; payload: string }
  | { type: 'CLOSE_SCHEDULE_MODAL' }
  | { type: 'SET_OUTPUT_SCHEDULE'; payload: { reportId: string; schedule: OutputSchedule } }
  | { type: 'REMOVE_OUTPUT_SCHEDULE'; payload: string }
  | { type: 'SET_GRAPH_SYNC_SCHEDULE'; payload: GraphSyncSchedule | null }
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
  | { type: 'SET_SOURCE_WEIGHT'; payload: { sourceId: string; weight: number } }
  | { type: 'NAVIGATE_TO_HISTORY' }
  | { type: 'VIEW_RUN_OUTPUT'; payload: { projectId: string; reportId: string } }
  | { type: 'NAVIGATE_TO_MEMORY' }
  | { type: 'OPEN_OUTPUT_TEMPLATE_MODAL' }
  | { type: 'CLOSE_OUTPUT_TEMPLATE_MODAL' }
  | { type: 'ADD_OUTPUT_TEMPLATE'; payload: { projectId: string; templateId: string } }
  | { type: 'REMOVE_OUTPUT_TEMPLATE'; payload: { projectId: string; templateId: string } };
