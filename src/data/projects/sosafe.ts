import type { ProjectData } from '../project-data-types';
import type { Source, SourceCategory, ExtractedEntity, EntityType, Report, GraphEdge } from '../../types';
import { buildGraphData } from '../../lib/graph-utils';

const sources: Source[] = [
  { id: 'ss-src-definition', name: 'Confluence Definition', category: 'metrics', type: 'Strategy doc', icon: 'Building2', integrationId: 'confluence' },
  { id: 'ss-src-mixpanel', name: 'Mixpanel', category: 'metrics', type: 'Analytics export', icon: 'BarChart3', integrationId: 'mixpanel' },
  { id: 'ss-src-joe', name: 'Joe', category: 'transcripts', type: 'User interview', icon: 'FileText', integrationId: 'google-drive' },
  { id: 'ss-src-tiago', name: 'Tiago', category: 'transcripts', type: 'User interview', icon: 'FileText', integrationId: 'google-drive' },
  { id: 'ss-src-user-1', name: 'User 1', category: 'support-tickets', type: 'Support ticket', icon: 'TicketCheck', integrationId: 'jira' },
  { id: 'ss-src-user-2', name: 'User 2', category: 'support-tickets', type: 'Support ticket', icon: 'TicketCheck', integrationId: 'jira' },
  { id: 'ss-src-customer-1', name: 'Customer 1', category: 'sales-crm', type: 'CRM record', icon: 'MessageSquare', integrationId: 'local-files' },
];

const sourceCategories: SourceCategory[] = [
  { id: 'metrics', label: 'Metrics', sources: sources.filter((s) => s.category === 'metrics') },
  { id: 'transcripts', label: 'Transcripts', sources: sources.filter((s) => s.category === 'transcripts') },
  { id: 'support-tickets', label: 'Support Tickets', sources: sources.filter((s) => s.category === 'support-tickets') },
  { id: 'sales-crm', label: 'Sales CRM', sources: sources.filter((s) => s.category === 'sales-crm') },
];

const entities: ExtractedEntity[] = [
  // Metrics
  { id: 'ss-ent-activation-rate', name: 'Activation rate: 34%', type: 'metric', description: 'Only 34% of new users complete the activation sequence within 14 days of signup.', sourceRefs: ['ss-src-mixpanel', 'ss-src-definition'] },
  { id: 'ss-ent-time-to-activate', name: 'Time to activate: 8.3 days', type: 'metric', description: 'Median time from signup to activation event is 8.3 days, well above the 3-day target.', sourceRefs: ['ss-src-mixpanel'] },
  { id: 'ss-ent-feature-adoption', name: 'Feature adoption: 22%', type: 'metric', description: 'Only 22% of activated users use more than 3 core features within their first month.', sourceRefs: ['ss-src-mixpanel', 'ss-src-customer-1'] },
  // Customers
  { id: 'ss-ent-enterprise-segment', name: 'Enterprise segment', type: 'customer', description: 'Companies with 500+ employees, typically with dedicated IT and security teams.', sourceRefs: ['ss-src-joe', 'ss-src-tiago'] },
  { id: 'ss-ent-smb-segment', name: 'SMB segment', type: 'customer', description: 'Companies with 10-100 employees, typically self-serve with minimal IT support.', sourceRefs: ['ss-src-customer-1', 'ss-src-user-1'] },
  // Activity Events
  { id: 'ss-ent-first-project', name: 'First project created', type: 'activity-event', description: 'User creates their first project — key milestone in the activation funnel.', sourceRefs: ['ss-src-definition', 'ss-src-mixpanel'] },
  { id: 'ss-ent-first-integration', name: 'First integration connected', type: 'activity-event', description: 'User connects their first third-party integration (Jira, Slack, etc.).', sourceRefs: ['ss-src-definition', 'ss-src-mixpanel'] },
  { id: 'ss-ent-first-report', name: 'First report generated', type: 'activity-event', description: 'User generates their first synthesis report — the "aha moment" activation event.', sourceRefs: ['ss-src-definition', 'ss-src-mixpanel'] },
  // Pain Points
  { id: 'ss-ent-integration-setup', name: 'Integration setup too complex', type: 'pain-point', description: 'Users struggle to configure OAuth flows for Jira and Confluence integrations.', sourceRefs: ['ss-src-user-1', 'ss-src-user-2', 'ss-src-tiago'] },
  { id: 'ss-ent-empty-state', name: 'Empty state confusion', type: 'pain-point', description: 'New users see an empty workspace with no guidance on what to do first.', sourceRefs: ['ss-src-user-2', 'ss-src-customer-1'] },
  // Personas
  { id: 'ss-ent-champion', name: 'Internal Champion', type: 'persona', description: 'The person who evaluates and advocates for the tool within their organization.', sourceRefs: ['ss-src-joe', 'ss-src-tiago'] },
  { id: 'ss-ent-end-user', name: 'End User', type: 'persona', description: 'Daily user who needs the tool to be intuitive without training.', sourceRefs: ['ss-src-user-1', 'ss-src-customer-1'] },
  // Feature Requests
  { id: 'ss-ent-onboarding-checklist', name: 'Onboarding checklist', type: 'feature-request', description: 'Interactive checklist guiding users through activation milestones.', sourceRefs: ['ss-src-customer-1', 'ss-src-tiago'] },
  { id: 'ss-ent-sample-project', name: 'Sample project with data', type: 'feature-request', description: 'Pre-loaded project demonstrating the product\'s value before users add their own data.', sourceRefs: ['ss-src-joe', 'ss-src-user-2'] },
];

