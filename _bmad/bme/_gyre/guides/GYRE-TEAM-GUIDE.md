# The Gyre Deep Dive — Production Readiness Discovery

**Team:** Gyre Pattern (4 Agents, 7 Workflows, 4 Handoff Contracts)
**Module:** Convoke (bme)
**Version:** 1.0.0
**Last Updated:** 2026-04-05

---

## What This Guide Covers

The per-agent user guides tell you *how to use Scout, Atlas, Lens, and Coach individually*. This guide tells you *how the team works together* — the pipeline logic, what flows between agents, what good artifacts look like, how modes change the experience, and where teams get stuck.

If you've read the individual user guides, you're ready for this.

---

## The Gyre at a Glance

Gyre is a production readiness discovery system. It analyzes your codebase to find **what's missing before you ship** — not bugs, not code quality, but absence. Missing health checks. Missing rollback strategies. Missing observability that would have caught last week's outage.

```
  Scout 🔎        Atlas 📐         Lens 🔬         Coach 🏋️
   Detect    →     Model     →    Analyze    →    Review
  (stack)       (capabilities)   (absences)     (feedback)
                     ▲                              │
                     └──────── GC4 feedback ────────┘
```

**The big idea:** You can't find what's missing unless you first know what *should* exist. Scout identifies your stack. Atlas generates a capabilities model tailored to that stack. Lens compares the model against your codebase and reports absences. Coach helps you review, customize, and improve the model over time.

---

## How to Read This Guide

This guide is organized around five layers:

1. **The Pipeline** — How artifacts flow from one agent to the next
2. **Walkthrough: A Complete Gyre Analysis** — Step-by-step through a realistic scenario
3. **Artifact Examples** — What good output looks like at each stage
4. **Scenarios & Entry Points** — Where to start depending on your situation
5. **Anti-Patterns** — Where teams go wrong and how to avoid it

---

## Part 1: The Pipeline

### Forward Flow (GC1-GC3)

The core pipeline moves artifacts forward through three handoff contracts:

| Contract | From | To | What Flows | In Plain English |
|----------|------|-----|-----------|------------------|
| **GC1** | Scout 🔎 | Atlas 📐, Lens 🔬 | Stack Profile — technology categories, archetype, confidence | "Here's what your project is built with" |
| **GC2** | Atlas 📐 | Lens 🔬, Coach 🏋️ | Capabilities Manifest — 20+ capabilities relevant to this stack | "Here's what a project like yours should have" |
| **GC3** | Lens 🔬 | Coach 🏋️ | Findings Report — absences with severity, confidence, evidence | "Here's what's missing, ranked by how much it matters" |

### Feedback Loop (GC4)

| Contract | From | To | What Flows | In Plain English |
|----------|------|-----|-----------|------------------|
| **GC4** | Coach 🏋️ | Atlas 📐 | Amendment flags + missed-gap feedback | "The user corrected the model — respect these changes next time" |

### The Privacy Boundary

A critical design principle: **artifacts contain categories, not contents.**

- GC1 (Stack Profile) records "Node.js, Express, Kubernetes" — never file paths, version numbers, or dependency names
- GC2 (Capabilities Manifest) records what *should* exist — never what *does* exist
- GC3 (Findings Report) records what's *absent* with evidence summaries — never source code

This means `.gyre/` artifacts are safe to commit to your repo. The model is shareable.

---

## Part 2: Walkthrough — A Complete Gyre Analysis

Let's walk through analyzing a Node.js Express API deployed on AWS EKS via GitHub Actions. Your team is preparing for the first production launch and wants to know what you're missing.

### Stage 1: Scout — Detect the Stack

**What you do:** Invoke Scout and run **[FA] Full Analysis** (recommended for first time) or **[DS] Detect Stack** (standalone detection).

Scout scans your project filesystem looking for technology indicators:

