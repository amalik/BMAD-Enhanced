---
stepsCompleted: [step-01-validate-prerequisites, step-02-design-epics, step-03-create-stories, step-04-final-validation]
inputDocuments:
  - _bmad-output/planning-artifacts/prd-phase2.md
  - _bmad-output/planning-artifacts/architecture.md
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/epics.md
---

# BMAD-Enhanced Phase 2 - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for BMAD-Enhanced Phase 2 ("Stabilize + Targeted Growth"), decomposing the 34 FRs, 18 NFRs, and 7 deliverables from the Phase 2 PRD into implementation-ready stories. Phase 2 makes the product trustworthy: fixing stale documentation, validating every agent's output, proving the chain works end-to-end, and giving new users a compelling first impression.

## Requirements Inventory

### Functional Requirements

**Documentation Accuracy (6):**

- FR1 [I]: Maintainer can run a programmatic audit that detects all stale references (numbers, deleted paths, word-pattern variants like "four agents" or "original agents") *and* missing content (every agent in registry has docs coverage, every workflow in manifest has a doc reference) across user-facing docs
- FR2 [I]: Maintainer can receive an actionable audit report listing each stale or missing reference with file location, current value, and expected value
- FR3 [U]: New user can navigate all internal links in docs/ without encountering broken references
- FR4 [U]: Returning user can read docs that accurately reflect the current 7-agent, 22-workflow, 268-test reality
- FR5 [I]: Maintainer can execute a two-pass docs fix process with validation between passes to catch regressions introduced by edits
- FR6 [U]: New user can find forward-compatibility guidance in the UPDATE-GUIDE explaining that existing artifacts work with updated agents

**Agent Quality Validation (6):**

- FR7 [I]: Maintainer can validate every agent's activation sequence through automated P0 tests
- FR8 [I]: Maintainer can validate every agent's workflow execution produces well-formed output through automated P0 tests
- FR9 [I]: Maintainer can validate every agent's output uses terminology, framing, and tone markers consistent with the agent's documented communication_style and principles
- FR10 [I]: Maintainer can run infrastructure-level integration checks for Emma and Wade beyond content validation
- FR11 [I]: Maintainer can run the complete P0 suite for all 7 agents as a pre-publish confidence gate
- FR12 [I]: P0 test framework can discover agents dynamically from the agent registry rather than hardcoded file lists

**Handoff Chain Integrity (3):**

- FR13 [I]: Maintainer can validate each handoff contract (HC1-HC5) independently — confirming Agent A's output contains all fields Agent B requires
- FR14 [I]: Content correctness tests can check field presence and non-emptiness without requiring exact string matching
- FR15 [I]: Maintainer can detect handoff contract violations before users encounter silent chain breaks

**Journey Documentation (4):**

- FR16 [U]: New user can follow a complete 7-agent journey example on the busy parents domain with real captured artifacts at every handoff
- FR17 [U]: Journey follower can see handoff annotations (callout boxes/footnotes) explaining which fields each agent consumed and which artifact contract applies
- FR18 [U]: Journey example sections each declare their own context and avoid undefined terms from previous sections, enabling non-linear reading (editorial scope, not automated)
- FR19 [I]: Maintainer can verify journey example quality through editorial checklist + `/bmad-editorial-review-prose`

**Content Correctness Automation (1):**

- FR20 [I]: CI can validate content correctness across agent definitions, workflow references, and handoff schemas — catching stale cross-references, mismatched fields, and structural inconsistencies

**CLI Reliability (2):**

- FR21 [I]: Maintainer can verify bmad-update.js behavior through automated tests at 85%+ line coverage
- FR22 [I]: Maintainer can verify bmad-version.js behavior through automated tests at 85%+ line coverage

**Extension Guidance (3):**

- FR23 [U]: Module extender can find clear guidance that custom agents should be built through BMB or a fork, not hand-rolled manifest entries
- FR24 [U]: Module extender can see a bloat warning explaining that adding agents without proper structure degrades the Vortex signal
- FR25 [U]: Module extender encountering a handoff failure can use the journey example as an implicit format reference to diagnose missing fields

**Discovery Experience (4):**

- FR26 [U]: New user arriving at the README can understand BMAD-Enhanced's value proposition within the first scroll
- FR27 [U]: New user can see example output previews showing what agents actually produce before installing
- FR28 [U]: New user can see a visual overview of how the 7-agent chain connects
- FR29 [U]: New user can reach the journey example in one click from the README

**User Feedback (1):**

- FR30 [U]: User can submit structured feedback identifying which agent or workflow triggered the feedback and categorizing it as a quality issue, missing capability, or general comment (repo-only: GitHub issue template or local file, no external services)

**Vortex Navigation (1):**

- FR31 [U]: User can receive prerequisite guidance from the Vortex Compass when attempting to invoke an agent without required input artifacts (scope note: existing Compass behavior validation, not new feature development)

**Operational Process (3):**

- FR32 [I]: Maintainer can capture scope-adjacent improvements discovered during Phase 2 work into a tracked backlog without interrupting current deliverable progress (intentionally lightweight — a markdown file with a convention, not a tracking system)
- FR33 [I]: Maintainer can conduct a structured post-release review using a checklist template that compares reported issues against existing test coverage to identify validation gaps
- FR34 [I]: Maintainer can execute a scripted end-to-end walkthrough simulating Raya's journey (install → first agent → handoff → journey example) and record friction points encountered — Phase 2 acceptance test

