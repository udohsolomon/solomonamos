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
```bash
# View test output
gh run view <run-id> --log | grep -A 20 "FAIL"

# Re-run failed tests locally
npm test -- --testPathPattern="failing-test"
```

**Common fixes:**
- Missing test dependencies
- Environment variable not set
- Database not seeded
- Async test timeout

#### 2. Build Failures
```bash
# View build logs
gh run view <run-id> --log | grep -A 10 "error"
```

**Common fixes:**
- TypeScript errors (run `tsc --noEmit` locally)
- Missing dependencies (check package.json)
- Import path issues
- Environment variables missing in build

#### 3. Dependency Installation Failures
```bash
# Check for lockfile issues
npm ci  # Uses lockfile exactly
```

**Common fixes:**
- Corrupted lockfile - regenerate with `npm install`
- Private package auth - check NPM_TOKEN secret
- Node version mismatch - check .nvmrc or engines field

#### 4. Docker Build Failures
```bash
# Build locally to reproduce
docker build -t test .

# Check specific stage
docker build --target build -t test .
```

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

# View logs from specific time
docker logs <container> --since 10m
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

### Debug Running Containers

```bash
# Execute shell in container
docker exec -it <container> /bin/sh

# Check environment variables
docker exec <container> env

# Check running processes
docker exec <container> ps aux

# Check disk usage
docker exec <container> df -h
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
# Make the fix
# ...

# Verify locally
npm test
npm run build

# Push and monitor
git push
gh run watch
```

### Step 4: Update Tests if Needed

If the failure reveals a gap in testing:
```bash
# Add test for the edge case
# Update CI config if needed
```

---

## CI Configuration Patterns

### GitHub Actions Debugging

Add debugging to workflow:

```yaml
- name: Debug step
  if: failure()
  run: |
    echo "Node version: $(node -v)"
    echo "NPM version: $(npm -v)"
    echo "Working directory: $(pwd)"
    ls -la
    cat package.json
```

### Environment Variables

```yaml
env:
  CI: true
  NODE_ENV: test
  DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

### Caching for Faster Builds

```yaml
- uses: actions/cache@v3
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
```

---

## Common CI Issues and Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| "Module not found" | Missing dependency | Check package.json, run npm ci |
| "EACCES permission denied" | File permissions | Check Dockerfile USER, chmod |
| "Timeout exceeded" | Slow tests | Increase timeout, optimize tests |
| "Out of memory" | Large build | Increase runner memory, optimize |
| "Secret not found" | Missing secret | Add to repo Settings > Secrets |
| "Rate limit exceeded" | Too many API calls | Add caching, reduce calls |

---

## Integration with Debugger-Detective

When CI failures are complex, invoke the `debugger-detective` agent:

```
Use debugger-detective to investigate this CI failure with the Five Whys methodology
```

The debugger-detective will:
1. Analyze the error logs
2. Apply Five Whys to find root cause
3. Propose a fix
4. Verify the fix resolves the issue

---

## Slack Integration (if Slack MCP enabled)

```
# Paste a Slack bug thread and say:
"Fix this"

# Claude will:
# 1. Parse the bug report
# 2. Identify the failing component
# 3. Fix the issue
# 4. Report back
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