| What Scout Looks For | Files Examined |
|---------------------|---------------|
| Primary language/framework | `package.json`, `go.mod`, `requirements.txt`, `Cargo.toml`, `pom.xml` |
| Container orchestration | `Dockerfile`, `docker-compose.yaml`, Kubernetes manifests, ECS task definitions |
| CI/CD platform | `.github/workflows/`, `.gitlab-ci.yml`, `Jenkinsfile` |
| Observability tooling | OpenTelemetry configs, Prometheus configs, Datadog agent configs |
| Cloud provider | Terraform files, CloudFormation templates, Pulumi programs |
| Communication protocols | gRPC protos, REST controllers, message queue configs |

**Guard questions:** After detection, Scout asks up to 3 targeted questions to resolve ambiguities. These aren't a generic questionnaire — they're derived from what Scout *couldn't* determine from the filesystem alone.

Example guard questions for our scenario:
- "I found both a Dockerfile and Kubernetes manifests. Is this container-based deployment or do you also use serverless?" → *container-based*
- "I see Express routes but no gRPC protos. Is HTTP/REST your primary communication protocol?" → *yes*

**Monorepo handling:** If Scout detects multiple service boundaries (e.g., `/api/`, `/worker/`, `/frontend/`), it asks you to select which service to analyze. Each service gets its own `.gyre/` directory.

**What you get (GC1):**

```yaml
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
  detection_summary: "Node.js Express web service deployed on AWS EKS
    via GitHub Actions. Instrumented with OpenTelemetry and Prometheus.
    REST API."
```

### Stage 2: Atlas — Generate the Capabilities Model

**What you do:** In Full Analysis mode, Atlas runs automatically after Scout. Standalone: invoke Atlas and run **[GM] Generate Model**.

Atlas loads the GC1 Stack Profile and generates a capabilities manifest — a list of everything a production-grade project *like yours* should have. Atlas draws from:

- **Industry standards:** DORA metrics, OpenTelemetry, Google PRR checklist
- **Web search:** Current best practices for your specific stack combination
- **Contextual reasoning:** Inferences from your stack profile (e.g., "gRPC + Kubernetes = gRPC health checking protocol is relevant")

**What matters here:** Atlas generates capabilities across four domains:

| Domain | What It Covers | Typical Count |
|--------|---------------|:------------:|
| **Observability** | Logging, tracing, metrics, health checks, alerting | 6-10 |
| **Deployment** | CI/CD, containers, orchestration, rollback, IaC | 5-8 |
| **Reliability** | Graceful shutdown, circuit breakers, rate limiting, fault tolerance | 4-6 |
| **Security** | Secrets management, vulnerability scanning, network policies, auth | 3-5 |

Each capability has a `source` tag explaining where it came from:

| Source | Meaning | Example |
|--------|---------|---------|
| `standard` | From a named industry framework | "Kubernetes liveness probe" from Google PRR |
| `practice` | Common industry practice | "Multi-stage Docker builds" |
| `reasoning` | Atlas inferred this from your stack | "gRPC health checking protocol" inferred from gRPC + Kubernetes |

**The 20-capability threshold:** Atlas aims for 20+ capabilities. If it generates fewer, it sets `limited_coverage: true` in the manifest and warns you. This typically happens with unusual or niche stacks where fewer established practices exist.

**What you get (GC2):** A capabilities manifest at `.gyre/capabilities.yaml` with 20-30 capabilities, each explaining what it is, why it matters for *your specific stack*, and where the recommendation came from.

### Stage 3: Lens — Find What's Missing

**What you do:** In Full Analysis, Lens runs automatically. Standalone: invoke Lens and run **[AG] Analyze Gaps**.

Lens loads the GC2 Capabilities Manifest and systematically checks each capability against your actual codebase. For each capability, Lens:

1. **Searches for evidence** using Glob (file patterns), Grep (content patterns), and Read (config inspection)
2. **Classifies the result:** present (evidence found), absent (no evidence), or partial (config exists but incomplete)
3. **Tags each finding** with source, confidence, and severity

