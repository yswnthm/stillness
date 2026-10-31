# Stillness — Diagnostic Quiz + Prescription

> **Phase:** 6 · Diagnostic Quiz + Prescription
> **Price:** ₹19,000 fixed (confirmed)
> **Started:** 05 Oct 2026
> **Status:** All build artefacts complete in the events-ticket house format · awaiting Komal's copy review · **deploy blocked on WordPress write access only** (PHP lint and automated tests now green locally)
> **Proposal source:** [`work/proposals/interactive-diagnostic-quiz.md`](../../../proposals/interactive-diagnostic-quiz.md)

---

## Scope Lock

Written so neither side has to guess later about what ₹19k covers.

### Included

- Diagnostic landing page
- Quiz interface — 15 single-choice questions
- Scoring logic — frequency count of A/B/C/D, tie broken by Q15
- 4 dynamic result experiences (separate pages, one per type)
- Name + email gate before result reveal
- MailerLite contact creation tagged by result type
- Personalized prescription per type — audio + PDFs + links
- One WooCommerce product, 4 variations (A/B/C/D) at ₹19,000
- Order meta storing result type + raw answers
- Result-based content unlock on payment confirmation
- Responsive + full QA across all four branches

### Not included — quoted separately if requested

Add-ons from the proposal (breath-sync animations ₹1,500 · nervous-system state indicator ₹2,000 · ambient audio ₹1,500 · blended result states ₹2,000 · micro-prescription ₹1,500 · result bookmark ₹1,500 · result-matched email sequences ₹3,500 · practitioner's note ₹1,000 · quiz-as-landing-page SEO ₹2,000).

**No future $1 paywall work is in scope.** Only the order-meta hook that makes it possible later.

---

## Architecture Decisions

| Decision | Choice | Why |
|---|---|---|
| Build approach | Native WordPress — Elementor + JS/PHP + WooCommerce | Matches every prior build on this site. No custom DB, no admin panel, no external quiz platform. |
| Product structure | **One** product, **4** variations | WooCommerce generates `?add-to-cart=…&variation_id=…` natively — zero code. Keeps order reporting in one place and one thank-you email. Four separate products fragments all three. |
| Result pages | **Four** separate pages, not one dynamic page | Each gets its own Elementor layout, OG image, and share URL. Required for the result-bookmark add-on later. |
| Result persistence | Order meta: result type + 15 raw answers | The only foresight needed for the future $1 flow: `/quiz?order=ID&key=WC_order_key` reads the order and reveals the result. ~30 lines now, saves a rebuild later. |
| Email integration | Server-side POST from quiz → MailerLite | Client-side tagging dies when the tab closes. This is the entire delta between ₹11k and ₹14k in the original proposal. |
| Prototype method | Vanilla HTML/JS single-file, then wrap in Elementor | A 4-way runtime branch is slower to review in React (needs state switch per branch) and further from what actually ships. Matches site patterns; avoids a build step for one page. |

### Pricing

₹1,999 per prescription, confirmed by Komal. Same price across all four
variations — the diagnostic already does the segmenting, and a price spread
would invite people to pick a type instead of earning one. Use WooCommerce
coupons for any promotion, not a sale price: a sale on a variable product
displays one struck-through figure across all four types and undercuts it.

**"Links" in the prescription are not downloadable.** Audio and PDFs are native WooCommerce downloads and need no work. A bundle of external links is not a file Woo can serve.

Two options:
- **A** — gated page (order-gated shortcode, ~20 lines)
- **B** — a single generated PDF containing the links (no code, but less clean UX)

Decide before checkout testing. Do not discover this at hour 40.

---

## Blockers & Dependencies

| # | Item | Status | Impact |
|---|---|---|---|
| 1 | **WordPress write access** | **Blocked** | No SSH, no wp-cli, no application password. Same blocker that stopped the 03 Oct hotfix. **Nothing ships without this.** |
| 2 | Prescription copy | Solicate writes | Placeholder copy ships in v1. Komal replaces before launch — no rebuild, copy is not code-bound. |
| 3 | Prescription assets (audio, PDFs) | Komal | 4 types × (audio + PDFs + links). Machine can be built in a week, then wait on assets. **Real schedule risk.** |
| 4 | MailerLite API credentials | Not received | Needed for the tagging endpoint. |
| 5 | WooPayments live for digital goods | Verify | Product 608 (Astrology Report) is `simple, virtual` — precedent exists. Confirm WooPayments is enabled for digital products. |

---

## Task Board

### Phase A — Content & Access
- [ ] Request WP write access (SSH key or application password — **not** the WhatsApp password)
- [ ] Request 15 questions, scoring rules, Q15 tie-break answer
- [ ] Request prescription content commitments from Komal (4 types)
- [ ] Request MailerLite API key
- [ ] Verify WooPayments enabled for virtual products
- [ ] Write 15 questions + 4 result type definitions + scoring rules (placeholder-grade, Komal replaces later)
- [ ] Confirm Komal's asset timeline for audio + PDFs

### Phase B — Prototype
- [x] 15 questions + 4 result types written (placeholder copy, Solicate)
- [x] Scoring logic + tests — weighted matrix in PHP `stillness_quiz_score()` + bundle `score()`, `test/scoring.test.js` (15 pass)
- [x] Single-file HTML prototype — `prototype/diagnostic-quiz.html`
- [x] Forceable branch switch (`?type=A`, `?answers=…`, `?answers=…` tie case)
- [x] Production content file — `content/quiz-content.php`
- [x] Production PHP scored + endpoints — `snippets/diagnostic-quiz.php`
- [x] PHP syntax verified with `php-parser` (no local PHP binary) — 15 + 1 functions parse clean
- [x] Frontend assets — `snippets/quiz-assets-php-only.php` (single PHP snippet: styles + script, deploy entry 3; replaces the old `quiz-frontend.js`/`quiz-frontend.css`)
- [x] Client review via prototype link (`?type=A`–`D`, `?answers=…` tie case)
- [ ] Design sign-off on all four result pages

### Phase C — WordPress Build
- [x] Elementor sections — `wordpress/html-blocks/01…04.html` (paste-ready,
      individual HTML widgets; legacy JSON exports retained as backups)
- [x] Quiz page JS — REST submit, email gate, result render, retake
- [x] MailerLite tagging endpoint — Code Snippets plugin
- [x] Result page shortcode `[stillness_quiz_result]` — reads `?order=&key=`
- [x] Product + 4 variations spec — `wordpress/product-prescription.js`
- [x] WooCommerce-importable CSV — `wordpress/product-prescription.csv` (1 parent + 4 variations,
      proper `Attribute 1 name/value(s)` columns; the `.js` spec's `Attributes` string is not
      importer format and was never going to import)
- [x] Order meta write on checkout — hidden fields emitted on `woocommerce_checkout_before_order_review` (the `order` fieldset never renders)
- [x] Unlock path: add variation to cart, park result in sessionStorage, refill on checkout — `test/checkout-flow.test.js`
- [ ] Deploy 4 snippets + import product into WordPress — **blocked on write access**
- [ ] Resolve the links-delivery decision (account downloads vs gated page)
- [ ] Attach audio + workbook assets per variation (needs Komal's files)
- [ ] OG image per result page

### Phase D — QA
- [x] Checklist written — `QA.md` (deploy order, tamper tests, responsive, theme safety)
- [x] Automated tests green — `node --test "diagnostic-quiz/test/*.test.js"` → 15 pass / 0 fail
- [x] vitest excludes `diagnostic-quiz/**` so `npm test` does not pick up `node:test` files
- [ ] All 4 branches — desktop + mobile
- [ ] Tie-break path (Q15 decides)
- [ ] Email gate blocks result reveal until submitted
- [ ] MailerLite contact created with correct type tag
- [ ] MailerLite outage still yields a result (JS local-score fallback)
- [ ] Variation selection carries through checkout
- [ ] Payment → unlock fires, content actually reachable
- [ ] Tamper tests — swapped order ID, wrong key, unpaid order all stay locked
- [ ] No-content-behind-payment leaks
- [ ] Regression — shop, events booking, existing checkout untouched

### Known defects to fix before launch

Severity reflects launch risk, not effort. Anything **Fixed** is covered by the
test suite and needs a live WordPress pass only.

| # | Defect | Where | Severity |
|---|--------|-------|----------|
| 1 | Scoring has two implementations — the inlined bundle `score()` and PHP `stillness_quiz_score()`. They can drift | both | **Medium** — parity asserted by inspection only, no PHP runtime to execute both |
| 2 | WooPayments support for virtual/downloadable products unverified | hosting | **Medium** — check first, it cannot be patched from code |
| 3 | MailerLite API key / group unset (`STILLNESS_MAILERLITE_KEY`, `STILLNESS_MAILERLITE_GROUP`) — tags silently skipped | hosting | **Medium** — needs Komal's credentials |
| 4 | Currency CAD/INR mismatch in the GA4 event matrix | `../../../Growth-seo/ga4-tracking-configuration.md:22` | **Low** |
| 5 | Currency value on the single price shown across the four variations | `wordpress/product-prescription.js` | **Low** |

#### Fixed in this pass

| # | Defect | Fix |
|---|--------|-----|
| F1 | **Unlock CTA posted to checkout with an empty cart.** Nothing was ever added | AJAX POST to `?wc-ajax=add_to_cart` with `product_id` = variation id; Woo reparents and reads attributes off the variation object |
| F2 | **Hidden checkout fields never rendered.** WooCommerce's templates loop only billing and shipping — the `order` fieldset is defined but never output, so `woocommerce_checkout_fields` fields never reached the DOM | Moved to `woocommerce_checkout_before_order_review` |
| F3 | **Result lost across the redirect to checkout.** Nothing carried the type and answers onto the second page | `stillness_quiz_handoff` sessionStorage, refilled by `hydrateCheckout()` on `load` (runs even when `window.STILLNESS_QUIZ` is absent, which it is on checkout) |
| F4 | **Guests had no way to reach their downloads.** Old path assumed a logged-in account | `stillness_quiz_downloads()` reads `$order->get_downloadable_items()` — key-based URLs that work signed out; server-rendered for the shortcode, shipped in the payload for JS |
| F5 | **`?type=` preview rendered a paid result with no order.** Paywall bypass | Gated on `current_user_can('manage_options')` |
| F6 | **MailerLite HTTP 400 treated as success.** A real validation error was swallowed | Body parsed; a 400 is only accepted when it reads already/exist/duplicate, otherwise `error_log` and return false |
| F7 | **Cart failure destroyed the form.** `showError()` replaced the whole root, so the CTA it had just re-enabled no longer existed | `setFormError()` puts a retryable message next to the button |
| F8 | PHP could not be syntax-checked on this machine | `php-parser` based linter — both files parse clean |
| F9 | No importable product artefact — only a JS spec, and its `Attributes` string does not match the WooCommerce CSV importer format | `wordpress/product-prescription.csv` — 1 parent + 4 variation rows, `result-type` as a local attribute |
| F10 | A paid customer had no secure route back to the personalized result after checkout | `woocommerce_thankyou` + `woocommerce_email_after_order_table` now add a key-based result URL, resolved to `/your-prescription/` by default |

---

## Related

- OS DB: project Stillness, phase 6 · tasks `…e144` (payment provider), `…e2a8` (content from Komal), `…8cde` (build), `…53a5` (payment flow), `…8899` (delivery), `…bf1b` (QA), `…9edc` ($1 hook)
- Precedent: `../events-ticket/` (ticketing + custom email), `../custom-checkout/` (PHP via Code Snippets, payment-risk protocol)
- Prior doc: [`../../../hotfix-2026-10-03-website-fixes.md`](../../../hotfix-2026-10-03-website-fixes.md) — unapplied, same access blocker
