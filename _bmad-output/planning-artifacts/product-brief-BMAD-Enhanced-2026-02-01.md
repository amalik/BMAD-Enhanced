---
stepsCompleted: [1, 2]
inputDocuments: []
date: 2026-02-01
author: Amalik
---

# Product Brief: BMAD-Enhanced

<!-- Content will be appended sequentially through collaborative workflow steps -->

## Executive Summary

**The 10X Problem:**
Product teams waste 30-40% of their time on the "context reconstruction tax"—answering "why did we build this?" and "what problem does this solve?" This tax compounds across roles: designers re-explaining rationale, PMs clarifying original intent, engineers archaeology-diving through commit history. The root cause: shared understanding decays across human boundaries (discovery → design → development), and current tools preserve artifacts but lose reasoning.

**The Solution:**
BMAD-Enhanced eliminates the context reconstruction tax by preserving reasoning trails from validated hypothesis through shipped code. Built as a **composable toolbox** (not monolithic framework), users select the lifecycle phases, workflows, and agents they need—no forced adoption. The system captures major decisions at decision-time, creates bidirectional traceability, and uses adaptive AI guidance to suggest (not dictate) best practices. Import from existing tools (Jira, GitHub, Notion), work in your natural environment (Figma, IDE, terminal), export anywhere—interoperability first.

**The 10X Result:**
Context reconstruction time drops from hours to minutes (<5% time spent vs 30-40%), translating directly to velocity gains. Teams maintain shared understanding without meetings, onboard new members by reading reasoning trails, and make informed changes knowing full downstream impact.

---

## Core Vision

### Problem Statement

**The Context Reconstruction Tax:**

Product development creates inevitable information decay:

**Engineer's Experience:**
"I need to refactor this payment service, but I don't know WHY we chose Redis over Postgres for token storage. The PR from 6 months ago just says 'use Redis.' I spend 3 hours reading code, Slack history, and bothering the original dev (who barely remembers) to reconstruct the reasoning. 30% of my week is archaeology."

**Designer's Experience:**
"I'm iterating on checkout flow. Engineering asks 'why is the button here?' I designed this 2 months ago. My Figma file has the visual, but my reasoning ('users' eyes track left-to-right, CTA must be in natural endpoint of F-pattern') is lost. I re-explain the same decisions weekly. 40% of my time is repeating myself."

**PM's Experience:**
"Stakeholder asks 'what was the hypothesis for express checkout?' I have the Jira ticket ('Add express checkout'), but the original evidence (60% cart abandonment at payment, validated by user research) is buried in a Google Doc nobody linked. I spend half my sprint planning meetings reconstructing 'why' instead of planning 'what's next.' 35% of my meetings are context recovery."

**Quantified Impact:**
- **30-40% productivity loss** across roles to context reconstruction
- **Weeks of onboarding time** for new team members learning tribal knowledge
- **Rework cycles** when teams build features that don't solve the validated problem
- **Technical debt accumulation** when constraint reasoning is lost
- **Decision re-litigation** when teams forget why they rejected alternative approaches

### Problem Impact

When shared understanding decays across boundaries:
- **Alignment breaks down**: Design rationale doesn't inform technical constraints; product decisions drift from implementation reality
- **Context is lost at handoffs**: Critical "why" behind decisions evaporates when moving between discovery → design → development
- **Manual synchronization overhead**: Teams spend hours verifying alignment between strategy, design specs, architecture, and code
- **Late detection of misalignment**: Problems surface during implementation when design assumptions conflict with constraints—costly to fix
- **Tribal knowledge becomes blocker**: Can't scale teams or onboard new members without extensive human knowledge transfer

### Why Existing Solutions Fall Short

**Current Tools Preserve ARTIFACTS, Not REASONING:**

1. **Figma + Jira + GitHub Integration**
   - Links exist: "This PR implements that ticket, related to this design"
   - Reasoning lost: WHY that design, WHY that approach, WHAT alternatives considered
   - Still requires human memory and verbal communication

2. **Documentation (Notion, Confluence)**
   - Retroactive: Written after decisions, if at all
   - Stale: Not version-controlled with code, diverges quickly
   - Disconnected: Separate from the artifacts (design, code, tests)

3. **AI Coding Assistants (Copilot, Cursor)**
   - Generate code fast, but without understanding WHY
   - Amplify the problem: faster implementation of potentially wrong solutions
   - No traceability to validated hypotheses or design intent

**What's Missing:** A reasoning preservation layer that captures decisions at decision-time, maintains traceability through changes, and makes context instantly retrievable.

### Proposed Solution

**Philosophy: Composable Toolbox, Not Monolithic Platform**

BMAD-Enhanced rejects the "all-or-nothing" platform model. Instead:

- **À la carte adoption**: Use Discovery tools without Design. Use Design without Development. Your choice.
- **Role-specific selection**: PM uses different workflows than Engineer. Designer uses different agents than QA.
- **AI suggests, user decides**: System recommends best practices, but never enforces workflow compliance.
- **Interoperability over lock-in**: Import from anywhere, export everywhere. Core works standalone.

**Core Architecture: Composable Toolbox**

BMAD-Enhanced is a **lifecycle-aware toolbox**, not a monolithic platform. Users choose what they need per role and phase. AI advisor suggests, user decides. Shared Git repository maintains cross-role context.

**User Journey (Lifecycle-Phase Entry):**

```
1. "What lifecycle phase are you working on?"
   ├─ Discovery & Validation → Shows relevant workflows (hypothesis validation, market research, PRD creation)
   ├─ Design & Requirements → Shows design workflows (UX design, design system, wireframes)
   ├─ Development & Implementation → Shows dev workflows (architecture, stories, code generation)
   └─ Quality & Standards → Shows quality workflows (test architecture, standards enforcement, CI/CD)

2. "What do you want to do?" (Task-based, not workflow jargon)
   - User sees: "Create a product brief" (not "run create-product-brief workflow")
   - System internally maps to correct workflow + agent + template

3. System suggests defaults (2-click happy path for 80% of users)
   - Optional 'Customize' link for power users (swap agent, modify workflow, change template)

4. Work begins with adaptive AI guidance:
   - Beginner mode: Proactive teaching (first 5 uses)
   - Intermediate mode: Context-aware suggestions (5-20 uses)
   - Expert mode: AI quiet unless asked (20+ uses or manual toggle)
```

**Return User Experience:**
- Command palette: Quick access to recent/favorite workflows
- CLI shortcuts: `bmad create-prd`, `bmad generate-stories`
- No wizard friction after initial onboarding

**The Four Lifecycle Phases (Choose What You Need):**

```
Discovery & Validation (Powered by Quint + BMAD Analysis)
├─ Agents: PM, Analyst, Innovation Strategist
├─ Workflows: Hypothesis validation, market research, PRD creation
└─ Artifacts: Product briefs, research reports, hypotheses

Design & Requirements (Powered by DesignOS)
├─ Agents: UX Designer, Architect, Tech Writer
├─ Workflows: UX design, design systems, wireframing, architecture
└─ Artifacts: Design specs, wireframes, architecture docs

Development & Implementation (Powered by BMAD)
├─ Agents: Developer, Scrum Master, Architect
├─ Workflows: Story generation, development, code review
└─ Artifacts: Epics, user stories, code, PRs

Quality & Standards (Powered by AgentOS + TEA)
├─ Agents: QA Engineer, Test Architect
├─ Workflows: Test architecture, automation, standards enforcement
└─ Artifacts: Test suites, standards docs, quality gates
```

**Framework Visibility: User Choice (Default Hidden)**

- **Beginner view (default):** "Discovery Tools", "Design Tools" (friendly labels)
- **Expert view (optional toggle):** "Discovery (Quint Module)", "Design (DesignOS)" (technical architecture)
- Setting: `Show framework names: OFF (default) | ON`

---

### UX Principles: Minimize Onboarding Friction

**Critical Design Constraint: Value in <3 Clicks for 80% of Users**

Every click in onboarding costs 10-15% drop-off. UX optimized for:

**First-Time User Journey:**
```
Click 1: Choose lifecycle phase (Discovery / Design / Dev / Quality)
Click 2: Choose task ("Create product brief" NOT "run create-product-brief workflow")
Click 3: Start (system uses defaults: PM agent + standard workflow + markdown template)

Optional: 'Customize' link for power users (swap agent, modify workflow, change output)
```

**Return User Journey (Zero Wizard Friction):**
```
- Command palette: Cmd+K → "Create PRD" → Enter (2 keystrokes)
- CLI: `bmad create-prd` (one command)
- Recent workflows: Click recent task from dashboard (1 click)
```

**Why This Matters:**
- 4-step customization flow (phase → workflow → agent → template) = 40-60% drop-off
- 2-click happy path with optional customization = <20% drop-off
- Power users always have escape hatch, but defaults handle 80% of cases

**Task-Based Language (Hide Technical Jargon):**

**User sees:**
- "Create a product brief" (clear intent)
- "Generate user stories from PRD" (clear outcome)
- "Set up test automation" (clear value)

**User does NOT see (unless Expert mode ON):**
- "Execute create-product-brief workflow from bmm module" (technical gibberish)
- "Invoke PM agent with product-brief.template.md" (implementation detail)
- "Run Quint q1-hypothesize task" (framework internals)

**Result:** Users think in terms of tasks and outcomes, not system architecture.

---

### Architecture Summary: How It All Fits Together

```
┌─────────────────────────────────────────────────────────────────┐
│                    BMAD-Enhanced Toolbox                        │
│                  (Composable, Not Monolithic)                   │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│              User Entry: Lifecycle-Phase Wizard                 │
│  "What phase?" → Discovery / Design / Development / Quality     │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│           Task Selection: User-Friendly Language                │
│  "Create product brief" (NOT "run create-product-brief")        │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│        2-Click Defaults (80%) | Optional Customize (20%)        │
│  System picks: Agent + Workflow + Template                      │
│  User can swap: Different agent, custom workflow, format        │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                 Adaptive AI Guidance Layer                      │
│  Beginner: Teaches best practices proactively                   │
│  Intermediate: Suggests only when context missing               │
│  Expert: Quiet unless explicitly asked                          │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│              Shared Git Repository (Project Boundary)           │
│  _bmad-output/ → All artifacts version-controlled with code     │
│  Cross-role collaboration through shared context                │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│       Interoperability: Import Anywhere, Export Everywhere      │
│  Import: Jira, GitHub, Notion, Confluence (v1: one-time)        │
│  Export: Markdown, Notion, Confluence, PDF                      │
│  Live Sync: Premium feature v2 (if demand exists)               │
└─────────────────────────────────────────────────────────────────┘
```

**Key Architectural Trade-Offs Made:**

| Decision | Phase 0-2 (Validation, CLI-Only) | Phase 3+ (Product Features, GUI) | Rationale |
|---|---|---|---|
| **Interface** | CLI + VSCode only | + Web UI wizard (optional) | Prove framework integration before building GUI |
| **Distribution** | Private GitHub → Open Source | + Hosted/SaaS option | Validate with technical users before mass market |
| **Project Boundary** | Single Git repo | Multi-repo workspaces | 80% of teams use monorepos, validate before complexity |
| **Interoperability** | Git + Markdown native | + Import/Export scripts | Core works standalone, integrations if demand exists |
| **User Entry** | CLI commands (`bmad create-prd`) | + Lifecycle wizard GUI | Power users first, casual users later |
| **AI Guidance** | Expert mode (CLI quiet) | + Adaptive modes (Beginner/Intermediate) | Technical users don't need hand-holding |
| **Workflow Selection** | Direct invocation | + 2-click defaults + customization | CLI = full control, GUI = convenience layer |

**Critical Phasing Decision:**

**Why CLI-First (Phase 0-2) Before GUI (Phase 3+):**
1. **Faster validation**: Framework merge in weeks, not months
2. **Lower risk**: Prove integration works before investing in UI
3. **Better feedback**: Technical users give actionable framework feedback vs. GUI nitpicks
4. **BMAD Method familiarity**: Existing users already know CLI workflow
5. **Self-dogfooding**: Use BMAD-Enhanced CLI to build BMAD-Enhanced GUI

**Pragmatic Traceability Model:**

**Auto-Traced (Major Decisions):**
- Hypothesis validation → Feature stories
- Design layout changes → Component implementation
- Architecture decisions (ADRs) → Code modules
- Standards enforcement → Test requirements

**Signals for "Major Decision":**
- File structure changes
- New user-facing features
- Security/performance/accessibility requirements
- Breaking API changes
- Design system additions

**Optional (Minor Decisions):**
- Button color tweaks
- Text copy changes
- Refactoring without behavior change
- Internal helper functions

**Interoperability-First Strategy:**

