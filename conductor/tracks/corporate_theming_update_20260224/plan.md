# Implementation Plan: Corporate Page Theming and Interaction Update

This plan outlines the steps to apply color updates and interactive effects to the Corporate page as per the approved specification.

## Phase 1: Preparation and Research
- [ ] Task: Verify component file paths and current implementation of `CorporatePage.tsx` and its sub-components.
- [ ] Task: Identify the exact lines for Hero, ClientLogos, ServiceList, CorporateTestimonials, and InquiryForm.

## Phase 2: Implementation of UI Changes

### Hero and Client Labels
- [x] Task: Update Hero section background color in `CorporatePage.tsx` or its specific Hero component. 7e97fee
- [ ] Task: Update the text color for the "Trusted by..." label in `ClientLogos.tsx`.

### Programs/Service List Interactions
- [ ] Task: Apply `Heal.tsx` hover styles and circle animations to the card components in `ServiceList.tsx`.
    - [ ] Update card container classes for hover border and shadow.
    - [ ] Update icon container classes for the circle fill effect.

### Testimonials Section
- [ ] Task: Update the background color of the Testimonials section in `CorporateTestimonials.tsx`.
- [ ] Task: Update the text color of the testimonial person's name to `text-seafoam`.

### Contact Form and Button
- [ ] Task: Update the form container background color in `InquiryForm.tsx` to `bg-breeze`.
- [ ] Task: Update the Submit button default and hover states with the 200-300ms transition.

## Phase 3: Verification and Quality Gates
- [ ] Task: Verify responsiveness on mobile and desktop for all changed sections.
- [ ] Task: Ensure color contrast remains accessible, particularly in the form and testimonials.
- [ ] Task: Conductor - User Manual Verification 'Implementation of UI Changes' (Protocol in workflow.md)

## Phase 4: Finalization
- [ ] Task: Run project linting and type checking.
- [ ] Task: Check for any unintended side effects in global styles.
