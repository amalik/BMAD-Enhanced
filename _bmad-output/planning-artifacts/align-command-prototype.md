# `/align` Command Prototype Specification

**Version:** 1.0.0
**Status:** Prototype Design
**Date:** 2026-02-04
**Owner:** BMAD-Enhanced Core Team

---

## Executive Summary

The `/align` command validates that artifact **content** semantically matches its traced parent/children, catching drift between related artifacts before it causes problems.

**Key Insight:** Traceability links tell you artifacts are **related**, but alignment validation tells you they're still **consistent**.

---

## 1. Problem Statement

### The Drift Problem

```
Day 1:
  Quint Hypothesis: "Users abandon checkout due to 5-step process"
  BMAD Story: "Reduce checkout to 2 steps"
  ✅ Perfectly aligned

Day 30:
  Hypothesis: "Users abandon checkout due to 5-step process" (unchanged)
  Story: "Add guest checkout and social login options" (evolved during sprint)
  ❌ Story drifted from original hypothesis!
```

**Without alignment validation:**
- Traces exist but content diverged
- Tests validate wrong hypothesis
- Quality gates pass but user problem unsolved
- Team loses reasoning chain

**With `/align` command:**
- Detects semantic drift automatically
- Warns before committing misaligned artifacts
- Suggests realignment actions

---

## 2. Command Interface

### 2.1 Basic Usage

```bash
# Check alignment for a specific artifact (checks parent + children)
bmad align <artifact-id>

# Check alignment with specific target
bmad align <artifact-id> --target parent
bmad align <artifact-id> --target children
bmad align <artifact-id> --target all

# Set custom threshold (default: 0.8)
bmad align <artifact-id> --threshold 0.7

# Output JSON for CI integration
bmad align <artifact-id> --json

# Auto-fix mode (suggests fixes interactively)
bmad align <artifact-id> --fix
```

### 2.2 Batch Operations

```bash
# Check all artifacts in current module
bmad align --all

# Check specific artifact type
bmad align --type "bmad:story"

# Check all modified artifacts (git integration)
bmad align --modified

# Check specific files
bmad align --files story-001.md story-002.md
```

### 2.3 Git Hook Integration

```bash
# Pre-commit hook (blocks commit if misaligned)
bmad align --modified --threshold 0.7 --fail-fast

# Pre-push hook (warning only)
bmad align --modified --threshold 0.8 --warn
```

---

## 3. Alignment Algorithm

### 3.1 High-Level Flow

```
┌─────────────────────────────────────────────────────────────┐
│                   ALIGNMENT VALIDATION                      │
└─────────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        ▼                   ▼                   ▼
  ┌──────────┐        ┌──────────┐       ┌──────────┐
  │ Extract  │        │ Generate │       │ Calculate│
  │ Content  │───────▶│Embeddings│──────▶│Similarity│
  └──────────┘        └──────────┘       └──────────┘
                                               │
                    ┌──────────────────────────┘
                    ▼
            ┌───────────────┐
            │  Key Terms    │
            │  Overlap      │
            └───────────────┘
                    │
                    ▼
            ┌───────────────┐
            │ Weighted Score│
            │ (0.0 - 1.0)   │
            └───────────────┘
                    │
        ┌───────────┼───────────┐
        ▼           ▼           ▼
    ≥0.8        0.6-0.79      <0.6
   ALIGNED    WEAK ALIGNMENT MISALIGNED
     ✅            ⚠️           ❌
```

### 3.2 Content Extraction

**What Gets Extracted:**
- Artifact title/heading
- Main content body (markdown processed to plain text)
- Acceptance criteria (for stories)
- Hypothesis statement (for hypotheses)
- Design rationale (for designs)
- Test descriptions (for tests)

**What Gets Ignored:**
- Frontmatter (already validated by schema tests)
- Code blocks (implementation detail, not intent)
- Comments and metadata
- File paths and references

**Example:**

