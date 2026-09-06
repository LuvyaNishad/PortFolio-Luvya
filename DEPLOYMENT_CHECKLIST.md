# AURELIUS PORTFOLIO — LAUNCH CHECKLIST

> **Verified:** 2026-08-23 · `npm run build` ✅ 0 errors · `npx tsc --noEmit` ✅ 0 errors · `npx eslint .` ✅ 0 problems
>
> **The honest summary:** the *machine* is finished. Every system works, every
> page builds, nothing is broken. What's missing is **your content** — your
> stack list, your projects, and your real work history. You could deploy
> tonight and it would work perfectly; it would just show empty inventory
> slots where your work goes.

---

## Contents
1. [What's done](#1-whats-done)
2. [Blockers — I need these from you](#2-blockers--i-need-these-from-you)
3. [Deploy in 10 minutes (Vercel)](#3-deploy-in-10-minutes-vercel)
4. [Good-to-haves (after launch)](#4-good-to-haves-after-launch)
5. [Known non-issues](#5-known-non-issues)

---

## 1. What's done

| Area | Status | Notes |
| :--- | :--- | :--- |
| Production build | ✅ | Next.js 16.2.6 / Turbopack, 10 static routes + 1 API route |
| TypeScript | ✅ | 0 errors |
| ESLint | ✅ | 0 problems (was 27 — fixed, not suppressed) |
| Hero + monolith crash timeline | ✅ | Impact, shake, shockwave, floating debris all restored |
| Intro dossier + About modal | ✅ | Now reads from `src/data/about.ts` |
| Tools inventory | ✅ *(empty)* | Renders honest `CAPACITY 00/07` slots until you fill it |
| Work Library nav | ✅ | 4 category cards, smooth scroll targeting |
| Showcases | ✅ *(empty)* | Renders `SLOT AVAILABLE // Awaiting deployment` cards |
| GitHub contribution heatmap | ✅ **live** | Currently pulling **199 real contributions** from your account |
| Contact form | ✅ | Honeypot, validation, 5000-char cap, mailto fallback if unconfigured |
| Footer | ✅ | Live clock, back-to-top |
| Favicon / tab icon | ✅ | Custom "LN" mark — `favicon.ico` + `icon.png` + `apple-icon.png` |
| Social share card | ✅ | Auto-generated 1200×630 OG image |
| SEO | ✅ | Title leads with **Luvya Nishad**, JSON-LD, sitemap, robots.txt |
| Custom 404 page | ✅ | "Signal Lost" — in the site's own visual language |
| Dead code / unused assets | ✅ | 23 files removed, `three` + `vanta` uninstalled |
| Image delivery | ✅ | CSS backgrounds recompressed to WebP; the rest go through `next/image` |

**Fixed since the last checklist:**
- The contribution heatmap used to **invent fake activity** (a hardcoded `147`
  total) when the GitHub API failed. It now shows a real empty calendar plus a
  `FEED UNREACHABLE — VIEW ON GITHUB` link. It never lies.
- Two real performance bugs: a leaking `setInterval` in the text-scrambler, and
  a component that remounted its DOM node on every render.
- Every dead `#` link now hides itself instead of going nowhere.

---

## 2. Blockers — I need these from you

Nothing below is a code problem. It's content only I can't invent for you.

### A. Your tech stack → `src/data/tools.ts`
22 empty slots across 3 categories. Just send me flat lists and I'll wire them:

| Category | Slots | What goes here |
| :--- | :--- | :--- |
| `design` | 7 | Figma, Photoshop, Illustrator, After Effects, Blender… |
| `development` | 8 | Next.js, React, TypeScript, Tailwind, Node, Python, Git… |
| `other` | 7 | Vercel, Docker, Linux, Notion, DaVinci Resolve… |

> Slot counts are just the grid size — say the word and I'll resize them to fit
> exactly what you send.

### B. Your work → 3 files
| What | File | What I need |
| :--- | :--- | :--- |
| Graphic design | `src/data/visualArtifacts.ts` | Images → drop in `public/images/`, plus a title + one line each |
| Video / motion | `src/data/motionArtifacts.ts` | Thumbnail + YouTube/Vimeo link + title |
| Code projects | `src/data/projects.ts` | Screenshot, title, 1–2 lines, tech used, live URL + repo URL |

Even **3–4 real pieces** changes the whole feel. Empty slots read as "not
finished"; three real projects read as "curated".

### C. ✅ Your real work history → `src/data/about.ts`
Updated with your real credentials:
- 2+ Years Crafting Digital Systems
- May 2026 - Aug 2026: Summer Research Intern, IIIT Delhi
- 2024 - 2028: B.Tech in Computer Science & Design (CSD), IIIT Delhi
- 2024: Class XII CBSE, Ahlcon International School, Delhi
- 2022: Class X CBSE, Ahlcon International School, Delhi

### D. Links → `src/config/site.ts`
| Field | Status | URL |
| :--- | :--- | :--- |
| `github` | ✅ Set | `https://github.com/LuvyaNishad` |
| `linkedin` | ✅ Set | `https://www.linkedin.com/in/luvyanishad7/` |
| `x` | ✅ Set | `https://x.com/LuvYuh_png` |
| `instagram` | ✅ Set | `https://www.instagram.com/luvyuh.smth/` |
| `resumes` | ✅ Set | `/resumes/design_resume.pdf` & `/resumes/developer_resume.pdf` |
| `email` | ✅ Set | `workwithluvya@gmail.com` |

### E. Resend key (for the contact form)
1. Sign up free at **resend.com** (3,000 emails/month).
2. Copy the API key (`re_…`).
3. Paste it into Vercel as `RESEND_API_KEY` — **not** into a file in the repo.

Without it the form still works: it falls back to opening the visitor's mail
client pre-filled to you, so no message is ever lost. With it, messages land in
your inbox silently.

---

## 3. Deploy in 10 minutes (Vercel)

**Step 1 — Push.** One uncommitted file right now (`AboutModal.tsx`); commit and
push, then the repo is clean.

**Step 2 — Import.** vercel.com → *Add New Project* → pick
`LuvyaNishad/PortFolio-Luvya`. Framework auto-detects as Next.js; change nothing.

**Step 3 — Environment variables.** Before hitting Deploy:

| Name | Value | Required? |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | `https://your-project.vercel.app` | **Yes** |
| `RESEND_API_KEY` | `re_…` | Optional (see 2E) |
| `RESEND_FROM` | `Portfolio <you@yourdomain.com>` | Only with a verified domain |

⚠️ **`NEXT_PUBLIC_SITE_URL` genuinely matters.** Without it, canonical URLs, the
sitemap and the social share card all read `your-domain.com` — a placeholder,
visible in the OG card. Vercel gives you the real URL after the first deploy;
set it, then redeploy once.

**Step 4 — Deploy.** ~2 minutes. SSL and CDN are automatic.

**Step 5 — Verify live (2 minutes):**
- [ ] Tab title reads `Luvya Nishad — Designer & Developer`
- [ ] Custom "LN" favicon appears (hard-refresh; browsers cache these hard)
- [ ] Paste the URL into WhatsApp/Discord — share card shows your **real domain**
- [ ] Visit `/anything-random` → the "Signal Lost" 404
- [ ] Send yourself a message through the contact form
- [ ] Open it on your phone

---

## 4. Good-to-haves (after launch)

- **Custom domain** — Vercel → Settings → Domains. Then update
  `NEXT_PUBLIC_SITE_URL` to match and redeploy.
- **Analytics** — `npm i @vercel/analytics`, then `<Analytics />` in
  `src/app/layout.tsx`. Free, no cookie banner needed.
- **Real portrait** — the Intro dossier uses a stylized silhouette. A real
  grayscale photo at `public/images/profile.jpg` would land harder.
- **Google Search Console** — submit `/sitemap.xml` so you actually rank for
  your own name.

---

## 5. Known non-issues

**`npm audit` reports 6 high-severity vulnerabilities.** Do not "fix" these
blindly. Every one is only resolvable via `npm audit fix --force`, which jumps
`next` outside the stated dependency range — and this project is on Next 16,
where APIs shifted. The advisories concern custom servers, middleware locale
handling, Server Actions and remote-SVG image optimization. This portfolio uses
none of those: no custom server, no middleware, no Server Actions, no remote
images. **My recommendation: leave it.** Revisit at the next minor Next release.

**Empty slots are intentional, not bugs.** `CAPACITY 00/07` and
`SLOT AVAILABLE // Awaiting deployment` are designed empty states. Nothing
crashes, nothing looks broken — they're just visibly waiting for content.

**Everything is driven from data files.** Adding work later never means editing
components:

```
src/config/site.ts        → identity, links, email, SEO
src/data/about.ts         → bio, disciplines, specs, timeline
src/data/tools.ts         → tech stack
src/data/visualArtifacts.ts  → graphic design work
src/data/motionArtifacts.ts  → video work
src/data/projects.ts      → code projects
scripts/generate-icons.mjs → regenerate all app icons
```

**Three source images are still large** — `hero_bg.jpg` (2.1 MB),
`monolith.png` (2.1 MB), `footer_bg.png` (2.2 MB). Visitors do **not** download
these: all three go through `next/image`, which resizes and re-encodes them to
WebP/AVIF on demand. The size only affects repo weight and build cache. The
smaller CSS-referenced backgrounds *were* converted, because raw CSS `url()`
backgrounds bypass `next/image` entirely. Not worth touching before launch.