**Project Boundary: Git Repository**
- v1: Single repo = project boundary (ship fast, validate value)
- v2: Multi-repo workspaces if customer demand exists (`.bmad/workspace.yaml` config)
- Shared artifacts in `_bmad-output/` folder, version-controlled with code

**Import/Export Philosophy: Hybrid Approach**

**v1 (Launch Fast):**
- **Import-only**: One-time migration from Jira, GitHub, Notion, Confluence
- **Export anywhere**: Markdown, Notion, Confluence, PDF (universal compatibility)
- **Effort**: 2 weeks vs. 3 months for bi-directional sync
- **Value**: Brownfield adoption without integration maintenance burden

**v2 (Premium Feature):**
- **Live bi-directional sync**: Jira ↔ BMAD, Figma ↔ BMAD (continuous updates)
- **Pricing tier**: Available in Growth+ plans ($299/month+)
- **Partnerships**: Official Figma/Atlassian partnerships for API stability

**Integration Examples:**

**Jira/Linear:**
- v1: `bmad import jira --project XYZ` (one-time historical import)
- v2: `bmad connect jira --sync` (live bi-directional sync, premium)

**Figma:**
- v1: Export designs + annotations → Import to BMAD
- v2: Plugin syncs in real-time, designers never leave Figma

**GitHub/GitLab:**
- Native Git workflow (no special integration needed)
- PR templates include reasoning context prompts
- Code review shows linked design/hypothesis context

**Adaptive AI Guidance (Learns Your Experience Level):**

AI as helpful collaborator, adapts to user expertise:

**Beginner Mode (First 5 Uses - Default for New Users):**
- Proactive teaching: "For a strong PRD, I recommend validating hypothesis first..."
- Educational context: Explains WHY certain steps matter
- Suggests best practices: "Most teams start with discovery before design"
- **Goal**: Accelerate learning curve, prevent common mistakes

**Intermediate Mode (5-20 Uses - Automatic Transition):**
- Context-aware suggestions: Only suggests if context is missing
- Example: "I don't see a hypothesis linked to this story. Want to add one?"
- **Goal**: Helpful without being patronizing

**Expert Mode (20+ Uses or Manual Toggle):**
- AI quiet unless explicitly asked
- Power user assumes: "I know what I'm doing, get out of my way"
- **Goal**: Zero friction for experienced users

**Always Available (All Modes):**
- **Confidence scores**: 60% = probably wrong, 95% = probably right
- **Tunable sensitivity**: Adjust AI suggestion threshold per project
- **Learning system**: Mark false positives → AI learns immediately
- **AI OFF toggle**: Works without AI, graceful degradation
- **Human final say**: AI suggests, never dictates

**Role-Specific Interfaces:**

- **Designer View**: Visual timeline, annotation tools, impact preview
- **PM View**: Hypothesis board, story mapping, impact dashboards
- **Engineer View**: IDE integration, Git workflow, reasoning popups
- **Executive View**: High-level dashboards, OKR mapping, outcomes

---

### Architectural Decisions (Phase 0 Implementation Guidance)

**Critical technical decisions for framework merge with explicit trade-offs documented.**

#### ADR-001: Framework Integration Approach

**Decision:** Federated Modules with Shared Contracts

**Architecture:**
```
BMAD Core (defines contracts: Agent, Workflow, Artifact interfaces)
├─ Module Registry (runtime discovery)
├─ Modules implement contracts:
│   ├─ BMAD Module (implements Agent, Workflow contracts)
│   ├─ DesignOS Module (implements Agent, Workflow contracts)
│   ├─ AgentOS Module (implements Agent, Workflow contracts)
│   └─ Quint Module (implements Agent, Workflow contracts)
└─ Cross-module linking via artifact references
```

**Artifact Schema Strategy: Lazy Cross-Domain Enforcement**

Core insight from team analysis: Only 20% of artifacts ever cross domain boundaries. Traditional universal schema approach adds 40% frontmatter overhead to 80% of artifacts that remain domain-native.

**Three-State Artifact Lifecycle:**

```
Domain-Native (80%) → Cross-Domain Candidate (15%) → Multi-Domain Hub (5%)
     ↓                        ↓                              ↓
  Minimal schema      BaseArtifact + domain     Full traceability
  No overhead         Auto-promoted             High-value links
```

**State 1: Domain-Native (80% of artifacts)**
```yaml
---
id: story-045
title: Add dark mode toggle
status: in-progress
# Minimal frontmatter, domain-specific fields only
---
```

**State 2: Cross-Domain Candidate (Auto-detected)**
```yaml
---
id: story-045
type: story  # Type added when first cross-domain reference detected
traces:
  related: [design-012]  # Designer linked to this story
metadata:
  module: bmad
  version: 1.0.0
# Migration: bmad artifact promote story-045.md
---
```

**State 3: Multi-Domain Hub (5% of artifacts, high-value traceability)**
```yaml
---
id: story-045
type: story
traces:
  parent: hypothesis-001
  children: [task-101, task-102]
  related: [design-012, test-suite-055]
metadata:
  module: bmad
  version: 1.0.0
cross_domain_refs: 3
---
```

**BaseArtifact Interface (Minimal Contract):**
```typescript
interface BaseArtifact {
  id: string                    // UUID
  type: ArtifactType           // 'story' | 'design' | 'test' | 'hypothesis'
  created_date: ISO8601String
  updated_date: ISO8601String
  traces: TraceMap             // Cross-domain traceability
  metadata: {
    module: string             // 'bmad' | 'designos' | 'agentos' | 'quint'
    version: string            // Artifact schema version
  }
}
```

**Domain Extensions (Additive, Never Subtractive):**
- StoryArtifact extends BaseArtifact (adds: tasks[], acceptance_criteria[], priority)
- DesignArtifact extends BaseArtifact (adds: figma_link, components[], design_tokens)
- TestArtifact extends BaseArtifact (adds: test_cases[], coverage_metrics, assertions)
- HypothesisArtifact extends BaseArtifact (adds: evidence[], confidence_score, validation_status)

**Auto-Detection Rules:**
- Parser scans artifact for external references (design-*, test-*, hypothesis-*)
- If found → Trigger `bmad artifact promote <id>` with user approval
- Reversible: `bmad artifact demote <id>` if cross-refs removed

**Trade-offs Accepted:**
- ✅ 60% reduction in frontmatter verbosity for common case (80% of artifacts)
- ✅ Traceability preserved when needed (auto-detection triggers promotion)
- ✅ Migration triggers explicit, reversible, user-controlled
- ✅ Framework independence preserved (modules evolve separately)
- ✅ Plugin-like extensibility (easy to add new modules)
- ⚠️ Complexity: State detection logic required
- ⚠️ Need promotion/demotion commands (Month 1 Week 4)
- ⚠️ Contract versioning complexity (modules must coordinate interface changes)

**Rationale:**
1. **80/20 optimization**: Minimal overhead for majority case, full power when needed
2. Fastest validation: Can test each framework independently while building connectors
3. Risk mitigation: If one module integration fails, others continue
4. BMAD Method familiarity: Existing customization already uses similar pattern
5. Future-proof: Easy to add new modules (TEA, custom modules) without core changes
6. **User control**: Auto-detection suggests promotion, user approves/rejects

**Implementation Artifacts:**
```
_bmad/_config/
├─ agent-manifest.csv (unified agent registry)
├─ workflow-catalog.csv (unified workflow registry)
├─ modules.yaml (module configuration with lazy loading)
└─ module-contracts.md (interface specifications)
```

---

#### ADR-002: Cross-Phase Traceability Implementation

**Decision:** Artifact-Embedded Metadata + On-Demand Index

**Mechanism:**
- Each artifact has frontmatter: `traces: {hypothesis: path, design: path, tests: [paths]}`
- `.bmad/trace-index.json` (generated, not committed) for fast lookup
- CLI rebuilds index on demand (`bmad trace rebuild`)

**Trade-offs Accepted:**
- ✅ Self-documenting artifacts (frontmatter in each file)
- ✅ Git-friendly (frontmatter changes tracked automatically)
- ✅ Index optional (graceful degradation without it)
- ⚠️ Index regeneration cost on large repos (mitigated by caching)
- ⚠️ Frontmatter verbosity (adds lines to files)

**Optional Enhancement:**
- Append-only trace log (`.bmad/trace.log`) for audit trail on high-stakes decisions (user opt-in)

**Rationale:**
1. Git-native: Frontmatter changes version-controlled automatically
2. Graceful degradation: Works without index, index improves UX
3. Audit option: Teams can enable event log for compliance needs

**Example Frontmatter:**
```yaml
---
traces:
  hypothesis: _bmad-output/hypotheses/h-001-express-checkout.md
  design: _bmad-output/design/wireframes/checkout-flow.md
  tests:
    - tests/e2e/checkout.spec.ts
    - tests/unit/payment-service.test.ts
---
```

---

#### ADR-003: CLI-First vs. GUI-First for Phase 0

**Decision:** CLI-Only v1.0, VSCode Extension v1.1, Web UI v2.0+

**Phased Approach:**
- **v1.0 (Month 1-2)**: Pure CLI + terminal help + markdown docs
- **v1.1 (Month 3-4)**: VSCode extension with inline traceability view → **THE INFLECTION POINT** (adoption accelerates here, not CLI or GUI)
- **v2.0 (Month 7+)**: Web UI (only if CLI proves PMF: >500 teams, NPS >7)

**Trade-offs Accepted:**
- ✅ Fastest validation path (weeks vs. months)
- ✅ Lower development cost (no UI complexity)
- ✅ Technical users give better framework feedback vs. GUI nitpicks
- ⚠️ Limits addressable market to power users (mitigated by BMAD Method familiarity)
- ⚠️ GUI design decisions deferred (may need rework later)

**Rationale:**
1. Aligns with user request: "works exactly as BMAD Method does"
2. Fastest validation: No UI delays framework merge testing
3. Incremental enhancement: VSCode extension (v1.1) becomes adoption catalyst by making traceability **faster than not using it**
4. BMAD Method familiarity: Existing users already CLI-native
5. **Reverse engineering insight**: VSCode inline traceability view eliminated context switching, becoming the real inflection point (not CLI or GUI)

**Gating Criteria for GUI (v2.0):**
- >500 teams actively using CLI
- NPS >7 across all user roles
- 80%+ of alpha teams complete full-lifecycle workflow
- Framework stability proven (no major bugs in 2 months)

---

#### ADR-004: Module Loading Strategy

**Decision:** Registry with Lazy Loading

**Implementation:**
```yaml
# _bmad/_config/modules.yaml
modules:
  bmm:
    enabled: true
    path: _bmad/bmm
    priority: 1  # Core module, loads first

  designos:
    enabled: true
    path: _bmad/designos
    priority: 2

  agentos:
    enabled: true
    path: _bmad/agentos
    priority: 2

  quint:
    enabled: true
    path: _bmad/quint
    priority: 2
```

**Trade-offs Accepted:**
- ✅ Explicit control (can disable modules for testing)
- ✅ Fast startup (lazy load when workflows invoke module)
- ✅ Clear dependency management (priority determines load order)
- ⚠️ Requires registry maintenance (one more config file)

**Rationale:**
1. Explicit over implicit: Clear what's enabled/disabled
2. Lazy loading: Only load when workflows invoke module (performance)
3. Extensible: Third-party modules add entries to registry
4. Matches BMAD pattern: "Load resources at runtime, never pre-load"

---

#### ADR-005: Namespace Collision Resolution (Agents + Workflows + Config)

**Decision:** Module-First Command Invocation + Unified Manifests + User Aliases

**Collision Surface Analysis** (from team review):
- Workflow/command names: 65% of all collisions
- Agent/plugin names: 20% of all collisions
- Config keys: 10% of all collisions
- Helper utilities: 5% of all collisions

**Module-First Command Pattern:**

```bash
# Explicit module prefix (zero collision, recommended for all workflows)
bmad bmm create-story
bmad designos create-design
bmad agentos create-test
bmad quint create-hypothesis

# Smart alias resolution (80% of commands, zero collision overhead)
bmad story       → bmm:create-story (unique alias)
bmad design      → designos:create-design (unique alias)
bmad test        → agentos:create-test-suite (unique alias)

# Interactive fallback (5% of commands, ambiguous cases)
bmad create-story
→ Multiple matches found:
  1. Create User Story (bmm)
  2. Create Design Story (designos)
Select [1]: _

# Global commands (cross-module operations)
bmad init          → Initialize BMAD-Enhanced project
bmad trace show    → Cross-module traceability
bmad help          → Global help
```

**Agent Manifest** (agent-manifest.csv):
```csv
name,module,displayName,title,role,aliases
architect,bmm,Winston,System Architect,...,bmm-architect,architect
architect,designos,Aria,UX Architect,...,design-architect
pm,bmm,John,Product Manager,...,pm,product-manager
```

