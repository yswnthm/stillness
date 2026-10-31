# Stillness Diagnostic Quiz — WordPress deployment guide

This guide deploys the quiz entirely inside WordPress. The local prototype is
not part of the live build.

## Before you begin

You need an administrator account with access to:

- Code Snippets
- Elementor
- WooCommerce Products and Product CSV Importer
- WooCommerce payment settings
- MailerLite, to create an API token and identify the destination group

Collect these before touching the website:

1. Final approval for the 15 questions and the four result types in
   `../content/quiz-content.php`.
2. One audio file and workbook/PDF for each of the four result variations.
3. A MailerLite API token and destination group ID.
4. The final public result-page URL. This guide uses
   `https://stillnesscuratedretreats.com/your-prescription/`.

Do the work on a staging site first if one exists. Back up the live site and
take screenshots of the current checkout before changing it.

## 1. Add the four Code Snippets entries

In **WordPress Admin → Snippets → Add New**, create these entries. Choose the
matching code type, set each to **Run everywhere**, save, and activate it
before moving to the next one.

| Order | Name to use | Type | Paste this file |
| --- | --- | --- | --- |
| 1 | Stillness Quiz — Private config | PHP | `mailer-lite-config.example.php` |
| 2 | Stillness Quiz — Content | PHP | `../content/quiz-content.php` |
| 3 | Stillness Quiz — Logic | PHP | `../snippets/diagnostic-quiz.php` |
| 4 | Stillness Quiz — Frontend assets | PHP | `../snippets/quiz-assets-php-only.php` |

For the private-config snippet, replace only these placeholders before saving:

```php
PASTE_MAILERLITE_API_TOKEN_HERE
PASTE_MAILERLITE_GROUP_ID_HERE
```

Never place live credentials in the repository or in an Elementor widget.
Leave the prescription URL unchanged unless the result page uses another slug.

If Code Snippets reports a PHP parse error, remove the opening `<?php` line
only for that editor; some installations add it automatically. The fourth
snippet prints the scoped CSS in the page head and JavaScript in the footer, so
the free plan never needs a CSS or JavaScript snippet type.

## 2. Import the WooCommerce prescription product

1. Go to **Products → All Products → Import**.
2. Upload `product-prescription.csv` from this folder.
3. Keep the header mapping as detected; confirm that `SKU`, `Type`, `Parent`,
   `Attribute 1 name`, and `Attribute 1 value(s)` are mapped.
4. Run the import.
5. Open **Diagnostic Prescription** and confirm it is a variable product with
   four variations: A, B, C, and D.
6. Open each variation and attach only that type's audio and PDF/workbook in
   its **Downloadable files** area. Keep it **Virtual** and **Downloadable**.
7. Confirm each variation is in stock, purchasable, and priced at ₹1,999.
8. Save the product.

Do not change the parent SKU `stillness-diagnostic-prescription`: the quiz
uses it to locate the variation IDs dynamically.

## 3. Create the diagnostic landing page

1. Create a new page named **Stillness Diagnostic**.
2. Edit it with Elementor and use a full-width/no-sidebar layout.
3. Add five separate Elementor **HTML** widgets in this order for the landing page:
   - `html-blocks/01-hero.html`
   - `html-blocks/02-promise.html`
   - `html-blocks/03-quiz.html`
   - `html-blocks/04-faq.html`
   - `html-blocks/05-reflection.html`
4. Save and preview the page.

The third block contains `[stillness_quiz]`. If the site displays that text
instead of the quiz, replace that one HTML widget with an Elementor
**Shortcode** widget containing only:

```text
[stillness_quiz]
```

Keep the heading and surrounding section from `03-quiz.html` in the HTML
widget above it.

## 4. Create the secure result page

1. Create a new page named **Your Prescription**.
2. Set its slug to exactly `your-prescription`.
3. Edit with Elementor; use a full-width/no-sidebar layout.
4. Add an HTML widget and paste `html-blocks/06-result.html`.
5. Publish the page.

The result page is intentionally not a generic public product page. It only
reveals a paid prescription when its URL contains a matching paid-order ID and
WooCommerce order key.

## 5. Configure checkout and payment

1. In **WooCommerce → Settings → Accounts & Privacy**, allow guest checkout
   unless the business deliberately requires accounts.
2. In **WooCommerce → Settings → Payments**, confirm the active gateway can
   complete payment for a virtual, downloadable product.
3. In the gateway's test/sandbox mode, make one test purchase. Do not use live
   payment mode until the complete test checklist below passes.
4. Ensure WooCommerce customer payment-complete emails are enabled. The quiz
   adds the secure result link to applicable paid-order emails.

## 6. Verify MailerLite before publishing

1. In MailerLite, create or choose the group that should receive quiz leads.
2. Copy its ID and place it in the private-config snippet.
3. Take the quiz using a real inbox you control.
4. Confirm the subscriber arrives in the intended group with one of these
   tags: `quiz-type-a`, `quiz-type-b`, `quiz-type-c`, or `quiz-type-d`.
5. Confirm the name field is present.

The result should still appear if MailerLite is unavailable. That fallback is
intentional; a lead-capture outage must not block the visitor's result.

## 7. End-to-end acceptance test

Perform this entire sequence once for each result type A–D. Use the payment
gateway's sandbox/test mode first.

1. Open the diagnostic page in an incognito/private window.
2. Confirm all 15 questions render and each has four selectable options.
3. Answer every question as the same letter. The result should match that
   letter.
4. Enter a name and real email address. Confirm the result appears.
5. Select **Unlock the full prescription**.
6. Confirm checkout contains the matching Woo variation, not an empty cart.
7. Complete payment.
8. On the thank-you page, select **Open your personalized prescription**.
9. Confirm the result page shows the matching type and its attached downloads.
10. Open the payment email. Confirm it contains the same secure result link.
11. Open that link in a logged-out/incognito browser and verify the downloads
    still work.

Then run the security checks:

1. Change only the `order` value in a paid result URL. It must stay locked.
2. Change only the `key` value. It must stay locked.
3. Use a valid unpaid order URL. It must stay locked.
4. Refund the test order and confirm the result becomes locked.
5. Visit `/your-prescription/?type=A` while logged out. It must not reveal a
   paid result. The preview route works only for WordPress administrators.

## 8. Final mobile and regression check

Check the diagnostic and result pages at 375px, 390px, 768px, and desktop.
Also check the normal Shop, existing event booking flow, and regular checkout.
The quiz CSS is globally loaded but namespaced to avoid changing those pages.

## 9. Go live

After the sandbox test passes:

1. Switch the payment gateway to live mode.
2. Make one low-value real purchase, refund it afterward if appropriate.
3. Publish the diagnostic page and add it to the intended navigation, campaign,
   or landing-page link.
4. Monitor the first real lead, order, email link, and download completion.

## If something fails

| Symptom | First place to check |
| --- | --- |
| Shortcode text appears on the page | Use Elementor's Shortcode widget for that shortcode. |
| Quiz does not render | Confirm all four PHP snippets are active and run everywhere. |
| Checkout opens with no item | Confirm the imported product keeps the parent SKU and all four variations are purchasable. |
| Result page is blank | Confirm the current `snippets/diagnostic-quiz.php` includes `window.STILLNESS_QUIZ =` in the result-page script. |
| Paid result stays locked | Confirm the URL has both `order` and `key`, the order is paid, and the order has `_stillness_quiz_result` meta. |
| MailerLite contact is missing | Recheck the private config token/group and WordPress PHP error log. |
| Downloads are absent | Attach downloadable files to the individual variation, then create a new test order. |

For the compact technical checklist, see `../QA.md`.
