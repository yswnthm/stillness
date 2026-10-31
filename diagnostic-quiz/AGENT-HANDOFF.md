# Stillness Diagnostic Quiz — Agent Handoff Prompt

## Context

You are continuing work on the **Stillness Diagnostic Quiz** — a wellness/nervous-system diagnostic tool built for Stillness.co, deployed on WordPress via Elementor HTML widgets + Code Snippets.

The quiz is fully functional. The current task is **visual refinement** of the six independently deployable HTML section blocks.

---

## Working Directory

```
/Users/yswnth/Documents/node/Projects/Solicate/clients/stillness-co/work/workspace/stillness/diagnostic-quiz/
```

### Key Files

| File | Purpose |
|------|---------|
| `wordpress/html-blocks/01-hero.html` | Hero section — dark ink bg, full-bleed, atmospheric |
| `wordpress/html-blocks/02-promise.html` | 3-card promise/why section |
| `wordpress/html-blocks/03-quiz.html` | Quiz container (renders `[stillness_quiz]` shortcode) |
| `wordpress/html-blocks/04-faq.html` | FAQ accordion |
| `wordpress/html-blocks/05-reflection.html` | Facilitator quote / founder note |
| `wordpress/html-blocks/06-result.html` | Result page (renders `[stillness_quiz_result]`) |
| `content/quiz-content.php` | Quiz copy + question bank + per-option weight matrix (0–10 across the 4 results) |
| `snippets/diagnostic-quiz.php` | Scoring, shortcodes and REST endpoints (PHP `stillness_quiz_score()` is the server authority) |
| `snippets/quiz-assets-php-only.php` | **WordPress production file** — minified CSS + browser JS injected via `wp_head`/`wp_footer`. The inlined `score()` mirrors `stillness_quiz_score()`. |
| `stillness-diagnostic-quiz.html` | Single-page preview of all sections combined |
| `index.html` | Always identical to `stillness-diagnostic-quiz.html` — always `cp` after any change |
| `test/*.test.js` | 15 unit tests — run with `node --test diagnostic-quiz/test/*.test.js` |
| `HANDOFF-weighted-scoring.md` | **APPLIED — superseded spec.** Documents the per-option weight matrix that is now live. Kept for history; do not edit the shipped code to match it |

---

## Brand Tokens

```css
--sq-ink:      #0E1B30   /* dark navy — primary text */
--sq-midnight: #1D3152   /* deeper navy */
--sq-seafoam:  #688F9D   /* muted blue-grey — kickers, accents */
--sq-wave:     #A4B2BA   /* light blue-grey */
--sq-breeze:   #D9E8EB   /* very light teal-blue */
--sq-teal:     #2C7A7B   /* primary interactive colour — hover, selected, CTA */
--sq-cream:    #F7F0EC   /* NEVER use as section background (client rejected) */
--sq-warm:     #F2E8DF   /* NEVER use as section background (client rejected) */
--sq-white:    #FFFFFF   /* all section backgrounds */

Fonts:
  Serif:   'Cormorant Garamond' — headings, elegant display
  Sans:    'Lato'               — body copy, quiz options
  Display: 'Jost'               — kickers, labels, buttons
```

---

## Hard Constraints — Do Not Break These

1. **Never use `#F7F0EC` (cream) or `#F2E8DF` (warm)** as any section background. Client explicitly rejected these.
2. **All section backgrounds = `#FFFFFF` (white)** — except the hero (`#0E1B30` dark ink) and the dark ink card inside `.dq-reflection__card`.
3. **Scoring exists in two places and they must agree** — PHP `stillness_quiz_score()` in `snippets/diagnostic-quiz.php` and the inlined `score()` in `snippets/quiz-assets-php-only.php`. The former scoring lock is lifted; change one, change the other in the same pass.
4. **No `<header>` or `<footer>` inside any HTML block** — WordPress theme handles those.
5. **All 15 unit tests must stay green** after every change. Run: `node --test diagnostic-quiz/test/*.test.js`
6. **`quiz-assets-php-only.php` is now the only source for the quiz CSS and JS** — the old `quiz-frontend.css` / `quiz-frontend.js` references are gone. Edit the bundle directly (re-minify with `npx terser` if you expand the script).
7. **After every change to `stillness-diagnostic-quiz.html`** — always run: `cp diagnostic-quiz/stillness-diagnostic-quiz.html diagnostic-quiz/index.html`
8. **WordPress theme interference** — all `<button>` elements inside the blocks need a hard CSS reset (`appearance: none`, `border-radius: 0`, `box-shadow: none` explicitly on both rest AND hover states) because WordPress themes apply global `button` and `button:hover` styles that inject shapes, colours and sizes unexpectedly.

