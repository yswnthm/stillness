/**
 * Build stillness-diagnostic-quiz.html's quiz payload and engine from the
 * production sources, and QA the copy against the client's Google Doc text.
 *
 *   node build-preview.js <doc.txt>
 *
 * <doc.txt> is the plain-text export of the client brief. The script:
 *   1. extracts the $content array from content/quiz-content.php into JSON
 *      (string-safe scanner — comments stripped, PHP array syntax → JS),
 *   2. asserts every doc question, option and result field appears verbatim
 *      in the extracted content (doc-vs-build QA),
 *   3. searches the real matrix for a genuine tie that Question 15 settles,
 *      for the dev-bar "Tie Break" link,
 *   4. splices the payload, the shipped engine (verbatim from the bundle)
 *      and a preview shim into stillness-diagnostic-quiz.html, then writes
 *      index.html as a byte copy.
 */

'use strict';

const fs = require('node:fs');
const path = require('node:path');

const HERE = __dirname;
const docText = fs.readFileSync(process.argv[2] || '/tmp/doc.txt', 'utf8');

/* ------------------------------------------------------------------ *
 * 1. PHP array literal → JS object (string-safe scanner)
 * ------------------------------------------------------------------ */

function extractPhpArray(src) {
  const start = src.indexOf("'types' => array(");
  const end = src.indexOf('/*\n     * Post-build guard', start);
  if (start < 0 || end < 0) throw new Error('content array bounds not found');
  return phpToJs(src.slice(start, end));
}

function phpToJs(php) {
  let out = '';
  let i = 0;
  const n = php.length;
  const stack = []; // 'O' for keyed array → {...}, 'A' for list (...) → [...]
  while (i < n) {
    const ch = php[i];
    if (ch === "'") {
      // Single-quoted PHP string; \' and \\ are the only escapes.
      let j = i + 1;
      let str = '';
      while (j < n) {
        if (php[j] === '\\' && (php[j + 1] === "'" || php[j + 1] === '\\')) {
          str += php[j + 1];
          j += 2;
          continue;
        }
        if (php[j] === "'") break;
        str += php[j];
        j += 1;
      }
      out += JSON.stringify(str);
      i = j + 1; // step past the closing quote — i = j re-parses it
      continue;
    }
    if (ch === '/' && php[i + 1] === '*') {
      const close = php.indexOf('*/', i + 2);
      i = close < 0 ? n : close + 2; // strip comment
      continue;
    }
    if (php.startsWith('array(', i)) {
      // Keyed PHP array ('a' => x, …) → object literal; numeric-keyed list
      // → array literal. Lookahead: a top-level '=>' before the array's own
      // closing paren means it is keyed.
      let k = i + 6;
      let depth = 0;
      let keyed = false;
      while (k < n) {
        const c = php[k];
        if (c === "'") { // skip string literals so parens inside copy don't count
          k += 1;
          while (k < n) {
            if (php[k] === '\\' && (php[k + 1] === "'" || php[k + 1] === '\\')) { k += 2; continue; }
            if (php[k] === "'") break;
            k += 1;
          }
          k += 1;
          continue;
        }
        if (c === '(') { depth += 1; k += 1; continue; }
        if (c === ')') {
          if (depth === 0) break;
          depth -= 1; k += 1; continue;
        }
        if (c === '=' && php[k + 1] === '>' && depth === 0) { keyed = true; break; }
        k += 1;
      }
      stack.push(keyed ? 'O' : 'A');
      out += keyed ? '{' : '[';
      i += 6; continue;
    }
    if (ch === '(') { stack.push('A'); out += '['; i += 1; continue; }
    if (ch === ')') {
      const open = stack.pop();
      out += open === 'O' ? '}' : ']';
      i += 1; continue;
    }
    if (php.startsWith('=>', i)) { out += ':'; i += 2; continue; }
    out += ch;
    i += 1;
  }
  return out;
}

const php = fs.readFileSync(path.join(HERE, 'content', 'quiz-content.php'), 'utf8');
const start = php.indexOf('$content = array(');
const end = php.indexOf('/**\n     * Post-build guard', start); // guard opens with /**
const literal = phpToJs(php.slice(start, end)).replace(/^\$content\s*[:=]\s*/, '').trimEnd().replace(/;$/, ''); // drop the closing ");" semicolon
const content = new Function('return (' + literal + ')')();

