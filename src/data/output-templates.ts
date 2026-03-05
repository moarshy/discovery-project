import type { Report } from '../types';

export interface OutputTemplate {
  id: string;
  type: string;          // matches Report.type
  title: string;
  description: string;
  category: string;
}

// ---------------------------------------------------------------------------
// Catalogue — 14 templates covering all 10 report types
// ---------------------------------------------------------------------------

export const outputTemplates: OutputTemplate[] = [
  // General
  {
    id: 'tpl-synthesis',
    type: 'report',
    title: 'Synthesis Report',
    description: 'Cross-source synthesis of findings, themes, and recommendations.',
    category: 'General',
  },

  // Voice of Customer
  {
    id: 'tpl-monthly-voc',
    type: 'report',
    title: 'Monthly VoC Report',
    description: 'Monthly voice-of-customer synthesis covering sentiment, themes, and trends.',
    category: 'Voice of Customer',
  },
  {
    id: 'tpl-feature-request-pri',
    type: 'report',
    title: 'Feature Request Prioritization',
    description: 'Prioritized feature requests ranked by frequency, impact, and effort.',
    category: 'Voice of Customer',
  },

  // Product
  {
    id: 'tpl-prd',
    type: 'prd',
    title: 'PRD',
    description: 'Structured product requirements document with user stories and acceptance criteria.',
    category: 'Product',
  },
  {
    id: 'tpl-business-case',
    type: 'business-case',
    title: 'Business Case',
    description: 'Investment justification with market sizing, ROI projections, and risk analysis.',
    category: 'Product',
  },

  // OKR & Progress
  {
    id: 'tpl-okr-progress',
    type: 'okr-report',
    title: 'OKR Progress Report',
    description: 'Objective and key-result tracking with confidence scores and blockers.',
    category: 'OKR & Progress',
  },
  {
    id: 'tpl-experiment-insights',
    type: 'experiment-report',
    title: 'Experiment Insights',
    description: 'A/B test and experiment results with statistical analysis and next steps.',
    category: 'OKR & Progress',
  },
  {
    id: 'tpl-4ps-progress',
    type: 'progress-report',
    title: '4Ps Progress Summary',
    description: 'Progress, plans, problems, and praise across teams and initiatives.',
    category: 'OKR & Progress',
  },

  // Activation
  {
    id: 'tpl-activation-report',
    type: 'activation-report',
    title: 'Activation Report',
    description: 'User activation metrics, cohort analysis, and onboarding effectiveness.',
    category: 'Activation',
  },
  {
    id: 'tpl-funnel-diagnostic',
    type: 'report',
    title: 'Funnel Diagnostic',
    description: 'Step-by-step funnel analysis identifying drop-off points and conversion opportunities.',
    category: 'Activation',
  },
  {
    id: 'tpl-activation-playbook',
    type: 'report',
    title: 'Activation Playbook',
    description: 'Actionable playbook for improving user activation and time-to-value.',
    category: 'Activation',
  },

  // Brand
  {
    id: 'tpl-vocabulary-map',
    type: 'vocabulary-map',
    title: 'Vocabulary Map',
    description: 'Brand language mapping showing how customers and stakeholders describe your product.',
    category: 'Brand',
  },
  {
    id: 'tpl-brand-strategy',
    type: 'brand-strategy',
    title: 'Brand Strategy Report',
    description: 'Comprehensive brand positioning, messaging pillars, and competitive differentiation.',
    category: 'Brand',
  },
  {
    id: 'tpl-tensions',
    type: 'tensions-report',
    title: 'Tensions Report',
    description: 'Conflicting signals, trade-offs, and unresolved tensions in customer perception.',
    category: 'Brand',
  },
];

// ---------------------------------------------------------------------------
// Suggested templates per project type
// ---------------------------------------------------------------------------

export const suggestedTemplates: Record<string, string[]> = {
  'voc':                     ['tpl-monthly-voc', 'tpl-feature-request-pri', 'tpl-synthesis'],
  'okr-progress':            ['tpl-okr-progress', 'tpl-experiment-insights', 'tpl-4ps-progress'],
  'feature-prioritization':  ['tpl-synthesis', 'tpl-prd', 'tpl-business-case'],
  'feature-activation':      ['tpl-activation-report', 'tpl-funnel-diagnostic', 'tpl-activation-playbook'],
  'brand-strategy':          ['tpl-vocabulary-map', 'tpl-brand-strategy', 'tpl-tensions'],
};

// ---------------------------------------------------------------------------
// Project type display labels
// ---------------------------------------------------------------------------

export const projectTypeLabels: Record<string, string> = {
  'voc':                    'Voice of Customer',
  'okr-progress':           'OKR Progress',
  'feature-prioritization': 'Feature Prioritization',
  'feature-activation':     'Feature Activation',
  'brand-strategy':         'Brand Strategy',
};

// ---------------------------------------------------------------------------
// Category ordering for the "All Templates" section
// ---------------------------------------------------------------------------

export const categoryOrder = ['General', 'Voice of Customer', 'Product', 'OKR & Progress', 'Activation', 'Brand'];

// ---------------------------------------------------------------------------
// Factory: produce a Report stub from a template (empty sections)
// ---------------------------------------------------------------------------

export function stubReportFromTemplate(template: OutputTemplate): Report {
  return {
    id: template.id,
    title: template.title,
    type: template.type,
    description: template.description,
    sections: [],
    sourceCount: 0,
    generatedAt: '',
  };
}
