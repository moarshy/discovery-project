# Prototype TODOs — Storyboard Review Sync (2026-03-05)

Extracted from the sync between Richard, Thomas, and Arshath. Ordered by implementation sequence (build dependencies flow top-down).

---

## Phase 1: Light Mode

> Independent of everything else. Do this first so all subsequent UI work looks correct in both themes.

- [x] **1. Light mode toggle** — Add a light/dark theme toggle (header or settings). All components need to support both palettes via CSS variables. Richard explicitly requested this. *(All demos)*

---

## Phase 2: Source Weighting

> Adds to the existing source panel. No new data dependencies.

- [x] **2. Source weighting sliders** — Add inline sliders next to each data source in the workspace to control priority/weight. Under the hood this just adjusts a prompt ("focus more on these sources"). Requested by Fion. *(All demos, especially Fion)*

---

## Phase 3: New Integrations

> Needed before demo-specific projects can be assembled with the right source types.

- [x] **3. Intercom integration** — Add Intercom as a data source integration (logo, mock connection UI, source items). Used for support tickets. *(Autodesk)*
- [x] **4. Airtable integration** — Add Airtable as a data source integration (logo, mock connection UI, source items). Used for structured records/learnings. *(Autodesk)*
- [x] **5. Mixpanel integration** — Add Mixpanel as a data source integration (logo, mock connection UI, source items). Used for product analytics. *(SoSafe)*
- [x] **6. Discord integration** — Add Discord as an available integration. Originally discussed for Bellina, though they may use Slack instead. Lower priority. *(Bellina — secondary)*

---

## Phase 4: New Report/Output Types

> Needed before demo projects make sense. Each needs a report template with sections, mock content, and source citations.

- [x] **7. Vocabulary Map report** — Maps internal jargon vs. customer language vs. brand language for the same concepts. Could also appear as an intermediate context graph view. *(Bellina)*
- [x] **8. Brand Strategy report** — Synthesizes interviews, tickets, and discussions into a rebranding recommendation. Sections: findings, recommendations, supporting evidence. *(Bellina)*
- [x] **9. Tensions report** — Highlights contradictions between sources: "vision vs. customer reality", "sales promise vs. support reality". Present tension pairs with supporting quotes from each side. *(Bellina, potentially all)*
- [x] **10. OKR Report** — Synthesizes Confluence OKR pages + Airtable learning records into an alignment/progress report. Plus Experiment Insights and 4Ps Progress Summary reports. *(Autodesk)*
- [x] **11. VOC Report (verify/extend)** — Monthly VoC Report + Feature Request Prioritization report. Covers themes, sentiment, evidence matrix, and feature request ranking. *(Autodesk)*
- [x] **12. Analytics Report** — Feature Activation Report + Funnel Diagnostic + Activation Playbook. Synthesizes Mixpanel analytics + support tickets. *(SoSafe)*

---

## Phase 5: Demo Project Data

> Assemble specific demo projects using the integrations and reports from Phases 3-4.

- [x] **13. Bellina demo project** — "Brand Strategy Balena" project. Sources: 2 interview transcripts, support tickets, 2 Slack discussions. Outputs: vocabulary map, brand strategy report, tensions report. *(Bellina)*
- [x] **14. Autodesk VOC demo project** — "VoC Autodesk" project. Sources: 4 Intercom support tickets/surveys. Outputs: Monthly VoC Report, Feature Request Prioritization. *(Autodesk)*
- [x] **15. Autodesk OKR demo project** — "OKR Progress Autodesk" project. Sources: Confluence OKRs, Mixpanel, 3 Airtable, 2 weekly reports. Outputs: Monthly OKR Report, Experiment Insights, 4Ps Progress Summary. *(Autodesk)*
- [x] **16. SoSafe demo project** — "Feature Activation SoSafe" project. Sources: Confluence, Mixpanel, 2 transcripts, 2 support tickets, 1 CRM record. Outputs: Feature Activation Report, Funnel Diagnostic, Activation Playbook. *(SoSafe)*
- [x] **17. Fion demo project** — "Feature Prioritization Synthflow" project. Sources: 2 strategy docs, 2 interviews, 2 tickets, 1 recording. Outputs: Synthesis Report, PRD, Business Case. *(Fion)*

---

## Phase 6: Skills System

> The core new paradigm — skills panel, GitHub import, skill-to-source association.

