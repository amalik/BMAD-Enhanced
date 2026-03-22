# Story 3.5: Create Liam User Guide & Example Artifacts

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a product discovery practitioner new to the Vortex,
I want a user guide explaining when and how to use Liam, plus example artifacts showing hypothesis contract format,
So that I understand Liam's role and what his output looks like.

## Acceptance Criteria

1. **AC1: User guide follows established format (NFR19)**
   - **Given** the file `_bmad/bme/_vortex/guides/LIAM-USER-GUIDE.md`
   - **When** compared against `MILA-USER-GUIDE.md` structure
   - **Then** it contains all 9 structural sections: Quick Start, How to Invoke, Menu Options, Workflows, Philosophy, Chatting with Liam, Troubleshooting, Tips from Liam, Credits
   - **And** section ordering matches the established pattern

2. **AC2: Quick Start positions Liam vs. general brainstorming**
   - **Given** the Quick Start section
   - **When** read by a new practitioner
   - **Then** it includes a "Who is Liam?" paragraph with persona summary
   - **And** it includes "When to use Liam" bullet points (6-8)
   - **And** it includes a comparison table: Liam's structured brainwriting vs. general brainstorming
   - **And** it includes a decision aid for choosing Liam vs. brainstorming
   - **And** it includes "What you'll get" output summary (HC3 artifact)

3. **AC3: All 3 workflows documented with accurate details**
   - **Given** the Workflows section
   - **When** each workflow subsection is reviewed
   - **Then** hypothesis-engineering is documented with: description, 5 steps (matching actual step files), output path (`{output_folder}/vortex-artifacts/hc3-hypothesis-contract-{date}.md`), estimated time (90-120 min)
   - **And** assumption-mapping is documented with: description, 4 steps (matching actual step files), output type (working document — no formal artifact file), estimated time (45-90 min)
   - **And** experiment-design is documented with: description, 4 steps (matching actual step files), output path (`{output_folder}/vortex-artifacts/hc3-experiment-design-{date}.md`), estimated time (60-120 min)

4. **AC4: Assumption flagging → Isla backflow explained (HC9)**
   - **Given** the Workflows section or a dedicated subsection
   - **When** the hypothesis-engineering workflow is described
   - **Then** it explains that Liam can flag unvalidated assumptions during ideation (FR10)
   - **And** it explains the HC9 flag-driven routing: Liam → Isla for assumption validation
   - **And** it describes how Flagged Concerns (optional HC3 section) captures these
   - **And** it explains when and why this backflow happens

5. **AC5: Example HC3 artifact demonstrates full schema compliance**
   - **Given** the file `_bmad/bme/_vortex/examples/hc3-example-hypothesis-contract.md`
   - **When** validated against `_bmad/bme/_vortex/contracts/hc3-hypothesis-contract.md`
   - **Then** frontmatter has all 7 required fields: contract (HC3), type (artifact), source_agent (liam), source_workflow (hypothesis-engineering), target_agents ([wade]), input_artifacts (referencing HC2), created (date)
   - **And** body has all 5 sections: Problem Context, Hypothesis Contracts (1-3 in 4-field format), Assumption Risk Map, Recommended Testing Order, Flagged Concerns
   - **And** each hypothesis uses the 4-field format: Expected Outcome, Target Behavior Change, Rationale, Riskiest Assumption
   - **And** each hypothesis includes the statement template: "We believe that [target users] will [expected behavior] because [rationale]"

6. **AC6: Example artifact uses realistic domain with concrete data**
   - **Given** the HC3 example artifact
   - **When** reviewed for realism
   - **Then** it uses a concrete product domain (not abstract placeholders)
   - **And** Assumption Risk Map has realistic lethality × uncertainty classifications
   - **And** Recommended Testing Order has specific methods and minimum evidence thresholds
   - **And** the example is self-consistent — hypotheses trace back to the problem context

7. **AC7: Liam's voice is consistent across all files**
   - **Given** all deliverable files
   - **When** reviewed for persona consistency
   - **Then** Liam's voice (energetic, challenging, creative peer) is present in the user guide
   - **And** zero Isla phrases ("I noticed that...", "embrace ambiguity")
   - **And** zero Mila phrases ("Here's what the research is telling us...", "Three patterns converge")
   - **And** zero Wade phrases ("Let's test that assumption")

