# Stillness Events Ticketing - Pending Tasks

> Updated: 11 June 2026
> Scope: Events catalog, single event booking page, WooCommerce event order flow, and client handoff.

## Build Tasks

- [x] Add ticket quantity selection.
  - Buyers should be able to book more than one ticket.
  - Quantity must respect WooCommerce stock for the event.
  - Checkout and WooCommerce Orders must show the purchased quantity clearly.
  - Confirm whether multiple-ticket orders need each attendee name, or only buyer contact details.

- [x] Add past-events counter ribbon on the Events catalog page.
  - Add a new ribbon-like credibility section to the catalog page.
  - Use `59` as the fixed starting counter.
  - Suggested display copy: `59+ Events Hosted`.
  - If past event products become a reliable data source, display can become `59 + counted past events`.
  - Keep this separate from active ticket availability.

- [x] Make the form on the Events catalog page work.
  - Use the individual event waitlist form section here too.
  - MetForm slug shortcode did not work on this site.
  - Template currently expects the exact working MetForm shortcode by `form_id`.
  - [x] Create the `Events` MetForm in WordPress.
  - [x] Replace the local placeholder with `[metform form_id="6697"]`.
  - [x] Wire the catalog template to the single event form section.
  - [x] Import or update the catalog waitlist section on the live Events page.
  - [x] Connect submissions to the correct email and MetForm entries.
  - [x] Test required fields, success state, and admin notification.
  - Optional: add a hidden `source` field with `Events Waitlist`.

- [x] Make the form on the individual event page work.
  - Treat the individual event waitlist form section as the source of truth.
  - MetForm slug shortcode did not work on this site.
  - Template currently expects the exact working MetForm shortcode by `form_id`.
  - [x] Create the `Events` MetForm in WordPress.
  - [x] Replace the local placeholder with `[metform form_id="6697"]`.
  - [x] Wire the individual event template to the MetForm shortcode.
  - [x] Import or update the individual event waitlist section on the live event page/template.
  - Optional: include event name or product title later if separate event-level routing is needed.
  - [x] Test from an active event page.
  - [x] Test from a sold-out or waitlist state if applicable.

- [x] Confirm the post-booking flow after a WooCommerce event purchase.
  - Buyer name, email, event name, quantity, and payment status appear through the normal WooCommerce order flow.
  - Client confirmed they only need basic buyer details so they can contact the person.
  - Default WooCommerce confirmation email is enough for now.
  - No custom WooCommerce email design is required at this stage.
  - No attendee-level custom fields are required unless they later need every attendee name for multi-ticket orders.

- [x] Prepare the admin guide and handoff HTML.
  - Explain how to add a new event.
  - Explain how to set ticket stock and increase capacity.
  - Explain how to mark an event sold out.
  - Explain how to check orders and attendee details.
  - Explain how to export a guest list if needed.
  - Explain where form submissions can be checked.
  - HTML file prepared at `events-ticket/stillness-events-handoff-guide.html`.

- [ ] Export the handoff HTML to PDF and send it to the client.

## Client Clarifications Needed

Client clarification result:

- WooCommerce store is not heavily used yet.
- Eventbrite currently sends both sides email details.
- For this WooCommerce event flow, the client only needs basic buyer name and email so the team can contact them.
- Default WooCommerce customer/admin emails are acceptable for now.
- No custom email template is required right now.

Older clarification checklist:

- What does the customer receive today after ordering from the shop?
- What does the admin team receive today after a WooCommerce shop order?
- What customer details are visible in WooCommerce Orders?
- What product and payment details are visible in WooCommerce Orders?
- For physical orders, what fields do they use for fulfillment?
- For virtual orders, what information do they receive?
- When an order is marked fulfilled or completed, what changes in WooCommerce or email?
- For event bookings, do they need only buyer name and contact details?
- If one buyer books multiple tickets, do they need every attendee name?
- Should Vukama call the buyer only, or each attendee?
- Is the normal WooCommerce Orders page enough for attendee tracking?
- Do they need a separate guest list export?

## Recommended Working Model

- Since they may only run one or two events per month, the cleanest workflow is managed updates.
- The client can send event details, copy, and images whenever a new event is ready.
- We can add the event from our side and do a quick quality check.
- This keeps the layout, images, booking flow, and event content consistent.
- A nominal update fee can be proposed for this ongoing support.
- Exact pricing should be confirmed by Yeswanth before sending the final message.

## Client Message Draft

```text
Hi Sakshi,

We have a few pending items on the events build.

We are adding ticket quantity selection.
So one person can book more than one ticket.

We are also adding a small past-events ribbon.
It can show 59 events hosted on the Events page.

Before finalising the booking flow, I need one clarification.
What exactly do you receive today when someone orders from the shop?

Please share what you receive in WooCommerce and email.
This is for both physical and virtual orders.
I need to know the customer details, product details, and fulfilment status.

For events, my current thinking is simple.
Once someone books, their name, contact, event name, and quantity will appear in WooCommerce.
Vukama can then use that dashboard for calling or follow-up.

Also, for monthly event updates, the easiest option is this.
You can send us the event details and images whenever needed.
We can add them cleanly from our side for a small update fee.

This keeps the event pages consistent.
It also avoids layout or content mistakes inside WordPress.

Once the build is complete, I will also hand over a short guide.
It will cover adding events, editing stock, checking bookings, and marking events sold out.

Please send the current WooCommerce order details when possible.
```

## Priority Order

1. Export `events-ticket/stillness-events-handoff-guide.html` to PDF.
2. Send the PDF handoff guide to the client.
3. Run one final test booking to confirm name, email, product, quantity, and payment status appear correctly.
4. Test event-only checkout and confirm physical product checkout is unaffected.
5. Agree on managed event updates separately if needed.