---

## Known Issues Already Fixed (Do Not Revert)

### Quiz options (`03-quiz.html` + `quiz-assets-php-only.php`)
- `.sq-option:hover` — teal border + teal-tinted bg + explicit `color: var(--sq-ink)` to stop theme from making text white
- `.sq-option.is-selected` — explicit `color: var(--sq-ink)` locked
- `.sq-option.is-selected:hover` — explicit `color: var(--sq-ink)` + solid teal key badge (`.sq-option.is-selected:hover .sq-option-key` keeps `background: var(--sq-teal); color: #FFFFFF`)
- `.sq-btn:hover:not(:disabled)` — teal border + teal text
- `.sq-btn-next:hover:not(:disabled)` — solid teal bg + white text
- `.sq-cta:hover:not(:disabled)` — solid teal bg + white text

### FAQ accordion (`04-faq.html`)
- Trigger `<button>` has full appearance reset: `appearance: none`, `border-radius: 0`, `box-shadow: none` on both rest and `:hover/:focus` — prevents WordPress theme from creating cylinder/pill shapes
- Card-level hover (`.dq-faq-item:hover`) highlights the full card with subtle teal tint
- Icon transitions to teal on card hover

---

## Deployment Architecture

Each HTML block is pasted **as-is** into an **Elementor HTML widget** on the WordPress page. Each block is completely self-contained with its own `<style>` block — no shared stylesheet between blocks.

The quiz CSS and JS live in `quiz-assets-php-only.php`, which is pasted as a **PHP snippet** in WP Code Snippets (free plan) set to "Run Everywhere". This injects CSS via `wp_head` and JS via `wp_footer`.

---

## Editing the PHP Assets Bundle

`quiz-assets-php-only.php` is the single, hand-maintained source for the quiz's
CSS (in the `<style id="stillness-quiz-styles">` block) and browser JS (in the
`<script id="stillness-quiz-script">` block). There is no separate `.css`/`.js`
file to regenerate from — edit the bundle directly.

If you expand the CSS or the script, re-minify before pasting back:

```bash
# expand the minified block, edit, then re-minify:
npx terser /tmp/stillness-quiz.js -c -m -o /tmp/stillness-quiz.min.js
# CSS: re-minify with your editor's minifier, or leave readable if size allows.
```

Keep the two `<id>` attributes intact — `test/scoring.test.js` and
`test/checkout-flow.test.js` extract the script by `id="stillness-quiz-script"`.

---

## Visual Design Principles

- **Stillness aesthetic**: calm, minimal, luxury wellness — not clinical, not loud
- **Typography hierarchy**: Cormorant Garamond (elegant serif) for headings → Jost (clean display) for labels/kickers → Lato (legible) for body
- **Interaction language**: subtle lift (`translateY(-2px)`), soft teal glow shadows, smooth transitions (0.25–0.4s cubic-bezier)
- **Hover = teal** (`#2C7A7B`) — all interactive elements use teal on hover consistently
- **Spacing**: generous — `clamp()` values for fluid responsive padding
- **Cards**: white bg, `border-radius: 14px`, `border: 1px solid rgba(14,27,48,0.12)`, soft shadow

---

## Your Task

Refine the visual quality of the HTML section blocks. Possible areas:

- Spacing and rhythm between sections
- Typography sizing or weight refinements
- Card hover states (consistency across all blocks)
- Mobile responsiveness (`@media (max-width: 768px)` and `480px`)
- Animation polish (entrance animations, transition timing)
- Accessibility (focus states, contrast ratios)
- Any element that looks off compared to the Stillness brand aesthetic

**After every change:**
1. Open `diagnostic-quiz/index.html` in browser to verify visually
2. Run `node --test diagnostic-quiz/test/*.test.js` — all 15 must pass
3. Sync: `cp diagnostic-quiz/stillness-diagnostic-quiz.html diagnostic-quiz/index.html`
4. If quiz CSS/JS changed: edit `quiz-assets-php-only.php` directly (see "Editing the PHP Assets Bundle")
