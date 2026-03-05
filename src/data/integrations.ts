import type { Integration, IntegrationItem } from '../types';

export const integrations: Integration[] = [
  {
    id: 'confluence',
    name: 'Confluence',
    description: 'Strategy docs, specs, and wiki pages',
    icon: '',
    color: '#1868DB',
    connected: true,
    authType: 'oauth',
  },
  {
    id: 'google-drive',
    name: 'Google Drive',
    description: 'Interview transcripts and recordings',
    icon: '',
    color: '#EA4335',
    connected: true,
    authType: 'oauth',
  },
  {
    id: 'jira',
    name: 'Jira',
    description: 'Issues, epics, and support tickets',
    icon: '',
    color: '#2684FF',
    connected: true,
    authType: 'oauth',
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Channel threads and discussions',
    icon: '',
    color: '#611f69',
    connected: false,
    authType: 'oauth',
  },
  {
    id: 'local-files',
    name: 'Local Files',
    description: 'Upload .md, .txt, or .pdf directly',
    icon: '',
    color: '#8888A0',
    connected: true,
    authType: 'local',
  },
];

/** Mock "configured state" shown on the integrations page */
export const integrationMeta: Record<string, string> = {
  confluence: '2 spaces · 14 pages indexed',
  'google-drive': '1 folder · 8 files synced',
  jira: '2 projects · 23 issues tracked',
  slack: '',
  'local-files': 'Always available',
};

export const integrationItems: Record<string, IntegrationItem[]> = {
  jira: [
    { id: 'jira-1', integrationId: 'jira', name: 'FEED-142: Onboarding drop-off', type: 'Issue', icon: '', description: 'Users abandoning onboarding at step 3' },
    { id: 'jira-2', integrationId: 'jira', name: 'FEED-98: Search latency complaints', type: 'Issue', icon: '', description: 'Multiple reports of slow search' },
    { id: 'jira-3', integrationId: 'jira', name: 'FEED-201: Mobile export broken', type: 'Bug', icon: '', description: 'PDF export fails on iOS Safari' },
    { id: 'jira-4', integrationId: 'jira', name: 'FEED-55: Dashboard customization', type: 'Feature', icon: '', description: 'Customers want drag-and-drop widgets' },
    { id: 'jira-5', integrationId: 'jira', name: 'FEED-310: API rate limiting', type: 'Issue', icon: '', description: 'Enterprise customers hitting limits' },
  ],
  confluence: [
    { id: 'conf-1', integrationId: 'confluence', name: '2026 Product Vision', type: 'Strategy doc', icon: '', description: 'Company-wide product vision document' },
    { id: 'conf-2', integrationId: 'confluence', name: 'Q1 Product Strategy', type: 'Strategy doc', icon: '', description: 'Quarterly goals and bets' },
    { id: 'conf-3', integrationId: 'confluence', name: 'Platform Architecture RFC', type: 'RFC', icon: '', description: 'Proposed microservices migration' },
    { id: 'conf-4', integrationId: 'confluence', name: 'User Persona: Enterprise PM', type: 'Research', icon: '', description: 'Detailed persona card with needs' },
    { id: 'conf-5', integrationId: 'confluence', name: 'Competitive Landscape 2026', type: 'Analysis', icon: '', description: 'Market positioning analysis' },
  ],
  'google-drive': [
    { id: 'gdrive-1', integrationId: 'google-drive', name: 'Joe (Autodesk) Interview', type: 'Transcript', icon: '', description: 'User interview recording + transcript' },
    { id: 'gdrive-2', integrationId: 'google-drive', name: 'Tiago (SoSafe) Interview', type: 'Transcript', icon: '', description: 'User interview recording + transcript' },
    { id: 'gdrive-3', integrationId: 'google-drive', name: 'Sales Call — Acme Corp', type: 'Recording', icon: '', description: 'Enterprise sales discovery call' },
    { id: 'gdrive-4', integrationId: 'google-drive', name: 'Customer Advisory Board Notes', type: 'Notes', icon: '', description: 'Q4 CAB meeting summary' },
    { id: 'gdrive-5', integrationId: 'google-drive', name: 'UX Research Findings Deck', type: 'Presentation', icon: '', description: 'Usability study results' },
  ],
  slack: [
    { id: 'slack-1', integrationId: 'slack', name: '#product-feedback thread', type: 'Thread', icon: '', description: 'Pricing concerns from enterprise' },
    { id: 'slack-2', integrationId: 'slack', name: '#eng-standup highlights', type: 'Channel', icon: '', description: 'This week\'s standup summaries' },
    { id: 'slack-3', integrationId: 'slack', name: '#customer-success escalation', type: 'Thread', icon: '', description: 'Churn risk — BigCo account' },
    { id: 'slack-4', integrationId: 'slack', name: '#design-review feedback', type: 'Thread', icon: '', description: 'Comments on new dashboard mockup' },
  ],
  'local-files': [
    { id: 'local-1', integrationId: 'local-files', name: 'Upload .md, .txt, or .pdf files', type: 'Upload', icon: '', description: 'Drag and drop or click to browse' },
  ],
};
