---
name: ci-automation
description: Automate CI/CD troubleshooting and fix failing builds
triggers:
  keywords:
    - CI
    - CD
    - pipeline
    - build failed
    - test failed
    - GitHub Actions
    - deployment failed
    - fix CI
    - fix build
    - workflow failed
    - docker logs
---

# CI/CD Automation Protocol

Automate the debugging and fixing of CI/CD pipeline failures. When CI fails, don't micromanage - just say "fix the failing CI tests" and let Claude handle it.

---

## Quick Commands

```bash
# Just tell Claude:
"Go fix the failing CI tests"
"Fix the build"
"The pipeline is failing, debug it"
```

---

## GitHub Actions Troubleshooting

### View Workflow Status

```bash
# List recent workflow runs
gh run list --limit 10

# View specific run details
gh run view <run-id>

# View failed run logs
gh run view <run-id> --log-failed

# Download logs for analysis
gh run download <run-id>
```

### Common Failure Patterns

#### 1. Test Failures

**Common fixes:**
- Missing test dependencies
- Environment variable not set
- Database not seeded
- Async test timeout

#### 2. Build Failures

**Common fixes:**
- TypeScript errors (run tsc --noEmit locally)
- Missing dependencies (check package.json)
- Import path issues
- Environment variables missing in build

#### 3. Dependency Installation Failures

**Common fixes:**
- Corrupted lockfile - regenerate with npm install
- Private package auth - check NPM_TOKEN secret
- Node version mismatch - check .nvmrc or engines field

#### 4. Docker Build Failures

**Common fixes:**
- Missing files in COPY
- Wrong base image
- Build arg not passed

---

## Docker Logs Troubleshooting

### View Container Logs

```bash
# View recent logs
docker logs <container> --tail 100

# Follow logs in real-time
docker logs <container> -f

# View logs with timestamps
docker logs <container> -t
```

### Docker Compose Logs

```bash
# All services
docker compose logs

# Specific service
docker compose logs api

# Follow with tail
docker compose logs -f --tail 100
```

---

## Fix-Failing-CI Workflow

### Step 1: Identify the Failure

```bash
# Get the latest failed run
gh run list --status failure --limit 1

# View the failure details
gh run view <run-id> --log-failed
```

### Step 2: Reproduce Locally

```bash
# For test failures
npm test

# For build failures
npm run build

# For Docker failures
docker build .
```

### Step 3: Fix and Verify

```bash
# Verify locally
npm test
npm run build

# Push and monitor
git push
gh run watch
```

---

## Common CI Issues and Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Module not found | Missing dependency | Check package.json, run npm ci |
| EACCES permission denied | File permissions | Check Dockerfile USER, chmod |
| Timeout exceeded | Slow tests | Increase timeout, optimize tests |
| Out of memory | Large build | Increase runner memory, optimize |
| Secret not found | Missing secret | Add to repo Settings > Secrets |

---

## Integration with Debugger-Detective

When CI failures are complex, invoke the debugger-detective agent:

```
Use debugger-detective to investigate this CI failure with the Five Whys methodology
```

---

## Prevention: Pre-commit Hooks

```bash
# Add to .husky/pre-commit
npm run lint
npm run typecheck
npm test -- --onlyChanged
```

This catches issues before they reach CI.
