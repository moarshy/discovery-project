import type { Project } from '../types';

export const defaultProjects: Project[] = [
  {
    id: 'user-research-1',
    name: 'User Research 1',
    projectType: 'user-research',
    date: 'Mar 3, 2026',
    inputCount: 7,
    outputCount: 3,
  },
  {
    id: 'analytics-1',
    name: 'Analytics 1',
    projectType: 'analytics-review',
    date: 'Mar 1, 2026',
    inputCount: 5,
    outputCount: 2,
  },
  {
    id: 'solution-discovery',
    name: 'Solution Discovery',
    projectType: 'solution-discovery',
    date: 'Feb 28, 2026',
    inputCount: 4,
    outputCount: 1,
  },
  {
    id: 'meeting-prep',
    name: 'Meeting Prep',
    projectType: 'meeting-prep',
    date: 'Feb 25, 2026',
    inputCount: 3,
    outputCount: 1,
  },
];
