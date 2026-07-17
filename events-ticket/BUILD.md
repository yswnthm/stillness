# Stillness Co. — Event Ticketing Build Plan

> **Project:** WooCommerce Native Event Ticketing (Option B — No Plugin)
> **Client:** Stillness Curated Retreats (`stillnesscuratedretreats.com`)
> **Agreed Price:** ₹12,000 | **Net to Yeswanth:** ~₹9,000–₹10,000
> **Timeline:** 3–5 working days from 03 June 2026
> **Working Directory:** `/Users/yswnth/Documents/Projects/stillness/events-ticket/`
> **Node Reference:** `/Users/yswnth/Documents/node/Projects/Solicate/clients/stillness-co/`

> **Active Issue Tracker:** [SINGLE-EVENT-ISSUES.md](./SINGLE-EVENT-ISSUES.md)

> **Current Build State:** Updated 15 June 2026. Catalog templates, single-event templates, ticket quantity selector, past-events counter ribbon, and unified MetForm waitlist template are implemented. Client has now shared a branded order email reference, so the remaining implementation item is the custom WooCommerce booking confirmation email.

---

## 1. Project Context

### What the Site Already Is

Stillness Co. runs on **WordPress + Elementor Pro**. The codebase started as a React/TypeScript + Vite app, but that approach was dropped. All actual pages are now built as **standalone HTML/CSS files** (e.g. `mens-series-v3.html`, `stillness_cards_v3.html`). These are developed locally, polished to final quality, and then **ported into Elementor JSON templates** (stored in `wordpress/men-series-templates-v1/`). That's the exact workflow this build follows.

WooCommerce is **already active** on the site. The client uses it for selling physical wellness products (Ritual Kits, Essentials, Subscriptions). The ticketing system will live alongside existing products — but it must be **completely isolated** from the retail shop by using category-scoped CSS.

### The Build Workflow (Source of Truth)

```
1. Build the page as a standalone HTML/CSS file (local, no framework)
   └── Reference: mens-series-v3.html, stillness_cards_v3.html

2. Polish the HTML/CSS to pixel-perfect quality

3. Convert each static section into a separate Elementor JSON template
   └── Format: identical to wordpress/men-series-templates-v1/ (one container → one html widget)
   └── CSS for the section is embedded inside the JSON's <style> tag — NOT a separate file
   └── Class names use section-specific prefixes (ev-, se-) to avoid conflicts across pages
   └── Every <style> rule uses !important (Elementor global styles override custom CSS otherwise)

4. Import JSON templates into Elementor on the live WordPress site

5. Load WooCommerce-native element overrides via Code Snippets plugin ONLY when absolutely necessary (e.g. single product page galleries). For the Catalog page, ALL CSS is embedded directly in the JSON templates.
```

> **Critical:** There is no Vite, no React, no build step. All deliverables are plain `.html` files for prototyping and `.json` templates + `.css` files for WordPress. Do not use a framework.

### What We Are Adding

A complete WooCommerce-native event ticketing system with:
1. An **Events Catalog page** — a clean grid of all upcoming retreats.
2. A **Single Event page** — a premium, adaptive template for each event booking page.
3. **Checkout Optimization** — stripped-down, frictionless checkout for virtual (event) products.
4. **Custom Confirmation Email** — branded Stillness WooCommerce order email based on the shared reference template.
5. **Ticket Quantity Selection** — users can book more than one ticket, bounded by available stock.
6. **Past Events Counter Ribbon** — dynamic credibility section using `59` as the fixed base count plus published event count.
7. **Unified MetForm Waitlist** — one shared `Events` form used on both the catalog page and individual event page.

The Stillness team publishes new events exactly like WooCommerce products (the only difference: they check "Virtual" and "Events" category). No developer is needed for each new event.

### What We Are NOT Touching

- Any existing shop products, product pages, or the retail WooCommerce flow
- Any existing Elementor templates (`wordpress/men-series-templates-v1/`)
- The Hero, Intro, Corporate, Stories, Footer sections
- Any PHP template files (we use CSS overrides and `functions.php` hooks only)
- The Vite/React files in root — those are abandoned, left as-is

---

## 2. Design Tokens (Source of Truth)

All CSS written for this project must strictly use these design tokens from the established Stillness design system. Do not invent new colors.

### Colors

| Token Name | Hex Value | Usage |
|---|---|---|
| `stone` | `#0E1B30` | Dark backgrounds, headings on light bg |
| `midnight` | `#1D3152` | Section backgrounds, hover states |
| `seafoam` | `#688F9D` | Primary accent, buttons, labels, icons, CTAs |
| `breeze` | `#D9E8EB` | Light section backgrounds (`rgba(217,232,235,0.3)`) |
| `wave` | `#A4B2BA` | Secondary/muted text on dark backgrounds |
| `sand` | `#C4BBB4` | Muted tones, subtle decorative use |
| `cream` | `#F7F0EC` | Light text on dark backgrounds, white areas |
| `white` | `#FFFFFF` | Pure white backgrounds |
| `amber` | `#C4935A` | Warm accent — used in Men's Series, optional for events |
| `warm` | `#E8DDD6` | Warm section backgrounds |

### Typography

| Role | Font | Weight | Notes |
|---|---|---|---|
| **Headings / Quotes** | `Cormorant Garamond` | 300–500 | Serif, used for event titles, hero headings |
| **Body / UI** | `Jost` | 200–500 | Sans-serif (the site uses Jost, not Lato — see mens-series-v3.html) |

> **Font note:** `mens-series-v3.html` and all live HTML pages use `Jost` (not `Lato`). Use `Jost` for all new event pages unless the specific Elementor widget overrides it with Lato. Always use `!important` on `font-family` inside HTML widgets — Elementor's global font settings will override custom CSS otherwise.

### Animations (Matching mens-series-v3.html)

```css
/* Entrance fade — matches site-wide pattern */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(22px); }
  to   { opacity: 1; transform: translateY(0); }
}
.f1 { animation: fadeUp 1.2s 0.1s ease both; }
.f2 { animation: fadeUp 1.2s 0.25s ease both; }
.f3 { animation: fadeUp 1.2s 0.4s ease both; }
.f4 { animation: fadeUp 1.2s 0.55s ease both; }

/* Organic breathe — for background decorative orbs */
@keyframes breathe {
  0%, 100% { transform: scale(1); opacity: 0.2; }
  50%       { transform: scale(1.1); opacity: 0.3; }
}

/* Hero image slow zoom — matching hero right panel */
@keyframes slowzoom {
  from { transform: scale(1.06); }
  to   { transform: scale(1.0); }
}
```

