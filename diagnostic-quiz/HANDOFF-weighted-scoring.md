# Stillness Diagnostic Quiz — Handoff: Weighted Scoring Model

> ## ⚠️ SUPERSEDED — APPLIED 2026-10-13
> This spec has been **implemented**. The weighted per-option scoring model, the
> multiple-choice support, and the `$show_weights` preview flag now ship in
> `content/quiz-content.php`, `snippets/diagnostic-quiz.php` and
> `snippets/quiz-assets-php-only.php`. The old `content/scoring.js`,
> `snippets/quiz-frontend.js` and `snippets/quiz-frontend.css` are deleted.
> **Do not treat this document as the current source of truth** — read the shipped
> files and `AGENT-HANDOFF.md`. Kept for history only; do not edit the shipped
> code to match this text.

> **READ ME FIRST — this document is self-contained.**
> You are being handed a single prompt with no access to the repository. Every file you need to
> change is pasted in full in **§12 Source code** at the bottom, along with the current test suite,
> the WordPress deployment model, and the exact regeneration scripts for the minified production
> bundle. Work from this document alone.
>
> **If you need anything that is not here** — another file, a screenshot, a copy decision, the live
> site URL, a WooCommerce product export — **ask for it at the very start**, before you write any
> code, and it will be provided. Do not guess at code you cannot see.
>
> **Project:** Stillness · `6 · Diagnostic Quiz + Prescription`
> **Module:** `diagnostic-quiz/` (Stillness WordPress site)
> **Status:** Spec — nothing built yet. **This supersedes the frequency-count scoring in the current build.**
> **Scope of change:** the *scoring model only*. Everything downstream (email gate, MailerLite tagging,
> WooCommerce variation, order meta, download unlock, result pages) stays exactly as it is.

---

## 0. Your mission (read this first)

Replace the quiz's scoring from **letter-frequency** ("count how many A / B / C / D answers; ties broken
by the answer to Q15") with a **weighted matrix**:

- Every question has 4 options.
- Every **option carries a weight for each of the 4 result screens** (integer 0–10).
- Selecting an option **adds its weights to all four running totals** `S1…S4`.
- The result with the **highest total** wins.

The client's own words, verbatim:

```
Option O1  →  R1: 2/10   R2: 5/10   R3: 7/10   R4: 9/10

If O1 is selected:
   S1 += 2
   S2 += 5
   S3 += 7
   S4 += 9
```

So an option no longer *is* a result. It **leans toward** results, possibly several at once. That is the
whole point of the change.

