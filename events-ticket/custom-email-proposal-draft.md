# Stillness Events - Custom Email Design Proposal Draft

Date: 15 June 2026  
Context: Client asked about custom email design after the core event ticketing setup was completed and tested.

## Current Conversation Context

Message already sent:

```text
Ticketing system is ready from our side.
We have already tested the booking flow and finalized it.
The design revisions she shared are being done now.
Once those are completed, the ticketing setup is ready to use.
This will be completed today.
```

Follow-up already sent:

```text
Custom email design was part of the first option.
That was the higher workflow shared in the proposal.
Since the ticketing system is already built and tested, we can add it separately.
The charge for this will be 3k.

This includes:
One branded WooCommerce order email.
Logo, brand colors, and clean layout.
Event name, order details, and customer details.
Basic mobile-friendly formatting.
One test order after setup.
One revision after review.
```

## Reference Template

The shared email design reference is stored here:

```text
events-ticket/snippets/email-template.html
```

It is a static visual reference. Implementation still needs to convert the placeholders into WooCommerce values.

Placeholder examples:

```text
{{first_name}}
{{order_item_name}}
{{event_date}}
{{event_time}}
{{event_location}}
{{order_number}}
{{order_total}}
{{order_url}}
```

## Scope To Propose

Included:

- One branded WooCommerce customer order email.
- Stillness logo/text branding, colors, and clean layout.
- Event/session name.
- Event date/time if available from product attributes.
- Sanctuary/location if available from product attributes.
- Order number.
- Order total.
- Customer first name.
- Standard WooCommerce order details preserved.
- Basic mobile-friendly formatting.
- One free test event order after setup.
- One revision after review.

Not included:

- QR code.
- PDF ticket attachment.
- Unique ticket number per attendee.
- Attendee-wise names for multiple tickets.
- Scanner or check-in app.
- Separate admin email redesign.
- Full WooCommerce email suite redesign.

## Message Draft To Send

```text
Yes, we can do this.

This will be a simple branded WooCommerce order email.
It will follow the Stillness style she shared.

It will include:
Stillness branding
Clean email layout
Event name
Order details
Customer details
Mobile-friendly formatting
One test order after setup
One revision after review

It will not include QR tickets or PDF ticket attachments.
That belongs to the higher ticketing workflow.

For this version, the additional charge will be 3k.

Once confirmed, I can add this after the current visual revisions.
```

## Shorter WhatsApp Version

```text
Yes, this can be added.

This will be a branded WooCommerce order email.
It will match the Stillness style she shared.

It includes event name, order details, customer details, brand colors, mobile formatting, one test order, and one revision.

It will not include QR tickets or PDF ticket attachments.
That was part of the higher workflow.

The additional charge will be 3k.

Once confirmed, I can add it after the current visual revisions.
```

## Implementation Notes

- Use `events-ticket/snippets/email-template.html` as the visual source.
- Convert static placeholders into WooCommerce/PHP values.
- Keep normal WooCommerce order details available.
- Test with one free event order.
- Confirm the branded email arrives on the customer side.
- Confirm WooCommerce Orders still show buyer name, email, event product, quantity, payment status, and order status.