### NonFunctional Requirements

**Test Suite Reliability (4):**

- NFR1: P0 test suites produce consistent results — zero flaky tests. A test that passes once must pass on every subsequent run without code changes.
- NFR2: Test failures surface actionable diagnostics — failure messages identify the specific agent, artifact, or field that failed, not generic assertion errors.
- NFR3: Full P0 suite for all 7 agents completes in under 5 minutes. Slow test suites get skipped before publish. (Baseline TBD during implementation.)
- NFR4: Content correctness tests (FR20) tolerate cosmetic changes (whitespace, formatting) without false failures. Tests validate semantics, not syntax.

**Maintainability (4):**

- NFR5: Adding a new agent to the registry automatically includes it in P0 discovery (FR12) and content correctness validation (FR20) without modifying test code.
- NFR6: Docs audit tool (FR1-2) requires zero manual configuration to run — a single command with no arguments produces the full report.
- NFR7: Phase 2 deliverables introduce no new dependencies beyond what's already in package.json. Test tooling uses existing framework (node:test + c8).
- NFR8: Every test file is self-documenting — a new contributor can understand what a test validates by reading the test file alone, without consulting external docs.

**Content Quality (4):**

- NFR9: Journey example reads as a coherent narrative, not a collection of artifacts. Editorial review confirms narrative flow across all 7 agent sections.
- NFR10: All user-facing documentation uses consistent terminology — agent names, workflow names, artifact names match the registry and manifest exactly. Zero synonyms or abbreviations. (Scope includes README landing page content.)
- NFR11: README landing page (FR26-29) communicates value to a non-technical PM audience, not just developers. Language avoids implementation jargon.
- NFR12: Extension guidance (FR23-25) is actionable within 10 minutes — a module extender can find and follow the BMB path without reading the full docs.

**Compatibility (6):**

- NFR13: npx bmad-enhanced and npx bmad-update work on macOS, Linux, and Windows (PowerShell + CMD) without platform-specific instructions.
- NFR14: Existing _bmad-output/ artifacts from v1.5.x remain usable as inputs to v1.6.x+ agents without regeneration. Handoff contracts are backward-compatible.
- NFR15: Manifest merge during update preserves all user-added rows (custom agents, TEA agents) without duplication or reordering. (Regression guardrail.)
- NFR16: Package installs cleanly on Node.js LTS versions (18, 20, 22) without peer dependency warnings. (Regression guardrail.)
- NFR17: User can submit structured feedback (FR30) in under 30 seconds without leaving the IDE.
- NFR18: Docs audit (FR1-2) includes automated internal link validation — every markdown link reference is checked for target file existence.

### Additional Requirements

- **Test framework:** Existing codebase uses `node:test` + c8 coverage (not Jest). All Phase 2 tests must use this framework. (Corrected from PRD NFR7 which referenced Jest.)
- **Registry location:** Agent registry at `scripts/update/lib/agent-registry.js` — FR12 dynamic discovery should use this as source of truth.
- **Test structure:** Existing `tests/unit/` and `tests/integration/` directories. Phase 2 tests follow same structure.
- **Content format:** Markdown with YAML frontmatter. Content correctness tests (FR20) validate this format.
- **No starter template:** Brownfield extension — no project scaffolding needed.
- **Execution order from PRD:** Docs Fix Pass 1 → P0 Emma+Wade → P0 Content-Only → Content Correctness → Journey Example → CLI Coverage → README Landing Page → Docs Fix Pass 2. Epic structure should respect this dependency chain.
- **Design spike needed:** FR26-29 (Discovery Experience / README Landing Page) require copy, format, and visual approach decisions before epic breakdown.
- **Two P0 templates:** Infrastructure (Emma/Wade: JS + content) and content-only (Mila/Liam/Noah/Isla/Max). Different test complexity per template.
- **Confidence levels for P0 test types:** Activation = high confidence (deterministic). Workflow execution = medium confidence (schema validation). Voice consistency = low confidence (needs human spot-check).

### FR Coverage Map

