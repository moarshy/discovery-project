import type { ProjectData } from './project-data-types';
import { vocAutodeskData } from './projects/voc-autodesk';
import { okrAutodeskData } from './projects/okr-autodesk';
import { synthflowData } from './projects/synthflow';
import { sosafeData } from './projects/sosafe';
import { balenaData } from './projects/balena';

const registry: Record<string, ProjectData> = {
  'voc-autodesk': vocAutodeskData,
  'okr-autodesk': okrAutodeskData,
  'feature-prioritization-synthflow': synthflowData,
  'feature-activation-sosafe': sosafeData,
  'brand-strategy-balena': balenaData,
};

export function getProjectData(id: string): ProjectData | null {
  return registry[id] ?? null;
}

export const seededProjectIds = new Set(Object.keys(registry));
