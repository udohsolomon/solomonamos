# Blog Posts - How to Add Content

## Creating a New Post

1. Create a new `.mdx` file in `content/posts/`
2. Use kebab-case for the filename: `my-awesome-post.mdx`
3. Add frontmatter at the top
4. Write your content in Markdown

## Frontmatter Template

```mdx
---
title: "Your Post Title"
excerpt: "A brief description that appears in cards and SEO"
date: "2025-01-15"
tags: ["AI", "Tutorial", "Strategy"]
featured: true
published: true
---

Your content starts here...
```

## Frontmatter Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Post title |
| `excerpt` | string | Yes | Brief description (1-2 sentences) |
| `date` | string | Yes | ISO date format: YYYY-MM-DD |
| `tags` | array | Yes | List of tags (creates tag pages automatically) |
| `featured` | boolean | No | Show on homepage? Default: false |
| `published` | boolean | No | Show post publicly? Default: true |

## Markdown Features

### Basic Formatting

```markdown
**Bold text**
*Italic text*
[Link text](https://example.com)
```

### Headings

```markdown
## H2 Heading
### H3 Heading
```

### Lists

```markdown
- Bullet point
- Another point

1. Numbered item
2. Another numbered item
```

### Code

Inline code: \`const x = 1\`

Code blocks:

\`\`\`javascript
function hello() {
  console.log('Hello world');
}
\`\`\`

### Blockquotes

```markdown
> This is a quote
```

### Tables

```markdown
| Column 1 | Column 2 |
|----------|----------|
| Data 1   | Data 2   |
```

## Publishing Workflow

1. Create your `.mdx` file in `content/posts/`
2. Set `published: false` while drafting
3. Preview locally: `npm run dev` then visit `http://localhost:3000/blog/your-slug`
4. When ready, set `published: true`
5. Commit and push to deploy

## Tips

- Use descriptive slugs (filename becomes the URL)
- Keep excerpts concise (under 160 characters)
- Use 3-5 relevant tags per post
- Mark your best content as `featured: true` to show on homepage
- Date format must be YYYY-MM-DD

## Examples

Check the existing posts in this directory for examples:
- `building-ai-agents-2025.mdx`
- `automation-playbook-solo-founders.mdx`
- `ai-strategy-non-technical-founders.mdx`
