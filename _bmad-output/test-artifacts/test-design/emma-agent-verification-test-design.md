---
title: "Emma (Empathy Mapper) - Agent Verification Test Design"
date: 2026-02-14
version: 1.0.0
test_architect: Murat (tea)
test_design_mode: Agent Verification
agent_under_test: Emma (empathy-mapper)
agent_file: _bmad/bme/_designos/agents/empathy-mapper.md
status: READY FOR EXECUTION
---

# Emma Agent Verification - Test Design

**Test Architect:** Murat (tea) - Master Test Architect
**Date:** 2026-02-14
**Mode:** Agent Verification (Adapted from System-Level)
**Subject:** Emma (empathy-mapper) - BMAD Agent Architecture Reference Implementation

---

## Executive Summary

This test design provides comprehensive operational verification for **Emma (empathy-mapper)**, the reference implementation of the BMAD Agent Architecture Framework (v1.1.0). Emma serves as the foundation for future domain-specialized agents (Wade, Quinn, Stan), making operational verification critical.

**Test Objective:** Validate that Emma complies with BMAD agent architecture standards and operates reliably across all supported workflows.

**Risk-Based Approach:** 1 high-risk item (R-1: Config Load Failure, score 6) requires immediate mitigation before declaring Emma operational.

**Recommendation:** Emma is **implementation-complete** but **not yet operationally verified**. Proceed with test execution using this design.

---

## 1. Context & Prerequisites

### Agent Specification

**Name:** Emma (empathy-mapper)
**Display Name:** Emma
**Icon:** 🎨
**Role:** User Empathy Expert + Design Thinking Specialist
**Module:** bme (BMAD Enhanced)
**Submodule:** _designos

**Slash Command:** `/bmad-agent-bme-empathy-mapper`

### Key Components

1. **Agent File:** [_bmad/bme/_designos/agents/empathy-mapper.md](_bmad/bme/_designos/agents/empathy-mapper.md)
2. **Config:** `_bmad/bme/_designos/config.yaml`
3. **Workflows:**
   - Create Empathy Map: `_bmad/bme/_designos/workflows/empathy-map/workflow.md` (6 steps)
   - Validate Empathy Map: `_bmad/bme/_designos/workflows/empathy-map/validate.md`
4. **Registration:** `_bmad/_config/agent-manifest.csv` (row 22)
5. **Output:** `_bmad-output/design-artifacts/`

### Prerequisites

✅ Emma agent file created (78 LOC)
✅ 6 workflow step files created
✅ Validation workflow created
✅ Config.yaml exists
✅ Agent registered in manifest
✅ Output directory exists

### Testing Baseline

**Reference:** [EMMA-TESTING-GUIDE.md](_bmad-output/EMMA-TESTING-GUIDE.md) - 7 existing test scenarios
**Framework:** [GENERIC-AGENT-INTEGRATION-FRAMEWORK.md](_bmad-output/GENERIC-AGENT-INTEGRATION-FRAMEWORK.md) - BMAD Agent Architecture v1.1.0

---

## 2. Testability Assessment

### 🚨 Testability Concerns (ACTIONABLE)

#### TC-1: Config Loading Dependency (HIGH)
**Issue:** Emma's activation step 2 is CRITICAL - config must load before any output.

**Risk:**
- Config file path hardcoded: `{project-root}/_bmad/bme/_designos/config.yaml`
- No fallback if config missing or malformed
- Variables must be present: `user_name`, `communication_language`, `output_folder`

**Testing Challenge:** Cannot easily inject test config without modifying file system.

**Recommendation:**
- **ACTIONABLE** - Add test fixture for config injection
- Create `test-config.yaml` for automated testing
- Validate error handling when config load fails

---

#### TC-2: Workflow File Path Resolution (MEDIUM)
**Issue:** Menu items use `{project-root}` path variables that must resolve correctly.

**Risk:**
- Path resolution depends on runtime environment
- No validation that workflow files exist before invocation

