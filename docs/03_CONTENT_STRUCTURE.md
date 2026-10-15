# Content Structure

## Site map
```
/                  Home
/work/[slug]       Case studies (MDX)
/about             About (optional, can merge into home)
/resume.pdf        Static file in /public
```

## Repo structure
```
portfolio/
├─ public/
│  ├─ resume.pdf
│  └─ favicon.svg
├─ src/
│  ├─ assets/            # case study images
│  ├─ components/        # Nav, Footer, ProjectCard, Section
│  ├─ content/
│  │  ├─ config.ts       # collection schema
│  │  └─ work/           # one .mdx per case study
│  ├─ layouts/
│  │  └─ Base.astro
│  ├─ pages/
│  │  ├─ index.astro
│  │  ├─ about.astro
│  │  └─ work/[...slug].astro
│  └─ styles/global.css
├─ astro.config.mjs
└─ tailwind.config.mjs
```

## Case study frontmatter
```yaml
---
title: "AbleCircle"
summary: "One-line outcome."
role: "Product design + development"
timeline: "X months"
tools: ["Figma", "React"]
cover: "../../assets/ablecircle-cover.png"
order: 1
---
```

## Case study template (keep each section short)
1. **Outcome** (1 line, metric or result up top)
2. **Problem**: who, what pain, why it matters
3. **My role + constraints**: team size, timeline, what was yours
4. **Research**: what you learned, 2 to 3 real insights, not a method list
5. **Key decisions**: 2 to 3 design decisions, each with the alternative you rejected and why
6. **Final design**: annotated screens, prototype embed
7. **Impact / what I'd do next**: results, feedback, honest reflection

## Which projects to show (from resume)
- **1. AbleCircle** (flagship, full case study). Seed grant, patent application, real user research. Lead with it.
- **2. AntiSoch** (medium case study). Distinct child vs adult journeys + gamified safety education is a strong interaction design story.
- **3. Simply Hemp** (short write-up). Hult Prize 5th place is the hook. Keep it to one page: problem, flow, final screens.
- **Not here:** HabitSense, Skillora, RAG repos, StackPilot. GitHub only. LeetCode link: drop it from the site, it's noise for design roles.

## Home page copy skeleton
- Hero: `Name. Product designer who codes.` + one sentence on what you care about
- 3 project cards: cover, title, one-line outcome
- Short about: 3 sentences max
- Contact: email, LinkedIn, resume

## Style rules
- One typeface, one accent color, lots of whitespace
- Clear type hierarchy (H1 / H2 / body / caption), no decorative color
- Images: real screens with annotations, not mockup-frame fluff
