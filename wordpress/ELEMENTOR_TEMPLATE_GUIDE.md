# Elementor JSON Template Process — Key Insights & Procedure

> **Project:** Stillness Co. — WordPress/Elementor Migration  
> **Purpose:** Document the exact workflow and critical learnings for creating Elementor JSON templates that match React component designs with 100% fidelity.

---

## Design Tokens

These are the source-of-truth values extracted from `index.html` (Tailwind config):

| Token | Hex | Usage |
|-------|-----|-------|
| `stone` | `#0E1B30` | Dark primary text, backgrounds |
| `midnight` | `#1D3152` | Section backgrounds, hover states |
| `seafoam` | `#688F9D` | Accent color, buttons, labels, icons |
| `breeze` | `#D9E8EB` | Light backgrounds (`rgba(217,232,235,0.3)`) |
| `wave` | `#A4B2BA` | Secondary text on dark backgrounds |
| `sand` | `#C4BBB4` | Muted tones, `rgba(196,187,180,...)` |
| `cream` | `#FFFFFF` / `#F7F0EC` | White text/backgrounds |

**Fonts:**

- **Serif:** `Cormorant Garamond` — headings, quotes, stat numbers
- **Sans:** `Lato` — body, labels, buttons, UI text

---

## JSON Template Structure

Every Elementor JSON template has this top-level shape:

```json
{
    "content": [ /* Array of top-level container elements */ ],
    "page_settings": [],
    "version": "0.4",
    "title": "Section Title",
    "type": "section"
}
```

### Element Types

- `"elType": "container"` — Layout wrapper (replaces legacy Section/Column)
- `"elType": "widget"` — Content widget (heading, text-editor, html, image)

### Key Container Settings

```json
{
    "content_width": "boxed",     // or "full"
    "boxed_width": { "unit": "px", "size": 1140 },
    "flex_direction": "column",   // or "row"
    "flex_align_items": "center",
    "flex_justify_content": "space-between",
    "flex_gap": { "unit": "px", "size": 48 },
    "padding": { "unit": "px", "top": "120", "bottom": "120", "right": "40", "left": "40", "isLinked": false }
}
```

---

## Critical Insight: Multi-Column Layouts

> [!CAUTION]
> **Never use Elementor flex containers with `width: %` for side-by-side layouts in JSON templates.** Elementor's editor ignores these percentage widths when the template is imported via JSON. Columns will always stack vertically.

### ❌ What Does NOT Work

```json
// Setting width on child containers — IGNORED by Elementor on JSON import
{
    "id": "col_left",
    "elType": "container",
    "settings": {
        "width": { "unit": "%", "size": 50 }  // Editor overwrites this
    }
}
```

### ✅ What DOES Work — Single HTML Widget with CSS Grid

**Always put the entire two-column layout inside one `html` widget using CSS Grid:**

```html
<div class='my-grid'>
    <div class='col-left'><!-- content --></div>
    <div class='col-right'><!-- content --></div>
</div>
<style>
.my-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;  /* Guaranteed 50/50 split */
    gap: 64px;
    align-items: center;
}
@media (max-width: 768px) {
    .my-grid { grid-template-columns: 1fr; gap: 48px; }
}
</style>
```

**Why CSS Grid works:** It is handled by the browser directly, bypassing Elementor's JS-based container width system entirely.

**Sections using this pattern:**

- `template-intro-v1.json` — `grid-template-columns: 1fr 1fr`
- `template-corporate-v1.json` — `grid-template-columns: 1fr 1fr`
- `template-floating-teaser-v1.json` — `grid-template-columns: 1fr 1fr`

---

## CSS Selector Reliability in Elementor

> [!WARNING]
> Elementor Heading widgets with icons do not render a predictable DOM structure. Avoid targeting `svg` or `.elementor-heading-icon` for hover animations.

### ❌ Unreliable: CSS on Elementor Heading widget icons

```css
/* Breaks because Elementor renders icons inconsistently */
.my-class svg { transform: translateX(4px); }
.my-class a:hover svg { transform: translateX(4px); }
```

### ✅ Reliable: Custom HTML with `<i>` tags and Font Awesome

Use a custom `html` widget with the full link structure:

```html
<a href='/link' class='my-link'>
    Link Text <i class='fas fa-arrow-right'></i>
</a>
<style>
.my-link { ... transition: color 0.3s ease; }
.my-link i { transition: transform 0.3s ease; }
.my-link:hover i { transform: translateX(4px); }
</style>
```

