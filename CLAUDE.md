# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun dev          # start dev server (Turbopack)
bun build        # production build
bun lint         # ESLint
```

> **Always use `bun` as the package manager — never `npm` or `yarn`.**

## Stack

- **Next.js 16.2.6** App Router with SSG — read `node_modules/next/dist/docs/` before writing Next.js code; APIs may differ from training data
- **Tailwind CSS v4** — uses `@import "tailwindcss"` (not a `tailwind.config.js`), `@custom-variant`, `@utility`, and `@theme inline` in `globals.css`; no `tailwind.config` file exists
- **framer-motion** for animations (`framer-motion`, not `motion/react`)
- **next-themes** for dark mode (`defaultTheme="light"`, `enableColorScheme={false}`)
- **microCMS** as headless CMS for projects (server-side fetch only, API key in `.env`)

## Architecture

### Data flow

All static personal data (bio, experience, skills, process steps, workstation, inspiration, bookmarks, tech items) lives in `lib/data.ts`. Project data is fetched from microCMS via `lib/microcms.ts` — `getProjects()` / `getProject(id)` with `revalidate: 3600`.

### Component hierarchy (atomic design)

```
atoms/       — single-purpose, no business logic (TechIcon, ThemeToggle, GoogleAnalytics)
molecules/   — compositions of atoms (ProjectCard, TableOfContents, BookmarkList, WorkCard)
organisms/   — full sections (Hero, NavDock, Footer, ProcessSection, CtaSection, Skills)
templates/   — layout wrappers (PageLayout)
motion/      — animation wrappers (SectionWrapper — stagger entrance on scroll, desktop only)
```

### Layout

`PageLayout` renders: `NavDock` (floating bottom dock, all screen sizes) → `main` → `Footer`. There is **no top navbar** — navigation is dock-only. The dock uses `mix-blend-difference` for its active indicator.

`SectionWrapper` wraps page content with staggered `IntersectionObserver` animations (disabled on mobile). Each child animates: `translate-y-4 opacity-0 blur-[4px]` → in-view state, with delay `0.1 + index * 0.08s`.

### Project detail page

`app/projects/[id]/page.tsx` uses a full-width flex layout: `<article className="relative flex h-auto w-full grow px-4">` with `TableOfContents` (sticky, `left-16` offset, visible at 768px+) on the left and `<div className="mx-auto w-full max-w-lg">` as the content column. Content is fetched with `generateStaticParams` + `revalidate: 3600`.

### Theming

CSS variables are defined in `globals.css` using HSL values (e.g. `--background: 0 0% 7%` in dark mode). Colors are referenced as `bg-background`, `text-foreground`, `text-muted-foreground`, etc. Dark mode uses the `.dark` class variant (`@custom-variant dark (&:is(.dark *))`).

Two custom utilities defined in `globals.css`:
- `anim` — `transition-all duration-300 ease-in-out`
- `dock-shadow` — inset glass-morphism box-shadow for the nav dock

### Tech icons

SVG icons live in `public/icons/tech/`. Some have `{name}-dark.svg` / `{name}-light.svg` variants (aws, express, github, etc.) — `components/atoms/tech-icon.tsx` picks the correct variant based on `useTheme()`.

## Key constraints

- **No rounded corners anywhere** — never use `rounded-*` Tailwind classes
- **No `scroll={false}`** on `<Link>` components used for page navigation (breaks scroll-to-top)
- All personal data changes go in `lib/data.ts`; do not hardcode content in components
- `lib/microcms.ts` exports `parseToc(html)` which decodes HTML entities and extracts `h2–h4` headings with IDs from microCMS rich-text HTML
