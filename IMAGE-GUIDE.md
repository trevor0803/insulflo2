# Adding Real Photos to the Site

The site is built with **deliberately styled placeholders** so it looks intentional and professional even before you add real photos. When you're ready to swap in your own images, follow this guide.

---

## Before you start

1. Take or gather your photos
2. Resize / compress them at [squoosh.app](https://squoosh.app) — aim for under 300KB each
3. Use simple names: `hero.jpg`, `crew.jpg`, `portfolio-1.jpg`, etc.
4. Drop them all into the `/images/` folder

---

## 1. Homepage hero photo

**File to edit:** `index.html`

Find this block (around the top, inside `<section class="hero">`):

```html
<div class="hero-visual reveal">
  <div class="hero-photo-placeholder">Hero photo · 800×1000</div>
  <div class="hero-visual-overlay">
```

**Replace with:**

```html
<div class="hero-visual has-image reveal">
  <img src="images/hero.jpg" alt="Insulflo crew installing spray foam insulation in a Lakeland attic" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;">
  <div class="hero-visual-overlay">
```

That's it. The dark overlay at the bottom will still display your "142°F → 82°F" stats over the photo. Looks great over any photo of a crew working or an attic shot.

---

## 2. About / Family crew photo

**File to edit:** `index.html` (homepage story section) AND optionally `about.html` if you want it there too

Find this block (in `<section class="story">`):

```html
<div class="story-image reveal">
  <div class="story-image-placeholder">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">...</svg>
    <span>Crew photo · 800×1000</span>
  </div>
</div>
```

**Replace with:**

```html
<div class="story-image reveal">
  <img src="images/crew.jpg" alt="Russ and his family — the Insulflo Energy Services crew">
</div>
```

---

## 3. Portfolio photos (8 of them)

**File to edit:** `portfolio.html`

Each project card looks like this:

```html
<div class="portfolio-item reveal">
  <div class="portfolio-image"><div class="portfolio-image-placeholder">Project photo</div></div>
  <div class="portfolio-info">
    <div class="portfolio-tag">Spray Foam · Lakeland</div>
    <h3>1,800 sq ft attic — closed-cell</h3>
    <p>Single-family home, full attic upgrade...</p>
  </div>
</div>
```

**Replace the inner placeholder div** with an image:

```html
<div class="portfolio-item reveal">
  <div class="portfolio-image"><img src="images/portfolio-1.jpg" alt="1,800 sq ft attic spray foam project in Lakeland"></div>
  <div class="portfolio-info">
    <div class="portfolio-tag">Spray Foam · Lakeland</div>
    ...
  </div>
</div>
```

Repeat for `portfolio-2.jpg` through `portfolio-8.jpg`. The text descriptions can also be edited to match what's actually in each photo.

---

## 4. Service page photos (optional)

Each service page (`spray-foam.html`, `blown-in.html`, etc.) currently doesn't have a hero image — they're text-focused for fast loading and good SEO. If you want to add a photo to a service page, add this **right after** the `<div class="breadcrumbs">` line:

```html
<img src="images/spray-foam.jpg" alt="Spray foam insulation in a Lakeland attic" style="width:100%;max-height:400px;object-fit:cover;border-radius:12px;margin:24px 0;">
```

---

## 5. Logo (optional)

If you have an existing logo file you want to use instead of the generated SVG mark:

**Drop your file in:** `images/logo.png` (or `.svg`)

**Find this line** (in every HTML file's header):

```html
<img class="logo-mark" src="images/logo-mark.svg" alt="" width="38" height="38">
```

**Replace with:**

```html
<img class="logo-mark" src="images/logo.png" alt="" width="38" height="38">
```

Use Find & Replace across all files to update everywhere at once.

---

## Quick checklist

- [ ] `images/hero.jpg` — homepage hero
- [ ] `images/crew.jpg` — family/team photo
- [ ] `images/portfolio-1.jpg` through `portfolio-8.jpg`
- [ ] (Optional) service-page photos
- [ ] (Optional) custom logo
- [ ] All photos compressed to under 300KB
- [ ] All `alt=""` text filled in with descriptions
- [ ] Push to GitHub → Vercel auto-deploys

---

## Pro tips for great contractor photos

1. **Before/after shots are gold.** A poorly insulated attic followed by a perfectly foamed one is more persuasive than anything you can write.
2. **Show the crew working.** Faces, smiles, action. People want to see who's coming to their house.
3. **Get a thermal camera shot if you can rent one.** A side-by-side of "before" (red/orange leaks everywhere) and "after" (uniform blue) is incredibly compelling.
4. **Don't skip the trucks.** A clean, branded truck communicates professionalism.
5. **Outdoor portraits for the team.** Natural light, neutral background, smiling. Avoid the awkward studio-shoot vibe.
