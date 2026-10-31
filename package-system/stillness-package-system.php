<?php
/**
 * Plugin Name: Stillness Packages
 * Plugin URI: https://wearestillness.com/
 * Description: Membership packages, monthly reminders and manual usage tracking for the Stillness men's series.
 * Version: 1.1.0
 * Author: Solicate
 * Author URI: https://solicate.studio/
 * Requires at least: 6.5
 * Requires PHP: 7.4
 * Requires Plugins: woocommerce
 * WC requires at least: 8.0
 * WC tested up to: 10.7
 * Text Domain: stillness-packages
 */

namespace Stillness\Packages;

if (!defined('ABSPATH')) {
    exit;
}

final class Plugin {
    public const VERSION = '1.1.0';
    public const FILE = __FILE__;
    public const SLUG = 'stillness-packages';
    public const SETTINGS_OPTION = 'stillness_packages_settings';
    public const BATCH_OPTION = 'stillness_packages_batch';
    public const VERSION_OPTION = 'stillness_packages_version';
    public const LOCK_TRANSIENT = 'stillness_packages_batch_lock';
    public const ORDER_LOCK_PREFIX = 'stillness_packages_order_lock_';
    public const AS_GROUP = 'stillness-packages';
    public const AS_HOOK = 'stillness_packages_send_batch';
    public const NONCE = 'stillness_packages_admin';

    public const META_PLAN = '_stillness_plan';
    public const META_TOTAL = '_stillness_attendances_total';
    public const META_IS_GIFT = '_stillness_is_gift';
    public const META_MEMBER_NAME = '_stillness_member_name';
    public const META_MEMBER_EMAIL = '_stillness_member_email';
    public const META_BUYER_NAME = '_stillness_buyer_name';
    public const META_BUYER_EMAIL = '_stillness_buyer_email';
    public const META_CREATED = '_stillness_created_at';
    public const META_CANCELLED = '_stillness_cancelled';
    public const META_CANCELLED_AT = '_stillness_cancelled_at';
    public const META_CANCELLED_BY = '_stillness_cancelled_by';
    public const META_WELCOME_SENT = '_stillness_welcome_sent';
    public const META_WELCOME_ERROR = '_stillness_welcome_error';
    public const META_GIFT_SENT = '_stillness_gift_sent';
    public const META_GIFT_ERROR = '_stillness_gift_error';
    public const META_SENT = '_stillness_sent';
    public const META_ERRORS = '_stillness_errors';
    public const META_SKIPPED = '_stillness_skipped';
    public const META_USED = '_stillness_evenings_used';
    public const META_HAS_MEMBERSHIP = '_stillness_has_membership';

    public const INSTAGRAM = 'https://www.instagram.com/stillnessco/';
    public const FACEBOOK = 'https://www.facebook.com/stillnessco/';

    public static function boot(): void {
        register_activation_hook(__FILE__, [self::class, 'activate']);
        register_deactivation_hook(__FILE__, [self::class, 'deactivate']);
        add_action('before_woocommerce_init', [self::class, 'declare_compatibility']);
        add_action('plugins_loaded', [self::class, 'init']);
    }

    public static function init(): void {
        if (!class_exists('WooCommerce')) {
            add_action('admin_notices', [self::class, 'missing_woocommerce_notice']);
            return;
        }

        Memberships::init();
        Reminders::init();
        Gift_Fields::init();
        Admin::init();

        add_action('wp_loaded', [self::class, 'resolve_sku_add_to_cart'], 5);
    }

    public static function activate(): void {
        if (get_option(self::SETTINGS_OPTION) === false) {
            add_option(self::SETTINGS_OPTION, Settings::defaults());
        }
        update_option(self::VERSION_OPTION, self::VERSION);
    }

    public static function deactivate(): void {
        if (function_exists('as_unschedule_all_actions')) {
            as_unschedule_all_actions(self::AS_HOOK, [], self::AS_GROUP);
        }
        wp_clear_scheduled_hook(self::AS_HOOK);
        delete_option(self::BATCH_OPTION);
        delete_transient(self::LOCK_TRANSIENT);
    }

    public static function declare_compatibility(): void {
        if (class_exists('\Automattic\WooCommerce\Utilities\FeaturesUtil')) {
            \Automattic\WooCommerce\Utilities\FeaturesUtil::declare_compatibility('custom_order_tables', __FILE__, true);
        }
    }

    public static function resolve_sku_add_to_cart(): void {
        if (empty($_REQUEST['add-to-cart']) || !is_string($_REQUEST['add-to-cart'])) {
            return;
        }

        $raw = wp_unslash($_REQUEST['add-to-cart']);

        if (is_numeric($raw)) {
            return;
        }

        $sku = sanitize_text_field($raw);

        if (!Plans::key_from_sku($sku)) {
            return;
        }

        $product_id = wc_get_product_id_by_sku($sku);

        if ($product_id) {
            $_REQUEST['add-to-cart'] = $product_id;
            $_GET['add-to-cart'] = $product_id;
            return;
        }

        if (function_exists('wc_add_notice')) {
            wc_add_notice('That package is not available right now. Please contact info@wearestillness.com.', 'error');
        }

        wp_safe_redirect(wc_get_cart_url());
        exit;
    }

    public static function missing_woocommerce_notice(): void {
        if (!current_user_can('activate_plugins')) {
            return;
        }

        echo '<div class="notice notice-error"><p><strong>Stillness Packages</strong> needs WooCommerce to be installed and active.</p></div>';
    }

    public static function social_links(): array {
        return [
            'Instagram' => self::INSTAGRAM,
            'Facebook' => self::FACEBOOK,
        ];
    }
}

final class Plans {
    private const MAP = [
        'mens-annual' => [
            'label' => 'Founding Member · 12 months',
            'short' => 'Founding Member',
            'attendances' => 12,
            'gift' => false,
        ],
        'mens-six-month' => [
            'label' => '6-Month Package',
            'short' => '6-Month Package',
            'attendances' => 6,
            'gift' => false,
        ],
        'mens-single' => [
            'label' => 'Single Evening',
            'short' => 'Single Evening',
            'attendances' => 1,
            'gift' => false,
        ],
        'mens-gift-annual' => [
            'label' => 'Gift · 12 months',
            'short' => 'Gift · 12 months',
            'attendances' => 12,
            'gift' => true,
        ],
        'mens-gift-single' => [
            'label' => 'Gift · Single Evening',
            'short' => 'Gift · Single Evening',
            'attendances' => 1,
            'gift' => true,
        ],
    ];

    public static function all(): array {
        return self::MAP;
    }

    public static function exists(string $key): bool {
        return isset(self::MAP[$key]);
    }

    public static function get(string $key): ?array {
        return self::MAP[$key] ?? null;
    }

    public static function label(string $key): string {
        return self::MAP[$key]['label'] ?? $key;
    }

    public static function short_label(string $key): string {
        return self::MAP[$key]['short'] ?? self::label($key);
    }

    public static function attendances(string $key): int {
        return (int) (self::MAP[$key]['attendances'] ?? 0);
    }

    public static function is_gift(string $key): bool {
        return !empty(self::MAP[$key]['gift']);
    }

    public static function key_from_sku(string $sku): ?string {
        return isset(self::MAP[$sku]) ? $sku : null;
    }

    public static function for_product($product): ?string {
        if (is_numeric($product)) {
            $product = wc_get_product((int) $product);
        }

        if (!$product instanceof \WC_Product) {
            return null;
        }

        $plan = (string) $product->get_meta(Plugin::META_PLAN);

        if (self::exists($plan)) {
            return $plan;
        }

        return self::key_from_sku((string) $product->get_sku());
    }

    public static function for_item($item): ?string {
        if (!$item instanceof \WC_Order_Item_Product) {
            return null;
        }

        $plan = (string) $item->get_meta(Plugin::META_PLAN);

        if (self::exists($plan)) {
            return $plan;
        }

        return self::for_product($item->get_product());
    }

    public static function total_for_item($item): int {
        $plan = self::for_item($item);

        if (!$plan) {
            return 0;
        }

        $total = (int) $item->get_meta(Plugin::META_TOTAL);

        if ($total > 0) {
            return $total;
        }

        $product = $item->get_product();

        if ($product instanceof \WC_Product) {
            $meta = (int) $product->get_meta('_stillness_attendances');
            if ($meta > 0) {
                return $meta;
            }
        }

        return self::attendances($plan);
    }
}

final class Settings {
    public static function defaults(): array {
        $sessions = [];

        for ($i = 1; $i <= 12; $i++) {
            $sessions[] = [
                'id' => sprintf('s%02d', $i),
                'date' => '',
                'start' => '',
                'end' => '',
                'venue' => '',
            ];
        }

        return [
            'sessions' => $sessions,
            'calendar_url' => '',
            'batch_window' => 30,
        ];
    }

    public static function all(): array {
        $saved = get_option(Plugin::SETTINGS_OPTION, []);

        if (!is_array($saved)) {
            $saved = [];
        }

        $defaults = self::defaults();
        $sessions = [];

        for ($i = 0; $i < 12; $i++) {
            $row = isset($saved['sessions'][$i]) && is_array($saved['sessions'][$i]) ? $saved['sessions'][$i] : [];
            $sessions[$i] = array_merge(
                $defaults['sessions'][$i],
                array_intersect_key($row, $defaults['sessions'][$i])
            );

            if (!preg_match('/^s\d{2}$/', (string) $sessions[$i]['id'])) {
                $sessions[$i]['id'] = $defaults['sessions'][$i]['id'];
            }

            $sessions[$i]['date'] = self::clean_date($sessions[$i]['date']);
            $sessions[$i]['start'] = self::clean_time($sessions[$i]['start']);
            $sessions[$i]['end'] = self::clean_time($sessions[$i]['end']);
            $sessions[$i]['venue'] = sanitize_text_field((string) $sessions[$i]['venue']);
        }

        $calendar = isset($saved['calendar_url']) ? esc_url_raw((string) $saved['calendar_url']) : '';
        $window = isset($saved['batch_window']) ? (int) $saved['batch_window'] : 30;

        if (!in_array($window, [30, 120, 360, 600], true)) {
            $window = 30;
        }

        return [
            'sessions' => $sessions,
            'calendar_url' => $calendar,
            'batch_window' => $window,
        ];
    }

    public static function get(string $key, $default = null) {
        $all = self::all();
        return array_key_exists($key, $all) ? $all[$key] : $default;
    }

    public static function update(array $input): array {
        $clean = self::sanitize($input);
        update_option(Plugin::SETTINGS_OPTION, $clean);
        return $clean;
    }

    public static function sanitize($input): array {
        $defaults = self::defaults();

        if (!is_array($input)) {
            $input = [];
        }

        $rows = isset($input['sessions']) && is_array($input['sessions']) ? $input['sessions'] : [];
        $sessions = [];
        $seen = [];

        for ($i = 0; $i < 12; $i++) {
            $row = isset($rows[$i]) && is_array($rows[$i]) ? $rows[$i] : [];
            $id = isset($row['id']) ? sanitize_key((string) $row['id']) : $defaults['sessions'][$i]['id'];

            if (!preg_match('/^s\d{2}$/', $id) || isset($seen[$id])) {
                $id = $defaults['sessions'][$i]['id'];
            }

            $seen[$id] = true;

            $sessions[] = [
                'id' => $id,
                'date' => self::clean_date($row['date'] ?? ''),
                'start' => self::clean_time($row['start'] ?? ''),
                'end' => self::clean_time($row['end'] ?? ''),
                'venue' => isset($row['venue']) ? sanitize_text_field((string) $row['venue']) : '',
            ];
        }

        $calendar = isset($input['calendar_url']) ? esc_url_raw(trim((string) $input['calendar_url'])) : '';
        $window = isset($input['batch_window']) ? (int) $input['batch_window'] : 30;

        if (!in_array($window, [30, 120, 360, 600], true)) {
            $window = 30;
        }

        return [
            'sessions' => $sessions,
            'calendar_url' => $calendar,
            'batch_window' => $window,
        ];
    }

    public static function batch_window(): int {
        $window = (int) self::get('batch_window', 30);
        return in_array($window, [30, 120, 360, 600], true) ? $window : 30;
    }

    public static function google_calendar_url(): string {
        return (string) self::get('calendar_url', '');
    }

    private static function clean_date($value): string {
        $value = sanitize_text_field((string) $value);

        if ($value === '') {
            return '';
        }

        $dt = \DateTimeImmutable::createFromFormat('!Y-m-d', $value, wp_timezone());

        return ($dt && $dt->format('Y-m-d') === $value) ? $value : '';
    }

    private static function clean_time($value): string {
        $value = sanitize_text_field((string) $value);

        if ($value === '') {
            return '';
        }

        $dt = \DateTimeImmutable::createFromFormat('!H:i', $value, wp_timezone());

        return ($dt && $dt->format('H:i') === $value) ? $value : '';
    }
}

final class Sessions {
    public static function all(): array {
        $sessions = Settings::get('sessions', []);

        foreach ($sessions as $index => &$session) {
            $session['index'] = $index;
        }

        unset($session);

        return $sessions;
    }

    public static function get(string $id): ?array {
        foreach (self::all() as $session) {
            if (($session['id'] ?? '') === $id) {
                return $session;
            }
        }

        return null;
    }

    public static function has_date(array $session): bool {
        return !empty($session['date']);
    }

    public static function upcoming(): array {
        $out = [];

        foreach (self::all() as $session) {
            if (!self::has_date($session) || self::is_past($session)) {
                continue;
            }

            $out[] = $session;
        }

        usort($out, function ($a, $b) {
            return strcmp(
                ($a['date'] ?? '') . ' ' . ($a['start'] ?? ''),
                ($b['date'] ?? '') . ' ' . ($b['start'] ?? '')
            );
        });

        return $out;
    }

