# Hawaii Retreat Landing Page Plan

## Project Context

Client approved the revised Hawaii Retreat landing page at a flat Rs. 5,000.

Expected amount after deductions and Sakshi's cut is likely Rs. 3,500 to Rs. 4,000. Treat this as a controlled-scope build, not a full redesign project.

Client direction from Sakshi:

- Use all content from `content/neuro_sensory_reset_landing.html`.
- Design should match the kids mindfulness deck landing page we already made.
- Retreat is in Hawaii, so the page should feel clean, luxurious, image-led, and premium.

Primary build path:

`/Users/yswnth/Documents/Projects/stillness/hawaii`

Content source:

`/Users/yswnth/Documents/Projects/stillness/hawaii/content/neuro_sensory_reset_landing.html`

Reference pages:

- `/Users/yswnth/Documents/Projects/stillness/stillness_cards_v3.html`
- `/Users/yswnth/Documents/Projects/stillness/mens-series-v3.html`
- `/Users/yswnth/Documents/Projects/stillness/stillness_floating_2025.html`

## Scope Boundary

The page should reuse existing structural patterns from previous Stillness builds wherever possible.

Custom coding is allowed only where the Hawaii content demands it, especially for:

- luxury retreat hero treatment
- itinerary/protocol section
- biometric tracking section
- investment and inclusions section
- private application form section

Do not expand into:

- custom backend form handling
- advanced booking system
- payment integration
- CMS setup
- animation-heavy rebuild
- multi-page site
- copywriting rewrite beyond light polish

This should be a premium static landing page.

## Design Direction

Use the kids mindfulness deck page as the closest design reference:

- image-led hero with dark overlay
- Cormorant Garamond headings
- Jost body text
- Stillness color palette
- elegant cream, stone, seafoam, warm beige sections
- clean cards and spacious layout
- restrained motion and hover states

Adapt the mood for Hawaii:

- less playful than the kids deck
- more luxury retreat and nervous-system restoration
- warm coastal visuals
- slow, premium pacing
- clean white/cream sections with dark contrast sections
- minimal ornamentation

Suggested palette:

- `--stone: #0E1B30`
- `--cream: #F7F0EC`
- `--warm: #F2E8DF`
- `--seafoam: #688F9D`
- `--wave: #A4B2BA`
- `--sand: #C4BBB4`
- optional luxury accent: muted gold/amber from `mens-series-v3.html`

## Content Structure

Build around these sections from the provided content.

### 1. Fixed Navigation

Reuse pattern from `stillness_cards_v3.html` or `mens-series-v3.html`.

Content:

- Logo: Stillness
- CTA: Apply / Private Intake
- Link should scroll to application section.

### 2. Hero

Source content:

- "THE NEURO-SENSORY RESET"
- "A 4-day biometric intervention on Big Island, Hawaii..."
- "November 17-22, 2026 · 12 Exclusive Spots · $6,000 Investment"
- CTA: "Apply for Private Intake Consultation"

Build style:

- full-screen or near full-screen hero
- large Hawaii retreat image
- dark premium overlay
- soft luxury text hierarchy
- avoid the current content file's plain gradient hero

### 3. Opening Problem / Quiet Crisis

Source content:

- "The Quiet Crisis of High Performance"
- high performers, stress response, visual cortex, nervous system baseline

Build style:

- use a two-column section from `mens-series-v3.html`
- text on one side, image on the other
- keep copy elegant and readable

### 4. Protocol Pillars

Source content:

- "Clinical-Grade Nervous System Regulation"
- Neuro-Acoustic Somatic Toning
- Hydro-Acoustic Floating
- 24-Hour Blind Immersion

Build style:

- 3-column card/pillar section
- can reuse the "foryou-card" or "pillar" pattern
- make it feel clinical but not hospital-like

### 5. Hawaii Visual Strip

Purpose:

- satisfy client request for beautiful luxury images
- break up dense scientific copy

Build style:

- reuse photo strip from `stillness_floating_2025.html` or `mens-series-v3.html`
- 3 images: ocean, villa/retreat, sound/healing
- if no client assets exist, use high-quality remote images temporarily with clear replacement notes

### 6. Itinerary / Four-Day Protocol

Source content:

- Day 1: The Severance & Unplugging
- Day 2: Acoustic Re-Awakening & Vagal Toning
- Day 3: The 24-Hour Blind Sensory Immersion
- Day 4: Strategic Re-Entry & Integration

Build style:

- custom section needed
- timeline or stacked day cards
- mobile-friendly accordion-style visual is optional, but static stacked cards are enough
- emphasize premium curation and flow

### 7. Biometric Tracking & Integration

Source content:

- Phase 1: Pre-Retreat
- Phase 2: On-Site
- Phase 3: Integration

Build style:

- 3 phase cards
- use subtle data/clinical styling
- no complex charts needed
- make it look measured and premium

### 8. Inclusions & Investment

Source content:

- "Ultra-Exclusive Inclusions & Investment"
- strict 12 curated attendees
- inclusions list
- $6,000 one-time payment
- 5 x $1K payment plan
- terms

Build style:

- premium pricing card section
- one inclusions column and one investment card column
- keep terms readable but visually secondary

### 9. Application Form

Source content:

- name
- email
- phone
- title
- current stress levels / what they are seeking
- CTA: "Submit Application & Schedule Consultation"

Build style:

- static frontend form only unless client gives form endpoint
- reuse form card style from `mens-series-v3.html`
- add a simple success state if no backend exists
- no data submission promise unless connected later

### 10. Final CTA + Footer

Source content:

- "Your nervous system is ready. Apply for your private intake call today."
- Stillness Curated Retreats
- Big Island, Hawaii · November 17-22, 2026
- hello@stillnesscurated.com

Build style:

- warm final CTA band
- footer from existing pages
- one final scroll-to-form CTA

## Implementation Approach

1. Create a new final page in the Hawaii folder, likely:

   `index.html`

2. Use `stillness_cards_v3.html` as the base visual system because the client specifically referenced the kids mindfulness deck landing page.

3. Pull useful modules from:

   - `mens-series-v3.html` for warm premium cards, form card, pricing/step sections
   - `stillness_floating_2025.html` for dark hero, image strip, quote/experience rhythm

4. Replace the current content file's basic layout with a more premium layout.

5. Keep all content from `neuro_sensory_reset_landing.html`, but lightly polish headings and line breaks if needed.

6. Use responsive CSS from previous Stillness builds.

7. QA on:

   - desktop
   - mobile
   - hero image crop
   - form layout
   - itinerary readability
   - CTA scroll targets
   - no text overflow

## Asset Notes

Current Hawaii folder has no visible local image assets except the content HTML.

Need one of these:

- client-provided Hawaii/villa/retreat images
- existing embedded/reference imagery from previous Stillness pages
- temporary external luxury Hawaii images with replacement notes

For the final client-ready version, avoid generic-looking stock images where possible. The first viewport should clearly signal Hawaii, luxury, and retreat.

## Delivery Standard

The finished page should feel:

- clean
- luxurious
- calm
- high-ticket
- Stillness-branded
- consistent with previous builds

It should not feel:

- like a medical sales page
- like a cheap wellness template
- overdesigned beyond scope
- visually disconnected from the kids mindfulness deck page

## Next Build Step

Start from `stillness_cards_v3.html` as the base style.

Create `/Users/yswnth/Documents/Projects/stillness/hawaii/index.html`.

Use the content map above to rebuild the landing page into a premium 10-section static page.
