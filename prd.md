\# Islam Tebyan Academy

\## Product Requirements Document — v3.0

\*\*Confidential\*\* | May 2026 | islamtebyan.com

> \*\*Changelog v3.0:\*\* Updated colour system to Refined Identity v3 — Antique Gold replacing generic Royal Gold, Warm Taupe replacing cold Silver Gray, Aged Parchment replacing flat Ivory, deeper Midnight Navy.



\---



\## Executive Summary



Islam Tebyan is a \*\*world-class trilingual Islamic education platform\*\* positioning itself as the premier destination for Quran recitation, classical Arabic, and Islamic sciences — delivered through exclusive live 1-on-1 instruction via Zoom. The platform targets a global, discerning Muslim audience that refuses to compromise on instructional quality.



Phase 1 delivers a \*\*conversion-optimized marketing platform\*\* with zero LMS complexity — built for trust, authority, and lead generation at the highest aesthetic standard.



\---



\## 1. Strategic Positioning



\### 1.1 Brand Essence



> \*"تِبْيَانًا لِكُلِّ شَيْءٍ"\*

> "A clarification for all things." — Quran 16:89



\### 1.2 Positioning Statement



"Islam Tebyan is the only Islamic academy that pairs \*\*scholarly rigor\*\* with \*\*radical personalization\*\* — delivering certified 1-on-1 instruction in Quran, Arabic, and Islamic sciences to students worldwide, in the language they think in."



\### 1.3 Competitive Differentiation



| Dimension | Typical Islamic Platforms | Islam Tebyan |

|---|---|---|

| Teaching model | Pre-recorded video courses | Exclusive live 1-on-1 Zoom |

| Language coverage | Arabic-only or English-only | AR + EN + FR (trilingual) |

| Student ratio | 1:many | 1:1 always |

| Brand level | Utility / informal | Premium institutional |

| Teacher vetting | Self-published | Certified + screened |

| Aesthetic | Dated or generic | Editorial luxury |



\### 1.4 Target Personas



\*\*Persona 1 — Amira, 34, London\*\*

French-Algerian professional. Wants her children to learn Quran with tajweed. Has tried Arabic apps but wants a real teacher who understands her family's background.



\*\*Persona 2 — Yusuf, 28, Toronto\*\*

American convert. Serious about learning classical Arabic to understand Quran directly. Will not enroll unless the platform looks as credible as the teachers.



\*\*Persona 3 — Fatima, 42, Riyadh\*\*

Wants to perfect her tajweed and understand tafsir. Arabic native speaker. Expects the highest scholarly standard.



\---



\## 2. Brand Identity System — v3.0



\### 2.1 Colour Philosophy



> Inspired by the pigments of Quranic manuscript illumination — the deep lapis of Islamic calligraphy, the warm gold leaf of illuminated pages, the aged parchment of a 12th-century Mushaf.

> Not the bright green of web clichés. Not generic "Islamic website gold." The \*\*depth and restraint\*\* of a scholarly institution.



\---



\### 2.2 Core Colour Palette ← UPDATED v3.0



\#### Primary Colours



| Token | Name | Hex | RGB | Pantone Ref | Primary Usage |

|---|---|---|---|---|---|

| `--color-midnight` | Midnight Ink | `#060D16` | 6, 13, 22 | P 179-16 C | Hero overlays · Deepest dark backgrounds |

| `--color-navy-deep` | Midnight Navy | `#091521` | 9, 21, 33 | P 176-16 C | Header · Navbar · Footer · Primary backgrounds |

| `--color-navy` | Sapphire Navy | `#122038` | 18, 32, 56 | 289 C | Cards · Hover states · Section backgrounds |

| `--color-gold` | \*\*Antique Gold\*\* ★ | `#B8841A` | 184, 132, 26 | 7550 C | CTA Buttons · Accents · Icons · Borders |

| `--color-gold-hi` | Champagne Gold | `#D4A843` | 212, 168, 67 | 7508 C | Text on dark · Highlights · Ornaments |

| `--color-parchment` | Aged Parchment | `#F2ECD8` | 242, 236, 216 | 9183 C | Main page background · Reading areas |

| `--color-ivory` | Pure Ivory | `#FDFAF3` | 253, 250, 243 | 9181 C | Cards · Clean sections · Input fields |

