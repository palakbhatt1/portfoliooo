# Tech Stack

A portfolio for an **AI Engineer / Product Designer** needs two things: a polished front end (the intro, the animation and the pixel-grid background) and room to grow into small AI demos later. This stack covers both without extra complexity.

## Recommended stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 15 (App Router)** | One-command deploys, built-in image optimisation, and API routes if you later add an AI demo, chatbot or contact form |
| Language | **TypeScript** | Catches animation and event-handler bugs early |
| Styling | **Tailwind CSS** | Fast to build and easy to make responsive |
| Animation | **GSAP** (`gsap` + `@gsap/react`) | Best fit for a multi-step sequence (hold progress, 3D rotation, flash, reveal) that must be reversible when the user releases early |
| Pixel-grid background | **Plain Canvas 2D** | Downsample a video or webcam frame and draw squares. No WebGL or three.js needed |
| Fonts | `next/font` | Self-hosted, no layout shift |
| Content | Typed data files or **MDX** for projects | Easy to edit, no CMS needed |
| Hosting | **Vercel** | Native Next.js hosting, free tier, preview deploys |
| Analytics (optional) | Vercel Web Analytics | One line to enable, privacy-friendly |

## Why GSAP and not Framer Motion?

Both work. GSAP is the better fit here because:

- You need one **timeline** you can scrub (hold progress 0 to 1) and **reverse** (early release).
- The entrance is a sequence: rotate, flash, pixel dissolve. Timelines express that cleanly.
- `gsap.quickTo` gives smooth cursor-tilt with very little code.

Framer Motion (now `motion`) is great for component-level transitions in React. You can still use it for page sections later if you like.

## Why Canvas 2D for the pixel grid?

1. Draw the video or webcam frame into a tiny offscreen canvas (for example 100 x 56 pixels).
2. Read the pixels with `getImageData`.
3. Draw a coloured square per pixel on the visible canvas, scaled up.

This is cheap, runs well on phones when capped at about 24 fps, and is easy to restyle (palette, cell size, gap).

## Alternative

If the portfolio is **completely static** (no API routes, no AI demos), use **Vite + React** and host on **Cloudflare Pages**. It is slightly lighter, but Next.js on Vercel is the safer default, especially if you add AI features later.

## Suggested folder layout

```
portfolio/
├─ app/
│  ├─ layout.tsx
│  ├─ page.tsx                 # mounts <Intro/> over <Home/>
│  └─ globals.css
├─ components/
│  ├─ intro/
│  │  ├─ CreativeLicenseIntro.tsx   # hold logic + GSAP timeline
│  │  └─ PixelDissolve.tsx          # canvas block reveal
│  ├─ home/
│  │  ├─ PixelGridBackground.tsx    # webcam / video -> canvas
│  │  └─ ...sections
├─ public/
│  ├─ creative-license.webp
│  ├─ creative-license.png
│  ├─ pixel-fallback.mp4
│  └─ pixel-fallback.webm
├─ package.json
└─ next.config.ts
```

## Setup commands

```bash
npx create-next-app@latest portfolio --typescript --tailwind --app --eslint
cd portfolio
npm install gsap @gsap/react
```

Copy the two image files into `public/`, then paste `PROMPT.md` into your AI coding tool.

## Asset notes

- `creative-license.webp` (about 200 KB) is the one to load. The PNG is a lossless backup only (about 4 MB), so don't serve it by default.
- Compress the fallback video before shipping: aim for under 2 MB, 480p or 540p, no audio, 10-15 seconds, looped. Provide both `.webm` and `.mp4`.
- The pixel grid hides detail, so a low-resolution video looks the same and costs far less bandwidth.

## Things to decide before you launch

- **Camera:** only ask for webcam access after an explicit click. Browsers require HTTPS for `getUserMedia`, which Vercel provides.
- **Privacy:** the card shows your full date of birth and a photo of you. Consider blurring or replacing the DOB in the image before publishing the site.
- **Occupation text:** "UNEMPLOYED" is a good joke, but recruiters will read it. Consider "Building" or "Open to work".
