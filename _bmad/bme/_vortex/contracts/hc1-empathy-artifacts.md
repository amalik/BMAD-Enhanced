# HC1: Empathy Artifacts — Schema Definition

> **Contract:** HC1 | **Type:** Artifact | **Flow:** Isla → Mila
>
> This schema defines the structure for empathy artifacts produced during discovery research. Any agent or user can produce a compliant artifact — the schema is not coupled to a specific producer.

## Frontmatter Schema

```yaml
---
contract: HC1
type: artifact
source_agent: isla                          # or any producing agent/user
source_workflow: user-interview             # workflow that produced this artifact
target_agents: [mila]                       # primary consumer(s)
input_artifacts: []                         # populated with upstream artifact references
created: YYYY-MM-DD
---
```

### Frontmatter Field Reference

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `contract` | Yes | string | Always `HC1` |
| `type` | Yes | string | Always `artifact` |
| `source_agent` | Yes | string | Agent ID that produced this artifact (e.g., `isla`) |
| `source_workflow` | Yes | string | Workflow name that produced this artifact (e.g., `user-interview`, `user-discovery`, `empathy-map`) |
| `target_agents` | Yes | array | Agent IDs that consume this artifact (e.g., `[mila]`) |
| `input_artifacts` | Yes | array | References to upstream artifacts used as input; empty array `[]` if none |
| `created` | Yes | date | ISO date when artifact was created |

### input_artifacts Entry Format

HC1 is the first contract in the Vortex chain — it typically has no upstream HC artifact. The field is an empty array `[]` for first-in-chain artifacts, or references non-HC source material:

```yaml
# First in chain — no upstream HC artifact
input_artifacts: []

# Or referencing non-HC source material (e.g., user-provided research)
input_artifacts:
  - path: "_bmad-output/vortex-artifacts/prior-research-summary.md"
    contract: null
```

---

## Body Structure

### 1. Executive Summary *(required)*

Brief overview of discovery research conducted: research question, participant/data count, top 3 insights, and recommended next steps.

### 2. Research Context *(required)*

| Field | Required | Description |
|-------|----------|-------------|
| Research Goal | Yes | Primary question or objective driving the research |
| Methods Used | Yes | Research methods employed (interviews, observation, surveys, etc.) |
| Participant/Data Summary | Yes | Number of participants, segments, duration, or data sources |
| Scope & Boundaries | No | What was in/out of scope for this research |

### 3. Synthesized Insights *(required)*

One or more insights in structured format. This is the primary value of the artifact.

**Per insight:**

| Field | Required | Description |
|-------|----------|-------------|
| Insight Statement | Yes | Structured as: `[User segment] [behavior/belief] because [underlying motivation], which means [implication]` |
| Strength | Yes | `Strong` / `Moderate` / `Emerging` |
| Evidence Count | Yes | N of total participants/sources supporting this insight |
| Supporting Evidence | Yes | Specific findings, quotes, or observations |
| Counter-Evidence | No | Contradicting findings or outliers |
| Confidence | Yes | `High` / `Medium` / `Low` |

### 4. Key Themes *(required)*

Cross-cutting patterns identified across research data.

**Per theme:**

| Field | Required | Description |
|-------|----------|-------------|
| Theme Name | Yes | Concise label for the pattern |
| Pattern Description | Yes | What was observed consistently |
| Evidence | Yes | Supporting data points |
| Implication | Yes | What this means for the problem space |

### 5. Pain Points *(required)*

Prioritized list of user pain points discovered during research.

| Field | Required | Description |
|-------|----------|-------------|
| Pain Point | Yes | Description of the pain |
| Priority | Yes | `High` / `Medium` / `Low` |
| Evidence | Yes | How this was observed or reported |
| Current Workaround | No | How users cope today |

### 6. Desired Gains *(required)*

Prioritized list of desired outcomes users seek.

| Field | Required | Description |
|-------|----------|-------------|
| Gain | Yes | Description of the desired outcome |
| Priority | Yes | `High` / `Medium` / `Low` |
| Evidence | Yes | How this was expressed or observed |

### 7. Empathy Map *(optional)*

When empathy mapping was conducted, include the quadrant data:

| Field | Required | Description |
|-------|----------|-------------|
| Says | Yes | Direct quotes from users |
| Thinks | Yes | Inferred thoughts and beliefs |
| Does | Yes | Observable actions and behaviors |
| Feels | Yes | Emotional states identified |

### 8. Recommendations *(required)*

| Field | Required | Description |
|-------|----------|-------------|
| Immediate Actions | Yes | What should happen next based on findings |
| Further Research Needed | No | Gaps that need additional investigation |
| Validated Assumptions | No | Assumptions confirmed by this research |
| Invalidated Assumptions | No | Assumptions disproven by this research |
| New Questions Raised | No | Questions that emerged from the research |

### 9. Research Quality Assessment *(optional)*

| Field | Required | Description |
|-------|----------|-------------|
| Sample Quality | No | Assessment of participant/data representativeness |
| Confidence Level | No | Overall confidence in findings |
| Known Limitations | No | Methodological or scope limitations |

---

## Downstream Consumption

**Mila** (primary consumer) uses this artifact to:
- Extract pain points and gains for Pains & Gains analysis
- Ground JTBD framing in research evidence
- Synthesize multiple HC1 artifacts into a single converged problem definition (HC2)
- Identify patterns across multiple research streams

**Other consumers:** Any agent needing empathy context (e.g., Emma for recontextualization, Liam for assumption validation).