| `--color-taupe` | \*\*Warm Taupe\*\* ★ | `#8C7A68` | 140, 122, 104 | 7530 C | Secondary text · Captions · Inactive icons |



> ★ = Key changes from previous version



\#### Why These Changes



| Previous | New | Reason |

|---|---|---|

| Royal Gold `#D4AF37` | Antique Gold `#B8841A` | `#D4AF37` is used by hundreds of Islamic websites making it feel generic. `#B8841A` is deeper and warmer — it evokes aged gold leaf, not cheap metallic paint. |

| Silver Gray `#8A8F98` | Warm Taupe `#8C7A68` | Cold gray `#8A8F98` clashes with the warm navy-gold palette. `#8C7A68` is manuscript-brown — it lives harmoniously within the overall warmth. |

| Flat Ivory `#F5F2EC` | Aged Parchment `#F2ECD8` | `#F5F2EC` had a subtly cold undertone. `#F2ECD8` is distinctly warm — like the page of an old Quran, not a modern office document. |

| Standard Navy `#0D1B2A` | Midnight Navy `#091521` | Slightly deeper — gives hero sections stronger visual weight and better contrast against `#B8841A`. |



\#### Secondary \& Semantic



| Token | Name | Hex | Usage |

|---|---|---|---|

| `--color-navy-pressed` | Forest Navy | `#081018` | Pressed/active states on dark |

| `--color-gold-muted` | Old Gold | `#7A5C12` | Subtle gold borders · Dividers |

| `--color-sand` | Desert Sand | `#DDD0B3` | Section dividers · Subtle backgrounds |

| `--color-ink` | Manuscript Ink | `#1C1C1E` | Body text on light backgrounds |

| `--color-stone` | Warm Stone | `#6B6052` | Muted text · Disabled states |

| `--color-copper` | Illuminated Copper | `#A0522D` | Rare badge accent · Achievements |



\---



\### 2.3 Gradient System ← UPDATED v3.0



```css

/\* ── Hero — Deep immersion ── \*/

\--gradient-hero:

&#x20; linear-gradient(135deg, #060D16 0%, #122038 55%, #091521 100%);



/\* ── Premium Hero with Gold Edge ── \*/

\--gradient-hero-gold:

&#x20; linear-gradient(135deg, #091521 0%, #122038 55%, #B8841A 140%);

USAGE: Hero sections · Premium banners · CTA areas



/\* ── Antique Gold Shimmer (animated) ── \*/

\--gradient-gold:

&#x20; linear-gradient(90deg, #7A5C12, #D4A843, #B8841A, #D4A843, #7A5C12);

\--gradient-gold-size: 200% 100%;  /\* animate background-position \*/

USAGE: CTA buttons on hover · Dividers · Ornamental lines



/\* ── Luxury Dark Overlay ── \*/

\--gradient-overlay:

&#x20; linear-gradient(180deg, rgba(6,13,22,0.85), rgba(9,21,33,0.97));

USAGE: Image overlays · Video backgrounds · Hero overlays



/\* ── Parchment Surface ── \*/

\--gradient-parchment:

&#x20; linear-gradient(180deg, #FDFAF3 0%, #F2ECD8 100%);

USAGE: Cards · Reading areas · Light section backgrounds



/\* ── Dark Card ── \*/

\--gradient-card-dark:

&#x20; linear-gradient(145deg, #122038, #091521);

USAGE: Feature cards · Dark mode sections



/\* ── Navy to Gold (subtle) ── \*/

\--gradient-accent:

&#x20; linear-gradient(135deg, #091521 0%, #B8841A 200%);

USAGE: Section background hints · Hover glow effects

```



\---



\### 2.4 Typography System



\#### Font Selection (Unchanged)



| Role | Font | Weights | Rationale |

|---|---|---|---|

| EN/FR Display | \*\*Cormorant\*\* | 300, 400, 600, 700 | High-contrast serif; editorial gravitas |

| EN/FR Body | \*\*Lora\*\* | 400, 500 | Warm, slightly calligraphic |

| EN/FR UI | \*\*DM Sans\*\* | 300, 400, 500, 600 | Clean, modern; nav/labels |

| AR Display | \*\*Amiri\*\* | 400, 700 | Classical Naskh; academic |

