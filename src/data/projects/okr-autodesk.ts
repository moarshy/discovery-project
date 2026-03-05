import type { ProjectData } from '../project-data-types';
import type { Source, SourceCategory, ExtractedEntity, EntityType, Report, GraphEdge } from '../../types';
import { buildGraphData } from '../../lib/graph-utils';

const sources: Source[] = [
  { id: 'okr-src-okrs', name: 'OKRs', category: 'company', type: 'Strategy doc', icon: 'Target', integrationId: 'confluence' },
  { id: 'okr-src-mixpanel', name: 'Mixpanel Behavior Metrics', category: 'analytics', type: 'Analytics export', icon: 'BarChart3', integrationId: 'mixpanel' },
  { id: 'okr-src-experiment', name: 'Experiment', category: 'airtable', type: 'Experiment log', icon: 'FlaskConical', integrationId: 'airtable' },
  { id: 'okr-src-status', name: 'Status', category: 'airtable', type: 'Status report', icon: 'ClipboardList', integrationId: 'airtable' },
  { id: 'okr-src-results', name: 'Results', category: 'airtable', type: 'Results doc', icon: 'FileCheck', integrationId: 'airtable' },
  { id: 'okr-src-4ps-w1', name: '4Ps Week 1', category: 'reports', type: 'Weekly update', icon: 'FileText', integrationId: 'local-files' },
  { id: 'okr-src-4ps-w2', name: '4Ps Week 2', category: 'reports', type: 'Weekly update', icon: 'FileText', integrationId: 'local-files' },
];

const sourceCategories: SourceCategory[] = [
  { id: 'company', label: 'Company', sources: sources.filter((s) => s.category === 'company') },
  { id: 'analytics', label: 'Analytics', sources: sources.filter((s) => s.category === 'analytics') },
  { id: 'airtable', label: 'Airtable', sources: sources.filter((s) => s.category === 'airtable') },
  { id: 'reports', label: 'Reports', sources: sources.filter((s) => s.category === 'reports') },
];

const entities: ExtractedEntity[] = [
  // OKRs
  { id: 'okr-ent-activation', name: 'Increase activation rate to 75%', type: 'okr', description: 'Key result targeting 75% activation within first 7 days of signup.', sourceRefs: ['okr-src-okrs', 'okr-src-mixpanel'] },
  { id: 'okr-ent-retention', name: 'Improve 30-day retention to 60%', type: 'okr', description: 'Key result targeting 60% user retention at 30 days post-activation.', sourceRefs: ['okr-src-okrs', 'okr-src-mixpanel'] },
  // Experiments
  { id: 'okr-ent-onboarding-wizard', name: 'Guided onboarding wizard', type: 'experiment', description: 'A/B test of new step-by-step onboarding flow vs current self-serve approach.', sourceRefs: ['okr-src-experiment', 'okr-src-results'] },
  { id: 'okr-ent-email-drip', name: 'Email drip campaign', type: 'experiment', description: 'Testing 5-email sequence targeting users who signed up but haven\'t completed setup.', sourceRefs: ['okr-src-experiment', 'okr-src-status'] },
  // Metrics
  { id: 'okr-ent-time-to-value', name: 'Time to first value', type: 'metric', description: 'Median time from signup to first meaningful action (currently 4.2 days).', sourceRefs: ['okr-src-mixpanel', 'okr-src-results'] },
  { id: 'okr-ent-dau-wau', name: 'DAU/WAU ratio', type: 'metric', description: 'Daily to weekly active user ratio as engagement health indicator (currently 0.42).', sourceRefs: ['okr-src-mixpanel'] },
  // User Behaviors
  { id: 'okr-ent-drop-off-step3', name: 'Drop-off at setup step 3', type: 'user-behavior', description: '38% of users abandon the setup flow at step 3 (data source connection).', sourceRefs: ['okr-src-mixpanel', 'okr-src-4ps-w1'] },
  { id: 'okr-ent-power-users', name: 'Power user adoption pattern', type: 'user-behavior', description: 'Users who complete 3+ projects in first week have 4x higher retention.', sourceRefs: ['okr-src-mixpanel', 'okr-src-4ps-w2'] },
  // Priorities
  { id: 'okr-ent-p0-onboarding', name: 'P0: Fix onboarding drop-off', type: 'priority', description: 'Highest priority item — address the 38% drop-off at setup step 3.', sourceRefs: ['okr-src-4ps-w1', 'okr-src-4ps-w2'] },
  // Progress
  { id: 'okr-ent-wizard-results', name: 'Wizard test: +18% activation', type: 'progress', description: 'Onboarding wizard experiment showing 18% improvement in activation rate.', sourceRefs: ['okr-src-results', 'okr-src-4ps-w2'] },
  // Plans
  { id: 'okr-ent-phase2-plan', name: 'Phase 2: Contextual tooltips', type: 'plan', description: 'Follow-up to wizard experiment — add contextual help at key drop-off points.', sourceRefs: ['okr-src-status', 'okr-src-4ps-w2'] },
  // Problems
  { id: 'okr-ent-data-quality', name: 'Mixpanel data quality gaps', type: 'problem', description: 'Missing events for 12% of user sessions due to ad-blocker interference.', sourceRefs: ['okr-src-mixpanel', 'okr-src-4ps-w1'] },
];

