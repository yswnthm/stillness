# Stillness Events Admin Guide

This guide is for adding and managing Stillness retreat events in WooCommerce.

## Add A New Event

1. Go to `Products`.
2. Duplicate a previous real event, or click `Add New`.
3. Change the product title to the new retreat name.
4. Set product type to `Simple product`.
5. Check `Virtual`.
6. Leave `Downloadable` unchecked.
7. Add the ticket price.
8. Go to `Inventory`.
9. Enable stock management.
10. Set stock quantity to the number of available seats.
11. Set backorders to `Do not allow`.
12. Upload the main retreat image as the product image.
13. Assign category `Events`.
14. Add the short description.
15. Add the long description.
16. Add the three custom attributes.
17. Publish the product.
18. Publish the event when all details are ready.

## Required Attributes

Every event must have these attributes:

```
Event Dates: 02-05 March 2027
Duration: 4 Days, 3 Nights
Sanctuary: Vana Retreat, Dehradun
```

Do not use the short description for dates, duration, or location.

## Short Description

Use the short description for a calm teaser.

Example:

```
Step into the new season with clarity, energy, and renewed purpose.

A gentle immersion of movement, meditation, and guided reflection designed to release the weight of winter.
```

## Long Description

Use the long description for the full event story.

Example:

```
The Journey

As the earth wakes up, so do we. This immersion is designed to shed the weight of winter and step into the new season with clarity, energy, and a renewed sense of purpose.

I. Movement

Dynamic morning practices designed to move stagnant energy and build internal heat, paired with restorative evening sessions.

II. Clarity

Guided journaling and meditation focused on clearing mental clutter and setting powerful intentions for the months ahead.
```

## No Upcoming Event State

There is no placeholder product to manage.

If no event has stock available, the website automatically shows:

```
New Retreat Dates Coming Soon
```

The button will take visitors to the waitlist.

Keep products as real events only.

## Mark An Event Sold Out

1. Open the event product.
2. Go to `Product Data`.
3. Open `Inventory`.
4. Set stock quantity to `0`.
5. Update the product.

The page will automatically show the sold-out state.

## Increase Capacity

1. Open the event product.
2. Go to `Inventory`.
3. Increase stock quantity.
4. Update the product.

## Hide An Event

Use this when a retreat should no longer appear.

1. Open the event product.
2. Change visibility to `Private`, or change status to `Draft`.
3. Update the product.

## Check Attendees

1. Go to `WooCommerce`.
2. Open `Orders`.
3. Search or filter by the event product name.
4. Open each paid order to see attendee details.

## Export Guest List

Use the WooCommerce order export tool available on the site.

Export orders for the event product and include:

- Customer name
- Email
- Order status
- Product name
- Quantity

Only use paid or processing orders for check-in.
