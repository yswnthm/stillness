# Build Plan

Status: Code Snippets styling package created.

This plan is intentionally gated. It assumes a styling pass only, but does not assume the checkout technology, affected cart types, or deployment path.

## Phase 0 - Confirm Scope

Goal: decide exactly what checkout experience we are building.

- Confirm styling applies to all checkout orders.
- Confirm only `/checkout/` is included.
- Confirm whether mixed carts must be supported.
- Confirm whether checkout fields stay exactly as they are today.
- Confirm Code Snippets as the implementation route.
- Leave default behaviors unchanged.

Exit criteria:

- A written scope statement exists. Complete.
- Field rules remain unchanged. Complete.
- The implementation path is chosen. Complete.

## Phase 1 - Checkout Audit

Goal: document the current live checkout before designing.

- Identify whether checkout is classic shortcode, Checkout Block, or Elementor widget/template.
- Capture the current desktop and mobile checkout layout.
- Confirm active payment gateway markup and styling limits where visible.
- Confirm current field visibility for:
  - event-only cart
  - physical-only cart
  - mixed cart, if supported
- Confirm current validation errors and order received page behavior.

Exit criteria:

- Current checkout structure is documented.
- Any visible gateway or plugin constraints are known before design starts.

Current read:

- Checkout appears to be classic WooCommerce checkout.
- Payment method appears as card payment inside a secure iframe.
- Exact gateway name still needs admin confirmation.

The exact gateway name is not blocking because the implementation will not style inside secure payment iframes.

## Phase 2 - Design Specification

Goal: define the checkout design before code.

- Define page structure.
- Define order summary contents.
- Define input styling:
  - borders
  - focus states
  - placeholder color
  - labels
  - validation errors
- Define button styling:
  - primary payment button
  - secondary actions
  - disabled/loading states
- Define spacing:
  - section gaps
  - field gaps
  - order review spacing
  - mobile stacking
- Define color usage from the Stillness palette.
- Define mobile layout adjustments.
- Define error and loading states.
- Define exact visual token usage.

Exit criteria:

- Design spec is approved.
- No field or flow decisions remain open.

## Phase 3 - Prototype Or Implementation

Chosen path: native WooCommerce checkout restyle through Code Snippets.

- [x] Add scoped CSS for `body.woocommerce-checkout`.
- [x] Keep existing PHP field logic untouched.
- [x] Avoid behavior-changing PHP hooks.
- [x] Exclude the order received endpoint.

Exit criteria:

- Implementation matches the approved design spec.
- Existing physical checkout behavior is preserved unless explicitly changed.

## Phase 4 - QA

Goal: prove the checkout works commercially, not just visually.

- Test event-only checkout.
- Test physical-only checkout.
- Test mixed cart if supported.
- Test mobile checkout.
- Test validation errors.
- Test payment success and failure states.
- Test order received page.
- Confirm WooCommerce Orders show the required admin data.
- Confirm inputs, buttons, spacing, colors, and mobile layout match the approved styling plan.

Exit criteria:

- All relevant checklist items in `04-qa-checklist.md` pass.
- Any known limitations are documented.

## Phase 5 - Handoff

Goal: leave the implementation maintainable.

- Document where the checkout code lives.
- Document how to disable or roll back the custom checkout changes.
- Document any product setup requirements.
- Add admin guidance if the checkout behavior depends on products being marked `Virtual` or assigned to `Events`.