| AR Body | \*\*Noto Naskh Arabic\*\* | 400, 500, 700 | Screen-optimised |

| AR UI | \*\*Cairo\*\* | 300, 400, 600 | Modern Arabic UI |



\#### Fluid Type Scale



```css

\--text-hero:    clamp(48px, 6vw, 88px);

\--text-display: clamp(36px, 4.5vw, 64px);

\--text-title:   clamp(26px, 3vw, 42px);

\--text-heading: clamp(20px, 2.5vw, 30px);

\--text-body-lg: clamp(16px, 1.8vw, 20px);

\--text-body:    clamp(14px, 1.5vw, 17px);

\--text-small:   clamp(12px, 1.2vw, 14px);

```



\---



\### 2.5 Logo \& App Icon System



\#### Logo

\- \*\*Symbol:\*\* Open Mushaf + hidden Mihrab + ascending Ray of Bayan

\- \*\*Colours applied:\*\* Midnight Navy `#091521` + Antique Gold `#B8841A` + Champagne Gold `#D4A843`

\- \*\*Variants:\*\* Horizontal · Stacked · Reversed · Monochrome



\#### App Icon ← NEW in v3.0

\- Rounded square (radius 20%), gradient `#060D16 → #122038`

\- Simplified hexagonal mosque arch + open book + crescent

\- All mark elements in `#B8841A` / `#D4A843` gradient

\- Required sizes: 512 · 256 · 128 · 64 · 48 · 32 · 16px

\- Formats: SVG (source) · PNG (export) · ICO (favicon)



\---



\## 3. Information Architecture



\### 3.1 Site Map



```

/                              Home

├── /programs                  Programs Overview

│   ├── /programs/quran        Quran \& Tajweed

│   ├── /programs/arabic       Arabic Language

│   └── /programs/islamic      Islamic Studies

├── /teachers                  Faculty

│   └── /teachers/\[slug]       Teacher Profile

├── /method                    Our Methodology

├── /pricing                   Pricing \& Plans

├── /book                      Book a Session

├── /about                     About the Academy

├── /testimonials              Student Stories

├── /faq                       FAQ

├── /blog                      Articles (Phase 1.5)

├── /contact                   Contact

├── /privacy                   Privacy Policy

└── /terms                     Terms of Service

```



\### 3.2 i18n Structure



```

app/\[locale]/          ← 'ar' | 'en' | 'fr'

middleware.ts          ← Locale detection + redirect

messages/

&#x20; ├── en.json

&#x20; ├── fr.json

&#x20; └── ar.json

```



\*\*Detection priority:\*\* URL prefix → Cookie → Accept-Language → Default `en`



\---



\## 4. Page Specifications



\### 4.1 Home Page



| # | Section | Background | Key Elements |

|---|---|---|---|

| 1 | Hero | `--gradient-hero-gold` | Headline · CTA · Stats strip · Islamic pattern overlay |

| 2 | Credibility Bar | `#091521` | Partner/cert logos or 5 key differentiators in `#D4A843` |

| 3 | Programs Showcase | `--gradient-parchment` | 3 cards · hover: gold border `#B8841A` |

| 4 | The Tebyan Method | `#FDFAF3` | 3 pillars · alternating layout |

| 5 | Teacher Spotlight | `--gradient-hero` | Cards · gold geometric frame on photos |

| 6 | Testimonials | `#F2ECD8` | Masonry grid · opening quote mark in `#B8841A` |

| 7 | Pricing Teaser | `#FDFAF3` | 3 plans · featured: `#091521` bg + `#D4A843` text |

| 8 | Final CTA | `--gradient-hero-gold` | Single headline · Single button |

| 9 | Footer | `#060D16` | 4-column · Quranic verse · locale switcher |



\#### Hero Colour Spec

```css

/\* Hero section \*/

background: linear-gradient(135deg, #060D16 0%, #122038 55%, #091521 100%);



/\* Hero heading \*/

color: #F2ECD8;

font-family: var(--font-cormorant);



/\* Accent word in heading \*/

color: #D4A843;



/\* Primary CTA button \*/

background: linear-gradient(90deg, #7A5C12, #D4A843, #B8841A, #D4A843, #7A5C12);

background-size: 200%;

color: #091521;

font-weight: 700;

/\* Hover: animate background-position \*/



/\* Secondary CTA \*/

border: 1px solid rgba(242, 236, 216, 0.25);

color: #F2ECD8;



/\* Stats strip \*/

border-top: 1px solid rgba(184, 132, 26, 0.2);

stat-number: color #D4A843;

stat-label: color rgba(242,236,216,0.4);

```