8. **AC8: Lint passes**
   - **Given** all new files
   - **When** `npm run lint` runs
   - **Then** it passes clean
   - **Note:** Content-only story. Lint is a regression check only.

## Tasks / Subtasks

- [x] **Task 1: Create LIAM-USER-GUIDE.md** (AC: 1, 2, 3, 4, 7)
  - [x] 1.1 Create `_bmad/bme/_vortex/guides/LIAM-USER-GUIDE.md`
  - [x] 1.2 Write Quick Start section: Who is Liam, When to use Liam (6-8 bullets), Liam vs. general brainstorming comparison table, decision aid, What you'll get
  - [x] 1.3 Write How to Invoke section: slash command method + direct agent file method
  - [x] 1.4 Write Menu Options section matching `hypothesis-engineer.md` agent definition menu ([MH], [CH], [HE], [AM], [ED], [PM], [DA])
  - [x] 1.5 Write Workflows section with 3 subsections:
    - hypothesis-engineering: 5 steps, HC3 output, 90-120 min
    - assumption-mapping: 4 steps, working document output, 45-90 min
    - experiment-design: 4 steps, enriched HC3 output, 60-120 min
  - [x] 1.6 Write HC9 backflow subsection: assumption flagging → Isla routing, when/why it happens, Flagged Concerns section
  - [x] 1.7 Write Philosophy section: Liam's principles from agent definition, stream positioning (Stream 4 — Hypothesize)
  - [x] 1.8 Write Chatting with Liam section: topics and 6-8 example questions
  - [x] 1.9 Write Troubleshooting section: common config/workflow errors
  - [x] 1.10 Write Tips from Liam section: 3-4 tips in Liam's voice
  - [x] 1.11 Write Credits section: agent name, module, submodule, stream, version

- [x] **Task 2: Create HC3 example artifact** (AC: 5, 6, 7)
  - [x] 2.1 Create `_bmad/bme/_vortex/examples/hc3-example-hypothesis-contract.md`
  - [x] 2.2 Write HC3 frontmatter with all 7 required fields (contract, type, source_agent, source_workflow, target_agents, input_artifacts, created)
  - [x] 2.3 Write Section 1: Problem Context (Problem Statement, JTBD Reference, Key Pains Targeted) — realistic domain
  - [x] 2.4 Write Section 2: Hypothesis Contracts (2-3 hypotheses) in 4-field format with hypothesis statement template
  - [x] 2.5 Write Section 3: Assumption Risk Map — full table with Assumption, Hypothesis, Lethality, Uncertainty, Priority, Validation Status
  - [x] 2.6 Write Section 4: Recommended Testing Order — Priority, Assumption, Suggested Method, Minimum Evidence
  - [x] 2.7 Write Section 5: Flagged Concerns — at least 1 flagged concern demonstrating HC9 routing scenario

- [x] **Task 3: Verify and validate** (AC: 7, 8)
  - [x] 3.1 Voice check: scan all files for Isla/Mila/Wade forbidden phrases — must find zero
  - [x] 3.2 Verify user guide follows MILA-USER-GUIDE.md structural pattern (9 sections in order)
  - [x] 3.3 Verify HC3 example validates against `contracts/hc3-hypothesis-contract.md` schema
  - [x] 3.4 Verify workflow step counts match actual step files (hypothesis-engineering: 5, assumption-mapping: 4, experiment-design: 4)
  - [x] 3.5 Run `npm run lint` — expect clean pass

## Dev Notes

### This is a Content-Only Story

No JavaScript files are modified. Deliverables are markdown files only. All tests should pass unchanged — run `npm run lint` as a regression check.

### Pattern Reference: Mila's User Guide (Story 2.5)

Use `_bmad/bme/_vortex/guides/MILA-USER-GUIDE.md` as the structural template. Same 9-section format, adapted for Liam's persona, workflows, and HC3 output.

### Liam's Voice Guidelines