**The two finding sources:**

| Source | Meaning | Example |
|--------|---------|---------|
| `static-analysis` | File-level evidence (found or absent) | "Grep for 'healthz', 'liveness': no matches" |
| `contextual-model` | Inferred from the capabilities manifest | "No explicit rollback strategy detected" |

**Severity levels:**

| Severity | Meaning | Example |
|----------|---------|---------|
| `blocker` | Must fix before production | No Kubernetes liveness probe on EKS |
| `recommended` | Should fix, significant risk reduction | No rollback mechanism in deployment config |
| `nice-to-have` | Good practice, low risk if absent | Custom Prometheus metrics dashboard |

**Cross-domain correlation — the compound findings:**

This is where Gyre gets interesting. After analyzing each domain independently, Lens looks for *compound patterns* — two absences from different domains that amplify each other's risk.

Example: "No health checks" (observability) + "No rollback strategy" (deployment) = **unrecoverable deployment failure risk**. Neither finding alone is catastrophic, but together they mean a bad deployment goes undetected AND can't be reversed.

**Sanity check:** Lens runs a sanity check on its own findings. If more than 80% of capabilities are flagged as absent, something is probably wrong with the model (not the project). Lens warns you and suggests reviewing the capabilities manifest with Coach.

**What you get (GC3):** A findings report at `.gyre/findings.yaml` with:
- Individual findings sorted by severity (blockers first)
- Compound findings that reveal cross-domain risk amplification
- Evidence summaries explaining what was searched and what was found/absent
- A summary with counts: X blockers, Y recommended, Z nice-to-have

### Stage 4: Coach — Review and Customize

**What you do:** In Full Analysis, Coach runs as the final stage. Standalone: invoke Coach and run **[RF] Review Findings** or **[RM] Review Model**.

Coach walks you through two review activities:

**Findings Review:** Coach presents each finding severity-first (blockers, then recommended, then nice-to-have) and asks for your assessment. You know your stack better than any model — a "blocker" might be handled by a system Coach can't see, or a "nice-to-have" might be critical for your compliance requirements.

**Model Review:** Coach walks you through each capability and asks: keep, remove, edit, or skip? Your amendments are written directly to `capabilities.yaml` with flags:

| Action | What Happens | Persistence |
|--------|-------------|-------------|
| **Keep** | Capability stays as-is | Default state |
| **Remove** | `removed: true` flag added | Persists across regeneration — Atlas will never re-add it |
| **Edit** | `amended: true` flag + original values preserved | Persists across regeneration — Atlas preserves your edits |
| **Add** | New capability with `source: "user-added"` | Persists across regeneration |

**Missed-gap feedback:** After review, Coach asks: "Did Gyre miss anything you know about?" Your answers go into `.gyre/feedback.yaml` and inform Atlas on the next regeneration.

**The commit workflow:** Coach explains that committing `.gyre/` artifacts shares the model with your team. Amendments and feedback improve the model for everyone — it's a collaborative knowledge base.

---

## Part 3: Artifact Examples

### Stack Profile (Scout's GC1 Output)

```yaml
---
contract: GC1
type: artifact
source_agent: scout
source_workflow: stack-detection
target_agents: [atlas, lens]
input_artifacts: []
created: 2026-04-05
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
  detection_summary: "Node.js Express web service deployed on AWS EKS
    via GitHub Actions. Instrumented with OpenTelemetry and Prometheus.
    REST API."
```

Notice what's NOT here: no file paths, no version numbers, no dependency names. Just technology categories.

### Capabilities Manifest (Atlas's GC2 Output — Excerpt)

