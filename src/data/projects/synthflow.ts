import type { ProjectData } from '../project-data-types';
import type { Source, SourceCategory, ExtractedEntity, EntityType, Report, GraphEdge } from '../../types';
import { buildGraphData } from '../../lib/graph-utils';

const sources: Source[] = [
  { id: 'sf-src-vision', name: 'Vision', category: 'company', type: 'Strategy doc', icon: 'Building2', integrationId: 'confluence' },
  { id: 'sf-src-product-strategy', name: 'Product Strategy', category: 'company', type: 'Strategy doc', icon: 'Target', integrationId: 'confluence' },
  { id: 'sf-src-joe', name: 'Joe', category: 'transcripts', type: 'User interview', icon: 'FileText', integrationId: 'google-drive' },
  { id: 'sf-src-tiago', name: 'Tiago', category: 'transcripts', type: 'User interview', icon: 'FileText', integrationId: 'google-drive' },
  { id: 'sf-src-user-1', name: 'User 1', category: 'support-tickets', type: 'Support ticket', icon: 'TicketCheck', integrationId: 'jira' },
  { id: 'sf-src-user-2', name: 'User 2', category: 'support-tickets', type: 'Support ticket', icon: 'TicketCheck', integrationId: 'jira' },
  { id: 'sf-src-recording-1', name: 'Recording 1', category: 'sales-recordings', type: 'Sales call', icon: 'Mic', integrationId: 'google-drive' },
];

const sourceCategories: SourceCategory[] = [
  { id: 'company', label: 'Company', sources: sources.filter((s) => s.category === 'company') },
  { id: 'transcripts', label: 'User Interviews', sources: sources.filter((s) => s.category === 'transcripts') },
  { id: 'support-tickets', label: 'Support Tickets', sources: sources.filter((s) => s.category === 'support-tickets') },
  { id: 'sales-recordings', label: 'Sales Recordings', sources: sources.filter((s) => s.category === 'sales-recordings') },
];

const entities: ExtractedEntity[] = [
  // Strategic Bets
  { id: 'sf-ent-self-serve', name: 'Enterprise self-serve onboarding', type: 'strategic-bet', description: 'Enable enterprise customers to onboard without dedicated CSM support, reducing time-to-value from weeks to days.', sourceRefs: ['sf-src-vision', 'sf-src-joe', 'sf-src-user-1'] },
  { id: 'sf-ent-ai-workflow', name: 'AI-powered workflow automation', type: 'strategic-bet', description: 'Leverage AI to automate repetitive PM workflows including report generation, ticket triage, and status updates.', sourceRefs: ['sf-src-product-strategy', 'sf-src-tiago'] },
  // Customers
  { id: 'sf-ent-autodesk', name: 'Autodesk', type: 'customer', description: 'Enterprise customer with complex multi-team setup requiring SSO and data governance.', sourceRefs: ['sf-src-joe', 'sf-src-recording-1'] },
  { id: 'sf-ent-sosafe', name: 'SoSafe', type: 'customer', description: 'Mid-market customer needing Jira integration and faster onboarding.', sourceRefs: ['sf-src-tiago', 'sf-src-user-2'] },
  // Themes
  { id: 'sf-ent-onboarding-theme', name: 'Onboarding friction', type: 'theme', description: 'Customers consistently report that initial setup is too complex and takes too long.', sourceRefs: ['sf-src-joe', 'sf-src-user-1', 'sf-src-user-2'] },
  { id: 'sf-ent-integration-theme', name: 'Integration ecosystem gaps', type: 'theme', description: 'Lack of native integrations blocks adoption for engineering-heavy teams.', sourceRefs: ['sf-src-tiago', 'sf-src-user-1'] },
  // Product Areas
  { id: 'sf-ent-onboarding-product', name: 'Onboarding Flow', type: 'product-area', description: 'Setup wizard, template library, and first-run experience.', sourceRefs: ['sf-src-vision', 'sf-src-joe'] },
  { id: 'sf-ent-integrations-product', name: 'Integration Marketplace', type: 'product-area', description: 'Third-party connector system for Jira, Zendesk, Confluence, and more.', sourceRefs: ['sf-src-product-strategy', 'sf-src-tiago'] },
  // Feature Areas
  { id: 'sf-ent-data-import', name: 'Data Import', type: 'feature-area', description: 'Bulk import functionality for CSV files and API-based data ingestion.', sourceRefs: ['sf-src-user-1', 'sf-src-joe'] },
  { id: 'sf-ent-report-gen', name: 'Report Generation', type: 'feature-area', description: 'Automated report creation from synthesized data with customizable templates.', sourceRefs: ['sf-src-product-strategy', 'sf-src-recording-1'] },
  // Pain Points
  { id: 'sf-ent-onboarding-slow', name: 'Onboarding takes 3+ weeks', type: 'pain-point', description: 'New customers require extensive hand-holding during setup, with an average of 3.2 weeks to first value delivery.', sourceRefs: ['sf-src-joe', 'sf-src-user-1', 'sf-src-user-2'] },
  { id: 'sf-ent-manual-export', name: 'Manual data export workflow', type: 'pain-point', description: 'Users must manually export data to CSV, transform in Excel, then re-import — a process that takes 2+ hours per report.', sourceRefs: ['sf-src-tiago', 'sf-src-user-1', 'sf-src-user-2'] },
  // Personas
  { id: 'sf-ent-pm-persona', name: 'Product Manager', type: 'persona', description: 'Manages roadmap prioritization and needs cross-source synthesis for decision-making.', sourceRefs: ['sf-src-joe', 'sf-src-recording-1'] },
  { id: 'sf-ent-researcher', name: 'UX Researcher', type: 'persona', description: 'Conducts user interviews and needs tools to organize qualitative data efficiently.', sourceRefs: ['sf-src-tiago', 'sf-src-user-2'] },
  // Feature Requests
  { id: 'sf-ent-csv-import', name: 'Bulk import from CSV', type: 'feature-request', description: 'Allow users to upload CSV files with structured data to batch-create records instead of manual entry.', sourceRefs: ['sf-src-user-1', 'sf-src-joe'] },
  { id: 'sf-ent-sso', name: 'SSO/SAML support', type: 'feature-request', description: 'Enterprise customers require single sign-on via SAML 2.0 for compliance and IT policy adherence.', sourceRefs: ['sf-src-recording-1', 'sf-src-tiago'] },
];

