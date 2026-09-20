# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Eason Liu's personal site/blog (`https://ycliu210.github.io`). Next.js 14 (pages router, plain JS) + Tailwind, statically exported to `out/` and deployed to GitHub Pages by `.github/workflows/deploy.yml`. Modeled on franciscojavierarceo.github.io. Most content is still `TODO` placeholders — see the README checklist.

## Commands

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint     # next lint (a no-img-element warning in Bio.js is expected — next/image is not used because images are unoptimized in static export)
npm run build    # next build (static export to out/) + scripts/generate-sitemap.js
npm start        # serve out/ locally
```

There is no test suite. CI (on PRs) runs lint + build; on push to `main` it also deploys. Requires Node 20+.

## Architecture

**Single source of site metadata:** `config/seo.json` → read via `getSiteMetaData()` in `utils/helpers.js`. Name, tagline, social handles, and `siteUrl` all flow from here into `Layout`, `Bio`, `SEO`, the About page, and the sitemap script. Social links render only when the handle is non-empty.

**Static export constraints** (`next.config.js`: `output: "export"`, `trailingSlash: true`):
- Internal `<Link href>`s must end with `/` (e.g. `/writing/`, `/post/${slug}/`) so they match the exported `folder/index.html` layout. Nav active-state in `Layout.js` strips the trailing slash before `pathname.startsWith`.
- No server runtime; all data loading happens in `getStaticProps`/`getStaticPaths` via `utils/posts.js`, which reads the filesystem at build time.

**Posts** (`utils/posts.js`): each post is `content/posts/<slug>/<slug>.md` — a folder is required and the `.md` filename must equal the folder name. Frontmatter: `title`, `description`, `date`, `tags`, optional `draft`. Drafts are filtered out only when `NODE_ENV=production` (i.e. in `next build`), so they still show in `npm run dev`. Posts are sorted newest-first; `getPostBySlug` derives prev/next from that order.

**Post images:** a relative `![](foo.png)` in Markdown is rewritten by `pages/post/[slug].js` to `/content/posts/<slug>/foo.png`. Those files are not in `public/` — `scripts/generate-sitemap.js` copies non-`.md` files from post folders into `out/` *after* `next build`. Consequence: post images only resolve after a full `npm run build`, not in `next dev`.

**Markdown rendering:** `react-markdown` with `remark-gfm`, `remark-math`, `rehype-raw` (raw HTML allowed), `rehype-katex`, `rehype-highlight`. KaTeX CSS is imported globally in `pages/_app.js`.

**Theming:** colors are CSS variables at the top of `assets/main.css` (`--paper`, `--ink`, `--muted`, `--line`, `--accent`, `--accent-soft`, `--code-bg`), exposed as Tailwind colors (`bg-paper`, `text-ink`, `text-accent`, `border-line`…) in `tailwind.config.js`. Dark mode is class-based, toggled by `next-themes` (`.dark` on `<html>`). Re-skin by editing the variables, not component classes. Reusable class names (`site-container`, `rule`, `eyebrow`, `nav-link`, `post-link`, `tag`, `profile-photo`) live in `@layer components` in `main.css`.

**Path aliases** (`jsconfig.json`): `@components/*`, `@utils/*`, `@assets/*`, `@config/*`, `@content/*`. Shared components are re-exported from `components/common/index.js`.

**Content-as-code:** projects and presentations are plain arrays in `content/projects.js` / `content/presentations.js`; setting either to `[]` hides its section (and the Presentations page shows an empty state).

## Deployment notes

- GitHub Pages source must be **GitHub Actions** (already configured via API; if deploys ever revert to publishing raw source, check Settings → Pages).
- `.nojekyll` at the repo root is intentional; keep it.
- Pushing changes to `.github/workflows/` requires a GitHub token with the `workflow` scope (`gh auth refresh -s workflow`).
