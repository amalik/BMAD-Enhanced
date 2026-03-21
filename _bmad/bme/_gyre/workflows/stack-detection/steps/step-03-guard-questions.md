---
step: 3
workflow: stack-detection
title: Guard Questions
---

# Step 3: Guard Questions

Ask targeted questions to resolve ambiguities identified in Step 2. Guard questions confirm architecture intent — they don't repeat what detection already proved.

## MANDATORY EXECUTION RULES

- **Maximum 3 questions.** If more than 3 ambiguities exist, prioritize by impact on downstream model generation.
- **Skip entirely** if Step 2 classification has no ambiguities (all high confidence).
- Questions are **derived from detection**, not a fixed checklist. Every question must reference what was found and why it's ambiguous.
- User answers conversationally (FR7) — accept natural language, not just option numbers.
- If user corrects a previous answer, re-classify without re-scanning (FR8).
- Guard response processing takes <1 second (NFR3) — no additional file scanning on correction.
- Guard options must cover ≥95% of common architectures (NFR20).

## QUESTION GENERATION

For each ambiguity from Step 2, generate a question following this pattern:

```
I found [evidence] which suggests [interpretation A], but [conflicting evidence or absence]
could also mean [interpretation B].

**Question:** [Specific question that resolves the ambiguity]

Options:
a) [Interpretation A] — [what this means for the analysis]
b) [Interpretation B] — [what this means for the analysis]
c) Something else — [tell me more]
```

### Common Guard Question Templates

**Deployment model (when Dockerfile exists but no orchestration):**
> I found a Dockerfile but no orchestration config (no k8s manifests, no ECS task definitions, no docker-compose for production).
>
> Is this container used for:
> a) Production deployment (container-based, orchestrated elsewhere)
> b) Local development only (production uses a different deployment model)
> c) Serverless with container image (e.g., AWS Lambda container, Cloud Run)

**Communication protocol (when multiple detected):**
> I found both REST endpoints (Express routes) and gRPC definitions (.proto files).
>
> What's the primary communication pattern:
> a) REST is the public API, gRPC is internal service-to-service
> b) gRPC is primary, REST is a gateway/proxy layer
> c) Both are primary — different clients use different protocols

**Cloud provider (when ambiguous):**
> I found Terraform files referencing both AWS and GCP providers.
>
> Is this:
> a) Primarily AWS with some GCP services
> b) Primarily GCP with some AWS services
> c) True multi-cloud deployment

## CONVERSATION FLOW

1. Present all guard questions at once (up to 3), numbered clearly
2. Accept answers in any order, any format (number, letter, natural language)
3. After each answer, acknowledge and update the classification
4. If user says something like "actually, I said X but it's really Y" — re-classify that category without re-scanning
5. When all questions are answered (or user says "that's correct" / "looks good"):

Present the **final classification** incorporating guard answers:

```
## Final Stack Classification

**Archetype:** [updated archetype with guard refinements]

| Category | Classification | Confidence | Source |
|----------|---------------|:----------:|--------|
| Language/Framework | [value] | high | detection |
| Container | [value] | high | detection |
| Orchestration | [value] | high | detection + guard |
| CI/CD | [value] | high | detection |
| Observability | [value] | medium | detection |
| Cloud Provider | [value] | high | guard |
| Communication | [value] | high | guard |

Does this look correct? If so, I'll write the Stack Profile for Atlas to use.
```

## CORRECTION HANDLING (FR8)

If the user corrects a previously answered guard question or any detection result:

1. Accept the correction conversationally
2. Update the affected classification category
3. Check if the correction affects other categories (e.g., changing cloud provider might affect deployment model)
4. Re-present the updated classification
5. Do NOT re-scan the filesystem — classification update only

## COMPLETION

When the user confirms the classification is correct, the stack detection workflow is complete.

The confirmed classification is ready for GC1 contract writing (Story 1.4). Scout will write the Stack Profile to `.gyre/stack-profile.yaml`.

Present the compass routing options:

```
**What's next?**

| Option | Description |
|--------|-------------|
| Write Stack Profile | Save classification as GC1 artifact for Atlas |
| Chat | Discuss the detection results with Scout |
| Menu | Return to Scout's main menu |
```
