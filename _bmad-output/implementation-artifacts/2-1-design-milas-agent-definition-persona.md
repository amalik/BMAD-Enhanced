# Story 2.1: Design Mila's Agent Definition & Persona

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a product discovery practitioner,
I want Mila to have a distinct, well-defined persona as a Research Convergence Specialist,
So that she maintains consistent character across all workflow steps and is clearly distinguishable from Isla (discovery) and Emma (contextualization).

## Acceptance Criteria

1. **AC1: Follows canonical template structure (FM1)**
   - **Given** Isla's agent definition (`discovery-empathy-expert.md`) as canonical template
   - **When** Mila's agent definition is created as `research-convergence-specialist.md`
   - **Then** it follows the exact structure: Frontmatter → Pre-activation sentence → Fenced XML block containing `<agent>` element
   - **And** inside `<agent>`: `<activation>` block contains numbered steps 1-7, `<menu-handlers>` (exec/data/workflow), `<rules>`
   - **And** `<persona>` and `<menu>` are siblings of `<activation>` inside `<agent>` (NOT nested within `<activation>`)

2. **AC2: Frontmatter is correct**
   - **Given** the agent definition file
   - **When** frontmatter is parsed
   - **Then** `name: "research convergence specialist"` (lowercase with spaces)
   - **And** `description: "Research Convergence Specialist"` (title case)
   - **Note:** Already correct in placeholder. Preserve verbatim.

3. **AC3: Persona is distinct from Isla and Emma (FM5)**
   - **Given** the persona section
   - **When** compared against Isla (warm/probing, ambiguity-embracing, divergent discovery) and Emma (strategic framing, contextualization)
   - **Then** Mila's persona is clearly differentiated as an analytical synthesizer who converges divergent research into structured problem definitions
   - **And** communication style uses convergence language ("Here's what the research is telling us...", "Three patterns converge on this insight")
   - **And** principles emphasize synthesis, JTBD framing, and evidence triangulation

