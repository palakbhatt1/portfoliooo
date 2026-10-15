# Palak Bhatt — Portfolio & Interactive 3D Creative License

A modern, tactile portfolio for an **AI Engineer & Product Designer**, built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS 4**, and **GSAP**.

---

## Highlights & Features

- **Interactive 3D Creative License Entrance**:
  - Centerpiece Creative License with lossless visual fidelity and authentic paper stitching.
  - Interactive 3D cursor-tracking tilt on hover across desktop viewports.
  - Specular semicircle white light reflection following cursor angle in real time.
  - Satisfying long-press entrance with continuous 3D tumbling physics and synchronized audio.
  - Seamless screen transition directly into the main portfolio.
- **Dynamic Pixel-Grid Background**: Real-time generative canvas drawing ambient grid squares.
- **Interactive AI Sandbox / Playground**: Live prompt architecture playground demonstrating reasoning pipelines, confidence scores, and token latency gauges.
- **Full 3D Credential Modal**: Inspect Palak's Creative License #0001 with 3D tilt and metadata details.
- **Deep-Dive Project Showcase**: High-res visual cards with architectural metrics and technical breakdown modals.
- **Fully Responsive & Accessible**: Supports mouse, touch, and keyboard navigation (`Tab` + `Space`/`Enter`), with automatic reduced-motion fallbacks.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 15 (App Router) & React 19 |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS 4 & Vanilla CSS |
| **Animation & 3D** | GSAP 3 & Hardware-Accelerated CSS 3D Transforms |
| **Icons** | Lucide React |
| **Canvas** | Native HTML5 Canvas 2D |

---

## Project Structure

```
portfoliooo/
├── app/
│   ├── globals.css              # Design tokens, variables & 3D utilities
│   ├── layout.tsx               # Root layout, fonts & OpenGraph metadata
│   └── page.tsx                 # Main page mounting Intro & Portfolio
├── components/
│   ├── home/
│   │   ├── About.tsx            # Philosophy, technical domains & background
│   │   ├── Contact.tsx          # Direct contact form, socials & booking
│   │   ├── Hero.tsx             # Main hero headline & interactive 3D license
│   │   ├── LicenseModal.tsx     # Fullscreen 3D license inspection modal
│   │   ├── Navbar.tsx           # Floating glassmorphic navigation bar
│   │   ├── PixelGridBackground.tsx # Canvas 2D generative background
│   │   ├── Playground.tsx       # Live interactive AI sandbox
│   │   └── Projects.tsx         # Featured engineering & design case studies
│   ├── intro/
│   │   └── CreativeLicenseIntro.tsx # 3D tilt, long-press entrance & audio
│   └── ui/
│       ├── CardLightReflection.tsx # Center-anchored specular gleam
│       └── Icons.tsx            # Custom brand icons
├── public/
│   ├── creative-license.png     # Full-resolution lossless license card
│   ├── intro_sequence_sfx.mp3   # Synchronized entrance audio SFX
│   └── projects/                # High-res project mockup graphics
├── DEPLOYMENT.md                # Vercel deployment & custom domain guide
├── TECH_STACK.md                # Architectural design decisions & specs
└── package.json
```

---

## Getting Started

### Prerequisites
- Node.js 18.18+ or later
- npm (or pnpm / yarn)

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm run start
```

---

## Deployment

Refer to [DEPLOYMENT.md](file:///c:/Users/Palak/Documents/portfoliooo/DEPLOYMENT.md) for step-by-step instructions on deploying to Vercel and configuring a custom domain.
