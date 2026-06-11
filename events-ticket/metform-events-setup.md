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
