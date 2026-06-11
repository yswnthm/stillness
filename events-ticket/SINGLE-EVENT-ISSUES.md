# Single Event Page — Issue Tracker

> **Linked from:** [BUILD.md](./BUILD.md)  
> **Date logged:** 2026-06-07  
> **Status:** All issues resolved.  

---

## Issues Overview

| # | Issue | Files Affected | Status |
|---|-------|---------------|--------|
| 1 | Hero title not visible | `template-02-hero.json` | ✅ Resolved |
| 2 | Long description rendering raw HTML tags as text | `template-04-content-booking.json` | ✅ Resolved |
| 3 | Static/hardcoded content still present — must be fully dynamic | `template-04-content-booking.json` | ✅ Resolved |
| 4 | Booking card has wrong details (hardcoded "Intimate Gathering" line, wrong attributes) | `template-04-content-booking.json` | ✅ Resolved |
| 5 | Sold out → no Waitlist link appears in the booking card | `template-04-content-booking.json`, `functions-snippets.php` | ✅ Resolved |
| 6 | Short description not used anywhere on the page | `template-04-content-booking.json` | ✅ Resolved |
| 7 | Unified MetForm waitlist section looked blank / submit button missing / slug shortcode unreliable | `template-single-event-05-waitlist.json`, `template-events-06-catalog-waitlist.json`, `update_waitlist_forms.mjs` | ✅ Resolved |

---

## Issue Detail

---

### Issue 1 — Hero Title Not Visible

**Symptom:**  
The event title (product name) does not show up inside the hero section at all.

**Suspected Cause:**  
`[se_event_title]` shortcode is rendering but the `<h1>` is being clipped or hidden — possibly due to `opacity: 0` from the animation and the animation not firing (e.g. font not loaded yet, or CSS animation being blocked by Elementor container `overflow: hidden`).  

Also needs to handle **multi-line titles** gracefully — font size should scale down so it never overflows the hero area.

**Fix Scope:**
- `template-02-hero.json` → hero CSS: verify animation fires, add multi-line safe sizing
- Potentially also check `[se_event_title]` is registered and the snippet is active

---

### Issue 2 — Long Description Renders Raw HTML Tags

**Symptom:**  
The product's long description contains HTML formatting (headings, paragraphs, bold, italic). It was rendering as plain text with literal `<p>`, `<strong>` tags visible. The user fixed this by switching to "code" block type in the WC product editor. Now the HTML is valid — but the rendered output has **no design styling** applied to it.

**Fix Scope:**
- `template-04-content-booking.json` → Add a CSS block that styles `.se-desc-block` children: `h2`, `h3`, `p`, `ul`, `li`, `strong`, `em`, `a` with proper typography matching the Stillness aesthetic (Cormorant Garamond for headings, Jost for body, `#0E1B30` / `#3D4F57` colors, italic `em`, etc.)

---

### Issue 3 — Hardcoded Static Content Must Be Removed

**Symptom:**  
Template section 04 contains hardcoded copy: the "Experience Pillars" block (I, II, III with fixed text for Intimate Group Dynamics, Somatic Breathwork, Sanctuary Integration). This text is **not dynamic** — it is the same for every event.

**Rule:**  
All content on the single event page must come from the WooCommerce product fields. The only exceptions are **pure design skeleton elements** (dividers, decorative lines, layout wrappers).

**Fix Scope:**
- `template-04-content-booking.json` → Remove the static "Pillars" section entirely.
- The long description (`[se_event_desc]`) from Issue 2 is what replaces this — once styled properly, it carries all event-specific content.
- Keep the decorative design elements (vertical line, italic pull-quote wrapper) as layout scaffolding only.

---

### Issue 4 — Booking Card Has Wrong Detail Lines

**Symptom:**  
The booking card's detail rows include a hardcoded **"Intimate Gathering — Max 12"** line (with a people icon). This should not be there.

**Required card details (dynamic only):**
1. **Event Dates** → `[se_event_attr name="Event Dates"]`
2. **Duration** → `[se_event_attr name="Duration"]`
3. **Sanctuary** → `[se_event_attr name="Sanctuary"]`

Remove all other hardcoded lines from the card detail block.

