import type { ProjectData } from '../project-data-types';
import type { Source, SourceCategory, ExtractedEntity, EntityType, Report, GraphEdge } from '../../types';
import { buildGraphData } from '../../lib/graph-utils';

const sources: Source[] = [
  { id: 'voc-src-ticket-1', name: 'Support Ticket 1', category: 'support-tickets', type: 'Support ticket', icon: 'TicketCheck', integrationId: 'intercom' },
  { id: 'voc-src-ticket-2', name: 'Support Ticket 2', category: 'support-tickets', type: 'Support ticket', icon: 'TicketCheck', integrationId: 'intercom' },
  { id: 'voc-src-csat', name: 'CSAT', category: 'support-tickets', type: 'Survey', icon: 'BarChart3', integrationId: 'intercom' },
  { id: 'voc-src-psat', name: 'PSAT', category: 'support-tickets', type: 'Survey', icon: 'BarChart3', integrationId: 'intercom' },
];

const sourceCategories: SourceCategory[] = [
  { id: 'support-tickets', label: 'Support Tickets', sources: sources.filter((s) => s.category === 'support-tickets') },
];

const entities: ExtractedEntity[] = [
  // Themes
  { id: 'voc-ent-onboarding-friction', name: 'Onboarding friction', type: 'theme', description: 'Customers consistently report that initial setup is too complex and takes too long.', sourceRefs: ['voc-src-ticket-1', 'voc-src-ticket-2', 'voc-src-csat'] },
  { id: 'voc-ent-performance-issues', name: 'Performance degradation', type: 'theme', description: 'Reports of slow load times and timeouts during peak usage periods.', sourceRefs: ['voc-src-ticket-1', 'voc-src-ticket-2'] },
  // Product Areas
  { id: 'voc-ent-rendering-engine', name: 'Rendering Engine', type: 'product-area', description: 'Core 3D rendering pipeline used across all Autodesk products.', sourceRefs: ['voc-src-ticket-1', 'voc-src-psat'] },
  { id: 'voc-ent-collaboration', name: 'Collaboration Suite', type: 'product-area', description: 'Real-time collaboration features including shared views and commenting.', sourceRefs: ['voc-src-csat', 'voc-src-psat'] },
  // Feature Areas
  { id: 'voc-ent-file-export', name: 'File Export', type: 'feature-area', description: 'Export functionality for various file formats including DWG, PDF, and IFC.', sourceRefs: ['voc-src-ticket-2', 'voc-src-csat'] },
  { id: 'voc-ent-version-control', name: 'Version Control', type: 'feature-area', description: 'Document versioning and revision history management.', sourceRefs: ['voc-src-ticket-1', 'voc-src-psat'] },
  // Pain Points
  { id: 'voc-ent-slow-export', name: 'Slow export for large files', type: 'pain-point', description: 'Exporting large assemblies (>500MB) takes over 30 minutes and frequently times out.', sourceRefs: ['voc-src-ticket-1', 'voc-src-ticket-2', 'voc-src-csat'] },
  { id: 'voc-ent-confusing-ui', name: 'Confusing settings UI', type: 'pain-point', description: 'Rendering settings panel has too many options and unclear labels leading to support tickets.', sourceRefs: ['voc-src-ticket-2', 'voc-src-psat'] },
  // Personas
  { id: 'voc-ent-architect', name: 'Enterprise Architect', type: 'persona', description: 'Senior architects managing large multi-discipline projects with 50+ team members.', sourceRefs: ['voc-src-csat', 'voc-src-psat'] },
  { id: 'voc-ent-junior-designer', name: 'Junior Designer', type: 'persona', description: 'Early-career designers who struggle with advanced features and need guided workflows.', sourceRefs: ['voc-src-ticket-1', 'voc-src-csat'] },
  // Feature Requests
  { id: 'voc-ent-batch-export', name: 'Batch export', type: 'feature-request', description: 'Ability to queue and export multiple files overnight with progress tracking.', sourceRefs: ['voc-src-ticket-1', 'voc-src-ticket-2'] },
  { id: 'voc-ent-dark-mode', name: 'Dark mode for viewer', type: 'feature-request', description: 'Dark theme for the web viewer to reduce eye strain during long sessions.', sourceRefs: ['voc-src-csat', 'voc-src-psat'] },
  { id: 'voc-ent-offline-mode', name: 'Offline mode', type: 'feature-request', description: 'Ability to work on projects without internet connectivity and sync later.', sourceRefs: ['voc-src-ticket-2', 'voc-src-psat'] },
  { id: 'voc-ent-api-access', name: 'Public API access', type: 'feature-request', description: 'RESTful API for programmatic access to project data and automation of workflows.', sourceRefs: ['voc-src-ticket-1', 'voc-src-csat'] },
];