FR1: Epic 1 - Programmatic docs audit detecting stale references and missing content
FR2: Epic 1 - Actionable audit report with file locations and expected values
FR3: Epic 1 - Fix all broken internal links in docs/
FR4: Epic 1 - Update docs to reflect current 7-agent, 22-workflow, 268-test reality
FR5: Epic 1 - Two-pass docs fix process with inter-pass validation
FR6: Epic 1 - Forward-compatibility guidance in UPDATE-GUIDE
FR7: Epic 2 - P0 activation sequence tests for all agents
FR8: Epic 2 - P0 workflow execution tests producing well-formed output
FR9: Epic 3 - Voice consistency validation (terminology, framing, tone markers)
FR10: Epic 2 - Infrastructure-level integration checks for Emma and Wade
FR11: Epic 3 - Complete P0 suite as pre-publish confidence gate
FR12: Epic 2 - Dynamic agent discovery from registry (not hardcoded)
FR13: Epic 3 - Independent handoff contract validation (HC1-HC5)
FR14: Epic 3 - Field presence/non-emptiness checks without exact string matching
FR15: Epic 3 - Handoff contract violation detection before user impact
FR16: Epic 4 - Complete 7-agent journey example on busy parents domain
FR17: Epic 4 - Handoff annotations explaining consumed fields and contracts
FR18: Epic 4 - Self-contained sections enabling non-linear reading
FR19: Epic 4 - Journey quality verification via editorial checklist
FR20: Epic 3 - CI content correctness validation across agents/workflows/schemas
FR21: Epic 5 - bmad-update.js automated tests at 85%+ line coverage
FR22: Epic 5 - bmad-version.js automated tests at 85%+ line coverage
FR23: Epic 1 - Extension guidance: build through BMB or fork, not hand-rolled
FR24: Epic 1 - Bloat warning about unstructured agent additions
FR25: Epic 1 - Journey example as implicit format reference for handoff debugging
FR26: Epic 5 - README value proposition within first scroll
FR27: Epic 5 - Example output previews before installing
FR28: Epic 5 - Visual overview of 7-agent chain
FR29: Epic 5 - One-click path from README to journey example
FR30: Epic 5 - Structured feedback submission (GitHub issue template or local file)
FR31: Epic 3 - Vortex Compass prerequisite guidance validation
FR32: Epic 6 - Scope-adjacent improvements backlog capture
FR33: Epic 6 - Structured post-release review checklist
FR34: Epic 6 - Scripted end-to-end Raya's journey walkthrough (acceptance test)

## Epic List

### Epic 1: Documentation Accuracy & Extension Guidance
Users and module extenders can trust that all documentation accurately reflects the current system, with clear guidance for extending BMAD safely. Maintainers have automated tooling to detect and fix documentation drift.
**FRs covered:** FR1, FR2, FR3, FR4, FR5, FR6, FR23, FR24, FR25
**Deliverable:** D1 (Docs Fix Pass 1)
**Dependencies:** None — this is the foundation epic
**NFRs addressed:** NFR6 (zero-config audit), NFR10 (consistent terminology), NFR12 (actionable extension guidance), NFR18 (link validation)

### Epic 2: P0 Test Framework & Infrastructure Agent Validation
Maintainers can validate agent activation and workflow execution through a dynamic, registry-driven P0 test framework, with infrastructure-level integration checks for Emma and Wade establishing the test architecture that all subsequent agent validation builds upon.
**FRs covered:** FR7, FR8, FR10, FR12
**Deliverable:** D2 (partial — framework + Emma/Wade)
**Dependencies:** Epic 1 (docs accuracy ensures test assertions reference correct reality)
**NFRs addressed:** NFR1 (zero flaky tests), NFR2 (actionable diagnostics), NFR3 (5-min budget), NFR5 (auto-discovery), NFR7 (no new deps), NFR8 (self-documenting tests)
**Note:** Establishes the two P0 templates — infrastructure (Emma/Wade: JS + content) and content-only (remaining 5 agents). This is the natural checkpoint before expanding to all agents.

### Epic 3: Full Agent Validation & Content Correctness
All 7 agents pass complete P0 suites including voice consistency checks, handoff contracts are independently validated, and CI-level content correctness catches cross-reference drift — establishing the pre-publish confidence gate.
**FRs covered:** FR9, FR11, FR13, FR14, FR15, FR20, FR31
**Deliverable:** D2 (completion) + D4 (Content Correctness)
**Dependencies:** Epic 2 (extends P0 framework to remaining agents, adds content correctness layer)
**NFRs addressed:** NFR1 (consistency), NFR2 (diagnostics), NFR4 (cosmetic tolerance), NFR5 (auto-discovery for new agents), NFR8 (self-documenting)
**Note:** Voice consistency tests (FR9) carry low confidence — human spot-check remains necessary. Handoff contract tests (FR13-15) validate field presence semantically, not syntactically.

### Epic 4: Journey Example & Editorial Quality
New users can follow a complete 7-agent journey on the busy parents domain with real captured artifacts, handoff annotations, and self-contained sections — demonstrating BMAD's end-to-end value through narrative, not documentation.
**FRs covered:** FR16, FR17, FR18, FR19
**Deliverable:** D3 (Journey Example)
**Dependencies:** Epic 3 (HARD — journey requires real P0-validated artifacts at every handoff point, not mocked content)
**NFRs addressed:** NFR9 (coherent narrative), NFR10 (consistent terminology), NFR14 (backward-compatible artifacts)
**Note:** FR18 (non-linear reading) is editorial scope — validated by checklist and `/bmad-editorial-review-prose`, not automated tests.

### Epic 5: CLI Reliability, Discovery Experience & User Feedback
CLI tools are hardened with 85%+ test coverage, the README landing page communicates BMAD's value to non-technical PMs, and users can submit structured feedback — three independent work streams unified by their shared goal of making BMAD approachable and trustworthy from first contact.
**FRs covered:** FR21, FR22, FR26, FR27, FR28, FR29, FR30
**Deliverable:** D5 (CLI Coverage) + D6 (README Landing Page) + D7 (Structured Feedback)
**Dependencies:** Epic 4 (journey example provides the "one click from README" target for FR29; output previews for FR27 can reference journey artifacts)
**NFRs addressed:** NFR7 (no new deps for CLI tests), NFR11 (non-technical PM audience), NFR13 (cross-platform CLI), NFR15 (manifest merge), NFR16 (Node LTS), NFR17 (feedback in <30 seconds)
**Note:** Three independent work streams within one epic. CLI coverage (FR21-22) can proceed in parallel with README design spike (FR26-29). FR30 (feedback) is lightweight and independent. Design spike needed for README format/visual approach before story breakdown.

