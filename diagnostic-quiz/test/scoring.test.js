/**
 * Scoring — the shipped arithmetic.
 *
 * The scorer no longer exists as a standalone module: it ships inside the
 * inlined <script> of ../snippets/quiz-assets-php-only.php (mirroring
 * stillness_quiz_score() in ../snippets/diagnostic-quiz.php). These tests load
 * that exact shipped copy and exercise it directly, so the browser fallback and
 * the server can never be proven against a stale re-implementation.
 *
 * No jsdom needed: score() touches only window.STILLNESS_QUIZ, and the bundle's
 * boot path no-ops against an empty document (getElementById returns null).
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const BUNDLE = readFileSync(
  new URL('../snippets/quiz-assets-php-only.php', import.meta.url),
  'utf8'
);

const SCRIPT = (() => {
  // The file's PHPdoc also mentions the tag, so anchor on the LAST <script>
  // block — the real one printed by stillness_quiz_print_script().
  const marker = '<script id="stillness-quiz-script">';
  const start = BUNDLE.lastIndexOf(marker);
  if (start < 0) throw new Error('scoring.test: quiz script not found in bundle');
  const end = BUNDLE.indexOf('</script>', start);
  if (end < 0) throw new Error('scoring.test: quiz script never closes');
  return BUNDLE.slice(start + marker.length, end);
})();

// score() is a hoisted declaration inside the IIFE, so exposing it from the top
// of the closure is safe and keeps the shipped source byte-identical otherwise.
const EXPOSED = SCRIPT.replace(
  "(function(){'use strict';",
  "(function(){'use strict';window.__score=function(a){return score(a)};"
);

/** Load a fresh copy of the shipped scorer against a question set. */
function loadScore(questions) {
  const noop = () => {};
  const window = { STILLNESS_QUIZ: { questions }, addEventListener: noop };
  const sandbox = {
    window,
    document: {
      getElementById: () => null, // boot() returns early against an empty page
      readyState: 'complete',
      addEventListener: noop,
    },
    sessionStorage: { getItem: () => null, setItem: noop, removeItem: noop },
    fetch: () => Promise.reject(new Error('no network in tests')),
    console,
  };
  vm.createContext(sandbox);
  vm.runInContext(EXPOSED, sandbox);
  return window.__score;
}

const zero = { A: 0, B: 0, C: 0, D: 0 };

/** One question with one option weight-vector per result key (the real shape). */
const q = (w, multiple = false) => ({
  q: 'Question',
  m: multiple,
  o: { A: 'a', B: 'b', C: 'c', D: 'd' },
  w,
});

/**
 * A content-shaped question: every option gives 3 points to its own result,
 * and the named option additionally scratches 1 point onto `scratch`.
 */
const plain = (letter, scratch = null) =>
  q({
    A: { ...zero, A: 3, ...(letter === 'A' && scratch ? scratch : {}) },
    B: { ...zero, B: 3, ...(letter === 'B' && scratch ? scratch : {}) },
    C: { ...zero, C: 3, ...(letter === 'C' && scratch ? scratch : {}) },
    D: { ...zero, D: 3, ...(letter === 'D' && scratch ? scratch : {}) },
  });

const qs = (n, weights) => Array.from({ length: n }, () => weights);

const answers = (arr) => Object.fromEntries(arr.map((v, i) => [i, v]));
const fill = (letter, n = 15) => answers(Array(n).fill(letter));