```yaml
---
id: "bmad-story-001"
type: "bmad:story"
# ... frontmatter ignored ...
---

# User Story: Optimize Checkout Flow    ← EXTRACTED

**As a** customer                        ← EXTRACTED
**I want** a streamlined checkout        ← EXTRACTED
**So that** I can complete purchases     ← EXTRACTED

## Acceptance Criteria                   ← EXTRACTED
- Reduce steps from 5 to 2               ← EXTRACTED
- Maintain payment security              ← EXTRACTED

## Technical Notes                       ← IGNORED (implementation detail)
```tsx
function checkout() { ... }              ← IGNORED (code)
```
```

### 3.3 Embedding Generation

**Approach:** Use Claude API or local embedding model

**Option A: Claude API (Recommended for prototype)**
```typescript
async function generateEmbedding(text: string): Promise<number[]> {
  // Use Claude's embeddings endpoint
  const response = await anthropic.embeddings.create({
    model: "claude-embeddings-v1",
    input: text
  });

  return response.embedding; // 1024-dimensional vector
}
```

**Option B: Local Model (For production scale)**
```typescript
async function generateEmbedding(text: string): Promise<number[]> {
  // Use sentence-transformers via Python bridge
  const embedding = await pythonBridge.call(
    'sentence_transformers.encode',
    { text, model: 'all-MiniLM-L6-v2' }
  );

  return embedding; // 384-dimensional vector
}
```

### 3.4 Similarity Calculation

**Step 1: Cosine Similarity**
```typescript
function cosineSimilarity(vec1: number[], vec2: number[]): number {
  const dotProduct = vec1.reduce((sum, val, i) => sum + val * vec2[i], 0);
  const mag1 = Math.sqrt(vec1.reduce((sum, val) => sum + val * val, 0));
  const mag2 = Math.sqrt(vec2.reduce((sum, val) => sum + val * val, 0));

  return dotProduct / (mag1 * mag2); // Returns 0.0 to 1.0
}
```

**Step 2: Key Term Overlap**
```typescript
function extractKeyTerms(text: string): Set<string> {
  // Extract significant terms (nouns, verbs, domain keywords)
  const terms = new Set<string>();

  // Simple approach: TF-IDF top 10 terms
  const tfidf = new TfIdf();
  tfidf.addDocument(text);

  tfidf.listTerms(0).slice(0, 10).forEach(item => {
    terms.add(item.term.toLowerCase());
  });

  return terms;
}

function termOverlapScore(terms1: Set<string>, terms2: Set<string>): number {
  const intersection = new Set([...terms1].filter(t => terms2.has(t)));
  const union = new Set([...terms1, ...terms2]);

  return intersection.size / union.size; // Jaccard similarity
}
```

**Step 3: Weighted Final Score**
```typescript
function calculateAlignmentScore(
  artifact1: Artifact,
  artifact2: Artifact
): AlignmentScore {
  // Extract content
  const content1 = extractContent(artifact1);
  const content2 = extractContent(artifact2);

  // Generate embeddings
  const embedding1 = await generateEmbedding(content1);
  const embedding2 = await generateEmbedding(content2);

  // Calculate cosine similarity (semantic meaning)
  const semanticScore = cosineSimilarity(embedding1, embedding2);

  // Calculate term overlap (keyword matching)
  const terms1 = extractKeyTerms(content1);
  const terms2 = extractKeyTerms(content2);
  const termScore = termOverlapScore(terms1, terms2);

  // Weighted average (70% semantic, 30% term overlap)
  const finalScore = (0.7 * semanticScore) + (0.3 * termScore);

  return {
    score: finalScore,
    semanticScore,
    termScore,
    sharedTerms: [...terms1].filter(t => terms2.has(t)),
    missingTerms: {
      artifact1Only: [...terms1].filter(t => !terms2.has(t)),
      artifact2Only: [...terms2].filter(t => !terms1.has(t))
    }
  };
}
```

### 3.5 Threshold Interpretation

| Score Range | Status | Symbol | Action |
|-------------|--------|--------|--------|
| **≥ 0.8** | ALIGNED | ✅ | No action needed |
| **0.6 - 0.79** | WEAK ALIGNMENT | ⚠️ | Review recommended |
| **< 0.6** | MISALIGNED | ❌ | Action required |

