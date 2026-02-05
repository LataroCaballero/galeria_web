# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Portfolio/gallery website for "Galería Estudio", an interior design studio. Built as a static site in Spanish.

## Commands

- `npm run dev` — Start dev server with hot reload
- `npm run build` — Build static site to `dist/`
- `npm run preview` — Preview production build locally
- `npm run deploy` — Deploy `dist/` to GitHub Pages via `gh-pages`

No test framework is configured.

## Architecture

**Framework:** Astro 5 (static output) with React 19 integration and Tailwind CSS 3.

**Routing:** File-based via `src/pages/`. Each `.astro` file maps to a route (e.g., `estudio.astro` → `/estudio`). Seven pages: index, estudio, styling, proyectos, muestras, shop, contacto.

**Layout:** `BaseLayout.astro` wraps all pages. Accepts props: `title` (string), `darkMode` (boolean), `showNavbar` (boolean). Content is injected via Astro's `<slot />`.

**Components:** All in `src/components/` as `.astro` files:
- `Hero.astro` — Full-screen video background with responsive sources (WebM mobile/desktop + MP4 fallback)
- `Navbar.astro` — Fixed header with hamburger menu (toggle via inline JS and classList)
- `Section.astro` — Two-column layout (text + image) used across content pages
- `ProjectCard.astro` — Image card with caption, 3:4 aspect ratio

**Styling:** Tailwind with Astro's `applyBaseStyles: false` — base styles are in `src/styles/globals.css`. Custom Tailwind theme tokens defined in `tailwind.config.js`:
- Colors: `crema` (#F2EBD8), `carbón` (#2B2521), `tinta` (#3C3A37)
- Font: Perpetua (loaded from `public/fonts/`) as the serif family
- Letter-spacing: `tightish` (-0.01em)

**Static assets:** Images and videos live in `public/images/` and `public/videos/`. No image optimization pipeline — files are served as-is.

**Client-side JS:** Minimal. No client-side state management or React hooks. Interactive behavior (menu toggle) is handled with inline `onclick` handlers.
