# Current Context

This file records only what is confirmed from the local project files.

## Confirmed Site Context

- The site is a WordPress website using Elementor and WooCommerce.
- The local project includes a previous event-ticketing build under `events-ticket/`.
- Existing page work is usually prototyped as standalone HTML/CSS, then converted into Elementor JSON templates.
- The project avoids framework-based delivery for WordPress sections.
- Elementor HTML widgets often require scoped CSS and `!important` due to Elementor/global style overrides.
- WooCommerce is already used for physical shop products and event-ticket products.
- Events are WooCommerce products in the `Events` product category with slug `events`.
- Event products are intended to be marked `Virtual`.
- Physical products must keep their normal WooCommerce checkout behavior.

## Existing Checkout Logic

The existing event-ticketing snippet already includes a checkout simplification function:

- Function: `stillness_simplify_virtual_checkout()`
- File: `events-ticket/snippets/functions-snippets.php`
- Hook: `woocommerce_checkout_fields`
- Current behavior: if the cart has no physical products, the snippet removes company, address, city, postcode, country, state, phone, and shipping fields.
- Current intended event-only checkout fields: first name, last name, email.

## Confirmed Requested Work

The requested custom checkout work is a styling pass, focused on:

- checkout page styling
- input fields
- buttons
- spacing
- colors
- mobile layout adjustments

No checkout flow rebuild, payment gateway change, new custom fields, or order-data change has been confirmed.

## Confirmed Scope Decisions

- Styling applies to all checkout orders, not only event/virtual-product orders.
- Preferred implementation route is Code Snippets.
- Scope is checkout page only.
- Cart page is not included.
- Order received page is not included.
- Live checkout inspection is required before locking the plan.
- Behavior stays default unless already handled by existing snippets.
- Shipping address behavior stays default.
- Newsletter opt-in behavior stays default.
- Cart drawer behavior stays default.
- Checkout fields stay default for physical-product checkout.
- Payment flow stays default.

## Live Checkout Findings

- Direct non-browser fetch is blocked by the site's browser-check layer.
- The live browser can access the site.
- Empty checkout redirects to cart.
- With a product in cart, `/checkout/` renders the checkout page.
- The checkout appears to be classic WooCommerce checkout, not Checkout Block.
- Visible payment method is card payment with a secure payment iframe.
- Exact gateway still needs admin confirmation.
- `Ship to a different address?` is visible and expanded by default.
- Newsletter opt-in is visible and checked by default.

## Confirmed Constraints

- Do not affect the retail shop checkout unless explicitly approved.
- Do not remove WooCommerce order data needed by the admin team.
- Event order records must still show buyer name, email, product, quantity, payment status, and order status.
- Payment gateway behavior should not be changed unless explicitly requested.
- Styling should stay aligned with the Stillness visual system:
  - `#0E1B30` stone
  - `#1D3152` midnight
  - `#688F9D` seafoam
  - `#D9E8EB` breeze
  - `#A4B2BA` wave
  - `#C4BBB4` sand
  - `#F7F0EC` cream
  - `#FFFFFF` white
  - headings in Cormorant Garamond
  - body/UI in Jost where possible

## Unknowns

- Whether the current live checkout is definitely classic WooCommerce checkout or whether Elementor wraps the checkout shortcode.
- Which payment gateway is active and whether its embedded fields can be visually styled.
- Exact payment gateway name remains useful but is not a blocker for a CSS-only checkout styling pass.