### Epic 6: Release Readiness & Final Integration
Maintainers can execute the complete release process — capturing lessons learned, running the scripted Raya's journey acceptance test, and completing Docs Fix Pass 2 to catch any regressions introduced by Epics 1-5.
**FRs covered:** FR32, FR33, FR34
**Deliverable:** Cross-cutting operational process + D1 (Docs Fix Pass 2)
**Dependencies:** All previous epics (Pass 2 validates docs after all content changes; acceptance test exercises the full chain)
**NFRs addressed:** NFR6 (zero-config audit for Pass 2), NFR10 (final terminology consistency), NFR18 (final link validation)
**Note:** FR32 (backlog capture) is active throughout Phase 2 — the story creates the convention but the file accumulates items across all epics. FR34 is the Phase 2 acceptance test.

## Epic 1: Documentation Accuracy & Extension Guidance

Users and module extenders can trust that all documentation accurately reflects the current system, with clear guidance for extending BMAD safely. Maintainers have automated tooling to detect and fix documentation drift.

### Story 1.1: Build Programmatic Docs Audit Tool

As a maintainer,
I want to run a single zero-config command that scans all user-facing docs for stale references, missing content, and broken internal links,
So that I get an actionable report identifying every drift item with file location, current value, and expected value — without manual inspection.

**Acceptance Criteria:**

**Given** the maintainer is in the project root with no prior configuration
**When** they run the docs audit command (single command, no arguments per NFR6)
**Then** the tool scans all markdown files under `docs/` and root-level user-facing docs
**And** detects stale numeric references (e.g., "four agents" vs actual 7, incorrect workflow/test counts)
**And** detects stale path references (deleted files, renamed paths)
**And** detects word-pattern variants that contradict current reality (e.g., "original agents")
**And** detects missing content (every agent in the registry has docs coverage, every workflow in the manifest has a doc reference)
**And** validates all internal markdown links for target file existence (NFR18)
**And** produces a report listing each finding with: file path, line number, current value, expected value, and finding category
**And** the report is structured for both human reading and programmatic consumption
**And** the tool uses no dependencies beyond what exists in package.json (NFR7)
**And** the tool derives expected agent count, workflow count, and agent names dynamically from the agent registry and workflow manifest — not from hardcoded values — so audit expectations auto-update when the registry changes
**And** the tool exits with a non-zero code when findings exist (enabling CI integration)

### Story 1.2: Execute Docs Fix Pass 1 — Stale References & Broken Links

As a new or returning user,
I want all documentation to accurately reflect the current 7-agent, 22-workflow, 268-test reality with zero broken internal links,
So that I can trust what I read and navigate docs without hitting dead ends.

**Acceptance Criteria:**

**Given** the docs audit tool from Story 1.1 has produced a findings report
**When** the maintainer applies fixes to all identified stale references and broken links
**Then** all numeric references across docs match current reality (agent count, workflow count, test count)
**And** all path references point to existing files
**And** all word-pattern variants are updated to current terminology (NFR10)
**And** all internal markdown links resolve to existing targets
**And** re-running the audit tool produces zero findings for stale references and broken links categories
**And** no new regressions are introduced by the edits (verified by re-running the full audit)

### Story 1.3: Add Forward-Compatibility & Extension Guidance

As a module extender or new user,
I want clear guidance on how to safely extend BMAD and confidence that existing artifacts remain compatible across updates,
So that I can extend the system through proper channels and upgrade without regenerating my work.

**Acceptance Criteria:**

**Given** a new user reading the UPDATE-GUIDE
**When** they look for forward-compatibility information
**Then** they find a section explaining that existing `_bmad-output/` artifacts work with updated agents without regeneration (FR6)
**And** the guidance is specific about what is and isn't backward-compatible

**Given** a module extender looking to add a custom agent
**When** they search docs for extension guidance
**Then** they find clear direction that custom agents should be built through BMB (BMAD Module Builder) or a repository fork — not hand-rolled manifest entries (FR23)
**And** they see a bloat warning explaining that adding agents without proper structure degrades the Vortex signal (FR24)
**And** the guidance is actionable within 10 minutes — they can find and follow the BMB path without reading full docs (NFR12)

**Given** a module extender encountering a handoff failure
**When** they need to diagnose missing fields
**Then** they can find a note pointing to the journey example as an implicit format reference for correct handoff structure (FR25)
**And** the reference includes a placeholder path to the journey example location (to be validated after Epic 4 completes the actual journey content)

### Story 1.4: Validate Pass 1 Completeness & Document Inter-Pass Checkpoint

As a maintainer,
I want to execute the inter-pass validation gate and document the two-pass process,
So that I have confidence Pass 1 is complete and a repeatable process for Pass 2 after all Phase 2 content changes.

**Acceptance Criteria:**