**Threshold Rationale:**
- **0.8+**: High confidence - content is semantically consistent
- **0.6-0.79**: Moderate confidence - content related but may have drift
- **<0.6**: Low confidence - content likely diverged or unrelated

---

## 4. Output Formats

### 4.1 Default CLI Output (Human-Readable)

```
$ bmad align bmad-story-checkout-001

🔗 Content Alignment Report: bmad-story-checkout-001
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Parent Alignment
┌────────────────────────────────────────────────────┐
│ quint-hypothesis-l2-checkout-abandonment           │
│          ↓ traces to ↓                             │
│ bmad-story-checkout-001                            │
└────────────────────────────────────────────────────┘

Score: 0.92 ✅ ALIGNED
├─ Semantic Similarity: 0.94 (excellent)
└─ Term Overlap: 0.87 (strong)

Key Concepts Match:
  ✅ "checkout abandonment" → "checkout optimization"
  ✅ "5-step process" → "reduce steps from 5 to 2"
  ✅ "user frustration" → "improve user experience"
  ✅ "cart abandonment" → "purchase completion"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Children Alignment
┌────────────────────────────────────────────────────┐
│ bmad-story-checkout-001                            │
│          ↓ traces to ↓                             │
│ bmad-test-checkout-steps                           │
└────────────────────────────────────────────────────┘

Score: 0.88 ✅ ALIGNED
├─ Semantic Similarity: 0.89 (excellent)
└─ Term Overlap: 0.85 (strong)

Key Concepts Match:
  ✅ "reduce steps to 2" → "assert steps.length === 2"
  ✅ "checkout flow" → "checkout-flow.spec.ts"
  ✅ "complete purchase" → "completeCheckout() succeeds"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Overall Status: ✅ ALIGNED (threshold: 0.8)
Parent Alignment:   0.92 ✅
Children Alignment: 0.88 ✅

No action required. All traces are well-aligned.
```

### 4.2 Warning Output (Weak Alignment)

```
$ bmad align bmad-story-checkout-001

🔗 Content Alignment Report: bmad-story-checkout-001
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Parent Alignment
┌────────────────────────────────────────────────────┐
│ quint-hypothesis-l2-checkout-abandonment           │
│          ↓ traces to ↓                             │
│ bmad-story-checkout-001                            │
└────────────────────────────────────────────────────┘

Score: 0.68 ⚠️ WEAK ALIGNMENT
├─ Semantic Similarity: 0.72 (moderate)
└─ Term Overlap: 0.59 (weak)

Key Concepts Match:
  ✅ "checkout" → "checkout"
  ⚠️ "5-step process" → NOT FOUND in story
  ⚠️ "cart abandonment" → NOT FOUND in story

Potential Drift Detected:
  ⚠️ Story focuses on "social login" and "guest checkout"
  ⚠️ Hypothesis focuses on "reducing steps"

  These are related but not the same problem!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Recommendations:
  1. Review story scope - does it still address the hypothesis?
  2. Consider creating a separate hypothesis for social login
  3. Update story to explicitly mention "reduce steps to 2"

Would you like to:
  [F]ix story content to realign with hypothesis
  [C]reate new hypothesis for evolved scope
  [I]gnore this warning and continue
  [Q]uit
```

### 4.3 Error Output (Misaligned)

```
$ bmad align bmad-story-checkout-001

🔗 Content Alignment Report: bmad-story-checkout-001
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Parent Alignment
┌────────────────────────────────────────────────────┐
│ quint-hypothesis-l2-checkout-abandonment           │
│          ↓ traces to ↓                             │
│ bmad-story-checkout-001                            │
└────────────────────────────────────────────────────┘

Score: 0.42 ❌ MISALIGNED
├─ Semantic Similarity: 0.38 (poor)
└─ Term Overlap: 0.51 (weak)

⚠️ CRITICAL: Story content appears unrelated to parent hypothesis!

Hypothesis focuses on:
  • checkout abandonment
  • 5-step process
  • cart completion rate

Story focuses on:
  • dark mode toggle
  • theme preferences
  • visual design

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚨 ACTION REQUIRED:
  This story is likely tracing to the wrong hypothesis!

Suggested fixes:
  1. Remove incorrect trace: traces.parent = null
  2. Find correct hypothesis with: bmad find-hypothesis "dark mode"
  3. Update trace to correct parent hypothesis

Would you like to search for a better parent hypothesis?
[Y/n]:
```

