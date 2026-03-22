# Story 3.1: Design Liam's Agent Definition & Persona

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a product discovery practitioner,
I want Liam to have a distinct persona as a Hypothesis Engineer — a creative peer who challenges and sharpens ideas,
So that he maintains consistent character across all workflow steps and is clearly distinguishable from Mila (convergence) and Wade (experimentation).

## Acceptance Criteria

1. **AC1: Follows canonical template structure (FM1)**
   - **Given** Isla's agent definition (`discovery-empathy-expert.md`) as canonical template
   - **When** Liam's agent definition is created as `hypothesis-engineer.md`
   - **Then** it follows the exact structure: Frontmatter → Pre-activation sentence → Fenced XML block containing `<agent>` element
   - **And** inside `<agent>`: `<activation>` block contains numbered steps 1-7, `<menu-handlers>` (exec/data/workflow), `<rules>`
   - **And** `<persona>` and `<menu>` are siblings of `<activation>` inside `<agent>` (NOT nested within `<activation>`)

2. **AC2: Frontmatter is correct**
   - **Given** the agent definition file
   - **When** frontmatter is parsed
   - **Then** `name: "hypothesis engineer"` (lowercase with spaces)
   - **And** `description: "Hypothesis Engineer"` (title case)
   - **Note:** Already correct in placeholder. Preserve verbatim.

3. **AC3: Persona is distinct from Mila and Wade (FM5)**
   - **Given** the persona section
   - **When** compared against Mila (warm/analytical, convergence, evidence-grounded) and Wade (experimental, evidence-driven, build-measure-learn)
   - **Then** Liam's persona is clearly differentiated as an energetic creative peer who ideates alongside the user, challenges ideas, and engineers testable hypotheses
   - **And** communication style uses challenge language ("That's a safe bet — what's the bold version?", "Let's stress-test that assumption before we build anything")
   - **And** principles emphasize structured brainwriting, 4-field hypothesis contracts, assumption mapping, and falsifiability

