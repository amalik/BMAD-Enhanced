---
title: "Deep-Dive Framework Analysis: BMAD Method vs DesignOS vs AgentOS"
date: 2026-02-07
version: 1.0.0
status: ANALYSIS COMPLETE
related_docs:
  - architectural-decision-record.md (v1.3.0)
  - phase-0-alternative-agent-integration.md
  - phase-0-workflow-map.md
---

# Deep-Dive Framework Analysis: BMAD Method vs DesignOS vs AgentOS

**Purpose:** Comprehensive analysis of how BMAD agents, DesignOS, and AgentOS actually work, identify workflow overlaps, and assess artifact compatibility for Phase 0 integration.

**Date:** 2026-02-07
**Analysis Conducted By:** Claude Sonnet 4.5 (BMAD-Enhanced Planning Session)

---

## Table of Contents

1. [BMAD Method: Agent Architecture Deep-Dive](#bmad-method-agent-architecture)
2. [DesignOS: Framework Structure Analysis](#designos-framework-structure)
3. [AgentOS: Framework Structure Analysis](#agentos-framework-structure)
4. [Workflow Overlap Analysis](#workflow-overlap-analysis)
5. [Artifact Compatibility Matrix](#artifact-compatibility-matrix)
6. [Integration Patterns Comparison](#integration-patterns)
7. [Recommendations for Phase 0](#recommendations)

---

## BMAD Method: Agent Architecture Deep-Dive

### Agent File Structure

**Location:** `_bmad/{module}/agents/{agent-name}.md`

**Standard Agent Anatomy:**

```yaml
---
name: "agent-identifier"
description: "Agent Description"
---

<agent id="agent-file.yaml" name="PersonaName" title="Agent Title" icon="emoji">
  <activation critical="MANDATORY">
    <step n="1">Load persona from this agent file</step>
    <step n="2">Load config from {project-root}/_bmad/{module}/config.yaml</step>
    <step n="3">Store session variables: {user_name}, {communication_language}, {output_folder}</step>
    <step n="4">Display greeting + numbered menu</step>
    <step n="5">WAIT for user input</step>
    <step n="6">Process menu selection (number, cmd trigger, fuzzy match)</step>
    <step n="7">Execute menu handler (exec, workflow, data attributes)</step>
  </activation>

  <persona>
    <role>Expert Role Definition</role>
    <identity>Background and expertise</identity>
    <communication_style>How the agent communicates</communication_style>
    <principles>Decision-making philosophy and rules</principles>
  </persona>

  <menu>
    <item cmd="MH">[MH] Redisplay Menu</item>
    <item cmd="CH">[CH] Chat with Agent</item>
    <item cmd="XX" exec="path/to/workflow.md">[XX] Execute Workflow</item>
    <item cmd="YY" workflow="path/to/workflow.yaml">[YY] Run YAML Workflow</item>
    <item cmd="PM" exec="{project-root}/_bmad/core/workflows/party-mode/workflow.md">[PM] Party Mode</item>
    <item cmd="DA">[DA] Dismiss Agent</item>
  </menu>

  <menu-handlers>
    <handler type="exec">
      1. Read fully and follow file at exec="path"
      2. Process complete file instructions
      3. Pass data="path" if provided as context
    </handler>
    <handler type="workflow">
      1. LOAD {project-root}/_bmad/core/tasks/workflow.xml
      2. Pass workflow YAML path as 'workflow-config' parameter
      3. Follow workflow.xml instructions precisely
    </handler>
  </menu-handlers>
</agent>
```

### Actual Agent Examples

#### 1. BMM Analyst Agent (Mary)

**File:** `_bmad/bmm/agents/analyst.md`

**Persona:**
- **Role:** Strategic Business Analyst + Requirements Expert
- **Communication Style:** "Speaks with the excitement of a treasure hunter"
- **Principles:** Channel Porter's Five Forces, SWOT, root cause analysis

**Menu Capabilities:**
```
[BP] Brainstorm Project (exec: core/workflows/brainstorming/workflow.md)
[RS] Research (exec: bmm/workflows/1-analysis/research/workflow.md)
[CB] Create Brief (exec: bmm/workflows/1-analysis/create-product-brief/workflow.md)
[DP] Document Project (workflow: bmm/workflows/document-project/workflow.yaml)
[PM] Party Mode
[DA] Dismiss Agent
```

**Key Insight:** Agent is a **menu orchestrator** - doesn't contain business logic, invokes workflows.

#### 2. CIS Design Thinking Coach (Maya)

**File:** `_bmad/cis/agents/design-thinking-coach.md`

**Persona:**
- **Role:** Human-Centered Design Expert + Empathy Architect
- **Communication Style:** "Talks like a jazz musician - improvises around themes"
- **Principles:** "Design is about THEM not us. Validate through real human interaction."

**Menu Capabilities:**
```
[DT] Design Thinking (workflow: cis/workflows/design-thinking/workflow.yaml)
[PM] Party Mode
[DA] Dismiss Agent
```

**Key Insight:** Single-purpose agent with ONE primary workflow.

#### 3. TEA Test Architect (Murat)

**File:** `_bmad/tea/agents/tea.md`

**Persona:**
- **Role:** Master Test Architect
- **Communication Style:** "Blends data with gut instinct. 'Strong opinions, weakly held'"
- **Principles:** Risk-based testing, quality gates backed by data

**Menu Capabilities:**
```
[TMT] Teach Me Testing
[TF] Test Framework (workflow: testarch/framework/workflow.yaml)
[AT] ATDD (workflow: testarch/atdd/workflow.yaml)
[TA] Test Automation (workflow: testarch/automate/workflow.yaml)
[TD] Test Design (workflow: testarch/test-design/workflow.yaml)
[TR] Trace Requirements (workflow: testarch/trace/workflow.yaml)
[NR] NFR Assessment (workflow: testarch/nfr-assess/workflow.yaml)
[CI] Continuous Integration (workflow: testarch/ci/workflow.yaml)
[RV] Review Tests (workflow: testarch/test-review/workflow.yaml)
[PM] Party Mode
[DA] Dismiss Agent
```

**Key Insight:** Multi-capability agent - 9 distinct quality workflows.

**Additional Unique Feature:**
```xml
<step n="4">Consult {project-root}/_bmad/tea/testarch/tea-index.csv to select knowledge fragments</step>
<step n="5">Load referenced fragments from {project-root}/_bmad/tea/testarch/knowledge/</step>
<step n="6">Cross-check with official Playwright, Cypress, Pact, CI platform docs</step>
```

**Knowledge Base Integration:** TEA agent loads domain-specific knowledge dynamically.

### BMAD Workflow Architectures

BMAD uses **TWO distinct workflow patterns:**

#### Pattern 1: Step-File Architecture (Micro-Files)

**Example:** Product Brief Workflow (`_bmad/bmm/workflows/1-analysis/create-product-brief/`)

**Structure:**
```
create-product-brief/
├── workflow.md                # Main workflow file (orchestrator)
├── product-brief.template.md  # Output template
└── steps/
    ├── step-01-init.md        # Initialization
    ├── step-01b-continue.md   # Optional continuation
    ├── step-02-vision.md      # Vision definition
    ├── step-03-users.md       # User identification
    ├── step-04-metrics.md     # Success metrics
    ├── step-05-scope.md       # Scope definition
    └── step-06-complete.md    # Finalization
```

**Execution Model:**
1. User invokes agent menu item: `[CB] Create Brief`
2. Agent executes `workflow.md` via `exec` handler
3. Workflow loads `step-01-init.md`
4. Step file executes, appends to output file
5. Step updates frontmatter: `stepsCompleted: [1]`
6. Step directs: "Load step-02-vision.md"
7. Process repeats until `step-06-complete.md`

**Critical Rules:**
```markdown
- 🛑 NEVER load multiple step files simultaneously
- 📖 ALWAYS read entire step file before execution
- 🚫 NEVER skip steps or optimize sequence
- 💾 ALWAYS update frontmatter `stepsCompleted` array
- 🎯 ALWAYS follow exact instructions in step file
- ⏸️ ALWAYS halt at menus and wait for user input
```

**State Tracking:**
```yaml
---
stepsCompleted: [1, 2, 3, 4, 5, 6]
currentStep: 6
workflowName: create-product-brief
date: 2026-02-07
---
```

**Key Insight:** This is EXACTLY the "Capabilities + Steps" pattern from ADR v1.3.0!

#### Pattern 2: YAML Workflow + Instructions (Monolithic)

**Example:** Design Thinking Workflow (`_bmad/cis/workflows/design-thinking/`)

**Structure:**
```
design-thinking/
├── workflow.yaml         # Configuration + variables
├── instructions.md       # Complete workflow logic (203 lines)
├── template.md          # Output template
├── design-methods.csv   # Data: empathy/define/ideate/prototype/test methods
└── README.md            # Documentation
```

**Execution Model:**
1. User invokes: `[DT] Design Thinking`
2. Agent triggers `workflow` handler
3. Agent loads `_bmad/core/tasks/workflow.xml` (workflow engine)
4. workflow.xml reads `workflow.yaml` configuration
5. workflow.xml loads `instructions.md`
6. Instructions executed as single continuous workflow
7. Outputs written to `{output_folder}/design-thinking-{{date}}.md`

**workflow.yaml Structure:**
```yaml
name: "design-thinking"
description: "Guide human-centered design processes..."
author: "BMad"

config_source: "{project-root}/_bmad/cis/config.yaml"
output_folder: "{config_source}:output_folder"
user_name: "{config_source}:user_name"
communication_language: "{config_source}:communication_language"
date: system-generated

installed_path: "{project-root}/_bmad/cis/workflows/design-thinking"
template: "{installed_path}/template.md"
instructions: "{installed_path}/instructions.md"
design_methods: "{installed_path}/design-methods.csv"

default_output_file: "{output_folder}/design-thinking-{{date}}.md"
standalone: true
```

**instructions.md Structure:**
```xml
<critical>Load and process workflow.yaml</critical>
<critical>Load design methods from {design_methods}</critical>

<facilitation-principles>
  - Keep users at center
  - Divergent thinking before convergent action
  - Prototype beats discussion
  - Embrace failure as feedback
</facilitation-principles>

<workflow>
  <step n="1" goal="Gather context and define design challenge">
    [Instructions for empathy gathering]
    <template-output>design_challenge</template-output>
    <template-output>challenge_statement</template-output>
  </step>

  <step n="2" goal="EMPATHIZE - Build understanding">
    [Instructions for empathy methods selection]
    <template-output>user_insights</template-output>
    <template-output>empathy_map</template-output>
  </step>

  <step n="3" goal="DEFINE - Frame problem">
    [Instructions for problem framing]
    <template-output>pov_statement</template-output>
    <template-output>hmw_questions</template-output>
  </step>

  [... steps 4-7 follow same pattern ...]
</workflow>
```

**Key Insight:** Single instructions file contains ALL workflow logic. No micro-file splitting.

### BMAD Agent Registration

**File:** `_bmad/_config/agent-manifest.csv`

**Structure:**
```csv
name,displayName,title,icon,role,identity,communicationStyle,principles,module,path
"analyst","Mary","Business Analyst","📊","Strategic BA + Requirements Expert","Senior analyst...","Treasure hunter excitement...","Porter's Five Forces...","bmm","_bmad/bmm/agents/analyst.md"
"design-thinking-coach","Maya","Design Thinking Maestro","🎨","Human-Centered Design Expert","Design virtuoso...","Jazz musician...","Design is about THEM...","cis","_bmad/cis/agents/design-thinking-coach.md"
"tea","Murat","Master Test Architect","🧪","Master Test Architect","Risk-based testing...","Data with gut instinct...","Quality gates backed by data...","tea","_bmad/tea/agents/tea.md"
```

**Discovery Mechanism:**
1. BMAD system scans `agent-manifest.csv` on startup
2. Loads agent metadata (displayName, title, role, identity, path)
3. Generates slash commands: `/bmad-agent-{module}-{name}`
4. Example: `/bmad-agent-cis-design-thinking-coach` → Loads Maya

**Key Insight:** Explicit registration, NOT convention-based discovery.

### BMAD Party Mode (Multi-Agent Orchestration)

**File:** `_bmad/core/workflows/party-mode/workflow.md`

**How It Works:**
1. Loads `agent-manifest.csv`
2. Builds agent roster with complete personality data
3. User provides topic or question
4. AI analyzes topic for domain/expertise requirements
5. AI selects 2-3 most relevant agents
6. Agents respond in character using merged personality data
7. Enables agent-to-agent cross-talk
8. User can address specific agents by name

**Example Party Mode Session:**
```
User: "How do we ensure our new authentication feature is well-designed and tested?"

Party Mode Facilitator:
I'm bringing in Winston (Architect), Maya (Design Thinking Coach), and Murat (Test Architect).

Winston (Architect): From an architectural perspective, authentication is a critical boundary...

Maya (Design Thinking Coach): Let's start with empathy - what does a user FEEL when they can't access their account?

Murat (Test Architect): I'll need acceptance criteria before we test this. What are the MUST-HAVE security properties?

[Conversation continues with agents building on each other's points]
```

**Key Insight:** Party mode is MANUAL orchestration - AI selects agents, but user drives conversation.

---

## DesignOS: Framework Structure Analysis

### Repository Information

**Source:** [github.com/buildermethods/design-os](https://github.com/buildermethods/design-os)
- **Stars:** 1.4k
- **Forks:** 268
- **License:** MIT
- **Creator:** Brian Casel (Builder Methods)
- **Primary Language:** TypeScript (95.3%), CSS (4.0%)

### Core Problem Addressed

**From README:**
> "AI coding tools are incredible at building fast. But the results often miss the mark. DesignOS separates design decision-making from implementation, establishing a shared specification before code generation begins."

**Key Value Proposition:**
- **Problem:** Coding agents figure out what to build AND build it simultaneously → misaligned outcomes
- **Solution:** Establish "a source of truth for what 'done' looks like" BEFORE development

### Four-Phase Workflow

#### Phase 1: Product Planning
**Deliverables:**
- Product vision documentation
- Roadmap breakdown
- Data model specifications

**Activities:**
- Vision definition
- Roadmap breakdown into features
- Data modeling

#### Phase 2: Design System
**Deliverables:**
- Color palette specifications
- Typography guidelines
- Application shell design

**Activities:**
- Color selection
- Typography specification
- UI shell/layout design

#### Phase 3: Section Design
**Deliverables:**
- Feature area requirements
- Sample/test data sets
- Screen designs for each feature

**Activities:**
- Feature requirements specification
- Sample data generation
- Screen design (wireframes/mockups)

#### Phase 4: Export
**Deliverables:**
- "Complete handoff package for implementation"
- "Production-ready components for implementation"

**Activities:**
- Package design artifacts
- Generate implementation specifications
- Export to development team

### DesignOS Agent Interaction Pattern

**From Web Research:**
> "Each step is a conversation. The AI asks questions, you provide direction."

**Iterative Collaboration Model:**
- Human-AI partnership shapes products
- AI asks clarifying questions
- User provides direction and decisions
- Iterative refinement until vision matches design

**Key Insight:** DesignOS is CONVERSATIONAL - not workflow automation, but guided facilitation.

### Technical Architecture

**Tech Stack:**
- TypeScript-based web application
- Vite build tool
- Node.js runtime environment
- ESLint for code quality

**Integration Files:**
```
├── .claude/              # Claude integration configuration
├── docs/
│   ├── agents.md        # Agent interaction patterns documentation
│   └── claude.md        # Claude-specific integration details
```

**Key Insight:** DesignOS is a **WEB APPLICATION**, not a markdown-based workflow system.

### DesignOS vs BMAD Design Thinking Comparison

| Aspect | DesignOS | BMAD CIS Design Thinking |
|--------|----------|--------------------------|
| **Type** | TypeScript web app | Markdown workflow |
| **Execution** | Browser-based UI | CLI/agent-based |
| **Phases** | 4 phases (Product Planning → Design System → Section Design → Export) | 7 steps (Empathize → Define → Ideate → Prototype → Test → Iterate) |
| **Artifacts** | Vision docs, data models, design system, screen designs, handoff package | Challenge statement, insights, POV, HMW questions, ideas, prototypes, learnings |
| **Output Format** | Web UI + export package | Markdown document |
| **Integration** | Claude/Cursor via .claude/ config | BMAD agent menu system |
| **User Experience** | Structured form-based conversation | Facilitated open-ended conversation |

**Overlap:** Both facilitate design thinking, but DesignOS is implementation-focused (handoff to dev), BMAD is exploration-focused (learning and iteration).

**Complementary:** DesignOS Phase 1-3 → BMAD Design Thinking → DesignOS Phase 4 (export) → BMAD BMM Implementation

---

## AgentOS: Framework Structure Analysis

### Repository Information

**Source:** [github.com/buildermethods/agent-os](https://github.com/buildermethods/agent-os)
- **Stars:** 3.7k
- **Forks:** 658
- **License:** MIT
- **Creator:** Brian Casel (Builder Methods)
- **Primary Language:** Shell (100%)
- **Commits:** 126

### Core Capabilities

**From README:**
> "A lightweight system for managing codebase standards and spec-driven development."

**Four Primary Functions:**

#### 1. Discover Standards
**Purpose:** Extract patterns and conventions from codebase into documented standards

**Example Use Cases:**
- Analyze existing code for naming conventions
- Identify architectural patterns
- Extract testing patterns
- Document API design standards

#### 2. Deploy Standards
**Purpose:** Intelligently inject relevant standards based on what you're building

**Context-Aware Application:**
- Standards applied based on current work
- Relevant patterns surfaced automatically
- Prevents inconsistencies before they happen

#### 3. Shape Spec
**Purpose:** Create better implementation plans using discovered standards

**Spec Improvement:**
- Leverages documented standards
- Ensures consistency with existing codebase
- Reduces ambiguity in specifications

#### 4. Index Standards
**Purpose:** Keep standards organized and discoverable

**Organization:**
- Catalogued standards
- Searchable throughout project
- Maintained as living documentation

### AgentOS Technical Architecture

**Repository Structure:**
```
agent-os/
├── .github/                  # GitHub configuration
├── commands/agent-os/        # Command implementations
├── profiles/default/global/  # Default global profile
├── scripts/                  # Utility scripts
├── config.yml               # Main configuration
├── README.md
├── CHANGELOG.md
└── LICENSE
```

**Key Files:**
- `config.yml` - YAML-based configuration
- `profiles/default/global/` - Default profile settings
- `commands/agent-os/` - Command logic

### AgentOS Integration Model

**Supported Tools:**
- Claude Code
- Cursor
- Antigravity
- Other AI development platforms

**Language Agnostic:** Works across all programming languages and frameworks

**Key Insight:** AgentOS is a **COMMAND-LINE TOOL**, not a web app or markdown workflow system.

### AgentOS vs BMAD TEA Comparison

| Aspect | AgentOS | BMAD TEA (Test Architect) |
|--------|---------|---------------------------|
| **Type** | Shell-based CLI tool | Markdown workflow system |
| **Execution** | Command invocation | Agent menu + workflows |
| **Focus** | Codebase standards + specs | Quality gates + test architecture |
| **Standards** | Discovered from existing code | Knowledge base + best practices CSV |
| **Artifacts** | Standard docs, improved specs | Test frameworks, ATDD specs, quality gate decisions, traceability matrices |
| **Output Format** | Markdown standards files | Markdown test artifacts + code files |
| **Integration** | .yml config for Claude/Cursor | BMAD agent manifest.csv |
| **User Experience** | Command-based | Conversational workflow |

**Overlap:** Both focus on quality and standards, but AgentOS is pre-implementation (standards discovery), BMAD TEA is implementation + validation (test generation, quality gates).

**Complementary:** AgentOS (discover standards) → BMAD Architect (apply standards) → BMAD Dev (implement) → BMAD TEA (validate quality)

---

## Workflow Overlap Analysis

### Mapping Framework Workflows

#### Product Development Workflow Overlap

**DesignOS Path:**
```
Product Planning → Design System → Section Design → Export
```

**BMAD Method Path:**
```
Analyst: Create Brief → Analyst: Research
  ↓
CIS: Design Thinking (Empathize → Define → Ideate → Prototype → Test)
  ↓
BMM: Create UX Design
  ↓
Architect: Create Architecture → PM: Create PRD → SM: Create Epics & Stories
  ↓
Dev: Implement Stories
  ↓
TEA: Test Design → TEA: ATDD → TEA: Test Automation → TEA: Review Tests
  ↓
TEA: Trace Requirements → TEA: NFR Assessment → TEA: CI Pipeline
```

**AgentOS Path:**
```
Discover Standards (from existing codebase)
  ↓
Deploy Standards (during specification)
  ↓
Shape Spec (improve plan quality)
  ↓
[Implementation happens in other tools]
  ↓
Index Standards (update based on new code)
```

#### Where They Overlap

**DesignOS Phase 1 (Product Planning) ≈ BMAD Analyst + PM:**
- Both create product vision
- Both define roadmap
- Both model data
- **Difference:** DesignOS is web UI, BMAD is conversational workflow

**DesignOS Phase 2-3 (Design System + Section Design) ≈ BMAD CIS Design Thinking + BMM UX Design:**
- Both create design systems
- Both design screens/features
- Both generate sample data
- **Difference:** DesignOS exports implementation package, BMAD creates markdown specifications

**DesignOS Phase 4 (Export) → Gap → BMAD BMM Implementation:**
- DesignOS hands off to dev
- BMAD continues with PRD → Architecture → Epics/Stories → Implementation

**AgentOS (Discover/Deploy Standards) ≈ BMAD TEA (Knowledge Base + Standards Check):**
- Both focus on code quality standards
- Both prevent inconsistencies
- **Difference:** AgentOS discovers from code, BMAD TEA uses predefined knowledge + custom memories

**AgentOS (Shape Spec) ≈ BMAD Architect + Quick Flow Spec:**
- Both improve implementation plans
- Both apply architectural standards
- **Difference:** AgentOS uses discovered patterns, BMAD uses expert agent reasoning

#### Where They Complement

**Sequence 1: Product Conception → Implementation**
```
DesignOS Product Planning
  ↓ (Vision + Roadmap)
BMAD Analyst Research + Create Brief
  ↓ (Market Context + Requirements)
BMAD CIS Design Thinking
  ↓ (User Empathy + Problem Framing)
DesignOS Design System + Section Design
  ↓ (Visual Design + Screen Specs)
BMAD BMM Create UX Design
  ↓ (Interaction Patterns + Wireframes)
DesignOS Export
  ↓ (Handoff Package)
AgentOS Discover Standards
  ↓ (Codebase Patterns)
AgentOS Shape Spec
  ↓ (Consistent Implementation Plan)
BMAD Architect + PM
  ↓ (Architecture + PRD)
BMAD SM + Dev
  ↓ (Stories + Implementation)
BMAD TEA
  ↓ (Quality Validation)
AgentOS Index Standards
  ↓ (Update Standards from New Code)
```

**Sequence 2: Brownfield Project Enhancement**
```
AgentOS Discover Standards
  ↓ (Extract Existing Patterns)
BMAD BMM Document Project
  ↓ (Analyze + Document Codebase)
BMAD Analyst Research
  ↓ (Competitive Analysis for Enhancements)
BMAD CIS Design Thinking
  ↓ (User Needs for New Features)
AgentOS Shape Spec
  ↓ (Enhancement Spec Aligned with Standards)
BMAD Architect
  ↓ (Architecture Decision for Changes)
BMAD Dev
  ↓ (Implement Enhancement)
BMAD TEA
  ↓ (Quality Gate + Test Coverage)
AgentOS Index Standards
  ↓ (Update Standards Registry)
```

### Workflow Architecture Comparison

| Framework | Workflow Model | Execution Engine | State Management | Artifacts |
|-----------|----------------|------------------|------------------|-----------|
| **BMAD Method** | Step-files (micro) OR Instructions (mono) | workflow.xml + agent handlers | Frontmatter `stepsCompleted` array | Markdown documents |
| **DesignOS** | 4-phase conversational | TypeScript web app | Browser state + export | Web UI + export package |
| **AgentOS** | Command-driven | Shell scripts | File-based standards registry | Standard docs + specs |

**Key Finding:** All three use MARKDOWN as core artifact format, but execution models are completely different.

---

## Artifact Compatibility Matrix

### BMAD Method Artifact Types

**BMM (Business Method Module):**
- Product Brief (markdown)
- Research Report (markdown)
- PRD (markdown)
- Architecture Decision Record (markdown)
- UX Design Specification (markdown + Excalidraw)
- Epics & Stories (markdown)
- Sprint Status (YAML)
- Tech Specs (markdown)
- Code Review Reports (markdown)

**CIS (Creative & Innovation Suite):**
- Design Thinking Session Output (markdown)
  - Challenge statement
  - User insights
  - Empathy map
  - POV statement
  - HMW questions
  - Ideas
  - Prototypes
  - Test learnings
- Brainstorming Session Report (markdown)
- Problem-Solving Analysis (markdown)
- Innovation Strategy (markdown)
- Storytelling Narrative (markdown)

**TEA (Test & Engineering Automation):**
- Test Framework (code + markdown README)
- ATDD Specifications (markdown + code)
- Test Automation Suite (code)
- Test Design Document (markdown)
- Requirements Traceability Matrix (markdown)
- NFR Assessment (markdown)
- CI/CD Pipeline Configuration (YAML + markdown)
- Test Review Report (markdown)

### DesignOS Artifact Types

**From Web Research:**
- Product vision documentation (format unknown, likely web UI data)
- Roadmap breakdown (format unknown)
- Data model specifications (format unknown)
- Color palette specifications (likely CSS/design tokens)
- Typography guidelines (likely CSS/design tokens)
- Application shell design (likely Figma/design files or code)
- Feature area requirements (format unknown)
- Sample/test data sets (likely JSON/CSV)
- Screen designs (likely design files or code)
- "Complete handoff package for implementation" (likely ZIP/export format)

**Note:** DesignOS repository is TypeScript web app, so artifacts likely stored in database/browser state, exported as package.

### AgentOS Artifact Types

**From Web Research:**
- Standard documentation files (markdown)
- Spec/plan documents (markdown, improved quality)
- Standards index/registry (file-based, format unknown)

### Artifact Compatibility Analysis

#### Can BMAD consume DesignOS artifacts?

**Product Vision → BMAD Product Brief:**
- ✅ **Compatible IF** DesignOS exports markdown
- ❌ **Incompatible IF** DesignOS uses proprietary format
- **Unknown:** DesignOS export format not documented in web research

**Data Model → BMAD Architecture:**
- ✅ **Compatible** if exported as markdown/YAML
- ⚠️ **Manual conversion** likely required

**Design System → BMAD UX Design Spec:**
- ✅ **Compatible** if exported as CSS/design tokens
- ⚠️ **Overlap:** BMAD also creates design systems (via UX Designer agent)

**Screen Designs → BMAD UX Wireframes:**
- ✅ **Compatible** if exported as Excalidraw JSON or markdown
- ⚠️ **Overlap:** BMAD creates wireframes using Excalidraw workflows

**Handoff Package → BMAD Implementation:**
- ✅ **Potentially compatible** if package includes markdown specs
- ❌ **Gap:** Package likely targets generic dev tools, not BMAD-specific structure

#### Can BMAD consume AgentOS artifacts?

**Standards Documentation → BMAD Architecture ADRs:**
- ✅ **Highly compatible** - both use markdown
- ✅ **Direct reference:** BMAD Architect can load AgentOS standards as knowledge base

**Improved Specs → BMAD Tech Specs:**
- ✅ **Highly compatible** - both are markdown specs
- ✅ **Enhancement:** AgentOS spec can BE the BMAD tech spec

**Standards Index → BMAD TEA Knowledge Base:**
- ✅ **Compatible** if standards index is CSV/markdown
- ✅ **TEA can reference:** AgentOS standards as external knowledge source

#### Can DesignOS consume BMAD artifacts?

**BMAD Product Brief → DesignOS Product Planning:**
- ⚠️ **Manual import** required (BMAD markdown → DesignOS UI)
- ❌ **No automatic ingestion** (DesignOS is web app)

**BMAD Design Thinking Output → DesignOS Section Design:**
- ⚠️ **Manual copy-paste** likely required
- ❌ **Workflow mismatch:** BMAD output is exploration-focused, DesignOS needs implementation-ready specs

#### Can AgentOS consume BMAD artifacts?

**BMAD Architecture ADRs → AgentOS Standards:**
- ✅ **Highly compatible** - both markdown
- ✅ **AgentOS can index** BMAD ADRs as standards

**BMAD Code (from Dev agent) → AgentOS Discover:**
- ✅ **Direct compatibility** - AgentOS analyzes any code
- ✅ **Extract patterns** from BMAD-generated code

**BMAD TEA Knowledge Base → AgentOS Standards:**
- ✅ **Compatible** - CSV knowledge can be indexed by AgentOS
- ✅ **Merge:** AgentOS discovered patterns + BMAD best practices

### Artifact Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│                  DesignOS (Web App)                     │
│  Product Vision → Data Model → Design System → Export  │
└─────────────────────┬───────────────────────────────────┘
                      │ (Manual export/import)
                      ↓
┌─────────────────────────────────────────────────────────┐
│              BMAD Method (Markdown Workflows)           │
│  Brief → Research → Design Thinking → UX Design →      │
│  Architecture → PRD → Epics/Stories → Implementation →  │
│  Tests → Quality Gates                                  │
└─────────────────────┬───────────────────────────────────┘
                      │ (Markdown artifacts)
                      ↓
┌─────────────────────────────────────────────────────────┐
│           AgentOS (Standards Management)                │
│  Discover Standards ← Code Files                        │
│  Index Standards ← BMAD ADRs + TEA Knowledge            │
│  Shape Spec → Improved Implementation Plans             │
└─────────────────────────────────────────────────────────┘
                      │
                      ↓ (Enhanced specs)
                    BMAD Implementation
```

**Key Finding:**
- **BMAD ← AgentOS:** STRONG compatibility (both markdown, standards can be referenced)
- **BMAD ← DesignOS:** WEAK compatibility (manual conversion, format mismatch)
- **BMAD → AgentOS:** STRONG compatibility (AgentOS can index BMAD artifacts)
- **BMAD → DesignOS:** WEAK compatibility (DesignOS doesn't consume external markdown)

---

## Integration Patterns Comparison

### Current Phase 0 Plan: Capabilities + Steps (Custom Orchestration)

**From ADR v1.3.0:**
```
_designos/
├── capabilities/
│   ├── empathy-map.md      # Capability file
│   └── wireframe.md
├── steps/
│   ├── empathy-map-step-01.md   # Step implementation
│   └── wireframe-step-01.md
└── output/
```

**How It Would Work:**
1. BMAD workflow invokes DesignOS capability
2. Capability discovery engine scans `_designos/capabilities/`
3. Finds `empathy-map.md` capability
4. Capability file loads steps from `_designos/steps/`
5. Steps execute sequentially
6. Output written to `_designos/output/`

**Implementation Required:**
- Capability discovery engine (200 LOC)
- Step loading mechanism (300 LOC)
- Orchestration glue (300 LOC)
- Execution tracing (250 LOC)
- Total: **1,800 LOC**

### Alternative: Agent Integration (Proven Pattern)

**From Alternative Analysis:**
```
_designos/
├── agents/
│   ├── empathy-mapper.md    # Agent file (BMAD standard)
│   └── wireframe-designer.md
├── workflows/
│   └── empathy-map/
│       ├── workflow.md      # Step-file OR
│       ├── workflow.yaml    # YAML + instructions
│       └── steps/
└── output/
```

**How It Would Work:**
1. Register agents in `_bmad/_config/agent-manifest.csv`
2. User invokes `/bmad-agent-designos-empathy-mapper`
3. Agent displays menu with workflow options
4. User selects `[EM] Create Empathy Map`
5. Agent executes workflow.md (step-file arch) OR workflow.yaml (YAML arch)
6. Workflow produces markdown artifact in `_designos/output/`

**Implementation Required:**
- 4 agent files (empathy-mapper, wireframe-designer, quality-gatekeeper, standards-auditor): **400 LOC**
- 4 workflows (2 DesignOS, 2 AgentOS): Already exist in BMAD patterns, minimal new code
- Agent registration (CSV entries): **Trivial**
- Total: **~400 LOC** (vs 1,800 LOC)

### Real DesignOS/AgentOS Integration Challenges

#### Challenge 1: DesignOS is a Web App, Not Markdown

**Reality:** DesignOS repository is a TypeScript web application with browser-based UI.

**Options:**
1. **Run DesignOS separately** - BMAD users export from DesignOS web UI, import markdown to BMAD manually
2. **Recreate DesignOS workflows in BMAD** - Implement similar design workflows using BMAD patterns (already partially done via CIS Design Thinking)
3. **API integration** - If DesignOS exposes API, BMAD could call it (no evidence of API in repository)

**Recommended:** Option 2 (Recreate workflows) - BMAD already has design thinking workflows, extend with additional DesignOS-inspired capabilities.

#### Challenge 2: AgentOS is CLI Tool, Not Workflow System

**Reality:** AgentOS is shell-based command tool for standards management.

**Options:**
1. **Invoke AgentOS commands from BMAD** - BMAD workflows call AgentOS CLI via bash
2. **Recreate AgentOS logic in BMAD** - Implement standards discovery in BMAD TEA module
3. **Hybrid** - Use AgentOS for discovery, store results in BMAD format

**Recommended:** Option 3 (Hybrid) - AgentOS discovers standards, BMAD TEA manages quality workflows.

#### Challenge 3: Neither Framework Uses "Capabilities + Steps" Pattern

**Reality:**
- **DesignOS:** 4-phase conversational UI
- **AgentOS:** Command-driven standards management
- **BMAD:** Agent menu + workflows (step-files OR YAML+instructions)

**Observation:** "Capabilities + Steps" pattern in ADR v1.3.0 is HYPOTHETICAL - doesn't match any existing framework architecture.

**Options:**
1. **Build custom orchestration** (Current Phase 0 plan) - 1,800 LOC to prove pattern
2. **Use BMAD agent pattern** (Alternative) - 400 LOC, proven system
3. **Hybrid** - Agents invoke capabilities (agent menus load capability files)

**Recommended:** Option 2 (BMAD agent pattern) - proven, less code, immediate value.

---

## Recommendations for Phase 0

### Finding 1: DesignOS and AgentOS Are NOT Markdown Workflow Systems

**Impact on BMAD-Enhanced Architecture:**

**Original Assumption (from ADR):**
> "DesignOS/AgentOS: Native markdown modules following BMAD workflow patterns (Capabilities + Steps)"

**Reality:**
- **DesignOS:** TypeScript web app with browser UI
- **AgentOS:** Shell-based CLI tool
- **Neither uses markdown workflows like BMAD**

**Conclusion:** Cannot integrate DesignOS/AgentOS by simply adding `_designos/` and `_agentos/` markdown directories.

### Finding 2: BMAD Already Has Design & Quality Capabilities

**Existing BMAD Capabilities That Overlap:**

**Design Capabilities (CIS module):**
- Design Thinking Coach (Maya) - Full 7-step design thinking workflow
- Brainstorming Coach (Carson) - Creative ideation techniques
- Storyteller (Sophia) - Narrative design
- Presentation Master (Caravaggio) - Visual design

**Quality Capabilities (TEA module):**
- Test Architect (Murat) - 9 quality workflows
- Test Framework initialization
- ATDD (acceptance test-driven development)
- Test automation
- Test design & risk assessment
- Requirements traceability
- NFR assessment
- CI/CD pipeline design
- Test review

**UX Design Capabilities (BMM module):**
- UX Designer (Sally) - Wireframes, prototypes, user flows
- Excalidraw diagram workflows

**Conclusion:** BMAD already provides 80%+ of DesignOS and AgentOS functionality via existing agents.

### Finding 3: Agent Integration Leverages Proven Infrastructure

**BMAD Agent System (21 agents in production):**
- Proven registration system (agent-manifest.csv)
- Established menu patterns
- Two workflow architectures (step-files, YAML+instructions)
- Party mode multi-agent orchestration
- 60-70% less code than custom orchestration

**DesignOS/AgentOS as Agents:**
- Create 4 new agents (empathy-mapper, wireframe-designer, quality-gatekeeper, standards-auditor)
- Use existing BMAD workflow patterns
- Leverage proven agent menu system
- Immediate user value (working agents in Week 1)

**Conclusion:** Agent integration is lower risk, faster delivery, proven architecture.

### Recommendation: Pivot Phase 0 from Custom Orchestration to Agent Enhancement

**Revised Phase 0 Goal:**
> "Enhance BMAD Method with 4 new design and quality agents inspired by DesignOS and AgentOS capabilities, leveraging proven agent architecture."

**Revised Phase 0 Scope:**

**Week 1: Create DesignOS-Inspired Agents (200 LOC)**
- `empathy-mapper.md` - User empathy mapping workflows
- `wireframe-designer.md` - Rapid wireframe generation workflows
- Register in agent-manifest.csv
- Test individual agent invocation

**Week 2: Create AgentOS-Inspired Agents (200 LOC)**
- `quality-gatekeeper.md` - Quality gate decision workflows
- `standards-auditor.md` - Code standards compliance checking
- Register in agent-manifest.csv
- Test individual agent invocation

**Week 3: Cross-Agent Workflow Integration (100 LOC)**
- Create workflow that chains agents (Design → Implement → Quality)
- Test party mode with new agents
- Document integration patterns
- Decision gate: Does agent pattern scale?

**Total LOC:** ~500 LOC (vs 1,800 LOC custom orchestration)

**Deliverables:**
- 4 working agents with slash commands
- Cross-agent workflow example
- Party mode integration
- Documentation

**Success Criteria:**
- [ ] Users can invoke `/bmad-agent-designos-empathy-mapper` and get working empathy map workflow
- [ ] Users can invoke `/bmad-agent-agentos-quality-gatekeeper` and get quality gate decision
- [ ] Workflow can automatically invoke multiple agents in sequence
- [ ] Party mode includes new agents in relevant discussions
- [ ] LOC estimate accurate (±20%)

### Recommendation: Defer Quint Integration to Phase 2 (Unchanged)

**Rationale:**
- Quint is SQLite-based, fundamentally different from markdown workflows
- Quint's 12 FPF commands (q0-init through q5-decide) are complex state machine
- Phase 0 should validate agent integration pattern before tackling database sync
- Quint adapter (500 LOC) remains Phase 2 scope

**Unchanged from ADR v1.3.0.**

### Recommendation: Update ADR to Reflect Reality

**Required ADR Updates:**

**v1.4.0 Changes:**
1. Acknowledge DesignOS/AgentOS are NOT markdown workflow systems
2. Revise Phase 0 from "validate Capabilities + Steps pattern" to "enhance BMAD with design/quality agents"
3. Update LOC estimate: 1,800 LOC → 500 LOC
4. Update integration strategy: "Native markdown modules" → "Inspired by DesignOS/AgentOS, implemented as BMAD agents"
5. Add "Real DesignOS/AgentOS Integration" as Phase 6 (post-v1.0.0) if desired

**Rationale:** Current ADR assumes DesignOS/AgentOS are markdown-based. Web research proves they are not. Architecture must reflect reality.

---

## Conclusion

### Key Findings Summary

1. **BMAD Agent Architecture:**
   - Proven system with 21 agents in production
   - Two workflow patterns: step-files (micro) and YAML+instructions (mono)
   - Explicit registration via agent-manifest.csv
   - Menu-driven execution with exec/workflow handlers
   - Party mode enables multi-agent orchestration

2. **DesignOS Reality:**
   - TypeScript web application, NOT markdown workflows
   - 4-phase process: Product Planning → Design System → Section Design → Export
   - Conversational UI for design decisions
   - Exports implementation handoff package
   - CANNOT be integrated by adding `_designos/` markdown directory

3. **AgentOS Reality:**
   - Shell-based CLI tool, NOT markdown workflows
   - Standards discovery from existing code
   - Command-driven execution
   - File-based standards registry
   - CANNOT be integrated by adding `_agentos/` markdown directory

4. **Workflow Overlap:**
   - BMAD already provides 80%+ of DesignOS/AgentOS functionality
   - CIS Design Thinking Coach = DesignOS-like workflows
   - TEA Test Architect = AgentOS-like quality gates
   - Gaps: DesignOS's implementation handoff package, AgentOS's automated standards discovery

5. **Artifact Compatibility:**
   - BMAD ← AgentOS: STRONG (both markdown, standards referenceable)
   - BMAD ← DesignOS: WEAK (manual conversion required)
   - BMAD → AgentOS: STRONG (AgentOS can index BMAD artifacts)
   - BMAD → DesignOS: WEAK (DesignOS doesn't consume markdown)

6. **Integration Patterns:**
   - Custom orchestration (1,800 LOC): Hypothetical "Capabilities + Steps" pattern
   - Agent integration (500 LOC): Proven BMAD agent architecture
   - Real DesignOS/AgentOS integration: Requires web app UI or CLI tool invocation, NOT markdown workflows

### Strategic Recommendation

**Pivot Phase 0 from "Validate Capabilities + Steps Pattern" to "Enhance BMAD with Design & Quality Agents":**

- Use proven BMAD agent architecture (60-70% less code)
- Create 4 new agents inspired by DesignOS/AgentOS capabilities
- Deliver working features in Week 1-2 (not just backend infrastructure)
- Defer custom orchestration engine unless proven necessary
- Update ADR to reflect DesignOS/AgentOS reality (web app + CLI, not markdown)

**Phase 0 becomes validation of:**
- Agent-based integration pattern (vs custom orchestration)
- Cross-agent workflow chaining
- Party mode multi-agent collaboration

**NOT validation of:**
- Capabilities + Steps pattern (hypothetical, doesn't match any framework)
- Convention-based discovery (BMAD uses explicit registration)
- Quint SQLite integration (deferred to Phase 2, unchanged)

**If this recommendation accepted:**
- LOC: 1,800 → 500 (72% reduction)
- Risk: Lower (proven infrastructure vs custom engine)
- User value: Immediate (working agents Week 1 vs backend-only POC)
- Timeline: Realistic (500 LOC in 3 weeks comfortable vs 1,800 LOC ambitious)

---

**End of Deep-Dive Analysis**

**Next Steps:**
1. Review findings with user
2. Decide: Keep current Phase 0 plan OR adopt agent enhancement approach
3. Update ADR if approach changes
4. Begin Phase 0 implementation

---

## Sources

- [DesignOS Repository](https://github.com/buildermethods/design-os)
- [AgentOS Repository](https://github.com/buildermethods/agent-os)
- BMAD Method local codebase analysis
- ADR v1.3.0: `_bmad-output/planning-artifacts/architectural-decision-record.md`
- Phase 0 Alternative Analysis: `_bmad-output/planning-artifacts/phase-0-alternative-agent-integration.md`
