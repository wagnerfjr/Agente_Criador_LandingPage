# EXECUTION-WORKFLOW.md — Two-Agent Development Model

**Document Purpose:** Define how Development Agent and QA Agent collaborate  
**Status:** ✅ READY TO EXECUTE  
**Date:** 2026-08-05  

---

## Overview

```
┌─────────────────────────┐
│  Development Agent      │  (Claude Code)
│  Implements Task X      │
│  Commits to Git         │
└────────────┬────────────┘
             │
             ↓
        [Task Complete]
             │
             ↓
┌─────────────────────────┐
│  QA Agent               │  (Independent Validator)
│  Tests Task X           │
│  Validates Gate Criteria │
│  Documents Findings     │
└────────────┬────────────┘
             │
             ↓
        [Gate Criteria]
             │
      ┌──────┴──────┐
      │             │
      ↓             ↓
   PASS ✅       FAIL ❌
      │             │
      │             └─→ Report to Dev Agent
      │                 Dev Agent fixes
      │                 QA re-validates
      │
      ↓
  Proceed to Task X+1
```

---

## Agent Responsibilities

### Development Agent (Claude Code)

**Authority:** Implement tasks per spec  
**Tools:** Code editing, git commits, file creation  
**Scope:** Write code following task.md requirements  
**Gate:** Cannot proceed to next task without QA PASS

**Per Task:**
1. Read task.md requirements (What, Where, Done When, Gate Criteria)
2. **IMPLEMENT** feature/component
3. **COMMIT** to Git (atomic commit with message)
4. **NOTIFY** QA Agent: "Task X complete, ready for validation"
5. **WAIT** for QA report
6. If QA PASS → Proceed to Task X+1
7. If QA FAIL → Fix issues → Notify QA for re-validation

**Example Communication:**
```
Dev Agent → QA Agent:

"Task 0: Meta Pixel Bootstrap complete.

✅ Completed:
- Executed get_or_create_pixel.py
- Captured Pixel ID: 123456789012345
- Set VITE_META_PIXEL_ID in .env.local
- Git commit: Initial Meta Pixel setup

Ready for validation per VALIDATION-PLAN.md Task 0 checklist."
```

---

### QA Agent (Independent Validator)

**Authority:** Full power to block/reject tasks  
**Tools:** File reading, test execution, documentation  
**Scope:** Validate gate criteria per VALIDATION-PLAN.md  
**Gate:** Cannot sign-off without all criteria met

**Per Task:**
1. Receive notification from Dev Agent ("Task X complete")
2. Read task.md + VALIDATION-PLAN.md for gate criteria
3. **VALIDATE** all checklist items
4. **TEST** functionality per gate criteria
5. **DOCUMENT** findings in VALIDATION-REPORT.md
6. **REPORT** to user: PASS ✅ or FAIL ❌
7. If FAIL → Notify Dev Agent with specific issues
8. If PASS → Approve proceeding to next task

**Example Communication:**
```
QA Agent → User:

## Task 0: Meta Pixel Bootstrap

**Status:** ✅ PASS

**Validation Summary:**
- Pixel ID format: 16 digits ✅ (123456789012345)
- .env.local configured ✅
- Idempotent test: PASS ✅ (no duplication on re-run)
- Meta Suite verification: PASS ✅ (pixel visible)

**Detailed Report:** See VALIDATION-REPORT.md

**Recommendation:** Ready to proceed to Task 1 ✅
```

---

## Communication Protocol

### Handoff Format: Dev → QA

**When:** Dev Agent completes implementation + commits

**Message Format:**
```
Task [X]: [Component Name]

**Status:** Complete & Ready for QA

**What was implemented:**
- [Bullet list of deliverables]
- [Specific files created/modified]

**Git evidence:**
- Commit hash: [hash]
- Commit message: [message]

**Testing checklist:**
- [ ] Dev tested locally (basic smoke test)
- [ ] No console errors
- [ ] Builds without errors

**QA will validate:** See VALIDATION-PLAN.md Task [X] section
```

### Handoff Format: QA → Dev (if FAIL)

**When:** QA finds gate criteria not met

**Message Format:**
```
Task [X]: [Component Name]

**Status:** ⚠️ FAIL — Blocked until fixed

**Gate Criteria Not Met:**
1. Issue: [Specific gate criterion failed]
   - Expected: [criterion description]
   - Found: [actual finding]
   - Reproduction: [steps to reproduce]
   - Evidence: [screenshot/log/test output]

2. Issue: [Next issue]
   - ...

**Action Required:**
- Fix issues listed above
- Re-commit to Git
- Notify QA Agent for re-validation
- Do NOT proceed to Task X+1 until PASS

**Link:** See VALIDATION-PLAN.md Task [X] for full checklist
```

### Handoff Format: QA → User (PASS)

**When:** QA validates and passes gate criteria

**Message Format:**
```
## Task [X]: [Component Name] ✅ VALIDATED

**Status:** PASS — Ready for next task

**Summary:** [1-2 sentence summary of what was validated]

**Gate Criteria:** All [N] checks PASS ✅
- ✅ [Criterion 1]
- ✅ [Criterion 2]
- ✅ [Criterion N]

**Evidence:**
- Lighthouse Score: [X]
- Pixel Events: [X] per minute
- Responsive: 375px → 1920px ✅

**Detailed Report:** `VALIDATION-REPORT.md` updated

**Recommendation:** Proceed to Task X+1 ✅
```

---

## Task Sequence with Two Agents

### Parallel-able Tasks (Tasks 2-11)

