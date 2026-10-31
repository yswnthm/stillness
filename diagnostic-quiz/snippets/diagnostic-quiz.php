/**
 *  Stillness Quiz — Logic
 */
/**
 * Stillness — Diagnostic Quiz: scoring + shortcodes + endpoints
 *
 * PASTE INTO: WordPress → Snippets → Add New → "Code" tab. Run everywhere.
 * Depends on: ../content/quiz-content.php (stillness_quiz_content()).
 *
 * Scoring is a WEIGHTED MATRIX: every option carries a 0-10 weight for each of
 * the four results (see stillness_quiz_content()). Choosing an option adds its
 * weights to all four running totals; the highest total wins. The same rule is
 * inlined in the browser (frontend-assets snippet, score()) as an offline
 * fallback. Change one, change the other.
 *
 * WHAT THIS DOES NOT DO (decided before build, per plan.md):
 *  - No custom database tables. Result is stored as WooCommerce order meta.
 *  - No admin dashboard. Copy lives in stillness_quiz_content().
 *  - No access-management engine. WooCommerce download permissions do the work.
 */

if (!defined('ABSPATH')) {
    exit;
}

/* ==========================================================================
   1. SCORING
   ========================================================================== */

/**
 * Is question $index multiple choice? (content: 'multiple' => true)
 */
function stillness_quiz_is_multiple($index)
{
    $questions = stillness_quiz_content()['questions'];

    return isset($questions[$index]) && !empty($questions[$index]['multiple']);
}

/**
 * Validate one answer. An answer is the chosen option letter(s) as a string:
 * "A" for single choice, "AC" for a multiple-choice question. Returns the
 * sorted list of option keys, or null when invalid (empty, repeated or unknown
 * letter, or several letters on a single-choice question).
 */
function stillness_quiz_selection($value, $multiple)
{
    if (!is_string($value) || $value === '') {
        return null;
    }

    $letters = str_split($value);
    if (count($letters) !== count(array_unique($letters))) {
        return null;
    }
    foreach ($letters as $letter) {
        if (!in_array($letter, array('A', 'B', 'C', 'D'), true)) {
            return null;
        }
    }
    if (!$multiple && count($letters) !== 1) {
        return null;
    }

    sort($letters);

    return $letters;
}

/**
 * True when every question has a valid answer (see stillness_quiz_selection).
 * Guards an empty or partial submission from silently scoring as a result.
 */
function stillness_quiz_is_complete($answers)
{
    if (!is_array($answers)) {
        return false;
    }

    $required = count(stillness_quiz_content()['questions']);

    for ($i = 0; $i < $required; $i++) {
        if (!isset($answers[$i])
            || stillness_quiz_selection($answers[$i], stillness_quiz_is_multiple($i)) === null) {
            return false;
        }
    }

    return true;
}

/**
 * Weight vector for every option, read from the content file.
 * @return array question index => option key (A-D) => result key (A-D) => int
 */
function stillness_quiz_weights()
{
    static $cache = null;
    if ($cache !== null) {
        return $cache;
    }

    $cache = array();
    foreach (stillness_quiz_content()['questions'] as $i => $question) {
        foreach (array('A', 'B', 'C', 'D') as $ok) {
            $w = isset($question['options'][$ok]['w']) && is_array($question['options'][$ok]['w'])
                ? $question['options'][$ok]['w']
                : array();
            foreach (array('A', 'B', 'C', 'D') as $rk) {
                $cache[$i][$ok][$rk] = isset($w[$rk]) ? (int) $w[$rk] : 0;
            }
        }
    }

    return $cache;
}

/**
 * Running totals S[A..D]: add the chosen option's weights, question by
 * question. Questions without a valid answer contribute nothing.
 */
function stillness_quiz_totals($answers)
{
    $totals = array('A' => 0, 'B' => 0, 'C' => 0, 'D' => 0);

    if (!is_array($answers)) {
        return $totals;
    }

    $weights = stillness_quiz_weights();
    foreach ($weights as $i => $options) {
        $picked = isset($answers[$i])
            ? stillness_quiz_selection($answers[$i], stillness_quiz_is_multiple($i))
            : null;
        if ($picked === null) {
            continue;
        }
        // Every ticked option adds its full weight vector.
        foreach ($picked as $ok) {
            foreach ($options[$ok] as $rk => $w) {
                $totals[$rk] += $w;
            }
        }
    }

    return $totals;
}

