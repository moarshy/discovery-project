# Discovery — Product Spec

> NotebookLM for Product Data. A desktop app where PMs upload diverse sources (transcripts, tickets, strategy docs, sales recordings) and get structured synthesis: extracted entities, a knowledge graph, and actionable outputs (reports, PRDs, business cases).

## 1. Problem

Every PM we interviewed (SynthFlow, SoSafe, Autodesk, Bellina) faces the same core problem: **synthesizing signals from multiple sources into decisions about what to build.**

Signals come from:
- Founder/leadership strategy (top-down)
- Sales team feedback (customer desires)
- Customer success input (implementation needs)
- User research transcripts
- Support tickets, analytics, docs

**Why existing tools fail:**
- **ProductBoard**: Requires manual tagging — doesn't auto-extract patterns
- **Dust / Glean / Super.work**: Horizontal search tools — not synthesis
- **NotebookLM**: Closest, but: (1) can't connect product-specific sources (Jira, Zendesk, Confluence), (2) can't produce PM-specific outputs (PRD, business case), (3) chat interface is the least useful part — PMs want inputs → outputs, not conversation
- **Claude/ChatGPT directly**: Possible but requires setup — no persistent workspace

## 2. Solution

**Three-panel desktop workspace:**

```
┌─────────────────┬──────────────────────┬─────────────────────┐
│    SOURCES       │    CONTEXT GRAPH      │     OUTPUTS          │
│                  │                       │                      │
│  Company         │  ┌─Table─┬─Graph─┐   │  + Add Output        │
│    Vision        │  │               │   │                      │
│    Product       │  │  Strategic    │   │  ┌─ Report ─────┐   │
│    Strategy      │  │  Bets         │   │  │              │   │
│                  │  │               │   │  ├─ PRD ────────┤   │
│  Transcripts     │  │  Experiments  │   │  │              │   │
│    Joe Autodesk  │  │               │   │  ├─ Business ───┤   │
│    Tiago SoSafe  │  │  Opport-      │   │  │   Case       │   │
│                  │  │  unities      │   │  └──────────────┘   │
│  Support Tickets │  │               │   │                      │
│    User 1        │  └───────────────┘   │                      │
│    User 2        │                       │                      │
│                  │                       │                      │
│  Sales Recordings│                       │                      │
│    Recording 1   │                       │                      │
│                  │                       │                      │
│  ☐ Auto-search   │                       │                      │
│    all connected │                       │                      │
│    sources       │                       │                      │
└─────────────────┴──────────────────────┴─────────────────────┘
```

When an output is clicked (e.g., Report), the outputs column becomes a **Report Viewer**:

```
┌─────────────────┬──────────────────────┬─────────────────────┐
│    SOURCES       │    CONTEXT GRAPH      │  VoC Report          │
│    (same)        │    (same)             │                      │
│                  │                       │  Section 1           │
│                  │                       │  ...content...       │
│                  │                       │                      │
│                  │                       │  Section 2           │
│                  │                       │  ...content...       │
│                  │                       │                      │
└─────────────────┴──────────────────────┴─────────────────────┘
```

## 3. Target User

The PM from our design sprint interviews — mid-market PM at a 100-500 person company who:
- Gets signals from multiple teams (founders, sales, CS, engineering)
- Needs to synthesize into decisions about what to build
- Spends hours manually reading transcripts, tickets, docs
- Primary trigger: "I have a bunch of user research and need to extract insights"

## 4. User Flow

### Screen 1: Projects List
- Shows existing synthesis projects as cards
- Each card: date, name, input count, output count
- `+ Create New` button top-right
- Projects: User Research 1, Analytics 1, Solution Discovery, Meeting Prep

### Screen 2: Empty Project
- Project name header (e.g., "User Research 1")
- Sources panel (left): empty with `+ Add Source` dashed button
- Add Source drawer: manual search bar + object type chips (Transcripts, Support Tickets, Sales Calls, Strategy Docs)

