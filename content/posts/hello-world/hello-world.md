---
title: "Hello, World"
description: "The first post on this site, and a quick tour of what the blog can do."
date: 2026-09-20
tags: [meta, next.js]
---

Welcome! This site is built with [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/), exported as static HTML, and deployed to GitHub Pages with GitHub Actions.

Every post is a Markdown file in `content/posts/<slug>/<slug>.md`. Here's a quick tour of what's supported out of the box.

## Code blocks

Fenced code blocks get syntax highlighting automatically:

```python
def fib(n: int) -> int:
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a

print([fib(i) for i in range(10)])
```

```bash
npm install
npm run dev
```

## Math

Inline math like $e^{i\pi} + 1 = 0$ works, and so do display equations:

$$
\hat{\beta} = (X^\top X)^{-1} X^\top y
$$

## Tables, lists, and quotes

| Feature | Supported |
| ------- | --------- |
| GitHub-flavored Markdown | Yes |
| LaTeX via KaTeX | Yes |
| Dark mode | Yes |

- Unordered lists
- With multiple items
  - And nesting

> Blockquotes look like this.

## Images

Drop an image next to the post and reference it by filename:

```markdown
![A caption](my-image.png)
```

That's it. Delete this post and write your own.