/**
 * @param array $answers question index (0-based) => chosen option letter(s): "A", or "AC" on a multiple-choice question
 * @return string|null result key, or null if incomplete
 */
function stillness_quiz_score($answers)
{
    if (!stillness_quiz_is_complete($answers)) {
        return null;
    }

    $required = count(stillness_quiz_content()['questions']);
    $tie_break_index = $required - 1;

    $totals = stillness_quiz_totals($answers);

    $max = max($totals);
    if ($max <= 0) {
        // All-zero weights are a content error, never a valid outcome.
        return null;
    }

    $leaders = array_keys(array_filter($totals, function ($v) use ($max) {
        return $v === $max;
    }));

    if (count($leaders) === 1) {
        return $leaders[0];
    }

    // Tie: the option chosen on the final question decides, by ITS weights
    // among the tied leaders. A self-reported intention outranks a dead heat.
    // Still tied: first leader in declaration order (A, B, C, D).
    // On a multiple-choice final question, the ticked options' weights add up.
    $weights = stillness_quiz_weights();
    $final = array('A' => 0, 'B' => 0, 'C' => 0, 'D' => 0);
    $picked = stillness_quiz_selection($answers[$tie_break_index], stillness_quiz_is_multiple($tie_break_index));
    foreach ($picked as $ok) {
        foreach ($weights[$tie_break_index][$ok] as $rk => $w) {
            $final[$rk] += $w;
        }
    }

    $best = $leaders[0];
    foreach ($leaders as $leader) {
        if ($final[$leader] > $final[$best]) {
            $best = $leader;
        }
    }

    return $best;
}

/** Percentage per type (share of the summed totals), for result-page display. */
function stillness_quiz_breakdown($answers)
{
    $totals = stillness_quiz_totals($answers);

    $sum = array_sum($totals);
    $sum = $sum > 0 ? $sum : 1;

    foreach ($totals as $k => $v) {
        $totals[$k] = (int) round(($v / $sum) * 100);
    }

    return $totals;
}

/* ==========================================================================
   1b. PRODUCT RESOLUTION
   Map result type -> Woo variation id at runtime, so the content file never
   hardcodes an ID that changes if the product is re-imported.
   ========================================================================== */

/**
 * Resolve the Woo variation id for each result type.
 * Expects a variable product named "Diagnostic Prescription" with variations
 * whose attribute is the result key (A/B/C/D).
 */
function stillness_quiz_variation_ids()
{
    static $cache = null;
    if ($cache !== null) {
        return $cache;
    }

    $ids = array('A' => 0, 'B' => 0, 'C' => 0, 'D' => 0);

    if (!function_exists('wc_get_products')) {
        return $cache = $ids;
    }

    $products = wc_get_products(array(
        'limit' => 1,
        'type' => 'variable',
        'sku' => 'stillness-diagnostic-prescription',
        'return' => 'objects',
    ));

    if (empty($products)) {
        return $cache = $ids;
    }

    $product = reset($products);

    foreach ($product->get_children() as $variation_id) {
        $variation = wc_get_product($variation_id);
        if (!$variation) {
            continue;
        }
        foreach ($variation->get_attributes() as $name => $value) {
            $key = strtoupper(sanitize_text_field($value));
            if (isset($ids[$key]) && !$ids[$key]) {
                $ids[$key] = (int) $variation_id;
            }
        }
    }

    return $cache = $ids;
}

/* ==========================================================================
   2. ASSETS

   Three separate Code Snippets entries ship this quiz:
     1. content/quiz-content.php   -> "Add Snippet" / PHP   (copy + questions)
     2. snippets/diagnostic-quiz.php -> "Add Snippet" / PHP (this file)
     3. snippets/quiz-frontend.js   -> "Add Snippet" / JS    (interface)
     4. snippets/quiz-frontend.css  -> "Add Snippet" / CSS   (styles)

   Code Snippets cannot read files off disk, so entries 3 and 4 are pasted
   verbatim. That is the same deployment model as the newsletter override
   CSS in work/hotfix-2026-10-03-website-fixes.md — which is precisely why
   that one is page-scoped and broke. Quiz CSS goes global, in its own snippet.
   ========================================================================== */

/* No enqueue needed. Entries 3 and 4 are JS/CSS snippets and output themselves.
   Left here as the hook point if the quiz ever needs a versioned file. */