**Recommendation:**
- **ACTIONABLE** - Add path validation before workflow execution
- Test error messaging when workflow files missing

---

#### TC-3: Fuzzy Command Matching Non-Determinism (LOW)
**Issue:** Fuzzy matching behavior not precisely specified.

**Recommendation:**
- **FYI** - Document fuzzy matching rules explicitly
- Add test cases for boundary conditions

---

### ✅ Testability Strengths

#### TS-1: XML Structure Validation (HIGH OBSERVABILITY)
**Strength:** Well-defined XML schema inside markdown code block.

**Testable:** Parse agent file, validate XML, assert required elements.

---

#### TS-2: Step-File Architecture (HIGH CONTROLLABILITY)
**Strength:** Discrete step files, each self-contained.

**Testable:** Load individual steps, verify instructions, test transitions.

---

#### TS-3: Menu Registration (HIGH OBSERVABILITY)
**Strength:** Emma registered in `agent-manifest.csv`.

**Testable:** Parse manifest, assert Emma exists with correct fields.

---

## 3. Risk Assessment Matrix

### Risk Scoring

Using Risk Governance framework (Probability × Impact, 1-9 scale):

| Risk ID | Category | Probability | Impact | Score | Status |
|---------|----------|-------------|--------|-------|--------|
| R-1 | Config Load Failure | 2 (Med) | 3 (High) | **6** | REQUIRES MITIGATION |
| R-2 | Workflow File Not Found | 2 (Med) | 2 (Med) | 4 | MONITOR |
| R-3 | Slash Command Registration | 1 (Low) | 3 (High) | 3 | LOW PRIORITY |
| R-4 | Party Mode Integration | 2 (Med) | 1 (Low) | 2 | LOW PRIORITY |
| R-5 | Step-File Enforcement | 1 (Low) | 2 (Med) | 2 | LOW PRIORITY |

---

### R-1: Config Load Failure (SCORE: 6 - HIGH RISK)

**Category:** TECH
**Scenario:** User installs Emma, config.yaml missing or has syntax errors, agent activation fails with unclear error.

**Probability:** 2 (Medium)
- Config file could be missing/malformed in new installations
- User might manually edit config and introduce errors

**Impact:** 3 (High)
- Agent completely non-functional if config fails to load
- No workaround - Emma cannot operate without config
- Blocks all downstream testing

**Mitigation Plan:**
- Add config validation on agent installation
- Provide clear error message if config missing: "Config not found at: <path>"
- Create config validation test (T-ERR-01, T-ERR-02, T-ERR-03)
- **Owner:** Emma agent (bme module)
- **Timeline:** Before Wade creation (Week 1, Days 1-2)
- **Verification:** T-ACT-04 must pass (config load failure shows clear error)

---

### R-2: Workflow File Not Found (SCORE: 4 - MEDIUM RISK)

**Category:** TECH
**Scenario:** User selects EM (Create Empathy Map), workflow.md file missing, execution fails.

**Probability:** 2 (Medium)
- Workflow files could be deleted, moved, or corrupted

**Impact:** 2 (Medium)
- Specific workflow broken, but agent still functional for other commands
- User can recover by reinstalling

**Mitigation Plan:**
- Add path existence check before loading workflow
- Graceful error: "Workflow file not found: <path>. Please reinstall Emma."
- **Owner:** BMAD workflow.xml handler
- **Timeline:** Phase 1 (Weeks 4-7)

---

### R-3: Slash Command Registration (SCORE: 3 - LOW RISK)

**Category:** TECH
**Scenario:** `/bmad-agent-bme-empathy-mapper` command not recognized.

**Probability:** 1 (Low)
- Manifest registration straightforward, tested in native BMAD agents

**Impact:** 3 (High)
- Emma cannot be invoked if slash command doesn't work

**Mitigation Plan:**
- Test slash command invocation (T-REG-03)
- Validate agent-manifest.csv entry (T-REG-01, T-REG-02)
- **Owner:** BMAD core (manifest loader)
- **Timeline:** Week 3 (Integration testing)

