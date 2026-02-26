# Mila User Guide - Research Convergence Specialist 🔬

**Agent:** Mila (research-convergence-specialist)
**Version:** 1.6.0
**Module:** BMAD Enhanced (bme) - Vortex Pattern
**Last Updated:** 2026-02-25

---

## Quick Start

**Who is Mila?**
Mila is a Research Convergence and Problem Definition Specialist who helps teams synthesize divergent research findings into actionable problem definitions. She guides you through the "Synthesize" stream of the Vortex pattern — converging multiple research artifacts into Jobs-to-be-Done framing, Pains & Gains analysis, and evidence-backed problem statements.

**When to use Mila:**
- Synthesizing multiple research artifacts into a single problem definition
- Framing core Jobs-to-be-Done from research evidence
- Conducting Pains & Gains analysis grounded in artifact data
- Mapping cross-source patterns across different research streams
- Re-synthesizing a problem definition after a failed experiment (pivot scenario)
- Validating whether research artifacts converge before committing to problem definition

**Mila vs. Emma — which agent do I need?**

| | Mila 🔬 (Synthesize) | Emma 🎯 (Contextualize) |
|---|---|---|
| **When** | After research — you have artifacts to synthesize | Before research — you need strategic context |
| **Input** | HC1 empathy artifacts + any research | Business context, market landscape, strategic goals |
| **Output** | HC2 problem definition (JTBD + Pains & Gains) | Contextualization document (strategic framing) |
| **Focus** | What is the problem? (evidence-based) | What is the landscape? (strategy-based) |

**Decision aid:** If you have research artifacts and need to define the problem → **Mila**. If you need to understand the broader context before research begins → **Emma**.

**What you'll get:**
Evidence-backed problem definitions (HC2 artifacts) grounded in Jobs-to-be-Done framing and Pains & Gains analysis, or pattern analysis documents mapping cross-source convergence.

---

## How to Invoke Mila

### Method 1: Slash Command (Preferred)

If you're in a BMAD environment that supports slash commands:

```
/bmad-agent-bme-research-convergence-specialist
```

**If you see "Unknown skill":**
This means slash commands aren't available in your environment. Use Method 2 instead.

---

### Method 2: Direct Agent File Reading (Always Works)

In any environment (including Claude Code), you can invoke Mila by reading her agent file:

1. Navigate to your BMAD project root
2. Read the file: `_bmad/bme/_vortex/agents/research-convergence-specialist.md`
3. Mila will activate and greet you

**Example (Claude Code):**
```
Read the file at _bmad/bme/_vortex/agents/research-convergence-specialist.md
```

**Example (Terminal):**
```bash
cat _bmad/bme/_vortex/agents/research-convergence-specialist.md
```

---

## Mila's Menu Options

Once Mila activates, you'll see menu options for her available workflows:

```
1. [MH] Redisplay Menu Help
2. [CH] Chat with Mila about research convergence, problem definition, JTBD, or synthesis
3. [RC] Research Convergence: Synthesize divergent research into a single problem definition
4. [PR] Pivot Resynthesis: Re-synthesize problem definition after failed experiments
5. [PA] Pattern Mapping: Map cross-source patterns across research artifacts
6. [PM] Start Party Mode
7. [DA] Dismiss Agent
```

### How to Select an Option

1. **Number:** Type `3` to select option 3
2. **Command Code:** Type `RC` to start research convergence
3. **Fuzzy Match:** Type `convergence` or `pattern` - Mila will match the command

---

## Workflows

### [RC] Research Convergence (5 steps)

Synthesize divergent research findings into a single, actionable problem definition grounded in Jobs-to-be-Done framing and Pains & Gains analysis.

**Steps:**
1. Setup & Input Validation
2. Context Loading & Analysis
3. Jobs-to-be-Done Framing
4. Pains & Gains Analysis
5. Synthesize & Route

**Output:** `{output_folder}/vortex-artifacts/hc2-problem-definition-{date}.md`
**Time:** 60-120 minutes

---

### [PR] Pivot Resynthesis (5 steps)

Re-synthesize a problem definition after a failed experiment. When Max says "pivot," Mila takes the original research plus new evidence from the failed experiment and produces a revised problem definition.

**Steps:**
1. Setup & Input Validation
2. Context Loading & Analysis
3. JTBD Re-Framing
4. Pains & Gains Revision
5. Synthesize & Route

**Output:** `{output_folder}/vortex-artifacts/hc2-problem-definition-{date}.md`
**Time:** 45-90 minutes

