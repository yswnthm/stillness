# Follow-Up Questions

I need these answers before I can plan the checkout design with 95% confidence.

## Answered So Far

- The current request is for checkout styling, not a confirmed flow rebuild.
- Styling targets: checkout page, inputs, buttons, spacing, colors, and mobile adjustment.
- Styling applies to all checkout orders.
- Preferred implementation route is Code Snippets.
- Scope is only the checkout page.
- Live checkout inspection should happen before locking the plan.
- Live inspection shows what appears to be classic WooCommerce checkout with a card payment iframe.
- Empty checkout redirects to cart.
- The shipping section is expanded by default.
- Newsletter opt-in is checked by default.

## Critical Remaining Questions

No scope-blocking questions remain.

Nice-to-have but not blocking:

1. Which payment gateway is active in `WooCommerce -> Settings -> Payments`?

The gateway name helps with exact selector targeting, but the styling plan can proceed by styling the outer payment wrappers and leaving iframe internals to the gateway.

## Locked Answers

- Leave `Ship to a different address?` default.
- Leave newsletter opt-in default.
- Leave cart drawer behavior default.
- Leave checkout fields default except existing event/virtual checkout simplification already present.
- Style validation/error states, coupon box, login prompt, and order notes if they appear, because those are visual states.

## Scope

1. Is this custom checkout for event bookings only, physical shop products only, or both? Answer: all checkout orders.
2. Should physical product checkout stay completely untouched, or can it receive the same visual styling while keeping all shipping fields? Answer: same visual styling, field behavior unchanged.
3. Should mixed carts be supported, for example one event ticket plus one physical product?
4. Are we redesigning only the checkout page, or also the cart page and order received page? Answer: checkout page only.

## Implementation Path

5. On the live site, is `/checkout/` built with the classic WooCommerce checkout shortcode, the WooCommerce Checkout Block, or an Elementor checkout widget/template?
6. Do you want the checkout built as a custom Elementor page/template, or as CSS/PHP overrides on the native WooCommerce checkout?
7. Should this live inside Code Snippets, a child theme file, Elementor custom CSS, or a separate plugin-style snippet? Answer: Code Snippets preferred.

## Checkout Flow

8. Should checkout stay as one page, or should it become a stepped flow like Details -> Payment -> Confirm?
9. Should the cart page be skipped for event bookings, taking users directly from Book Ticket to checkout?
10. Should the checkout page show a full order summary card with event image, event title, date, duration, sanctuary, quantity, and total?
11. Should coupon fields be visible or hidden?
12. Should order notes be visible or hidden?
13. Should account creation/login be visible or hidden?

## Fields

14. For event-only checkout, should the required fields be only first name, last name, and email?
15. Should phone number be collected for event bookings?
16. If a customer books multiple tickets, do we need attendee names for each ticket?
17. Should billing country/state stay hidden for virtual event orders even if the payment gateway usually expects address data?
18. For physical products, which fields must remain required for fulfillment?

## Design Direction

19. Should the checkout design match the current Events and Single Event pages, or should it feel closer to the Shop/Product pages?
20. Do you have a reference checkout design you want matched?
21. Should the design feel minimal and quiet, luxury editorial, or conversion-focused and direct?
22. Should the checkout include reassurance copy like secure payment, limited seats, or support contact?
23. Should the checkout include Stillness branding, such as a custom heading, small intro line, or sanctuary-style order summary?

## Payment And Testing

24. Which payment gateway is live, Stripe, PayPal, Razorpay, Square, or something else?
25. Can we run test orders on the live site using a free/test event product?
26. Is there a staging site, or will QA happen directly on production?
27. Do you want me to inspect the live checkout page before finalizing the plan?

## Deliverables

28. What should the first deliverable be after planning: a static HTML prototype, an Elementor JSON template, or a ready-to-paste Code Snippets package?
29. Should the final handoff include an admin guide like the event-ticketing build?
30. Is this part of the current event-ticketing scope, or a separate scoped add-on?
