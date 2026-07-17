# Live Checkout Inspection

Inspected: 16 June 2026

## Access Notes

- Direct terminal fetch of `https://stillnesscuratedretreats.com/checkout/` returns the host browser-check page.
- Chrome already had the site accessible, so inspection was done through the live browser.
- Empty checkout redirects to `/cart/`.
- A product was added to the browser cart only for inspection: `Self Love Journal`.
- No checkout form was submitted.
- No payment action was taken.

## Visible Checkout Structure

The checkout page rendered with:

- Site header and footer.
- Coupon prompt: `Have a coupon? Enter your coupon code`.
- Main checkout area.
- Billing details section.
- Full physical-product billing fields:
  - first name
  - last name
  - company
  - country/region
  - street address
  - apartment/suite
  - town/city
  - province
  - postal code
  - phone
  - email
- Shipping address section.
- Order notes field.
- Newsletter opt-in checkbox.
- Order summary table.
- Payment method area.
- `Place order` button.
- Cart drawer still present on the page.

## Checkout Technology Read

Working read: this looks like the classic WooCommerce checkout form, not the WooCommerce Checkout Block.

Reason:

- It shows classic WooCommerce labels such as `Billing details`, `Your order`, and `Place order`.
- The order summary appears as a table.
- The payment section appears in the classic checkout area.

This should still be confirmed from WordPress admin or page editor before implementation.

## Payment Gateway Read

Visible frontend payment method:

- `Card`
- Visa/Mastercard/Amex icons
- Secure payment input iframe/frame

Working read: the active gateway is likely Stripe, WooPayments, or another Stripe-style card iframe gateway.

Exact gateway cannot be confirmed from frontend inspection alone. Confirm in WordPress admin:

`WooCommerce -> Settings -> Payments`

The enabled method with card payments will show the exact gateway name.

## Styling Implications

- We can style the checkout page wrapper, headings, labels, inputs, select fields, order table, coupon prompt, privacy text, and button through Code Snippets CSS.
- Payment iframe internals may not be fully styleable from site CSS. We can style the surrounding payment box and available gateway wrapper, but card field internals depend on gateway support.
- The shipping section and newsletter checkbox need separate decisions if behavior should change.

## Separate Decisions Found During Inspection

These are not pure styling decisions:

- `Ship to a different address?` appears checked/expanded by default.
- Newsletter opt-in appears checked by default.
- Cart drawer appears on checkout.

If the scope remains styling-only, leave these behaviors unchanged and style around them.
