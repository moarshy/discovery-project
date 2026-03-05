import type { RunHistoryEntry } from '../types';

export const runHistory: RunHistoryEntry[] = [
  // VoC Autodesk — Monthly VoC Report (3 versions)
  {
    id: 'run-001',
    projectId: 'voc-autodesk',
    projectName: 'VoC Autodesk',
    reportId: 'voc-report',
    reportTitle: 'Monthly VoC Report',
    reportType: 'report',
    status: 'success',
    startedAt: '2026-03-05T13:52:00Z',
    duration: 127,
    version: 3,
    triggerType: 'manual',
  },
  {
    id: 'run-002',
    projectId: 'voc-autodesk',
    projectName: 'VoC Autodesk',
    reportId: 'voc-report',
    reportTitle: 'Monthly VoC Report',
    reportType: 'report',
    status: 'success',
    startedAt: '2026-02-28T09:15:00Z',
    duration: 134,
    version: 2,
    triggerType: 'scheduled',
  },
  {
    id: 'run-003',
    projectId: 'voc-autodesk',
    projectName: 'VoC Autodesk',
    reportId: 'voc-report',
    reportTitle: 'Monthly VoC Report',
    reportType: 'report',
    status: 'success',
    startedAt: '2026-02-22T10:30:00Z',
    duration: 145,
    version: 1,
    triggerType: 'manual',
  },

  // VoC Autodesk — Feature Request Prioritization (2 versions)
  {
    id: 'run-004',
    projectId: 'voc-autodesk',
    projectName: 'VoC Autodesk',
    reportId: 'voc-feature-prioritization',
    reportTitle: 'Feature Request Prioritization',
    reportType: 'report',
    status: 'success',
    startedAt: '2026-03-05T14:10:00Z',
    duration: 89,
    version: 2,
    triggerType: 'manual',
  },
  {
    id: 'run-005',
    projectId: 'voc-autodesk',
    projectName: 'VoC Autodesk',
    reportId: 'voc-feature-prioritization',
    reportTitle: 'Feature Request Prioritization',
    reportType: 'report',
    status: 'success',
    startedAt: '2026-02-25T11:00:00Z',
    duration: 95,
    version: 1,
    triggerType: 'manual',
  },

  // OKR Progress Autodesk — Monthly OKR Report (3 versions, one running)
  {
    id: 'run-006',
    projectId: 'okr-autodesk',
    projectName: 'OKR Progress Autodesk',
    reportId: 'okr-report',
    reportTitle: 'Monthly OKR Report',
    reportType: 'okr-report',
    status: 'running',
    startedAt: '2026-03-05T15:58:00Z',
    duration: null,
    version: 3,
    triggerType: 'scheduled',
  },
  {
    id: 'run-007',
    projectId: 'okr-autodesk',
    projectName: 'OKR Progress Autodesk',
    reportId: 'okr-report',
    reportTitle: 'Monthly OKR Report',
    reportType: 'okr-report',
    status: 'success',
    startedAt: '2026-03-01T09:00:00Z',
    duration: 112,
    version: 2,
    triggerType: 'scheduled',
  },
  {
    id: 'run-008',
    projectId: 'okr-autodesk',
    projectName: 'OKR Progress Autodesk',
    reportId: 'okr-report',
    reportTitle: 'Monthly OKR Report',
    reportType: 'okr-report',
    status: 'success',
    startedAt: '2026-02-22T09:00:00Z',
    duration: 118,
    version: 1,
    triggerType: 'scheduled',
  },

  // OKR Progress Autodesk — Experiment Insights (2 versions)
  {
    id: 'run-009',
    projectId: 'okr-autodesk',
    projectName: 'OKR Progress Autodesk',
    reportId: 'okr-experiment-insights',
    reportTitle: 'Experiment Insights',
    reportType: 'experiment-report',
    status: 'success',
    startedAt: '2026-03-04T10:20:00Z',
    duration: 78,
    version: 2,
    triggerType: 'manual',
  },
  {
    id: 'run-010',
    projectId: 'okr-autodesk',
    projectName: 'OKR Progress Autodesk',
    reportId: 'okr-experiment-insights',
    reportTitle: 'Experiment Insights',
    reportType: 'experiment-report',
    status: 'success',
    startedAt: '2026-02-26T14:30:00Z',
    duration: 82,
    version: 1,
    triggerType: 'manual',
  },

  // OKR Progress Autodesk — 4Ps Progress Summary (1 version)
  {
    id: 'run-011',
    projectId: 'okr-autodesk',
    projectName: 'OKR Progress Autodesk',
    reportId: 'okr-4ps-summary',
    reportTitle: '4Ps Progress Summary',
    reportType: 'progress-report',
    status: 'success',
    startedAt: '2026-03-03T11:45:00Z',
    duration: 65,
    version: 1,
    triggerType: 'manual',
  },

  // Feature Prioritization Synthflow — Report (2 versions)
  {
    id: 'run-012',
    projectId: 'feature-prioritization-synthflow',
    projectName: 'Feature Prioritization Synthflow',
    reportId: 'sf-report',
    reportTitle: 'Report',
    reportType: 'report',
    status: 'success',
    startedAt: '2026-03-04T16:30:00Z',
    duration: 98,
    version: 2,
    triggerType: 'manual',
  },
  {
    id: 'run-013',
    projectId: 'feature-prioritization-synthflow',
    projectName: 'Feature Prioritization Synthflow',
    reportId: 'sf-report',
    reportTitle: 'Report',
    reportType: 'report',
    status: 'success',
    startedAt: '2026-02-27T15:00:00Z',
    duration: 105,
    version: 1,
    triggerType: 'manual',
  },

  // Feature Prioritization Synthflow — PRD (2 versions)
  {
    id: 'run-014',
    projectId: 'feature-prioritization-synthflow',
    projectName: 'Feature Prioritization Synthflow',
    reportId: 'sf-prd',
    reportTitle: 'PRD',
    reportType: 'prd',
    status: 'success',
    startedAt: '2026-03-05T08:20:00Z',
    duration: 73,
    version: 2,
    triggerType: 'scheduled',
  },
  {
    id: 'run-015',
    projectId: 'feature-prioritization-synthflow',
    projectName: 'Feature Prioritization Synthflow',
    reportId: 'sf-prd',
    reportTitle: 'PRD',
    reportType: 'prd',
    status: 'success',
    startedAt: '2026-02-28T08:20:00Z',
    duration: 68,
    version: 1,
    triggerType: 'scheduled',
  },

  // Feature Prioritization Synthflow — Business Case (1 version)
  {
    id: 'run-016',
    projectId: 'feature-prioritization-synthflow',
    projectName: 'Feature Prioritization Synthflow',
    reportId: 'sf-business-case',
    reportTitle: 'Business Case',
    reportType: 'business-case',
    status: 'success',
    startedAt: '2026-03-02T13:15:00Z',
    duration: 110,
    version: 1,
    triggerType: 'manual',
  },

  // Feature Activation SoSafe — Report (2 versions)
  {
    id: 'run-017',
    projectId: 'feature-activation-sosafe',
    projectName: 'Feature Activation SoSafe',
    reportId: 'ss-report',
    reportTitle: 'Report',
    reportType: 'activation-report',
    status: 'success',
    startedAt: '2026-03-04T09:00:00Z',
    duration: 88,
    version: 2,
    triggerType: 'scheduled',
  },
  {
    id: 'run-018',
    projectId: 'feature-activation-sosafe',
    projectName: 'Feature Activation SoSafe',
    reportId: 'ss-report',
    reportTitle: 'Report',
    reportType: 'activation-report',
    status: 'success',
    startedAt: '2026-02-25T09:00:00Z',
    duration: 92,
    version: 1,
    triggerType: 'scheduled',
  },

  // Feature Activation SoSafe — Funnel Diagnostic (1 version)
  {
    id: 'run-019',
    projectId: 'feature-activation-sosafe',
    projectName: 'Feature Activation SoSafe',
    reportId: 'ss-funnel-diagnostic',
    reportTitle: 'Funnel Diagnostic',
    reportType: 'report',
    status: 'success',
    startedAt: '2026-03-03T14:45:00Z',
    duration: 55,
    version: 1,
    triggerType: 'manual',
  },

  // Feature Activation SoSafe — Activation Playbook (2 versions, one failed)
  {
    id: 'run-020',
    projectId: 'feature-activation-sosafe',
    projectName: 'Feature Activation SoSafe',
    reportId: 'ss-playbook',
    reportTitle: 'Activation Playbook',
    reportType: 'report',
    status: 'failed',
    startedAt: '2026-03-02T16:30:00Z',
    duration: 18,
    version: 2,
    triggerType: 'manual',
  },
  {
    id: 'run-021',
    projectId: 'feature-activation-sosafe',
    projectName: 'Feature Activation SoSafe',
    reportId: 'ss-playbook',
    reportTitle: 'Activation Playbook',
    reportType: 'report',
    status: 'success',
    startedAt: '2026-02-24T11:20:00Z',
    duration: 102,
    version: 1,
    triggerType: 'manual',
  },

  // Brand Strategy Balena — Vocabulary Map (2 versions)
  {
    id: 'run-022',
    projectId: 'brand-strategy-balena',
    projectName: 'Brand Strategy Balena',
    reportId: 'bal-vocab',
    reportTitle: 'Vocabulary Map',
    reportType: 'vocabulary-map',
    status: 'running',
    startedAt: '2026-03-05T15:55:00Z',
    duration: null,
    version: 2,
    triggerType: 'manual',
  },
  {
    id: 'run-023',
    projectId: 'brand-strategy-balena',
    projectName: 'Brand Strategy Balena',
    reportId: 'bal-vocab',
    reportTitle: 'Vocabulary Map',
    reportType: 'vocabulary-map',
    status: 'success',
    startedAt: '2026-02-23T10:00:00Z',
    duration: 85,
    version: 1,
    triggerType: 'manual',
  },

  // Brand Strategy Balena — Brand Strategy Report (1 version)
  {
    id: 'run-024',
    projectId: 'brand-strategy-balena',
    projectName: 'Brand Strategy Balena',
    reportId: 'bal-strategy',
    reportTitle: 'Brand Strategy Report',
    reportType: 'brand-strategy',
    status: 'success',
    startedAt: '2026-03-04T12:30:00Z',
    duration: 138,
    version: 1,
    triggerType: 'manual',
  },

  // Brand Strategy Balena — Tensions Report (1 version)
  {
    id: 'run-025',
    projectId: 'brand-strategy-balena',
    projectName: 'Brand Strategy Balena',
    reportId: 'bal-tensions',
    reportTitle: 'Tensions Report',
    reportType: 'tensions-report',
    status: 'success',
    startedAt: '2026-03-03T09:30:00Z',
    duration: 120,
    version: 1,
    triggerType: 'manual',
  },
];

export function getRunsForReport(reportId: string): RunHistoryEntry[] {
  return runHistory
    .filter((r) => r.reportId === reportId)
    .sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime());
}

export function getLatestRuns(): RunHistoryEntry[] {
  const latest = new Map<string, RunHistoryEntry>();
  for (const run of runHistory) {
    const existing = latest.get(run.reportId);
    if (!existing || new Date(run.startedAt) > new Date(existing.startedAt)) {
      latest.set(run.reportId, run);
    }
  }
  return Array.from(latest.values()).sort(
    (a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime()
  );
}

export function getRunStats() {
  const total = runHistory.length;
  const succeeded = runHistory.filter((r) => r.status === 'success').length;
  const running = runHistory.filter((r) => r.status === 'running').length;
  const failed = runHistory.filter((r) => r.status === 'failed').length;
  const successRate = total > 0 ? Math.round((succeeded / total) * 100) : 0;
  return { total, succeeded, running, failed, successRate };
}
