# Events Pages Client Issues

## Scope

This file tracks the latest client design feedback for:

- Events catalogue page
- Single event detail page
- Shared/header styling that may affect both pages

## Implementation Order

### 1. Events Catalogue Page - Event Cards Section Background

**Client issue:**
The section that contains the existing event cards should be white.

**Requested direction:**
- Change the event cards section background to white.
- Keep the event cards visually separate from the section background.

**Proposed implementation:**
- Set the events catalogue card section background to white.
- Update individual event cards to use a different color from the existing Stillness color palette.
- Make sure the cards still have enough contrast against the white section.

**Status:** Done

**Resolution:**
- Updated the event catalogue cards section background to white in the Elementor HTML/CSS snippet.

---

### 2. Events Catalogue Page - Event Card Color

**Client issue:**
Once the catalogue section is white, the event cards should not also be white.

**Requested direction:**
- Use another color from the existing palette for the event cards.

**Proposed implementation:**
- Pick a palette color that fits the Stillness visual system.
- Avoid cream if it conflicts with the single event page feedback.
- Preserve readability for event title, date, metadata, and CTA text.

**Status:** Done

**Resolution:**
- Updated the event cards to use a brand-aligned blue/seafoam palette instead of white/cream.
- Adjusted borders, hover state, text contrast, sold-out badge, and empty-state colors to match.

---

### 3. Events Catalogue Page - Hero/Image Section Size and Crop

**Client issue:**
The hero image felt too large on the events catalogue page.

**Discussion/decision so far:**
- Client initially wanted the image smaller.
- Earlier option was to remove the image section entirely.
- Final direction changed to keeping the image, reducing the hero height, and cropping the top portion.

**Proposed implementation:**
- Reduce the catalogue hero image height.
- Crop enough of the top/cloud area to clean up the composition.
- Keep the person's head visible in the image.

**Status:** Done

**Resolution:**
- Updated the catalogue hero section to a shorter height.
- Adjusted `object-position` so the top is cropped without cutting off the head.

---

### 4. Shared/Header Styling - Header Text Visibility

**Client issue:**
The page header is not clearly visible on either the catalogue page or the single event page.

**Requested direction:**
- Header text needs to be white.

**Proposed implementation:**
- Locate the affected header area.
- Update header/title text to white.
- Verify contrast against the current header background.
- Check both the events catalogue page and single event page.

**Status:** Done

**Resolution:**
- Events catalogue hero/header text was updated to white in the revised hero snippet.
- Single event page header visibility issue was also fixed.

---

### 5. Single Event Detail Page - Avoid Cream Background/Color Usage

**Client issue:**
The single event detail page should avoid using the cream color currently present in the design.

**Requested direction:**
- Use colors from the approved Stillness color palette instead.

**Proposed implementation:**
- Audit the single event detail page for cream-colored sections, blocks, or cards.
- Replace cream usage with appropriate palette colors.
- Keep the design consistent with the catalogue page after its updates.
- Verify text contrast after changing colors.

**Status:** Done

**Resolution:**
- Updated the single event warm info band from cream/warm tones to the approved Stillness blue/seafoam palette.
- Updated the single event detail section background and booking card colors to avoid the cream treatment.
- Verified the replacement direction keeps the page within the existing palette.

---

### 6. Single Event Detail Page - Remove Past Event Counter

**Client issue:**
The single event detail page does not need the past event counter.

**Requested direction:**
- Remove the past event counter from the single event page.

**Proposed implementation:**
- Locate the past event counter component/section.
- Remove it from the single event detail page.
- Confirm the surrounding layout still works after removal.

**Status:** Done

**Resolution:**
- Removed the past event counter from the single event page.

## Notes

- The image-section issue was identified as the events catalogue hero and resolved with reduced height/crop instead of removal.
- Color updates should stay within the existing Stillness palette.
- The catalogue past-events counter was also cleaned up separately, but it was not part of this original issue list.
- All original client issues in this file are now marked done.
