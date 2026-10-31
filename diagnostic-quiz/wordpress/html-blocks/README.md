# Paste-ready Elementor HTML Blocks

Paste each numbered `.html` file into its own Elementor **HTML** widget, in order. Header and footer elements have been removed so the quiz sections integrate cleanly with your theme or custom Elementor layout.

For the complete product, MailerLite, payment, and QA sequence, follow [`../DEPLOYMENT_GUIDE.md`](../DEPLOYMENT_GUIDE.md).

### Landing Page Blocks (In Order):
1. `01-hero.html` — Hero Section (Atmospheric Image Background, Micro-pills, Primary & Secondary CTAs)
2. `02-promise.html` — Promise Section ("Not a score. A starting point." — 3 feature cards)
3. `03-quiz.html` — Diagnostic Quiz Section (`[stillness_quiz]` shortcode placeholder)
4. `04-faq.html` — Frequently Asked Questions (Interactive Accordion Section)
5. `05-reflection.html` — Facilitator Reflection Card (Komal practice lead quote)

### Result Page Block:
6. `06-result.html` — Create a separate WordPress page with slug `your-prescription`, and paste this block into an HTML widget (`[stillness_quiz_result]`).

---

### Backend Requirements
These blocks handle presentation and layout. The interactive logic and scoring require these PHP Code Snippets:
1. `content/quiz-content.php` — PHP / run everywhere.
2. `snippets/diagnostic-quiz.php` — PHP / run everywhere.
3. `snippets/quiz-assets-php-only.php` — PHP / run everywhere; prints global scoped CSS and JavaScript assets.

Import `../product-prescription.csv` before testing the unlock CTA to populate the four WooCommerce variations resolved dynamically by the PHP snippet.
