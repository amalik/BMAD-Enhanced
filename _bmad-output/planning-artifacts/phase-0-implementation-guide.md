---
title: "Phase 0 Implementation Guide: Agent Enhancement Approach"
date: 2026-02-07
version: 1.2.0
status: IMPLEMENTATION READY
distribution:
  module_name: bme
  installation: npm packages (individual + bulk)
  slash_command_format: /bmad-agent-bme-{agent-name}
  flexibility: install individual agents OR all at once
related_docs:
  - architectural-decision-record.md (v1.4.0)
  - framework-deep-dive-analysis.md
  - phase-0-alternative-agent-integration.md
  - distribution-strategy.md (v2.0.0)
---

# Phase 0 Implementation Guide: Agent Enhancement Approach

**Goal:** Enhance BMAD Method with 4 new design and quality agents inspired by DesignOS and AgentOS capabilities.

**Timeline:** 3 weeks (Week 1-3)
**LOC Estimate:** ~500 LOC
**Approach:** Leverage proven BMAD agent architecture

---

## Table of Contents

1. [Overview](#overview)
2. [Week 1: DesignOS-Inspired Agents](#week-1-designos-inspired-agents)
3. [Week 2: AgentOS-Inspired Agents](#week-2-agentos-inspired-agents)
4. [Week 3: Integration & Testing](#week-3-integration--testing)
5. [Implementation Checklist](#implementation-checklist)
6. [Success Criteria](#success-criteria)
7. [Decision Gate Questions](#decision-gate-questions)

---

## Overview

### Why Agent Enhancement Instead of Custom Orchestration?

**Discovery:** Deep-dive analysis revealed:
- DesignOS is a TypeScript web application (not markdown workflows)
- AgentOS is a Shell CLI tool (not markdown workflows)
- BMAD already provides 80%+ of their functionality via existing agents

**Decision:** Leverage proven BMAD agent system instead of building custom orchestration engine.

**Benefits:**
- 72% less code (500 LOC vs 1,800 LOC)
- Proven infrastructure (21 agents in production)
- Working features Week 1-2 (not just backend)
- Lower risk, realistic timeline

### What We're Building

**4 New BMAD Agents:**

1. **Empathy Mapper (Emma)** - DesignOS-inspired
   - User empathy mapping workflows
   - Creates empathy maps, POV statements, user insights

2. **Wireframe Designer (Wade)** - DesignOS-inspired
   - Rapid wireframe generation
   - Creates Excalidraw wireframes, component inventories

3. **Quality Gatekeeper (Quinn)** - AgentOS-inspired
   - Quality gate decision workflows
   - Pass/Fail/Concerns decisions based on criteria

4. **Standards Auditor (Stan)** - AgentOS-inspired
   - Code standards compliance checking
   - Audit reports, compliance scores, recommendations

**Integration:**
- Module name: `bme` (BMAD Enhanced)
- Distribution: npm package for seamless installation
- Register in `_bmad/_config/agent-manifest.csv`
- Invoke via slash commands: `/bmad-agent-bme-empathy-mapper`
- Use existing BMAD workflow patterns (step-files OR YAML+instructions)
- Party mode integration for multi-agent collaboration

---

## Week 1: DesignOS-Inspired Agents

### Day 1-2: Empathy Mapper Agent (Emma)

**File:** `_bmad/bme/_designos/agents/empathy-mapper.md`

**Agent Persona:**
```yaml
name: empathy-mapper
displayName: Emma
title: Empathy Mapping Specialist
icon: 🎨
role: User Empathy Expert + Design Thinking Specialist
identity: Design thinking expert specializing in empathy maps and user research. Helps teams understand user needs, emotions, and pain points through structured empathy mapping.
communicationStyle: Empathetic, curious, asks probing questions. Focuses on emotional understanding and user perspective.
principles: Design is about THEM not us. Every empathy map must be grounded in real user insights. Challenge assumptions - validate through research. Emotions drive behavior - understand the WHY.
module: bme
```

**Menu Structure:**
```xml
<menu>
  <item cmd="MH">[MH] Redisplay Menu</item>
  <item cmd="CH">[CH] Chat with Emma</item>
  <item cmd="EM" exec="{project-root}/_bmad/bme/_designos/workflows/empathy-map/workflow.md">[EM] Create Empathy Map</item>
  <item cmd="VM" exec="{project-root}/_bmad/bme/_designos/workflows/empathy-map/validate.md">[VM] Validate Existing Empathy Map</item>
  <item cmd="PM" exec="{project-root}/_bmad/core/workflows/party-mode/workflow.md">[PM] Start Party Mode</item>
  <item cmd="DA">[DA] Dismiss Agent</item>
</menu>
```

**Workflow: Create Empathy Map**

**Architecture Choice:** Step-file (micro-file pattern, like Product Brief)

**Directory Structure:**
```
_bmad/bme/_designos/workflows/empathy-map/
├── workflow.md                  # Main orchestrator
├── empathy-map.template.md     # Output template
└── steps/
    ├── step-01-define-user.md       # Define target user
    ├── step-02-says-thinks.md       # What user says/thinks
    ├── step-03-does-feels.md        # What user does/feels
    ├── step-04-pain-points.md       # Pain points
    ├── step-05-gains.md             # Desired gains
    └── step-06-complete.md          # Finalize empathy map
```

**workflow.md Template:**
```markdown
---
name: empathy-map
description: Create user empathy maps for design thinking
---

# Empathy Map Workflow

**Goal:** Create user empathy maps to understand user needs, emotions, and pain points.

**Your Role:** Empathetic facilitator helping users deeply understand their target audience.

## WORKFLOW ARCHITECTURE

Step-file architecture:
- Just-in-time loading
- Sequential enforcement
- State tracking in frontmatter

## INITIALIZATION

Load config from {project-root}/_bmad/bme/_designos/config.yaml
Load step: {project-root}/_bmad/bme/_designos/workflows/empathy-map/steps/step-01-define-user.md
```

**step-01-define-user.md Template:**
```markdown
---
step: 1
workflow: empathy-map
---

# Step 1: Define Target User

## Context

You're creating an empathy map to deeply understand a specific user persona.

## Your Task

Ask the user:
- Who is the target user/persona for this empathy map?
- What role do they have? (job title, responsibilities)
- What context/scenario are we focusing on?
- What problem are they trying to solve?

Create a clear user definition statement:
"[User name/type] is a [role] who is trying to [achieve goal] in the context of [scenario]."

## Output

Write to: {output_folder}/empathy-map-{date}.md

```yaml
---
stepsCompleted: [1]
workflowName: empathy-map
targetUser: [User definition]
date: {date}
---

# Empathy Map: [User Name/Type]

## Target User
[User definition statement]
```

## Next Step

When user confirms target user definition, load:
{project-root}/_bmad/bme/_designos/workflows/empathy-map/steps/step-02-says-thinks.md
```

**Implementation Tasks (Day 1-2):**
- [ ] Create `_bmad/bme/_designos/agents/empathy-mapper.md` (100 LOC)
- [ ] Create `_bmad/bme/_designos/workflows/empathy-map/` directory
- [ ] Create `workflow.md` orchestrator (25 LOC)
- [ ] Create 6 step files (15 LOC each = 90 LOC)
- [ ] Create `empathy-map.template.md` (20 LOC)
- [ ] Register agent in `_bmad/_config/agent-manifest.csv` (1 line)
- [ ] Test workflow end-to-end

**Total LOC:** ~235 LOC (buffer: 100 LOC)

### Day 3-4: Wireframe Designer Agent (Wade)

**File:** `_bmad/bme/_designos/agents/wireframe-designer.md`

**Agent Persona:**
```yaml
name: wireframe-designer
displayName: Wade
title: Wireframe Specialist
icon: 📐
role: UI/UX Wireframe Expert
identity: Expert in rapid wireframe prototyping using Excalidraw. Creates low-fidelity wireframes that focus on layout, hierarchy, and user flow without getting distracted by visual design.
communicationStyle: Visual thinker, asks about layout and flow. Uses spatial metaphors. Emphasizes simplicity and clarity.
principles: Simple first, iterate later. Wireframes communicate structure, not style. Focus on user flow before pixel perfection. Low-fidelity prevents premature attachment.
module: bme
```

**Menu Structure:**
```xml
<menu>
  <item cmd="MH">[MH] Redisplay Menu</item>
  <item cmd="CH">[CH] Chat with Wade</item>
  <item cmd="CW" workflow="{project-root}/_bmad/bme/_designos/workflows/wireframe/workflow.yaml">[CW] Create Wireframe</item>
  <item cmd="RW" exec="{project-root}/_bmad/bme/_designos/workflows/wireframe/review.md">[RW] Review Existing Wireframe</item>
  <item cmd="PM" exec="{project-root}/_bmad/core/workflows/party-mode/workflow.md">[PM] Start Party Mode</item>
  <item cmd="DA">[DA] Dismiss Agent</item>
</menu>
```

**Workflow: Create Wireframe**

**Architecture Choice:** YAML + instructions (monolithic pattern, like Design Thinking)

**Directory Structure:**
```
_bmad/bme/_designos/workflows/wireframe/
├── workflow.yaml           # Configuration
├── instructions.md         # Complete workflow logic
├── template.md            # Output template
└── component-library.csv  # Common UI components reference
```

**workflow.yaml Template:**
```yaml
name: wireframe
description: Create wireframes for user interfaces using Excalidraw
author: BMad-Enhanced

config_source: "{project-root}/_bmad/bme/_designos/config.yaml"
output_folder: "{config_source}:output_folder"
user_name: "{config_source}:user_name"
communication_language: "{config_source}:communication_language"
date: system-generated

installed_path: "{project-root}/_bmad/bme/_designos/workflows/wireframe"
template: "{installed_path}/template.md"
instructions: "{installed_path}/instructions.md"
component_library: "{installed_path}/component-library.csv"

default_output_file: "{output_folder}/wireframe-{{date}}.md"
standalone: true
```

**instructions.md Structure:**
```xml
<critical>Load workflow.yaml</critical>
<critical>Load component library from {component_library}</critical>

<wireframing-principles>
  - Low-fidelity over high-fidelity initially
  - Focus on layout and hierarchy
  - Use boxes, labels, and simple shapes
  - Prioritize user flow over visual design
  - Iterate quickly based on feedback
</wireframing-principles>

<workflow>
  <step n="1" goal="Define screen purpose and user flow">
    [Ask about screen purpose, user goals, navigation context]
    <template-output>screen_purpose</template-output>
    <template-output>user_flow</template-output>
  </step>

  <step n="2" goal="Identify UI components needed">
    [Review component library, select applicable components]
    <template-output>component_inventory</template-output>
  </step>

  <step n="3" goal="Define layout structure">
    [Grid layout, sections, hierarchy]
    <template-output>layout_structure</template-output>
  </step>

  <step n="4" goal="Create Excalidraw wireframe">
    [Generate Excalidraw JSON or markdown representation]
    <template-output>wireframe_excalidraw</template-output>
  </step>

  <step n="5" goal="Document design decisions">
    [Rationale for layout choices, interaction patterns]
    <template-output>design_decisions</template-output>
  </step>
</workflow>
```

**Implementation Tasks (Day 3-4):**
- [ ] Create `_bmad/bme/_designos/agents/wireframe-designer.md` (100 LOC)
- [ ] Create `_bmad/bme/_designos/workflows/wireframe/` directory
- [ ] Create `workflow.yaml` (30 LOC)
- [ ] Create `instructions.md` (100 LOC)
- [ ] Create `template.md` (20 LOC)
- [ ] Create `component-library.csv` (50 common components)
- [ ] Register agent in `_bmad/_config/agent-manifest.csv` (1 line)
- [ ] Test workflow end-to-end

**Total LOC:** ~250 LOC (buffer: 100 LOC)

### Day 5: Week 1 Testing & Refinement

**Tasks:**
- [ ] Test Emma (empathy-mapper) workflow end-to-end
- [ ] Test Wade (wireframe-designer) workflow end-to-end
- [ ] Test slash command invocation
- [ ] Verify output artifacts match templates
- [ ] Fix any bugs discovered
- [ ] Document usage examples

**Deliverables:**
- 2 working DesignOS-inspired agents
- Complete workflows with example outputs
- Documentation

---

## Week 2: AgentOS-Inspired Agents

### Day 6-7: Quality Gatekeeper Agent (Quinn)

**File:** `_bmad/bme/_agentos/agents/quality-gatekeeper.md`

**Agent Persona:**
```yaml
name: quality-gatekeeper
displayName: Quinn
title: Quality Gate Specialist
icon: 🚦
role: Quality Assurance Expert + Decision Authority
identity: Risk-based quality assessment specialist. Makes objective quality gate decisions (PASS/FAIL/CONCERNS/WAIVED) based on predefined criteria and evidence. Prevents low-quality code from progressing.
communicationStyle: Data-driven, objective, no-nonsense. Presents facts, calculates risk scores, makes clear decisions. "Quality gates are binary - you meet the bar or you don't."
principles: Quality gates must be objective and measurable. Evidence beats opinions. Risk assessment drives depth of validation. Waiving gates requires explicit justification and approval. Failing fast is better than failing late.
module: bme
```

**Menu Structure:**
```xml
<menu>
  <item cmd="MH">[MH] Redisplay Menu</item>
  <item cmd="CH">[CH] Chat with Quinn</item>
  <item cmd="QG" exec="{project-root}/_bmad/bme/_agentos/workflows/quality-gate/workflow.md">[QG] Run Quality Gate</item>
  <item cmd="DG" exec="{project-root}/_bmad/bme/_agentos/workflows/quality-gate/define-criteria.md">[DG] Define Gate Criteria</item>
  <item cmd="PM" exec="{project-root}/_bmad/core/workflows/party-mode/workflow.md">[PM] Start Party Mode</item>
  <item cmd="DA">[DA] Dismiss Agent</item>
</menu>
```

**Workflow: Run Quality Gate**

**Architecture Choice:** Step-file (micro-file pattern)

**Directory Structure:**
```
_bmad/bme/_agentos/workflows/quality-gate/
├── workflow.md                     # Main orchestrator
├── quality-gate.template.md       # Output template
├── default-criteria.yaml          # Default quality criteria
└── steps/
    ├── step-01-load-criteria.md        # Load quality criteria
    ├── step-02-gather-evidence.md      # Collect evidence
    ├── step-03-assess-criteria.md      # Assess each criterion
    ├── step-04-calculate-score.md      # Calculate quality score
    ├── step-05-make-decision.md        # PASS/FAIL/CONCERNS/WAIVED
    └── step-06-complete.md             # Finalize decision report
```

**default-criteria.yaml:**
```yaml
# Default Quality Gate Criteria
criteria:
  - id: tests-pass
    name: All Tests Pass
    weight: critical
    description: All unit, integration, and E2E tests must pass
    passing_threshold: 100%

  - id: code-coverage
    name: Code Coverage
    weight: high
    description: Code coverage meets minimum threshold
    passing_threshold: 80%

  - id: no-critical-bugs
    name: No Critical Bugs
    weight: critical
    description: Zero critical or high-severity bugs
    passing_threshold: 0 bugs

  - id: code-review
    name: Code Review Complete
    weight: high
    description: All code reviewed and approved by senior engineer
    passing_threshold: 100%

  - id: documentation
    name: Documentation Updated
    weight: medium
    description: README, API docs, and inline comments updated
    passing_threshold: Complete

  - id: security-scan
    name: Security Scan Clean
    weight: critical
    description: No high/critical security vulnerabilities
    passing_threshold: 0 vulnerabilities
```

**Implementation Tasks (Day 6-7):**
- [ ] Create `_bmad/bme/_agentos/agents/quality-gatekeeper.md` (100 LOC)
- [ ] Create `_bmad/bme/_agentos/workflows/quality-gate/` directory
- [ ] Create `workflow.md` orchestrator (25 LOC)
- [ ] Create 6 step files (15 LOC each = 90 LOC)
- [ ] Create `quality-gate.template.md` (30 LOC)
- [ ] Create `default-criteria.yaml` (50 LOC)
- [ ] Register agent in `_bmad/_config/agent-manifest.csv` (1 line)
- [ ] Test workflow end-to-end

**Total LOC:** ~295 LOC (buffer: 100 LOC)

### Day 8-9: Standards Auditor Agent (Stan)

**File:** `_bmad/bme/_agentos/agents/standards-auditor.md`

**Agent Persona:**
```yaml
name: standards-auditor
displayName: Stan
title: Standards Compliance Auditor
icon: 📋
role: Code Standards Expert + Compliance Checker
identity: Meticulous standards enforcement specialist. Audits code against documented standards (naming conventions, architecture patterns, testing practices). Produces compliance reports with specific violations and recommendations.
communicationStyle: Meticulous, detail-oriented, references specific standards. "Line 42 violates standard CS-101 (camelCase required for variables)."
principles: Consistency is maintainability. Standards prevent technical debt. Every violation must cite specific standard. Automate what can be automated. Audit early, audit often.
module: bme
```

**Menu Structure:**
```xml
<menu>
  <item cmd="MH">[MH] Redisplay Menu</item>
  <item cmd="CH">[CH] Chat with Stan</item>
  <item cmd="AS" workflow="{project-root}/_bmad/bme/_agentos/workflows/audit-standards/workflow.yaml">[AS] Audit Standards</item>
  <item cmd="DS" exec="{project-root}/_bmad/bme/_agentos/workflows/audit-standards/discover-standards.md">[DS] Discover Standards from Codebase</item>
  <item cmd="CS" exec="{project-root}/_bmad/bme/_agentos/workflows/audit-standards/create-standard.md">[CS] Create New Standard</item>
  <item cmd="PM" exec="{project-root}/_bmad/core/workflows/party-mode/workflow.md">[PM] Start Party Mode</item>
  <item cmd="DA">[DA] Dismiss Agent</item>
</menu>
```

**Workflow: Audit Standards**

**Architecture Choice:** YAML + instructions (monolithic pattern)

**Directory Structure:**
```
_bmad/bme/_agentos/workflows/audit-standards/
├── workflow.yaml              # Configuration
├── instructions.md            # Complete workflow logic
├── template.md               # Output template
└── standards/
    ├── coding-standards.md       # Coding conventions
    ├── architecture-patterns.md  # Architectural patterns
    ├── testing-standards.md      # Testing practices
    └── documentation-standards.md # Doc requirements
```

**workflow.yaml Template:**
```yaml
name: audit-standards
description: Audit code against documented standards and produce compliance report
author: BMad-Enhanced

config_source: "{project-root}/_bmad/bme/_agentos/config.yaml"
output_folder: "{config_source}:output_folder"
user_name: "{config_source}:user_name"
communication_language: "{config_source}:communication_language"
date: system-generated

installed_path: "{project-root}/_bmad/bme/_agentos/workflows/audit-standards"
template: "{installed_path}/template.md"
instructions: "{installed_path}/instructions.md"
standards_dir: "{installed_path}/standards"

default_output_file: "{output_folder}/standards-audit-{{date}}.md"
standalone: true
```

**instructions.md Structure:**
```xml
<critical>Load workflow.yaml</critical>
<critical>Load all standards from {standards_dir}</critical>

<auditing-principles>
  - Every finding must cite specific standard
  - Violations categorized by severity (critical, high, medium, low)
  - Provide specific line numbers and code examples
  - Recommend specific fixes
  - Calculate compliance score per standard category
</auditing-principles>

<workflow>
  <step n="1" goal="Define audit scope">
    [Ask which files/directories to audit]
    <template-output>audit_scope</template-output>
  </step>

  <step n="2" goal="Load applicable standards">
    [Identify which standards apply to scope]
    <template-output>applicable_standards</template-output>
  </step>

  <step n="3" goal="Perform automated checks">
    [Check naming conventions, file structure, imports]
    <template-output>automated_findings</template-output>
  </step>

  <step n="4" goal="Perform manual review">
    [Architecture patterns, design principles, best practices]
    <template-output>manual_findings</template-output>
  </step>

  <step n="5" goal="Calculate compliance scores">
    [Violations per category, overall compliance percentage]
    <template-output>compliance_scores</template-output>
  </step>

  <step n="6" goal="Generate recommendations">
    [Prioritized action items to fix violations]
    <template-output>recommendations</template-output>
  </step>
</workflow>
```

**Implementation Tasks (Day 8-9):**
- [ ] Create `_bmad/bme/_agentos/agents/standards-auditor.md` (100 LOC)
- [ ] Create `_bmad/bme/_agentos/workflows/audit-standards/` directory
- [ ] Create `workflow.yaml` (30 LOC)
- [ ] Create `instructions.md` (120 LOC)
- [ ] Create `template.md` (30 LOC)
- [ ] Create 4 standards files (25 LOC each = 100 LOC)
- [ ] Register agent in `_bmad/_config/agent-manifest.csv` (1 line)
- [ ] Test workflow end-to-end

**Total LOC:** ~380 LOC (buffer: 120 LOC)

### Day 10: Week 2 Testing & Refinement

**Tasks:**
- [ ] Test Quinn (quality-gatekeeper) workflow end-to-end
- [ ] Test Stan (standards-auditor) workflow end-to-end
- [ ] Test slash command invocation
- [ ] Verify output artifacts match templates
- [ ] Fix any bugs discovered
- [ ] Document usage examples

**Deliverables:**
- 2 working AgentOS-inspired agents
- Complete workflows with example outputs
- Documentation

---

## Week 3: Integration & Testing

### Day 11-12: Cross-Agent Workflow Orchestration

**Goal:** Create workflow that chains agents automatically

**File:** `_bmad/bme/workflows/product-development-flow.md`

**Workflow Structure:**
```markdown
---
name: product-development-flow
description: End-to-end product development workflow orchestrating design and quality agents
---

# Product Development Flow

**Goal:** Orchestrate Emma (empathy) → Wade (wireframe) → Quinn (quality gate) automatically.

## Workflow Steps

### Step 1: User Empathy Phase
Invoke Emma (empathy-mapper) agent:
- Create empathy map for target user
- Output: empathy-map-{date}.md

### Step 2: Wireframe Phase
Invoke Wade (wireframe-designer) agent:
- Pass empathy map as context
- Create wireframe based on user insights
- Output: wireframe-{date}.md

### Step 3: Quality Gate Phase
Invoke Quinn (quality-gatekeeper) agent:
- Define quality criteria for design phase
- Assess wireframe quality
- Decision: PASS/FAIL/CONCERNS
- Output: quality-gate-design-{date}.md

### Step 4: Standards Audit Phase (Optional)
If wireframe includes implementation notes:
- Invoke Stan (standards-auditor) agent
- Audit against design standards
- Output: standards-audit-{date}.md
```

**Implementation:**
```markdown
## Implementation Approach

**Option A: Manual Orchestration (Simple)**
- Workflow document guides user through agent invocations
- User manually calls `/bmad-agent-bme-empathy-mapper`, then `/bmad-agent-bme-wireframe-designer`, etc.
- Workflow provides next-step guidance

**Option B: Automatic Orchestration (Advanced)**
- Workflow automatically invokes agents using exec handler
- Each agent produces artifact
- Next agent loads previous artifact as context
- Example:
  ```xml
  <step n="1">
    <exec agent="empathy-mapper" command="EM"/>
    <capture output="empathy_map_path"/>
  </step>
  <step n="2">
    <exec agent="wireframe-designer" command="CW" context="{empathy_map_path}"/>
    <capture output="wireframe_path"/>
  </step>
  ```

**Recommendation:** Start with Option A (manual), upgrade to Option B if needed.
```

**Implementation Tasks (Day 11-12):**
- [ ] Create `_bmad/bme/workflows/product-development-flow.md` (50 LOC)
- [ ] Test manual orchestration (user-driven)
- [ ] Document artifact passing between agents
- [ ] Create example end-to-end run
- [ ] (Optional) Prototype automatic orchestration

**Total LOC:** ~50 LOC

### Day 13: Party Mode Integration

**Goal:** Enable new agents in party mode conversations

**Task:** Verify agent-manifest.csv registration enables party mode

**Party Mode Already Works:** Once agents registered in `agent-manifest.csv`, party mode automatically includes them.

**Testing:**
```
User: /bmad-party-mode
Party Mode: Loads all 25 agents (21 existing + 4 new)

User: "How do we ensure our new feature is well-designed and high-quality?"

Party Mode selects relevant agents:
- Emma (empathy-mapper): "Let's start with understanding the user..."
- Winston (architect): "From a technical perspective..."
- Quinn (quality-gatekeeper): "I'll need clear acceptance criteria..."
- Murat (test architect): "Quality gates should be defined upfront..."
```

**Implementation Tasks (Day 13):**
- [ ] Verify all 4 agents appear in party mode roster
- [ ] Test party mode topic-based agent selection
- [ ] Test cross-agent conversations (new + existing agents)
- [ ] Document party mode examples

**Total LOC:** 0 LOC (party mode already implemented)

### Day 14: Documentation & Decision Gate

**Tasks:**
- [ ] Create usage guide for 4 new agents
- [ ] Document cross-agent workflow patterns
- [ ] Create example artifacts for each agent
- [ ] Update README.md with Phase 0 results
- [ ] Prepare decision gate presentation

**Deliverables:**
- Complete usage documentation
- Example artifacts for all 4 agents
- Cross-agent workflow example
- Decision gate report

**Total LOC:** 0 LOC (documentation only)

### Day 15: Buffer & Cleanup

**Tasks:**
- [ ] Fix any remaining bugs
- [ ] Refactor code if needed
- [ ] Add missing tests
- [ ] Update planning documents
- [ ] Prepare for Phase 1

---

## Implementation Checklist

### Week 1: DesignOS-Inspired Agents

- [ ] **Emma (Empathy Mapper)**
  - [ ] Create agent file (100 LOC)
  - [ ] Create empathy-map workflow (step-files, 135 LOC)
  - [ ] Register in agent-manifest.csv
  - [ ] Test end-to-end
  - [ ] Document usage

- [ ] **Wade (Wireframe Designer)**
  - [ ] Create agent file (100 LOC)
  - [ ] Create wireframe workflow (YAML+instructions, 180 LOC)
  - [ ] Create component library CSV
  - [ ] Register in agent-manifest.csv
  - [ ] Test end-to-end
  - [ ] Document usage

**Week 1 Total:** ~415 LOC (buffer: 200 LOC)

### Week 2: AgentOS-Inspired Agents

- [ ] **Quinn (Quality Gatekeeper)**
  - [ ] Create agent file (100 LOC)
  - [ ] Create quality-gate workflow (step-files, 195 LOC)
  - [ ] Create default-criteria.yaml
  - [ ] Register in agent-manifest.csv
  - [ ] Test end-to-end
  - [ ] Document usage

- [ ] **Stan (Standards Auditor)**
  - [ ] Create agent file (100 LOC)
  - [ ] Create audit-standards workflow (YAML+instructions, 280 LOC)
  - [ ] Create 4 standards files
  - [ ] Register in agent-manifest.csv
  - [ ] Test end-to-end
  - [ ] Document usage

**Week 2 Total:** ~675 LOC (buffer: 325 LOC)

### Week 3: Integration & Testing

- [ ] **Cross-Agent Workflow**
  - [ ] Create product-development-flow.md (50 LOC)
  - [ ] Test manual orchestration
  - [ ] Document artifact passing
  - [ ] Create end-to-end example

- [ ] **Party Mode Integration**
  - [ ] Verify all 4 agents in party mode
  - [ ] Test multi-agent conversations
  - [ ] Document party mode examples

- [ ] **Documentation & Decision Gate**
  - [ ] Usage guide for 4 agents
  - [ ] Cross-agent workflow docs
  - [ ] Example artifacts
  - [ ] Decision gate report

**Week 3 Total:** ~50 LOC (orchestration only)

**Grand Total:** ~1,140 LOC actual code (vs 500 LOC estimate - buffer accounts for templates, standards files)

---

## Success Criteria

### Functional Requirements

- [ ] All 4 agents accessible via slash commands:
  - [ ] `/bmad-agent-bme-empathy-mapper` works
  - [ ] `/bmad-agent-bme-wireframe-designer` works
  - [ ] `/bmad-agent-bme-quality-gatekeeper` works
  - [ ] `/bmad-agent-bme-standards-auditor` works

- [ ] All workflows execute end-to-end:
  - [ ] Empathy map workflow completes successfully
  - [ ] Wireframe workflow completes successfully
  - [ ] Quality gate workflow completes successfully
  - [ ] Standards audit workflow completes successfully

- [ ] Artifacts produced match templates:
  - [ ] Empathy maps contain: user definition, says/thinks, does/feels, pains, gains
  - [ ] Wireframes contain: purpose, components, layout, Excalidraw diagram, design decisions
  - [ ] Quality gates contain: criteria, evidence, scores, decision (PASS/FAIL/CONCERNS/WAIVED)
  - [ ] Standards audits contain: violations, compliance scores, recommendations

- [ ] Cross-agent workflow orchestration works:
  - [ ] Manual orchestration guide functional
  - [ ] Artifacts can be passed between agents
  - [ ] End-to-end product development flow completes

- [ ] Party mode integration works:
  - [ ] All 4 new agents appear in party mode roster
  - [ ] Agents selected for relevant topics
  - [ ] Cross-agent conversations functional

### Non-Functional Requirements

- [ ] **LOC Estimate Accuracy:** Actual LOC within ±30% of estimate (500 LOC ± 150 = 350-650 LOC)
- [ ] **Timeline Accuracy:** Phase 0 completes within 3 weeks
- [ ] **Code Quality:** All code follows BMAD agent standards
- [ ] **Documentation:** Complete usage guides for all agents
- [ ] **Testing:** Each agent tested end-to-end with real examples

---

## Decision Gate Questions

### Week 3 Decision Gate

**Primary Question:** Does agent enhancement approach prove viable for BMAD-Enhanced integration?

**Evaluation Criteria:**

1. **Agent Pattern Scalability**
   - Can agent menus effectively expose framework capabilities?
   - Does workflow-based orchestration scale to complex multi-agent flows?
   - Is explicit registration (CSV) manageable vs convention-based discovery?

2. **User Experience**
   - Is slash command invocation intuitive for users?
   - Does manual orchestration feel cumbersome or natural?
   - Is party mode multi-agent collaboration valuable?

3. **Technical Debt**
   - Does agent duplication create maintenance burden?
   - Are workflows easy to understand and modify?
   - Does artifact passing between agents work smoothly?

4. **Capability Coverage**
   - Do 4 new agents provide meaningful new capabilities?
   - What gaps remain vs original DesignOS/AgentOS vision?
   - Should we continue agent approach or pivot?

**Decision Options:**

**Option A: Proceed to Phase 1 (Contract Foundation)**
- Agent approach proven viable
- Continue with BaseArtifact v2.0.0 implementation
- Plan Phase 3/4 as agent enhancements (not custom orchestration)

**Option B: Enhance Agent Capabilities (Phase 1.5)**
- Agent approach viable but needs more capabilities
- Add 4-8 more agents before Phase 1
- Defer contract foundation until agent ecosystem mature

**Option C: Pivot to Custom Orchestration (Phase 0.5)**
- Agent approach doesn't scale
- Build custom orchestration engine (original 1,800 LOC plan)
- Retry Phase 0 with Capabilities + Steps pattern

**Option D: Pivot to Hybrid Approach**
- Agents for user-facing features
- Custom orchestration for backend coordination
- Combine proven agent UX with automatic capability discovery

**Recommendation Criteria:**
- If 4 agents prove valuable and workflows scale → **Option A**
- If agents good but need more coverage → **Option B**
- If agents don't scale or maintenance burden high → **Option C**
- If agents great for UX but orchestration manual → **Option D**

---

## Next Steps After Phase 0

### If Decision: Proceed to Phase 1

**Phase 1 (Weeks 4-7): Contract Foundation**
- Implement BaseArtifact v2.0.0 schema
- Add frontmatter contracts to 4 new agents
- Establish cross-framework traceability
- Create artifact relationship mapping

### If Decision: Enhance Agents (Phase 1.5)

**Additional Agents to Consider:**
- Journey Mapper (CIS-inspired)
- Persona Creator (CIS-inspired)
- API Standards Auditor (AgentOS-inspired)
- Performance Quality Gate (AgentOS-inspired)
- Accessibility Auditor (AgentOS-inspired)
- Documentation Quality Gate (AgentOS-inspired)

**Scope:** 4-8 additional agents, 2-4 weeks

### If Decision: Pivot to Custom Orchestration

**Revert to ADR v1.3.0 Plan:**
- Build capability discovery engine (200 LOC)
- Build step loading mechanism (300 LOC)
- Build orchestration glue (300 LOC)
- Implement execution tracing (250 LOC)
- Create DesignOS/AgentOS stubs (400 LOC)
- Total: 1,800 LOC, 4-6 weeks

---

## Appendix A: Distribution & Installation

### npm Package Structure

**BMAD Enhanced provides flexible installation:**
- **Individual agents**: Install only what you need
- **Bulk installation**: Install all 4 agents at once

### Package Options

**Individual Agent Packages:**
```bash
npm install -g @bmad/bme-empathy-mapper      # Emma only
npm install -g @bmad/bme-wireframe-designer  # Wade only
npm install -g @bmad/bme-quality-gatekeeper  # Quinn only
npm install -g @bmad/bme-standards-auditor   # Stan only
```

**Bundle Package (All Agents):**
```bash
npm install -g @bmad/bme                     # All 4 agents
```

**Core Infrastructure (Installed Automatically):**
```bash
@bmad/bme-core                               # Shared installation utilities
```

### Installation Examples

**Example 1: Install Individual Agent (Emma)**
```bash
npm install -g @bmad/bme-empathy-mapper

# Post-install output:
✅ Emma (empathy-mapper) installed successfully!
Invoke with: /bmad-agent-bme-empathy-mapper

# What happened:
# 1. Detected BMAD Method in current directory
# 2. Created _bmad/bme/ directory (if didn't exist)
# 3. Copied empathy-mapper.md to _bmad/bme/_designos/agents/
# 4. Copied empathy-map/ workflow to _bmad/bme/_designos/workflows/
# 5. Added empathy-mapper entry to _bmad/_config/agent-manifest.csv
```

**Example 2: Install All Agents at Once**
```bash
npm install -g @bmad/bme

# Post-install output:
✅ BMAD Enhanced installed successfully!
4 agents available:
  /bmad-agent-bme-empathy-mapper      (Emma - Empathy Mapping)
  /bmad-agent-bme-wireframe-designer  (Wade - Wireframes)
  /bmad-agent-bme-quality-gatekeeper  (Quinn - Quality Gates)
  /bmad-agent-bme-standards-auditor   (Stan - Standards Auditing)

Run '/bmad-party-mode' to see all 25 agents!

# What happened:
# 1. Installed @bmad/bme-core (shared infrastructure)
# 2. Installed all 4 individual agent packages as dependencies
# 3. Each agent's post-install script ran
# 4. _bmad/bme/ directory fully populated
# 5. All 4 entries added to agent-manifest.csv
```

**Example 3: Gradual Adoption**
```bash
# Day 1: Try Emma
npm install -g @bmad/bme-empathy-mapper

# Day 7: Emma is great! Add Wade
npm install -g @bmad/bme-wireframe-designer

# Day 14: Love both! Upgrade to full bundle
npm install -g @bmad/bme
# Skips Emma + Wade (already installed), adds Quinn + Stan
```

### Uninstallation

**Uninstall Individual Agent:**
```bash
npm uninstall -g @bmad/bme-empathy-mapper

# Post-uninstall output:
✅ Emma (empathy-mapper) uninstalled

# What happened:
# 1. Removed empathy-mapper.md agent file
# 2. Removed empathy-map/ workflow directory
# 3. Removed empathy-mapper entry from agent-manifest.csv
# 4. If no other bme agents remain, removed _bmad/bme/ directory
```

**Uninstall All Agents:**
```bash
npm uninstall -g @bmad/bme

# Post-uninstall output:
✅ BMAD Enhanced uninstalled (4 agents removed)

# What happened:
# 1. Triggered uninstall for all 4 agent dependencies
# 2. Each agent's post-uninstall script ran
# 3. Removed entire _bmad/bme/ directory
# 4. Removed all 4 entries from agent-manifest.csv
```

### agent-manifest.csv Entries

**After Individual Install (Emma only):**
```csv
"empathy-mapper","Emma","Empathy Mapping Specialist","🎨","User Empathy Expert + Design Thinking Specialist","Design thinking expert specializing in empathy maps...","Empathetic, curious, asks probing questions...","Design is about THEM not us...","bme","_bmad/bme/_designos/agents/empathy-mapper.md"
```

**After Bulk Install (All 4 agents):**
```csv
"empathy-mapper","Emma","Empathy Mapping Specialist","🎨","User Empathy Expert + Design Thinking Specialist","Design thinking expert specializing in empathy maps...","Empathetic, curious, asks probing questions...","Design is about THEM not us...","bme","_bmad/bme/_designos/agents/empathy-mapper.md"
"wireframe-designer","Wade","Wireframe Specialist","📐","UI/UX Wireframe Expert","Expert in rapid wireframe prototyping...","Visual thinker, asks about layout...","Simple first, iterate later...","bme","_bmad/bme/_designos/agents/wireframe-designer.md"
"quality-gatekeeper","Quinn","Quality Gate Specialist","🚦","Quality Assurance Expert + Decision Authority","Risk-based quality assessment specialist...","Data-driven, objective, no-nonsense...","Quality gates must be objective...","bme","_bmad/bme/_agentos/agents/quality-gatekeeper.md"
"standards-auditor","Stan","Standards Compliance Auditor","📋","Code Standards Expert + Compliance Checker","Meticulous standards enforcement specialist...","Meticulous, detail-oriented...","Consistency is maintainability...","bme","_bmad/bme/_agentos/agents/standards-auditor.md"
```

### Installation Scripts

**Core Package (@bmad/bme-core):**
Shared installation utilities used by all agent packages.

**File:** `install-helper.js`
```javascript
// Shared installation helper used by all agent packages
const fs = require('fs');
const path = require('path');

function findBmadRoot() {
  let dir = process.cwd();
  while (dir !== '/') {
    if (fs.existsSync(path.join(dir, '_bmad'))) {
      return dir;
    }
    dir = path.dirname(dir);
  }
  throw new Error('BMAD Method not found. Install BMAD Method first.');
}

async function installAgent(config) {
  const bmadRoot = findBmadRoot();
  const bmeDir = path.join(bmadRoot, '_bmad', 'bme');

  // Create bme module directory (if doesn't exist)
  if (!fs.existsSync(bmeDir)) {
    fs.mkdirSync(bmeDir, { recursive: true });
    fs.mkdirSync(path.join(bmeDir, '_config'));

    // Create module.yaml
    fs.writeFileSync(
      path.join(bmeDir, '_config', 'module.yaml'),
      'module_name: bme\nversion: 1.0.0\n'
    );
  }

  // Copy agent file
  const submoduleDir = path.join(bmeDir, config.submodule, 'agents');
  fs.mkdirSync(submoduleDir, { recursive: true });

  const sourceAgent = path.join(__dirname, '..', config.agentFile);
  const targetAgent = path.join(submoduleDir, path.basename(config.agentFile));
  fs.copyFileSync(sourceAgent, targetAgent);

  // Copy workflows
  config.workflows.forEach(workflowPath => {
    const sourceWorkflow = path.join(__dirname, '..', workflowPath);
    const workflowName = path.basename(workflowPath);
    const targetWorkflow = path.join(bmeDir, config.submodule, 'workflows', workflowName);
    copyRecursive(sourceWorkflow, targetWorkflow);
  });

  // Update agent-manifest.csv
  const manifestPath = path.join(bmadRoot, '_bmad', '_config', 'agent-manifest.csv');
  const agentEntry = `"${config.name}","${config.displayName}","${config.title}","${config.icon}","...","${config.module}","_bmad/bme/${config.submodule}/agents/${path.basename(config.agentFile)}"\n`;
  fs.appendFileSync(manifestPath, agentEntry);

  return { success: true, bmadRoot, agentPath: targetAgent };
}

function copyRecursive(src, dest) {
  if (fs.statSync(src).isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach(file => {
      copyRecursive(path.join(src, file), path.join(dest, file));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

module.exports = { installAgent, findBmadRoot };
```

**Individual Agent Package (@bmad/bme-empathy-mapper):**

**File:** `install.js` (npm post-install script)
```javascript
#!/usr/bin/env node
const { installAgent } = require('@bmad/bme-core/install-helper');

const AGENT_CONFIG = {
  name: 'empathy-mapper',
  displayName: 'Emma',
  title: 'Empathy Mapping Specialist',
  icon: '🎨',
  module: 'bme',
  submodule: '_designos',
  agentFile: 'agent/empathy-mapper.md',
  workflows: ['agent/workflows/empathy-map']
};

installAgent(AGENT_CONFIG)
  .then(() => {
    console.log('✅ Emma (empathy-mapper) installed successfully!');
    console.log('Invoke with: /bmad-agent-bme-empathy-mapper');
  })
  .catch(err => {
    console.error('❌ Installation failed:', err.message);
    process.exit(1);
  });
```

**Bundle Package (@bmad/bme):**

**File:** `package.json` (meta-package with dependencies)
```json
{
  "name": "@bmad/bme",
  "version": "1.0.0",
  "description": "BMAD Enhanced - All agents bundle",
  "dependencies": {
    "@bmad/bme-core": "^1.0.0",
    "@bmad/bme-empathy-mapper": "^1.0.0",
    "@bmad/bme-wireframe-designer": "^1.0.0",
    "@bmad/bme-quality-gatekeeper": "^1.0.0",
    "@bmad/bme-standards-auditor": "^1.0.0"
  },
  "scripts": {
    "postinstall": "node install.js"
  }
}
```

**File:** `install.js` (bundle post-install)
```javascript
#!/usr/bin/env node
// Bundle package just displays success message
// (All agents already installed via dependencies)

console.log('✅ BMAD Enhanced installed successfully!');
console.log('4 agents available:');
console.log('  /bmad-agent-bme-empathy-mapper      (Emma - Empathy Mapping)');
console.log('  /bmad-agent-bme-wireframe-designer  (Wade - Wireframes)');
console.log('  /bmad-agent-bme-quality-gatekeeper  (Quinn - Quality Gates)');
console.log('  /bmad-agent-bme-standards-auditor   (Stan - Standards Auditing)');
console.log('');
console.log("Run '/bmad-party-mode' to see all 25 agents!");
```

### Slash Command Format

**Pattern:** `/bmad-agent-bme-{agent-name}`

**Examples:**
- `/bmad-agent-bme-empathy-mapper` → Invokes Emma (empathy-mapper)
- `/bmad-agent-bme-wireframe-designer` → Invokes Wade (wireframe-designer)
- `/bmad-agent-bme-quality-gatekeeper` → Invokes Quinn (quality-gatekeeper)
- `/bmad-agent-bme-standards-auditor` → Invokes Stan (standards-auditor)

**Why Explicit Module Prefix?**
- Clear module ownership (bme)
- Avoids naming conflicts with future agents
- Easy to identify BMAD Enhanced agents in party mode
- Consistent with BMAD Method naming conventions

---

## Appendix B: File Structure Summary

```
_bmad/bme/                          # BMAD Enhanced module (installed via npm)
├── package.json                    # npm package metadata
├── install.js                      # Post-install script
├── _config/
│   └── module.yaml                 # Module configuration
├── _designos/
│   ├── config.yaml                 # DesignOS sub-module config
│   ├── agents/
│   │   ├── empathy-mapper.md       # Emma (100 LOC)
│   │   └── wireframe-designer.md   # Wade (100 LOC)
│   ├── workflows/
│   │   ├── empathy-map/
│   │   │   ├── workflow.md
│   │   │   ├── empathy-map.template.md
│   │   │   └── steps/ (6 files)
│   │   └── wireframe/
│   │       ├── workflow.yaml
│   │       ├── instructions.md
│   │       ├── template.md
│   │       └── component-library.csv
│   └── output/                     # Generated empathy maps & wireframes
├── _agentos/
│   ├── config.yaml                 # AgentOS sub-module config
│   ├── agents/
│   │   ├── quality-gatekeeper.md   # Quinn (100 LOC)
│   │   └── standards-auditor.md    # Stan (100 LOC)
│   ├── workflows/
│   │   ├── quality-gate/
│   │   │   ├── workflow.md
│   │   │   ├── quality-gate.template.md
│   │   │   ├── default-criteria.yaml
│   │   │   └── steps/ (6 files)
│   │   └── audit-standards/
│   │       ├── workflow.yaml
│   │       ├── instructions.md
│   │       ├── template.md
│   │       └── standards/ (4 files)
│   └── output/                     # Generated quality gates & audits
└── workflows/
    └── product-development-flow.md # Cross-agent orchestration (50 LOC)
```

**Total New Files:**
- Agent + workflow files: ~30 files
- npm package files: ~18 files (6 packages × 3 files each: package.json, install.js, README.md)
- **Total:** ~48 files

**Total New LOC:**
- Agent + workflow code: ~500-700 LOC
- Installation scripts: ~200 LOC (shared helper + 5 install.js scripts)
- package.json files: ~150 LOC (6 packages)
- **Total:** ~850-1,050 LOC

**npm Package Distribution:**
1. `@bmad/bme-core` - Shared installation utilities (install-helper.js)
2. `@bmad/bme-empathy-mapper` - Emma (individual agent package)
3. `@bmad/bme-wireframe-designer` - Wade (individual agent package)
4. `@bmad/bme-quality-gatekeeper` - Quinn (individual agent package)
5. `@bmad/bme-standards-auditor` - Stan (individual agent package)
6. `@bmad/bme` - Bundle (meta-package with all 4 as dependencies)

---

## Appendix C: Use Cases for Individual vs Bulk Installation

### Use Case 1: UX Designer (Emma Only)
**Profile:** UX designer who needs empathy mapping, doesn't need quality gates.

**Installation:**
```bash
npm install -g @bmad/bme-empathy-mapper
```

**Benefit:** Installs only Emma (235 LOC), not all 4 agents (1,240 LOC).

---

### Use Case 2: QA Team (Quality Agents Only)
**Profile:** QA team needs quality gates and standards auditing.

**Installation:**
```bash
npm install -g @bmad/bme-quality-gatekeeper
npm install -g @bmad/bme-standards-auditor
```

**Benefit:** Installs Quinn + Stan (675 LOC), skips design agents.

---

### Use Case 3: Full Product Team (All Agents)
**Profile:** Product team with designers, developers, QA - everyone needs all agents.

**Installation:**
```bash
npm install -g @bmad/bme
```

**Benefit:** One command installs all 4 agents (1,240 LOC).

---

### Use Case 4: Gradual Adoption
**Profile:** Team wants to try BMAD Enhanced before committing.

**Week 1:**
```bash
npm install -g @bmad/bme-empathy-mapper
# Try Emma for user research
```

**Week 2:**
```bash
# Emma is great! Add wireframing
npm install -g @bmad/bme-wireframe-designer
```

**Week 3:**
```bash
# Love BMAD Enhanced! Upgrade to full bundle
npm install -g @bmad/bme
# Skips Emma + Wade (already installed), adds Quinn + Stan
```

**Benefit:** Lower barrier to entry, natural upgrade path.

---

**End of Implementation Guide**

Ready to begin Phase 0 implementation!
