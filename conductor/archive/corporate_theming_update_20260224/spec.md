# Specification: Corporate Page Theming and Interaction Update

## Overview
This track involves applying specific theming changes and interactive hover effects to the Corporate Wellness page (`pages/CorporatePage.tsx`) and its child components. The goal is to align the Corporate page's aesthetic with the "stillness" brand while introducing more engaging interactions in the "Programs" section, specifically using the "Breeze", "Sea Foam", and "Midnight Sea" color palette.

## Functional Requirements

### 1. Hero Section Theming
- **Target:** Hero section of the Corporate page.
- **Change:** Update the background color to `bg-breeze`.
- **Constraint:** Do not modify padding, text alignment, spacing, or typography.

### 2. "Trusted by..." Label
- **Target:** The "Trusted by forward-thinking teams" text.
- **Change:** Update text color to `text-seafoam`.
- **Constraint:** Do not modify logos, font weight, or font size.

### 3. Programs Section Cards (Interactive)
- **Target:** Cards within the Programs section of the Corporate page.
- **Change:** Replicate the card structure and hover effect from `components/Heal.tsx`.
- **Implementation Details:**
  - Card container: `p-8 rounded-3xl bg-cream border border-stone/5 hover:border-seafoam/30 hover:shadow-xl hover:shadow-seafoam/5 transition-all duration-500 cursor-pointer`.
  - Icon/Circle container: `w-12 h-12 rounded-full border border-seafoam text-seafoam group-hover:bg-seafoam group-hover:text-white flex items-center justify-center transition-colors duration-500`.
- **Constraint:** Do not alter card spacing, content structure, or typography.

### 4. Testimonials Section Theming
- **Target:** Testimonials section of the Corporate page.
- **Section Background:** Update the entire section background to `bg-seafoam`.
- **Card Background:** Ensure testimonial cards remain `bg-cream` or `bg-white` for visibility.
- **Text Color Change:** Update the testimonial person's name text color to `text-seafoam`.
- **Constraint:** Do not change card structure, spacing, or title text color.

### 5. Contact Form Section
- **Target:** Contact form container.
- **Change:** Update background color to `bg-breeze`.
- **Constraint:** Preserve layout and spacing exactly.

### 6. Submit Button Styling
- **Default State:** Solid white background (`bg-white`).
- **Hover State:** Midnight Sea background (`hover:bg-midnightsea`).
- **Transition:** 200–300ms transition.
- **Constraint:** Maintain existing border-radius, padding, and typography.

## Non-Functional Requirements
- **Responsiveness:** Ensure all changes are responsive across mobile and desktop.
- **Performance:** Reuse existing Tailwind CSS classes and Framer Motion patterns.
- **Maintainability:** Align with the project's established style guides and component patterns.

## Out of Scope
- **Redesigning Sections:** No modifications to layout or spacing beyond specified color changes.
- **Typography Changes:** No changes to font sizes or weights.
- **Refactoring:** No major structural refactors unless necessary for the requested interaction model.
