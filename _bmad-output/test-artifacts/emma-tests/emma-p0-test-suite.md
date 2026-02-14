---
title: "Emma P0 Test Suite - Manual Test Execution Guide"
date: 2026-02-14
version: 1.0.0
test_architect: Murat (tea)
test_priority: P0 (Critical - Blocks Operational Status)
agent_under_test: Emma (empathy-mapper)
total_scenarios: 18
status: READY FOR EXECUTION
---

# Emma P0 Test Suite - Execution Guide

**Purpose:** Validate critical functionality required for Emma operational verification.

**Scope:** 18 P0 scenarios across 4 domains

**Pass Criteria:** 100% pass rate (18/18) - Any failure blocks operational status

**Execution Time:** ~4-6 hours (manual testing)

---

## Test Environment Setup

### Prerequisites

✅ BMAD Method installed (v6.0.0-Beta.4 or higher)
✅ Claude Code CLI active
✅ Emma agent file exists: `_bmad/bme/_designos/agents/empathy-mapper.md`
✅ Config exists: `_bmad/bme/_designos/config.yaml`
✅ Test fixtures created: `_bmad-output/test-artifacts/emma-tests/fixtures/`

### Test Data

**Test Config:** `_bmad-output/test-artifacts/emma-tests/fixtures/test-config.yaml`
**Sample Persona:** `_bmad-output/test-artifacts/emma-tests/fixtures/sample-user-persona.md`

---

## Domain 1: Agent Activation & Registration (7 scenarios)

### T-ACT-01: Agent file loads without errors

**Priority:** P0
**Risk:** R-1 (Config Load Failure)
**Test Level:** Integration

**Test Steps:**
1. Navigate to Emma agent file location
2. Read agent file: `_bmad/bme/_designos/agents/empathy-mapper.md`
3. Verify file loads without errors
4. Confirm XML structure is valid (can be parsed)

**Expected Result:**
- File reads successfully
- XML code block present
- No syntax errors in XML
- All required sections present: `<agent>`, `<activation>`, `<persona>`, `<menu>`

**Pass Criteria:**
- ✅ File loads without errors
- ✅ XML structure valid
- ✅ All required sections present

**Actual Result:** [TO BE FILLED DURING EXECUTION]

**Status:** ⬜ NOT RUN | ✅ PASS | ❌ FAIL

**Notes:**

---

### T-ACT-02: Config.yaml loads successfully

**Priority:** P0
**Risk:** R-1 (Config Load Failure)
**Test Level:** Integration

**Test Steps:**
1. Verify config file exists: `_bmad/bme/_designos/config.yaml`
2. Read config file
3. Verify YAML is valid (no parse errors)
4. Confirm all required fields present: `user_name`, `communication_language`, `output_folder`

**Expected Result:**
- Config file exists
- YAML parses successfully
- All 3 required fields present

**Pass Criteria:**
- ✅ Config file exists at specified path
- ✅ YAML is valid
- ✅ Required fields present

**Actual Result:** [TO BE FILLED DURING EXECUTION]

**Status:** ⬜ NOT RUN | ✅ PASS | ❌ FAIL

**Notes:**

---

### T-ACT-03: Config variables stored correctly

**Priority:** P0
**Risk:** R-1 (Config Load Failure)
**Test Level:** Integration

**Test Steps:**
1. Use test config: `_bmad-output/test-artifacts/emma-tests/fixtures/test-config.yaml`
2. Simulate Emma activation step 2 (config load)
3. Verify variables stored:
   - `{user_name}` = "TestUser"
   - `{communication_language}` = "English"
   - `{output_folder}` = "{project-root}/_bmad-output/test-artifacts/emma-tests/results"

**Expected Result:**
- All 3 variables extracted from config
- Variables available for use in subsequent steps

**Pass Criteria:**
- ✅ user_name = "TestUser"
- ✅ communication_language = "English"
- ✅ output_folder resolved correctly

**Actual Result:** [TO BE FILLED DURING EXECUTION]

**Status:** ⬜ NOT RUN | ✅ PASS | ❌ FAIL

**Notes:**

