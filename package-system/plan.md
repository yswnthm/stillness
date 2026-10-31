> **Superseded — 24 October 2026.** The one-tap reply system described below was removed in plugin v1.1.0. Usage is now marked manually from the order screen. See `README.md` and `guide.md` for current behaviour.

# Men's Landing Page + Package System — Build Plan

**Client:** Stillness Co. · Komal
**Scope:** Men's landing page (done) plus the package system behind it
**Revised:** 23 October 2026
**Target:** Everything built and handed over today, ahead of the 1 November promotion start.

---

## 1. What this is

The landing page is designed and approved. The package system is a small WooCommerce plugin behind it. WooCommerce takes the money. The plugin remembers who bought what, how many sessions they hold, and whether they are coming each month.

It creates no pages, logins, accounts or groups. There is one session a month and everyone attends the same one.

There is no custom cron. Komal triggers each month's reminder with one button; the plugin then sends it in batches using WooCommerce's own background queue, with a retry button for anything that fails.

It is not a ticketing system (FooEvents stays out).

---

## 2. How it works, end to end

### The schedule

Komal gives us the session dates (one per month), the time and the venue. They go on one settings page. Everything else reads from it.

### The three packages

Nobody picks a month or a date at checkout. Every package is a number of attendances, usable at any session in the year.

| Package | Attendances |
|---|---|
| Annual (12 months) | 12 sessions — every date |
| Six-month | 6 sessions — any six dates |
| Single evening | 1 session — any one date |

A six-month buyer is not tied to six consecutive months. They hold six attendances and choose which evenings to use them on.

### What happens at purchase

1. The buyer pays. There is nothing to choose at checkout for standard packages.
2. On gift products, the buyer also enters the recipient's name and email.
3. Payment completes. The plugin creates the membership on the order item, with its attendance count.
4. Emails go out immediately (table below).

### The monthly reminder (one button)

Nothing runs automatically. Each month, Komal opens the dashboard and presses **Send Reminder**.

1. The button defaults to the next upcoming session. A dropdown lets her pick a different one.
2. A confirmation shows the session date and how many members will be emailed.
3. She confirms. The plugin queues the email for every active member with at least one attendance left.
4. The result line updates as the queue works through the list: "Queued 42 · sent 41 · failed 1", with a **Retry failed** button.

**Batching.** Sends are spread across a window so a large list never times out. Default 30 minutes, selectable as 2 hours, 6 hours or 10 hours. Ten hours is the hard cap; nothing runs past a single day.

**Retry.** Pressing **Retry failed** requeues only the failures. Pressing Send Reminder again never double-sends, because each member is marked sent per session. Anyone who bought after the first press is picked up by the next press.

The dashboard also shows the next session date and how many members have not yet been reminded, so it is clear whether this month's button has been pressed.

### What a reply means

The reminder has two buttons: **I'll be there** and **Can't make it**. Both open a one-tap confirmation screen, because Outlook and Gmail pre-open links and would otherwise record replies nobody made.

- **I'll be there** reserves that session and uses one attendance. The confirmation shows how many remain.
- **Can't make it** does not use an attendance. The month is simply skipped.
- A member with no attendances left is politely told so, and pointed back to Komal.
- No reply means no follow-up email. The reminder is the only message for that month.

Replies show in the order box and the dashboard.

### Calendar

One public Google Calendar, created from a Google account, with the session dates. Members add it from a link on the landing page and in their emails. When Komal edits a date in the calendar, subscribers see the change. The plugin does no calendar work.

### Emails

| # | Email | To | When |
|---|---|---|---|
| 1 | Welcome | The member (buyer of a package, or the gift recipient) | Immediately after payment. Lists every date, venue, calendar link. Also used for resend. |
| 2 | Gift thank-you | The gift buyer | Immediately after payment. Personal note thanking them, inviting them to the website and social media for more events. |
| 3 | Monthly reminder | Members holding that session | When Komal presses Send Reminder. Two reply buttons. |

For a gift, the buyer receives email 2 and the recipient receives email 1. They are separate and in separate contexts. The buyer also gets the normal WooCommerce order email. Annual and single gifts work the same way.

### Example

A gift annual membership is bought on 20 December 2026. The recipient immediately gets the welcome email with all dates. The buyer immediately gets the thank-you email. Each month, when Komal presses Send Reminder, the recipient gets that month's reminder and replies with one click. After twelve confirmed evenings, their attendances are used up.

---

## 3. Monthly reminder: risks and how the plan handles them