This must be implemented **identically in four places** (see §5.0 — this is the #1 thing that goes wrong),
covered by tests, and re-mirrored into the minified production bundle.

> ### ⚠️ One rule is deliberately overridden
> The existing `AGENT-HANDOFF.md` says *"Never touch `content/scoring.js` or `snippets/diagnostic-quiz.php`
> — quiz scoring logic is locked."* **That lock is lifted by this handoff.** Changing the scoring logic is
> the entire task. All *other* constraints in `AGENT-HANDOFF.md` remain in force — see §8.

---

## 1. Context — what this quiz is

A **15-question nervous-system diagnostic** for Stillness (wellness studio, Bowen Island BC). The visitor
answers 15 single-choice questions, passes a name + email gate, sees one of **four result screens**, and is
offered a paid personalised prescription (₹1,999, four WooCommerce variations A–D).

The four result types (already defined — **do not rename or re-key**):

| Result key | Name | Tagline | Accent |
|---|---|---|---|
| `A` | The Lit Engine | Sympathetic Overdrive | `#C4713D` |
| `B` | The Quiet Below | Dorsal Shutdown | `#4A6B8A` |
| `C` | The Open Field | Ventral Rest | `#2C7A7B` |
| `D` | The Pendulum | Mixed Regulation | `#7A5C8A` |

The client refers to these as `r1 r2 r3 r4`. Treat **R1 = A, R2 = B, R3 = C, R4 = D** throughout, and say so
explicitly anywhere it matters. **Keep the result keys as `A/B/C/D`** — they are already baked into order
meta (`_stillness_quiz_result`), MailerLite tags (`quiz-type-a`…`quiz-type-d`), the `?type=` preview, and the
four Woo variations. Renaming them is out of scope and would break live data.

### 1.1 How it ships (architecture you must not disturb)

Native WordPress, **no build step in production**. Three deploy surfaces plus Elementor blocks:

| # | Artefact | File | Role |
|---|---|---|---|
| 1 | Content PHP | `content/quiz-content.php` | **Single source of truth** — every question, option, result, and page copy. |
| 2 | Logic PHP | `snippets/diagnostic-quiz.php` | Scoring (`stillness_quiz_score()`), REST endpoint, `[stillness_quiz]` + `[stillness_quiz_result]` shortcodes, order meta, download unlock. |
| 3 | Assets PHP | `snippets/quiz-assets-php-only.php` | Production bundle: minified CSS in `wp_head` + minified JS in `wp_footer`. **Contains its own inlined minified `score()`.** |
| — | Elementor blocks | `wordpress/html-blocks/01…06.html` | Paste-as-is HTML widgets. `03-quiz.html` holds the quiz root, `06-result.html` the result page. |

Readable sources `snippets/quiz-frontend.css` and `snippets/quiz-frontend.js` are **references**; the assets
PHP file is generated from them and states: *"This replaces the separate quiz-frontend.css and
quiz-frontend.js entries; do not activate those too."* So **regenerate the bundle — never hand-edit
minified JS.**

### 1.2 Local test harness

```sh
node --test diagnostic-quiz/test/*.test.js
```

Currently **20 tests pass**: `test/scoring.test.js` (15) + `test/checkout-flow.test.js` (5). Vitest excludes
`diagnostic-quiz/**` (these use `node:test`). There is **no local PHP runtime** — PHP has been syntax-checked
with a parser, not executed.

---

## 2. Current scoring (the thing being replaced)

**Rule today:** option letter **is** the result. Answer `A` on a question → `A` gets +1. At the end the
letter with the highest count wins; a tie is broken by the answer to **Q15**. An all-zero/partial submission
returns `null`.

Consequences that change under the new model:

- An option no longer maps to exactly one result — **option key and result key become decoupled.**
- The invariant *"Option letters align with result types… this alignment IS the scoring"* at the top of
  `content/quiz-content.php` **is now false and must be rewritten.**
- Counting becomes summing; a single question can push *every* result upward.

The full current implementations of `score()` (JS ×2) and `stillness_quiz_score()` (PHP) are in §12.3, §12.4,
§12.5, §12.7.

---

## 3. The new scoring model — full spec

### 3.1 Definitions

- `QUESTIONS`: 15 items. Each has exactly 4 options.
- Option keys (UI labels only): `A | B | C | D` (the round key badge in the quiz UI).
- Result keys: `A | B | C | D` ( == `R1..R4`).
- `weight(option, resultKey)` ∈ **integer 0–10** inclusive.
- Running totals `S = { A: 0, B: 0, C: 0, D: 0 }`.

### 3.2 Algorithm

```
score(answers):
  1. if not isComplete(answers) → return null
       (isComplete: all 15 indices present, each value ∈ {A,B,C,D})
  2. S = {A:0, B:0, C:0, D:0}
  3. for i in 0..14:
        optionKey = answers[i]                    # A|B|C|D — the option chosen at question i
        w = QUESTIONS[i].options[optionKey].w     # {A,B,C,D} → 0..10
        for rk in {A,B,C,D}:  S[rk] += w[rk]
  4. max = max(S.values)
     leaders = [rk for rk in {A,B,C,D} if S[rk] == max]
  5. if len(leaders) == 1 → return leaders[0]
  6. TIE-BREAK (see §3.3) → return a result key
```

`max` achievable = `15 × 10 = 150`. The only way to get a four-way tie at 0 is every selected option having
weight 0 on all results — guard that like the current code does, so an incomplete submission can never
resolve to a result. All-zero weights are a content error, not a valid outcome.

### 3.3 Tie-break (recommended default — confirm before coding)

Preserve the intent of the old rule ("a self-reported intention should outrank a raw frequency tie"):

```
6. tq   = QUESTIONS[14]                      # the Q15 "what would you most like to feel" option set
   w15  = tq.options[answers[14]].w          # the weights of the option the visitor picked on Q15
   pick the leader with the greatest w15[leader]
   if still tied → return the first leader in declaration order (A, B, C, D)
```

This is a **decision point** — see §10, D1. If the client prefers something else (e.g. fixed priority A→D),
only step 6 changes; everything else holds.

### 3.4 Worked examples (use these as test fixtures)

**Example 1 — clear winner.** Suppose every question's chosen option has `w = {A:1, B:0, C:0, D:0}` except
Q1's option is `{A:2, B:5, C:7, D:9}`. Then `S = {A:16, B:5, C:7, D:9}` → result **A**.

**Example 2 — one option lifts everything.** One question selected with `{A:2, B:5, C:7, D:9}`, all others
`{A:0,B:0,C:0,D:0}` → `S = {A:2, B:5, C:7, D:9}` → result **D**.

**Example 3 — exact tie, resolved by Q15.** All questions neutral `{A:0,B:0,C:0,D:0}` except two questions
whose chosen options produce `S = {A:9, B:9, C:9, D:9}`; Q15's chosen option is `{A:1,B:1,C:1,D:10}` → all
four are leaders at 9, Q15 weight makes **D** → result **D**.

**Example 4 — incomplete submission.** `answers` missing any index or containing `'Z'` → `score()` returns
`null`. The quiz must never render a result screen from `null`.

### 3.5 Display figures (result page)

Keep the existing `breakdown()` split-into-percentages behaviour, re-based on the summed totals:

```
percent(rk) = round( S[rk] / (S.A + S.B + S.C + S.D) × 100 )     # guard divide-by-zero → 0
```

`ranked()` stays: sort results by percentage descending (used only if the blended-result add-on is ever
bought).

---

## 4. Data model — exact shapes

### 4.1 Content PHP — `content/quiz-content.php`

Change each option from a **string** to an **array** carrying its text and its weight vector. Keep option
keys `A/B/C/D` as UI labels; the weight vector is keyed by **result** `A/B/C/D`.

```php
'questions' => array(
    array(
        'q' => 'How would you describe your energy on waking?',
        'options' => array(
            'A' => array(
                'text' => 'Already running — mind racing before my feet touch the floor',
                'w'    => array('A' => 9, 'B' => 1, 'C' => 2, 'D' => 5),  // leads A
            ),
            'B' => array(
                'text' => 'Flat. Functional, but nothing has weight',
                'w'    => array('A' => 1, 'B' => 9, 'C' => 3, 'D' => 5),
            ),
            'C' => array(
                'text' => 'Clear. Present and available',
                'w'    => array('A' => 1, 'B' => 3, 'C' => 9, 'D' => 3),
            ),
            'D' => array(
                'text' => 'It depends on the night I had',
                'w'    => array('A' => 4, 'B' => 4, 'C' => 4, 'D' => 9),
            ),
        ),
    ),
    // … 15 total
),
```

Rules the post-build guard must enforce:

- Exactly **15** questions.
- Every question has exactly keys `A, B, C, D`.
- Every option has `text` (non-empty string) and `w` with exactly keys `A, B, C, D`.
- Every weight is an **integer 0 ≤ w ≤ 10**.
- Weights are **not** required to sum to 10 (a question may be sharper or flatter).

### 4.2 PHP logic — `snippets/diagnostic-quiz.php`

`stillness_quiz_score($answers)` reads weights out of the content and sums, per §3.2. Keep the signature
(`$answers` → `string|null`). `stillness_quiz_is_complete()` is unchanged in behaviour. `stillness_quiz_breakdown()`
re-bases on the sums (or returns the raw sums — decide and say which; the result page currently does not
render it).

### 4.3 JS reference — `content/scoring.js`

Rewrite `score()`, `breakdown()`, `ranked()` to the weighted model. `isComplete()` unchanged. Keep it pure,
DOM-free, no network — it is the executable spec the tests and the PHP port follow.

### 4.4 Frontend JS — `snippets/quiz-frontend.js` **and** the inlined JS in `quiz-assets-php-only.php`

Both contain `score()` used as the offline fallback. Update **both**; the assets-PHP copy is the one that
actually runs in production. Also update the option renderer: it currently does `esc(q[i].o[k])` reading a
string — it must now read the option text object (see the renderer in §12.4, line ~190).

> **Payload note:** `window.STILLNESS_QUIZ` is printed by the `[stillness_quiz]` shortcode in
> `snippets/diagnostic-quiz.php` (§12.5, around line 200). Whatever JSON shape you give the questions in PHP,
> the renderer in JS must match it 1:1. Keep the payload minimal — do not leak weights into the DOM if you
> don't have to (they are not secret, but smaller payload = less drift surface).

---

## 5. What to change — checklist

### 5.0 ⚠️ The four implementations that must agree

The single highest-risk item. The scoring rule lives in **four** places and they drift silently. Update all
four in one pass, then make the test suite prove they agree:

| # | File | Symbol | Role |
|---|---|---|---|
| 1 | `content/scoring.js` | `score()` | Executable spec + JS fallback source |
| 2 | `snippets/diagnostic-quiz.php` | `stillness_quiz_score()` | **Server truth** |
| 3 | `snippets/quiz-frontend.js` | `score()` | Readable JS source |
| 4 | `snippets/quiz-assets-php-only.php` | inlined `score()` | **Actually runs in production** |

Regenerate #4 from #3 (do **not** hand-edit minified JS). Keep #1 and #2 line-for-line equivalent and
comment both with *"change one, change the other."*

### 5.1 Checklist

- [ ] `content/quiz-content.php` — options become `{text, w}`; rewrite the INVARIANTS header comment;
      extend the post-build guard to check weights exist, are keyed A–D, are integers 0–10.
- [ ] `content/scoring.js` — weighted `score()`, re-based `breakdown()`/`ranked()`.
- [ ] `snippets/diagnostic-quiz.php` — weighted `stillness_quiz_score()`; confirm the REST endpoint and
      shortcodes need no other change (they pass `$answers` through).
- [ ] `snippets/quiz-frontend.js` — weighted `score()`; option render reads `.text`.
- [ ] `snippets/quiz-assets-php-only.php` — regenerate minified JS from the updated `quiz-frontend.js`
      (CSS is unaffected, but regenerate if you touched CSS).
- [ ] `test/scoring.test.js` — replace frequency assertions with weighted fixtures (§3.4); keep a
      completeness/guard block.
- [ ] `test/checkout-flow.test.js` — update any fixture it depends on so it still passes.
- [ ] Re-run the full suite; all green.
- [ ] Refresh `QA.md` scoring section to describe the weighted rule.

### 5.2 Do **not** touch

- Result type definitions, names, accents, `variation_id`s.
- `[stillness_quiz]` / `[stillness_quiz_result]` shortcode names, REST route, nonce names.
- Order meta keys `_stillness_quiz_result` / `_stillness_quiz_answers`.
- MailerLite tagging (tags stay the result letter `A–D`).
- The email gate, checkout handoff (`stillness_quiz_handoff` sessionStorage), download unlock.
- `wordpress/html-blocks/*` unless the payload field rename forces a JS change (it shouldn't).
- Brand tokens (§8).

---

## 6. Content plan — re-authoring the 15 questions

The new model only becomes *understandable* if the questions are authored **with the matrix visible**. The
client's instruction: show it plainly, e.g.

```
Question 1 — How would you describe your energy on waking?
  Option 1  "Already running — mind racing…"     R1:2  R2:5  R3:7  R4:9   → leads R4
  Option 2  "Flat. Functional, but nothing…"     R1:8  R2:2  R3:3  R4:1   → leads R1
  Option 3  "Clear. Present and available"       R1:2  R2:2  R3:9  R4:4   → leads R3
  Option 4  "It depends on the night I had"      R1:4  R2:4  R3:4  R4:9   → leads R4
```

### 6.1 Authoring template (give this to copy)

For each question, produce a block in **exactly** this shape, so the weights are auditable at a glance:

```
Q<n> — <question text>
  A "<option text>"   R1:<0-10>  R2:<0-10>  R3:<0-10>  R4:<0-10>   → leads R<k>
  B "<option text>"   R1:<0-10>  R2:<0-10>  R3:<0-10>  R4:<0-10>   → leads R<k>
  C "<option text>"   R1:<0-10>  R2:<0-10>  R3:<0-10>  R4:<0-10>   → leads R<k>
  D "<option text>"   R1:<0-10>  R2:<0-10>  R3:<0-10>  R4:<0-10>   → leads R<k>
```

### 6.2 Principles (so the diagnostic still *separates* people)

1. One question = one dimension of nervous-system state (energy, sleep, criticism response, interoception,
   breath, silence, appetite, relational field…). Keep the existing 15 themes unless the client changes them.
2. Each option should have a **clear leading result** — the option most people would naturally associate with
   it scores 8–10 on that result and low (0–3) on the opposite pole. A question where every option leads the
   same result is dead: reject it.
3. **Do not let one result dominate every question.** Aim for each of R1–R4 to lead roughly a quarter of the
   options so no type is unreachable.
4. Keep the weights **on a 0–10 dial, not binary**. Mixed options (a D-leaning answer that also nudges A) are
   the whole reason for the model.
5. **Q15 stays the intention question** ("If you could only change one thing about how you feel, you would
   want to feel…") and is the tie-break source. Give its options strong, honest weights so the tie-break reads
   as meaningful. It is the last entry in the `questions` array.
6. Copy tone is fixed by the brand: calm, second person, no clinical jargon unless Komal approves. The
   existing sympathetic/dorsal/ventral framing is client-approved in copy but still pending Komal's
   line-by-line read — do not add new clinical vocabulary.

### 6.3 Deliverable for content

- 15 questions × 4 options in the §6.1 template, weights filled.
- The same content transposed into the `content/quiz-content.php` array (§4.1).
- Placeholder-grade is acceptable for v1; Komal replaces copy later — **only the `text` strings change,
  never the `w` keys.**

---

## 7. Testing & parity (required before "done")

No local PHP runtime exists, so the executable proof is JS-side; PHP is proven by lint + line-for-line mirror.
Use whatever parity mechanism is available and **say which you used**.

- [ ] `test/scoring.test.js` rewritten:
  - clear majority example (Example 1)
  - single-option-leads example (Example 2)
  - multi-result contribution (an option whose `w` is non-zero on ≥3 results accumulates to all of them)
  - exact tie resolved by Q15 (Example 3)
  - incomplete / malformed submission → `null` (Example 4)
  - `breakdown()` percentages sum to 100; divide-by-zero guarded
  - `ranked()` sorts descending
  - weights bound check (a `w` outside 0–10 rejected/logged if the guard enforces it)
- [ ] `test/checkout-flow.test.js` still green with updated fixtures.
- [ ] **JS ↔ PHP parity**: either (a) a node harness that evaluates the PHP scoring function in a PHP-WASM
      runtime over a fixed answer set, or (b) if unavailable, a documented, reviewed equivalence — flag which
      you did and note that (b) is asserted by inspection, not executed. *(This was defect #1 in `plan.md`:
      "Scoring has two implementations… parity asserted by inspection only.")*
- [ ] Confirm the minified `score()` in `quiz-assets-php-only.php` was **regenerated** and matches #3.

---

## 8. Hard constraints — do not break

From `AGENT-HANDOFF.md` (keep these green; only the scoring lock is lifted):

1. Never use `#F7F0EC` (cream) or `#F2E8DF` (warm) as any section background — client rejected both.
2. All section backgrounds `#FFFFFF` except the hero (`#0E1B30`) and the dark ink card in
   `.dq-reflection__card`.
3. No `<header>` / `<footer>` inside any HTML block.
4. All 20 unit tests stay green.
5. Keep `quiz-assets-php-only.php` in sync whenever frontend CSS/JS changes.
6. After any change to `stillness-diagnostic-quiz.html`:
   `cp diagnostic-quiz/stillness-diagnostic-quiz.html diagnostic-quiz/index.html` (they must be identical).
7. Theme-safety: quiz selectors are `sq-`-prefixed or under `.stillness-quiz`; every quiz `<button>` keeps its
   appearance reset (WordPress themes restyle `button:hover`). See §12.6 (`quiz-frontend.css`) — these hover
   rules are deliberate and were fixed once already; do not revert.
8. Brand tokens: `--sq-ink #0E1B30`, `--sq-midnight #1D3152`, `--sq-seafoam #688F9D`, `--sq-wave #A4B2BA`,
   `--sq-breeze #D9E8EB`, `--sq-teal #2C7A7B`; fonts Cormorant Garamond (headings) / Lato (body) / Jost
   (labels). Do not introduce generic selectors.
9. Preview-only paid result is admin-gated (`current_user_can('manage_options')`) — do not weaken.

---

## 9. Deployment & code-snippet inventory

| Order | Where | File | Notes |
|---|---|---|---|
| 1 | Code Snippets → PHP (run everywhere) | `content/quiz-content.php` | Content + weights |
| 2 | Code Snippets → PHP (run everywhere) | `snippets/diagnostic-quiz.php` | Scoring + shortcodes |
| 3 | Code Snippets → PHP (run everywhere) | `snippets/quiz-assets-php-only.php` | Prints CSS (head) + JS (footer). Replaces the separate CSS/JS entries — do not activate those too |
| 4 | WooCommerce import | `wordpress/product-prescription.csv` | Unchanged |
| 5 | Elementor HTML widgets | `wordpress/html-blocks/01…06.html` | Unchanged unless a payload rename forces it |

**Deploy is blocked on WordPress write access** (OS task `18775a4f`). Build and test locally; do not assume
you can push to the live site.

**CSS must be printed by the assets PHP snippet, not an Elementor widget** — a page-scoped stylesheet is what
broke the newsletter form (see `work/hotfix-2026-10-03-website-fixes.md`).

---

## 10. Open decisions — confirm before/around implementation

| # | Decision | Recommendation |
|---|---|---|
| D1 | Tie-break rule | §3.3 (Q15 weights decide among leaders; then declaration order). Confirm with Yeswanth/Komal. |
| D2 | Weight scale | Integers **0–10**, no need to sum to 10. Confirm the client is happy with "free" sums (some questions sharper than others). |
| D3 | Must every question include a max (10) somewhere? | No — but see §6.2.2. Decide whether the post-build guard should *warn* on flat questions. |
| D4 | Do weights appear in the visitor-facing UI? | **No** — weights are authoring metadata only. The quiz shows option text, not scores. Confirm. |
| D5 | Store only the result letter in order meta, or answers too? | Already stores both (`_stillness_quiz_result` + `_stillness_quiz_answers`). Keep as-is. |
| D6 | Result page shows a percentage split? | Optional. `breakdown()` supports it; current UI does not render it. Default: no change. |

---

## 11. Regeneration scripts (run after editing the readable sources)

### 11.1 CSS → `quiz-assets-php-only.php`

From the `stillness/` directory:

```js
// Save as /tmp/regen-php.js and run: node /tmp/regen-php.js
const fs = require('fs');
let css = fs.readFileSync('diagnostic-quiz/snippets/quiz-frontend.css', 'utf8');
css = css.replace(/\/\*[\s\S]*?\*\//g, '');
css = css
  .replace(/\r\n/g, '\n').replace(/\n+/g, ' ')
  .replace(/\s*\{\s*/g, '{').replace(/\s*\}\s*/g, '}')
  .replace(/\s*;\s*/g, ';').replace(/\s*,\s*/g, ',')
  .replace(/:\s+/g, ':').replace(/;\s*}/g, '}')
  .replace(/ +/g, ' ').trim();

let php = fs.readFileSync('diagnostic-quiz/snippets/quiz-assets-php-only.php', 'utf8');
const open = '<style id="stillness-quiz-styles">';
const close = '</style>';
const si = php.indexOf(open) + open.length;
const ei = php.indexOf(close);
const newPhp = php.substring(0, si) + '\n    ' + css + '\n    ' + php.substring(ei);
fs.writeFileSync('diagnostic-quiz/snippets/quiz-assets-php-only.php', newPhp, 'utf8');
console.log('✅ PHP updated, length:', css.length);
```

### 11.2 JS → `quiz-assets-php-only.php`

The embedded JS lives between `<script id="stillness-quiz-script">` and `</script>`. It is a **minified copy
of `quiz-frontend.js`**. After editing `quiz-frontend.js`:

```sh
# 1. Minify the readable source (npx, no vendored dependency needed)
npx --yes terser diagnostic-quiz/snippets/quiz-frontend.js -c -m -o /tmp/quiz.min.js
```

```js
// 2. Splice it into the bundle. Save as /tmp/regen-js.js
const fs = require('fs');
const min = fs.readFileSync('/tmp/quiz.min.js', 'utf8').trim();
let php = fs.readFileSync('diagnostic-quiz/snippets/quiz-assets-php-only.php', 'utf8');
const open = '<script id="stillness-quiz-script">';
const close = '</script>';
const si = php.indexOf(open) + open.length;
const ei = php.indexOf(close, si);
if (si < open.length || ei < 0) throw new Error('script markers not found');
const newPhp = php.substring(0, si) + '\n    ' + min + '\n    ' + php.substring(ei);
fs.writeFileSync('diagnostic-quiz/snippets/quiz-assets-php-only.php', newPhp, 'utf8');
console.log('✅ JS bundle updated, length:', min.length);
```

> The tests can prove the shipped copy behaves identically to the source:
> `QUIZ_SCRIPT=snippets/quiz-assets-php-only.php node --test test/` (see §12.8, `SCRIPT_PATH`). Run this after
> regenerating.

---

## 12. Source code (as-is — the files you will change)

Everything below is the **current, live** code. Change what §5 lists; leave the rest.

### 12.1 `content/quiz-content.php` (full)

```php
<?php
/**
 * Stillness — Diagnostic Quiz Content
 *
 * SINGLE SOURCE OF TRUTH for every question, option, and result type.
 * Komal revises copy here. Nothing else needs to change.
 *
 * Paste into: Code Snippets plugin (or mu-plugin). Requires no child theme.
 *
 * INVARIANTS (do not break):
 *  - Exactly 15 questions in 'questions'.
 *  - Each question has exactly 4 options keyed A, B, C, D.
 *  - Option letters align with result types: A = sympathetic overdrive,
 *    B = dorsal shutdown, C = ventral rest, D = mixed/pendulum.
 *    Scoring counts letter frequency, so this alignment IS the scoring.
 *  - Question 15 decides ties (see stillness_quiz_score). Keep it the
 *    "what would you most like to feel" question — intention beats frequency.
 */

if (!function_exists('stillness_quiz_content')):

function stillness_quiz_content()
{
    static $content = null;

    if ($content !== null) {
        return $content;
    }

    $content = array(

        /* ---------------------------------------------------------
         * Result types — the four nervous system states
         * ------------------------------------------------------- */
        'types' => array(
            'A' => array(
                'variation_id' => 0, /* set at build: Woo variation id for type A */
                'name'     => 'The Lit Engine',
                'tagline'  => 'Sympathetic Overdrive',
                'short'    => 'Your system is running hot. Fuel is high, landing gear is retracted.',
                'accent'   => '#C4713D',
                'intro'    => 'Your prescription focuses on discharge — giving the excess energy somewhere to go that is not your nervous system.',
                'practices' => array(
                    array(
                        'title'  => 'Long exhale breath',
                        'detail' => '4 in, 8 out. Ten rounds before anything else.',
                    ),
                    array(
                        'title'  => 'Fast movement, cold water',
                        'detail' => 'Your system needs intensity, not stillness. Run, swim, shower cold.',
                    ),
                    array(
                        'title'  => 'Sound immersion',
                        'detail' => 'Loud, layered, full-body. Let it move through you rather than asking you to sit still.',
                    ),
                ),
            ),
            'B' => array(
                'variation_id' => 0, /* set at build: Woo variation id for type B */
                'name'     => 'The Quiet Below',
                'tagline'  => 'Dorsal Shutdown',
                'short'    => 'Your system has gone quiet to stay safe. It is not emptiness — it is protection.',
                'accent'   => '#4A6B8A',
                'intro'    => 'Your prescription focuses on gentle return. Nothing here asks you to feel everything at once.',
                'practices' => array(
                    array(
                        'title'  => 'Orienting, not meditating',
                        'detail' => 'Look slowly around the room and name five things. Safe proximity first.',
                    ),
                    array(
                        'title'  => 'Rhythmic movement',
                        'detail' => 'Sway, rock, shake. Small and unremarkable. The goal is rhythm, not performance.',
                    ),
                    array(
                        'title'  => 'Warmth and contact',
                        'detail' => 'Warm bath, weighted blanket, another person. Safety first, insight second.',
                    ),
                ),
            ),
            'C' => array(
                'variation_id' => 0, /* set at build: Woo variation id for type C */
                'name'     => 'The Open Field',
                'tagline'  => 'Ventral Rest',
                'short'    => 'You are regulated but unoccupied. Nothing is wrong — nothing is moving either.',
                'accent'   => '#2C7A7B',
                'intro'    => 'Your prescription focuses on engagement. You do not need to calm down. You need somewhere to put your attention.',
                'practices' => array(
                    array(
                        'title'  => 'Somatic inquiry',
                        'detail' => 'Ask the body directly: where do you feel this? Track one sensation for two minutes.',
                    ),
                    array(
                        'title'  => 'Breath as structure',
                        'detail' => 'Box breathing to deepen what you already have. You are building, not repairing.',
                    ),
                    array(
                        'title'  => 'Sound to open',
                        'detail' => 'Resonant, harmonic, sustained. Build the field you are standing in.',
                    ),
                ),
            ),
            'D' => array(
                'variation_id' => 0, /* set at build: Woo variation id for type D */
                'name'     => 'The Pendulum',
                'tagline'  => 'Mixed Regulation',
                'short'    => 'You swing between states — wired at night, flat by noon. Neither end is home.',
                'accent'   => '#7A5C8A',
                'intro'    => 'Your prescription focuses on rhythm. Stability first. The goal is less oscillation, not one permanent state.',
                'practices' => array(
                    array(
                        'title'  => 'Anchor the exhale',
                        'detail' => 'Whatever the state, lengthen the out-breath. It is the only lever that works both directions.',
                    ),
                    array(
                        'title'  => 'Cycle work',
                        'detail' => 'Movement then rest, sound then silence. Alternation trains the switch, not the destination.',
                    ),
                    array(
                        'title'  => 'Consistent time outdoors',
                        'detail' => 'Same window daily. Your system learns from repetition more than from intensity.',
                    ),
                ),
            ),
        ),

        /* ---------------------------------------------------------
         * 15 questions
         * ------------------------------------------------------- */
        'questions' => array(
            array(
                'q' => 'How would you describe your energy on waking?',
                'options' => array(
                    'A' => 'Already running — mind racing before my feet touch the floor',
                    'B' => 'Flat. Functional, but nothing has weight',
                    'C' => 'Clear. Present and available',
                    'D' => 'It depends on the night I had',
                ),
            ),
            array(
                'q' => 'Where do you feel it first?',
                'options' => array(
                    'A' => 'Chest, jaw, shoulders',
                    'B' => 'Heavy limbs, fog',
                    'C' => 'Whole body, evenly',
                    'D' => 'It moves around',
                ),
            ),
            array(
                'q' => 'Your body is asked to perform and something in you resists. What resists?',
                'options' => array(
                    'A' => 'Heat, urgency — I want it over with',
                    'B' => 'Nothing. I comply, slowly, from far away',
                    'C' => 'A genuine objection on integrity grounds',
                    'D' => 'It depends what is being asked',
                ),
            ),
            array(
                'q' => 'How long can you hold a difficult feeling without acting on it?',
                'options' => array(
                    'A' => 'Barely. It converts to urgency fast',
                    'B' => 'Forever. I never react — I also never move',
                    'C' => 'I can hold it and stay present',
                    'D' => 'In bursts, then I am gone',
                ),
            ),
            array(
                'q' => 'How do you sleep?',
                'options' => array(
                    'A' => 'Light, or I fall asleep exhausted and wake wired',
                    'B' => 'Heavy or numb. Hard to say',
                    'C' => 'Consistently well',
                    'D' => 'Good some nights, wrecked others',
                ),
            ),
            array(
                'q' => 'What happens when someone criticises you?',
                'options' => array(
                    'A' => 'Heat, defensiveness, immediate rebuttal',
                    'B' => 'Agreement — whatever they say — to end the contact',
                    'C' => 'I take it in, weigh it, respond when ready',
                    'D' => 'Depends who it is',
                ),
            ),
            array(
                'q' => 'Choose a time of day.',
                'options' => array(
                    'A' => 'Late night, mind racing, replaying conversations',
                    'B' => 'Mid-afternoon, low, hard to focus',
                    'C' => 'Morning, first hour, clearest',
                    'D' => 'No consistent answer',
                ),
            ),
            array(
                'q' => 'How hungry are you, generally?',
                'options' => array(
                    'A' => 'Very. I skip meals then crash',
                    'B' => 'I forget to eat',
                    'C' => 'Steady — meals arrive without much thought',
                    'D' => 'Up and down',
                ),
            ),
            array(
                'q' => 'When you rest, what is actually happening?',
                'options' => array(
                    'A' => 'I cannot truly rest',
                    'B' => 'Rest is where I disappear',
                    'C' => 'Genuinely restful',
                    'D' => 'Rest, then restlessness',
                ),
            ),
            array(
                'q' => 'How much do you feel the people around you?',
                'options' => array(
                    'A' => 'Intensely — too much, often',
                    'B' => 'Faintly. Present but not close',
                    'C' => 'Warmly and specifically',
                    'D' => 'Inconsistently',
                ),
            ),
            array(
                'q' => 'Your breath right now, checked for a moment:',
                'options' => array(
                    'A' => 'High in the chest, shallow',
                    'B' => 'Low, maybe barely moving',
                    'C' => 'Easy, somewhere in the middle',
                    'D' => 'It shifts when I pay attention to it',
                ),
            ),
            array(
                'q' => 'What is your relationship with silence?',
                'options' => array(
                    'A' => 'I turn it on, then can only stand a few seconds',
                    'B' => 'Comfortable. Silence is where I live',
                    'C' => 'I like it, and I choose it',
                    'D' => 'Depends on the nervous system that day',
                ),
            ),
            array(
                'q' => 'Finish this: "The thing I would most like to change is…"',
                'options' => array(
                    'A' => 'That I cannot switch off',
                    'B' => 'That I cannot feel much of anything',
                    'C' => 'That I feel fine, but nothing is quite moving',
                    'D' => 'That I do not know what I want',
                ),
            ),
            array(
                'q' => 'How long has this been the pattern?',
                'options' => array(
                    'A' => 'As long as I can remember',
                    'B' => 'So long I stopped marking it',
                    'C' => 'It has shifted and improved this year',
                    'D' => 'It comes and goes',
                ),
            ),
            array(
                'q' => 'If you could only change one thing about how you feel, you would want to feel…',
                'options' => array(
                    'A' => 'Capable of finally slowing down',
                    'B' => 'Present, and able to feel it',
                    'C' => 'Alive and engaged in my own life',
                    'D' => 'Steady — whichever way the day goes',
                ),
            ),
        ),

        /* ---------------------------------------------------------
         * Page copy
         * ------------------------------------------------------- */
        'landing' => array(
            'eyebrow' => 'Two minutes',
            'heading' => 'What is your nervous system doing right now?',
            'sub'     => 'Fifteen questions. No account, no payment to find out. Your result tells you which state you are living in — and what actually moves it.',
            'cta'     => 'Take the 2-minute diagnostic',
            'proof'   => 'Built from Stillness sessions and the patterns we see in the room.',
        ),

        'gate' => array(
            'heading' => 'Your result is ready.',
            'body'    => 'Enter your name and email to see it. We will hold onto it if you want the practice afterward.',
            'button'  => 'Show me my result',
            'legal'   => 'No noise. One email if you ask for it.',
        ),
    );

    /**
     * Post-build guard. Logs rather than throws — a copy edit that breaks the
     * invariants should surface in the log, not white-screen the quiz.
     */
    $valid_keys = array('A', 'B', 'C', 'D');

    if (count($content['questions']) !== 15) {
        error_log('[stillness-quiz] Expected 15 questions, found ' . count($content['questions']));
    }

    foreach ($content['questions'] as $i => $question) {
        if (!is_array($question['options'] ?? null)) {
            error_log('[stillness-quiz] Question ' . ($i + 1) . ' has no options array.');
            continue;
        }
        $keys = array_keys($question['options']);
        sort($keys);
        if ($keys !== $valid_keys) {
            error_log('[stillness-quiz] Question ' . ($i + 1) . ' options must be keyed A,B,C,D. Found: ' . implode(',', $keys));
        }
    }

    return $content;
}

endif;
```

### 12.2 `content/scoring.js` (full — the executable spec)

```js
/**
 * Diagnostic Quiz — Scoring (reference implementation)
 *
 * The PHP in ../snippets/ is what ships. This file is the executable
 * specification: the logic below is ported 1:1, and the tests in ../test/
 * are what prove the PHP port is correct. Change one, change the other.
 *
 * Frequency count across 15 questions. Tie breaks on Q15 (index 14).
 * Pure functions, no DOM, no network.
 */

export const REQUIRED_COUNT = 15;
export const TIE_BREAK_INDEX = 14;
const KEYS = ['A', 'B', 'C', 'D'];

/**
 * True when every question has a valid A|B|C|D answer.
 * Guards against an empty or partial submission silently scoring as a result —
 * an all-zero tally is a four-way tie, which would otherwise resolve to A.
 */
export function isComplete(answers) {
  if (!answers || typeof answers !== 'object') return false;
  for (let i = 0; i < REQUIRED_COUNT; i++) {
    if (!KEYS.includes(answers[i] ?? answers[String(i)])) return false;
  }
  return true;
}

/**
 * @param {Object.<string|number,string>} answers - question index -> A|B|C|D
 * @returns {string|null} result key A|B|C|D, or null if answers are incomplete
 */
export function score(answers) {
  if (!isComplete(answers)) return null;

  const tally = { A: 0, B: 0, C: 0, D: 0 };
  for (let i = 0; i < REQUIRED_COUNT; i++) {
    tally[answers[i] ?? answers[String(i)]] += 1;
  }

  const max = Math.max(...Object.values(tally));
  const leaders = KEYS.filter((k) => tally[k] === max);

  if (leaders.length === 1) return leaders[0];

  // Tie: break on the final question. A self-reported intention should
  // outrank a raw frequency tie.
  const finalAnswer = answers[TIE_BREAK_INDEX] ?? answers[String(TIE_BREAK_INDEX)];
  return KEYS.includes(finalAnswer) ? finalAnswer : leaders[0];
}

/** Percentage of answers toward each type. For result-page display. */
export function breakdown(answers) {
  const tally = { A: 0, B: 0, C: 0, D: 0 };
  for (const value of Object.values(answers ?? {})) {
    if (KEYS.includes(value)) tally[value] += 1;
  }
  const total = Object.values(tally).reduce((a, b) => a + b, 0) || 1;
  return Object.fromEntries(KEYS.map((k) => [k, Math.round((tally[k] / total) * 100)]));
}

/** Highest first — used if the blended-result add-on is ever bought. */
export function ranked(answers) {
  return Object.entries(breakdown(answers)).sort((a, b) => b[1] - a[1]);
}
```

### 12.3 `snippets/diagnostic-quiz.php` — scoring section (lines 22–106 of the full file)

The rest of this file (shortcodes, REST, order meta, unlock) is unchanged by this task. The two functions you
must rewrite:

```php
/* ==========================================================================
   1. SCORING
   ========================================================================== */

/**
 * True when all 15 questions have a valid A|B|C|D answer.
 * Guards an empty or partial submission from silently scoring as a result —
 * an all-zero tally is a four-way tie, which would otherwise resolve to A.
 */
function stillness_quiz_is_complete($answers)
{
    if (!is_array($answers)) {
        return false;
    }

    $required = count(stillness_quiz_content()['questions']);
    $valid = array('A', 'B', 'C', 'D');

    for ($i = 0; $i < $required; $i++) {
        if (!isset($answers[$i]) || !in_array($answers[$i], $valid, true)) {
            return false;
        }
    }

    return true;
}

/**
 * @param array $answers question index (0-based) => A|B|C|D
 * @return string|null result key, or null if incomplete
 */
function stillness_quiz_score($answers)
{
    if (!stillness_quiz_is_complete($answers)) {
        return null;
    }

    $content = stillness_quiz_content();
    $required = count($content['questions']);
    $tie_break_index = $required - 1;

    $tally = array('A' => 0, 'B' => 0, 'C' => 0, 'D' => 0);

    for ($i = 0; $i < $required; $i++) {
        $tally[$answers[$i]] += 1;
    }

    $max = max($tally);
    $leaders = array_keys(array_filter($tally, function ($v) use ($max) {
        return $v === $max;
    }));

    if (count($leaders) === 1) {
        return $leaders[0];
    }

    // Tie: the final question decides. A self-reported intention should
    // outrank a raw frequency tie.
    $final = isset($answers[$tie_break_index]) ? $answers[$tie_break_index] : null;

    return in_array($final, array('A', 'B', 'C', 'D'), true) ? $final : $leaders[0];
}

/** Percentage per type, for result-page display. */
function stillness_quiz_breakdown($answers)
{
    $tally = array('A' => 0, 'B' => 0, 'C' => 0, 'D' => 0);

    if (is_array($answers)) {
        foreach ($answers as $value) {
            if (in_array($value, array_keys($tally), true)) {
                $tally[$value] += 1;
            }
        }
    }

    $total = array_sum($tally);
    $total = $total > 0 ? $total : 1;

    foreach ($tally as $k => $v) {
        $tally[$k] = (int) round(($v / $total) * 100);
    }

    return $tally;
}
```

**The payload contract you must preserve** (from `stillness_quiz_render()`, around line 200 of the full file):

```php
// Hand questions to the browser so copy lives in PHP only.
$payload = wp_json_encode(array(
    'questions' => array_map(function ($q) {
        return array('q' => $q['q'], 'o' => $q['options']);
    }, $content['questions']),
    'types' => $types,
    'gate' => $content['gate'],
));
```

If you change the option shape in `quiz-content.php`, this `array_map` and the JS renderer (§12.4) both change
with it, together.

### 12.4 `snippets/quiz-frontend.js` — scoring + renderer (the file is 442 lines; the parts you change)

```js
  /* ---------- scoring (1:1 with content/scoring.js) ---------- */

  function score(answers) {
    var required = window.STILLNESS_QUIZ.questions.length;
    var i;
    for (i = 0; i < required; i++) {
      if (KEYS.indexOf(answers[i]) === -1) return null;
    }
    var tally = { A: 0, B: 0, C: 0, D: 0 };
    for (i = 0; i < required; i++) tally[answers[i]] += 1;
    var max = Math.max(tally.A, tally.B, tally.C, tally.D);
    var leaders = KEYS.filter(function (k) { return tally[k] === max; });
    if (leaders.length === 1) return leaders[0];
    var last = answers[required - 1];
    return KEYS.indexOf(last) > -1 ? last : leaders[0];
  }
```

The option renderer inside `renderQuestion()` — note `esc(q[i].o[k])` reads a **string** today and must read
the option **text** after the change:

```js
      '<div class="sq-options" role="radiogroup" aria-label="' + esc(q[i].q) + '">' +
        KEYS.map(function (k) {
          return '<button type="button" class="sq-option' +
            (chosen === k ? ' is-selected' : '') + '" role="radio" ' +
            'aria-checked="' + (chosen === k) + '" data-key="' + k + '">' +
            '<span class="sq-option-key">' + k + '</span>' +
            '<span class="sq-option-text">' + esc(q[i].o[k]) + '</span>' +
          '</button>';
        }).join('') +
      '</div>' +
```

The rest of `quiz-frontend.js` — checkout handoff (`startCheckout`, `hydrateCheckout`), draft persistence,
the gate, `submit()`, `renderResult()`, `boot()` — is unchanged by this task. Keep it as it is. (Full file is
available on request — ask at the start if you want it pasted in.)

### 12.5 `snippets/quiz-assets-php-only.php` — production bundle (full wrapper)

The CSS and JS bodies are **minified** and long; they are derived artefacts. The wrapper (26 lines):

```php
/**
 * Stillness Diagnostic Quiz — frontend assets for the Code Snippets free plan
 *
 * Paste as a PHP snippet and set to Run Everywhere. This replaces the separate
 * quiz-frontend.css and quiz-frontend.js entries; do not activate those too.
 */

add_action('wp_head', 'stillness_quiz_print_styles', 99);
function stillness_quiz_print_styles()
{
    ?>
    <style id="stillness-quiz-styles">
    /* minified copy of snippets/quiz-frontend.css — regenerate with §11.1 */
    </style>
    <?php
}

add_action('wp_footer', 'stillness_quiz_print_script', 99);
function stillness_quiz_print_script()
{
    ?>
    <script id="stillness-quiz-script">
    /* minified copy of snippets/quiz-frontend.js — regenerate with §11.2 */
    </script>
    <?php
}
```

You will **not** hand-write the minified bodies. Edit the readable sources (§12.4, §12.6) and run the
regeneration scripts in §11.

### 12.6 `snippets/quiz-frontend.css` — the option/render styles (unchanged by this task)

Included so you can verify nothing visual shifts. The option and hover rules (which were fixed once already
and must not be reverted) are the block from `.sq-options` through `.sq-option-text`. Full file is 511 lines;
available on request. The load-bearing rules:

```css
.sq-options { display: flex; flex-direction: column; gap: 10px; }

.sq-option {
  display: flex; align-items: flex-start; gap: 18px; width: 100%;
  text-align: left; background: #FFFFFF; border: 1px solid rgba(14, 27, 48, 0.12);
  border-radius: 14px; padding: 14px 20px; cursor: pointer;
  font-family: 'Lato', sans-serif; font-size: 15px; line-height: 1.5;
  color: var(--sq-ink); transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  appearance: none; box-shadow: 0 2px 8px rgba(14, 27, 48, 0.02);
}

.sq-option:hover { border-color: var(--sq-teal); background: rgba(44, 122, 123, 0.05);
  color: var(--sq-ink); transform: translateY(-2px); box-shadow: 0 8px 20px rgba(44, 122, 123, 0.12); }

.sq-option.is-selected { border-color: var(--sq-teal); background: rgba(44, 122, 123, 0.08);
  color: var(--sq-ink); box-shadow: 0 8px 24px rgba(44, 122, 123, 0.15); }

.sq-option-key { flex: 0 0 auto; width: 26px; height: 26px; border: 1px solid rgba(14, 27, 48, 0.2);
  border-radius: 50%; display: grid; place-items: center; font-size: 11px;
  color: rgba(14, 27, 48, 0.6); transition: all 0.25s ease; }

.sq-option.is-selected .sq-option-key { border-color: var(--sq-teal); background: var(--sq-teal); color: #FFFFFF; }

.sq-option-text { flex: 1 1 auto; }
```

### 12.7 `test/scoring.test.js` (full — rewrite for weighted scoring)

```js
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { score, breakdown, ranked, isComplete, REQUIRED_COUNT } from '../content/scoring.js';

const build = (arr) => Object.fromEntries(arr.map((v, i) => [i, v]));

describe('score', () => {
  it('returns a clear majority', () => {
    const a = Array(15).fill('A');
    a[0] = 'B'; a[1] = 'B'; a[2] = 'B';
    assert.equal(score(build(a)), 'A');
  });

  it('rejects an empty submission', () => {
    assert.equal(score({}), null);
  });

  it('breaks a two-way tie on question 15', () => {
    const arr = [];
    for (let i = 0; i < 14; i++) arr.push(i % 2 === 0 ? 'A' : 'B');
    arr[14] = 'D';
    assert.equal(score(build(arr)), 'D');
  });

  it('breaks a four-way tie on question 15', () => {
    const arr = ['A','B','C','D','A','B','C','D','A','B','C','D','A','B','C'];
    assert.equal(score(build(arr)), 'C');
  });

  it('rejects malformed answers rather than guessing', () => {
    assert.equal(score({ 0: 'Z', 1: 'A', 2: 'A' }), null);
  });

  it('returns a valid key for a full submission of one type', () => {
    assert.ok(['A','B','C','D'].includes(score(build(Array(15).fill('B')))));
  });
});

describe('breakdown', () => {
  it('returns percentages summing to 100', () => {
    const b = breakdown(build(Array(15).fill('A')));
    assert.equal(b.A, 100);
    assert.equal(Object.values(b).reduce((x, y) => x + y, 0), 100);
  });

  it('does not divide by zero on empty input', () => {
    assert.equal(breakdown({}).A, 0);
  });
});

describe('ranked', () => {
  it('sorts highest first', () => {
    const arr = Array(15).fill('B');
    arr[0] = 'A';
    assert.equal(ranked(build(arr))[0][0], 'B');
  });
});

describe('isComplete', () => {
  it('accepts a full submission with string keys', () => {
    assert.equal(isComplete(build(Array(15).fill('A'))), true);
  });

  it('accepts a full submission with numeric keys', () => {
    const o = {};
    for (let i = 0; i < 15; i++) o[i] = 'B';
    assert.equal(isComplete(o), true);
  });

  it('rejects a partial submission', () => {
    assert.equal(isComplete({ 0: 'A', 1: 'A' }), false);
  });

  it('rejects invalid option values', () => {
    const a = Array(15).fill('A');
    a[7] = 'Z';
    assert.equal(isComplete(build(a)), false);
  });

  it('rejects non-objects', () => {
    assert.equal(isComplete(null), false);
    assert.equal(isComplete(undefined), false);
  });
});

describe('REQUIRED_COUNT', () => {
  it('matches the question set', () => {
    assert.equal(REQUIRED_COUNT, 15);
  });
});
```

> These tests import the scoring **weights from the content**, so they will need the test to load the content
> array. Today `scoring.js` is standalone. Decide: (a) keep `scoring.js` pure and inject the questions/weights
> as a parameter — `score(answers, questions)` — or (b) have `scoring.js` import a shared JSON/PHP-exported
> weights fixture. Option (a) keeps the module pure and is the recommended shape; state your choice.

### 12.8 `test/checkout-flow.test.js` (full — keep green; update fixtures)

```js
/**
 * End-to-end test of the unlock path in ../snippets/quiz-frontend.js.
 *
 * scoring.test.js proves the arithmetic. This proves the thing that actually
 * decides whether the product sells: that answering all 15 questions leads to
 * an add-to-cart request for the correct variation, that the result survives
 * the trip to checkout, and that the hidden checkout fields get filled.
 *
 * Requires jsdom (not vendored — this folder ships as a client deliverable,
 * so there is no package.json). Skips itself when jsdom is not resolvable:
 *
 *   npm i -D jsdom && node --test test/
 *
 * Two bugs this was written to prevent, both of which shipped once already:
 *   1. The unlock CTA POSTed to the checkout URL with an empty cart, so
 *      nothing was ever added to the order and nothing ever unlocked.
 *   2. hydrateCheckout only ran inside boot(), which returns immediately on
 *      the checkout page (no shortcode, so no window.STILLNESS_QUIZ).
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));

let JSDOM = null;
let VirtualConsole = null;
try {
  ({ JSDOM, VirtualConsole } = await import('jsdom'));
} catch (e) {
  /* Not installed. The suite skips itself rather than failing the run. */
}

const SKIP = JSDOM ? false : 'jsdom not installed (pnpm install)';

/**
 * The suite runs against `snippets/quiz-frontend.js` by default. The
 * deployment guide ships the JS inside `snippets/quiz-assets-php-only.php`
 * instead, so QUIZ_SCRIPT can point at that file to prove the shipped copy
 * behaves the same as the source the tests were written against.
 */
const SCRIPT_PATH = process.env.QUIZ_SCRIPT
  ? path.resolve(here, '..', process.env.QUIZ_SCRIPT)
  : path.join(here, '..', 'snippets', 'quiz-frontend.js');

const SCRIPT = (() => {
  const raw = fs.readFileSync(SCRIPT_PATH, 'utf8');
  const embedded = raw.match(
    /<script id="stillness-quiz-script">([\s\S]*?)<\/script>/
  );
  return embedded ? embedded[1] : raw;
})();

const REST_URL = 'https://stillness.test/?rest_route=/stillness-quiz/v1/submit';
const CART_URL = 'https://stillness.test/?wc-ajax=add_to_cart';
const CHECKOUT_URL = 'https://stillness.test/checkout/';

const VARIATION_ID = 4242;

function makeTypes() {
  const types = {};
  for (const key of ['A', 'B', 'C', 'D']) {
    types[key] = {
      variation_id: VARIATION_ID,
      name: 'Type ' + key,
      tagline: 'Tagline ' + key,
      short: 'Short ' + key,
      accent: '#123456',
      intro: 'Intro ' + key,
      practices: [{ title: 'Practice', detail: 'Detail' }]
    };
  }
  return types;
}

function makeQuestions() {
  const qs = [];
  for (let i = 0; i < 15; i++) {
    qs.push({ q: 'Question ' + (i + 1), o: { A: 'a', B: 'b', C: 'c', D: 'd' } });
  }
  return qs;
}

/**
 * Boot the snippet against a page and wait for it to render.
 * fetch is stubbed and every call recorded so tests can assert on payloads.
 * Navigation cannot be intercepted in jsdom 30 (location is non-configurable),
 * so attempts are counted through the virtual console instead.
 */
async function boot({ html, payload, seedSession, fetchImpl }) {
  const jsdomErrors = [];
  // Live array: navigation happens long after boot() returns, so this must
  // not be a snapshot filtered at construction time.
  const navigations = [];
  const virtualConsole = new VirtualConsole();
  virtualConsole.on('jsdomError', (err) => {
    const message = String(err && err.message);
    if (/navigation to another Document/i.test(message)) navigations.push(message);
    else jsdomErrors.push(message);
  });
  virtualConsole.on('error', (...args) => jsdomErrors.push(args.join(' ')));

  const dom = new JSDOM(html, {
    url: 'https://stillness.test/',
    runScripts: 'outside-only',
    pretendToBeVisual: true,
    virtualConsole
  });
  const { window } = dom;

  // Let the document finish loading so the snippet initialises immediately
  // instead of waiting on a DOMContentLoaded that has already fired.
  await new Promise((r) => setTimeout(r, 20));

  if (seedSession) {
    for (const [k, v] of Object.entries(seedSession)) {
      window.sessionStorage.setItem(k, v);
    }
  }

  if (payload) {
    window.STILLNESS_QUIZ = payload;
    window.STILLNESS_QUIZ_NONCE = 'nonce-123';
    window.STILLNESS_QUIZ_REST = REST_URL;
  }

  const calls = [];
  window.fetch = fetchImpl
    ? (url, opts) => {
        calls.push({ url: String(url), method: opts && opts.method, body: opts && opts.body });
        return fetchImpl(String(url), opts);
      }
    : (url, opts) => {
        calls.push({ url: String(url), method: opts && opts.method, body: opts && opts.body });
        const isRest = String(url).includes('rest_route');
        // Echo the config the test supplied rather than a separate fixture:
        // the server always answers with the same types the payload carries,
        // and tests that mutate a variation id must see their own mutation.
        const types = (window.STILLNESS_QUIZ && window.STILLNESS_QUIZ.types) || makeTypes();
        return Promise.resolve({
          json: () =>
            Promise.resolve(
              isRest ? { success: true, result: 'B', type: types.B } : { success: true }
            )
        });
      };

  window.eval(SCRIPT);
  await new Promise((r) => setTimeout(r, 20));

  return {
    dom,
    window,
    doc: window.document,
    calls,
    navigations,
    jsdomErrors
  };
}

function tick(ms = 20) {
  return new Promise((r) => setTimeout(r, ms));
}

function basePayload() {
  return {
    questions: makeQuestions(),
    types: makeTypes(),
    gate: {
      heading: 'Where should we send it?',
      body: 'Enter your details.',
      button: 'See my result',
      legal: 'We respect your inbox.'
    },
    checkout_url: CHECKOUT_URL,
    cart_url: CART_URL
  };
}

/**
 * Walk all 15 questions, then submit the email gate. The REST call that
 * follows resolves with type B, so callers can assert on a known result.
 */
async function answerQuiz(doc, window, who = { name: 'K', email: 'k@e.com' }) {
  for (let i = 0; i < 15; i++) {
    const option = doc.querySelector('.sq-option[data-key="A"]');
    assert.ok(option, `question ${i + 1}: option rendered`);
    option.click();
    const next = doc.querySelector('[data-next]');
    assert.ok(next.disabled === false, `question ${i + 1}: next enabled after answering`);
    next.click();
  }

  assert.ok(doc.getElementById('sq-gate-form'), 'gate rendered after question 15');
  doc.getElementById('sq-name').value = who.name;
  doc.getElementById('sq-email').value = who.email;
  doc.getElementById('sq-gate-form').dispatchEvent(
    new window.Event('submit', { bubbles: true, cancelable: true })
  );
  await tick();
}

test('unlock CTA adds the correct variation to the cart, then hands off', { skip: SKIP }, async () => {
  const payload = basePayload();
  const { doc, window, calls, navigations } = await boot({
    html: '<div class="stillness-quiz" id="stillness-quiz"></div>',
    payload
  });

  await answerQuiz(doc, window, { name: 'Komal', email: 'komal@example.com' });

  // REST submit + result rendered.
  const restCall = calls.find((c) => c.url.includes('rest_route'));
  assert.ok(restCall, 'result was submitted to the REST endpoint');
  assert.strictEqual(restCall.method, 'POST');
  assert.match(restCall.body, /komal@example\.com/, 'email sent with the result');
  assert.match(restCall.body, /nonce-123/, 'nonce sent with the result');

  assert.ok(doc.querySelector('.sq-result'), 'result screen rendered');
  assert.strictEqual(
    doc.querySelector('.sq-result-name').textContent,
    'Type B',
    'server result wins over the local score'
  );

  const form = doc.querySelector('.sq-checkout-form');
  assert.ok(form, 'unlock form rendered before payment');
  assert.strictEqual(
    form.querySelector('[name="stillness_quiz_result"]').value,
    'B',
    'result carried on the unlock form'
  );

  // THE CRITICAL STEP: submit the unlock form.
  calls.length = 0;
  form.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
  await tick();

  const cartCall = calls.find((c) => c.url.includes('wc-ajax=add_to_cart'));
  assert.ok(cartCall, 'add-to-cart was actually requested');
  assert.strictEqual(cartCall.method, 'POST');
  assert.ok(
    cartCall.body.includes('product_id=' + VARIATION_ID),
    `cart request targets the variation id, got: ${cartCall.body}`
  );
  assert.ok(cartCall.body.includes('quantity=1'), 'quantity is set');

  // The result must survive the redirect to checkout.
  const handoff = JSON.parse(window.sessionStorage.getItem('stillness_quiz_handoff') || 'null');
  assert.ok(handoff, 'result parked for the checkout page');
  assert.strictEqual(handoff.result, 'B');
  assert.ok(handoff.answers, 'answers parked alongside the result');

  assert.equal(navigations.length, 1, 'redirected to checkout once the cart accepted it');
  assert.strictEqual(payload.checkout_url, CHECKOUT_URL, 'redirect targets the checkout url PHP shipped');
});

test('failed add-to-cart does not redirect to an empty checkout', { skip: SKIP }, async () => {
  const { doc, window, navigations } = await boot({
    html: '<div class="stillness-quiz" id="stillness-quiz"></div>',
    payload: basePayload(),
    fetchImpl: () =>
      Promise.resolve({ json: () => Promise.resolve({ error: true, product_url: 'x' }) })
  });

  await answerQuiz(doc, window);

  const form = doc.querySelector('.sq-checkout-form');
  assert.ok(form, 'unlock form rendered');
  form.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
  await tick();

  assert.equal(navigations.length, 0, 'stayed on the page when the cart rejected it');
  assert.ok(doc.querySelector('.sq-error'), 'an error is shown instead of a silent dead end');

  const btn = doc.querySelector('.sq-checkout-form button');
  assert.ok(btn, 'the form survives the failure');
  assert.strictEqual(btn.disabled, false, 'the CTA can be retried');
  assert.match(
    doc.querySelector('.sq-error').textContent,
    /try again/i,
    'the message tells them what to do'
  );
});

test('checkout page: hidden fields are filled from the parked result', { skip: SKIP }, async () => {
  const { doc } = await boot({
    html:
      '<form class="checkout">' +
      '<input type="hidden" id="stillness_quiz_result" name="stillness_quiz_result" value="">' +
      '<input type="hidden" id="stillness_quiz_answers" name="stillness_quiz_answers" value="">' +
      '</form>',
    // No payload: the checkout page has no shortcode, exactly as in production.
    payload: null,
    seedSession: {
      stillness_quiz_handoff: JSON.stringify({ result: 'C', answers: '{"0":"C"}' })
    }
  });

  assert.strictEqual(
    doc.getElementById('stillness_quiz_result').value,
    'C',
    'result written into the field woocommerce_checkout_create_order reads'
  );
  assert.strictEqual(
    doc.getElementById('stillness_quiz_answers').value,
    '{"0":"C"}',
    'answers written alongside'
  );
});

test('checkout page: an already-filled field is never overwritten', { skip: SKIP }, async () => {
  const { doc } = await boot({
    html:
      '<input type="hidden" id="stillness_quiz_result" name="stillness_quiz_result" value="A">' +
      '<input type="hidden" id="stillness_quiz_answers" name="stillness_quiz_answers" value="">',
    payload: null,
    seedSession: {
      stillness_quiz_handoff: JSON.stringify({ result: 'D', answers: '{}' })
    }
  });

  assert.strictEqual(
    doc.getElementById('stillness_quiz_result').value,
    'A',
    'handoff must not clobber a value already present'
  );
});

test('missing variation id fails loudly instead of posting to an empty cart', { skip: SKIP }, async () => {
  const payload = basePayload();
  payload.types.B.variation_id = 0;

  const { doc, window, calls, navigations } = await boot({
    html: '<div class="stillness-quiz" id="stillness-quiz"></div>',
    payload
  });

  for (let i = 0; i < 15; i++) {
    doc.querySelector('.sq-option[data-key="A"]').click();
    doc.querySelector('[data-next]').click();
  }
  doc.getElementById('sq-name').value = 'K';
  doc.getElementById('sq-email').value = 'k@e.com';
  doc.getElementById('sq-gate-form').dispatchEvent(
    new window.Event('submit', { bubbles: true, cancelable: true })
  );
  await tick();

  calls.length = 0;
  const form = doc.querySelector('.sq-checkout-form');
  form.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
  await tick();

  assert.strictEqual(calls.length, 0, 'no cart request when the product is not set up');
  assert.equal(navigations.length, 0, 'no redirect to a checkout that cannot be paid');
  assert.ok(doc.querySelector('.sq-error'), 'explains what is wrong');
});
```

### 12.9 `wordpress/html-blocks/03-quiz.html` and `06-result.html` (unchanged)

These just mount the shortcodes; they do not change for a scoring-model change.

```html
<!-- 03-quiz.html — excerpt -->
<section class="dq-quiz" id="stillness-quiz-start">
  <div class="dq-wrap">
    <span class="dq-kicker">The diagnostic</span>
    <h2 class="dq-section-title">Fifteen questions. <em>Go with your first instinct.</em></h2>
    <div id="stillness-quiz" class="stillness-quiz">
      [stillness_quiz]
    </div>
    <p class="dq-hint">Prefer to sit with it? <a href="mailto:hello@stillness.co">Talk to us instead.</a></p>
  </div>
</section>
```

```html
<!-- 06-result.html — full -->
<section class="dq-result-section">
  <div class="dq-wrap">
    [stillness_quiz_result]
  </div>
</section>
```

---

## 13. Definition of done

- [ ] Weighted model implemented in all four code paths (§5.0) and they agree.
- [ ] `content/quiz-content.php` holds 15 questions, each option `{text, w}` with integer weights 0–10 keyed A–D.
- [ ] Post-build guard validates weights; header INVARIANTS comment corrected.
- [ ] `test/scoring.test.js` rewritten for weighted scoring; full suite green
      (`node --test diagnostic-quiz/test/*.test.js`).
- [ ] `quiz-assets-php-only.php` minified JS regenerated from `quiz-frontend.js`; parity run
      (`QUIZ_SCRIPT=snippets/quiz-assets-php-only.php node --test test/`) passes.
- [ ] `stillness-diagnostic-quiz.html` and `index.html` identical if either changed.
- [ ] `QA.md` scoring section updated to describe the weighted rule.
- [ ] 15 questions re-authored in the §6.1 visible-matrix template, ready for Komal's copy review.
- [ ] §10 decisions either resolved or explicitly flagged in your output.
- [ ] Nothing in §5.2 was touched.