---

### R-4: Party Mode Integration (SCORE: 2 - LOW RISK)

**Category:** TECH
**Scenario:** User selects PM (Party Mode), Emma doesn't appear in agent list.

**Mitigation Plan:**
- Test party mode integration in Week 3 (T-INT-01, T-INT-02)

---

### R-5: Step-File Sequential Enforcement (SCORE: 2 - LOW RISK)

**Category:** BUS (Business Logic)
**Scenario:** User jumps from step-02 to step-05, bypassing empathy mapping phases.

**Mitigation Plan:**
- Verify step-file architecture enforces sequential loading (T-WF-03, T-WF-04)

---

### Risk Summary

**High Risks (Score ≥ 6):** 1 risk
**Medium Risks (Score 4-5):** 1 risk
**Low Risks (Score ≤ 3):** 3 risks

**Critical Finding:** Emma has **1 high-risk item (R-1)** requiring immediate mitigation.

---

## 4. Test Coverage Matrix

### Coverage by Domain

| Domain | P0 | P1 | P2 | P3 | Total |
|--------|----|----|----|----|-------|
| Agent Activation & Registration | 6 | 1 | 0 | 0 | 7 |
| Menu & Command Processing | 2 | 4 | 1 | 0 | 7 |
| Workflow Execution | 6 | 4 | 0 | 0 | 10 |
| Agent Registration & Invocation | 3 | 1 | 0 | 0 | 4 |
| Integration & Party Mode | 0 | 3 | 1 | 1 | 5 |
| Error Handling & Edge Cases | 1 | 4 | 1 | 0 | 6 |
| **TOTAL** | **18** | **17** | **3** | **1** | **39** |

---

### Test Scenario Details

#### Domain 1: Agent Activation & Registration (P0 - CRITICAL)

| ID | Test Scenario | Test Level | Priority | Risk |
|----|---------------|------------|----------|------|
| T-ACT-01 | Agent file loads without errors | Integration | P0 | R-1 |
| T-ACT-02 | Config.yaml loads successfully | Integration | P0 | R-1 |
| T-ACT-03 | Config variables stored correctly | Integration | P0 | R-1 |
| T-ACT-04 | Config load failure halts with clear error | Integration | P0 | R-1 |
| T-ACT-05 | Greeting displays with user name | Integration | P1 | - |
| T-ACT-06 | Menu displays 6 items in order | Integration | P0 | - |
| T-ACT-07 | Agent waits for input (no auto-execute) | Integration | P1 | R-5 |

---

#### Domain 2: Menu & Command Processing (P0-P2)

| ID | Test Scenario | Test Level | Priority | Risk |
|----|---------------|------------|----------|------|
| T-CMD-01 | Numeric command (1-6) selects menu item | Integration | P0 | - |
| T-CMD-02 | Text command (MH, CH, EM, etc.) matches | Integration | P0 | - |
| T-CMD-03 | Fuzzy match "empathy" → EM | Integration | P1 | TC-3 |
| T-CMD-04 | Fuzzy match "validate" → VM | Integration | P1 | TC-3 |
| T-CMD-05 | Ambiguous match prompts clarification | Integration | P2 | TC-3 |
| T-CMD-06 | Unrecognized command shows error | Integration | P1 | - |
| T-CMD-07 | MH redisplays menu | Integration | P1 | - |

---

#### Domain 3: Workflow Execution (P0-P1 - CRITICAL/HIGH)

| ID | Test Scenario | Test Level | Priority | Risk |
|----|---------------|------------|----------|------|
| T-WF-01 | EM command loads workflow.md | Integration | P0 | R-2 |
| T-WF-02 | workflow.md loads step-01 | Integration | P0 | R-2 |
| T-WF-03 | Step 1 completion loads step 2 | Integration | P0 | R-5 |
| T-WF-04 | All 6 steps load sequentially | Integration | P0 | R-5 |
| T-WF-05 | Step 6 creates empathy map artifact | E2E | P0 | - |
| T-WF-06 | Artifact saved to output_folder | Integration | P0 | R-1 |
| T-WF-07 | Artifact uses template structure | Integration | P1 | - |
| T-WF-08 | VM command loads validate.md | Integration | P1 | R-2 |
| T-WF-09 | Validate workflow provides feedback | E2E | P1 | - |
| T-WF-10 | Workflow file missing shows error | Integration | P1 | R-2 |