For tasks marked as "Parallel" in tasks.md, multiple Dev Agents can work simultaneously:

```
Timeline:
────────────────────────────────────────────────────────

Task 1 (Dev) → Task 1 (QA) ✅
  ↓
Task 1.5 (Dev) → Task 1.5 (QA) ✅
  ↓
  ├─ Task 2 (Dev) ──┐
  ├─ Task 3 (Dev) ──┤─→ Task 2-11 (QA - parallel) → ✅
  ├─ Task 4 (Dev) ──┤
  └─ ... Task 11    ┘
  ↓
Task 12 (Dev) → Task 12 (QA) ✅
  [Continue sequentially...]
```

**Rule:** Dev Agent cannot start Task 12 until QA has validated ALL Tasks 2-11

---

## Gate Criteria Philosophy

**Not Arbitrary:** Every gate criterion is in VALIDATION-PLAN.md  
**Not Subjective:** Criteria are measurable (Lighthouse >75, <2s load, etc.)  
**Not Blocking Forever:** If criterion fails, dev fixes → re-test (not escalation unless repeated failures)  
**Traceable:** Each criterion has a corresponding test procedure

### Example Gate Criterion (Task 1: React Setup)

```
Gate Criterion: Dev server must run without errors

Measurement:
  npm run dev  # Execute
  
Expected Result:
  Starts on http://localhost:5173 without console errors
  
Pass Condition:
  ✅ Terminal shows "ready in XXXms"
  ✅ Browser loads landing page (white screen OK)
  ✅ No red console errors
  
Fail Condition:
  ❌ "npm ERR" message
  ❌ Cannot connect to localhost:5173
  ❌ Console shows red errors
  
If Fail:
  Dev fixes (install missing dependency, fix config)
  → QA re-runs test → Pass or Fail again
```

---

## Escalation (Rare)

**Scenario:** Dev fixes same issue 3 times, QA still fails  
→ Escalate to Project Owner (Wagner)

**Escalation Path:**
```
Dev: "Task 5 failing on responsive test, fixed 3 times"
QA: "Still fails on 375px viewport"
→ Wagner reviews spec
→ Wagner clarifies requirement
→ Dev implements clarified spec
→ QA validates
```

---

## Documentation Artifacts

### Created by Dev Agent (per task)

1. **Code** — Components, hooks, config files
2. **Git Commits** — Atomic, one per task
3. **Git Commit Messages** — Describe what + why

### Created by QA Agent (per task)

1. **VALIDATION-REPORT.md** — Test results, gate criteria status
2. **Sign-off** — "Task X: Ready for Task X+1 ✅"
3. **Evidence** — Screenshots, Lighthouse reports, console logs

### Shared Reference

- **VALIDATION-PLAN.md** — QA checklist per task
- **tasks.md** — Dev requirements
- **Git History** — Audit trail of what was done + tested

---

## Status Tracking

### Task Status States

```
⏳ NOT_STARTED    → Waiting for dependencies
🔧 IN_PROGRESS   → Dev Agent implementing
📋 COMPLETE      → Dev Agent done, waiting for QA
🔍 IN_VALIDATION → QA Agent testing
✅ PASS          → Gate criteria met, ready to proceed
❌ FAIL          → Gate criteria not met, blocked
🔄 IN_REVISION   → Dev fixing issues found by QA
```

### Status Board (example)

```
Task 0: Meta Pixel         → ✅ PASS
Task 1: React Setup        → ✅ PASS
Task 1.5: Content JSON     → ✅ PASS
Task 2: Design System      → 🔍 IN_VALIDATION (QA testing)
Task 3: useTrainerParam    → 🔧 IN_PROGRESS (Dev coding)
Task 4: useMetaPixel       → ⏳ NOT_STARTED
Task 5-11: Components      → ⏳ NOT_STARTED
Task 12+: Layout           → ⏳ NOT_STARTED
```

---

## Key Rules

1. **No Task Proceeds Without QA PASS** — If QA fails gate criteria, task is blocked
2. **QA is Independent** — QA Agent doesn't receive direction on how to test (only what to test)
3. **Gate Criteria are Objective** — All criteria in VALIDATION-PLAN.md are measurable
4. **Documentation is Non-Negotiable** — Every task validated leaves audit trail
5. **Fix → Re-Test, Don't Escalate** — Failures are expected; re-testing is normal
6. **Parallel Only When Safe** — Only truly independent tasks run in parallel (no shared state)

---

## Timeline Estimate

| Phase | Duration | Notes |
|-------|----------|-------|
| Tasks 0-1 (sequential) | 1.5 hours | Small, quick validation |
| Tasks 1.5-11 (parallel) | ~10-12 hours | Dev: ~10h work, QA: ~2-3h spread across |
| Tasks 12-18 (sequential) | ~11 hours | Dev: ~9h work, QA: ~2h |
| **Total** | **~32-45 hours** | Including QA time |

---

## Next Step

✅ **Ready to START EXECUTE phase**

1. **Dev Agent (Claude Code):** Begin Task 0 (Meta Pixel setup)
2. **QA Agent:** Wait for "Task 0 complete" notification
3. **QA Agent:** Validate per VALIDATION-PLAN.md Task 0
4. **User:** Receives PASS/FAIL report from QA
5. **Proceed:** If PASS → Task 1 starts

---

**This model ensures:**
- ✅ Quality (independent QA)
- ✅ Traceability (documented per task)
- ✅ Velocity (parallel-able tasks still move fast)
- ✅ Auditability (clear pass/fail records)

**Ready to execute with confidence ✅**