### Screen 3: Active Project (three-panel)
- **Sources panel** (left, ~25% width): categorized source list with items
- **Context Graph** (center, ~40% width): table/graph toggle
  - **Table view**: rows = AI-discovered entity types (Strategic Bets, Experiments, Opportunities, Pain Points, etc.), columns = entities with source references
  - **Graph view**: node-and-edge knowledge graph showing relationships between extracted entities
- **Outputs panel** (right, ~35% width): output template list OR report viewer

### Screen 4: Report Viewer
- Right panel transforms into a formatted report (VoC Report, PRD, Business Case)
- Sections with headings, evidence quotes, source citations
- Back button to return to output list

## 5. Screens & Components

### 5.1 App Shell
- **Title bar**: app icon + "Discovery" + window controls (Electron)
- **Sidebar** (narrow, 48px): project list icon, settings icon
- **Main area**: current screen

### 5.2 Projects List
- Grid or list of project cards
- Card: project name (bold), date, "X inputs · Y outputs" subtitle
- `+ Create New` button
- Empty state if no projects

### 5.3 Source Panel
- Category headers (Company, Transcripts, Support Tickets, Sales Recordings)
- Source items as chips/pills with name
- `+ Add Source` button (dashed border)
- Checkbox: "Automatically search all connected sources"
- Add Source modal/drawer with search + object type filters

### 5.4 Context Graph — Table View
- Column headers = source categories or entity properties
- Row labels = AI-discovered entity types
- Cells = entity cards with brief descriptions
- Clickable cells to see source evidence

### 5.5 Context Graph — Graph View
- Force-directed or hierarchical node graph
- Nodes = entities (color-coded by type)
- Edges = relationships between entities
- Click node to see detail panel with source citations
- Zoom/pan controls

### 5.6 Outputs Panel
- `+ Add Output Template` button (dashed border)
- Output cards: Report, PRD, Business Case
- Click to generate/view
- Status indicator (ready, generating, complete)

### 5.7 Report Viewer
- Full report display replacing outputs panel
- Back/close button
- Section headers with content
- Inline source citations (clickable → highlights source in left panel)
- Export options (future)

## 6. Mock Data

All data is pre-loaded (no real AI processing in prototype). The mock data simulates a "User Research 1" project for a B2B SaaS PM synthesizing Q3 planning signals.

### Sources (pre-loaded)
| Category | Source Name | Type |
|----------|-----------|------|
| Company | Vision | Strategy doc |
| Company | Product Strategy | Strategy doc |
| Transcripts | Joe — Autodesk | User interview |
| Transcripts | Tiago — SoSafe | User interview |
| Support Tickets | User 1 | Support ticket |
| Support Tickets | User 2 | Support ticket |
| Sales Recordings | Recording 1 | Sales call |

### Context Graph — Extracted Entities
AI "auto-discovers" these entity types and populates them:

**Strategic Bets**
- "Enterprise self-serve onboarding" — mentioned in Vision, Joe transcript, User 1 ticket
- "AI-powered workflow automation" — mentioned in Product Strategy, Tiago transcript

**Experiments**
- "Usage-based pricing pilot" — mentioned in Sales Recording 1, Product Strategy
- "In-app help widget" — mentioned in User 2 ticket, Joe transcript

**Opportunities**
- "Mid-market expansion" — mentioned in Vision, Sales Recording 1
- "Integration marketplace" — mentioned in Tiago transcript, User 1 ticket

**Pain Points**
- "Onboarding takes 3+ weeks" — mentioned in Joe transcript, User 1 ticket, User 2 ticket
- "Manual data export workflow" — mentioned in Tiago transcript, Support tickets

**Feature Requests**
- "Bulk import from CSV" — mentioned in User 1 ticket, Joe transcript
- "SSO/SAML support" — mentioned in Sales Recording 1, Tiago transcript

### Outputs (pre-generated)

**VoC Report**: Voice of Customer synthesis with sections:
1. Executive Summary
2. Top Themes (ranked by frequency + impact)
3. Evidence Matrix (theme × source)
4. Conflicts & Tensions
5. Recommended Actions

**PRD**: Product Requirements Document for top-priority feature
**Business Case**: ROI analysis for recommended investment

