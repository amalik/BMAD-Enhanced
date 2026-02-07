---
title: "Phase 0 Workflow Map: DesignOS → BMAD Method → AgentOS"
version: 1.0.0
date: 2026-02-07
status: Implementation Guide
audience: Phase 0 Development Team
---

# Phase 0 Complete Workflow Map

**Purpose:** Crystal-clear mapping of how DesignOS → BMAD Method → AgentOS orchestration works in Phase 0 POC, showing every transition point and orchestration mechanism.

**Scope:** Pure markdown orchestration only (no Quint SQLite, deferred to Phase 2)

---

## Executive Summary

### The Three Frameworks in Phase 0

| Framework | Role | Artifacts Created | State Storage |
|-----------|------|-------------------|---------------|
| **DesignOS** | UX/design capability provider | Design specs, wireframes, empathy maps | Markdown files in `_designos/output/` |
| **BMAD Method** | Orchestration engine | Workflows, stories, epics, architecture docs | Markdown files in `_bmad-output/` |
| **AgentOS** | Quality capability provider | Quality gates, standards checks, test plans | Markdown files in `_agentos/output/` |

### Key Orchestration Pattern

```
User Request
    ↓
BMAD Workflow (orchestrator)
    ↓
├─→ Load DesignOS capability → Execute DesignOS steps → Return design artifacts
│       ↓
├─→ Load BMAD BMM capability → Execute dev steps → Return implementation artifacts
│       ↓
└─→ Load AgentOS capability → Execute quality checks → Return quality gate decision
```

**Critical Insight:** BMAD Method workflows are the ONLY orchestrators. DesignOS and AgentOS are passive capability providers invoked by BMAD workflows.

---

## Phase 0 Directory Structure

```
BMAD-Enhanced/
├── _bmad/                          # BMAD Method (orchestrator)
│   ├── core/
│   │   ├── orchestration/
│   │   │   ├── capability-discovery.ts     # Pattern B2: Scan _designos/, _agentos/
│   │   │   ├── step-loader.ts              # Pattern D2: Load step files
│   │   │   └── execution-tracer.ts         # Pattern D10: Log all operations
│   │   └── workflows/
│   │       └── product-development/
│   │           └── steps/
│   │               ├── step-01-design.md       # Invokes DesignOS capability
│   │               ├── step-02-implement.md    # Invokes BMAD BMM capability
│   │               └── step-03-quality.md      # Invokes AgentOS capability
│   ├── bmm/                        # BMAD Method Module (dev workflows)
│   │   ├── workflows/
│   │   │   ├── create-prd/
│   │   │   ├── create-architecture/
│   │   │   └── dev-story/
│   │   └── agents/
│   │       ├── pm.md               # Product Manager
│   │       ├── architect.md        # System Architect
│   │       └── dev.md              # Developer
│   └── _config/
│       ├── agent-manifest.csv      # All 22+ agents registered
│       └── workflow-manifest.csv   # All workflows registered
│
├── _designos/                      # DesignOS Module (design capability provider)
│   ├── capabilities/               # LLM-agnostic capability files
│   │   ├── empathy-map.md          # Design thinking capability
│   │   └── wireframe.md            # Wireframing capability
│   ├── steps/                      # Implementation steps
│   │   ├── empathy-map-step-01.md  # User research guide
│   │   └── wireframe-step-01.md    # Wireframe creation guide
│   └── output/                     # Design artifacts storage
│       ├── designs/
│       └── empathy-maps/
│
├── _agentos/                       # AgentOS Module (quality capability provider)
│   ├── capabilities/               # LLM-agnostic capability files
│   │   ├── quality-gate.md         # Quality gate decision capability
│   │   └── standards-check.md      # Standards validation capability
│   ├── steps/                      # Implementation steps
│   │   ├── quality-gate-step-01.md # Validation algorithm
│   │   └── standards-check-step-01.md # Standards enforcement
│   └── output/                     # Quality artifacts storage
│       ├── quality-gates/
│       └── test-plans/
│
└── _bmad-output/                   # All generated artifacts
    ├── planning-artifacts/
    ├── design-artifacts/           # DesignOS outputs
    ├── implementation-artifacts/   # BMAD BMM outputs
    └── quality-artifacts/          # AgentOS outputs
```