const entityTypes: EntityType[] = [
  { id: 'metric', label: 'Metrics', color: '#EF4444', entities: entities.filter((e) => e.type === 'metric') },
  { id: 'customer', label: 'Customers', color: '#14B8A6', entities: entities.filter((e) => e.type === 'customer') },
  { id: 'activity-event', label: 'Activity Events', color: '#D946EF', entities: entities.filter((e) => e.type === 'activity-event') },
  { id: 'pain-point', label: 'Pain Points', color: '#F59E0B', entities: entities.filter((e) => e.type === 'pain-point') },
  { id: 'persona', label: 'Personas', color: '#EC4899', entities: entities.filter((e) => e.type === 'persona') },
  { id: 'feature-request', label: 'Feature Requests', color: '#3B82F6', entities: entities.filter((e) => e.type === 'feature-request') },
];

const crossEdges: GraphEdge[] = [
  { source: 'ss-ent-activation-rate', target: 'ss-ent-first-report', relationship: 'related', weight: 0.8 },
  { source: 'ss-ent-first-project', target: 'ss-ent-first-integration', relationship: 'related', weight: 0.6 },
  { source: 'ss-ent-first-integration', target: 'ss-ent-first-report', relationship: 'related', weight: 0.7 },
  { source: 'ss-ent-integration-setup', target: 'ss-ent-first-integration', relationship: 'contradicts', weight: 0.7 },
  { source: 'ss-ent-empty-state', target: 'ss-ent-first-project', relationship: 'contradicts', weight: 0.6 },
  { source: 'ss-ent-onboarding-checklist', target: 'ss-ent-empty-state', relationship: 'supports', weight: 0.8 },
  { source: 'ss-ent-sample-project', target: 'ss-ent-empty-state', relationship: 'supports', weight: 0.7 },
  { source: 'ss-ent-champion', target: 'ss-ent-enterprise-segment', relationship: 'related', weight: 0.5 },
  { source: 'ss-ent-end-user', target: 'ss-ent-smb-segment', relationship: 'related', weight: 0.5 },
  { source: 'ss-ent-feature-adoption', target: 'ss-ent-activation-rate', relationship: 'related', weight: 0.6 },
];

const { nodes, edges } = buildGraphData(sources, entities, entityTypes, crossEdges);