/* ==========================================================================
   3. SHORTCODE — [stillness_quiz]
   Renders the full interactive experience: quiz -> gate -> result.
   One shortcode, because the states are sequential and share state in JS.
   ========================================================================== */

add_shortcode('stillness_quiz', 'stillness_quiz_render');

function stillness_quiz_render($atts = array())
{
    $content = stillness_quiz_content();

    // Resolve type -> variation id at runtime so the content file stays
    // free of database IDs that drift on re-import.
    $variation_ids = stillness_quiz_variation_ids();
    $types = $content['types'];
    foreach ($types as $key => $type) {
        $types[$key]['variation_id'] = isset($variation_ids[$key]) ? $variation_ids[$key] : 0;
    }

    // Hand questions to the browser so copy lives in PHP only.
    $payload = wp_json_encode(array(
        'questions' => array_map(function ($q) {
            // 'o' = option text (what the visitor sees). 'w' = weights, used
            // only by the browser's offline-fallback score(). The server
            // result always wins when the request succeeds.
            $o = array();
            $w = array();
            foreach ($q['options'] as $k => $opt) {
                $o[$k] = is_array($opt) ? $opt['text'] : (string) $opt;
                $w[$k] = is_array($opt) && isset($opt['w']) ? $opt['w'] : new stdClass();
            }
            // 'm' = multiple choice (tick several) vs pick one.
            return array('q' => $q['q'], 'm' => !empty($q['multiple']), 'o' => $o, 'w' => $w);
        }, $content['questions']),
        'types' => $types,
        'gate' => $content['gate'],
    ));

    // Checkout target: the variable product. Fall back to cart so the CTA
    // still lands somewhere sane if the SKU is missing.
    $checkout_url = function_exists('wc_get_checkout_url') ? wc_get_checkout_url() : home_url('/');

    /*
     * Cart endpoint. Verified against WC_AJAX::add_to_cart (WooCommerce trunk,
     * class-wc-ajax.php): posting product_id = the VARIATION id makes Woo set
     * $variation_id = $product_id, reparent it, and read the attributes off the
     * variation object itself. No attribute slugs are needed, so nothing here
     * depends on the import naming. Registered nopriv, no nonce required.
     */
    $cart_url = add_query_arg('wc-ajax', 'add_to_cart', home_url('/'));

    // Inline, not enqueued: the JS snippet (entry 3) reads these globals.
    // Kept adjacent to the markup so payload and shortcode cannot drift.
    // Rest + nonce together, so one place to look for the request config.
    $inline = 'window.STILLNESS_QUIZ = ' . $payload . ';'
        . 'window.STILLNESS_QUIZ_REST = ' . wp_json_encode(
            esc_url_raw(rest_url('stillness-quiz/v1/submit'))
        ) . ';'
        . 'window.STILLNESS_QUIZ_NONCE = ' . wp_json_encode(
            wp_create_nonce('stillness_quiz_submit')
        ) . ';'
        . 'window.STILLNESS_QUIZ.checkout_url = ' . wp_json_encode($checkout_url) . ';'
        . 'window.STILLNESS_QUIZ.cart_url = ' . wp_json_encode(
            esc_url_raw($cart_url)
        ) . ';';

    ob_start();
    ?>
    <div class="stillness-quiz" id="stillness-quiz" data-state="landing">
      <noscript>
        <p>This experience needs JavaScript. Please reach us directly and we will
        walk you through it by hand.</p>
      </noscript>
    </div>
    <script><?php echo $inline; // wp_json_encode output, safe to inline ?></script>
    <?php
    return ob_get_clean();
}

/* ==========================================================================
   4. ENDPOINT — capture the lead, tag the contact, hand back the result
   POST /?rest_route=/stillness-quiz/v1/submit  (public, nonce-checked)
   ========================================================================== */

add_action('rest_api_init', 'stillness_quiz_register_routes');

function stillness_quiz_register_routes()
{
    register_rest_route('stillness-quiz/v1', '/submit', array(
        'methods' => 'POST',
        'permission_callback' => '__return_true', // public form; nonce is the guard
        'callback' => 'stillness_quiz_handle_submit',
        'args' => array(
            'name' => array('required' => true, 'sanitize_callback' => 'sanitize_text_field'),
            'email' => array('required' => true, 'sanitize_callback' => 'sanitize_email'),
            'answers' => array('required' => true, 'type' => 'array'),
            'nonce' => array('required' => true),
        ),
    ));
}