if (content.questions.length !== 15) throw new Error('wanted 15 questions');
for (const opt of content.questions) {
  if (Object.keys(opt.options).join('') !== 'ABCD') throw new Error('options must be A,B,C,D');
  for (const k of ['A', 'B', 'C', 'D']) {
    const w = opt.options[k].w;
    if (['A', 'B', 'C', 'D'].some((x) => !(x in w) || typeof w[x] !== 'number')) {
      throw new Error('bad weight vector in content');
    }
  }
}

/* ------------------------------------------------------------------ *
 * 2. Doc-vs-build QA — every doc string must appear in the content
 * ------------------------------------------------------------------ */

function norm(s) {
  return String(s).replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"').replace(/\s+/g, ' ').trim();
}

const docNorm = norm(docText); // doc covers itself: curly apostrophes vs straight ones

let docMisses = 0;
function expectInDoc(value, label) {
  if (!docNorm.includes(norm(value))) {
    console.error(`  MISS  ${label}: ${String(value).slice(0, 90)}`);
    docMisses += 1;
  }
}

content.questions.forEach((q, i) => {
  expectInDoc(q.q, `Q${i + 1} text`);
  for (const k of ['A', 'B', 'C', 'D']) {
    expectInDoc(q.options[k].text, `Q${i + 1}.${k} option`);
  }
});
for (const key of ['A', 'B', 'C', 'D']) {
  const t = content.types[key];
  expectInDoc(t.name, `type ${key} name`);
  expectInDoc(t.tagline, `type ${key} tagline`);
  expectInDoc(t.body1, `type ${key} body1`);
  expectInDoc(t.body2, `type ${key} body2`);
  expectInDoc(t.practice.name, `type ${key} practice`);
}
expectInDoc(content.landing.heading, 'intro heading');
expectInDoc(content.landing.sub, 'intro text');
expectInDoc(content.landing.eyebrow, 'intro label');
/* No gate checks: the doc has no gate copy — its §1 flow shows the free
   result directly and §6 captures the email at the paywall. The gate block
   is the build's own arrangement. */
expectInDoc(content.paywall.line, 'paywall line');
expectInDoc(content.disclaimer, 'disclaimer');

/* ------------------------------------------------------------------ *
 * 3. A real tie the dev-bar demo link can point at
 * ------------------------------------------------------------------ */

const K = ['A', 'B', 'C', 'D'];
const weightAt = (qi, opt) => content.questions[qi].options[opt].w;

function findTieDemo() {
  // DP over running totals (each ≤ 42) for questions 1..14, then any legal
  // Q15 answer that (a) ties two results and (b) gives 3 points to a tied one.
  // One representative answer path per distinct total state — keying on the
  // answers string as well would enumerate 4^14 paths and OOM.
  const K = ['A', 'B', 'C', 'D'];
  let states = new Map(); // totals-string → { sum, answers }
  states.set('0,0,0,0', { sum: [0, 0, 0, 0], answers: '' });
  for (let qi = 0; qi < 14; qi++) {
    const next = new Map();
    for (const [, st] of states) {
      for (const opt of K) {
        const w = weightAt(qi, opt);
        const t = st.sum.slice();
        for (let j = 0; j < 4; j++) t[j] += w[K[j]] || 0;
        const tk = t.join(',');
        if (!next.has(tk)) next.set(tk, { sum: t, answers: st.answers + opt });
      }
    }
    states = next;
  }
  for (const [, st] of states) {
    for (const opt of K) {
      const w = weightAt(14, opt); // weight vector of the Q15 choice, keyed by result
      const t = st.sum.slice();
      for (let j = 0; j < 4; j++) t[j] += w[K[j]] || 0;
      const threeTo = K.find((rk) => w[rk] === 3); // the result the choice gives 3 points to
      const max = Math.max(...t);
      const tied = K.filter((x) => t[K.indexOf(x)] === max);
      if (tied.length < 2) continue;
      if (threeTo && tied.includes(threeTo)) {
        return { answers: st.answers + opt, tie: tied.join(' & '), winner: threeTo };
      }
    }
  }
  return null;
}

const tieDemo = findTieDemo();

/* ------------------------------------------------------------------ *
 * 4. Splice payload + engine + shim into the preview, sync index.html
 * ------------------------------------------------------------------ */

const bundle = fs.readFileSync(path.join(HERE, 'snippets', 'quiz-assets-php-only.php'), 'utf8');
const engineMarker = '<script id="stillness-quiz-script">';
const engineStart = bundle.lastIndexOf(engineMarker);
const engineEnd = bundle.indexOf('</script>', engineStart);
const engine = bundle.slice(engineStart + engineMarker.length, engineEnd);