All user guide content must use Liam's established voice:
- **Energetic and challenging** — pushes past obvious ideas
- **Key phrases:** "That's a safe bet — what's the bold version?", "Let's stress-test that assumption before we build anything", "What if?", "If you can't prove it wrong, it's not a hypothesis"
- **Tone:** Creative peer, not facilitator. Ideates alongside the user.
- **NEVER use Isla phrases:** "I noticed that...", "embrace ambiguity"
- **NEVER use Mila phrases:** "Here's what the research is telling us...", "Three patterns converge"
- **NEVER use Wade phrases:** "Let's test that assumption" (too close — Liam stress-tests ideas, Wade tests in the real world)

### Liam vs. General Brainstorming — Key Positioning (AC2)

The Quick Start section must clearly differentiate:

| Aspect | General Brainstorming | Liam's Structured Brainwriting |
|--------|----------------------|-------------------------------|
| Process | Freeform idea generation | 3-round structured brainwriting (obvious → bold → synthesis) |
| Output | List of ideas | 1-3 hypothesis contracts in 4-field format |
| Rigor | No falsifiability check | Every hypothesis must be falsifiable |
| Assumptions | Implicit, unexamined | Explicitly mapped by lethality × uncertainty |
| Next step | "Pick the best idea" | Test the riskiest assumption first |

### HC3 Example Artifact Requirements

The example must demonstrate ALL 5 body sections fully populated:
1. **Problem Context** — concrete domain, specific JTBD, real pains
2. **Hypothesis Contracts (2-3)** — each in 4-field format with hypothesis statement
3. **Assumption Risk Map** — realistic lethality × uncertainty ratings across all assumptions
4. **Recommended Testing Order** — prioritized with specific methods and evidence thresholds
5. **Flagged Concerns** — at least 1 concern showing HC9 routing scenario

**Domain suggestion:** Use a domain consistent with or adjacent to Mila's HC2 example (busy parents / meal planning), OR choose a fresh realistic domain. The key is concrete specificity — no generic placeholders.

**Schema reference:** `_bmad/bme/_vortex/contracts/hc3-hypothesis-contract.md`

### HC9 Backflow Scenario (AC4)

Explain this flow in the user guide:
1. During hypothesis engineering (step-04-assumption-mapping or step-05-synthesize), Liam identifies an assumption that is both HIGH lethality and HIGH uncertainty
2. This assumption is too risky to test without prior validation from real users
3. Liam flags it in the HC3's "Flagged Concerns" section
4. The Compass routing suggests: → Isla 🔍 `user-interview` — ⚡ Unvalidated assumption flagged (HC9)
5. Isla validates the assumption through targeted user research
6. The user returns to Liam with validated evidence to continue

### Workflow Step Counts (Verified from Implementation)

| Workflow | Steps | Step Files |
|----------|-------|-----------|
| hypothesis-engineering | 5 | step-01-setup, step-02-context, step-03-brainwriting, step-04-assumption-mapping, step-05-synthesize |
| assumption-mapping | 4 | step-01-setup, step-02-context, step-03-risk-mapping, step-04-synthesize |
| experiment-design | 4 | step-01-setup, step-02-context, step-03-design, step-04-synthesize |

### Compass Routing for Liam (From compass-routing-reference.md)

**hypothesis-engineering:**
- Route 1: → Wade 🧪 `lean-experiment` — Hypothesis contracts ready for testing (HC3)
- Route 2: → Isla 🔍 `user-interview` — ⚡ Unvalidated assumption flagged (HC9)

**assumption-mapping:**
- Route 1: → Isla 🔍 `user-discovery` — High-risk assumptions need validation
- Route 2: → Wade 🧪 `lean-experiment` — Assumptions acceptable, proceed to test (HC3)
- Route 3: → Liam 💡 `hypothesis-engineering` — Refine hypotheses based on risk map

**experiment-design:**
- Route 1: → Wade 🧪 `lean-experiment` — Experiment design ready for execution (HC3)
- Route 2: → Liam 💡 `hypothesis-engineering` — Revise hypothesis based on design constraints
- Route 3: → Isla 🔍 `user-interview` — Pre-experiment validation needed

### Files to Create