---

## Complete Workflow Example: "Create Product Feature"

### Scenario
User wants to create a new product feature: "Add user authentication"

### Step-by-Step Flow with ALL Transitions

---

### **PHASE 1: User Initiates Workflow**

**User Action:**
```bash
# User invokes BMAD workflow
/bmad-create-feature "Add user authentication"
```

**BMAD Orchestrator Response:**
1. Loads workflow definition: `_bmad/core/workflows/product-development/workflow.md`
2. Reads frontmatter to understand workflow steps:
```yaml
---
steps:
  - design          # DesignOS capability
  - implement       # BMAD BMM capability
  - quality-check   # AgentOS capability
---
```

**Transition Mechanism:** YAML frontmatter parsing

---

### **PHASE 2: DesignOS Capability Invocation**

**BMAD Orchestrator Action:**
```
Step 1: Design Phase
→ Capability Discovery Engine scans: _designos/capabilities/
→ Finds: empathy-map.md, wireframe.md
→ User selects: wireframe.md
→ Load capability file
```

**File Loaded:** `_designos/capabilities/wireframe.md`

**Capability File Structure:**
```yaml
---
name: wireframe
description: Create wireframes for user interfaces
framework: designos
steps:
  - _designos/steps/wireframe-step-01.md
  - _designos/steps/wireframe-step-02.md
output_artifact: designos:wireframe
---

# Wireframe Capability

You are creating a wireframe for the user's feature request.

## Input Requirements
- Feature description: {{feature_description}}
- User stories: {{user_stories}}

## Output Requirements
- Wireframe markdown file with Excalidraw/ASCII diagrams
- Design decisions documented
- Component list identified

## Method
Load the steps below in sequence:
1. {{load _designos/steps/wireframe-step-01.md}}
2. {{load _designos/steps/wireframe-step-02.md}}
```

**BMAD Step Loader Action:**
```
→ Parse capability frontmatter
→ Identify steps array
→ Load step 1: _designos/steps/wireframe-step-01.md
```

**Step File:** `_designos/steps/wireframe-step-01.md`
```markdown
---
step: 1
capability: wireframe
phase: component-identification
---

# Step 1: Identify UI Components

## Guidance
Analyze the feature description and identify all UI components needed:
- Input fields
- Buttons
- Navigation elements
- Data displays

## Output
Create a component inventory table:

| Component | Type | Purpose | State |
|-----------|------|---------|-------|
| ... | ... | ... | ... |

## Next Step
When complete, proceed to step 2: Layout design
```

**AI Execution:**
- AI reads step guidance
- AI generates component inventory
- AI outputs markdown table

**BMAD Step Loader Action:**
```
→ Step 1 complete
→ Load step 2: _designos/steps/wireframe-step-02.md
```

**Step File:** `_designos/steps/wireframe-step-02.md`
```markdown
---
step: 2
capability: wireframe
phase: wireframe-creation
---

# Step 2: Create Wireframe

## Guidance
Using the component inventory from Step 1, create an ASCII wireframe or Excalidraw diagram.

## Output Format
```
┌─────────────────────────────────────┐
│  Login Screen                       │
├─────────────────────────────────────┤
│  Username: [____________]           │
│  Password: [____________]           │
│  [ Login Button ]                   │
└─────────────────────────────────────┘
```

Save to: `_designos/output/designs/{{feature_name}}-wireframe.md`
```

**AI Execution:**
- AI reads step guidance
- AI creates wireframe
- AI writes file to `_designos/output/designs/auth-wireframe.md`

**DesignOS Capability Complete**

**Output Artifact:**
```
_designos/output/designs/auth-wireframe.md
```

**Transition Mechanism:** File write complete → Control returns to BMAD orchestrator

---

### **PHASE 3: BMAD BMM Capability Invocation**

**BMAD Orchestrator Action:**
```
Step 2: Implementation Phase
→ Capability Discovery Engine scans: _bmad/bmm/workflows/
→ Finds: create-prd/, create-architecture/, dev-story/
→ User selects: dev-story/
→ Load capability
```