---

#### Domain 4: Agent Registration & Invocation (P0 - CRITICAL)

| ID | Test Scenario | Test Level | Priority | Risk |
|----|---------------|------------|----------|------|
| T-REG-01 | Emma exists in agent-manifest.csv | Integration | P0 | R-3 |
| T-REG-02 | Manifest has all required fields | Integration | P0 | R-3 |
| T-REG-03 | Slash command invokes Emma | E2E | P0 | R-3 |
| T-REG-04 | Agent file path correct in manifest | Integration | P1 | R-3 |

---

#### Domain 5: Integration & Party Mode (P1-P3)

| ID | Test Scenario | Test Level | Priority | Risk |
|----|---------------|------------|----------|------|
| T-INT-01 | PM command loads party mode workflow | Integration | P1 | R-4 |
| T-INT-02 | Emma appears in party mode list | E2E | P1 | R-4 |
| T-INT-03 | Emma selectable in multi-agent discussion | E2E | P2 | R-4 |
| T-INT-04 | CH mode activates Emma persona | E2E | P1 | - |
| T-INT-05 | Emma responds in communication_language | Integration | P1 | R-1 |

---

#### Domain 6: Error Handling & Edge Cases (P0-P2)

| ID | Test Scenario | Test Level | Priority | Risk |
|----|---------------|------------|----------|------|
| T-ERR-01 | Config missing → Clear error | Integration | P0 | R-1 |
| T-ERR-02 | Config malformed → Parse error | Integration | P1 | R-1 |
| T-ERR-03 | Config field missing → Specific error | Integration | P1 | R-1 |
| T-ERR-04 | Workflow file missing → File not found | Integration | P1 | R-2 |
| T-ERR-05 | Invalid menu selection → Retry prompt | Integration | P2 | - |
| T-ERR-06 | {project-root} path resolution works | Integration | P1 | TC-2 |

---

## 5. Test Level Distribution

**Integration Tests:** 30 scenarios (77%)
- Component boundaries, file I/O, config loading, menu processing
- Validates Emma's compliance with BMAD agent architecture

**E2E Tests:** 9 scenarios (23%)
- Full workflows (empathy map creation, validation)
- Slash command invocation, party mode integration

**Rationale:** Emma is infrastructure (agent platform), not user-facing app. Integration tests validate agent architecture compliance. E2E tests verify full operational scenarios.

**No Unit Tests:** Emma is configuration-driven (XML/markdown), not code logic. Integration tests provide appropriate coverage.

---

## 6. Execution Strategy

### PR (Pull Request) - Run on every commit

**Scope:** All P0 + P1 integration tests (26 scenarios)
**Estimated Duration:** ~8-12 minutes
**Trigger:** Any change to:
- Emma agent file
- Workflow files
- BMAD agent architecture
- Config.yaml

**Pass Criteria:**
- 100% P0 pass (18/18)
- ≥95% P1 pass (16/17, 1 known issue acceptable)

---

### Nightly - Run once per day

**Scope:** All tests (P0-P3), including E2E workflows (39 scenarios)
**Estimated Duration:** ~20-30 minutes
**Trigger:** Scheduled (end of day)

**Pass Criteria:**
- 100% P0 pass
- ≥95% P1 pass
- ≥90% P2 pass

---

### Weekly - Run before release

**Scope:** Full regression + exploratory + party mode integration
**Estimated Duration:** ~1-2 hours
**Trigger:** Manual before Phase 0 Week 1 completion

**Pass Criteria:** All quality gates met (see section 7)

---

