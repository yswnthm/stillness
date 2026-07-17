# Stillness Header Issue - Checked Potential Causes

> Compiled on: `2026-06-15`
> Method: Context files plus direct inspection in Chrome/WordPress admin
> Purpose: Mark each suspected cause as confirmed, partial, refuted, or still unverified

Note:
Computer Use had intermittent Chrome capture failures, but the remaining checks were resumed and completed through the active Chrome session. Items marked `Unverified` remain unproven, not disproven.

## Status Key

- `Confirmed`: directly supported by inspection
- `Partial`: part of the claim is supported, but not the full theory
- `Refuted`: current evidence points away from it
- `Unverified`: still needs more checking

## Issue 1 - Two separate header systems are both active site-wide

Status: `Confirmed`

What was verified:

- UAE / Elementor Header & Footer Builder template `5093` is set to:
  - `Type of Template: Header`
  - `Display On: Entire Website`
- Elementor Theme Builder template `5084` is active in the header list with:
  - `Instances: Entire Site`
- The logged-in public page source for `/corporate/` loads HFE/UAE assets and generated Elementor CSS for:
  - `elementor-post-5093.css`
  - `elementor-post-5115.css`
- The same source search also finds `5084`, but because the viewer is logged in this may include admin-bar/editor references, not necessarily public render markup.

Why this matters:

- Two different systems are both configured as site-wide header owners.

## Issue 2 - Live header text matches no known editable template

Status: `Confirmed`

What was verified:

- Live homepage header renders `Stillness.`
- Live `/corporate/` header also renders `Stillness.`
- UAE template `5093` preview renders `Stillnesssx.`
- Theme Builder template `5084` safe mode preview renders `Stillnessss.`

Why this matters:

- The live header is not matching either currently inspected editable template state.

## Issue 3 - Theme Builder header `5084` cannot be edited normally

Status: `Confirmed`

What was verified:

- Opening `5084` normally shows the Elementor content-area error.
- Opening `5084` in Safe Mode loads the editor.

Why this matters:

- The active Theme Builder header is in a broken editor state outside Safe Mode.

## Issue 4 - Safe Mode publishes may not reflect on live site

Status: `Unverified`

What is known:

- A Safe Mode edit was made earlier.
- The live site did not reflect the edited text.

What was not verified:

- I did not confirm whether Safe Mode failed to regenerate Elementor output.
- I did not run Elementor tools or clear caches.
- I did not make another test edit or publish anything during this inspection.

## Issue 5 - UAE template `5093` contains the wrong menu vs. live site

Status: `Confirmed`

What was verified:

- `5093` preview menu:
  - `PHILOSOPHY`
  - `SACRED OFFERINGS`
  - `SHOP`
  - `JOURNAL`
  - `ABOUT`
  - `BOOK`
- Live homepage and `/corporate/` menu:
  - `CORPORATE`
  - `SACRED OFFERINGS`
  - `SHOP`
  - `BLOG`
  - `ABOUT`
  - `BOOK`

Why this matters:

- `5093` is not the same header variant as the one currently visible on the homepage.

## Issue 6 - Astra native header may be the actual live header

Status: `Partial`

What was verified:

- Astra Customizer header preview shows `Stillness.` with the same live menu pattern.
- Astra Customizer is set around:
  - `Transparent Header`
  - `Off-Canvas Menu`
- Active theme is confirmed as `Astra`.
- The public page source loads Astra theme CSS: `wp-content/themes/astra/assets/css/minified/main.min.css?ver=4.13.0`

What was not verified:

- I did not directly prove that Astra is the final front-end header owner.
- I did not inspect the live DOM/classes deeply enough to attribute the rendered header to Astra with certainty.

## Issue 7 - Multiple header-related Elementor targets appear on the homepage

Status: `Partial`

What was verified:

- Prior screenshots show multiple Elementor targets in the homepage admin dropdown.
- This strongly suggests more than one header-related object is available from that page.

What was not verified:

- I did not resolve the full ID behind the truncated `Elementor Header #5...` entry during direct inspection.

## Issue 8 - Footer suppression exists for Astra, but equivalent header suppression is not shown

Status: `Partial`

What was verified:

- Astra Additional CSS explicitly hides Astra footer selectors.
- The live site still shows an Elementor-style footer.
- The public page source loads HFE/UAE footer-related generated CSS for `elementor-post-5115.css`.

What was not verified:

- I did not find an equivalent confirmed suppression rule for the Astra header.
- I did not prove this is the reason header ownership is split.