| Risk | What would go wrong | How it is handled |
|---|---|---|
| Button pressed twice | Duplicate emails | Sent marker per member per session. A repeat press skips anyone already sent |
| Mail send fails | Member misses the reminder | Result line lists failures. **Retry failed** requeues only those |
| Cancelled or refunded member | Reminder goes to someone who left | Membership is removed immediately on refund or cancellation, and status is checked again at send time |
| Many members at once | Server timeout partway | Sends are queued and spread across a 30-minute to 10-hour window |
| Email scanners open links | Outlook and Gmail pre-open links, recording replies nobody made | Link opens a one-tap confirm screen. The reply is recorded only on that tap |
| Reply after the session | Odd records | Replies for past sessions are politely refused |
| No attendances left | Member confirms a session they cannot use | Confirm screen refuses and points them back to Komal |
| Komal forgets to press it | No reminders go out | Dashboard shows next session and how many are not yet reminded |
| Queue stalls | Batch never finishes | Queue is visible in the result line, and **Retry failed** picks up anything stuck |
| Date changed after sending | Replies stay for the old date | Known limit. Komal tells members, and the calendar updates itself |

---

## 4. The five products

Prices are in Canadian dollars. All are virtual, sold individually and hidden from the shop. The landing page links directly to each add-to-cart.

| Product | SKU | Price | Attendances | Extra checkout fields |
|---|---|---|---|---|
| Founding Member · 12 months | `mens-annual` | CA$480 | 12 | None |
| 6-Month Package | `mens-six-month` | CA$270 | 6 | None |
| Single Evening | `mens-single` | CA$55 | 1 | None |
| Gift · 12 months | `mens-gift-annual` | CA$480 | 12 | Recipient name and email |
| Gift · Single Evening | `mens-gift-single` | CA$55 | 1 | Recipient name and email |

**Data:** stored as order item meta. No custom tables. Creation is keyed on order ID plus line item so a repeated hook never makes a duplicate. It triggers on payment or processing, not only "completed", since virtual orders often never reach completed.

**Refunds and cancellations:** a refunded or cancelled order removes the membership immediately. It disappears from the dashboard and is skipped by any queued batch.

---

## 5. Admin

### Dashboard (under WooCommerce)

- **Send Reminder** button, with session dropdown, confirmation, live result line and **Retry failed**
- batch window setting: 30 minutes, 2 hours, 6 hours or 10 hours
- next session date and members not yet reminded
- totals: memberships, active members, gifts
- one table: member, plan, attendances used, status, link to the order
- filter by plan and status
- CSV export

### Order box (main actions only)

- summary: plan, member, attendances used and remaining, status
- replies per session
- resend welcome email
- cancel membership (removes it)

Anything beyond this, Komal asks us.

### Settings

The session dates, time, venue, the Google Calendar link, and the reminder batch window.

---

## 6. Build flow

1. Products and gift checkout fields
2. Settings page: dates, time, venue, calendar link, batch window
3. Membership creation on payment, with refund removal and duplicate handling
4. Welcome and gift thank-you emails
5. Send Reminder button: queue, batching, sent markers, live result line, retry
6. One-tap confirm screen for replies
7. Order box and dashboard with CSV export
8. Test: annual, six-month, single, both gifts, refund, duplicate order, pressing Send Reminder twice, a failed send, a retry, a late buyer, no attendances left
9. Deploy: import products, wire landing page links, hand over the guide

---

## 7. Questions for Komal

1. **The session dates, the time and the venue.** Her message says 6:30–8:00 PM and the landing page lists other times. Which is correct?
2. **Gift thank-you email.** Any offer or wording she wants in it, or should it simply thank them and point to the website and social links?

---

## 8. Out of scope

- Individual event tickets (FooEvents)
- Recurring payments
- Groups and seat limits
- Automatic monthly sending (Komal triggers it; the queue only spaces the send)
- Member accounts, logins or a member page
- Extra designed pages
- A built-in calendar feed (replaced by a Google Calendar)
- Make-up sessions, transfers or rollover of unused attendances
- Marketing emails beyond the three above
- Bulk actions and reporting beyond the dashboard

---

## 9. Commercial reference

| Item | Amount |
|---|---|
| Landing page (agreed, built) | ₹4,000 |
| Package system | ₹9,000 |
| Calendar | ₹2,500 as quoted |
| **Total** | **₹15,500** |

The calendar line was quoted for a built-in feed. With a Google Calendar there is no feed to build, so confirm whether that line still applies. Products are priced in CA$ and the commercials are in ₹. They are separate.

---

## 10. Deliverables

- `stillness-package-system.php` — the plugin
- `products.csv` — the five WooCommerce products
- `README.md` / `README.html` — deployment steps for us
- `guide.md` / `guide.html` — plain-English guide for Komal
- Landing-page link map: which button goes to which add-to-cart link, and the Google Calendar link

---

*Prepared by Solicate. Internal build plan.*
