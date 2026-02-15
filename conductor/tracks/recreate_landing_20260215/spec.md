# Specification - Recreate Landing Page in WordPress

## Objective
The goal of this track is to faithfully recreate the existing React landing page design of "stillness" within a WordPress environment using Elementor. The target for this migration is a specific page named `duplicate1-page`.

## Scope
The following sections from the React project must be migrated to the `duplicate1-page`:
- **Hero Section:** High-impact visual entry point with animations.
- **Intro & Heal:** Content modules with specific typography and spacing.
- **Corporate Wellness:** Detailed service section with clean layout.
- **Testimonials & Stories:** Social proof sections with consistent branding.
- **Shop Preview:** Product teaser section.
- **Newsletter & Footer:** Functional lead capture and navigation.

## Technical Requirements
- **WP-CLI:** Use for initial page verification and configuration.
- **Elementor:** Build all sections as Elementor widgets or templates.
- **Custom CSS/JS:** Inject via Elementor HTML widgets to replicate specific React behaviors (e.g., Framer Motion-like transitions).
- **Design Parity:** 1:1 match for typography, colors, spacing, and responsive behavior.
- **Client Editability:** All content must remain editable via the Elementor interface.

## Success Criteria
- The `duplicate1-page` is visually indistinguishable from the React landing page.
- All animations are successfully translated to Elementor/CSS.
- The page is fully responsive across mobile, tablet, and desktop.
- The client can edit text and images in every section using Elementor.
