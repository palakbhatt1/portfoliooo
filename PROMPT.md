# Prompt: Animated Creative License Portfolio Intro

Paste everything below the line into your AI coding tool. Attach the screen recording as a **movement reference only**. The card image is already in the project at `public/creative-license.webp` (PNG fallback: `public/creative-license.png`). It has real transparency and rounded corners.

---

Build an interactive portfolio intro for **Palak Bhatt** (targeting two roles: **AI Engineer** and **Product Designer**) using Next.js (App Router), TypeScript, Tailwind CSS and GSAP.

The attached screen recording is a reference for the **animation and interaction only**. Do not copy the reference site's content, colors or layout.

## 0. Assets

- Card: `/public/creative-license.webp` (fallback `/creative-license.png`). Use it exactly as supplied. Do not recreate, redraw or edit it, and preserve its aspect ratio (about 1.61 : 1).
- The image already has its own rounded corners and a transparent background. It has **no** baked-in shadow, so add the floating shadow with CSS `filter: drop-shadow(...)`.
- Fallback background video: `/public/pixel-fallback.mp4` and `.webm` (I will supply these; render a plain dark background if they are missing).

## 1. Initial screen

- Full-viewport, solid green background (`#228B3C`, defined as a CSS variable so I can change it).
- The card sits in the exact centre of the viewport, fairly small (about 36-44% of viewport width on desktop, about 78% on mobile), with plenty of empty space around it.
- Subtle soft drop shadow so the card appears to float.
- Directly beneath the card, centred, show the instruction text **"Long press this to enter"**. Use a small, bold, white sans-serif, slightly tracked. This text is part of the hold target (see section 3).

## 2. Idle animation

While the visitor has not interacted:

- The card floats very gently, moving 4-6 px up and down on a slow loop (about 4-5 s per cycle, `sine.inOut`).
- On desktop, add a very slight 3D tilt that follows the cursor (max about 8 degrees on each axis), smoothed with easing or `gsap.quickTo`.
- Keep everything slow and restrained.
- Treat the image as one single card. Do not animate elements inside it.

## 3. Long-press interaction

The visitor must press and hold the card **or** the instruction text.

- **Hold duration:** 1.2 s to complete.
- **On pointer down:** start a subtle response straight away (a very slight scale-down to about 0.98, the idle float pauses).
- **During the hold:** progress runs from 0 to 1 and drives the card's Y rotation from 0 to about 35 degrees, plus a slight growing scale and shadow change. The rotation should feel like it is being "wound up".
- **Early release or pointer cancel or leave:** reverse smoothly (about 0.5 s) back to the idle state.
- **Completion:** at progress 1, trigger the entrance animation (section 4).
- **Input support:**
  - mouse: pointer events
  - touch: pointer events
  - keyboard: hold Enter or Space while the card is focused; releasing early cancels. The card must be focusable (`tabIndex=0`, `role="button"`, `aria-label="Hold to enter portfolio"`, visible focus ring).
- Use `touch-action: none`, `user-select: none`, `-webkit-user-select: none` and `-webkit-touch-callout: none` on the card and instruction text. Call `preventDefault` on `contextmenu` for them so mobile long-press does not open the image or context menu. The page must not scroll or rubber-band while holding.
- Optional: `navigator.vibrate(10)` at completion where supported.

It should feel deliberate and satisfying, not like clicking a normal button.

## 4. Entrance animation (key moment)

Run as one GSAP timeline, about 1.4 s total:

1. The card rotates around its **vertical (Y) axis** using a real 3D transform (`perspective` of about 1200px on the parent, `transform-style: preserve-3d` where needed). It starts from the current hold rotation and accelerates (`power2.in`).
2. The card turns until it is **edge-on at exactly 90 degrees**, appearing as a thin vertical line. **Stop at 90 degrees. Never show the back face.**
3. During the turn, the card scales down slightly and drifts a little (check the reference video for the exact direction and feel). The instruction text fades out.
4. At the edge-on moment, flash the screen to white for about 120 ms. This is where the swap happens.
5. Reveal the portfolio from the white flash using a **pixelated dissolve**: a canvas overlay of square blocks (about 24 px) that disappear in a randomised or radial order over about 600-800 ms, revealing the portfolio underneath. Finish with a smooth ease-out so the whole thing feels cinematic.
6. After the reveal, unmount the intro, kill all timelines and remove all listeners. Use `sessionStorage` to skip the intro on a reload within the same session (try/catch around it).

Important: the card must rotate in 3D, not spin flat in 2D. The edge-on moment is the key visual.

## 5. Portfolio reveal

Under the intro, the real portfolio is already mounted but hidden (`visibility: hidden` until the reveal starts), so there is no loading screen.

**Homepage background: pixel-grid camera effect**

- A full-bleed `<canvas>` behind the content.
- Source: webcam (`getUserMedia`, front camera, mirrored) **only if the visitor explicitly opts in**. Show a small "Use my camera" toggle after the reveal. Never request camera permission on the landing screen.
- Default and fallback source: the prerecorded `/pixel-fallback.mp4` (muted, looped, `playsInline`). This is also used when permission is denied or no camera exists.
- Rendering: draw each frame into a tiny offscreen canvas (about `width/14` by `height/14`), read pixels, then draw one filled square per cell on the main canvas (cell size about 14 px, 1-2 px gap). Convert to a limited palette (for example grayscale mapped onto my accent colour). Cap at 24 fps, pause when the tab is hidden, and stop all media tracks on unmount.
- Keep contrast low enough that text on top remains readable.

**Content**

- Name: Palak Bhatt. Roles: AI Engineer, Product Designer.
- Sections: Work, About, Contact.

[PASTE YOUR PORTFOLIO UI / DESIGN SPEC HERE: layout, fonts, colours, nav. If you have none yet, say "design the homepage to be minimal and dark with one accent colour".]

The Creative License is the introduction only, not a permanent hero.

## 6. Technical requirements

- Responsive from 360 px phones to large desktops.
- No separate loading screen. Use `next/image` with `priority` for the card and preload the font.
- `prefers-reduced-motion: reduce`: no float, tilt or 3D rotation. Hold for 0.8 s, then crossfade the intro to the portfolio. The pixel background becomes a static frame.
- Clean up every GSAP timeline, `requestAnimationFrame` loop, timer, observer, event listener and media stream on unmount.
- Entrance must be fully completable on touch devices.
- Keep it at 60 fps on ordinary laptops and mid-range phones: animate only `transform` and `opacity`, use `will-change` sparingly, and avoid layout thrash.
- Provide a visible "Skip intro" link for accessibility (small, bottom corner).
- Add `alt="Palak's Creative License"` to the card image.

## The intended experience

Green screen → floating Creative License → "Long press this to enter" → card winds up in 3D → card rotates edge-on → white flash → pixel dissolve → portfolio appears.

It should feel like stepping into a little world through the license, not like watching a loading animation.
