---
step: 5
workflow: proof-of-concept
title: Evaluate Feasibility
---

# Step 5: Evaluate Feasibility

You have test results. Now answer the real question: can we build this at production scale, or did the PoC reveal problems that change the picture? This step moves from raw data to a defensible feasibility verdict.

## Why This Matters

Test results without interpretation are just numbers. A PoC that meets its pass criteria under lab conditions might still be infeasible at production scale due to cost, operational complexity, or compounding edge cases. Conversely, a PoC that narrowly missed a threshold might be feasible with a known optimization path. This step forces you to think beyond "did the test pass" and into "what does this mean for the real system" -- because that is the decision your team actually needs to make.

## Your Task

### 1. Summarize Test Results Against Criteria

Pull forward your pass/fail criteria and test results into a single verdict table:

| Criteria | Threshold | Measured Result | Verdict |
|----------|-----------|----------------|---------|
| *From Step 1* | *Pass threshold* | *From Step 4* | Pass / Fail / Inconclusive |
| *From Step 1* | *Fail threshold* | *From Step 4* | Pass / Fail / Inconclusive |

**Overall PoC Result:** Pass / Fail / Inconclusive

### 2. Assess Scalability Gap

The PoC tested feasibility at PoC scale. Production is different. Assess the gap:

| Dimension | PoC Scale | Production Scale | Gap | Confidence That Gap Is Closable |
|-----------|-----------|-----------------|-----|-------------------------------|
| **Data volume** | *What the PoC used* | *What production requires* | *Multiplier (e.g., 100x)* | High / Medium / Low |
| **Concurrent users** | *PoC load* | *Expected production load* | *Multiplier* | High / Medium / Low |
| **Availability** | *PoC uptime* | *Production SLA target* | *Delta* | High / Medium / Low |
| **Error handling** | *Stubbed/minimal* | *Production-grade* | *Effort estimate* | High / Medium / Low |
| **Security** | *Bypassed/minimal* | *Production requirements* | *Effort estimate* | High / Medium / Low |
| **Cost** | *PoC cost (if any)* | *Projected production cost* | *Monthly/annual estimate* | High / Medium / Low |

**Guidance:** If your confidence that the gap is closable is "Low" for any dimension, that is a significant finding. It does not automatically mean "infeasible" -- but it means there is unresolved technical risk that may need further investigation.

### 3. Evaluate Integration Readiness

If the PoC involved external systems, assess integration health:

| Integration | PoC Behavior | Production Concerns | Risk Level |
|-------------|-------------|-------------------|------------|
| *API / service / library* | *How it behaved during testing* | *Rate limits, versioning, reliability, cost at scale* | High / Medium / Low |

### 4. Identify Technical Debt and Unknowns

What did the PoC NOT test that production would require?

| Unknown | Why It Matters | Estimated Effort to Resolve | Blocks Production? |
|---------|---------------|---------------------------|-------------------|
| *What we still do not know* | *Impact on production feasibility* | *Hours / Days / Weeks / Unknown* | Yes / No / Maybe |

Be honest here. The temptation after a successful PoC is to declare victory and move on. But if there are significant unknowns that the PoC did not address, those unknowns do not disappear -- they become surprises during production development.

### 5. Render the Feasibility Verdict

Based on all evidence, choose one:

**FEASIBLE** -- The technical approach works. Proceed to production planning.
- All pass criteria met
- Scalability gaps are closable with known techniques
- No blocking unknowns
- Cost projections are acceptable

**FEASIBLE WITH CONDITIONS** -- The technical approach works, but with caveats.
- Most pass criteria met; exceptions have known mitigations
- Some scalability gaps require further investigation
- Conditions must be documented and tracked

**INFEASIBLE (this approach)** -- This specific approach does not work.
- One or more critical pass criteria failed
- Scalability gaps are not closable with known techniques
- Does NOT mean the goal is impossible -- only that this approach failed

**INCONCLUSIVE** -- More data is needed before a verdict.
- Results are ambiguous or contradictory
- Key scenarios were not testable within PoC scope
- Recommend a follow-up PoC with tighter scope

| Verdict | Rationale | Key Evidence |
|---------|-----------|-------------|
| *Your verdict* | *Why you reached this conclusion* | *The 1-3 most important test results or findings* |

**If FEASIBLE WITH CONDITIONS, list conditions:**

| Condition | Risk If Unmet | Owner | Timeline |
|-----------|--------------|-------|----------|
| *What must be true for feasibility to hold* | *What happens if this condition fails* | *Who resolves it* | *When it must be resolved* |

---

## Your Turn

Summarize results against criteria, assess the scalability gap, identify unknowns, and render your feasibility verdict. Share your evaluation and I will help you stress-test the conclusion before we document it.

---

**[a]** Advanced Elicitation -- Deep dive into feasibility analysis with guided questioning
**[p]** Party Mode -- Bring in other Vortex agents to challenge your feasibility assessment
**[c]** Continue -- Proceed to documenting findings and Vortex routing

---

## Next Step

When your feasibility verdict is rendered and reviewed, I'll load:

{project-root}/_bmad/bme/_vortex/workflows/proof-of-concept/steps/step-06-document.md
