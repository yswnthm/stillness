# Stillness Packages

A single WordPress plugin that turns five WooCommerce products into the men's series memberships. It creates the membership when an order is paid, sends the welcome and gift emails, sends a plain monthly reminder, tracks usage manually, and gives Komal a dashboard for members, dates, exports and the reminder batch.

The plugin is deliberately small. It uses WooCommerce orders and order item meta instead of custom tables, so the data stays with the order and survives normal backups.

## What is in this folder

| File | What it is |
| --- | --- |
| `stillness-package-system.php` | The plugin. One file, no build step. |
| `products.csv` | The five WooCommerce products, ready to import. |
| `README.md` / `README.html` | This document. |
| `guide.md` / `guide.html` | The day-to-day runbook for Komal. |
| `link-map.md` / `link-map.html` | Landing page links, SKUs and copy that needs a decision. |

## What the plugin does

1. Sells five packages: a 12-month founding membership, a 6-month package, a single evening, and two gift versions.
2. Creates a membership on the order item when the order reaches processing or completed.
3. Sends a welcome email with the dates and a plain-English explanation of how the evenings work.
4. Sends the gift buyer a separate thank-you, and sends the recipient their own welcome.
5. Sends a plain reminder before each evening with the date, time and venue. There are no reply buttons.
6. Tracks usage manually from the members table or the order screen. One click marks one evening used, and a member who has used every evening drops out of future reminders.
7. Sends reminders in small batches through Action Scheduler, so a shared host does not have to send a hundred emails in one request.
8. Provides a WooCommerce screen for members, settings, CSV export, reminder progress and manual membership actions.

## Requirements

- WordPress 6.5 or newer.
- WooCommerce 8.0 or newer.
- PHP 7.4 or newer.
- Action Scheduler, which ships with WooCommerce.
- A working `wp_mail` setup. On a live site, use an SMTP plugin or a transactional email service. The plugin does not include an email log.

## Install

1. Create a folder named `stillness-packages` in `wp-content/plugins/`.
2. Put `stillness-package-system.php` inside it.
3. In WordPress, go to **Plugins → Installed Plugins** and activate **Stillness Packages**.
4. If WooCommerce is not active, the plugin will show a notice and do nothing else.
5. Go to **WooCommerce → Stillness Packages**. The screen should open with an empty members table.

## Import the products

1. Go to **Products → All Products → Import**.
2. Choose `products.csv`.
3. Let WooCommerce map the columns. The file uses the standard WooCommerce headers plus two meta columns.
4. Run the import.
5. Confirm that five products exist with these SKUs.

| SKU | Product | Price | Evenings | Gift |
| --- | --- | ---: | ---: | --- |
| `mens-annual` | Founding Member · 12 months | CA$480 | 12 | No |
| `mens-six-month` | 6-Month Package | CA$270 | 6 | No |
| `mens-single` | Single Evening | CA$55 | 1 | No |
| `mens-gift-annual` | Gift · 12 months | CA$480 | 12 | Yes |
| `mens-gift-single` | Gift · Single Evening | CA$55 | 1 | Yes |

The products are published but hidden from the catalog. They are sold from the landing page buttons, not from the shop. Hiding them keeps the shop focused on the existing offers while the direct add-to-cart links still work.

The two meta columns are read by the plugin:

- `Meta: _stillness_plan` — the internal plan key. It must match the SKU.
- `Meta: _stillness_attendances` — how many evenings the package includes.

If a product is re-created by hand, set those two meta fields, or keep the SKU exact. The plugin falls back to the SKU when the meta field is missing.

## Set the dates

Go to **WooCommerce → Stillness Packages → Settings**.

There are twelve rows, one for each evening in the year. Each row has a date, a start time, an end time and a venue. The session numbers are fixed (`s01` to `s12`). Reminder history is stored against the session number, so changing a date later does not break an existing record.

- Leave a date blank until it is confirmed. A blank date blocks reminders for that evening with a clear message.
- The site timezone is shown above the table. Dates and times are interpreted in that timezone.
- The **Google Calendar link** is optional. When set, it appears as a button in the welcome email only. Reminder emails never include it.
- The **Reminder window** controls how long a reminder batch takes. The default is 30 minutes. The other choices are 2 hours, 6 hours and 10 hours.

Save the settings before importing products or sending a test.

## How a membership is created

The membership is created when the order reaches **Processing** or **Completed**. The plugin listens to the payment complete event and to both order status changes. A short lock on the order prevents two requests from creating the same membership twice.

For each package item on the order:

- The plan and number of evenings are stored on the order item.
- The member name and email are stored on the order item. For a normal package, these come from the billing details. For a gift, they come from the recipient fields.
- The welcome email is sent to the member.
- For a gift, the thank-you email is sent to the buyer.
- An order note records what was created.