    public static function next(): ?array {
        $upcoming = self::upcoming();
        return $upcoming[0] ?? null;
    }

    public static function format_date(array $session): string {
        if (empty($session['date'])) {
            return 'Date to be confirmed';
        }

        $dt = \DateTimeImmutable::createFromFormat('!Y-m-d', $session['date'], wp_timezone());

        return $dt ? $dt->format('l j F Y') : $session['date'];
    }

    public static function short_date(array $session): string {
        if (empty($session['date'])) {
            return 'Date to be confirmed';
        }

        $dt = \DateTimeImmutable::createFromFormat('!Y-m-d', $session['date'], wp_timezone());

        return $dt ? $dt->format('l j F') : $session['date'];
    }

    public static function format_time(array $session): string {
        $start = self::format_clock($session['start'] ?? '');
        $end = self::format_clock($session['end'] ?? '');

        if ($start && $end) {
            return $start . ' – ' . $end;
        }

        return $start ?: $end;
    }

    public static function format_range(array $session): string {
        $parts = [
            self::format_date($session),
            self::format_time($session),
            $session['venue'] ?? '',
        ];

        $parts = array_values(array_filter(array_map('trim', $parts)));

        return implode(' · ', $parts);
    }

    public static function label(array $session): string {
        $number = isset($session['index']) ? ((int) $session['index'] + 1) : 0;
        $prefix = $number > 0 ? sprintf('Session %02d', $number) : 'Session';

        if (empty($session['date'])) {
            return $prefix . ' — date not set';
        }

        return $prefix . ' — ' . self::format_date($session);
    }

    public static function timestamp_end(array $session): int {
        if (empty($session['date'])) {
            return 0;
        }

        $time = !empty($session['end']) ? $session['end'] : '23:59';
        $dt = \DateTimeImmutable::createFromFormat('!Y-m-d H:i', $session['date'] . ' ' . $time, wp_timezone());

        return $dt ? $dt->getTimestamp() : 0;
    }

    public static function is_past(array $session): bool {
        $end = self::timestamp_end($session);
        return $end > 0 && time() > $end;
    }

    public static function all_past(): bool {
        $last = 0;

        foreach (self::all() as $session) {
            $end = self::timestamp_end($session);
            if ($end > $last) {
                $last = $end;
            }
        }

        return $last > 0 && time() > $last;
    }

    private static function format_clock(string $value): string {
        if ($value === '') {
            return '';
        }

        $dt = \DateTimeImmutable::createFromFormat('!H:i', $value, wp_timezone());

        return $dt ? $dt->format('g:i A') : '';
    }
}

final class Memberships {
    private static $cache = null;

    public static function init(): void {
        add_action('woocommerce_payment_complete', [self::class, 'on_payment'], 20);
        add_action('woocommerce_order_status_processing', [self::class, 'on_payment'], 20);
        add_action('woocommerce_order_status_completed', [self::class, 'on_payment'], 20);
        add_action('woocommerce_order_status_cancelled', [self::class, 'on_cancel'], 20);
        add_action('woocommerce_order_status_refunded', [self::class, 'on_cancel'], 20);
        add_action('woocommerce_order_fully_refunded', [self::class, 'on_cancel'], 20);
    }

    public static function on_payment($order_id): void {
        $order = wc_get_order($order_id);

        if (!$order instanceof \WC_Order) {
            return;
        }

        if (!in_array($order->get_status(), ['processing', 'completed'], true)) {
            return;
        }

        self::create_for_order($order);
    }

    public static function on_cancel($order_id): void {
        $order = wc_get_order($order_id);

        if (!$order instanceof \WC_Order) {
            return;
        }

        self::cancel_for_order($order, 'order_status');
    }

    public static function create_for_order($order): bool {
        if (is_numeric($order)) {
            $order = wc_get_order((int) $order);
        }

        if (!$order instanceof \WC_Order) {
            return false;
        }

        if (!in_array($order->get_status(), ['processing', 'completed'], true)) {
            return false;
        }

        $lock = Plugin::ORDER_LOCK_PREFIX . $order->get_id();

        if (get_transient($lock)) {
            return false;
        }

        set_transient($lock, 1, 30);
        $created_any = false;

        try {
            foreach ($order->get_items() as $item) {
                $plan = Plans::for_item($item);

                if (!$plan) {
                    continue;
                }

                if ((int) $item->get_meta(Plugin::META_CREATED) > 0) {
                    continue;
                }

                if (self::create_item($order, $item, $plan)) {
                    $created_any = true;
                }
            }

            if ($created_any) {
                $order->update_meta_data(Plugin::META_HAS_MEMBERSHIP, 1);
                $order->save();
                self::$cache = null;
            }
        } finally {
            delete_transient($lock);
        }

        return $created_any;
    }

    private static function create_item(\WC_Order $order, $item, string $plan): bool {
        if (!$item instanceof \WC_Order_Item_Product) {
            return false;
        }

        $total = Plans::total_for_item($item);

        if ($total <= 0) {
            return false;
        }

        $is_gift = Plans::is_gift($plan);
        $buyer_name = trim($order->get_formatted_billing_full_name());
        $buyer_email = sanitize_email($order->get_billing_email());

        if ($buyer_name === '') {
            $buyer_name = $buyer_email;
        }

        $member_name = trim((string) $item->get_meta(Plugin::META_MEMBER_NAME));
        $member_email = sanitize_email((string) $item->get_meta(Plugin::META_MEMBER_EMAIL));

        if ($is_gift) {
            if ($member_name === '') {
                $member_name = 'Gift recipient';
            }

            if (!is_email($member_email)) {
                $member_email = $buyer_email;
                $order->add_order_note('Stillness: gift recipient email was missing. The welcome email will go to the buyer.');
            }
        } else {
            $member_name = $buyer_name;
            $member_email = $buyer_email;
        }

        if (!is_email($member_email)) {
            $order->add_order_note('Stillness: membership could not be created because the member email is missing.');
            return false;
        }

        $item->update_meta_data(Plugin::META_PLAN, $plan);
        $item->update_meta_data(Plugin::META_TOTAL, $total);
        $item->update_meta_data(Plugin::META_IS_GIFT, $is_gift ? 1 : 0);
        $item->update_meta_data(Plugin::META_MEMBER_NAME, $member_name);
        $item->update_meta_data(Plugin::META_MEMBER_EMAIL, $member_email);
        $item->update_meta_data(Plugin::META_BUYER_NAME, $buyer_name);
        $item->update_meta_data(Plugin::META_BUYER_EMAIL, $buyer_email);
        $item->update_meta_data(Plugin::META_CREATED, time());
        $item->update_meta_data(Plugin::META_USED, 0);
        $item->update_meta_data(Plugin::META_CANCELLED, 0);
        $item->update_meta_data(Plugin::META_WELCOME_SENT, 0);
        $item->update_meta_data(Plugin::META_GIFT_SENT, 0);
        $item->save();

        $welcome = Emails::send_welcome($order, $item);

        if (is_wp_error($welcome)) {
            $item->update_meta_data(Plugin::META_WELCOME_ERROR, $welcome->get_error_message());
        } else {
            $item->update_meta_data(Plugin::META_WELCOME_SENT, time());
            $item->delete_meta_data(Plugin::META_WELCOME_ERROR);
        }

        $item->save();

        if ($is_gift) {
            $gift = Emails::send_gift_thankyou($order, $item);

            if (is_wp_error($gift)) {
                $item->update_meta_data(Plugin::META_GIFT_ERROR, $gift->get_error_message());
            } else {
                $item->update_meta_data(Plugin::META_GIFT_SENT, time());
                $item->delete_meta_data(Plugin::META_GIFT_ERROR);
            }

            $item->save();
        }

        $order->add_order_note(sprintf(
            'Stillness membership created: %s for %s (%d evenings).',
            Plans::label($plan),
            $member_name ?: $member_email,
            $total
        ));

        return true;
    }

    public static function cancel_for_order($order, string $reason = 'order_status'): void {
        if (is_numeric($order)) {
            $order = wc_get_order((int) $order);
        }

        if (!$order instanceof \WC_Order) {
            return;
        }

        $changed = false;

        foreach ($order->get_items() as $item) {
            if (!Plans::for_item($item)) {
                continue;
            }

            if ((int) $item->get_meta(Plugin::META_CREATED) === 0) {
                continue;
            }

            if ((int) $item->get_meta(Plugin::META_CANCELLED) === 1) {
                continue;
            }

            $item->update_meta_data(Plugin::META_CANCELLED, 1);
            $item->update_meta_data(Plugin::META_CANCELLED_AT, time());
            $item->update_meta_data(Plugin::META_CANCELLED_BY, $reason);
            $item->save();
            $changed = true;
        }

        if ($changed) {
            $order->add_order_note('Stillness membership removed after a refund or cancellation.');
            self::$cache = null;
        }
    }

    public static function cancel_item(\WC_Order $order, $item, string $reason = 'admin'): bool {
        if (!$item instanceof \WC_Order_Item_Product) {
            return false;
        }

        if ((int) $item->get_meta(Plugin::META_CREATED) === 0) {
            return false;
        }

        if ((int) $item->get_meta(Plugin::META_CANCELLED) === 1) {
            return false;
        }

        $item->update_meta_data(Plugin::META_CANCELLED, 1);
        $item->update_meta_data(Plugin::META_CANCELLED_AT, time());
        $item->update_meta_data(Plugin::META_CANCELLED_BY, $reason);
        $item->save();

        $order->add_order_note(sprintf(
            'Stillness membership cancelled by an administrator for %s.',
            (string) $item->get_meta(Plugin::META_MEMBER_EMAIL)
        ));

        self::$cache = null;
        return true;
    }

    public static function used($item): int {
        if (!$item instanceof \WC_Order_Item_Product) {
            return 0;
        }

        $total = Plans::total_for_item($item);
        $used = (int) $item->get_meta(Plugin::META_USED);

        return max(0, min($total, $used));
    }

    public static function remaining($item): int {
        return max(0, Plans::total_for_item($item) - self::used($item));
    }

    public static function mark_used(\WC_Order $order, $item): int {
        return self::set_used($order, $item, self::used($item) + 1);
    }

    public static function reset_used(\WC_Order $order, $item): int {
        return self::set_used($order, $item, 0);
    }

    public static function set_used(\WC_Order $order, $item, int $used): int {
        if (!$item instanceof \WC_Order_Item_Product || !Plans::for_item($item)) {
            return 0;
        }

        $total = Plans::total_for_item($item);
        $old = self::used($item);
        $new = max(0, min($total, $used));

        if ($old === $new) {
            return $new;
        }

        $item->update_meta_data(Plugin::META_USED, $new);
        $item->save();

        $order->add_order_note(sprintf(
            'Stillness evenings used changed from %d to %d for %s.',
            $old,
            $new,
            (string) $item->get_meta(Plugin::META_MEMBER_EMAIL)
        ));

        self::$cache = null;
        return $new;
    }

    public static function status($order, $item): string {
        if (!$order instanceof \WC_Order || !$item instanceof \WC_Order_Item_Product) {
            return 'incomplete';
        }

        if ((int) $item->get_meta(Plugin::META_CANCELLED) === 1) {
            return 'cancelled';
        }

        if (in_array($order->get_status(), ['cancelled', 'refunded'], true)) {
            return 'cancelled';
        }

        if (!in_array($order->get_status(), ['processing', 'completed'], true)) {
            return 'inactive';
        }

        if ((int) $item->get_meta(Plugin::META_CREATED) === 0) {
            return 'incomplete';
        }

        if (self::remaining($item) <= 0) {
            return 'completed';
        }

        if (Sessions::all_past()) {
            return 'expired';
        }

        return 'active';
    }

    public static function status_label(string $status): string {
        $labels = [
            'active' => 'Active',
            'completed' => 'Completed',
            'expired' => 'Expired',
            'cancelled' => 'Cancelled',
            'inactive' => 'Not paid',
            'incomplete' => 'Incomplete',
        ];

        return $labels[$status] ?? ucfirst($status);
    }

    public static function all_items(bool $include_cancelled = false, bool $force = false): array {
        if (self::$cache === null || $force) {
            self::$cache = self::build_items();
        }

        if ($include_cancelled) {
            return self::$cache;
        }

        return array_values(array_filter(self::$cache, function ($membership) {
            return $membership['status'] !== 'cancelled';
        }));
    }