| File | Action | Why |
|------|--------|-----|
| `_bmad/bme/_vortex/guides/LIAM-USER-GUIDE.md` | **NEW** | AC1, AC2, AC3, AC4, AC7 — FR43 |
| `_bmad/bme/_vortex/examples/hc3-example-hypothesis-contract.md` | **NEW** | AC5, AC6, AC7 — FR44 |

### Files NOT Changing

- `_bmad/bme/_vortex/agents/hypothesis-engineer.md` — Liam's agent definition (read-only reference)
- `_bmad/bme/_vortex/contracts/hc3-hypothesis-contract.md` — HC3 schema (read-only reference)
- `_bmad/bme/_vortex/guides/MILA-USER-GUIDE.md` — structural template (read-only reference)
- All workflow step files — completed in Stories 3.2-3.4 (read-only reference)
- All JavaScript files — no code changes
- All test files — no test changes needed

### Learnings from Stories 3.2-3.4

1. **Voice bleed is the #1 risk** — always grep for forbidden phrases before marking complete
2. **Contract paths:** use `contracts/` not `handoff-contracts/`
3. **assumption-mapping output is a working document**, not a formal HC artifact — document this distinction clearly
4. **experiment-design enriches HC3** — adds Section 6 (Experiment Design) to existing HC3 body
5. **Structured brainwriting has 3 rounds:** obvious → bold → synthesis — document this in guide
6. **4-field format is the core:** Expected Outcome, Target Behavior Change, Rationale, Riskiest Assumption

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Story 3.5, FR43, FR44]
- [Source: _bmad-output/planning-artifacts/architecture.md — NFR19, D8, RF1]
- [Source: _bmad/bme/_vortex/guides/MILA-USER-GUIDE.md — Structural template]
- [Source: _bmad/bme/_vortex/agents/hypothesis-engineer.md — Liam persona and menu]
- [Source: _bmad/bme/_vortex/contracts/hc3-hypothesis-contract.md — HC3 schema]
- [Source: _bmad/bme/_vortex/compass-routing-reference.md — Liam routing]
- [Source: _bmad-output/implementation-artifacts/3-2-create-hypothesis-engineering-workflow.md — Learnings]
- [Source: _bmad-output/implementation-artifacts/3-3-create-assumption-mapping-workflow.md — Learnings]
- [Source: _bmad-output/implementation-artifacts/3-4-create-experiment-design-workflow.md — Learnings]
- [Source: _bmad-output/implementation-artifacts/2-5-create-mila-user-guide-example-artifacts.md — Sibling pattern]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

### Completion Notes List

- LIAM-USER-GUIDE.md: 260 lines, 9 sections matching MILA-USER-GUIDE.md structure exactly
- Quick Start includes Liam vs. General Brainstorming comparison table (5 aspects), decision aid, and 6 "When to use" bullets
- All 3 workflows documented with accurate step counts, output paths, and estimated times
- HC9 backflow scenario fully explained with 5-step flow and example Flagged Concerns table
- Tips section uses Liam's authentic voice (4 tips: clarity checkpoint, riskiest assumption, structured brainwriting, falsifiability)
- HC3 example artifact: 3 hypothesis contracts using busy parents meal planning domain (consistent with HC2 example)
- HC3 example references HC2 input artifact path, demonstrating Mila→Liam flow
- Assumption Risk Map: 8 assumptions across H1/H2/H3 with realistic lethality × uncertainty ratings
- Recommended Testing Order: 5 prioritized assumptions with specific methods (concierge, landing page, prototype, wizard of oz, interview)
- Flagged Concerns: 2 concerns, including HC9 routing for willingness-to-pay gap
- Voice check: zero forbidden phrases (Isla/Mila/Wade) across both files
- Lint: clean pass

### Change Log
- 2026-02-25: Story created by create-story workflow. Status: ready-for-dev.
- 2026-02-25: Implementation complete by dev-story workflow. Status: review.
- 2026-02-25: Code review passed (0H, 0M, 2L — all acceptable). Status: done.

### File List
| File | Action | ACs |
|------|--------|-----|
| `_bmad/bme/_vortex/guides/LIAM-USER-GUIDE.md` | NEW | AC1, AC2, AC3, AC4, AC7 |
| `_bmad/bme/_vortex/examples/hc3-example-hypothesis-contract.md` | NEW | AC5, AC6, AC7 |
