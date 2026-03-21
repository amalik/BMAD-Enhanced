# GC1: Stack Profile — Schema Definition

> **Contract:** GC1 | **Type:** Artifact | **Flow:** Scout → Atlas, Lens
>
> This schema defines the structure for the Stack Profile produced by the stack-detection workflow. The Stack Profile captures technology classifications — NOT file contents, paths, or secrets.

## Frontmatter Schema

```yaml
---
contract: GC1
type: artifact
source_agent: scout
source_workflow: stack-detection
target_agents: [atlas, lens]
input_artifacts: []
created: YYYY-MM-DD
---
```

### Frontmatter Field Reference

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `contract` | Yes | string | Always `GC1` |
| `type` | Yes | string | Always `artifact` |
| `source_agent` | Yes | string | Always `scout` |
| `source_workflow` | Yes | string | Always `stack-detection` |
| `target_agents` | Yes | array | Agent IDs that consume this artifact: `[atlas, lens]` |
| `input_artifacts` | Yes | array | Empty array `[]` — GC1 is the first contract in the Gyre chain |
| `created` | Yes | date | ISO date when artifact was created |

---

## Privacy Rule

**GC1 must contain technology categories and classifications only.**

It must NOT contain:
- File contents
- File paths
- Version numbers
- Dependency counts
- Dependency names
- Secrets, tokens, or credentials

This is the privacy boundary. Agents can read any file during detection, but the committed artifact carries only category-level metadata. Everything downstream of GC1 works with this metadata.

---

## Body Schema

The Stack Profile is written to `.gyre/stack-profile.yaml` with the following structure:

```yaml
stack_profile:
  primary_language: string        # e.g., "Go", "Node.js", "Python"
  primary_framework: string       # e.g., "Express", "Gin", "FastAPI"
  secondary_stacks: string[]      # e.g., ["Python sidecar"] — empty if single stack
  container_orchestration: string  # e.g., "Kubernetes", "ECS", "Docker Compose", "none"
  ci_cd_platform: string          # e.g., "GitHub Actions", "GitLab CI", "Jenkins"
  observability_tooling: string[] # e.g., ["OpenTelemetry", "Prometheus"]
  cloud_provider: string          # e.g., "AWS", "GCP", "Azure", "multi-cloud"
  communication_protocol: string  # e.g., "HTTP/REST", "gRPC", "message-queue"
  guard_answers:                  # only populated if guard questions were asked
    deployment_model: string      # "container-based" | "serverless" | "bare-metal"
    protocol: string              # confirmed communication protocol
    custom: object                # any additional guard answers
  detection_confidence: string    # "high" | "medium" | "low"
  detection_summary: string       # human-readable summary of what was found
```

### Field Reference

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `primary_language` | Yes | string | Primary programming language detected |
| `primary_framework` | Yes | string | Primary framework detected (or "none" if bare language) |
| `secondary_stacks` | Yes | array | Secondary stacks in monorepo. Empty array if single-stack project |
| `container_orchestration` | Yes | string | Container platform. "none" if no container usage detected |
| `ci_cd_platform` | Yes | string | CI/CD platform. "none" if no CI config detected |
| `observability_tooling` | Yes | array | Observability tools found. Empty array if none detected |
| `cloud_provider` | Yes | string | Cloud provider. "none" if no cloud indicators found |
| `communication_protocol` | Yes | string | Primary communication pattern |
| `guard_answers` | No | object | Present only if guard questions were asked. Contains confirmed answers |
| `guard_answers.deployment_model` | No | string | Confirmed deployment model from guard question |
| `guard_answers.protocol` | No | string | Confirmed communication protocol from guard question |
| `guard_answers.custom` | No | object | Additional guard answers not covered by standard fields |
| `detection_confidence` | Yes | string | Overall confidence: "high", "medium", or "low" |
| `detection_summary` | Yes | string | Human-readable 1-3 sentence summary of the detected stack |

---

## Artifact Location

- **Path:** `.gyre/stack-profile.yaml` (relative to project root, or service root in monorepo)
- **Directory creation:** `.gyre/` is created on first run if it doesn't exist (FR42)
- **Concurrency:** `.gyre/.lock` file prevents concurrent analysis (NFR13)
- **Atomicity:** Write to temp file first, then rename to final path

---

## Downstream Consumption

| Consumer | Purpose |
|----------|---------|
| **Atlas** (model-curator) | Uses stack classification to generate contextually relevant capabilities for model generation |
| **Lens** (readiness-analyst) | Uses stack classification for domain-specific analysis targeting — which directories to search, what patterns to match |

---

## Example

```yaml
---
contract: GC1
type: artifact
source_agent: scout
source_workflow: stack-detection
target_agents: [atlas, lens]
input_artifacts: []
created: 2026-03-22
---

stack_profile:
  primary_language: "Node.js"
  primary_framework: "Express"
  secondary_stacks: []
  container_orchestration: "Kubernetes"
  ci_cd_platform: "GitHub Actions"
  observability_tooling: ["OpenTelemetry", "Prometheus"]
  cloud_provider: "AWS"
  communication_protocol: "HTTP/REST"
  guard_answers:
    deployment_model: "container-based"
  detection_confidence: "high"
  detection_summary: "Node.js Express web service deployed on AWS EKS via GitHub Actions. Instrumented with OpenTelemetry and Prometheus. REST API."
```

---

## Validation Rules

A valid GC1 artifact must:

1. Have all required frontmatter fields present and correctly typed
2. Have all required body fields present and non-empty
3. Contain NO file paths, file contents, version numbers, dependency names, or secrets
4. Have `detection_confidence` as one of: "high", "medium", "low"
5. Have `guard_answers` present only if guard questions were actually asked
6. Have `secondary_stacks` as an array (empty if single-stack)
7. Have `observability_tooling` as an array (empty if none detected)
