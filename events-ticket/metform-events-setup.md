# Stillness Events MetForm Setup

> Purpose: One shared waitlist form for both the Events catalog page and individual event pages.

## Shortcode Expected By Templates

MetForm slug shortcodes are not reliable on this site. Use the exact generated shortcode from MetForm.

The event templates use this shortcode:

```text
[metform form_id="6697"]
```

This is the unified event waitlist form used on both the catalog page and the individual event page.

## Create The Form

1. Open WordPress Admin.
2. Go to `MetForm`.
3. Create a new form named `Events`.
4. Copy the generated MetForm shortcode.
5. Add one email field.
6. Set the field as required.
7. Use this placeholder:

```text
Your best email address
```

8. Set the submit button text:

```text
Notify Me
```

## Recommended Field Setup

Email field:

```text
Label: Email
Name / key: email
Type: Email
Required: Yes
Placeholder: Your best email address
```

Optional hidden field:

```text
Label: Source
Name / key: source
Default value: Events Waitlist
```

Use the hidden field only if you want the exported entries to clearly show where the signup came from.

## Submission Settings

- Enable entry storage inside MetForm.
- Enable admin email notification if the client wants inbox alerts.
- Send notification to the correct Stillness admin email.
- Suggested admin email subject:

```text
New Events Waitlist Signup
```

- Suggested success message:

```text
Thank you. We will let you know when new dates open.
```

## Where This Form Is Used

- Individual event waitlist section.
- Events catalog waitlist section, using the same form section.
- Sold-out event links scroll to the same `#notify` section.

## Test Checklist

- Submit with a valid email from the Events catalog page.
- Submit with a valid email from an individual event page.
- Confirm the entry appears inside MetForm entries.
- Confirm the admin email notification arrives, if enabled.
- Confirm the form looks correct on mobile.
- Confirm the submit button says `Notify Me`.

---

# Stillness Hawaii Retreat Application MetForm Setup

> Purpose: Cohort selection/application form for the Hawaii Retreat landing page.

## Shortcode Expected By Templates

The Hawaii Retreat Application section template uses this shortcode by default:

```text
[metform form_id="6698"]
```

If the generated form ID is different on the live WordPress site, update the ID in:
- `hawaii-templates/template-hawaii-09-application.json`
- `wordpress/hawaii-retreat-templates/` (or whichever folder the templates are exported to)

## Create The Form

1. Open WordPress Admin.
2. Go to `MetForm`.
3. Create a new form named `Hawaii Retreat Application`.
4. Copy the generated MetForm shortcode and update the ID in the templates.
5. Add the five fields listed in the field setup below.
6. Set the required fields accordingly.
7. Use the exact placeholders and names/keys to match the database mappings.

## Recommended Field Setup

### 1. Full name
- **Label**: Full name
- **Name / key**: name
- **Type**: Text
- **Required**: Yes
- **Placeholder**: First and last name

### 2. Email address
- **Label**: Email address
- **Name / key**: email
- **Type**: Email
- **Required**: Yes
- **Placeholder**: your@email.com

### 3. Phone number
- **Label**: Phone number
- **Name / key**: phone
- **Type**: Telephone
- **Required**: No
- **Placeholder**: (555) 123-4567

### 4. Professional title
- **Label**: Professional title
- **Name / key**: title
- **Type**: Text
- **Required**: No
- **Placeholder**: e.g., CEO, Founder

### 5. What are you hoping to reset?
- **Label**: What are you hoping to reset?
- **Name / key**: message
- **Type**: Textarea
- **Required**: No
- **Placeholder**: Tell us about your current stress levels and what you're seeking...

## Submission Settings

- Enable entry storage inside MetForm.
- Enable admin email notifications.
- Send notification to the correct Stillness admin email.
- Suggested admin email subject:
  ```text
  New Hawaii Retreat Application
  ```
- Suggested success message:
  ```text
  Application submitted. We will reach out to you within 48 hours to schedule your consultation.
  ```

## Test Checklist

- Submit the application form with all fields filled out.
- Submit the form with only required fields (Name and Email) filled out.
- Confirm the entry appears inside MetForm entries with all fields mapped correctly.
- Confirm the admin email notification is received.
- Confirm the fields look correct on mobile.