**File Loaded:** `_bmad/bmm/workflows/dev-story/workflow.md`

**Capability File Structure:**
```yaml
---
name: dev-story
description: Implement a feature based on design spec
framework: bmad-bmm
steps:
  - _bmad/bmm/workflows/dev-story/steps/step-01-requirements.md
  - _bmad/bmm/workflows/dev-story/steps/step-02-implementation.md
  - _bmad/bmm/workflows/dev-story/steps/step-03-testing.md
input_artifacts:
  - designos:wireframe  # Links to DesignOS output
output_artifact: bmm:story
---

# Dev Story Capability

You are implementing a feature based on approved design.

## Input Requirements
- Wireframe file: {{wireframe_path}}
- Architecture decisions: {{architecture_path}}

## Output Requirements
- Implementation code
- Unit tests
- Story completion markdown

## Method
Load the steps below in sequence:
1. {{load _bmad/bmm/workflows/dev-story/steps/step-01-requirements.md}}
2. {{load _bmad/bmm/workflows/dev-story/steps/step-02-implementation.md}}
3. {{load _bmad/bmm/workflows/dev-story/steps/step-03-testing.md}}
```

**BMAD Step Loader Action:**
```
→ Parse capability frontmatter
→ Read input_artifacts: designos:wireframe
→ Resolve artifact path: _designos/output/designs/auth-wireframe.md
→ Load wireframe content into context
→ Load step 1: _bmad/bmm/workflows/dev-story/steps/step-01-requirements.md
```

**Step File:** `_bmad/bmm/workflows/dev-story/steps/step-01-requirements.md`
```markdown
---
step: 1
capability: dev-story
phase: requirements-extraction
---

# Step 1: Extract Implementation Requirements

## Guidance
Read the wireframe file and extract:
- API endpoints needed
- Data models
- UI components to implement
- Authentication flows

## Input
{{wireframe_content}}

## Output
Create acceptance criteria:

### Acceptance Criteria
- [ ] User can enter username/password
- [ ] System validates credentials
- [ ] User receives success/failure feedback
- [ ] Session token generated on success

## Next Step
When complete, proceed to step 2: Implementation
```

**AI Execution:**
- AI reads wireframe content (loaded from `_designos/output/designs/auth-wireframe.md`)
- AI generates acceptance criteria
- AI outputs markdown checklist

**BMAD Step Loader Action:**
```
→ Step 1 complete
→ Load step 2: _bmad/bmm/workflows/dev-story/steps/step-02-implementation.md
```

**Step File:** `_bmad/bmm/workflows/dev-story/steps/step-02-implementation.md`
```markdown
---
step: 2
capability: dev-story
phase: code-implementation
---

# Step 2: Implement Feature Code

## Guidance
Using the acceptance criteria from Step 1, implement the feature.

## Implementation Checklist
- [ ] Create authentication API endpoint
- [ ] Implement password hashing
- [ ] Create login UI component
- [ ] Add session management

## Output
Write implementation code to appropriate files:
- `src/api/auth.ts`
- `src/components/LoginForm.tsx`
- `src/utils/session.ts`

Document implementation decisions in:
`_bmad-output/implementation-artifacts/auth-implementation.md`
```

**AI Execution:**
- AI implements code files
- AI writes implementation documentation

**BMAD Step Loader Action:**
```
→ Step 2 complete
→ Load step 3: _bmad/bmm/workflows/dev-story/steps/step-03-testing.md
```

**Step File:** `_bmad/bmm/workflows/dev-story/steps/step-03-testing.md`
```markdown
---
step: 3
capability: dev-story
phase: testing
---

# Step 3: Write Tests

## Guidance
Create unit tests for all implemented code.

## Test Coverage Requirements
- [ ] API endpoint tests (happy path + error cases)
- [ ] UI component tests (rendering + user interactions)
- [ ] Session management tests

## Output
Write test files:
- `src/api/__tests__/auth.test.ts`
- `src/components/__tests__/LoginForm.test.tsx`
```

**AI Execution:**
- AI writes test files
- AI runs tests to verify they pass

**BMAD BMM Capability Complete**

