---
step: 6
workflow: proof-of-concept
title: Document Findings & Route
---

# Step 6: Document Findings & Route

The PoC is complete and the verdict is in. Now package everything you learned into a structured artifact that your team can act on, and route to the next step in the Vortex based on what the evidence tells you.

## Why This Matters

A PoC without documentation is a PoC that gets repeated. Six months from now, someone will ask "did we ever test whether X was feasible?" and if the answer lives only in your memory or a stale branch, the team will spend another week rediscovering what you already know. Structured documentation turns a PoC into an organizational asset -- a permanent record of what was tested, what was learned, and what decision it enabled. The Vortex Compass then ensures that learning flows to the right next step instead of sitting in a folder.

## Your Task

### 1. Compile the PoC Summary

Bring together all findings into a structured summary:

| Section | Content |
|---------|---------|
| **Technical Question** | The core question this PoC set out to answer (from Step 1) |
| **Approach** | What was built and how (from Steps 2-3) |
| **Key Results** | Top 3-5 findings from testing (from Step 4) |
| **Feasibility Verdict** | Pass / Fail / Conditional / Inconclusive (from Step 5) |
| **Conditions** | Any conditions attached to the verdict (from Step 5) |
| **Unknowns Remaining** | What the PoC did NOT answer (from Step 5) |

### 2. Document Technical Findings

For each significant finding from Steps 3-5, create a structured record:

| Finding | Evidence | Impact | Recommendation |
|---------|----------|--------|---------------|
| *What you discovered* | *Test data, metrics, or observations that support it* | *How this affects production feasibility* | *What to do about it* |

**Capture both positive and negative findings.** A PoC that confirms feasibility is just as valuable for what it proves works as what it proves does not work. Document:
- What worked better than expected (and why)
- What worked worse than expected (and why)
- What was surprising (and what it implies)
- What was not testable within PoC scope (and what would be needed to test it)

### 3. Record Technical Decisions

If the PoC informed any architectural or technical decisions, document them:

| Decision | Alternatives Considered | Why This Choice | Confidence |
|----------|----------------------|----------------|------------|
| *What was decided* | *What other approaches were evaluated* | *Evidence from the PoC that supports this choice* | High / Medium / Low |

### 4. Generate the PoC Artifact

Package the documentation into a structured artifact:

**Save to:** `{output_folder}/vortex-artifacts/poc-{poc-name}-{date}.md`

The artifact should include:
1. **Technical Question** -- What we set out to answer
2. **Approach** -- What we built and how we tested it
3. **Results** -- Raw findings and metrics
4. **Feasibility Verdict** -- The conclusion with supporting evidence
5. **Conditions & Unknowns** -- Caveats and open questions
6. **Technical Decisions** -- Choices made based on PoC evidence
7. **Recommendations** -- Next steps based on the verdict

### 5. Final Quality Check

Before routing, verify the documentation is complete and honest:

- [ ] Could someone who was not involved in the PoC understand what was tested and what was learned?
- [ ] Are the results reported accurately, without spin or cherry-picking?
- [ ] Is the verdict supported by the evidence, not by the outcome you wanted?
- [ ] Are conditions and unknowns documented prominently, not buried?
- [ ] Would this documentation prevent someone from re-running this exact PoC unnecessarily?

---

## Your Turn

Compile your findings, document technical decisions, and generate the PoC artifact. Confirm when the artifact is saved and we will route to the next Vortex step based on your results.

---

## Vortex Compass

Based on what you just completed, here are your evidence-driven options:

| If you learned... | Consider next... | Agent | Why |
|---|---|---|---|
| Technically feasible, ready for business validation | proof-of-value | Wade | Technical risk retired -- now validate the business case with a value-focused experiment |
| Technically feasible, but hypotheses need engineering | hypothesis-engineering | Liam | Feasibility confirmed -- now engineer testable hypotheses from the problem definition |
| Feasibility uncertain, need a focused experiment | lean-experiment | Wade | Run a targeted technical experiment to resolve the specific remaining uncertainty |
| Feasibility uncertain, need more user/market data | user-interview | Isla | Technical unknowns require user context or domain expertise to resolve |
| Infeasible with this approach, pivot needed | pivot-resynthesis | Mila | Current approach failed -- re-synthesize the problem to find alternative technical paths |
| Infeasible, fundamental technical blocker | learning-card | Max | Document the blocker as an organizational learning so the team does not revisit this dead end |
| Results available, need to capture learnings | learning-card | Max | Document technical learnings for the team's knowledge base |
| Results change the problem definition | research-convergence | Mila | PoC findings reframe the problem -- re-converge research with new technical evidence |

> **Note:** These are evidence-based recommendations. You can navigate to any Vortex agent
> at any time based on your judgment.

**Or run Max's [VN] Vortex Navigation** for a full gap analysis across all streams.

### Insufficient Evidence for Routing

If the evidence gathered so far does not clearly point to a single next step:

| To route to... | You need... |
|----------------|-------------|
| Wade (proof-of-value) | Clear "feasible" verdict with pass criteria met and scalability gaps assessed |
| Wade (lean-experiment) | Specific unresolved technical uncertainty with a testable question |
| Liam (hypothesis-engineering) | Confirmed feasibility and a problem definition ready for hypothesis generation |
| Isla (user-interview) | Specific technical unknown that requires user or domain context to resolve |
| Mila (pivot-resynthesis) | Evidence that the current technical approach is a dead end |
| Mila (research-convergence) | New evidence from the PoC that changes the problem framing |
| Max (learning-card) | Completed PoC with findings worth preserving for the team |

**Workflow-specific signals:**
- Verdict is "Inconclusive" with no clear next test --> consider revisiting **step-02** for tighter scoping
- Verdict is "Feasible with Conditions" but conditions are untestable --> consider routing to **Isla** for domain research
- Verdict is "Infeasible" but the goal is still worth pursuing --> consider routing to **Mila** for alternative approaches
- All pass criteria met but team has no hypothesis to test next --> consider routing to **Liam** for hypothesis engineering

**Recommended:** If uncertain, run **Max's [VN] Vortex Navigation** for a full gap analysis.
