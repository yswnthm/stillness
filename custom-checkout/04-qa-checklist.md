# QA Checklist

This checklist will be finalized after scope is confirmed.

## Event-Only Cart

- [ ] Checkout shows only the approved event booking fields.
- [ ] First name is required.
- [ ] Last name is required.
- [ ] Email is required and validates correctly.
- [ ] Phone appears only if approved.
- [ ] Shipping section does not appear.
- [ ] Address fields do not appear unless required by the chosen payment gateway.
- [ ] Order summary shows the event product clearly.
- [ ] Ticket quantity is correct.
- [ ] Event date, duration, and sanctuary appear if approved for the design.
- [ ] Payment gateway works.
- [ ] Order is created in WooCommerce.
- [ ] WooCommerce order shows buyer name, email, event product, quantity, payment status, and order status.

## Physical Product Cart

- [ ] Checkout keeps normal physical product billing and shipping fields.
- [ ] Shipping section appears when required.
- [ ] Address fields remain available.
- [ ] Payment gateway works.
- [ ] Physical product order data remains complete for fulfillment.

## Mixed Cart

- [ ] Mixed event plus physical product behavior is either supported and tested, or explicitly blocked.
- [ ] If supported, physical shipping fields remain visible.
- [ ] If supported, event details still appear clearly in the order summary.
- [ ] If blocked, the customer sees a clear message explaining what to do.

## Design And Responsiveness

- [ ] Desktop checkout layout is clean and aligned.
- [ ] Tablet layout is clean and aligned.
- [ ] Mobile layout is clean and aligned.
- [ ] Checkout is two-column on desktop.
- [ ] Checkout stacks into one column on tablet/mobile.
- [ ] Billing, shipping, and order review panels have consistent spacing.
- [ ] Inputs use the approved border, focus, and error styling.
- [ ] Select/dropdown fields align visually with text inputs.
- [ ] Coupon prompt and coupon form are styled if opened.
- [ ] Payment wrapper is styled without breaking the payment iframe.
- [ ] Place order button is full-width inside the payment/order area.
- [ ] Payment fields do not overflow on mobile.
- [ ] Button text does not wrap awkwardly.
- [ ] Validation errors are readable.
- [ ] Loading states do not break the layout.

## Payment Page Safety

- [ ] Preferred CSS-only snippet is used.
- [ ] PHP wrapper is not used unless CSS-only deployment is impossible.
- [ ] Existing CSS/snippet state is copied before deployment.
- [ ] Rollback path is ready before saving.
- [ ] Checkout loads after cache clear.
- [ ] Payment method area renders after cache clear.
- [ ] Secure card/payment iframe renders.
- [ ] Place order button remains visible and clickable.
- [ ] No checkout setting was changed during styling deployment.
- [ ] No payment setting was changed during styling deployment.
- [ ] No live paid order is submitted without explicit approval.

## Order Received Page

- [ ] Customer sees a clear successful booking/order message.
- [ ] Order number is visible.
- [ ] Event or product summary is visible.
- [ ] Customer email is correct.
- [ ] Next step copy is correct if included.

## Regression

- [ ] Existing shop pages are unaffected.
- [ ] Existing product pages are unaffected.
- [ ] Existing event product pages are unaffected.
- [ ] Existing event waitlist flow is unaffected.
- [ ] Existing WooCommerce emails are unaffected unless intentionally changed.
- [ ] Cart page is unaffected.
- [ ] Order received page is unaffected.
- [ ] Checkout fields remain unchanged.
- [ ] Shipping-address behavior remains unchanged.
- [ ] Newsletter checkbox behavior remains unchanged.
- [ ] Cart drawer behavior remains unchanged.