const entityTypes: EntityType[] = [
  { id: 'okr', label: 'OKRs', color: '#10B981', entities: entities.filter((e) => e.type === 'okr') },
  { id: 'experiment', label: 'Experiments', color: '#8B5CF6', entities: entities.filter((e) => e.type === 'experiment') },
  { id: 'metric', label: 'Metrics', color: '#EF4444', entities: entities.filter((e) => e.type === 'metric') },
  { id: 'user-behavior', label: 'User Behaviors', color: '#F97316', entities: entities.filter((e) => e.type === 'user-behavior') },
  { id: 'priority', label: 'Priorities', color: '#E11D48', entities: entities.filter((e) => e.type === 'priority') },
  { id: 'progress', label: 'Progress', color: '#22C55E', entities: entities.filter((e) => e.type === 'progress') },
  { id: 'plan', label: 'Plans', color: '#0EA5E9', entities: entities.filter((e) => e.type === 'plan') },
  { id: 'problem', label: 'Problems', color: '#DC2626', entities: entities.filter((e) => e.type === 'problem') },
];

const crossEdges: GraphEdge[] = [
  { source: 'okr-ent-activation', target: 'okr-ent-onboarding-wizard', relationship: 'supports', weight: 0.9 },
  { source: 'okr-ent-activation', target: 'okr-ent-drop-off-step3', relationship: 'related', weight: 0.8 },
  { source: 'okr-ent-retention', target: 'okr-ent-power-users', relationship: 'related', weight: 0.7 },
  { source: 'okr-ent-onboarding-wizard', target: 'okr-ent-wizard-results', relationship: 'supports', weight: 0.9 },
  { source: 'okr-ent-wizard-results', target: 'okr-ent-phase2-plan', relationship: 'supports', weight: 0.8 },
  { source: 'okr-ent-p0-onboarding', target: 'okr-ent-drop-off-step3', relationship: 'supports', weight: 0.9 },
  { source: 'okr-ent-data-quality', target: 'okr-ent-dau-wau', relationship: 'contradicts', weight: 0.6 },
  { source: 'okr-ent-email-drip', target: 'okr-ent-retention', relationship: 'supports', weight: 0.5 },
];

const { nodes, edges } = buildGraphData(sources, entities, entityTypes, crossEdges);

