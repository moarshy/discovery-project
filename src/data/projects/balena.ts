import type { ProjectData } from '../project-data-types';
import type { Source, SourceCategory, ExtractedEntity, EntityType, Report, GraphEdge } from '../../types';
import { buildGraphData } from '../../lib/graph-utils';

const sources: Source[] = [
  // Interviews (5)
  { id: 'bal-src-interview-1', name: 'Interview — Fleet Manager', category: 'interviews', type: 'Interview transcript', icon: 'FileText', integrationId: 'google-drive' },
  { id: 'bal-src-interview-2', name: 'Interview — DevRel Lead', category: 'interviews', type: 'Interview transcript', icon: 'FileText', integrationId: 'google-drive' },
  { id: 'bal-src-interview-3', name: 'Interview — Enterprise Customer', category: 'interviews', type: 'Interview transcript', icon: 'FileText', integrationId: 'google-drive' },
  { id: 'bal-src-interview-4', name: 'Interview — Startup CTO', category: 'interviews', type: 'Interview transcript', icon: 'FileText', integrationId: 'google-drive' },
  { id: 'bal-src-interview-5', name: 'Interview — Community Leader', category: 'interviews', type: 'Interview transcript', icon: 'FileText', integrationId: 'google-drive' },
  // Discord (2)
  { id: 'bal-src-discord-support', name: 'Discord #support', category: 'discord', type: 'Discord channel', icon: 'MessageSquare', integrationId: 'discord' },
  { id: 'bal-src-discord-features', name: 'Discord #feature-requests', category: 'discord', type: 'Discord channel', icon: 'MessageSquare', integrationId: 'discord' },
  // Sales (1)
  { id: 'bal-src-sales-1', name: 'Sales Call — Enterprise Prospect', category: 'sales', type: 'Call transcript', icon: 'FileText', integrationId: 'google-drive' },
  // Strategy (2)
  { id: 'bal-src-ceo-memo', name: 'CEO Rebrand Memo', category: 'strategy', type: 'Strategy document', icon: 'FileText', integrationId: 'confluence' },
  { id: 'bal-src-okrs', name: 'Product Strategy & OKRs', category: 'strategy', type: 'Strategy document', icon: 'FileText', integrationId: 'confluence' },
  // Surveys (1)
  { id: 'bal-src-nps', name: 'NPS/CSAT Survey Q1', category: 'surveys', type: 'Survey data', icon: 'BarChart3', integrationId: 'airtable' },
];

const sourceCategories: SourceCategory[] = [
  { id: 'interviews', label: 'Interview Transcripts', sources: sources.filter((s) => s.category === 'interviews') },
  { id: 'discord', label: 'Discord Channels', sources: sources.filter((s) => s.category === 'discord') },
  { id: 'sales', label: 'Sales Calls', sources: sources.filter((s) => s.category === 'sales') },
  { id: 'strategy', label: 'Strategy Documents', sources: sources.filter((s) => s.category === 'strategy') },
  { id: 'surveys', label: 'Surveys', sources: sources.filter((s) => s.category === 'surveys') },
];