**Output Artifacts:**
```
src/api/auth.ts
src/components/LoginForm.tsx
src/utils/session.ts
src/api/__tests__/auth.test.ts
src/components/__tests__/LoginForm.test.tsx
_bmad-output/implementation-artifacts/auth-implementation.md
```

**Transition Mechanism:** All implementation files written → Control returns to BMAD orchestrator

---

### **PHASE 4: AgentOS Capability Invocation**

**BMAD Orchestrator Action:**
```
Step 3: Quality Check Phase
→ Capability Discovery Engine scans: _agentos/capabilities/
→ Finds: quality-gate.md, standards-check.md
→ Auto-select: quality-gate.md (required for all implementations)
→ Load capability
```

**File Loaded:** `_agentos/capabilities/quality-gate.md`

**Capability File Structure:**
```yaml
---
name: quality-gate
description: Validate implementation against quality standards
framework: agentos
steps:
  - _agentos/steps/quality-gate-step-01.md
  - _agentos/steps/quality-gate-step-02.md
input_artifacts:
  - bmm:story         # Implementation artifacts
  - designos:wireframe # Design artifacts
output_artifact: agentos:quality-gate-decision
---

# Quality Gate Capability

You are validating implementation quality before release.

## Input Requirements
- Implementation files: {{implementation_paths}}
- Test results: {{test_results}}
- Design spec: {{design_spec_path}}

## Output Requirements
- Quality gate decision: PASS | CONCERNS | FAIL
- Violation report (if CONCERNS/FAIL)
- Recommendations

## Method
Load the steps below in sequence:
1. {{load _agentos/steps/quality-gate-step-01.md}}
2. {{load _agentos/steps/quality-gate-step-02.md}}
```

**BMAD Step Loader Action:**
```
→ Parse capability frontmatter
→ Read input_artifacts: bmm:story, designos:wireframe
→ Resolve artifact paths:
  - _bmad-output/implementation-artifacts/auth-implementation.md
  - _designos/output/designs/auth-wireframe.md
→ Load artifact contents into context
→ Load step 1: _agentos/steps/quality-gate-step-01.md
```

**Step File:** `_agentos/steps/quality-gate-step-01.md`
```markdown
---
step: 1
capability: quality-gate
phase: validation
---

# Step 1: Validate Against Standards

## Guidance
Check implementation against quality standards:

### Code Quality Standards
- [ ] All functions have unit tests
- [ ] Test coverage ≥ 80%
- [ ] No hardcoded secrets
- [ ] Error handling implemented
- [ ] Logging added for debugging

### Design Compliance
- [ ] Implementation matches wireframe
- [ ] All components from wireframe implemented
- [ ] UX flows match design spec

## Input
{{implementation_content}}
{{design_content}}
{{test_results}}

## Output
Create violation report:

| Standard | Status | Severity | Details |
|----------|--------|----------|---------|
| ... | ... | ... | ... |

## Next Step
When complete, proceed to step 2: Decision
```

**AI Execution:**
- AI reads implementation files
- AI reads design spec
- AI reads test results
- AI validates against standards checklist
- AI generates violation report

**Example Violation Report:**
```markdown
| Standard | Status | Severity | Details |
|----------|--------|----------|---------|
| Unit test coverage | ✅ PASS | N/A | Coverage: 85% (target: 80%) |
| No hardcoded secrets | ❌ FAIL | BLOCKER | API key hardcoded in auth.ts:42 |
| Error handling | ⚠️ CONCERNS | MAJOR | Missing try/catch in session.ts:15 |
| Design compliance | ✅ PASS | N/A | All wireframe components implemented |
```

**BMAD Step Loader Action:**
```
→ Step 1 complete
→ Load step 2: _agentos/steps/quality-gate-step-02.md
```

**Step File:** `_agentos/steps/quality-gate-step-02.md`
```markdown
---
step: 2
capability: quality-gate
phase: decision
---

# Step 2: Quality Gate Decision

## Guidance
Based on the violation report from Step 1, make a quality gate decision:

### Decision Rules
- **PASS**: No BLOCKER violations, ≤2 MAJOR violations
- **CONCERNS**: 0 BLOCKER violations, 3-5 MAJOR violations
- **FAIL**: ≥1 BLOCKER violation OR ≥6 MAJOR violations

### Decision Output Format
```yaml
decision: PASS | CONCERNS | FAIL
violations:
  blockers: <count>
  major: <count>
  minor: <count>
