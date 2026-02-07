---
title: "Phase 0 Alternative Approach: Agent-by-Agent Integration"
date: 2026-02-07
version: 1.0.0
status: PROPOSED ALTERNATIVE
related_docs:
  - architectural-decision-record.md (v1.3.0)
  - integration-roadmap.md (v2.0.0)
  - phase-0-workflow-map.md
---

# Phase 0 Alternative Approach: Agent-by-Agent Integration

**Proposed By:** User (Amalik)
**Date:** 2026-02-07
**Status:** PROPOSED ALTERNATIVE to current Phase 0 plan

---

## Executive Summary

**Current Phase 0 Plan:** Build custom orchestration engine (1,800 LOC) to enable DesignOS/AgentOS capabilities via convention-based discovery (Patterns B2, D2, H1, D10).

**Alternative Proposed:** Start from fresh BMAD Method install and add DesignOS/AgentOS agents **one-by-one** using BMAD's existing agent registration system (`agent-manifest.csv` + agent files).

**Key Insight:** Leverage BMAD Method's proven agent architecture instead of building custom orchestration from scratch.

---

## How BMAD's Agent System Works

### Agent Registration

All agents are registered in `_bmad/_config/agent-manifest.csv`:

```csv
name,displayName,title,icon,role,identity,communicationStyle,principles,module,path
"analyst","Mary","Business Analyst","📊","Strategic Business Analyst + Requirements Expert","Senior analyst...","Speaks with excitement...","Channel expert...","bmm","_bmad/bmm/agents/analyst.md"
```

### Agent Types (3 Options)

**1. Simple Agent** (~250 lines, single YAML file)
- Everything in one file
- No persistent memory
- Stateless (each session independent)
- Example: Commit message helper, document formatter

**2. Expert Agent** (YAML + sidecar folder with memory)
- Persistent memory across sessions (`memories.md`, `instructions.md`)
- Domain-specific knowledge base
- Custom workflows in sidecar
- Example: Journal companion, personal job augmentation

**3. Module Agent** (Extends existing module)
- Adds specialized capability to BMM/CIS/BMGD/etc.
- Coordinates with other agents in module
- Uses/contributes shared module workflows
- Example: Adding `security-engineer.agent.yaml` to BMM

### Agent Discovery

BMAD Method already has agent discovery:
- Scans `agent-manifest.csv` on startup
- Loads agent metadata (role, identity, principles, path)
- Exposes agents via `/bmad-agent-<module>-<name>` slash commands
- Example: `/bmad-agent-cis-design-thinking-coach` loads Maya

---

## The Alternative Approach

### Phase 0 POC Using Agent Integration

Instead of building orchestration engine (1,800 LOC), do this:

**Step 1: Create DesignOS Agents (Week 1)**

Add agents to `agent-manifest.csv`:
```csv
"empathy-mapper","Emma","Empathy Mapping Specialist","🎨","User Empathy Expert","Design thinking expert specializing in empathy maps...","Empathetic, curious...","Design is about THEM not us...","designos","_designos/agents/empathy-mapper.md"
"wireframe-designer","Wade","Wireframe Specialist","📐","UI/UX Wireframe Expert","Expert in rapid wireframe prototyping...","Visual thinker...","Simple first, iterate...","designos","_designos/agents/wireframe-designer.md"
```

**Step 2: Create AgentOS Agents (Week 2)**

Add agents to `agent-manifest.csv`:
```csv
"quality-gatekeeper","Quinn","Quality Gate Specialist","🚦","Quality Assurance Expert","Risk-based quality assessment...","Data-driven...","Quality gates must be objective...","agentos","_agentos/agents/quality-gatekeeper.md"
"standards-auditor","Stan","Standards Compliance Auditor","📋","Code Standards Expert","Coding standards enforcement...","Meticulous...","Consistency is maintainability...","agentos","_agentos/agents/standards-auditor.md"
```

**Step 3: Test Cross-Framework Workflow (Week 3)**

User invokes workflow using existing BMAD agents:
1. `/bmad-agent-designos-empathy-mapper` - Creates empathy map
2. `/bmad-agent-bmm-architect` - Creates architecture (existing)
3. `/bmad-agent-agentos-quality-gatekeeper` - Validates quality
4. `/bmad-agent-bmm-dev` - Implements (existing)

