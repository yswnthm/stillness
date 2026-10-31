<?php

use Stillness\Packages\Admin;
use Stillness\Packages\Emails;
use Stillness\Packages\Gift_Fields;
use Stillness\Packages\Memberships;
use Stillness\Packages\Plans;
use Stillness\Packages\Plugin;
use Stillness\Packages\Reminders;
use Stillness\Packages\Sessions;
use Stillness\Packages\Settings;

if (!defined('ABSPATH')) {
    require '/wordpress/wp-load.php';
}

require_once ABSPATH . 'wp-admin/includes/template.php';
require_once ABSPATH . 'wp-admin/includes/plugin.php';

error_reporting(E_ALL);
ob_start();

$GLOBALS['t_total'] = 0;
$GLOBALS['t_fail'] = 0;
$GLOBALS['t_mail'] = [];

register_shutdown_function(function (): void {
    $output = ob_get_level() > 0 ? (string) ob_get_clean() : '';
    $error = error_get_last();

    if ($error && in_array($error['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR], true)) {
        $output .= "\nFATAL: " . $error['message'] . " in " . $error['file'] . ':' . $error['line'] . "\n";
    }

    file_put_contents('/mnt/test-output.txt', $output);
    echo $output;
});

add_filter('pre_wp_mail', function ($return, $atts) {
    $subject = (string) ($atts['subject'] ?? '');
    $message = (string) ($atts['message'] ?? '');

    if (! str_contains($subject, 'Stillness') && ! str_contains($message, 'Stillness')) {
        return $return;
    }

    $GLOBALS['t_mail'][] = $atts;
    return true;
}, 10, 2);

class T_Die extends \Exception {
    public function __construct($message) {
        if ($message instanceof \WP_Error) {
            $message = $message->get_error_message();
        }

        parent::__construct((string) $message);
    }
}

class T_Redirect extends \Exception {
    public string $location;

    public function __construct(string $location) {
        $this->location = $location;
        parent::__construct($location);
    }
}

function t_check(string $label, bool $ok, string $detail = ''): void {
    $GLOBALS['t_total']++;

    if ($ok) {
        echo "ok   {$label}\n";
        file_put_contents('/mnt/test-result.txt', "ok   {$label}\n", FILE_APPEND);
        return;
    }

    $GLOBALS['t_fail']++;
    echo "FAIL {$label}" . ($detail !== '' ? " :: {$detail}" : '') . "\n";
    file_put_contents('/mnt/test-result.txt', "FAIL {$label}" . ($detail !== '' ? " :: {$detail}" : '') . "\n", FILE_APPEND);
}

function t_same(string $label, $expected, $actual): void {
    t_check($label, $expected === $actual, 'expected ' . var_export($expected, true) . ' got ' . var_export($actual, true));
}

function t_contains(string $label, string $needle, string $haystack): void {
    t_check($label, str_contains($haystack, $needle), 'missing ' . var_export($needle, true));
}

function t_not_contains(string $label, string $needle, string $haystack): void {
    t_check($label, !str_contains($haystack, $needle), 'unexpected ' . var_export($needle, true));
}

function t_mails(): array {
    return $GLOBALS['t_mail'];
}

function t_mail_count(): int {
    return count($GLOBALS['t_mail']);
}

function t_last_mail(): array {
    $mails = t_mails();
    return $mails ? $mails[count($mails) - 1] : [];
}

function t_reset_mail(): void {
    $GLOBALS['t_mail'] = [];
}

function t_product(string $sku, string $name, string $price, string $plan, int $total): int {
    $existing = wc_get_product_id_by_sku($sku);

    if ($existing) {
        return (int) $existing;
    }

    $product = new \WC_Product_Simple();
    $product->set_name($name);
    $product->set_sku($sku);
    $product->set_regular_price($price);
    $product->set_status('publish');
    $product->set_catalog_visibility('visible');
    $product->update_meta_data(Plugin::META_PLAN, $plan);
    $product->update_meta_data('_stillness_attendances', $total);
    $product->save();

    return (int) $product->get_id();
}

function t_order(int $product_id, string $email, string $first = 'Test', string $status = 'pending'): \WC_Order {
    $order = wc_create_order(['status' => $status]);

    if (! $order instanceof \WC_Order) {
        throw new \RuntimeException('Could not create order.');
    }

    $product = wc_get_product($product_id);

    if (! $product instanceof \WC_Product) {
        throw new \RuntimeException('Could not load product.');
    }

    $order->add_product($product, 1);
    $order->set_billing_email($email);
    $order->set_billing_first_name($first);
    $order->set_billing_last_name('');
    $order->calculate_totals();
    $order->save();

    return wc_get_order($order->get_id());
}

function t_add_product(\WC_Order $order, int $product_id, int $quantity = 1) {
    $product = wc_get_product($product_id);

    if (! $product instanceof \WC_Product) {
        throw new \RuntimeException('Could not load product.');
    }

    $item_id = $order->add_product($product, $quantity);
    return $order->get_item($item_id);
}

function t_reload(\WC_Order $order): \WC_Order {
    return wc_get_order($order->get_id());
}

function t_item(\WC_Order $order, int $product_id) {
    foreach ($order->get_items() as $item) {
        if ($item instanceof \WC_Order_Item_Product && (int) $item->get_product_id() === $product_id) {
            return $item;
        }
    }

    return null;
}

function t_set_gift($item, string $name, string $email): void {
    $item->update_meta_data(Plugin::META_IS_GIFT, 1);
    $item->update_meta_data(Plugin::META_MEMBER_NAME, $name);
    $item->update_meta_data(Plugin::META_MEMBER_EMAIL, $email);
    $item->save();
}

function t_future_settings(): void {
    $input = Settings::defaults();
    $dates = [
        '2030-01-15', '2030-02-19', '2030-03-19', '2030-04-16',
        '2030-05-21', '2030-06-18', '2030-07-16', '2030-08-20',
        '2030-09-17', '2030-10-15', '2030-11-19', '2030-12-17',
    ];

    foreach ($input['sessions'] as $index => &$session) {
        $session['date'] = $dates[$index];
        $session['start'] = '18:30';
        $session['end'] = '21:30';
        $session['venue'] = 'The Stillness Room';
    }

    unset($session);

    $input['calendar_url'] = 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Stillness';
    $input['batch_window'] = 30;

    Settings::update($input);
}

function t_render(callable $callback): string {
    ob_start();

    try {
        $callback();
    } catch (\Throwable $error) {
        ob_end_clean();
        throw $error;
    }

    return (string) ob_get_clean();
}

function t_capture_die(callable $callback): string {
    $filter = function () {
        return function ($message) {
            throw new T_Die($message);
        };
    };

    add_filter('wp_die_handler', $filter);
    $message = '';

    try {
        $callback();
    } catch (T_Die $error) {
        $message = $error->getMessage();
    } finally {
        remove_filter('wp_die_handler', $filter);
    }

    return $message;
}

function t_capture_redirect(callable $callback): string {
    $filter = function ($location) {
        throw new T_Redirect((string) $location);
    };

    add_filter('wp_redirect', $filter);
    $location = '';

    try {
        $callback();
    } catch (T_Redirect $error) {
        $location = $error->location;
    } finally {
        remove_filter('wp_redirect', $filter);
    }

    return $location;
}

echo "\n-- environment --\n";

t_check('WooCommerce loaded', class_exists('WooCommerce'));
t_check('Code Snippets loaded', function_exists('code_snippets\\save_snippet'));
t_check('Plugin class loaded', class_exists(Plugin::class));
t_check('WooCommerce version', defined('WC_VERSION'), defined('WC_VERSION') ? WC_VERSION : 'missing');

$admin = get_user_by('id', 1);

if ($admin) {
    $admin->add_cap('manage_woocommerce');
    wp_set_current_user(1);
}

t_check('Admin user available', $admin instanceof \WP_User);

echo "\n-- activation and settings --\n";

Plugin::activate();
t_check('Settings option exists', is_array(get_option(Plugin::SETTINGS_OPTION)));
t_same('Version option', Plugin::VERSION, get_option(Plugin::VERSION_OPTION));
t_same('Default session count', 12, count(Settings::defaults()['sessions']));

t_future_settings();
$sessions = Sessions::all();
$s01 = Sessions::get('s01');

t_same('Twelve sessions', 12, count($sessions));
t_check('s01 exists', is_array($s01));
t_check('s01 has date', Sessions::has_date($s01));
t_contains('s01 label has date', '2030', Sessions::label($s01));
t_check('s01 not past', ! Sessions::is_past($s01));
t_check('s01 end timestamp is future', Sessions::timestamp_end($s01) > time());
t_check('next session is s01', Sessions::next()['id'] === 's01');
t_check('not all sessions past', ! Sessions::all_past());
t_contains('calendar url stored', 'calendar.google.com', Settings::google_calendar_url());
t_same('batch window', 30, Settings::batch_window());

$input = Settings::defaults();
$input['sessions'][0]['date'] = 'not-a-date';
$input['sessions'][0]['start'] = '99:99';
$input['sessions'][0]['end'] = 'nope';
$input['batch_window'] = 999;
$clean = Settings::update($input);

t_same('invalid date cleared', '', $clean['sessions'][0]['date']);
t_same('invalid start cleared', '', $clean['sessions'][0]['start']);
t_same('invalid end cleared', '', $clean['sessions'][0]['end']);
t_same('invalid window reset', 30, $clean['batch_window']);

$input = Settings::defaults();
$input['calendar_url'] = 'javascript:alert(1)';
$input['batch_window'] = 600;
$clean = Settings::update($input);
t_same('unsafe calendar url removed', '', $clean['calendar_url']);
t_same('valid window kept', 600, $clean['batch_window']);

t_future_settings();

echo "\n-- products --\n";

$annual = t_product('mens-annual', 'Founding Member', '480', 'mens-annual', 12);
$six = t_product('mens-six-month', 'Six Month Package', '270', 'mens-six-month', 6);
$single = t_product('mens-single', 'Single Evening', '55', 'mens-single', 1);
$gift_annual = t_product('mens-gift-annual', 'Gift Annual', '480', 'mens-gift-annual', 12);
$gift_single = t_product('mens-gift-single', 'Gift Single', '55', 'mens-gift-single', 1);

t_same('annual plan from product', 'mens-annual', Plans::for_product($annual));
t_same('six month plan from product', 'mens-six-month', Plans::for_product($six));
t_same('single plan from product', 'mens-single', Plans::for_product($single));
t_same('gift annual plan from product', 'mens-gift-annual', Plans::for_product($gift_annual));
t_same('gift single plan from product', 'mens-gift-single', Plans::for_product($gift_single));
t_same('annual attendances', 12, Plans::attendances('mens-annual'));
t_same('six month attendances', 6, Plans::attendances('mens-six-month'));
t_same('single attendances', 1, Plans::attendances('mens-single'));
t_check('gift annual is gift', Plans::is_gift('mens-gift-annual'));
t_check('annual is not gift', ! Plans::is_gift('mens-annual'));
t_same('SKU lookup', 'mens-annual', Plans::key_from_sku('mens-annual'));
t_check('unknown SKU rejected', Plans::key_from_sku('not-a-plan') === null);
t_same('unknown product rejected', null, Plans::for_product(999999));

$_REQUEST['add-to-cart'] = 'mens-annual';
Plugin::resolve_sku_add_to_cart();
t_same('SKU add-to-cart resolved', (string) $annual, (string) $_REQUEST['add-to-cart']);
unset($_REQUEST['add-to-cart'], $_GET['add-to-cart']);

echo "\n-- automatic memberships --\n";

t_reset_mail();
$annual_order = t_order($annual, 'annual@example.test', 'Annual Buyer');
$annual_item = t_item($annual_order, $annual);

t_check('annual item exists', $annual_item instanceof \WC_Order_Item_Product);
t_same('pending order has no membership', 0, (int) $annual_item->get_meta(Plugin::META_CREATED));
t_check('create_for_order rejects pending', ! Memberships::create_for_order($annual_order));
t_same('no email for pending order', 0, t_mail_count());

$annual_order->update_status('processing', 'Test payment.');
$annual_order = t_reload($annual_order);
$annual_item = t_item($annual_order, $annual);

t_check('annual membership created', (int) $annual_item->get_meta(Plugin::META_CREATED) > 0);
t_same('annual member email', 'annual@example.test', (string) $annual_item->get_meta(Plugin::META_MEMBER_EMAIL));
t_same('annual total', 12, Plans::total_for_item($annual_item));
t_same('annual remaining', 12, Memberships::remaining($annual_item));
t_same('annual used', 0, Memberships::used($annual_item));
t_same('annual status', 'active', Memberships::status($annual_order, $annual_item));
t_same('welcome email count', 1, t_mail_count());
t_same('welcome recipient', 'annual@example.test', t_last_mail()['to'] ?? '');
t_same('welcome subject', 'Welcome to Stillness', t_last_mail()['subject'] ?? '');
t_contains('welcome body has evenings', 'Your evenings', t_last_mail()['message'] ?? '');
t_contains('welcome body has plan', 'a year of Stillness', t_last_mail()['message'] ?? '');
t_contains('welcome body has calendar', 'calendar.google.com', t_last_mail()['message'] ?? '');
t_contains('welcome headers are html', 'text/html', implode("\n", (array) (t_last_mail()['headers'] ?? [])));
t_contains('welcome note added', 'Stillness membership created', implode("\n", array_map(static fn ($note) => $note->content, wc_get_order_notes(['order_id' => $annual_order->get_id()]))));
t_same('order has membership meta', 1, (int) $annual_order->get_meta(Plugin::META_HAS_MEMBERSHIP));

$before = t_mail_count();
t_check('duplicate create is false', ! Memberships::create_for_order($annual_order));
t_same('duplicate create sends nothing', $before, t_mail_count());

$all = Memberships::all_items(true, true);
$found = null;

foreach ($all as $row) {
    if ((int) $row['order_id'] === $annual_order->get_id()) {
        $found = $row;
    }
}

t_check('annual in all_items', is_array($found));
t_same('all_items member email', 'annual@example.test', $found['member_email'] ?? '');
t_same('all_items order number', $annual_order->get_order_number(), $found['order_number'] ?? '');
t_check('all_items item id', (int) ($found['item_id'] ?? 0) === $annual_item->get_id());

$stats = Memberships::stats();
t_check('stats memberships', (int) $stats['memberships'] >= 1);
t_check('stats active', (int) $stats['active'] >= 1);
t_same('stats next session', 's01', $stats['next']['id'] ?? '');

echo "\n-- gift memberships --\n";

t_reset_mail();
$gift_order = t_order($gift_annual, 'giftbuyer@example.test', 'Gift Buyer');
$gift_item = t_item($gift_order, $gift_annual);
t_set_gift($gift_item, 'Gift Recipient', 'gift@example.test');
$gift_order->update_status('processing', 'Test gift payment.');
$gift_order = t_reload($gift_order);
$gift_item = t_item($gift_order, $gift_annual);

t_same('gift welcome and thank-you sent', 2, t_mail_count());
t_same('gift welcome recipient', 'gift@example.test', t_mails()[0]['to'] ?? '');
t_same('gift welcome subject', 'Your Stillness gift is ready', t_mails()[0]['subject'] ?? '');
t_contains('gift welcome has buyer', 'Gift Buyer bought you', t_mails()[0]['message'] ?? '');
t_same('gift thank-you recipient', 'giftbuyer@example.test', t_mails()[1]['to'] ?? '');
t_same('gift thank-you subject', 'Your Stillness gift is booked', t_mails()[1]['subject'] ?? '');
t_contains('gift thank-you has recipient', 'gift@example.test', t_mails()[1]['message'] ?? '');
t_same('gift member email', 'gift@example.test', (string) $gift_item->get_meta(Plugin::META_MEMBER_EMAIL));
t_same('gift buyer email', 'giftbuyer@example.test', (string) $gift_item->get_meta(Plugin::META_BUYER_EMAIL));
t_same('gift flag', 1, (int) $gift_item->get_meta(Plugin::META_IS_GIFT));
t_check('gift welcome recorded', (int) $gift_item->get_meta(Plugin::META_WELCOME_SENT) > 0);
t_check('gift thank-you recorded', (int) $gift_item->get_meta(Plugin::META_GIFT_SENT) > 0);
t_same('gift total', 12, Plans::total_for_item($gift_item));
t_same('gift remaining', 12, Memberships::remaining($gift_item));

$missing_gift_order = t_order($gift_single, 'giftmissing@example.test', 'Missing Gift Buyer');
$missing_gift_item = t_item($missing_gift_order, $gift_single);
t_set_gift($missing_gift_item, 'No Email Recipient', '');
$missing_gift_order->update_status('processing', 'Test missing gift payment.');
$missing_gift_order = t_reload($missing_gift_order);
$missing_gift_item = t_item($missing_gift_order, $gift_single);

t_same('missing gift falls back to buyer', 'giftmissing@example.test', (string) $missing_gift_item->get_meta(Plugin::META_MEMBER_EMAIL));
t_contains('missing gift note', 'gift recipient email was missing', implode("\n", array_map(static fn ($note) => $note->content, wc_get_order_notes(['order_id' => $missing_gift_order->get_id()]))));

echo "\n-- gift fields --\n";

t_check('gift checkout fields hooked to billing form', has_action('woocommerce_after_checkout_billing_form', [Gift_Fields::class, 'checkout_fields']) === 10);
t_check('gift checkout fields not after customer details', has_action('woocommerce_checkout_after_customer_details', [Gift_Fields::class, 'checkout_fields']) === false);

WC()->cart->empty_cart();
WC()->cart->add_to_cart($gift_annual);
$checkout_output = t_render(static function (): void {
    Gift_Fields::checkout_fields();
});
t_contains('checkout gift fields render', 'Gift recipient', $checkout_output);
t_contains('checkout gift recipient field', 'stillness_gift_name[', $checkout_output);
t_contains('checkout gift email field', 'stillness_gift_email[', $checkout_output);
WC()->cart->empty_cart();

$field_order = t_order($gift_annual, 'fieldbuyer@example.test', 'Field Buyer');
$field_item = t_item($field_order, $gift_annual);
$field_item_id = $field_item->get_id();
$_POST['stillness_gift_name'] = ['field-key' => 'Recipient Name'];
$_POST['stillness_gift_email'] = ['field-key' => 'recipient@example.test'];
Gift_Fields::save_order_item_fields($field_item, 'field-key', ['product_id' => $gift_annual], $field_order);
$field_item->save();
$field_order = t_reload($field_order);
$field_item = $field_order->get_item($field_item_id);
t_same('gift field plan', 'mens-gift-annual', (string) $field_item->get_meta(Plugin::META_PLAN));
t_same('gift field recipient', 'Recipient Name', (string) $field_item->get_meta(Plugin::META_MEMBER_NAME));
t_same('gift field email', 'recipient@example.test', (string) $field_item->get_meta(Plugin::META_MEMBER_EMAIL));
t_same('gift field is gift', 1, (int) $field_item->get_meta(Plugin::META_IS_GIFT));

$fallback_order = t_order($gift_single, 'fallback@example.test', 'Fallback Buyer');
$fallback_item = t_item($fallback_order, $gift_single);
$fallback_item_id = $fallback_item->get_id();
$_POST['stillness_gift_name'] = ['fallback-key' => 'Fallback Recipient'];
$_POST['stillness_gift_email'] = ['fallback-key' => 'not-an-email'];
Gift_Fields::save_order_item_fields($fallback_item, 'fallback-key', ['product_id' => $gift_single], $fallback_order);
$fallback_item->save();
$fallback_order = t_reload($fallback_order);
$fallback_item = $fallback_order->get_item($fallback_item_id);
t_same('invalid gift email falls back', 'fallback@example.test', (string) $fallback_item->get_meta(Plugin::META_MEMBER_EMAIL));
t_contains('invalid gift email note', 'gift recipient details were missing', implode("\n", array_map(static fn ($note) => $note->content, wc_get_order_notes(['order_id' => $fallback_order->get_id()]))));

$plain_order = t_order($annual, 'plain@example.test', 'Plain Buyer');
$plain_item = t_item($plain_order, $annual);
$plain_item_id = $plain_item->get_id();
Gift_Fields::save_order_item_fields($plain_item, 'plain-key', ['product_id' => $annual], $plain_order);
$plain_item->save();
$plain_order = t_reload($plain_order);
$plain_item = $plain_order->get_item($plain_item_id);
t_same('plain plan', 'mens-annual', (string) $plain_item->get_meta(Plugin::META_PLAN));
t_same('plain member is buyer', 'plain@example.test', (string) $plain_item->get_meta(Plugin::META_MEMBER_EMAIL));
t_same('plain is not gift', 0, (int) $plain_item->get_meta(Plugin::META_IS_GIFT));

wc_clear_notices();
t_check('quantity two rejected for plan', Gift_Fields::validate_quantity(true, $annual, 2) === false);
t_check('quantity one accepted for plan', Gift_Fields::validate_quantity(true, $annual, 1) === true);
t_check('quantity two accepted for normal product', Gift_Fields::validate_quantity(true, 999999, 2) === true);
t_check('quantity notice added', count(wc_get_notices('error')) > 0);
wc_clear_notices();

$cart_item = ['data' => wc_get_product($gift_annual), 'stillness_gift_name' => 'Cart Recipient', 'stillness_gift_email' => 'cart@example.test'];
$cart_output = t_render(static function () use ($cart_item): void {
    Gift_Fields::cart_fields($cart_item, 'cart-key');
});
t_contains('cart gift fields render', 'This is a gift', $cart_output);
t_contains('cart gift recipient field', 'stillness_gift_name[cart-key]', $cart_output);
t_contains('cart gift email field', 'stillness_gift_email[cart-key]', $cart_output);
$plain_cart_item = ['data' => wc_get_product($annual)];
$plain_cart_output = t_render(static function () use ($plain_cart_item): void {
    Gift_Fields::cart_fields($plain_cart_item, 'plain-key');
});
t_same('non-gift cart fields empty', '', $plain_cart_output);

echo "\n-- plans and multiple items --\n";

$six_order = t_order($six, 'six@example.test', 'Six Buyer');
$six_order->update_status('processing', 'Test six payment.');
$six_order = t_reload($six_order);
$six_item = t_item($six_order, $six);
t_same('six month remaining', 6, Memberships::remaining($six_item));
t_same('six month status', 'active', Memberships::status($six_order, $six_item));

$single_order = t_order($single, 'single@example.test', 'Single Buyer');
$single_order->update_status('processing', 'Test single payment.');
$single_order = t_reload($single_order);
$single_item = t_item($single_order, $single);
t_same('single remaining', 1, Memberships::remaining($single_item));
t_same('single status', 'active', Memberships::status($single_order, $single_item));

$gift_single_order = t_order($gift_single, 'giftsingle@example.test', 'Gift Single Buyer');
$gift_single_item = t_item($gift_single_order, $gift_single);
t_set_gift($gift_single_item, 'Gift Single Recipient', 'giftsingle@example.test');
$gift_single_order->update_status('processing', 'Test gift single payment.');
$gift_single_order = t_reload($gift_single_order);
$gift_single_item = t_item($gift_single_order, $gift_single);
t_same('gift single remaining', 1, Memberships::remaining($gift_single_item));
t_same('gift single status', 'active', Memberships::status($gift_single_order, $gift_single_item));

$multi_order = t_order($annual, 'multi@example.test', 'Multi Buyer');
$multi_gift = t_add_product($multi_order, $gift_single, 1);
t_set_gift($multi_gift, 'Multi Recipient', 'multi-gift@example.test');
$multi_order->update_status('processing', 'Test multi payment.');
$multi_order = t_reload($multi_order);
$multi_items = $multi_order->get_items();
t_same('multi order item count', 2, count($multi_items));
$multi_created = 0;

foreach ($multi_items as $multi_item) {
    if ((int) $multi_item->get_meta(Plugin::META_CREATED) > 0) {
        $multi_created++;
    }
}

t_same('multi memberships created', 2, $multi_created);
t_same('multi total', 13, array_sum(array_map(static fn ($item) => Plans::total_for_item($item), $multi_items)));

$meta_product = new \WC_Product_Simple();
$meta_product->set_name('Meta Plan Product');
$meta_product->set_sku('meta-plan-product');
$meta_product->set_regular_price('10');
$meta_product->set_status('publish');
$meta_product->update_meta_data(Plugin::META_PLAN, 'mens-single');
$meta_product->save();
t_same('plan from product meta', 'mens-single', Plans::for_product($meta_product));

echo "\n-- status and cancellation --\n";

$cancel_order = t_order($single, 'cancel@example.test', 'Cancel Buyer');
$cancel_order->update_status('processing', 'Test cancel payment.');
$cancel_order = t_reload($cancel_order);
$cancel_item = t_item($cancel_order, $single);
$cancel_order->update_status('cancelled', 'Test cancellation.');
$cancel_order = t_reload($cancel_order);
$cancel_item = t_item($cancel_order, $single);
t_same('cancelled order status', 'cancelled', Memberships::status($cancel_order, $cancel_item));
t_check('cancelled item flag', (int) $cancel_item->get_meta(Plugin::META_CANCELLED) === 1);
t_check('cancelled excluded from active list', ! in_array($cancel_order->get_id(), array_map(static fn ($row) => (int) $row['order_id'], Memberships::all_items()), true));

$refund_order = t_order($six, 'refund@example.test', 'Refund Buyer');
$refund_order->update_status('processing', 'Test refund payment.');
$refund_order = t_reload($refund_order);
$refund_order->update_status('refunded', 'Test refund.');
$refund_order = t_reload($refund_order);
$refund_item = t_item($refund_order, $six);
t_same('refunded order status', 'cancelled', Memberships::status($refund_order, $refund_item));

$admin_cancel_order = t_order($gift_single, 'admincancel@example.test', 'Admin Cancel Buyer');
$admin_cancel_order->update_status('processing', 'Test admin cancel payment.');
$admin_cancel_order = t_reload($admin_cancel_order);
$admin_cancel_item = t_item($admin_cancel_order, $gift_single);
t_check('admin cancel returns true', Memberships::cancel_item($admin_cancel_order, $admin_cancel_item, 'admin'));
t_same('admin cancel status', 'cancelled', Memberships::status($admin_cancel_order, $admin_cancel_item));
t_check('admin cancel idempotent', ! Memberships::cancel_item($admin_cancel_order, $admin_cancel_item, 'admin'));
t_contains('admin cancel note', 'cancelled by an administrator', implode("\n", array_map(static fn ($note) => $note->content, wc_get_order_notes(['order_id' => $admin_cancel_order->get_id()]))));

echo "\n-- manual usage --\n";

t_same('annual starts unused', 0, Memberships::used($annual_item));
t_same('annual starts with 12 left', 12, Memberships::remaining($annual_item));
t_same('mark one returns one', 1, Memberships::mark_used($annual_order, $annual_item));
$annual_item = $annual_order->get_item($annual_item->get_id());
t_same('annual used after mark', 1, Memberships::used($annual_item));
t_same('annual remaining after mark', 11, Memberships::remaining($annual_item));
t_contains('usage note added', 'evenings used changed from 0 to 1', implode("\n", array_map(static fn ($note) => $note->content, wc_get_order_notes(['order_id' => $annual_order->get_id()]))));
t_same('mark another returns two', 2, Memberships::mark_used($annual_order, $annual_item));
$annual_item = $annual_order->get_item($annual_item->get_id());
t_same('annual used after second mark', 2, Memberships::used($annual_item));
t_same('set usage clamps high', 12, Memberships::set_used($annual_order, $annual_item, 99));
$annual_item = $annual_order->get_item($annual_item->get_id());
t_same('annual used clamps to total', 12, Memberships::used($annual_item));
t_same('annual completed at total', 'completed', Memberships::status($annual_order, $annual_item));
t_same('completed annual not queued', 0, count(array_filter(Reminders::queue_for('s01'), static fn ($row) => (int) $row['item_id'] === $annual_item->get_id())));
t_same('reset returns zero', 0, Memberships::reset_used($annual_order, $annual_item));
$annual_item = $annual_order->get_item($annual_item->get_id());
t_same('annual used after reset', 0, Memberships::used($annual_item));
t_same('annual remaining after reset', 12, Memberships::remaining($annual_item));
t_same('annual active after reset', 'active', Memberships::status($annual_order, $annual_item));

t_same('single used after mark', 1, Memberships::mark_used($single_order, $single_item));
$single_item = $single_order->get_item($single_item->get_id());
t_same('single completed', 'completed', Memberships::status($single_order, $single_item));
t_same('completed single not queued', 0, count(array_filter(Reminders::queue_for('s03'), static fn ($row) => (int) $row['item_id'] === $single_item->get_id())));
t_same('single reset', 0, Memberships::reset_used($single_order, $single_item));
$single_item = $single_order->get_item($single_item->get_id());
t_same('single active after reset', 'active', Memberships::status($single_order, $single_item));

$past_input = Settings::defaults();
$past_input['sessions'][3]['date'] = '2020-01-01';
Settings::update($past_input);
t_check('past session detected', Sessions::is_past(Sessions::get('s04')));
$no_date_input = Settings::defaults();
$no_date_input['sessions'][4]['date'] = '';
Settings::update($no_date_input);
t_check('missing date detected', ! Sessions::has_date(Sessions::get('s05')));
t_future_settings();

echo "\n-- reminders --\n";

delete_option(Plugin::BATCH_OPTION);
delete_transient(Plugin::LOCK_TRANSIENT);
t_reset_mail();
Memberships::flush_cache();

$queue = Reminders::queue_for('s03');
t_check('reminder queue has members', count($queue) > 0);
t_same('reminder count matches queue', count($queue), Reminders::not_reminded_count('s03'));
t_check('reminder queue has email', ($queue[0]['email'] ?? '') !== '');
t_check('reminder queue has order id', (int) ($queue[0]['order_id'] ?? 0) > 0);

$bad_session = Reminders::start('nope');
t_check('bad session rejected', $bad_session instanceof \WP_Error && $bad_session->get_error_code() === 'bad_session');

$no_date_input = Settings::defaults();
$no_date_input['sessions'][4]['date'] = '';
Settings::update($no_date_input);
$no_date = Reminders::start('s05');
t_check('no-date reminder rejected', $no_date instanceof \WP_Error && $no_date->get_error_code() === 'no_date');
t_future_settings();

$past_input = Settings::defaults();
$past_input['sessions'][3]['date'] = '2020-01-01';
Settings::update($past_input);
$past = Reminders::start('s04');
t_check('past reminder rejected', $past instanceof \WP_Error && $past->get_error_code() === 'past');
t_future_settings();

$batch = Reminders::start('s03');
t_check('reminder batch started', is_array($batch) && ($batch['status'] ?? '') === 'running');
t_check('reminder batch total', (int) ($batch['total'] ?? 0) > 0);
t_same('reminder batch sent zero', 0, (int) ($batch['sent'] ?? -1));
t_same('reminder batch cursor zero', 0, (int) ($batch['cursor'] ?? -1));
t_check('reminder batch stored', is_array(Reminders::batch()));
t_check('reminder status running', Reminders::status_payload($batch)['running']);
t_same('reminder status percent', 0, Reminders::status_payload($batch)['percent']);

$busy = Reminders::start('s03');
t_check('busy reminder rejected', $busy instanceof \WP_Error && $busy->get_error_code() === 'busy');

$first_sent = min(5, (int) $batch['total']);
Reminders::handle_batch();
$batch = Reminders::batch();
t_same('first batch sends five', $first_sent, (int) ($batch['sent'] ?? -1));
t_same('first batch mail count', $first_sent, t_mail_count());
t_check('first batch still running or complete', in_array($batch['status'] ?? '', ['running', 'completed'], true));

$loops = 0;

while (($batch['status'] ?? '') === 'running' && $loops < 10) {
    Reminders::handle_batch();
    $batch = Reminders::batch();
    $loops++;
}

t_same('reminder batch completes', 'completed', $batch['status'] ?? '');
t_same('reminder batch sent total', (int) $batch['total'], (int) $batch['sent']);
t_same('reminder batch failed zero', 0, (int) $batch['failed']);
t_same('reminder batch skipped zero', 0, (int) $batch['skipped']);
t_same('all reminders emailed', (int) $batch['total'], t_mail_count());
t_same('queue empty after batch', 0, Reminders::not_reminded_count('s03'));

$payload = Reminders::status_payload($batch);
t_same('payload status complete', 'completed', $payload['status']);
t_same('payload percent', 100, $payload['percent']);
t_same('payload queued', 0, $payload['queued']);
t_check('payload not retryable', ! $payload['retryable']);

$stale_batch = $batch;
$stale_batch['status'] = 'running';
$stale_batch['updated'] = time() - 601;
update_option(Plugin::BATCH_OPTION, $stale_batch, false);
$stale_result = Reminders::start('s03');
$stale_now = Reminders::batch();
t_check('stale batch marked stale', ($stale_now['status'] ?? '') === 'stale' || $stale_result instanceof \WP_Error);
delete_option(Plugin::BATCH_OPTION);

$retry_batch = [
    'id' => wp_generate_uuid4(),
    'session_id' => 's03',
    'status' => 'failed',
    'created' => time(),
    'updated' => time(),
    'window' => 30,
    'total' => 1,
    'sent' => 0,
    'failed' => 1,
    'skipped' => 0,
    'cursor' => 0,
    'queue' => [[
        'order_id' => $annual_order->get_id(),
        'item_id' => $annual_item->get_id(),
        'name' => 'Annual Buyer',
        'email' => 'annual@example.test',
        'status' => 'failed',
        'error' => 'Test failure',
        'time' => time(),
    ]],
    'last_error' => 'Test failure',
];
update_option(Plugin::BATCH_OPTION, $retry_batch, false);
$retry = Reminders::retry();
t_check('retry resets failed batch', is_array($retry) && ($retry['status'] ?? '') === 'running');
t_same('retry clears failed count', 0, (int) ($retry['failed'] ?? -1));
t_same('retry queue reset', 'queued', $retry['queue'][0]['status'] ?? '');
delete_option(Plugin::BATCH_OPTION);
$no_retry = Reminders::retry();
t_check('retry with no batch rejected', $no_retry instanceof \WP_Error && $no_retry->get_error_code() === 'none');

$fail_row = [
    'order_id' => $annual_order->get_id(),
    'item_id' => $annual_item->get_id(),
    'name' => 'Annual Buyer',
    'email' => 'annual@example.test',
    'status' => 'queued',
    'error' => '',
    'time' => 0,
];
$send_one = new \ReflectionMethod(Reminders::class, 'send_one');
$fail_filter = function ($return, $atts) {
    if (($atts['to'] ?? '') === 'annual@example.test') {
        return false;
    }

    return $return;
};
add_filter('pre_wp_mail', $fail_filter, 20, 2);
$failed_result = $send_one->invoke(null, $fail_row, Sessions::get('s07'));
remove_filter('pre_wp_mail', $fail_filter, 20);
t_same('send_one failure status', 'failed', $failed_result['status'] ?? '');
t_check('send_one failure has error', ($failed_result['error'] ?? '') !== '');
$annual_item = $annual_order->get_item($annual_item->get_id());
$errors = $annual_item->get_meta(Plugin::META_ERRORS);
t_check('send_one stores error', is_array($errors) && isset($errors['s07']));
$sent_result = $send_one->invoke(null, $fail_row, Sessions::get('s07'));
t_same('send_one succeeds on retry', 'sent', $sent_result['status'] ?? '');
$annual_item = $annual_order->get_item($annual_item->get_id());
$sent_meta = $annual_item->get_meta(Plugin::META_SENT);
t_check('send_one stores sent', is_array($sent_meta) && isset($sent_meta['s07']));
$errors = $annual_item->get_meta(Plugin::META_ERRORS);
t_check('send_one clears old error', ! is_array($errors) || ! isset($errors['s07']));

$cancel_batch_order = t_order($single, 'batchcancel@example.test', 'Batch Cancel Buyer');
$cancel_batch_order->update_status('processing', 'Test batch cancel payment.');
$cancel_batch_order = t_reload($cancel_batch_order);
$cancel_batch_item = t_item($cancel_batch_order, $single);
Memberships::cancel_item($cancel_batch_order, $cancel_batch_item, 'admin');
$cancel_batch = [
    'id' => wp_generate_uuid4(),
    'session_id' => 's05',
    'status' => 'running',
    'created' => time(),
    'updated' => time(),
    'window' => 30,
    'total' => 1,
    'sent' => 0,
    'failed' => 0,
    'skipped' => 0,
    'cursor' => 0,
    'queue' => [[
        'order_id' => $cancel_batch_order->get_id(),
        'item_id' => $cancel_batch_item->get_id(),
        'name' => 'Batch Cancel Buyer',
        'email' => 'batchcancel@example.test',
        'status' => 'queued',
        'error' => '',
        'time' => 0,
    ]],
    'last_error' => '',
];
update_option(Plugin::BATCH_OPTION, $cancel_batch, false);
delete_transient(Plugin::LOCK_TRANSIENT);
Reminders::handle_batch();
$cancel_batch = Reminders::batch();
t_same('cancelled item skipped', 1, (int) ($cancel_batch['skipped'] ?? -1));
t_same('cancelled item batch complete', 'completed', $cancel_batch['status'] ?? '');
delete_option(Plugin::BATCH_OPTION);

$hold_batch_order = t_order($single, 'batchhold@example.test', 'Batch Hold Buyer');
$hold_batch_order->update_status('processing', 'Test batch hold payment.');
$hold_batch_order = t_reload($hold_batch_order);
$hold_batch_item = t_item($hold_batch_order, $single);
$hold_batch_order->update_status('on-hold', 'Test hold.');
$hold_batch = [
    'id' => wp_generate_uuid4(),
    'session_id' => 's06',
    'status' => 'running',
    'created' => time(),
    'updated' => time(),
    'window' => 30,
    'total' => 1,
    'sent' => 0,
    'failed' => 0,
    'skipped' => 0,
    'cursor' => 0,
    'queue' => [[
        'order_id' => $hold_batch_order->get_id(),
        'item_id' => $hold_batch_item->get_id(),
        'name' => 'Batch Hold Buyer',
        'email' => 'batchhold@example.test',
        'status' => 'queued',
        'error' => '',
        'time' => 0,
    ]],
    'last_error' => '',
];
update_option(Plugin::BATCH_OPTION, $hold_batch, false);
delete_transient(Plugin::LOCK_TRANSIENT);
Reminders::handle_batch();
$hold_batch = Reminders::batch();
t_same('unpaid item skipped', 1, (int) ($hold_batch['skipped'] ?? -1));
delete_option(Plugin::BATCH_OPTION);

echo "\n-- email content and errors --\n";

t_reset_mail();
$email_order = t_order($single, 'email@example.test', 'Email Buyer');
$email_order->update_status('processing', 'Test email payment.');
$email_order = t_reload($email_order);
$email_item = t_item($email_order, $single);
$reminder_result = Emails::send_reminder($email_order, $email_item, Sessions::get('s06'));
t_check('reminder send succeeds', $reminder_result === true);
$mail = t_last_mail();
t_contains('reminder subject date', 'Stillness reminder', $mail['subject'] ?? '');
t_contains('reminder body has reminder line', 'This is a reminder for', $mail['message'] ?? '');
t_contains('reminder body has venue', 'The Stillness Room', $mail['message'] ?? '');
t_contains('reminder body has reply line', 'reply to this email', $mail['message'] ?? '');
t_not_contains('reminder has no yes button', 'Yes, I will be there', $mail['message'] ?? '');
t_not_contains('reminder has no no button', 'No, I cannot make it', $mail['message'] ?? '');
t_not_contains('reminder has no reply URL', 'stillness_reply', $mail['message'] ?? '');
t_not_contains('reminder has no calendar button', 'Add the dates to your calendar', $mail['message'] ?? '');
t_not_contains('reminder has no used count', 'evenings used', $mail['message'] ?? '');
t_not_contains('reminder has no left count', 'left in your package', $mail['message'] ?? '');
t_contains('reminder header html', 'text/html', implode("\n", (array) ($mail['headers'] ?? [])));

$no_date_reminder = Emails::send_reminder($email_order, $email_item, ['id' => 's99', 'date' => '']);
t_check('reminder without date rejected', $no_date_reminder instanceof \WP_Error);

$bad_email_item = clone $email_item;
$bad_email_item->update_meta_data(Plugin::META_MEMBER_EMAIL, 'bad-email');
$bad_email_item->delete_meta_data(Plugin::META_BUYER_EMAIL);
$bad_email_reminder = Emails::send_reminder($email_order, $bad_email_item, Sessions::get('s06'));
t_check('reminder without email rejected', $bad_email_reminder instanceof \WP_Error);

$bad_welcome = Emails::send_welcome($email_order, $bad_email_item);
t_check('welcome without email rejected', $bad_welcome instanceof \WP_Error);
$bad_item_welcome = Emails::send_welcome($email_order, new \stdClass());
t_check('welcome without item rejected', $bad_item_welcome instanceof \WP_Error);

$bad_gift = Emails::send_gift_thankyou($email_order, $bad_email_item);
t_check('gift thank-you without email rejected', $bad_gift instanceof \WP_Error);

$invalid_send = Emails::send('not-an-email', 'Subject', '<p>Body</p>');
t_check('invalid recipient rejected', $invalid_send instanceof \WP_Error);

$fail_filter = function ($return, $atts) {
    if (($atts['to'] ?? '') === 'fail@example.test') {
        return false;
    }

    return $return;
};
add_filter('pre_wp_mail', $fail_filter, 20, 2);
$failed_send = Emails::send('fail@example.test', 'Subject', '<p>Body</p>');
remove_filter('pre_wp_mail', $fail_filter, 20);
t_check('wp_mail failure returned', $failed_send instanceof \WP_Error);

$html_mail = Emails::send('html@example.test', 'Stillness HTML subject', '<p>Stillness HTML body</p>');
t_check('send succeeds', $html_mail === true);
$mail = t_last_mail();
t_same('send recipient', 'html@example.test', $mail['to'] ?? '');
t_same('send subject', 'Stillness HTML subject', $mail['subject'] ?? '');
t_same('send body', '<p>Stillness HTML body</p>', $mail['message'] ?? '');
t_contains('send from header', 'From:', implode("\n", (array) ($mail['headers'] ?? [])));

echo "\n-- admin --\n";

wp_set_current_user(1);
$_GET = [];
$members_output = t_render(static function (): void {
    Admin::render_page();
});
t_contains('admin page renders', 'Stillness Packages', $members_output);
t_contains('admin page has members tab', 'Members', $members_output);
t_contains('admin page has export', 'Export members', $members_output);
t_contains('admin page has annual member', 'annual@example.test', $members_output);
t_contains('members table has mark action', 'action=stillness_mark_used', $members_output);
t_contains('members table returns to members', 'stillness_return=members', $members_output);
t_contains('members table mark label', 'Mark used', $members_output);

$_GET = ['tab' => 'settings'];
$settings_output = t_render(static function (): void {
    Admin::render_page();
});
t_contains('settings page renders', 'Save settings', $settings_output);
t_contains('settings page has session date', '2030-01-15', $settings_output);
t_contains('settings page has calendar', 'calendar.google.com', $settings_output);

$_GET = ['s' => 'annual@example.test'];
$search_output = t_render(static function (): void {
    Admin::render_page();
});
t_contains('member search works', 'annual@example.test', $search_output);
t_not_contains('search excludes other member', 'six@example.test', $search_output);

$_GET = ['s' => "' OR 1=1 --"];
$injection_output = t_render(static function (): void {
    Admin::render_page();
});
t_not_contains('search injection does not fatal', 'Fatal error', $injection_output);

$_GET = ['plan' => 'mens-annual', 'status' => 'active'];
$filter_output = t_render(static function (): void {
    Admin::render_page();
});
t_contains('plan filter works', 'Founding Member', $filter_output);

$_GET = [];
$annual_order = t_reload($annual_order);
$annual_item = t_item($annual_order, $annual);
$order_box = t_render(static function () use ($annual_order): void {
    Admin::render_order_box($annual_order);
});
t_contains('order box plan', 'Founding Member', $order_box);
t_contains('order box member', 'annual@example.test', $order_box);
t_contains('order box resend', 'Resend welcome email', $order_box);
t_contains('order box cancel', 'Cancel membership', $order_box);
t_contains('order box usage count', '0 of 12 evenings used', $order_box);
t_contains('order box mark link', 'action=stillness_mark_used', $order_box);
t_contains('order box mark label', 'Mark one evening used', $order_box);
t_not_contains('order box reset hidden at zero', 'Reset usage', $order_box);
t_not_contains('order box has no nested forms', '<form', $order_box);

Memberships::mark_used($annual_order, $annual_item);
$annual_item = $annual_order->get_item($annual_item->get_id());
$used_box = t_render(static function () use ($annual_order): void {
    Admin::render_order_box($annual_order);
});
t_contains('order box usage after mark', '1 of 12 evenings used', $used_box);
t_contains('order box reset link', 'action=stillness_reset_used', $used_box);
Memberships::reset_used($annual_order, $annual_item);
$annual_order = t_reload($annual_order);
$annual_item = t_item($annual_order, $annual);

$no_plan_product = new \WC_Product_Simple();
$no_plan_product->set_name('No Plan Product');
$no_plan_product->set_sku('no-plan-product');
$no_plan_product->set_regular_price('10');
$no_plan_product->set_status('publish');
$no_plan_product->save();
$no_plan_order = t_order((int) $no_plan_product->get_id(), 'noplan@example.test', 'No Plan Buyer');
$plain_box = t_render(static function () use ($no_plan_order): void {
    Admin::render_order_box($no_plan_order);
});
t_contains('order box no package', 'No Stillness package', $plain_box);

$id_box = t_render(static function () use ($annual_order): void {
    Admin::render_order_box($annual_order->get_id());
});
t_contains('order box accepts order id', 'Founding Member', $id_box);

$email_item->update_meta_data(Plugin::META_MEMBER_NAME, '<script>alert(1)</script>');
$email_item->save();
$email_order = t_reload($email_order);
$email_item = t_item($email_order, $single);
$escaped_box = t_render(static function () use ($email_order): void {
    Admin::render_order_box($email_order);
});
t_not_contains('order box escapes script', '<script>alert(1)</script>', $escaped_box);
t_contains('order box escaped entity', '&lt;script&gt;', $escaped_box);

t_future_settings();
$malicious_venue = Settings::all();
$malicious_venue['sessions'][0]['venue'] = '<img src=x onerror=alert(1)>';
Settings::update($malicious_venue);
$stored_venue = (string) (Sessions::get('s01')['venue'] ?? '');
t_not_contains('malicious venue stripped from settings', '<img', $stored_venue);
$malicious_session = Sessions::get('s01');
$malicious_session['venue'] = '<img src=x onerror=alert(1)>';
$malicious_send = Emails::send_reminder($email_order, $email_item, $malicious_session);
t_check('malicious venue send', $malicious_send === true);
$malicious_message = t_last_mail()['message'] ?? '';
t_not_contains('malicious venue escaped', '<img src=x onerror=alert(1)>', $malicious_message);
t_contains('malicious venue entity', '&lt;img', $malicious_message);
t_future_settings();

wp_set_current_user(0);
$_GET = [];
$unauthorized_output = t_render(static function (): void {
    Admin::render_page();
});
t_same('unauthorized admin page empty', '', $unauthorized_output);

$die_message = t_capture_die(static function (): void {
    Admin::save_settings();
});
t_contains('unauthorized settings die', 'permission', strtolower($die_message));

wp_set_current_user(1);
$_POST = ['stillness' => Settings::defaults()];
$_REQUEST = $_POST;
$nonce_message = t_capture_die(static function (): void {
    Admin::save_settings();
});
$nonce_message_lower = strtolower($nonce_message);
t_check('missing nonce die', str_contains($nonce_message_lower, 'are you sure') || str_contains($nonce_message_lower, 'expired'), $nonce_message);

$_POST['stillness']['sessions'][0]['date'] = '2031-01-20';
$_POST['stillness']['batch_window'] = 120;
$_POST['_wpnonce'] = wp_create_nonce(Plugin::NONCE);
$_REQUEST = $_POST;
$redirect = t_capture_redirect(static function (): void {
    Admin::save_settings();
});
t_contains('settings redirect', 'stillness_notice=settings_saved', $redirect);
t_same('settings saved date', '2031-01-20', Settings::all()['sessions'][0]['date']);
t_same('settings saved window', 120, Settings::batch_window());
t_future_settings();

$manual_order = wc_create_order(['status' => 'processing']);
$manual_product = wc_get_product($annual);
$manual_order->add_product($manual_product, 1);
$manual_order->set_billing_email('manual@example.test');
$manual_order->set_billing_first_name('Manual');
$manual_order->calculate_totals();
$manual_order->save();
$manual_order = t_reload($manual_order);
$manual_item = t_item($manual_order, $annual);
t_same('manual order has no membership yet', 0, (int) $manual_item->get_meta(Plugin::META_CREATED));
$manual_box = t_render(static function () use ($manual_order): void {
    Admin::render_order_box($manual_order);
});
t_contains('manual create link', 'action=stillness_create_membership', $manual_box);
t_not_contains('manual create box has no nested forms', '<form', $manual_box);
$_GET = ['order_id' => $manual_order->get_id(), '_wpnonce' => wp_create_nonce(Plugin::NONCE)];
$_POST = [];
$_REQUEST = $_GET;
$manual_redirect = t_capture_redirect(static function (): void {
    Admin::create_membership();
});
$manual_order = t_reload($manual_order);
$manual_item = t_item($manual_order, $annual);
t_check('manual membership created', (int) $manual_item->get_meta(Plugin::META_CREATED) > 0);
t_contains('manual redirect notice', 'membership_created', $manual_redirect);

$resend_before = t_mail_count();
$_POST = ['order_id' => $annual_order->get_id(), 'item_id' => $annual_item->get_id(), '_wpnonce' => wp_create_nonce(Plugin::NONCE)];
$_REQUEST = $_POST;
$resend_redirect = t_capture_redirect(static function (): void {
    Admin::resend_welcome();
});
t_same('resend welcome sends one', $resend_before + 1, t_mail_count());
t_contains('resend redirect notice', 'welcome_sent', $resend_redirect);

$admin_action_order = t_order($single, 'adminaction@example.test', 'Admin Action Buyer');
$admin_action_order->update_status('processing', 'Test admin action payment.');
$admin_action_order = t_reload($admin_action_order);
$admin_action_item = t_item($admin_action_order, $single);
$_POST = ['order_id' => $admin_action_order->get_id(), 'item_id' => $admin_action_item->get_id(), '_wpnonce' => wp_create_nonce(Plugin::NONCE)];
$_REQUEST = $_POST;
$cancel_redirect = t_capture_redirect(static function (): void {
    Admin::cancel_membership();
});
$admin_action_order = t_reload($admin_action_order);
$admin_action_item = t_item($admin_action_order, $single);
t_same('admin cancel action flag', 1, (int) $admin_action_item->get_meta(Plugin::META_CANCELLED));
t_contains('admin cancel redirect notice', 'membership_cancelled', $cancel_redirect);

$unauthorized_cancel = t_capture_die(static function (): void {
    wp_set_current_user(0);
    Admin::cancel_membership();
});
t_contains('unauthorized cancel die', 'permission', strtolower($unauthorized_cancel));
wp_set_current_user(1);

$usage_action_order = t_order($six, 'usageaction@example.test', 'Usage Action Buyer');
$usage_action_order->update_status('processing', 'Test usage action payment.');
$usage_action_order = t_reload($usage_action_order);
$usage_action_item = t_item($usage_action_order, $six);
$_GET = ['order_id' => $usage_action_order->get_id(), 'item_id' => $usage_action_item->get_id(), '_wpnonce' => wp_create_nonce(Plugin::NONCE)];
$_POST = [];
$_REQUEST = $_GET;
$mark_redirect = t_capture_redirect(static function (): void {
    Admin::mark_used();
});
$usage_action_order = t_reload($usage_action_order);
$usage_action_item = t_item($usage_action_order, $six);
t_same('admin mark action usage', 1, Memberships::used($usage_action_item));
t_contains('admin mark redirect notice', 'usage_marked', $mark_redirect);

$_GET = ['order_id' => $usage_action_order->get_id(), 'item_id' => $usage_action_item->get_id(), '_wpnonce' => wp_create_nonce(Plugin::NONCE)];
$_POST = [];
$_REQUEST = $_GET;
$reset_redirect = t_capture_redirect(static function (): void {
    Admin::reset_used();
});
$usage_action_order = t_reload($usage_action_order);
$usage_action_item = t_item($usage_action_order, $six);
t_same('admin reset action usage', 0, Memberships::used($usage_action_item));
t_contains('admin reset redirect notice', 'usage_reset', $reset_redirect);

$members_action_order = t_order($six, 'membersaction@example.test', 'Members Action Buyer');
$members_action_order->update_status('processing', 'Test members action payment.');
$members_action_order = t_reload($members_action_order);
$members_action_item = t_item($members_action_order, $six);
$_GET = [
    'order_id' => $members_action_order->get_id(),
    'item_id' => $members_action_item->get_id(),
    'stillness_return' => 'members',
    '_wpnonce' => wp_create_nonce(Plugin::NONCE),
];
$_POST = [];
$_REQUEST = $_GET;
$members_redirect = t_capture_redirect(static function (): void {
    Admin::mark_used();
});
$members_action_order = t_reload($members_action_order);
$members_action_item = t_item($members_action_order, $six);
t_same('members mark action usage', 1, Memberships::used($members_action_item));
t_contains('members mark redirect page', 'page=stillness-packages', $members_redirect);
t_contains('members mark redirect tab', 'tab=members', $members_redirect);
t_contains('members mark redirect notice', 'usage_marked', $members_redirect);

echo "\n-- code snippets --\n";

$snippet_order = t_order($annual, 'snippet@example.test', 'Snippet Buyer');
$snippet_order->update_status('processing', 'Test snippet payment.');
$snippet_order = t_reload($snippet_order);
$snippet_item = t_item($snippet_order, $annual);
t_reset_mail();
Emails::send_welcome($snippet_order, $snippet_item);
$baseline = t_last_mail();
t_same('baseline snippet subject', 'Welcome to Stillness', $baseline['subject'] ?? '');

$snippet_code = <<<'CODE'
add_filter('stillness_packages_email_subject', function ($subject, $type) {
    if ($type === 'welcome') {
        return 'Snippet Welcome Subject';
    }

    return $subject;
}, 10, 2);

add_filter('stillness_packages_email_body', function ($body, $type) {
    if ($type === 'welcome') {
        return '<p>SNIPPET WELCOME BODY</p>';
    }

    return $body;
}, 10, 2);

add_filter('stillness_packages_email_preheader', function ($preheader, $type) {
    if ($type === 'welcome') {
        return 'Snippet preheader';
    }

    return $preheader;
}, 10, 2);

add_filter('stillness_packages_email_html', function ($html, $type) {
    if ($type === 'gift_thankyou') {
        return '<html><body>SNIPPET GIFT HTML</body></html>';
    }

    return $html;
}, 10, 2);

add_filter('stillness_packages_email_headers', function ($headers, $type) {
    $headers[] = 'X-Stillness-Snippet: yes';
    return $headers;
}, 10, 2);
CODE;

$snippet = new \Code_Snippets\Model\Snippet([
    'name' => 'Stillness email overrides test',
    'code' => $snippet_code,
    'scope' => 'global',
    'active' => 1,
]);
$saved = \code_snippets\save_snippet($snippet);
t_check('snippet saved', is_object($saved) && isset($saved->id));
$snippet_id = is_object($saved) && isset($saved->id) ? (int) $saved->id : 0;
t_check('snippet id exists', $snippet_id > 0);
$stored = $snippet_id > 0 ? \code_snippets\get_snippet($snippet_id) : null;
t_check('snippet retrievable', is_object($stored));
t_check('snippet active', is_object($stored) && ! empty($stored->active));
$executed = $snippet_id > 0 ? \code_snippets\execute_snippet($snippet_code, $snippet_id) : false;
t_check('snippet executed', $executed !== false);

t_reset_mail();
Emails::send_welcome($snippet_order, $snippet_item);
$snippet_mail = t_last_mail();
t_same('snippet welcome subject', 'Snippet Welcome Subject', $snippet_mail['subject'] ?? '');
t_contains('snippet welcome body', 'SNIPPET WELCOME BODY', $snippet_mail['message'] ?? '');
t_contains('snippet welcome preheader', 'Snippet preheader', $snippet_mail['message'] ?? '');
t_contains('snippet headers', 'X-Stillness-Snippet: yes', implode("\n", (array) ($snippet_mail['headers'] ?? [])));

Emails::send_gift_thankyou($gift_order, $gift_item);
$snippet_gift = t_last_mail();
t_same('snippet gift html', '<html><body>SNIPPET GIFT HTML</body></html>', $snippet_gift['message'] ?? '');

Emails::send_reminder($snippet_order, $snippet_item, Sessions::get('s06'));
$snippet_reminder = t_last_mail();
t_contains('snippet reminder default subject', 'Stillness', $snippet_reminder['subject'] ?? '');
t_contains('snippet reminder header', 'X-Stillness-Snippet: yes', implode("\n", (array) ($snippet_reminder['headers'] ?? [])));

if ($snippet_id > 0 && function_exists('code_snippets\\deactivate_snippet')) {
    \code_snippets\deactivate_snippet($snippet_id);
    $stored = \code_snippets\get_snippet($snippet_id);
    t_check('snippet deactivated', is_object($stored) && empty($stored->active));
}

echo "\n-- lifecycle --\n";

t_check('plugin version', Plugin::VERSION === '1.1.0');
t_same('social link count', 2, count(Plugin::social_links()));
t_check('social instagram', isset(Plugin::social_links()['Instagram']));
Plugin::declare_compatibility();
t_check('compatibility declaration survives', true);

$notice_output = t_render(static function (): void {
    wp_set_current_user(1);
    Plugin::missing_woocommerce_notice();
});
t_contains('missing Woo notice', 'needs WooCommerce', $notice_output);
wp_set_current_user(0);
$no_notice_output = t_render(static function (): void {
    Plugin::missing_woocommerce_notice();
});
t_same('missing Woo notice respects capability', '', $no_notice_output);
wp_set_current_user(1);

Plugin::deactivate();
t_check('deactivate clears batch', get_option(Plugin::BATCH_OPTION) === false);
t_check('deactivate clears lock', get_transient(Plugin::LOCK_TRANSIENT) === false);
Plugin::activate();
t_check('reactivate restores settings', is_array(get_option(Plugin::SETTINGS_OPTION)));

echo "\n";
$summary = 'TOTAL ' . $GLOBALS['t_total'] . ' CHECKS, ' . $GLOBALS['t_fail'] . " FAILURES\n";
echo $summary;
file_put_contents('/mnt/test-result.txt', $summary, FILE_APPEND);

exit($GLOBALS['t_fail'] > 0 ? 1 : 0);