## 7. Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Desktop shell | **Electron** | Desktop workspace feel (like Obsidian/NotebookLM). Local file access. No deployment needed for demo. |
| Frontend | **React + TypeScript** | Team knows it. Fast component development. |
| Build tool | **Vite** | Fast HMR, good Electron integration via `electron-vite` or `vite-plugin-electron` |
| Styling | **Tailwind CSS** | Rapid UI development, consistent design system |
| Graph rendering | **React Flow** or **D3.js** | React Flow for node-edge graph (easier), D3 if we need custom force layout |
| State management | **Zustand** or **useReducer** | Simple state for mock data, no need for Redux |
| AI (future) | **Claude API** | For real extraction and report generation (not in prototype) |
| Packaging | **electron-builder** | For distributable builds (stretch goal) |

### Project Structure
```
round1-mockup/
├── electron/
│   ├── main.ts              # Electron main process
│   └── preload.ts           # Preload script
├── src/
│   ├── main.tsx             # React entry
│   ├── App.tsx              # Root component
│   ├── components/
│   │   ├── AppShell.tsx     # Title bar + sidebar + main area
│   │   ├── ProjectsList.tsx # Screen 1: project cards
│   │   ├── SourcePanel.tsx  # Left panel: source list
│   │   ├── ContextGraph.tsx # Middle panel: table/graph toggle
│   │   │   ├── TableView.tsx
│   │   │   └── GraphView.tsx
│   │   ├── OutputPanel.tsx  # Right panel: output list
│   │   └── ReportViewer.tsx # Report display
│   ├── data/
│   │   ├── projects.ts      # Mock project list
│   │   ├── sources.ts       # Mock source data
│   │   ├── entities.ts      # Mock extracted entities
│   │   ├── graph.ts         # Mock graph nodes/edges
│   │   └── reports.ts       # Mock generated reports
│   ├── types/
│   │   └── index.ts         # TypeScript types
│   └── styles/
│       └── index.css        # Global styles + Tailwind
├── package.json
├── tsconfig.json
├── vite.config.ts
├── electron-builder.yml
├── tailwind.config.js
└── spec.md                  # This file
```

## 8. Design Tokens

Dark theme matching the design sprint aesthetic:

```
Background:       #0A0A0F
Surface:          #12121A
Surface Elevated: #1A1A26
Border:           #2A2A3A
Text Primary:     #F0F0F5
Text Secondary:   #8888A0
Text Tertiary:    #55556A
Accent:           #6366F1 (Indigo)
Green:            #22C55E
Amber:            #F59E0B
Red:              #EF4444
Font:             Inter (Google Fonts or bundled)
```

## 9. Interaction Details

### Navigation
- Click project card → opens project workspace
- Back button in project → returns to projects list
- Click source → highlights related entities in context graph
- Click entity in table/graph → shows source evidence panel
- Click output → opens report viewer
- Toggle table/graph → switches context graph view

### States
- **Projects list**: default landing screen
- **Empty project**: just created, no sources
- **Active project**: sources loaded, context graph populated, outputs available
- **Report viewing**: right panel shows full report

### Animations (subtle)
- Panel transitions: slide/fade
- Graph nodes: spring physics on load
- Report sections: staggered fade-in
- Source highlighting: pulse glow

## 10. Scope — What's IN vs OUT

### IN (build today)
- [x] Electron app shell with title bar
- [x] Projects list screen with 4 mock projects
- [x] Three-panel workspace layout
- [x] Source panel with categorized items
- [x] Context graph — table view
- [x] Context graph — graph view (node-and-edge)
- [x] Table/graph toggle
- [x] Output panel with 3 output types
- [x] Report viewer (VoC Report)
- [x] Click interactions (source → graph highlight, entity → detail)
- [x] Dark theme
- [x] All mock data pre-loaded

### OUT (future / not prototype)
- [ ] Real file upload
- [ ] Real AI processing (Claude API)
- [ ] Live report generation
- [ ] Data source connectors (Jira, Zendesk, Confluence, etc.)
- [ ] Export functionality
- [ ] User authentication
- [ ] Multiple users / collaboration
- [ ] Custom output templates
- [ ] Search across sources
- [ ] Auto-search connected sources
- [ ] PRD and Business Case report content (stretch: add if time)
