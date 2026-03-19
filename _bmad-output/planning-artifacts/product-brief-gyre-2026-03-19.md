---
stepsCompleted: [1, 2]
inputDocuments:
  - _bmad-output/planning-artifacts/research/domain-operational-readiness-research-2026-03-19.md
  - _bmad-output/planning-artifacts/initiatives-backlog.md
date: 2026-03-19
author: Amalik
---

# Product Brief: Gyre — Operational Readiness Team

## Executive Summary

Gyre is the second Convoke team — an operational readiness module that discovers the production readiness gaps your team doesn't know exist, then produces the artifacts to close them. Where Vortex covers product discovery and BMM handles implementation, Gyre closes the final gap: the transition from "built" to "runs reliably at scale" across observability, deployment, compliance, security, cost, and infrastructure.

AI agents across five readiness domains (Observability, Deployment, Compliance & Security, Capacity & FinOps) lead teams through a context-aware, architecture-specific discovery cycle. Gyre asks before it advises — understanding your stack, traffic patterns, regulatory context, and failure modes before recommending what "ready" means for your product. The discovery protocol itself is the IP.

Gyre's output is code, not counsel: SLO definitions, observability-as-code configs, policy-as-code definitions, runbook templates, IaC verification results, and a stakeholder-facing launch readiness dashboard — all version-controllable artifacts that live in your repo. No current product offers this combination of unknown-unknowns discovery, context-awareness, and artifact-first output.

---

## Core Vision

### Problem Statement

Software teams don't know what they don't know about production readiness. The core failure isn't a lack of expertise — SRE books, DORA research, and compliance frameworks exist. The failure is that teams cannot map existing knowledge to their specific product context, leaving critical readiness gaps invisible until they cause incidents.

98% of engineering leaders report major fallout from launching services that aren't adequately prepared. The problem spans the full industrialization landscape — and teams consistently underestimate its scope:

- **Observability gaps** — Teams don't know what to monitor or how to structure alerts (OpenTelemetry, golden signals)
- **Deployment fragility** — CI/CD pipelines, IaC (Terraform, Kubernetes), and rollback strategies are untested or ad-hoc
- **Compliance blind spots** — Regulations (GDPR, EU AI Act, SOC 2) apply but teams don't know which or how to operationalize them
- **Security debt** — DevSecOps, supply chain security (SLSA/SBOM), and security-by-design are skipped under delivery pressure
- **Cost surprises** — No FinOps strategy, no cloud cost guardrails, no capacity planning
- **No structured process** — 66% of leaders cite inconsistent standards across teams as their top blocker

### Problem Impact

- **Revenue loss:** Outages, scale failures, and security breaches directly impact the bottom line
- **Wasted effort:** Teams either over-comply (burning resources on irrelevant controls) or under-comply (risking penalties and incidents)
- **Broken lifecycle:** Product discovery (Vortex) and build (BMM) deliver validated, implemented products — but without production readiness, the value never reaches users at scale
- **Team burnout:** Ad-hoc operational work creates firefighting culture, on-call fatigue, and attrition
- **Leadership blind spot:** PMs and executives have no structured way to assess "when can we go live?" — they rely on engineering estimates with no visibility into actual readiness

### Why Existing Solutions Fall Short

| Solution Type | What It Does | What It Misses |
|--------------|-------------|----------------|
| **Checklists** (Google PRR, AWS ORR) | Static verification gates | Not adaptive — same checklist regardless of product. Requires SRE expertise to conduct. |
| **IDPs** (Cortex, Backstage, OpsLevel) | Measure readiness via scorecards | Measure "how ready are we?" but not "what does ready look like for us?" |
| **AI SRE tools** (Resolve AI, Ciroos) | Autonomous incident response | Reactive — handle incidents after they happen, not readiness before launch |
| **Consulting** | Human-guided assessments | Doesn't scale. Expensive. Knowledge walks out the door. |
| **Frameworks** (DORA, SPACE, SRE books) | Define what to measure | Don't guide teams through achieving it. Assume expertise the team may not have. |

### Proposed Solution

Gyre is a Convoke team module (installed alongside Vortex) that **discovers readiness gaps your team doesn't know exist, then produces the artifacts to close them**. Code, not counsel. Gyre asks before it advises — understanding your architecture, stack, traffic patterns, regulatory context, and failure modes before recommending what readiness means for *your* product. The discovery protocol itself is the product: the questions Gyre asks are as valuable as the answers it generates.

**Gyre Readiness Agents**

