import type { Project } from '../types';

export const defaultProjects: Project[] = [
  {
    id: 'voc-autodesk',
    name: 'VoC Autodesk',
    projectType: 'voc',
    date: 'Mar 3, 2026',
    inputCount: 4,
    outputCount: 2,
  },
  {
    id: 'okr-autodesk',
    name: 'OKR Progress Autodesk',
    projectType: 'okr-progress',
    date: 'Mar 1, 2026',
    inputCount: 5,
    outputCount: 3,
  },
  {
    id: 'feature-prioritization-synthflow',
    name: 'Feature Prioritization Synthflow',
    projectType: 'feature-prioritization',
    date: 'Feb 28, 2026',
    inputCount: 5,
    outputCount: 3,
  },
  {
    id: 'feature-activation-sosafe',
    name: 'Feature Activation SoSafe',
    projectType: 'feature-activation',
    date: 'Feb 25, 2026',
    inputCount: 5,
    outputCount: 3,
  },
  {
    id: 'brand-strategy-balena',
    name: 'Brand Strategy Balena',
    projectType: 'brand-strategy',
    date: 'Feb 22, 2026',
    inputCount: 5,
    outputCount: 3,
  },
];