**Fix Scope:**
- `template-04-content-booking.json` → Strip the hardcoded "Intimate Gathering" row, keep only the 3 dynamic attribute rows.

---

### Issue 5 — Sold Out State: Waitlist Link Not Appearing in Card

**Symptom:**  
When a product is sold out, the booking card should show a **"Join Waitlist →"** link that scrolls the user down to the `#notify` section. This link is currently not appearing even when the product is out of stock.

**Expected Behaviour:**
- In stock → show Add to Cart button normally, waitlist link hidden.
- Sold out → hide / grey out the Add to Cart, show **"Join Waitlist →"** link (`href="#notify"`) visibly in the card.

**Fix Scope:**
- `template-04-content-booking.json` → Fix the CSS/JS logic that toggles the waitlist link visibility based on the `.se-stock-sold-out` badge being present.
- May need a small JS check inside the HTML widget's `<script>` block.

---

### Issue 6 — Short Description Not Used

**Symptom:**  
The product's **short description** field (`[se_event_short_desc]`) is defined but never surfaced on the page visually.

**Required Design:**  
In the main content area, there is a decorative block — a **vertical accent line** on the left + the corresponding short text beside it (styled as an italic pull-quote or intro sentence). This is the design element where the short description should live.

- If it is one sentence → display as-is.
- If it is two sentences → both fit within the block.

**Fix Scope:**
- `template-04-content-booking.json` → Place `[se_event_short_desc]` inside the existing pull-quote / vertical-line design element, replacing any hardcoded placeholder text.

---

### Issue 7 — Unified MetForm Waitlist Section Rendering Problems

**Symptom:**  
The waitlist section was rendering as a large dark empty area in preview. After the form appeared, the submit button was still not visible. The MetForm slug shortcode was also unreliable on this site.

**Confirmed Cause:**  
- The section used hidden entrance-animation defaults (`opacity: 0`) that did not reliably animate into view inside Elementor preview.
- The MetForm form needed to include its own Submit Button widget.
- `[metform slug="events"]` did not work reliably. The exact generated `form_id` shortcode is required.

**Fix Applied:**
- One unified event waitlist form is now used in both places: catalog page and individual event page.
- The working shortcode is `[metform form_id="6697"]`.
- The individual event waitlist section is treated as the source design section, then synced to the catalog waitlist section.
- Hidden default opacity was removed so the section cannot appear blank if animation fails.
- Defensive CSS covers known MetForm submit button classes.
- Defensive JavaScript injects a `Notify Me` submit button if MetForm renders without one.
- Root guide created: `METFORM_TEMPLATE_SECTION_GUIDE.md`.
- MetForm setup note created: `metform-events-setup.md`.

**Status:**  
Resolved in templates. Remaining live work is only normal QA: import/update both sections, submit a test email from both pages, and confirm the entry appears in MetForm.

---

## Fix Order (Recommended)

```
1. Issue 1  → Hero title visible + multi-line safe
2. Issue 3  → Strip all static hardcoded content
3. Issue 4  → Fix booking card detail rows (3 attributes only)
4. Issue 6  → Wire short description into pull-quote element
5. Issue 2  → Style the dynamic long description HTML
6. Issue 5  → Fix sold-out waitlist link toggle
7. Issue 7  → Finalize unified MetForm waitlist section
```

---

## Files to Edit

| File | Issues Covered |
|------|---------------|
| [`single-product-templates/template-02-hero.json`](./single-product-templates/template-single-event-02-hero.json) | Issue 1 |
| [`single-product-templates/template-04-content-booking.json`](./single-product-templates/template-single-event-04-content-booking.json) | Issues 2, 3, 4, 5, 6 |
| [`snippets/functions-snippets.php`](./snippets/functions-snippets.php) | Issue 5 (if PHP-side fix needed) |
| [`single-product-templates/template-single-event-05-waitlist.json`](./single-product-templates/template-single-event-05-waitlist.json) | Issue 7 |
| [`templates/template-events-06-catalog-waitlist.json`](./templates/template-events-06-catalog-waitlist.json) | Issue 7 |
| [`update_waitlist_forms.mjs`](./update_waitlist_forms.mjs) | Issue 7 |
| [`metform-events-setup.md`](./metform-events-setup.md) | Issue 7 |
