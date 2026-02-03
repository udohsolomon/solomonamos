#!/bin/bash
# =============================================================================
# Claude Code Worktree Aliases
# =============================================================================
# Source this file in your ~/.bashrc or ~/.zshrc:
#   source /path/to/project/.claude/setup/worktree-aliases.sh
#
# Or copy the aliases directly into your shell config.
# =============================================================================

# -----------------------------------------------------------------------------
# Configuration - Update this to your project root
# -----------------------------------------------------------------------------
export CLAUDE_PROJECT_ROOT="${CLAUDE_PROJECT_ROOT:-$HOME/projects/influence}"

# -----------------------------------------------------------------------------
# Quick Navigation Aliases (za, zb, zc, zd, ze)
# -----------------------------------------------------------------------------

# za - Main/stable development worktree
alias za='cd "$CLAUDE_PROJECT_ROOT/worktree-main" 2>/dev/null || cd "$CLAUDE_PROJECT_ROOT" && echo "Main worktree (stable)"'

# zb - Feature development worktree
alias zb='cd "$CLAUDE_PROJECT_ROOT/worktree-feature" && echo "Feature worktree (active)"'

# zc - Analysis/review worktree (treat as read-only)
alias zc='cd "$CLAUDE_PROJECT_ROOT/worktree-analysis" && echo "Analysis worktree (read-only)"'

# zd - Hotfix worktree
alias zd='cd "$CLAUDE_PROJECT_ROOT/worktree-hotfix" && echo "Hotfix worktree"'

# ze - Experiment worktree
alias ze='cd "$CLAUDE_PROJECT_ROOT/worktree-experiment" && echo "Experiment worktree"'

# -----------------------------------------------------------------------------
# Worktree Management Aliases
# -----------------------------------------------------------------------------

# List all worktrees
alias zwl='git worktree list'

# Add worktree (usage: zwa ../worktree-name branch-name)
alias zwa='git worktree add'

# Remove worktree (usage: zwr ../worktree-name)
alias zwr='git worktree remove'

# Prune stale worktree references
alias zwp='git worktree prune'

# -----------------------------------------------------------------------------
# Worktree Creation Functions
# -----------------------------------------------------------------------------

# Create a new feature worktree
# Usage: zwf feature-name
# Creates: ../worktree-feature-name on branch feature-name
zwf() {
  local name="${1:-feature}"
  local worktree_path="../worktree-$name"

  if [ -d "$worktree_path" ]; then
    echo "Error: Worktree $worktree_path already exists"
    return 1
  fi

  git worktree add "$worktree_path" -b "$name"
  echo "Created $worktree_path on branch $name"
  echo "Navigate with: cd $worktree_path"
}

# Create analysis worktree tracking a specific branch
# Usage: zwa-analysis branch-name
# Creates: ../worktree-analysis tracking the specified branch
zwa-analysis() {
  local branch="${1:-main}"
  local worktree_path="../worktree-analysis"

  if [ -d "$worktree_path" ]; then
    echo "Removing existing analysis worktree..."
    git worktree remove "$worktree_path" --force
  fi

  git worktree add "$worktree_path" "$branch"
  echo "Created analysis worktree tracking $branch"
  echo "Navigate with: zc"
}

# Create hotfix worktree from a tag or branch
# Usage: zwh hotfix-name [base-ref]
# Creates: ../worktree-hotfix on branch hotfix/hotfix-name
zwh() {
  local name="${1:-urgent}"
  local base="${2:-main}"
  local worktree_path="../worktree-hotfix"

  if [ -d "$worktree_path" ]; then
    echo "Error: Hotfix worktree already exists. Remove it first with: zwr $worktree_path"
    return 1
  fi

  git worktree add "$worktree_path" -b "hotfix/$name" "$base"
  echo "Created hotfix worktree on branch hotfix/$name from $base"
  echo "Navigate with: zd"
}

# -----------------------------------------------------------------------------
# Cleanup Functions
# -----------------------------------------------------------------------------

# Remove feature worktree and optionally delete branch
# Usage: zwf-cleanup [worktree-name] [--delete-branch]
zwf-cleanup() {
  local name="${1:-feature}"
  local delete_branch="${2:-}"
  local worktree_path="../worktree-$name"

  if [ ! -d "$worktree_path" ]; then
    echo "Error: Worktree $worktree_path does not exist"
    return 1
  fi

  git worktree remove "$worktree_path"
  echo "Removed worktree $worktree_path"

  if [ "$delete_branch" = "--delete-branch" ]; then
    git branch -d "$name" 2>/dev/null || git branch -D "$name"
    echo "Deleted branch $name"
  fi
}

# -----------------------------------------------------------------------------
# Status Functions
# -----------------------------------------------------------------------------

# Show status of all worktrees
zws() {
  echo "=== Worktree Status ==="
  git worktree list
  echo ""
  echo "=== Quick Navigation ==="
  echo "za - Main/stable"
  echo "zb - Feature"
  echo "zc - Analysis (read-only)"
  echo "zd - Hotfix"
  echo "ze - Experiment"
}

# -----------------------------------------------------------------------------
# Print help
# -----------------------------------------------------------------------------
zwhelp() {
  cat << 'EOF'
Claude Code Worktree Aliases
============================

Navigation:
  za    - Jump to main/stable worktree
  zb    - Jump to feature worktree
  zc    - Jump to analysis worktree (read-only)
  zd    - Jump to hotfix worktree
  ze    - Jump to experiment worktree

Management:
  zwl   - List all worktrees
  zwa   - Add worktree (git worktree add)
  zwr   - Remove worktree
  zwp   - Prune stale references

Functions:
  zwf NAME          - Create feature worktree on branch NAME
  zwa-analysis BR   - Create analysis worktree tracking branch BR
  zwh NAME [BASE]   - Create hotfix worktree from BASE (default: main)
  zwf-cleanup NAME  - Remove worktree and optionally delete branch
  zws               - Show status of all worktrees
  zwhelp            - Show this help

Examples:
  zwf my-feature              # Create worktree-my-feature
  zwa-analysis origin/pr-123  # Review a PR
  zwh urgent-fix v1.2.0       # Hotfix from tag
  zwf-cleanup my-feature --delete-branch
EOF
}

echo "Worktree aliases loaded. Type 'zwhelp' for commands."