### 4.4 JSON Output (for CI/CD)

```bash
$ bmad align bmad-story-checkout-001 --json
```

```json
{
  "artifact_id": "bmad-story-checkout-001",
  "artifact_type": "bmad:story",
  "timestamp": "2026-02-04T14:32:15.234Z",
  "threshold": 0.8,
  "overall_status": "ALIGNED",
  "alignments": [
    {
      "relationship": "parent",
      "target_id": "quint-hypothesis-l2-checkout-abandonment",
      "target_type": "quint:hypothesis:l2",
      "score": 0.92,
      "status": "ALIGNED",
      "details": {
        "semantic_score": 0.94,
        "term_score": 0.87,
        "shared_terms": [
          "checkout",
          "abandonment",
          "steps",
          "process",
          "user",
          "frustration"
        ],
        "missing_terms": {
          "source_only": ["optimization", "streamlined"],
          "target_only": ["cart", "completion-rate"]
        }
      }
    },
    {
      "relationship": "child",
      "target_id": "bmad-test-checkout-steps",
      "target_type": "bmad:test-suite",
      "score": 0.88,
      "status": "ALIGNED",
      "details": {
        "semantic_score": 0.89,
        "term_score": 0.85,
        "shared_terms": [
          "checkout",
          "steps",
          "flow",
          "complete",
          "purchase"
        ],
        "missing_terms": {
          "source_only": ["user-experience", "streamlined"],
          "target_only": ["assert", "spec", "test"]
        }
      }
    }
  ],
  "summary": {
    "total_checks": 2,
    "aligned": 2,
    "weak_alignment": 0,
    "misaligned": 0,
    "min_score": 0.88,
    "max_score": 0.92,
    "avg_score": 0.90
  }
}
```

---

## 5. Interactive Fix Mode

### 5.1 Usage

```bash
bmad align bmad-story-checkout-001 --fix
```

### 5.2 Fix Workflow

```
🔗 Content Alignment Report: bmad-story-checkout-001
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Parent Alignment: 0.68 ⚠️ WEAK ALIGNMENT

Detected drift between story and hypothesis.

Fix Options:

[1] Show side-by-side comparison
[2] Update story to match hypothesis (AI-assisted)
[3] Update hypothesis to match story evolution
[4] Create new hypothesis for evolved scope
[5] Remove trace (artifacts are unrelated)
[Q] Quit without fixing

Select option [1-5, Q]:
```

**Option 1: Side-by-Side Comparison**
```
┌─────────────────────────────────────┬─────────────────────────────────────┐
│ Hypothesis (Parent)                 │ Story (Current)                     │
├─────────────────────────────────────┼─────────────────────────────────────┤
│ Users abandon checkout due to       │ Add guest checkout and social       │
│ 5-step process                      │ login options                       │
│                                     │                                     │
│ Evidence: 42% abandonment rate      │ Acceptance Criteria:                │
│ at step 3 (shipping address)        │ - Facebook login integration        │
│                                     │ - Google login integration          │
│                                     │ - Guest checkout (no account)       │
│                                     │                                     │
│ Recommended: Reduce to 2 steps      │ [Missing: step reduction mention]   │
└─────────────────────────────────────┴─────────────────────────────────────┘

Drift Analysis:
  ⚠️ Story evolved from "reduce steps" to "alternative login methods"
  ⚠️ Guest checkout is related but social login is scope creep
  ✅ Both address checkout abandonment (root problem)

Recommendation: Split into 2 stories
  Story A: Reduce checkout steps (aligns with hypothesis)
  Story B: Add social login (needs new hypothesis)
```

