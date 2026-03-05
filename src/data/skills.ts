import type { Skill, SkillCategory, SourceSkillAssignments } from '../types';

export const defaultSkills: Skill[] = [
  // Data Source
  {
    id: 'ds-jira',
    name: 'Jira Connector',
    description: 'Import issues, epics, and sprint data from Jira projects.',
    instructions: `Connect to the Jira REST API using the provided OAuth credentials.\nPull all issues from the configured project(s), including:\n- Summary, description, status, priority, and assignee\n- Epic links and sprint membership\n- Comments and attachments metadata\nNormalize fields into the standard source schema and emit one document per issue.`,
    category: 'data-source',
    enabled: true,
    icon: 'TicketCheck',
    color: '#2684FF',
  },
  {
    id: 'ds-confluence',
    name: 'Confluence Connector',
    description: 'Pull pages, blog posts, and spaces from Confluence.',
    instructions: `Authenticate with Confluence via API token.\nCrawl the specified space(s) and retrieve:\n- Page title, body (converted to plain text), labels\n- Blog posts and their publication dates\n- Page hierarchy (parent/child relationships)\nSkip archived pages unless explicitly included.`,
    category: 'data-source',
    enabled: true,
    icon: 'BookOpen',
    color: '#1868DB',
  },
  {
    id: 'ds-gdrive',
    name: 'Google Drive Connector',
    description: 'Access documents, spreadsheets, and presentations from Google Drive.',
    instructions: `Use Google Drive API with OAuth2 to list and fetch files.\nSupported formats: Google Docs, Sheets, Slides, and uploaded PDFs.\nFor each file, extract:\n- Document text content (export as plain text)\n- Spreadsheet data (first sheet, as CSV)\n- Slide content (speaker notes + slide text)\nRespect sharing permissions and skip trashed files.`,
    category: 'data-source',
    enabled: true,
    icon: 'HardDrive',
    color: '#34A853',
  },
  {
    id: 'ds-slack',
    name: 'Slack Connector',
    description: 'Ingest messages and threads from Slack channels.',
    instructions: `Connect to Slack using a Bot token with channels:history scope.\nFor each configured channel:\n- Fetch messages from the last 90 days (configurable)\n- Resolve thread replies into single conversation units\n- Resolve user mentions to display names\nExclude bot messages and join/leave events by default.`,
    category: 'data-source',
    enabled: true,
    icon: 'MessageSquare',
    color: '#E01E5A',
  },
  {
    id: 'ds-local',
    name: 'Local File Upload',
    description: 'Upload files directly from your local filesystem.',
    instructions: `Accept file uploads from the user's local filesystem.\nSupported formats: .txt, .md, .pdf, .docx, .csv, .json\nFor each uploaded file:\n- Detect file type and extract text content\n- Preserve original filename as the source title\n- Generate a content hash to avoid duplicate imports`,
    category: 'data-source',
    enabled: true,
    icon: 'Upload',
    color: '#8B8B8B',
  },

  // Extraction
  {
    id: 'ex-opportunities',
    name: 'Extract Opportunities',
    description: 'Identify product and business opportunities from source material.',
    instructions: `Scan the provided source material for product and business opportunities.\nFor each opportunity found, output a structured entity with:\n- **Title**: concise name (5-10 words)\n- **Description**: 2-3 sentence explanation of the opportunity\n- **Confidence**: score from 0.0 to 1.0 based on evidence strength\n- **Source refs**: list of source IDs where this opportunity was mentioned\nDeduplicate similar opportunities and merge their source refs.`,
    category: 'extraction',
    enabled: true,
    icon: 'Lightbulb',
    color: '#F59E0B',
  },
  {
    id: 'ex-pain-points',
    name: 'Extract Pain Points',
    description: 'Surface user frustrations, blockers, and recurring complaints.',
    instructions: `Analyze source material to identify user pain points.\nLook for: explicit complaints, workarounds, feature requests, and frustration signals.\nFor each pain point, output:\n- **Title**: short description of the pain\n- **Severity**: critical | high | medium | low\n- **Frequency**: how often it appears across sources\n- **Verbatim quotes**: up to 3 representative quotes with source refs\nGroup related pain points under a common theme.`,
    category: 'extraction',
    enabled: true,
    icon: 'AlertTriangle',
    color: '#EF4444',
  },
  {
    id: 'ex-strategic-bets',
    name: 'Extract Strategic Bets',
    description: 'Detect strategic initiatives and high-level investment themes.',
    instructions: `Identify strategic initiatives and investment themes from the source material.\nA strategic bet is a high-level direction or initiative that requires significant investment.\nFor each bet, extract:\n- **Title**: name of the initiative\n- **Thesis**: 1-2 sentence strategic rationale\n- **Time horizon**: short-term (0-6mo) | medium (6-18mo) | long-term (18mo+)\n- **Supporting evidence**: source refs and key quotes`,
    category: 'extraction',
    enabled: true,
    icon: 'Target',
    color: '#8B5CF6',
  },
  {
    id: 'ex-vocabulary',
    name: 'Vocabulary Map',
    description: 'Build a shared lexicon of domain terms and their relationships.',
    instructions: `Extract domain-specific terms and jargon from the source material.\nFor each term, capture:\n- **Term**: the word or phrase\n- **Definition**: plain-language definition based on usage in sources\n- **Aliases**: alternative names or abbreviations used\n- **Related terms**: other terms frequently co-occurring\nOutput as a glossary sorted alphabetically.`,
    category: 'extraction',
    enabled: false,
    icon: 'Languages',
    color: '#06B6D4',
  },
  {
    id: 'ex-vision',
    name: 'Extract Vision',
    description: 'Capture long-term vision statements and north-star goals.',
    instructions: `Search source material for vision statements and long-term goals.\nIdentify:\n- Explicit vision/mission statements\n- North-star metrics or aspirational targets\n- Long-term strategic direction signals\nFor each, capture the verbatim statement, its source, and any associated timeframe.\nRank by how widely shared the vision is across sources.`,
    category: 'extraction',
    enabled: false,
    icon: 'Compass',
    color: '#10B981',
  },

  // Synthesis
  {
    id: 'syn-prd',
    name: 'Generate PRD',
    description: 'Synthesize a product requirements document from extracted entities.',
    instructions: `Synthesize extracted entities into a Product Requirements Document.\nStructure the PRD with these sections:\n1. **Overview**: problem statement and product vision\n2. **Goals & Success Metrics**: measurable outcomes\n3. **User Stories**: derived from pain points and opportunities\n4. **Requirements**: functional and non-functional, prioritized (P0/P1/P2)\n5. **Open Questions**: unresolved items needing stakeholder input\nCite source entities throughout using inline references.`,
    category: 'synthesis',
    enabled: true,
    icon: 'FileText',
    color: '#3B82F6',
  },
  {
    id: 'syn-business-case',
    name: 'Business Case',
    description: 'Build a business justification report with ROI analysis.',
    instructions: `Generate a business case document from the context graph.\nInclude:\n- **Executive Summary**: 2-3 paragraph overview\n- **Problem Statement**: supported by pain point entities\n- **Proposed Solution**: derived from opportunities and strategic bets\n- **ROI Analysis**: estimated costs, benefits, and payback period\n- **Risk Assessment**: key risks with mitigation strategies\nAll claims must reference source entities.`,
    category: 'synthesis',
    enabled: true,
    icon: 'TrendingUp',
    color: '#22C55E',
  },
  {
    id: 'syn-voc',
    name: 'VoC Report',
    description: 'Generate a Voice of the Customer report with verbatim quotes.',
    instructions: `Compile a Voice of the Customer report.\nOrganize by theme, and for each theme include:\n- **Theme title** and summary\n- **Verbatim quotes** from sources (with attribution)\n- **Sentiment**: positive / negative / neutral\n- **Frequency**: number of sources mentioning this theme\nInclude an executive summary with top 5 takeaways.`,
    category: 'synthesis',
    enabled: true,
    icon: 'Users',
    color: '#A855F7',
  },
  {
    id: 'syn-okr',
    name: 'OKR Report',
    description: 'Draft objectives and key results aligned to strategic themes.',
    instructions: `Draft OKRs aligned to the strategic bets in the context graph.\nFor each strategic bet, propose:\n- **Objective**: qualitative, inspirational goal statement\n- **Key Results** (3-5): specific, measurable outcomes with targets\n- **Alignment**: link back to source entities and evidence\nGroup OKRs by time horizon (quarterly / annual).`,
    category: 'synthesis',
    enabled: false,
    icon: 'Flag',
    color: '#F97316',
  },
  {
    id: 'syn-brand',
    name: 'Brand Strategy',
    description: 'Produce a brand positioning and messaging framework.',
    instructions: `Produce a brand positioning framework from the context graph.\nSections:\n- **Target Audience**: derived from user personas in sources\n- **Value Proposition**: core promise based on opportunities\n- **Positioning Statement**: for [audience], [product] is the [category] that [benefit]\n- **Messaging Pillars**: 3-4 key messages with supporting proof points\n- **Tone & Voice**: recommended communication style`,
    category: 'synthesis',
    enabled: false,
    icon: 'Sparkles',
    color: '#EC4899',
  },
];