**No orchestration engine needed** - users manually invoke agents in sequence.

---

## Comparison: Custom Orchestration vs Agent Integration

| Aspect | Current Phase 0 Plan | Alternative: Agent Integration |
|--------|---------------------|-------------------------------|
| **Foundation** | Build custom orchestration engine | Use existing BMAD agent system |
| **LOC Estimate** | 1,800 LOC | ~400-600 LOC (4-6 agent files × ~100 LOC each) |
| **Patterns Used** | B2, D2, H1, D10 (Convention-Based Discovery, Step Loading, Hierarchical Orchestration, Execution Tracing) | BMAD's existing agent registration + menu system |
| **User Experience** | Backend-only (no UX change) OR new slash commands (TBD) | New slash commands immediately (`/bmad-agent-designos-empathy-mapper`) |
| **Orchestration** | Automatic capability discovery + step loading | Manual agent invocation (user chains agents) |
| **Validation** | Validates custom orchestration pattern | Validates agent design patterns |
| **Risk** | Custom engine might fail → pivot | Agent system proven (21 agents already work) |
| **Reusability** | Orchestration code specific to BMAD-Enhanced | Agents reusable in any BMAD project |
| **Timeline** | 3 weeks (1,800 LOC ambitious) | 2-3 weeks (400-600 LOC realistic) |

---

## Pros and Cons

### Pros of Agent Integration Approach

✅ **Drastically Lower LOC:** 400-600 LOC vs 1,800 LOC (70% reduction)

✅ **Proven Foundation:** BMAD's agent system already works (21 agents in production)

✅ **Faster Implementation:** Agent files are simpler than orchestration engine

✅ **Immediate User Value:** Users get working DesignOS/AgentOS agents in Weeks 1-2

✅ **No Custom Code Risk:** No new orchestration engine to debug/maintain

✅ **Reusable Assets:** Agents can be used in any BMAD project (not BMAD-Enhanced specific)

✅ **Natural UX:** Slash commands match existing BMAD patterns (`/bmad-agent-<module>-<name>`)

✅ **Incremental Validation:** Test each agent individually before combining

### Cons of Agent Integration Approach

❌ **Manual Orchestration:** Users must invoke agents in correct sequence (no automatic chaining)

❌ **No Step Loading:** Agents use inline prompts or sidecar workflows (not step files like current plan)

❌ **Limited Capability Discovery:** Agents are registered explicitly (not convention-based scanning)

❌ **Doesn't Validate Orchestration Pattern:** Phase 0's goal was to prove B2+D2+H1 patterns work

❌ **May Not Scale:** Manual chaining awkward for complex workflows (10+ agent calls)

❌ **Different Architecture:** Diverges from "Capabilities + Steps" model in ADR v1.3.0

❌ **Quint Integration Unclear:** How do Quint commands (q0-init, q1-hypothesize) fit into agent model?

---

## Critical Questions

### 1. Does This Achieve Phase 0 Goals?

**Current Phase 0 Goal (from ADR v1.3.0):**
> "Validate core orchestration pattern (Capabilities + Steps) using pure markdown workflows"

**Agent Integration Approach:**
- ✅ Validates: Agent design patterns, cross-framework collaboration
- ❌ Does NOT validate: Capabilities + Steps pattern, convention-based discovery, hierarchical orchestration

**Verdict:** Only achieves Phase 0 goals if we CHANGE what Phase 0 is validating.

### 2. What About Capabilities + Steps Pattern?

**Current Plan:** Frameworks expose capabilities (`_designos/capabilities/empathy-map.md`) that load steps (`_designos/steps/empathy-map-step-01.md`)

**Agent Approach:** Agents expose menus that execute workflows or inline prompts:
```yaml
menu:
  - item: "[EM] Create Empathy Map"
    exec: "{project-root}/_designos/workflows/empathy-map/workflow.md"
```

**Compatibility:** Agent workflows CAN load steps, but it's not automatic - each agent must manually implement step loading.

### 3. How Do Quint Commands Fit?

**Quint Structure:** 12 commands (q0-init through q5-decide) implemented as Go+SQLite MCP server

**Option A: Quint as Agent?**
- Create `quint-fpf.agent.yaml` with menu mapping to q-commands
- Problem: Quint is SQLite-based, agents are markdown-based

**Option B: Keep Quint Separate?**
- Agents for DesignOS/AgentOS only
- Quint remains separate (Phase 2 integration unchanged)

