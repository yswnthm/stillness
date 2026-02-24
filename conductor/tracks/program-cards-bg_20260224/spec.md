# Specification: Program Cards Background Images

## Overview
Add background images to the "Our Programs" section cards in the Corporate Wellness page. Each card will have a unique corporate-themed image from Picsum with medium opacity (30-40%) and a subtle CSS-based zoom effect on hover.

## Functional Requirements
1. Each of the 3 program cards will have a different corporate-category background image from Picsum
2. Background images will have 30-40% opacity (medium transparency) to maintain text readability
3. Background images will have a subtle zoom animation on card hover using CSS transitions only
4. Existing card styling (borders, shadows, icon styling) remains unchanged

## Non-Functional Requirements
1. Images must load efficiently without impacting page performance
2. Text contrast must remain accessible per WCAG guidelines
3. Hover animation should be smooth using CSS `transform` and `transition` properties

## Acceptance Criteria
- [ ] All 3 program cards display different Picsum corporate images as backgrounds
- [ ] Background images have medium opacity (30-40%)
- [ ] Background images zoom subtly on hover using CSS transitions
- [ ] Text remains readable over the background images
- [ ] Existing card border, shadow, and icon styles are preserved
- [ ] No visual regression on other card elements
- [ ] No Framer Motion used for the background image animation

## Out of Scope
- Changes to card layout, spacing, or structure
- Modifications to icon styling or animations
- Changes to other sections of the Corporate Wellness page
