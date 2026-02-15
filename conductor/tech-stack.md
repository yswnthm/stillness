# Tech Stack - Stillness Migration

## Source Environment (React)
- **Framework:** React 19 (TypeScript)
- **Build Tool:** Vite
- **Styling & Animation:** Framer Motion, Lucide React
- **Purpose:** Serves as the primary design and functional reference for the migration.

## Target Environment (WordPress)
- **Platform:** WordPress (Latest Stable)
- **Page Builder:** Elementor (Pro recommended for custom widgets/templates)
- **Control Interface:** WP-CLI (used for programmatic page/template scaffolding)
- **Migration Workspace:** `wordpress/` directory in the project root for storing migration assets and scripts.

## Migration Tools & Utilities
- **Automation Scripts:** Custom scripts to "fetch" data/styles from the React source and "push" configurations via WP-CLI.
- **Custom Code:** HTML/CSS/JS snippets for replicating high-fidelity React components within Elementor widgets.