const entityTypes: EntityType[] = [
  { id: 'theme', label: 'Themes/Topics', color: '#6366F1', entities: entities.filter((e) => e.type === 'theme') },
  { id: 'product-area', label: 'Product Areas', color: '#8B5CF6', entities: entities.filter((e) => e.type === 'product-area') },
  { id: 'feature-area', label: 'Feature Areas', color: '#06B6D4', entities: entities.filter((e) => e.type === 'feature-area') },
  { id: 'pain-point', label: 'Pain Points', color: '#F59E0B', entities: entities.filter((e) => e.type === 'pain-point') },
  { id: 'persona', label: 'Personas', color: '#EC4899', entities: entities.filter((e) => e.type === 'persona') },
  { id: 'feature-request', label: 'Feature Requests', color: '#3B82F6', entities: entities.filter((e) => e.type === 'feature-request') },
];

const crossEdges: GraphEdge[] = [
  { source: 'voc-ent-onboarding-friction', target: 'voc-ent-confusing-ui', relationship: 'supports', weight: 0.8 },
  { source: 'voc-ent-performance-issues', target: 'voc-ent-slow-export', relationship: 'supports', weight: 0.7 },
  { source: 'voc-ent-rendering-engine', target: 'voc-ent-slow-export', relationship: 'related', weight: 0.6 },
  { source: 'voc-ent-batch-export', target: 'voc-ent-slow-export', relationship: 'supports', weight: 0.8 },
  { source: 'voc-ent-junior-designer', target: 'voc-ent-confusing-ui', relationship: 'related', weight: 0.7 },
  { source: 'voc-ent-architect', target: 'voc-ent-collaboration', relationship: 'related', weight: 0.5 },
  { source: 'voc-ent-dark-mode', target: 'voc-ent-rendering-engine', relationship: 'related', weight: 0.4 },
];

const { nodes, edges } = buildGraphData(sources, entities, entityTypes, crossEdges);

