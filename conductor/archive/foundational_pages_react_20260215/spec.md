# Specification - Foundational Pages Expansion (React Phase)

## Overview
This track involves the development of three core foundational pages—**About**, **Corporate**, and **Reserve**—within the existing React/TypeScript codebase. The primary goal is to create high-fidelity designs that are **technically simple** enough to be easily migrated to WordPress/Elementor once approved.

## Functional Requirements

### 1. About Page (React)
- **Brand Story & Timeline:** Modular components detailing the origins and journey of Stillness.
- **Mission Statement:** A visually prominent component for core values.
- **Team/Founders Section:** Responsive grid or list for leadership profiles.

### 2. Corporate Page (React)
- **Service List:** Detailed components for corporate wellness programs.
- **Inquiry/Contact Form:** A functional React form component for corporate inquiries.
- **Social Proof:** Components for client logos and corporate-specific testimonials.

### 3. Reserve Page (React)
- **Booking Interface:** A UI implementation of a booking calendar or scheduling flow.
- **Information Flow:** Instructional components for the reservation process.

## Technical Constraints for Portability
- **Simple CSS/HTML:** Prioritize layouts that can be recreated with Elementor Flexbox containers. Avoid overly complex CSS Grid structures if a simple Flexbox layout suffices.
- **Standard Animations:** Use Framer Motion for entrance animations (fade, slide) that match Elementor’s native "Motion Effects." Avoid complex, multi-step state-driven animations that require heavy React logic.
- **Clean Component Logic:** Keep functional logic (like form handling) decoupled from the styling to ensure the HTML/CSS structure can be easily extracted.
- **Static First:** Focus on the visual structure and content layout first, using minimal "React-only" dependencies.

## Acceptance Criteria
- [ ] About, Corporate, and Reserve pages are fully functional and navigable within the React app.
- [ ] All specified sections (Team, Inquiry Form, Booking UI) are implemented with high-fidelity styling.
- [ ] The design is "Migration-Ready" (structures are clear and simple).
- [ ] Code follows the project's TypeScript and styling conventions.

## Out of Scope
- WordPress/Elementor migration (to be handled in a subsequent track after approval).
- Blog or Shop pages.