export const categoryMeta: Record<SkillCategory, { label: string; description: string }> = {
  'data-source': {
    label: 'Data Sources',
    description: 'Connect to external platforms and import raw data.',
  },
  extraction: {
    label: 'Extraction',
    description: 'Extract structured entities from sources into the context graph.',
  },
  synthesis: {
    label: 'Synthesis',
    description: 'Generate final deliverables from the context graph.',
  },
};

export const defaultSourceSkillAssignments: SourceSkillAssignments = {
  'src-joe-autodesk': ['ex-opportunities', 'ex-pain-points'],
  'src-tiago-sosafe': ['ex-opportunities', 'ex-pain-points'],
  'src-vision': ['ex-strategic-bets', 'ex-vision'],
  'src-product-strategy': ['ex-strategic-bets', 'ex-vision'],
  'src-user-1': ['ex-pain-points'],
  'src-user-2': ['ex-pain-points'],
  'src-recording-1': ['ex-opportunities', 'ex-pain-points'],
};

export function mockImportSkill(url: string): Skill {
  // Parse repo name from GitHub URL
  const parts = url.replace(/\/+$/, '').split('/');
  const repoName = parts[parts.length - 1] || 'custom-skill';
  const name = repoName
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    id: `ex-custom-${Date.now()}`,
    name,
    description: `Custom extraction skill imported from GitHub.`,
    instructions: `# ${name}\n\nCustom skill imported from ${url}.\nEdit these instructions to configure the skill's behavior.`,
    category: 'extraction',
    enabled: true,
    githubUrl: url,
    icon: 'GitBranch',
    color: '#6366F1',
  };
}