\---



\### 4.2 Program Cards — Colour Spec



```css

/\* Card background \*/

background: linear-gradient(145deg, #122038, #091521);

border: 1px solid rgba(184, 132, 26, 0.2);



/\* Hover state \*/

border-color: rgba(184, 132, 26, 0.6);

transform: translateY(-6px);

box-shadow: 0 20px 48px rgba(0, 0, 0, 0.35);



/\* Program icon \*/

color: #D4A843;



/\* Card title \*/

color: #F2ECD8;

font-family: var(--font-cormorant);



/\* Arabic subtitle \*/

color: #B8841A;



/\* Description \*/

color: rgba(242, 236, 216, 0.55);



/\* "Explore →" link \*/

color: #B8841A;

letter-spacing: 1.5px;

text-transform: uppercase;

font-size: 11px;

```



\---



\### 4.3 Booking Flow — Colour Spec



```css

/\* Step indicator — active \*/

background: #B8841A;

color: #091521;



/\* Step indicator — completed \*/

background: rgba(184, 132, 26, 0.2);

border: 1px solid #B8841A;

color: #D4A843;



/\* Step indicator — upcoming \*/

background: rgba(18, 32, 56, 0.5);

border: 1px solid rgba(184, 132, 26, 0.2);

color: rgba(242, 236, 216, 0.3);



/\* Form input \*/

background: #122038;

border: 1px solid rgba(184, 132, 26, 0.2);

color: #F2ECD8;

/\* Focus: border-color: #B8841A; box-shadow: 0 0 0 3px rgba(184,132,26,0.12) \*/



/\* Submit button \*/

background: linear-gradient(135deg, #B8841A, #D4A843);

color: #091521;

font-weight: 700;

```



\---



\## 5. Technical Specification



\### 5.1 Stack



| Layer | Technology | Version |

|---|---|---|

| Framework | Next.js | 15.x (App Router) |

| Language | TypeScript | 5.x |

| Styling | Tailwind CSS | v4.x |

| Animation | Framer Motion | 11.x |

| i18n | next-intl | 3.x |

| Forms | React Hook Form + Zod | 7.x / 3.x |

| Email | Resend | 3.x |

| Analytics | GA4 + Vercel Analytics | — |

| Deployment | Vercel Free | — |



\---



\### 5.2 Tailwind Config — v3.0 Colours ← UPDATED



