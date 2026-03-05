import { createContext, useContext, useReducer, type Dispatch } from 'react';
import type { AppState, AppAction } from './types';
import { defaultProjects } from './data/projects';
import { integrations as defaultIntegrations } from './data/integrations';
import { defaultSkills, defaultSourceSkillAssignments, mockImportSkill } from './data/skills';

export const initialState: AppState = {
  screen: 'projects',
  projects: defaultProjects,
  activeProjectId: null,
  selectedSourceId: null,
  selectedEntityId: null,
  graphView: 'table',
  activeOutputId: null,
  integrations: defaultIntegrations,
  addSourceStep: 'closed',
  addSourceActiveIntegration: null,
  hoveredNodeId: null,
  focusNodeId: null,
  graphFilters: { hiddenEntityTypes: new Set(), hiddenEdgeTypes: new Set() },
  processingStatus: 'idle',
  theme: 'dark',
  skills: defaultSkills,
  sourceSkillAssignments: { ...defaultSourceSkillAssignments },
  showImportSkillModal: false,
  skillPopoverSourceId: null,
  editingSkillId: null,
  sourceWeights: {},
};

function formatDate(d: Date): string {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'NAVIGATE_TO_PROJECT':
      return {
        ...state,
        screen: 'workspace',
        activeProjectId: action.payload,
        selectedSourceId: null,
        selectedEntityId: null,
        activeOutputId: null,
      };
    case 'NAVIGATE_TO_PROJECTS':
      return {
        ...state,
        screen: 'projects',
        activeProjectId: null,
        selectedSourceId: null,
        selectedEntityId: null,
        activeOutputId: null,
        processingStatus: 'idle',
        skillPopoverSourceId: null,
      };
    case 'NAVIGATE_TO_INTEGRATIONS':
      return {
        ...state,
        screen: 'integrations',
        activeProjectId: null,
        selectedSourceId: null,
        selectedEntityId: null,
        activeOutputId: null,
      };
    case 'CREATE_PROJECT': {
      const id = `${action.payload.projectType}-${Date.now()}`;
      const newProject = {
        id,
        name: action.payload.name,
        projectType: action.payload.projectType,
        date: formatDate(new Date()),
        inputCount: 0,
        outputCount: 0,
      };
      return {
        ...state,
        projects: [newProject, ...state.projects],
        screen: 'workspace',
        activeProjectId: id,
        selectedSourceId: null,
        selectedEntityId: null,
        activeOutputId: null,
      };
    }
    case 'SELECT_SOURCE':
      return {
        ...state,
        selectedSourceId: action.payload,
        selectedEntityId: null,
        skillPopoverSourceId: action.payload === null ? null : state.skillPopoverSourceId,
      };
    case 'SELECT_ENTITY':
      return {
        ...state,
        selectedEntityId: action.payload,
      };
    case 'SET_GRAPH_VIEW':
      return {
        ...state,
        graphView: action.payload,
        focusNodeId: null,
      };
    case 'OPEN_OUTPUT':
      return {
        ...state,
        activeOutputId: action.payload,
      };
    case 'CLOSE_OUTPUT':
      return {
        ...state,
        activeOutputId: null,
      };
    case 'TOGGLE_INTEGRATION':
      return {
        ...state,
        integrations: state.integrations.map((intg) =>
          intg.id === action.payload
            ? { ...intg, connected: !intg.connected }
            : intg
        ),
      };
    case 'OPEN_ADD_SOURCE_MODAL':
      return {
        ...state,
        addSourceStep: 'pick-integration',
        addSourceActiveIntegration: null,
      };
    case 'CLOSE_ADD_SOURCE_MODAL':
      return {
        ...state,
        addSourceStep: 'closed',
        addSourceActiveIntegration: null,
      };
    case 'BROWSE_INTEGRATION_ITEMS':
      return {
        ...state,
        addSourceStep: 'browse-items',
        addSourceActiveIntegration: action.payload,
      };
    case 'BACK_TO_INTEGRATIONS_LIST':
      return {
        ...state,
        addSourceStep: 'pick-integration',
        addSourceActiveIntegration: null,
      };
    case 'ADD_SOURCES_FROM_INTEGRATION':
      // In a real app this would add sources to the project; for the prototype we just close the modal
      return {
        ...state,
        addSourceStep: 'closed',
        addSourceActiveIntegration: null,
      };
    case 'SET_HOVERED_NODE':
      return {
        ...state,
        hoveredNodeId: action.payload,
      };
    case 'SET_FOCUS_NODE':
      return {
        ...state,
        focusNodeId: action.payload,
      };
    case 'TOGGLE_ENTITY_TYPE_FILTER': {
      const next = new Set(state.graphFilters.hiddenEntityTypes);
      if (next.has(action.payload)) {
        next.delete(action.payload);
      } else {
        next.add(action.payload);
      }
      return {
        ...state,
        graphFilters: { ...state.graphFilters, hiddenEntityTypes: next },
      };
    }
    case 'TOGGLE_EDGE_TYPE_FILTER': {
      const next = new Set(state.graphFilters.hiddenEdgeTypes);
      if (next.has(action.payload)) {
        next.delete(action.payload);
      } else {
        next.add(action.payload);
      }
      return {
        ...state,
        graphFilters: { ...state.graphFilters, hiddenEdgeTypes: next },
      };
    }
    case 'CLEAR_FOCUS_MODE':
      return {
        ...state,
        focusNodeId: null,
      };
    case 'START_PROCESSING':
      return {
        ...state,
        processingStatus: 'extracting',
      };
    case 'SET_PROCESSING_STATUS':
      return {
        ...state,
        processingStatus: action.payload,
      };
    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: state.theme === 'dark' ? 'light' : 'dark',
      };
    case 'NAVIGATE_TO_SKILLS':
      return {
        ...state,
        screen: 'skills',
        activeProjectId: null,
        selectedSourceId: null,
        selectedEntityId: null,
        activeOutputId: null,
        skillPopoverSourceId: null,
        editingSkillId: null,
      };
    case 'TOGGLE_SKILL':
      return {
        ...state,
        skills: state.skills.map((s) =>
          s.id === action.payload ? { ...s, enabled: !s.enabled } : s
        ),
      };
    case 'IMPORT_SKILL':
      return {
        ...state,
        skills: [...state.skills, mockImportSkill(action.payload.url)],
        showImportSkillModal: false,
      };
    case 'OPEN_IMPORT_SKILL_MODAL':
      return {
        ...state,
        showImportSkillModal: true,
      };
    case 'CLOSE_IMPORT_SKILL_MODAL':
      return {
        ...state,
        showImportSkillModal: false,
      };
    case 'OPEN_SKILL_POPOVER':
      return {
        ...state,
        skillPopoverSourceId: action.payload,
      };
    case 'CLOSE_SKILL_POPOVER':
      return {
        ...state,
        skillPopoverSourceId: null,
      };
    case 'TOGGLE_SOURCE_SKILL': {
      const { sourceId, skillId } = action.payload;
      const current = state.sourceSkillAssignments[sourceId] || [];
      const next = current.includes(skillId)
        ? current.filter((id) => id !== skillId)
        : [...current, skillId];
      return {
        ...state,
        sourceSkillAssignments: {
          ...state.sourceSkillAssignments,
          [sourceId]: next,
        },
      };
    }
    case 'SELECT_SKILL':
      return {
        ...state,
        editingSkillId: action.payload,
      };
    case 'DESELECT_SKILL':
      return {
        ...state,
        editingSkillId: null,
      };
    case 'UPDATE_SKILL':
      return {
        ...state,
        skills: state.skills.map((s) =>
          s.id === action.payload.id
            ? { ...s, name: action.payload.name, description: action.payload.description, instructions: action.payload.instructions }
            : s
        ),
      };
    case 'SET_SOURCE_WEIGHT':
      return {
        ...state,
        sourceWeights: {
          ...state.sourceWeights,
          [action.payload.sourceId]: action.payload.weight,
        },
      };
    default:
      return state;
  }
}

interface AppContextValue {
  state: AppState;
  dispatch: Dispatch<AppAction>;
}

export const AppContext = createContext<AppContextValue | null>(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppContext.Provider');
  return ctx;
}

export { useReducer };