**Option 2: AI-Assisted Update**
```
Updating story to align with hypothesis...

Suggested changes:

--- BEFORE ---
# User Story: Social Login for Checkout

**As a** customer
**I want** to log in with Facebook or Google
**So that** I don't have to create an account

## Acceptance Criteria
- Facebook login integration
- Google login integration
- Guest checkout option

--- AFTER (AI-Suggested) ---
# User Story: Streamline Checkout Process

**As a** customer
**I want** a quick 2-step checkout
**So that** I can complete my purchase without frustration

## Acceptance Criteria
- Reduce checkout from 5 steps to 2 steps
- Combine shipping and billing into single form
- Pre-fill address when shipping = billing
- Guest checkout option (no account required)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Alignment improvement: 0.68 → 0.94 ✅

Apply these changes? [Y/n]:
```

---

## 6. Git Hook Integration

### 6.1 Pre-Commit Hook

**File:** `.git/hooks/pre-commit`

```bash
#!/bin/bash

# Get modified artifact files
MODIFIED=$(git diff --cached --name-only | grep -E '\.md$')

if [ -z "$MODIFIED" ]; then
  exit 0  # No markdown files modified
fi

echo "🔗 Running alignment validation..."

FAILED=0

for file in $MODIFIED; do
  # Extract artifact ID from frontmatter
  ARTIFACT_ID=$(grep -m1 '^id:' "$file" | awk '{print $2}' | tr -d '"')

  if [ -z "$ARTIFACT_ID" ]; then
    continue  # Not an artifact file
  fi

  # Run alignment check
  bmad align "$ARTIFACT_ID" --threshold 0.7 --json > /tmp/align-result.json

  STATUS=$(jq -r '.overall_status' /tmp/align-result.json)

  if [ "$STATUS" = "MISALIGNED" ]; then
    echo "❌ FAILED: $ARTIFACT_ID is misaligned with traces"
    FAILED=1
  elif [ "$STATUS" = "WEAK_ALIGNMENT" ]; then
    echo "⚠️  WARNING: $ARTIFACT_ID has weak alignment (review recommended)"
  else
    echo "✅ PASSED: $ARTIFACT_ID is well-aligned"
  fi
done

if [ $FAILED -eq 1 ]; then
  echo ""
  echo "🚨 Alignment validation failed!"
  echo ""
  echo "To fix:"
  echo "  bmad align <artifact-id> --fix"
  echo ""
  echo "To bypass (not recommended):"
  echo "  git commit --no-verify"
  exit 1
fi

exit 0
```

### 6.2 CI/CD Integration

**File:** `.github/workflows/alignment-check.yml`

```yaml
name: Alignment Validation

on:
  pull_request:
    paths:
      - '**/*.md'

jobs:
  validate-alignment:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0  # Full history for comparison

      - name: Setup BMAD CLI
        run: |
          npm install -g @bmad/cli
          bmad --version

      - name: Get modified artifacts
        id: modified
        run: |
          git diff --name-only origin/main...HEAD \
            | grep -E '\.md$' \
            > modified-files.txt

      - name: Run alignment validation
        run: |
          while IFS= read -r file; do
            ARTIFACT_ID=$(grep -m1 '^id:' "$file" | awk '{print $2}' | tr -d '"')

            if [ -n "$ARTIFACT_ID" ]; then
              bmad align "$ARTIFACT_ID" --threshold 0.7 --json \
                > "alignment-$ARTIFACT_ID.json"
            fi
          done < modified-files.txt

      - name: Generate alignment report
        run: |
          bmad align --modified --json > alignment-report.json

          # Create human-readable summary
          jq -r '.summary' alignment-report.json > alignment-summary.txt

      - name: Comment on PR
        uses: actions/github-script@v6
        with:
          script: |
            const fs = require('fs');
            const summary = fs.readFileSync('alignment-summary.txt', 'utf8');

            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: `## 🔗 Alignment Validation Report\n\n${summary}`
            });

      - name: Check alignment status
        run: |
          STATUS=$(jq -r '.overall_status' alignment-report.json)

          if [ "$STATUS" = "MISALIGNED" ]; then
            echo "❌ Alignment validation failed"
            exit 1
          elif [ "$STATUS" = "WEAK_ALIGNMENT" ]; then
            echo "⚠️ Weak alignment detected (review recommended)"
            exit 0  # Warning only, don't fail build
          else
            echo "✅ All artifacts aligned"
            exit 0
          fi