```yaml
gyre_manifest:
  version: "1.0"
  generated_at: "2026-04-05T14:30:00Z"
  stack_summary: "Node.js Express web service on AWS EKS via GitHub Actions"
  capability_count: 24
  limited_coverage: false
  capabilities:
    - id: "structured-logging"
      category: "observability"
      name: "Structured JSON Logging"
      description: "Application logs in structured JSON format with
        correlation IDs for request tracing. Essential for EKS workloads
        where CloudWatch Logs Insights is used for analysis."
      source: "standard"
      relevance: "Node.js services on EKS need structured logs for
        CloudWatch Logs Insights queries and cross-service correlation."
      amended: false
      removed: false

    - id: "health-check-liveness"
      category: "observability"
      name: "Kubernetes Liveness Probe"
      description: "HTTP endpoint (typically /healthz) that Kubernetes
        uses to detect stuck containers and restart them."
      source: "standard"
      relevance: "EKS requires liveness probes to auto-heal unresponsive
        pods. Express apps need a lightweight /healthz endpoint."
      amended: false
      removed: false

    - id: "graceful-shutdown"
      category: "reliability"
      name: "Graceful Shutdown Handler"
      description: "Process handles SIGTERM by draining connections,
        completing in-flight requests, and closing DB pools before exit."
      source: "practice"
      relevance: "Kubernetes sends SIGTERM before killing pods. Without
        graceful shutdown, active requests are dropped mid-response."
      amended: false
      removed: false
  provenance:
    standards_referenced: ["DORA", "OpenTelemetry", "Google PRR"]
    web_search_performed: true
    web_search_date: "2026-04-05"
```

Each capability explains *why it matters for your specific stack* — not just what it is in general.

### Findings Report (Lens's GC3 Output — Excerpt)

```yaml
gyre_findings:
  version: "1.0"
  analyzed_at: "2026-04-05T15:00:00Z"
  mode: "crisis"
  stack_summary: "Node.js Express web service on AWS EKS via GitHub Actions"
  summary:
    blockers: 2
    recommended: 5
    nice_to_have: 3
    total: 10
    novelty_ratio: "7 of 10 contextual"
  findings:
    - id: "OBS-001"
      domain: "observability"
      severity: "blocker"
      source: "static-analysis"
      confidence: "high"
      capability_ref: "health-check-liveness"
      description: "No Kubernetes liveness probe detected. EKS pods will
        not be auto-healed when unresponsive."
      evidence_summary: "Glob for **/health*, **/liveness*: no files found.
        Grep for 'healthz', 'liveness': no matches in source files. No
        HEALTHCHECK in Dockerfile."
      severity_rationale: "EKS requires liveness probes for auto-healing.
        Without them, stuck pods persist until manual intervention."
    - id: "DEP-003"
      domain: "deployment"
      severity: "recommended"
      source: "static-analysis"
      confidence: "medium"
      capability_ref: "rollback-strategy"
      description: "No rollback mechanism detected in deployment config."
      evidence_summary: "Grep for 'rollback', 'revision', 'undo' in k8s/
        and .github/workflows/: no matches."
      severity_rationale: "Rolling updates without explicit rollback
        increase recovery time from failed deployments."
  compound_findings:
    - id: "COMPOUND-001"
      domain: "cross-domain"
      severity: "blocker"
      source: "contextual-model"
      confidence: "high"
      capability_ref: ["health-check-liveness", "rollback-strategy"]
      description: "No health checks combined with no rollback creates
        unrecoverable deployment failure risk."
      evidence_summary: "Combines OBS-001 (no liveness probe) with DEP-003
        (no rollback). Failed deployments cannot be detected by K8s and
        cannot be reversed."
      related_findings: ["OBS-001", "DEP-003"]
      combined_impact: "Without liveness probes, K8s cannot detect that a
        new deployment is unhealthy. Without rollback, the failed deployment
        persists. Together: a bad deploy goes undetected and unrecoverable
        until manual intervention."
  sanity_check:
    passed: true
    warnings: []
```

The `novelty_ratio` ("7 of 10 contextual") tells you how many findings come from the contextual model vs. generic static analysis. A high contextual ratio means Gyre is earning its keep — it's not just running a linter.

---

## Part 4: Scenarios & Entry Points