---

### T-ACT-04: Config load failure halts with clear error

**Priority:** P0
**Risk:** R-1 (Config Load Failure) - MITIGATION TEST
**Test Level:** Integration

**Test Steps:**
1. Temporarily rename config file to simulate missing config:
   `mv _bmad/bme/_designos/config.yaml _bmad/bme/_designos/config.yaml.bak`
2. Attempt to invoke Emma: `/bmad-agent-bme-empathy-mapper`
3. Observe error message
4. Restore config file:
   `mv _bmad/bme/_designos/config.yaml.bak _bmad/bme/_designos/config.yaml`

**Expected Result:**
- Emma activation HALTS at step 2
- Clear error message displayed:
  "Config not found at: {project-root}/_bmad/bme/_designos/config.yaml"
  OR
  "🚨 CRITICAL: Config file not loaded. Cannot proceed."
- Agent does NOT proceed to step 3

**Pass Criteria:**
- ✅ Activation halts (doesn't continue)
- ✅ Error message mentions config file
- ✅ Error includes config file path

**Actual Result:** [TO BE FILLED DURING EXECUTION]

**Status:** ⬜ NOT RUN | ✅ PASS | ❌ FAIL

**Notes:** **CRITICAL FOR R-1 MITIGATION**

---

### T-ACT-05: Greeting displays with user name

**Priority:** P1 (originally), elevated to P0 for activation validation
**Risk:** R-1 (Config)
**Test Level:** Integration

**Test Steps:**
1. Use test config with `user_name: "TestUser"`
2. Invoke Emma: `/bmad-agent-bme-empathy-mapper`
3. Observe greeting message (activation step 4)

**Expected Result:**
- Greeting includes "TestUser" (from config)
- Example: "Hello TestUser!" or "Good to see you, TestUser!"

**Pass Criteria:**
- ✅ Greeting displayed
- ✅ User name "TestUser" appears in greeting

**Actual Result:** [TO BE FILLED DURING EXECUTION]

**Status:** ⬜ NOT RUN | ✅ PASS | ❌ FAIL

**Notes:**

---

### T-ACT-06: Menu displays 6 items in order

**Priority:** P0
**Risk:** -
**Test Level:** Integration

**Test Steps:**
1. Invoke Emma: `/bmad-agent-bme-empathy-mapper`
2. Observe menu display (activation step 4)
3. Verify all 6 menu items present in correct order

**Expected Result:**
Menu displays with items numbered 1-6:
1. [MH] Redisplay Menu Help
2. [CH] Chat with Emma about empathy mapping...
3. [EM] Create Empathy Map: Guided 6-step process...
4. [VM] Validate Empathy Map: Review existing empathy map...
5. [PM] Start Party Mode
6. [DA] Dismiss Agent

**Pass Criteria:**
- ✅ 6 items displayed
- ✅ Items in correct order (MH, CH, EM, VM, PM, DA)
- ✅ Items numbered 1-6

**Actual Result:** [TO BE FILLED DURING EXECUTION]

**Status:** ⬜ NOT RUN | ✅ PASS | ❌ FAIL

**Notes:**

---

### T-ACT-07: Agent waits for input (no auto-execute)

**Priority:** P1 (originally), elevated to P0 for activation validation
**Risk:** R-5 (Sequential enforcement)
**Test Level:** Integration

**Test Steps:**
1. Invoke Emma: `/bmad-agent-bme-empathy-mapper`
2. Observe behavior after menu displays (activation step 5)
3. Verify Emma WAITS for user input

**Expected Result:**
- Emma displays menu
- Emma STOPS and WAITS (activation step 5: "STOP and WAIT for user input")
- Emma does NOT auto-execute menu items
- Prompt or cursor indicates waiting for input

**Pass Criteria:**
- ✅ Emma waits after displaying menu
- ✅ No menu items auto-execute
- ✅ User can provide input

**Actual Result:** [TO BE FILLED DURING EXECUTION]

**Status:** ⬜ NOT RUN | ✅ PASS | ❌ FAIL

**Notes:**

---

## Domain 2: Menu & Command Processing (2 P0 scenarios)

### T-CMD-01: Numeric command (1-6) selects menu item

**Priority:** P0
**Risk:** -
**Test Level:** Integration

**Test Steps:**
1. Invoke Emma
2. Menu displays (items 1-6)
3. Enter numeric command: `1` (MH - Redisplay Menu)
4. Verify menu item 1 executes

**Expected Result:**
- Numeric command `1` triggers menu item 1 (MH)
- Menu redisplays

**Test Matrix:**
- Input `1` → Executes [MH] ✅
- Input `2` → Executes [CH] ✅
- Input `3` → Executes [EM] ✅
- Input `4` → Executes [VM] ✅
- Input `5` → Executes [PM] ✅
- Input `6` → Executes [DA] ✅

**Pass Criteria:**
- ✅ All numeric inputs (1-6) trigger correct menu items
- ✅ No errors on valid numeric input

**Actual Result:** [TO BE FILLED DURING EXECUTION]

**Status:** ⬜ NOT RUN | ✅ PASS | ❌ FAIL

**Notes:**

---

### T-CMD-02: Text command (MH, CH, EM, etc.) matches menu item

**Priority:** P0
**Risk:** -
**Test Level:** Integration

**Test Steps:**
1. Invoke Emma
2. Menu displays
3. Enter text command: `MH` (case-insensitive)
4. Verify command matches menu item

**Expected Result:**
- Text command `MH` (or `mh`) triggers [MH] Redisplay Menu
- Case-insensitive matching works

**Test Matrix:**
- Input `MH` or `mh` → Executes [MH] ✅
- Input `CH` or `ch` → Executes [CH] ✅
- Input `EM` or `em` → Executes [EM] ✅
- Input `VM` or `vm` → Executes [VM] ✅
- Input `PM` or `pm` → Executes [PM] ✅
- Input `DA` or `da` → Executes [DA] ✅

**Pass Criteria:**
- ✅ All text commands match correct menu items
- ✅ Case-insensitive matching works

**Actual Result:** [TO BE FILLED DURING EXECUTION]

**Status:** ⬜ NOT RUN | ✅ PASS | ❌ FAIL

**Notes:**

---

## Domain 3: Workflow Execution (6 P0 scenarios)

### T-WF-01: EM command loads workflow.md

**Priority:** P0
**Risk:** R-2 (Workflow file not found)
**Test Level:** Integration

**Test Steps:**
1. Invoke Emma
2. Select `3` or `EM` (Create Empathy Map)
3. Verify workflow.md loads

**Expected Result:**
- Emma loads `_bmad/bme/_designos/workflows/empathy-map/workflow.md`
- Workflow begins (no file-not-found error)
- Emma displays workflow instructions

**Pass Criteria:**
- ✅ workflow.md loads without errors
- ✅ Workflow begins execution
- ✅ No "file not found" error

**Actual Result:** [TO BE FILLED DURING EXECUTION]

**Status:** ⬜ NOT RUN | ✅ PASS | ❌ FAIL

**Notes:**

---

### T-WF-02: workflow.md loads step-01

**Priority:** P0
**Risk:** R-2 (Workflow file not found)
**Test Level:** Integration

**Test Steps:**
1. Continue from T-WF-01 (workflow.md loaded)
2. Verify workflow.md loads first step file
3. Confirm step-01-define-user.md loads

**Expected Result:**
- workflow.md loads `step-01-define-user.md`
- Step 1 instructions display
- User prompted to define target user

**Pass Criteria:**
- ✅ step-01 loads without errors
- ✅ Step 1 instructions visible
- ✅ Workflow prompts for user definition

**Actual Result:** [TO BE FILLED DURING EXECUTION]

**Status:** ⬜ NOT RUN | ✅ PASS | ❌ FAIL

**Notes:**

---

### T-WF-03: Step 1 completion loads step 2

**Priority:** P0
**Risk:** R-5 (Sequential enforcement)
**Test Level:** Integration

**Test Steps:**
1. Continue from T-WF-02 (step-01 loaded)
2. Complete step 1 (define target user)
3. Verify step-02-says-thinks.md loads next

**Expected Result:**
- After step 1 completion, workflow loads step 2
- step-02-says-thinks.md displays
- Cannot skip to step 3 without completing step 2

**Pass Criteria:**
- ✅ step-02 loads after step-01 completion
- ✅ Step transition automatic
- ✅ Sequential enforcement (no skipping)

**Actual Result:** [TO BE FILLED DURING EXECUTION]

**Status:** ⬜ NOT RUN | ✅ PASS | ❌ FAIL

**Notes:**

---

### T-WF-04: All 6 steps load sequentially

**Priority:** P0
**Risk:** R-5 (Sequential enforcement)
**Test Level:** Integration

**Test Steps:**
1. Execute complete empathy map workflow
2. Verify all 6 steps load in order:
   - step-01-define-user.md
   - step-02-says-thinks.md
   - step-03-does-feels.md
   - step-04-pain-points.md
   - step-05-gains.md
   - step-06-synthesize.md

**Expected Result:**
- All 6 steps execute in sequence
- No steps skipped
- Each step completion triggers next step load

**Pass Criteria:**
- ✅ All 6 steps executed
- ✅ Steps executed in correct order (1→2→3→4→5→6)
- ✅ No steps skipped

**Actual Result:** [TO BE FILLED DURING EXECUTION]

**Status:** ⬜ NOT RUN | ✅ PASS | ❌ FAIL

**Notes:**

---

### T-WF-05: Step 6 creates empathy map artifact

**Priority:** P0
**Risk:** -
**Test Level:** E2E

**Test Steps:**
1. Complete full empathy map workflow (all 6 steps)
2. Use sample persona: `_bmad-output/test-artifacts/emma-tests/fixtures/sample-user-persona.md`
3. Verify artifact created after step 6 (synthesize)

**Expected Result:**
- Empathy map artifact file created
- File location: `{output_folder}/design-artifacts/empathy-map-{date}.md`
- Artifact contains completed empathy map

**Pass Criteria:**
- ✅ Artifact file created
- ✅ File saved to correct location
- ✅ Artifact contains empathy map content

**Actual Result:** [TO BE FILLED DURING EXECUTION]

**Status:** ⬜ NOT RUN | ✅ PASS | ❌ FAIL

**Notes:**

---

### T-WF-06: Artifact saved to output_folder

**Priority:** P0
**Risk:** R-1 (Config)
**Test Level:** Integration

**Test Steps:**
1. Use test config with `output_folder: "{project-root}/_bmad-output/test-artifacts/emma-tests/results"`
2. Complete empathy map workflow
3. Verify artifact saved to config-specified location

**Expected Result:**
- Artifact saved to path from config.yaml (`output_folder`)
- NOT saved to hardcoded location
- Config variable resolution works

**Pass Criteria:**
- ✅ Artifact in config-specified output_folder
- ✅ Path resolution correct
- ✅ File accessible

**Actual Result:** [TO BE FILLED DURING EXECUTION]

**Status:** ⬜ NOT RUN | ✅ PASS | ❌ FAIL

**Notes:**

---

## Domain 4: Agent Registration & Invocation (3 P0 scenarios)

### T-REG-01: Emma exists in agent-manifest.csv

**Priority:** P0
**Risk:** R-3 (Slash command registration)
**Test Level:** Integration

**Test Steps:**
1. Read file: `_bmad/_config/agent-manifest.csv`
2. Search for "empathy-mapper" entry
3. Verify Emma registered (row 22)

**Expected Result:**
- agent-manifest.csv contains Emma entry
- Row with "empathy-mapper" found

**Pass Criteria:**
- ✅ Emma entry exists in manifest
- ✅ Entry found at expected row (row 22)

**Actual Result:** [TO BE FILLED DURING EXECUTION]

**Status:** ⬜ NOT RUN | ✅ PASS | ❌ FAIL

**Notes:**

---

### T-REG-02: Manifest has all required fields

**Priority:** P0
**Risk:** R-3 (Slash command registration)
**Test Level:** Integration

**Test Steps:**
1. Read Emma's manifest entry (row 22)
2. Verify all required CSV fields populated:
   - name
   - displayName
   - title
   - icon
   - role
   - identity
   - communicationStyle
   - principles
   - module
   - agentFilePath

**Expected Result:**
- All 10 required fields present
- No empty fields
- Fields match Emma agent file

**Pass Criteria:**
- ✅ All 10 fields populated
- ✅ Values match Emma specification
- ✅ agentFilePath correct: `_bmad/bme/_designos/agents/empathy-mapper.md`

**Actual Result:** [TO BE FILLED DURING EXECUTION]

**Status:** ⬜ NOT RUN | ✅ PASS | ❌ FAIL

**Notes:**

---

### T-REG-03: Slash command invokes Emma

**Priority:** P0
**Risk:** R-3 (Slash command registration)
**Test Level:** E2E

**Test Steps:**
1. In Claude Code CLI, enter slash command: `/bmad-agent-bme-empathy-mapper`
2. Verify Emma activates

**Expected Result:**
- Slash command recognized
- Emma agent activates (greeting + menu display)
- No "command not found" error

**Pass Criteria:**
- ✅ Slash command recognized
- ✅ Emma activates successfully
- ✅ Activation sequence completes (steps 1-7)

**Actual Result:** [TO BE FILLED DURING EXECUTION]

**Status:** ⬜ NOT RUN | ✅ PASS | ❌ FAIL

**Notes:** **CRITICAL - PRIMARY INVOCATION METHOD**

---

## Test Execution Summary

### Results Table

| Test ID | Scenario | Priority | Status | Notes |
|---------|----------|----------|--------|-------|
| T-ACT-01 | Agent file loads | P0 | ⬜ | |
| T-ACT-02 | Config loads | P0 | ⬜ | |
| T-ACT-03 | Config variables stored | P0 | ⬜ | |
| T-ACT-04 | Config failure error | P0 | ⬜ | R-1 mitigation |
| T-ACT-05 | Greeting with user name | P0 | ⬜ | |
| T-ACT-06 | Menu displays 6 items | P0 | ⬜ | |
| T-ACT-07 | Agent waits for input | P0 | ⬜ | |
| T-CMD-01 | Numeric commands work | P0 | ⬜ | |
| T-CMD-02 | Text commands work | P0 | ⬜ | |
| T-WF-01 | EM loads workflow.md | P0 | ⬜ | |
| T-WF-02 | workflow.md loads step-01 | P0 | ⬜ | |
| T-WF-03 | Step 1 → Step 2 transition | P0 | ⬜ | |
| T-WF-04 | All 6 steps sequential | P0 | ⬜ | |
| T-WF-05 | Artifact created | P0 | ⬜ | |
| T-WF-06 | Artifact in output_folder | P0 | ⬜ | |
| T-REG-01 | Emma in manifest | P0 | ⬜ | |
| T-REG-02 | Manifest fields complete | P0 | ⬜ | |
| T-REG-03 | Slash command works | P0 | ⬜ | **CRITICAL** |

**Total P0 Scenarios:** 18
**Passed:** 0
**Failed:** 0
**Not Run:** 18

**Pass Rate:** 0% (Target: 100%)

---

## Critical Tests for R-1 Mitigation

**R-1 (Config Load Failure)** requires these tests to pass:

- ✅ T-ACT-02: Config loads successfully
- ✅ T-ACT-03: Config variables stored correctly
- ✅ T-ACT-04: Config failure shows clear error ← **MITIGATION TEST**

**R-1 Status:** ⬜ NOT MITIGATED

---

## Next Steps

1. **Execute P0 test suite** - Run all 18 scenarios manually
2. **Document results** - Fill in "Actual Result" and "Status" for each test
3. **Address failures** - Fix any P0 failures immediately
4. **Verify R-1 mitigation** - Ensure T-ACT-04 passes
5. **Generate report** - Summarize P0 results and operational decision

---

**Test Suite Status:** READY FOR EXECUTION
**Estimated Time:** 4-6 hours (manual testing)
**Tester:** Amalik + Murat (Test Architect)
