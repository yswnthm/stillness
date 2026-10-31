<?php
/**
 * Stillness Quiz — Content
 */
/**
 * Stillness — Diagnostic Quiz Content
 *
 * SINGLE SOURCE OF TRUTH for every question, option, weight and result.
 * Paste into: Code Snippets plugin (or mu-plugin). Requires no child theme.
 *
 * SOURCE OF TRUTH: the client's live Google Docs
 *   - Copy brief: ................ "Diagnostic Questions" / "Which Rest Do I
 *     Need — Developer brief" (questions, intro, result copy, scoring rules)
 *   - Scoring spreadsheet: ....... points per option for each of the four
 *     results, plus the "Quote back" phrase for each option
 * Every 'q', every 'text', every result field and every 'quote_back' below
 * must read EXACTLY from those documents. Do not reword client copy.
 *
 * SCORING MODEL
 *   Each choice adds points to one or two results. Every choice gives
 *   3 points to one result, and some also give 1 point to a second result.
 *   So 'w' only ever holds 0, 1 or 3. Weights do NOT sum to 10 any more —
 *   the spreadsheet is the authority.
 *
 * WHO EDITS WHAT
 *   Copy (client/Komal): every 'q', 'text', 'quote_back', result field, page copy.
 *   Scoring owner:       the 'w' weights, in lockstep with the spreadsheet.
 *   Nobody renames the A/B/C/D keys or the 'w' keys.
 *
 * THE FOUR RESULTS  (R1..R4 = the result keys A..D used in the data)
 *   R1 = A  The Racing Mind      — Your body is still at work long after you've clocked off.
 *   R2 = B  Running on Empty     — You're not lazy. You've gone quiet to protect yourself.
 *   R3 = C  Ready to Go Deeper   — You have room inside. It's asking to be used.
 *   R4 = D  Up and Down          — You don't need more rest. You need steadier rest.
 *
 * HOW TO READ A QUESTION
 *   The four options sit under 'A', 'B', 'C', 'D'. The badge the visitor sees
 *   is only a label — the quiz shuffles the option order for every person.
 *   Each option carries four point values and a quote-back phrase:
 *
 *       'w'           => array('A' => 3, 'B' => 0, 'C' => 0, 'D' => 1)
 *       'quote_back'  => 'you wake up already running'
 *
 * TIES (client rule — see stillness_quiz_score in diagnostic-quiz.php)
 *   If two or more results finish level:
 *     1. Question 15 decides: if the result its chosen option gives 3 points
 *        to is one of the tied results, that result wins.
 *     2. Otherwise walk back through the answers from Question 14 down to
 *        Question 1; the first answer that gives 3 points to a tied result
 *        decides the winner.
 *   Still level (should be impossible — every option awards its 3 points to
 *   exactly one result): keep Question 15 as the tiebreak question and keep
 *   it single choice.
 *
 * RULES (a broken rule is written to the PHP error log, the quiz keeps running)
 *   - Exactly 15 questions; each has exactly four options A, B, C, D.
 *   - Each option has 'text' (not empty), 'quote_back' (not empty) and 'w'
 *     with the keys A, B, C, D.
 *   - Every point value is a whole number from 0 to 3.
 *   - Every option gives 3 points to exactly one result; no result is starved
 *     (each result should receive 3 points from roughly a quarter of the options).
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
         * Result types — the four rest types
         * ------------------------------------------------------- */
        'types' => array(
            'A' => array(
                'variation_id' => 0, /* set at build: Woo variation id for type A */
                'name'     => 'The Racing Mind',
                'tagline'  => 'Your body is still at work long after you\'ve clocked off.',
                'accent'   => '#B8532C',
                'body1'    => 'Your system learned that staying switched on keeps things from falling apart, and it is very good at it. The trouble is that it no longer knows where the off switch is. You lie down and your mind picks up the to-do list. You take a day off and spend the first half of it checking your phone.',
                'body2'    => 'This is why ordinary rest hasn\'t worked for you. Telling a revving engine to sit still for two hours doesn\'t slow it down; it just gives it an empty room to race in. You don\'t need more time off. You need a way down.',
                'practice' => array(
                    'name'  => 'Breathwork',
                    'why'   => 'A slow, extended-exhale breathwork session is the most direct lever you have on an over-revved system. Lengthening the out-breath is one of the few things that reliably tells the body it is safe to stand down, and it gives a busy mind a job to do while that happens.',
                    'first' => 'Expect the first few minutes to feel fidgety. Somewhere around minute six or seven your jaw lets go, your shoulders drop, and you notice you haven\'t thought about your inbox for a while.',
                    'next'  => 'Once breathwork gets you down, a sound journey is the natural second step: it keeps you there without asking you to do anything.',
                ),
                'product'  => array(
                    'name'        => 'Switch Off',
                    'description' => 'A 20-minute guided breathwork audio',
                    'format'      => 'Audio recording',
                    'why'         => 'You need to be led down, with your eyes closed. A calm voice counting the breath does the work your mind won\'t, and audio keeps you off a screen, which is part of what keeps you wired. Play it in bed. It comes with a 3-minute version for the middle of a busy day.',
                    'button'      => 'Get the breathwork audio',
                ),
            ),
            'B' => array(
                'variation_id' => 0, /* set at build: Woo variation id for type B */
                'name'     => 'Running on Empty',
                'tagline'  => 'You\'re not lazy. You\'ve gone quiet to protect yourself.',
                'accent'   => '#2D6670',
                'body1'    => 'At some point your system decided the safest thing to do was turn the volume down on everything. You still function, and you still show up, but very little lands. You sleep and wake tired. You rest and it doesn\'t seem to count.',
                'body2'    => 'That\'s because you have been resting by switching off, and switching off is the state you\'re already stuck in. More doing nothing just keeps you underwater. What you\'re craving is something gentle that brings you back up to the surface: sensation, warmth, feeling something again, without any effort or performance required.',
                'practice' => array(
                    'name'  => 'Sound journey',
                    'why'   => 'A sound journey gives your body something to feel without asking anything of you. Vibration and tone reach you physically, so you don\'t have to produce energy you don\'t have. It is the gentlest way back into your own body.',
                    'first' => 'You may feel very little at first, and that\'s fine. Most people in your state notice warmth or tingling in the hands or chest first, and then, sometimes unexpectedly, emotion. That is your system coming back online.',
                    'next'  => 'When you have a bit more in the tank, a few minutes of journalling after each session helps you hear what\'s been under the quiet.',
                ),
                'product'  => array(
                    'name'        => 'Refill',
                    'description' => 'A 40-minute sound journey recording',
                    'format'      => 'Audio recording',
                    'why'         => 'You need something that asks nothing of you. Lie down, headphones on, press play. A video would ask for your attention and a workbook would ask for effort, and you don\'t have either to spare right now. When you feel ready, the same journey runs as a live group session.',
                    'button'      => 'Get the sound journey',
                ),
            ),
            'C' => array(
                'variation_id' => 0, /* set at build: Woo variation id for type C */
                'name'     => 'Ready to Go Deeper',
                'tagline'  => 'You have room inside. It\'s asking to be used.',
                'accent'   => '#7C8233',
                'body1'    => 'You\'re in better shape than most people who take this. You can settle, you feel things and let them pass, and you know what rest feels like. So why does something still feel unmet?',
                'body2'    => 'Because short rest only ever skims your surface. Ten-minute meditations and a quiet evening keep you steady, but they never take you anywhere new. Your system has capacity for depth and is getting snacks. What you\'re craving is a long, unhurried stretch with nothing scheduled after it, the kind of stillness most people never get far enough into to discover.',
                'practice' => array(
                    'name'  => '2-hour stillness session',
                    'why'   => 'A guided two-hour stillness session gives you what you can\'t get in short practices: the time to go past the point where the mind gets bored and into the quiet underneath. Because you\'re already regulated, you can actually reach that place, which most people can\'t.',
                    'first' => 'The first stretch will feel pleasant and familiar. The real shift tends to come after the forty-minute mark, when the urge to check the time fades and the session stops feeling like something you\'re doing.',
                    'next'  => 'Afterwards, write down whatever surfaced. People in your state often get their clearest ideas and decisions out of these sessions.',
                ),
                'product'  => array(
                    'name'        => 'Go Deeper',
                    'description' => 'A live 2-hour stillness session',
                    'format'      => 'Full session, in person or live online',
                    'why'         => 'A recording is too easy to pause at minute twenty, and for you the good part starts after minute forty. A live session with a set start and finish gives you the time and the permission to go all the way in. You\'re the one type for whom a full session is the right first step.',
                    'button'      => 'Book your 2-hour session',
                ),
            ),
            'D' => array(
                'variation_id' => 0, /* set at build: Woo variation id for type D */
                'name'     => 'Up and Down',
                'tagline'  => 'You don\'t need more rest. You need steadier rest.',
                'accent'   => '#7A4C84',
                'body1'    => 'Your energy runs in swings. Good weeks and crash weeks, wired nights and dead nights, flying high on Monday and flat by Thursday. You\'ve probably blamed yourself for being inconsistent, but the swing itself is the pattern, and it has a cause.',
                'body2'    => 'Rest for you tends to arrive only after a crash, which means it\'s always repair work. Your system never learns what steady feels like because it only ever rests in emergencies. What you\'re craving isn\'t a bigger break; it\'s a small, reliable one that happens on good days too.',
                'practice' => array(
                    'name'  => 'Daily journalling',
                    'why'   => 'Ten minutes of journalling at the same time each day is the anchor your system has been missing. It shows you your own pattern, what tips you into a swing and what pulls you back, and the regularity itself teaches your body that rest isn\'t only for emergencies.',
                    'first' => 'The first few entries will feel ordinary. Within a week or two you\'ll start to see the swing coming before it arrives, which is the moment you get your choice back.',
                    'next'  => 'On the days you feel the upswing (racing, overcommitting), add five minutes of slow breathwork before bed to stop the crash that usually follows.',
                ),
                'product'  => array(
                    'name'        => 'Steady',
                    'description' => 'A 30-day guided journal',
                    'format'      => 'Printable PDF journal, with a printed upgrade',
                    'why'         => 'You need something small you come back to every day, good day or bad. Each page has the same three prompts and a one-line mood tracker, so by week two you can see your swings coming. It\'s a PDF so you can start tonight.',
                    'button'      => 'Get the 30-day journal',
                ),
            ),
        ),

        /* ---------------------------------------------------------
         * 15 questions — points and quote-backs straight from the
         * client's scoring spreadsheet.
         * ------------------------------------------------------- */
        'questions' => array(

            /* =====================================================================
             *  QUESTION 1 of 15
             * ===================================================================== */
            array(
                'q'        => 'How do you usually feel when you first wake up?',
                'multiple' => false, /* client rule: pick one answer per question */
                'options'  => array(
                    'A' => array(
                        'text'       => 'Already running, mind racing before my feet hit the floor',
                        'w'          => array('A' => 3, 'B' => 0, 'C' => 0, 'D' => 1),
                        'quote_back' => 'you wake up already running',
                    ),
                    'B' => array(
                        'text'       => 'Flat and functional. Nothing has much weight',
                        'w'          => array('A' => 1, 'B' => 3, 'C' => 0, 'D' => 0),
                        'quote_back' => 'mornings feel flat, as if nothing has much weight',
                    ),
                    'C' => array(
                        'text'       => 'Clear, present and available',
                        'w'          => array('A' => 0, 'B' => 0, 'C' => 3, 'D' => 0),
                        'quote_back' => 'you usually wake clear and present',
                    ),
                    'D' => array(
                        'text'       => 'It depends entirely on the night I had',
                        'w'          => array('A' => 1, 'B' => 0, 'C' => 0, 'D' => 3),
                        'quote_back' => 'how you wake depends entirely on the night before',
                    ),
                ),
            ),

            /* =====================================================================
             *  QUESTION 2 of 15
             * ===================================================================== */
            array(
                'q'        => 'When you finally sit down at the end of the day, what happens?',
                'multiple' => false,
                'options'  => array(
                    'A' => array(
                        'text'       => 'I reach for my phone. Stillness feels itchy',
                        'w'          => array('A' => 3, 'B' => 0, 'C' => 0, 'D' => 1),
                        'quote_back' => 'stillness feels itchy',
                    ),
                    'B' => array(
                        'text'       => 'I go blank. Hours pass and I couldn\'t tell you what I did',
                        'w'          => array('A' => 0, 'B' => 3, 'C' => 0, 'D' => 0),
                        'quote_back' => 'evenings disappear into blankness',
                    ),
                    'C' => array(
                        'text'       => 'I settle quickly and actually enjoy it',
                        'w'          => array('A' => 0, 'B' => 0, 'C' => 3, 'D' => 0),
                        'quote_back' => 'you settle easily in the evenings',
                    ),
                    'D' => array(
                        'text'       => 'Some nights I crash instantly, others I can\'t switch off',
                        'w'          => array('A' => 0, 'B' => 1, 'C' => 0, 'D' => 3),
                        'quote_back' => 'some nights you crash and others you can\'t switch off',
                    ),
                ),
            ),

            /* =====================================================================
             *  QUESTION 3 of 15
             * ===================================================================== */
            array(
                'q'        => 'Scan your body right now. What do you notice first?',
                'multiple' => false,
                'options'  => array(
                    'A' => array(
                        'text'       => 'Tightness in my jaw, shoulders or chest',
                        'w'          => array('A' => 3, 'B' => 0, 'C' => 0, 'D' => 0),
                        'quote_back' => 'your jaw and shoulders are holding on',
                    ),
                    'B' => array(
                        'text'       => 'Heaviness, like moving through water',
                        'w'          => array('A' => 0, 'B' => 3, 'C' => 0, 'D' => 1),
                        'quote_back' => 'your body feels heavy, like moving through water',
                    ),
                    'C' => array(
                        'text'       => 'Mostly ease, maybe a little under-used',
                        'w'          => array('A' => 0, 'B' => 0, 'C' => 3, 'D' => 0),
                        'quote_back' => 'your body feels at ease, just under-used',
                    ),
                    'D' => array(
                        'text'       => 'Wired and tired at the same time',
                        'w'          => array('A' => 1, 'B' => 0, 'C' => 0, 'D' => 3),
                        'quote_back' => 'you feel wired and tired at once',
                    ),
                ),
            ),

            /* =====================================================================
             *  QUESTION 4 of 15
             * ===================================================================== */
            array(
                'q'        => 'Left alone, your thoughts tend to…',
                'multiple' => false,
                'options'  => array(
                    'A' => array(
                        'text'       => 'Loop. The same to-do list, the same conversation, on repeat',
                        'w'          => array('A' => 3, 'B' => 0, 'C' => 0, 'D' => 0),
                        'quote_back' => 'your thoughts loop on repeat',
                    ),
                    'B' => array(
                        'text'       => 'Go quiet in a way that isn\'t peaceful, more like static',
                        'w'          => array('A' => 0, 'B' => 3, 'C' => 0, 'D' => 0),
                        'quote_back' => 'your mind goes quiet, but more like static than peace',
                    ),
                    'C' => array(
                        'text'       => 'Wander somewhere interesting',
                        'w'          => array('A' => 0, 'B' => 0, 'C' => 3, 'D' => 0),
                        'quote_back' => 'your mind wanders somewhere interesting when you let it',
                    ),
                    'D' => array(
                        'text'       => 'Swing between overthinking and not being able to think at all',
                        'w'          => array('A' => 0, 'B' => 1, 'C' => 0, 'D' => 3),
                        'quote_back' => 'you swing between overthinking and not thinking at all',
                    ),
                ),
            ),

            /* =====================================================================
             *  QUESTION 5 of 15
             * ===================================================================== */
            array(
                'q'        => 'How have you been sleeping lately?',
                'multiple' => false,
                'options'  => array(
                    'A' => array(
                        'text'       => 'It\'s hard to fall asleep. My mind won\'t land',
                        'w'          => array('A' => 3, 'B' => 0, 'C' => 0, 'D' => 0),
                        'quote_back' => 'your mind won\'t land at night',
                    ),
                    'B' => array(
                        'text'       => 'I sleep a lot and still wake up tired',
                        'w'          => array('A' => 0, 'B' => 3, 'C' => 0, 'D' => 0),
                        'quote_back' => 'you sleep a lot and still wake tired',
                    ),
                    'C' => array(
                        'text'       => 'Pretty well, most nights',
                        'w'          => array('A' => 0, 'B' => 0, 'C' => 3, 'D' => 0),
                        'quote_back' => 'you sleep well most nights',
                    ),
                    'D' => array(
                        'text'       => 'Wildly inconsistent. Great one week, terrible the next',
                        'w'          => array('A' => 1, 'B' => 0, 'C' => 0, 'D' => 3),
                        'quote_back' => 'your sleep is great one week and terrible the next',
                    ),
                ),
            ),

            /* =====================================================================
             *  QUESTION 6 of 15
             * ===================================================================== */
            array(
                'q'        => 'Someone asks how you are. The honest answer is…',
                'multiple' => false,
                'options'  => array(
                    'A' => array(
                        'text'       => 'Busy. Always busy',
                        'w'          => array('A' => 3, 'B' => 0, 'C' => 0, 'D' => 1),
                        'quote_back' => 'the honest answer to \'how are you\' is \'busy\'',
                    ),
                    'B' => array(
                        'text'       => 'Fine. Though I\'m not sure I\'d know',
                        'w'          => array('A' => 0, 'B' => 3, 'C' => 0, 'D' => 0),
                        'quote_back' => 'you say \'fine\' without being sure what you feel',
                    ),
                    'C' => array(
                        'text'       => 'Good, genuinely',
                        'w'          => array('A' => 0, 'B' => 0, 'C' => 3, 'D' => 0),
                        'quote_back' => 'you\'re genuinely doing well',
                    ),
                    'D' => array(
                        'text'       => 'Depends which day you catch me',
                        'w'          => array('A' => 0, 'B' => 0, 'C' => 0, 'D' => 3),
                        'quote_back' => 'it depends which day someone catches you',
                    ),
                ),
            ),

            /* =====================================================================
             *  QUESTION 7 of 15
             * ===================================================================== */
            array(
                'q'        => 'The last time you had a free afternoon, you…',
                'multiple' => false,
                'options'  => array(
                    'A' => array(
                        'text'       => 'Filled it with errands, plans and catching up',
                        'w'          => array('A' => 3, 'B' => 0, 'C' => 0, 'D' => 0),
                        'quote_back' => 'you fill free afternoons with errands',
                    ),
                    'B' => array(
                        'text'       => 'Meant to do something nice and ended up doing nothing',
                        'w'          => array('A' => 0, 'B' => 3, 'C' => 0, 'D' => 1),
                        'quote_back' => 'free time slips into doing nothing',
                    ),
                    'C' => array(
                        'text'       => 'Followed whatever felt good, and it felt like a gift',
                        'w'          => array('A' => 0, 'B' => 0, 'C' => 3, 'D' => 0),
                        'quote_back' => 'free time feels like a gift to you',
                    ),
                    'D' => array(
                        'text'       => 'Swung between bursts of doing and collapsing on the couch',
                        'w'          => array('A' => 0, 'B' => 0, 'C' => 0, 'D' => 3),
                        'quote_back' => 'free time swings between bursts and collapse',
                    ),
                ),
            ),

            /* =====================================================================
             *  QUESTION 8 of 15
             * ===================================================================== */
            array(
                'q'        => 'How do you relate to noise and stimulation right now?',
                'multiple' => false,
                'options'  => array(
                    'A' => array(
                        'text'       => 'Silence makes me restless. I need something on',
                        'w'          => array('A' => 3, 'B' => 0, 'C' => 0, 'D' => 0),
                        'quote_back' => 'silence makes you restless',
                    ),
                    'B' => array(
                        'text'       => 'Everything feels muffled, like I\'m behind glass',
                        'w'          => array('A' => 0, 'B' => 3, 'C' => 0, 'D' => 0),
                        'quote_back' => 'the world feels muffled, as if you\'re behind glass',
                    ),
                    'C' => array(
                        'text'       => 'I notice small things: light, birdsong, texture',
                        'w'          => array('A' => 0, 'B' => 0, 'C' => 3, 'D' => 0),
                        'quote_back' => 'you notice small things like light and birdsong',
                    ),
                    'D' => array(
                        'text'       => 'Some days I crave noise, some days one notification is too much',
                        'w'          => array('A' => 0, 'B' => 1, 'C' => 0, 'D' => 3),
                        'quote_back' => 'some days one notification is too much',
                    ),
                ),
            ),

            /* =====================================================================
             *  QUESTION 9 of 15
             * ===================================================================== */
            array(
                'q'        => 'Your emotions lately are…',
                'multiple' => false,
                'options'  => array(
                    'A' => array(
                        'text'       => 'Close to the surface. Irritable, quick to snap',
                        'w'          => array('A' => 3, 'B' => 0, 'C' => 0, 'D' => 1),
                        'quote_back' => 'you\'re quicker to snap than you\'d like',
                    ),
                    'B' => array(
                        'text'       => 'Hard to reach. I know they\'re in there somewhere',
                        'w'          => array('A' => 0, 'B' => 3, 'C' => 0, 'D' => 0),
                        'quote_back' => 'your feelings are hard to reach',
                    ),
                    'C' => array(
                        'text'       => 'Felt, then they pass',
                        'w'          => array('A' => 0, 'B' => 0, 'C' => 3, 'D' => 0),
                        'quote_back' => 'your feelings move through and pass',
                    ),
                    'D' => array(
                        'text'       => 'Big highs and sudden lows',
                        'w'          => array('A' => 0, 'B' => 0, 'C' => 0, 'D' => 3),
                        'quote_back' => 'your emotions run in big highs and sudden lows',
                    ),
                ),
            ),

            /* =====================================================================
             *  QUESTION 10 of 15
             * ===================================================================== */
            array(
                'q'        => 'Coffee, sugar, a scroll: what are they to you right now?',
                'multiple' => false,
                'options'  => array(
                    'A' => array(
                        'text'       => 'Fuel. I\'d fall apart without them',
                        'w'          => array('A' => 3, 'B' => 1, 'C' => 0, 'D' => 0),
                        'quote_back' => 'you run on fuel you\'d fall apart without',
                    ),
                    'B' => array(
                        'text'       => 'A way to feel something like awake',
                        'w'          => array('A' => 1, 'B' => 3, 'C' => 0, 'D' => 0),
                        'quote_back' => 'you use coffee and scrolling to feel something like awake',
                    ),
                    'C' => array(
                        'text'       => 'A pleasure, not a crutch',
                        'w'          => array('A' => 0, 'B' => 0, 'C' => 3, 'D' => 0),
                        'quote_back' => 'your treats are pleasures, not crutches',
                    ),
                    'D' => array(
                        'text'       => 'It tracks my week: heavy in hard stretches, none when it\'s calm',
                        'w'          => array('A' => 0, 'B' => 0, 'C' => 0, 'D' => 3),
                        'quote_back' => 'your coffee and screen time track how hard the week is',
                    ),
                ),
            ),

            /* =====================================================================
             *  QUESTION 11 of 15
             * ===================================================================== */
            array(
                'q'        => 'What usually happens on the first days of a holiday?',
                'multiple' => false,
                'options'  => array(
                    'A' => array(
                        'text'       => 'It takes me two days to stop checking messages',
                        'w'          => array('A' => 3, 'B' => 0, 'C' => 0, 'D' => 0),
                        'quote_back' => 'it takes you days to stop checking messages on holiday',
                    ),
                    'B' => array(
                        'text'       => 'I get ill, or sleep for days',
                        'w'          => array('A' => 0, 'B' => 3, 'C' => 0, 'D' => 0),
                        'quote_back' => 'you get ill or sleep for days when you finally stop',
                    ),
                    'C' => array(
                        'text'       => 'I drop in quickly and come back refreshed',
                        'w'          => array('A' => 0, 'B' => 0, 'C' => 3, 'D' => 0),
                        'quote_back' => 'you drop into holidays quickly',
                    ),
                    'D' => array(
                        'text'       => 'Bliss one moment, restless the next',
                        'w'          => array('A' => 1, 'B' => 0, 'C' => 0, 'D' => 3),
                        'quote_back' => 'holidays swing between bliss and restlessness',
                    ),
                ),
            ),

            /* =====================================================================
             *  QUESTION 12 of 15
             * ===================================================================== */
            array(
                'q'        => 'Which sounds most like your relationship with rest',
                'multiple' => false,
                'options'  => array(
                    'A' => array(
                        'text'       => 'I feel guilty or anxious when I\'m not doing something',
                        'w'          => array('A' => 3, 'B' => 0, 'C' => 0, 'D' => 0),
                        'quote_back' => 'you feel guilty when you\'re not doing something',
                    ),
                    'B' => array(
                        'text'       => 'I rest all the time and it never seems to land',
                        'w'          => array('A' => 0, 'B' => 3, 'C' => 0, 'D' => 0),
                        'quote_back' => 'rest never seems to land',
                    ),
                    'C' => array(
                        'text'       => 'I\'m good at it. I just want to go deeper',
                        'w'          => array('A' => 0, 'B' => 0, 'C' => 3, 'D' => 0),
                        'quote_back' => 'you\'re good at rest and want to go deeper',
                    ),
                    'D' => array(
                        'text'       => 'I go weeks without it, then shut down completely',
                        'w'          => array('A' => 0, 'B' => 1, 'C' => 0, 'D' => 3),
                        'quote_back' => 'you go weeks without rest, then shut down completely',
                    ),
                ),
            ),

            /* =====================================================================
             *  QUESTION 13 of 15
             * ===================================================================== */
            array(
                'q'        => 'Where do you feel most like yourself?',
                'multiple' => false,
                'options'  => array(
                    'A' => array(
                        'text'       => 'In motion, solving problems',
                        'w'          => array('A' => 3, 'B' => 0, 'C' => 0, 'D' => 0),
                        'quote_back' => 'you feel most yourself in motion',
                    ),
                    'B' => array(
                        'text'       => 'Under a blanket, out of reach',
                        'w'          => array('A' => 0, 'B' => 3, 'C' => 0, 'D' => 0),
                        'quote_back' => 'you feel most yourself under a blanket, out of reach',
                    ),
                    'C' => array(
                        'text'       => 'Outdoors, or anywhere with room to breathe',
                        'w'          => array('A' => 0, 'B' => 0, 'C' => 3, 'D' => 0),
                        'quote_back' => 'you feel most yourself with room to breathe',
                    ),
                    'D' => array(
                        'text'       => 'I\'m still working that out',
                        'w'          => array('A' => 0, 'B' => 1, 'C' => 0, 'D' => 3),
                        'quote_back' => 'you\'re still working out where you feel most yourself',
                    ),
                ),
            ),

            /* =====================================================================
             *  QUESTION 14 of 15
             * ===================================================================== */
            array(
                'q'        => 'What would make the biggest difference to you this month?',
                'multiple' => false,
                'options'  => array(
                    'A' => array(
                        'text'       => 'Getting my mind to switch off',
                        'w'          => array('A' => 3, 'B' => 0, 'C' => 0, 'D' => 0),
                        'quote_back' => 'you want your mind to switch off',
                    ),
                    'B' => array(
                        'text'       => 'Feeling something again: energy, wanting things',
                        'w'          => array('A' => 0, 'B' => 3, 'C' => 0, 'D' => 0),
                        'quote_back' => 'you want to feel something again',
                    ),
                    'C' => array(
                        'text'       => 'A long stretch of uninterrupted time to myself',
                        'w'          => array('A' => 0, 'B' => 0, 'C' => 3, 'D' => 0),
                        'quote_back' => 'you want a long, uninterrupted stretch of time',
                    ),
                    'D' => array(
                        'text'       => 'Feeling like the same person on Monday and Friday',
                        'w'          => array('A' => 0, 'B' => 0, 'C' => 0, 'D' => 3),
                        'quote_back' => 'you want to feel like the same person on Monday and Friday',
                    ),
                ),
            ),

            /* =====================================================================
             *  QUESTION 15 of 15   <- tie-break question (keep single choice)
             * ===================================================================== */
            array(
                'q'        => 'If rest truly worked for you, what would you most like to feel?',
                'multiple' => false,
                'options'  => array(
                    'A' => array(
                        'text'       => 'Calm. My mind finally quiet',
                        'w'          => array('A' => 3, 'B' => 0, 'C' => 0, 'D' => 0),
                        'quote_back' => 'you most want calm',
                    ),
                    'B' => array(
                        'text'       => 'Alive. Lit back up from the inside',
                        'w'          => array('A' => 0, 'B' => 3, 'C' => 0, 'D' => 0),
                        'quote_back' => 'you most want to feel alive again',
                    ),
                    'C' => array(
                        'text'       => 'Spacious. Deep and unhurried, like coming home',
                        'w'          => array('A' => 0, 'B' => 0, 'C' => 3, 'D' => 0),
                        'quote_back' => 'you most want spaciousness',
                    ),
                    'D' => array(
                        'text'       => 'Steady. Grounded whatever the week brings',
                        'w'          => array('A' => 0, 'B' => 0, 'C' => 0, 'D' => 3),
                        'quote_back' => 'you most want to feel steady',
                    ),
                ),
            ),
        ),

        /* ---------------------------------------------------------
         * Page copy — exact from the brief
         * ------------------------------------------------------- */
        'landing' => array(
            'eyebrow' => 'A 3-minute rest quiz',
            'heading' => 'What kind of rest is your body actually asking for?',
            'sub'     => 'You’ve tried resting and still feel tired. That\'s usually because the rest didn\'t match the state you\'re in. Fifteen quick questions about how you\'ve felt over the last two weeks, and we\'ll show you which of four rest types you are and the one practice most likely to land.',
            'cta'     => 'Start the quiz',
            'proof'   => 'Answer for the last two weeks, not your best or worst day. This is a reflection tool, not a medical assessment.',
        ),

        'gate' => array(
            'heading' => 'Your result is ready.',
            'body'    => 'Enter your name and email to see it. Your rest type is free — we\'ll hold onto it if you want the practice and product for your type afterward.',
            'button'  => 'Show me my result',
            'legal'   => 'No noise. One email if you ask for it.',
        ),

        'paywall' => array(
            'line' => 'In the paid version, everything below unlocks for $1 and is also emailed as a PDF.',
        ),

        'disclaimer' => 'This is a reflection tool based on how you\'ve felt recently, not a medical or psychological assessment. If exhaustion or low mood is persistent, please talk to a doctor.',
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
        $n = $i + 1;

        if (!is_array($question['options'] ?? null)) {
            error_log('[stillness-quiz] Question ' . $n . ' has no options array.');
            continue;
        }
        $keys = array_keys($question['options']);
        sort($keys);
        if ($keys !== $valid_keys) {
            error_log('[stillness-quiz] Question ' . $n . ' options must be keyed A,B,C,D. Found: ' . implode(',', $keys));
        }

        if (isset($question['multiple']) && !is_bool($question['multiple'])) {
            error_log('[stillness-quiz] Q' . $n . " 'multiple' must be true or false.");
        }
        if ($n === 15 && !empty($question['multiple'])) {
            error_log('[stillness-quiz] Q15 is the tie-break question; multiple choice there blurs the tie-break.');
        }

        $has_three = false;
        foreach ($valid_keys as $ok) {
            $opt = $question['options'][$ok] ?? null;

            if (!is_array($opt) || !is_string($opt['text'] ?? null) || trim($opt['text']) === '') {
                error_log('[stillness-quiz] Q' . $n . ' option ' . $ok . ' needs a non-empty text.');
                continue;
            }
            if (!is_string($opt['quote_back'] ?? null) || trim($opt['quote_back']) === '') {
                error_log('[stillness-quiz] Q' . $n . ' option ' . $ok . ' needs a non-empty quote_back.');
                continue;
            }
            if (!is_array($opt['w'] ?? null)) {
                error_log('[stillness-quiz] Q' . $n . ' option ' . $ok . ' has no points (w).');
                continue;
            }

            $wkeys = array_keys($opt['w']);
            sort($wkeys);
            if ($wkeys !== $valid_keys) {
                error_log('[stillness-quiz] Q' . $n . ' option ' . $ok . ' weights must be keyed A,B,C,D. Found: ' . implode(',', $wkeys));
            }

            $sum = 0;
            $threes = 0;
            foreach ($valid_keys as $rk) {
                $v = $opt['w'][$rk] ?? null;
                if (!is_int($v) || $v < 0 || $v > 3) {
                    error_log('[stillness-quiz] Q' . $n . ' option ' . $ok . ' weight ' . $rk . ' must be an integer 0-3.');
                    continue;
                }
                $sum += $v;
                if ($v === 3) {
                    $threes++;
                }
            }
            /* Client rule: every choice gives 3 points to one result and 1 at
               most to a second. An option awarding 3 to two results means the
               spreadsheet disagrees with this file. */
            if ($threes > 1) {
                error_log('[stillness-quiz] Q' . $n . ' option ' . $ok . ' gives 3 points to more than one result (check the spreadsheet).');
            }
            if ($threes === 1) {
                $has_three = true;
            }
        }

        if (!$has_three) {
            error_log('[stillness-quiz] Q' . $n . ' is flat: no option gives 3 points to a result.');
        }
    }

    /*
     * WEIGHT PREVIEW - see the header. Appends each option's points to its
     * text, for logged-in admins only, so the scoring can be checked in the
     * real quiz. Set to false to turn it off for everyone.
     */
    $show_weights = true;

    if ($show_weights
        && function_exists('wp_get_current_user')
        && function_exists('current_user_can')
        && current_user_can('manage_options')) {
        foreach ($content['questions'] as $qi => $question) {
            foreach ($question['options'] as $ok => $opt) {
                $w = $opt['w'];
                $content['questions'][$qi]['options'][$ok]['text'] .= sprintf(
                    ' [R1:%d R2:%d R3:%d R4:%d]',
                    $w['A'], $w['B'], $w['C'], $w['D']
                );
            }
        }
    }

    return $content;
}

endif;