const entities: ExtractedEntity[] = [
  // Themes (6)
  { id: 'bal-ent-dev-first', name: 'Developer-first identity', type: 'theme', description: 'Balena\'s core identity is built around making IoT development accessible to software developers.', sourceRefs: ['bal-src-interview-1', 'bal-src-interview-2', 'bal-src-interview-5'] },
  { id: 'bal-ent-open-source', name: 'Open-source commitment', type: 'theme', description: 'Strong brand association with open-source values and community-driven development.', sourceRefs: ['bal-src-interview-2', 'bal-src-interview-5', 'bal-src-discord-features'] },
  { id: 'bal-ent-enterprise-pivot', name: 'Enterprise pivot tension', type: 'theme', description: 'Growing pressure to serve enterprise customers while maintaining developer community roots.', sourceRefs: ['bal-src-interview-1', 'bal-src-interview-3', 'bal-src-ceo-memo'] },
  { id: 'bal-ent-onboarding-gap', name: 'Onboarding gap', type: 'theme', description: 'Post-setup abandonment: users complete initial setup but fail to reach second deployment. Activation drops off after first device.', sourceRefs: ['bal-src-discord-support', 'bal-src-nps', 'bal-src-interview-4'] },
  { id: 'bal-ent-docker-confusion', name: 'Docker migration confusion', type: 'theme', description: 'Unclear migration path from Docker Compose to balena — users don\'t understand what changes, what stays, and what breaks.', sourceRefs: ['bal-src-discord-support', 'bal-src-discord-features', 'bal-src-interview-3'] },
  { id: 'bal-ent-invisible-cs', name: 'Invisible CS friction', type: 'theme', description: 'Customer problems raised in Discord never reach the product team. Support friction is invisible to decision-makers.', sourceRefs: ['bal-src-discord-support', 'bal-src-interview-2', 'bal-src-nps'] },

  // Brand Values (3)
  { id: 'bal-ent-simplicity', name: 'Simplicity', type: 'brand-value', description: 'Making complex IoT infrastructure feel simple and approachable for developers.', sourceRefs: ['bal-src-interview-1', 'bal-src-interview-2'] },
  { id: 'bal-ent-transparency', name: 'Transparency', type: 'brand-value', description: 'Open roadmap, public postmortems, and honest communication about product limitations.', sourceRefs: ['bal-src-interview-2', 'bal-src-interview-5'] },
  { id: 'bal-ent-community', name: 'Community', type: 'brand-value', description: 'Fostering a supportive developer community through forums, events, and open-source contributions.', sourceRefs: ['bal-src-interview-5', 'bal-src-discord-features'] },

  // Customer Perceptions (2)
  { id: 'bal-ent-reliable', name: '"Reliable but slow-moving"', type: 'customer-perception', description: 'Customers trust balena for production workloads but feel feature development is too slow.', sourceRefs: ['bal-src-nps', 'bal-src-discord-features'] },
  { id: 'bal-ent-niche', name: '"Niche IoT tool"', type: 'customer-perception', description: 'Some customers see balena as only for Raspberry Pi hobbyists rather than enterprise IoT.', sourceRefs: ['bal-src-nps', 'bal-src-sales-1'] },

  // Vocabulary Terms (6)
  { id: 'bal-ent-fleet', name: 'Fleet (internal) vs Devices (customer)', type: 'vocabulary', description: 'Internal team says "fleet management" but customers say "managing my devices."', sourceRefs: ['bal-src-interview-1', 'bal-src-discord-support'] },
  { id: 'bal-ent-release', name: 'Release (internal) vs Deploy (customer)', type: 'vocabulary', description: 'Engineering uses "release" but customers naturally say "deploy" or "push."', sourceRefs: ['bal-src-interview-2', 'bal-src-discord-support'] },
  { id: 'bal-ent-supervisor', name: 'Supervisor vs Agent', type: 'vocabulary', description: 'The "balena supervisor" component is confusing — customers expect "agent" terminology from other tools.', sourceRefs: ['bal-src-discord-support', 'bal-src-interview-3'] },
  { id: 'bal-ent-health-check', name: '"Health check" vs Diagnostics run', type: 'vocabulary', description: 'Customers say "health check" but the product calls it "diagnostics run." Mismatch causes confusion in docs and support.', sourceRefs: ['bal-src-discord-support', 'bal-src-nps'] },
  { id: 'bal-ent-old-way', name: '"The old way" vs Docker Compose workflow', type: 'vocabulary', description: 'Customers refer to their pre-balena setup as "the old way" — the product lacks a clear migration narrative.', sourceRefs: ['bal-src-discord-features', 'bal-src-interview-4'] },
  { id: 'bal-ent-dashboard', name: '"The dashboard" vs balenaCloud console', type: 'vocabulary', description: 'Customers universally say "the dashboard" while marketing says "balenaCloud console." Docs use both inconsistently.', sourceRefs: ['bal-src-discord-support', 'bal-src-interview-3', 'bal-src-nps'] },

  // Tensions (4)
  { id: 'bal-ent-oss-vs-enterprise', name: 'Open-source vs Enterprise features', type: 'tension', description: 'Pressure to gate advanced features behind enterprise pricing while maintaining OSS credibility.', sourceRefs: ['bal-src-interview-1', 'bal-src-interview-5', 'bal-src-ceo-memo'] },
  { id: 'bal-ent-simple-vs-powerful', name: 'Simplicity vs Power', type: 'tension', description: 'Developer simplicity brand clashes with enterprise needs for granular control and compliance.', sourceRefs: ['bal-src-interview-1', 'bal-src-interview-3'] },
  { id: 'bal-ent-rebrand-vs-perception', name: 'CEO rebrand vision vs customer perception', type: 'tension', description: 'CEO wants "enterprise infrastructure platform" positioning but customers still see "cool IoT hobby tool." The gap is wider than leadership thinks.', sourceRefs: ['bal-src-ceo-memo', 'bal-src-nps', 'bal-src-sales-1'] },
  { id: 'bal-ent-sales-vs-support', name: 'Sales narrative vs support reality', type: 'tension', description: 'Sales promises "easy Docker migration in days" but support reality is 2-3 weeks of friction. Discord is full of frustrated migrators.', sourceRefs: ['bal-src-sales-1', 'bal-src-discord-support', 'bal-src-interview-3'] },

  // Personas (3)
  { id: 'bal-ent-enterprise-devops', name: 'Enterprise DevOps', type: 'persona', description: 'DevOps engineers managing 10K+ devices in production. Need SLAs, audit logs, and enterprise SSO. Evaluate balena against AWS IoT and Azure.', sourceRefs: ['bal-src-interview-3', 'bal-src-sales-1', 'bal-src-interview-1'] },
  { id: 'bal-ent-startup-cto', name: 'Startup CTO', type: 'persona', description: 'Technical co-founders building IoT products. Fast prototyping, cost-sensitive, want to go from idea to fleet in weeks not months.', sourceRefs: ['bal-src-interview-4', 'bal-src-discord-features'] },
  { id: 'bal-ent-hobbyist', name: 'Hobbyist Maker', type: 'persona', description: 'Individual developers experimenting with Raspberry Pi and similar boards. Community-driven, price-sensitive, shares projects on forums.', sourceRefs: ['bal-src-interview-5', 'bal-src-discord-support', 'bal-src-discord-features'] },
];

