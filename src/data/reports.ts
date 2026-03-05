import type { Report } from '../types';

export const reports: Report[] = [
  {
    id: 'report',
    title: 'VoC Report',
    type: 'report',
    description: 'Voice of Customer synthesis across all sources',
    sourceCount: 7,
    generatedAt: '2026-03-04T14:30:00Z',
    sections: [
      {
        heading: '1. Executive Summary',
        content:
          'Analysis of 7 sources across customer interviews, support tickets, sales recordings, and internal strategy documents reveals a clear pattern: enterprise customers need faster, self-service onboarding and better data workflows. [1] The strongest signal — appearing in 5 of 7 sources — is that onboarding friction is the primary barrier to expansion revenue.\n\nThree strategic themes emerge: (1) self-serve onboarding as the highest-impact investment, (2) AI-powered automation as a competitive differentiator, and (3) mid-market expansion as the fastest growth vector. [2]',
        citations: [
          {
            sourceId: 'src-joe-autodesk',
            quote: 'We spent three weeks just getting the basic setup done. By that point, half the team had already gone back to spreadsheets.',
            relevance: 0.95,
          },
          {
            sourceId: 'src-vision',
            quote: 'Our north star is reducing time-to-value for enterprise customers from weeks to hours.',
            relevance: 0.9,
          },
        ],
      },
      {
        heading: '2. Top Themes',
        content:
          '**Theme 1: Onboarding Friction (5/7 sources)**\nCustomers consistently report that initial setup is too complex and requires too much hand-holding. The average onboarding time of 3.2 weeks is cited as the #1 reason for delayed expansion deals.\n\n**Theme 2: Data Export Pain (4/7 sources)**\nThe manual CSV export → Excel transform → re-import workflow costs users 2+ hours per report cycle. [1] This is the most frequently mentioned pain point in support tickets.\n\n**Theme 3: Integration Gaps (3/7 sources)**\nCustomers expect native integrations with their existing tool stack (Jira, Zendesk, Confluence). [2] The lack of integrations is a blocker for 40% of enterprise prospects.',
        citations: [
          {
            sourceId: 'src-user-1',
            quote: 'I have to export everything to CSV, clean it up in Excel, and then import it back. Every single week.',
            relevance: 0.92,
          },
          {
            sourceId: 'src-tiago-sosafe',
            quote: 'If it doesn\'t connect to Jira, it\'s a non-starter for our engineering team.',
            relevance: 0.88,
          },
        ],
      },
      {
        heading: '3. Evidence Matrix',
        content:
          '| Theme | Vision | Strategy | Joe | Tiago | User 1 | User 2 | Sales |\n|-------|--------|----------|-----|-------|--------|--------|-------|\n| Onboarding Friction | - | - | Strong | - | Strong | Moderate | Moderate |\n| Data Export Pain | - | Moderate | - | Strong | Strong | Strong | - |\n| Integration Gaps | - | - | Moderate | Strong | Moderate | - | - |\n| Self-serve Need | Strong | Strong | Strong | - | - | - | Moderate |\n| AI Automation | - | Strong | - | Strong | - | - | - |',
        citations: [
          {
            sourceId: 'src-product-strategy',
            quote: 'AI-powered workflow automation is our primary differentiator in the 2026 roadmap.',
            relevance: 0.85,
          },
        ],
      },
      {
        heading: '4. Conflicts & Tensions',
        content:
          '> [conflict] **Usage-based pricing vs. Self-serve onboarding**: The sales team advocates for usage-based pricing to capture more value from heavy users, but this creates friction in the self-serve onboarding flow where customers expect predictable pricing before committing. [1]\n\n> [conflict] **Speed vs. Integration depth**: Customers want deep, native integrations (bi-directional sync with Jira), but the engineering team estimates 3-4 months per integration. Lightweight webhook-based integrations could ship in 2 weeks but won\'t satisfy enterprise requirements.',
        citations: [
          {
            sourceId: 'src-recording-1',
            quote: 'Our best customers would pay 3x more on a usage model, but new customers get scared off by unpredictable costs.',
            relevance: 0.82,
          },
        ],
      },
      {
        heading: '5. Recommended Actions',
        content:
          '> [recommendation] 1. **Invest in self-serve onboarding** (P0) (High impact, High confidence): Build guided setup wizard with template projects and sample data. Target: reduce onboarding from 3+ weeks to 3 days. [1]\n\n> [recommendation] 2. **Automate data export** (P0) (High impact, Medium confidence): Build one-click report generation with scheduled exports. Eliminates the manual CSV workflow.\n\n> [recommendation] 3. **Ship Jira integration first** (P1) (Medium impact, High confidence): Jira is mentioned in every customer interview as the #1 integration request. Start with read-only sync, then expand to bi-directional. [2]\n\n> [recommendation] 4. **Pilot usage-based pricing carefully** (P2) (Medium impact, Low confidence): Run A/B test with 10 accounts before full rollout. Ensure transparent usage dashboards are in place first.',
        citations: [
          {
            sourceId: 'src-joe-autodesk',
            quote: 'If you had a setup wizard that pre-loaded some sample data, I could have been productive on day one.',
            relevance: 0.9,
          },
          {
            sourceId: 'src-tiago-sosafe',
            quote: 'Just seeing my Jira issues inside your tool would save me an hour a day of context switching.',
            relevance: 0.87,
          },
        ],
      },
    ],
  },
  {
    id: 'prd',
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
    id: 'business-case',
    title: 'Business Case',
    type: 'business-case',
    description: 'ROI analysis for self-serve onboarding investment',
    sourceCount: 7,
    generatedAt: '2026-03-04T14:30:00Z',
    sections: [
      {
        heading: '1. Investment Summary',
        content:
          'Investing in self-serve onboarding addresses our highest-impact customer pain point and directly enables the mid-market expansion strategy. Based on current metrics and customer feedback analysis, this investment has a projected 8-month payback period.',
        citations: [],
      },
      {
        heading: '2. Financial Impact',
        content:
          '[metric: Incremental ARR (Y1) | $2.4M]\n[metric: CSM Savings | $180K/yr]\n[metric: Support Savings | $60K/yr]\n[metric: Payback Period | 8 months]\n\n**Revenue Impact**\n- 35% increase in conversion rate from trial to paid (faster time-to-value)\n- 20% increase in expansion revenue (lower friction to add seats)\n- Estimated $2.4M incremental ARR in Year 1\n\n**Cost Reduction**\n- 60% reduction in CSM onboarding hours ($180K/year savings)\n- 40% reduction in onboarding-related support tickets ($60K/year savings)\n\n**Investment Required**\n- Engineering: 2 engineers x 3 months\n- Design: 1 designer x 2 months\n- Total estimated cost: $350K',
        citations: [],
      },
      {
        heading: '3. Risk Assessment',
        content:
          '**Low Risk**: Template projects may not cover all use cases — mitigated by starting with 3 most common industry templates.\n\n**Medium Risk**: Self-serve may reduce perceived value of premium onboarding service — mitigated by positioning premium onboarding as "accelerated" rather than "necessary."\n\n**Low Risk**: Engineering timeline may extend — mitigated by phased rollout starting with wizard-only in Phase 1.',
        citations: [],
      },
    ],
  },
];
