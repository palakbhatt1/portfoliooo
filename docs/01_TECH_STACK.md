# Tech Stack

Goal: static, fast, zero-backend portfolio. Shipped in 4 hrs. No over-engineering.

## Decision

| Layer | Pick | Why |
|---|---|---|
| Framework | **Astro** | Static output, ships almost no JS, great Lighthouse scores by default |
| Styling | **Tailwind CSS** | Fast iteration, consistent spacing/type scale |
| Content | **MDX** (Astro content collections) | Case studies as markdown files, embed images/Figma/video inline |
| Font | **Inter** (or Geist) via `@fontsource` | Self-hosted, no layout shift, clean |
| Icons | **lucide** | Minimal, consistent |
| Images | `astro:assets` | Auto-optimized WebP, lazy loading |
| Prototypes | **Figma embeds** + Loom/MP4 | Recruiters want to click through, not read |
| Analytics | **Vercel Analytics** (optional) | One line, tells you if anyone opens case studies |
| Hosting | **Vercel** | Git push = deploy, free tier, preview URLs |
| Domain | Free `*.vercel.app` now, custom later | Don't burn time on DNS today |

## Explicitly skipping
- CMS (Sanity/Contentful): MDX files are enough
- Framer Motion / GSAP: CSS transitions only. Motion is polish, not priority
- Dark mode: only if time remains after hour 4
- Backend/contact form service: use `mailto:` + LinkedIn link
- React: not needed. Add an island later only if you need interactivity

## Setup
```bash
npm create astro@latest portfolio -- --template minimal
cd portfolio
npx astro add tailwind mdx
npm i @fontsource-variable/inter lucide-astro
```