**Given** all Pass 1 fixes from Stories 1.2 and 1.3 have been applied
**When** the maintainer runs the docs audit tool as an inter-pass validation
**Then** the report confirms zero findings across all categories addressed in Pass 1
**And** the two-pass process is documented (what Pass 1 covers, what Pass 2 will re-validate after Epics 2-5)
**And** the inter-pass checkpoint is recorded so Pass 2 (Epic 6) can compare against this baseline
**And** any findings that are expected to be addressed by later epics are explicitly noted as "deferred to Pass 2"

## Epic 2: P0 Test Framework & Infrastructure Agent Validation

Maintainers can validate agent activation and workflow execution through a dynamic, registry-driven P0 test framework, with infrastructure-level integration checks for Emma and Wade establishing the test architecture that all subsequent agent validation builds upon.

### Story 2.1: Build Registry-Driven P0 Test Framework

As a maintainer,
I want a P0 test framework that dynamically discovers agents from the registry and provides shared test harness, helpers, and assertion utilities,
So that adding a new agent to the registry automatically includes it in P0 validation without modifying test code.

**Acceptance Criteria:**

**Given** the agent registry at `scripts/update/lib/agent-registry.js` contains agent entries
**When** the P0 test framework initializes
**Then** it dynamically discovers all registered agents without hardcoded file lists (FR12)
**And** provides shared test helpers for activation sequence validation (FR7)
**And** provides shared test helpers for workflow execution validation (FR8)
**And** defines the infrastructure P0 template (JS + content validation) for Emma/Wade
**And** defines the content-only P0 template for remaining agents (Mila/Liam/Noah/Isla/Max)
**And** all test files are self-documenting — a new contributor understands what each test validates by reading the file alone (NFR8)
**And** test failures surface actionable diagnostics identifying the specific agent, artifact, or field that failed (NFR2)
**And** the framework uses `node:test` + c8 with no new dependencies (NFR7)
**And** adding a new agent to the registry automatically includes it in P0 discovery without modifying test code (NFR5)
**And** expected output schemas are documented for each agent as part of framework setup — defining the structure that workflow execution tests validate against

### Story 2.2: P0 Activation & Workflow Tests for Emma (Infrastructure Template)

As a maintainer,
I want automated P0 tests validating Emma's activation sequence, workflow execution output, and infrastructure-level integration,
So that I can catch Emma regressions before publishing and establish the infrastructure test template for Wade.

**Acceptance Criteria:**

**Given** the P0 test framework from Story 2.1 is in place
**When** the maintainer runs P0 tests for Emma
**Then** activation sequence tests verify Emma loads correctly with expected persona, menu, and instructions (FR7)
**And** workflow execution tests verify Emma produces well-formed output matching expected schema (FR8)
**And** infrastructure-level integration checks validate Emma's JS components beyond content validation (FR10)
**And** all tests produce consistent results — zero flaky tests (NFR1)
**And** the full Emma P0 suite completes within its share of the 5-minute budget (NFR3)
**And** test failures identify the specific activation step, workflow output field, or integration point that failed (NFR2)

### Story 2.3: P0 Activation & Workflow Tests for Wade (Infrastructure Template)

As a maintainer,
I want automated P0 tests validating Wade's activation sequence, workflow execution output, and infrastructure-level integration,
So that both infrastructure agents are validated and the infrastructure P0 template is proven reusable.

**Acceptance Criteria:**

**Given** the infrastructure P0 template established by Emma's tests in Story 2.2
**When** the maintainer runs P0 tests for Wade
**Then** activation sequence tests verify Wade loads correctly with expected persona, menu, and instructions (FR7)
**And** workflow execution tests verify Wade produces well-formed output matching expected schema (FR8)
**And** infrastructure-level integration checks validate Wade's JS components beyond content validation (FR10)
**And** all tests produce consistent results — zero flaky tests (NFR1)
**And** the full Wade P0 suite completes within its share of the 5-minute budget (NFR3)
**And** the infrastructure P0 template required minimal adaptation from Emma to Wade, confirming template reusability

## Epic 3: Full Agent Validation & Content Correctness

All 7 agents pass complete P0 suites including voice consistency checks, handoff contracts are independently validated, and CI-level content correctness catches cross-reference drift — establishing the pre-publish confidence gate.

### Story 3.1: P0 Content-Only Tests for Remaining 5 Agents

As a maintainer,
I want automated P0 tests for Mila, Liam, Noah, Isla, and Max using the content-only template covering activation and workflow execution,
So that all 7 agents have baseline P0 coverage and the content-only template is validated across diverse agent types.

**Acceptance Criteria:**

**Given** the P0 test framework from Story 2.1 and the content-only template definition
**When** the maintainer runs P0 tests for each of the 5 content-only agents
**Then** activation sequence tests verify each agent loads correctly with expected persona, menu, and instructions (FR7 extension)
**And** workflow execution tests verify each agent produces well-formed output matching expected schema (FR8 extension)
**And** tests are generated using the content-only template with agent-specific assertions derived from each agent's definition
**And** all 5 agents' tests produce consistent results — zero flaky tests (NFR1)
**And** each agent's test suite completes within its share of the 5-minute budget (NFR3)
**And** test failures identify the specific agent and the activation step or output field that failed (NFR2)
**And** if the content-only template requires significant per-agent customization beyond assertion values, the story may be split into two stories (3 agents + 2 agents) to maintain single-session sizing