## 7. Resource Estimates

### Test Implementation Effort (Ranges)

**P0 Tests (18 scenarios):** ~25-40 hours
- Activation & registration: 10-15 hours
- Core workflows: 10-15 hours
- Critical error handling: 5-10 hours

**P1 Tests (17 scenarios):** ~20-35 hours
- Menu & command processing: 8-12 hours
- Integration tests: 8-15 hours
- Error scenarios: 4-8 hours

**P2 Tests (3 scenarios):** ~5-10 hours
- Edge cases & party mode: 5-10 hours

**P3 Tests (1 scenario):** ~1-2 hours
- Exploratory: 1-2 hours

**Total Effort:** ~51-87 hours (2-3.5 weeks for 1 QA engineer)

---

### Timeline for Emma Verification

**Week 1 (Days 1-2):** P0 tests
- Agent activation (T-ACT-01 through T-ACT-07)
- Workflow execution (T-WF-01 through T-WF-06)
- Registration (T-REG-01 through T-REG-04)
- **Deliverable:** P0 test suite passing

**Week 1 (Days 3-4):** P1 tests
- Menu & command processing (T-CMD-01 through T-CMD-07)
- Integration tests (T-INT-01 through T-INT-05)
- Error scenarios (T-ERR-02 through T-ERR-06)
- **Deliverable:** P1 test suite passing

**Week 1 (Day 5):** P2-P3 tests + regression
- Edge cases (T-CMD-05, T-INT-03, T-ERR-05)
- Full regression run
- Test report generation
- **Deliverable:** Emma operational verification report

---

### Assumptions

- Test fixtures available (baseline: [EMMA-TESTING-GUIDE.md](_bmad-output/EMMA-TESTING-GUIDE.md))
- BMAD test framework available (`tea_use_playwright_utils: true`)
- 1 QA engineer dedicated to Emma testing
- No blocking dependencies on external systems

---

## 8. Quality Gates

### Gate 1: Critical Functionality (P0)

✅ **100% P0 pass rate** (18/18 scenarios passing)
✅ **Zero P0 defects** in final build
✅ **Config load reliability** - R-1 mitigation complete

**Blocking:** Any P0 failure blocks Emma operational status

---

### Gate 2: High-Priority Coverage (P1)

✅ **≥95% P1 pass rate** (16/17 passing, 1 known issue acceptable with workaround)
✅ **All workflow paths validated** (create empathy map + validate)
✅ **Slash command invocation working** - R-3 verified

**Blocking:** >1 P1 failure blocks release unless waived with mitigation plan

---

### Gate 3: Risk Mitigation

✅ **R-1 (Config Load Failure):** Mitigated via validation + clear errors
✅ **R-2 (Workflow File Not Found):** Path validation implemented
✅ **High-risk items (score ≥6):** All addressed

**Blocking:** R-1 not mitigated → BLOCK Emma operational status

---

### Gate 4: Integration Health

✅ **Party mode integration working** (P1 scenarios T-INT-01, T-INT-02 passing)
✅ **Agent-manifest.csv registration verified** (T-REG-01, T-REG-02 passing)
✅ **Config variable resolution tested** (T-ACT-02, T-ACT-03 passing)

---

### Gate 5: Code Coverage (if applicable)

✅ **≥80% coverage** of Emma agent activation logic
✅ **100% coverage** of workflow loading paths

**Note:** Coverage metrics apply if Emma agent logic is testable via code coverage tools. For markdown/XML-based agents, integration test coverage substitutes.

---

### Gate 6: Documentation

✅ **Test results documented** in Emma testing report
✅ **Known issues logged** with severity + workarounds
✅ **Operational status confirmed** - Ready for Wade creation

---

### Quality Gate Decision Criteria

**Emma is OPERATIONAL when:**
1. All 6 gates above pass
2. Test report published to `_bmad-output/test-artifacts/test-design/emma-test-results.md`
3. Sign-off from Test Architect (Murat) + BMAD Master

