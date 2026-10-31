# Stillness Men's Series 2027 — Elementor HTML Snippets Guide

This directory contains the approved modular sections for the Men's Series 2027 Landing Page, split into self-contained HTML blocks ready to be pasted directly into **Elementor HTML widgets** on WordPress.

---

## 📁 Snippets Directory Structure

| File | Section Name | Description & Layout Width |
|---|---|---|
| [`01-nav.html`](./01-nav.html) | Fixed Navigation | Full-bleed fixed translucent white header with logo, smooth anchor links (`#evening`, `#dates`, `#pricing`, `#faq`), `Reserve a seat` CTA, and mobile drawer. |
| [`02-hero.html`](./02-hero.html) | Hero Section | Pure white ground, 1200px wrap, Cormorant Garamond serif H1 with seafoam italic accent, dual CTAs, 3 key metrics (`12`, `40`, `$40`), and session visual placeholder. |
| [`03-outcomes.html`](./03-outcomes.html) | Outcomes Band | High-contrast deep stone `#0E1B30` ground with 3 benefit pillars (*A quieter head*, *Tools that last*, *Men who get it*). Full 1200px grid. |
| [`04-for-you-if.html`](./04-for-you-if.html) | This Is For You If | Pure white ground with full-width header and 3 luxury editorial cards (`01`, `02`, `03`) across 1200px width. |
| [`05-the-evening.html`](./05-the-evening.html) | The Evening | Event specs box (When, Where, Group size) and 4-step sequence timeline with pill duration badges across 1200px width. |
| [`06-dates.html`](./06-dates.html) | Groups & 2027 Dates | 3 cohort group cards + 12-month calendar cards grid and flexibility note across 1200px width. |
| [`07-pricing.html`](./07-pricing.html) | Pricing & Tiers | **3 Approved Tiers**: Drop-In ($55), 6-Month Package ($270 · $45 each), and Founding Member 12-Months ($480 · $40 each). Full 1200px grid. |
| [`08-gift.html`](./08-gift.html) | Gift of Stillness | Split feature card with holiday gift voucher copy, dual gifting CTAs, and framed voucher artifact placeholder across 1200px width. |
| [`09-guides.html`](./09-guides.html) | Your Guides | 2 facilitator profile cards for Sunny (Men's Mental Health) and Navin (Sound & Breathwork) with framed portraits across 1200px width. |
| [`10-proof.html`](./10-proof.html) | Proof / Feedback | 3 attendee quote cards from Session 01 (March 27, 2026) with serif pull-quotes across 1200px width. |
| [`11-faq.html`](./11-faq.html) | FAQ Accordion | 6 interactive disclosure accordions expanded to full **1200px width** (previously pinched to 1000px). |
| [`12-final-cta.html`](./12-final-cta.html) | Final Urgency CTA | Deep stone `#0E1B30` banner expanded to full **1200px width** with series start urgency (January 29, 2027) and WhatsApp link. |
| [`13-footer.html`](./13-footer.html) | Site Footer | Full-bleed minimal Stillness branding, email `info@wearestillness.com`, and copyright info on dark stone background. |

---

## 🛠️ How to Deploy in WordPress / Elementor

### Step 1: Elementor Canvas Layout
In the bottom-left corner of the Elementor editor, click the **Settings (⚙️ Gear Icon)**:
- Under **Page Settings → Page Layout**, select **`Elementor Canvas`**.

### Step 2: Container Width & Padding (Important)
When you add an Elementor Container or Section:
1. Set **Content Width: Full Width** (instead of Boxed).
2. Set **Padding: 0** on all sides.

### Step 3: Built-In Wrapper Resets & Breakout Safeguard
Even if a container defaults to Boxed (1140px) or has theme padding, every snippet now includes multi-level CSS overrides that aggressively neutralize Elementor's inner constraints:
```css
/* Resets Elementor container, inner container, and widget wrappers */
.elementor-section:has(...), .e-con:has(...), .e-con-boxed:has(...) {
  max-width: 100% !important;
  width: 100% !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
}
.e-con:has(...) > .e-con-inner,
.elementor-widget:has(...) > .elementor-widget-container {
  max-width: 100% !important;
  width: 100% !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
}
```
All sections now utilize the full **1200px standard width** with uniform 24px side padding, matching the preview page (`index.html`) exactly.
