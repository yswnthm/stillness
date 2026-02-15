# Implementation Plan - Recreate Landing Page in WordPress

## Phase 1: Preparation & Scaffolding [checkpoint: 9712bdf]
- [x] Task: Verify WordPress environment and `duplicate1-page` existence via WP-CLI. (Post ID: 4493)
- [x] Task: Setup `wordpress/` directory structure for assets and scripts.
- [x] Task: Define global Elementor styles (fonts/colors) based on React `constants.ts` and CSS.
- [x] Task: Conductor - User Manual Verification 'Preparation & Scaffolding' (Protocol in workflow.md)

## Phase 2: User-Requested Section Templates [checkpoint: 07ac6d8]
- [x] Task: Generate Newsletter CTA template (template-newsletter.json).
- [x] Task: Generate Testimonials template (template-testimonials.json).
- [x] Task: Generate Footer template (template-footer.json).
- [x] Task: User manually imported and verified templates in Elementor.
- [x] Task: Conductor - User Manual Verification 'High-Impact Sections' (Protocol in workflow.md)

## Phase 3: Remaining Sections [checkpoint: a603c22]
- [x] Task: Migrate Hero section (HTML/CSS and Elementor widgets). fba58da
- [x] Task: Migrate Intro & Heal sections. 42b25ee
- [x] Task: Recreate Stories section. a568ce6
- [x] Task: Recreate Corporate Wellness section. (Already Migrated by User)
- [x] Task: Recreate Shop Preview section. (Already Migrated by User)

## Phase 4: Finalization & Sync [checkpoint: 5d3b365]
- [x] Task: Recreate Newsletter & Footer. (Handled in Phase 2/3)
- [x] Task: Perform full responsive audit and adjustments in Elementor. (Heal layout fixed)
- [x] Task: Document editing instructions in `wordpress/user-manual.md`. 5d3b365
- [x] Task: Conductor - User Manual Verification 'Finalization & Sync' (Protocol in workflow.md)