describe('score — 3/1 point matrix', () => {
  it('returns the result with the highest accumulated weight', () => {
    assert.equal(loadScore(qs(15, plain('A')))(fill('A')), 'A');
  });

  it('carries the 1-point scratches into the totals', () => {
    // Option A gives A:3 and B:1. Fifteen A answers put A at 45 and B at 15:
    // the scratch lands, but never enough to flip the winner on its own.
    assert.equal(loadScore(qs(15, plain('A', { B: 1 })))(fill('A')), 'A');
  });

  it('rejects an empty submission', () => {
    assert.equal(loadScore(qs(15, plain('A')))({}), null);
  });

  it('rejects a partial submission', () => {
    assert.equal(loadScore(qs(15, plain('A')))(fill('A', 14)), null);
  });

  it('rejects an unknown option letter', () => {
    const a = Array(15).fill('A');
    a[7] = 'Z';
    assert.equal(loadScore(qs(15, plain('A')))(answers(a)), null);
  });

  it('rejects several letters on a single-choice question', () => {
    const a = Array(15).fill('A');
    a[3] = 'AB';
    assert.equal(loadScore(qs(15, plain('A')))(answers(a)), null);
  });

  it('counts every ticked option on a multiple-choice question', () => {
    // 14 single questions answered B put B at 14 (1/answer). The final
    // question is multiple-choice: option A gives A:10, option C gives A:6.
    // One tick (A=10) still loses to B; both ticks together (A=16) win.
    const singles = Array.from({ length: 14 }, () =>
      q({ A: { ...zero, B: 1 }, B: { ...zero, B: 1 }, C: { ...zero, B: 1 }, D: { ...zero, B: 1 } })
    );
    const multi = q({ A: { ...zero, A: 10 }, B: zero, C: { ...zero, A: 6 }, D: zero }, true);
    const set = [...singles, multi];
    assert.equal(loadScore(set)(answers([...Array(14).fill('B'), 'A'])), 'B');
    assert.equal(loadScore(set)(answers([...Array(14).fill('B'), 'AC'])), 'A');
  });

  it('breaks a tie on Question 15 when its 3 points go to a tied result', () => {
    // Five A answers (A:15), four B answers (B:12), four C answers that
    // scratch B:1 (B:16), Q14 a D answer scratching B:1 (B:17), and Q15's
    // option gives A:3 and B:1 — an 18/18 tie that settles for A, the result
    // Q15's 3 points went to, even though walking back would have found B.
    const set = [
      ...qs(5, plain('A')),
      ...qs(4, plain('B')),
      ...Array.from({ length: 4 }, () =>
        q({ A: zero, B: zero, C: { ...zero, B: 1, C: 1 }, D: zero })
      ),
      q({ A: zero, B: zero, C: zero, D: { ...zero, B: 1, D: 1 } }), // Q14
      q({ A: { ...zero, A: 3, B: 1 }, B: zero, C: zero, D: zero }), // Q15
    ];
    const picks = [...Array(5).fill('A'), ...Array(4).fill('B'),
                   ...Array(4).fill('C'), 'D', 'A'];
    assert.equal(loadScore(set)(answers(picks)), 'A');
  });

  it('walks back to earlier questions when Q15 cannot settle the tie', () => {
    // A and B tie at 15, but Q15's 3 points go to C — not a tied result —
    // and Q14..Q11 (D and C answers) carry no 3s. The walk continues to
    // Q10, whose B answer gives B its 3: B wins over declaration order (A).
    const set = [
      ...qs(5, plain('A')),
      ...qs(5, plain('B')),
      ...Array.from({ length: 3 }, () =>
        q({ A: zero, B: zero, C: { ...zero, C: 1 }, D: zero })
      ),
      q({ A: zero, B: zero, C: zero, D: { ...zero, D: 1 } }),       // Q14
      q({ A: zero, B: zero, C: { ...zero, C: 3, D: 1 }, D: zero }), // Q15
    ];
    const picks = [...Array(5).fill('A'), ...Array(5).fill('B'),
                   ...Array(3).fill('C'), 'D', 'C'];
    assert.equal(loadScore(set)(answers(picks)), 'B');
  });

  it('falls back to declaration order when no answer can separate a tie', () => {
    // Should be impossible under the real content (every option awards its
    // 3 points to exactly one result), but the fallback stays deterministic.
    const even = q({ A: { ...zero, A: 1 }, B: { ...zero, B: 1 }, C: { ...zero, C: 1 }, D: { ...zero, D: 1 } });
    assert.equal(loadScore(qs(15, even))(fill('A')), 'A');
  });

  it('treats all-zero weights as invalid, never a silent result', () => {
    assert.equal(loadScore(qs(15, q({ A: zero, B: zero, C: zero, D: zero })))(fill('A')), null);
  });

  it('returns a valid key for a full submission', () => {
    assert.equal(loadScore(qs(15, plain('C')))(fill('C')), 'C');
  });
});