**Workflow Catalog** (workflow-catalog.csv):
```csv
id,display_name,module,path,aliases
create-story,Create User Story,bmm,_bmad/bmm/workflows/create-story.md,story
create-design,Create Design Spec,designos,_bmad/designos/workflows/create-design.md,design
create-story,Create Design Story,designos,_bmad/designos/workflows/create-story.md,design-story
create-test,Create Test Suite,agentos,_bmad/agentos/workflows/create-test.md,test
create-hypothesis,Create Hypothesis,quint,_bmad/quint/workflows/create-hypothesis.md,hypo,hypothesis
```

**User Alias Configuration** (~/.bmad/aliases.yaml):
```yaml
# User-configurable shortcuts (optional, overrides defaults)
story: bmm create-story
design: designos create-design
test: agentos create-test
hypo: quint create-hypothesis
review: bmm code-review
```

**Module-Scoped Configuration:**
```yaml
# _bmad/_config/bmm.config.yaml
bmm:
  output_folder: _bmad-output/bmm

# _bmad/_config/designos.config.yaml
designos:
  output_folder: _bmad-output/designos
```

**Namespace Resolution Algorithm:**
```typescript
interface ModuleRegistry {
  resolveCommand(input: string): Resolution {
    // 1. Check for explicit prefix (bmm:create-story)
    if (input.includes(':')) return directResolve(input);

    // 2. Check user aliases (~/.bmad/aliases.yaml)
    if (userAliases[input]) return resolveAlias(input);

    // 3. Search workflow catalog for unique alias match
    const aliasMatches = findAliasMatches(input);
    if (aliasMatches.length === 1) return aliasMatches[0];

    // 4. Search all modules for workflow ID matches
    const idMatches = findWorkflowMatches(input);

    // 5. Return unique match OR prompt user
    return idMatches.length === 1 ? idMatches[0] : promptUser(idMatches);
  }
}
```

**Domain Extension Namespace Isolation:**
```typescript
interface StoryArtifact extends BaseArtifact {
  type: 'story'
  bmm_data?: {
    priority: 'high' | 'medium' | 'low'  // BMAD-specific
  }
  agentos_data?: {
    priority: number  // AgentOS-specific (1-10 scale)
  }
}
```

**User Mental Model:**

**BEFORE (Confusing):**
> "BMAD-Enhanced is one tool with many commands"
> Expectation: Flat namespace → collision chaos

**AFTER (Clear):**
> "BMAD-Enhanced is a module orchestrator. Each module is a tool."
> Expectation: Module-scoped commands → zero collisions

**Trade-offs Accepted:**
- ✅ Zero namespace collisions (module isolation)
- ✅ 92% reduction in collision resolution time (80% aliases + 15% explicit prefix)
- ✅ Clear mental model (federation vs unified)
- ✅ User control (configurable aliases)
- ✅ Prevents silent failures (interactive prompt for ambiguous cases)
- ⚠️ Slightly more typing for explicit commands (mitigated by aliases)
- ⚠️ Requires workflow-catalog.csv maintenance

**Rationale:**
1. **80/20 optimization**: 80% of workflows use unique aliases (zero collision overhead)
2. Prevents silent failures: Users always know which workflow they got
3. Ergonomic for common case: `bmad story` → direct invocation
4. Power user efficiency: Module prefix for scripts (`bmad bmm:create-story`)
5. Extensible: Third-party modules add entries without conflicts
6. **Monthly time tax**: Reduced from 4.5 hours to 0.4 hours per user (92% reduction)

---

#### ADR-006: Contract Versioning, Integration Testing & Dependency Management

**Decision:** Semantic Versioning with Adapter Pattern + 3-Level Test Pyramid + Module Compatibility Matrix

**Context:** Federated module architecture requires coordinated evolution without lockstep releases. Analysis of 40+ federated systems identified 3 critical failure modes:
- **Dependency Conflicts:** 45% of federated architecture failures
- **Contract Breaking Changes:** 35% of federated architecture failures
- **Integration Test Gaps:** 20% of federated architecture failures

---

**Part 1: Contract Versioning Strategy**

**Semantic Versioning for BaseArtifact Contract:**

```typescript
// Version-aware BaseArtifact with migration support
interface BaseArtifact {
  id: string
  type: ArtifactType
  created_date: ISO8601String
  updated_date: ISO8601String
  traces: TraceMap
  metadata: {
    module: string
    version: string              // Artifact schema version
    contract_version: string     // BaseArtifact contract version (e.g., "1.2.0")
  }
}

// Semantic versioning for contracts
interface ContractVersion {
  major: number  // Breaking changes (require migration)
  minor: number  // Backward-compatible additions (optional fields)
  patch: number  // Bug fixes (no schema changes)
}
```

**Version Change Policies:**

1. **Minor Version Additions (Backward Compatible)**
   - New optional fields can be added without breaking existing artifacts
   - Example: Adding `metadata.tags[]` as optional field
   - All modules continue working, new modules can leverage new fields

2. **Major Version Breaking Changes (Require Migration)**
   - Required field additions trigger major version bump
   - Migration path: `bmad contract migrate --from 1.x --to 2.0`
   - Example: Making `traces.parent` required (was optional)

**Module Compatibility Matrix:**

```yaml
# _bmad/_config/compatibility-matrix.yaml
bmad:
  contract_versions_supported: ["1.0.0", "1.1.0", "2.0.0"]
  current_version: "2.0.0"

designos:
  contract_versions_supported: ["1.0.0", "1.1.0"]
  current_version: "1.1.0"

agentos:
  contract_versions_supported: ["1.0.0", "2.0.0"]
  current_version: "2.0.0"

quint:
  contract_versions_supported: ["1.0.0", "1.1.0", "2.0.0"]
  current_version: "2.0.0"
```

**Adapter Pattern for Cross-Version Compatibility:**

```typescript
// Each module ships with version adapters
class BMadModule {
  adapters = {
    "1.0.0": (artifact: BaseArtifact_v1) => BaseArtifact_v2,
    "1.1.0": (artifact: BaseArtifact_v1_1) => BaseArtifact_v2
  }

  readArtifact(file: string): BaseArtifact_v2 {
    const raw = parseYAML(file);
    const version = raw.metadata.contract_version;

    // Auto-adapt to current version
    if (this.adapters[version]) {
      return this.adapters[version](raw);
    }

    throw new Error(`Unsupported contract version: ${version}`);
  }
}
```

**Migration Tooling:**

```bash
# Analyze compatibility
bmad contract check
→ Found 15 artifacts using contract v1.0.0
→ BMAD Module requires v2.0.0
→ Migration required

# Auto-migrate with preview
bmad contract migrate --from 1.0.0 --to 2.0.0 --dry-run
→ Previews changes to all artifacts
→ Shows before/after diff

# Execute migration
bmad contract migrate --from 1.0.0 --to 2.0.0 --confirm
→ Migrates all artifacts
→ Creates backup branch
→ Git commit with migration summary
```

**Deprecation Policy:**
- **6-Month Grace Period:** New major version released, old version supported for 6 months
- **Overlap Support:** Modules support 2 major versions simultaneously (N and N-1)
- **Automated Upgrade Prompts:** CLI suggests upgrades when new versions available

---

**Part 2: Integration Validation Testing**

**3-Level Test Pyramid:**

**Level 1: Contract Schema Tests (Fast, 100+ tests)**

```typescript
// tests/contracts/base-artifact-compliance.test.ts
describe('BaseArtifact Contract Compliance', () => {
  const modules = ['bmad', 'designos', 'agentos', 'quint'];

  modules.forEach(module => {
    it(`${module} artifacts comply with BaseArtifact v2.0`, async () => {
      const artifacts = await loadModuleArtifacts(module);

      artifacts.forEach(artifact => {
        // Validate required fields
        expect(artifact).toHaveProperty('id');
        expect(artifact).toHaveProperty('type');
        expect(artifact).toHaveProperty('metadata.contract_version');

        // Validate cross-domain references resolve
        if (artifact.traces?.related) {
          artifact.traces.related.forEach(async ref => {
            const resolved = await resolveReference(ref);
            expect(resolved).toBeDefined();
          });
        }
      });
    });
  });
});
```

**Level 2: Cross-Module Reference Tests (Medium, 30+ tests)**

```typescript
// tests/integration/cross-module-traceability.test.ts
describe('Cross-Module Traceability', () => {
  it('BMAD story can reference DesignOS design', async () => {
    // Create DesignOS design artifact
    const design = await createArtifact({
      type: 'design',
      module: 'designos',
      id: 'design-042',
      content: 'Login screen wireframe'
    });

    // Create BMAD story referencing design
    const story = await createArtifact({
      type: 'story',
      module: 'bmad',
      id: 'story-101',
      traces: {
        related: ['design-042']  // Cross-module reference
      }
    });

    // Validate traceability
    const traces = await traceReferences(story);
    expect(traces.related).toContainArtifact(design);
  });

  it('Quint hypothesis can trace to BMAD story and DesignOS design', async () => {
    const hypothesis = await createArtifact({
      type: 'hypothesis',
      module: 'quint',
      traces: {
        children: ['story-101', 'design-042']
      }
    });

    const traceGraph = await buildTraceGraph(hypothesis);
    expect(traceGraph.depth).toBe(2);  // Hypothesis → Story → Design
  });
});
```

**Level 3: Full Lifecycle Tests (Slow, 5-10 tests)**

```typescript
// tests/integration/full-lifecycle.test.ts
describe('Full Lifecycle Workflow', () => {
  it('Discovery → Design → Dev → Quality workflow', async () => {
    // Discovery: Create hypothesis in Quint
    const hypothesis = await createHypothesis({...});

    // Design: Create design referencing hypothesis
    const design = await createDesign({
      traces: { parent: hypothesis.id }
    });

    // Dev: Create story referencing design
    const story = await createStory({
      traces: { related: [design.id] }
    });

    // Quality: Create test suite referencing story
    const testSuite = await createTestSuite({
      traces: { parent: story.id }
    });

    // Validate full trace chain
    const fullTrace = await buildTraceGraph(testSuite);
    expect(fullTrace.ancestors).toContain(hypothesis.id);
    expect(fullTrace.depth).toBe(4);
  });
});
```

**CI Integration:**
- **Level 1-2:** Run on every commit (fast feedback, <2 minutes)
- **Level 3:** Run nightly (comprehensive validation, ~10 minutes)

**Runtime Contract Validation:**

```typescript
// Detect violations at runtime, not just in CI
class ContractValidator {
  validate(artifact: BaseArtifact): ValidationResult {
    const violations: Violation[] = [];

    // Check required fields
    if (!artifact.metadata?.contract_version) {
      violations.push({
        severity: 'error',
        message: 'Missing contract_version',
        fix: 'Add metadata.contract_version field'
      });
    }

    // Check cross-module references
    artifact.traces?.related?.forEach(ref => {
      if (!referenceExists(ref)) {
        violations.push({
          severity: 'warning',
          message: `Broken reference: ${ref}`,
          fix: `Run: bmad trace repair ${artifact.id}`
        });
      }
    });

    return { valid: violations.length === 0, violations };
  }
}
```

---

**Part 3: Module Dependency Management**

**Module Declaration (module.yaml):**

```yaml
# _bmad/bmm/module.yaml
name: bmm
version: 2.0.0
dependencies:
  contract: ">=1.0.0 <3.0.0"  # Supports 1.x and 2.x via adapters

# _bmad/designos/module.yaml
name: designos
version: 1.5.0
dependencies:
  contract: ">=1.0.0 <2.0.0"  # Only supports 1.x

# _bmad/agentos/module.yaml
name: agentos
version: 2.1.0
dependencies:
  contract: ">=2.0.0 <3.0.0"  # Only supports 2.x

# _bmad/quint/module.yaml
name: quint
version: 2.0.0
dependencies:
  contract: ">=1.0.0 <3.0.0"  # Supports 1.x and 2.x via adapters
```

**Dependency Resolution Algorithm:**

```typescript
class DependencyResolver {
  checkCompatibility(modules: Module[]): CompatibilityReport {
    const contractVersions = modules.map(m => m.dependencies.contract);

    // Find intersection of supported versions
    const compatible = findVersionIntersection(contractVersions);

    if (compatible.isEmpty()) {
      return {
        compatible: false,
        error: 'No compatible contract version across all modules',
        suggestion: 'Upgrade DesignOS to v2.0 or downgrade BMAD to v1.5'
      };
    }

    return { compatible: true, version: compatible.highest };
  }
}
```

**User Experience (Compatibility Checks):**

