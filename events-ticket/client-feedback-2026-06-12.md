# Stillness Events - Client Feedback Pass

Date: 12 June 2026  
Source: Sakshi / Stillness client WhatsApp feedback  
Scope: Events catalog, single event detail page, Hawaii retreat CTA/fallback copy

## Summary

The client likes the events page. This is a same-day visual cleanup and linking pass before final handoff.

Do the visible fixes first, then answer the operational questions.

## Priority Build Checklist

1. Events catalog background and cards
   - Change the section background behind the event cards to white.
   - Change event cards to a different brand-aligned color.
   - Avoid heavy cream on this screen.

2. Events catalog header image
   - Make the header image smaller.
   - If the page looks cleaner without it, remove the large image section.
   - Goal: users should reach the event list quickly without multiple scrolls.

3. Header / nav visibility on single event page
   - The top header is barely visible on the image.
   - Increase contrast using a stronger overlay, lighter nav/logo treatment, or a cleaner header band.
   - Verify desktop and mobile.

4. Single event detail page color cleanup
   - Avoid the current cream background treatment.
   - Use white, soft blue, or another Stillness palette color that feels cleaner.

5. Remove `62+ events hosted` from single event page
   - Keep credibility counter only on the Events catalog page if useful.
   - Do not show it inside the individual event detail page.

6. Hawaii retreat CTA linking
   - Link the retreat button to the Hawaii retreat landing page that was just created.
   - If the exact live URL is not final yet, use the correct local/WordPress page URL once published.

7. Hawaii retreat fallback copy
   - Replace generic `New Dates` / `New Retreat Dates Coming Soon` wording.
   - Use: `Big Island, Hawaii retreat`
   - This is temporary until the real Hawaii retreat event product is created.

8. Final QA after changes
   - Check Events catalog on desktop.
   - Check Events catalog on mobile.
   - Check one active single event page on desktop.
   - Check one active single event page on mobile.
   - Confirm retail shop/product pages are unaffected.

9. Global header `Book` link
   - The header has a `Book` text/button link.
   - It was previously redirecting to the Reserve page.
   - Confirmed update: redirect this header `Book` link to the Events page now.
   - This is a site-wide header CTA change and is approved by Yeswanth for this pass.

## Questions To Answer

### Does the next available session render as soon as it is available?

Answer:
Yes. As soon as a new in-stock event is published and becomes the next available event, the section should update automatically through the dynamic event query.

### If there is ever a refund request, can WooCommerce handle it?

Answer:
Yes. WooCommerce can handle refunds from the order screen.

Important detail:
- Automatic refunds return money through the original payment method only if the payment gateway supports it.
- Manual refunds can be recorded in WooCommerce, but the actual money return must be done through the gateway or bank separately.
- Do not promise fully automatic refunds until the active payment gateway is checked.

Reference:
https://woocommerce.com/document/woocommerce-refunds/

### How many photos can be added for each event?

Answer:
For the current setup, treat each event as having one main image.

If they want multiple photos/gallery per event, that should be treated as a separate enhancement unless we intentionally style the WooCommerce product gallery now.

### Can the Book button link to the events page?

Answer:
Yes. Confirmed by Yeswanth.

The global header `Book` text/button was previously going to the Reserve page. It should now redirect to the Events page.

## Message To Send Sakshi After Starting Work

```text
I have the points.

I am doing the visual fixes first:
events section background, event card color, smaller header image, single event header visibility, detail page color, and removing the 62+ counter from the event detail page.

I will also link the Hawaii retreat button and change the text to Big Island, Hawaii retreat for now.

I will update the header Book link too. It was going to the Reserve page before. I will point it to the Events page now.

For refunds, WooCommerce can handle refunds. Automatic refund depends on the payment gateway. If the gateway does not support automatic refund, it can still be recorded in WooCommerce and refunded manually from the gateway/bank.

For photos, the current event setup is one main image per event. Multiple photos/gallery can be added later as a separate enhancement if they want that.
```

## Client Boundary

Do not reopen scope discussion right now.

Finish these changes today, send screenshots, then export/send the handoff PDF after final QA.
