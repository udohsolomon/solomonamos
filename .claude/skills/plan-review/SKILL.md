---
name: plan-review
description: Critical review of implementation plans with re-planning triggers
triggers:
  keywords:
    - review plan
    - validate plan
    - plan critique
    - re-plan
    - replan
    - plan deviation
    - plan going wrong
    - implementation diverged
    - grill me
    - prove it works
    - challenge plan
---

# Plan Review Protocol

Critical review of implementation plans. Use when plans need validation, when implementation diverges from plan, or when re-planning is needed.

---

## When to Use This Skill

- Before starting complex implementation
- When things start going sideways
- When more than 3 unexpected issues arise
- To get a second opinion on your approach

---

## Plan Critique Checklist

### 1. Assumptions Validation

Ask these questions about any plan:

- [ ] What assumptions is this plan making?
- [ ] What would invalidate these assumptions?
- [ ] Have we verified the assumptions with code/tests?
- [ ] What's the fallback if an assumption is wrong?

### 2. Completeness Check

- [ ] Are all edge cases considered?
- [ ] Are error scenarios handled?
- [ ] Is rollback/undo considered?
- [ ] Are dependencies identified?
- [ ] Is testing strategy included?

### 3. Risk Assessment

- [ ] What could go wrong?
- [ ] What's the impact if each risk materializes?
- [ ] What's the mitigation for each risk?
- [ ] Is there a point of no return?

### 4. Effort Calibration

- [ ] Does effort estimate seem reasonable?
- [ ] Are there hidden complexities?
- [ ] What similar work has been done before?
- [ ] Is parallelization possible?

---

## Second Claude Review Pattern

One engineer has one Claude write the plan, then spins up a second Claude to review it as a staff engineer.

### How to Implement

**Terminal 1 (Plan Creator):**
```
Write a detailed implementation plan for [feature]
```

**Terminal 2 (Plan Reviewer):**
```
Review this implementation plan as a skeptical staff engineer.
Challenge assumptions, identify risks, and suggest improvements:

[Paste the plan here]
```

### Reviewer Prompts

```
"Grill me on this plan - what could go wrong?"
"What would make you reject this plan in a design review?"
"If this plan fails, what will be the root cause?"
"What's the most naive assumption in this plan?"
```

---

## Deviation Detection Triggers

### Automatic Re-Planning When:

1. **Time Overrun**
   - Task taking 2x longer than estimated
   - Multiple subtasks all running over

2. **Scope Creep**
   - More than 3 unexpected dependencies discovered
   - Required changes expanding beyond original files

3. **Assumption Failure**
   - Core assumption invalidated during implementation
   - API/library behaves differently than expected

4. **Test Failure Pattern**
   - Tests reveal fundamental design flaw
   - Edge cases require architectural change

5. **User Feedback Conflict**
   - User feedback contradicts original understanding
   - Requirements have shifted

### Response to Deviation

When deviation detected:

```
STOP. Enter plan mode.

1. Document what went wrong and why
2. Identify which assumption was incorrect
3. Generate 2-3 alternative approaches
4. Evaluate each approach against new information
5. Choose approach with most evidence
6. Update session file with pivot rationale
```

---

## Re-Planning Protocol

### Step 1: Acknowledge the Deviation

```markdown
## Deviation Detected

**Original Plan**: [Brief description]
**What Changed**: [What assumption/fact changed]
**Impact**: [Why we can't continue with original plan]
```

### Step 2: Generate Alternatives

```markdown
## Alternative Approaches

### Option A: [Name]
- Approach: [Description]
- Pros: [List]
- Cons: [List]
- Confidence: [High/Medium/Low]

### Option B: [Name]
- Approach: [Description]
- Pros: [List]
- Cons: [List]
- Confidence: [High/Medium/Low]

### Option C: [Name]
- Approach: [Description]
- Pros: [List]
- Cons: [List]
- Confidence: [High/Medium/Low]
```

### Step 3: Select and Document

```markdown
## Selected Approach

**Choice**: Option [X]
**Rationale**: [Why this option over others]
**Key Risks**: [Remaining risks to monitor]
**Validation Step**: [How to verify this works before going further]
```

---

## Challenge Prompts for Plans

### General Challenges

```
"What are the top 3 ways this plan could fail?"
"If I had to bet money on one thing going wrong, what would it be?"
"What would a 10x engineer change about this plan?"
"What's the most expensive mistake this plan could lead to?"
```

### Architecture Challenges

```
"Will this scale to 10x the current load?"
"How does this handle partial failures?"
"What happens if [external service] is down?"
"How would we debug this in production?"
```

### Implementation Challenges

```
"Can we ship this incrementally?"
"What's the smallest change that delivers value?"
"How do we verify this works before committing?"
"What's our rollback strategy?"
```

---

## Plan Quality Metrics

### Good Plans Have:

1. **Clear success criteria** - How do we know it's done?
2. **Identified risks** - What could go wrong?
3. **Validation steps** - How do we verify along the way?
4. **Dependency awareness** - What needs to happen first?
5. **Effort estimates** - How long for each part?
6. **Rollback plan** - How do we undo if needed?

### Red Flags in Plans:

- "This should be straightforward"
- No mention of testing
- Single path to success
- Tight coupling to specific implementation
- No mention of what could go wrong
- Vague time estimates ("a few hours")

---

## Integration with Session Workflow

### Before Implementation

1. Write plan in session file
2. Run plan critique checklist
3. Apply challenge prompts
4. Document risks and mitigations
5. Get approval before proceeding

### During Implementation

1. Track progress against plan
2. Note any deviations
3. If deviation detected, pause and re-plan
4. Update session file with changes

### After Implementation

1. Compare actual vs planned
2. Document lessons learned
3. Update CLAUDE.md if pattern emerged
