# Stillness Packages

## Landing page link map

This is the bridge between the landing page and the five WooCommerce products. It lists every button that should point at a package, the copy on the page that the plugin does not support yet, and the order to do things in so the page never points at an empty cart.

The site is `https://wearestillness.com`. The cart path is `/cart/`. If the site uses plain permalinks, the cart URL will be different; check **WooCommerce → Settings → Advanced → Page setup**.

## The five links

Use the SKU form so the link survives a product being re-created:

`https://wearestillness.com/cart/?add-to-cart=mens-annual`

| SKU | Product | Add-to-cart link |
| --- | --- | --- |
| `mens-annual` | Founding Member · 12 months | `https://wearestillness.com/cart/?add-to-cart=mens-annual` |
| `mens-six-month` | 6-Month Package | `https://wearestillness.com/cart/?add-to-cart=mens-six-month` |
| `mens-single` | Single Evening | `https://wearestillness.com/cart/?add-to-cart=mens-single` |
| `mens-gift-annual` | Gift · 12 months | `https://wearestillness.com/cart/?add-to-cart=mens-gift-annual` |
| `mens-gift-single` | Gift · Single Evening | `https://wearestillness.com/cart/?add-to-cart=mens-gift-single` |

The plugin resolves the SKU before WooCommerce handles the request. Numeric product IDs still work, but the SKU form is easier to read and does not change when the product is re-created.

## Button map

These are the buttons in `mens-lp-2/index.html` and `mens-lp-2/snippets/07-pricing.html` that currently point at `#`, `#top` or `#pricing`.

| Where it is | Current label | Current link | Should go to |
| --- | --- | --- | --- |
| Header | Reserve a seat | `#pricing` | `mens-annual` |
| Hero | Reserve a founding seat · $480 | `#pricing` | `mens-annual` |
| Hero | Try one session first | `#pricing` | `mens-single` |
| Pricing — Drop-in | Book one evening | `#` | `mens-single` |
| Pricing — 6-month | Start with 6 | `#` | `mens-six-month` |
| Pricing — Founding | Reserve my seat | `#` | `mens-annual` |
| Gift | Gift the year · $480 | `#pricing` | `mens-gift-annual` |
| Gift | Gift one evening · $55 | `#pricing` | `mens-gift-single` |
| Dates | Add my 12 dates to calendar → | `#pricing` | The Google Calendar link in Settings, or a public calendar URL |
| Closing | Join the WhatsApp group | `#` | The real WhatsApp group URL |
| Footer | info@wearestillness.com | `mailto:` | Leave as is |

The pricing snippet and the inline pricing section are duplicates. Update both, or delete one and keep the other.

## The decisions the page is waiting on

The landing page promises more than the first version of the plugin does. These are not bugs in the plugin; they are choices the page makes that the product does not yet support. Each one needs a decision before the page goes live.

| Page says | What the plugin does now | What to decide |
| --- | --- | --- |
| "choose one of 3 groups" and three different times | One date, one start time and one end time per evening, shared by every member. | Simplify the page to one evening time, or add group selection to the plugin. Group selection is not built. |
| "same group all year" | There is no group field. | Remove the promise, or add groups. |
| "Swap into another group that weekend" | There is no group swap. A member writes to the reply-to address, and Komal leaves the evening unused in the package. | Reword as "if you cannot make your evening, reply to the email and the evening stays in your package." |
| "Upgrade to the full year anytime and we credit what you paid" | No upgrade, credit or proration. The 6-month package is a separate purchase. | Remove the promise, or handle upgrades by hand with a custom order. |
| "40 seats" and "13 per group" | No seat counter or capacity rule. WooCommerce stock could cap a product, but not a group. | Remove the numbers, or use WooCommerce stock on a single shared product. |
| "January to June" | The 6-month package is six evenings. It can start at any dated evening. | Say "six evenings" unless the dates really are January to June. |
| "Founding price locked for 2028" | The package is a one-time purchase. There is no renewal or price lock. | Remove the promise, or add a renewal product later. |
| "printable gift card" | The gift is an email and a membership. There is no printable card. | Remove the card visual, or make a separate printable PDF. |
| "Add my 12 dates to calendar" | One Google Calendar link, shown in the welcome email only. There is no per-date download and no calendar button in reminders. | Point the link at a public calendar or a single calendar invite, or remove the button from the page. |
| "Founding pricing closes January 20, 2027" | No automatic expiry. The price stays until someone changes it. | Change the price by hand on that date, or remove the deadline. |
| "Gift card mockup" | No mockup asset is included. | Replace the placeholder with real art or remove it. |

The page also contains placeholders that must be replaced before launch: `[street address]`, `[X] of 13 seats left`, `[X] of 40 seats left`, `[7:00 – 9:30 PM]`, `[2:00 – 4:30 PM]`, `[20 MIN]`, `[25 MIN]`, `[30 MIN]`.

## The calendar link

The plugin has one calendar link, set in **Stillness Packages → Settings**. It is shown as a button in the welcome email only. Reminder emails never include it. When it is blank, the button is hidden.

A Google Calendar link can be:

- a public calendar's sharing URL,
- a single event that contains the year's dates in the description,
- a Google Calendar appointment page, if that is how the series is run.

The plugin does not create the calendar. It only inserts the URL. The landing page's "Add my 12 dates to calendar" link should use the same URL so the page and the emails agree.

## Checkout assumptions

- The store currency is CAD.
- Checkout is the classic WooCommerce checkout, not the block checkout. The gift recipient fields render on the classic checkout. On the block checkout they do not, and the plugin falls back to the buyer email.
- The cart and checkout pages are the standard WooCommerce pages.
- Payment is a live gateway. Test with the gateway's test mode before switching to live.
- The products are hidden from the catalog. The landing page is the only shop window for them.

## Go-live order

Do these in order. The page should not point at a package until the package exists and the email path has been tested.

1. Import `products.csv`. Confirm five products and five SKUs.
2. Confirm the store currency, tax settings and checkout page.
3. Open **Stillness Packages → Settings** and enter the dates, times and venue. Leave unconfirmed dates blank.
4. Add the Google Calendar link and choose the reminder window.
5. Place a test order for each of the five SKUs. Use a test payment method.
6. Confirm the welcome email, the gift thank-you, the members table and the order box.
7. Send a reminder for the next test evening. Confirm the plain reminder arrives and contains no reply buttons, calendar button or usage count.
8. Mark one evening used from the members table, then reset it. Confirm both actions work and the count updates in the order box.
9. Refund or cancel one test order. Confirm the membership cancels.
10. Export the CSV. Confirm the columns.
11. Replace the landing page buttons using the table above.
12. Replace the visible placeholders and decide each item in the decisions table.
13. Run the full test once more on a phone, because most members will open the reminder on a phone.

## Link test

After the buttons are changed, check each one in a private browser window:

- `mens-annual` adds the 12-month package and shows the cart.
- `mens-six-month` adds the 6-month package.
- `mens-single` adds the single evening.
- `mens-gift-annual` adds the gift year and shows the recipient fields.
- `mens-gift-single` adds the gift evening and shows the recipient fields.
- A missing SKU shows the notice and returns to the cart instead of a blank page.
- A quantity above one for the same package is blocked with the one-package notice.
- The cart and checkout still work on a phone.

## What is intentionally not on the page

The plugin does not add a shop archive, a member portal, a login, a group picker, a seat counter, an upgrade flow, a printable gift card or a WhatsApp integration. If the page needs any of those, it is a new piece of work, not a link change.
