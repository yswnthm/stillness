# Stillness Events QA Checklist

## Events Catalog

- [ ] Events page exists at `/events/`.
- [ ] Events page is in the navigation menu.
- [ ] Section 03 shows the newest published event.
- [ ] Section 03 shows image, title, attributes, short description, and CTA.
- [ ] Section 03 does not show long description.
- [ ] Section 03 skips sold-out products when another in-stock event exists.
- [ ] Section 03 shows `Join Waitlist` when no in-stock event exists.
- [ ] Section 04 uses `[stillness_event_grid limit="3"]`.
- [ ] Section 04 shows exactly 3 events when 3 or more are published.
- [ ] Section 04 includes the featured event.
- [ ] Event cards show image, attributes, title, short description preview, price, and CTA.
- [ ] Sold-out event cards show sold-out state.
- [ ] No in-stock event shows static featured waitlist fallback.
- [ ] If no events are published, empty state appears and waitlist remains visible.
- [ ] Retail shop products do not appear on the events page.
- [ ] Catalog layout works on mobile.

## Product Content

- [ ] Temporary test event products are deleted or set to draft/private if they should not stay visible.
- [ ] Any real event products currently shown on the site use clean Stillness copy.
- [ ] Product short descriptions contain no date, duration, sanctuary, or emoji logistics.
- [ ] Product short descriptions are 1-2 emotional teaser lines.
- [ ] Product attributes are named exactly:
  - [ ] `Event Dates`
  - [ ] `Duration`
  - [ ] `Sanctuary`
- [ ] Long description contains the full event story.
- [ ] Product image is present.
- [ ] Product category is `Events`.
- [ ] Product is marked `Virtual`.
- [ ] Product stock is correct.
- [ ] Past events are not bookable unless intentionally made available.
- [ ] Duration supports hours/minutes text, not only days/nights.

## Single Event Page

- [ ] Shared waitlist section appears on individual event page.
- [ ] Banner image is full-width and crops correctly.
- [ ] Event title uses Cormorant Garamond.
- [ ] Warm band renders Dates, Duration, and Sanctuary.
- [ ] Warm band collapses correctly on mobile.
- [ ] Short description appears as intro copy.
- [ ] Long description appears on the single event page.
- [ ] Button text reads `Book Ticket`.
- [ ] Quantity selector works and respects available stock.
- [ ] Sold-out state blocks booking when stock is `0`.
- [ ] Sold-out state points users to the waitlist.
- [ ] SKU, categories, and review UI are hidden.
- [ ] Retail product pages are unaffected.

## Checkout

- [ ] Event-only checkout removes unnecessary address fields.
- [ ] First Name, Last Name, and Email remain visible.
- [ ] No shipping section appears for virtual event orders.
- [ ] Selected ticket quantity appears correctly in cart and checkout.
- [ ] WooCommerce Orders show buyer name, email, event product, quantity, payment status, and order status.
- [ ] Physical product checkout remains normal.
- [ ] Payment gateway processes correctly.

## Confirmation Email

- [ ] Default WooCommerce customer confirmation email sends successfully.
- [ ] No custom WooCommerce email template is required for this phase.
- [ ] Admin can identify the booking from WooCommerce Orders.

## Handoff

- [ ] Export `events-ticket/stillness-events-handoff-guide.html` to PDF.
- [ ] Send the PDF handoff guide to Sakshi/client.
- [ ] Send invoice/payment request after final QA and handoff PDF are sent.

## Fallback Workflow

- [ ] No placeholder product is required.
- [ ] `New Retreat Dates Coming Soon` product is deleted or private if it was created during testing.
- [ ] Static featured fallback appears when all real events are stock `0`.
- [ ] Static featured fallback button scrolls to the waitlist.
- [ ] Duplicating a real event creates a usable new retreat product.