recommendations:
  - <action 1>
  - <action 2>
```

Save to: `_agentos/output/quality-gates/{{feature_name}}-gate.md`
```

**AI Execution:**
- AI reads violation report
- AI applies decision rules
- AI generates decision with recommendations

**Example Decision:**
```yaml
decision: FAIL
violations:
  blockers: 1
  major: 1
  minor: 0
recommendations:
  - Remove hardcoded API key from auth.ts:42 and use environment variable
  - Add try/catch error handling to session.ts:15
  - Re-run quality gate after fixes
```

**AI writes file:** `_agentos/output/quality-gates/auth-feature-gate.md`

**AgentOS Capability Complete**

**Output Artifact:**
```
_agentos/output/quality-gates/auth-feature-gate.md
```

**Transition Mechanism:** Quality gate decision written → Control returns to BMAD orchestrator

---

### **PHASE 5: BMAD Orchestrator Completes Workflow**

**BMAD Orchestrator Action:**
```
→ All workflow steps complete
→ Execution Tracer logs final state
→ Generate workflow summary
```

**Execution Trace Example:**
```
[2026-02-07 14:32:01] WORKFLOW_START: product-development
[2026-02-07 14:32:05] CAPABILITY_LOAD: designos/wireframe
[2026-02-07 14:32:08] STEP_EXECUTE: designos/wireframe-step-01
[2026-02-07 14:32:12] STEP_EXECUTE: designos/wireframe-step-02
[2026-02-07 14:32:15] ARTIFACT_CREATE: _designos/output/designs/auth-wireframe.md
[2026-02-07 14:32:16] CAPABILITY_COMPLETE: designos/wireframe
[2026-02-07 14:32:20] CAPABILITY_LOAD: bmad-bmm/dev-story
[2026-02-07 14:32:22] ARTIFACT_LOAD: _designos/output/designs/auth-wireframe.md
[2026-02-07 14:32:25] STEP_EXECUTE: bmad-bmm/dev-story-step-01
[2026-02-07 14:32:30] STEP_EXECUTE: bmad-bmm/dev-story-step-02
[2026-02-07 14:32:45] STEP_EXECUTE: bmad-bmm/dev-story-step-03
[2026-02-07 14:33:00] ARTIFACT_CREATE: src/api/auth.ts
[2026-02-07 14:33:00] ARTIFACT_CREATE: src/components/LoginForm.tsx
[2026-02-07 14:33:01] ARTIFACT_CREATE: _bmad-output/implementation-artifacts/auth-implementation.md
[2026-02-07 14:33:02] CAPABILITY_COMPLETE: bmad-bmm/dev-story
[2026-02-07 14:33:05] CAPABILITY_LOAD: agentos/quality-gate
[2026-02-07 14:33:07] ARTIFACT_LOAD: _bmad-output/implementation-artifacts/auth-implementation.md
[2026-02-07 14:33:07] ARTIFACT_LOAD: _designos/output/designs/auth-wireframe.md
[2026-02-07 14:33:10] STEP_EXECUTE: agentos/quality-gate-step-01
[2026-02-07 14:33:20] STEP_EXECUTE: agentos/quality-gate-step-02
[2026-02-07 14:33:25] ARTIFACT_CREATE: _agentos/output/quality-gates/auth-feature-gate.md
[2026-02-07 14:33:26] CAPABILITY_COMPLETE: agentos/quality-gate
[2026-02-07 14:33:30] WORKFLOW_COMPLETE: product-development (duration: 89s)
```

