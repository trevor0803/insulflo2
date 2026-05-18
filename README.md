# Insulflo Energy Services — Website

The official marketing website for **Insulflo Energy Services**, a family-owned spray foam, insulation, and window installation contractor serving Central Florida.

🌐 **Live site:** _(deploy to Vercel and update this)_

---

## What's in this project

A complete, production-ready static website. No build step, no framework, no dependencies — just HTML, CSS, and a small JavaScript file. Deploys instantly to any static host (Vercel, Netlify, Cloudflare Pages, GitHub Pages).

### Pages

| URL | Page | Purpose |
|---|---|---|
| `/` | Home | Hero, services, quote estimator, savings calculator, story, areas |
| `/about` | About | Company story, the family crew, what makes us different |
| `/spray-foam` | Spray Foam | Open/closed-cell foam service detail |
| `/blown-in` | Blown-In | Fiberglass/cellulose blown-in service detail |
| `/removal` | Removal | Old insulation removal service |
| `/windows` | Windows | Impact + energy-efficient window installation |
| `/storm-damage` | Storm Damage | Storm response + insurance documentation |
| `/portfolio` | Portfolio | Recent project gallery |
| `/contact` | Contact | Full contact form + business info |

### Features

- ⚡ **Fast** — pure static, no JS framework, loads in under a second
- 📱 **Responsive** — mobile-first, sticky "call us" bar on mobile
- 🎨 **Custom design** — original branding with Fraunces + Inter Tight type pairing
- 🔢 **Live quote estimator** — interactive ballpark calculator on homepage
- 💰 **Savings calculator** — slider-based energy savings tool
- 🔍 **SEO-ready** — schema.org markup, sitemap, robots.txt, proper meta tags
- ♿ **Accessible** — semantic HTML, ARIA labels, keyboard navigation
- 🚀 **Vercel-optimized** — clean URLs, security headers, asset caching

---

## How to deploy

### Step 1 — Push to GitHub

```bash
# In this project folder
git init
git add .
git commit -m "Initial Insulflo website"
git branch -M main

# Create a new empty repo on github.com first, then:
git remote add origin https://github.com/YOUR_USERNAME/insulflo-website.git
git push -u origin main
```

### Step 2 — Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"**
3. Import your `insulflo-website` repo
4. Leave all settings as default (Vercel auto-detects this is a static site)
5. Click **Deploy**

That's it. Your site will be live at `your-project.vercel.app` in under a minute.

### Step 3 — Add your custom domain

1. In your Vercel project, go to **Settings → Domains**
2. Add `insulfloenergy.com` (or whatever domain you have)
3. Vercel will give you DNS records — add them at your domain registrar
4. Wait 5–10 minutes for DNS to propagate

---

## How to add photos

See `IMAGE-GUIDE.md` for step-by-step instructions on swapping the placeholder visuals for real photos. Short version:

1. Drop photos into `/images/` (recommended names: `hero.jpg`, `crew.jpg`, `portfolio-1.jpg` through `portfolio-8.jpg`, etc.)
2. Open the relevant HTML file
3. Find the `portfolio-image-placeholder` or `hero-photo-placeholder` div
4. Replace with `<img src="images/your-photo.jpg" alt="Description">`

There's an example of every replacement in `IMAGE-GUIDE.md`.

---

## Wiring up the contact form

The contact form (`/contact`) currently shows a local "ready to send" message. To actually receive emails:

### Option 1: Formspree (easiest, free tier available)
1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form, copy your endpoint URL (looks like `https://formspree.io/f/xyz123`)
3. Open `contact.html`
4. Find: `<form class="contact-form reveal" id="contact-form" method="POST" action="">`
5. Replace `action=""` with `action="https://formspree.io/f/xyz123"`

### Option 2: Vercel-native (built-in to your hosting)
Use Vercel's serverless functions — see [Vercel form docs](https://vercel.com/guides/how-to-handle-a-form-submission) for the code template.

### Option 3: Netlify Forms (if you switch to Netlify)
Add `netlify` attribute to the form tag.

---

## How to edit content

Each page is a single, self-contained HTML file. To edit content (e.g., change a phone number, update an address, tweak copy):

1. Open the relevant `.html` file in any text editor
2. Find the text you want to change
3. Save the file
4. Commit + push to GitHub — Vercel auto-deploys

**Phone number lives in:**
- `(863) 251-2991` — appears on every page in the utility bar, header CTA, footer, and contact page

**Address lives in:**
- `3828 Knights Station Rd, Lakeland FL 33810` — utility bar, footer, contact page, schema.org markup

**To do a site-wide search & replace** (e.g., update the phone number everywhere), use your editor's "Find in Files" feature, or this one-liner in Terminal:

```bash
# Replace OLD with NEW in all HTML files
find . -name "*.html" -exec sed -i '' 's/OLD/NEW/g' {} +    # macOS
find . -name "*.html" -exec sed -i 's/OLD/NEW/g' {} +       # Linux
```

---

## Project structure

```
insulflo-website/
├── index.html              # Homepage
├── about.html              # About page
├── spray-foam.html         # Service: Spray Foam
├── blown-in.html           # Service: Blown-In
├── removal.html            # Service: Removal
├── windows.html            # Service: Windows (NEW)
├── storm-damage.html       # Service: Storm Damage
├── portfolio.html          # Project gallery
├── contact.html            # Contact form
├── css/
│   └── styles.css          # All styles
├── js/
│   └── main.js             # All JavaScript (nav, estimator, calculator)
├── images/
│   ├── logo-mark.svg       # The brand mark
│   └── README.md           # Image conventions
├── robots.txt              # SEO crawler instructions
├── sitemap.xml             # Search engine sitemap
├── vercel.json             # Vercel deploy config
├── .gitignore
├── README.md               # This file
└── IMAGE-GUIDE.md          # How to add real photos
```

---

## Tech stack

- **HTML5** — semantic, accessible
- **CSS3** — custom properties, grid, flexbox, container queries
- **Vanilla JavaScript** — no framework, no build step
- **Fraunces & Inter Tight** — Google Fonts (loaded with `font-display: swap`)
- **Schema.org JSON-LD** — for local business SEO
- **Vercel** — recommended hosting (free tier is more than enough)

No npm. No webpack. No React. Open the HTML files in a browser to preview locally.

---

## License & ownership

© Insulflo Energy Services. All rights reserved.
