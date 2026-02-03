---
name: techdebt
description: Track, categorize, and prioritize technical debt systematically
triggers:
  keywords:
    - tech debt
    - technical debt
    - code smell
    - refactor
    - legacy code
    - debt backlog
    - cleanup
    - modernize
    - deprecation
    - maintenance burden
    - /techdebt
---

# Technical Debt Management

Systematic tracking and prioritization of technical debt. Run /techdebt at the end of every session to identify and kill duplicated code.

---

## End-of-Session Debt Scan

**Run this at the end of every coding session:**

```
/techdebt
```

This triggers a scan for:
- Duplicated code patterns
- TODO/FIXME comments
- Deprecated API usage
- Missing error handling
- Incomplete test coverage
- Hardcoded values that should be config

---

## Debt Categories

### 1. Architectural Debt
Design decisions that limit scalability or maintainability.

### 2. Code Quality Debt
Violations of coding standards and best practices.

### 3. Dependency Debt
Outdated or vulnerable packages.

### 4. Documentation Debt
Missing or outdated documentation.

### 5. Testing Debt
Insufficient test coverage or brittle tests.

### 6. Performance Debt
Known bottlenecks and inefficiencies.

---

## Debt Registry

**Location:** .claude/techdebt/debt-registry.md

### Registry Format

```markdown
# Technical Debt Registry

Last updated: YYYY-MM-DD
Total items: X
Critical: X | High: X | Medium: X | Low: X

---

## [DEBT-001] Title

- **Category**: [Architectural/Code Quality/Dependencies/Documentation/Testing/Performance]
- **Priority**: [Critical/High/Medium/Low]
- **Impact**: What problems does this cause?
- **Effort**: [Hours: 1-4 | Days: 1-3 | Weeks: 1-2]
- **Location**: File paths or components affected
- **Created**: YYYY-MM-DD
- **Owner**: [Unassigned/Agent/Developer name]
- **Status**: [Open/In Progress/Resolved]
```

---

## Priority Matrix

| Priority | Criteria | Action Timeline |
|----------|----------|-----------------|
| **Critical** | Security risk, data loss potential, blocks releases | This sprint |
| **High** | Significant impact on development velocity | Next 2 sprints |
| **Medium** | Noticeable friction, workarounds needed | Next quarter |
| **Low** | Nice to have, minor annoyance | Backlog |

---

## Debt Scan Commands

### Find Code Duplication

```bash
# Using jscpd (JavaScript Copy/Paste Detector)
npx jscpd src/ --min-lines 5 --min-tokens 50
```

### Find TODOs and FIXMEs

```bash
# Search for debt markers
rg "TODO|FIXME|HACK|XXX|TEMP|DEPRECATED" --type-add 'code:*.{ts,tsx,js,jsx,py}' -t code
```

### Check Dependency Health

```bash
# Outdated packages
npm outdated

# Security vulnerabilities
npm audit
```

---

## Session-End Debt Protocol

Run this checklist at the end of each coding session:

### 1. Quick Scan (2 min)
```bash
# Check for new TODOs you added
git diff HEAD~1 | grep -E "^\+.*TODO|FIXME"
```

### 2. Evaluate Changes (3 min)
- Did I introduce any shortcuts that should be revisited?
- Did I copy-paste code that should be abstracted?
- Did I add hardcoded values that need config?

### 3. Log New Debt (2 min)
If debt was introduced, add to registry.

### 4. Quick Win (Optional)
If time permits, fix one Low/Medium debt item that's <30 min.

---

## Debt Paydown Strategy

### Boy Scout Rule
"Leave the code better than you found it"

### Dedicated Debt Sprints
Every 4-6 sprints, dedicate 20% capacity to debt paydown.

### Debt Budget
Each feature sprint includes 10-20% time for debt.

---

## Integration with Agents

### Debt Detection
The quality-engineer agent can run debt scans and categorize findings.

### Debt Resolution
Assign debt items to appropriate specialist agents:
- Architectural -> backend-engineer or frontend-specialist
- Dependencies -> backend-engineer
- Testing -> quality-engineer
- Performance -> performance-optimizer
- Documentation -> content-writer