---

## 3. Architecture

```
stillnesscuratedretreats.com/
│
├── /shop/                        ← Existing retail shop (DO NOT TOUCH)
│   └── /product/[slug]/          ← Existing product pages (DO NOT TOUCH)
│
└── /events/                      ← NEW: Events catalog page
    └── /product/[event-slug]/    ← NEW: Single event booking page (auto-generated by WooCommerce)
```

### CSS Scoping Strategy

Every CSS rule for the Events system must be wrapped inside one of the following parent selectors:

- **Events catalog page:** `.tax-product_cat.term-events` or `.woocommerce-page.events-page`
- **Single event product page:** `.single-product.product_cat-events`
- **Checkout (virtual products):** `body.woocommerce-checkout` (with PHP-side logic to only strip fields for virtual products)

This guarantees that **no CSS rule from this build can affect the existing retail shop**.

---

## 4. File Structure (This Directory)

```
events-ticket/
│
├── BUILD.md                      ← This file. Master plan and checklist.
├── SINGLE-EVENT-ISSUES.md        ← Resolved single-event issue tracker.
├── plan.md                       ← Live task tracker (mark [~] in progress, [x] done)
├── pending-tasks.md              ← Current pending/live QA and client questions.
├── metform-events-setup.md       ← MetForm setup notes for the unified Events form.
├── update_waitlist_forms.mjs     ← Syncs the unified waitlist section into all template copies.
│
├── prototype/
│   ├── events-catalog.html       ← Standalone HTML prototype — events catalog page (APPROVED)
│   └── single-event.html         ← Standalone HTML prototype — single event page (APPROVED)
│
├── snippets/
│   ├── functions-snippets.php    ← All PHP hooks/filters (shortcodes, warm band, checkout fields, button label)
│   ├── single-event.css          ← WC-native element overrides ONLY for single event page — loaded via Code Snippets
│   └── email-template.html       ← Branded WooCommerce order email visual reference
│
├── single-product-templates/     ← Elementor JSON sections for the single event product template
│   ├── template-single-event-01-nav.json
│   ├── template-single-event-02-hero.json
│   ├── template-single-event-03-warm-band.json
│   ├── template-single-event-04-content-booking.json
│   ├── template-single-event-05-waitlist.json     ← Unified MetForm waitlist section
│   └── template-single-event-06-footer.json
│
├── templates/                    ← Elementor JSON templates (same format as men-series-templates-v1)
│   │                               Each file = one section. CSS embedded inside the JSON's html widget.
│   ├── template-events-01-catalog-hero.json       ← Events catalog: hero banner section
│   ├── template-events-02-catalog-philosophy.json ← Events catalog: philosophy strip (dark band)
│   ├── template-events-03-catalog-featured.json   ← Events catalog: Featured event shortcode + embedded CSS
│   ├── template-events-04-catalog-grid.json       ← Events catalog: Event grid shortcode + embedded CSS
│   ├── template-events-05-catalog-pillars.json    ← Events catalog: "What to Expect" pillars
│   ├── template-events-06-catalog-waitlist.json   ← Events catalog: unified MetForm waitlist section
│   ├── template-events-07-single-waitlist.json    ← Shared MetForm waitlist compatibility copy
│   └── template-events-08-catalog-counter.json    ← Catalog past-events counter ribbon
│
├── admin-guide.md                ← Step-by-step guide for Stillness admin team
└── qa-checklist.md               ← Final QA checklist before handoff
```

Root-level related guide:

```text
METFORM_TEMPLATE_SECTION_GUIDE.md  ← Reusable context for future MetForm template sections.
```

> **Key rule:** Custom section CSS (hero, pillars, waitlist, philosophy strip) lives **inside the JSON templates** as embedded `<style>` tags — exactly as `men-series-templates-v1` does it. The `snippets/*.css` files are **only** for WooCommerce-generated markup that cannot be targeted from inside an Elementor widget.

---

## 5. Phase-by-Phase Build Plan

---

### PHASE 0 — Access & Environment Setup ✅ COMPLETE

**Goal:** Verify we have everything needed before touching the live site.

- [ ] **0.1** Get WP Admin credentials from Sakshi:
  - Admin URL (usually `stillnesscuratedretreats.com/wp-admin`)
  - Username + Password
- [ ] **0.2** Log into WP Admin. Confirm the following are active:
  - WooCommerce is installed and active
  - Elementor Pro is installed and active
  - A **child theme** is active (check under `Appearance → Themes`). If no child theme is present, create one before touching `functions.php`. Never edit a parent theme directly.
- [ ] **0.3** Confirm the payment gateway (Stripe or PayPal) is already configured and working. We will not touch this.
- [ ] **0.4** Install **Code Snippets** plugin (`Plugins → Add New → search "Code Snippets"`). This is the safest way to add PHP without editing `functions.php`. Lets you toggle snippets on/off without breaking the site.
- [ ] **0.5** Create a **test event product** (status: Draft, price: ₹10, stock: 3) to test all phases before going live.

**Commit:** `chore(setup): verify WP environment and install Code Snippets plugin`

---

### PHASE 1 — WooCommerce Product Category Setup ✅ COMPLETE

**Goal:** Create the "Events" product category that acts as the control switch for all our CSS scoping.

- [x] **1.1** Go to `Products → Categories`.
- [x] **1.2** Create a new category:
  - **Name:** `Events`
  - **Slug:** `events`
  - **Description:** (optional) "All upcoming retreats and wellness sessions."
  - **Display type:** Default
  - **Thumbnail:** (optional) Upload an atmospheric Stillness banner image
- [x] **1.3** Create the Draft test event product:
  - `Products → Add New`
  - **Title:** "Test Retreat — June 2026"
  - **Product type:** Simple product
  - **Virtual:** ✅ Check "Virtual" (this removes shipping fields)
  - **Downloadable:** ❌ Leave unchecked
  - **Regular Price:** ₹10
  - **Inventory tab:** Enable stock management. Stock qty: `3`. Allow backorders: No.
  - **Product Image:** Upload any Stillness-branded image as a banner placeholder.
  - **Short Description:** Use this field for a short emotional teaser only. Do **not** put dates, duration, venue, or emoji meta here. Those belong in product attributes.
    Example:
    ```
    Step into the new season with clarity, energy, and renewed purpose.

    A gentle immersion of movement, meditation, and guided reflection designed to release the weight of winter.
    ```
  - **Custom Attributes:** Add all three:
    - `Event Dates` → `02–05 March 2027`
    - `Duration` → `4 Days, 3 Nights`
    - `Sanctuary` → `Vana Retreat, Dehradun`
  - **Categories:** Assign to `Events`
  - **Status:** Draft (do not publish yet)