Font Awesome icons (`fa-*`) are always rendered as `<i>` tags and have predictable CSS targeting.

---

## Widget-Specific Patterns

### Headings (`widgetType: "heading"`)

```json
{
    "widgetType": "heading",
    "settings": {
        "title": "My Heading",
        "align": "center",
        "title_color": "#688F9D",
        "typography_typography": "custom",
        "typography_font_family": "Cormorant Garamond",
        "typography_font_size": { "unit": "px", "size": 48 },
        "typography_font_weight": "700",
        "typography_text_transform": "uppercase",
        "typography_letter_spacing": { "unit": "px", "size": 3 },
        "typography_line_height": { "unit": "em", "size": 1.2 }
    }
}
```

### Text Editor (`widgetType: "text-editor"`)

```json
{
    "widgetType": "text-editor",
    "settings": {
        "editor": "<p style=\"font-family: 'Lato', sans-serif; font-weight: 300; font-size: 18px; line-height: 1.8; color: rgba(14, 27, 48, 0.8);\">Paragraph text.</p>"
    }
}
```

### Custom HTML (`widgetType: "html"`)

- **Use for:** custom animations, complex layouts, hover effects, glassmorphism cards, multi-column grids
- **Always include `<style>` tags inside the HTML block** — scoped to the widget's classes
- **Use unique class names** to avoid CSS conflicts across sections

---

## Glassmorphism Pattern

Used in: `Hero` button, `FloatingTeaser` card

```css
.glass-element {
    background: rgba(247, 240, 236, 0.1);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(247, 240, 236, 0.3);
    border-radius: 99px; /* or 24px for cards */
}
.glass-element:hover {
    background: #F7F0EC;
    color: #0E1B30;
}
```

---

## Section-by-Section Color Reference

| Section | Background | Primary Accent | Text |
|---------|-----------|----------------|------|
| Hero | `#0E1B30` → `#1D3152` gradient | `rgba(247,240,236,0.1)` | `#F7F0EC` |
| Intro | `#FFFFFF` | `#688F9D` | `#1D3152` |
| Heal & Restore | `#FFFFFF` | `#688F9D` (icons) | `#0E1B30` |
| Corporate Wellness | `rgba(217,232,235,0.3)` | `#688F9D` | `#0E1B30` |
| Shop Preview | `#FFFFFF` | `#688F9D` (price, hover) | `#0E1B30` |
| Stories/Journal | `#FFFFFF` | `#688F9D` (category, hover) | `#0E1B30` |
| Floating Teaser | `#1D3152` | `#688F9D` (badge, blob) | `#F7F0EC` |
| Testimonials | `#688F9D` | `#FFFFFF` | `#FFFFFF` |
| Newsletter | `rgba(104,143,157,0.05)` | `#688F9D` (button) | `#0E1B30` |
| Footer | `#0E1B30` | `#688F9D` (headings) | `#F7F0EC` |

---

## Template Files

All templates located in: `wordpress/templates-v1/`

| File | React Component | Notes |
|------|-----------------|-------|
| `template-hero-v1.json` | `Hero.tsx` | Full-width, gradient bg, glassmorphism button |
| `template-intro-v1.json` | `Intro.tsx` | CSS Grid layout, rounded image mask |
| `template-heal-v1.json` | `Heal.tsx` | 4-column CSS Grid cards |
| `template-corporate-v1.json` | `CorporateWellness.tsx` | CSS Grid layout, stats block |
| `template-floating-teaser-v1.json` | `FloatingTeaser.tsx` | CSS Grid layout, glassmorphism form |
| `template-shop-v1.json` | `ShopPreview.tsx` | 3-col product grid, custom HTML links |
| `template-stories-v1.json` | `Stories.tsx` | 3-col article grid |
| `template-testimonials-v1.json` | `Testimonials.tsx` | Seafoam bg, white text |
| `template-newsletter-v1.json` | `Newsletter.tsx` | Light seafoam bg, glassmorphism button |
| `template-footer-v1.json` | `Footer.tsx` | Dark bg, seafoam headings, multi-column links |

---

## Import Procedure

1. Open **WordPress Admin → Pages → Edit with Elementor**
2. Click the **folder icon** (Import Template) in the Elementor panel
3. Navigate to `wordpress/templates-v1/` and select the JSON file
4. Click **Insert** to place the section
5. Save/Update the page
