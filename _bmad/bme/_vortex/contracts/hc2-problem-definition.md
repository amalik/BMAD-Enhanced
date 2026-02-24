# HC2: Problem Definition — Schema Definition

> **Contract:** HC2 | **Type:** Artifact | **Flow:** Mila → Liam
>
> This schema defines the structure for a converged problem definition grounded in Jobs-to-be-Done framing and Pains & Gains analysis. Any agent or user can produce a compliant artifact — the schema is not coupled to a specific producer.

## Frontmatter Schema

```yaml
---
contract: HC2
type: artifact
source_agent: mila                          # or any producing agent/user
source_workflow: research-convergence        # workflow that produced this artifact
target_agents: [liam]                        # primary consumer(s)
input_artifacts:                             # references to upstream HC1 artifacts consumed
  - path: "_bmad-output/vortex-artifacts/hc1-example.md"
    contract: HC1
created: YYYY-MM-DD
---
```

### Frontmatter Field Reference

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `contract` | Yes | string | Always `HC2` |
| `type` | Yes | string | Always `artifact` |
| `source_agent` | Yes | string | Agent ID that produced this artifact (e.g., `mila`) |
| `source_workflow` | Yes | string | Workflow name (e.g., `research-convergence`, `pivot-resynthesis`) |
| `target_agents` | Yes | array | Agent IDs that consume this artifact (e.g., `[liam]`) |
| `input_artifacts` | Yes | array | References to HC1 empathy artifacts or other source material used |
| `created` | Yes | date | ISO date when artifact was created |

---

## Body Structure

### 1. Converged Problem Statement *(required)*

A single, clear problem statement that synthesizes all input research into one actionable definition.

| Field | Required | Description |
|-------|----------|-------------|
| Problem Statement | Yes | One concise paragraph defining the core problem |
| Confidence | Yes | `High` / `Medium` / `Low` — based on evidence strength |
| Scope | Yes | What is in and out of scope for this problem |

### 2. Jobs-to-be-Done (JTBD) *(required)*

Structured JTBD framing grounded in research evidence.

**Primary JTBD:**

> When [situation], I want to [motivation], so I can [expected outcome].

| Field | Required | Description |
|-------|----------|-------------|
| Situation | Yes | The triggering context or circumstance |
| Motivation | Yes | What the user wants to accomplish |
| Expected Outcome | Yes | The desired end state |
| Functional Job | Yes | The practical task to be done |
| Emotional Job | No | How the user wants to feel |
| Social Job | No | How the user wants to be perceived |

**Related Jobs** *(optional)*: Additional JTBD statements that emerged from the research, following the same format.

### 3. Pains *(required)*

Prioritized list of pains synthesized from research evidence.

| Field | Required | Description |
|-------|----------|-------------|
| Pain Description | Yes | What the user struggles with |
| Priority | Yes | `High` / `Medium` / `Low` |
| Frequency | Yes | How often this pain is experienced |
| Intensity | Yes | How severely this pain affects the user |
| Evidence Sources | Yes | Which HC1 artifacts or data points support this pain |
| Current Coping | No | How users deal with this pain today |

### 4. Gains *(required)*

Prioritized list of desired gains synthesized from research evidence.

| Field | Required | Description |
|-------|----------|-------------|
| Gain Description | Yes | What outcome the user desires |
| Priority | Yes | `High` / `Medium` / `Low` |
| Expected Impact | Yes | How achieving this gain changes the user's situation |
| Evidence Sources | Yes | Which HC1 artifacts or data points support this gain |

### 5. Evidence Summary *(required)*

Traceability back to the research that grounded this problem definition.

| Field | Required | Description |
|-------|----------|-------------|
| Artifacts Analyzed | Yes | Count and list of input artifacts consumed |
| Total Evidence Points | Yes | Number of discrete evidence points synthesized |
| Convergence Assessment | Yes | How strongly the evidence points to a single problem |
| Contradictions | No | Any conflicting evidence and how it was resolved |
| Evidence Gaps | No | Areas where more research would strengthen the definition |

### 6. Assumptions *(required)*

Assumptions embedded in this problem definition that have not been fully validated.

| Field | Required | Description |
|-------|----------|-------------|
| Assumption | Yes | Statement of what is assumed to be true |
| Basis | Yes | Why this assumption seems reasonable given evidence |
| Risk if Wrong | Yes | What happens if this assumption is incorrect |
| Validation Status | Yes | `Validated` / `Partially Validated` / `Assumed` |

---

## Downstream Consumption

**Liam** (primary consumer) uses this artifact to:
- Ground hypothesis engineering in a validated problem definition
- Extract assumptions for testing and risk classification
- Use JTBD framing to generate hypotheses about solutions
- Reference pains and gains when designing expected outcomes and behavior changes

**Other consumers:** Any agent needing problem context (e.g., Emma for scope validation, Wade for experiment framing).
