# perrybrothersoil.com redesign: project brief

This file is the source of truth for this project. Read it fully before every task.
If a request conflicts with this file, stop and ask before proceeding.

> Lines marked **[VERIFY]** are assumptions. John should confirm or correct them before the build starts.

---

## 1. What we are building

A full redesign of perrybrothersoil.com, rebuilt as a **static site** (plain HTML, CSS, minimal vanilla JS),
hosted on **Cloudflare Pages**, deployed from GitHub. This replaces the current WordPress site.
Same stack and workflow as perryequip.com.

**Do not touch the live WordPress site.** All work happens in this repo. Content is copied out of WordPress, never edited in place.

### The business

Perry Brothers Oil Co. Inc. is a family-owned fuel and petroleum distributor. Related businesses:
Gas N Go convenience stores, Perry Brothers Equipment Company (perryequip.com).

### Who visits and what they need

| Visitor | What they want | Primary action |
|---|---|---|
| Commercial / fleet / farm customer | Reliable bulk fuel delivery | **Request a fuel quote** |
| Retail dealer or station owner | Wholesale supply, branding, tires | **Become a dealer** / **Dealer login** |
| Local driver | Nearest Gas N Go, hours | **Find a Gas N Go** |
| Job seeker | Driver and store jobs | **See open jobs** |

Every page must make the first two actions reachable in one click (header CTA + footer).

---

## 2. Sitemap [VERIFY: confirm services offered]

```
/                       Home
/fuel-delivery/         Commercial & bulk fuel delivery (diesel, gasoline, off-road)
/aviation/              Airport fuel farm services            [VERIFY]
/lubricants/            Oils, lubricants, DEF                 [VERIFY]
/tires/                 Tire supply (Perry Brothers Oil & Tire)
/dealers/               Wholesale/branded dealer program + link to dealer portal login
/gas-n-go/              Store locations, hours, map links
/about/                 Family history, service area, values
/careers/               Open roles + application link
/contact/               Quote form, phone numbers, office address
/404.html
```

Keep existing WordPress URLs alive with 301 redirects in `_redirects` (see section 8).

---

## 3. Design direction

**Concept: "the delivery truck and the road sign."**
The visual language comes from what this business actually looks like: tank trucks, highway
signage, pump canopies, bulk tanks. Confident, plain-spoken, built for people in work trucks
reading on their phones. Not corporate-energy-company glossy, and not a SaaS template.

**The one bold thing:** the homepage hero. A full-bleed photo of a real Perry Brothers truck or
facility, with a large condensed headline set directly on it and two CTAs. Everything else on the
site stays quiet and disciplined.

### Color tokens [VERIFY against the Perry Brothers Oil logo]

Shares the family palette with perryequip.com so the companies read as related.

```css
:root {
  --pb-red:      #ea0000;  /* brand, primary CTA, active states. Use sparingly. */
  --pb-yellow:   #f4c400;  /* hazard/signage accent: small highlights, focus rings on dark */
  --asphalt:     #1c2126;  /* dark sections, header, footer */
  --steel:       #4a535c;  /* secondary text, borders on light */
  --concrete:    #e9eaeb;  /* light section backgrounds */
  --white:       #ffffff;  /* main page background */
}
```

Rules: white is the default background. Red is for the main CTA and nothing decorative.
Yellow never carries text on white (fails contrast). All text meets WCAG AA.

### Typography

- **Barlow Condensed** (600, 700): headlines, nav, buttons. Echoes highway signage.
- **Barlow** (400, 500, 600): body text, forms, tables.
- Load from Google Fonts with `display=swap`; fallback `"Arial Narrow", Arial, sans-serif`.
- Type scale (rem): 3.5 / 2.5 / 1.75 / 1.25 / 1.0625 body / 0.875 small. Headlines tighten on mobile via `clamp()`.
- Body line length under 75 characters; line-height 1.6.
- Sentence case everywhere. Headline treatment comes from size and weight, not color tricks.

### Layout

- Max content width 1200px; text blocks max 720px. Left-aligned content, not centered paragraphs.
- 8px spacing grid. Generous vertical spacing between sections (96px desktop, 56px mobile).
- Mobile-first. Must look intentional at 375px, 768px, 1280px, 1600px.
- Header: logo left, nav center/right, red "Request a quote" button far right. Sticky, compact on scroll.
- Mobile nav: full-screen menu with large tap targets; phone number as a tap-to-call button.

Homepage wireframe:

```
+--------------------------------------------------------------+
| LOGO        Fuel  Aviation  Dealers  Gas N Go  About  [QUOTE] |
+--------------------------------------------------------------+
|  [full-bleed truck photo, dark overlay at bottom-left]        |
|  Fuel delivered on schedule,                                  |
|  since [year].                                                |
|  [Request a fuel quote]  [Become a dealer]                    |
+--------------------------------------------------------------+
|  What we supply: 4-5 service blocks, photo + 2 lines + link   |
|  (varied sizes: one large feature, others smaller; not a      |
|   grid of identical cards)                                    |
+--------------------------------------------------------------+
|  Service area: simple map / county list + "Do we deliver to   |
|  you? Call [phone]"                                           |
+--------------------------------------------------------------+
|  Dealers band (asphalt bg): pitch + dealer login link         |
+--------------------------------------------------------------+
|  Gas N Go strip: find a store                                 |
+--------------------------------------------------------------+
|  Footer: contact, hours, locations, careers, family of cos.   |
+--------------------------------------------------------------+
```

### Photography

Real photos of their trucks, people, tanks, and stores beat any stock image.
Until John supplies photos, use solid `--asphalt` blocks labeled `PHOTO: description`, **not** stock images.
All images: WebP/AVIF with JPEG fallback, explicit width/height, `loading="lazy"` below the fold.

---

## 4. Do not do these (they make the site look generated)

- No gradients as decoration, no glassmorphism, no blobs.
- No carousels or auto-rotating sliders.
- No grids of identical rounded cards with the same soft shadow.
- No ALL-CAPS eyebrow labels over every heading.
- No coloring or italicizing one word in a headline.
- No numbered markers (01 / 02 / 03) unless the content is a real sequence.
- No fade-in-on-scroll animations on every section. One subtle hero load at most; respect `prefers-reduced-motion`.
- No "→" appended to every link or button.
- No cream/beige backgrounds, no terracotta accents.
- No invented stats, testimonials, years, or certifications. Use `[PLACEHOLDER: ...]` and flag it.
- No CSS frameworks, no React/Vue, no jQuery. No build step unless John approves.

---

## 5. Copy rules

- Plain, direct, local. Write like a dispatcher talking to a customer.
- Buttons say what happens: "Request a fuel quote", "Call dispatch", "Find a store". Never "Submit" or "Learn more".
- Short paragraphs. Phone numbers always clickable (`tel:`).
- Keep real content from the current site; rewrite for clarity, never invent facts.

---

## 6. Repo structure

```
/
├── CLAUDE.md
├── index.html
├── fuel-delivery/index.html   (one folder per page, clean URLs)
├── ...
├── assets/
│   ├── css/main.css           (tokens at top, then base, layout, components)
│   ├── js/main.js             (nav toggle, sticky header only)
│   ├── img/
│   └── logo/
├── partials/                  (header.html, footer.html: source of truth, copied into pages)
├── content/                   (text exported from WordPress, one .md per page)
├── references/                (screenshots of reference sites + notes.md)
├── _redirects                 (Cloudflare Pages 301s)
├── _headers                   (cache + security headers)
├── robots.txt
└── sitemap.xml
```

One stylesheet. Reusable component classes (`.btn`, `.btn--primary`, `.section`, `.section--dark`,
`.feature`, `.service-block`). Keep selector specificity flat; no IDs for styling.
Header and footer must be identical on every page.

---

## 7. Working process (follow every time)

1. **Plan first.** Before writing code for a page, propose its section list and a short ASCII
   wireframe. Wait for approval.
2. **Build one page at a time.** Homepage first; nothing else until John approves it.
3. **Screenshot and self-review.** After each change, use the Playwright MCP to screenshot the page
   at 375px and 1280px. Compare against this brief and `/references`. Fix problems before reporting back.
4. **Report briefly:** what changed, screenshots, any `[PLACEHOLDER]`s added.
5. Commit after each approved step with a clear message.

---

## 8. Migration, SEO, performance

- Export all page text and images from WordPress into `/content` and `/assets/img` first.
- Map every old URL to a new one in `_redirects` (`/old-path/ /new-path/ 301`). Include common WP URLs (`/?page_id=`, `/wp-content/uploads/...` for linked files).
- Each page: unique `<title>` (under 60 chars), meta description (under 155), one `<h1>`, Open Graph tags, canonical URL.
- `LocalBusiness` JSON-LD on Home and Contact (name, address, phone, hours, area served).
- Lighthouse targets on mobile: Performance 90+, Accessibility 95+, SEO 100.
- Page weight under 1 MB on home, under 500 KB elsewhere.
- Forms: Cloudflare Pages Function or a form service. No WordPress plugin dependencies. Include honeypot spam protection.

---

## 9. Definition of done (per page)

- [ ] Matches tokens, type, and layout rules above
- [ ] Nothing from section 4
- [ ] Screenshots reviewed at 375px and 1280px
- [ ] Keyboard navigable, visible focus, alt text on images
- [ ] Real content or clearly flagged `[PLACEHOLDER]`
- [ ] Old URL redirects added
