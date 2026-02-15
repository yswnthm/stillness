# Initial Concept
Project goal: Run and deploy an AI Studio app locally and on the web.
## Goal
The primary objective is to faithfully recreate the "stillness" wellness website design—currently a React/TypeScript application—within WordPress using Elementor. This transition ensures that the client can easily manage and edit all sections of the site while maintaining the high-quality design and animations of the original project.

## Target Audience
- **Wellness Seekers:** Users looking for wellness, healing, and corporate wellness solutions.
- **Client/Administrators:** Users who require the flexibility of WordPress and the intuitive editing experience of Elementor to maintain the site's content.

## Migration Strategy
- **WordPress Environment:** A dedicated `wordpress/` directory will be created in the project root to store migration configurations, scripts, and documentation.
- **WP-CLI Integration:** We will use WP-CLI to programmatically scaffold the WordPress site, pages, and sections based on the existing React directory structure.
- **Elementor Compatibility:** All migrated sections (Hero, Intro, Heal, Corporate Wellness, Testimonials, Stories, Shop Preview, etc.) must be implemented as Elementor templates or pages to ensure full editability for the client.
- **Sync Workflow:** Establish a workflow to "fetch" design changes from the React source and "push" updates to the WordPress environment using custom scripts.

## Core Sections to Migrate
- Hero Section
- Intro & Heal Modules
- Corporate Wellness
- Stories & Testimonials
- Shop Preview
- Newsletter & Footer
- About Us (Full Page)
- Corporate Wellness (Detailed Page with Inquiry Form)
- Reservations (High-Fidelity UI with Calendly Integration Plan)
