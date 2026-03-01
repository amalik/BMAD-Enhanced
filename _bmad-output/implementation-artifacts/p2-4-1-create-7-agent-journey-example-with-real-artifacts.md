# Story 4.1: Create 7-Agent Journey Example with Real Artifacts

Status: done

## Story

As a new user,
I want to follow a complete 7-agent journey example on the busy parents domain with real captured artifacts at every handoff point,
So that I can see exactly what BMAD produces end-to-end and understand how each agent builds on the previous agent's output.

## Acceptance Criteria

1. Journey example includes real (not mocked) artifacts from all 7 agents in chain order (FR16)
2. Each agent section shows the actual input consumed and the actual output produced
3. Artifacts at every handoff point are captured verbatim from real agent runs
4. All agent names, workflow names, and artifact names match the registry and manifest exactly (NFR10)
5. Existing `_bmad-output/` artifact formats are used without modification (NFR14)
6. Capture methodology is defined: how each agent is invoked, how output variance is handled (best-of-N selection or single capture with editorial polish), and what constitutes an acceptable artifact

## Tasks / Subtasks

- [x] Task 1: Define capture methodology and output structure (AC: #6)
  - [x] 1.1 Define the journey document output path: `_bmad-output/journey-examples/busy-parents-7-agent-journey.md`; individual artifacts saved to `_bmad-output/vortex-artifacts/`
  - [x] 1.2 Define capture approach: load each agent persona, execute its primary workflow step-by-step on "busy parents" domain, capture the synthesize-step output, polish for clarity while preserving substance
  - [x] 1.3 Define acceptance quality bar: Emma's artifact uses `type: lean-persona` frontmatter; Isla-through-Max artifacts use HC schema frontmatter (contract, type, source_agent, source_workflow, target_agents, input_artifacts, created); all contain substantive domain-specific content (not placeholder text)
  - [x] 1.4 Write the journey document header with narrative introduction explaining what the reader will experience

- [x] Task 2: Capture Emma (Contextualize) section — Stream 1, non-HC entry point (AC: #1, #2, #3, #4, #5)
  - [x] 2.1 Load `_bmad/bme/_vortex/agents/contextualization-expert.md` persona, execute `workflows/lean-persona/workflow.md` on "busy parents" domain
  - [x] 2.2 Capture Emma's output — uses `type: lean-persona` frontmatter (NOT HC schema). Save to `_bmad-output/vortex-artifacts/lean-persona-busy-parents-2026-03-01.md`
  - [x] 2.3 Write the Emma section: narrative context (Emma sets the stage by contextualizing the domain) + captured artifact + transition explaining that Isla uses this context to ground empathy research
  - [x] 2.4 Verify agent name "Emma", icon "🎯", title "Contextualization Expert" match registry exactly

- [x] Task 3: Capture Isla (Empathize) section — Stream 2, produces HC1 (AC: #1, #2, #3, #4, #5)
  - [x] 3.1 Load `agents/discovery-empathy-expert.md` persona, execute `workflows/user-discovery/workflow.md` using Emma's lean persona as domain context (contextual input, not HC handoff)
  - [x] 3.2 Capture Isla's HC1 artifact output (empathy artifacts). Save to `_bmad-output/vortex-artifacts/hc1-empathy-busy-parents-2026-03-01.md`
  - [x] 3.3 Write the Isla section: what context Isla draws from (Emma's lean persona) + captured HC1 artifact + transition to Mila (HC1 handoff)
  - [x] 3.4 Verify agent name "Isla", icon "🔍", title "Discovery & Empathy Expert" match registry exactly

- [x] Task 4: Capture Mila (Synthesize) section — Stream 3, consumes HC1, produces HC2 (AC: #1, #2, #3, #4, #5)
  - [x] 4.1 Load `agents/research-convergence-specialist.md` persona, execute `workflows/research-convergence/workflow.md` consuming Isla's HC1 empathy artifacts
  - [x] 4.2 Capture Mila's HC2 artifact output (problem definition). Save to `_bmad-output/vortex-artifacts/hc2-problem-definition-busy-parents-2026-03-01.md`
  - [x] 4.3 Write the Mila section: what Mila received (HC1) + captured HC2 artifact + transition to Liam (HC2 handoff)
  - [x] 4.4 Verify agent name "Mila", icon "🔬", title "Research Convergence Specialist" match registry exactly

- [x] Task 5: Capture Liam (Hypothesize) section — Stream 4, consumes HC2, produces HC3 (AC: #1, #2, #3, #4, #5)
  - [x] 5.1 Load `agents/hypothesis-engineer.md` persona, execute `workflows/hypothesis-engineering/workflow.md` consuming Mila's HC2 problem definition
  - [x] 5.2 Capture Liam's HC3 artifact output (hypothesis contract). Save to `_bmad-output/vortex-artifacts/hc3-hypothesis-contract-busy-parents-2026-03-01.md`
  - [x] 5.3 Write the Liam section: what Liam received (HC2) + captured HC3 artifact + transition to Wade (HC3 handoff)
  - [x] 5.4 Verify agent name "Liam", icon "💡", title "Hypothesis Engineer" match registry exactly

- [x] Task 6: Capture Wade (Externalize) section — Stream 5, consumes HC3, produces HC4 (AC: #1, #2, #3, #4, #5)
  - [x] 6.1 Load `agents/lean-experiments-specialist.md` persona, execute `workflows/mvp/workflow.md` consuming Liam's HC3 hypothesis contract. Note: HC4 contract declares `source_workflow: lean-experiment` but `mvp` is the only fully implemented Wade workflow — use `mvp` and set `source_workflow: mvp` in frontmatter
  - [x] 6.2 Capture Wade's HC4 artifact output (experiment context). Save to `_bmad-output/vortex-artifacts/hc4-experiment-context-busy-parents-2026-03-01.md`
  - [x] 6.3 Write the Wade section: what Wade received (HC3) + captured HC4 artifact + transition to Noah (HC4 handoff)
  - [x] 6.4 Verify agent name "Wade", icon "🧪", title "Lean Experiments Specialist" match registry exactly

- [x] Task 7: Capture Noah (Sensitize) section — Stream 6, consumes HC4, produces HC5 (AC: #1, #2, #3, #4, #5)
  - [x] 7.1 Load `agents/production-intelligence-specialist.md` persona, execute `workflows/signal-interpretation/workflow.md` consuming Wade's HC4 experiment context
  - [x] 7.2 Capture Noah's HC5 artifact output (signal report). Save to `_bmad-output/vortex-artifacts/hc5-signal-report-busy-parents-2026-03-01.md`
  - [x] 7.3 Write the Noah section: what Noah received (HC4) + captured HC5 artifact + transition to Max (HC5 handoff)
  - [x] 7.4 Verify agent name "Noah", icon "📡", title "Production Intelligence Specialist" match registry exactly

- [x] Task 8: Capture Max (Systematize) section — Stream 7, consumes HC5 (AC: #1, #2, #3, #4, #5)
  - [x] 8.1 Load `agents/learning-decision-expert.md` persona, execute `workflows/learning-card/workflow.md` consuming Noah's HC5 signal report
  - [x] 8.2 Capture Max's output (learning card + routing decision). Save to `_bmad-output/vortex-artifacts/learning-card-busy-parents-2026-03-01.md`
  - [x] 8.3 Write the Max section: what Max received (HC5) + captured artifact + routing decision narrative (HC6/HC7/HC8 explain how Max routes the Vortex forward)
  - [x] 8.4 Verify agent name "Max", icon "🧭", title "Learning & Decision Expert" match registry exactly

- [x] Task 9: Assemble final journey document and verify completeness (AC: #1-#6)
  - [x] 9.1 Assemble all 7 sections into the journey document with narrative transitions
  - [x] 9.2 Verify all 7 agents present in chain order: Emma → Isla → Mila → Liam → Wade → Noah → Max
  - [x] 9.3 Verify all artifact names, workflow names, agent names match `agent-registry.js` exactly (NFR10)
  - [x] 9.4 Verify HC schema frontmatter in artifacts matches contract files in `_bmad/bme/_vortex/contracts/` (NFR14)
  - [x] 9.5 Verify no placeholder/stub content remains — all artifacts contain substantive busy-parents domain content

## Dev Notes

### This is a CONTENT CREATION story, not a code story

This story involves LLM-assisted artifact capture. The dev agent will:
1. Invoke each Vortex agent via its primary workflow on the "busy parents" domain
2. Capture the output artifact from each agent run
3. Assemble a journey document showing the complete 7-agent chain

**No automated tests are expected.** Validation comes through editorial review in Story 4.3 (`/bmad-editorial-review-prose`).

### Capture Methodology

**Approach:** Single-pass capture with editorial polish.
- Invoke each agent in chain order, feeding previous output as input context
- Capture the first substantive run that demonstrates the agent's core capability
- Light editorial polish for clarity (fix typos, improve readability) but DO NOT alter substance, data, or conclusions
- If an agent produces obviously broken or off-topic output, re-invoke once before moving on

**Quality Bar:**

*Emma (non-HC entry point):*
- Use `type: lean-persona` frontmatter (title, date, created-by, type, status, version) — per `workflows/lean-persona/lean-persona.template.md`
- Contain substantive busy-parents domain content demonstrating contextualization value

*Isla through Max (HC artifact chain):*
- Use correct HC schema frontmatter (contract, type, source_agent, source_workflow, target_agents, input_artifacts, created) — per `contracts/hc{1-5}-*.md`
- Each artifact's `input_artifacts` must reference the actual upstream artifact path produced in previous task

*All artifacts:*
- Contain substantive domain-specific content (not placeholder "[Content here]" text)
- Demonstrate the agent's primary value proposition (e.g., Mila must show research convergence, not just list findings)
- Be internally consistent with artifacts captured from upstream agents

### Agent Chain Order (from compass-routing-reference.md)

The journey has two distinct handoff types:

**1. Emma contextualizes the domain (non-HC entry point):**
Emma produces a `lean-persona` artifact (`type: lean-persona` frontmatter) that establishes the "busy parents" problem space. This is NOT an HC contract handoff — it provides contextual grounding for Isla's empathy research.

**2. HC artifact chain (Isla → Mila → Liam → Wade → Noah → Max):**

| # | Agent | Stream | Primary Workflow | Consumes | Produces | Contract |
|---|-------|--------|-----------------|----------|----------|----------|
| 1 | Emma 🎯 | Contextualize | `lean-persona` | (domain input) | Lean persona | non-HC |
| 2 | Isla 🔍 | Empathize | `user-discovery` | Emma's context | Empathy artifacts | HC1 |
| 3 | Mila 🔬 | Synthesize | `research-convergence` | HC1 | Problem definition | HC2 |
| 4 | Liam 💡 | Hypothesize | `hypothesis-engineering` | HC2 | Hypothesis contract | HC3 |
| 5 | Wade 🧪 | Externalize | `mvp` | HC3 | Experiment context | HC4 |
| 6 | Noah 📡 | Sensitize | `signal-interpretation` | HC4 | Signal report | HC5 |
| 7 | Max 🧭 | Systematize | `learning-card` | HC5 | Learning card | HC6/HC7/HC8 routing |

**Note on Wade (HC4):** The HC4 contract defaults to `source_workflow: lean-experiment`, but `mvp` is the only fully implemented Wade workflow. Use `mvp` and set `source_workflow: mvp` in the captured artifact frontmatter.

### Registry-Exact Names (NFR10)

All names MUST match `scripts/update/lib/agent-registry.js`:

| Agent Name | ID | Icon | Title |
|------------|-----|------|-------|
| Emma | contextualization-expert | 🎯 | Contextualization Expert |
| Isla | discovery-empathy-expert | 🔍 | Discovery & Empathy Expert |
| Mila | research-convergence-specialist | 🔬 | Research Convergence Specialist |
| Liam | hypothesis-engineer | 💡 | Hypothesis Engineer |
| Wade | lean-experiments-specialist | 🧪 | Lean Experiments Specialist |
| Noah | production-intelligence-specialist | 📡 | Production Intelligence Specialist |
| Max | learning-decision-expert | 🧭 | Learning & Decision Expert |

### Artifact Schema Reference (NFR14)

**Emma's lean-persona frontmatter** (from `workflows/lean-persona/lean-persona.template.md`):
```yaml
---
title: "Lean Persona: Busy Parents"
date: 2026-03-01
created-by: Amalik with Emma (contextualization-expert)
type: lean-persona
status: HYPOTHESIS
version: 1.0
---
```

**HC artifact frontmatter** (from `contracts/hc{1-5}-*.md`):
```yaml
---
contract: HC2          # HC1, HC2, HC3, HC4, or HC5
type: artifact
source_agent: mila     # agent ID from registry
source_workflow: research-convergence
target_agents: [liam]  # agent ID(s) from registry
input_artifacts:
  - path: "_bmad-output/vortex-artifacts/hc1-empathy-busy-parents-2026-03-01.md"
    contract: HC1
created: 2026-03-01
---
```

**Contract schemas:** `_bmad/bme/_vortex/contracts/hc{1-5}-*.md`
**Example artifacts (format reference):** `_bmad/bme/_vortex/examples/hc{2,3,5}-example-*.md` (HC2 example uses busy parents domain)

### How to Invoke Each Agent (Capture Mechanics)

Each agent is a markdown persona at `_bmad/bme/_vortex/agents/{id}.md` with workflows at `_bmad/bme/_vortex/workflows/{name}/workflow.md`.

**Capture process per agent:**
1. Load the agent persona file to establish voice and expertise
2. Load the workflow.md for the chosen workflow
3. Execute each step file in `workflows/{name}/steps/step-{NN}-*.md` sequentially
4. Feed the previous agent's artifact as input context where the step references upstream artifacts
5. Capture the final synthesize step's output as the artifact
6. Save the artifact to `_bmad-output/vortex-artifacts/` with correct frontmatter
7. Embed the artifact in the journey document section

**The dev agent IS the LLM executing each persona** — load the persona, adopt the voice, run the workflow, capture the output. No external tool invocation needed.

### Output File Structure

**Journey document:** `_bmad-output/journey-examples/busy-parents-7-agent-journey.md`
**Individual artifacts:** `_bmad-output/vortex-artifacts/` (directory exists, currently empty)

| File | Contents |
|------|----------|
| `_bmad-output/vortex-artifacts/lean-persona-busy-parents-2026-03-01.md` | Emma's lean persona |
| `_bmad-output/vortex-artifacts/hc1-empathy-busy-parents-2026-03-01.md` | Isla's HC1 empathy artifacts |
| `_bmad-output/vortex-artifacts/hc2-problem-definition-busy-parents-2026-03-01.md` | Mila's HC2 problem definition |
| `_bmad-output/vortex-artifacts/hc3-hypothesis-contract-busy-parents-2026-03-01.md` | Liam's HC3 hypothesis contract |
| `_bmad-output/vortex-artifacts/hc4-experiment-context-busy-parents-2026-03-01.md` | Wade's HC4 experiment context |
| `_bmad-output/vortex-artifacts/hc5-signal-report-busy-parents-2026-03-01.md` | Noah's HC5 signal report |
| `_bmad-output/vortex-artifacts/learning-card-busy-parents-2026-03-01.md` | Max's learning card |

**Journey document structure:**
```markdown
# The Busy Parents Journey: A Complete 7-Agent Vortex Walkthrough

## Introduction (narrative: what is this, what will you see)

## 1. Emma 🎯 — Contextualize
### What Emma Does (1-2 paragraphs)
### Captured Artifact: Lean Persona
(full artifact with type: lean-persona frontmatter)
### What Happens Next (contextual transition to Isla)

## 2. Isla 🔍 — Empathize
### What Isla Draws From (Emma's lean persona as context)
### Captured Artifact: HC1 Empathy Artifacts
(full artifact with HC1 frontmatter)
### What Happens Next (HC1 handoff to Mila)

... (repeat for all 7 agents) ...

## 7. Max 🧭 — Systematize
### What Max Receives (HC5 from Noah)
### Captured Artifact: Learning Card
(full artifact)
### The Vortex Continues (HC6/HC7/HC8 routing decision)

## Conclusion (narrative wrap-up)
```

### Previous Epic Intelligence (Epic 3 Retrospective)

Key learnings carried forward:
- **Content creation workflow differs from code workflow** — No lint/test validation. Editorial review replaces automated testing.
- **Reference HC1-HC5 contracts** validated as well-formed by Story 3.3 (39 tests).
- **All 7 agents P0-validated** — content, voice, activation, workflow structure (642 P0 tests).
- **Dynamic discovery confirmed**: All 22 workflows produce valid compass tables, all agent definitions structurally sound.
- **Existing example artifacts use "busy parents" domain** — HC2 example already demonstrates the format on this exact domain.

### Risk Profile

**Risk:** MEDIUM — Content creation with LLM-assisted capture.
- No code to break, no regressions possible
- Risk is in output quality and consistency, not correctness
- Mitigated by: HC schema compliance checks, registry-exact name verification, editorial review in Story 4.3

### Foundation for Stories 4.2 and 4.3

This story creates the raw journey document. It does NOT add:
- Handoff annotations / callout boxes (Story 4.2)
- Self-contained section declarations (Story 4.2)
- Editorial review or prose quality pass (Story 4.3)

Focus on capturing high-quality, real artifacts. Annotation and polish come in subsequent stories.

### Project Structure Notes

- Journey document: `_bmad-output/journey-examples/` (new directory — no existing journey files found)
- Individual artifacts: `_bmad-output/vortex-artifacts/` (directory exists, currently empty)
- Agent personas: `_bmad/bme/_vortex/agents/{id}.md`
- Workflows: `_bmad/bme/_vortex/workflows/{name}/workflow.md` with steps in `steps/`
- Agent registry source of truth: `scripts/update/lib/agent-registry.js`
- HC contract schemas: `_bmad/bme/_vortex/contracts/hc{1-5}-*.md`
- Example artifacts for format reference: `_bmad/bme/_vortex/examples/hc{2,3,5}-example-*.md`

### References

- [Source: _bmad-output/planning-artifacts/epics-phase2.md#Epic 4]
- [Source: _bmad-output/planning-artifacts/prd-phase2.md#FR16, FR17, FR18, NFR9, NFR10, NFR14]
- [Source: _bmad/bme/_vortex/compass-routing-reference.md]
- [Source: scripts/update/lib/agent-registry.js]
- [Source: _bmad/bme/_vortex/contracts/hc1-empathy-artifacts.md through hc5-signal-report.md]
- [Source: _bmad/bme/_vortex/examples/hc2-example-problem-definition.md]
- [Source: _bmad-output/implementation-artifacts/p2-epic-3-retro-2026-03-01.md#Next Epic Preparation]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (claude-opus-4-6)

### Debug Log References

- NFR10 compliance verification: ALL CLEAR — all 7 agent names, IDs, titles, icons, workflow names, and chain ordering match `agent-registry.js` exactly
- HC schema frontmatter verified against `contracts/hc{1-5}-*.md` for all 5 HC artifacts
- Emma lean-persona frontmatter verified against `workflows/lean-persona/lean-persona.template.md`

### Completion Notes List

- Journey document created with all 7 agent sections in correct chain order (Emma → Isla → Mila → Liam → Wade → Noah → Max)
- Domain: "busy parents weeknight dinner decision fatigue" — consistent thread from persona through PATCH routing decision
- Emma uses `type: lean-persona` frontmatter (non-HC entry point); Isla through Max use HC1-HC5 schema frontmatter
- Each artifact's `input_artifacts` references the upstream artifact path correctly
- Max's learning card includes routing decision table (HC6/HC7/HC8) recommending PATCH with adaptive timing
- Key narrative insight: users engage 30-45 min earlier than designed (3:15 PM vs 4:00 PM target)
- Single-pass capture with editorial polish applied per capture methodology
- 7 individual artifacts extracted to `_bmad-output/vortex-artifacts/` for standalone use

### Change Log

| Date | Change | Reason |
|------|--------|--------|
| 2026-03-01 | Created journey document and 7 individual artifacts | Initial implementation of all 9 tasks |
| 2026-03-01 | Code review fixes: corrected A3 mislabeling (partner engagement, not pantry matching), A4 status to Partially Validated, fixed 14→10 weekday arithmetic, fixed 4.1→4.2 baseline drift, added weekend scope expansion note | Adversarial code review — 5 issues fixed |

### File List

- `_bmad-output/journey-examples/busy-parents-7-agent-journey.md` (CREATED — main journey document, ~870 lines)
- `_bmad-output/vortex-artifacts/lean-persona-busy-parents-2026-03-01.md` (CREATED — Emma's lean persona)
- `_bmad-output/vortex-artifacts/hc1-empathy-busy-parents-2026-03-01.md` (CREATED — Isla's HC1 empathy artifacts)
- `_bmad-output/vortex-artifacts/hc2-problem-definition-busy-parents-2026-03-01.md` (CREATED — Mila's HC2 problem definition)
- `_bmad-output/vortex-artifacts/hc3-hypothesis-contract-busy-parents-2026-03-01.md` (CREATED — Liam's HC3 hypothesis contract)
- `_bmad-output/vortex-artifacts/hc4-experiment-context-busy-parents-2026-03-01.md` (CREATED — Wade's HC4 experiment context)
- `_bmad-output/vortex-artifacts/hc5-signal-report-busy-parents-2026-03-01.md` (CREATED — Noah's HC5 signal report)
- `_bmad-output/vortex-artifacts/learning-card-busy-parents-2026-03-01.md` (CREATED — Max's learning card)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` (MODIFIED — p2-4-1 status updates)