**Workflow Summary Presented to User:**
```markdown
# Product Development Workflow Complete

## Feature: Add User Authentication

### Design Phase (DesignOS) ✅
- Wireframe created: [auth-wireframe.md](_designos/output/designs/auth-wireframe.md)
- Components identified: 3 (Username field, Password field, Login button)

### Implementation Phase (BMAD BMM) ✅
- Files created: 5
  - src/api/auth.ts
  - src/components/LoginForm.tsx
  - src/utils/session.ts
  - src/api/__tests__/auth.test.ts
  - src/components/__tests__/LoginForm.test.tsx
- Test coverage: 85%

### Quality Gate (AgentOS) ❌ FAIL
- Decision: FAIL (1 blocker violation)
- Violations:
  - BLOCKER: Hardcoded API key in auth.ts:42
  - MAJOR: Missing error handling in session.ts:15
- Recommendations:
  1. Remove hardcoded API key and use environment variable
  2. Add try/catch error handling to session.ts:15
  3. Re-run quality gate after fixes

**Next Actions:**
- Fix blocking violations
- Re-run: `/bmad-quality-gate auth-feature`
```

---

## Transition Mechanisms Summary

| Transition | Mechanism | Implementation |
|------------|-----------|----------------|
| **User → BMAD** | Slash command invocation | `/bmad-create-feature` parsed by BMAD orchestrator |
| **BMAD → DesignOS** | Capability discovery + loading | Scan `_designos/capabilities/`, load capability file |
| **Capability → Steps** | YAML frontmatter parsing | Read `steps:` array, load each step file sequentially |
| **Step → Step** | Sequential execution | Step N completes → Load step N+1 |
| **Steps → Artifact** | File write | AI writes markdown/code to `_designos/output/` |
| **DesignOS → BMAD** | Capability completion | Last step finishes → Control returns to orchestrator |
| **BMAD → BMAD BMM** | Capability discovery + loading | Scan `_bmad/bmm/workflows/`, load workflow file |
| **BMM → Design Artifact** | Artifact resolution | Read `input_artifacts:` from frontmatter, resolve path, load content |
| **BMM → Implementation** | File write | AI writes code/tests to `src/`, docs to `_bmad-output/` |
| **BMAD BMM → BMAD** | Capability completion | Last step finishes → Control returns to orchestrator |
| **BMAD → AgentOS** | Capability discovery + loading | Scan `_agentos/capabilities/`, load capability file |
| **AgentOS → Artifacts** | Artifact resolution | Read `input_artifacts:`, resolve paths, load contents |
| **AgentOS → Decision** | Validation + decision rules | AI validates, applies rules, writes decision file |
| **AgentOS → BMAD** | Capability completion | Last step finishes → Control returns to orchestrator |
| **BMAD → User** | Workflow summary generation | Aggregate all artifacts, execution trace, present summary |

---

## Key Orchestration Principles

### 1. **Single Orchestrator**
- BMAD Method workflows are the ONLY orchestrators
- DesignOS and AgentOS are passive capability providers
- No framework calls another framework directly

### 2. **Convention-Based Discovery (Pattern B2)**
- No pre-registration required
- Frameworks discovered by scanning directories:
  - `_designos/capabilities/` → DesignOS capabilities
  - `_agentos/capabilities/` → AgentOS capabilities
  - `_bmad/bmm/workflows/` → BMAD BMM workflows

### 3. **Hierarchical Loading (Pattern H1)**
- Capabilities load steps
- Steps never load other capabilities
- Strict parent-child hierarchy maintained

### 4. **Artifact-Based Communication**
- Frameworks communicate via markdown files
- No direct API calls between frameworks
- File paths resolve via frontmatter `input_artifacts:`

### 5. **Execution Tracing (Pattern D10)**
- Every operation logged with timestamp
- Complete audit trail of workflow execution
- Enables debugging and performance analysis

### 6. **State Management**
- No database in Phase 0
- State = markdown files on disk
- Git provides version control and rollback

---

## Phase 0 Implementation Checklist

### Capability Discovery Engine (200 LOC)
- [ ] Directory scanner for `_designos/capabilities/*.md`
- [ ] Directory scanner for `_agentos/capabilities/*.md`
- [ ] YAML frontmatter parser
- [ ] Capability registry builder (in-memory)

### Step Loader (300 LOC)
- [ ] Step file loader (markdown parser)
- [ ] Frontmatter validator
- [ ] Sequential step executor
- [ ] Variable interpolation (`{{variable_name}}`)