function stillness_quiz_handle_submit(WP_REST_Request $request)
{
    if (!wp_verify_nonce($request->get_param('nonce'), 'stillness_quiz_submit')) {
        return new WP_Error('invalid_nonce', 'Session expired. Please retake the diagnostic.', array('status' => 403));
    }

    $name = $request->get_param('name');
    $email = $request->get_param('email');
    $raw = (array) $request->get_param('answers');

    // Normalise: keep only a question index holding option letters A-D, as one
    // string ("A", or "AC" for multiple choice), sorted. Whether the number of
    // letters is allowed for that question is enforced in stillness_quiz_score().
    $answers = array();
    foreach ($raw as $key => $value) {
        $index = (int) $key;
        if ($index < 0 || !is_string($value)) {
            continue;
        }
        $value = strtoupper(sanitize_text_field($value));
        if (preg_match('/^[ABCD]{1,4}$/', $value)) {
            $letters = array_unique(str_split($value));
            sort($letters);
            $answers[$index] = implode('', $letters);
        }
    }

    $result = stillness_quiz_score($answers);

    if (!$result) {
        return new WP_Error('incomplete', 'Please answer all fifteen questions.', array('status' => 400));
    }

    $breakdown = stillness_quiz_breakdown($answers);
    $type = stillness_quiz_content()['types'][$result];

    /*
     * Tag the contact. MailerLite first (Option 1 promise: the lead AND the
     * result are captured in the email platform, not just on the site).
     */
    stillness_quiz_tag_contact($email, $name, $result, $type['tagline']);

    /*
     * Order meta comes later, at checkout — WooCommerce does not have an order
     * to attach to at this point. See Section 5.
     */

    return new WP_REST_Response(array(
        'success' => true,
        'result' => $result,
        'breakdown' => $breakdown,
        'type' => $type,
        'message' => 'Result ready.',
    ), 200);
}

/**
 * Push the subscriber to MailerLite with the result type as a tag.
 * Fails soft — a MailerLite outage must not block someone seeing their result.
 */
function stillness_quiz_tag_contact($email, $name, $result_key, $tagline)
{
    $api_key = defined('STILLNESS_MAILERLITE_KEY') ? STILLNESS_MAILERLITE_KEY : '';

    if (!$api_key) {
        // Not configured yet. Log once so a missed setup is visible, not silent.
        error_log('[stillness-quiz] MailerLite key not set. Lead not tagged: ' . $email);
        return false;
    }

    $group_id = defined('STILLNESS_MAILERLITE_GROUP') ? STILLNESS_MAILERLITE_GROUP : '';

    $subscriber = array(
        'email' => $email,
        'fields' => array(
            'name' => $name,
        ),
        'tags' => array('quiz-type-' . strtolower($result_key), $tagline),
    );

    $url = 'https://connect.mailerlite.com/api/subscribers';
    if ($group_id) {
        $url .= '?group_id=' . rawurlencode($group_id);
    }

    $response = wp_remote_post($url, array(
        'timeout' => 8,
        'headers' => array(
            'Authorization' => 'Bearer ' . $api_key,
            'Content-Type' => 'application/json',
        ),
        'body' => wp_json_encode($subscriber),
    ));

    if (is_wp_error($response)) {
        error_log('[stillness-quiz] MailerLite request failed: ' . $response->get_error_message());
        return false;
    }

    $code = (int) wp_remote_retrieve_response_code($response);
    $body = wp_remote_retrieve_body($response);

    if ($code >= 200 && $code < 300) {
        return true;
    }

    /*
     * 400 is the ambiguous one. MailerLite returns it both for "already
     * subscribed" (harmless — they are in the list, which is all we wanted)
     * and for a payload we got wrong (an invalid email, a rejected tag).
     * Treating every 400 as success was hiding the second case behind the
     * first, so the response body decides: duplicate is fine, anything else
     * is logged as a real failure.
     */
    if ($code === 400 && preg_match('/already|exist|duplicate/i', (string) $body)) {
        return true;
    }

    error_log('[stillness-quiz] MailerLite returned ' . $code . ' for ' . $email . ' | ' . wp_html_excerpt(wp_strip_all_tags($body), 200, ''));

    return false;
}