```

---

## 7. Example Scenarios

### Scenario 1: Perfect Alignment ✅

**Quint Hypothesis:**
```markdown
# Hypothesis: Mobile Users Prefer One-Tap Checkout

Users abandon mobile checkout due to multi-step form complexity.
Evidence shows 68% abandonment on mobile vs 32% on desktop.
Recommended: Implement Apple Pay / Google Pay one-tap checkout.
```

**BMAD Story:**
```markdown
# User Story: One-Tap Mobile Checkout

**As a** mobile customer
**I want** to complete checkout with one tap
**So that** I avoid filling out complex forms on small screens

## Acceptance Criteria
- Apple Pay integration
- Google Pay integration
- Single-tap purchase flow
- Reduce mobile abandonment by 30%
```

**Alignment Score:** 0.96 ✅
- Semantic: 0.97 (excellent)
- Terms: 0.94 (strong)
- Shared: mobile, checkout, one-tap, abandonment, Apple Pay, Google Pay

---

### Scenario 2: Weak Alignment ⚠️

**Quint Hypothesis:**
```markdown
# Hypothesis: Users Need Faster Search

Site search response time averages 3.2 seconds, causing
high bounce rates. Recommended: Implement Elasticsearch
for sub-second search results.
```

**BMAD Story:**
```markdown
# User Story: Search with Filters

**As a** user
**I want** to filter search results by category and price
**So that** I can find products more easily

## Acceptance Criteria
- Category filters
- Price range slider
- Color filters
- Brand filters
```

**Alignment Score:** 0.71 ⚠️
- Semantic: 0.68 (moderate)
- Terms: 0.78 (moderate)
- Issue: Hypothesis focuses on **speed**, story focuses on **filters**
- Recommendation: Split into 2 stories OR update story to include speed requirement

---

### Scenario 3: Misaligned ❌

**Quint Hypothesis:**
```markdown
# Hypothesis: B2B Customers Need Bulk Ordering

Enterprise customers request ability to upload CSV of
product SKUs for bulk orders. Reduces order time from
2 hours to 5 minutes.
```

**BMAD Story:**
```markdown
# User Story: Dark Mode Toggle

**As a** user
**I want** to switch between light and dark themes
**So that** I can reduce eye strain during night usage