const reports: Report[] = [
  {
    id: 'ss-report',
    title: 'Report',
    type: 'activation-report',
    description: 'Activation funnel analysis with pain point correlation and user segment breakdown',
    sourceCount: 7,
    generatedAt: '2026-03-04T14:30:00Z',
    sections: [
      {
        heading: '1. Activation Overview',
        content:
          '[metric: Activation Rate | 34%]\n[metric: Time to Activate | 8.3 days]\n[metric: Feature Adoption | 22%]\n[metric: Funnel Completion | 41%]',
        citations: [],
      },
      {
        heading: '2. Funnel Analysis',
        content:
          'The activation funnel shows three critical milestones: project creation, integration connection, and first report generation. The biggest drop-off occurs between **project creation** (78% complete) and **integration connection** (45% complete). [1]\n\nUsers who complete all three milestones within 7 days have a **4.2x higher** 90-day retention rate compared to those who don\'t. The "aha moment" is clearly the first report — users who generate a report within their first session have 89% retention. [2]',
        citations: [
          { sourceId: 'ss-src-mixpanel', quote: 'Funnel: Signup (100%) → Project (78%) → Integration (45%) → Report (34%). Biggest drop: integration step.', relevance: 0.95 },
          { sourceId: 'ss-src-definition', quote: 'Activation = first report generated. Users who activate in session 1 retain at 89% vs 23% for late activators.', relevance: 0.9 },
        ],
      },
      {
        heading: '3. Pain Point Correlation',
        content:
          '**Integration Setup Friction**\nThe OAuth flow for Jira/Confluence requires 6 steps and admin permissions. SMB users without IT support frequently get stuck here. [1] This correlates directly with the 33pp drop-off between project creation and integration connection.\n\n**Empty State Confusion**\nUsers who see an empty workspace after signup spend an average of 4.2 minutes before their first action, compared to 0.8 minutes for users who encounter a guided experience. [2]\n\n> [conflict] **Enterprise vs SMB needs diverge**: Enterprise users need SSO and granular permissions before they can even start, while SMB users want to skip straight to value. A one-size-fits-all onboarding won\'t work.',
        citations: [
          { sourceId: 'ss-src-user-1', quote: 'I tried connecting Jira but it asked for admin permissions I don\'t have. I gave up and never came back.', relevance: 0.92 },
          { sourceId: 'ss-src-customer-1', quote: 'When I first opened the app, I had no idea what to do. There was nothing there — just empty panels.', relevance: 0.88 },
        ],
      },
      {
        heading: '4. User Segments',
        content:
          '| Segment | Activation Rate | Avg Time | Top Blocker |\n|---------|----------------|----------|-------------|\n| Enterprise | 28% | 12.1 days | SSO/permissions |\n| Mid-Market | 38% | 7.2 days | Integration setup |\n| SMB | 42% | 5.1 days | Empty state |\n| Self-Serve Trial | 31% | 9.8 days | No guidance |',
        citations: [],
      },
      {
        heading: '5. Recommendations',
        content:
          '> [recommendation] 1. **Add sample project for new users** (P0) (High impact, High confidence): Pre-load a demo project with sample data and a generated report so users can experience the "aha moment" immediately. [1]\n\n> [recommendation] 2. **Simplify integration OAuth to 2 steps** (P0) (High impact, Medium confidence): Reduce the Jira/Confluence OAuth flow from 6 steps to 2 by handling admin consent server-side.\n\n> [recommendation] 3. **Add interactive onboarding checklist** (P1) (Medium impact, High confidence): Guide users through the three activation milestones with progress tracking and contextual help. [2]\n\n> [recommendation] 4. **Segment onboarding by company size** (P1) (Medium impact, Medium confidence): Enterprise users get SSO-first flow, SMB users get project-first flow.',
        citations: [
          { sourceId: 'ss-src-joe', quote: 'If I could see what a finished project looks like before I invest time setting up, I\'d be much more motivated to continue.', relevance: 0.9 },
          { sourceId: 'ss-src-tiago', quote: 'Our CS team spends 60% of onboarding calls just walking users through the integration setup.', relevance: 0.85 },
        ],
      },
    ],
  },
  {
    id: 'ss-funnel-diagnostic',
    title: 'Funnel Diagnostic',
    type: 'report',
    description: 'Step-by-step funnel analysis with drop-off root causes',
    sourceCount: 7,
    generatedAt: '2026-03-04T14:30:00Z',
    sections: [
      {
        heading: '1. Funnel Overview',
        content:
          '[metric: Signup | 100%]\n[metric: Project Created | 78%]\n[metric: Integration Connected | 45%]\n[metric: First Report Generated | 34%]\n\nThe activation funnel tracks four sequential milestones from signup to the "aha moment" (first report). Overall funnel completion stands at **34%**, meaning nearly two-thirds of new users never reach activation. The steepest drop-off is between **Project Created** and **Integration Connected**, where **33 percentage points** are lost. [1]',
        citations: [
          { sourceId: 'ss-src-mixpanel', quote: 'Funnel: Signup (100%) → Project (78%) → Integration (45%) → Report (34%). Biggest drop: integration step.', relevance: 0.95 },
        ],
      },
      {
        heading: '2. Drop-off Root Causes',
        content:
          '**Step 2 → 3: Integration Connection (-33pp)**\n\nThe OAuth flow for Jira and Confluence requires admin-level permissions that most end users do not have. SMB users without dedicated IT teams are disproportionately affected. [1]\n\n> [conflict] **Permission model mismatch**: The product requires admin OAuth scopes, but the typical buyer persona (Internal Champion) is rarely a workspace admin. This creates an organizational dependency that blocks self-serve activation.\n\nSupport tickets confirm this is the #1 friction point — users attempt the integration, encounter the permissions wall, and abandon the flow entirely. [2]\n\n**Step 1 → 2: Project Creation (-22pp)**\n\nUsers who encounter the empty workspace state spend an average of **4.2 minutes** idle before taking any action. Many leave without creating a project. [3]\n\n**Step 3 → 4: First Report (-11pp)**\n\nThis is the smallest drop-off, suggesting that once users connect an integration, the path to generating a report is relatively clear. However, users who take longer than **48 hours** between integration and report have only a 12% chance of ever activating. [4]',
        citations: [
          { sourceId: 'ss-src-user-1', quote: 'I tried connecting Jira but it asked for admin permissions I don\'t have. I gave up and never came back.', relevance: 0.92 },
          { sourceId: 'ss-src-user-2', quote: 'The integration setup felt like a chore. I just wanted to see what the tool could do first.', relevance: 0.88 },
          { sourceId: 'ss-src-customer-1', quote: 'When I first opened the app, I had no idea what to do. There was nothing there — just empty panels.', relevance: 0.88 },
          { sourceId: 'ss-src-mixpanel', quote: 'Users who take >48h between integration and first report have only 12% activation probability.', relevance: 0.85 },
        ],
      },
      {
        heading: '3. Segment Comparison',
        content:
          '| Segment | Step 1→2 | Step 2→3 | Step 3→4 | Overall | Primary Blocker |\n|---------|----------|----------|----------|---------|----------------|\n| Enterprise (500+) | 82% | 31% | 88% | 22% | SSO / admin permissions |\n| Mid-Market (100-500) | 80% | 48% | 82% | 31% | Integration complexity |\n| SMB (10-100) | 75% | 56% | 79% | 33% | Empty state confusion |\n| Self-Serve Trial | 72% | 40% | 75% | 22% | No onboarding guidance |\n\nEnterprise users have the **highest step 1→2 conversion** (82%) but the **lowest step 2→3 conversion** (31%), confirming that the integration permissions wall disproportionately affects larger organizations with stricter IT policies. [1] SMB users convert better at the integration step but leak earlier in the funnel due to empty state confusion. [2]',
        citations: [
          { sourceId: 'ss-src-joe', quote: 'Our enterprise clients always get stuck at the SSO configuration step. Their IT teams need to approve every OAuth connection.', relevance: 0.9 },
          { sourceId: 'ss-src-tiago', quote: 'Smaller teams just want to get started quickly. They don\'t understand why they need to configure integrations before seeing any value.', relevance: 0.87 },
        ],
      },
      {
        heading: '4. Quick Wins',
        content:
          '> [recommendation] 1. **Defer integration setup until after first report** (P0) (High impact, High confidence): Let users generate a report with sample data or manual upload before requiring OAuth integrations. This removes the biggest single drop-off from the critical path. [1]\n\n> [recommendation] 2. **Add "request admin access" flow** (P0) (High impact, Medium confidence): When a user lacks admin permissions, offer a one-click email to their IT admin requesting the OAuth approval, rather than dead-ending.\n\n> [recommendation] 3. **Guided empty state with template projects** (P1) (Medium impact, High confidence): Replace the blank workspace with 2-3 template projects that demonstrate the product\'s value immediately. [2]\n\n> [recommendation] 4. **Add 48-hour re-engagement nudge** (P1) (Medium impact, Medium confidence): Trigger an email/in-app prompt for users who connected an integration but haven\'t generated a report within 48 hours.',
        citations: [
          { sourceId: 'ss-src-joe', quote: 'If I could see what a finished project looks like before I invest time setting up, I\'d be much more motivated to continue.', relevance: 0.9 },
          { sourceId: 'ss-src-customer-1', quote: 'A template or example would have saved me 30 minutes of figuring out how the tool works.', relevance: 0.85 },
        ],
      },
    ],
  },
  {
    id: 'ss-playbook',
    title: 'Activation Playbook',
    type: 'report',
    description: 'Concrete action plan for improving activation per user segment',
    sourceCount: 7,
    generatedAt: '2026-03-04T14:30:00Z',
    sections: [
      {
        heading: '1. Playbook Overview',
        content:
          '[metric: Current Activation | 34%]\n[metric: Target Activation | 55%]\n[metric: Estimated Lift | +21pp]\n[metric: Time to Impact | 6-8 weeks]\n\nThis playbook provides **segment-specific activation strategies** based on analysis of 7 sources across analytics, interviews, support tickets, and CRM records. The core insight is that a single onboarding flow cannot serve both Enterprise and SMB segments effectively — each requires a distinct critical path. [1] [2]\n\n> [conflict] **One-size-fits-all onboarding is counterproductive**: Enterprise users need SSO and permissions resolved before they can engage, while SMB users need to see value before they invest in setup. Forcing both through the same flow creates friction for everyone.',
        citations: [
          { sourceId: 'ss-src-definition', quote: 'Activation = first report generated. Target is 55% activation within 14 days by end of Q2.', relevance: 0.92 },
          { sourceId: 'ss-src-joe', quote: 'Enterprise and SMB users have completely different first-day experiences. We need to treat them as separate onboarding tracks.', relevance: 0.9 },
        ],
      },
      {
        heading: '2. Enterprise Playbook: SSO-First Flow',
        content:
          '**Goal**: Increase enterprise activation from **22% → 40%** within 8 weeks.\n\n**Critical Path**: SSO Config → Admin Approval → Team Invite → First Project → Report\n\n> [recommendation] **Phase 1: Pre-signup IT prep kit** (P0) (High impact, High confidence): Send a pre-configured IT requirements doc to the enterprise champion *before* trial signup, covering OAuth scopes, SSO settings, and firewall allowlists. Reduces day-1 blockers by an estimated 60%. [1]\n\n> [recommendation] **Phase 2: Parallel onboarding tracks** (P0) (High impact, Medium confidence): While IT configures SSO, give the champion access to a **sandbox environment** with pre-loaded data so they can build internal buy-in without waiting for provisioning.\n\n> [recommendation] **Phase 3: Managed activation** (P1) (Medium impact, High confidence): Assign a CSM-led onboarding session within 48 hours of SSO completion. The session walks through first project creation and first report — compressing the 12.1-day activation timeline to under 3 days. [2]\n\n**Success Criteria**: Enterprise activation rate reaches 40%, median time-to-activate drops below 5 days.',
        citations: [
          { sourceId: 'ss-src-tiago', quote: 'Our CS team spends 60% of onboarding calls just walking users through the integration setup. If IT was pre-configured, we could focus on value delivery.', relevance: 0.92 },
          { sourceId: 'ss-src-joe', quote: 'The enterprise buyers I talked to said they would happily spend 15 minutes on pre-setup if it meant their team could start using the product on day one.', relevance: 0.88 },
        ],
      },
      {
        heading: '3. SMB Playbook: Project-First Flow',
        content:
          '**Goal**: Increase SMB activation from **33% → 60%** within 6 weeks.\n\n**Critical Path**: Signup → Sample Project → "Aha Moment" → Own Project → Integration\n\n> [recommendation] **Phase 1: Instant value via sample project** (P0) (High impact, High confidence): On first login, auto-create a sample project with realistic data and a pre-generated report. Users see the end-state value within **30 seconds** of signup, before any setup is required. [1]\n\n> [recommendation] **Phase 2: Progressive integration prompts** (P0) (High impact, Medium confidence): After the user explores the sample project, prompt them to create their own project. Only suggest integrations *after* they\'ve created a project and understand what data is needed.\n\n> [recommendation] **Phase 3: Onboarding checklist with milestones** (P1) (Medium impact, High confidence): Persistent sidebar checklist tracking: (1) Explore sample, (2) Create project, (3) Add sources, (4) Generate report. Each milestone unlocks a contextual tip. [2]\n\n**Success Criteria**: SMB activation rate reaches 60%, median time-to-activate drops below 2 days.',
        citations: [
          { sourceId: 'ss-src-user-2', quote: 'I wish there was a demo or example project. I spent 20 minutes trying to figure out the workflow before giving up.', relevance: 0.9 },
          { sourceId: 'ss-src-customer-1', quote: 'Once I finally generated my first report, everything clicked. The problem is it took me 5 days to get there.', relevance: 0.87 },
        ],
      },
      {
        heading: '4. Measurement Plan',
        content:
          '| KPI | Baseline | Target | Segment | Tracking Method | Review Cadence |\n|-----|----------|--------|---------|----------------|---------------|\n| Overall activation rate | 34% | 55% | All | Mixpanel funnel | Weekly |\n| Enterprise activation rate | 22% | 40% | Enterprise | Mixpanel + CRM | Bi-weekly |\n| SMB activation rate | 33% | 60% | SMB | Mixpanel funnel | Weekly |\n| Median time-to-activate | 8.3 days | 3 days | All | Mixpanel cohort | Weekly |\n| Integration completion rate | 45% | 70% | All | Mixpanel event | Weekly |\n| Sample project engagement | N/A | 80% | SMB | Mixpanel event | Daily (first 2 weeks) |\n| Pre-setup kit sent | N/A | 95% | Enterprise | CRM automation | Weekly |\n| 48h re-engagement rate | N/A | 40% | All | Email analytics | Weekly |\n\n> [recommendation] **Instrument all new flows before launch** (P0) (High impact, High confidence): Ensure every new onboarding step has Mixpanel tracking events. Define a shared dashboard with the KPIs above so the team can monitor impact from day one. [1]\n\n> [recommendation] **Run A/B test for sample project** (P1) (Medium impact, High confidence): Test sample-project-first vs. current empty-state flow with a 50/50 split on new SMB signups for 4 weeks before full rollout.',
        citations: [
          { sourceId: 'ss-src-mixpanel', quote: 'Current instrumentation covers funnel steps but lacks granularity on time-between-steps and drop-off reasons.', relevance: 0.85 },
        ],
      },
    ],
  },
];

export const sosafeData: ProjectData = {
  sources,
  sourceCategories,
  entities,
  entityTypes,
  reports,
  graphNodes: nodes,
  graphEdges: edges,
};