const entityTypes: EntityType[] = [
  { id: 'strategic-bet', label: 'Strategic Bets', color: '#7C3AED', entities: entities.filter((e) => e.type === 'strategic-bet') },
  { id: 'customer', label: 'Customers', color: '#14B8A6', entities: entities.filter((e) => e.type === 'customer') },
  { id: 'theme', label: 'Themes/Topics', color: '#6366F1', entities: entities.filter((e) => e.type === 'theme') },
  { id: 'product-area', label: 'Product Areas', color: '#8B5CF6', entities: entities.filter((e) => e.type === 'product-area') },
  { id: 'feature-area', label: 'Feature Areas', color: '#06B6D4', entities: entities.filter((e) => e.type === 'feature-area') },
  { id: 'pain-point', label: 'Pain Points', color: '#F59E0B', entities: entities.filter((e) => e.type === 'pain-point') },
  { id: 'persona', label: 'Personas', color: '#EC4899', entities: entities.filter((e) => e.type === 'persona') },
  { id: 'feature-request', label: 'Feature Requests', color: '#3B82F6', entities: entities.filter((e) => e.type === 'feature-request') },
];

const crossEdges: GraphEdge[] = [
  { source: 'sf-ent-self-serve', target: 'sf-ent-onboarding-slow', relationship: 'supports', weight: 0.8 },
  { source: 'sf-ent-ai-workflow', target: 'sf-ent-manual-export', relationship: 'supports', weight: 0.7 },
  { source: 'sf-ent-autodesk', target: 'sf-ent-self-serve', relationship: 'related', weight: 0.6 },
  { source: 'sf-ent-sosafe', target: 'sf-ent-integration-theme', relationship: 'related', weight: 0.6 },
  { source: 'sf-ent-integrations-product', target: 'sf-ent-csv-import', relationship: 'related', weight: 0.5 },
  { source: 'sf-ent-onboarding-theme', target: 'sf-ent-onboarding-product', relationship: 'supports', weight: 0.8 },
  { source: 'sf-ent-pm-persona', target: 'sf-ent-report-gen', relationship: 'related', weight: 0.5 },
  { source: 'sf-ent-sso', target: 'sf-ent-autodesk', relationship: 'supports', weight: 0.5 },
];

const { nodes, edges } = buildGraphData(sources, entities, entityTypes, crossEdges);