## Acceptance Criteria
- Dark mode toggle in settings
- Persist preference
- Smooth transition animation
```

**Alignment Score:** 0.23 ❌
- Semantic: 0.18 (very poor)
- Terms: 0.34 (poor)
- Issue: **Completely unrelated artifacts!**
- Recommendation: Remove trace OR fix incorrect parent reference

---

## 8. Implementation Checklist

### Phase 1: Core Algorithm (Week 1)
- [ ] Implement content extraction (markdown → plain text)
- [ ] Integrate embedding API (Claude or sentence-transformers)
- [ ] Implement cosine similarity calculation
- [ ] Implement key term extraction (TF-IDF)
- [ ] Implement weighted scoring algorithm
- [ ] Write unit tests for alignment scoring

### Phase 2: CLI Interface (Week 2)
- [ ] Build `bmad align <artifact-id>` command
- [ ] Add `--target` flag (parent/children/all)
- [ ] Add `--threshold` flag (default 0.8)
- [ ] Add `--json` output format
- [ ] Implement human-readable CLI output with colors
- [ ] Add `--modified` flag for git integration

### Phase 3: Interactive Features (Week 3)
- [ ] Implement `--fix` mode with interactive prompts
- [ ] Build side-by-side comparison view
- [ ] Implement AI-assisted content suggestions
- [ ] Add split story workflow
- [ ] Add trace removal workflow

### Phase 4: Git Integration (Week 4)
- [ ] Create pre-commit hook template
- [ ] Create pre-push hook template
- [ ] Document git hook installation
- [ ] Create CI/CD workflow templates (GitHub Actions)
- [ ] Add PR comment integration

### Phase 5: Testing & Documentation (Week 5)
- [ ] Write integration tests with sample artifacts
- [ ] Test all threshold ranges (0.0 - 1.0)
- [ ] Test edge cases (no content, broken traces, etc.)
- [ ] Write user documentation
- [ ] Create video walkthrough
- [ ] Benchmark performance (response time, accuracy)

---

## 9. Configuration

### 9.1 Global Config

**File:** `_bmad/_config/alignment-config.yaml`

```yaml
alignment:
  # Default threshold (0.0 - 1.0)
  default_threshold: 0.8

  # Thresholds by artifact type
  thresholds:
    "bmad:story": 0.8
    "quint:hypothesis": 0.85  # Higher threshold for critical hypotheses
    "designos:design-spec": 0.75
    "bmad:test-suite": 0.8

  # Embedding provider
  embedding:
    provider: "claude"  # or "sentence-transformers"
    model: "claude-embeddings-v1"
    cache_embeddings: true
    cache_duration: "7d"

  # Scoring weights
  scoring:
    semantic_weight: 0.7
    term_weight: 0.3

  # Auto-fix settings
  autofix:
    enabled: true
    ai_suggestions: true
    require_approval: true

  # Git hooks
  hooks:
    pre_commit:
      enabled: true
      threshold: 0.7
      fail_on_misaligned: true
      warn_on_weak: true

    pre_push:
      enabled: true
      threshold: 0.8
      fail_on_misaligned: false
      warn_on_weak: true
```

### 9.2 Per-Project Overrides

**File:** `.bmad/alignment-overrides.yaml`

```yaml
# Override global thresholds for this project
thresholds:
  "bmad:story": 0.75  # More lenient for fast-moving project
```

---

## 10. Performance Considerations

### 10.1 Caching Strategy

**Embedding Cache:**
```
_bmad/.cache/embeddings/
├─ bmad-story-001.embedding     (1KB each)
├─ quint-hypothesis-001.embedding
└─ ...
```

**Cache Invalidation:**
- Invalidate when artifact content changes
- TTL: 7 days (configurable)
- Cache hit rate target: >90%

### 10.2 Batch Processing

```bash
# Process 100 artifacts in parallel
bmad align --all --parallel 10
```

**Expected Performance:**
- Single alignment check: 200-500ms (with cache)
- Cold start (no cache): 1-2s per artifact
- Batch of 100 artifacts: ~5-10s (with parallelization)

---

## 11. Future Enhancements

### v1.1 - Historical Drift Tracking
```bash
bmad align bmad-story-001 --history
→ Shows alignment score over time (git history)
→ Detects when drift started
```

### v1.2 - Confidence Scoring
```bash
bmad align bmad-story-001 --confidence
→ Shows confidence intervals (± 0.05)
→ Flags low-confidence scores
```

### v1.3 - Cross-Module Templates
```bash
bmad align --template quint→bmad
→ Validates Quint hypothesis → BMAD story alignment
→ Uses domain-specific validation rules
```

---

## 12. Success Metrics

**Adoption Metrics:**
- 80%+ of teams enable pre-commit hook within 1 month
- <5% of commits bypass with `--no-verify`

**Effectiveness Metrics:**
- 90%+ of alignment checks complete in <2s
- 95%+ cache hit rate after initial population
- <1% false positives (aligned artifacts flagged as misaligned)

**Impact Metrics:**
- 50% reduction in "story doesn't match hypothesis" bugs
- 30% improvement in traceability quality (manual audit)

---

## 13. Related Documents

- [BaseArtifact Contract Specification](./baseartifact-contract-spec.md) - Core schema
- [4-Framework Comparison Matrix](./4-framework-comparison-matrix.md) - Integration architecture
- [Product Brief: BMAD-Enhanced](./product-brief-BMAD-Enhanced-2026-02-01.md) - ADR-002 details

---

**END OF PROTOTYPE SPECIFICATION**