- [x] **1.4** Verify the test product appears at `stillnesscuratedretreats.com/product-category/events/` (may return 404 until the page/menu is set up — that's okay for now).

**Commit:** `feat(woo): create events category and draft test product`

---

### PHASE 2 — HTML Prototype: Events Catalog Page ✅ COMPLETE

**Goal:** Build the Events Catalog page as a **standalone HTML/CSS file** (`prototype/events-catalog.html`) first — exactly as `mens-series-v3.html` was built. Polish it locally. Then convert each section into an Elementor JSON template.

> **Status:** `prototype/events-catalog.html` is built and design-approved. Skip to §2.1.B to convert sections to JSON templates.

#### 2.1 Build the Prototype

Create `prototype/events-catalog.html` as a self-contained single file with:

- Google Fonts import: `Cormorant Garamond` + `Jost`
- CSS variables from the design tokens above
- All animations from the site pattern (`fadeUp`, `slowzoom`, etc.)
- No build tools, no framework — just HTML + inline `<style>`

**Section 1: Events Hero Banner**
```
Background: #0E1B30 → #1D3152 gradient (matching site hero)
Layout: matches mens-series-v3.html hero-left pattern
Content:
  - Badge: "UPCOMING RETREATS" (Jost, uppercase, seafoam, letter-spacing: 4px)
  - H1: "Find Your Stillness" (Cormorant Garamond, #F7F0EC, clamp(46px, 5.5vw, 72px))
  - Subtext: "Intimate, curated retreats. Book your spot before it's gone." (Jost light, #A4B2BA)
  - Scroll indicator (matching hero scroll pattern from site)
Animations: .f1 .f2 .f3 .f4 classes on all elements
```

**Section 2: Events Grid**
```
Background: #FFFFFF
Padding: 80px top / 80px bottom
Layout: 3-column card grid (responsive → 1-col on mobile)
Card design: matching foryou-card / fac-card pattern from site
  - Banner image (16:9 ratio, object-fit: cover)
  - Event title (Cormorant Garamond, 22px)
  - Meta pill (date/location, Jost, uppercase, seafoam border)
  - Price (Jost, seafoam color)
  - "View Details →" button (outline, seafoam, pill-shaped)
  - Hover: translateY(-6px) + stronger shadow (matching site card pattern)
```

**Section 4: What to Expect Pillars**
```
Background: var(--cream)
Layout: 3-column centered grid
Content: I — Intimacy / II — Integration / III — Environment
Typography: Cormorant Garamond numerals (faded seafoam), h3 titles, Jost body
Reveal: .reveal class + IntersectionObserver scroll animation
```

**Section 5: Waitlist CTA**
```
Background: var(--stone) #0E1B30
Content: Shared MetForm email capture form (Email + Submit)
Purpose: Serves dual role — primary CTA when events are available AND
         the fallback state when no events exist (see Edge Cases below)
```

---

#### 2.1.B Convert Sections to Elementor JSON Templates

> **Trigger:** Run this after the HTML prototype is approved (design sign-off received).
> Each section from `prototype/events-catalog.html` becomes its own `.json` file in `templates/`.
> Format is identical to `wordpress/men-series-templates-v1/` — study those files before writing.

**Rules for every JSON template:**
- Structure: one top-level `container` (full width, zero padding) → one `html` widget
- The entire section HTML + `<style>` tag goes inside the `"html"` string value (JSON-escaped)
- `@import url(...)` for Google Fonts at the top of every `<style>` block
- Every CSS rule uses `!important` — Elementor global styles override custom CSS otherwise
- Class names must use the `ev-` prefix (e.g. `ev-hero`, `ev-pillar`) to avoid conflicts
- `:root` CSS variable block inside every template (copy from prototype)
- `@media (max-width: 768px)` block at the bottom of every `<style>` block

**Section → File mapping:**

| Section in prototype | JSON file to create |
|---|---|
| `.hero` section | `template-events-01-catalog-hero.json` |
| `.window-strip` section | `template-events-02-catalog-philosophy.json` |
| `[stillness_featured_event]` | `template-events-03-catalog-featured.json` |
| `[stillness_event_grid limit="3"]` | `template-events-04-catalog-grid.json` |
| `.pillars-section` section | `template-events-05-catalog-pillars.json` |
| Unified MetForm waitlist section | `template-events-06-catalog-waitlist.json` |
| `[stillness_past_events_counter]` | `template-events-08-catalog-counter.json` |

**After creating the JSON files:**
- [x] Import each into Elementor on the Events draft page in sequence
- [x] Verify visual output matches the HTML prototype exactly
- [x] Check mobile layout at 375px and 768px

---

#### 2.A Edge Cases — Zero Admin Required

> **Rule:** Sakshi's only job is managing products (title, price, stock, image, category). 
> Every state below must resolve itself automatically through PHP + CSS. No Elementor 
> editing, no theme changes, no page edits from Sakshi ever.

---

**Edge Case 1: No upcoming events at all**

*Trigger:* Zero published products in the `Events` category.

*Automatic Behavior:*
- The **Featured Event Block** renders the static `New Retreat Dates Coming Soon` waitlist state
- The **Events Grid** area is replaced by a branded empty-state block
- The **Waitlist CTA** remains fully visible as the primary action

*Implementation:*
```php
// PHP: stillness_render_featured_event()
// If query returns zero posts → output nothing (block collapses via CSS)
// CSS: .stillness-featured-event:empty { display: none; }

// CSS: Empty state on WooCommerce grid
.term-events .woocommerce-info { display: none; } /* Hide default WC message */
.term-events .woocommerce-no-products-found::before {
  content: 'New immersions are being planned.';
  /* styled block — see CSS section 2.5 */
}
```

**Edge Case 2: The featured event is sold out**

*Trigger:* The most recent published event has `stock = 0`, but another event is still in stock.

*Automatic Behavior:*
- Featured block skips sold-out events and renders the newest in-stock event.
- Sold-out events can still appear in the grid.
- Sold-out grid cards show a "Sold Out" pill and no View Details CTA.

*Implementation:*
```php
// PHP snippet checks $product->is_in_stock()
// If false → adds class 'is-sold-out' to the featured block wrapper
// CSS handles the visual state via .is-sold-out modifier classes
```

**Edge Case 3: All events are sold out**

*Trigger:* All published Events products have `stock = 0`.

*Automatic Behavior:*
- Featured block shows the static `New Retreat Dates Coming Soon` waitlist state.
- All grid cards show real past/sold-out events.
- Waitlist CTA remains visible as the primary action.

**Edge Case 4: Only 1 or 2 events in the grid**

*Trigger:* 1 or 2 published Events products exist.

*Automatic Behavior:*
- Grid uses `auto-fill` with `minmax(320px, 1fr)` so cards fill available space naturally
- 1 card: renders at ~380px wide, left-aligned — does not look broken
- 2 cards: renders as 2 even columns — no ghost empty third column

*Implementation:*
```css
/* CSS: grid never forces empty ghost columns */
.term-events ul.products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}
```

**Edge Case 5: Featured event is deleted or unpublished**

*Trigger:* Sakshi deletes an event product or sets it back to Draft.

*Automatic Behavior:*
- PHP query re-runs on every page load and fetches the newest published in-stock event.
- If no in-stock event exists, the static waitlist fallback renders.
- No stale/broken featured product is displayed.

**Edge Case 6: No current retreat dates are ready**

*Trigger:* Stillness has no live/upcoming retreat to sell, but the page should not feel empty.

*Code-driven fallback workflow:*
- Do **not** create a fake WooCommerce product for this state.
- Keep WooCommerce products limited to real events only.
- Featured shortcode queries the newest in-stock event first.
- If no in-stock event exists, it renders a static waitlist block.

*Automatic Behavior:*
- Section 3 renders `New Retreat Dates Coming Soon` as static copy.
- CTA becomes `Join Waitlist`.
- Section 4 can still show latest real past/sold-out events.
- No placeholder price, image, publish-date hack, or fake product is needed.

**Current content workflow for launch**

- Use the Stillness Eventbrite organizer page as the source for two previous event details:
  - `https://www.eventbrite.ca/o/78867564303`
- Add those two previous events as published `Events` products.
- Delete the temporary test event products after the two real previous events are added.
- Delete or set the `New Retreat Dates Coming Soon` product to `Private` if it was already created.
- For the no-current-events state, rely on the code-driven featured waitlist fallback.
- Previous retreats can remain published if they should appear in the grid.
- Duration is flexible text. It can be `2 Hours`, `90 Minutes`, `Half-day session`, etc. Sakshi confirmed current events are usually a couple of hours, not multi-day retreats.
- Sakshi asked if total events hosted can be added. This is implemented as a catalog counter ribbon using `59` as the fixed base count plus the current published Events product count.

**Eventbrite import workflow**

```
Source: https://www.eventbrite.ca/o/78867564303

1. Pick 2 previous Stillness events from Eventbrite.
2. Extract event name, date/time, venue/location, image, and description.
3. Rewrite the copy into our WooCommerce format.
4. Create product title, short description, long description, product image, and attributes.
5. Set stock to 0 if these are past events and should not be bookable.
6. Delete temporary test events.
7. Let the code-driven featured fallback handle the no-upcoming-events state.
```

**Catalog credibility metric**

Implemented as a dynamic shortcode:

```text
[stillness_past_events_counter]
```

The display count is:

```text
59 + current published Events product count
```

The section template is:

```text
templates/template-events-08-catalog-counter.json
```

**Client content request format**

Use this exact format when asking Sakshi for previous retreat details:

```
Event name:
Spring Awakening

Event date:
02-05 March 2027

Duration:
4 Days, 3 Nights

Venue / sanctuary:
Vana Retreat, Dehradun

Short description:
Step into the new season with clarity, energy, and renewed purpose.

A gentle immersion of movement, meditation, and guided reflection designed to release the weight of winter.

Long description:
The Journey

As the earth wakes up, so do we. This immersion is designed to shed the weight of winter and step into the new season with clarity, energy, and a renewed sense of purpose.

I. Movement

Dynamic morning practices designed to move stagnant energy and build internal heat, paired with restorative evening sessions.

II. Clarity

Guided journaling and meditation focused on clearing mental clutter and setting powerful intentions for the months ahead.

Photos:
Main event image
2-3 supporting images, if available
```

---

#### 2.2 WordPress Page Setup (After Prototype is Approved)

- [x] Go to `Pages → Add New`.
- [x] **Title:** `Events`
- [x] **Slug:** `events`
- [x] **Template:** Elementor Full Width
- [x] Save as Draft. Do NOT publish yet.

#### 2.3 WooCommerce Category Archive Configuration

Import the JSON templates into the Elementor page in sequence.
Templates 03, 04, and 08 contain custom PHP shortcodes wrapped in HTML widgets along with their CSS.
Template 06 contains the shared MetForm waitlist shortcode.

#### 2.4 PHP Snippets — Dynamic Catalog Sections (`snippets/functions-snippets.php`)

The active implementation uses custom shortcodes instead of WooCommerce's default `[products]` loop.

**`[stillness_featured_event]`**
- Renders the newest published product in the `Events` category.
- Uses product featured image, title, product short description, and these attributes:
  - `Event Dates`
  - `Duration`
  - `Sanctuary`
- Adds sold-out styling when stock is `0`.
- Changes CTA to `Join Waitlist` when sold out.
- Does **not** render the long description on the catalog page.

**`[stillness_event_grid limit="3"]`**
- Renders exactly 3 published `Events` products.
- Uses publish order, newest first.
- Includes the featured event in the grid.
- Uses image, attributes, title, short description preview, price, and sold-out state.
- Replaces the old WooCommerce `[products category="events"]` shortcode because the default loop cannot render attributes or short descriptions cleanly.

**`[stillness_past_events_counter]`**
- Renders the catalog credibility counter ribbon.
- Uses `59` as the fixed base count.
- Adds the current published Events product count to that base.
- Outputs the `.ec-counter-ribbon` section.
- Imported through `template-events-08-catalog-counter.json`.

**Important:** Price output uses WooCommerce's `$product->get_price_html()`. If a currency plugin converts `$40` to `25,00 €`, that is controlled by WooCommerce/currency settings, not by our template.

- [x] **2.6** Add the Events page to the main navigation: `Appearance → Menus`. Add "Events" after the "Shop" link.
- [x] **2.7** Change the status of the page to **Published**. Verify the catalog page renders at `/events/`.
- [x] **2.8** Test all edge cases in staging:
  - [x] Zero published events → Featured block hidden, empty state message shows, waitlist CTA visible
  - [x] One event, sold out → Featured shows Sold Out badge + overlay, CTA becomes "Join Waitlist", card shows Sold Out pill
  - [x] All events sold out → Same as above across all grid cards
  - [x] One event, in stock → Featured shows correctly, grid shows 1 card (no broken layout)
  - [x] Two events → Grid shows 2 cards, no ghost third column
  - [x] Three+ events → Grid shows latest 3 published event products
  - [x] Event deleted/unpublished → Featured block auto-updates or collapses
  - [x] No in-stock event → Featured shows static waitlist fallback, grid shows latest real events

**Commit:** `feat(events): add events catalog page with dynamic featured block and full edge case handling`

---

### PHASE 3 — HTML Prototype: Single Event Booking Page ✅ COMPLETE

**Goal:** Build the single event page as a **standalone HTML/CSS file** (`prototype/single-event.html`) first. Polish it locally. Then:
- Convert the **waitlist section** (`#notify`) into the shared MetForm waitlist template
- Write WooCommerce element override CSS in `snippets/single-event.css` (loaded via Code Snippets)
- Write PHP hooks in `snippets/functions-snippets.php` (warm band, Book Ticket rename, checkout strip)

> **Status:** ✅ DONE. Prototype built, design approved, JSON templates (`template-single-event-01` through `06`) prepared for Elementor Theme Builder. All 7 tracked Single Event page issues are resolved in the local templates, including the unified MetForm waitlist section. See [SINGLE-EVENT-ISSUES.md](./SINGLE-EVENT-ISSUES.md).

---

#### 3.1 Prototype Structure

`prototype/single-event.html` is a self-contained single file matching the Stillness design system. It contains the following sections:

```
1. Fixed Nav Bar (Stillness Co. logo + nav links + CTA)
2. Hero Banner — full-bleed product image with slowzoom animation + gradient overlay
3. Warm Band — 3-column metadata strip (Dates / Duration / Sanctuary)
4. Two-Column Content Area:
   Left column:
     - Description block (title, blockquote, body text)
     - Experience Pillars (I / II / III — maps to WC long description)
   Right column:
     - Sticky booking card:
       - Spots remaining badge (pulsing dot animation)
       - Event title + price (seafoam, 26px Jost)
       - Mini details list (date, location, group size — icons)
       - Ticket quantity selector (+/- bounded by stock)
       - "Book Ticket" CTA button
       - "Join Waitlist Instead" secondary link (hidden unless sold out)
       - Trust line (price includes text)
5. Waitlist Section (#notify — dark stone background, shared MetForm form)
6. Footer
```

> **Sections deliberately excluded from the prototype:**
> - ~~Itinerary / Daily Flow Timeline~~ — removed. Too static; does not map to any WooCommerce native field.
> - ~~Facilitator Profile Card~~ — removed. Facilitator content is per-event authored content, written by the admin directly in the WC long description when needed.

---

#### 3.2 WooCommerce Data Mapping (Source of Truth)

This table defines exactly what WordPress data source populates each visible section of the single event page. **No section should display data that doesn't have a clear, admin-manageable source.**

| Prototype Section | WordPress Data Source | Admin Action Required |
|---|---|---|
| Hero banner image | WC → Product Featured Image | Upload event photo |
| Hero title | WC → Product Title | Type event name |
| Hero subtitle (location) | WC → `_event_sanctuary` attribute | Fill attribute field |
| **Warm Band → Dates** | WC → Custom Product Attribute `Event Dates` | Fill attribute field |
| **Warm Band → Duration** | WC → Custom Product Attribute `Duration` | Fill attribute field |
| **Warm Band → Sanctuary** | WC → Custom Product Attribute `Sanctuary` | Fill attribute field |
| Price | WC → Regular Price | Type ticket price |
| Stock / spots remaining | WC → Stock Quantity | Set inventory count |
| Short intro / teaser | WC → Short Description | Write 1-2 emotional lines, no logistics |
| Description block (left) | WC → Long Description | Write event narrative |
| Experience Pillars (left) | WC → Long Description | Write as part of long description |
| Booking card meta details | WC → Custom Attributes (rendered via PHP) | Auto-populated from attributes |
| Sold Out state | WC → Stock = 0 (automatic) | No action needed |
| Waitlist form | MetForm shortcode `[metform form_id="6697"]` | Create/update the `Events` form in MetForm |

> **Why Long Description for pillars?** WooCommerce's long description is a full WYSIWYG editor. Sakshi can paste pre-structured content or use heading blocks. Our scoped CSS automatically styles whatever renders in `.woocommerce-product-details__short-description` and the long description area. No PHP needed for this.

> **Short description rule:** Short description is marketing/feeling copy only. Never put event date, duration, sanctuary, city, or emoji meta in short description. The catalog and single page already render logistics from attributes.

---

#### 3.3 Warm Band — Implementation Strategy (OPTION B — Chosen)

The Warm Band metadata (Dates, Duration, Sanctuary) is rendered via **WooCommerce Custom Product Attributes** — no ACF, no custom fields plugin needed.

**Admin flow (Sakshi's perspective):**
1. Go to `Products → Edit Event Product`
2. Scroll to `Product Data → Attributes`
3. Create a custom attribute: `Event Dates` → Value: `15 June – 18 June 2026`
4. Create a custom attribute: `Duration` → Value: `3 Days, 3 Nights`
5. Create a custom attribute: `Sanctuary` → Value: `The Wellness Sanctuary, South Goa`
6. **Do NOT check "Visible on the product page"** — we render this ourselves via a custom PHP hook, not the default WC attribute table.

**Current PHP implementation:**

- Lives in `events-ticket/snippets/functions-snippets.php`.
- Hooks into WooCommerce on single event products.
- Reads the three custom attributes via `$product->get_attribute()`.
- Outputs the `.stillness-warm-band` HTML block.
- If any attribute is missing, that column is skipped gracefully.
- The same snippet also handles the catalog shortcodes, Book Ticket label, checkout simplification, and event CSS injection.

---

#### 3.4 Ticket Quantity Selector and Unified Waitlist

**Ticket quantity selector**
- Implemented in `snippets/functions-snippets.php`.
- Replaces the plain WooCommerce quantity input with a Stillness-styled plus/minus control.
- Keeps the native WooCommerce quantity input in sync, so cart, checkout, and WooCommerce Orders still receive the real quantity.
- Bounds quantity by WooCommerce min/max stock values.

**Unified waitlist section**
- Uses one MetForm form for both catalog and individual event pages.
- Working shortcode: `[metform form_id="6697"]`.
- MetForm slug shortcode was tested and did not work reliably on this site.
- Source/sync helper: `update_waitlist_forms.mjs`.
- Import-ready single-event file: `single-product-templates/template-single-event-05-waitlist.json`.
- Import-ready catalog file: `templates/template-events-06-catalog-waitlist.json`.
- Related setup guide: `metform-events-setup.md`.
- Future reusable context: `../METFORM_TEMPLATE_SECTION_GUIDE.md`.

---

#### 3.5 CSS — WooCommerce Element Overrides (`snippets/single-event.css`)

> **Scope:** This file covers **WooCommerce-generated markup only** — the product gallery, title, price, add-to-cart button, stock status, and tabs that WooCommerce renders natively on the single product page.
> The waitlist section is not handled by this CSS file. It is a reusable Elementor JSON section that embeds the shared MetForm shortcode `[metform form_id="6697"]`.
> Load `single-event.css` via the Code Snippets plugin (PHP `wp_head` wrapper) or Appearance → Additional CSS.
> Scope everything to `body.product_cat-events.single-product`.

```css
/* =========================================
   STILLNESS — SINGLE EVENT BOOKING PAGE
   Scoped to: body.product_cat-events.single-product
   DO NOT apply globally — retail shop safety
   ========================================= */

/* --- HERO GALLERY (Full-bleed image with slowzoom) --- */
body.product_cat-events .woocommerce-product-gallery {
  width: 100%; max-width: 100%; margin: 0;
}
body.product_cat-events .woocommerce-product-gallery__wrapper img {
  width: 100%; max-height: 520px; object-fit: cover;
  border-radius: 0; animation: slowzoom 16s ease forwards;
}
@keyframes slowzoom {
  from { transform: scale(1.06); }
  to   { transform: scale(1.0); }
}
body.product_cat-events .woocommerce-product-gallery__trigger,
body.product_cat-events .flex-control-thumbs { display: none; }

/* --- WARM BAND (rendered by PHP, styled here) --- */
.stillness-warm-band {
  display: grid; grid-template-columns: repeat(3, 1fr);
  padding: 44px 0;
  background: #F0E4D0;
  border-top: 0.5px solid rgba(196,187,180,0.5);
  border-bottom: 0.5px solid rgba(196,187,180,0.5);
}
.stillness-warm-item {
  padding: 0 44px;
  border-right: 0.5px solid rgba(196,149,90,0.25);
  display: flex; flex-direction: column; gap: 4px;
}
.stillness-warm-item:first-child { padding-left: 4rem; }
.stillness-warm-item:last-child { border-right: none; }
.stillness-warm-num {
  font-family: 'Cormorant Garamond', serif; font-size: 11px;
  color: #C4935A; letter-spacing: 0.2em; font-weight: 500;
}
.stillness-warm-title {
  font-family: 'Cormorant Garamond', serif; font-size: 20px;
  font-weight: 300; color: #0E1B30; line-height: 1.3;
}
.stillness-warm-body {
  font-size: 12px; line-height: 1.6;
  color: #3D4F57; letter-spacing: 0.02em;
}

/* --- PRODUCT TITLE --- */
body.product_cat-events .product_title.entry-title {
  font-family: 'Cormorant Garamond', serif !important;
  font-size: clamp(32px, 4vw, 48px); font-weight: 300;
  color: #0E1B30; line-height: 1.15; margin-bottom: 16px;
}

/* --- PRICE --- */
body.product_cat-events p.price {
  font-family: 'Jost', sans-serif !important;
  font-size: 20px; font-weight: 400;
  color: #688F9D; margin-bottom: 24px;
}

/* --- SHORT DESCRIPTION (event quote / intro) --- */
body.product_cat-events .woocommerce-product-details__short-description {
  font-family: 'Jost', sans-serif !important;
  font-size: 13px; line-height: 1.9;
  color: #1D3152; margin-bottom: 28px;
}

/* --- LONG DESCRIPTION (main event content) --- */
body.product_cat-events .woocommerce-product-details__short-description + .woocommerce-Tabs-panel,
body.product_cat-events #tab-description p,
body.product_cat-events #tab-description h2,
body.product_cat-events #tab-description h3 {
  font-family: 'Jost', sans-serif !important;
  font-size: 13.5px; line-height: 1.95; color: #3D4F57;
}
body.product_cat-events #tab-description h2,
body.product_cat-events #tab-description h3 {
  font-family: 'Cormorant Garamond', serif !important;
  font-weight: 300; color: #0E1B30;
}

/* --- BOOK TICKET BUTTON (rename Add to Cart) --- */
body.product_cat-events .single_add_to_cart_button {
  background: #0E1B30; color: #F7F0EC; border: none;
  border-radius: 2px; padding: 16px 40px;
  font-family: 'Jost', sans-serif !important;
  font-weight: 400; letter-spacing: 0.25em; text-transform: uppercase;
  transition: background 0.3s ease, transform 0.2s ease;
  font-size: 0; /* hide WC default text */
}
body.product_cat-events .single_add_to_cart_button::before {
  content: 'Book Ticket'; font-size: 10px;
}
body.product_cat-events .single_add_to_cart_button:hover {
  background: #1D3152; transform: translateY(-2px);
}

/* --- SOLD OUT STATE --- */
body.product_cat-events .stock.out-of-stock {
  font-family: 'Jost', sans-serif !important;
  font-size: 9px; letter-spacing: 0.25em;
  text-transform: uppercase; color: #A4B2BA;
}

/* --- HIDE RETAIL ELEMENTS --- */
body.product_cat-events .product_meta,
body.product_cat-events .woocommerce-tabs,
body.product_cat-events .star-rating,
body.product_cat-events .woocommerce-review-link { display: none; }

/* --- RELATED EVENTS HEADING --- */
body.product_cat-events .related.products h2 {
  font-family: 'Cormorant Garamond', serif !important;
  font-size: 28px; font-weight: 300; color: #0E1B30;
  text-align: center; margin-bottom: 32px;
}

@media (max-width: 768px) {
  .stillness-warm-band { grid-template-columns: 1fr; }
  .stillness-warm-item {
    padding: 0; border-right: none;
    border-bottom: 0.5px solid rgba(196,149,90,0.15); padding-bottom: 16px;
  }
  .stillness-warm-item:last-child { border-bottom: none; }
  body.product_cat-events .product_title.entry-title { font-size: 30px; }
  body.product_cat-events .woocommerce-product-gallery__wrapper img { max-height: 300px; }
}
```

- [x] **3.5** Paste `single-event.css` into Code Snippets plugin as an enqueued stylesheet.
- [x] **3.6** Warm band + all single event PHP shortcodes written and active in `snippets/functions-snippets.php`.
- [x] **3.7** Verified on live product page — all sections rendering correctly.
- [x] **3.8** Sold-out edge case implemented (`:has()` + `.is-sold-out` JS fallback).

**Commit:** `feat(events): single event page template — hero, warm band, book ticket, sold-out state`

---

### PHASE 4 — Checkout Optimization ⚠️ IMPLEMENTED IN SNIPPET, LIVE QA PENDING

**Goal:** Strip unnecessary billing fields for event (virtual) products so checkout is fast and friction-free. Only Name and Email are required.

#### 4.1 PHP Snippet — Remove Checkout Fields for Virtual Products

This logic is already present in `snippets/functions-snippets.php` as `stillness_simplify_virtual_checkout()`. If the shared Stillness Events snippet is not active on live, add/activate it through the Code Snippets plugin (`Snippets → Add New`):

```php
<?php
/**
 * Snippet: Remove unnecessary checkout fields for virtual/event products.
 * Scoped to: orders that contain only virtual products.
 * Safe: does not affect orders with physical products.
 */
add_filter( 'woocommerce_checkout_fields', 'stillness_simplify_virtual_checkout' );

function stillness_simplify_virtual_checkout( $fields ) {
  $has_physical = false;
  foreach ( WC()->cart->get_cart() as $cart_item ) {
    if ( ! $cart_item['data']->is_virtual() ) {
      $has_physical = true;
      break;
    }
  }

  if ( ! $has_physical ) {
    unset( $fields['billing']['billing_company'] );
    unset( $fields['billing']['billing_address_1'] );
    unset( $fields['billing']['billing_address_2'] );
    unset( $fields['billing']['billing_city'] );
    unset( $fields['billing']['billing_postcode'] );
    unset( $fields['billing']['billing_country'] );
    unset( $fields['billing']['billing_state'] );
    unset( $fields['billing']['billing_phone'] );
    unset( $fields['shipping'] );
  }

  return $fields;
}
```

- [ ] **4.2** Confirm the shared Events snippet is active on live.
- [ ] **4.3** Add the test event to cart. Go through checkout. Verify: only First Name, Last Name, and Email appear. No shipping section.
- [ ] **4.4** Add a physical shop product to a separate test cart. Verify the normal checkout fields appear without being affected.

**Commit:** `feat(checkout): strip billing fields for virtual event products`

---

### PHASE 5 — Email Confirmation ⬅️ CURRENT

**Goal:** Make the WooCommerce customer order email feel like a Stillness booking confirmation.

**Decision update on 15 June 2026:**
- The client shared a branded Stillness order email reference.
- A simple custom WooCommerce booking email is now in scope.
- No QR code, PDF ticket, scanner, or attendee-level ticket system is required.

#### 5.1 Email Template Reference

Reference file:

```text
events-ticket/snippets/email-template.html
```

This is a static HTML visual reference using placeholder tokens like:

```text
{{first_name}}
{{order_item_name}}
{{event_date}}
{{event_time}}
{{event_location}}
{{order_number}}
{{order_total}}
{{order_url}}
```

Implementation needs to convert those placeholders into WooCommerce/PHP values.

- [ ] **5.2** Convert the reference HTML into a WooCommerce email implementation.
- [ ] **5.3** Keep standard WooCommerce order details available in the email.
- [ ] **5.4** Send a free test event order.
- [ ] **5.5** Confirm the customer receives the branded Stillness confirmation email.
- [ ] **5.6** Confirm admin can still see buyer name, email, event product, ticket quantity, payment status, and order status in WooCommerce Orders.

**Commit:** `feat(email): add branded stillness booking confirmation`

---

### PHASE 6 — Adding First Real Event

**Goal:** Publish the first real event product and verify the full guest journey end-to-end.

- [ ] **6.1** Duplicate the Draft test product (`Products → hover → Duplicate`).
- [ ] **6.2** Fill in the real event details:
  - Title: [Actual retreat name]
  - Price: [Actual ticket price]
  - Short description: 1-2 line emotional teaser, no date/duration/location
  - Long description: Full event narrative, pillars, any rich content
  - Product image: Actual event banner photo
  - Custom Attributes: `Event Dates`, `Duration`, `Sanctuary` (all three required; duration can be hours/minutes)
  - Stock qty: Actual capacity (e.g., 15 or 20)
  - Category: Events ✅
- [ ] **6.3** Publish the event.
- [ ] **6.4** Walk through the full guest flow:
  1. Browse `/events/` → see event card with "View Details" button
  2. Click into the event → see full premium booking page
  3. Click "Book Ticket" → go to checkout with only Name + Email
  4. Complete payment → receive branded Stillness confirmation email
- [ ] **6.5** Test sold-out state: Reduce stock to 0. Verify "Sold Out" appears automatically. Restore stock.
- [ ] **6.6** Verify the retail shop (`/shop/`) is completely unaffected.

#### 6.A Short Description Examples

Use these as the reference style for current event products:

```
Spring Awakening

Step into the new season with clarity, energy, and renewed purpose.

A gentle immersion of movement, meditation, and guided reflection designed to release the weight of winter.
```

```
The Winter Reset

Turn inward through deep rest, nervous system regulation, and grounding desert stillness.

A stripped-back winter immersion designed to help you slow down, soften, and return to yourself without expectation.
```

```
The Summer Solstice Immersion

Restore balance and cultivate deep inner stillness through movement, breathwork, and meditative practice.

An intimate four-day retreat with personal guidance, quiet integration time, and space for the nervous system to soften.
```

#### 6.B No Upcoming Event Workflow

Do not create a placeholder WooCommerce product.

When no retreat is currently open:
1. Keep past real events published if they should appear in the grid.
2. Make sure all past events are stock `0`.
3. Delete or privatize any temporary placeholder product.
4. The featured shortcode automatically shows `New Retreat Dates Coming Soon`.
5. The CTA scrolls to the waitlist section.

When a new retreat is planned:
1. Create or duplicate any real event product.
2. Update title, price, stock, image, short description, long description, and attributes.
3. Publish the new retreat after all details are ready.
4. Because it is in stock, it automatically becomes eligible for the featured section.

**Commit:** `feat(events): first live event published and fully tested`

---

### PHASE 7 — Admin Guide & Handoff

**Goal:** Leave Stillness with a clear one-page guide so they can independently publish new events. Write this in `admin-guide.md`.

The guide must cover:
1. How to add a new event (step-by-step with screenshots if possible)
2. How to check attendees (`WooCommerce → Orders → filter by product name`)
3. How to export a guest list as CSV (for check-in at the venue)
4. How to mark an event as Sold Out manually (set stock to 0)
5. How to extend capacity (increase stock quantity)
6. How to take an event down after it's over (set to Private or Draft)
7. How the code-driven no-upcoming-event fallback works
8. How to duplicate a real event for a new retreat

- [ ] **7.1** Write `admin-guide.md`.
- [ ] **7.2** Send guide PDF or share the link to Sakshi.
- [ ] **7.3** Invoice Sakshi for ₹12,000. Track in `node/Areas/Personal/finances.md` when received.

**Commit:** `docs(handoff): admin guide complete, ready for client delivery`

---

## 6. QA Checklist (Before Handoff)

Save as `qa-checklist.md` and tick off each item before marking the project complete.

### Events Catalog
- [ ] Events page exists at `/events/` and is in the navigation menu
- [ ] Event cards show: banner image, event title, price, "View Details" button
- [ ] Past-events counter ribbon appears and reflects the `59 + published Events count` formula
- [ ] Star ratings are hidden on catalog
- [ ] Hover effect works on event cards (translateY + shadow)
- [ ] "View Details" button navigates to correct single event page
- [ ] Waitlist form section is visible and uses `[metform form_id="6697"]`
- [ ] Waitlist form submit button is visible
- [ ] Test email submission from catalog page appears in MetForm entries
- [ ] Retail shop products do NOT appear on the events page
- [ ] Responsive on mobile (single column, images crop correctly)

### Single Event Page
- [ ] Banner image is full-width and crops correctly (slowzoom animation)
- [ ] Event title uses Cormorant Garamond
- [ ] Warm band renders correctly with all 3 columns: Dates / Duration / Sanctuary (from WC attributes)
- [ ] Warm band collapses gracefully to single column on mobile
- [ ] Short description renders as the event intro/quote block
- [ ] Long description renders the full event content (narrative, pillars, etc.)
- [ ] Button text reads "Book Ticket" (not "Add to Cart")
- [ ] "Book Ticket" button uses stone color (#0E1B30), cream text
- [ ] Quantity selector is visible and plus/minus controls stay within available stock
- [ ] Cart and checkout show the selected ticket quantity correctly
- [ ] Waitlist form section is visible and uses `[metform form_id="6697"]`
- [ ] Waitlist form submit button is visible
- [ ] Test email submission from individual event page appears in MetForm entries
- [ ] SKU, categories, reviews tabs are all hidden
- [ ] Sold Out state auto-shows when stock hits 0 — button greyed, stock message visible
- [ ] Retail shop products do NOT show in Related Products on the event page
- [ ] Page is responsive on mobile

### Checkout
- [ ] Only First Name, Last Name, Email appear in billing section
- [ ] No shipping section visible
- [ ] Physical product checkout is NOT affected (test separately)
- [ ] Payment gateway processes correctly

### Confirmation Email
- [ ] Branded Stillness customer email sends automatically on payment completion
- [ ] Admin can see the event booking in WooCommerce Orders
- [ ] Order includes buyer name, email, event product, quantity, payment status, and order status

### Shop Safety
- [ ] Open `/shop/` → retail products look completely normal
- [ ] Open a physical product → product page looks completely normal, no event CSS
- [ ] Add physical product to cart → full billing + shipping fields appear in checkout

---

## 7. Commit Convention (Matching Project Standards)

Follow the project-established commit format from `conductor/workflow.md`:

```
<type>(<scope>): <description>
```

| Type | Usage |
|---|---|
| `feat` | New feature (new page, new CSS section) |
| `fix` | Bug fix |
| `chore` | Setup, config, admin tasks |
| `style` | CSS-only changes |
| `docs` | Documentation only (this file, admin guide) |

Examples:
```
feat(events): add events catalog page with premium card styling
feat(checkout): strip billing fields for virtual event products
fix(events): correct button label on iOS safari
style(events): refine event card hover shadow
docs(handoff): write admin guide for stillness team
```

After each commit, record the short commit SHA in `plan.md` against the completed task.

---

## 8. Key Constraints (Non-Negotiable)

1. **No framework.** All prototypes are plain HTML + CSS — no Vite, no React, no build step. Match `mens-series-v3.html` exactly.
2. **No new plugins.** WooCommerce native + CSS + PHP snippets only.
3. **All CSS is category-scoped.** Every rule must live inside `.product_cat-events` or `.term-events`. Never write global WooCommerce CSS.
4. **Never edit parent theme files.** Use child theme only, or Code Snippets plugin for PHP.
5. **Prototype first, deploy second.** Build the HTML file locally, get it pixel-perfect, then extract CSS for WordPress. Do not write CSS directly in WordPress first.
6. **Test with Draft products first.** Do not touch live/published retail products while testing.
7. **Font consistency.** Use `Cormorant Garamond` for headings and `Jost` for all UI text (not Lato — see `mens-series-v3.html`). Always use `!important` on `font-family` inside Elementor HTML widgets.
8. **Mobile-first mindset.** Every CSS section must include a `@media (max-width: 768px)` block.
9. **Match the site's visual language exactly.** Reference `mens-series-v3.html` for spacing, border-radius (`3px` not `50px`), button styles, card patterns, and animation classes before writing any new CSS.

---

*Created: 03 June 2026 | Yeswanth / Solicate*
*Last updated: 15 June 2026 — Client shared a branded Stillness order email reference. Added `events-ticket/snippets/email-template.html` as the visual source for the custom WooCommerce booking confirmation email.*