### "First time running Gyre on this project"

**Start with:** Scout 🔎 → **[FA] Full Analysis**
**What happens:** The full pipeline runs end-to-end (Scout → Atlas → Lens → Coach). Gyre detects *Crisis mode* (no `.gyre/` directory exists) and runs everything from scratch.

This is the recommended starting point. You get a complete picture in one session.

### "I ran Gyre before and want to check progress"

**Start with:** Scout 🔎 → **[FA] Full Analysis** or Lens 🔬 → **[AG] Analyze Gaps**
**What happens:** Gyre detects *Anticipation mode* (`.gyre/` exists). Model generation is skipped (the capabilities manifest serves as cache). Only gap analysis and review run — faster and focused on what changed.

### "I want to regenerate the model from scratch"

**Start with:** Atlas 📐 → **[GM] Generate Model** in *Regeneration mode*
**What happens:** Fresh model generation replaces the cached manifest. Atlas still respects your GC4 amendments — removed capabilities stay removed, edited capabilities persist.

### "I changed my stack significantly"

**Start with:** Scout 🔎 → **[DS] Detect Stack**
**What happens:** Scout re-scans and produces a new GC1 Stack Profile. Then run Atlas → Lens → Coach to get updated findings.

Use this after adding Kubernetes, switching CI providers, adopting a new observability stack, or any major infrastructure change.

### "I just want to review and customize the model"

**Start with:** Coach 🏋️ → **[RM] Review Model**
**What happens:** Coach loads the existing capabilities manifest and walks you through it. Keep, remove, edit, or add capabilities. Your changes persist across future Gyre runs.

### "I want to see what changed since last analysis"

**Start with:** Lens 🔬 → **[DR] Delta Report**
**What happens:** Lens compares the current findings against `.gyre/findings.previous.yaml` and shows you what's new, what's resolved, and what changed severity.

---

## Part 5: Anti-Patterns

### 1. "Running Gyre Without Reading the Findings"

**The mistake:** Running Full Analysis, seeing "2 blockers, 5 recommended, 3 nice-to-have," and moving on without reviewing with Coach.

**Why it fails:** Gyre's model is a hypothesis about what your stack needs. Without Coach's review, you're trusting the model blindly. The model might flag something your team intentionally omitted, or miss something only you know about.

**The fix:** Always run Coach's review after analysis. It takes 10-15 minutes and dramatically improves model accuracy for future runs. Your amendments persist — this is an investment, not a chore.

### 2. "Treating Severity as Absolute"

**The mistake:** Treating every "blocker" as a launch-blocking issue and every "nice-to-have" as ignorable.

**Why it fails:** Severity is contextual. A "blocker" finding about missing Kubernetes liveness probes is irrelevant if you're deploying to Lambda. A "nice-to-have" finding about structured logging becomes critical if you're under a compliance audit.

**The fix:** Use Coach's review to adjust severity based on your context. Lens assigns severity based on general best practices; you assign severity based on your reality.

### 3. "Ignoring Compound Findings"

**The mistake:** Reading individual findings one by one and missing the compound patterns.

**Why it fails:** Individual findings tell you what's absent. Compound findings tell you what's *dangerous* — they surface risk amplification that single-domain analysis can't see. "No health checks" is a problem. "No health checks AND no rollback" is a crisis.

**The fix:** Read compound findings first. They're the highest-signal items in the report because they represent the intersection of two weaknesses.

### 4. "Deleting `.gyre/` to Start Over"

**The mistake:** Deleting the `.gyre/` directory every time you want a fresh analysis.

**Why it fails:** `.gyre/` contains your amendments (GC4). Deleting it throws away every keep/remove/edit decision you made during Coach review. Gyre has to start from zero.

**The fix:** If you want a fresh model, use Atlas's Regeneration mode. It rebuilds the model while respecting your amendments. If you truly need to start from scratch (e.g., wrong project), then deletion is appropriate — but know what you're losing.

### 5. "Using Gyre as a Linter"

