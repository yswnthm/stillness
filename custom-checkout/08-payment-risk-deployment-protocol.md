# Payment Risk Deployment Protocol

Status: required before live deployment.

This checkout styling touches a payment page. Treat it as high-risk even though it is CSS-only.

## Non-Negotiables

- Do not deploy the PHP snippet first.
- Prefer the CSS-only snippet.
- Do not edit WooCommerce settings during this styling deployment.
- Do not change checkout fields.
- Do not change payment settings.
- Do not submit a real paid order unless the client has approved the test.
- Keep rollback ready before saving the snippet.

## Preferred Deployment Order

1. Take screenshots of the current checkout desktop and mobile states.
2. Copy the current snippet/custom CSS state before editing.
3. Paste the CSS-only snippet into a CSS-safe location.
4. Save.
5. Clear cache.
6. Open checkout in a new incognito/private browser if possible.
7. Run the QA checklist before considering the work done.

## Rollback

If anything looks broken:

1. Disable/remove the CSS snippet immediately.
2. Clear cache.
3. Refresh checkout.
4. Confirm checkout returns to the original state.
5. Do not keep adjusting live under pressure. Fix locally, then redeploy.

## Must-Pass QA

- Checkout loads.
- Billing fields render.
- Shipping fields render when WooCommerce shows them.
- Country/state dropdowns open.
- Coupon toggle opens.
- Order summary has proper width.
- Payment method renders.
- Card/payment iframe renders.
- Place order button is visible.
- Mobile checkout has no horizontal overflow.
- Empty required-field validation messages are readable.
- No console-visible checkout-blocking errors if browser dev tools are checked.

## Recommended Test Order

Use a test/free product or payment gateway test mode only if approved.

Do not run a live paid card transaction without explicit approval.