const entityTypes: EntityType[] = [
  { id: 'theme', label: 'Themes/Topics', color: '#6366F1', entities: entities.filter((e) => e.type === 'theme') },
  { id: 'brand-value', label: 'Brand Values', color: '#84CC16', entities: entities.filter((e) => e.type === 'brand-value') },
  { id: 'customer-perception', label: 'Customer Perceptions', color: '#FB923C', entities: entities.filter((e) => e.type === 'customer-perception') },
  { id: 'vocabulary', label: 'Vocabulary Terms', color: '#06B6D4', entities: entities.filter((e) => e.type === 'vocabulary') },
  { id: 'tension', label: 'Tensions', color: '#F43F5E', entities: entities.filter((e) => e.type === 'tension') },
  { id: 'persona', label: 'Personas', color: '#EC4899', entities: entities.filter((e) => e.type === 'persona') },
];

const crossEdges: GraphEdge[] = [
  // Theme → Brand Value connections
  { source: 'bal-ent-dev-first', target: 'bal-ent-simplicity', relationship: 'supports', weight: 0.8 },
  { source: 'bal-ent-open-source', target: 'bal-ent-transparency', relationship: 'supports', weight: 0.7 },
  { source: 'bal-ent-open-source', target: 'bal-ent-community', relationship: 'supports', weight: 0.6 },
  // Theme → Tension connections
  { source: 'bal-ent-enterprise-pivot', target: 'bal-ent-oss-vs-enterprise', relationship: 'supports', weight: 0.9 },
  { source: 'bal-ent-enterprise-pivot', target: 'bal-ent-simple-vs-powerful', relationship: 'supports', weight: 0.8 },
  { source: 'bal-ent-docker-confusion', target: 'bal-ent-sales-vs-support', relationship: 'supports', weight: 0.85 },
  { source: 'bal-ent-invisible-cs', target: 'bal-ent-onboarding-gap', relationship: 'related', weight: 0.7 },
  // Perception → Theme connections
  { source: 'bal-ent-niche', target: 'bal-ent-enterprise-pivot', relationship: 'related', weight: 0.6 },
  { source: 'bal-ent-niche', target: 'bal-ent-rebrand-vs-perception', relationship: 'supports', weight: 0.75 },
  // Persona → Theme connections
  { source: 'bal-ent-hobbyist', target: 'bal-ent-dev-first', relationship: 'related', weight: 0.5 },
  { source: 'bal-ent-enterprise-devops', target: 'bal-ent-enterprise-pivot', relationship: 'related', weight: 0.7 },
  { source: 'bal-ent-startup-cto', target: 'bal-ent-onboarding-gap', relationship: 'related', weight: 0.6 },
  // Tension ↔ Tension contradictions
  { source: 'bal-ent-rebrand-vs-perception', target: 'bal-ent-sales-vs-support', relationship: 'related', weight: 0.8 },
  // Vocabulary → Brand Value contradictions
  { source: 'bal-ent-fleet', target: 'bal-ent-simplicity', relationship: 'contradicts', weight: 0.5 },
  { source: 'bal-ent-old-way', target: 'bal-ent-docker-confusion', relationship: 'supports', weight: 0.65 },
];

