# Deployment Guide (Vercel)

Deploying a Next.js portfolio on Vercel takes about 10 minutes. Every `git push` after that redeploys automatically.

## 1. Before you deploy

- [ ] `npm run build` succeeds locally with no errors.
- [ ] `npm run lint` is clean.
- [ ] Images are in `public/` and referenced with absolute paths such as `/creative-license.webp`.
- [ ] The fallback video is compressed (under about 2 MB) and has both `.mp4` and `.webm` versions.
- [ ] No secrets in the repo. If you add API keys later, keep them in `.env.local` and make sure `.env*` is in `.gitignore`.
- [ ] You've decided what to do about the date of birth and the occupation text on the card (see `TECH_STACK.md`).

## 2. Push to GitHub

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/portfolio.git
git push -u origin main
```

## 3. Deploy on Vercel

1. Go to vercel.com and sign in with GitHub.
2. Click **Add New → Project** and import the `portfolio` repo.
3. Framework preset is detected as **Next.js**. Leave the defaults (build command `next build`, output handled automatically).
4. Add environment variables only if you have any (none are needed for the intro).
5. Click **Deploy**.

You'll get a URL like `portfolio-xxxx.vercel.app`. Every pull request also gets its own preview URL.

## 4. Custom domain (optional)

1. Buy a domain (for example `palakbhatt.dev` or `palakbhatt.com`) from any registrar.
2. In Vercel: **Project → Settings → Domains → Add**.
3. Follow the DNS instructions Vercel shows you (an `A` record for the root domain and a `CNAME` for `www`, or switch the nameservers to Vercel).
4. HTTPS is issued automatically. This matters because webcam access (`getUserMedia`) only works on HTTPS.

## 5. After deploying: test checklist

- [ ] Intro works on desktop (mouse hold) and on a real phone (touch hold). Long press must not open the image or context menu.
- [ ] Early release returns the card smoothly; completed hold plays the full entrance.
- [ ] Keyboard: Tab to the card, hold Enter or Space.
- [ ] Reduced motion: enable "Reduce motion" in your OS and confirm the crossfade version appears.
- [ ] Camera opt-in works, and denying permission falls back to the video.
- [ ] Lighthouse (Chrome DevTools) performance and accessibility scores are reasonable on mobile.
- [ ] Share the link in WhatsApp or LinkedIn and check the preview card (see Metadata below).

## 6. Metadata for sharing

In `app/layout.tsx`, set a title, description and Open Graph image so links look good when shared:

```ts
export const metadata = {
  title: "Palak Bhatt | AI Engineer & Product Designer",
  description: "Portfolio of Palak Bhatt: AI engineering and product design.",
  openGraph: {
    title: "Palak Bhatt | AI Engineer & Product Designer",
    description: "Portfolio of Palak Bhatt.",
    images: ["/og.png"],   // 1200x630 image in /public
  },
};
```

## 7. Optional extras

- **Analytics:** `npm i @vercel/analytics`, then add `<Analytics />` in `layout.tsx`.
- **Contact form:** use a Next.js route handler (`app/api/contact/route.ts`) with a service like Resend, and store the key in Vercel environment variables.
- **Resume link:** put the PDF in `public/resume.pdf` and link to `/resume.pdf`.

## Alternative hosts

| Host | When to pick it |
|---|---|
| **Cloudflare Pages** | If you switch to a fully static Vite or Next export; generous free bandwidth |
| **Netlify** | Similar to Vercel; fine for Next.js with its adapter |
| **GitHub Pages** | Static export only (`output: "export"`); no API routes |

## Troubleshooting

- **Build fails on Vercel but works locally:** check Node version (Project Settings → General → Node.js Version) and that all imports match file-name casing exactly (Linux is case-sensitive).
- **Images or video 404:** make sure they're inside `public/` and committed to git.
- **Camera doesn't work:** the site must be on HTTPS and the user must click to opt in.
- **Long press opens the image menu on iPhone:** confirm `-webkit-touch-callout: none` and the `contextmenu` handler are applied to the card.
- **Choppy animation on phones:** lower the canvas cell count, cap to 20-24 fps, and animate only `transform` and `opacity`.
