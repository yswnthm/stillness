This is the day-to-day guide for the men's series. It covers everything you need to do, from the first setup to the monthly routine.

> **Your three jobs:** keep the dates current, send the reminder before each evening, and mark the evening used afterwards. The plugin does the rest.

## Sign in

1. Go to `https://wearestillness.com/wp-admin`.
2. Sign in with your WordPress account.
3. Open **WooCommerce → Stillness Packages**.

You will land on **Members**. **Settings** is the tab beside it.

If you cannot see **Stillness Packages**, ask Solicate to add access to your account.

## Set up the dates once

Do this before the first evening.

1. Open **Stillness Packages → Settings**.
2. Check the timezone shown above the table. All dates and times use it.
3. For each confirmed evening, add the date, start time, end time and venue.
4. Leave an evening blank until it is confirmed. A blank date is safer than a guessed one.
5. Add the Google Calendar link if you have one. It appears in the welcome email only.
6. Leave the reminder window at 30 minutes unless Solicate tells you otherwise.
7. Press **Save settings**.

You can change a date later without losing reminder history.

## The monthly rhythm

| When | What you do |
| --- | --- |
| Two weeks before | Confirm the date, time and venue in Settings. |
| One week before | Send the reminder. |
| The day after sending | Check for failed emails and retry if needed. |
| After the evening | Mark one evening used for each member who came. |

That is the whole month.

## Send the reminder

1. Open **Stillness Packages → Members**.
2. Check the **Next evening** card. It should show the right date and time.
3. If it is wrong, fix it in **Settings** first.
4. In the **Send reminder** card, check how many members are waiting.
5. Press **Send reminder** and confirm.
6. The card shows progress: sent, failed and skipped.
7. You can close the page. The emails continue in the background.
8. Come back later to check the final count.

The emails go out in small groups. With forty members, the full send takes about half an hour. That is normal.

If some emails fail, wait until the send stops, then press **Retry failed emails**. It retries only the failed ones.

### Who gets the reminder

A member gets the reminder when:

- their membership is active,
- they still have evenings left,
- they have not already been reminded for that date.

The plugin does not read replies. The count is whatever you have marked in **Members**.

### If the reminder card says something else

| Message | What it means | What to do |
| --- | --- | --- |
| No upcoming evening | There is no dated evening ahead. | Add the next date in Settings. |
| Everyone active has already been reminded | This evening's list is done. | Nothing. |
| Add a date to that evening | The next evening has no date. | Add the date in Settings. |
| A reminder batch is already running | Emails are still going out. | Wait. If it has been quiet for ten minutes, it will stop and you can start again. |
| That evening has already passed | The date is in the past. | Add the next date. |

## After the evening: mark who came

Do this the day after the evening, or at the start of the next month.

1. Open **Stillness Packages → Members**.
2. Find the member. Use the search box if needed.
3. Look at the **Evenings** column: used, left and status.
4. In the **Actions** column, press **Mark used**.
5. The count goes up by one.

Repeat for each member who came.

If you make a mistake, press **Reset** in the same row and mark the correct number again. Reset asks you to confirm.

When a member has used every evening, their status becomes **Completed**. They will not receive more reminders.

If a member could not come, do not mark them used. Their evening stays in the package.

You can also mark usage from the order screen. Open the order, find the **Stillness package** box, and press **Mark one evening used**. The members table is faster for the monthly routine.

## What members receive

**Welcome.** Sent when the membership is created. It includes the package, the dates, how the evenings work, and a reply-to that reaches a person.

**Reminder.** Sent before each evening. It includes the date, time and venue, and one line: if you cannot make it, reply to this email.

Members do not need an account or a password. They reply to the email if something changes.

## Gifts

The gift products ask for the recipient's name and email at checkout.

- The recipient gets the welcome email with the dates.
- The buyer gets a gift thank-you and the normal receipt.
- If the recipient email was missing, the welcome goes to the buyer and an order note explains it.

If the recipient details are wrong, ask Solicate to correct the order before the first reminder.

## If something changes

### A member cannot come

Reply to their email. Leave their usage count alone. The evening stays in their package.

### A member did not get the welcome

1. Check their email address in the order.
2. Open the order.
3. In the **Stillness package** box, press **Resend welcome email**.

The box also shows the error if the last send failed.

### A paid order has no membership

1. Open the order.
2. In the **Stillness package** box, press **Create membership**.
3. The membership is created and the welcome email is sent.

### You need to cancel a membership

1. Open the order.
2. In the **Stillness package** box, press **Cancel membership**.
3. Confirm.

This stops reminders and marks the membership cancelled. It does not refund the order. Refund separately in WooCommerce if needed.

If you cancel or fully refund the order in WooCommerce, the membership cancels automatically.

## The members table

The top of **Members** shows:

- **Memberships** — all memberships.
- **Active** — members with evenings left and a dated evening ahead.
- **Gifts** — gift memberships.
- **Next evening** — the date the reminder card will use.

The table shows 25 members per page. You can filter by package or status, or search by name, email or order number. The **Actions** column has **Mark used** and **Reset**.

### Statuses

| Status | Meaning |
| --- | --- |
| Active | Paid, created, evenings left, and a dated evening ahead. |
| Completed | Every evening used. |
| Expired | Evenings left, but every date is in the past. |
| Cancelled | Cancelled by hand, or the order was cancelled or refunded. |
| Not paid | The order is not processing or completed. |
| Incomplete | Paid, but the membership was not created. Use **Create membership** in the order. |

## Export the member list

1. Open **Stillness Packages → Members**.
2. Press **Export members**.
3. Open the CSV in Excel, Numbers or Google Sheets.

The export is the full list, not the filtered view. It includes member, package, gift flag, usage, status, buyer, order number, order date and join date.

## If something looks wrong

**A member says they did not get the reminder.**
Check the email address in the order. Open the order and look for an error in the **Stillness package** box. Ask them to check spam. If the address is wrong, ask Solicate to correct it.

**A member got a reminder after using every evening.**
Open **Members** and check their count. If it is below the total, mark the missing evenings. If it is wrong, reset and mark the correct number.

**The count looks wrong.**
Open the order and check the order notes. Every mark and reset is recorded with the old and new count. Reset to zero and mark the correct number from **Members**.

**The members table does not show someone.**
Clear the search and status filters. If the order is paid and they are still missing, open the order and check the **Stillness package** box.

**The reminder is stuck.**
Wait ten minutes. The batch will stop itself. Then start again or retry the failed emails. If it keeps happening, ask Solicate to check the site.

**The CSV looks wrong in Excel.**
Save the file, then open it from Excel instead of double-clicking it in the browser.

## What to tell members

> Before each evening you will get a short reminder with the date, time and venue. There is nothing you need to do. If you cannot make it, reply to the email and we will help.

## When to ask Solicate

Ask Solicate when:

- the plugin screen will not open or shows an error,
- a paid order will not create a membership,
- gift recipient details need correcting,
- you need a date beyond the twelve rows,
- the email wording needs to change,
- the export needs a different shape,
- the reminder is still stuck after ten minutes,
- anything about payment, refunds or order status looks wrong.

For the technical description, see `README.html`. For landing-page links and open copy decisions, see `link-map.html`.