**Recommendation:** Option B - Agent approach works for DesignOS/AgentOS, but NOT for Quint

### 4. What About Orchestration?

**Current Plan:** BMAD workflows automatically invoke capabilities
```yaml
# workflow step
- Capability Discovery: Scan _designos/capabilities/ → Load empathy-map.md
- Invoke capability → Load steps → Execute → Return to workflow
```

**Agent Approach:** User manually invokes agents
```
User: /bmad-agent-designos-empathy-mapper
Emma (agent): [Creates empathy map]
User: /bmad-agent-bmm-architect
Winston (agent): [Reviews empathy map, creates architecture]
User: /bmad-agent-agentos-quality-gatekeeper
Quinn (agent): [Validates architecture]
```

**Problem:** No automatic orchestration - user is the orchestrator

**Possible Solution:** Create meta-agent that orchestrates other agents?
```yaml
name: "product-flow-orchestrator"
menu:
  - item: "[PF] Run Product Development Flow"
    exec: "_bmad-enhanced/workflows/product-flow.md"
```

Where `product-flow.md` internally invokes agents in sequence.

---

## Hybrid Approach: Agent Integration + Orchestration Workflows

**Idea:** Combine both approaches

**Week 1: Create DesignOS/AgentOS Agents**
- 4 agents (empathy-mapper, wireframe-designer, quality-gatekeeper, standards-auditor)
- ~400 LOC total
- Users can invoke agents individually

**Week 2: Create Orchestration Workflows**
- Workflows that chain agent invocations automatically
- Example: `product-development-flow.md` calls agents in sequence
- ~300 LOC orchestration logic

**Week 3: Validate Cross-Framework Integration**
- Test workflow invoking DesignOS → BMAD BMM → AgentOS
- Decision gate: Does agent-based integration scale?

**Total LOC:** ~700 LOC (vs 1,800 LOC original plan)

**Advantages:**
- ✅ Lower LOC (60% reduction)
- ✅ Reusable agents (individual + orchestrated use cases)
- ✅ Proven agent foundation + custom orchestration
- ✅ Validates both agent patterns AND orchestration patterns

**Disadvantages:**
- ❌ Still doesn't fully validate "Capabilities + Steps" pattern
- ❌ Orchestration workflows are BMAD-Enhanced specific (not general)

---

## Alignment with ADR v1.3.0

**Current ADR States:**
> "Phase 0 Focus: Pure markdown orchestration (DesignOS + AgentOS) - 1,800 LOC"
> "Interface Model: Capabilities + Steps (Convention-Based Discovery)"
> "Control Flow: Hierarchical Orchestration (Capabilities → Load Steps → Execute Framework Logic)"

**Agent Integration Approach:**
- ❌ Uses "Agents + Menus" NOT "Capabilities + Steps"
- ❌ Uses explicit registration (agent-manifest.csv) NOT convention-based discovery
- ❌ Uses workflow execution NOT hierarchical orchestration

**Verdict:** Agent integration approach DIVERGES from ADR v1.3.0 architectural decisions.

**Options:**
1. **Update ADR** to use "Agent-First" architecture instead of "Capabilities + Steps"
2. **Hybrid Approach** to validate both patterns
3. **Keep Current Plan** to stay aligned with ADR

---

## Recommendation

**I recommend the Hybrid Approach** for Phase 0:

**Rationale:**
1. **Lower Risk:** Agent system is proven (21 agents work), custom orchestration is not
2. **Lower LOC:** 700 LOC vs 1,800 LOC (60% reduction = realistic 3-week timeline)
3. **Dual Validation:** Validates agent patterns (immediate value) + orchestration patterns (POC goal)
4. **User Value:** Users get working agents in Week 1 (not just backend code)
5. **Reusability:** Agents reusable beyond BMAD-Enhanced project
6. **Alignment:** Partial alignment with ADR (orchestration workflows similar to Capabilities + Steps)

**Proposed Phase 0 Revised Plan:**

**Week 1: Agent Creation (400 LOC)**
- Create 4 agents: empathy-mapper, wireframe-designer, quality-gatekeeper, standards-auditor
- Register in agent-manifest.csv
- Test individual agent invocation
- Deliverable: 4 working agents accessible via slash commands

