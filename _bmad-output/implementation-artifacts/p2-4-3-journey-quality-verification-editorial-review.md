# Story 4.3: Journey Quality Verification & Editorial Review

Status: ready-for-dev

## Story

As a maintainer,
I want to verify journey example quality through an editorial checklist and `/bmad-editorial-review-prose` validation,
So that the journey reads as a coherent narrative with professional prose quality and all editorial standards are met before publication.

## Acceptance Criteria

1. Given the annotated journey example from Stories 4.1 and 4.2 is complete, when the maintainer runs the editorial review process, then an editorial checklist is applied covering: narrative flow across all 7 sections, self-contained section validation, handoff annotation completeness, terminology consistency, and prose quality (FR19)
2. `/bmad-editorial-review-prose` is executed on the journey content to validate communication quality
3. The journey reads as a coherent narrative, not a collection of artifacts (NFR9)
4. Any editorial issues identified are resolved before the journey is considered complete
5. The final journey example is ready for linking from the README (supporting Epic 5 FR29)

## Tasks / Subtasks

- [ ] Task 1: Run editorial-review-structure on the journey document (AC: #1, #3)
  - [ ] 1.1 Read the full journey document (`_bmad-output/journey-examples/busy-parents-7-agent-journey.md`)
  - [ ] 1.2 Execute `/bmad-editorial-review-structure` with content=journey document, purpose="7-agent product discovery journey example demonstrating BMAD's Vortex pattern", target_audience="new BMAD users and evaluators", reader_type="humans"
  - [ ] 1.3 Review structural recommendations — apply CUT/MERGE/MOVE/CONDENSE changes that improve narrative flow without removing artifact content, annotations, or context declarations
  - [ ] 1.4 Document which structural recommendations were accepted/rejected and why

- [ ] Task 2: Run editorial-review-prose on the journey document (AC: #2)
  - [ ] 2.1 Execute `/bmad-editorial-review-prose` with content=journey document, reader_type="humans"
  - [ ] 2.2 Review the 3-column findings table (Original Text | Revised Text | Changes)
  - [ ] 2.3 Apply all prose fixes that improve clarity without altering artifact data, percentages, evidence counts, or YAML frontmatter

- [ ] Task 3: Apply editorial checklist — 5 dimensions (AC: #1)
  - [ ] 3.1 **Narrative flow**: Read sequentially from Introduction through all 7 agent sections — verify each section's "What Happens Next" creates a natural bridge to the next agent; verify the Introduction sets up the full journey; verify the Conclusion reflects back on the complete chain
  - [ ] 3.2 **Self-contained sections**: For each of the 6 context declarations (Isla through Max), verify: (a) the previous agent is identified by name, icon, and role; (b) the input artifact type is explained; (c) key terms are defined; (d) a reader entering here encounters no undefined terms
  - [ ] 3.3 **Handoff annotation completeness**: For each of the 6 handoff annotations, verify: (a) the contract name is correct (contextual input for Emma→Isla, HC1-HC5 for the rest); (b) consumed fields match the actual artifact content in `_bmad-output/vortex-artifacts/`; (c) schema reference path is correct; (d) the annotation adds value without disrupting narrative flow
  - [ ] 3.4 **Terminology consistency**: Grep the journey for all agent names, workflow names, and contract references — verify zero synonyms, abbreviations, or informal variants; all must match registry exactly (Emma 🎯, Isla 🔍, Mila 🔬, Liam 💡, Wade 🧪, Noah 📡, Max 🧭; HC1-HC5; lean-persona, user-discovery, research-convergence, hypothesis-engineering, mvp, signal-interpretation, learning-card)
  - [ ] 3.5 **Prose quality**: Verify no grammatical errors, no awkward transitions, no passive voice overuse, no jargon without definition, no sentences over 40 words that could be split

- [ ] Task 4: Fix all identified editorial issues (AC: #4)
  - [ ] 4.1 Apply fixes from Task 1 structural review (if any accepted)
  - [ ] 4.2 Apply fixes from Task 2 prose review
  - [ ] 4.3 Apply fixes from Task 3 editorial checklist
  - [ ] 4.4 Re-read the full document after all fixes to verify coherence was maintained

- [ ] Task 5: Verify README-readiness (AC: #5)
  - [ ] 5.1 Verify the journey document has a clear title, introduction, and conclusion that work standalone when linked from a README
  - [ ] 5.2 Verify the document path (`_bmad-output/journey-examples/busy-parents-7-agent-journey.md`) is stable and suitable for external linking
  - [ ] 5.3 Verify the document opens with enough context that a reader arriving from a README link can understand what they're reading without prior BMAD knowledge

## Dev Notes

### This is a CONTENT EDITING + REVIEW story, not a code story

This story runs two BMAD editorial review tasks on the journey document created in Stories 4.1-4.2, then applies an editorial checklist, fixes issues, and verifies README-readiness.

**No automated tests are expected.** Validation is editorial — the output is a polished journey document ready for publication.

### How to invoke the editorial review tasks

The editorial reviews are standalone BMAD tasks (not workflows). Invoke them as skills:

1. **Structure review**: `/bmad-editorial-review-structure` — outputs CUT/MERGE/MOVE/CONDENSE/QUESTION/PRESERVE recommendations
2. **Prose review**: `/bmad-editorial-review-prose` — outputs a 3-column table (Original Text | Revised Text | Changes)

Both tasks are defined at:
- `_bmad/core/tasks/editorial-review-prose.xml`
- `_bmad/core/tasks/editorial-review-structure.xml`

### Editorial review parameters

For the structure review:
- `content`: the full journey document
- `purpose`: "7-agent product discovery journey example"
- `target_audience`: "new BMAD users and evaluators"
- `reader_type`: "humans"

For the prose review:
- `content`: the full journey document
- `reader_type`: "humans"

### What NOT to change

These constraints carry forward from Stories 4.1 and 4.2:
- Do NOT modify the captured artifacts' YAML frontmatter or data values (percentages, evidence counts, participant numbers)
- Do NOT restructure the heading hierarchy (Introduction → 7 numbered agent sections → Conclusion)
- Do NOT remove handoff annotations or context declarations added in Story 4.2
- Do NOT alter agent names, icons, workflow names, or contract references — these are registry-verified
- Do NOT remove the Empathy Map, Recommendations, or other artifact sections

### What CAN be changed

- Prose in narrative paragraphs (Introduction, "What Happens Next" bridges, Conclusion)
- Wording in context declarations (italic paragraphs) — for clarity only, not content
- Wording in handoff annotations (blockquote callouts) — for clarity only, not field names
- Transition sentences between sections
- Sentence structure, grammar, punctuation in prose sections
- Minor restructuring if editorial-review-structure recommends it (with justification)

### Previous Story Intelligence (4.2)

Key learnings from Story 4.2:
- **Journey document is ~960 lines** after annotations and context declarations were added
- **Code review found and fixed 5 issues**: incorrect theme name ("default meal trap" → "Tool Abandonment Pattern"), forward-referenced evidence count ("52 evidence points" → "research findings"), undefined "Vortex" in context declarations (added parenthetical), missing Empathy Map in HC1 fields, undefined "concierge test" (added definition)
- **HC1 consumed field fix**: "Evidence Summary" was replaced with "Recommendations" (Evidence Summary exists in HC2, not HC1)
- **NFR10 fully verified**: All agent names with icons, contract references (HC1-HC5), and workflow names match registry exactly
- **False positive documented**: HC6/HC7/HC8 in Max's routing table are legitimate routing contracts defined in compass-routing-reference.md, not undefined terms

### Previous Story Intelligence (4.1)

Key learnings from Story 4.1:
- **Content creation follows editorial rules, not code rules** — no lint/test, editorial review validates
- **Code review found 5 issues** that were fixed: A3 assumption mislabeling, A4 validation overclaim, 14→10 weekday arithmetic, 4.1→4.2 baseline drift, weekend scope expansion
- **All fixes are already applied** — do NOT revert them

### Risk Profile

**Risk:** LOW — Editorial review and prose fixes on existing document.
- No code to break, no regressions possible
- Prose fixes are localized (sentence-level changes)
- Structural changes are recommendations only — dev agent chooses which to accept
- Primary risk: over-editing that disrupts the narrative voice established in 4.1

### Foundation for Epic 5

Story 4.3 completes Epic 4. The polished journey document becomes linkable content for:
- Epic 5, Story 5.3: README landing page value proposition visual overview
- Epic 5, Story 5.4: README landing page output previews & journey link (FR29)

### Project Structure Notes

- Journey document: `_bmad-output/journey-examples/busy-parents-7-agent-journey.md`
- Individual artifacts: `_bmad-output/vortex-artifacts/` (7 files — reference only, do not modify)
- Editorial review tasks: `_bmad/core/tasks/editorial-review-prose.xml`, `_bmad/core/tasks/editorial-review-structure.xml`
- Agent registry: `scripts/update/lib/agent-registry.js`

### References

- [Source: _bmad-output/planning-artifacts/epics-phase2.md#Epic 4, Story 4.3]
- [Source: _bmad-output/planning-artifacts/prd-phase2.md#FR19, NFR9, NFR10]
- [Source: _bmad/core/tasks/editorial-review-prose.xml]
- [Source: _bmad/core/tasks/editorial-review-structure.xml]
- [Source: _bmad-output/implementation-artifacts/p2-4-2-add-handoff-annotations-self-contained-sections.md]
- [Source: _bmad-output/implementation-artifacts/p2-4-1-create-7-agent-journey-example-with-real-artifacts.md]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### Change Log

### File List