/* Nonce is printed inside the shortcode markup alongside the payload. */

/* ==========================================================================
   5. ORDER META — bind result to the order at checkout
   ========================================================================== */

/**
 * Carry the result type and raw answers from the checkout session onto the order.
 *
 * This is the whole forward-compatibility story. Once the order holds the
 * result, the future $1 paywall is a URL read, not a rebuild:
 *   /quiz-result/?order=123&key=wc_order_abc
 * reads the order, sees it is paid, and reveals the prescription.
 */
add_action('woocommerce_checkout_create_order', 'stillness_quiz_bind_order', 10, 2);

function stillness_quiz_bind_order($order, $data)
{
    if (empty($_POST['stillness_quiz_result'])) {
        return;
    }

    $result = strtoupper(sanitize_text_field(wp_unslash($_POST['stillness_quiz_result'])));
    $answers = isset($_POST['stillness_quiz_answers'])
        ? sanitize_text_field(wp_unslash($_POST['stillness_quiz_answers']))
        : '';

    if (in_array($result, array('A', 'B', 'C', 'D'), true)) {
        $order->update_meta_data('_stillness_quiz_result', $result);
        if ($answers !== '') {
            $order->update_meta_data('_stillness_quiz_answers', $answers);
        }
        // Also log it on the order so staff can see it at a glance.
        $order->add_order_note(sprintf(
            'Diagnostic quiz result: %s (%s)',
            $result,
            stillness_quiz_content()['types'][$result]['tagline']
        ));
    }
}

/**
 * Put the hidden fields on the checkout form.
 *
 * NOT via the woocommerce_checkout_fields filter. That filter only defines
 * fields; WooCommerce never renders the 'order' fieldset — templates/checkout/
 * form-checkout.php loops woocommerce_checkout_billing and
 * woocommerce_checkout_shipping and nothing loops 'order'. Fields added there
 * exist in the config and nowhere in the DOM, so $_POST would never carry the
 * result and woocommerce_checkout_create_order would bind nothing, silently.
 *
 * This action fires inside the <form>, ahead of #order_review, and outside the
 * region woocommerce's update_order_review AJAX replaces — so the inputs are
 * present at submit time and are not wiped by a totals refresh.
 */
add_action('woocommerce_checkout_before_order_review', 'stillness_quiz_checkout_fields');

function stillness_quiz_checkout_fields()
{
    ?>
    <input type="hidden" id="stillness_quiz_result" name="stillness_quiz_result" value="">
    <input type="hidden" id="stillness_quiz_answers" name="stillness_quiz_answers" value="">
    <?php
}

/* ==========================================================================
   6. UNLOCK — read the result back on a paid order
   ========================================================================== */

/**
 * True when the current request points at a genuinely paid order.
 *
 * Security note, non-negotiable: the order key is required, must match, and
 * must belong to the order. A matching key alone is not proof of payment —
 * the order status is checked too. Never gate paid content on the key alone.
 */
function stillness_quiz_has_paid_access($order_id, $order_key)
{
    $order_id = absint($order_id);
    $order_key = sanitize_text_field($order_key);

    if (!$order_id || !$order_key) {
        return false;
    }

    $order = wc_get_order($order_id);

    if (!$order || $order->get_order_key() !== $order_key) {
        return false;
    }

    if (!$order->is_paid()) {
        return false;
    }

    return (bool) $order->get_meta('_stillness_quiz_result');
}

/**
 * Result for a given order, or null.
 */
function stillness_quiz_order_result($order_id, $order_key)
{
    if (!stillness_quiz_has_paid_access($order_id, $order_key)) {
        return null;
    }

    $order = wc_get_order($order_id);
    $key = $order->get_meta('_stillness_quiz_result');

    return in_array($key, array('A', 'B', 'C', 'D'), true)
        ? stillness_quiz_content()['types'][$key]
        : null;
}

/**
 * Secure, per-order URL for the WordPress result page.
 *
 * The default matches the launch-page slug in QA.md. A site-specific constant
 * can override it without editing this snippet:
 * define('STILLNESS_QUIZ_RESULT_URL', 'https://example.com/your-prescription/');
 */