const reports: Report[] = [
  {
    id: 'voc-report',
    title: 'Monthly VoC Report',
    type: 'report',
    description: 'Voice of Customer synthesis across support and survey data',
    sourceCount: 4,
    generatedAt: '2026-03-04T14:30:00Z',
    sections: [
      {
        heading: '1. Executive Summary',
        content:
          'Analysis of 4 sources across support tickets and satisfaction surveys reveals two dominant themes: **onboarding friction** and **performance degradation** during large-file operations. [1] These issues disproportionately affect junior designers and enterprise architects managing complex projects.\n\nThe strongest signal — appearing in 3 of 4 sources — is that export workflows for large assemblies are unreliable, leading to wasted time and missed deadlines. [2]',
        citations: [
          { sourceId: 'voc-src-ticket-1', quote: 'I tried exporting my assembly three times yesterday and it timed out every time. We missed our client deadline.', relevance: 0.95 },
          { sourceId: 'voc-src-csat', quote: 'Export is the #1 pain point mentioned in free-text CSAT responses for Q1.', relevance: 0.9 },
        ],
      },
      {
        heading: '2. Theme Analysis',
        content:
          '**Theme 1: Onboarding Friction (3/4 sources)**\nNew users report that the settings UI is overwhelming and lacks guided workflows. The rendering settings panel alone has 47 options, most of which junior designers never need. [1]\n\n**Theme 2: Export Performance (3/4 sources)**\nLarge-file exports (>500MB) consistently time out. This affects approximately 15% of all export operations but generates 40% of support tickets. [2]',
        citations: [
          { sourceId: 'voc-src-ticket-2', quote: 'The rendering settings look like a spaceship cockpit. I just want to export a simple PDF.', relevance: 0.88 },
          { sourceId: 'voc-src-ticket-1', quote: 'Every export over 500MB fails. We have to split our assemblies which defeats the purpose.', relevance: 0.92 },
        ],
      },
      {
        heading: '3. Sentiment Breakdown',
        content:
          '| Metric | Score | Trend |\n|--------|-------|-------|\n| Overall CSAT | 7.2/10 | Down 0.3 |\n| Export Satisfaction | 4.8/10 | Down 1.1 |\n| Onboarding NPS | 32 | Stable |\n| Collaboration NPS | 68 | Up 5 |',
        citations: [],
      },
      {
        heading: '4. Evidence Matrix',
        content:
          '| Theme | Ticket 1 | Ticket 2 | CSAT | PSAT |\n|-------|----------|----------|------|------|\n| Onboarding Friction | Strong | Moderate | Strong | - |\n| Export Performance | Strong | Strong | Strong | - |\n| Collaboration Gaps | - | - | Moderate | Strong |\n| UI Complexity | Moderate | Strong | - | Strong |',
        citations: [],
      },
      {
        heading: '5. Recommendations',
        content:
          '> [recommendation] 1. **Implement batch export with background processing** (P0) (High impact, High confidence): Queue large exports to run asynchronously with progress notifications. Target: zero timeouts for files under 2GB. [1]\n\n> [recommendation] 2. **Simplify rendering settings for common workflows** (P1) (High impact, Medium confidence): Add preset profiles (Quick PDF, Client Presentation, Full Assembly) that hide advanced options by default.\n\n> [recommendation] 3. **Add guided onboarding flow for new users** (P1) (Medium impact, High confidence): Interactive tutorial that walks users through their first export and collaboration session. [2]\n\n> [recommendation] 4. **Introduce dark mode for the web viewer** (P2) (Low impact, High confidence): Frequently requested quality-of-life improvement that signals responsiveness to user feedback.',
        citations: [
          { sourceId: 'voc-src-ticket-1', quote: 'If exports could just run in the background, it would save our team hours every week.', relevance: 0.9 },
          { sourceId: 'voc-src-csat', quote: 'A simple getting-started guide would have saved me the first two weeks of confusion.', relevance: 0.85 },
        ],
      },
    ],
  },
  {
    id: 'voc-feature-prioritization',
    title: 'Feature Request Prioritization',
    type: 'report',
    description: 'Prioritized feature requests extracted from support tickets and surveys',
    sourceCount: 4,
    generatedAt: '2026-03-04T14:30:00Z',
    sections: [
      {
        heading: '1. Overview',
        content:
          'This report synthesizes **feature requests** surfaced across all 4 Voice-of-Customer sources — two support ticket streams and two satisfaction surveys — to produce a single prioritized backlog. Requests are scored on three axes: **frequency** (how often they appear), **impact** (severity of the underlying pain point), and **strategic alignment** (fit with the product roadmap). [1]\n\n[metric:] 23 distinct feature requests identified\n[metric:] 4 classified as P0 (critical)\n[metric:] 7 classified as P1 (important)\n[metric:] 12 classified as P2 (nice-to-have)',
        citations: [
          { sourceId: 'voc-src-csat', quote: 'Over 60% of low-score CSAT responses include at least one explicit feature request or workaround description.', relevance: 0.92 },
        ],
      },
      {
        heading: '2. Prioritized Feature Requests',
        content:
          '| Rank | Feature | Priority | Frequency | Impact | Sources |\n|------|---------|----------|-----------|--------|---------|\n| 1 | Batch export with queue | **(P0)** | 78% of tickets | Critical | Ticket 1, Ticket 2, CSAT |\n| 2 | Public API access | **(P0)** | 52% of tickets | High | Ticket 1, CSAT |\n| 3 | Offline mode | **(P1)** | 41% of tickets | High | Ticket 2, PSAT |\n| 4 | Dark mode for viewer | **(P1)** | 38% of surveys | Medium | CSAT, PSAT |\n| 5 | Real-time co-editing | **(P1)** | 29% of surveys | High | CSAT, PSAT |\n| 6 | Keyboard shortcut customization | **(P2)** | 18% of surveys | Low | PSAT |\n\n**Batch export** is the top-priority request by a wide margin. It appears in 3 of 4 sources and directly addresses the most common support escalation — export timeouts on large assemblies. [1] Enterprise architects report splitting projects into smaller files as a workaround, which introduces versioning errors and doubles review time. [2]\n\n**Public API access** ranks second because power users and integration partners have no programmatic way to automate repetitive workflows. [3] Several enterprise accounts have flagged this as a renewal blocker.\n\n**Offline mode** is consistently requested by field teams who work on construction sites with unreliable connectivity. [4]',
        citations: [
          { sourceId: 'voc-src-ticket-1', quote: 'We split every assembly into 4 parts just to get exports to complete. Then we stitch PDFs together manually.', relevance: 0.94 },
          { sourceId: 'voc-src-ticket-2', quote: 'Our team wastes 6+ hours per week babysitting exports because there is no queue or background processing.', relevance: 0.91 },
          { sourceId: 'voc-src-csat', quote: 'We would pay extra for API access. Right now we copy-paste data between systems which is error-prone.', relevance: 0.88 },
          { sourceId: 'voc-src-psat', quote: 'When I am on-site I lose connection constantly. I need to be able to keep working and sync when I am back online.', relevance: 0.86 },
        ],
      },
      {
        heading: '3. Impact-Effort Matrix',
        content:
          '| | Low Effort | Medium Effort | High Effort |\n|---|-----------|--------------|-------------|\n| **High Impact** | Dark mode for viewer | Batch export with queue | Offline mode |\n| **Medium Impact** | Keyboard shortcuts | Public API access | Real-time co-editing |\n| **Low Impact** | — | Custom export presets | Plugin marketplace |\n\n> [recommendation] **Quick wins (high impact, low effort):** Dark mode can be shipped in a single sprint and signals responsiveness to user feedback. PSAT data shows it is the #1 quality-of-life request among power users. [1]\n\n> [recommendation] **Strategic bets (high impact, high effort):** Offline mode requires significant architecture changes but unlocks the field-worker segment, which represents 30% of enterprise seats. [2]',
        citations: [
          { sourceId: 'voc-src-psat', quote: 'I work 10-hour days in the viewer. Dark mode would make a real difference for eye strain.', relevance: 0.84 },
          { sourceId: 'voc-src-psat', quote: 'About a third of our team is on construction sites daily — they need offline access more than any new feature.', relevance: 0.87 },
        ],
      },
      {
        heading: '4. Recommendations & Next Steps',
        content:
          '> [recommendation] 1. **Ship batch export with background processing** (P0) (High impact, High confidence): This single feature would resolve the #1 support driver and unblock enterprise renewals. Target: zero export timeouts for files under 2GB with email notification on completion. [1]\n\n> [recommendation] 2. **Release a public REST API with OAuth2 authentication** (P0) (High impact, Medium confidence): Publish endpoints for project listing, file export, and metadata queries. Prioritize read-only operations first, then add write support in a follow-up phase. [2]\n\n> [recommendation] 3. **Implement progressive offline sync for the web viewer** (P1) (High impact, Low confidence): Use service workers and local IndexedDB caching to allow read-only access to recent projects while offline. Full offline editing is a Phase 2 effort.\n\n> [recommendation] 4. **Add dark mode toggle to the web viewer** (P1) (Medium impact, High confidence): Low-effort, high-visibility improvement. Include in the next minor release to demonstrate velocity on community-requested features.',
        citations: [
          { sourceId: 'voc-src-ticket-1', quote: 'If exports could just run in the background, it would save our team hours every week.', relevance: 0.93 },
          { sourceId: 'voc-src-csat', quote: 'An API would let us integrate Autodesk data into our BI dashboards automatically instead of manual CSV exports.', relevance: 0.89 },
        ],
      },
    ],
  },
];

export const vocAutodeskData: ProjectData = {
  sources,
  sourceCategories,
  entities,
  entityTypes,
  reports,
  graphNodes: nodes,
  graphEdges: edges,
};
