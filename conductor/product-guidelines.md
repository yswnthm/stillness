# Product Guidelines - Stillness Migration

## Visual & Aesthetic Principles
- **Minimalist & Clean:** The design must prioritize ample white space, elegant typography, and a "light" atmosphere. This is the core identity of the "stillness" brand and must be preserved in the Elementor implementation.

## Design Execution
- **Component-Level Styling:** Styles should be applied precisely to each Elementor widget to mirror the unique design of individual React components. This ensures that granular details like custom shadows, borders, and spacing are accurately translated.
- **Interactive Elements:** For complex interactive elements (e.g., floating teasers, custom animations), use Elementor's HTML/Code widgets to inject custom CSS and JavaScript. This approach prioritizes design fidelity over the limitations of native widgets.
- **Template Compatibility:** When generating Elementor JSON templates, ensure all internal quotes in HTML/CSS strings are single quotes (`'`) to avoid invalidating the JSON structure.
- **Layout Reliability:** Use CSS Grid within HTML widgets for precise multi-column layouts (e.g., 4-column grids) when standard Elementor containers exhibit unexpected stacking behavior.

## Client Handover & Maintainability
- **Modular Templates:** Every migrated section (Hero, Testimonials, etc.) must be saved as an individual Elementor Template. This allows the client to easily reuse or reorganize sections across the site.
- **Semantic Naming:** All Elementor sections, columns, and widgets must be named clearly, following the naming convention of the original React components (e.g., `HeroSection`, `CorporateWellness_Container`).
- **Internal Documentation:** A detailed user manual must be maintained in the `wordpress/` directory, providing step-by-step instructions for editing complex or custom-coded sections within the Elementor editor.