    private static function build_items(): array {
        global $wpdb;

        $items_table = $wpdb->prefix . 'woocommerce_order_items';
        $meta_table = $wpdb->prefix . 'woocommerce_order_itemmeta';
        $rows = $wpdb->get_results(
            $wpdb->prepare(
                "SELECT oi.order_id, im.order_item_id FROM {$items_table} oi INNER JOIN {$meta_table} im ON im.order_item_id = oi.order_item_id WHERE im.meta_key = %s",
                Plugin::META_PLAN
            ),
            ARRAY_A
        );

        if (!is_array($rows)) {
            return [];
        }

        $by_order = [];

        foreach ($rows as $row) {
            $order_id = (int) $row['order_id'];
            $by_order[$order_id][] = (int) $row['order_item_id'];
        }

        $items = [];

        foreach ($by_order as $order_id => $item_ids) {
            $order = wc_get_order($order_id);

            if (!$order instanceof \WC_Order) {
                continue;
            }

            if (!in_array($order->get_status(), ['processing', 'completed', 'cancelled', 'refunded'], true)) {
                continue;
            }

            $order_items = $order->get_items();

            foreach ($item_ids as $item_id) {
                $item = $order_items[$item_id] ?? null;

                if (!$item instanceof \WC_Order_Item_Product) {
                    continue;
                }

                $plan = Plans::for_item($item);

                if (!$plan) {
                    continue;
                }

                $created = (int) $item->get_meta(Plugin::META_CREATED);

                if ($created <= 0) {
                    continue;
                }

                $member_name = trim((string) $item->get_meta(Plugin::META_MEMBER_NAME));
                $member_email = sanitize_email((string) $item->get_meta(Plugin::META_MEMBER_EMAIL));
                $buyer_name = trim((string) $item->get_meta(Plugin::META_BUYER_NAME));
                $buyer_email = sanitize_email((string) $item->get_meta(Plugin::META_BUYER_EMAIL));

                if ($member_name === '') {
                    $member_name = $buyer_name;
                }

                if (!is_email($member_email)) {
                    $member_email = $buyer_email;
                }

                $total = (int) $item->get_meta(Plugin::META_TOTAL);

                if ($total <= 0) {
                    $total = Plans::attendances($plan);
                }

                $items[] = [
                    'order_id' => $order_id,
                    'item_id' => $item_id,
                    'order' => $order,
                    'item' => $item,
                    'plan' => $plan,
                    'label' => Plans::label($plan),
                    'short_label' => Plans::short_label($plan),
                    'is_gift' => (bool) $item->get_meta(Plugin::META_IS_GIFT),
                    'member_name' => $member_name,
                    'member_email' => $member_email,
                    'buyer_name' => $buyer_name,
                    'buyer_email' => $buyer_email,
                    'total' => max(0, $total),
                    'used' => self::used($item),
                    'remaining' => self::remaining($item),
                    'status' => self::status($order, $item),
                    'created' => $created,
                    'order_number' => $order->get_order_number(),
                    'order_date' => $order->get_date_created() ? $order->get_date_created()->getTimestamp() : 0,
                    'edit_url' => $order->get_edit_order_url(),
                ];
            }
        }

        usort($items, function ($a, $b) {
            return $b['created'] <=> $a['created'];
        });

        return $items;
    }

    public static function stats(): array {
        $items = self::all_items(true);
        $active = 0;
        $gifts = 0;

        foreach ($items as $membership) {
            if ($membership['status'] === 'cancelled') {
                continue;
            }

            if ($membership['status'] === 'active') {
                $active++;
            }

            if ($membership['is_gift']) {
                $gifts++;
            }
        }

        $next = Sessions::next();

        return [
            'memberships' => count($items),
            'active' => $active,
            'gifts' => $gifts,
            'next' => $next,
            'not_reminded' => $next ? Reminders::not_reminded_count($next['id']) : 0,
        ];
    }

    public static function flush_cache(): void {
        self::$cache = null;
    }

}

final class Gift_Fields {
    public static function init(): void {
        add_action('woocommerce_after_cart_item_name', [self::class, 'cart_fields'], 10, 2);
        add_action('woocommerce_cart_updated', [self::class, 'save_cart_fields']);
        add_action('woocommerce_after_checkout_billing_form', [self::class, 'checkout_fields']);
        add_action('woocommerce_checkout_process', [self::class, 'validate_checkout_fields']);
        add_action('woocommerce_checkout_create_order_line_item', [self::class, 'save_order_item_fields'], 10, 4);
        add_action('woocommerce_add_to_cart_validation', [self::class, 'validate_quantity'], 10, 3);
    }

    public static function cart_fields($cart_item, $cart_item_key): void {
        if (empty($cart_item['data']) || !$cart_item['data'] instanceof \WC_Product) {
            return;
        }

        $plan = Plans::for_product($cart_item['data']);

        if (!$plan || !Plans::is_gift($plan)) {
            return;
        }

        $name = isset($cart_item['stillness_gift_name']) ? (string) $cart_item['stillness_gift_name'] : '';
        $email = isset($cart_item['stillness_gift_email']) ? (string) $cart_item['stillness_gift_email'] : '';

        wp_nonce_field('stillness_cart_gift', '_stillness_cart_gift_nonce');
        ?>
        <div class="stillness-gift-fields">
            <p class="stillness-gift-title"><strong>This is a gift</strong></p>
            <p class="stillness-gift-copy">We'll email the dates and details to the recipient. You can also enter this at checkout.</p>
            <p class="form-row form-row-first">
                <label for="stillness_gift_name_<?php echo esc_attr($cart_item_key); ?>">Recipient name</label>
                <input type="text" class="input-text" name="stillness_gift_name[<?php echo esc_attr($cart_item_key); ?>]" id="stillness_gift_name_<?php echo esc_attr($cart_item_key); ?>" value="<?php echo esc_attr($name); ?>" autocomplete="name">
            </p>
            <p class="form-row form-row-last">
                <label for="stillness_gift_email_<?php echo esc_attr($cart_item_key); ?>">Recipient email</label>
                <input type="email" class="input-text" name="stillness_gift_email[<?php echo esc_attr($cart_item_key); ?>]" id="stillness_gift_email_<?php echo esc_attr($cart_item_key); ?>" value="<?php echo esc_attr($email); ?>" autocomplete="email">
            </p>
            <div class="clear"></div>
        </div>
        <?php
    }

    public static function save_cart_fields(): void {
        if (empty($_POST['stillness_gift_name']) || !is_array($_POST['stillness_gift_name'])) {
            return;
        }

        if (empty($_POST['_stillness_cart_gift_nonce'])) {
            return;
        }

        $nonce = sanitize_text_field(wp_unslash($_POST['_stillness_cart_gift_nonce']));

        if (!wp_verify_nonce($nonce, 'stillness_cart_gift')) {
            return;
        }

        if (!function_exists('WC') || !WC()->cart) {
            return;
        }

        $names = wp_unslash($_POST['stillness_gift_name']);
        $emails = isset($_POST['stillness_gift_email']) && is_array($_POST['stillness_gift_email'])
            ? wp_unslash($_POST['stillness_gift_email'])
            : [];

        foreach (WC()->cart->get_cart() as $key => $item) {
            if (!isset($names[$key])) {
                continue;
            }

            WC()->cart->cart_contents[$key]['stillness_gift_name'] = sanitize_text_field((string) $names[$key]);
            WC()->cart->cart_contents[$key]['stillness_gift_email'] = sanitize_email((string) ($emails[$key] ?? ''));
        }

        WC()->cart->set_session();
    }