function stillness_quiz_result_url($order)
{
    if (!$order || !is_a($order, 'WC_Order')) {
        return '';
    }

    $result = $order->get_meta('_stillness_quiz_result');
    if (!in_array($result, array('A', 'B', 'C', 'D'), true)) {
        return '';
    }

    $base_url = defined('STILLNESS_QUIZ_RESULT_URL')
        ? STILLNESS_QUIZ_RESULT_URL
        : home_url('/your-prescription/');

    return add_query_arg(array(
        'order' => $order->get_id(),
        'key' => $order->get_order_key(),
    ), $base_url);
}

/**
 * Give the customer an immediate route to the result after payment. The
 * shortcode validates both the order key and paid status before rendering.
 */
add_action('woocommerce_thankyou', 'stillness_quiz_render_thankyou_link', 20);

function stillness_quiz_render_thankyou_link($order_id)
{
    $order = wc_get_order($order_id);
    if (!$order || !$order->is_paid()) {
        return;
    }

    $url = stillness_quiz_result_url($order);
    if (!$url) {
        return;
    }

    printf(
        '<p class="stillness-quiz-order-link"><a href="%s">%s</a></p>',
        esc_url($url),
        esc_html__('Open your personalized prescription', 'stillness')
    );
}

/**
 * Include the same secure route in customer WooCommerce emails. This prevents
 * a guest purchaser from losing access after they leave the thank-you page.
 */
add_action('woocommerce_email_after_order_table', 'stillness_quiz_add_email_link', 20, 4);

function stillness_quiz_add_email_link($order, $sent_to_admin, $plain_text, $email)
{
    if ($sent_to_admin || !$order || !$order->is_paid()) {
        return;
    }

    $url = stillness_quiz_result_url($order);
    if (!$url) {
        return;
    }

    if ($plain_text) {
        echo "\n" . esc_html__('Open your personalized prescription:', 'stillness') . "\n" . esc_url($url) . "\n";
        return;
    }

    printf(
        '<p><a href="%s">%s</a></p>',
        esc_url($url),
        esc_html__('Open your personalized prescription', 'stillness')
    );
}

/**
 * Shortcode: [stillness_quiz_result]
 *
 * Standalone result page. Takes the order reference from the query string
 * (?order=ID&key=WC_ORDER_KEY) because the link is emailed as a plain URL and
 * cannot carry shortcode attributes. Attributes are kept as an override so the
 * page can be previewed with ?type=A during review.
 *
 * Renders the locked teaser with a purchase CTA when the order is unpaid, and
 * the full prescription when it is paid.
 */
add_shortcode('stillness_quiz_result', 'stillness_quiz_render_result');

function stillness_quiz_render_result($atts)
{
    $atts = shortcode_atts(array(
        'order_id' => 0,
        'order_key' => '',
    ), $atts, 'stillness_quiz_result');

    // Query string wins: that is how the emailed link arrives.
    if (isset($_GET['order'])) {
        $atts['order_id'] = sanitize_text_field(wp_unslash($_GET['order']));
    }
    if (isset($_GET['key'])) {
        $atts['order_key'] = sanitize_text_field(wp_unslash($_GET['key']));
    }

    $order_id = absint($atts['order_id']);
    $has_access = stillness_quiz_has_paid_access($order_id, $atts['order_key']);
    $type = $has_access
        ? stillness_quiz_order_result($order_id, $atts['order_key'])
        : null;

    /*
     * Preview path: ?type=A shows a branch without a paid order, so copy and
     * layout can be reviewed before launch.
     *
     * GATED ON manage_options. Without this, anyone typing /quiz-result/?type=A
     * reads the paid prescription for free — the preview becomes a paywall
     * bypass. A customer link always carries order + key and never needs it.
     */
    if (!$type && isset($_GET['type']) && !isset($_GET['order'])
        && current_user_can('manage_options')) {
        $preview = strtoupper(sanitize_text_field(wp_unslash($_GET['type'])));
        if (in_array($preview, array('A', 'B', 'C', 'D'), true)) {
            $type = stillness_quiz_content()['types'][$preview];
        }
    }

    if (!$type) {
        return stillness_quiz_render_prescription(array(
            'order_id' => $order_id,
            'order_key' => $atts['order_key'],
        ));
    }

    $payload = wp_json_encode(array(
        'questions' => array(),
        'types' => stillness_quiz_content()['types'],
        'gate' => array(),
        'type' => $type,
        'unlocked' => (bool) $has_access,
        // Shipped so JS can print the same per-order links the server would.
        'downloads' => $has_access ? stillness_quiz_downloads($order_id) : '',
        'checkout_url' => function_exists('wc_get_checkout_url')
            ? wc_get_checkout_url()
            : home_url('/'),
    ));

    ob_start();
    ?>
    <div class="stillness-quiz" id="stillness-quiz-result"
         data-result="<?php echo esc_attr($type['name']); ?>">
      <script>window.STILLNESS_QUIZ = <?php echo $payload; /* JSON, escaped by wp_json_encode */ ?>;</script>
      <div id="stillness-quiz"></div>
    </div>
    <?php
    return ob_get_clean();
}

