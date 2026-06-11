# Stillness MetForm Template Section Guide

> Purpose: reusable context for creating Elementor template sections that contain MetForm forms on the Stillness WordPress site.
> Last updated: 09 June 2026

## What This Guide Covers

Use this guide whenever a Stillness Elementor section needs a working form inside a custom HTML template.

Typical examples:

- Newsletter signup section.
- Waitlist section.
- Event interest form.
- Corporate inquiry form.
- Story submission form.
- A reusable form section used on more than one page.

The core pattern is:

1. Create the form in WordPress using MetForm.
2. Copy the exact working MetForm shortcode.
3. Place the shortcode inside a scoped wrapper in the Elementor HTML template.
4. Style MetForm's generated markup from the wrapper.
5. Import the same finished template section wherever needed.
6. Test the form on the live page, not only inside Elementor preview.

## Important Rule: Use `form_id`, Not Slug

On this site, MetForm slug shortcodes have not been reliable.

Do not depend on this:

```text
[metform slug="events"]
```

Use the exact generated shortcode copied from WordPress:

```text
[metform form_id="6697"]
```

The number changes per form. Always copy it from MetForm after creating the form.

## Current Event Form Example

The unified Events waitlist form uses:

```text
[metform form_id="6697"]
```

It is used in both places:

- Individual event waitlist section.
- Events catalog waitlist section.

Current import-ready files:

```text
wordpress/single-event-templates-v1/template-single-event-05-waitlist.json
wordpress/events-templates-v1/template-events-06-catalog-waitlist.json
```

Source helper used to sync those sections:

```text
events-ticket/update_waitlist_forms.mjs
```

## WordPress Form Creation Checklist

Create the MetForm first.

1. Open WordPress Admin.
2. Go to `MetForm`.
3. Create a new form.
4. Name it according to the use case.
5. Add the required fields.
6. Add a Submit Button widget.
7. Set field placeholders.
8. Enable required validation where needed.
9. Enable entry storage.
10. Configure admin email notification if needed.
11. Copy the generated shortcode.
12. Paste that exact shortcode into the template section.

Do not skip the Submit Button widget. If the form has only an input field, the front end can show validation errors without any visible way to submit.

## Minimal Email Form Setup

Use this for newsletter, waitlist, and simple signup forms.

Email field:

```text
Label: Email
Name / key: email
Type: Email
Required: Yes
Placeholder: Your best email address
```

Submit button:

```text
Text: Notify Me
Type: Submit
```

Optional hidden source field:

```text
Label: Source
Name / key: source
Default value: Events Waitlist
```

Use a hidden source field when the same form receives entries from multiple pages and the client needs clearer exports.

## Template Section Structure

Use a custom HTML section in Elementor.

Basic structure:

```html
<section class="stillness-form-section" id="notify">
  <div class="stillness-form-section__inner">
    <div class="stillness-form-section__copy">
      <span class="stillness-form-section__label">Event Waitlist</span>
      <h2>Stay close to the <em>next gathering.</em></h2>
      <p>Receive early notice when new dates open.</p>
    </div>

    <div class="stillness-form-section__form-card">
      <span class="stillness-form-section__form-title">Join the list</span>
      <div class="metform-events-wrap">
        [metform form_id="6697"]
      </div>
      <span class="stillness-form-section__note">We respect your inbox. Unsubscribe anytime.</span>
    </div>
  </div>
</section>
```

Key points:

- The MetForm shortcode must sit inside a named wrapper.
- The wrapper is the CSS scope for all MetForm overrides.
- Use a page-specific wrapper name, such as `metform-events-wrap`.
- Keep the visible content outside the MetForm shortcode.
- Do not rely on MetForm's own labels or heading text for the visual design.

## Styling Strategy

Elementor and MetForm output extra markup. Style the generated markup by targeting common MetForm classes inside the wrapper.

Example:

```css
.metform-events-wrap form,
.metform-events-wrap .mf-form {
  display: flex !important;
  flex-direction: column !important;
  gap: 0.9rem !important;
  width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
}

.metform-events-wrap label,
.metform-events-wrap h2,
.metform-events-wrap h3,
.metform-events-wrap .mf-section-title,
.metform-events-wrap .mf-input-label {
  display: none !important;
}

.metform-events-wrap input[type='email'],
.metform-events-wrap .mf-input {
  width: 100% !important;
  min-height: 50px !important;
  background: rgba(255, 255, 255, 0.06) !important;
  border: 0.5px solid rgba(104, 143, 157, 0.35) !important;
  color: #F7F0EC !important;
  font-family: 'Jost', sans-serif !important;
  font-size: 0.85rem !important;
  padding: 1rem 1.25rem !important;
  border-radius: 2px !important;
  box-shadow: none !important;
}
```

Use `!important` inside Elementor HTML templates. Elementor global styles and plugin styles often override custom section CSS.

## Submit Button Styling

MetForm can output different button classes depending on the widget/version.

Cover all known variants:

```css
.metform-events-wrap button[type='submit'],
.metform-events-wrap input[type='submit'],
.metform-events-wrap .metform-btn,
.metform-events-wrap .metform-btn-submit,
.metform-events-wrap .mf-btn,
.metform-events-wrap .mf-btn-wraper button,
.metform-events-wrap .mf-btn-wrapper button,
.metform-events-wrap .mf-button-wrapper button {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 100% !important;
  min-height: 50px !important;
  background: #688F9D !important;
  border: 0.5px solid #688F9D !important;
  color: #0E1B30 !important;
  font-family: 'Jost', sans-serif !important;
  font-size: 0.68rem !important;
  font-weight: 500 !important;
  letter-spacing: 0.2em !important;
  text-transform: uppercase !important;
  padding: 1rem 1.6rem !important;
  border-radius: 2px !important;
  cursor: pointer !important;
  opacity: 1 !important;
  visibility: visible !important;
  box-shadow: none !important;
}
```

MetForm has used both `mf-btn-wraper` and `mf-btn-wrapper`, so include both spellings.

## Defensive Submit Fallback

Use this only when a form may render without a visible submit button.

It does not replace proper MetForm setup. The correct fix is still to add a Submit Button widget inside MetForm.

```html
<script>
(function() {
  function stillnessEnsureSubmit(wrapperSelector) {
    document.querySelectorAll(wrapperSelector + ' form').forEach(function(form) {
      var submit = form.querySelector('button[type="submit"], input[type="submit"], .metform-btn, .metform-btn-submit, .mf-btn');
      if (submit) {
        submit.style.setProperty('display', 'flex', 'important');
        submit.style.setProperty('opacity', '1', 'important');
        submit.style.setProperty('visibility', 'visible', 'important');
        return;
      }

      var fallback = document.createElement('button');
      fallback.type = 'submit';
      fallback.className = 'stillness-submit-fallback';
      fallback.textContent = 'Notify Me';
      form.appendChild(fallback);
    });
  }

  function run() {
    stillnessEnsureSubmit('.metform-events-wrap');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
  setTimeout(run, 800);
  setTimeout(run, 1800);
})();
</script>
```

## Animation Warning

Do not hide form sections with this pattern unless there is a guaranteed fallback:

```css
opacity: 0;
animation: fadeIn 0.8s forwards;
```

This caused a live preview issue where the entire section looked like a blank dark block because the animation did not run.

Safer approach:

- Content should be visible by default.
- Use transitions for enhancement only.
- If using intersection observers, make the default state visible.

## Reusing One Form Section In Multiple Places

If one form is shared between pages, keep one canonical section.

Example from Events:

- The individual event waitlist section is the source.
- The catalog page reuses the same section.
- Both point to the same MetForm shortcode.
- Both submit entries to the same MetForm entry list.

This avoids maintaining two forms that drift in fields, email routing, or styling.

## Elementor JSON Workflow

For Stillness template sections:

1. Build the HTML section locally.
2. Embed CSS inside the HTML widget.
3. Use one wrapper class per section.
4. Put the MetForm shortcode inside a scoped wrapper.
5. Save as Elementor JSON template.
6. Copy import-ready JSON to the `wordpress/...` template folder.
7. Import or replace the section in Elementor.
8. Clear Elementor and PA asset caches.
9. Test on the live preview.

When a section is used in multiple folders, use a small update script to keep copies synced. Do not manually edit escaped JSON strings unless the change is tiny.

## Form Testing Checklist

After importing a section:

- Confirm the form renders on desktop.
- Confirm the form renders on mobile.
- Confirm the input is visible.
- Confirm the submit button is visible.
- Submit a blank form and check the validation message.
- Submit a valid email.
- Confirm the success message appears.
- Confirm the entry appears in MetForm entries.
- Confirm admin email arrives if enabled.
- Confirm the page does not show raw shortcode text.
- Confirm no unrelated shop/product forms were affected.

## Common Failures

Blank dark section:

- Usually caused by `opacity: 0` animation not firing.
- Remove hidden default state.
- Make content visible by default.

No submit button:

- The MetForm may not include a Submit Button widget.
- Add the Submit Button widget in WordPress.
- Also style all known submit button class variants.

Validation message appears but no button:

- The input exists and validation is active.
- The form likely has no submit button widget or the button is hidden by CSS.

Shortcode prints as text:

- MetForm plugin may not be active.
- Shortcode may be pasted into the wrong widget.
- Use an Elementor HTML/shortcode-friendly widget context.

Slug shortcode fails:

- Use the generated `form_id` shortcode instead.

Button spacing breaks:

- MetForm wrapper classes may differ.
- Target both `mf-btn-wraper` and `mf-btn-wrapper`.

Input does not fill width:

- Force `.mf-input-wrapper` and nearby generated divs to `width: 100%`.

## Naming Conventions

Use scoped wrapper names:

```text
metform-events-wrap
metform-newsletter-wrap
metform-story-wrap
stillness-minimal-form
```

Use section names that explain the surface:

```text
stillness-event-waitlist
ms-join-section
notify-section
```

Avoid generic classes like `.form`, `.button`, or `.input` in Elementor templates because they can affect unrelated sections.

## Current Stillness References

Existing form patterns in this repo:

```text
wordpress/home-templates-v1/template-newsletter-v1.json
wordpress/corporate-templates-v1/template-corporate-inquiry-v1.json
wordpress/floating-landing-templates-v1/template-landing-09-notify-v1.json
ms-join-section.html
events-ticket/update_waitlist_forms.mjs
```

Use these as reference before creating a new form template section.
