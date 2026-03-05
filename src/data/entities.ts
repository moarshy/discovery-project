import type { ExtractedEntity, EntityType } from '../types';

export const entities: ExtractedEntity[] = [
  // Strategic Bets
  {
    id: 'ent-self-serve',
    name: 'Enterprise self-serve onboarding',
    type: 'strategic-bet',
    description: 'Enable enterprise customers to onboard without dedicated CSM support, reducing time-to-value from weeks to days.',
    sourceRefs: ['src-vision', 'src-joe-autodesk', 'src-user-1'],
  },
  {
    id: 'ent-ai-workflow',
    name: 'AI-powered workflow automation',
    type: 'strategic-bet',
    description: 'Leverage AI to automate repetitive PM workflows including report generation, ticket triage, and status updates.',
    sourceRefs: ['src-product-strategy', 'src-tiago-sosafe'],
  },
  // Experiments
  {
    id: 'ent-usage-pricing',
    name: 'Usage-based pricing pilot',
    type: 'experiment',
    description: 'Test consumption-based pricing model with 10 mid-market accounts to validate willingness to pay per-seat vs per-usage.',
    sourceRefs: ['src-recording-1', 'src-product-strategy'],
  },
  {
    id: 'ent-help-widget',
    name: 'In-app help widget',
    type: 'experiment',
    description: 'Contextual help overlay that surfaces relevant docs and walkthroughs based on current user action.',
    sourceRefs: ['src-user-2', 'src-joe-autodesk'],
  },
  // Opportunities
  {
    id: 'ent-mid-market',
    name: 'Mid-market expansion',
    type: 'opportunity',
    description: 'Companies with 100-500 employees represent the fastest-growing segment with 3x conversion rate vs enterprise.',
    sourceRefs: ['src-vision', 'src-recording-1'],
  },
  {
    id: 'ent-integrations',
    name: 'Integration marketplace',
    type: 'opportunity',
    description: 'Build an ecosystem of third-party integrations (Jira, Zendesk, Confluence) to increase platform stickiness.',
    sourceRefs: ['src-tiago-sosafe', 'src-user-1'],
  },
  // Pain Points
  {
    id: 'ent-onboarding-slow',
    name: 'Onboarding takes 3+ weeks',
    type: 'pain-point',
    description: 'New customers require extensive hand-holding during setup, with an average of 3.2 weeks to first value delivery.',
    sourceRefs: ['src-joe-autodesk', 'src-user-1', 'src-user-2'],
  },
  {
    id: 'ent-manual-export',
    name: 'Manual data export workflow',
    type: 'pain-point',
    description: 'Users must manually export data to CSV, transform in Excel, then re-import — a process that takes 2+ hours per report.',
    sourceRefs: ['src-tiago-sosafe', 'src-user-1', 'src-user-2'],
  },
  // Feature Requests
  {
    id: 'ent-csv-import',
    name: 'Bulk import from CSV',
    type: 'feature-request',
    description: 'Allow users to upload CSV files with structured data to batch-create records instead of manual entry.',
    sourceRefs: ['src-user-1', 'src-joe-autodesk'],
  },
  {
    id: 'ent-sso',
    name: 'SSO/SAML support',
    type: 'feature-request',
    description: 'Enterprise customers require single sign-on via SAML 2.0 for compliance and IT policy adherence.',
    sourceRefs: ['src-recording-1', 'src-tiago-sosafe'],
  },
];

export const entityTypes: EntityType[] = [
  {
    id: 'strategic-bet',
    label: 'Strategic Bets',
    color: '#6366F1',
    entities: entities.filter((e) => e.type === 'strategic-bet'),
  },
  {
    id: 'experiment',
    label: 'Experiments',
    color: '#8B5CF6',
    entities: entities.filter((e) => e.type === 'experiment'),
  },
  {
    id: 'opportunity',
    label: 'Opportunities',
    color: '#10B981',
    entities: entities.filter((e) => e.type === 'opportunity'),
  },
  {
    id: 'pain-point',
    label: 'Pain Points',
    color: '#F59E0B',
    entities: entities.filter((e) => e.type === 'pain-point'),
  },
  {
    id: 'feature-request',
    label: 'Feature Requests',
    color: '#06B6D4',
    entities: entities.filter((e) => e.type === 'feature-request'),
  },
];
