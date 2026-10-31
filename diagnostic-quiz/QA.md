# Diagnostic Quiz — QA Checklist

Run before telling Komal it is done. Blockers are **bold**. Everything else can ship with a known issue if the client accepts it in writing.

## Deploy order

1. Code Snippets → content PHP (`content/quiz-content.php`)
2. Code Snippets → logic PHP (`snippets/diagnostic-quiz.php`)
3. Code Snippets → frontend assets PHP (`snippets/quiz-assets-php-only.php`),
   run everywhere. It prints the CSS in the page head and JavaScript in the
   footer, so it works on the free plan.
5. Import `wordpress/product-prescription.csv` (WooCommerce product CSV
   importer). The `.js` file stays as the human-readable spec
6. Attach audio sessions + workbook to each of the 4 variations. The CSV
   marks the product downloadable but carries no file URLs — until this step
   is done, `stillness_quiz_downloads()` returns an empty list and the result
   page falls back to the account link + confirmation email
7. Build the landing page: paste `wordpress/html-blocks/01-hero.html`,
   `02-promise.html`, then `03-quiz.html` into separate Elementor HTML widgets
8. Build the result page: paste `wordpress/html-blocks/04-result.html` into
   an Elementor HTML widget and set slug `your-prescription`
9. Set WooCommerce checkout to not require an account, or confirm guests get
   the download link in the order email

**CSS must be printed by the frontend-assets PHP snippet, not an Elementor widget.** The newsletter form broke
because its CSS was page-scoped. See `work/hotfix-2026-10-03-website-fixes.md`.

## Local automated run

These run before anything is deployed. They need `node` only.

```sh
cd work/workspace/stillness
npm install --no-package-lock   # jsdom, vitest — node_modules is gitignored
node --test "diagnostic-quiz/test/*.test.js"
```

- `test/scoring.test.js` — 10 tests on the shipped scorer (extracted from the
  `<script id="stillness-quiz-script">` block of the assets bundle)
- `test/checkout-flow.test.js` — 5 tests driving the real snippet in jsdom:
  cart targets the right variation, a failed cart does **not** redirect, the
  result survives to the checkout page, an already-filled field is never
  overwritten, a missing variation id fails loudly

Vitest excludes `diagnostic-quiz/**` (set in `vite.config.ts`) because these
files use `node:test`, not vitest. `npm test` must not pick them up.

Everything below this line needs a live WordPress.

## Copy and content

- [ ] 15 questions render, options A/B/C/D each
- [ ] All 4 result branches readable: append `?type=A`, `B`, `C`, `D` to the
      result page URL
- [ ] Tie-break case resolves: force a 14-question tie so only question 15
      decides, and confirm the winner is the one Q15's weights favour — not the
      alphabetically-first result. Mirrors `test/scoring.test.js` "breaks a tie
      on the final question by its weights"
- [ ] Empty submission does not resolve to a type (guards the `score({})` bug
      found in testing)
- [ ] Komal has read every line of copy. Our nervous-system framing
      (sympathetic / dorsal / ventral) is clinical vocabulary — confirm she is
      comfortable with it publicly

## Scoring

- [ ] Run `node --test "test/*.test.js"` — 15 tests, 0 fail
- [ ] Type distribution is plausible: answer A 15 times → A, all B → B, etc.
- [ ] The inlined `score()` in `snippets/quiz-assets-php-only.php` and the PHP
      `stillness_quiz_score()` agree on a mixed set. They are two
      implementations of one rule and can drift

## Email gate

- [ ] Invalid email shows an inline error, no page jump
- [ ] Blank name rejected
- [ ] Real submission reaches MailerLite and applies the type tag
- [ ] **If MailerLite is down or unauthenticated, the result still shows.** The
      JS falls back to the local score. Test by breaking the API key
      temporarily — a lead-capture failure must never cost the visitor their
      result
- [ ] Name and email are in the MailerLite contact with the right tag

## Checkout and payment

- [ ] Unlock CTA adds to the cart first, then lands on WooCommerce checkout.
      A cart with nothing in it means the variation id is missing
- [ ] The correct variation is selected for each of the 4 types. Verify the
      order line item name matches the result
- [ ] **Result survives the redirect:** right-click the hidden inputs after the
      checkout page loads and confirm `stillness_quiz_result` is populated.
      Empty means `hydrateCheckout()` did not fire
- [ ] `stillness_quiz_result` and `stillness_quiz_answers` land in order meta
      (confirm in the order edit screen — they are invisible in the customer
      view)
- [ ] Payment pending → prescription locked
- [ ] Payment complete → prescription unlocked
- [ ] Thank-you page shows **Open your personalized prescription** after a paid
      quiz order; it must include both `order` and `key` in the URL
- [ ] Customer payment email includes the same secure prescription link
- [ ] **Tamper test:** take a paid order's URL, change the order ID to someone
      else's → must stay locked
- [ ] **Tamper test:** change only the order key → must stay locked
- [ ] **Tamper test:** valid unpaid order + valid key → must stay locked
- [ ] Guest checkout (no account): open the result page **logged out** and
      confirm the download links render. They are key-based, not
      account-based, so a signed-out visitor must reach them
- [ ] `?type=B` on the result page with no order → **admin only.** Logged out
      or as a customer it must not render a full prescription
- [ ] Refund flips the order back to locked

## Result page

- [ ] Email link `?order=123&key=wc_order_abc` opens the right type
- [ ] Unpaid order shows the teaser + CTA, not the full prescription
- [ ] Retake button clears the draft and restarts at question 1
- [ ] Draft survives an accidental refresh (sessionStorage)

## Responsive

- [ ] iPhone SE (375px) — options not clipped, buttons not overflowing
- [ ] iPhone 14 (390px)
- [ ] iPad (768px)
- [ ] Desktop 1440px, quiz column stays readable, not full-bleed text
- [ ] Keyboard only: tab through options, Enter selects, focus ring visible
- [ ] Reduced motion: `prefers-reduced-motion` respected, no animation

## Theme safety

- [ ] Quiz CSS does not restyle anything outside the quiz. Every selector is
      `sq-` prefixed or under `.stillness-quiz`
- [ ] Result page section padding does not fight the template's own CSS
- [ ] Hero fonts load on the landing page (Cormorant Garamond + Jost)
- [ ] Landing page hero animation does not leave content invisible if
      animations fail to fire

## Not in scope, confirm before launch

- [ ] Audio sessions and workbook actually uploaded and attached per variation
- [ ] MailerLite API key configured
- [ ] WooPayments approved for virtual products — **if it is not, the whole
      checkout fails and there is no revenue path.** Check this first
- [ ] Analytics on quiz start / completion / purchase
- [ ] The future $1 paywall is deliberately absent. Order meta is stored and
      waiting, nothing reads it yet