```typescript

// tailwind.config.ts

import type { Config } from 'tailwindcss'



const config: Config = {

&#x20; content: \[

&#x20;   './app/\*\*/\*.{ts,tsx}',

&#x20;   './components/\*\*/\*.{ts,tsx}',

&#x20; ],

&#x20; theme: {

&#x20;   extend: {

&#x20;     colors: {

&#x20;       // ── Core Navy ──────────────────────────────

&#x20;       midnight:  '#060D16',          // deepest dark

&#x20;       navy: {

&#x20;         DEFAULT: '#091521',          // primary brand navy

&#x20;         deep:    '#091521',

&#x20;         sapphire:'#122038',          // secondary navy

&#x20;         pressed: '#081018',          // active/pressed

&#x20;       },



&#x20;       // ── Gold System ────────────────────────────

&#x20;       gold: {

&#x20;         DEFAULT:   '#B8841A',        // ★ Antique Gold — primary accent

&#x20;         champagne: '#D4A843',        // lighter gold — text on dark

&#x20;         muted:     '#7A5C12',        // borders, subtle dividers

&#x20;       },



&#x20;       // ── Warm Light ─────────────────────────────

&#x20;       parchment: {

&#x20;         DEFAULT: '#F2ECD8',          // ★ Aged Parchment — main bg

&#x20;         ivory:   '#FDFAF3',          // pure ivory — cards

&#x20;         sand:    '#DDD0B3',          // section dividers

&#x20;       },



&#x20;       // ── Text \& Supporting ──────────────────────

&#x20;       taupe:   '#8C7A68',            // ★ Warm Taupe — replaces cold gray

&#x20;       ink:     '#1C1C1E',            // body text on light

&#x20;       stone:   '#6B6052',            // muted text

&#x20;       copper:  '#A0522D',            // rare badge accent

&#x20;     },



&#x20;     // ── Gradients ───────────────────────────────

&#x20;     backgroundImage: {

&#x20;       'hero':          'linear-gradient(135deg, #060D16 0%, #122038 55%, #091521 100%)',

&#x20;       'hero-gold':     'linear-gradient(135deg, #091521 0%, #122038 55%, #B8841A 140%)',

&#x20;       'gold-shimmer':  'linear-gradient(90deg, #7A5C12, #D4A843, #B8841A, #D4A843, #7A5C12)',

&#x20;       'overlay':       'linear-gradient(180deg, rgba(6,13,22,0.85), rgba(9,21,33,0.97))',

&#x20;       'parchment-fade':'linear-gradient(180deg, #FDFAF3 0%, #F2ECD8 100%)',

&#x20;       'card-dark':     'linear-gradient(145deg, #122038, #091521)',

&#x20;     },



&#x20;     // ── Typography ──────────────────────────────

&#x20;     fontFamily: {

&#x20;       cormorant: \['var(--font-cormorant)', 'Georgia', 'serif'],

&#x20;       lora:      \['var(--font-lora)', 'serif'],

&#x20;       dm:        \['var(--font-dm-sans)', 'system-ui', 'sans-serif'],

&#x20;       amiri:     \['var(--font-amiri)', 'serif'],

&#x20;       noto:      \['var(--font-noto-arabic)', 'serif'],

&#x20;       cairo:     \['var(--font-cairo)', 'system-ui', 'sans-serif'],

&#x20;     },



&#x20;     // ── Animations ──────────────────────────────

&#x20;     animation: {

&#x20;       'gold-shimmer':   'goldShimmer 3s ease-in-out infinite',

&#x20;       'pattern-drift':  'patternDrift 60s linear infinite',

&#x20;       'fade-up':        'fadeUp 0.6s ease-out forwards',

&#x20;       'fade-in':        'fadeIn 0.4s ease-out forwards',

&#x20;     },

&#x20;     keyframes: {

&#x20;       goldShimmer: {

&#x20;         '0%, 100%': { backgroundPosition: '0% 50%' },

&#x20;         '50%':      { backgroundPosition: '100% 50%' },

&#x20;       },

&#x20;       patternDrift: {

&#x20;         from: { transform: 'rotate(0deg) scale(1.05)' },

&#x20;         to:   { transform: 'rotate(360deg) scale(1.05)' },

&#x20;       },

&#x20;       fadeUp: {

&#x20;         from: { opacity: '0', transform: 'translateY(24px)' },

&#x20;         to:   { opacity: '1', transform: 'translateY(0)' },

&#x20;       },

&#x20;       fadeIn: {

&#x20;         from: { opacity: '0' },

&#x20;         to:   { opacity: '1' },

&#x20;       },

&#x20;     },

&#x20;   },

&#x20; },

&#x20; plugins: \[],

}



export default config

```



\---



\### 5.3 CSS Custom Properties (globals.css)