const styleMarker = '<style id="stillness-quiz-styles">';
const styleStart = bundle.indexOf(styleMarker);
const styleEnd = bundle.indexOf('</style>', styleStart);
const styleBlock = bundle.slice(styleStart, styleEnd + '</style>'.length);

const payload = {
  questions: content.questions.map((q) => ({
    q: q.q,
    m: !!q.multiple,
    o: { A: q.options.A.text, B: q.options.B.text, C: q.options.C.text, D: q.options.D.text },
    w: { A: q.options.A.w, B: q.options.B.w, C: q.options.C.w, D: q.options.D.w },
    qb: { A: q.options.A.quote_back, B: q.options.B.quote_back, C: q.options.C.quote_back, D: q.options.D.quote_back },
  })),
  types: content.types,
  gate: content.gate,
  paywall: content.paywall,
  disclaimer: content.disclaimer,
  intro: content.landing,
};

const tieLink = tieDemo
  ? `?answers=${tieDemo.answers}`
  : '?#'; // matrix changed and no tie found — link degrades to home

const shim = `
<script id="stillness-quiz-preview">
/* Preview-only helpers — NOT shipped to WordPress. Production behaviour
   (REST submit, WooCommerce cart) lives in quiz-assets-php-only.php. */
(function() {
  'use strict';
  var K = ['A', 'B', 'C', 'D'];

  function run() {
    var c = window.STILLNESS_QUIZ;
    if (!c) return;
    var params = new URLSearchParams(location.search);
    var forced = params.get('type');
    var seeded = params.get('answers');

    if (forced && c.types[forced]) {
      /* Result-page preview: the engine renders c.type when questions are
         empty, exactly like the [stillness_quiz_result] shortcode page. */
      c.questions = [];
      c.type = c.types[forced];
      c.unlocked = true;
      return;
    }

    if (seeded) {
      /* Accept "A,A,A…" (old links) and "AAAAA…" (compact, 15 chars). */
      var seq = seeded.indexOf(',') > -1
        ? seeded.split(',').map(function(v) { return v.trim().toUpperCase(); })
        : seeded.split('').map(function(v) { return v.toUpperCase(); });
      var key = scoreSeed(seq);
      if (key) {
        c.questions = [];
        c.type = c.types[key];
        c.unlocked = true;
        return;
      }
      /* Incomplete seed: park it as a draft the engine picks up instead. */
      var draft = {};
      seq.forEach(function(v, i) {
        if (K.indexOf(v) > -1 && i < 15) draft[i] = v;
      });
      try { sessionStorage.setItem('stillness_quiz_draft', JSON.stringify({ a: draft, o: {} })); } catch (e) {}
    }
  }

  /* Mirrors score() in the engine below + stillness_quiz_score() in the
     PHP logic — 3 points to one result per choice, highest total wins,
     Q15 decides a tie when its 3 points go to a tied result, then the
     walk back from Q14 to Q1. Preview copies are acceptable drift risk
     ONLY because production never loads this file. */
  function scoreSeed(list) {
    if (list.length !== 15) return null;
    var t = { A: 0, B: 0, C: 0, D: 0 }, i, j;
    for (i = 0; i < 15; i++) {
      var w = window.STILLNESS_QUIZ.questions[i].w[list[i]];
      if (!w) return null;
      for (j = 0; j < 4; j++) t[K[j]] += w[K[j]] || 0;
    }
    var max = Math.max(t.A, t.B, t.C, t.D);
    if (max <= 0) return null;
    var tied = K.filter(function (x) { return t[x] === max; });
    if (tied.length === 1) return tied[0];
    /* Doc §4: first an answer (Q15 or, walking back from Q14 to Q1) whose
       choice gives 3 points to one of the tied results decides the winner. */
    for (i = list.length - 1; i >= 0; i--) {
      var w2 = window.STILLNESS_QUIZ.questions[i].w[list[i]];
      for (j = 0; j < tied.length; j++) {
        if (w2 && w2[tied[j]] === 3) return tied[j];
      }
    }
    return tied[0];
  }

  /* Reviewer-friendly checkout: production adds the variation via
     ?wc-ajax=add_to_cart; in the static preview, stop the form and say so. */
  function wireCheckout() {
    document.addEventListener('submit', function (e) {
      var f = e.target;
      if (!f || !f.classList || !f.classList.contains('sq-checkout-form')) return;
      e.preventDefault();
      e.stopPropagation();
      var r = f.querySelector('input[name="stillness_quiz_result"]');
      var a = f.querySelector('input[name="stillness_quiz_answers"]');
      try {
        sessionStorage.setItem('stillness_quiz_handoff',
          JSON.stringify({ result: (r && r.value) || '', answers: (a && a.value) || '' }));
      } catch (err) {}
      var type = (r && window.STILLNESS_QUIZ.types[r.value]) || null;
      alert('Preview handoff: the "' + ((type && type.product && type.product.name) || 'product') +
        '" CTA would add its variation to the WooCommerce cart and continue to checkout. ' +
        'Result ' + ((r && r.value) || '') + ' is parked in stillness_quiz_handoff.');
    }, true);
  }

  /* FAQ accordion — production ships this behaviour inside the page's own
     block, not the quiz snippet. */
  function wireFaq() {
    var items = document.querySelectorAll('.dq-faq-item');
    items.forEach(function (item) {
      var trigger = item.querySelector('.dq-faq-item__trigger');
      if (!trigger) return;
      trigger.addEventListener('click', function () {
        var open = item.classList.contains('is-open');
        items.forEach(function (i) { i.classList.remove('is-open'); });
        if (!open) item.classList.add('is-open');
      });
    });
  }

  run();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wireFaq);
  } else {
    wireFaq();
  }
  wireCheckout();
})();
</script>`;

