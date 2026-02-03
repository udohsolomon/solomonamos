---
name: worktree-management
description: Manage parallel git worktrees for isolated development environments
triggers:
  keywords:
    - worktree
    - parallel development
    - isolated branch
    - za
    - zb
    - zc
    - switch worktree
    - new worktree
    - analysis worktree
    - review worktree
---

# Worktree Management Protocol

Git worktrees allow running 3-5 parallel Claude sessions on separate branches simultaneously. This is the single biggest productivity unlock according to the Claude Code team.

## Why Worktrees?

- **Parallel development**: Work on multiple features without stashing/switching
- **Isolated testing**: Test changes without affecting main development
- **Code review**: Dedicated read-only environment for reviewing PRs
- **Analysis**: Run queries and explore logs without interrupting work

---

## Worktree Naming Convention

| Worktree | Purpose | Branch Pattern | Alias |
|----------|---------|----------------|-------|
| `worktree-main` | Primary stable development | `main` or `develop` | `za` |
| `worktree-feature` | Active feature work | `feature/*` | `zb` |
| `worktree-analysis` | Code review and analysis (read-only mindset) | any branch | `zc` |
| `worktree-hotfix` | Emergency production fixes | `hotfix/*` | `zd` |
| `worktree-experiment` | Experimental/spike work | `experiment/*` | `ze` |

---

## Directory Structure

```
~/projects/
└── my-project/
    ├── worktree-main/           # Primary development (za)
    │   └── .claude/             # Shared Claude configuration
    ├── worktree-feature/        # Active feature (zb)
    │   └── .git -> ../main/.git
    ├── worktree-analysis/       # Code review (zc)
    │   └── .git -> ../main/.git
    └── worktree-hotfix/         # Emergency fixes (zd)
        └── .git -> ../main/.git
```

---

## Shell Aliases

Add to `~/.bashrc` or `~/.zshrc` (or source `.claude/setup/worktree-aliases.sh`):

```bash
# Set your project root
export CLAUDE_PROJECT_ROOT="$HOME/projects/my-project"

# Quick worktree navigation
alias za='cd "$CLAUDE_PROJECT_ROOT/worktree-main" && echo "Main worktree (stable)"'
alias zb='cd "$CLAUDE_PROJECT_ROOT/worktree-feature" && echo "Feature worktree (active)"'
alias zc='cd "$CLAUDE_PROJECT_ROOT/worktree-analysis" && echo "Analysis worktree (read-only)"'
alias zd='cd "$CLAUDE_PROJECT_ROOT/worktree-hotfix" && echo "Hotfix worktree"'
alias ze='cd "$CLAUDE_PROJECT_ROOT/worktree-experiment" && echo "Experiment worktree"'

# Worktree management
alias zwl='git worktree list'
alias zwa='git worktree add'
alias zwr='git worktree remove'
alias zwp='git worktree prune'

# Create new feature worktree
zwf() {
  local name="${1:-feature}"
  git worktree add "../worktree-$name" -b "$name"
  echo "Created worktree-$name on branch $name"
}
```

---

## Essential Commands

### Create Worktrees

```bash
# Create feature worktree from current branch
git worktree add ../worktree-feature -b feature/my-feature

# Create analysis worktree tracking main (for reviews)
git worktree add ../worktree-analysis main

# Create hotfix worktree from production tag
git worktree add ../worktree-hotfix -b hotfix/urgent-fix v1.2.3

# Create experiment worktree (disposable)
git worktree add ../worktree-experiment -b experiment/try-something
```

### List and Manage

```bash
# List all worktrees
git worktree list

# Remove a worktree (after merging/discarding)
git worktree remove ../worktree-feature

# Clean up stale worktree references
git worktree prune
```

### Switch Context

```bash
# Just use the aliases!
za  # Jump to main development
zb  # Jump to feature work
zc  # Jump to analysis/review
```

---

## Best Practices

### 1. Keep worktree-analysis read-only
- Use this worktree for code review, not commits
- Great for running analysis queries or exploring logs
- Never modify code here - switch to feature worktree

### 2. One feature per worktree
- Don't mix multiple features in worktree-feature
- Create additional worktrees for parallel features: `worktree-feature-2`

### 3. Clean up after merging
```bash
# After feature is merged
git worktree remove ../worktree-feature
git branch -d feature/my-feature  # if needed
```

### 4. Color-code terminals
- Assign different terminal tab colors to each worktree
- Visual cue prevents accidental commits to wrong branch

### 5. Name terminal tabs
- Tab name = worktree name for quick identification
- tmux users: Set window names to match worktrees

---

## Workflow Examples

### Parallel Feature Development

```bash
# Terminal 1: Main development
za
claude  # Start Claude session for main work

# Terminal 2: Feature A
zb
claude  # Start Claude session for feature A

# Terminal 3: Feature B (create new worktree)
git worktree add ../worktree-feature-b -b feature/feature-b
cd ../worktree-feature-b
claude  # Start Claude session for feature B
```

### Code Review Workflow

```bash
# Terminal 1: Continue your work
za

# Terminal 2: Review PR in isolation
zc
git fetch origin
git checkout origin/feature/pr-to-review
# Review code, run tests, analyze - but don't commit here
```

### Hotfix While Developing

```bash
# You're working on a feature in zb
# Production bug reported!

# Terminal 2: Create hotfix worktree
git worktree add ../worktree-hotfix -b hotfix/urgent main
zd
claude  # Fix the bug
git push origin hotfix/urgent

# Back to feature work in original terminal
zb
```

---

## Troubleshooting

### "fatal: 'branch' is already checked out"
A branch can only be checked out in one worktree. Create a new branch:
```bash
git worktree add ../worktree-new -b new-branch-name
```

### Stale worktree references
```bash
git worktree prune
```

### Worktree locked
```bash
git worktree unlock ../worktree-name
```

---

## Integration with Claude Sessions

Each worktree can run its own Claude session independently:

- **Session isolation**: Each worktree has separate context
- **Parallel execution**: Run tests in one, develop in another
- **Context preservation**: Switch worktrees without losing Claude context

**Tip**: Use `/statusline` to show current git branch - helps identify which worktree you're in.