### Orchestration Glue (300 LOC)
- [ ] Workflow definition parser
- [ ] Capability invocation logic
- [ ] Artifact resolution (path lookup)
- [ ] Control flow manager (sequence, branching)

### Execution Tracer (250 LOC)
- [ ] Event logger (timestamps + operation type)
- [ ] Trace file writer (`_bmad-output/traces/`)
- [ ] Summary generator

### DesignOS Capabilities (200 LOC)
- [ ] `_designos/capabilities/empathy-map.md`
- [ ] `_designos/capabilities/wireframe.md`
- [ ] `_designos/steps/empathy-map-step-01.md`
- [ ] `_designos/steps/wireframe-step-01.md`

### AgentOS Capabilities (200 LOC)
- [ ] `_agentos/capabilities/quality-gate.md`
- [ ] `_agentos/capabilities/standards-check.md`
- [ ] `_agentos/steps/quality-gate-step-01.md`
- [ ] `_agentos/steps/standards-check-step-01.md`

### Integration Tests (350 LOC)
- [ ] End-to-end workflow test (DesignOS → BMAD → AgentOS)
- [ ] Capability discovery tests
- [ ] Step loading tests
- [ ] Artifact resolution tests
- [ ] Execution trace validation tests

**Total: 1,800 LOC**

---

## Success Criteria for Phase 0

### Must Achieve:
1. ✅ Working capability discovery engine
2. ✅ DesignOS empathy-map capability (stub) executes successfully
3. ✅ AgentOS quality-gate capability (stub) executes successfully
4. ✅ Cross-framework orchestration demo completes end-to-end
5. ✅ Execution trace captures all operations
6. ✅ All integration tests pass

### Decision Gate (Week 3):
- **PASS**: Proceed to Phase 1 (BaseArtifact contract implementation)
- **FAIL**: Pivot orchestration pattern (investigate alternatives)

---

## Appendix: File Format Examples

### Capability File Format
```yaml
---
name: capability-name
description: Human-readable description
framework: designos | agentos | bmad-bmm
steps:
  - _framework/steps/step-01.md
  - _framework/steps/step-02.md
input_artifacts:
  - other-framework:artifact-type  # Optional: dependencies
output_artifact: framework:artifact-type
---

# Capability Title

AI persona instructions here...

## Method
1. {{load _framework/steps/step-01.md}}
2. {{load _framework/steps/step-02.md}}
```

### Step File Format
```yaml
---
step: 1
capability: capability-name
phase: phase-name
---

# Step Title

## Guidance
Instructions for AI...

## Input
{{variable_name}}

## Output
Expected output format...

## Next Step
When complete, proceed to step 2: Next step name
```

### Workflow File Format
```yaml
---
name: workflow-name
description: Human-readable description
steps:
  - design          # Capability name
  - implement       # Capability name
  - quality-check   # Capability name
---

# Workflow Title

Workflow orchestration logic...

## Step 1: Design
{{invoke designos/capability-name}}

## Step 2: Implement
{{invoke bmad-bmm/capability-name}}

## Step 3: Quality Check
{{invoke agentos/capability-name}}
```

---

## Questions & Answers

**Q: Can DesignOS invoke AgentOS directly?**
A: No. Only BMAD workflows can invoke capabilities. DesignOS and AgentOS are passive providers.

**Q: How do frameworks share data?**
A: Via markdown files. Capability frontmatter declares `input_artifacts:` which the orchestrator resolves to file paths and loads contents.

**Q: What if a step fails?**
A: Execution stops, error logged to trace, control returns to orchestrator with failure status.

**Q: Can steps be skipped?**
A: Not in Phase 0. All steps in capability's `steps:` array execute sequentially.

**Q: How are capabilities versioned?**
A: Not in Phase 0 (deferred to Phase 3). Git commit history provides versioning.

**Q: Can workflows branch (if/else logic)?**
A: Not in Phase 0. Sequential execution only. Branching deferred to Phase 3.

---

**Document Version:** 1.0.0
**Last Updated:** 2026-02-07
**Next Review:** Week 3 (Phase 0 Decision Gate)
