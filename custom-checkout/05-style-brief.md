# Checkout Style Brief

Status: draft based on latest clarification.

## Confirmed Target

The checkout work should focus on visual styling:

- page layout and section styling
- input styling
- button styling
- spacing
- colors
- mobile adjustment

## Confirmed Scope

- Applies to all WooCommerce checkout orders.
- Checkout page only.
- Preferred delivery route: Code Snippets.
- Existing checkout field behavior should remain unchanged unless inspection reveals a styling-related issue.
- Default behaviors stay default.
- The implementation should be visual CSS first.

## Live Styling Targets

Based on inspection, the styling pass should cover:

- coupon prompt
- billing details section
- billing inputs
- country/province select fields
- shipping address section
- order notes
- newsletter checkbox row
- order summary table
- payment wrapper
- privacy text
- place order button
- mobile stacking and field spacing

## Behavior Items Out Of Scope

- Collapsing shipping address by default.
- Unchecking newsletter opt-in by default.
- Hiding the cart drawer.
- Changing checkout fields.
- Changing cart flow.
- Changing payment flow.

## Out Of Scope Unless Confirmed

- new checkout flow
- multistep checkout
- custom attendee fields
- payment gateway replacement
- cart behavior changes
- order-data changes
- WooCommerce email changes

## Styling Areas To Plan

### Page

- Overall checkout background.
- Main content width.
- Two-column versus single-column layout.
- Billing/customer details section.
- Order review section.
- Payment section.

### Inputs

- Label style.
- Placeholder style.
- Border color.
- Focus state.
- Error state.
- Required field marker.
- Select/dropdown styling.

### Buttons

- Place order button.
- Coupon/apply button if visible.
- Login/account buttons if visible.
- Disabled and loading states.
- Hover states.

### Spacing

- Page top and bottom padding.
- Section gaps.
- Field gaps.
- Order summary row spacing.
- Payment method spacing.

### Colors

Use Stillness palette unless a different direction is approved:

- stone: `#0E1B30`
- midnight: `#1D3152`
- seafoam: `#688F9D`
- breeze: `#D9E8EB`
- wave: `#A4B2BA`
- sand: `#C4BBB4`
- cream: `#F7F0EC`
- white: `#FFFFFF`

Do not introduce off-palette hex values. Tints via `rgba()` should be derived from the same palette values only.

### Mobile

- Single-column layout.
- Order review placement.
- Full-width payment button.
- Comfortable input height.
- No horizontal overflow.
- Payment iframe/embedded fields must fit.