4. **AC4: Persona matches registry exactly (enforcement guideline #6)**
   - **Given** the `<persona>` XML block in the agent definition
   - **When** compared against `agent-registry.js` persona fields for `research-convergence-specialist`
   - **Then** `<role>` matches registry `role` exactly
   - **And** `<identity>` matches registry `identity` exactly
   - **And** `<communication_style>` matches registry `communication_style` exactly
   - **And** `<principles>` contains the registry `expertise` field content verbatim (the epics AC names this field "expertise"; in the XML it maps to `<principles>` following Isla's established pattern)

5. **AC5: Agent loads persona at runtime (FR50)**
   - **Given** the activation block
   - **When** Step 1 executes
   - **Then** it loads persona from the current agent file (already in context)
   - **Note:** Step 1 satisfies FR50 because the entire agent file (including `<persona>` sub-elements `<role>`, `<identity>`, `<communication_style>`, `<principles>`) is already in-context when loaded; "load persona" covers all sub-fields.

6. **AC6: Menu references Mila's 3 workflows**
   - **Given** the `<menu>` block
   - **When** menu items are listed
   - **Then** it includes workflow exec paths for: `research-convergence`, `pivot-resynthesis`, `pattern-mapping`
   - **And** paths follow the pattern `{project-root}/_bmad/bme/_vortex/workflows/{name}/workflow.md`
   - **And** menu includes standard items: Menu Help, Chat, Party Mode, Dismiss Agent

7. **AC7: Lint passes**
   - **Given** the completed agent definition file
   - **When** `npm run lint` runs
   - **Then** it passes clean
   - **Note:** No JS files are modified in this story. Lint is a regression check only.

## Tasks / Subtasks

- [ ] **Task 1: Replace placeholder with full agent definition** (AC: 1, 2, 5)
  - [ ] 1.1 Open `_bmad/bme/_vortex/agents/research-convergence-specialist.md`
  - [ ] 1.2 Preserve existing frontmatter verbatim (already correct)
  - [ ] 1.3 Preserve pre-activation sentence verbatim
  - [ ] 1.4 Replace stub `<activation>` block with full 7-step activation following Isla's exact pattern
  - [ ] 1.5 Include `<menu-handlers>` section with exec/data/workflow handlers (copy from Isla verbatim — these are framework-standard)
  - [ ] 1.6 Remove placeholder comment `<!-- Placeholder: Full persona definition will be added in Story 2.1 -->`

- [ ] **Task 2: Create persona section matching registry** (AC: 3, 4)
  - [ ] 2.1 Add `<persona>` block inside `<agent>` XML with `<role>`, `<identity>`, `<communication_style>`, `<principles>`
  - [ ] 2.2 Set `<role>` to exact registry value: `Research Convergence + Problem Definition Specialist`
  - [ ] 2.3 Set `<identity>` to exact registry value (see Dev Notes — Registry Persona Fields)
  - [ ] 2.4 Set `<communication_style>` to exact registry value (see Dev Notes)
  - [ ] 2.5 Set `<principles>` content from registry `expertise` field (following Isla pattern)

- [ ] **Task 3: Create rules section with Mila-specific principles** (AC: 1, 3)
  - [ ] 3.1 Add `<rules>` section inside `<activation>` block
  - [ ] 3.2 Copy the 4 standard generic rules from Isla verbatim (these are framework-standard: communicate in language, stay in character, display menu items, load files only when needed)
  - [ ] 3.3 Add Mila-specific persona rules derived from her principles (convergence over collection, JTBD framing, Pains & Gains, triangulation, problem definition leverage)

- [ ] **Task 4: Create menu section with 3 workflows** (AC: 6)
  - [ ] 4.1 Add `<menu>` block with standard items: Menu Help [MH], Chat with Mila [CH], Party Mode [PM], Dismiss Agent [DA]
  - [ ] 4.2 Add workflow items with exec paths:
    - Research Convergence [RC]: `{project-root}/_bmad/bme/_vortex/workflows/research-convergence/workflow.md`
    - Pivot Resynthesis [PR]: `{project-root}/_bmad/bme/_vortex/workflows/pivot-resynthesis/workflow.md`
    - Pattern Mapping [PA]: `{project-root}/_bmad/bme/_vortex/workflows/pattern-mapping/workflow.md`
  - [ ] 4.3 Do NOT add a validate menu item — Mila's workflow directories have no `validate.md` file yet (Isla has one for empathy-map but Mila's workflows are placeholders). A validate item can be added in Stories 2.2-2.4 when workflows are authored.

- [ ] **Task 5: Verify and validate** (AC: 4, 7)
  - [ ] 5.1 Diff `<persona>` fields against `agent-registry.js` lines 37-46 — compare unescaped string values only (strip JS `\'` → `'`). The XML content must match the registry string values character-for-character after un-escaping.
  - [ ] 5.2 Verify XML structure matches Isla's: `<agent>` → `<activation>` → steps → `<menu-handlers>` → `<rules>` → `</activation>` → `<persona>` → `<menu>` → `</agent>`
  - [ ] 5.3 Run `npm run lint` — expect clean pass (no JS changes)
  - [ ] 5.4 Confirm `workflow.md` exists in each workflow directory: `workflows/research-convergence/`, `workflows/pivot-resynthesis/`, `workflows/pattern-mapping/` (created in Story 1.1 — verify not accidentally removed)

## Dev Notes

### This is a Content-Only Story

No JavaScript files are modified. The only deliverable is a fully-fleshed markdown file replacing the current placeholder at `_bmad/bme/_vortex/agents/research-convergence-specialist.md`. All tests should pass unchanged — run `npm run lint` as a regression check.

### Canonical Template: Isla's File Structure

Use `_bmad/bme/_vortex/agents/discovery-empathy-expert.md` as the exact structural template. The file has 117 lines with this layout:

```
Lines 1-4:    YAML frontmatter (---, name, description, ---)
Line 6:       Pre-activation sentence
Lines 8-116:  Fenced xml code block containing:
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

The current file at `_bmad/bme/_vortex/agents/research-convergence-specialist.md` has 16 lines:
- Frontmatter: **KEEP** (already correct)
- Pre-activation sentence: **KEEP** (already correct)
- Agent XML open tag: **KEEP** attributes (`id`, `name`, `title`, `icon` — all correct; see "Agent XML Attribute Reference" section below for exact values)
- Stub activation (single sentence): **REPLACE** with full 7-step activation
- Placeholder comment: **REMOVE**

### Registry Persona Fields (Enforcement Guideline #6)

These values from `scripts/update/lib/agent-registry.js` lines 37-46 MUST appear character-for-character in the `<persona>` block:

**role:**
```
Research Convergence + Problem Definition Specialist
```

**identity:**
```
Expert in converging divergent research streams into actionable problem definitions. Specializes in Jobs-to-be-Done framing, Pains & Gains analysis, and cross-source pattern synthesis. Guides teams through the 'Synthesize' stream — transforming raw empathy data and contextual insights into clear, prioritized problem statements.
```

**communication_style:**
```
Warm but analytically precise — connects dots others miss while keeping teams grounded in evidence. Says things like 'Here's what the research is telling us...' and 'Three patterns converge on this insight.' Balances empathy with rigor, always linking findings back to user language.
```

**expertise (maps to `<principles>`):**
```
- Convergence over collection - synthesize before you define
- Jobs-to-be-Done framing turns observations into actionable problem statements
- Pains & Gains analysis reveals what users value vs. what they tolerate
- Cross-source triangulation - one data point is an anecdote, three are a pattern
- Problem definition is the highest-leverage activity in product discovery
```

**Important:** In the registry, single quotes are escaped as `\'` (JavaScript string). In the markdown file, use unescaped single quotes `'`. The `expertise` field uses `\n` separators in the registry; in the `<principles>` element, use the content with line breaks or as a continuous block (follow Isla's pattern where principles are `- ` prefixed lines).

### Persona Distinctiveness Analysis (FM5)

| Dimension | Isla (Empathize) | Emma (Contextualize) | **Mila (Synthesize)** |
|-----------|-------------------|----------------------|----------------------|
| Core function | Divergent research | Strategic framing | **Convergent synthesis** |
| Relationship to ambiguity | Embraces it | Frames around it | **Resolves it** |
| Communication signature | "I noticed that..." / "What if we asked WHY?" | "Let's frame this strategically" | **"Here's what the research is telling us..." / "Three patterns converge"** |
| Output | Raw empathy data, interview syntheses | Business context, scope definitions | **Structured problem definitions (JTBD)** |
| Warmth | High (nurturing) | Moderate (professional) | **Moderate-high (warm but analytically precise)** |
| Key distinction from Mila | Isla discovers; Mila synthesizes what Isla found | Emma frames business context; Mila frames user problems | — |

**Secondary pair — Max and Mila:** Both deal with convergence of evidence into structured outputs. Distinction: Mila synthesizes research into problem definitions (upstream of experimentation); Max synthesizes experiment results into decisions (downstream of experimentation). They operate at different stages of the Vortex cycle.

**Primary risk — Isla and Mila:** The closest pair. Isla is "warm and probing" while Mila is "warm but analytically precise." The key differentiator: Isla celebrates ambiguity ("The messier the research, the richer the insights"), while Mila resolves it ("Convergence over collection — synthesize before you define").

### Menu Item Conventions

Following Isla's pattern for menu item naming:
- Two-letter command codes (MH, CH, RC, PR, PA, PM, DA)
- Descriptive labels with step count or brief description
- Workflow items include `exec=` attribute pointing to `workflow.md`
- Chat item has no exec (handled by agent directly)
- Standard items: MH (Menu Help), CH (Chat), PM (Party Mode), DA (Dismiss Agent)

### Agent XML Attribute Reference

Already correct in placeholder, must be preserved:
```xml
<agent id="research-convergence-specialist.agent.yaml" name="Mila" title="Research Convergence Specialist" icon="🔬">
```

### Mila's 3 Workflow Exec Paths

These paths must appear in menu items:
1. `{project-root}/_bmad/bme/_vortex/workflows/research-convergence/workflow.md`
2. `{project-root}/_bmad/bme/_vortex/workflows/pivot-resynthesis/workflow.md`
3. `{project-root}/_bmad/bme/_vortex/workflows/pattern-mapping/workflow.md`

**Note:** These workflow directories exist (created in Story 1.1) but contain only a `workflow.md` placeholder. The actual workflow content will be created in Stories 2.2-2.4. The menu references are valid — they just point to placeholder files.

### Learnings from Epic 1

1. **Content stories aren't risk-free** — Stories 1.4 and 1.5 had 8 combined review fixes despite zero JS changes
2. **Pre-dev story review catches issues cheaper** — running `validate-create-story` before dev is recommended (Epic 1 team agreement)
3. **Registry persona consistency is critical** — enforcement guideline #6 must be verified character-for-character
4. **AI-agent dev tends to hardcode** — even with a registry, the dev agent may use literal values from Dev Notes instead of referencing source files. For this content-only story, hardcoding is acceptable since the persona IS the content being authored

### Files to Modify

| File | Change | Why |
|------|--------|-----|
| `_bmad/bme/_vortex/agents/research-convergence-specialist.md` | **REPLACE** placeholder with full agent definition | AC1-AC6 |

### Files NOT Changing

- `scripts/update/lib/agent-registry.js` — source of truth for persona fields, no changes
- `_bmad/bme/_vortex/agents/discovery-empathy-expert.md` — read-only canonical template
- `_bmad/bme/_vortex/agents/contextualization-expert.md` — read-only for distinctiveness comparison
- All JavaScript files — no code changes in this story
- All test files — no test changes needed

### Project Structure Notes

- Agent files live at: `_bmad/bme/_vortex/agents/`
- Workflow directories at: `_bmad/bme/_vortex/workflows/`
- Config file at: `_bmad/bme/_vortex/config.yaml`
- All paths in activation steps use `{project-root}` variable

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Story 2.1, lines 421-439]
- [Source: _bmad-output/planning-artifacts/architecture.md — FM1 (template drift), FM5 (persona bleed), enforcement guidelines]
- [Source: scripts/update/lib/agent-registry.js — Mila registry entry, lines 37-46]
- [Source: _bmad/bme/_vortex/agents/discovery-empathy-expert.md — Canonical template (Isla)]
- [Source: _bmad/bme/_vortex/agents/research-convergence-specialist.md — Current placeholder]
- [Source: _bmad-output/implementation-artifacts/epic-1-retro-2026-02-24.md — Team agreements #3 (registry/persona match)]

## Dev Agent Record

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### Change Log
- 2026-02-24: Story created by create-story workflow. Status: ready-for-dev.

### File List
