# Stillness Events Ticketing - Live Plan

> Updated: 15 June 2026
> Current phase: Custom WooCommerce email add-on proposal and implementation.

## Current Status

- [x] Events catalog HTML prototype approved by client.
- [x] Single event HTML prototype approved by client.
- [x] Elementor JSON templates created for catalog sections 01-06.
- [x] Elementor JSON template created for single event waitlist section 07.
- [x] Section 03 replaced with `[stillness_featured_event]`.
- [x] Section 04 replaced with `[stillness_event_grid limit="3"]`.
- [x] Import-ready templates copied to `wordpress/events-templates-v1/`.
- [x] Paste latest `events-ticket/snippets/functions-snippets.php` into Code Snippets on WordPress.
- [x] Re-import Elementor templates 03 and 04 on the live Events page.
- [x] Validate live catalog after content cleanup.
- [x] Import `template-events-07-single-waitlist.json` if the single event page needs an Elementor waitlist block.
- [x] Validate single event page long description output.
- [x] Confirm normal WooCommerce checkout/order data is enough for event bookings.
- [ ] Run final checkout/order QA (Phase 4).
- [x] Prepare admin handoff HTML guide.
- [ ] Implement branded WooCommerce confirmation email from `snippets/email-template.html`.
- [x] Prepare custom email add-on proposal draft.
- [ ] Export handoff guide to PDF and send to client.

## Catalog Data Rules

Section 03, featured event:

- Uses newest published product in `Events`.
- Uses product featured image.
- Uses product title.
- Uses product short description as teaser copy.
- Uses attributes for logistics:
  - `Event Dates`
  - `Duration`
  - `Sanctuary`
- Does not render long description on the catalog page.
- If no in-stock event exists, Section 03 shows the static waitlist fallback.

Section 04, event grid:

- Uses `[stillness_event_grid limit="3"]`.
- Shows 3 published `Events` products.
- Sorts by publish date, newest first.
- Includes the featured event.
- Shows image, attributes, title, short description preview, price, and CTA.
- Sold-out events show a sold-out state.

## Product Content Rules

Short description:

- 1-2 emotional teaser lines.
- No dates.
- No duration.
- No venue.
- No emoji logistics.

Attributes:

- `Event Dates`
- `Duration`
- `Sanctuary`

Long description:

- Full event story.
- Headings can use `The Journey`, `I. Movement`, `II. Clarity`, etc.
- This appears on the single event page, not the catalog page.

## Launch Content Plan

- [x] Ask Sakshi for two previous retreat details.
- [x] Sakshi confirmed duration can be in hours, not only multi-day retreats.
- [x] Sakshi asked whether total events hosted can be added to the catalog page.
- [ ] Use Stillness Eventbrite organizer page as the source for previous event details:
  - `https://www.eventbrite.ca/o/78867564303`
- [ ] Pick 2 previous events from Eventbrite.
- [ ] Extract event name, event date/time, duration, venue/location, description, and available images.
- [ ] Rewrite Eventbrite copy into clean Stillness short descriptions and long descriptions.
- [ ] Add those two previous events as published `Events` products.
- [ ] Delete the temporary test events after real previous events are added.
- [x] Replace fallback product workflow with code-driven featured waitlist fallback.
- [ ] Delete or set `New Retreat Dates Coming Soon` product to `Private`.
- [ ] Add a static credibility metric to the catalog page if Sakshi provides the number.
  - Example: `25+ events hosted`
  - Example: `50+ guests hosted`
  - Example: `10+ wellness sessions curated`

## No Upcoming Events Fallback

Do not maintain a fake WooCommerce product for this.

The featured shortcode handles this automatically:

- If there is at least one in-stock event, Section 03 shows the newest in-stock event.
- If there are no in-stock events, Section 03 shows a static `New Retreat Dates Coming Soon` waitlist block.
- Section 04 can still show latest real past/sold-out events.
- Products should remain real events only.

## Eventbrite Previous Event Import Plan

Source:

```
https://www.eventbrite.ca/o/78867564303
```

Evening workflow:

1. Open the Eventbrite organizer page.
2. Identify two suitable previous Stillness events.
3. Capture each event's title, date, time, location, event image, and event description.
4. Create clean WooCommerce product content:
   - Product title from Eventbrite title.
   - `Event Dates` from Eventbrite date/time.
   - `Duration` in hours or minutes, because Sakshi confirmed most events are a couple of hours.
   - `Sanctuary` from venue/location.
   - Short description as a 1-2 line emotional teaser.
   - Long description as structured content with `The Journey`, `I.`, `II.` sections.
5. Add the two previous events as WooCommerce products in `Events`.
6. Delete the temporary placeholder/test event products.
7. Delete or privatize temporary placeholder products.
8. Let the code-driven featured fallback handle the no-upcoming-events state.

Duration examples:

```
2 Hours
90 Minutes
Half-day session
```

## Client Content Request Format

```
Event name:
Spring Awakening

Event date:
02-05 March 2027

Duration:
4 Days, 3 Nights

Venue / sanctuary:
Vana Retreat, Dehradun

Short description:
Step into the new season with clarity, energy, and renewed purpose.

A gentle immersion of movement, meditation, and guided reflection designed to release the weight of winter.

Long description:
The Journey

As the earth wakes up, so do we. This immersion is designed to shed the weight of winter and step into the new season with clarity, energy, and a renewed sense of purpose.

I. Movement

Dynamic morning practices designed to move stagnant energy and build internal heat, paired with restorative evening sessions.

II. Clarity

Guided journaling and meditation focused on clearing mental clutter and setting powerful intentions for the months ahead.

Photos:
Main event image
2-3 supporting images, if available
```

## Short Description Examples

Spring Awakening:

```
Step into the new season with clarity, energy, and renewed purpose.

A gentle immersion of movement, meditation, and guided reflection designed to release the weight of winter.
```

The Winter Reset:

```
Turn inward through deep rest, nervous system regulation, and grounding desert stillness.

A stripped-back winter immersion designed to help you slow down, soften, and return to yourself without expectation.
```

The Summer Solstice Immersion:

```
Restore balance and cultivate deep inner stillness through movement, breathwork, and meditative practice.

An intimate four-day retreat with personal guidance, quiet integration time, and space for the nervous system to soften.
```

## Next Actions

- [ ] Export `events-ticket/stillness-events-handoff-guide.html` to PDF.
- [ ] Send PDF handoff guide to client.
- [ ] Convert `events-ticket/snippets/email-template.html` into the active WooCommerce order email.
- [ ] Send or confirm approval for `events-ticket/custom-email-proposal-draft.md`.
- [ ] Run a free test event order and confirm the branded email arrives.
- [ ] Run one final event test order.
- [ ] Confirm WooCommerce Orders show buyer name, email, event product, quantity, payment status, and order status.
- [ ] Confirm customer receives the branded Stillness confirmation email.
- [ ] Test event-only checkout removes unnecessary address/shipping fields.
- [ ] Test normal shop checkout remains unaffected.