```css

/\* app/globals.css \*/

@tailwind base;

@tailwind components;

@tailwind utilities;



:root {

&#x20; /\* ── Colour Tokens ───────────────────────── \*/

&#x20; --color-midnight:    #060D16;

&#x20; --color-navy-deep:   #091521;

&#x20; --color-navy:        #122038;

&#x20; --color-gold:        #B8841A;       /\* ★ Antique Gold \*/

&#x20; --color-gold-hi:     #D4A843;

&#x20; --color-gold-muted:  #7A5C12;

&#x20; --color-parchment:   #F2ECD8;       /\* ★ Aged Parchment \*/

&#x20; --color-ivory:       #FDFAF3;

&#x20; --color-sand:        #DDD0B3;

&#x20; --color-taupe:       #8C7A68;       /\* ★ Warm Taupe \*/

&#x20; --color-ink:         #1C1C1E;

&#x20; --color-stone:       #6B6052;



&#x20; /\* ── Gradients ───────────────────────────── \*/

&#x20; --gradient-hero:      linear-gradient(135deg, #060D16 0%, #122038 55%, #091521 100%);

&#x20; --gradient-hero-gold: linear-gradient(135deg, #091521 0%, #122038 55%, #B8841A 140%);

&#x20; --gradient-gold:      linear-gradient(90deg, #7A5C12, #D4A843, #B8841A, #D4A843, #7A5C12);

&#x20; --gradient-overlay:   linear-gradient(180deg, rgba(6,13,22,0.85), rgba(9,21,33,0.97));

&#x20; --gradient-parchment: linear-gradient(180deg, #FDFAF3 0%, #F2ECD8 100%);

&#x20; --gradient-card-dark: linear-gradient(145deg, #122038, #091521);



&#x20; /\* ── Gold Shimmer Animation ─────────────── \*/

&#x20; --gold-shimmer-size: 200% 100%;

}



/\* RTL support \*/

\[dir='rtl'] {

&#x20; --font-primary: var(--font-amiri);

&#x20; --font-body:    var(--font-noto-arabic);

&#x20; --font-ui:      var(--font-cairo);

}



/\* Gold shimmer button \*/

@layer components {

&#x20; .btn-gold {

&#x20;   background: var(--gradient-gold);

&#x20;   background-size: var(--gold-shimmer-size);

&#x20;   color: var(--color-navy-deep);

&#x20;   font-weight: 700;

&#x20;   transition: background-position 0.4s ease;

&#x20; }

&#x20; .btn-gold:hover {

&#x20;   background-position: 100% 0;

&#x20; }



&#x20; /\* Islamic geometric pattern overlay \*/

&#x20; .pattern-overlay::before {

&#x20;   content: '';

&#x20;   position: absolute;

&#x20;   inset: 0;

&#x20;   background-image: url('/images/pattern-8star.svg');

&#x20;   background-size: 80px 80px;

&#x20;   opacity: 0.04;

&#x20;   pointer-events: none;

&#x20; }

}

```



\---



\### 5.4 Project Structure (Unchanged)



```

islamtebyan/

├── app/

│   ├── \[locale]/

│   │   ├── layout.tsx

│   │   ├── page.tsx

│   │   ├── programs/...

│   │   ├── teachers/...

│   │   ├── method/page.tsx

│   │   ├── pricing/page.tsx

│   │   ├── book/page.tsx

│   │   ├── about/page.tsx

│   │   ├── faq/page.tsx

│   │   └── contact/page.tsx

│   ├── api/

│   │   ├── booking/route.ts

│   │   └── contact/route.ts

│   └── globals.css

├── components/

│   ├── ui/

│   ├── brand/

│   ├── layout/

│   ├── sections/

│   └── booking/

├── messages/

│   ├── en.json

│   ├── fr.json

│   └── ar.json

├── public/

│   ├── logo/

│   ├── images/

│   └── favicon/

├── middleware.ts

├── tailwind.config.ts

└── next.config.ts

```



\---



\## 6. SEO \& Metadata



\### 6.1 Per-Page Metadata



| Page | EN Title | Description |

|---|---|---|

| Home | Islam Tebyan Academy — Live Quran \& Arabic Classes | Premium 1-on-1 Quran, Arabic \& Islamic Studies. Live Zoom with certified scholars. Arabic, English \& French. |

| Quran | Online Quran Classes — Tajweed \& Memorization | Learn Quran with tajweed from certified huffaz. Private 1-on-1 Zoom. All levels. |

| Arabic | Learn Classical Arabic Online | Master classical Arabic with native scholars. Personalized live sessions. |

| Islamic Studies | Islamic Studies Online — Private Lessons | Deepen understanding of Islam through 1-on-1 sessions. Fiqh, Aqeedah, Seerah, Tafsir. |

| Teachers | Meet Our Scholars | Certified scholars available for private Zoom sessions. |

| Pricing | Pricing \& Plans | Flexible 1-on-1 plans for Quran, Arabic \& Islamic Studies. Free trial available. |

| Book | Book a Free Trial | Book your free 1-on-1 session. Arabic, English \& French. |



\### 6.2 Open Graph Colour Palette

All OG images (1200×630px) use:

\- Background: `--gradient-hero-gold`

\- Title text: `#F2ECD8` (Aged Parchment)

\- Accent/logo: `#D4A843` (Champagne Gold)

\- Pattern overlay: 8-pointed star SVG at 5% opacity



\---



\## 7. Performance Budget



| Metric | Target | Threshold |

|---|---|---|

| LCP | < 1.8s | < 2.5s |

| CLS | < 0.05 | < 0.1 |

| INP | < 100ms | < 200ms |

| Lighthouse | ≥ 95 | ≥ 90 |

| First Load JS | < 80kB (gz) | < 120kB |

| Images/page | < 400kB | < 600kB |



\---



\## 8. Vercel Free Tier Strategy



| Resource | Limit | Strategy |

|---|---|---|

| Bandwidth | 100 GB/mo | WebP/AVIF · SVG patterns (inline, no HTTP) |

| Build Minutes | 6,000/mo | SSG all pages · no heavy build plugins |

| Serverless | 1M invocations | Only 2 API routes (booking + contact) |

| Edge Middleware | 1M | Single lightweight locale middleware |



\---



\## 9. Development Roadmap



\### Phase 1 — Launch (Weeks 1–5)



| Week | Deliverables |

|---|---|

| 1 | Scaffold · Tailwind config v3 · Font system · i18n · Layout components |

| 2 | Home page (all 8 sections) · RTL · Motion · Pattern SVG |

| 3 | Program pages ×3 · Teachers page + profile template |

| 4 | Pricing · Booking form (5 steps) · Contact · FAQ |

| 5 | SEO metadata · Sitemap · OG images · Performance audit · Deploy |



\### Phase 1.5 — Growth (Weeks 6–10)

\- Blog (MDX-based SEO content engine)

\- WhatsApp Business integration

\- Calendly or TidyCal scheduling embed

\- GA4 event tracking

\- Notion CMS for testimonials



\### Phase 2 — Platform (Months 3–6)

\- Authentication (NextAuth.js magic link)

\- Booking management dashboard

\- Teacher availability calendar

\- Payment (Stripe + regional gateways)

\- Student progress tracking

\- Admin panel



\---



\## 10. Success Metrics



| Metric | Month 1 | Month 3 | Month 6 |

|---|---|---|---|

| Monthly Sessions | 500 | 3,000 | 8,000 |

| Trial Bookings | 15 | 80 | 200 |

| Booking Conversion | 3% | 5% | 6% |

| Avg. Session Duration | 2:00 | 2:30 | 3:00 |

| Lighthouse Score | ≥ 90 | ≥ 93 | ≥ 95 |

| WhatsApp Inquiries | 20/mo | 60/mo | 150/mo |



\---



\## 11. Colour Quick-Reference Card



```

┌─────────────────────────────────────────────────────────┐

│           ISLAM TEBYAN — COLOUR TOKENS v3.0             │

├─────────────────┬───────────┬───────────────────────────┤

│ midnight        │ #060D16   │ Deepest dark / overlays   │

│ navy-deep       │ #091521   │ Primary — nav, footer     │

│ navy-sapphire   │ #122038   │ Cards, hover states       │

├─────────────────┼───────────┼───────────────────────────┤

│ gold ★          │ #B8841A   │ CTAs, icons, borders      │

│ gold-champagne  │ #D4A843   │ Text on dark, highlights  │

│ gold-muted      │ #7A5C12   │ Subtle borders, dividers  │

├─────────────────┼───────────┼───────────────────────────┤

│ parchment ★     │ #F2ECD8   │ Main background           │

│ ivory           │ #FDFAF3   │ Cards, clean sections     │

│ sand            │ #DDD0B3   │ Section dividers          │

├─────────────────┼───────────┼───────────────────────────┤

│ taupe ★         │ #8C7A68   │ Secondary text, captions  │

│ ink             │ #1C1C1E   │ Body text on light        │

│ stone           │ #6B6052   │ Muted / disabled          │

└─────────────────┴───────────┴───────────────────────────┘

★ = Changed from v2.0

```



\---



\*Islam Tebyan Academy — islamtebyan.com\*

\*PRD v3.0 — Colour System Updated | May 2026 | Confidential\*

ايه رائيك تعمل السيستم من prd دي