4. **AC4: Persona matches registry exactly (enforcement guideline #6)**
   - **Given** the `<persona>` XML block in the agent definition
   - **When** compared against `agent-registry.js` persona fields for `hypothesis-engineer`
   - **Then** `<role>` matches registry `role` exactly
   - **And** `<identity>` matches registry `identity` exactly
   - **And** `<communication_style>` matches registry `communication_style` exactly
   - **And** `<principles>` contains the registry `expertise` field content verbatim (the epics AC names this field "expertise"; in the XML it maps to `<principles>` following Isla's established pattern)

5. **AC5: Agent loads persona at runtime (FR50)**
   - **Given** the activation block
   - **When** Step 1 executes
   - **Then** it loads persona from the current agent file (already in context)
   - **Note:** Step 1 satisfies FR50 because the entire agent file (including `<persona>` sub-elements `<role>`, `<identity>`, `<communication_style>`, `<principles>`) is already in-context when loaded; "load persona" covers all sub-fields.

6. **AC6: Menu references Liam's 3 workflows**
   - **Given** the `<menu>` block
   - **When** menu items are listed
   - **Then** it includes workflow exec paths for: `hypothesis-engineering`, `assumption-mapping`, `experiment-design`
   - **And** paths follow the pattern `{project-root}/_bmad/bme/_vortex/workflows/{name}/workflow.md`
   - **And** menu includes standard items: Menu Help, Chat, Party Mode, Dismiss Agent

7. **AC7: Lint passes**
   - **Given** the completed agent definition file
   - **When** `npm run lint` runs
   - **Then** it passes clean
   - **Note:** No JS files are modified in this story. Lint is a regression check only.

## Tasks / Subtasks

- [x] **Task 1: Replace placeholder with full agent definition** (AC: 1, 2, 5)
  - [x] 1.1 Open `_bmad/bme/_vortex/agents/hypothesis-engineer.md`
  - [x] 1.2 Preserve existing frontmatter verbatim (already correct: `name: "hypothesis engineer"`, `description: "Hypothesis Engineer"`)
  - [x] 1.3 Preserve pre-activation sentence verbatim ("You must fully embody...")
  - [x] 1.4 Replace stub `<activation>` block with full 7-step activation following Isla's exact pattern
  - [x] 1.5 Include `<menu-handlers>` section with exec/data/workflow handlers (copy from Isla verbatim — these are framework-standard)
  - [x] 1.6 Remove placeholder comment `<!-- Placeholder: Full persona definition will be added in Story 3.1 -->`

- [x] **Task 2: Create persona section matching registry** (AC: 3, 4)
  - [x] 2.1 Add `<persona>` block inside `<agent>` XML with `<role>`, `<identity>`, `<communication_style>`, `<principles>`
  - [x] 2.2 Set `<role>` to exact registry value: `Creative Ideation + Hypothesis Engineering Specialist`
  - [x] 2.3 Set `<identity>` to exact registry value (see Dev Notes — Registry Persona Fields)
  - [x] 2.4 Set `<communication_style>` to exact registry value (see Dev Notes)
  - [x] 2.5 Set `<principles>` content from registry `expertise` field (following Isla pattern)

- [x] **Task 3: Create rules section with Liam-specific principles** (AC: 1, 3)
  - [x] 3.1 Add `<rules>` section inside `<activation>` block
  - [x] 3.2 Copy the 4 standard generic rules from Isla verbatim (these are framework-standard: communicate in language, stay in character, display menu items, load files only when needed)
  - [x] 3.3 Add Liam-specific persona rules derived from his principles (structured brainwriting, 4-field contracts, assumption mapping, riskiest assumption first, falsifiable hypotheses)

- [x] **Task 4: Create menu section with 3 workflows** (AC: 6)
  - [x] 4.1 Add `<menu>` block with standard items: Menu Help [MH], Chat with Liam [CH], Party Mode [PM], Dismiss Agent [DA]
  - [x] 4.2 Add workflow items with exec paths:
    - Hypothesis Engineering [HE]: `{project-root}/_bmad/bme/_vortex/workflows/hypothesis-engineering/workflow.md`
    - Assumption Mapping [AM]: `{project-root}/_bmad/bme/_vortex/workflows/assumption-mapping/workflow.md`
    - Experiment Design [ED]: `{project-root}/_bmad/bme/_vortex/workflows/experiment-design/workflow.md`
  - [x] 4.3 Do NOT add a validate menu item — Liam's workflow directories have no `validate.md` file yet. A validate item can be added in Stories 3.2-3.4 when workflows are authored.

- [x] **Task 5: Verify and validate** (AC: 4, 7)
  - [x] 5.1 Diff `<persona>` fields against `agent-registry.js` lines 48-56 — compare unescaped string values only (strip JS `\'` → `'`). The XML content must match the registry string values character-for-character after un-escaping.
  - [x] 5.2 Verify XML structure matches Isla's: `<agent>` → `<activation>` → steps → `<menu-handlers>` → `<rules>` → `</activation>` → `<persona>` → `<menu>` → `</agent>`
  - [x] 5.3 Run `npm run lint` — expect clean pass (no JS changes)
  - [x] 5.4 Confirm `workflow.md` exists in each workflow directory: `workflows/hypothesis-engineering/`, `workflows/assumption-mapping/`, `workflows/experiment-design/` (created in Story 1.1 — verify not accidentally removed)
  - [x] 5.5 Verify contract/schema paths against actual filesystem before referencing (Epic 2 learning)

## Dev Notes

### This is a Content-Only Story

No JavaScript files are modified. The only deliverable is a fully-fleshed markdown file replacing the current placeholder at `_bmad/bme/_vortex/agents/hypothesis-engineer.md`. All tests should pass unchanged — run `npm run lint` as a regression check.

### Canonical Template: Isla's File Structure

Use `_bmad/bme/_vortex/agents/discovery-empathy-expert.md` as the exact structural template. The file has 117 lines with this layout:

```
Lines 1-4:    YAML frontmatter (---, name, description, ---)
Line 6:       Pre-activation sentence
Lines 8-117:  Fenced xml code block containing:
  <agent>     id, name, title, icon attributes
  <activation critical="MANDATORY">
    Steps 1-7:  Load persona, load config.yaml (with error handling), store vars, greeting+menu, help step, wait, dispatch
    <menu-handlers>  exec/data/workflow handlers (framework-standard — copy verbatim)
    <rules>          4 generic + 4-5 persona-specific rules
  </activation>
  <persona>    role, identity, communication_style, principles
  <menu>       item elements with cmd and exec attributes
  </agent>
```

**Critical structural details:**
- The `<persona>` block is OUTSIDE `<activation>` but INSIDE `<agent>`
- The `<menu>` block is OUTSIDE `<activation>` but INSIDE `<agent>`
- The `<rules>` block is INSIDE `<activation>`
- The `<menu-handlers>` block is INSIDE `<activation>`
- All XML is inside a single fenced code block tagged `xml`

### Current Placeholder Content (What Gets Replaced)

The current file at `_bmad/bme/_vortex/agents/hypothesis-engineer.md` has 17 lines:
- Frontmatter: **KEEP** (already correct)
- Pre-activation sentence: **KEEP** (already correct)
- Agent XML open tag: **KEEP** attributes (`id="hypothesis-engineer.agent.yaml"`, `name="Liam"`, `title="Hypothesis Engineer"`, `icon="💡"`)
- Stub activation (single sentence): **REPLACE** with full 7-step activation
- Placeholder comment: **REMOVE**

### Registry Persona Fields (Enforcement Guideline #6)

These values from `scripts/update/lib/agent-registry.js` lines 48-56 MUST appear character-for-character in the `<persona>` block:

**role:**
```
Creative Ideation + Hypothesis Engineering Specialist
```

**identity:**
```
Creative peer who ideates alongside the user rather than facilitating from a distance. Specializes in structured brainwriting, 4-field hypothesis contracts, and assumption mapping. Guides teams through the 'Hypothesize' stream — turning validated problem definitions into testable solution hypotheses.
```

**communication_style:**
```
Energetic and challenging — pushes teams past obvious ideas with provocative 'What if?' questions. Says things like 'That's a safe bet — what's the bold version?' and 'Let's stress-test that assumption before we build anything.' Treats ideation as craft, not chaos.
```

**expertise (maps to `<principles>`):**
```
- Structured brainwriting produces better ideas than unstructured brainstorming
- 4-field hypothesis contracts force clarity: belief, evidence needed, experiment, success criteria
- Assumption mapping separates what we know from what we think we know
- The riskiest assumption gets tested first, not the easiest one
- Good hypotheses are falsifiable — if you can't prove it wrong, it's not a hypothesis
```

**Important:** In the registry, single quotes are escaped as `\'` (JavaScript string). In the markdown file, use unescaped single quotes `'`. The `expertise` field uses `\n` separators in the registry; in the `<principles>` element, use the content with line breaks or as a continuous block (follow Isla's pattern where principles are `- ` prefixed lines).

### Persona Distinctiveness Analysis (FM5)

| Dimension | Mila (Synthesize) | Wade (Externalize) | **Liam (Hypothesize)** |
|-----------|-------------------|---------------------|----------------------|
| Core function | Convergent synthesis | Rapid experimentation | **Creative ideation + hypothesis engineering** |
| Relationship to ideas | Resolves ambiguity into definitions | Tests ideas in the real world | **Generates and challenges ideas** |
| Communication signature | "Here's what the research is telling us..." | "Let's test that assumption" | **"That's a safe bet — what's the bold version?"** |
| Output | Problem definitions (JTBD + Pains & Gains) | Experiment results + validated learnings | **Hypothesis contracts (4-field format)** |
| Warmth | Moderate-high (warm but analytically precise) | Moderate (experimental, evidence-driven) | **High energy (challenging, provocative, creative peer)** |
| Key distinction | Mila synthesizes research; Liam hypothesizes from definitions | Wade tests; Liam designs what to test | — |

**Primary pair — Liam and Wade:** The closest pair. Liam designs hypotheses; Wade tests them. The key differentiator: Liam is a creative peer who generates and challenges ("What if?"), while Wade is a scientist who measures and validates ("What would prove us wrong?"). Liam produces HC3 hypothesis contracts; Wade consumes them.

**Secondary pair — Liam and Mila:** Both deal with structured analysis. Distinction: Mila converges research into problem definitions (upstream); Liam diverges from problem definitions into testable hypotheses (downstream). Different directions of thought: convergent vs. divergent.

### Menu Item Conventions

Following Isla's pattern for menu item naming:
- Two-letter command codes (MH, CH, HE, AM, ED, PM, DA)
- Descriptive labels with brief description
- Workflow items include `exec=` attribute pointing to `workflow.md`
- Chat item has no exec (handled by agent directly)
- Standard items: MH (Menu Help), CH (Chat), PM (Party Mode), DA (Dismiss Agent)

### Agent XML Attribute Reference

Already correct in placeholder, must be preserved:
```xml
<agent id="hypothesis-engineer.agent.yaml" name="Liam" title="Hypothesis Engineer" icon="💡">
```

### Liam's 3 Workflow Exec Paths

These paths must appear in menu items — **verify each `workflow.md` exists before referencing** (Epic 2 learning):
1. `{project-root}/_bmad/bme/_vortex/workflows/hypothesis-engineering/workflow.md`
2. `{project-root}/_bmad/bme/_vortex/workflows/assumption-mapping/workflow.md`
3. `{project-root}/_bmad/bme/_vortex/workflows/experiment-design/workflow.md`

**Note:** These workflow directories exist (created in Story 1.1) but contain only a `workflow.md` placeholder. The actual workflow content will be created in Stories 3.2-3.4. The menu references are valid — they just point to placeholder files.

### Error Message Customization

Error messages in activation steps must be customized for Liam — NOT copy-pasted from Isla's or Mila's error text:
- Config error: "This file is required for **Liam** to operate" (not Isla/Mila)
- Workflow error: "This workflow is required for **Liam** to run hypothesis engineering activities" (not "discovery" or "convergence")
- Help step example: Must reflect Liam's domain, e.g., `/bmad-help I have a problem definition and need to generate testable hypotheses`

### Liam's Voice Guidelines

User guide tips and any in-agent text must use Liam's established voice:
- **Energetic and challenging** — pushes past obvious ideas
- **Key phrases:** "That's a safe bet — what's the bold version?", "Let's stress-test that assumption before we build anything", "What if?", "If you can't prove it wrong, it's not a hypothesis"
- **NEVER use Isla phrases:** "I noticed that...", "embrace ambiguity"
- **NEVER use Mila phrases:** "Here's what the research is telling us...", "Three patterns converge"
- **NEVER use Wade phrases:** "Let's test that assumption" (too close but different: Liam stress-tests ideas, Wade tests in the real world)

### HC3 Contract Reference

Liam's primary output is HC3 (Hypothesis Contract). Schema at: `_bmad/bme/_vortex/contracts/hc3-hypothesis-contract.md`

Key HC3 fields for Story 3.2 awareness (not needed for this story, but context for persona design):
- 4-field format: Expected Outcome, Target Behavior Change, Rationale, Riskiest Assumption
- 1-3 hypotheses per artifact
- Assumption Risk Map with lethality × uncertainty classification
- HC9 flag-driven routing to Isla for unvalidated assumptions

### Learnings from Story 2.1 (Mila's Agent Definition)

1. **Registry persona consistency is critical** — enforcement guideline #6 verified character-for-character. Do the same for Liam.
2. **Error messages must be agent-specific** — Story 2.1 customized error text for Mila. Do the same for Liam.
3. **Help step example must reflect agent domain** — Mila's was "I have scattered research findings and need to define the core problem". Liam needs equivalent for hypothesis engineering.
4. **No validate menu item** — Mila didn't add one because no validate.md existed. Same for Liam.
5. **Persona rules (inside `<rules>`)** — Isla has 4 generic + 4 persona-specific. Mila has 4 generic + 5 persona-specific. Liam should follow the same pattern.
6. **Verify contract paths against filesystem** — Story 2.2 had `handoff-contracts/` instead of `contracts/` caught in code review. Always check actual paths.

### Files to Modify

| File | Change | Why |
|------|--------|-----|
| `_bmad/bme/_vortex/agents/hypothesis-engineer.md` | **REPLACE** placeholder with full agent definition | AC1-AC6 |

### Files NOT Changing

- `scripts/update/lib/agent-registry.js` — source of truth for persona fields, no changes
- `_bmad/bme/_vortex/agents/discovery-empathy-expert.md` — read-only canonical template (Isla)
- `_bmad/bme/_vortex/agents/research-convergence-specialist.md` — read-only for distinctiveness comparison (Mila)
- `_bmad/bme/_vortex/agents/lean-experiments-specialist.md` — read-only for distinctiveness comparison (Wade)
- `_bmad/bme/_vortex/contracts/hc3-hypothesis-contract.md` — HC3 schema (read-only reference for context)
- All JavaScript files — no code changes in this story
- All test files — no test changes needed

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Story 3.1, lines 528-545]
- [Source: _bmad-output/planning-artifacts/architecture.md — FM1 (template drift), FM5 (persona bleed), enforcement guidelines]
- [Source: scripts/update/lib/agent-registry.js — Liam registry entry, lines 48-56]
- [Source: _bmad/bme/_vortex/agents/discovery-empathy-expert.md — Canonical template (Isla)]
- [Source: _bmad/bme/_vortex/agents/hypothesis-engineer.md — Current placeholder]
- [Source: _bmad/bme/_vortex/contracts/hc3-hypothesis-contract.md — HC3 schema (context for persona)]
- [Source: _bmad/bme/_vortex/compass-routing-reference.md — Liam routing: HC2 in, HC3 out, HC9 flag to Isla]
- [Source: _bmad-output/implementation-artifacts/2-1-design-milas-agent-definition-persona.md — Previous analogous story learnings]
- [Source: _bmad-output/implementation-artifacts/epic-2-retro-2026-02-25.md — Epic 2 retro: verify paths against filesystem]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (claude-opus-4-6)

### Debug Log References

### Completion Notes List
- Replaced 17-line placeholder with full 117-line agent definition following Isla's canonical template exactly
- All 4 persona fields match agent-registry.js character-for-character (enforcement guideline #6 verified)
- 4 generic rules + 5 Liam-specific persona rules (structured brainwriting, 4-field contracts, assumption mapping, riskiest-first, falsifiability)
- 3 workflow menu items with verified exec paths (hypothesis-engineering, assumption-mapping, experiment-design)
- Error messages customized for Liam (not copy-pasted from Isla/Mila)
- Help step example reflects Liam's domain
- No validate menu item (no validate.md exists yet — deferred to Stories 3.2-3.4)
- No voice bleed: zero Isla/Mila/Wade phrases detected
- Lint passes clean (no JS changes — regression check only)

### Change Log
- 2026-02-25: Story created by create-story workflow. Status: ready-for-dev.
- 2026-02-25: Implementation complete. Replaced placeholder with full agent definition. All 7 ACs satisfied. Status: review.
- 2026-02-25: Code review passed (0H/0M-after-downgrade/3L). All ACs verified against implementation. Registry persona match confirmed character-for-character. Zero voice bleed. Status: done.

### File List
| File | Action | ACs |
|------|--------|-----|
| `_bmad/bme/_vortex/agents/hypothesis-engineer.md` | REPLACED placeholder with full 117-line agent definition | AC1, AC2, AC3, AC4, AC5, AC6 |