**The Pivot Scenario (Journey 5):**
1. Mila produces an HC2 problem definition via research-convergence
2. Liam generates hypotheses from the HC2 → produces HC3 hypothesis contracts
3. Wade tests hypotheses → produces HC4 experiment context
4. Max evaluates results → determines the experiment failed and says "pivot"
5. Mila re-enters via pivot-resynthesis: takes original HC1 artifacts + HC4 experiment evidence → produces a revised HC2
6. The revised HC2 goes back to Liam for new hypotheses

**How it differs from Research Convergence:**
- **Research Convergence** creates a new HC2 from scratch using research artifacts
- **Pivot Resynthesis** revises an existing HC2 incorporating evidence from a failed experiment — it builds on what was learned, not starting over

---

### [PA] Pattern Mapping (5 steps)

Map cross-source patterns across multiple research artifacts to identify convergent themes before committing to a full problem definition.

**Steps:**
1. Setup & Input Validation
2. Context Loading & Analysis
3. Pattern Identification
4. Theme Clustering
5. Synthesize & Route

**Output:** `{output_folder}/vortex-artifacts/pattern-analysis-{date}.md`
**Time:** 30-60 minutes

**When to use Pattern Mapping vs. Research Convergence:**
- **Pattern Mapping** is reconnaissance — identify what patterns exist before committing
- **Research Convergence** is commitment — produce the full problem definition

Use pattern mapping when you want to see if your research converges before investing in full JTBD framing and Pains & Gains analysis. Once patterns are clear, run research-convergence.

---

## Mila's Philosophy: Convergence Before Definition

### The Synthesize Stream (Vortex Pattern)

Mila guides teams through the "Synthesize" stream:
- **Convergence over collection** - synthesize before you define
- **Jobs-to-be-Done framing** turns observations into actionable problem statements
- **Pains & Gains analysis** reveals what users value vs. what they tolerate
- **Cross-source triangulation** — one data point is an anecdote, three are a pattern
- **Problem definition is the highest-leverage activity** in product discovery

---

## Chatting with Mila (CH)

Select **[CH] Chat** to discuss:
- Research synthesis and convergence methods
- Jobs-to-be-Done framing techniques
- Pains & Gains analysis approaches
- Cross-source pattern identification
- Problem definition best practices
- When to use which Mila workflow

**Example questions:**
- "How do I frame a good JTBD statement?"
- "When should I use pattern mapping vs. full convergence?"
- "How many artifacts do I need for strong convergence?"
- "What if my research contradicts itself?"
- "How do I know when my problem definition is strong enough for Liam?"
- "What's the difference between a pain and a gain in this framework?"

---

## Troubleshooting

### Error: "Configuration Error: Cannot load config file"

**How to fix:**
1. Check if `_bmad/bme/_vortex/config.yaml` exists
2. If missing: `npx bmad-install-vortex-agents`

### Error: "Cannot load synthesis workflow"

**How to fix:**
1. Check workflow files exist in `_bmad/bme/_vortex/workflows/`
2. Run `npx bmad-doctor` to diagnose
3. If missing: `npx bmad-install-vortex-agents`

---

## Tips from Mila

### "The best problem definitions feel inevitable"
When your problem statement follows naturally from the research — when it feels like the obvious conclusion rather than a surprise — that's convergence working. If the problem statement feels forced, you may need more evidence or a different framing.

### "Don't synthesize too early"
The data shows that rushing to problem definition before you have enough research leads to weak, assumption-heavy statements. If you have fewer than 2 artifacts with converging insights, consider running Isla's workflows first to deepen your evidence base.

### "Contradictions are data, not failures"
When your artifacts disagree, that's not a sign that your research is broken. Contradictions often reveal that you're looking at different user segments or that the problem is more nuanced than expected. Document them honestly — they make your problem definition stronger.

### "One data point is an anecdote, three are a pattern"
A single interview quote is interesting. The same insight appearing across three different research artifacts is a signal worth acting on. Cross-source triangulation is how you build confidence in your problem definition.

---

## Credits

**Agent:** Mila (research-convergence-specialist)
**Module:** BMAD Enhanced (bme)
**Submodule:** Vortex Pattern (_vortex)
**Stream:** Synthesize (Stream 3)
**Version:** 1.6.0

---

**Questions?** Chat with Mila (CH) - she's here to help you converge your research into actionable problem definitions! 🔬
