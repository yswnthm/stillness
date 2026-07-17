# Checkout Payment Security Note

Created: 16 June 2026

## Main Question

Can someone change the price with browser Inspect during checkout?

## Short Answer

They can change what they see in their own browser.

They should not be able to change what WooCommerce charges or records, because WooCommerce recalculates cart totals on the server from:

- product ID
- product price stored in WooCommerce
- quantity
- tax/shipping rules
- coupons
- payment gateway server-side amount

Frontend text in the order summary is not supposed to be trusted as the payment amount.

## When It Would Be Dangerous

This would become dangerous if custom code or a plugin does any of these:

- trusts a hidden input for price
- accepts a price sent from JavaScript
- creates payment intents from browser-edited totals
- uses custom AJAX checkout code that bypasses WooCommerce totals
- allows customers to pass custom item prices
- has a plugin for deposits/dynamic pricing that is misconfigured

The checkout styling snippet does none of this.

## What The Styling Snippet Changes

Only CSS:

- layout
- colors
- spacing
- input styling
- button styling
- order-summary styling
- mobile styling

It does not change:

- product price
- cart totals
- checkout fields
- payment request amount
- WooCommerce order amount
- payment gateway logic

## Safer Deployment Recommendation

Use `stillness-checkout-styling-css-only.css` wherever possible.

Do not use a PHP snippet unless needed.

If the PHP wrapper is used:

- set Location to `Only run on site front-end`
- keep the `is_checkout()` guard
- keep the `order-received` exclusion
- do not add any checkout hooks that modify totals, fees, or fields

## Payment Integrity QA

Before considering the checkout safe:

- Add a normal product to cart.
- Confirm checkout total.
- Inspect element and visually edit the displayed total.
- Do not submit a live paid order.
- In test mode or with an approved test/free product, place a test order.
- Confirm WooCommerce order total matches the real server-side product/cart total, not the edited browser text.
- Confirm gateway dashboard amount matches WooCommerce order total.

If the edited browser text affects the final WooCommerce/gateway total, stop immediately. That would indicate a serious checkout/payment configuration problem outside styling.
