import type { SourceWeights } from '../types';

/**
 * Default source weights per project, keyed by project ID.
 * Weights use the app's 0–2 scale.
 */
export const defaultWeights: Record<string, SourceWeights> = {
  'brand-strategy-balena': {
    // Interviews — Thomas weight 9 → 2.0
    'bal-src-interview-1': 2.0,
    'bal-src-interview-2': 2.0,
    'bal-src-interview-3': 2.0,
    'bal-src-interview-4': 2.0,
    'bal-src-interview-5': 2.0,
    // Discord — Thomas weight 8 → 1.8
    'bal-src-discord-support': 1.8,
    'bal-src-discord-features': 1.8,
    // Sales Calls — Thomas weight 6 → 1.3
    'bal-src-sales-1': 1.3,
    // CEO Memo — Thomas weight 5 → 1.1
    'bal-src-ceo-memo': 1.1,
    // OKRs — Thomas weight 4 → 0.9
    'bal-src-okrs': 0.9,
    // NPS/CSAT — Thomas weight 5 → 1.1
    'bal-src-nps': 1.1,
  },
};
