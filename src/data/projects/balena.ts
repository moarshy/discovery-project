import type { ProjectData } from '../project-data-types';
import type { Source, SourceCategory, ExtractedEntity, EntityType, Report, GraphEdge } from '../../types';
import { buildGraphData } from '../../lib/graph-utils';

const sources: Source[] = [
  { id: 'bal-src-interview-1', name: 'Interview — CTO', category: 'interviews', type: 'Interview transcript', icon: 'FileText', integrationId: 'google-drive' },
  { id: 'bal-src-interview-2', name: 'Interview — Head of DevRel', category: 'interviews', type: 'Interview transcript', icon: 'FileText', integrationId: 'google-drive' },
  { id: 'bal-src-tickets', name: 'Support Tickets Q1', category: 'support', type: 'Support tickets', icon: 'TicketCheck', integrationId: 'intercom' },
  { id: 'bal-src-slack-1', name: 'Slack #brand-strategy', category: 'discussions', type: 'Slack thread', icon: 'MessageSquare', integrationId: 'slack' },
  { id: 'bal-src-slack-2', name: 'Slack #customer-feedback', category: 'discussions', type: 'Slack thread', icon: 'MessageSquare', integrationId: 'slack' },
];

const sourceCategories: SourceCategory[] = [
  { id: 'interviews', label: 'Interview Transcripts', sources: sources.filter((s) => s.category === 'interviews') },
  { id: 'support', label: 'Support', sources: sources.filter((s) => s.category === 'support') },
  { id: 'discussions', label: 'Discussions', sources: sources.filter((s) => s.category === 'discussions') },
];

const entities: ExtractedEntity[] = [
  // Themes
  { id: 'bal-ent-dev-first', name: 'Developer-first identity', type: 'theme', description: 'Balena\'s core identity is built around making IoT development accessible to software developers.', sourceRefs: ['bal-src-interview-1', 'bal-src-interview-2', 'bal-src-slack-1'] },
  { id: 'bal-ent-open-source', name: 'Open-source commitment', type: 'theme', description: 'Strong brand association with open-source values and community-driven development.', sourceRefs: ['bal-src-interview-2', 'bal-src-slack-1'] },
  { id: 'bal-ent-enterprise-pivot', name: 'Enterprise pivot tension', type: 'theme', description: 'Growing pressure to serve enterprise customers while maintaining developer community roots.', sourceRefs: ['bal-src-interview-1', 'bal-src-slack-1', 'bal-src-slack-2'] },
  // Brand Values
  { id: 'bal-ent-simplicity', name: 'Simplicity', type: 'brand-value', description: 'Making complex IoT infrastructure feel simple and approachable for developers.', sourceRefs: ['bal-src-interview-1', 'bal-src-interview-2'] },
  { id: 'bal-ent-transparency', name: 'Transparency', type: 'brand-value', description: 'Open roadmap, public postmortems, and honest communication about product limitations.', sourceRefs: ['bal-src-interview-2', 'bal-src-slack-1'] },
  { id: 'bal-ent-community', name: 'Community', type: 'brand-value', description: 'Fostering a supportive developer community through forums, events, and open-source contributions.', sourceRefs: ['bal-src-slack-1', 'bal-src-slack-2'] },
  // Customer Perceptions
  { id: 'bal-ent-reliable', name: '"Reliable but slow-moving"', type: 'customer-perception', description: 'Customers trust balena for production workloads but feel feature development is too slow.', sourceRefs: ['bal-src-tickets', 'bal-src-slack-2'] },
  { id: 'bal-ent-niche', name: '"Niche IoT tool"', type: 'customer-perception', description: 'Some customers see balena as only for Raspberry Pi hobbyists rather than enterprise IoT.', sourceRefs: ['bal-src-tickets', 'bal-src-slack-2'] },
  // Vocabulary Terms
  { id: 'bal-ent-fleet', name: 'Fleet (internal) vs Devices (customer)', type: 'vocabulary', description: 'Internal team says "fleet management" but customers say "managing my devices."', sourceRefs: ['bal-src-interview-1', 'bal-src-tickets'] },
  { id: 'bal-ent-release', name: 'Release (internal) vs Deploy (customer)', type: 'vocabulary', description: 'Engineering uses "release" but customers naturally say "deploy" or "push."', sourceRefs: ['bal-src-interview-2', 'bal-src-tickets'] },
  { id: 'bal-ent-supervisor', name: 'Supervisor vs Agent', type: 'vocabulary', description: 'The "balena supervisor" component is confusing — customers expect "agent" terminology from other tools.', sourceRefs: ['bal-src-tickets', 'bal-src-slack-2'] },
  // Tensions
  { id: 'bal-ent-oss-vs-enterprise', name: 'Open-source vs Enterprise features', type: 'tension', description: 'Pressure to gate advanced features behind enterprise pricing while maintaining OSS credibility.', sourceRefs: ['bal-src-interview-1', 'bal-src-slack-1'] },
  { id: 'bal-ent-simple-vs-powerful', name: 'Simplicity vs Power', type: 'tension', description: 'Developer simplicity brand clashes with enterprise needs for granular control and compliance.', sourceRefs: ['bal-src-interview-1', 'bal-src-interview-2'] },
  // Personas
  { id: 'bal-ent-hobbyist', name: 'IoT Hobbyist', type: 'persona', description: 'Individual developers experimenting with IoT projects on Raspberry Pi and similar boards.', sourceRefs: ['bal-src-slack-2', 'bal-src-tickets'] },
  { id: 'bal-ent-iot-lead', name: 'IoT Platform Lead', type: 'persona', description: 'Engineering leads responsible for deploying and managing 1000+ devices in production.', sourceRefs: ['bal-src-interview-1', 'bal-src-interview-2'] },
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
  { source: 'bal-ent-dev-first', target: 'bal-ent-simplicity', relationship: 'supports', weight: 0.8 },
  { source: 'bal-ent-open-source', target: 'bal-ent-transparency', relationship: 'supports', weight: 0.7 },
  { source: 'bal-ent-enterprise-pivot', target: 'bal-ent-oss-vs-enterprise', relationship: 'supports', weight: 0.9 },
  { source: 'bal-ent-enterprise-pivot', target: 'bal-ent-simple-vs-powerful', relationship: 'supports', weight: 0.8 },
  { source: 'bal-ent-niche', target: 'bal-ent-enterprise-pivot', relationship: 'related', weight: 0.6 },
  { source: 'bal-ent-hobbyist', target: 'bal-ent-dev-first', relationship: 'related', weight: 0.5 },
  { source: 'bal-ent-iot-lead', target: 'bal-ent-enterprise-pivot', relationship: 'related', weight: 0.7 },
  { source: 'bal-ent-fleet', target: 'bal-ent-simplicity', relationship: 'contradicts', weight: 0.5 },
  { source: 'bal-ent-community', target: 'bal-ent-open-source', relationship: 'supports', weight: 0.6 },
];