| Agent | Scope | Key Standards |
|-------|-------|---------------|
| **Observability Readiness** | Telemetry strategy, golden signals, alert design, SLO/error budget definition, monitoring architecture, observability-as-code (declarative alert configs, dashboard-as-code templates) | OpenTelemetry, DORA metrics, SRE golden signals |
| **Deployment Readiness** | CI/CD pipeline verification, IaC review (Terraform/Kubernetes), GitOps practices, rollback testing, canary/blue-green, golden path compliance | DORA deployment frequency, CNCF standards |
| **Compliance & Security Readiness** | Regulation discovery, control mapping, supply chain security (SLSA/SBOM), DevSecOps baseline, policy-as-code generation (OPA/Kyverno), security-by-design review, threat modeling, hardening, vulnerability management | GDPR, SOC 2, EU AI Act, PCI-DSS, SLSA, OWASP, CIS benchmarks |
| **Capacity & FinOps Readiness** | Load testing, scaling strategy, cloud cost engineering, cost guardrails, capacity planning | FinOps Foundation, AWS Well-Architected Cost pillar |

**The 7-Stream Cycle adapted for Gyre:**

1. **Contextualize** — Understand the product's operational landscape: architecture, dependencies, traffic patterns, regulatory context, infrastructure choices
2. **Empathize** — Understand operator/SRE needs, on-call pain, end-user reliability expectations, PM/leadership visibility needs
3. **Synthesize** — Map readiness gaps across observability, deployment, compliance, security, and cost. Cross-reference against applicable standards.
4. **Hypothesize** — Define readiness criteria: SLOs, error budgets, deployment frequency targets, compliance gates, cost thresholds
5. **Externalize** — Test readiness: chaos engineering, load testing, failover drills, rollback verification, security scans, cost projections
6. **Sensitize** — Monitor readiness in production: DORA metrics, SLO burn rate, incident frequency, compliance drift, cost anomalies
7. **Systematize** — Encode learnings: update runbooks, refine alerts, adjust SLOs, feed criteria into IDP scorecards, generate stakeholder reports

**Onboarding Pattern — Self-Assessment Delta:**

Gyre's entry point is a team self-assessment: "How ready do you think you are?" per domain. Gyre then runs its discovery and reveals the delta — the gaps the team rated as "green" but aren't. This delta *is* the value demonstration: teams immediately see what they didn't know they didn't know.

**Gyre Output Artifacts:**

| Artifact | Audience | Purpose |
|----------|----------|---------|
| **Readiness Report & Dashboard** | Engineering + PM/Leadership | Comprehensive gap analysis with prioritized action items (engineering view) and domain-level readiness status with blockers and timeline (leadership view). Single artifact, dual rendering. |
| **SLO Definitions** | SRE / Engineering | Service-level objectives with error budgets, calibrated to product context |
| **Compliance Checklist** | Engineering + Legal | Applicable regulations mapped to required operational controls |
| **Policy-as-Code Definitions** | Platform / DevOps | OPA/Kyverno policies generated from discovered compliance & security requirements |
| **Observability-as-Code Configs** | Platform / DevOps | Declarative alert definitions, dashboard templates, SLO burn rate monitors |
| **IaC Verification Results** | Platform / DevOps | Infrastructure-as-code review against golden path standards |

### Key Differentiators

1. **Context-aware discovery** — Gyre asks about your architecture, stack, and context before advising. No generic checklists — readiness criteria tailored to *your* product.
2. **Cross-domain gap correlation** — Gyre connects findings across domains: "Your CI/CD has no rollback telemetry + your observability has no deployment markers = blind rollbacks." Single-domain tools can't see these compound risks.
3. **Self-assessment delta** — Teams rate their own readiness first. Gyre reveals the gaps they missed. The delta between perception and reality is the most compelling proof of value.
4. **Completes the lifecycle** — Post-it → validated idea (Vortex) → built product (BMM) → production at scale (Gyre). One platform, full journey.
5. **Expertise made addressable** — Doesn't replace SRE knowledge — makes Google PRR, AWS ORR, and DORA expertise addressable to your specific context. A compiler for operational standards, not a library.
6. **Code, not counsel** — Policy-as-code, observability-as-code, IaC verification. Every Gyre output is a declarative, version-controllable artifact that lives in your repo — not advice that lives in someone's memory.
7. **Dual audience** — Technical guidance for engineers AND a launch readiness view for PMs and leadership. Single artifact, dual rendering.
8. **Cyclical, not one-time** — Continuous reassessment as the product evolves, not a launch gate you pass once.
9. **Complementary to IDPs** — Gyre discovers what "ready" means → exports as IDP scorecard rules → AI SRE tools operate on it. Direct integration, not just partnership.
10. **Framework-first, tool-agnostic** — Recommendations reference standards (DORA, OpenTelemetry, SLSA, FinOps), not specific vendor tools.

### Beyond Launch Readiness

Gyre's discovery protocol extends beyond its primary use case:

- **Team onboarding** — New engineers get the Readiness Report as service context: "Here's what our service needs to stay healthy."
- **M&A due diligence** — Assess operational maturity of acquisition targets before closing.
- **Vendor evaluation** — Run discovery against SaaS dependency architectures to evaluate production-grade readiness.

<!-- Content will be appended sequentially through collaborative workflow steps -->
