# Terminal Setup for Claude Code

Optimize your terminal environment for maximum productivity with Claude Code.

---

## Recommended Terminal: Ghostty

The Claude Code team loves **Ghostty** for:
- Synchronized rendering (no tearing)
- 24-bit true color support
- Proper Unicode support
- Fast and lightweight

### Installation

```bash
# macOS
brew install ghostty

# Linux (AppImage)
# Download from https://ghostty.org
```

### Ghostty Configuration

```ini
# ~/.config/ghostty/config

# Font
font-family = "JetBrains Mono"
font-size = 14

# Colors
theme = "catppuccin-mocha"

# Window
window-padding-x = 10
window-padding-y = 10

# Performance
vsync = true
```

---

## Claude Code Statusline

Use `/statusline` to customize what shows in your terminal status bar.

### Access Settings

```bash
# In Claude Code
/statusline
```

### Recommended Configuration

Show these in your statusline:
- **Context usage** - See how much context is consumed
- **Git branch** - Know which worktree you're in
- **Model name** - Verify you're using the right model
- **Task status** - Track current task progress

### Why It Matters

- Prevents accidental commits to wrong branch
- Helps identify which worktree/session you're in
- Monitors context consumption for better management

---

## Terminal Tabs and Organization

### Color-Coded Tabs

Assign different colors to different worktrees:

| Worktree | Color | Purpose |
|----------|-------|---------|
| za (main) | Green | Stable development |
| zb (feature) | Blue | Active feature |
| zc (analysis) | Purple | Code review |
| zd (hotfix) | Red | Urgent fixes |
| ze (experiment) | Yellow | Experiments |

### Tab Naming

Name your terminal tabs to match worktrees:
- `[main] Project`
- `[feature] Auth Implementation`
- `[review] PR #123`

### Terminal Multiplexers

For managing multiple sessions without losing context:

**tmux** (recommended):
```bash
# Install
brew install tmux  # macOS
apt install tmux   # Ubuntu

# Create named sessions
tmux new -s main
tmux new -s feature
tmux new -s analysis

# Switch between sessions
tmux switch -t main
```

**Basic tmux Configuration** (~/.tmux.conf):
```bash
# Enable mouse
set -g mouse on

# Better status bar
set -g status-style bg=black,fg=white
set -g window-status-current-style bg=blue,fg=white

# Window naming
set -g automatic-rename on
set -g automatic-rename-format '#{pane_current_path}'

# Split panes
bind | split-window -h
bind - split-window -v
```

---

## Voice Dictation

You speak 3x faster than you type, and your prompts get way more detailed as a result.

### macOS

Press `fn` twice to activate dictation.

### Setup

1. System Settings > Keyboard > Dictation
2. Enable Dictation
3. Set shortcut to `Press fn Key Twice`

### Tips

- Speak naturally with punctuation: "comma", "period", "new line"
- Use for longer, more detailed prompts
- Review before sending (dictation isn't perfect)

### Windows (WSL)

1. Windows Key + H for dictation
2. Or use Windows Speech Recognition

### Linux

Options:
- `nerd-dictation` (offline)
- `vosk` API (offline)
- Google Speech API (online)

---

## Shell Configuration

### Prompt Customization

Add Claude-relevant info to your shell prompt:

**Zsh (~/.zshrc)**:
```bash
# Show git branch and status
autoload -Uz vcs_info
precmd() { vcs_info }
zsetopt PROMPT_SUBST
PROMPT='%F{green}%n%f:%F{blue}%~%f ${vcs_info_msg_0_} %# '
```

**Bash (~/.bashrc)**:
```bash
# Simple git branch display
parse_git_branch() {
    git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/(\1)/'
}
PS1='\u:\w$(parse_git_branch)\$ '
```

### Environment Variables

```bash
# Add to ~/.bashrc or ~/.zshrc

# Claude Code project root
export CLAUDE_PROJECT_ROOT="$HOME/projects/influence"

# Preferred editor
export EDITOR="code --wait"

# Claude Code specific
export CLAUDE_CODE_TASK_LIST_ID=""  # For cross-session tasks
```

---

## Keyboard Shortcuts

### Claude Code Built-in

| Shortcut | Action |
|----------|--------|
| Ctrl+C | Cancel current operation |
| Ctrl+T | Toggle task list visibility |
| fn fn | Voice dictation (macOS) |

### Customize Keybindings

```bash
# In Claude Code
/keybindings

# Or edit directly
~/.claude/keybindings.json
```

---

## Multiple Sessions Setup

### Workflow Example

```bash
# Terminal 1: Main development
za
claude

# Terminal 2: Feature development  
zb
claude

# Terminal 3: Code review / Analysis
zc
claude
```

### Session Isolation

Each terminal session has:
- Separate Claude context
- Independent task tracking
- Isolated file operations

### Best Practices

1. **Name your terminals** - Use the worktree purpose as the tab name
2. **Color code** - Different colors for different purposes
3. **One focus per terminal** - Don't mix feature work with review
4. **Keep analysis read-only** - Use zc only for reading, not writing

---

## Performance Optimization

### Large Codebases

```bash
# Exclude directories from search
echo "node_modules" >> .gitignore
echo ".next" >> .gitignore
echo "dist" >> .gitignore
```

### Fast File Operations

```bash
# Ensure ripgrep is installed (Claude uses it)
brew install ripgrep  # macOS
apt install ripgrep   # Ubuntu

# Verify
rg --version
```

### Terminal Responsiveness

- Keep terminal windows moderately sized
- Close unused background processes
- Use SSD for project directories

---

## Troubleshooting

### Slow Terminal Response

1. Check for background processes: `top` or `htop`
2. Reduce prompt complexity
3. Disable heavy plugins

### Character Rendering Issues

1. Use a Nerd Font for icons
2. Enable UTF-8: `export LANG=en_US.UTF-8`
3. Update terminal to latest version

### WSL-Specific Issues

For OneDrive paths:
- Avoid paths with spaces when possible
- Use Windows Terminal for better WSL integration
- Consider moving projects to `/home/user/projects` instead of `/mnt/c/`
