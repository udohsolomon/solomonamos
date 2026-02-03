---
name: learning-mode
description: Explanatory output mode with ASCII diagrams and teaching-oriented responses
triggers:
  keywords:
    - explain
    - teach me
    - how does
    - why does
    - diagram
    - visualize
    - ASCII diagram
    - presentation
    - learn
    - understand
    - concept
---

# Learning Mode Protocol

Explanatory output mode with ASCII diagrams, HTML presentations, and teaching-oriented responses. Use when learning new concepts, needing explanations, or creating documentation.

---

## When to Use This Skill

- When you want to understand how something works
- When you need visual diagrams of architecture or flow
- When creating educational content or presentations
- When onboarding to a new codebase

---

## Explanatory Output Patterns

### Enable Learning Style

Configure Claude for learning-focused output:

```
Use /config and set output style to "Explanatory" or "Learning"
```

This makes Claude:
- Explain the "why" behind changes
- Show multiple approaches when relevant
- Include context about trade-offs
- Link to relevant documentation

---

## ASCII Diagram Generation

### Request Diagrams

```
"Draw an ASCII diagram of the authentication flow"
"Visualize the database schema as ASCII"
"Show me the component hierarchy as a tree"
```

### Common Diagram Types

#### Flow Diagrams

```
┌─────────┐     ┌─────────┐     ┌─────────┐
│  Start  │────▶│ Process │────▶│   End   │
└─────────┘     └─────────┘     └─────────┘
                    │
                    ▼
               ┌─────────┐
               │ Branch  │
               └─────────┘
```

#### Architecture Diagrams

```
┌────────────────────────────────────────┐
│              Frontend                   │
│  ┌──────────┐  ┌──────────┐            │
│  │  React   │  │  Next.js │            │
│  └──────────┘  └──────────┘            │
└─────────────────┬──────────────────────┘
                  │ API
┌─────────────────▼──────────────────────┐
│              Backend                    │
│  ┌──────────┐  ┌──────────┐            │
│  │  Node.js │  │ Express  │            │
│  └──────────┘  └──────────┘            │
└─────────────────┬──────────────────────┘
                  │ SQL
┌─────────────────▼──────────────────────┐
│             Database                    │
│  ┌──────────────────────────┐          │
│  │       PostgreSQL         │          │
│  └──────────────────────────┘          │
└────────────────────────────────────────┘
```

#### Tree Structures

```
src/
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   └── Input.tsx
│   └── layout/
│       ├── Header.tsx
│       └── Footer.tsx
├── pages/
│   ├── index.tsx
│   └── about.tsx
└── utils/
    └── helpers.ts
```

#### Sequence Diagrams

```
User          Frontend        Backend         Database
  │               │               │               │
  │──Request──▶│               │               │
  │               │──API Call──▶│               │
  │               │               │──Query──────▶│
  │               │               │◀──Results────│
  │               │◀──Response───│               │
  │◀──Render────│               │               │
  │               │               │               │
```

---

## HTML Presentation Generation

### Request Presentations

```
"Generate an HTML presentation explaining how authentication works in this codebase"
"Create slides explaining the database schema"
```

### Presentation Structure

Claude generates self-contained HTML with:
- Clean, minimal styling
- Code syntax highlighting
- Diagrams rendered as SVG
- Navigation controls
- Print-friendly layout

### Example Prompt

```
Create a visual HTML presentation explaining:
1. The overall architecture
2. Data flow through the system
3. Key design decisions
4. Common patterns used

Make it suitable for onboarding a new developer.
```

---

## Spaced Repetition Learning

### How It Works

1. You explain your understanding of a concept
2. Claude asks follow-up questions to fill gaps
3. Claude stores the result for future review
4. Periodic review sessions reinforce learning

### Implementation

```
"Let me explain how I understand the auth system works..."

[You explain]

"Good understanding! Let me ask some follow-up questions to fill gaps:
1. What happens when the token expires?
2. How are refresh tokens stored?
3. What's the flow for password reset?"
```

---

## Learning Prompts

### For New Codebases

```
"Walk me through this codebase like I'm a new developer"
"Explain the architecture with diagrams"
"What are the key patterns used here?"
"Show me the data flow from user input to database"
```

### For Specific Concepts

```
"Explain how React Server Components work in this app"
"Why was this pattern chosen over alternatives?"
"What would break if we changed X?"
"Trace through what happens when a user clicks this button"
```

### For Code Review Learning

```
"Explain this PR to me like I'm reviewing it"
"What are the trade-offs of this implementation?"
"What edge cases should I be thinking about?"
```

---

## Teaching Techniques

### Analogy-Based Explanation

```
"Explain database indexes like I'm familiar with library card catalogs"
"Explain async/await like a restaurant kitchen"
```

### Progressive Disclosure

```
"Give me the 30-second version first, then I'll ask for details"
"Start simple, then add complexity as I ask questions"
```

### Socratic Method

```
"Don't just tell me - ask me questions that lead me to understand"
"Help me discover why this pattern works through questions"
```

---

## Integration with Other Skills

### With codebase-navigation

```
"Explain the codebase structure and create a diagram"
```

### With plan-review

```
"Explain this plan and visualize the implementation phases"
```

### With debugger-detective

```
"Explain the debugging process as you investigate this bug"
```