    public static function checkout_fields(): void {
        if (!function_exists('WC') || !WC()->cart) {
            return;
        }

        $gifts = [];

        foreach (WC()->cart->get_cart() as $key => $item) {
            if (empty($item['data']) || !$item['data'] instanceof \WC_Product) {
                continue;
            }

            $plan = Plans::for_product($item['data']);

            if (!$plan || !Plans::is_gift($plan)) {
                continue;
            }

            $gifts[$key] = $item;
        }

        if (!$gifts) {
            return;
        }
        ?>
        <style>
            .stillness-gift-checkout{margin-top:1.5rem;padding-top:1.5rem;border-top:1px solid #e5e0d8}
            .stillness-gift-checkout h3{margin:0 0 .35rem;font-size:1.35rem;line-height:1.2}
            .stillness-gift-checkout>p{margin:0 0 1rem;color:#5b6470}
            .stillness-gift-item{margin-top:1rem;padding:1rem;border:1px solid #e5e0d8;border-radius:8px;background:#fffdf8}
            .stillness-gift-item h4{margin:0 0 .75rem;font-size:1rem}
        </style>
        <div class="stillness-gift-checkout">
            <h3>Gift recipient</h3>
            <p>We'll send the dates and details to the recipient. You will still receive the order receipt and a gift thank-you.</p>

            <?php foreach ($gifts as $key => $item): ?>
                <?php
                $name = isset($_POST['stillness_gift_name'][$key])
                    ? sanitize_text_field(wp_unslash((string) $_POST['stillness_gift_name'][$key]))
                    : (isset($item['stillness_gift_name']) ? (string) $item['stillness_gift_name'] : '');
                $email = isset($_POST['stillness_gift_email'][$key])
                    ? sanitize_email(wp_unslash((string) $_POST['stillness_gift_email'][$key]))
                    : (isset($item['stillness_gift_email']) ? (string) $item['stillness_gift_email'] : '');
                $product_name = $item['data']->get_name();
                ?>
                <div class="stillness-gift-item">
                    <h4><?php echo esc_html($product_name); ?></h4>
                    <p class="form-row form-row-first">
                        <label for="stillness_gift_name_<?php echo esc_attr($key); ?>">Recipient name <span class="required">*</span></label>
                        <input type="text" class="input-text" name="stillness_gift_name[<?php echo esc_attr($key); ?>]" id="stillness_gift_name_<?php echo esc_attr($key); ?>" value="<?php echo esc_attr($name); ?>" autocomplete="name" aria-required="true">
                    </p>
                    <p class="form-row form-row-last">
                        <label for="stillness_gift_email_<?php echo esc_attr($key); ?>">Recipient email <span class="required">*</span></label>
                        <input type="email" class="input-text" name="stillness_gift_email[<?php echo esc_attr($key); ?>]" id="stillness_gift_email_<?php echo esc_attr($key); ?>" value="<?php echo esc_attr($email); ?>" autocomplete="email" aria-required="true">
                    </p>
                    <div class="clear"></div>
                </div>
            <?php endforeach; ?>
        </div>
        <?php
    }

    public static function validate_checkout_fields(): void {
        if (!function_exists('WC') || !WC()->cart) {
            return;
        }

        $names = isset($_POST['stillness_gift_name']) && is_array($_POST['stillness_gift_name'])
            ? wp_unslash($_POST['stillness_gift_name'])
            : [];
        $emails = isset($_POST['stillness_gift_email']) && is_array($_POST['stillness_gift_email'])
            ? wp_unslash($_POST['stillness_gift_email'])
            : [];

        foreach (WC()->cart->get_cart() as $key => $item) {
            if (empty($item['data']) || !$item['data'] instanceof \WC_Product) {
                continue;
            }

            $plan = Plans::for_product($item['data']);

            if (!$plan || !Plans::is_gift($plan)) {
                continue;
            }

            $name = isset($names[$key]) ? sanitize_text_field((string) $names[$key]) : '';
            $email = isset($emails[$key]) ? sanitize_email((string) $emails[$key]) : '';

            if ($name === '' || !is_email($email)) {
                wc_add_notice(sprintf('Please enter the recipient name and a valid email for %s.', $item['data']->get_name()), 'error');
            }
        }
    }

    public static function save_order_item_fields($item, $cart_item_key, $values, $order): void {
        $product_id = isset($values['product_id']) ? (int) $values['product_id'] : 0;
        $plan = Plans::for_product($product_id);

        if (!$plan) {
            return;
        }

        $is_gift = Plans::is_gift($plan);
        $buyer_name = trim($order->get_formatted_billing_full_name());
        $buyer_email = sanitize_email($order->get_billing_email());

        if ($buyer_name === '') {
            $buyer_name = $buyer_email;
        }

        $item->add_meta_data(Plugin::META_PLAN, $plan, true);
        $item->add_meta_data(Plugin::META_TOTAL, Plans::total_for_item($item), true);
        $item->add_meta_data(Plugin::META_BUYER_NAME, $buyer_name, true);
        $item->add_meta_data(Plugin::META_BUYER_EMAIL, $buyer_email, true);
        $item->add_meta_data(Plugin::META_IS_GIFT, $is_gift ? 1 : 0, true);

        if ($is_gift) {
            $names = isset($_POST['stillness_gift_name']) && is_array($_POST['stillness_gift_name'])
                ? wp_unslash($_POST['stillness_gift_name'])
                : [];
            $emails = isset($_POST['stillness_gift_email']) && is_array($_POST['stillness_gift_email'])
                ? wp_unslash($_POST['stillness_gift_email'])
                : [];

            $name = isset($names[$cart_item_key]) ? sanitize_text_field((string) $names[$cart_item_key]) : '';
            $email = isset($emails[$cart_item_key]) ? sanitize_email((string) $emails[$cart_item_key]) : '';

            if ($name === '') {
                $name = 'Gift recipient';
            }

            if (!is_email($email)) {
                $email = $buyer_email;
                $order->add_order_note(sprintf('Stillness: gift recipient details were missing for %s. The welcome email will go to the buyer.', $item->get_name()));
            }

            $item->add_meta_data(Plugin::META_MEMBER_NAME, $name, true);
            $item->add_meta_data(Plugin::META_MEMBER_EMAIL, $email, true);
        } else {
            $item->add_meta_data(Plugin::META_MEMBER_NAME, $buyer_name, true);
            $item->add_meta_data(Plugin::META_MEMBER_EMAIL, $buyer_email, true);
        }
    }

    public static function validate_quantity($passed, $product_id, $quantity) {
        $plan = Plans::for_product($product_id);

        if ($plan && (float) $quantity > 1) {
            wc_add_notice('Each package is limited to one per order. Please add one of each package at a time.', 'error');
            return false;
        }

        return $passed;
    }
}

final class Emails {
    public static function send_welcome(\WC_Order $order, $item) {
        if (!$item instanceof \WC_Order_Item_Product) {
            return new \WP_Error('stillness_item', 'Invalid order item.');
        }

        $plan = Plans::for_item($item);

        if (!$plan) {
            return new \WP_Error('stillness_plan', 'Unknown package.');
        }

        $is_gift = (bool) $item->get_meta(Plugin::META_IS_GIFT);
        $member_name = (string) $item->get_meta(Plugin::META_MEMBER_NAME);
        $member_email = sanitize_email((string) $item->get_meta(Plugin::META_MEMBER_EMAIL));

        if (!is_email($member_email)) {
            return new \WP_Error('stillness_email', 'The member email is missing.');
        }

        $first = self::first_name($member_name);
        $hello = $first !== '' ? sprintf('Hello %s,', $first) : 'Hello,';
        $buyer_name = (string) $item->get_meta(Plugin::META_BUYER_NAME);
        $total = Plans::total_for_item($item);

        if ($is_gift) {
            $intro = sprintf(
                '%s bought you %s. We are glad you are here.',
                $buyer_name !== '' ? $buyer_name : 'Someone who cares about you',
                self::plan_phrase($plan)
            );
        } else {
            $intro = sprintf('Thank you for choosing %s. Your place is ready.', self::plan_phrase($plan));
        }

        $body = self::paragraph($hello);
        $body .= self::paragraph($intro);

        if ($is_gift) {
            $body .= self::paragraph('We will write to you directly from here. Your gift does not renew and there is nothing to cancel.');
        }

        $body .= self::heading('Your evenings');
        $body .= self::sessions_list();
        $body .= self::paragraph(self::use_copy($total, $plan));

        if ($is_gift) {
            $body .= self::paragraph(sprintf('This gift was purchased by %s.', $buyer_name !== '' ? $buyer_name : 'your gift giver'));
        }

        $body .= self::calendar_button();

        $body .= self::heading('How it works');
        $body .= self::list_html([
            'These are the evenings in your package. There is nothing to choose now.',
            'Before each evening we will send you a reminder with the date, time and venue.',
            'If your plans change, reply to the email and a person will help.',
        ]);
        $body .= self::paragraph('If anything changes, reply to this email. A person will read it.');

        $type = 'welcome';
        $subject = $is_gift ? 'Your Stillness gift is ready' : 'Welcome to Stillness';
        $subject = (string) apply_filters('stillness_packages_email_subject', $subject, $type, $order, $item, null);
        $body = (string) apply_filters('stillness_packages_email_body', $body, $type, $order, $item, null);
        $preheader = (string) apply_filters('stillness_packages_email_preheader', $intro, $type, $order, $item, null);
        $html = self::wrap('Your Stillness package', $body, $preheader);
        $html = (string) apply_filters('stillness_packages_email_html', $html, $type, $order, $item, null);

        return self::send($member_email, $subject, $html, $type, $order, $item);
    }

    public static function send_gift_thankyou(\WC_Order $order, $item) {
        if (!$item instanceof \WC_Order_Item_Product) {
            return new \WP_Error('stillness_item', 'Invalid order item.');
        }

        $plan = Plans::for_item($item);

        if (!$plan) {
            return new \WP_Error('stillness_plan', 'Unknown package.');
        }

        $buyer_email = sanitize_email((string) $item->get_meta(Plugin::META_BUYER_EMAIL));

        if (!is_email($buyer_email)) {
            return new \WP_Error('stillness_email', 'The buyer email is missing.');
        }

        $buyer_name = (string) $item->get_meta(Plugin::META_BUYER_NAME);
        $member_name = (string) $item->get_meta(Plugin::META_MEMBER_NAME);
        $member_email = sanitize_email((string) $item->get_meta(Plugin::META_MEMBER_EMAIL));
        $first = self::first_name($buyer_name);
        $hello = $first !== '' ? sprintf('Hello %s,', $first) : 'Hello,';

        if ($member_email !== '' && $member_email !== $buyer_email) {
            $delivery = sprintf('We have emailed %s at %s with the dates and details.', $member_name ?: 'your recipient', $member_email);
        } else {
            $delivery = 'We have emailed the package details to you because no separate recipient address was provided. You can forward that email to your recipient.';
        }

        $body = self::paragraph($hello);
        $body .= self::paragraph(sprintf('Your gift is booked: %s.', self::plan_phrase($plan)));
        $body .= self::paragraph($delivery);
        $body .= self::paragraph('They will receive the reminders directly. You do not need to do anything else.');
        $body .= self::paragraph('If you would like the welcome note to go to a different address, reply to this email and we will fix it.');
        $body .= self::paragraph('With care,<br>Stillness');

        $type = 'gift_thankyou';
        $subject = 'Your Stillness gift is booked';
        $subject = (string) apply_filters('stillness_packages_email_subject', $subject, $type, $order, $item, null);
        $body = (string) apply_filters('stillness_packages_email_body', $body, $type, $order, $item, null);
        $preheader = (string) apply_filters('stillness_packages_email_preheader', 'Your gift is booked.', $type, $order, $item, null);
        $html = self::wrap('Your Stillness gift', $body, $preheader);
        $html = (string) apply_filters('stillness_packages_email_html', $html, $type, $order, $item, null);

        return self::send($buyer_email, $subject, $html, $type, $order, $item);
    }

    public static function send_reminder(\WC_Order $order, $item, array $session) {
        if (!$item instanceof \WC_Order_Item_Product) {
            return new \WP_Error('stillness_item', 'Invalid order item.');
        }

        $member_email = sanitize_email((string) $item->get_meta(Plugin::META_MEMBER_EMAIL));

        if (!is_email($member_email)) {
            return new \WP_Error('stillness_email', 'The member email is missing.');
        }

        if (empty($session['date'])) {
            return new \WP_Error('stillness_session', 'This session has no date yet.');
        }

        $member_name = (string) $item->get_meta(Plugin::META_MEMBER_NAME);
        $first = self::first_name($member_name);
        $hello = $first !== '' ? sprintf('Hello %s,', $first) : 'Hello,';

        $body = self::paragraph($hello);
        $body .= self::paragraph(sprintf('This is a reminder for %s.', Sessions::format_date($session)));
        $body .= self::details_table($session);
        $body .= self::paragraph('If you cannot make it, reply to this email and we will help.');
        $body .= self::paragraph('We look forward to seeing you.');

        $type = 'reminder';
        $subject = 'Stillness reminder · ' . Sessions::short_date($session);
        $subject = (string) apply_filters('stillness_packages_email_subject', $subject, $type, $order, $item, $session);
        $body = (string) apply_filters('stillness_packages_email_body', $body, $type, $order, $item, $session);
        $preheader = (string) apply_filters('stillness_packages_email_preheader', sprintf('A reminder for %s.', Sessions::format_date($session)), $type, $order, $item, $session);
        $html = self::wrap(
            'Stillness reminder · ' . Sessions::short_date($session),
            $body,
            $preheader
        );
        $html = (string) apply_filters('stillness_packages_email_html', $html, $type, $order, $item, $session);

        return self::send($member_email, $subject, $html, $type, $order, $item, $session);
    }

    public static function send(string $to, string $subject, string $html, string $type = '', $order = null, $item = null, $session = null) {
        if (!is_email($to)) {
            return new \WP_Error('stillness_email', 'The recipient email is invalid.');
        }

        $headers = [
            'Content-Type: text/html; charset=UTF-8',
            sprintf('From: %s <%s>', self::from_name(), self::from_email()),
        ];

        $headers = apply_filters('stillness_packages_email_headers', $headers, $type, $order, $item, $session);
        $sent = wp_mail($to, $subject, $html, $headers);

        if (!$sent) {
            global $phpmailer;
            $error = 'WordPress could not send the email.';

            if (isset($phpmailer) && is_object($phpmailer) && !empty($phpmailer->ErrorInfo)) {
                $error = wp_strip_all_tags((string) $phpmailer->ErrorInfo);
            }

            return new \WP_Error('stillness_mail', $error);
        }

        return true;
    }

    private static function wrap(string $title, string $body, string $preheader = ''): string {
        $logo = self::logo_html();
        $site = home_url('/');
        $site_name = get_bloginfo('name') ?: 'Stillness';
        $footer = self::footer();

        $template = <<<'HTML'
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{{TITLE}}</title>
</head>
<body style="margin:0;padding:0;background:#f2eee6;" bgcolor="#f2eee6">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">{{PREHEADER}}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f2eee6;" bgcolor="#f2eee6">
<tr>
<td align="center" style="padding:28px 12px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background:#fffdf8;border:1px solid #e2d9cc;border-radius:4px;" bgcolor="#fffdf8">
<tr>
<td style="padding:30px 32px 10px;text-align:center;">{{LOGO}}</td>
</tr>
<tr>
<td style="padding:6px 32px 30px;font-family:Georgia,'Times New Roman',serif;font-size:16px;line-height:1.65;color:#2f3a33;">
{{BODY}}
</td>
</tr>
</table>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">
<tr>
<td style="padding:18px 20px 8px;text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:12px;line-height:1.6;color:#8a7a66;">
{{FOOTER}}
</td>
</tr>
</table>
</td>
</tr>
</table>
</body>
</html>
HTML;

        return strtr($template, [
            '{{TITLE}}' => esc_html($title),
            '{{PREHEADER}}' => esc_html($preheader),
            '{{LOGO}}' => $logo,
            '{{BODY}}' => $body,
            '{{FOOTER}}' => $footer,
            '{{SITE}}' => esc_url($site),
            '{{SITE_NAME}}' => esc_html($site_name),
        ]);
    }

    private static function logo_html(): string {
        $logo_id = (int) get_option('site_logo');

        if ($logo_id > 0) {
            $url = wp_get_attachment_image_url($logo_id, 'medium');

            if ($url) {
                return sprintf(
                    '<img src="%s" alt="%s" width="132" style="display:inline-block;max-width:132px;height:auto;border:0;">',
                    esc_url($url),
                    esc_attr(get_bloginfo('name') ?: 'Stillness')
                );
            }
        }

        return sprintf(
            '<div style="font-family:Georgia,\'Times New Roman\',serif;font-size:23px;letter-spacing:.12em;text-transform:uppercase;color:#2f3a33;">%s</div>',
            esc_html(get_bloginfo('name') ?: 'Stillness')
        );
    }

    private static function footer(): string {
        $links = [];

        foreach (Plugin::social_links() as $label => $url) {
            if ($url === '') {
                continue;
            }

            $links[] = sprintf(
                '<a href="%s" style="color:#6f6252;text-decoration:none;">%s</a>',
                esc_url($url),
                esc_html($label)
            );
        }

        $line = sprintf(
            '<a href="%s" style="color:#6f6252;text-decoration:none;">%s</a>',
            esc_url(home_url('/')),
            esc_html(get_bloginfo('name') ?: 'Stillness')
        );

        if ($links) {
            $line .= ' &middot; ' . implode(' &middot; ', $links);
        }

        $line .= '<br>You received this email because you bought or were gifted a Stillness package.';

        return $line;
    }

    private static function paragraph(string $text): string {
        return '<p style="margin:0 0 18px;font-family:Georgia,\'Times New Roman\',serif;font-size:16px;line-height:1.65;color:#2f3a33;">' . wp_kses_post($text) . '</p>';
    }

    private static function heading(string $text): string {
        return '<h2 style="margin:28px 0 12px;font-family:Georgia,\'Times New Roman\',serif;font-size:13px;font-weight:normal;letter-spacing:.16em;text-transform:uppercase;color:#8a7a66;">' . esc_html($text) . '</h2>';
    }

    private static function list_html(array $items): string {
        $html = '<ul style="margin:0 0 18px 20px;padding:0;font-family:Georgia,\'Times New Roman\',serif;font-size:16px;line-height:1.65;color:#2f3a33;">';

        foreach ($items as $item) {
            $html .= '<li style="margin:0 0 8px;padding-left:4px;">' . esc_html($item) . '</li>';
        }

        return $html . '</ul>';
    }

    private static function button(string $url, string $label, string $background = '#2f3a33', string $color = '#fffdf8', bool $outline = false): string {
        $border = $outline ? 'border:1px solid #2f3a33;' : 'border:1px solid ' . $background . ';';

        return sprintf(
            '<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 10px;"><tr><td style="border-radius:3px;background:%s;%s"><a href="%s" style="display:inline-block;padding:13px 22px;font-family:Helvetica,Arial,sans-serif;font-size:13px;line-height:1.2;letter-spacing:.05em;text-transform:uppercase;text-decoration:none;color:%s;">%s</a></td></tr></table>',
            esc_attr($background),
            esc_attr($border),
            esc_url($url),
            esc_attr($color),
            esc_html($label)
        );
    }

    private static function calendar_button(): string {
        $url = Settings::google_calendar_url();

        if ($url === '') {
            return '';
        }

        return '<div style="margin:20px 0 8px;">' . self::button($url, 'Add the dates to your calendar', '#fffdf8', '#2f3a33', true) . '</div>';
    }

    private static function details_table(array $session): string {
        $rows = [
            'Date' => Sessions::format_date($session),
            'Time' => Sessions::format_time($session),
        ];

        if (!empty($session['venue'])) {
            $rows['Venue'] = (string) $session['venue'];
        }

        $html = '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 22px;border-top:1px solid #e2d9cc;border-bottom:1px solid #e2d9cc;">';

        foreach ($rows as $label => $value) {
            $html .= sprintf(
                '<tr><td style="padding:10px 0;font-family:Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#8a7a66;width:88px;">%s</td><td style="padding:10px 0;font-family:Georgia,\'Times New Roman\',serif;font-size:16px;color:#2f3a33;">%s</td></tr>',
                esc_html($label),
                esc_html($value)
            );
        }

        return $html . '</table>';
    }

    private static function sessions_list(): string {
        $sessions = Sessions::upcoming();

        if (!$sessions) {
            return self::paragraph('The dates for the next series are being confirmed. We will email them to you as soon as they are set.');
        }

        $html = '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 14px;border-top:1px solid #e2d9cc;">';

        foreach ($sessions as $session) {
            $html .= sprintf(
                '<tr><td style="padding:10px 0;border-bottom:1px solid #e2d9cc;font-family:Georgia,\'Times New Roman\',serif;font-size:16px;color:#2f3a33;">%s</td><td style="padding:10px 0;border-bottom:1px solid #e2d9cc;font-family:Georgia,\'Times New Roman\',serif;font-size:16px;color:#2f3a33;text-align:right;">%s</td></tr>',
                esc_html(Sessions::format_date($session)),
                esc_html(Sessions::format_time($session))
            );
        }

        $html .= '</table>';

        $venue = '';

        foreach ($sessions as $session) {
            if (!empty($session['venue'])) {
                $venue = (string) $session['venue'];
                break;
            }
        }

        if ($venue !== '') {
            $html .= self::paragraph('All evenings are held at ' . esc_html($venue) . '.');
        }

        return $html;
    }

    private static function use_copy(int $total, string $plan): string {
        if (Plans::is_gift($plan)) {
            return sprintf('This gift includes %d %s.', $total, $total === 1 ? 'evening' : 'evenings');
        }

        if ($total === 1) {
            return 'This package includes one evening. We will send you the details before the date.';
        }

        return sprintf('This package includes %d evenings. We will send you a reminder before each date.', $total);
    }

    private static function plan_phrase(string $plan): string {
        $phrases = [
            'mens-annual' => 'a year of Stillness, twelve evenings in all',
            'mens-six-month' => 'six evenings of Stillness',
            'mens-single' => 'a single evening of Stillness',
            'mens-gift-annual' => 'a year of Stillness, twelve evenings in all',
            'mens-gift-single' => 'a single evening of Stillness',
        ];

        return $phrases[$plan] ?? 'a Stillness package';
    }

    private static function first_name(string $name): string {
        $name = trim($name);

        if ($name === '') {
            return '';
        }

        $parts = preg_split('/\s+/u', $name);
        return is_array($parts) && isset($parts[0]) ? $parts[0] : $name;
    }

    private static function from_name(): string {
        $name = wp_specialchars_decode(get_bloginfo('name'), ENT_QUOTES);
        return $name !== '' ? $name : 'Stillness';
    }

    private static function from_email(): string {
        $email = sanitize_email((string) get_option('woocommerce_email_from_address'));

        if (!is_email($email)) {
            $email = sanitize_email((string) get_option('admin_email'));
        }

        if (!is_email($email)) {
            $host = (string) wp_parse_url(home_url(), PHP_URL_HOST);
            $host = preg_replace('/^www\./', '', $host);
            $email = 'hello@' . ($host !== '' ? $host : 'stillnessco.com');
        }

        return $email;
    }
}

final class Reminders {
    private const BATCH_SIZE = 5;
    private const STALE_AFTER = 600;

    public static function init(): void {
        add_action(Plugin::AS_HOOK, [self::class, 'handle_batch']);
        add_action('admin_post_stillness_start_reminder', [self::class, 'handle_start']);
        add_action('admin_post_stillness_retry_reminder', [self::class, 'handle_retry']);
        add_action('wp_ajax_stillness_reminder_status', [self::class, 'ajax_status']);
        add_action('init', [self::class, 'maybe_resume'], 20);
    }

    public static function handle_start(): void {
        if (!current_user_can('manage_woocommerce')) {
            wp_die('You do not have permission to send reminders.', '', ['response' => 403]);
        }

        check_admin_referer(Plugin::NONCE);

        $session_id = isset($_POST['session_id']) ? sanitize_key(wp_unslash($_POST['session_id'])) : '';
        $result = self::start($session_id);
        $notice = is_wp_error($result) ? 'start_' . $result->get_error_code() : 'reminder_started';

        wp_safe_redirect(add_query_arg([
            'page' => Plugin::SLUG,
            'stillness_notice' => $notice,
        ], admin_url('admin.php')));
        exit;
    }

    public static function handle_retry(): void {
        if (!current_user_can('manage_woocommerce')) {
            wp_die('You do not have permission to send reminders.', '', ['response' => 403]);
        }

        check_admin_referer(Plugin::NONCE);

        $result = self::retry();
        $notice = is_wp_error($result) ? 'retry_' . $result->get_error_code() : 'reminder_retried';

        wp_safe_redirect(add_query_arg([
            'page' => Plugin::SLUG,
            'stillness_notice' => $notice,
        ], admin_url('admin.php')));
        exit;
    }

    public static function ajax_status(): void {
        check_ajax_referer(Plugin::NONCE, 'nonce');

        if (!current_user_can('manage_woocommerce')) {
            wp_send_json_error(['message' => 'Permission denied.'], 403);
        }

        $batch = self::batch();

        if (!$batch) {
            wp_send_json_success(['status' => 'idle', 'running' => false]);
        }

        wp_send_json_success(self::status_payload($batch));
    }

    public static function start(string $session_id) {
        if (!current_user_can('manage_woocommerce')) {
            return new \WP_Error('forbidden', 'You do not have permission to send reminders.');
        }

        $session = Sessions::get($session_id);

        if (!$session) {
            return new \WP_Error('bad_session', 'That date does not exist.');
        }

        if (!Sessions::has_date($session)) {
            return new \WP_Error('no_date', 'Add a date to this evening before sending reminders.');
        }

        if (Sessions::is_past($session)) {
            return new \WP_Error('past', 'That evening has already passed.');
        }

        $current = self::batch();

        if ($current && ($current['status'] ?? '') === 'running') {
            if (time() - (int) $current['updated'] <= self::STALE_AFTER) {
                return new \WP_Error('busy', 'A reminder batch is already running.');
            }

            self::mark_stale();
        }

        $queue = self::queue_for($session_id);

        if (!$queue) {
            return new \WP_Error('none', 'Everyone active has already been reminded for this evening.');
        }

        $batch = [
            'id' => wp_generate_uuid4(),
            'session_id' => $session_id,
            'status' => 'running',
            'created' => time(),
            'updated' => time(),
            'window' => Settings::batch_window(),
            'total' => count($queue),
            'sent' => 0,
            'failed' => 0,
            'skipped' => 0,
            'cursor' => 0,
            'queue' => $queue,
            'last_error' => '',
        ];

        update_option(Plugin::BATCH_OPTION, $batch, false);
        self::schedule(0);

        return $batch;
    }

    public static function retry() {
        if (!current_user_can('manage_woocommerce')) {
            return new \WP_Error('forbidden', 'You do not have permission to send reminders.');
        }

        $batch = self::batch();

        if (!$batch) {
            return new \WP_Error('none', 'There is no reminder batch to retry.');
        }

        if (($batch['status'] ?? '') === 'running' && time() - (int) $batch['updated'] <= self::STALE_AFTER) {
            return new \WP_Error('busy', 'This reminder batch is still running.');
        }

        $queue = isset($batch['queue']) && is_array($batch['queue']) ? $batch['queue'] : [];
        $reset = 0;

        foreach ($queue as $index => $row) {
            if (($row['status'] ?? '') === 'failed') {
                $queue[$index]['status'] = 'queued';
                $queue[$index]['error'] = '';
                $queue[$index]['time'] = 0;
                $reset++;
            }
        }

        $pending = 0;

        foreach ($queue as $row) {
            if (($row['status'] ?? '') === 'queued') {
                $pending++;
            }
        }

        if ($reset === 0 && $pending === 0) {
            return new \WP_Error('none', 'There are no failed emails to retry.');
        }

        $batch['queue'] = $queue;
        $batch['cursor'] = 0;
        $batch['failed'] = 0;
        $batch['status'] = 'running';
        $batch['updated'] = time();
        $batch['last_error'] = '';

        update_option(Plugin::BATCH_OPTION, $batch, false);
        self::schedule(0);

        return $batch;
    }

    public static function handle_batch(): void {
        $batch = self::batch();

        if (!$batch || ($batch['status'] ?? '') !== 'running') {
            return;
        }

        if (time() - (int) $batch['updated'] > self::STALE_AFTER) {
            self::mark_stale();
            return;
        }

        if (get_transient(Plugin::LOCK_TRANSIENT)) {
            return;
        }

        set_transient(Plugin::LOCK_TRANSIENT, 1, 60);

        try {
            $session = Sessions::get((string) $batch['session_id']);

            if (!$session) {
                self::finish($batch, 'failed', 'The evening no longer exists.');
                return;
            }

            $queue = isset($batch['queue']) && is_array($batch['queue']) ? $batch['queue'] : [];
            $count = count($queue);
            $processed = 0;

            for ($index = 0; $index < $count && $processed < self::BATCH_SIZE; $index++) {
                if (($queue[$index]['status'] ?? '') !== 'queued') {
                    continue;
                }

                $result = self::send_one($queue[$index], $session);
                $queue[$index]['status'] = $result['status'];
                $queue[$index]['error'] = $result['error'];
                $queue[$index]['time'] = time();
                $batch['last_error'] = $result['error'];
                $processed++;

                if ($result['status'] === 'sent') {
                    $batch['sent']++;
                } elseif ($result['status'] === 'failed') {
                    $batch['failed']++;
                } else {
                    $batch['skipped']++;
                }

                $batch['queue'] = $queue;
                $batch['cursor'] = $index + 1;
                $batch['updated'] = time();
                update_option(Plugin::BATCH_OPTION, $batch, false);
            }

            $batch['queue'] = $queue;

            if (self::has_queued($queue)) {
                $batch['status'] = 'running';
                $batch['updated'] = time();
                update_option(Plugin::BATCH_OPTION, $batch, false);
                self::schedule(self::gap($batch));
            } else {
                self::finish($batch, 'completed');
            }
        } finally {
            delete_transient(Plugin::LOCK_TRANSIENT);
        }
    }

    public static function maybe_resume(): void {
        if (!is_admin() && !wp_doing_cron()) {
            return;
        }

        $batch = self::batch();

        if (!$batch || ($batch['status'] ?? '') !== 'running') {
            return;
        }

        if (time() - (int) $batch['updated'] > self::STALE_AFTER) {
            self::mark_stale();
            return;
        }

        if (self::has_pending_action()) {
            return;
        }

        self::schedule(1);
    }

    public static function batch(): ?array {
        $batch = get_option(Plugin::BATCH_OPTION);

        return is_array($batch) && isset($batch['status']) ? $batch : null;
    }

    public static function queue_for(string $session_id): array {
        $out = [];

        foreach (Memberships::all_items() as $membership) {
            if ($membership['status'] !== 'active') {
                continue;
            }

            if ($membership['remaining'] <= 0) {
                continue;
            }

            $item = $membership['item'];

            if (self::already_sent($item, $session_id) || self::is_skipped($item, $session_id)) {
                continue;
            }

            $out[] = [
                'order_id' => (int) $membership['order_id'],
                'item_id' => (int) $membership['item_id'],
                'name' => (string) $membership['member_name'],
                'email' => (string) $membership['member_email'],
                'status' => 'queued',
                'error' => '',
                'time' => 0,
            ];
        }

        return $out;
    }

    public static function not_reminded_count(string $session_id): int {
        return count(self::queue_for($session_id));
    }

    public static function status_payload(array $batch): array {
        $total = max(0, (int) $batch['total']);
        $sent = (int) $batch['sent'];
        $failed = (int) $batch['failed'];
        $skipped = (int) $batch['skipped'];
        $done = min($total, $sent + $failed + $skipped);
        $status = (string) $batch['status'];
        $stale = $status === 'running' && time() - (int) $batch['updated'] > self::STALE_AFTER;

        if ($stale) {
            $status = 'stale';
        }

        $queued = 0;
        $queue = isset($batch['queue']) && is_array($batch['queue']) ? $batch['queue'] : [];

        foreach ($queue as $row) {
            if (($row['status'] ?? '') === 'queued') {
                $queued++;
            }
        }

        $session = Sessions::get((string) $batch['session_id']);

        return [
            'status' => $status,
            'session' => $session ? Sessions::label($session) : '',
            'total' => $total,
            'sent' => $sent,
            'failed' => $failed,
            'skipped' => $skipped,
            'queued' => $queued,
            'done' => $done,
            'percent' => $total > 0 ? (int) round(($done / $total) * 100) : 0,
            'running' => $status === 'running',
            'stale' => $stale,
            'retryable' => $status !== 'running' && ($failed > 0 || $queued > 0),
            'last_error' => (string) ($batch['last_error'] ?? ''),
            'updated' => human_time_diff((int) $batch['updated'], time()) . ' ago',
        ];
    }

    private static function send_one(array $row, array $session): array {
        $order = wc_get_order((int) $row['order_id']);

        if (!$order instanceof \WC_Order) {
            return ['status' => 'failed', 'error' => 'The order could not be loaded.'];
        }

        $items = $order->get_items();
        $item = $items[(int) $row['item_id']] ?? null;

        if (!$item instanceof \WC_Order_Item_Product || !Plans::for_item($item)) {
            return ['status' => 'skipped', 'error' => 'The package no longer exists on this order.'];
        }

        if ((int) $item->get_meta(Plugin::META_CANCELLED) === 1) {
            return ['status' => 'skipped', 'error' => 'The membership is cancelled.'];
        }

        if (!in_array($order->get_status(), ['processing', 'completed'], true)) {
            return ['status' => 'skipped', 'error' => 'The order is not paid.'];
        }

        if (Memberships::remaining($item) <= 0) {
            return ['status' => 'skipped', 'error' => 'The package has no evenings left.'];
        }

        $session_id = (string) $session['id'];

        if (self::already_sent($item, $session_id)) {
            return ['status' => 'skipped', 'error' => 'A reminder was already sent.'];
        }

        $result = Emails::send_reminder($order, $item, $session);

        if (is_wp_error($result)) {
            self::set_error($item, $session_id, $result->get_error_message());
            return ['status' => 'failed', 'error' => $result->get_error_message()];
        }

        self::set_sent($item, $session_id);

        return ['status' => 'sent', 'error' => ''];
    }

    private static function gap(array $batch): int {
        $total = max(1, (int) $batch['total']);
        $batches = (int) ceil($total / self::BATCH_SIZE);

        if ($batches <= 1) {
            return 1;
        }

        $window = max(30, (int) $batch['window']);
        $gap = (int) floor(($window * 60) / ($batches - 1));

        return max(1, $gap);
    }

    private static function has_queued(array $queue): bool {
        foreach ($queue as $row) {
            if (($row['status'] ?? '') === 'queued') {
                return true;
            }
        }

        return false;
    }

    private static function schedule(int $delay): void {
        $timestamp = time() + max(0, $delay);

        if (function_exists('as_schedule_single_action')) {
            as_schedule_single_action($timestamp, Plugin::AS_HOOK, [], Plugin::AS_GROUP, true);
            return;
        }

        wp_schedule_single_event($timestamp, Plugin::AS_HOOK);
    }

    private static function has_pending_action(): bool {
        if (function_exists('as_has_scheduled_action')) {
            return (bool) as_has_scheduled_action(Plugin::AS_HOOK, [], Plugin::AS_GROUP);
        }

        return (bool) wp_next_scheduled(Plugin::AS_HOOK);
    }

    private static function mark_stale(): void {
        $batch = self::batch();

        if (!$batch) {
            return;
        }

        $batch['status'] = 'stale';
        $batch['updated'] = time();
        update_option(Plugin::BATCH_OPTION, $batch, false);
    }

    private static function finish(array $batch, string $status, string $error = ''): void {
        $batch['status'] = $status;
        $batch['last_error'] = $error;
        $batch['updated'] = time();
        update_option(Plugin::BATCH_OPTION, $batch, false);
    }

    private static function already_sent($item, string $session_id): bool {
        $sent = $item->get_meta(Plugin::META_SENT);
        return is_array($sent) && isset($sent[$session_id]);
    }

    private static function is_skipped($item, string $session_id): bool {
        $skipped = $item->get_meta(Plugin::META_SKIPPED);
        return is_array($skipped) && isset($skipped[$session_id]);
    }

    private static function set_sent($item, string $session_id): void {
        $sent = $item->get_meta(Plugin::META_SENT);

        if (!is_array($sent)) {
            $sent = [];
        }

        $sent[$session_id] = time();
        $item->update_meta_data(Plugin::META_SENT, $sent);

        $errors = $item->get_meta(Plugin::META_ERRORS);

        if (is_array($errors) && isset($errors[$session_id])) {
            unset($errors[$session_id]);
            $item->update_meta_data(Plugin::META_ERRORS, $errors);
        }

        $item->save();
        Memberships::flush_cache();
    }

    private static function set_error($item, string $session_id, string $message): void {
        $errors = $item->get_meta(Plugin::META_ERRORS);

        if (!is_array($errors)) {
            $errors = [];
        }

        $errors[$session_id] = [
            'message' => $message,
            'time' => time(),
        ];

        $item->update_meta_data(Plugin::META_ERRORS, $errors);
        $item->save();
        Memberships::flush_cache();
    }

    private static function mark_skipped($item, string $session_id): void {
        $skipped = $item->get_meta(Plugin::META_SKIPPED);

        if (!is_array($skipped)) {
            $skipped = [];
        }

        $skipped[$session_id] = time();
        $item->update_meta_data(Plugin::META_SKIPPED, $skipped);
        $item->save();
        Memberships::flush_cache();
    }
}

final class Admin {
    public static function init(): void {
        add_action('admin_menu', [self::class, 'menu']);
        add_action('admin_head', [self::class, 'head_styles']);
        add_action('admin_notices', [self::class, 'notices']);
        add_action('add_meta_boxes', [self::class, 'meta_box']);
        add_action('admin_post_stillness_save_settings', [self::class, 'save_settings']);
        add_action('admin_post_stillness_create_membership', [self::class, 'create_membership']);
        add_action('admin_post_stillness_resend_membership', [self::class, 'resend_welcome']);
        add_action('admin_post_stillness_cancel_membership', [self::class, 'cancel_membership']);
        add_action('admin_post_stillness_mark_used', [self::class, 'mark_used']);
        add_action('admin_post_stillness_reset_used', [self::class, 'reset_used']);
        add_action('admin_post_stillness_export_members', [self::class, 'export_members']);
    }

    public static function menu(): void {
        add_submenu_page(
            'woocommerce',
            'Stillness Packages',
            'Stillness Packages',
            'manage_woocommerce',
            Plugin::SLUG,
            [self::class, 'render_page']
        );
    }

    public static function head_styles(): void {
        $screen = function_exists('get_current_screen') ? get_current_screen() : null;

        if (!$screen) {
            return;
        }

        $is_page = $screen->id === 'woocommerce_page_' . Plugin::SLUG;
        $is_order = in_array($screen->id, ['shop_order', 'woocommerce_page_wc-orders'], true);

        if (!$is_page && !$is_order) {
            return;
        }

        echo '<style id="stillness-admin-css">' . self::css() . '</style>';
    }

    public static function notices(): void {
        if (isset($_GET['page']) && sanitize_key(wp_unslash($_GET['page'])) === Plugin::SLUG) {
            return;
        }

        self::notice();
    }

    public static function meta_box(): void {
        add_meta_box(
            'stillness-membership',
            'Stillness package',
            [self::class, 'render_order_box'],
            ['shop_order', 'woocommerce_page_wc-orders'],
            'side',
            'high'
        );
    }

    public static function render_page(): void {
        if (!current_user_can('manage_woocommerce')) {
            return;
        }

        $tab = isset($_GET['tab']) ? sanitize_key(wp_unslash($_GET['tab'])) : 'members';

        if (!in_array($tab, ['members', 'settings'], true)) {
            $tab = 'members';
        }

        $base = admin_url('admin.php?page=' . Plugin::SLUG);
        $export = wp_nonce_url(
            add_query_arg('action', 'stillness_export_members', admin_url('admin-post.php')),
            Plugin::NONCE
        );
        ?>
        <div class="wrap stillness-wrap">
            <div class="stillness-header">
                <div>
                    <h1 class="stillness-title">Stillness Packages</h1>
                    <p class="stillness-subtitle">Memberships, evenings and reminders for the men's series.</p>
                </div>
                <div class="stillness-header-actions">
                    <a class="button" href="<?php echo esc_url($export); ?>">Export members</a>
                </div>
            </div>

            <nav class="stillness-tabs">
                <a class="<?php echo $tab === 'members' ? 'is-active' : ''; ?>" href="<?php echo esc_url(add_query_arg('tab', 'members', $base)); ?>">Members</a>
                <a class="<?php echo $tab === 'settings' ? 'is-active' : ''; ?>" href="<?php echo esc_url(add_query_arg('tab', 'settings', $base)); ?>">Settings</a>
            </nav>

            <?php self::notice(); ?>

            <?php
            if ($tab === 'settings') {
                self::render_settings();
            } else {
                self::render_members();
            }
            ?>
        </div>
        <?php
        self::inline_script();
    }

    public static function save_settings(): void {
        if (!current_user_can('manage_woocommerce')) {
            wp_die('You do not have permission to change these settings.', '', ['response' => 403]);
        }

        check_admin_referer(Plugin::NONCE);

        if (!isset($_POST['stillness']) || !is_array($_POST['stillness'])) {
            self::redirect('settings_error', 'settings');
        }

        Settings::update(wp_unslash($_POST['stillness']));
        self::redirect('settings_saved', 'settings');
    }

    public static function create_membership(): void {
        if (!current_user_can('manage_woocommerce')) {
            wp_die('You do not have permission to change memberships.', '', ['response' => 403]);
        }

        check_admin_referer(Plugin::NONCE);

        $order_id = self::request_int('order_id');
        $order = wc_get_order($order_id);

        if (!$order instanceof \WC_Order) {
            self::redirect('membership_error');
        }

        $created = Memberships::create_for_order($order);
        $url = add_query_arg(
            'stillness_notice',
            $created ? 'membership_created' : 'membership_error',
            $order->get_edit_order_url()
        );

        wp_safe_redirect($url);
        exit;
    }

    public static function resend_welcome(): void {
        if (!current_user_can('manage_woocommerce')) {
            wp_die('You do not have permission to send this email.', '', ['response' => 403]);
        }

        check_admin_referer(Plugin::NONCE);

        $order_id = self::request_int('order_id');
        $item_id = self::request_int('item_id');
        $order = wc_get_order($order_id);

        if (!$order instanceof \WC_Order) {
            self::redirect('welcome_error');
        }

        $items = $order->get_items();
        $item = $items[$item_id] ?? null;

        if (!$item instanceof \WC_Order_Item_Product || !Plans::for_item($item)) {
            self::redirect('welcome_error');
        }

        $result = Emails::send_welcome($order, $item);

        if (is_wp_error($result)) {
            $item->update_meta_data(Plugin::META_WELCOME_ERROR, $result->get_error_message());
            $item->save();
            $notice = 'welcome_error';
        } else {
            $item->update_meta_data(Plugin::META_WELCOME_SENT, time());
            $item->delete_meta_data(Plugin::META_WELCOME_ERROR);
            $item->save();
            $order->add_order_note('Stillness: welcome email resent.');
            $notice = 'welcome_sent';
        }

        wp_safe_redirect(add_query_arg('stillness_notice', $notice, $order->get_edit_order_url()));
        exit;
    }

    public static function cancel_membership(): void {
        if (!current_user_can('manage_woocommerce')) {
            wp_die('You do not have permission to change memberships.', '', ['response' => 403]);
        }

        check_admin_referer(Plugin::NONCE);

        $order_id = self::request_int('order_id');
        $item_id = self::request_int('item_id');
        $order = wc_get_order($order_id);

        if (!$order instanceof \WC_Order) {
            self::redirect('membership_error');
        }

        $items = $order->get_items();
        $item = $items[$item_id] ?? null;

        if (!$item instanceof \WC_Order_Item_Product || !Plans::for_item($item)) {
            self::redirect('membership_error');
        }

        $cancelled = Memberships::cancel_item($order, $item, 'admin');
        $url = add_query_arg(
            'stillness_notice',
            $cancelled ? 'membership_cancelled' : 'membership_error',
            $order->get_edit_order_url()
        );

        wp_safe_redirect($url);
        exit;
    }

    public static function mark_used(): void {
        self::change_usage('mark');
    }

    public static function reset_used(): void {
        self::change_usage('reset');
    }

    private static function change_usage(string $mode): void {
        if (!current_user_can('manage_woocommerce')) {
            wp_die('You do not have permission to change usage.', '', ['response' => 403]);
        }

        check_admin_referer(Plugin::NONCE);

        $order_id = self::request_int('order_id');
        $item_id = self::request_int('item_id');
        $order = wc_get_order($order_id);

        if (!$order instanceof \WC_Order) {
            self::redirect('usage_error');
        }

        $items = $order->get_items();
        $item = $items[$item_id] ?? null;

        if (!$item instanceof \WC_Order_Item_Product || !Plans::for_item($item)) {
            self::redirect('usage_error');
        }

        $before = Memberships::used($item);
        $total = Plans::total_for_item($item);
        $after = $mode === 'reset' ? Memberships::reset_used($order, $item) : Memberships::mark_used($order, $item);

        if ($mode === 'mark' && $before >= $total) {
            $notice = 'usage_complete';
        } elseif ($before === $after) {
            $notice = 'usage_unchanged';
        } else {
            $notice = $mode === 'reset' ? 'usage_reset' : 'usage_marked';
        }

        $return = isset($_REQUEST['stillness_return']) ? sanitize_key(wp_unslash($_REQUEST['stillness_return'])) : '';
        $base = $order->get_edit_order_url();

        if ($return === 'members') {
            $referer = wp_get_referer();
            $base = $referer ?: add_query_arg(['page' => Plugin::SLUG, 'tab' => 'members'], admin_url('admin.php'));
        }

        wp_safe_redirect(add_query_arg('stillness_notice', $notice, $base));
        exit;
    }

    public static function export_members(): void {
        if (!current_user_can('manage_woocommerce')) {
            wp_die('You do not have permission to export members.', '', ['response' => 403]);
        }

        check_admin_referer(Plugin::NONCE);

        nocache_headers();
        header('Content-Type: text/csv; charset=utf-8');
        header('Content-Disposition: attachment; filename="stillness-members-' . gmdate('Y-m-d') . '.csv"');
        header('Pragma: no-cache');
        header('Expires: 0');

        $output = fopen('php://output', 'w');

        if (!$output) {
            exit;
        }

        fputcsv($output, [
            'Member',
            'Email',
            'Package',
            'Gift',
            'Evenings used',
            'Evenings total',
            'Remaining',
            'Status',
            'Buyer',
            'Buyer email',
            'Order',
            'Order date',
            'Joined',
        ], ',', '"', '');

        $date_format = get_option('date_format');

        foreach (Memberships::all_items(true) as $membership) {
            fputcsv($output, [
                $membership['member_name'],
                $membership['member_email'],
                $membership['label'],
                $membership['is_gift'] ? 'Yes' : 'No',
                $membership['used'],
                $membership['total'],
                $membership['remaining'],
                Memberships::status_label($membership['status']),
                $membership['buyer_name'],
                $membership['buyer_email'],
                $membership['order_number'],
                $membership['order_date'] > 0 ? date_i18n($date_format, $membership['order_date']) : '',
                date_i18n($date_format, $membership['created']),
            ], ',', '"', '');
        }

        fclose($output);
        exit;
    }

    public static function render_order_box($post): void {
        $order = null;

        if ($post instanceof \WC_Order) {
            $order = $post;
        } elseif (is_numeric($post)) {
            $order = wc_get_order((int) $post);
        } elseif (is_object($post) && isset($post->ID)) {
            $order = wc_get_order((int) $post->ID);
        }

        if (!$order instanceof \WC_Order) {
            echo '<p class="stillness-muted">Order not found.</p>';
            return;
        }

        $items = [];

        foreach ($order->get_items() as $item) {
            if ($item instanceof \WC_Order_Item_Product && Plans::for_item($item)) {
                $items[] = $item;
            }
        }

        if (!$items) {
            echo '<p class="stillness-muted">No Stillness package on this order.</p>';
            return;
        }

        $paid = in_array($order->get_status(), ['processing', 'completed'], true);

        foreach ($items as $index => $item) {
            $plan = Plans::for_item($item);
            $created = (int) $item->get_meta(Plugin::META_CREATED);
            $cancelled = (int) $item->get_meta(Plugin::META_CANCELLED) === 1;
            $member_name = (string) $item->get_meta(Plugin::META_MEMBER_NAME);
            $member_email = sanitize_email((string) $item->get_meta(Plugin::META_MEMBER_EMAIL));
            $total = Plans::total_for_item($item);
            $used = Memberships::used($item);
            $status = Memberships::status($order, $item);
            $welcome_error = (string) $item->get_meta(Plugin::META_WELCOME_ERROR);
            $members_url = add_query_arg(
                ['page' => Plugin::SLUG, 's' => $member_email !== '' ? $member_email : $order->get_order_number()],
                admin_url('admin.php')
            );
            ?>
            <div class="stillness-order-box">
                <?php if ($index > 0): ?><hr><?php endif; ?>
                <p><strong><?php echo esc_html(Plans::label($plan)); ?></strong></p>

                <?php if ($created > 0): ?>
                    <p>
                        <strong><?php echo esc_html($member_name !== '' ? $member_name : 'Gift recipient'); ?></strong><br>
                        <a href="mailto:<?php echo esc_attr($member_email); ?>"><?php echo esc_html($member_email); ?></a>
                    </p>
                    <p class="stillness-muted">
                        <?php echo esc_html(sprintf('%d of %d evenings used', $used, $total)); ?><br>
                        <?php echo esc_html(sprintf('%d left', max(0, $total - $used))); ?><br>
                        <?php echo esc_html(Memberships::status_label($status)); ?>
                    </p>

                    <?php if ($welcome_error !== ''): ?>
                        <p class="stillness-error">Welcome email: <?php echo esc_html($welcome_error); ?></p>
                    <?php endif; ?>

                    <?php if (!$cancelled): ?>
                        <?php if ($used < $total): ?>
                            <a class="button" href="<?php echo esc_url(self::action_url('stillness_mark_used', $order->get_id(), $item->get_id())); ?>">Mark one evening used</a>
                        <?php else: ?>
                            <button type="button" class="button" disabled>Mark one evening used</button>
                        <?php endif; ?>

                        <?php if ($used > 0): ?>
                            <a class="button button-link-delete" href="<?php echo esc_url(self::action_url('stillness_reset_used', $order->get_id(), $item->get_id())); ?>" onclick="return confirm('Reset usage to zero for this membership?');">Reset usage</a>
                        <?php endif; ?>
                    <?php endif; ?>

                    <a class="button" href="<?php echo esc_url(self::action_url('stillness_resend_membership', $order->get_id(), $item->get_id())); ?>">Resend welcome email</a>

                    <?php if (!$cancelled): ?>
                        <a class="button button-link-delete" href="<?php echo esc_url(self::action_url('stillness_cancel_membership', $order->get_id(), $item->get_id())); ?>" onclick="return confirm('Cancel this membership? The member will stop receiving reminders.');">Cancel membership</a>
                    <?php else: ?>
                        <p class="stillness-error">This membership is cancelled.</p>
                    <?php endif; ?>

                    <p><a href="<?php echo esc_url($members_url); ?>">Open in Stillness Packages</a></p>
                <?php else: ?>
                    <?php if ($paid): ?>
                        <p class="stillness-muted">This package has not been created yet. Creating it now will also send the welcome email.</p>
                        <a class="button button-primary" href="<?php echo esc_url(self::action_url('stillness_create_membership', $order->get_id())); ?>">Create membership</a>
                    <?php else: ?>
                        <p class="stillness-muted">The membership is created automatically when the order is paid.</p>
                    <?php endif; ?>
                <?php endif; ?>
            </div>
            <?php
        }
    }

private static function render_members(): void {
        $stats = Memberships::stats();
        $next = $stats['next'];
        $all = Memberships::all_items(true);

        $plan_filter = isset($_GET['plan']) ? sanitize_key(wp_unslash($_GET['plan'])) : '';
        $status_filter = isset($_GET['status']) ? sanitize_key(wp_unslash($_GET['status'])) : '';
        $search = isset($_GET['s']) ? sanitize_text_field(wp_unslash($_GET['s'])) : '';

        if ($plan_filter !== '' && !Plans::exists($plan_filter)) {
            $plan_filter = '';
        }

        $statuses = ['active', 'completed', 'expired', 'cancelled', 'inactive'];

        if (!in_array($status_filter, $statuses, true)) {
            $status_filter = '';
        }

        $filtered = array_values(array_filter($all, function ($membership) use ($plan_filter, $status_filter, $search) {
            if ($plan_filter !== '' && $membership['plan'] !== $plan_filter) {
                return false;
            }

            if ($status_filter !== '' && $membership['status'] !== $status_filter) {
                return false;
            }

            if ($search !== '') {
                $haystack = implode(' ', [
                    $membership['member_name'],
                    $membership['member_email'],
                    $membership['buyer_name'],
                    $membership['buyer_email'],
                    $membership['order_number'],
                ]);

                if (stripos($haystack, $search) === false) {
                    return false;
                }
            }

            return true;
        }));

        $per_page = 25;
        $total = count($filtered);
        $pages = max(1, (int) ceil($total / $per_page));
        $paged = isset($_GET['paged']) ? max(1, absint($_GET['paged'])) : 1;
        $paged = min($paged, $pages);
        $members = array_slice($filtered, ($paged - 1) * $per_page, $per_page);
        $date_format = get_option('date_format');
        ?>
        <div class="stillness-stats">
            <div class="stillness-stat">
                <span class="label">Memberships</span>
                <span class="value"><?php echo esc_html((string) $stats['memberships']); ?></span>
                <span class="hint">All time</span>
            </div>
            <div class="stillness-stat">
                <span class="label">Active</span>
                <span class="value"><?php echo esc_html((string) $stats['active']); ?></span>
                <span class="hint">With evenings left</span>
            </div>
            <div class="stillness-stat">
                <span class="label">Gifts</span>
                <span class="value"><?php echo esc_html((string) $stats['gifts']); ?></span>
                <span class="hint">Bought for someone else</span>
            </div>
            <div class="stillness-stat">
                <span class="label">Next evening</span>
                <span class="value"><?php echo esc_html($next ? Sessions::short_date($next) : 'Not set'); ?></span>
                <span class="hint"><?php echo esc_html($next ? Sessions::format_time($next) : 'Add dates in Settings'); ?></span>
            </div>
        </div>

        <div class="stillness-grid">
            <div>
                <div class="stillness-card">
                    <h2>Members</h2>

                    <form method="get" class="stillness-filters">
                        <input type="hidden" name="page" value="<?php echo esc_attr(Plugin::SLUG); ?>">
                        <input type="hidden" name="tab" value="members">
                        <select name="plan">
                            <option value="">All packages</option>
                            <?php foreach (Plans::all() as $key => $plan): ?>
                                <option value="<?php echo esc_attr($key); ?>" <?php selected($plan_filter, $key); ?>><?php echo esc_html($plan['label']); ?></option>
                            <?php endforeach; ?>
                        </select>
                        <select name="status">
                            <option value="">All statuses</option>
                            <?php foreach ($statuses as $status): ?>
                                <option value="<?php echo esc_attr($status); ?>" <?php selected($status_filter, $status); ?>><?php echo esc_html(Memberships::status_label($status)); ?></option>
                            <?php endforeach; ?>
                        </select>
                        <input type="search" name="s" value="<?php echo esc_attr($search); ?>" placeholder="Name, email or order">
                        <button class="button">Filter</button>
                        <a class="button-link" href="<?php echo esc_url(add_query_arg(['page' => Plugin::SLUG, 'tab' => 'members'], admin_url('admin.php'))); ?>">Reset</a>
                    </form>

                    <table class="widefat striped stillness-table">
                        <thead>
                            <tr>
                                <th>Member</th>
                                <th>Package</th>
                                <th>Evenings</th>
                                <th>Status</th>
                                <th>Order</th>
                                <th>Joined</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php if (!$members): ?>
                                <tr><td colspan="7" class="stillness-empty">No members match this view yet.</td></tr>
                            <?php endif; ?>

                            <?php foreach ($members as $membership): ?>
                                <tr>
                                    <td>
                                        <span class="stillness-member-name"><?php echo esc_html($membership['member_name'] !== '' ? $membership['member_name'] : '—'); ?></span>
                                        <?php if ($membership['is_gift']): ?><span class="stillness-gift-tag">Gift</span><?php endif; ?>
                                        <br><span class="stillness-member-email"><?php echo esc_html($membership['member_email']); ?></span>
                                    </td>
                                    <td><?php echo esc_html($membership['label']); ?></td>
                                    <td>
                                        <?php echo esc_html(sprintf('%d of %d used', $membership['used'], $membership['total'])); ?>
                                        <br><span class="stillness-muted"><?php echo esc_html(sprintf('%d left', $membership['remaining'])); ?></span>
                                    </td>
                                    <td><span class="stillness-status stillness-status-<?php echo esc_attr(sanitize_html_class($membership['status'])); ?>"><?php echo esc_html(Memberships::status_label($membership['status'])); ?></span></td>
                                    <td>
                                        <a href="<?php echo esc_url($membership['edit_url']); ?>">#<?php echo esc_html((string) $membership['order_number']); ?></a>
                                        <?php if ($membership['order_date'] > 0): ?>
                                            <br><span class="stillness-muted"><?php echo esc_html(date_i18n($date_format, $membership['order_date'])); ?></span>
                                        <?php endif; ?>
                                    </td>
                                    <td><?php echo esc_html(date_i18n($date_format, $membership['created'])); ?></td>
                                    <td class="stillness-usage-actions">
                                        <?php if ($membership['status'] === 'cancelled'): ?>
                                            <span class="stillness-muted">—</span>
                                        <?php else: ?>
                                            <?php if ($membership['used'] < $membership['total']): ?>
                                                <a class="button button-small" href="<?php echo esc_url(self::action_url('stillness_mark_used', $membership['order_id'], $membership['item_id'], ['stillness_return' => 'members'])); ?>">Mark used</a>
                                            <?php else: ?>
                                                <span class="stillness-muted">All used</span>
                                            <?php endif; ?>
                                            <?php if ($membership['used'] > 0): ?>
                                                <a class="button button-small button-link-delete" href="<?php echo esc_url(self::action_url('stillness_reset_used', $membership['order_id'], $membership['item_id'], ['stillness_return' => 'members'])); ?>" onclick="return confirm('Reset usage to zero for this membership?');">Reset</a>
                                            <?php endif; ?>
                                        <?php endif; ?>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>

                    <?php if ($pages > 1): ?>
                        <div class="tablenav">
                            <div class="tablenav-pages">
                                <?php
                                echo paginate_links([
                                    'base' => add_query_arg('paged', '%#%'),
                                    'format' => '',
                                    'current' => $paged,
                                    'total' => $pages,
                                    'prev_text' => '&lsaquo;',
                                    'next_text' => '&rsaquo;',
                                ]);
                                ?>
                            </div>
                        </div>
                    <?php endif; ?>
                </div>
            </div>

            <div>
                <?php self::render_reminder_card($next); ?>
            </div>
        </div>
        <?php
    }

    private static function render_reminder_card(?array $next): void {
        $settings_url = add_query_arg(['page' => Plugin::SLUG, 'tab' => 'settings'], admin_url('admin.php'));
        $batch = Reminders::batch();
        $payload = $batch ? Reminders::status_payload($batch) : null;
        $not_reminded = $next ? Reminders::not_reminded_count((string) $next['id']) : 0;
        ?>
        <div class="stillness-card">
            <h2>Send reminder</h2>

            <?php if (!$next): ?>
                <p class="stillness-muted">No upcoming evening. Add dates in <a href="<?php echo esc_url($settings_url); ?>">Settings</a>.</p>
                <?php return; ?>
            <?php endif; ?>

            <p>
                <strong><?php echo esc_html(Sessions::format_date($next)); ?></strong><br>
                <?php echo esc_html(Sessions::format_time($next)); ?>
            </p>
            <p class="stillness-muted"><?php echo esc_html(sprintf('%d %s to remind.', $not_reminded, $not_reminded === 1 ? 'member' : 'members')); ?></p>

            <?php if ($payload): ?>
                <div class="stillness-batch" data-stillness-batch data-running="<?php echo $payload['running'] ? '1' : '0'; ?>">
                    <p class="stillness-batch-status" data-stillness-status><?php echo esc_html(self::batch_status_label($payload['status'])); ?></p>
                    <div class="stillness-bar"><span data-stillness-bar style="width:<?php echo esc_attr((string) $payload['percent']); ?>%"></span></div>
                    <p class="stillness-counts" data-stillness-counts><?php echo esc_html(sprintf('%d sent · %d failed · %d skipped', $payload['sent'], $payload['failed'], $payload['skipped'])); ?></p>

                    <?php if ($payload['last_error'] !== ''): ?>
                        <p class="stillness-error"><?php echo esc_html($payload['last_error']); ?></p>
                    <?php endif; ?>

                    <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>" data-stillness-retry <?php echo $payload['retryable'] ? '' : 'hidden'; ?>>
                        <input type="hidden" name="action" value="stillness_retry_reminder">
                        <?php wp_nonce_field(Plugin::NONCE); ?>
                        <button class="button">Retry failed emails</button>
                    </form>

                    <?php if ($payload['running']): ?>
                        <p class="stillness-muted">This page updates while emails send. Refresh when it finishes to send another reminder.</p>
                    <?php endif; ?>
                </div>
            <?php endif; ?>

            <?php
            $can_start = $not_reminded > 0
                && (!$payload || (!$payload['running'] && ($payload['status'] !== 'stale' || !$payload['retryable'])));
            ?>

            <?php if ($can_start): ?>
                <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>" onsubmit="return confirm('Send reminder emails now?');">
                    <input type="hidden" name="action" value="stillness_start_reminder">
                    <input type="hidden" name="session_id" value="<?php echo esc_attr((string) $next['id']); ?>">
                    <?php wp_nonce_field(Plugin::NONCE); ?>
                    <button class="button button-primary">Send reminder</button>
                </form>
                <p class="stillness-muted">Emails go out in groups of five over <?php echo esc_html(self::window_label(Settings::batch_window())); ?>. You can close this page; sending continues.</p>
            <?php elseif ($not_reminded === 0): ?>
                <p class="stillness-muted">Everyone active has been reminded for this evening.</p>
            <?php endif; ?>
        </div>
        <?php
    }

    private static function render_settings(): void {
        $settings = Settings::all();
        $sessions = $settings['sessions'];
        ?>
        <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
            <input type="hidden" name="action" value="stillness_save_settings">
            <?php wp_nonce_field(Plugin::NONCE); ?>

            <div class="stillness-card">
                <h2>Evenings</h2>
                <p class="stillness-muted">Dates use the site timezone: <?php echo esc_html(wp_timezone_string()); ?>. Leave a date blank until it is confirmed. Session numbers stay fixed, so reminder history stays attached when a date changes.</p>

                <table class="widefat stillness-settings-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Date</th>
                            <th>Start</th>
                            <th>End</th>
                            <th>Venue</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($sessions as $index => $session): ?>
                            <tr>
                                <td>
                                    <?php echo esc_html($session['id']); ?>
                                    <input type="hidden" name="stillness[sessions][<?php echo (int) $index; ?>][id]" value="<?php echo esc_attr($session['id']); ?>">
                                </td>
                                <td><input type="date" name="stillness[sessions][<?php echo (int) $index; ?>][date]" value="<?php echo esc_attr($session['date']); ?>"></td>
                                <td><input type="time" name="stillness[sessions][<?php echo (int) $index; ?>][start]" value="<?php echo esc_attr($session['start']); ?>"></td>
                                <td><input type="time" name="stillness[sessions][<?php echo (int) $index; ?>][end]" value="<?php echo esc_attr($session['end']); ?>"></td>
                                <td><input type="text" name="stillness[sessions][<?php echo (int) $index; ?>][venue]" value="<?php echo esc_attr($session['venue']); ?>"></td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>

            <div class="stillness-card">
                <h2>Calendar and sending</h2>
                <table class="form-table">
                    <tr>
                        <th><label for="stillness-calendar">Google Calendar link</label></th>
                        <td>
                            <input type="url" class="regular-text" id="stillness-calendar" name="stillness[calendar_url]" value="<?php echo esc_attr($settings['calendar_url']); ?>" placeholder="https://calendar.google.com/...">
                            <p class="description">Shown in welcome and reminder emails. Leave blank to hide the button.</p>
                        </td>
                    </tr>
                    <tr>
                        <th><label for="stillness-window">Reminder window</label></th>
                        <td>
                            <select id="stillness-window" name="stillness[batch_window]">
                                <option value="30" <?php selected($settings['batch_window'], 30); ?>>30 minutes</option>
                                <option value="120" <?php selected($settings['batch_window'], 120); ?>>2 hours</option>
                                <option value="360" <?php selected($settings['batch_window'], 360); ?>>6 hours</option>
                                <option value="600" <?php selected($settings['batch_window'], 600); ?>>10 hours</option>
                            </select>
                            <p class="description">Emails go out in groups of five across this window.</p>
                        </td>
                    </tr>
                </table>
            </div>

            <?php submit_button('Save settings'); ?>
        </form>
        <?php
    }

    private static function notice(): void {
        $code = isset($_GET['stillness_notice']) ? sanitize_key(wp_unslash($_GET['stillness_notice'])) : '';

        if ($code === '') {
            return;
        }

        $messages = self::messages();

        if (!isset($messages[$code])) {
            return;
        }

        [$type, $message] = $messages[$code];

        printf('<div class="notice notice-%s is-dismissible"><p>%s</p></div>', esc_attr($type), esc_html($message));
    }

    private static function messages(): array {
        return [
            'settings_saved' => ['success', 'Settings saved.'],
            'settings_error' => ['error', 'The settings could not be saved. Please try again.'],
            'reminder_started' => ['success', 'Reminder batch started. Emails are going out in small groups.'],
            'reminder_retried' => ['success', 'Reminder batch resumed.'],
            'start_busy' => ['warning', 'A reminder batch is already running.'],
            'start_none' => ['warning', 'Everyone active has already been reminded for that evening.'],
            'start_no_date' => ['warning', 'Add a date to that evening before sending reminders.'],
            'start_past' => ['warning', 'That evening has already passed.'],
            'start_bad_session' => ['error', 'That evening could not be found.'],
            'start_forbidden' => ['error', 'You do not have permission to send reminders.'],
            'retry_busy' => ['warning', 'This reminder batch is still running.'],
            'retry_none' => ['warning', 'There are no failed emails to retry.'],
            'retry_forbidden' => ['error', 'You do not have permission to send reminders.'],
            'membership_created' => ['success', 'Membership created.'],
            'membership_cancelled' => ['success', 'Membership cancelled.'],
            'membership_error' => ['error', 'The membership could not be updated.'],
            'welcome_sent' => ['success', 'Welcome email sent.'],
            'welcome_error' => ['error', 'The welcome email could not be sent. Check the member email address and the order notes.'],
            'usage_marked' => ['success', 'One evening marked as used.'],
            'usage_reset' => ['success', 'Usage reset to zero.'],
            'usage_complete' => ['warning', 'This membership has no evenings left.'],
            'usage_unchanged' => ['warning', 'Usage did not change.'],
            'usage_error' => ['error', 'The usage could not be updated.'],
        ];
    }

    private static function request_int(string $key): int {
        return isset($_REQUEST[$key]) ? absint(wp_unslash($_REQUEST[$key])) : 0;
    }

    private static function action_url(string $action, int $order_id, int $item_id = 0, array $extra = []): string {
        $args = array_merge([
            'action' => $action,
            'order_id' => $order_id,
        ], $item_id > 0 ? ['item_id' => $item_id] : [], $extra);

        return wp_nonce_url(add_query_arg($args, admin_url('admin-post.php')), Plugin::NONCE);
    }

    private static function redirect(string $notice, string $tab = 'members'): void {
        wp_safe_redirect(add_query_arg([
            'page' => Plugin::SLUG,
            'tab' => $tab,
            'stillness_notice' => $notice,
        ], admin_url('admin.php')));
        exit;
    }

    private static function batch_status_label(string $status): string {
        $labels = [
            'running' => 'Sending…',
            'completed' => 'Complete',
            'stale' => 'Stopped',
            'failed' => 'Stopped',
        ];

        return $labels[$status] ?? 'Ready';
    }

    private static function window_label(int $minutes): string {
        if ($minutes === 120) {
            return '2 hours';
        }

        if ($minutes === 360) {
            return '6 hours';
        }

        if ($minutes === 600) {
            return '10 hours';
        }

        return '30 minutes';
    }

    private static function inline_script(): void {
        $config = [
            'ajaxUrl' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce(Plugin::NONCE),
            'poll' => 5000,
        ];

        $js = <<<'JS'
(function () {
    var root = document.querySelector('[data-stillness-batch]');

    if (!root || !window.StillnessAdmin || !window.StillnessAdmin.ajaxUrl) {
        return;
    }

    var cfg = window.StillnessAdmin;
    var bar = root.querySelector('[data-stillness-bar]');
    var counts = root.querySelector('[data-stillness-counts]');
    var status = root.querySelector('[data-stillness-status]');
    var retry = root.querySelector('[data-stillness-retry]');
    var running = root.getAttribute('data-running') === '1';
    var timer = null;
    var labels = { running: 'Sending…', completed: 'Complete', stale: 'Stopped', failed: 'Stopped' };

    function render(data) {
        if (!data) {
            return;
        }

        var pct = Math.max(0, Math.min(100, parseInt(data.percent || 0, 10)));

        if (bar) {
            bar.style.width = pct + '%';
        }

        if (counts) {
            counts.textContent = (data.sent || 0) + ' sent · ' + (data.failed || 0) + ' failed · ' + (data.skipped || 0) + ' skipped';
        }

        if (status) {
            status.textContent = labels[data.status] || 'Ready';
        }

        if (retry && data.retryable) {
            retry.removeAttribute('hidden');
        }

        running = !!data.running;
    }

    function poll() {
        var url = new URL(cfg.ajaxUrl, window.location.origin);
        url.searchParams.set('action', 'stillness_reminder_status');
        url.searchParams.set('nonce', cfg.nonce);

        fetch(url.toString(), { credentials: 'same-origin' })
            .then(function (response) { return response.json(); })
            .then(function (json) {
                if (!json || !json.success) {
                    running = false;
                    return;
                }

                render(json.data);
            })
            .catch(function () {})
            .finally(function () {
                if (running) {
                    timer = window.setTimeout(poll, cfg.poll || 5000);
                }
            });
    }

    if (running) {
        timer = window.setTimeout(poll, 2500);
    }
})();
JS;

        echo '<script>window.StillnessAdmin = ' . wp_json_encode($config) . ';</script>';
        echo '<script>' . $js . '</script>';
    }

    private static function css(): string {
        return <<<'CSS'
.stillness-wrap{max-width:1240px;}
.stillness-header{display:flex;justify-content:space-between;align-items:flex-start;gap:16px;margin:18px 0 10px;}
.stillness-title{font-family:Georgia,'Times New Roman',serif;font-size:30px;font-weight:400;margin:0 0 4px;color:#1d2327;}
.stillness-subtitle{margin:0;color:#646970;}
.stillness-tabs{display:flex;gap:4px;border-bottom:1px solid #c3c4c7;margin:12px 0 18px;}
.stillness-tabs a{padding:10px 14px;text-decoration:none;color:#50575e;border-bottom:2px solid transparent;margin-bottom:-1px;}
.stillness-tabs a.is-active{color:#1d2327;border-bottom-color:#2f3a33;font-weight:600;}
.stillness-stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin:0 0 18px;}
.stillness-stat{background:#fff;border:1px solid #dcdcde;border-radius:4px;padding:14px 16px;}
.stillness-stat .label{display:block;font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:#646970;margin-bottom:4px;}
.stillness-stat .value{display:block;font-family:Georgia,'Times New Roman',serif;font-size:26px;line-height:1.1;color:#1d2327;}
.stillness-stat .hint{display:block;color:#646970;font-size:12px;margin-top:4px;}
.stillness-grid{display:grid;grid-template-columns:minmax(0,2fr) minmax(280px,1fr);gap:18px;align-items:start;}
.stillness-card{background:#fff;border:1px solid #dcdcde;border-radius:4px;padding:18px 20px;margin:0 0 18px;}
.stillness-card h2{font-family:Georgia,'Times New Roman',serif;font-size:18px;font-weight:400;margin:0 0 10px;}
.stillness-filters{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:0 0 12px;}
.stillness-filters select,.stillness-filters input[type=search]{min-height:32px;}
.stillness-table td,.stillness-table th{vertical-align:top;}
.stillness-member-name{font-weight:600;}
.stillness-member-email{color:#646970;font-size:12px;}
.stillness-gift-tag{display:inline-block;margin-left:6px;padding:1px 6px;border-radius:10px;background:#f0ece4;color:#6f6252;font-size:10px;letter-spacing:.04em;text-transform:uppercase;}
.stillness-status{font-size:12px;}
.stillness-status-active{color:#2f6b45;}
.stillness-status-cancelled,.stillness-status-expired{color:#8a3a2f;}
.stillness-status-completed{color:#646970;}
.stillness-bar{height:8px;background:#f0f0f1;border-radius:999px;overflow:hidden;}
.stillness-bar span{display:block;height:100%;background:#2f3a33;width:0;transition:width .3s ease;}
.stillness-batch-status{font-weight:600;margin:14px 0 6px;}
.stillness-counts{margin:6px 0 10px;color:#646970;font-size:12px;}
.stillness-error{color:#b32d2e;}
.stillness-muted{color:#646970;}
.stillness-empty{padding:24px;text-align:center;color:#646970;}
.stillness-settings-table input[type=date],.stillness-settings-table input[type=time]{width:100%;max-width:170px;}
.stillness-settings-table input[type=text]{width:100%;}
.stillness-order-box .button{display:flex;width:100%;justify-content:center;margin:8px 0 0;box-sizing:border-box;}
.stillness-usage-actions .button{margin:0 4px 4px 0;}
@media(max-width:960px){.stillness-grid{grid-template-columns:1fr;}.stillness-stats{grid-template-columns:repeat(2,minmax(0,1fr));}}
@media(max-width:600px){.stillness-stats{grid-template-columns:1fr;}.stillness-header{display:block;}}
CSS;
    }
}


Plugin::boot();
