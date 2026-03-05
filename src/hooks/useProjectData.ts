import { useMemo } from 'react';
import { useApp } from '../store';
import { getProjectData } from '../data/project-registry';
import type { ProjectData } from '../data/project-data-types';

export function useProjectData(): ProjectData | null {
  const { state } = useApp();
  return useMemo(
    () => (state.activeProjectId ? getProjectData(state.activeProjectId) : null),
    [state.activeProjectId],
  );
}