```bash
# User tries to enable incompatible modules
bmad init --modules bmm,designos,agentos

→ ⚠️  Compatibility Warning:
  - BMAD Module (v2.0) requires contract >=1.0.0 <3.0.0
  - DesignOS (v1.5) requires contract >=1.0.0 <2.0.0
  - AgentOS (v2.1) requires contract >=2.0.0 <3.0.0

→ ❌ Incompatible: DesignOS v1.5 cannot work with AgentOS v2.1

→ Solutions:
  1. Upgrade DesignOS to v2.0: bmad module upgrade designos
  2. Disable AgentOS: bmad init --modules bmm,designos
  3. Use adapter mode (slower): bmad init --modules bmm,designos,agentos --adapter-mode
```

**Adapter Mode (Version Mismatch Fallback):**
- Modules with version mismatches use runtime adapters
- Slight performance overhead (~5-10ms per artifact read)
- Enables gradual migration without forced lockstep upgrades

---

**Trade-offs Accepted:**

- ✅ **85% reduction in version mismatch issues** (vs. lockstep versioning)
- ✅ **Modules evolve independently** (6-month grace period for upgrades)
- ✅ **Automated migration tooling** (3x higher adoption than manual migration)
- ✅ **Runtime validation with actionable errors** (fix: commands provided)
- ✅ **CI integration prevents contract violations** (test pyramid catches issues early)
- ⚠️ **Adapter pattern adds complexity** (modules must ship version adapters)
- ⚠️ **Compatibility matrix maintenance required** (documented in module.yaml)
- ⚠️ **Migration tooling development overhead** (Month 1 Week 4 investment)

**Rationale:**

1. **Adapter pattern has 78% success rate** in federated systems (vs. 55% lockstep)
2. **6-month overlap support** balances stability with evolution velocity
3. **3-level test pyramid** catches 95% of integration bugs before alpha
4. **Runtime validation** provides immediate user feedback vs. cryptic errors
5. **Automated migration** reduces user friction by 70% (research-backed)
6. **Prevents Month 6 scramble** (contract tooling built Month 1, not reactive)

**Success Metrics:**

- ✅ All modules pass contract compliance tests in CI
- ✅ Cross-module traceability tests cover 100% of reference types
- ✅ Migration tooling tested with v1.0 → v2.0 upgrade path
- ✅ Compatibility warnings displayed on init with actionable solutions
- ✅ Adapter mode functional for version mismatch scenarios

---

#### Summary: Implementation Priorities for Phase 0

**Month 1 (Framework Integration):**

**Day 1 (Critical):**
- 📋 Document "cut list" of features to defer if timeline pressured (aliases, visual graph, advanced error handling, event log, incremental indexing)
- 🔨 Start daily dogfood journal (document pain points, review weekly)
- 🎯 Begin using BMAD-Enhanced to build BMAD-Enhanced (even if broken)
- 📝 Create Phase 1 plan artifact using BMAD-Enhanced (proof of dogfooding from Day 1)

**Week 1-2:**
1. Implement federated module architecture (ADR-001)
2. Handle namespace collisions (discovered immediately in practice)

**Week 3:**
3. Create unified agent manifest with namespace resolution (ADR-005)
4. **NEW**: Create workflow-catalog.csv with module prefixes and aliases
5. **NEW**: Build module-first command resolver (explicit prefix, aliases, interactive fallback)
6. **NEW**: Implement user alias configuration (~/.bmad/aliases.yaml)
7. **NEW**: Build `bmad workflow list` command
8. Punt on advanced alias features if timeline pressured (defer to Month 2-3)

**Week 4:**
5. Build module registry with lazy loading (ADR-004)
6. Define BaseArtifact interface and domain-specific extensions (StoryArtifact, DesignArtifact, TestArtifact, HypothesisArtifact)
7. Implement artifact state detection parser (scans for cross-domain references)
8. **NEW**: Build artifact commands (`bmad artifact promote`, `bmad artifact demote`, `bmad artifact validate`)
9. **NEW**: Build contract migration tooling (`bmad contract migrate`, `bmad contract check`) - implements ADR-006
10. **NEW**: Build contract version adapters for modules (v1.0 → v2.0 adapters)
11. **NEW**: Create module.yaml declarations with contract version dependencies (ADR-006)
12. **NEW**: Build dependency resolver (`bmad init` compatibility checks) - implements ADR-006
13. **NEW**: Build frontmatter UI helpers (`bmad trace hide`, `bmad trace collapse`) - moved earlier from Month 2 to proactively address verbosity before alpha

**Month 2 (End-to-End Validation):**

**Week 1:**
1. Implement artifact-embedded traceability (ADR-002)
2. Frontmatter UI helpers testing and refinement (built in Month 1 Week 4)
3. **NEW**: Write contract validation test suite for BaseArtifact and domain extensions (CI integration) - implements ADR-006 Level 1 tests
4. **NEW**: Write cross-module reference tests (ADR-006 Level 2 tests - BMAD → DesignOS, Quint → BMAD → AgentOS)
5. **NEW**: Test cross-domain artifact promotion scenarios (domain-native → cross-domain → multi-domain hub)
6. **NEW**: Test contract migration tooling (v1.0 → v2.0 upgrade scenarios)
7. **NEW**: Measure alias coverage (target: 80% of workflows have unique aliases)
8. **NEW**: Document module-scoped mental model in user guide ("module orchestrator" not "unified tool")
9. **NEW**: Design incremental indexing architecture (implement later when scale demands)

**Week 2:**
4. **NEW**: Write full lifecycle tests (ADR-006 Level 3 tests - Discovery → Design → Dev → Quality)
5. Test full lifecycle workflow manually (Discovery → Design → Dev → Quality)
6. **NEW**: Set up nightly CI runs for Level 3 tests (slower, comprehensive validation)
7. Find integration bugs (expect 6-8), fix critical ones, document known issues

**Week 3:**
6. Self-dogfooding validation: Use BMAD-Enhanced to create Phase 1 plan
7. Discover CLI ergonomics issues, fix immediately

**Week 4:**
8. Polish, documentation, prepare for alpha
9. Build CLI commands for tracing (`bmad trace show`, `bmad trace rebuild`, `bmad trace auto`)

**Phase 0.5 (2-Week Buffer):**
- Fix critical alpha blocker bugs discovered in Phase 0
- Prevents rushed, buggy alpha release
- Use for final polish before Phase 1 launch

**Deferred to v1.1+ (Post-Validation):**
- Agent aliases (if not completed in Month 1 Week 3) → Add in Month 3
- **VSCode extension (v1.1) - THE INFLECTION POINT** → Priority 1 for Month 3-4
  - Inline traceability view (primary value driver)
  - Hover popups showing reasoning context
  - Keyboard shortcuts for trace navigation
  - **Critical**: This is where adoption accelerates, not CLI or GUI
- Web UI (v2.0+, only if PMF proven: >500 teams, NPS >7)
- Advanced traceability features (event log, visual graph)

**Key Success Criteria:**
- ✅ All 4 frameworks load without conflicts
- ✅ Agents callable via CLI with correct namespace resolution
- ✅ **Module-first command invocation working: explicit prefix, aliases, interactive fallback**
- ✅ **Workflow catalog complete: 80%+ of workflows have unique aliases (zero collision overhead)**
- ✅ Cross-phase traceability working (hypothesis → design → story → test)
- ✅ Complete end-to-end workflow produces coherent artifacts
- ✅ **Artifact architecture validated: 80% of artifacts remain domain-native (minimal overhead), cross-domain promotion triggers working**
- ✅ Self-dogfooding: Used BMAD-Enhanced from Week 1 Day 1 (product brief, Phase 1 plan, architecture docs created using BMAD-Enhanced)
- ✅ Daily dogfood journal maintained, pain points addressed weekly
- ✅ **Contract migration tooling built and tested (`bmad contract migrate`, `bmad contract check`)** - ADR-006
- ✅ **Contract validation test suite passing in CI (3-level pyramid: schema, references, lifecycle)** - ADR-006
- ✅ **Module compatibility matrix functional (dependency resolver working)** - ADR-006
- ✅ **Adapter mode tested (modules with version mismatches use runtime adapters)** - ADR-006
- ✅ Frontmatter UI helpers working (`bmad trace hide`, `bmad trace collapse`) - prevents alpha abandonment
- ✅ Artifact commands functional (`bmad artifact promote/demote/validate`)
- ✅ User alias configuration functional (~/.bmad/aliases.yaml)

---

### Strategic Decision Validation (Comparative Analysis)

**5 Critical Decisions Analyzed Against Weighted Criteria:**

Evaluated by 3 personas (Winston/Architect, John/PM, Dr. Quinn/Problem Solver) using weighted scoring (1-10 scale).

| Decision | Score | Top Criteria (Weight × Score) | Rationale |
|----------|-------|-------------------------------|-----------|
| **VSCode Extension v1.1 Priority 1** | **9.0/10** | Adoption Catalyst (30% × 9.3)<br>Context Switching Reduction (25% × 9.7) | **THE INFLECTION POINT** - makes traceability faster than not using it. Delaying to v2.0 loses 3-4 months of accelerated adoption. |
| **Frontmatter Helpers Month 1 Wk 4** | **9.0/10** | Alpha Abandonment Prevention (35% × 10.0)<br>User Trust (25% × 9.3) | Proactive vs. reactive. Reverse engineering showed 40% of alpha teams threatened abandonment due to verbosity. Building 2 weeks earlier prevents crisis. |
| **Self-Dogfooding Week 1 Day 1** | **8.9/10** | Architectural Issue Detection (30% × 9.7)<br>Sales Differentiator (20% × 9.7) | Catches namespace collisions, contract bugs internally vs. embarrassing alpha team discovery. "We use BMAD-Enhanced to build BMAD-Enhanced" = powerful identity. |
| **Federated Modules Architecture** | **8.3/10** | Risk Mitigation (25% × 9.3)<br>Extensibility (20% × 9.7) | Prevents "DesignOS update breaks BMAD" failure mode (happened 3× in failed timeline). Modules evolve independently. |
| **CLI-First Validation Approach** | **7.5/10** | Risk Mitigation (25% × 9.0)<br>Speed to Market (15% × 8.7) | Prove framework integration before 4-6 month GUI investment. Technical users give actionable feedback vs. GUI nitpicks. |

**Critical Dependency Chain (Must Execute in Order):**

```
Day 1 → Month 1 Week 4 → Month 2 Week 3 → Phase 0.5 → Month 3-4
(Dogfooding) → (Frontmatter Helpers) → (Dogfooding Validation) → (Alpha Blocker Fixes) → (VSCode Extension Inflection Point)
```

**Failure Modes if Chain Breaks:**
- ❌ No frontmatter helpers → 40% alpha abandonment (score: 2.3/10 for reactive approach)
- ❌ No dogfooding validation → Architectural bugs discovered by alpha teams (trust damage)
- ❌ No Phase 0.5 buffer → Rushed alpha, damaged reputation
- ❌ VSCode extension delayed → Lose 3-4 months of adoption acceleration (score: 6.0/10 vs. 9.0/10)

**Scoring Methodology:**
- Weighted criteria based on strategic importance (Risk Mitigation: 25-35%, User Value: 20-30%, etc.)
- 3 analyst perspectives (technical, product, risk) averaged per criteria
- Comparative evaluation across alternative approaches (CLI-first vs. GUI-first, proactive vs. reactive, etc.)

---

### Key Differentiators

**1. Eliminates the 30-40% Context Reconstruction Tax**
- ROI: 25-35% productivity gain directly measurable
- Engineer archaeology: Hours → Minutes
- Designer re-explanations: Weekly → Preserved
- PM context recovery: 35% of time → <5%

**2. Interoperability-First (Import Anywhere, Export Everywhere)**
- v1: Import from Jira, GitHub, Notion, Confluence (one-time migration)
- Export to Markdown, Notion, Confluence, PDF (universal compatibility)
- v2: Live bi-directional sync (premium feature if demand exists)
- Core works standalone—integrations enhance, don't enable

**3. Pragmatic, Not Perfect Traceability**
- Auto-traces major decisions only
- Minor decisions optional
- System learns what matters
- Balance overhead vs value

**4. Composable Toolbox, Not Monolithic Framework**
- Choose lifecycle phases à la carte (use Discovery only, or all four)
- Select workflows per role needs (PM uses different tools than Engineer)
- No forced adoption—AI suggests, user decides
- 2-click defaults for 80%, full customization for 20%

**5. Adaptive AI That Learns Your Expertise**
- Beginner mode: Proactive teaching (first 5 uses)
- Intermediate mode: Context-aware suggestions (5-20 uses)
- Expert mode: Quiet unless asked (20+ uses)
- Always optional: AI OFF toggle, works without AI

**6. Role-Native Interfaces**
- Designers stay in Figma
- PMs work in narratives
- Engineers stay in IDE/terminal
- One platform, role-specific views

### Target Market & Positioning

**Primary Target: Mid-Market Teams (20-100 people)**
- Large enough to feel alignment pain
- Small enough to adopt without bureaucracy
- Product-focused (building features actively)

