# Stillness Men's Series 2027 — Landing Page 2 Build Plan

## 1. Project Context & Objectives
* **Client / Brand:** Stillness Co. (Vancouver)
* **Project:** Men's Series 2027 Landing Page (Variation 2)
* **Location:** `/Users/yswnth/Documents/node/Projects/Solicate/clients/stillness-co/work/workspace/stillness/mens-lp-2`
* **Source Copy & Structure:** `/Users/yswnth/Documents/node/Projects/Solicate/clients/stillness-co/work/workspace/stillness/mens-lp-2/content/stillness-mens-series.html`
* **Design Benchmark & Visual Reference:**
  * Hawaii Retreat Landing Page (`../hawaii/index.html`) — Luxury editorial, stone vs. cream contrast, refined card structures.
  * Men's Series V3 (`../mens-series-v3.html`) — Previous Men's sound journey design patterns, warm bands, timeline spines, and facilitator bios.
  * Diagnostic Quiz (`../diagnostic-quiz/index.html`) — Design token standards, kicker typography, mobile-first responsiveness.

## 2. Core Constraints & Rules
1. **Copywriting Integrity:** 100% of copywriting, pricing, dates, bios, logistics, and FAQ must be extracted verbatim from the client-sent HTML (`content/stillness-mens-series.html`). No unauthorized paraphrasing or copy rewriting.
2. **Branding Direction:** Elevate the flat wireframe into Stillness's signature luxury aesthetic (Cormorant Garamond serif headings, Jost body/kickers, midnight stone `#0E1B30`, crisp pure white `#FFFFFF` ground, seafoam `#688F9D`, and amber `#C4935A`).
3. **Architecture:** Single standalone HTML file (`index.html`) with self-contained, responsive CSS and lightweight vanilla JS for accordion toggles, navigation scrolling, and interactive calendar/group selection states.
4. **Modularity / Post-Approval:** Structured with clear section boundaries so that once approved by the client, each section can be split into reusable HTML snippets in `snippets/`.

## 3. Design System & Tokens
```css
:root {
  --stone: #0E1B30;          /* Deep ink/midnight navy for high-contrast sections */
  --midnight: #1D3152;       /* Secondary dark blue for hovers & accents */
  --cream: #FFFFFF;          /* Pure white ground */
  --warm: #FFFFFF;           /* Crisp clean card/divider ground */
  --seafoam: #688F9D;        /* Signature Stillness muted cyan/teal for <em> and badges */
  --wave: #A4B2BA;           /* Slate grey for muted captions on dark backgrounds */
  --sand: #C4BBB4;           /* Warm border divider */
  --amber: #C4935A;          /* Warm gold/bronze accent for badges, numbers, highlights */
  --amber-light: #F0E4D0;    /* Warm gold tint card ground */
  --breeze: #D9E8EB;         /* Pale ice mist for readable text on dark sections */
  --text-body: #3D4F57;      /* Primary readable dark slate body text */
  --text-light: #7A8F96;     /* Secondary muted body text */
  --line: rgba(196, 187, 180, 0.45); /* Subtle hairline borders */
  --card-bg: #FFFFFF;        /* Crisp card ground on warm sections */

  --font-serif: 'Cormorant Garamond', Georgia, serif;
  --font-sans: 'Jost', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
```

## 4. Section Architecture & Blueprint

### Section 1: Fixed Navigation Bar
* **Branding:** `STILLNESS` logo with letter-spacing `0.32em`.
* **Nav Links:** `The evening`, `2027 dates`, `Pricing`, `FAQ`.
* **CTA Button:** `Reserve a seat` (scrolls smoothly to `#pricing`).
* **Visual Treatment:** Translucent frosted blur ground (`backdrop-filter: blur(12px)`), hairline bottom border.

### Section 2: Hero Section
* **Eyebrow:** `Men's Series · 2027 · Vancouver` in uppercase tracked sans with amber accent line.
* **H1:** `One evening a month to put it all down — <em class="accent">for a whole year.</em>`
* **Subdeck:** `Twelve evenings for men who carry everything. Breathwork, live sound and a room of men who get it — on the last weekend of every month, starting January 29, 2027.`
* **CTA Buttons:**
  * Primary: `Reserve a founding seat · $480`
  * Secondary (Ghost): `Try one session first`
* **Metrics Strip:**
  * `12` evenings in 2027
  * `40` founding seats for 2027
  * `$40` per evening, all year
* **Hero Visual:** Elegant editorial frame with session photography placeholder (candlelight, sound journey at The Shop Theatre).

### Section 3: Outcomes Band (Contrast Midnight Ground)
* **Background:** Deep midnight stone (`--stone`) with light breeze text.
* **3 Value Columns:**
  1. `WHAT YOU LEAVE WITH` -> `A quieter head` -> Description.
  2. `WHAT YOU BUILD` -> `Tools that last` -> Description.
  3. `WHO YOU FIND` -> `Men who get it` -> Description.
