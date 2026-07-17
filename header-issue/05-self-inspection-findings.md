# Header Issue Context - Self Inspection Findings

## Scope

This file records additional context gathered directly during inspection on 2026-06-15.

This is still evidence capture. It is not a fix plan.

## Live Homepage State

Inspected from the logged-in public homepage in Chrome.

Observed live header:

- Logo text: `Stillness.`
- Menu items:
  - `CORPORATE`
  - `SACRED OFFERINGS`
  - `SHOP`
  - `BLOG`
  - `ABOUT`
  - `BOOK`

Observed live footer:

- Footer is present on the homepage.
- Footer logo text: `Stillness.`
- Footer links and text are visible in the live page tree.

## UAE Template 5093 - Confirmed Configuration

Inspected from:

- `wp-admin/edit.php?post_type=elementor-hf`
- `wp-admin/post.php?post=5093&action=edit`
- `wp-admin/post.php?post=5093&action=elementor`

Confirmed facts:

- `5093` belongs to the UAE / Elementor Header & Footer Builder plugin.
- In the regular edit screen, `Elementor Header & Footer Builder Options` shows:
  - `Type of Template: Header`
  - `Display On: Entire Website`
- Custom field confirms:
  - `ehf_template_type = type_header`

## UAE Template 5093 - Current Elementor Preview

Direct Elementor preview for `5093` shows:

- Logo text: `Stillnesssx.`
- Menu items:
  - `PHILOSOPHY`
  - `SACRED OFFERINGS`
  - `SHOP`
  - `JOURNAL`
  - `ABOUT`
  - `BOOK`

Important comparison against live homepage:

- The `5093` preview menu does **not** match the live homepage menu.
- The `5093` preview logo text does **not** match the live homepage logo text.

## Theme Builder Template 5084 - Current Safe Mode Preview

Inspected from:

- `wp-admin/post.php?post=5084&action=elementor&elementor-mode=safe`

Current safe mode preview for `5084` shows:

- Logo text: `Stillnessss.`
- Menu items:
  - `CORPORATE`
  - `SACRED OFFERINGS`
  - `SHOP`
  - `BLOG`
  - `ABOUT`
  - `BOOK`

Important comparison against live homepage:

- The `5084` preview menu **does** match the live homepage menu structure.
- The `5084` preview logo text does **not** match the live homepage logo text.

## Saved State Observed In Editors

Both Elementor editing screens observed during inspection showed:

- `Publish` button disabled

Observed in:

- `5093` Elementor editor
- `5084` Elementor editor in Safe Mode

This means the currently displayed editor state appears already saved, with no unsaved changes pending in those editor sessions.

## Strong Context Added By Inspection

Based on direct inspection only:

- `5093` is a real UAE header template set to `Entire Website`.
- `5093` currently contains a different header variant from the live homepage.
- `5084` currently contains a header variant whose menu matches the live homepage.
- The live homepage is still rendering `Stillness.`, not `Stillnesssx.` and not `Stillnessss.`
- The live homepage footer is still present.

## URLs Inspected

- `https://stillnesscuratedretreats.com/`
- `https://stillnesscuratedretreats.com/wp-admin/edit.php?post_type=elementor-hf`
- `https://stillnesscuratedretreats.com/wp-admin/post.php?post=5093&action=edit`
- `https://stillnesscuratedretreats.com/wp-admin/post.php?post=5093&action=elementor`
- `https://stillnesscuratedretreats.com/wp-admin/post.php?post=5084&action=elementor&elementor-mode=safe`