### Story 3.2: Voice Consistency Validation & Full P0 Confidence Gate

As a maintainer,
I want voice consistency checks across all 7 agents and a single command to run the complete P0 suite as a pre-publish gate,
So that I can verify every agent's output matches its documented communication style and have a one-step confidence check before publishing.

**Acceptance Criteria:**

**Given** P0 activation and workflow tests exist for all 7 agents (Stories 2.2, 2.3, 3.1)
**When** the maintainer runs voice consistency tests
**Then** each agent's output is checked for terminology, framing, and tone markers consistent with its documented `communication_style` and `principles` (FR9)
**And** voice consistency results are clearly labeled as low-confidence checks requiring human spot-check

**Given** all individual agent P0 suites are in place
**When** the maintainer runs the complete P0 suite
**Then** all 7 agents' activation, workflow, and voice tests execute as a single pre-publish confidence gate (FR11)
**And** the full suite completes in under 5 minutes (NFR3)
**And** the suite summary reports pass/fail per agent with actionable diagnostics for any failures (NFR2)
**And** the suite discovers agents dynamically — no hardcoded agent list in the runner (NFR5)

### Story 3.3: Handoff Contract Validation Tests

As a maintainer,
I want automated tests that independently validate each handoff contract (HC1-HC5) by confirming Agent A's output contains all fields Agent B requires,
So that I can detect handoff contract violations before users encounter silent chain breaks.

**Acceptance Criteria:**