- [x] **18. Skills panel** — Add a skills panel to the workspace. Skills categorized into three tiers: (1) data source connection skills, (2) context graph extraction skills, (3) output synthesis skills. List available skills, show which are active, allow toggling. *(All demos)*
- [x] **19. Add skills from GitHub** — Button/modal in skills panel to import new skills from a GitHub repo URL. Mock the fetch-and-install flow. *(All demos)*
- [x] **20. Associate extraction skills with input sources** — Clicking on an input source shows checkboxes for which extraction skills to run (vocabulary map, opportunities, tensions, etc.). Include sensible defaults per source type with ability to customize. *(All demos, especially Bellina & Autodesk)*

---

## Phase 7: Share + Collaboration

> Standalone features that enhance the demo narrative.

- [x] **21. Share to Slack button** — Add a "Share to Slack" button on report views. Show a preview of what the Slack message would look like (mock card with report summary, link, metadata). Doesn't need to actually send. *(All demos)*

---

## Phase 8: Output Generation & Scheduling

> Extracted from Demo Prep sync (2026-03-05). Thomas and Mohamed agreed outputs should be generated and scheduled independently, not all-at-once.

- [x] **22. Per-output generate buttons** — Replace the current "Run Analysis generates everything" flow. Each output card in the Outputs panel should have its own "Generate" button (like Google NotebookLM). The processing animation should apply per-output rather than globally. Context graph extraction still runs as a prerequisite step, but individual outputs are generated on demand. *(All demos)*
- [x] **23. Separate context graph sync from output generation** — Split "Run Analysis" into two distinct steps: (1) "Sync Context Graph" — extracts entities from sources and builds/refreshes the graph, (2) "Generate Output" — synthesizes a specific report from the context graph. The graph sync is cheaper and can run frequently (daily); output generation is heavier and runs less often. Add a "Sync" button or auto-sync indicator in the Context Graph panel header. *(All demos)*
- [x] **24. Per-output scheduling** — Each output card should have a "Schedule" option (e.g., click "..." menu → "Schedule"). Opens a modal with frequency (daily, weekly, monthly, custom), day/time, and notification channel. Context graph sync has its own schedule (suggest daily default). Show a small schedule badge on output cards that have an active schedule (e.g., "Weekly · Mon 9am"). *(All demos)*
- [x] **25. Output Template Gallery** — "Add Output Template" button opens a gallery-style modal showing all available output templates. Three sections: "In this project" (existing reports with ✓ badges), "Suggested" (relevant to project type with sparkle badge), and "All templates" (grouped by category). 14 templates covering all 10 report types. Users can add/remove templates; added templates appear as output cards in the panel. Includes search filtering and framer-motion animations. *(All demos)*

---

## Phase 9: Run History & Monitoring

> Thomas suggested a history of runs, like a monitoring/PR inbox view. Helps answer "Do we have to run it every time?" during demos.

- [x] **26. Run History screen** — New sidebar icon (e.g., clock or activity icon) leading to a monitoring/history view. Shows a table of past synthesis runs: project name, output name, status (success/failed/running), date, duration. Each row is clickable to view the generated output. Looks like a PR inbox or CI dashboard. *(All demos)*
- [x] **27. Run History per-project** — When inside a project workspace, clicking an output card could show historical versions (a thread of past runs for that specific output). Allow navigating between versions. *(All demos — stretch)*

---

## Phase 10: Company Memory (Placeholder)

> Thomas suggested hinting at cross-project shared memory during demos without building the full feature. Key talking point for differentiation.

- [x] **28. Company Memory sidebar stub** — Add a "Company Memory" icon/button in the left sidebar (below Skills, above Settings). Clicking it shows a placeholder page with a title ("Company Memory"), a brief description ("Shared knowledge graph across all projects"), and maybe a few mock stats (e.g., "14 entities · 3 projects contributing · Last synced 2h ago"). Purpose: plant the seed during demos without building real functionality. *(All demos — demo narrative)*

---

## Phase 11: Nice-to-Have

> Lower priority. Build if time permits.

- [ ] **29. Default extraction presets per source type** — Refinement of #20. Auto-check relevant extractions when a source type is added (e.g., transcripts auto-select "opportunity extraction"). Different presets for tickets, analytics, docs, etc. *(All demos)*
- [ ] **30. Context graph alerts/insights** — Richard noted the context graph can surface alerts without full reports (e.g., "spike in feature requests for X"). Add a small "Insights" badge or notification dot on the context graph when patterns are detected. Mock 1-2 alert cards. *(Future — not for current sprint)*
- [ ] **31. Cross-project output sharing** — Richard described a scenario where outputs from one project (e.g., 4Ps weekly reports) feed as inputs into another project (e.g., monthly progress reporting). Would need a "Link output as source" mechanism. *(Future — architectural)*
