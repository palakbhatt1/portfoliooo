# Deployment

## Vercel (recommended)
1. Push repo to GitHub
2. vercel.com → Add New Project → import repo
3. Framework preset auto-detects Astro. Build: `npm run build`, output: `dist`
4. Deploy. Every push to `main` redeploys; other branches get preview URLs

## Pre-launch checklist
- [ ] `site` set in `astro.config.mjs` to the live URL
- [ ] `<title>` + meta description on every page
- [ ] OG image (1200x630) so LinkedIn/WhatsApp previews look right
- [ ] Alt text on all images
- [ ] Resume PDF opens, all external links open in new tab
- [ ] Tested on phone
- [ ] Lighthouse: performance, accessibility, SEO ≥ 90
- [ ] Figma prototypes set to "anyone with link can view"

## Custom domain (later, not today)
Buy `yourname.com` or `.design`, add in Vercel → Settings → Domains, set the DNS records it shows.

## Fallback
Netlify or Cloudflare Pages work identically for a static Astro build.
