# Stillness Events - Custom Email Implementation Plan

Date: 15 June 2026  
Source template: `events-ticket/snippets/email-template.html`  
Goal: Implement the client-supplied Stillness booking confirmation email as closely as possible inside WooCommerce.

**Status: ✅ COMPLETED AND VERIFIED (15 June 2026)**

## Implementation Objective

The client has supplied a finished HTML email design. The implementation preserves the design exactly, with one client-requested modification (background changed from cream to white for better contrast):

- Same layout structure.
- White background color (`#FFFFFF`).
- Same typography choices and fallback fonts.
- Same spacing and section order.
- Same ripple dividers.
- No booking CTA button, to avoid sending customers to an account/login page.
- Same footer links and closing copy.

Only the placeholder values change dynamically.

## Scope

Included:

- One branded customer-facing WooCommerce event booking confirmation email.
- Applies only to orders containing products in the `Events` product category.
- Uses `events-ticket/snippets/email-template.html` as the source of truth.
- Replaces template placeholders with real WooCommerce order and event product data.
- Keeps normal retail/shop WooCommerce emails unaffected.
- Tested and verified via "Send order details to customer" and order status changes.

## Final Technical Approach

We implemented a pure Code Snippets approach without needing to touch or upload any child theme template files. This is much more maintainable and resilient to WooCommerce updates.

1. Added helper functions in `functions-snippets.php`:
   - `stillness_order_has_event()`: Detect whether an order contains an `Events` product.
   - `stillness_get_first_event_from_order()`: Extract the first event product from the order.
   - `stillness_build_event_email_html()`: Build the complete branded HTML using output buffering and dynamic variables.
2. Hooked into `woocommerce_email_before_order_table` to flag when an event email is about to be sent.
3. Hooked into `woocommerce_mail_content` to completely intercept and replace the final HTML output with our custom Stillness design.
4. Hooked into `woocommerce_email_subject_*` to override the subject line to "Your space has been held — Stillness".

Primary WooCommerce email targets intercepted:

- `customer_processing_order`
- `customer_completed_order`
- `customer_on_hold_order`
- `customer_invoice`

## Placeholder Mapping

| Template Placeholder | WooCommerce Source | Fallback |
|---|---|---|
| `{{first_name}}` | `$order->get_billing_first_name()` | Customer full name, then `there` |
| `{{order_item_name}}` | First event line item product name | Order item name |
| `{{event_date}}` | Product attribute `Event Dates` | Empty |
| `{{event_time}}` | Product attribute `Event Time`, if added later | Empty |
| `{{event_location}}` | Product attribute `Sanctuary` | Empty |
| `{{order_number}}` | `$order->get_order_number()` | Order ID |
| `{{order_total}}` | `$order->get_formatted_order_total()` | Empty |

## Data Rules

Event product requirements:

- Product must be assigned to category `Events`.
- Product should have these attributes for best display:
  - `Event Dates`
  - `Event Time` (Optional)
  - `Sanctuary`

Email display rules:

- Session: product/order item name.
- Date & Time: `Event Dates` plus optional `Event Time`.
- Sanctuary: `Sanctuary`.
- Order number: WooCommerce order number.
- Total: WooCommerce formatted order total.
- The email does not include a booking/account CTA button.

## File Plan (Final)

- Client HTML reference at `events-ticket/snippets/email-template.html` (updated to white background).
- Implementation PHP is 100% contained within `events-ticket/snippets/functions-snippets.php`.
- *Note: `customer-event-email.php` was deleted as the pure Code Snippets approach made it obsolete.*

## QA Checklist

- [x] Customer receives a branded Stillness email after booking an event.
- [x] Email follows `events-ticket/snippets/email-template.html`.
- [x] Background updated to white for better contrast.
- [x] Subject line is customized to "Your space has been held — Stillness".
- [x] Buyer first name appears correctly.
- [x] Session name appears correctly.
- [x] Event date appears correctly.
- [x] Event time does not show a broken comma when missing.
- [x] Sanctuary/location appears correctly.
- [x] Order number appears correctly.
- [x] Order total appears correctly.
- [x] Booking/account CTA button is removed.
- [x] Normal shop order emails remain completely unchanged.

## Acceptance Criteria Met

- A real test event order successfully sent the branded Stillness confirmation email.
- All placeholders are replaced with live WooCommerce data.
- The visual design matches the client-supplied HTML.
- Non-event WooCommerce emails are not affected.
- No child theme files required.