const reports: Report[] = [
  {
    id: 'sf-report',
    title: 'Report',
    type: 'report',
    description: 'Feature prioritization synthesis across customer and strategy inputs',
    sourceCount: 7,
    generatedAt: '2026-03-04T14:30:00Z',
    sections: [
      {
        heading: '1. Executive Summary',
        content:
          'Analysis of 7 sources across customer interviews, support tickets, sales recordings, and internal strategy documents reveals a clear pattern: enterprise customers need faster, self-service onboarding and better data workflows. [1] The strongest signal — appearing in 5 of 7 sources — is that onboarding friction is the primary barrier to expansion revenue.\n\nThree strategic themes emerge: (1) self-serve onboarding as the highest-impact investment, (2) AI-powered automation as a competitive differentiator, and (3) integration ecosystem as the key to platform stickiness. [2]',
        citations: [
          { sourceId: 'sf-src-joe', quote: 'We spent three weeks just getting the basic setup done. By that point, half the team had already gone back to spreadsheets.', relevance: 0.95 },
          { sourceId: 'sf-src-vision', quote: 'Our north star is reducing time-to-value for enterprise customers from weeks to hours.', relevance: 0.9 },
        ],
      },
      {
        heading: '2. Top Themes',
        content:
          '**Theme 1: Onboarding Friction (5/7 sources)**\nCustomers consistently report that initial setup is too complex and requires too much hand-holding. The average onboarding time of 3.2 weeks is cited as the #1 reason for delayed expansion deals.\n\n**Theme 2: Data Export Pain (4/7 sources)**\nThe manual CSV export → Excel transform → re-import workflow costs users 2+ hours per report cycle. [1] This is the most frequently mentioned pain point in support tickets.\n\n**Theme 3: Integration Gaps (3/7 sources)**\nCustomers expect native integrations with their existing tool stack (Jira, Zendesk, Confluence). [2] The lack of integrations is a blocker for 40% of enterprise prospects.',
        citations: [
          { sourceId: 'sf-src-user-1', quote: 'I have to export everything to CSV, clean it up in Excel, and then import it back. Every single week.', relevance: 0.92 },
          { sourceId: 'sf-src-tiago', quote: 'If it doesn\'t connect to Jira, it\'s a non-starter for our engineering team.', relevance: 0.88 },
        ],
      },
      {
        heading: '3. Prioritization Matrix',
        content:
          '| Feature | Impact | Confidence | Effort | Priority |\n|---------|--------|------------|--------|----------|\n| Self-serve onboarding | High | High | Medium | P0 |\n| Automated data export | High | Medium | Low | P0 |\n| Jira integration | Medium | High | High | P1 |\n| SSO/SAML | Medium | High | Medium | P1 |\n| CSV bulk import | Medium | Medium | Low | P1 |\n| AI report generation | High | Low | High | P2 |',
        citations: [],
      },
      {
        heading: '4. Customer Evidence',
        content:
          '| Theme | Joe (Autodesk) | Tiago (SoSafe) | User 1 | User 2 | Sales |\n|-------|----------------|----------------|--------|--------|-------|\n| Onboarding | Strong | - | Strong | Moderate | Moderate |\n| Data Export | - | Strong | Strong | Strong | - |\n| Integrations | Moderate | Strong | Moderate | - | - |\n| Self-serve | Strong | - | - | - | Moderate |',
        citations: [],
      },
      {
        heading: '5. Recommended Actions',
        content:
          '> [recommendation] 1. **Invest in self-serve onboarding** (P0) (High impact, High confidence): Build guided setup wizard with template projects and sample data. Target: reduce onboarding from 3+ weeks to 3 days. [1]\n\n> [recommendation] 2. **Automate data export** (P0) (High impact, Medium confidence): Build one-click report generation with scheduled exports. Eliminates the manual CSV workflow.\n\n> [recommendation] 3. **Ship Jira integration first** (P1) (Medium impact, High confidence): Jira is mentioned in every customer interview as the #1 integration request. [2]\n\n> [recommendation] 4. **Add SSO/SAML for enterprise** (P1) (Medium impact, High confidence): Required for enterprise compliance and IT approval.',
        citations: [
          { sourceId: 'sf-src-joe', quote: 'If you had a setup wizard that pre-loaded some sample data, I could have been productive on day one.', relevance: 0.9 },
          { sourceId: 'sf-src-tiago', quote: 'Just seeing my Jira issues inside your tool would save me an hour a day of context switching.', relevance: 0.87 },
        ],
      },
    ],
  },
  {
    id: 'sf-prd',
    title: 'PRD',
    type: 'prd',
    description: 'Product Requirements Document for self-serve onboarding',
    sourceCount: 7,
    generatedAt: '2026-03-04T14:30:00Z',
    sections: [
      {
        heading: '1. Overview',
        content:
          'This PRD outlines the requirements for a self-serve enterprise onboarding experience that reduces time-to-value from 3+ weeks to under 3 days. Based on synthesis of 7 customer and internal sources, onboarding friction is the #1 barrier to expansion revenue.',
        citations: [],
      },
      {
        heading: '2. Goals & Success Metrics',
        content:
          '- Reduce median onboarding time from 21 days to 3 days\n- Achieve 80% self-serve completion rate (no CSM intervention)\n- Increase 30-day activation rate from 45% to 75%\n- Reduce CSM onboarding hours per customer by 60%',
        citations: [],
      },
      {
        heading: '3. Requirements',
        content:
          '**P0 — Must Have**\n- (P0) Guided setup wizard (5 steps max)\n- (P0) Template project library (3 industry templates)\n- (P0) Sample data pre-loading\n- (P0) Progress checklist with completion tracking\n\n**P1 — Should Have**\n- (P1) In-app contextual tooltips\n- (P1) Video walkthrough library\n- (P1) Automated welcome email sequence\n\n**P2 — Nice to Have**\n- (P2) AI-powered setup suggestions based on company profile\n- (P2) Peer benchmarking ("Companies like yours typically...")',
        citations: [],
      },
    ],
  },
  {
    id: 'sf-business-case',
    title: 'Business Case',
    type: 'business-case',
    description: 'ROI analysis and investment justification for self-serve onboarding',
    sourceCount: 7,
    generatedAt: '2026-03-04T14:30:00Z',
    sections: [
      {
        heading: '1. Problem Statement & Cost of Inaction',
        content:
          'Enterprise onboarding is the single largest bottleneck to revenue expansion. Every new customer requires an average of **3.2 weeks** of dedicated CSM hand-holding before reaching first value. [1] This directly constrains our ability to scale: the current CSM team can only onboard 4 customers per month.\n\n[metric: 3.2 weeks] Average onboarding time per enterprise customer\n\n[metric: $18,400] Fully-loaded CSM cost per onboarding (salary + opportunity cost)\n\n[metric: 38%] Prospect drop-off rate during onboarding (lost expansion revenue)\n\n[metric: $1.1M/yr] Estimated annual revenue leakage from onboarding churn\n\nIf we do nothing, these costs compound as our pipeline grows. With 12 enterprise deals in Q2 alone, the current CSM team would need to double just to keep pace — adding $420K in annual headcount cost. [2] Support tickets related to onboarding confusion already account for 34% of total ticket volume, further straining the team. [3]',
        citations: [
          { sourceId: 'sf-src-joe', quote: 'We spent three weeks just getting the basic setup done. By that point, half the team had already gone back to spreadsheets.', relevance: 0.95 },
          { sourceId: 'sf-src-vision', quote: 'Our north star is reducing time-to-value for enterprise customers from weeks to hours.', relevance: 0.9 },
          { sourceId: 'sf-src-user-1', quote: 'I submitted a ticket on day 2 because I couldn\'t figure out how to import our existing data. Didn\'t hear back for 3 days.', relevance: 0.85 },
        ],
      },
      {
        heading: '2. Proposed Investment',
        content:
          '**What we will build**\n\nA self-serve enterprise onboarding experience consisting of a guided setup wizard, template project library, sample data pre-loading, and an automated progress checklist. [1] This replaces the current manual, CSM-led onboarding with a product-led experience that customers can complete independently.\n\n**Scope & Timeline**\n\n| Phase | Deliverable | Duration | Team |\n|-------|-------------|----------|------|\n| Phase 1 | Setup wizard + templates | 4 weeks | 2 FE, 1 BE, 1 Design |\n| Phase 2 | Sample data + checklist | 3 weeks | 1 FE, 1 BE |\n| Phase 3 | Analytics + iteration | 2 weeks | 1 FE, 1 Data |\n\n**Total timeline:** 9 weeks (one quarter)\n\n**Estimated cost breakdown**\n\n| Category | Cost |\n|----------|------|\n| Engineering (4 engineers × 9 weeks) | $216,000 |\n| Design (1 designer × 7 weeks) | $42,000 |\n| QA & infrastructure | $18,000 |\n| **Total investment** | **$276,000** |\n\nThis is a one-time build cost. Ongoing maintenance is estimated at 0.5 FTE ($60K/yr). [2]',
        citations: [
          { sourceId: 'sf-src-product-strategy', quote: 'Self-serve onboarding is the highest-leverage investment we can make this year — it unlocks every other growth lever.', relevance: 0.92 },
          { sourceId: 'sf-src-tiago', quote: 'If you had templates for common setups, I could have been running in a day instead of two weeks.', relevance: 0.88 },
        ],
      },
      {
        heading: '3. ROI Projection',
        content:
          'Based on customer interviews, support data, and internal cost modeling, self-serve onboarding delivers payback within **5 months** of launch. [1]\n\n**Year 1 projected impact**\n\n| Metric | Current | Projected | Impact |\n|--------|---------|-----------|--------|\n| Median onboarding time | 21 days | 3 days | −86% |\n| CSM hours per customer | 40 hrs | 8 hrs | −80% |\n| 30-day activation rate | 45% | 75% | +67% |\n| Onboarding churn rate | 38% | 12% | −68% |\n| CSM capacity (customers/month) | 4 | 15 | +275% |\n\n**Financial summary (12-month horizon)**\n\n| Line Item | Value |\n|-----------|-------|\n| Recovered expansion revenue (churn reduction) | $740,000 |\n| CSM cost avoidance (no new hires) | $420,000 |\n| Support ticket reduction (34% → 12%) | $95,000 |\n| **Total annual benefit** | **$1,255,000** |\n| Total investment (build + Year 1 maintenance) | $336,000 |\n| **Net ROI** | **$919,000 (274%)** |\n\n[metric: 274%] First-year return on investment\n\n[metric: 5 months] Payback period\n\n[metric: $919K] Net annual benefit after investment\n\nThese projections are conservative — they assume only a 75% self-serve completion rate. [2] Customer interviews suggest the actual figure could reach 85–90% once templates are tailored per industry. [3]',
        citations: [
          { sourceId: 'sf-src-recording-1', quote: 'If we could close the onboarding gap, we have six enterprise deals that are ready to expand but are waiting to see how Phase 1 goes.', relevance: 0.91 },
          { sourceId: 'sf-src-user-2', quote: 'I almost gave up during setup. If my manager hadn\'t insisted, I would have cancelled.', relevance: 0.87 },
          { sourceId: 'sf-src-joe', quote: 'If you had a setup wizard that pre-loaded some sample data, I could have been productive on day one.', relevance: 0.9 },
        ],
      },
      {
        heading: '4. Recommendation',
        content:
          '> [recommendation] **Approve $276K investment in self-serve onboarding** (P0): This is the highest-ROI initiative available. It removes the #1 barrier to expansion revenue, avoids $420K in headcount costs, and pays back within 5 months. Every quarter of delay costs approximately $310K in leaked revenue. [1]\n\n> [recommendation] **Staff a dedicated pod for Q2** (P0): Allocate 2 frontend, 1 backend, and 1 design resource for a full-quarter sprint. Phase 1 (wizard + templates) can ship in 4 weeks, delivering immediate value while Phase 2 builds behind it. [2]\n\n> [recommendation] **Instrument onboarding analytics from day one** (P1): Build tracking into the wizard from the start so we can measure completion rates, drop-off points, and time-to-first-value in real time. This data feeds the iteration cycle in Phase 3.\n\n> [recommendation] **Deprecate manual onboarding by end of Q3** (P1): Set a firm timeline to transition all new enterprise customers to self-serve. CSM time should shift from onboarding to expansion and renewal activities. [3]',
        citations: [
          { sourceId: 'sf-src-vision', quote: 'Our north star is reducing time-to-value for enterprise customers from weeks to hours.', relevance: 0.93 },
          { sourceId: 'sf-src-product-strategy', quote: 'Self-serve onboarding is the highest-leverage investment we can make this year — it unlocks every other growth lever.', relevance: 0.92 },
          { sourceId: 'sf-src-tiago', quote: 'We need to stop treating onboarding as a services problem and start treating it as a product problem.', relevance: 0.88 },
        ],
      },
    ],
  },
];

export const synthflowData: ProjectData = {
  sources,
  sourceCategories,
  entities,
  entityTypes,
  reports,
  graphNodes: nodes,
  graphEdges: edges,
};
