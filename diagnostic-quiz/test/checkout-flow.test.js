/**
 * End-to-end test of the unlock path in ../snippets/quiz-assets-php-only.php.
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
 * The suite runs against the shipped bundle `snippets/quiz-assets-php-only.php`
 * by default (the script is pulled out of its inlined <script>). QUIZ_SCRIPT can
 * point elsewhere to check a candidate copy without changing this file.
 */
const SCRIPT_PATH = process.env.QUIZ_SCRIPT
  ? path.resolve(here, '..', process.env.QUIZ_SCRIPT)
  : path.join(here, '..', 'snippets', 'quiz-assets-php-only.php');

const SCRIPT = (() => {
  const raw = fs.readFileSync(SCRIPT_PATH, 'utf8');
  // The file's PHPdoc also mentions the tag, so anchor on the LAST <script>
  // block — the real one printed by stillness_quiz_print_script().
  const marker = '<script id="stillness-quiz-script">';
  const start = raw.lastIndexOf(marker);
  if (start < 0) return raw;
  const end = raw.indexOf('</script>', start);
  return end < 0 ? raw : raw.slice(start + marker.length, end);
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
      accent: '#123456',
      body1: 'Body ' + key,
      body2: 'Body two ' + key,
      practice: { name: 'Practice', why: 'Why', first: 'First', next: 'Next' },
      product: {
        name: 'Product ' + key,
        description: 'Description',
        format: 'Audio recording',
        why: 'Why this product',
        button: 'Unlock the full result'
      }
    };
  }
  return types;
}

function makeQuestions() {
  // Every option carries the spreadsheet model: 3 points to one result and at
  // most 1 to a second. Answering all A accumulates a clean A majority
  // locally, while the stubbed REST reply below returns B — the two must not
  // be confused, which is exactly what the result assertion checks.
  const letter = (k) => ({ A: 0, B: 0, C: 0, D: 0, [k]: 3 });
  const qs = [];
  for (let i = 0; i < 15; i++) {
    qs.push({
      q: 'Question ' + (i + 1),
      m: false,
      o: { A: 'a', B: 'b', C: 'c', D: 'd' },
      w: { A: letter('A'), B: letter('B'), C: letter('C'), D: letter('D') },
      qb: {}
    });
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
  // The intro screen comes first in the new flow; start the quiz.
  const start = doc.querySelector('.sq-cta');
  assert.ok(start, 'intro CTA rendered');
  start.click();

  for (let i = 0; i < 15; i++) {
    // Single-choice questions auto-advance on tap, per the brief.
    const option = doc.querySelector('.sq-option[data-key="A"]');
    assert.ok(option, `question ${i + 1}: option rendered`);
    option.click();
  }

  assert.ok(doc.getElementById('sq-gate'), 'gate rendered after question 15');
  doc.getElementById('sq-name').value = who.name;
  doc.getElementById('sq-email').value = who.email;
  doc.getElementById('sq-gate').dispatchEvent(
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

  doc.querySelector('.sq-cta').click(); // start past the intro screen
  for (let i = 0; i < 15; i++) {
    doc.querySelector('.sq-option[data-key="A"]').click(); // auto-advances
  }
  doc.getElementById('sq-name').value = 'K';
  doc.getElementById('sq-email').value = 'k@e.com';
  doc.getElementById('sq-gate').dispatchEvent(
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

/**
 * The submission itself: what the live REST endpoint returns must render.
 * Regression for the shipped spinner: every engine shape the server might
 * still hand back (current schema, prototype practices[], nothing at all)
 * ends at a result or a visible error — never at an uncaught throw inside
 * the catch path that leaves "Reading your answers…" on screen.
 */
test('a 200 with a valid type renders the server result', { skip: SKIP }, async () => {
  const payload = basePayload();
  const { doc, window } = await boot({
    html: '<div class="stillness-quiz" id="stillness-quiz"></div>',
    payload
  });

  await answerQuiz(doc, window);

  assert.ok(doc.querySelector('.sq-result'), 'result rendered');
  assert.strictEqual(doc.querySelector('.sq-result-name').textContent, 'Type B');
});

test('a 200 with the prototype practices[] schema still renders', { skip: SKIP }, async () => {
  const payload = basePayload();
  const oldShape = {
    name: 'Type B',
    tagline: 'Tagline B',
    accent: '#123456',
    practices: [{ t: 'Sound journey', d: 'Vibration and tone' }]
  };
  const { doc, window } = await boot({
    html: '<div class="stillness-quiz" id="stillness-quiz"></div>',
    payload,
    fetchImpl: () =>
      Promise.resolve({ json: () => Promise.resolve({ success: true, result: 'B', type: oldShape }) })
  });

  await answerQuiz(doc, window);

  assert.ok(doc.querySelector('.sq-result'), 'result rendered from the old schema');
  assert.strictEqual(doc.querySelector('.sq-result-name').textContent, 'Type B');
  assert.match(
    doc.querySelector('.sq-practice-name').textContent,
    /Sound journey/,
    'practice content mapped from practices[0]'
  );
});

test('a 200 with a broken type renders an error, not a spinner', { skip: SKIP }, async () => {
  const payload = basePayload();
  const { doc, window } = await boot({
    html: '<div class="stillness-quiz" id="stillness-quiz"></div>',
    payload,
    fetchImpl: () =>
      Promise.resolve({ json: () => Promise.resolve({ success: true, result: 'B', type: 42 }) })
  });

  await answerQuiz(doc, window);

  assert.ok(!doc.querySelector('.sq-loading'), 'the spinner is gone by the final render');
  assert.ok(doc.querySelector('.sq-error'), 'a visible error replaces the loader');
  assert.match(
    doc.querySelector('.sq-error').textContent,
    /could not load/i,
    'the error text is the human-readable one'
  );
});

test('a 200 with a type missing nested fields renders with defaults', { skip: SKIP }, async () => {
  const payload = basePayload();
  const sparse = { name: 'Type B', tagline: 'Tagline B', accent: '#123456' };
  const { doc, window } = await boot({
    html: '<div class="stillness-quiz" id="stillness-quiz"></div>',
    payload,
    fetchImpl: () =>
      Promise.resolve({ json: () => Promise.resolve({ success: true, result: 'B', type: sparse }) })
  });

  await answerQuiz(doc, window);

  assert.ok(doc.querySelector('.sq-result'), 'result rendered');
  assert.strictEqual(doc.querySelector('.sq-result-name').textContent, 'Type B');
  assert.ok(!doc.querySelector('.sq-practice'), 'missing practice section is simply absent');
  assert.ok(!doc.querySelector('.sq-product'), 'missing product section is simply absent');
});