const engineScript = `<script id="stillness-quiz-script">${engine}</script>`;
const payloadScript = `\n<script id="stillness-quiz-payload">\nwindow.STILLNESS_QUIZ = ${JSON.stringify(payload, null, 2)};\n</script>\n${shim}\n${engineScript}`;

/* Replace the quiz payload+shim+engine region — idempotent: on the first
   run the old generation is one <script> ... Diagnostic Quiz Engine block;
   on later runs it is the previously spliced payload...engine run of blocks. */
const htmlPath = path.join(HERE, 'stillness-diagnostic-quiz.html');
let html = fs.readFileSync(htmlPath, 'utf8');
const newMarker = '<script id="stillness-quiz-payload">';
const oldEngineNote = 'Stillness — Diagnostic Quiz Engine';
let regionStart = html.lastIndexOf(newMarker);
if (regionStart < 0) {
  regionStart = html.lastIndexOf('<script>\n/* ==========================================================================\n   ' + oldEngineNote);
  if (regionStart < 0) {
    regionStart = html.indexOf(oldEngineNote);
    if (regionStart >= 0) { // snap back to that script open tag
      regionStart = html.lastIndexOf('<script>', regionStart);
    }
  }
}
if (regionStart < 0) throw new Error('quiz engine region not found');
let regionEnd = html.indexOf('</script>', regionStart) + '</script>'.length;
// If the new generation is spliced, keep consuming until the engine script closes.
if (html.startsWith(newMarker, regionStart)) {
  const engineOpen = html.indexOf(engineMarker, regionStart);
  if (engineOpen > 0) regionEnd = html.indexOf('</script>', engineOpen) + '</script>'.length;
}
html = html.slice(0, regionStart) + payloadScript + html.slice(regionEnd);

/* Regenerate the dev-bar's Tie Break row so label and href always describe
   the tie the current matrix actually settles (label was drifting). */
const devBarAnchorRegex = /<a href="\?answers=[^"]*">Tie Break[^<]*<\/a>/;
if (devBarAnchorRegex.test(html)) {
  const barLabel = tieDemo
    ? `Tie Break (A&B tie — Q15 gives 3 to ${tieDemo.winner})`
    : 'Tie Break (none in current matrix)';
  const barHref = tieDemo
    ? `?answers=${tieDemo.answers.split('').join(',')}`
    : '?';
  html = html.replace(devBarAnchorRegex, `<a href="${barHref}">${barLabel}</a>`);
}

/* New quiz CSS from the bundle, after the page styles so it wins the ties. */
if (!html.includes(styleMarker)) {
  const headEnd = html.lastIndexOf('</head>');
  html = html.slice(0, headEnd) + '\n' + styleBlock + '\n' + html.slice(headEnd);
}

fs.writeFileSync(htmlPath, html);
fs.writeFileSync(path.join(HERE, 'index.html'), html); // handoff rule #7

/* ------------------------------------------------------------------ */

console.log(`doc-vs-build QA: ${docMisses === 0 ? 'all strings verbatim ✓' : docMisses + ' MISSES — see above'}`);
console.log(tieDemo
  ? `tie demo: ${tieLink}  (tied: ${tieDemo.tie} → Q15 gives 3 → ${tieDemo.winner})`
  : 'tie demo: NOT FOUND — dev-bar link points home');
console.log(`written: stillness-diagnostic-quiz.html + index.html`);
process.exit(docMisses ? 1 : 0);