**Week 2: Orchestration Workflows (300 LOC)**
- Create `product-development-flow.md` workflow
- Workflow invokes agents in sequence (DesignOS → BMM → AgentOS)
- Implement basic execution tracing
- Deliverable: End-to-end orchestrated workflow

**Week 3: Integration Testing + Decision Gate**
- Test complex workflows with multiple agent invocations
- Validate agent-based integration scales
- Document gaps vs original Capabilities + Steps pattern
- Decision: Proceed to Phase 1 OR pivot to full Capabilities + Steps in Phase 1.5

**Total LOC:** ~700 LOC (vs 1,800 LOC)

**Decision Gate Questions (Week 3):**
1. Do agents provide sufficient abstraction for framework capabilities?
2. Does workflow-based orchestration scale to 10+ agent calls?
3. Should we migrate to Capabilities + Steps pattern in Phase 1.5?
4. Can Quint integrate with agent model (or remain separate)?

---

## Next Steps

**If Accepted:**
1. Update ADR v1.3.0 → v1.4.0 (Hybrid: Agent Integration + Orchestration Workflows)
2. Update Integration Roadmap Phase 0 tasks (from 1,800 LOC → 700 LOC)
3. Create agent specifications for 4 initial agents
4. Begin Week 1 implementation (agent creation)

**If Rejected:**
1. Proceed with current Phase 0 plan (1,800 LOC orchestration engine)
2. Defer agent integration to Phase 3/4 (full DesignOS/AgentOS implementation)

**Questions for User:**
1. Does agent-based integration align with your vision for BMAD-Enhanced?
2. Is manual agent chaining acceptable (or must orchestration be automatic)?
3. Should Quint integrate via agents (Option A) or remain separate (Option B)?
4. Do you want to update Phase 0 to Hybrid Approach (700 LOC) or keep current plan (1,800 LOC)?

---

## Appendix: Example Agent File

**Sample: DesignOS Empathy Mapper Agent**

```yaml
---
name: empathy-mapper
description: Create user empathy maps for design thinking
module: designos
---

You must fully embody this agent's persona and follow all activation instructions.

<agent id="empathy-mapper.agent.yaml" name="Emma" title="Empathy Mapping Specialist" icon="🎨">
  <activation critical="MANDATORY">
    <step n="1">Load persona from this agent file</step>
    <step n="2">Load config from {project-root}/_designos/config.yaml</step>
    <step n="3">Greet user and display menu</step>
    <step n="4">WAIT for user input</step>
  </activation>

  <persona>
    <role>User Empathy Expert + Design Thinking Specialist</role>
    <identity>Design thinking expert specializing in empathy maps and user research. Helps teams understand user needs, emotions, and pain points through structured empathy mapping.</identity>
    <communication_style>Empathetic, curious, asks probing questions. Focuses on emotional understanding and user perspective.</communication_style>
    <principles>
      - Design is about THEM not us
      - Every empathy map must be grounded in real user insights
      - Challenge assumptions - validate through research
      - Emotions drive behavior - understand the WHY
    </principles>
  </persona>

  <menu>
    <item cmd="MH">[MH] Redisplay Menu</item>
    <item cmd="CH">[CH] Chat with Emma</item>
    <item cmd="EM" exec="{project-root}/_designos/workflows/empathy-map/workflow.md">[EM] Create Empathy Map</item>
    <item cmd="VM" exec="{project-root}/_designos/workflows/empathy-map/validate.md">[VM] Validate Existing Empathy Map</item>
    <item cmd="PM" exec="{project-root}/_bmad/core/workflows/party-mode/workflow.md">[PM] Start Party Mode</item>
    <item cmd="DA">[DA] Dismiss Agent</item>
  </menu>
</agent>
```

**Invocation:**
```
User: /bmad-agent-designos-empathy-mapper
Emma: Hi Amalik! 🎨 I'm Emma, your Empathy Mapping Specialist. I help teams deeply understand users through structured empathy mapping.

[MH] Redisplay Menu
[CH] Chat with Emma
[EM] Create Empathy Map
[VM] Validate Existing Empathy Map
[PM] Start Party Mode
[DA] Dismiss Agent

What would you like to do?

User: EM
Emma: Great! Let's create an empathy map. [Loads _designos/workflows/empathy-map/workflow.md]

[Workflow guides user through empathy mapping process]
```

---

**End of Document**