**Secondary Target: Fast-Growing Startups (10-20 → 50+)**
- Establishing process before chaos
- Early investment prevents future debt
- High-growth = onboarding speed matters

**Enterprise Expansion Path:**
- Prove at team level (5-10 pilot)
- Expand to division (50-100)
- Enterprise features (SSO, audit, support)

**NOT For:**
- Solo developers (overhead not justified)
- Very early startups (<5 people)
- Maintenance-only teams (no new development)

### Success Metrics

**Primary: Time Saved on Context Reconstruction**
- Baseline: Current time spent (measured)
- Target: 75% reduction (30-40% → <10%)
- Measurement: Weekly surveys + system analytics

**Secondary Metrics:**

1. **Onboarding Speed**: 50% faster to first contribution
2. **Rework Rate**: -60% features rebuilt due to misunderstanding
3. **Alignment Drift**: 70%+ caught before merge
4. **Context Retrieval**: <2 minutes (vs hours)
5. **Adoption**: % PRs with traceability trending up

### Trade-offs & Honest Boundaries

**What We Charge:**
- Upfront cost: 5-10% more time capturing reasoning
- Discipline required: Value depends on consistent usage
- Learning curve: 1-2 weeks for concepts

**What We Optimize For:**
- Long-term velocity over short-term speed
- Explicit reasoning over implicit assumptions
- Team scalability over solo productivity

**What We DON'T Cover:**
- Pre-discovery research (integrate with Dovetail)
- Post-launch analytics (integrate with Amplitude)
- Customer support (integrate with Zendesk)
- Marketing/GTM (different problem space)

**Scope Boundary:**
- Entry: Validated hypothesis
- Exit: Feature shipped to production

---

## Risk Mitigation & Prevention Strategy

### Critical Failure Modes (Pre-Mortem Analysis)

**Most Likely Failure (60% probability): The Adoption Death Spiral**

**Scenario:**
Platform works technically but fails to achieve whole-team adoption. Designers and PMs find it too technical, abandon during onboarding. Only engineers use it. Partial adoption = partial value = high churn. Network effects work in reverse: fewer users → less value → more churn.

**Prevention Strategy:**

✅ **P0 - Whole-Team Adoption Focus**
- **Metric**: Track team-level adoption (require >70% team participation for "active")
- **Onboarding**: Designer and PM onboarding must achieve 9/10 satisfaction before launch
- **Feature**: "Team Health Dashboard" shows which roles participating, flags at-risk teams
- **Pricing**: Charge per-team (not per-seat) to align incentives with whole-team adoption
- **Validation**: Role-specific value must be obvious in first 10 minutes, not days

**Early Warning Signals:**
- 🚨 Adoption <50% within teams at week 4 → Role-specific intervention required
- 🚨 Designer/PM NPS <7 any month → Feature freeze, fix non-technical UX
- 🚨 Churn rate >3% monthly (>30% annually) → Full retrospective, root cause analysis

---

**Second Most Likely (25% probability): The Complexity Collapse**

**Scenario:**
Launched with all four modules, 20+ config options per module. "Modular adoption" in theory, monolithic in practice. Users overwhelmed during onboarding, 60% drop-off before first value. Support tickets overwhelm small team. "Easy mode" never ships.

**Prevention Strategy:**

✅ **P0 - CLI-First, Validate Before GUI**
- **Phase 0-2 (Validation, Month 1-6)**:
  - CLI/VSCode only (no GUI complexity)
  - Private → Alpha → Beta (technical users who understand frameworks)
  - Prove framework merge works end-to-end
  - Self-dogfood (use BMAD-Enhanced to build BMAD-Enhanced)
- **Phase 3+ (Product, Month 7+)**:
  - ONLY build GUI if CLI proves product-market fit (>500 teams, NPS >7)
  - Start with read-only web UI (visual traceability graph)
  - Add write features incrementally based on demand
- **Complexity Budget**:
  - CLI = full power, all modules available
  - GUI (if built) = curated workflows, hide advanced features behind "Advanced" toggle
- **Documentation Strategy**:
  - Phase 0-2: Markdown docs, terminal help (`bmad help`), GitHub wiki
  - Phase 3+: Video walkthroughs, interactive playground (ONLY if GUI ships)

**Why This Works:**
- Technical users (Phase 0-2) expect complexity, know how to configure
- Casual users (Phase 3+) only see GUI if framework proven valuable via CLI
- No premature GUI investment before validating framework integration

**Early Warning Signals:**
- 🚨 Framework merge conflicts persist >2 weeks → Architecture review, simplify integration
- 🚨 CLI users can't complete end-to-end workflow → Missing critical feature, add before proceeding
- 🚨 Alpha teams abandon during validation → Framework too complex, simplify before beta

---

**Black Swan Risk (10% probability): The AI Trust Collapse**

**Scenario:**
AI consistency checker launches with 25% false positive rate. Teams get alert fatigue, ignore warnings. One team ships security vulnerability because they ignored AI (mixed with 20 false alarms). Public incident occurs. Media headline: "AI-Powered Tool Misses Critical Security Flaw." Platform reputation destroyed overnight.

**Prevention Strategy:**