## Issue 9 - Theme Builder header `5084` is active but broken

Status: `Confirmed`

What was verified:

- `5084` is active for the site.
- `5084` throws the normal Elementor load error.
- `5084` only becomes inspectable in Safe Mode.

Why this matters:

- The active header path in Theme Builder is not healthy.

## Issue 10 - Other header templates exist and remain unresolved

Status: `Partial`

What was verified:

- Other Theme Builder headers exist:
  - `Stillness Header V2 (Overlay)` with `No instances`
  - `Elementor Header #5350` with `No instances`
- Their dates were already visible in earlier screenshots.

What was not verified:

- I did not open those templates directly during this inspection pass.
- Their current content is still unresolved.

## Issue 11 - UAE and Theme Builder may have hook-priority conflicts

Status: `Unverified`

What was verified:

- Both systems are active site-wide.
- Installed plugin evidence:
  - `Elementor` version `4.1.1`
  - `Elementor Pro` version `3.23.3`
  - `PRO Elements` version `3.29.0`
  - `Ultimate Addons for Elementor (UAE)` version `2.8.4`
  - `Jeg Kit for Elementor` version `3.1.2`
  - `Premium Addons for Elementor` version `4.11.74`
- WordPress admin shows an Elementor Pro compatibility alert listing:
  - `Jeg Kit for Elementor`
  - `Premium Addons for Elementor`
  - `The Events Calendar`
  - `Ultimate Addons for Elementor (UAE)`
- WordPress admin shows many updates available, including Elementor, UAE, Premium Addons, and PRO Elements.

What was not verified:

- I did not inspect plugin hook order or rendering priority.
- I did not inspect theme/plugin PHP on the server side.

## Issue 12 - Homepage `Elementor Full Width` layout may affect header path

Status: `Unverified`

What was verified:

- The homepage is set to `Elementor Full Width` in earlier provided evidence.
- `/corporate/` also renders the same visible header as the homepage, so the issue is not limited to the homepage's visible output.

What was not verified:

- I did not prove that this layout changes header ownership on the homepage specifically.
- I did not compare the internal render path against another page template.

## Issue 13 - No clear record of header publish timing

Status: `Partial`

What was verified:

- `5093` publish date is visible: `2026/03/04 at 10:31 am`
- Earlier screenshots show:
  - `5084` dated `May 13, 2026`
  - `Stillness Header V2 (Overlay)` dated `May 13, 2026`
  - `5350` dated `March 7, 2026`

What remains unclear:

- I did not build a full timeline of which header was intended to be current.

## Issue 14 - Safe Mode did not fully deactivate all plugins

Status: `Confirmed`

What was verified:

- The Safe Mode panel explicitly says it could not deactivate all plugins.
- Installed plugins page shows `Must-Use (4)`, which is consistent with Safe Mode being unable to deactivate every plugin layer.

What was not verified:

- I did not identify which plugin(s) remained active.

## Issue 15 - Disabled Publish button may indicate REST/API failure

Status: `Refuted as primary cause`

What was verified:

- `5093` editor preview already reflects the changed saved content `Stillnesssx.`
- `5084` safe mode preview already reflects the changed saved content `Stillnessss.`
- Both editors showed disabled `Publish` because there were no new unsaved changes in those sessions.

Why this matters:

- The disabled button does not currently behave like the main problem.
- Current evidence supports "saved, but not the live header owner" more strongly than "failed to save due to REST/API."

## Working Summary

The strongest validated causes right now are:

- `5093` and `5084` are both configured as site-wide headers in different systems.
- The public source for `/corporate/` includes HFE/UAE and generated CSS for `5093`/`5115`, so `5093` is loaded somewhere in the live page path.
- `5093` preview is definitely not the same header variant as the one visible on the homepage or `/corporate/`.
- `5084` matches the live menu structure better, but its saved logo text still does not match live.
- The live homepage and `/corporate/` are still rendering a third visible state: `Stillness.`
- Astra remains a plausible visible header source because it is the active theme and its Customizer preview matches the live header, but that is not fully proven yet.
- Elementor/plugin compatibility risk is now verified, especially around Elementor Pro, PRO Elements, UAE, Jeg Kit, and Premium Addons.

## Not Yet Verified

- Exact live DOM owner of the header markup
- Plugin hook/render priority between UAE and Elementor Theme Builder
- Whether Astra is the final front-end header owner
- Whether Safe Mode publishing/output regeneration is broken
- Whether any cache layer is serving stale header output
