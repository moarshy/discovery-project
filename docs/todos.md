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

- [ ] **7. Vocabulary Map report** — Maps internal jargon vs. customer language vs. brand language for the same concepts. Could also appear as an intermediate context graph view. *(Bellina)*
- [ ] **8. Brand Strategy report** — Synthesizes interviews, tickets, and discussions into a rebranding recommendation. Sections: findings, recommendations, supporting evidence. *(Bellina)*
- [ ] **9. Tensions report** — Highlights contradictions between sources: "vision vs. customer reality", "sales promise vs. support reality". Present tension pairs with supporting quotes from each side. *(Bellina, potentially all)*
- [ ] **10. OKR Report** — Synthesizes Confluence OKR pages + Airtable learning records into an alignment/progress report. *(Autodesk)*
- [ ] **11. VOC Report (verify/extend)** — Verify existing VOC report covers Intercom support ticket synthesis with themes, sentiment, and actionable insights. Extend if needed. *(Autodesk)*
- [ ] **12. Analytics Report** — Synthesizes Mixpanel analytics data + support tickets into a diagnostic report (e.g., why activation is declining). *(SoSafe)*

---

## Phase 5: Demo Project Data

> Assemble specific demo projects using the integrations and reports from Phases 3-4.

- [ ] **13. Bellina demo project** — "Rebranding Decision" project. Sources: interview transcripts, support tickets, Slack discussions. Outputs: vocabulary map, brand strategy report, tensions report. *(Bellina)*
- [ ] **14. Autodesk VOC demo project** — Voice of Customer project. Sources: Intercom support tickets. Output: VOC report. *(Autodesk)*
- [ ] **15. Autodesk OKR demo project** — OKR Alignment project. Sources: Confluence OKRs, Airtable learnings. Output: OKR report. *(Autodesk)*
- [ ] **16. SoSafe demo project** — Analytics Investigation project. Sources: Mixpanel data, support tickets. Output: analytics report on activation decline. *(SoSafe)*
- [ ] **17. Fion demo project** — Synthesis-focused project. Similar to existing seeded data but with source weighting sliders prominently featured. *(Fion)*

---

## Phase 6: Skills System

> The core new paradigm — skills panel, GitHub import, skill-to-source association.

- [x] **18. Skills panel** — Add a skills panel to the workspace. Skills categorized into three tiers: (1) data source connection skills, (2) context graph extraction skills, (3) output synthesis skills. List available skills, show which are active, allow toggling. *(All demos)*
- [x] **19. Add skills from GitHub** — Button/modal in skills panel to import new skills from a GitHub repo URL. Mock the fetch-and-install flow. *(All demos)*
- [x] **20. Associate extraction skills with input sources** — Clicking on an input source shows checkboxes for which extraction skills to run (vocabulary map, opportunities, tensions, etc.). Include sensible defaults per source type with ability to customize. *(All demos, especially Bellina & Autodesk)*

---

## Phase 7: Share + Collaboration

> Standalone features that enhance the demo narrative.

- [ ] **21. Share to Slack button** — Add a "Share to Slack" button on report views. Show a preview of what the Slack message would look like (mock card with report summary, link, metadata). Doesn't need to actually send. *(All demos)*

---

## Phase 8: Nice-to-Have

> Lower priority. Build if time permits.

- [ ] **22. Scheduling UI** — Schedule synthesis runs on a recurring basis ("Run every Monday at 9am"). Modal with frequency options (daily, weekly, custom) and notification preferences. Explicitly called "nice to have". Would require hosted infra to actually work. *(All demos — conceptual)*
- [ ] **23. Default extraction presets per source type** — Refinement of #20. Auto-check relevant extractions when a source type is added (e.g., transcripts auto-select "opportunity extraction"). Different presets for tickets, analytics, docs, etc. *(All demos)*