const { nodes, edges } = buildGraphData(sources, entities, entityTypes, crossEdges);

const reports: Report[] = [
  {
    id: 'bal-vocab',
    title: 'Vocabulary Map',
    type: 'vocabulary-map',
    description: 'Internal vs customer vs brand language mapping',
    sourceCount: 5,
    generatedAt: '2026-03-04T14:30:00Z',
    sections: [
      {
        heading: '1. Language Gap Analysis',
        content:
          'Analysis of internal communications, customer support tickets, and marketing materials reveals significant vocabulary mismatches that create confusion and reduce brand clarity. [1]\n\nThe most impactful gaps are around core product concepts where internal jargon doesn\'t match how customers naturally describe the same things.',
        citations: [
          { sourceId: 'bal-src-tickets', quote: 'I can\'t find where to deploy my app. The docs keep talking about "releases" but I just want to push my code.', relevance: 0.92 },
        ],
      },
      {
        heading: '2. Vocabulary Mapping',
        content:
          '| Concept | Internal Term | Customer Term | Brand Recommendation |\n|---------|--------------|---------------|---------------------|\n| Device group | Fleet | My devices | Fleet (with onboarding) |\n| Code update | Release | Deploy / Push | Deploy |\n| On-device agent | Supervisor | Agent | Agent |\n| IoT gateway | Edge node | Hub / Gateway | Gateway |\n| Container group | Service | App | Application |',
        citations: [],
      },
      {
        heading: '3. Recommendations',
        content:
          '> [recommendation] 1. **Adopt customer vocabulary in UI and docs** (P0) (High impact, High confidence): Replace "release" with "deploy" and "supervisor" with "agent" across all customer-facing surfaces. [1]\n\n> [recommendation] 2. **Keep "fleet" but add contextual explanation** (P1) (Medium impact, Medium confidence): "Fleet" is a strong brand differentiator but needs onboarding context for new users.\n\n> [recommendation] 3. **Create glossary for internal alignment** (P2) (Low impact, High confidence): Shared vocabulary document to prevent further drift between teams.',
        citations: [
          { sourceId: 'bal-src-interview-2', quote: 'We should speak the same language as our users. If they say deploy, we should say deploy.', relevance: 0.88 },
        ],
      },
    ],
  },
  {
    id: 'bal-strategy',
    title: 'Brand Strategy Report',
    type: 'brand-strategy',
    description: 'Brand positioning, messaging pillars, and strategic recommendations',
    sourceCount: 5,
    generatedAt: '2026-03-04T14:30:00Z',
    sections: [
      {
        heading: '1. Brand Findings',
        content:
          'Balena\'s brand rests on three pillars: **developer-first simplicity**, **open-source commitment**, and **community trust**. These are genuine strengths validated across all 5 sources. [1]\n\nHowever, the brand is under strain as the company pivots toward enterprise customers. The "IoT for developers" positioning is too narrow for the enterprise audience while simultaneously being too broad for hobbyists who want specific board support. [2]',
        citations: [
          { sourceId: 'bal-src-interview-1', quote: 'Our brand promise is simple: we make IoT as easy as deploying a web app. That resonates, but enterprises need more than easy.', relevance: 0.93 },
          { sourceId: 'bal-src-slack-2', quote: 'Customer: "Is balena for serious production use or is it a Raspberry Pi hobby thing?" — this keeps coming up.', relevance: 0.88 },
        ],
      },
      {
        heading: '2. Positioning Statement',
        content:
          '**Current**: "balena makes it simple to deploy and manage IoT fleets"\n\n**Proposed**: "balena is the infrastructure platform that lets teams deploy, manage, and update IoT devices at any scale — from prototype to production"\n\nThe shift adds three key signals: **infrastructure** (enterprise-grade), **teams** (not just individual developers), and **any scale** (from hobby to production).',
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
          '> [recommendation] 1. **Refresh homepage messaging around "any scale"** (P0) (High impact, High confidence): Replace hobby-focused hero with production deployment imagery and metrics.\n\n> [recommendation] 2. **Create enterprise landing page** (P0) (High impact, Medium confidence): Dedicated page addressing compliance, SLA, and team management — separate from developer docs.\n\n> [recommendation] 3. **Rebrand "Supervisor" to "Agent"** (P1) (Medium impact, High confidence): Align with industry-standard terminology used by competitors and customers.\n\n> [recommendation] 4. **Publish "From Pi to Production" case study** (P1) (Medium impact, Medium confidence): Show the journey from prototype to scaled deployment to bridge the hobbyist/enterprise perception gap.',
        citations: [],
      },
    ],
  },
  {
    id: 'bal-tensions',
    title: 'Tensions Report',
    type: 'tensions-report',
    description: 'Analysis of strategic tensions between vision, sales, and support perspectives',
    sourceCount: 5,
    generatedAt: '2026-03-04T14:30:00Z',
    sections: [
      {
        heading: '1. Vision vs Reality',
        content:
          '> [conflict] **Brand promise vs customer experience**: balena promises "simplicity" but enterprise customers report a steep learning curve for fleet management at scale. The simple onboarding works for 1-10 devices but breaks down at 100+. [1]\n\n> [conflict] **Open-source identity vs revenue pressure**: The community expects all core features to be open-source, but the enterprise sales team needs feature differentiation to justify pricing tiers. This tension is unresolved and creating internal friction. [2]',
        citations: [
          { sourceId: 'bal-src-interview-1', quote: 'Simplicity at small scale doesn\'t automatically translate to simplicity at large scale. We need to be honest about that.', relevance: 0.9 },
          { sourceId: 'bal-src-slack-1', quote: 'If we gate fleet management behind enterprise pricing, the community will revolt. But if we don\'t, how do we monetize?', relevance: 0.88 },
        ],
      },
      {
        heading: '2. Sales vs Support',
        content:
          '> [conflict] **Sales promises vs support reality**: Sales positions balena as "production-ready" but support tickets reveal gaps in monitoring, alerting, and rollback capabilities that enterprise customers expect. [1]\n\n> [conflict] **Hobbyist volume vs enterprise value**: 80% of support tickets come from hobbyist users (free tier) but 90% of revenue comes from enterprise. Support team is stretched thin serving both audiences. [2]',
        citations: [
          { sourceId: 'bal-src-tickets', quote: 'We were told balena handles rollbacks automatically but when our fleet update failed, we had to SSH into each device manually.', relevance: 0.92 },
          { sourceId: 'bal-src-interview-2', quote: 'Our support team spends most of their time helping hobbyists debug Raspberry Pi issues that don\'t generate revenue.', relevance: 0.85 },
        ],
      },
      {
        heading: '3. Resolution Paths',
        content:
          '> [recommendation] **Tension 1 — Simplicity at scale**: Invest in "progressive complexity" UI — simple defaults with power-user overrides. Keep the first 10 minutes simple, reveal advanced features contextually.\n\n> [recommendation] **Tension 2 — Open source vs revenue**: Adopt "open core" model explicitly. Core platform stays open, enterprise features (SSO, audit logs, SLA) are commercial. Be transparent about the boundary.\n\n> [recommendation] **Tension 3 — Support resource allocation**: Create community-powered support tier for hobbyists (forums, community champions). Redirect engineering support to enterprise accounts.\n\n> [recommendation] **Tension 4 — Sales alignment**: Create internal "what we support today" document for sales team. Ship monitoring and rollback features before positioning them.',
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