**Blocking Criteria:**
- Any P0 failure → **BLOCK** operational status
- >1 P1 failure → **BLOCK** (unless waived)
- R-1 not mitigated → **BLOCK**

---

## 9. Known Issues & Assumptions

### Known Issues

**None identified yet** - Emma is implementation-complete, awaiting operational verification.

---

### Open Assumptions

1. **Config.yaml creation:** Assumes config.yaml exists before Emma invocation. If not, T-ERR-01 must validate clear error message.

2. **Fuzzy matching algorithm:** Not precisely specified. T-CMD-03, T-CMD-04, T-CMD-05 will document actual behavior.

3. **Party mode compatibility:** Assumes party mode workflow compatible with Emma. T-INT-01, T-INT-02 will verify.

4. **Path resolution:** Assumes `{project-root}` resolves correctly in all environments. T-ERR-06 will validate.

---

## 10. Test Environment

### Requirements

**Software:**
- BMAD Method (v6.0.0-Beta.4 or higher)
- Claude Code CLI
- Test framework: Playwright (per `tea_use_playwright_utils: true`)

**Files:**
- Emma agent file: `_bmad/bme/_designos/agents/empathy-mapper.md`
- Config: `_bmad/bme/_designos/config.yaml`
- Workflows: `_bmad/bme/_designos/workflows/empathy-map/`
- Manifest: `_bmad/_config/agent-manifest.csv`

**Test Data:**
- Sample user personas for empathy map creation
- Sample empathy maps for validation workflow testing
- Test config with known values for variable validation

---

## 11. Next Steps

### Immediate Actions

1. **Review & Approve Test Design** - Amalik review and approval (this document)
2. **Create Test Fixtures** - Implement test config, sample data
3. **Execute P0 Tests** - Days 1-2 of Week 1
4. **R-1 Mitigation** - Config validation implementation
5. **Full Test Execution** - Days 3-5 of Week 1

---

### Post-Testing Actions

1. **Test Report** - Document results in `emma-test-results.md`
2. **Operational Decision** - Declare Emma operational or iterate
3. **Wade Creation** - Proceed to next agent (wireframe-designer)
4. **Framework Validation** - Use Emma testing experience to refine BMAD Agent Architecture Framework

---

## 12. Appendices

### A. Reference Documents

- [EMMA-TESTING-GUIDE.md](_bmad-output/EMMA-TESTING-GUIDE.md) - Testing baseline
- [GENERIC-AGENT-INTEGRATION-FRAMEWORK.md](_bmad-output/GENERIC-AGENT-INTEGRATION-FRAMEWORK.md) - BMAD Agent Architecture v1.1.0
- [EMMA-REFERENCE-IMPLEMENTATION-COMPLETE.md](_bmad-output/EMMA-REFERENCE-IMPLEMENTATION-COMPLETE.md) - Implementation summary
- [CRITICAL-FRAMEWORK-CORRECTION.md](_bmad-output/CRITICAL-FRAMEWORK-CORRECTION.md) - Architecture correction notes

---

### B. Test Execution Checklist

**Before Starting:**
- [ ] Test environment setup complete
- [ ] Test fixtures created
- [ ] Emma agent file unchanged since implementation
- [ ] Config.yaml exists and valid

**During Testing:**
- [ ] P0 tests executed first
- [ ] Failures logged with reproduction steps
- [ ] R-1 mitigation validated
- [ ] All test scenarios documented

**After Testing:**
- [ ] Test report generated
- [ ] Quality gates evaluated
- [ ] Operational decision made
- [ ] Lessons learned documented

---

### C. Contact Information

**Test Architect:** Murat (tea) - `_bmad/tea/agents/tea.md`
**Product Owner:** Amalik
**Agent Subject:** Emma (empathy-mapper) - `_bmad/bme/_designos/agents/empathy-mapper.md`

---

**End of Test Design Document**

**Status:** READY FOR EXECUTION
**Next Action:** Review & approve, then proceed to test implementation (Days 1-2, Week 1)