const reports: Report[] = [
  {
    id: 'okr-report',
    title: 'Monthly OKR Report',
    type: 'okr-report',
    description: 'OKR progress synthesis with experiment results and metric analysis',
    sourceCount: 7,
    generatedAt: '2026-03-04T14:30:00Z',
    sections: [
      {
        heading: '1. OKR Scorecard',
        content:
          '[metric: Activation Rate | 62% → 73%]\n[metric: 30-Day Retention | 48% → 55%]\n[metric: Time to Value | 4.2d → 2.8d]\n[metric: DAU/WAU Ratio | 0.42 → 0.47]',
        citations: [],
      },
      {
        heading: '2. Experiment Summary',
        content:
          '**Guided Onboarding Wizard (Completed)**\nThe A/B test ran for 3 weeks with 2,400 users per variant. The wizard variant showed an **18% improvement** in activation rate (62% → 73%), with particularly strong results among junior designers. [1]\n\n**Email Drip Campaign (In Progress)**\nEarly results from the 5-email sequence show a 12% open rate lift but conversion impact is still unclear. Week 3 data pending. [2]',
        citations: [
          { sourceId: 'okr-src-results', quote: 'Wizard variant activation: 73.2% vs control 62.1%. Statistical significance: p < 0.001.', relevance: 0.95 },
          { sourceId: 'okr-src-status', quote: 'Email drip: 3 of 5 emails sent. Open rates averaging 34% (up from 22% baseline).', relevance: 0.82 },
        ],
      },
      {
        heading: '3. Key Metrics Deep Dive',
        content:
          '**Time to First Value** improved from 4.2 days to 2.8 days, driven primarily by the onboarding wizard reducing setup time. [1]\n\n**Drop-off Analysis**: Step 3 (data source connection) remains the highest friction point at 38% abandonment, though this is down from 45% pre-wizard. The remaining drop-off is concentrated among users with complex multi-tool setups.\n\n> [conflict] **Data Quality Alert**: Mixpanel is missing events for ~12% of sessions due to ad-blocker interference. DAU/WAU metrics may be understated by 5-8%. [2]',
        citations: [
          { sourceId: 'okr-src-mixpanel', quote: 'Median time to first project creation dropped from 4.2 days to 2.8 days in the wizard cohort.', relevance: 0.9 },
          { sourceId: 'okr-src-4ps-w1', quote: 'Ad-blocker interference affecting ~12% of Mixpanel events. Engineering to evaluate server-side tracking.', relevance: 0.85 },
        ],
      },
      {
        heading: '4. Alignment Analysis',
        content:
          '| OKR | Status | Confidence | Blocking Issues |\n|-----|--------|------------|----------------|\n| Activation → 75% | On Track | High | Step 3 drop-off |\n| Retention → 60% | At Risk | Medium | Email drip unclear |\n| Time to Value | Ahead | High | None |\n| DAU/WAU → 0.50 | At Risk | Low | Data quality gaps |',
        citations: [],
      },
      {
        heading: '5. Recommendations',
        content:
          '> [recommendation] 1. **Ship onboarding wizard to 100% of users** (P0) (High impact, High confidence): Experiment results are conclusive. Roll out immediately and reallocate experiment resources. [1]\n\n> [recommendation] 2. **Prioritize Step 3 simplification** (P0) (High impact, Medium confidence): Add skip option with default data source, reducing friction for simple use cases.\n\n> [recommendation] 3. **Implement server-side Mixpanel tracking** (P1) (Medium impact, High confidence): Resolve the 12% data gap to improve metric confidence. [2]\n\n> [recommendation] 4. **Extend email drip test by 2 weeks** (P2) (Low impact, Low confidence): Current data insufficient to make a call on retention impact.',
        citations: [
          { sourceId: 'okr-src-results', quote: 'Recommend immediate 100% rollout. Effect size is large and consistent across all user segments.', relevance: 0.92 },
          { sourceId: 'okr-src-4ps-w2', quote: 'Server-side tracking spike scheduled for Sprint 7. Estimated 2-week implementation.', relevance: 0.8 },
        ],
      },
    ],
  },
  {
    id: 'okr-experiment-insights',
    title: 'Experiment Insights',
    type: 'experiment-report',
    description: 'Deep dive into experiment results, learnings, and next steps',
    sourceCount: 7,
    generatedAt: '2026-03-04T14:30:00Z',
    sections: [
      {
        heading: '1. Experiment Overview',
        content:
          '[metric: Onboarding Wizard | Completed · +18% activation]\n[metric: Email Drip Campaign | In Progress · Week 3 of 5]\n[metric: Step 3 Skip Option | Planned · Kick-off Sprint 8]\n[metric: Contextual Tooltips | Planned · Phase 2]\n\nTwo experiments are actively running against the **Activation Rate → 75%** OKR. The onboarding wizard test has concluded with strong positive results, while the email drip campaign is mid-flight with early signals. [1] [2]',
        citations: [
          { sourceId: 'okr-src-experiment', quote: 'Experiment log shows 2 active, 1 completed, and 1 planned experiment against Q1 activation and retention OKRs.', relevance: 0.93 },
          { sourceId: 'okr-src-status', quote: 'Onboarding wizard marked COMPLETED. Email drip marked IN PROGRESS (week 3).', relevance: 0.88 },
        ],
      },
      {
        heading: '2. Results Analysis',
        content:
          '**Guided Onboarding Wizard**\nThe wizard ran for 3 weeks across 4,800 total users (2,400 per variant). Key findings:\n\n| Metric | Control | Wizard | Delta |\n|--------|---------|--------|-------|\n| Activation rate | 62.1% | 73.2% | **+18%** |\n| Time to first value | 4.2 days | 2.8 days | **-33%** |\n| Setup completion | 55% | 71% | **+29%** |\n| Step 3 drop-off | 45% | 38% | **-16%** |\n\nThe effect was strongest among junior designers (activation +24%) and weakest among enterprise admins (activation +9%). [1]\n\n**Email Drip Campaign**\nThrough 3 of 5 scheduled emails, open rates are averaging 34% (up from 22% baseline). However, click-through to product remains flat at 8%. [2]\n\n> [conflict] **Conflicting Signal**: While email opens are up, actual product re-engagement has not improved. The drip content may be informative but not action-driving. Further data needed before drawing conclusions. [3]',
        citations: [
          { sourceId: 'okr-src-results', quote: 'Wizard variant activation: 73.2% vs control 62.1%. Statistical significance: p < 0.001. Effect strongest in junior designer segment (+24%).', relevance: 0.96 },
          { sourceId: 'okr-src-status', quote: 'Email drip: 3 of 5 emails sent. Open rates averaging 34% (up from 22% baseline). CTR flat at 8%.', relevance: 0.84 },
          { sourceId: 'okr-src-mixpanel', quote: 'Product re-engagement from email cohort: 8.1% CTR, no statistically significant change in 7-day return rate.', relevance: 0.79 },
        ],
      },
      {
        heading: '3. Learnings & Next Steps',
        content:
          '**Key Learnings**\n- **Guided flows outperform self-serve** — users who received step-by-step guidance were 29% more likely to complete setup. This holds across all segments. [1]\n- **Step 3 remains the critical bottleneck** — even with the wizard, 38% of users drop off at the data source connection step. The wizard reduced but did not eliminate this friction. [2]\n- **Email alone is insufficient for re-engagement** — high open rates with flat CTR suggests the content strategy needs a product-led hook (e.g., deep links to half-completed projects). [3]\n\n> [recommendation] **Roll out the wizard to 100%** (P0): Results are conclusive and consistent. Ship immediately and free up experiment capacity for Step 3 improvements.\n\n> [recommendation] **Redesign email drip with deep links** (P1): Replace generic tips with personalized, action-oriented content linking directly into the user\'s workspace.\n\n> [recommendation] **Spike: Step 3 skip option** (P1): Allow users to bypass data source connection with sample data, reducing the single largest friction point.\n\n> [recommendation] **Plan Phase 2: Contextual tooltips** (P2): Layer in-app guidance at key drop-off points identified by Mixpanel funnel data.',
        citations: [
          { sourceId: 'okr-src-results', quote: 'Setup completion rate: 71% wizard vs 55% control. Guided steps reduced median setup time by 33%.', relevance: 0.91 },
          { sourceId: 'okr-src-4ps-w1', quote: 'Step 3 (data source connection) remains highest friction — 38% abandonment even in wizard variant.', relevance: 0.87 },
          { sourceId: 'okr-src-4ps-w2', quote: 'Proposal: add deep links to user workspace in email drip. Eng spike scheduled for Sprint 8.', relevance: 0.78 },
        ],
      },
    ],
  },
  {
    id: 'okr-4ps-summary',
    title: '4Ps Progress Summary',
    type: 'progress-report',
    description: 'Week-over-week progress, plans, problems, and priorities synthesis',
    sourceCount: 7,
    generatedAt: '2026-03-04T14:30:00Z',
    sections: [
      {
        heading: '1. Progress (What Shipped)',
        content:
          '[metric: Wizard Rollout | 100% · Shipped Week 2]\n[metric: Activation Rate | 62% → 73% · +18%]\n[metric: Setup Time | 4.2d → 2.8d · -33%]\n\n**Week 1**\n- Completed onboarding wizard A/B test (n=4,800) with statistically significant results. [1]\n- Identified and documented Step 3 drop-off pattern across all user segments. [2]\n- Flagged Mixpanel data quality gap affecting ~12% of sessions.\n\n**Week 2**\n- Shipped wizard to 100% of new users after positive experiment results. [3]\n- Email drip campaign sent emails 1–3 of 5. Open rates trending above baseline.\n- Began scoping Phase 2 contextual tooltip system.',
        citations: [
          { sourceId: 'okr-src-results', quote: 'Wizard variant activation: 73.2% vs control 62.1%. Statistical significance: p < 0.001.', relevance: 0.95 },
          { sourceId: 'okr-src-4ps-w1', quote: 'Step 3 drop-off documented: 38% abandonment at data source connection. Affects all segments.', relevance: 0.88 },
          { sourceId: 'okr-src-4ps-w2', quote: 'Wizard shipped to 100% of new signups as of Monday. Monitoring activation daily.', relevance: 0.92 },
        ],
      },
      {
        heading: '2. Plans (What\'s Next)',
        content:
          '| Initiative | Target Sprint | Owner | Status |\n|-----------|--------------|-------|--------|\n| Step 3 skip option spike | Sprint 8 | Eng | Scoping |\n| Email drip deep links | Sprint 8 | Growth | Proposed |\n| Server-side Mixpanel tracking | Sprint 7 | Eng | Scheduled |\n| Phase 2: Contextual tooltips | Sprint 9 | Design | Discovery |\n\n- **Step 3 skip option** — Allow new users to bypass data source connection with sample data. Targeting a 10–15% reduction in Step 3 drop-off. [1]\n- **Phase 2 contextual tooltips** — Layer in-app guidance at the 3 highest-friction points identified via Mixpanel funnels. Design discovery starts next week. [2]\n- **Email drip iteration** — Pending Week 5 results; if CTR stays flat, pivot to deep-link strategy with personalized workspace content.',
        citations: [
          { sourceId: 'okr-src-status', quote: 'Step 3 skip option: eng spike approved for Sprint 8. Goal: reduce drop-off by 10-15%.', relevance: 0.89 },
          { sourceId: 'okr-src-4ps-w2', quote: 'Phase 2 contextual tooltips entering design discovery. Target: Sprint 9 implementation.', relevance: 0.84 },
        ],
      },
      {
        heading: '3. Problems (Blockers & Risks)',
        content:
          '> [conflict] **Mixpanel Data Quality** (P0): Ad-blocker interference is causing ~12% of user sessions to go untracked. DAU/WAU and retention metrics may be understated by 5–8%. Server-side tracking spike is scheduled for Sprint 7 but adds 2 weeks to the roadmap. [1]\n\n> [conflict] **Email Drip Underperformance**: Despite strong open rates (34%), click-through to product remains flat at 8%. If Week 5 data confirms this trend, the campaign will need a full content redesign, pushing retention experiment results out by 3–4 weeks. [2]\n\n**Other Risks**\n- **Step 3 complexity for enterprise users** — The skip option may not work for teams with mandatory data source requirements. Need to validate with 2–3 enterprise accounts before rollout.\n- **Tooltip fatigue** — Phase 2 contextual tooltips risk annoying power users. Plan to implement dismissal + "don\'t show again" controls. [3]',
        citations: [
          { sourceId: 'okr-src-4ps-w1', quote: 'Ad-blocker interference affecting ~12% of Mixpanel events. Engineering to evaluate server-side tracking.', relevance: 0.91 },
          { sourceId: 'okr-src-mixpanel', quote: 'Product re-engagement from email cohort: 8.1% CTR, no statistically significant change in 7-day return rate.', relevance: 0.82 },
          { sourceId: 'okr-src-4ps-w2', quote: 'Tooltip implementation to include dismiss controls and frequency caps to avoid power-user fatigue.', relevance: 0.76 },
        ],
      },
      {
        heading: '4. Priorities (Ranked)',
        content:
          '> [recommendation] **(P0) Fix Step 3 drop-off**: This is the single largest lever for activation. The onboarding wizard reduced drop-off from 45% to 38%, but further improvement requires a skip option + simplified connection flow. Estimated impact: +5–8% activation. [1]\n\n> [recommendation] **(P0) Resolve Mixpanel data gaps**: Without reliable metrics, we cannot confidently assess OKR progress or experiment results. Server-side tracking is a prerequisite for all downstream decisions. [2]\n\n> [recommendation] **(P1) Finalize email drip strategy**: Wait for Week 5 data, then either iterate on content or pivot to deep-link approach. Do not extend the test beyond Week 6.\n\n> [recommendation] **(P1) Begin Phase 2 tooltip design**: Start discovery now so implementation can begin in Sprint 9. This builds on wizard momentum and addresses the long tail of in-app friction.\n\n> [recommendation] **(P2) Explore power-user retention loop**: Users who complete 3+ projects in Week 1 have 4x retention. Investigate what drives this behavior and whether it can be nudged. [3]',
        citations: [
          { sourceId: 'okr-src-experiment', quote: 'Step 3 skip option hypothesis: reducing mandatory fields from 5 to 2 could lower drop-off by 10-15%.', relevance: 0.88 },
          { sourceId: 'okr-src-4ps-w1', quote: 'Mixpanel data gap is blocking confident reporting on DAU/WAU and retention metrics.', relevance: 0.9 },
          { sourceId: 'okr-src-mixpanel', quote: 'Users completing 3+ projects in first 7 days show 4.1x higher 30-day retention (82% vs 20%).', relevance: 0.85 },
        ],
      },
    ],
  },
];

export const okrAutodeskData: ProjectData = {
  sources,
  sourceCategories,
  entities,
  entityTypes,
  reports,
  graphNodes: nodes,
  graphEdges: edges,
};
