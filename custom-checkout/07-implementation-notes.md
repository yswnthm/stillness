# Checkout Styling Implementation Notes

Status: ready for controlled WordPress install.

Because this page handles checkout and payment, use the CSS-only package as the preferred deployment path. Avoid PHP execution unless there is a specific reason.

## Preferred Snippet File

Use:

`custom-checkout/stillness-checkout-styling-css-only.css`

Install this as a CSS snippet if Code Snippets supports CSS snippets, or paste it into a child theme stylesheet / WordPress Additional CSS.

## Fallback PHP Snippet File

Only use this if the site has no safe CSS-snippet path:

`custom-checkout/stillness-checkout-styling-code-snippet.php`

The PHP version only injects CSS into `wp_head`, but CSS-only is safer for a payment page.

## Install Path - Preferred CSS Route

1. Open WordPress admin.
2. Go to the safest available CSS location:
   - Code Snippets CSS snippet, if available.
   - WordPress `Appearance -> Customize -> Additional CSS`.
   - Child theme stylesheet.
3. Paste the full contents of `stillness-checkout-styling-css-only.css`.
4. Save without changing checkout settings.
5. Clear cache.
6. QA checkout before leaving it live.

## Install Path - PHP Fallback

1. Open WordPress admin.
2. Go to `Snippets -> Add New`.
3. Title: `Stillness Checkout Styling`.
4. Snippet type: PHP.
5. Paste the full contents of `stillness-checkout-styling-code-snippet.php`.
6. Set it to run on the front end only, if Code Snippets offers that option.
7. Save and activate.
8. Clear any cache if the site uses a cache plugin or host cache.

## What It Changes

Visual styling only on WooCommerce checkout:

- checkout page background
- checkout content width
- checkout two-column layout on desktop
- checkout single-column layout on tablet/mobile
- billing/shipping/additional fields panels
- input and select styling
- focus states
- validation/error states
- coupon prompt and coupon form styling
- order summary table
- payment wrapper
- privacy text
- `Place order` button
- responsive spacing

## Revision Notes

16 June 2026:

- Fixed the collapsed/narrow order summary column.
- Removed the detached visual `Your order` heading from the grid flow.
- Added the order heading inside the order panel using CSS.
- Reduced the cream-heavy look.
- Kept colors strictly within the Stillness palette.
- Removed off-palette colors from the snippet.

## What It Does Not Change

- Does not add or remove fields.
- Does not collapse shipping address.
- Does not change newsletter checkbox behavior.
- Does not hide the cart drawer.
- Does not change the cart page.
- Does not change the order received page.
- Does not touch payment processing logic.
- Does not style inside secure payment iframes.

## Notes

- The snippet excludes the `order-received` endpoint.
- The snippet is scoped to `body.woocommerce-checkout`.
- The live checkout appears to be classic WooCommerce checkout.
- Exact payment gateway name is still best confirmed in `WooCommerce -> Settings -> Payments`, but it is not required for this CSS-first implementation.
- Local PHP lint could not be run because `php` is not installed in this workspace. Run a syntax check in a PHP-enabled environment if available, or paste into Code Snippets and save without activating first if the plugin offers syntax validation.