**Given** the handoff contracts HC1 through HC5 are formalized as explicit schema definitions (creating them from implicit agent behavior if they don't exist as standalone artifacts)
**When** the maintainer runs handoff contract validation tests
**Then** each contract (HC1-HC5) is validated independently — confirming the producing agent's output contains all fields the consuming agent requires (FR13)
**And** field checks validate presence and non-emptiness without requiring exact string matching (FR14)
**And** the tests tolerate cosmetic changes (whitespace, formatting) without false failures — validating semantics, not syntax (NFR4)
**And** contract violations are detected with clear diagnostics identifying the specific contract, missing field, producing agent, and consuming agent (FR15)
**And** test failures surface actionable messages — not generic assertion errors (NFR2)
**And** contract schemas are validated against the PRD and architecture document's intended data flow — not just reverse-engineered from current agent output — to ensure contracts reflect designed behavior, not existing bugs

### Story 3.4: CI Content Correctness & Vortex Compass Validation

As a maintainer,
I want CI-level validation that catches stale cross-references, mismatched fields, and structural inconsistencies across agent definitions, workflow references, and handoff schemas — plus validation that the Vortex Compass provides prerequisite guidance,
So that content correctness drift is caught automatically and users get helpful guidance when invoking agents without required inputs.

**Acceptance Criteria:**

**Given** agent definitions, workflow manifests, and handoff schemas exist in the project
**When** CI runs the content correctness validation suite
**Then** it detects stale cross-references between agents and workflows (FR20)
**And** it detects mismatched fields between handoff schemas and agent definitions (FR20)
**And** it detects structural inconsistencies in agent definitions and workflow references (FR20)
**And** cosmetic changes (whitespace, formatting) do not trigger false failures (NFR4)
**And** adding a new agent to the registry automatically includes it in content correctness validation without modifying test code (NFR5)

**Given** a user attempts to invoke an agent without required input artifacts
**When** the Vortex Compass intercepts the invocation
**Then** the user receives prerequisite guidance identifying which artifacts are missing and which agent/workflow produces them (FR31)
**And** validation confirms this existing Compass behavior works correctly (scope: behavior validation, not new feature development)

## Epic 4: Journey Example & Editorial Quality

New users can follow a complete 7-agent journey on the busy parents domain with real captured artifacts, handoff annotations, and self-contained sections — demonstrating BMAD's end-to-end value through narrative, not documentation.

### Story 4.1: Create 7-Agent Journey Example with Real Artifacts

As a new user,
I want to follow a complete 7-agent journey example on the busy parents domain with real captured artifacts at every handoff point,
So that I can see exactly what BMAD produces end-to-end and understand how each agent builds on the previous agent's output.

**Acceptance Criteria:**

**Given** P0-validated agents from Epics 2-3 are producing well-formed output
**When** the maintainer captures a complete busy parents domain journey
**Then** the journey example includes real (not mocked) artifacts from all 7 agents in chain order (FR16)
**And** each agent section shows the actual input consumed and the actual output produced
**And** artifacts at every handoff point are captured verbatim from real agent runs
**And** all agent names, workflow names, and artifact names match the registry and manifest exactly (NFR10)
**And** existing `_bmad-output/` artifact formats are used without modification (NFR14)
**And** this story involves LLM-assisted artifact capture, not traditional code implementation — capture methodology defines: how each agent is invoked, how output variance is handled (best-of-N selection or single capture with editorial polish), and what constitutes an acceptable artifact

### Story 4.2: Add Handoff Annotations & Self-Contained Sections

As a journey follower,
I want callout boxes explaining which fields each agent consumed and which artifact contract applies, and I want each section to stand alone so I can read non-linearly,
So that I understand the handoff mechanics and can jump to any agent's section without reading the entire journey first.

**Acceptance Criteria:**

**Given** the complete journey example from Story 4.1 exists
**When** annotations are added to each agent section
**Then** each handoff point has a callout box or footnote identifying which fields the receiving agent consumed from the previous agent's output (FR17)
**And** each annotation references the specific handoff contract (HC1-HC5) that applies (FR17)
**And** each agent section declares its own context — defining any terms, artifacts, or concepts it references (FR18)
**And** a reader entering at any section encounters no undefined terms from previous sections (FR18)
**And** the journey still reads as a coherent narrative when read sequentially (NFR9)
**And** terminology is consistent throughout — no synonyms or abbreviations for agent/workflow/artifact names (NFR10)

### Story 4.3: Journey Quality Verification & Editorial Review

As a maintainer,
I want to verify journey example quality through an editorial checklist and `/bmad-editorial-review-prose` validation,
So that the journey reads as a coherent narrative with professional prose quality and all editorial standards are met before publication.

**Acceptance Criteria:**

**Given** the annotated journey example from Stories 4.1 and 4.2 is complete
**When** the maintainer runs the editorial review process
**Then** an editorial checklist is applied covering: narrative flow across all 7 sections, self-contained section validation, handoff annotation completeness, terminology consistency, and prose quality (FR19)
**And** `/bmad-editorial-review-prose` is executed on the journey content to validate communication quality
**And** the journey reads as a coherent narrative, not a collection of artifacts (NFR9)
**And** any editorial issues identified are resolved before the journey is considered complete
**And** the final journey example is ready for linking from the README (supporting Epic 5 FR29)

## Epic 5: CLI Reliability, Discovery Experience & User Feedback

CLI tools are hardened with 85%+ test coverage, the README landing page communicates BMAD's value to non-technical PMs, and users can submit structured feedback — three independent work streams unified by their shared goal of making BMAD approachable and trustworthy from first contact.

### Story 5.1: bmad-update.js Automated Tests at 85%+ Coverage

As a maintainer,
I want automated tests for bmad-update.js achieving 85%+ line coverage,
So that I can confidently ship update CLI changes knowing regressions will be caught.

**Acceptance Criteria:**

**Given** bmad-update.js exists with its current functionality
**When** the maintainer runs the test suite with coverage reporting
**Then** unit and integration tests cover bmad-update.js at 85%+ line coverage measured by c8 (FR21)
**And** tests validate core update behaviors: manifest merge, file copying, version detection
**And** tests verify manifest merge preserves all user-added rows (custom agents, TEA agents) without duplication or reordering (NFR15)
**And** tests include at least 3 edge case scenarios: malformed input handling, partial failure recovery, and duplicate entry handling — coverage target applies to branch coverage, not just line coverage
**And** tests verify cross-platform path handling and OS-specific behaviors via mocked `process.platform` and filesystem abstractions — not actual multi-OS execution (NFR13)
**And** tests verify clean installation on Node.js LTS versions 18, 20, 22 without peer dependency warnings (NFR16)
**And** tests use `node:test` + c8 with no new dependencies (NFR7)
**And** test files are self-documenting (NFR8)

### Story 5.2: bmad-version.js Automated Tests at 85%+ Coverage

As a maintainer,
I want automated tests for bmad-version.js achieving 85%+ line coverage,
So that I can confidently ship version CLI changes knowing regressions will be caught.

**Acceptance Criteria:**

**Given** bmad-version.js exists with its current functionality
**When** the maintainer runs the test suite with coverage reporting
**Then** unit and integration tests cover bmad-version.js at 85%+ line coverage measured by c8 (FR22)
**And** tests validate core version behaviors: version reading, display formatting, comparison logic
**And** tests include at least 3 edge case scenarios: malformed version strings, missing version files, and unexpected format handling — coverage target applies to branch coverage, not just line coverage
**And** tests verify cross-platform path handling and OS-specific behaviors via mocked `process.platform` and filesystem abstractions — not actual multi-OS execution (NFR13)
**And** tests use `node:test` + c8 with no new dependencies (NFR7)
**And** test files are self-documenting (NFR8)

### Story 5.3: README Landing Page — Value Proposition & Visual Overview

As a new user arriving at the README,
I want to understand BMAD-Enhanced's value proposition within the first scroll and see a visual overview of how the 7-agent chain connects,
So that I can quickly decide whether BMAD fits my needs without reading detailed documentation.

**Acceptance Criteria:**

**Given** a new user (non-technical PM audience) visits the README for the first time
**When** they view the first scroll of content
**Then** the value proposition is clear, compelling, and free of implementation jargon (FR26, NFR11)
**And** the language communicates to a non-technical PM audience, not just developers (NFR11)
**And** a visual overview shows how the 7 agents connect in the chain, making the system's flow immediately understandable (FR28)
**And** all agent names and workflow names match the registry and manifest exactly (NFR10)
**And** the design approach (format, visuals, copy tone) has been decided through a design spike before implementation — the spike is the first task within this story, producing a brief decision document covering: layout format (single page vs sections), visual approach (ASCII diagram vs image vs mermaid), and copy tone (PM-first vs developer-first vs dual-audience)

### Story 5.4: README Landing Page — Output Previews & Journey Link

As a new user evaluating BMAD,
I want to see example output previews showing what agents actually produce and reach the journey example in one click,
So that I can see real results before installing and dive deeper when ready.

**Acceptance Criteria:**

**Given** the README landing page from Story 5.3 exists with value proposition and visual overview
**When** the new user scrolls past the initial overview
**Then** they see example output previews showing what at least 2-3 representative agents actually produce (FR27)
**And** previews use real artifacts from the journey example (Epic 4) or representative samples
**And** a clearly visible link reaches the full journey example in one click (FR29)
**And** the link target (journey example from Epic 4) exists and is accessible
**And** output previews avoid implementation jargon and are understandable by a non-technical PM (NFR11)

### Story 5.5: Structured User Feedback Mechanism

As a user,
I want to submit structured feedback identifying which agent or workflow triggered it and categorize it as a quality issue, missing capability, or general comment,
So that my feedback is actionable and routed to the right context without leaving my IDE.

**Acceptance Criteria:**

**Given** a user has feedback about a specific agent or workflow
**When** they use the feedback mechanism
**Then** they can identify which agent or workflow triggered the feedback (FR30)
**And** they can categorize feedback as: quality issue, missing capability, or general comment (FR30)
**And** the mechanism is repo-only — GitHub issue template or local markdown file, no external services (FR30)
**And** feedback submission completes in under 30 seconds without leaving the IDE (NFR17)
**And** the feedback format captures enough context to be actionable (agent/workflow name, category, description)
**And** no new external dependencies are introduced (NFR7)

## Epic 6: Release Readiness & Final Integration

Maintainers can execute the complete release process — capturing lessons learned, running the scripted Raya's journey acceptance test, and completing Docs Fix Pass 2 to catch any regressions introduced by Epics 1-5.

### Story 6.1: Scope-Adjacent Improvements Backlog Convention

As a maintainer,
I want a lightweight markdown-based convention for capturing scope-adjacent improvements discovered during Phase 2 work,
So that good ideas are preserved without interrupting current deliverable progress.

**Acceptance Criteria:**

**Given** the maintainer is working on any Phase 2 story and discovers a scope-adjacent improvement
**When** they need to capture the improvement for later consideration
**Then** a markdown backlog file exists with a documented convention for adding entries (FR32)
**And** each entry captures: discovery context (which story/epic), description, estimated impact, and suggested priority
**And** the convention is intentionally lightweight — a markdown file with a section format, not a tracking system (FR32)
**And** the backlog file is created at the start of Phase 2 and accumulates entries across all epics

### Story 6.2: Execute Docs Fix Pass 2 & Post-Release Review Template

As a maintainer,
I want to re-run the docs audit after all Phase 2 content changes and have a structured post-release review template,
So that documentation regressions introduced by Epics 1-5 are caught before release and I have a repeatable process for evaluating release quality.

**Acceptance Criteria:**

**Given** all content changes from Epics 1-5 are complete
**When** the maintainer executes Docs Fix Pass 2
**Then** the docs audit tool (Story 1.1) is re-run against the full documentation set
**And** the Pass 2 report is compared against the Pass 1 checkpoint baseline (Story 1.4) to identify new regressions
**And** all new findings are resolved — zero stale references, zero broken links, zero missing content
**And** terminology consistency is verified across all docs including new content from Epics 2-5 (NFR10)
**And** all internal links validate successfully (NFR18)
**And** Pass 2 includes a journey example freshness check — verifying that all agent outputs referenced in the journey still match current agent behavior and that handoff annotations reference the finalized (not draft) contract schemas

**Given** a Phase 2 release has been published
**When** the maintainer conducts a post-release review
**Then** a structured checklist template exists for comparing reported issues against existing test coverage (FR33)
**And** the template identifies validation gaps — issues that should have been caught by tests but weren't
**And** the review produces actionable items for strengthening test coverage in future phases

### Story 6.3: Scripted End-to-End Raya's Journey Acceptance Test

As a maintainer,
I want to execute a scripted end-to-end walkthrough simulating Raya's journey from install through first agent, handoff, and journey example,
So that I can verify the complete Phase 2 user experience works as designed and record any friction points before release.

**Acceptance Criteria:**

**Given** all Phase 2 epics (1-5) are complete and docs Pass 2 is clean
**When** the maintainer executes the scripted Raya's journey walkthrough
**Then** the script covers: install via npx → first agent invocation → agent handoff → journey example discovery (FR34)
**And** each step has explicit pass/fail criteria documented in the script
**And** friction points encountered during the walkthrough are recorded with severity and location
**And** the walkthrough validates that `npx bmad-enhanced` works on the target platform (NFR13)
**And** the walkthrough confirms new user can reach the journey example from README in one click (FR29 validation)
**And** the walkthrough confirms Vortex Compass provides prerequisite guidance when artifacts are missing (FR31 validation)
**And** the walkthrough must be executed with fresh-context perspective (someone who did NOT build the Phase 2 content, or simulated via fresh-context LLM agent) to validate navigation is intuitive without insider knowledge
**And** friction points from both insider and outsider perspectives are recorded separately
**And** the acceptance test result (pass/fail with friction log) serves as the Phase 2 release gate