/**
 * Shortcode: [stillness_quiz_prescription order_id="123" order_key="wc_order_abc"]
 * Renders the unlocked prescription. Shows nothing if the order is unpaid,
 * missing, or the key is wrong.
 */
add_shortcode('stillness_quiz_prescription', 'stillness_quiz_render_prescription');

/**
 * Downloads for a paid order, as HTML. Empty string when there are none.
 *
 * Deliberately NOT a bare /my-account/downloads link. Guest checkout is the
 * norm, a guest has no account to log into, so that URL dead-ends on a login
 * wall and the thing they paid for becomes unreachable. WooCommerce's
 * per-order download URLs carry the order key and work signed out, so they
 * are used whenever they exist. The account link is only the fallback for a
 * shopper who did create an account.
 *
 * Shared by [stillness_quiz_result] (shipped in the JSON payload, rendered by
 * JS) and [stillness_quiz_prescription] (rendered server-side) so the two can
 * never disagree about where the customer's files are.
 */
function stillness_quiz_downloads($order_id)
{
    $download_html = '';
    $order = $order_id ? wc_get_order(absint($order_id)) : false;

    if ($order && is_callable(array($order, 'get_downloadable_items'))) {
        foreach ($order->get_downloadable_items() as $item) {
            if (empty($item['download_url'])) {
                continue;
            }
            $download_html .= sprintf(
                '<li><a href="%s" download>%s</a></li>',
                esc_url($item['download_url']),
                esc_html(!empty($item['name']) ? $item['name'] : 'Download')
            );
        }
    }

    if ($download_html) {
        return '<div class="stillness-quiz-downloads">'
            . '<h3>Your downloads</h3><ul>' . $download_html . '</ul>'
            . '<p class="stillness-quiz-downloads-note">We have also emailed these links, '
            . 'so they are yours to keep.</p></div>';
    }

    $account_url = function_exists('wc_get_account_endpoint_url')
        ? wc_get_account_endpoint_url('downloads')
        : home_url('/my-account/');

    return '<p class="stillness-quiz-downloads">Your audio practices, workbooks '
        . 'and links are in <a href="' . esc_url($account_url)
        . '">your account downloads</a>, or use the download links in your '
        . 'confirmation email.</p>';
}

function stillness_quiz_render_prescription($atts)
{
    $atts = shortcode_atts(array(
        'order_id' => 0,
        'order_key' => '',
    ), $atts, 'stillness_quiz_prescription');

    $type = stillness_quiz_order_result($atts['order_id'], $atts['order_key']);

    if (!$type) {
        return '<p class="stillness-quiz-locked">This prescription link is not active yet.
                If you have paid, check the link in your confirmation email.</p>';
    }

    $downloads = stillness_quiz_downloads($atts['order_id']);

    $practices = '';
    foreach ($type['practices'] as $i => $practice) {
        $practices .= sprintf(
            '<li><strong>%s</strong><span>%s</span></li>',
            esc_html($practice['title']),
            esc_html($practice['detail'])
        );
    }

    ob_start();
    ?>
    <div class="stillness-quiz-prescription" data-type="<?php echo esc_attr($type['name']); ?>">
      <p class="stillness-quiz-tagline"><?php echo esc_html($type['tagline']); ?></p>
      <h2><?php echo esc_html($type['name']); ?></h2>
      <p><?php echo esc_html($type['short']); ?></p>

      <div class="stillness-quiz-practices">
        <h3>Where to begin</h3>
        <p><?php echo esc_html($type['intro']); ?></p>
        <ol><?php echo $practices; /* pre-escaped above */ ?></ol>
      </div>

      <?php echo $downloads; /* built above: per-order links, or account fallback */ ?>
    </div>
    <?php
    return ob_get_clean();
}
