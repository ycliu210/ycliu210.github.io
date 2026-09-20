# ycliu210.github.io

Eason Liu's personal site and blog, built with [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/), exported as static HTML and deployed to GitHub Pages with GitHub Actions.

## Features

- Markdown blog posts with frontmatter (`content/posts/`)
- Syntax highlighting for code blocks
- LaTeX math via KaTeX (`$inline$` and `$$display$$`)
- GitHub-flavored Markdown (tables, task lists, strikethrough)
- Light / dark mode (follows the system, with a manual toggle)
- Projects and presentations sections driven by plain JS data files
- SEO metadata (Open Graph, Twitter cards, canonical URLs) and an auto-generated sitemap
- Automatic deploy to GitHub Pages on every push to `main`

## TODO — make it yours

The framework is done; the content is placeholder. Work through this list:

- [ ] `config/seo.json` — fill in `author.summary` and `description`; add LinkedIn / Twitter handles if you want them shown
- [ ] `public/profile.jpg` — add a real photo and point `author.photo` at it in `config/seo.json`
- [ ] `pages/about.js` — replace the TODO paragraphs with your own bio
- [ ] `content/projects.js` — list real projects (or set to `[]` to hide the section)
- [ ] `content/presentations.js` — list real talks (or set to `[]` to hide the section and page)
- [ ] `content/posts/hello-world/` — delete the sample post and write your first one
- [ ] GitHub repo **Settings → Pages → Source: GitHub Actions** (one-time, required for deploys)

## Getting started

Requires Node 20+.

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # static export to ./out (+ sitemap)
npm start          # serve ./out locally
```

## Customizing

| What | Where |
| ---- | ----- |
| Name, tagline, description, social links | `config/seo.json` |
| Profile photo | drop `public/profile.jpg` in and point `author.photo` at it in `config/seo.json` |
| About page copy | `pages/about.js` |
| Projects on the home page | `content/projects.js` |
| Presentations | `content/presentations.js` |
| Colors (light + dark) | CSS variables at the top of `assets/main.css` |
| Nav links | `NAV_LINKS` in `components/common/Layout.js` |

## Writing a post

Create a folder and a Markdown file with the same name:

```
content/posts/my-first-post/my-first-post.md
```

```markdown
---
title: "My First Post"
description: "One sentence shown in lists and in the page's meta description."
date: 2026-09-20
tags: [example]
draft: false        # optional; drafts are hidden from production builds
---

Post body goes here.
```

Images can live in the same folder and be referenced by filename: `![alt](diagram.png)`.

## Deploying

The workflow in `.github/workflows/deploy.yml` builds and deploys on every push to `main`.

One-time setup in the GitHub repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

## Project layout

```
assets/        global CSS + theme tokens
components/    shared React components (Layout, Bio, SEO, PostList, ThemeToggle)
config/        seo.json — site metadata
content/       posts (Markdown), projects.js, presentations.js
pages/         Next.js routes
public/        static files (favicon, robots.txt, profile photo)
scripts/       generate-sitemap.js (runs after build)
utils/         post loading + helpers
```

Inspired by [franciscojavierarceo.github.io](https://github.com/franciscojavierarceo/franciscojavierarceo.github.io).