const { nodes, edges } = buildGraphData(sources, entities, entityTypes, crossEdges);

const reports: Report[] = [
  {
    id: 'bal-vocab',
    title: 'Vocabulary Map',
    type: 'vocabulary-map',
    description: 'Internal vs customer vs brand language mapping',
    sourceCount: 11,
    generatedAt: '2026-03-04T14:30:00Z',
    sections: [
      {
        heading: '1. Language Gap Analysis',
        content:
          'Analysis of interview transcripts, Discord channels, sales calls, and NPS survey data reveals significant vocabulary mismatches that create confusion and reduce brand clarity. [1]\n\nThe most impactful gaps are around core product concepts where internal jargon doesn\'t match how customers naturally describe the same things. Discord #support alone surfaces 3 distinct vocabulary mismatches weekly. [2]',
        citations: [
          { sourceId: 'bal-src-interview-2', quote: 'We use completely different words than our users. They say "deploy", we say "release". They say "dashboard", we say "console".', relevance: 0.92 },
          { sourceId: 'bal-src-discord-support', quote: 'How do I run a health check on my device? I can\'t find it anywhere in the dashboard.', relevance: 0.88 },
        ],
      },
      {
        heading: '2. Vocabulary Mapping',
        content:
          '| Concept | Internal Term | Customer Term | Brand Recommendation |\n|---------|--------------|---------------|---------------------|\n| Device group | Fleet | My devices | Fleet (with onboarding) |\n| Code update | Release | Deploy / Push | Deploy |\n| On-device agent | Supervisor | Agent | Agent |\n| Device status | Diagnostics run | Health check | Health check |\n| Pre-balena setup | Docker Compose workflow | "The old way" | Migration path |\n| Web interface | balenaCloud console | "The dashboard" | Dashboard |\n| IoT gateway | Edge node | Hub / Gateway | Gateway |\n| Container group | Service | App | Application |',
        citations: [],
      },
      {
        heading: '3. Recommendations',
        content:
          '> [recommendation] 1. **Adopt customer vocabulary in UI and docs** (P0) (High impact, High confidence): Replace "release" with "deploy", "supervisor" with "agent", and "diagnostics run" with "health check" across all customer-facing surfaces. [1]\n\n> [recommendation] 2. **Keep "fleet" but add contextual explanation** (P1) (Medium impact, Medium confidence): "Fleet" is a strong brand differentiator but needs onboarding context for new users.\n\n> [recommendation] 3. **Standardize on "dashboard"** (P1) (Medium impact, High confidence): Customers already call it "the dashboard" — stop fighting it. Update docs and marketing to match. [2]\n\n> [recommendation] 4. **Create glossary for internal alignment** (P2) (Low impact, High confidence): Shared vocabulary document to prevent further drift between teams.',
        citations: [
          { sourceId: 'bal-src-interview-2', quote: 'We should speak the same language as our users. If they say deploy, we should say deploy.', relevance: 0.88 },
          { sourceId: 'bal-src-nps', quote: 'The docs are confusing — sometimes it says "console", sometimes "dashboard". I never know if they mean the same thing.', relevance: 0.82 },
        ],
      },
    ],
  },
  {
    id: 'bal-strategy',
    title: 'Brand Strategy Report',
    type: 'brand-strategy',
    description: 'Brand positioning, messaging pillars, and strategic recommendations',
    sourceCount: 11,
    generatedAt: '2026-03-04T14:30:00Z',
    sections: [
      {
        heading: '1. Brand Findings',
        content:
          'Balena\'s brand rests on three pillars: **developer-first simplicity**, **open-source commitment**, and **community trust**. These are genuine strengths validated across all 11 sources including interviews, Discord channels, and NPS data. [1]\n\nHowever, the brand is under strain as the company pivots toward enterprise customers. The CEO\'s rebrand memo envisions "enterprise infrastructure platform" but NPS data shows customers still describe balena as a "cool Raspberry Pi tool." The gap between aspiration and perception is wider than leadership assumes. [2] [3]',
        citations: [
          { sourceId: 'bal-src-interview-1', quote: 'Our brand promise is simple: we make IoT as easy as deploying a web app. That resonates, but enterprises need more than easy.', relevance: 0.93 },
          { sourceId: 'bal-src-ceo-memo', quote: 'We need to reposition balena as the enterprise infrastructure platform for edge computing. The Raspberry Pi hobbyist perception is holding us back.', relevance: 0.91 },
          { sourceId: 'bal-src-nps', quote: 'I love balena for my Pi projects but I wouldn\'t pitch it to my CTO for production fleet management.', relevance: 0.88 },
        ],
      },
      {
        heading: '2. Positioning Statement',
        content:
          '**Current**: "balena makes it simple to deploy and manage IoT fleets"\n\n**CEO Target**: "balena is the enterprise infrastructure platform for edge computing"\n\n**Proposed (bridging)**: "balena is the infrastructure platform that lets teams deploy, manage, and update IoT devices at any scale — from prototype to production"\n\nThe shift adds three key signals: **infrastructure** (enterprise-grade), **teams** (not just individual developers), and **any scale** (from hobby to production). This bridges the CEO\'s ambition with the community\'s reality rather than abandoning the developer audience.',
        citations: [],
      },
      {
        heading: '3. Messaging Pillars',
        content:
          '**Pillar 1: From Prototype to Production**\nbalena grows with you — start with one device on your desk, scale to ten thousand in the field.\n\n**Pillar 2: Developer Experience, Enterprise Grade**\nThe tools developers love (git push, Docker) with the reliability, security, and compliance enterprises require.\n\n**Pillar 3: Open by Design**\nBuilt on open-source foundations with transparent pricing, public roadmap, and community-driven features.',
        citations: [],
      },
      {
        heading: '4. Recommendations',
        content:
          '> [recommendation] 1. **Refresh homepage messaging around "any scale"** (P0) (High impact, High confidence): Replace hobby-focused hero with production deployment imagery and metrics. Reference enterprise prospect expectations from sales calls. [1]\n\n> [recommendation] 2. **Create enterprise landing page** (P0) (High impact, Medium confidence): Dedicated page addressing compliance, SLA, and team management — separate from developer docs. Enterprise prospects need to see this before procurement. [2]\n\n> [recommendation] 3. **Rebrand "Supervisor" to "Agent"** (P1) (Medium impact, High confidence): Align with industry-standard terminology used by competitors and customers.\n\n> [recommendation] 4. **Publish "From Pi to Production" case study** (P1) (Medium impact, Medium confidence): Show the journey from prototype to scaled deployment to bridge the hobbyist/enterprise perception gap.\n\n> [recommendation] 5. **Address NPS perception gap before rebrand launch** (P0) (High impact, High confidence): NPS data shows customers don\'t yet see balena as enterprise-grade. Rebrand without product-level changes will feel inauthentic. [3]',
        citations: [
          { sourceId: 'bal-src-sales-1', quote: 'The prospect asked: where are your compliance certifications? We didn\'t have an answer. That\'s table stakes for enterprise.', relevance: 0.87 },
          { sourceId: 'bal-src-interview-3', quote: 'We evaluated balena against AWS IoT Core. The developer experience is better but we need SLAs and audit logs before we can commit.', relevance: 0.85 },
          { sourceId: 'bal-src-nps', quote: 'Score: 6. Great for prototyping, not sure I\'d bet my production fleet on it yet.', relevance: 0.84 },
        ],
      },
    ],
  },
  {
    id: 'bal-tensions',
    title: 'Tensions Report',
    type: 'tensions-report',
    description: 'Analysis of strategic tensions between vision, sales, and support perspectives',
    sourceCount: 11,
    generatedAt: '2026-03-04T14:30:00Z',
    sections: [
      {
        heading: '1. Open-Source vs Enterprise Features',
        content:
          '> [conflict] **Brand promise vs revenue model**: The community expects all core features to be open-source, but the enterprise sales team needs feature differentiation to justify pricing tiers. This tension is unresolved and creating internal friction. [1]\n\n> [conflict] **Community trust at risk**: Gating fleet management behind enterprise pricing would alienate the developer community that built balena\'s reputation. But without differentiation, enterprise deals stall. [2]',
        citations: [
          { sourceId: 'bal-src-interview-5', quote: 'The community built balena\'s reputation. If we start gating features, we lose the thing that makes us different from AWS IoT.', relevance: 0.90 },
          { sourceId: 'bal-src-ceo-memo', quote: 'We need a clear commercial tier. Enterprise customers expect to pay for premium features — they\'re suspicious when everything is free.', relevance: 0.88 },
        ],
      },
      {
        heading: '2. Simplicity vs Power',
        content:
          '> [conflict] **Developer simplicity vs enterprise control**: balena promises "simplicity" but enterprise customers report a steep learning curve for fleet management at scale. The simple onboarding works for 1-10 devices but breaks down at 100+. [1]\n\n> [conflict] **Progressive complexity gap**: There\'s no middle ground in the product — it\'s either "beginner simple" or "read the API docs." Enterprise DevOps engineers need granular control without losing the developer-friendly surface.',
        citations: [
          { sourceId: 'bal-src-interview-1', quote: 'Simplicity at small scale doesn\'t automatically translate to simplicity at large scale. We need to be honest about that.', relevance: 0.9 },
        ],
      },
      {
        heading: '3. CEO Rebrand Vision vs Customer Perception',
        content:
          '> [conflict] **Aspiration vs reality**: The CEO envisions "enterprise infrastructure platform" but NPS data and Discord conversations show customers still see balena as a hobby/prototyping tool. The perception gap is significant. [1] [2]\n\n> [conflict] **Premature rebrand risk**: Launching a rebrand before the product delivers enterprise-grade features (SLAs, audit logs, SSO) will feel hollow. Customers will see marketing language that doesn\'t match their experience.',
        citations: [
          { sourceId: 'bal-src-ceo-memo', quote: 'We need to reposition balena as the enterprise infrastructure platform for edge computing.', relevance: 0.91 },
          { sourceId: 'bal-src-nps', quote: 'Score: 7. Love it for hobby projects. Would need to see a lot more before using in production at my company.', relevance: 0.86 },
        ],
      },
      {
        heading: '4. Sales Narrative vs Support Reality',
        content:
          '> [conflict] **Easy migration promise**: Sales positions Docker migration as "a few days" but Discord #support is full of users stuck in 2-3 week migration struggles. The gap between sales narrative and support reality erodes trust. [1] [2]\n\n> [conflict] **Invisible friction loop**: Frustrated migrators complain in Discord, but this feedback never reaches the sales team or product roadmap. Sales continues making the same promises.',
        citations: [
          { sourceId: 'bal-src-sales-1', quote: 'We told the prospect migration from Docker Compose takes about 2 days. It\'s essentially the same workflow.', relevance: 0.89 },
          { sourceId: 'bal-src-discord-support', quote: 'Day 12 of trying to migrate my Docker Compose setup. The multi-container networking is completely different and barely documented.', relevance: 0.93 },
        ],
      },
      {
        heading: '5. Resolution Paths',
        content:
          '> [recommendation] **Tension 1 — OSS vs Enterprise**: Adopt "open core" model explicitly. Core platform stays open, enterprise features (SSO, audit logs, SLA) are commercial. Be transparent about the boundary.\n\n> [recommendation] **Tension 2 — Simplicity vs Power**: Invest in "progressive complexity" UI — simple defaults with power-user overrides. Keep the first 10 minutes simple, reveal advanced features contextually.\n\n> [recommendation] **Tension 3 — Rebrand vs Perception**: Close the perception gap before launching the rebrand. Ship enterprise features first, gather evidence of enterprise adoption, then rebrand from a position of proof.\n\n> [recommendation] **Tension 4 — Sales vs Support**: Create a migration reality doc for sales. Build a dedicated migration wizard in-product. Route Discord #support migration threads to a Jira board so product sees the friction.',
        citations: [],
      },
    ],
  },
];

export const balenaData: ProjectData = {
  sources,
  sourceCategories,
  entities,
  entityTypes,
  reports,
  graphNodes: nodes,
  graphEdges: edges,
};