If the welcome email fails, the error is stored on the item and shown in the Stillness box on the order screen. The membership is still created. Email failure does not block the order.

If an order was marked paid while the plugin was inactive, open the order and use **Create membership** in the Stillness box. That runs the same creation path and sends the welcome email.

## The emails

There are three emails.

**Welcome.** Sent to the member when the membership is created. It includes the plan, the dated evenings, a short explanation of how the evenings work, the calendar button if a link is set, and a reply-to that reaches a person.

**Gift thank-you.** Sent to the buyer when a gift membership is created. It confirms the gift, says where the welcome went, and gives the buyer a way to correct the recipient address by replying.

**Reminder.** Sent before an evening to every active member who still has evenings left. It includes the date, time and venue, and one line: if you cannot make it, reply to this email. It does not include a calendar button, reply buttons, or a usage count.

The From name and address default to the site name and the WooCommerce from address, then the admin email. A site can override the address with the standard `woocommerce_email_from_address` filter.

The plugin does not log every email. Delivery failures are visible in the order note, the Stillness order box and the reminder batch counts. For a full email log, use the site's SMTP or transactional email plugin.

### Changing the email copy (team only)

The site does not include an email editor. The dates, member details and session copy are generated by the plugin, so editing a saved email would break the next send. For a one-off wording change, a developer can add a snippet in **Code Snippets**. The plugin stays installed; no zip rebuild is needed.

Every email passes through five filters before it is sent. Each filter receives the current value, the email type (`welcome`, `gift_thankyou` or `reminder`), the order, the order item and the session. The session is `null` for the welcome and gift thank-you emails.

| Filter | What it changes |
| --- | --- |
| `stillness_packages_email_subject` | Subject line |
| `stillness_packages_email_body` | Body content, before the shared HTML wrapper |
| `stillness_packages_email_preheader` | Hidden preview line |
| `stillness_packages_email_html` | Complete HTML, after the wrapper |
| `stillness_packages_email_headers` | `wp_mail()` headers, including From |

Example: change the welcome subject and replace one reminder sentence.

```php
add_filter('stillness_packages_email_subject', function ($subject, $type) {
    return $type === 'welcome' ? 'Your Stillness year begins here' : $subject;
}, 10, 2);

add_filter('stillness_packages_email_body', function ($body, $type) {
    if ($type === 'reminder') {
        $body = str_replace('This is a reminder for', 'A gentle reminder for', $body);
    }
    return $body;
}, 10, 2);
```

Keep the session details intact. If a snippet changes the HTML, test a welcome, a gift thank-you and a reminder before leaving it active.

## Usage tracking

There is no member reply system. Usage is recorded by Komal from **WooCommerce → Stillness Packages → Members**, or from the order screen.

Each membership starts at zero evenings used. In the members table, the **Actions** column has **Mark used** and **Reset**. The order screen's **Stillness package** box has the same controls, with the current count, the number left and the status.

- **Mark used** / **Mark one evening used** adds one evening to the count.
- **Reset** / **Reset usage** sets the count back to zero. It asks for confirmation.
- Every change adds an order note with the old count, the new count and the member email.
- The count is clamped between zero and the package total.
- When the count reaches the total, the status becomes **Completed** and the member drops out of future reminder queues.
- If an evening is not marked, the member can receive the next reminder. That is expected; mark it before sending the next batch.

The count is visible in the members table and the order box. It is never shown in a member email.

## Reminders

Open **WooCommerce → Stillness Packages → Members** and find the **Send reminder** card. It uses the next dated evening. The card shows how many members are waiting.

When you press **Send reminder**:

- The plugin builds a queue of active members who have evenings left and have not already been reminded for that date.
- It sends five emails per Action Scheduler run.
- It spreads the runs across the chosen window. With 40 members and a 30-minute window, the batch runs in eight groups of five, roughly four minutes apart.
- The card shows sent, failed and skipped counts, a progress bar and the latest error.
- You can close the page. Sending continues in the background.
- If a group fails, use **Retry failed emails** after the batch stops. Retry only resets failed rows; it does not resend successful ones.
- A batch that stops updating for ten minutes is marked stale, so a new batch can be started.

Action Scheduler needs a working cron. On a normal host, WP-Cron is enough. On a host with WP-Cron disabled, set a server cron to `wp cron event run --due-now` or use the Action Scheduler runner.

The reminder is sent only for an evening with a date. A blank date produces a warning, not a broken email.

## The dashboard

**Members** shows every membership that has been created, including cancelled ones, with filters for package, status and a search box for name, email or order number. It is paginated at 25 rows.