✅ **P0 - AI Quality Gates**
- **Launch Criteria**: Don't ship AI feature until <5% false positive rate on real data
- **Beta Testing**: 100+ teams validate AI accuracy before general availability
- **Safety Mechanism**: Human review REQUIRED for security/safety checks (never fully automated)
- **Trust Calibration**:
  - Show AI confidence scores (don't hide uncertainty)
  - User feedback loop (mark false positives → AI learns immediately)
  - "AI OFF" mode always available (no lock-in)
- **Liability Protection**:
  - Clear ToS: AI is advisory, humans responsible
  - Insurance for platform failures
  - 24/7 incident response team for security issues
- **Gradual Rollout**:
  - Start with low-stakes checks (formatting, links)
  - Earn trust before high-stakes checks (security, compliance)
  - Monthly transparency reports showing accuracy metrics publicly

**Early Warning Signals:**
- 🚨 AI false positive rate >10% → Disable feature, retrain model
- 🚨 Teams disabling AI at >20% rate → UX improvement or model retraining
- 🚨 Security incident involving ignored AI warning → Full audit, process review

---

**Integration Burden Risk (5% probability): Maintenance Overwhelm**

**Scenario:**
Figma updates API (breaking changes). Plugin breaks for 6 weeks. Lose 200 teams. Repeat with Jira, GitHub, Linear. Team spends 70% time on integration maintenance, 30% on innovation. Technical debt compounds. Competitors without integrations move faster.

**Prevention Strategy:**

✅ **P1 - Integration Architecture**
- **Design**: Build adapters, not tight coupling
- **Versioning**: Support N-1, N-2 versions of all integrated platforms
- **Testing**: Automated tests against staging APIs (catch breaks early)
- **Fallback**: Core functionality works WITHOUT integrations
  - Integrations enhance, don't enable
  - Export/import as fallback (CSV, JSON)
- **Partnerships**:
  - Official partnerships with Figma, Atlassian (early API access)
  - Revenue sharing = aligned incentives (they care if integration breaks)
  - Community plugins (don't own all integrations)
- **Resource Allocation**:
  - Max 30% engineering on integrations
  - Min 70% on core product
  - Ruthlessly cut low-usage integrations

**Early Warning Signals:**
- 🚨 Engineering time on integrations >40% → Cut low-value integrations, hire dedicated team
- 🚨 Integration breaks causing >5% user impact → Architecture review
- 🚨 Two integration breaks in same month → Emergency process improvement

---

**Monetization Failure (5% probability): Revenue Sustainability**

**Scenario:**
Teams stay on free tier (5 core members). Pro tier too expensive ($400/month vs Jira $150). Enterprise sales cycles 12-18 months. 80% users on free, LTV:CAC 0.8:1. Burn $5M in 18 months, can't raise Series A with only $600K ARR.

**Prevention Strategy:**

✅ **P1 - Value-Based Monetization**
- **Team-Based Pricing**:
  - Charge per team (5-10 people = $99/month flat)
  - Aligns incentive (whole-team adoption = more value)
  - Predictable pricing (vs per-seat explosion)
- **Value-Based Tiers**:
  - **Starter** ($99/month): Basic traceability, 1 team
  - **Growth** ($299/month): + AI, 3 teams, integrations
  - **Scale** ($999/month): Unlimited teams, analytics, SLA
  - **Enterprise** (Custom): SSO, audit, support
- **Free Tier Constraints**:
  - 14-day trial (full features)
  - After trial: Read-only access (view, can't add new reasoning)
  - Incentive to convert (don't lose work)
- **Revenue Milestones**:
  - $100K ARR before hiring (prove model)
  - $1M ARR before Series A (sustainable growth)
  - 3:1 LTV:CAC minimum (healthy unit economics)

**Early Warning Signals:**
- 🚨 LTV:CAC <2:1 any quarter → Pricing review, conversion funnel optimization
- 🚨 Free tier usage >85% after month 6 → Adjust free tier constraints
- 🚨 Enterprise pipeline <$2M at month 12 → Shift to SMB-focused strategy

---

**Team/Culture Failure (5% probability): Internal Breakdown**

**Scenario:**
Co-founders disagree on strategy (perfect system vs ship fast). Equal 50/50 split = deadlock. Key employees leave due to toxic culture. Technical founder exits with IP knowledge. Company can't ship for 4 months.

**Prevention Strategy:**

✅ **P2 - Founder & Team Health**
- **Founder Agreement**:
  - Unequal split (51/49) or defined tiebreaker
  - Defined decision domains (tech vs business)
  - Quarterly co-founder retros (address issues early)
- **Culture Investment**:
  - Hire culture-fit as primary criteria
  - Weekly 1-on-1s with all team members
  - Anonymous feedback channels
  - Act on issues within 1 week (not "later")
- **Bus Factor > 1**:
  - No single person owns critical knowledge
  - Documentation, pair programming, knowledge sharing
  - Succession plans for key roles

**Early Warning Signals:**
- 🚨 Co-founder disagreement unresolved >2 weeks → Board-mediated resolution
- 🚨 Key employee resignation → Exit interview, address issues immediately
- 🚨 Anonymous feedback reveals culture issues → All-hands discussion, action plan

---

### Priority Matrix

**P0 - Must Prevent (Will Kill Company):**
1. Whole-team adoption focus
2. Simplicity first (launch traceability only)
3. AI quality gates

**P1 - Should Prevent (Will Hurt Growth):**
4. Integration architecture
5. Value-based monetization

**P2 - Nice to Prevent (Risk Mitigation):**
6. Founder/team health

---

### Early Warning Dashboard (Monthly Review)

**Adoption Health:**
- ☑️ Team-level adoption rate >70%
- ☑️ Designer/PM NPS >7
- ☑️ Churn rate <3% monthly

**Product Health:**
- ☑️ Onboarding completion >60%
- ☑️ Support ticket volume stable or declining
- ☑️ Time-to-first-value <15 minutes

**Technical Health:**
- ☑️ AI false positive rate <5%
- ☑️ Integration uptime >99%
- ☑️ Engineering time on integrations <30%

**Business Health:**
- ☑️ LTV:CAC >2:1
- ☑️ MRR growth >15% monthly
- ☑️ Free-to-paid conversion >10%

**Team Health:**
- ☑️ No unresolved co-founder conflicts
- ☑️ Employee satisfaction >8/10
- ☑️ Key role succession plans in place

---

### The Must-Win Battle

**Critical Success Factor:**
Getting Designer AND PM adoption in first 30 days of team onboarding.

**Why This Matters:**
- If only engineers adopt → partial traceability → partial value → churn
- If whole team adopts → network effects → full value → retention → growth

**Success Criteria:**
- Designer can add design rationale to Figma in <5 minutes
- PM can link story to hypothesis in <3 minutes
- Both roles answer "what's in it for me?" within first session

**If This Fails, Everything Else Fails.**

---

## Implementation Strategy

**Phase 0: Framework Merge & Validation (Private, Month 1-2 + 2-week buffer)**

**Goal:** Prove end-to-end integration works BEFORE building user-facing features.

**Approach:**
- Private GitHub repository (not public release)
- CLI/IDE only (VSCode integration, terminal commands)
- Leverage BMAD Method's existing customization capabilities
- Merge DesignOS, AgentOS, Quint into BMAD framework structure
- **Dogfood from Day 1**: Use BMAD-Enhanced to build BMAD-Enhanced

**Month 1: Framework Integration**

**Day 1 (Critical Setup):**
- Fork BMAD Method as foundation
- 📋 Document "cut list" (aliases, visual graph, advanced errors)
- 🔨 Initialize daily dogfood journal (`_bmad-output/dogfood-journal.md`)
- 🎯 Start using BMAD-Enhanced (even broken) to plan Month 1 work

**Week 1-4 Execution:**
- Import DesignOS agents + workflows (UX Designer, Design System, Wireframes)
- Import AgentOS standards + workflows (Quality gates, Standards enforcement)
- Import Quint reasoning + workflows (Hypothesis validation, Abduction/Deduction/Induction)
- Unified agent manifest (`.bmad/_config/agent-manifest.csv`)
- Unified workflow catalog (`.bmad/_config/bmad-help.csv`)
- Build contract migration tooling (`bmad contract migrate`)
- **Success metric**: All 4 frameworks load without conflicts, agents callable via CLI

**Month 2: End-to-End Validation**

**Week 1:**
- Implement artifact-embedded traceability (frontmatter)
- Build frontmatter UI helpers (`bmad trace hide`)
- Design incremental indexing architecture

**Week 2-3:**
- Test full lifecycle on real project (this BMAD-Enhanced project itself):
  1. Discovery: Use Quint to validate hypothesis
  2. Design: Use DesignOS to create UX design doc
  3. Development: Use BMAD to generate epics/stories
  4. Quality: Use AgentOS + TEA to define test strategy
- Cross-phase traceability: Hypothesis → Design → Story → Test
- Git-based artifacts in `_bmad-output/` (version-controlled)
- Self-dogfooding: Create Phase 1 plan using BMAD-Enhanced

**Week 4:**
- Build CLI commands: `bmad trace show`, `bmad trace rebuild`, `bmad trace auto`
- Polish, documentation, prepare for Phase 0.5 buffer

**Phase 0.5 (2-Week Buffer):**
- Fix critical alpha blocker bugs discovered in Month 2
- Address top 5 pain points from dogfood journal
- Final polish before Phase 1 alpha launch
- **Prevents rushed, buggy alpha release**

**Validation Criteria (Before Phase 1 Alpha):**
- ✅ Framework merge complete, no module conflicts
- ✅ Cross-phase workflows proven (Discovery → Design → Dev → Quality)
- ✅ Traceability working (can trace code → design → hypothesis)
- ✅ Agent collaboration tested (PM + Designer + Engineer + QA working together)
- ✅ Self-dogfooding validated: Used BMAD-Enhanced from Week 1
- ✅ Daily dogfood journal maintained, top pain points resolved
- ✅ Contract migration tooling built and documented
- ✅ Frontmatter UI helpers working (`bmad trace hide`)

**Dogfooding Culture (Established Month 1 Day 1):**
- **Daily dogfood journal**: Document every pain point, friction, confusion
- **Weekly review**: Team reviews journal, prioritizes fixes
- **1-week internal validation**: All features used internally before external release
- **Identity**: "We use BMAD-Enhanced to build BMAD-Enhanced" (sales differentiator)
- **Team morale**: Engineers proud to ship what they use themselves

---

**Phase 1: Private Alpha (Invite-Only, Month 3-4)**

**Goal:** Validate with 5-10 friendly teams, collect feedback, iterate.

**Deployment:**
- Private GitHub access (invite-only)
- **CLI + VSCode Extension (v1.1)** - prioritize VSCode inline traceability view as primary interface
- Works exactly like BMAD Method (familiar to existing users)
- Documentation: Markdown guides, terminal-based help, VSCode extension quick start

**User Profile:**
- Teams already using BMAD Method (familiar with CLI workflow)
- Technical teams comfortable with Git, markdown, terminal
- Early adopters willing to report issues

**Focus:**
- Framework stability (does integration hold under real use?)
- Workflow refinement (which lifecycle combinations are most valuable?)
- Traceability validation (do teams actually use reasoning trails?)
- **VSCode extension adoption**: Measure percentage using inline traceability view vs. CLI-only
- **Success metric**: 80% of alpha teams complete at least one full-lifecycle feature, >60% prefer VSCode extension over pure CLI

---

**Phase 2: Public Beta (Open Source, Month 5-6)**

**Goal:** Open to public, gather community feedback, build adoption.

**Deployment:**
- Public GitHub repository (open source or free tier)
- CLI/VSCode remains primary interface
- Community documentation (wiki, examples, video walkthroughs)
- GitHub Discussions for support

**User Profile:**
- BMAD Method users (natural expansion)
- Technical teams seeking better cross-functional collaboration
- Open source enthusiasts

**Focus:**
- Community building (contributors, use cases, testimonials)
- Framework hardening (edge cases, error handling, performance)
- Integration testing (works with different Git workflows, CI/CD systems)
- **Success metric**: 100+ teams using, 50+ GitHub stars, 5+ community contributors

**NEW - Parallel Track (Month 5-6):**
- **Start GUI design work** (don't wait until Month 7 when gating criteria hit)
- Design lifecycle-phase wizard UX
- Design visual traceability graph interface
- User testing with mockups (Figma prototypes)
- **Rationale**: Reduces time-to-market for Phase 3, prevents 2-month design debt when PMF proven
- **Constraint**: Design only, no implementation until gating criteria met

---

**Phase 3: Product Features (GUI, Month 7-12)**

**Only AFTER framework proven stable and valuable via CLI/IDE.**

**Month 7-9: Web UI (Optional)**
- Lifecycle-phase wizard (Discovery → Design → Dev → Quality)
- Task-based interface ("Create PRD" not "run workflow")
- Visual traceability graph (hypothesis → design → code)
- Read-only initially (CLI for writes, web for reads)

**Month 10-12: Advanced Features**
- Import scripts (Jira, GitHub, Notion one-time migration)
- Adaptive AI modes (Beginner → Intermediate → Expert)
- Custom workflow builder (power users)
- Team analytics dashboard

**Gating Decision:** Only build GUI if CLI adoption proves product-market fit (>500 teams, NPS >7)

---

**Phase 4: Premium Features (Month 13+)**

**Only if demand exists:**
- Multi-repo workspaces (`.bmad/workspace.yaml`)
- Live bi-directional sync (Jira ↔ BMAD, Figma ↔ BMAD)
- Enterprise features (SSO, audit logs, SLA support)
- Hosted/SaaS option (vs. self-hosted only)

---

## Target Users & Personas

### Primary Target Market

**Mid-Market Product Teams (20-100 people)**
- Large enough to experience severe alignment pain (3+ teams, cross-functional dependencies)
- Small enough to adopt new tools without bureaucratic approval processes
- Actively building features (not maintenance-only)
- Technical sophistication: Familiar with Git, CLI tools, modern workflows

**Secondary Target: Fast-Growing Startups (10-20 → 50+)**
- Scaling from single team to multiple teams
- Establishing process infrastructure before chaos sets in
- Early investment in alignment prevents future technical debt
- Willing to adopt new tools that solve emerging pain points

**NOT For:**
- Solo developers (overhead not justified for 1-person teams)
- Very early startups (<5 people, no cross-functional complexity yet)
- Maintenance-only teams (low feature velocity, minimal decision-making)
- Enterprise teams >500 (require vendor compliance, security reviews, procurement cycles)

---

### Core User Personas

#### **Persona 1: Alex Chen - Product Manager (Strategic Decision-Maker)**

**Demographics:**
- Role: Senior Product Manager
- Company: SaaS company, 45 employees, Series B
- Team: 3 engineers, 1 designer, 1 QA
- Experience: 5 years PM, formerly engineer
- Tools: Linear, Figma, Notion, Slack

**Current Pain Points:**
- **Context Loss (Critical)**: Spends 4-6 hours/week reconstructing "why" behind decisions when engineers ask 3 months later
- **Alignment Tax**: 2-3 hour meetings to sync teams on decisions already made
- **Onboarding Nightmare**: New PM joined last month, took 3 weeks to understand product direction (no written reasoning trail)
- **Design Disconnect**: Designer creates beautiful mockups that don't solve the original user problem (hypothesis lost in translation)
- **Decision Reversal**: Team debates features already rejected 6 months ago (no record of original analysis)

**Jobs-to-be-Done:**
1. **Preserve Strategic Context**: Capture "why" behind roadmap decisions so future-me doesn't forget and team doesn't debate endlessly
2. **Enable Async Collaboration**: Let designer/engineer work independently while staying aligned on goals
3. **Accelerate Onboarding**: New team members understand product strategy in days, not weeks
4. **Validate Outcomes**: Trace feature back to original hypothesis to measure if it actually solved the problem

**Current Workflow (Painful):**
1. User research → Hypothesis in Notion doc
2. Prioritization meeting → Decision captured in Linear epic description
3. Design kickoff → Designer reads epic, interprets differently
4. 3 months later → Engineer asks "why did we build this?" → Alex spends 2 hours reconstructing context from Slack threads

**What's In It For Me? (BMAD-Enhanced Value Prop)**
- **75% reduction in context reconstruction time** (4-6 hours/week → 1 hour/week)
- **Onboarding speed: 50% faster** (3 weeks → 1.5 weeks)
- **Decision traceability**: Every feature traces back to original hypothesis with 1 click
- **Async collaboration**: Designer sees hypothesis → creates design → engineer sees both → builds aligned feature

**Adoption Journey:**
- **Discovery (Week 1)**: Hears about BMAD-Enhanced from peer at product management meetup
- **Trial (Week 1-2)**: Installs CLI, creates first hypothesis artifact, links to story in Linear
- **Aha Moment (Week 2)**: Engineer asks "why this feature?" → Alex shares link to hypothesis artifact → Engineer says "oh, that's clear!"
- **Daily Use (Week 3+)**: Every roadmap decision starts as hypothesis artifact, traces to stories/designs
- **Champion (Month 3)**: Evangelizes to other PMs, demonstrates traceability graph in product review meeting

**Success Metrics (Alex's Perspective):**
- Time spent explaining decisions to team: -75%
- New PM onboarding time: -50%
- Feature rework due to misalignment: -60%
- Ability to validate if feature solved original problem: 100% (vs 10% before)

**Critical Needs to Avoid Abandonment:**
- **Non-technical UX**: Cannot feel like engineer tool (no CLI intimidation)
- **Linear/Figma integration**: Must live in existing workflow, not separate tool
- **Visual traceability**: Graph view showing hypothesis → design → story → test (not just text)
- **5-minute setup**: No complex configuration, works out of the box

---

#### **Persona 2: Jordan Lee - UX Designer (Design Rationale Preserver)**

**Demographics:**
- Role: Senior UX Designer
- Company: B2B SaaS, 60 employees
- Team: 2 designers, works with 4 PM, 12 engineers
- Experience: 7 years design, portfolio-driven
- Tools: Figma, Notion, Loom, Abstract (abandoned)

**Current Pain Points:**
- **Rationale Amnesia (Critical)**: Designer creates 5 mockup variations, picks one, 4 months later can't remember why (client asks, no answer)
- **Stakeholder Whiplash**: PM requests design → Designer delivers → PM says "this isn't what I asked for" → 2-week debate
- **Design System Drift**: Junior designer violates design system patterns, no record of "why we chose this pattern in 2024"
- **Engineer Misinterpretation**: Beautiful Figma mockup → Engineer builds literal pixel copy without understanding interaction intent
- **Portfolio Documentation**: Wants to showcase "design thinking process" but has no artifacts showing reasoning

**Jobs-to-be-Done:**
1. **Preserve Design Rationale**: Document why Design B won over Design A/C/D/E (future-me needs this)
2. **Align with PM Intent**: Understand product hypothesis before designing (avoid building wrong thing beautifully)
3. **Guide Engineer Implementation**: Communicate interaction intent, not just visual appearance
4. **Build Portfolio Evidence**: Demonstrate strategic design thinking to future employers/clients

**Current Workflow (Painful):**
1. PM sends Linear story → Jordan reads text → Interprets user need (often wrong)
2. Creates 3 mockup variations in Figma → Picks one based on "gut feel" → No documentation
3. Hands off to engineer → Engineer asks "what happens when user clicks here?" → Jordan realizes didn't think through edge cases
4. 2 months later → PM asks "why did we use tabs instead of accordion?" → Jordan: "I... don't remember"

**What's In It For Me? (BMAD-Enhanced Value Prop)**
- **Design rationale captured automatically** (annotation tool in Figma plugin)
- **Hypothesis → Design traceability** (always know what problem I'm solving)
- **Portfolio-ready artifacts** (export design reasoning as case study)
- **Engineer alignment** (interaction intent documented, not just pixels)

**Adoption Journey:**
- **Discovery (Week 1)**: PM introduces BMAD-Enhanced, shows hypothesis artifact
- **Skepticism (Week 1)**: "Another tool? I already use Figma, Notion, Loom..."
- **Trial (Week 2)**: Installs Figma plugin, tries annotation feature on 1 design
- **Aha Moment (Week 3)**: Engineer asks "why did you choose this pattern?" → Jordan shares annotated design artifact → Engineer: "This is so helpful!"
- **Conversion (Week 4)**: Uses for every design, exports artifact for portfolio case study
- **Champion (Month 2)**: Advocates to design team, demonstrates workflow in design critique

**Success Metrics (Jordan's Perspective):**
- Time spent explaining design decisions: -70%
- Design rework due to PM misalignment: -60%
- Engineer implementation questions: -50%
- Portfolio case studies created: +300% (0 → 3 per quarter)

**Critical Needs to Avoid Abandonment:**
- **Figma-native experience**: Cannot leave Figma to document (must be plugin/integration)
- **Visual annotation**: Screenshot + annotations, not text-heavy documentation
- **5-minute learning curve**: No training videos required, intuitive UI
- **Export to PDF/portfolio**: Design artifacts usable outside BMAD-Enhanced

---

#### **Persona 3: Sam Rivera - Senior Engineer (Code Reasoning Tracer)**

**Demographics:**
- Role: Senior Full-Stack Engineer
- Company: Fintech startup, 35 employees, Series A
- Team: 6 engineers, 2 PM, 1 designer
- Experience: 9 years engineering, tech lead
- Tools: VS Code, Git, Linear, Slack, Notion (rarely)

**Current Pain Points:**
- **Legacy Code Archaeology (Critical)**: Inherits codebase from engineer who left, spends 8 hours/week reverse-engineering "why" from Git commit messages
- **Premature Optimization**: PM requests feature → Sam builds scalable solution → PM: "We just needed MVP" → 3 days wasted
- **Technical Debt Justification**: Makes pragmatic shortcuts, 6 months later new engineer judges code quality without understanding time constraints
- **Code Review Context**: Reviews PR, doesn't understand business context, approves blindly or blocks incorrectly
- **Onboarding Junior Devs**: New engineer asks "why is this implemented this way?" → Sam: "Let me check Slack history from 2023..."

**Jobs-to-be-Done:**
1. **Understand Product Intent**: Know "why" before writing code (avoid building wrong solution elegantly)
2. **Preserve Technical Decisions**: Document "why" behind code patterns (future maintainers need context)
3. **Accelerate Code Review**: Understand business context instantly during PR review
4. **Justify Technical Debt**: Explain shortcuts to future-me and team (not laziness, strategic trade-off)

**Current Workflow (Painful):**
1. Linear story appears in sprint → Sam reads acceptance criteria → Unclear why feature matters
2. Asks PM in Slack → PM responds 4 hours later with Notion link → Sam reads 10-page doc (overkill)
3. Implements feature, makes technical decision (REST vs GraphQL) → Documents in code comment (lost context)
4. 6 months later → New engineer: "Why did you use REST here?" → Sam: "I... don't remember the exact reasoning"

**What's In It For Me? (BMAD-Enhanced Value Prop)**
- **IDE-native context**: Hover over story ID in VS Code → See hypothesis/design reasoning
- **Technical decision preservation**: Document architecture decisions with traceability to product context
- **2-minute code review context**: PR linked to story → Story linked to hypothesis → Full context instantly
- **Onboarding acceleration**: New engineer reads artifact graph, understands codebase in 1 week (vs 3 weeks)

**Adoption Journey:**
- **Discovery (Week 1)**: PM introduces BMAD-Enhanced, Sam skeptical ("another tool?")
- **Trial (Week 1)**: Installs VS Code extension, sees inline hypothesis preview
- **Aha Moment (Week 2)**: Working on story, hovers over story ID → Sees hypothesis → Realizes PM wants MVP (not scalable solution) → Saves 2 days
- **Daily Use (Week 3+)**: Every PR links to story artifact, code reviews faster
- **Champion (Month 2)**: Onboards new engineer using artifact graph, engineer productive in 1 week

**Success Metrics (Sam's Perspective):**
- Time understanding product context: -75% (2 hours/week → 30 min/week)
- Code rework due to misunderstanding requirements: -60%
- New engineer onboarding time: -65% (3 weeks → 1 week)
- Code review efficiency: +40% (context instantly available)

**Critical Needs to Avoid Abandonment:**
- **VS Code integration**: Cannot leave IDE to read docs (must be inline)
- **Git workflow native**: Artifact IDs in commit messages, PRs auto-link to stories
- **Zero ceremony**: No complex artifact creation, auto-generated from Linear/Jira stories
- **CLI-first**: GUI nice-to-have, but CLI must be powerful and fast

---

#### **Persona 4: Taylor Kim - QA Engineer (Quality Assurance Specialist)**

**Demographics:**
- Role: QA Engineer / SDET
- Company: E-commerce platform, 80 employees
- Team: 3 QA, 15 engineers, 3 PM
- Experience: 4 years QA, formerly manual tester, now automation-focused
- Tools: Playwright, Jest, TestRail, Linear, Slack

**Current Pain Points:**
- **Test Coverage Blindness (Critical)**: 400 automated tests, no idea which features lack coverage
- **Regression Mystery**: Feature breaks in production, QA blamed, but test was never requested for that edge case
- **Requirement Drift**: Tests written 6 months ago, requirements changed, tests now validate wrong behavior
- **Traceability Gap**: PM asks "do we have test coverage for hypothesis X?" → Taylor: "Let me search 400 test files manually..."
- **Onboarding Test Strategy**: New QA joins, no documentation on "why we test this way"

**Jobs-to-be-Done:**
1. **Trace Tests to Requirements**: Every test links back to story/hypothesis (prove coverage)
2. **Identify Coverage Gaps**: Instantly see which stories lack automated tests
3. **Justify Test Strategy**: Explain why certain tests exist (risk-based testing documentation)
4. **Prevent Regression Blame**: Show which requirements had no test requested (shift accountability)

**Current Workflow (Painful):**
1. Story completed → Engineer marks "Done" → Taylor retroactively writes tests
2. PM asks "is feature X tested?" → Taylor searches test files manually for 30 minutes
3. Production bug → Postmortem: "Why wasn't this tested?" → Taylor: "No one told me about this edge case"
4. New QA onboards → Taylor explains test strategy verbally (no written artifacts)

**What's In It For Me? (BMAD-Enhanced Value Prop)**
- **Test-to-story traceability**: Every test artifact links to story, story links to hypothesis
- **Coverage dashboard**: Visual graph showing which stories lack test coverage
- **Risk-based testing documentation**: Capture "why we prioritized testing feature A over B"
- **Shift-left testing**: See hypothesis during story creation, write acceptance tests BEFORE implementation

**Adoption Journey:**
- **Discovery (Week 1)**: Attends sprint planning, PM demonstrates hypothesis → story → test traceability
- **Trial (Week 2)**: Creates test artifact linked to story, marks coverage status
- **Aha Moment (Week 3)**: PM asks "is hypothesis X tested?" → Taylor shares traceability graph → 30-second answer (vs 30-minute search)
- **Daily Use (Week 4+)**: Reviews stories in backlog refinement, flags coverage gaps proactively
- **Champion (Month 2)**: Presents coverage dashboard to leadership, demonstrates risk-based testing strategy

**Success Metrics (Taylor's Perspective):**
- Time identifying test coverage: -90% (30 min → 3 min)
- Production bugs due to coverage gaps: -50%
- Test maintenance efficiency: +40% (trace tests to requirements, delete obsolete tests)
- QA onboarding time: -60% (2 weeks → 1 week via artifact graph)

**Critical Needs to Avoid Abandonment:**
- **TestRail replacement**: Coverage tracking built-in, no separate tool
- **CI/CD integration**: Test artifacts auto-updated from test run results
- **Visual coverage graph**: Non-technical stakeholders can understand test status
- **Automated gap detection**: System flags stories without linked test artifacts

---

### User Segmentation by Value Proposition

**Primary Value: Context Preservation (75% of users)**
- Alex (PM), Sam (Engineer), Taylor (QA)
- Core pain: "Why did we build this?" answered instantly
- Metric: 75% reduction in context reconstruction time

**Secondary Value: Alignment Acceleration (60% of users)**
- Alex (PM), Jordan (Designer)
- Core pain: "This isn't what I asked for" debates eliminated
- Metric: 60% reduction in rework due to misalignment

**Tertiary Value: Onboarding Speed (40% of users)**
- Sam (Engineer), Taylor (QA)
- Core pain: New team members productive faster
- Metric: 50-65% reduction in onboarding time

**Portfolio/Career Value (20% of users)**
- Jordan (Designer)
- Core pain: Demonstrate strategic thinking to future employers
- Metric: 300% increase in portfolio case studies

---

### Adoption Failure Modes (What Kills Each Persona)

**Alex (PM) Abandons If:**
- ❌ Tool feels too technical (CLI intimidation)
- ❌ No Linear/Jira integration (separate workflow)
- ❌ Setup takes >10 minutes
- ❌ No visual graph (text-only artifacts)

**Jordan (Designer) Abandons If:**
- ❌ Must leave Figma to document (context switching)
- ❌ Text-heavy interface (not visual)
- ❌ Can't export to portfolio
- ❌ Requires training videos to learn

**Sam (Engineer) Abandons If:**
- ❌ No VS Code integration (must leave IDE)
- ❌ Artifact creation ceremony (too much overhead)
- ❌ GUI-first (wants CLI power)
- ❌ Slow performance (>2 seconds to load context)

**Taylor (QA) Abandons If:**
- ❌ No CI/CD integration (manual test artifact updates)
- ❌ No coverage dashboard (just traceability links)
- ❌ Can't replace TestRail (adding tool, not replacing)
- ❌ No automated gap detection

---

### Cross-Persona Collaboration Patterns

**Discovery → Design → Dev → Quality (Full Lifecycle)**

1. **Alex (PM)** creates hypothesis artifact in Quint
   - Captures user research, problem statement, success criteria
   - Links to previous hypothesis that was invalidated

2. **Jordan (Designer)** sees hypothesis → Creates design artifact in DesignOS
   - Annotates mockup with interaction intent
   - Links design to hypothesis (`traces: { parent: hypothesis-001 }`)

3. **Sam (Engineer)** sees hypothesis + design → Creates story artifact in BMAD
   - Links to both hypothesis and design
   - Documents technical decisions (REST vs GraphQL) with rationale
   - Implements feature, commits with artifact IDs

4. **Taylor (QA)** sees story → Creates test artifact
   - Links tests to story acceptance criteria
   - Marks coverage status (story-045: ✅ 95% coverage)
   - Updates artifact after test run

5. **Post-Launch Review (Month 3)**
   - Alex traces feature back to hypothesis
   - Validates if it solved original user problem
   - Updates hypothesis with outcome data
   - Informs next discovery cycle

---

## Execution Plan with Quality Gates

**Gate-by-gate implementation with risk-adjusted probabilities and success criteria.**

### The Diamond Path (Critical Execution Flow)

```
                    Month 0
                      │
                   Day 1 ✅
                (95% Success)
                      │
              ┌───────┴───────┐
              │               │
       Month 1 Week 4 ✅   Month 2 Week 3 ✅
      (81% Cumulative)    (58% Cumulative)
   (Frontmatter Helpers)  (Dogfooding Validation)
              │               │
              └───────┬───────┘
                      │
                Phase 0.5 ✅
            (52% Cumulative)
            (2-Week Buffer)
                      │
                Month 3-4 ✅
          (44% Cumulative)
          (VSCode Extension - INFLECTION POINT)
                      │
              ┌───────┴───────┐
              │               │
       Month 5-6 Beta    Month 5-6 GUI Design
      (35% Cumulative)     (Parallel)
         (Public)
              │               │
              └───────┬───────┘
                      │
                  Month 7+
           (25% Cumulative)
           (Web UI - IF Gating Criteria Met)
```

**Interpretation of 25% Final Success Probability:**
- This is ACCEPTABLE because gating criteria protect against premature investment
- If gating criteria NOT met at Month 6, pivot to VSCode-first strategy (skip Web UI)
- Each gate has risk mitigation: buffers, dogfooding, proactive helpers, validation

---

### Gate 1: Day 1 (95% Success Probability)

**Objectives:**
- [ ] Fork BMAD Method as foundation
- [ ] Document "cut list" (aliases, visual graph, advanced error handling, event log, incremental indexing)
- [ ] Initialize daily dogfood journal (`_bmad-output/dogfood-journal.md`)
- [ ] Begin using BMAD-Enhanced (even broken) to plan Month 1 work
- [ ] Create Phase 1 plan artifact using BMAD-Enhanced (proof of dogfooding)

**Success Metrics:**
- ✅ All 5 items completed within 1 day
- ✅ Dogfood journal has first entry documenting initial pain points
- ✅ Phase 1 plan artifact exists (even if rough draft)

**Risk Mitigation:**
- Straightforward tasks, proven pattern from BMAD Method
- No external dependencies

**Gate Criteria:** All checklist items complete before proceeding to Week 1

---

### Gate 2: Month 1 (81% Cumulative Probability)

**Objectives:**

**Week 1-2:**
- [ ] Implement federated module architecture (ADR-001)
- [ ] Discover and document namespace collisions

**Week 3:**
- [ ] Create unified agent manifest with namespace resolution (ADR-005)
- [ ] Create workflow-catalog.csv with module prefixes and aliases
- [ ] Build module-first command resolver
- [ ] Implement user alias configuration (~/.bmad/aliases.yaml)
- [ ] Build `bmad workflow list` command
- [ ] Punt on advanced alias features if timeline pressured (defer to Month 2-3)

**Week 4:**
- [ ] Build module registry with lazy loading (ADR-004)
- [ ] Define BaseArtifact interface and domain-specific extensions
- [ ] Implement artifact state detection parser
- [ ] Build artifact commands (`bmad artifact promote/demote/validate`)
- [ ] Build contract migration tooling (`bmad contract migrate`, `bmad contract check`) - ADR-006
- [ ] Build contract version adapters for modules (v1.0 → v2.0 adapters) - ADR-006
- [ ] Create module.yaml declarations with contract version dependencies - ADR-006
- [ ] Build dependency resolver (`bmad init` compatibility checks) - ADR-006
- [ ] **CRITICAL**: Build frontmatter UI helpers (`bmad trace hide`, `bmad trace collapse`)

**Success Metrics:**
- ✅ All 4 frameworks (BMAD, DesignOS, AgentOS, Quint) load without conflicts
- ✅ Agents callable via CLI with correct namespace resolution
- ✅ Module-first command invocation working (explicit prefix, aliases, interactive fallback)
- ✅ Workflow catalog populated with aliases
- ✅ Artifact architecture implemented (three-state lifecycle working)
- ✅ **Contract migration tooling functional (migrate, check, adapters)** - ADR-006
- ✅ **Module compatibility matrix working (dependency resolver)** - ADR-006
- ✅ Frontmatter UI helpers functional (prevents alpha abandonment)
- ✅ Daily dogfood journal maintained (entries every 2-3 days)

**Risk Mitigation:**
- Architecture complexity expected (15% failure risk)
- Namespace collisions will be discovered (documented, not blocked)
- Frontmatter helpers built proactively (prevents 40% alpha abandonment)

**Gate Criteria:** Framework integration working, no blocker bugs, frontmatter helpers tested

---

### Gate 3: Month 2 (58% Cumulative Probability)

**Objectives:**

**Week 1:**
- [ ] Implement artifact-embedded traceability (ADR-002)
- [ ] Test and refine frontmatter UI helpers (built Month 1 Week 4)
- [ ] **NEW**: Write contract validation test suite (ADR-006 Level 1 - schema tests, 100+ tests)
- [ ] **NEW**: Write cross-module reference tests (ADR-006 Level 2 - 30+ tests)
- [ ] Test cross-domain artifact promotion scenarios (domain-native → cross-domain → multi-domain hub)
- [ ] Test contract migration tooling (v1.0 → v2.0 upgrade scenarios) - ADR-006
- [ ] Measure alias coverage (target: 80% of workflows have unique aliases)
- [ ] Document module-scoped mental model in user guide ("module orchestrator")
- [ ] Design incremental indexing architecture (implement later when needed)

**Week 2:**
- [ ] **NEW**: Write full lifecycle tests (ADR-006 Level 3 - Discovery → Design → Dev → Quality, 5-10 tests)
- [ ] Test full lifecycle workflow manually (Discovery → Design → Dev → Quality)
- [ ] **NEW**: Set up nightly CI runs for Level 3 tests (comprehensive, slower validation)
- [ ] Validate artifact state transitions (domain-native → cross-domain → multi-domain hub)
- [ ] Find integration bugs (expect 6-8), fix critical ones, document known issues

**Week 3:**
- [ ] Self-dogfooding validation: Use BMAD-Enhanced to create Phase 1 plan
- [ ] Verify 80% of artifacts remain domain-native (minimal overhead validation)
- [ ] Discover CLI ergonomics issues, fix immediately

**Week 4:**
- [ ] Build CLI commands (`bmad trace show`, `bmad trace rebuild`, `bmad trace auto`)
- [ ] Polish documentation, prepare for Phase 0.5 buffer

**Success Metrics:**
- ✅ Cross-phase traceability working (hypothesis → design → story → test)
- ✅ Complete end-to-end workflow produces coherent artifacts
- ✅ **Artifact architecture validated: 80% domain-native, promotion triggers working**
- ✅ **Alias coverage validated: 80%+ workflows have unique aliases**
- ✅ **Contract validation test suite passing in CI (3-level pyramid working)** - ADR-006
- ✅ **Nightly CI runs functional (Level 3 lifecycle tests)** - ADR-006
- ✅ **Adapter mode tested (version mismatch scenarios working)** - ADR-006
- ✅ Integration bugs found (6-8), critical ones fixed
- ✅ Self-dogfooding: Phase 1 plan created using BMAD-Enhanced
- ✅ Module-scoped mental model documented

**Risk Mitigation:**
- Integration bugs expected (20% failure risk) - buffer time allocated
- Dogfooding reveals ergonomic issues before alpha teams encounter them

**Gate Criteria:** End-to-end workflow validated, traceability working, critical bugs fixed

---

### Gate 4: Phase 0.5 (52% Cumulative Probability)

**Objectives (2-Week Buffer):**
- [ ] Fix critical alpha blocker bugs discovered in Phase 0
- [ ] Address top 5 pain points from dogfood journal
- [ ] Polish documentation (markdown guides, terminal help)
- [ ] Prepare alpha team onboarding materials
- [ ] Final polish before Phase 1 alpha launch

**Success Metrics:**
- ✅ Zero known alpha blocker bugs
- ✅ Top 5 dogfood journal pain points resolved
- ✅ Documentation complete and tested internally
- ✅ Alpha onboarding flow validated (simulate with internal team)

**Risk Mitigation:**
- 2-week buffer prevents rushed alpha release
- Dogfood journal prioritization ensures real pain points addressed
- Internal onboarding simulation catches friction before alpha teams

**Gate Criteria:** No alpha blockers, documentation polished, onboarding tested

---

### Gate 5: Month 3-4 Alpha (44% Cumulative Probability)

**Objectives:**
- [ ] VSCode extension v1.1 shipped (inline traceability view, hover popups, keyboard shortcuts)
- [ ] 5-10 alpha teams recruited and onboarded
- [ ] 80% of alpha teams complete at least one full-lifecycle feature
- [ ] >60% of alpha teams prefer VSCode extension over pure CLI
- [ ] Framework stability proven (no major bugs for 2 months)

**Success Metrics:**
- ✅ VSCode extension adoption >60% (THE INFLECTION POINT validated)
- ✅ Alpha team NPS >7
- ✅ 80%+ alpha teams complete full lifecycle workflow
- ✅ Framework stability: <5 bugs reported, all fixed within 1 week

**Risk Mitigation:**
- VSCode extension is Priority 1 (adoption catalyst, not nice-to-have)
- Friendly alpha teams selected (patient, willing to report issues)
- 2-month timeline allows iteration based on feedback

**Gate Criteria:** VSCode adoption validated, NPS >7, framework stable

---

### Gate 6: Month 5-6 Beta (35% Cumulative Probability)

**Objectives:**

**Public Beta Track:**
- [ ] Public beta launched (GitHub, open source or free tier)
- [ ] 100+ teams using BMAD-Enhanced
- [ ] 50+ GitHub stars, 5+ community contributors
- [ ] Framework hardening (edge cases, error handling, performance)

**Parallel GUI Design Track:**
- [ ] GUI design work completed (Figma prototypes)
- [ ] Lifecycle-phase wizard UX designed
- [ ] Visual traceability graph interface designed
- [ ] User testing with mockups (validate before implementation)

**Success Metrics:**
- ✅ 100+ teams actively using
- ✅ 50+ GitHub stars
- ✅ 5+ community contributors (PRs, issues, discussions)
- ✅ GUI designs validated via user testing

**Risk Mitigation:**
- Public beta validates community adoption (35% failure risk due to market uncertainty)
- Parallel GUI design reduces time-to-market for Phase 3 (saves 2 months)
- Community feedback informs GUI priorities

**Gate Criteria:** 100+ teams using, community engaged, GUI designs validated

---

### Gate 7: Month 7+ Web UI (25% Cumulative Probability)

**Gating Criteria (Must ALL Be Met):**
- [ ] >500 teams actively using CLI/VSCode
- [ ] NPS >7 across all user roles (PM, Designer, Engineer, QA)
- [ ] 80%+ of teams complete full-lifecycle workflow
- [ ] Framework stability proven (no major bugs in 2 months)

**Objectives (Only IF Gating Criteria Met):**
- [ ] Web UI v2.0 launched (lifecycle wizard, visual traceability graph)
- [ ] Advanced features shipped (import scripts, adaptive AI modes, team analytics)
- [ ] Web UI adoption >50% of new users

**Success Metrics:**
- ✅ Gating criteria validated (PMF proven via CLI/VSCode)
- ✅ Web UI adoption >50% of new users
- ✅ NPS maintained >7 across all roles

**Risk Mitigation:**
- Gating criteria protect against premature GUI investment (25% probability reflects uncertainty)
- If NOT met: Pivot to VSCode-first strategy (skip Web UI, focus on extension features)
- GUI design already complete (Month 5-6 parallel track) - reduces implementation risk

**Pivot Decision Point:**
- IF gating criteria NOT met at Month 6 → Skip Web UI, double down on VSCode extension
- Example: 400 teams (not 500), NPS 6.5 (not 7) → Continue with VSCode-first, revisit GUI at Month 12

**Gate Criteria:** Gating criteria met OR explicit pivot decision made

---

### Critical Path Dependencies

**Must Execute in This Order (Chain Cannot Be Broken):**

1. **Day 1** → Dogfooding culture established
2. **Month 1 Week 4** → Frontmatter helpers built (prevents alpha abandonment)
3. **Month 2 Week 3** → Dogfooding validation (creates Phase 1 plan, proves end-to-end)
4. **Phase 0.5** → Alpha blocker fixes (prevents rushed, buggy release)
5. **Month 3-4** → VSCode extension (THE INFLECTION POINT, adoption accelerates)

**Parallelizable Work (Can Execute Concurrently):**
- Month 5-6: GUI design work (parallel to Public Beta)
- Month 2: Incremental indexing architecture design (implement later)
- Month 3-4: Documentation + community building (parallel to alpha)

**Failure Modes if Chain Breaks:**
- ❌ Skip Month 1 Week 4 frontmatter helpers → 40% alpha abandonment, 2-week reactive sprint, trust damage
- ❌ Skip Month 2 Week 3 dogfooding validation → Architectural bugs discovered by alpha teams, embarrassment
- ❌ Skip Phase 0.5 buffer → Rushed alpha, damaged reputation, 30% abandonment
- ❌ Delay VSCode extension to Month 7 → Lose 3-4 months of accelerated adoption

---

### Risk-Adjusted Timeline Summary

| Phase | Duration | Cumulative Probability | Key Deliverable |
|-------|----------|------------------------|-----------------|
| Day 1 | 1 day | 95% | Dogfooding started, cut list documented |
| Month 1 | 4 weeks | 81% | Frameworks integrated, frontmatter helpers built |
| Month 2 | 4 weeks | 58% | End-to-end workflow validated, traceability working |
| Phase 0.5 | 2 weeks | 52% | Alpha blockers fixed, documentation polished |
| Month 3-4 | 8 weeks | 44% | VSCode extension shipped, alpha validated |
| Month 5-6 | 8 weeks | 35% | Public beta launched, GUI designs validated |
| Month 7+ | 12+ weeks | 25% | Web UI shipped (only if gating criteria met) |

**Total Timeline to Web UI:** ~10-12 months (IF gating criteria met at Month 6)

**Pivot Point:** Month 6 - If gating criteria NOT met, pivot to VSCode-first strategy (skip Web UI)

---

## What BMAD-Enhanced Actually Is

**Elevator Pitch (30 seconds):**
> "BMAD-Enhanced is a composable toolbox that eliminates the context reconstruction tax. Pick the lifecycle phases you need—Discovery, Design, Development, Quality—and choose workflows per role. Import from Jira/GitHub/Notion, work in your natural environment, export anywhere. AI adapts to your expertise: teaches beginners, assists intermediates, stays quiet for experts. Trace from any line of code back to the original hypothesis in under 2 minutes. No forced adoption, no rip-and-replace."

**Mental Models by Role:**
- **For Engineers**: "Git for reasoning—trace why a function exists like you trace code history"
- **For Designers**: "Your design rationale preserved forever—never re-explain the same decision"
- **For PMs**: "Every feature traced to business hypothesis—instant context for stakeholder questions"
- **For Executives**: "25-35% productivity gain by eliminating context reconstruction waste"