* **Visual Treatment:** Glass-panel subtle dividers with seafoam kicker labels and warm Cormorant Garamond headings.

### Section 4: "This Is For You If"
* **Eyebrow:** `This is for you if`
* **H2:** `You recognise yourself <em class="accent">in at least one of these.</em>`
* **3 Editorial Cards:**
  * `01` — `You're always "fine"`
  * `02` — `Rest feels unearned`
  * `03` — `You want something real`
* **Visual Treatment:** Cream card backgrounds with subtle border, hover elevation, and amber numeral markers.

### Section 5: "The Evening" (What Actually Happens in the Room)
* **Left Column:** Context, reassurance (*No experience needed. No one is asked to share. Wear something comfortable...*), and logistics card (When, Where: The Shop Theatre, Group: 13 men).
* **Right Column:** 4-stage sequential timeline:
  1. `[20 MIN]` — `Arrive & ground`
  2. `[25 MIN]` — `Story & breath`
  3. `45 MIN` — `Live sound journey`
  4. `[30 MIN]` — `Reflect & close`
* **Visual Treatment:** Clean vertical milestone spine with duration badges in seafoam pill frames.

### Section 6: Groups & 2027 Dates Calendar
* **Header:** `Pick your group. <em class="accent">Keep it all year.</em>` + Calendar subscription link.
* **Group Selection Grid (3 Cohorts):**
  * Group 1: Friday evening [7:00 – 9:30 PM]
  * Group 2: Saturday afternoon [2:00 – 4:30 PM]
  * Group 3: Saturday evening [7:00 – 9:30 PM]
* **12-Month Calendar Grid:** 12 cards representing monthly sessions (Session 01 to Session 12) with month, day dates, and December holiday rescheduling note.
* **Flexibility Notice:** Swap groups if you miss your night or send a friend.

### Section 7: Pricing & Tiers
* **Header:** `Commit to the year, <em class="accent">or start with one night.</em>`
* **CAD Notice:** All prices in CAD. Founding pricing closes January 20, 2027.
* **3-Card Grid:**
  1. `Drop-in`: $55 / evening
  2. `6-Month Package`: $270 ($45 each)
  3. `Founding Member · 12 Months` (Featured Tier): $480 ($40 each) with `[X] OF 40 SEATS LEFT` gold badge, full feature checklist, and prominent CTA.
* **Visual Treatment:** Featured Founding card styled in dark stone/gold (`.black-card` luxury style), standard tiers in clean paper white cards with hairline borders.

### Section 8: The Gift of Stillness
* **Eyebrow:** `The gift for the man who "doesn't need anything"`
* **H2:** `Give him a year <em class="accent">of stillness.</em>`
* **Copy:** Printable gift card, partner/father/brother gift option.
* **CTAs:** `Gift the year · $480` and `Gift one evening · $55`.
* **Visual Mockup:** Framed gift voucher placeholder in warm sand card.

### Section 9: Your Guides
* **Header:** `Led by men who practise <em class="accent">what they hold space for.</em>`
* **2 Facilitator Cards:**
  * **Sunny:** Men's Mental Health facilitator bio.
  * **Navin:** Sound & Breathwork facilitator bio.
* **Visual Treatment:** Framed portraits with role kickers, bio text, and credentials placeholders.

### Section 10: Proof / Session 01 Feedback
* **Eyebrow:** `From Session 01 · March 27, 2026`
* **H2:** `12 men came. <em class="accent">[X] came back.</em>`
* **3 Testimonial Cards:** Anurag's quote + two client testimonial slots with serif pull-quotes.

### Section 11: Frequently Asked Questions (FAQ)
* **Header:** `Before you <em class="accent">walk in.</em>`
* **6 Collapsible Accordions:**
  1. I've never done anything like this. Will it be weird?
  2. Do I have to talk or share?
  3. What if I miss a month?
  4. What should I wear or bring?
  5. Is this therapy?
  6. What's your refund policy?
* **Visual Treatment:** Bespoke expandable details/summary with smooth disclosure and custom `+` / `−` animated indicators.

### Section 12: Final Urgency CTA & Footer
* **Final CTA:** Midnight stone background, series start date countdown urgency (`January 29, 2027`), 40 founding seats limit, dual CTA (`Reserve my seat · $480` and `Join the WhatsApp group`).
* **Footer:** Clean Stillness branding, email `info@wearestillness.com`, and copyright info.

## 5. Execution Steps
1. Write full verbatim copy documentation to `copy.md`.
2. Generate responsive, high-fidelity `index.html` with inline CSS and lightweight JS.
3. Validate typography, layout responsiveness (mobile 375px, tablet 768px, desktop 1200px+), contrast ratios, and interactive states.