**Export members** downloads a CSV with member name, email, package, gift flag, evenings used, total, remaining, status, buyer, buyer email, order number, order date and join date. The export respects no filters; it is the full list.

**Settings** holds the twelve dates, the calendar link and the reminder window.

The **Stillness package** box on the order screen shows the plan, member, evenings used, evenings left, status and any welcome error. It provides:

- **Create membership** when a paid order has no membership yet.
- **Mark one evening used**.
- **Reset usage**.
- **Resend welcome email**.
- **Cancel membership**. This marks the membership cancelled and stops reminders. It does not refund the order or change the order status.
- A link back to the members table filtered by the member email or order number.

## Status meanings

| Status | Meaning |
| --- | --- |
| Active | Paid, created, evenings remaining, and at least one dated evening is still ahead. |
| Completed | Every evening in the package has been used. |
| Expired | Evenings remain, but every dated evening is in the past. |
| Cancelled | The membership was cancelled manually or the order was cancelled or refunded. |
| Not paid | The order is not in processing or completed. |
| Incomplete | The order is paid, but the membership item has not been created. Use the order box to create it. |

## Gifts

The two gift products ask for the recipient's name and email in the cart and again at checkout. The fields are required at checkout. The details are saved on the order item.

- The recipient receives the welcome email with the dates and details.
- The buyer receives the gift thank-you and the normal WooCommerce receipt.
- If the recipient email is missing, the plugin falls back to the buyer and adds an order note. The welcome then goes to the buyer, who can forward it.
- A gift does not renew. There is nothing for the recipient to cancel.

## Links and add to cart

The landing page buttons should use the cart add-to-cart URL with the SKU:

`https://wearestillness.com/cart/?add-to-cart=mens-annual`

The plugin resolves the SKU to the product ID on `wp_loaded` before WooCommerce handles the add-to-cart request. Numeric product IDs still work. If a SKU is missing, the visitor sees a notice and is sent to the cart.

Each package is limited to one per order. A quantity above one for the same package is blocked with a notice. If a member wants two of the same package, use two orders. Different packages can sit in one cart if that is useful for a gift plus a membership.

## Data and privacy

All membership data lives in WooCommerce order item meta. The plugin does not create custom tables. The meta keys are prefixed `_stillness_`.

- Evenings used are stored as an integer, `_stillness_evenings_used`.
- The reminder batch is a single option, `stillness_packages_batch`.
- Settings are a single option, `stillness_packages_settings`.

Deactivating the plugin stops cron and clears the batch, but leaves settings and order data in place. Deleting the plugin does not delete order data. If the site is decommissioned, remove the options and the order item meta through the normal data retention process.

Usage changes are made by an administrator with the `manage_woocommerce` capability. There is no public usage link and no member-facing count.

## Testing checklist

Before go-live, run this on a staging site with Stripe test mode or a manual payment method.

1. Import `products.csv` and confirm five products with the right SKUs, prices, evening counts and hidden visibility.
2. Set at least two future dates in Settings and save.
3. Place a normal order for `mens-annual`. Confirm the membership is created, the welcome email arrives and the order note is present.
4. Open the welcome email. Confirm the dates and reply address.
5. Place a gift order for `mens-gift-single`. Confirm the recipient fields are required, the recipient gets the welcome and the buyer gets the thank-you.
6. Send a reminder for the next evening. Confirm the batch card progresses, the email arrives, and the email contains the date, time, venue and reply-to line only.
7. Mark one evening used from the members table. Confirm the order note, the count and the order box.
8. Reset usage. Confirm the count returns to zero.
9. Mark a single-evening membership used. Confirm it shows **Completed** and drops out of the reminder queue.
10. Refund or cancel a test order. Confirm the membership shows cancelled and the reminder queue skips it.
11. Export the CSV and open it in a spreadsheet. Confirm the columns and line endings.
12. Check the order screen box for a paid order with no membership, then use **Create membership**.
13. Check the site's cron and Action Scheduler. Confirm a scheduled reminder run completes.

## Limitations

- Classic checkout is required for the gift recipient fields. On the block checkout, the fields do not render; the plugin falls back to the buyer email and an order note.
- One of each package per order. A quantity above one for the same package is blocked; different packages can share an order.
- One evening per month. There are no groups, group swaps or multiple sessions in a month.
- No upgrades, credits or proration between packages.
- No printable gift card. The gift is an email and a membership.
- No attendance check-in screen. Manual usage is the record.
- No member self-serve reply. Members write to the reply-to address, and Komal updates usage.
- No SMS or WhatsApp reminders.
- Dates are global. Every member sees the same twelve evenings.
- The plugin does not send a receipt. WooCommerce does that.

## Support

For changes to the plugin, the emails or the landing page links, contact Solicate. For day-to-day operation, use `guide.html`.
