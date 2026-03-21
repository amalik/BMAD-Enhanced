# GC2: Capabilities Manifest — Schema Definition

> **Contract:** GC2 | **Type:** Artifact | **Flow:** Atlas → Lens, Coach
>
> This schema defines the structure for the Capabilities Manifest produced by the model-generation workflow. The manifest contains contextual capabilities relevant to the detected stack — NOT source code, file contents, or secrets.

## Frontmatter Schema

```yaml
---
contract: GC2
type: artifact
source_agent: atlas
source_workflow: model-generation
target_agents: [lens, coach]
input_artifacts: [GC1]
created: YYYY-MM-DD
---
```

### Frontmatter Field Reference

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `contract` | Yes | string | Always `GC2` |
| `type` | Yes | string | Always `artifact` |
| `source_agent` | Yes | string | Always `atlas` |
| `source_workflow` | Yes | string | Always `model-generation` |
| `target_agents` | Yes | array | Agent IDs that consume this artifact: `[lens, coach]` |
| `input_artifacts` | Yes | array | `[GC1]` — requires Stack Profile |
| `created` | Yes | date | ISO date when artifact was created |

---

## Artifact Safety Rule

**GC2 must not contain source code, file contents, or secrets (NFR9).**

Capabilities describe WHAT should exist (categories, practices, standards) — not WHAT currently exists in the codebase. Evidence comparison is Lens's job (GC3), not Atlas's.

---

## Body Schema

The Capabilities Manifest is written to `.gyre/capabilities.yaml` with the following structure:

```yaml
gyre_manifest:
  version: string                 # manifest schema version, e.g., "1.0"
  generated_at: ISO-8601          # generation timestamp
  stack_summary: string           # one-line stack description from GC1
  capability_count: integer       # total number of capabilities (excluding removed)
  limited_coverage: boolean       # true if <20 capabilities generated
  capabilities:
    - id: string                  # kebab-case identifier, e.g., "health-check-liveness"
      category: string            # "observability" | "deployment" | "reliability" | "security"
      name: string                # human-readable name
      description: string         # 1-3 sentences: what it is + why it matters for THIS stack
      source: string              # "standard" | "practice" | "reasoning"
      relevance: string           # why this matters for THIS stack specifically
      amended: boolean            # true if user-modified via Coach review (GC4)
      removed: boolean            # true if user removed via Coach review (GC4)
  provenance:
    standards_referenced: string[]  # e.g., ["DORA", "OpenTelemetry", "Google PRR"]
    web_search_performed: boolean
    web_search_date: ISO-8601       # null if web search not performed
```

### Field Reference

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `version` | Yes | string | Schema version for future breaking changes (NFR17) |
| `generated_at` | Yes | string | ISO-8601 timestamp of generation |
| `stack_summary` | Yes | string | One-line description of detected stack |
| `capability_count` | Yes | integer | Total active capabilities (excluding removed) |
| `limited_coverage` | Yes | boolean | True if fewer than 20 capabilities generated |
| `capabilities` | Yes | array | List of capability objects |
| `capabilities[].id` | Yes | string | Unique kebab-case identifier |
| `capabilities[].category` | Yes | string | Domain category |
| `capabilities[].name` | Yes | string | Human-readable capability name |
| `capabilities[].description` | Yes | string | 1-3 sentence description with stack-specific context |
| `capabilities[].source` | Yes | string | Origin: "standard", "practice", or "reasoning" |
| `capabilities[].relevance` | Yes | string | Why this capability matters for this specific stack |
| `capabilities[].amended` | Yes | boolean | True if modified by user during Coach review |
| `capabilities[].removed` | Yes | boolean | True if removed by user during Coach review |
| `provenance` | Yes | object | Generation metadata |
| `provenance.standards_referenced` | Yes | array | Industry standards used |
| `provenance.web_search_performed` | Yes | boolean | Whether web search enrichment was done |
| `provenance.web_search_date` | No | string | ISO-8601 date of web search, null if not performed |

---

## Capability Categories

| Category | Description | Typical Count |
|----------|-------------|:------------:|
| `observability` | Logging, tracing, metrics, health checks, alerting | 6-10 |
| `deployment` | CI/CD, containers, orchestration, rollback, IaC | 5-8 |
| `reliability` | Graceful shutdown, circuit breakers, rate limiting, fault tolerance | 4-6 |
| `security` | Secrets management, vulnerability scanning, network policies, auth | 3-5 |

---

## Capability Sources

| Source | Meaning | Examples |
|--------|---------|---------|
| `standard` | Derived from a named industry framework | DORA metrics, OpenTelemetry SDK, Google PRR checklist |
| `practice` | Common industry practice found via web search or domain expertise | Structured logging with correlation IDs, multi-stage Docker builds |
| `reasoning` | Derived from stack analysis — Atlas inferred this is relevant | "gRPC health checking protocol" inferred from gRPC + Kubernetes stack |

---

## Artifact Location

- **Path:** `.gyre/capabilities.yaml` (relative to project root, or service root in monorepo)
- **Caching:** The manifest file IS the cache — re-runs load it, no regeneration unless explicit (NFR10)
- **Amendment persistence:** Coach writes amendments directly to this file via GC4

---

## Downstream Consumption

| Consumer | Purpose |
|----------|---------|
| **Lens** (readiness-analyst) | Compares each capability against filesystem evidence to identify absences — what's missing, not just what's misconfigured |
| **Coach** (review-coach) | Presents capabilities for user review — keep/remove/edit. Captures amendments written back via GC4 |

---

## Example

```yaml
---
contract: GC2
type: artifact
source_agent: atlas
source_workflow: model-generation
target_agents: [lens, coach]
input_artifacts: [GC1]
created: 2026-03-22
---

gyre_manifest:
  version: "1.0"
  generated_at: "2026-03-22T14:30:00Z"
  stack_summary: "Node.js Express web service on AWS EKS via GitHub Actions"
  capability_count: 24
  limited_coverage: false
  capabilities:
    - id: "structured-logging"
      category: "observability"
      name: "Structured JSON Logging"
      description: "Application logs in structured JSON format with correlation IDs for request tracing. Essential for EKS workloads where CloudWatch Logs Insights or Elasticsearch are used for log analysis."
      source: "standard"
      relevance: "Node.js services on EKS need structured logs for CloudWatch Logs Insights queries and cross-service correlation."
      amended: false
      removed: false
    - id: "health-check-liveness"
      category: "observability"
      name: "Kubernetes Liveness Probe"
      description: "HTTP endpoint (typically /healthz) that Kubernetes uses to detect stuck containers and restart them. Must check application responsiveness, not downstream dependencies."
      source: "standard"
      relevance: "EKS requires liveness probes to auto-heal unresponsive pods. Express apps need a lightweight /healthz endpoint."
      amended: false
      removed: false
  provenance:
    standards_referenced: ["DORA", "OpenTelemetry", "Google PRR"]
    web_search_performed: true
    web_search_date: "2026-03-22"
```

---

## Validation Rules

A valid GC2 artifact must:

1. Have all required frontmatter fields present and correctly typed
2. Have all required body fields present and non-empty
3. Contain NO source code, file contents, or secrets
4. Have `version` as a string (semantic version format)
5. Have each capability with all required fields present
6. Have `category` as one of: "observability", "deployment", "reliability", "security"
7. Have `source` as one of: "standard", "practice", "reasoning"
8. Have unique `id` values across all capabilities
9. Have `capability_count` matching the actual count of non-removed capabilities
10. Have `limited_coverage` set to true if capability_count < 20