**The mistake:** Expecting Gyre to find code quality issues, bugs, or style violations.

**Why it fails:** Gyre does *absence detection*, not code analysis. It finds what's missing (no health check endpoint), not what's wrong (health check endpoint returns 200 when database is down). These are complementary but different tools.

**The fix:** Use Gyre for production readiness gaps. Use linters, SAST tools, and code review for code quality. Gyre answers "are we ready to ship?" not "is our code good?"

### 6. "Not Committing `.gyre/` Artifacts"

**The mistake:** Adding `.gyre/` to `.gitignore` or never committing the artifacts.

**Why it fails:** Gyre artifacts are designed to be shared. When one team member reviews and customizes the model (amendments + feedback), those improvements benefit everyone. Without committing, each team member starts from scratch.

**The fix:** Commit `.gyre/` to your repo. The privacy boundary ensures no sensitive data is included. Model amendments and feedback become shared team knowledge.

### 7. "Skipping Guard Questions"

**The mistake:** Rushing through Scout's guard questions with default answers.

**Why it fails:** Guard answers flow downstream to Atlas and Lens. If you tell Scout your deployment model is "container-based" when it's actually serverless, Atlas generates irrelevant capabilities (Kubernetes probes for a Lambda function) and Lens searches for things that don't apply.

**The fix:** Answer guard questions accurately. They're asked because Scout genuinely couldn't determine the answer from the filesystem. Your 30 seconds of accuracy save 30 minutes of irrelevant findings.

---

## Gyre + Vortex: Inter-Module Routing

Gyre findings can feed into Vortex product discovery when readiness gaps have strategic implications:

| If Gyre Finds... | Consider in Vortex... | Agent | Why |
|---|---|---|---|
| Critical readiness gaps blocking launch | Product Vision or Contextualize Scope | Emma 🎯 | Readiness gaps may redefine product scope |
| Findings that challenge assumptions | Hypothesis Engineering | Liam 💡 | Readiness findings are testable hypotheses |
| Feedback suggesting missing capabilities | User Interview | Isla 🔍 | Validate missed gaps with real users |

This routing is advisory — you decide whether a Gyre finding warrants Vortex action.

---

## Quick Reference: Agent Cheat Sheet

| Agent | Stream | Core Question | Primary Workflows | Key Output |
|-------|--------|--------------|-------------------|------------|
| Scout 🔎 | Detect | What's this project built with? | Stack Detection, Full Analysis | GC1 Stack Profile |
| Atlas 📐 | Model | What should a project like this have? | Model Generation, Accuracy Validation | GC2 Capabilities Manifest |
| Lens 🔬 | Analyze | What's missing? | Gap Analysis, Delta Report | GC3 Findings Report |
| Coach 🏋️ | Review | Is the model right for *our* stack? | Model Review (findings + capabilities) | GC4 Amendments + Feedback |

## Three Modes of Operation

| Mode | Trigger | What Runs | When to Use |
|------|---------|-----------|-------------|
| **Crisis** | No `.gyre/` directory | Full pipeline from scratch | First run on a project |
| **Anticipation** | `.gyre/` exists | Gap analysis + review only (model cached) | Routine check-ins |
| **Regeneration** | Explicit user request | Fresh model generation + full pipeline | After stack changes or when model feels stale |

---

## Further Reading

- **Per-agent guides:** See `SCOUT-USER-GUIDE.md` through `COACH-USER-GUIDE.md` in this directory for invocation details, menu options, and troubleshooting
- **Compass Routing Reference:** `_bmad/bme/_gyre/compass-routing-reference.md` — the authoritative routing table
- **Handoff Contract Schemas:** `_bmad/bme/_gyre/contracts/` — the exact artifact formats
- **`.gyre/` directory:** Your project's artifacts — safe to commit, designed to be shared

---

*Gyre doesn't tell you what's wrong with your code. It tells you what's missing from your operations — and gives you the model to track it.*
