---
step: 1
workflow: proof-of-concept
title: Define Technical Risk
---

# Step 1: Define Technical Risk

Before building anything, we need to identify exactly what could prevent this from working. Technical risk comes first because if the technology cannot support the idea, nothing else matters.

## Why This Matters

Teams waste months building products that hit a technical wall they could have identified in a day. Performance bottlenecks, unsupported integrations, algorithmic infeasibility, data constraints -- these are the silent killers of product ideas. Defining technical risk up front forces you to confront the hardest engineering questions before committing resources. This workflow answers "CAN we build this?" so you never waste time asking "SHOULD we build this?" for something that was technically impossible from the start.

## Your Task

### 1. What Are You Trying to Build?

Describe the technical capability you need to validate. Wade expects a clear technical question -- not a business hypothesis, not a user story, but a specific technical challenge.

**Good examples:**
- "Can we process 10,000 real-time events per second with sub-200ms latency using our current infrastructure?"
- "Can we integrate with the Stripe Connect API to handle split payments across three-party marketplace transactions?"
- "Can our recommendation algorithm achieve >80% precision on sparse user data (<10 interactions per user)?"

**Provide your technical question:**
- What exactly needs to work?
- What system, API, algorithm, or architecture is involved?
- What does "working" look like in measurable terms?

### 2. Identify Technical Risk Categories

For your technical question, assess each risk category:

| Risk Category | Your Assessment | Severity |
|---------------|----------------|----------|
| **Performance** | Can it meet speed/throughput requirements? What are the latency and volume targets? | High / Medium / Low / N/A |
| **Scalability** | Will it work at 10x or 100x current load? Where are the scaling bottlenecks? | High / Medium / Low / N/A |
| **Integration Complexity** | How many external systems, APIs, or services must connect? What are the coupling risks? | High / Medium / Low / N/A |
| **Third-Party Dependencies** | Are we relying on external services, SDKs, or APIs we do not control? What happens if they change or fail? | High / Medium / Low / N/A |
| **Data Handling** | Can we access, transform, and store the data we need? Are there volume, format, or privacy constraints? | High / Medium / Low / N/A |
| **Algorithmic Feasibility** | Does a known solution exist for the computational problem? Is it tractable at our scale? | High / Medium / Low / N/A |
| **Infrastructure** | Do we have (or can we provision) the compute, storage, and networking required? | High / Medium / Low / N/A |

### 3. Rank Your Top Technical Risks

From the assessment above, identify the 1-3 risks that could kill this effort:

| Priority | Risk | Why It Could Kill Us | Current Evidence |
|----------|------|---------------------|------------------|
| 1 | *The risk most likely to block you* | *What happens if this fails* | *What do we know today (if anything)* |
| 2 | *(optional)* | | |
| 3 | *(optional)* | | |

**Guidance:** Focus on the risks with the highest severity AND the least evidence. A high-severity risk with strong evidence that it is solvable is not your biggest problem. A medium-severity risk with zero evidence is more dangerous than it looks.

### 4. Define Success and Failure Criteria

Before we design the PoC, establish what "feasible" and "not feasible" mean:

| Criteria | Threshold | How We Will Measure |
|----------|-----------|-------------------|
| **Pass** | *What result proves this is technically feasible?* | *Specific metric or observation* |
| **Fail** | *What result proves this is NOT feasible?* | *Specific metric or observation* |
| **Inconclusive** | *What result means we need more data?* | *What additional testing would be required* |

If you cannot define a pass/fail threshold, your technical question is too vague. Sharpen it before proceeding.

---

## Your Turn

Describe the technical capability you need to validate, assess the risk categories, rank your top risks, and define pass/fail criteria. Share your analysis and I will help you sharpen the risk definition before we scope the PoC.

## Next Step

When your technical risks are defined and success criteria are established, I'll load:

{project-root}/_bmad/bme/_vortex/workflows/proof-of-concept/steps/step-02-scope.md
