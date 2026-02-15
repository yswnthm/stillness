# Stillness WordPress Management Manual

This guide provides instructions for managing the migrated "Stillness" landing page sections within the WordPress Elementor environment.

## 1. Importing Section Templates

All sections have been exported as Elementor JSON templates located in the `wordpress/templates/` directory.

### Steps to Import:
1. Log in to your WordPress Admin.
2. Navigate to **Templates > Saved Templates**.
3. Click the **Import Templates** button at the top.
4. Choose the `.json` files from `wordpress/templates/` one by one:
   - `template-hero.json`
   - `template-intro.json`
   - `template-heal.json`
   - `template-stories.json`
   - `template-newsletter.json`
   - `template-testimonials.json`
   - `template-footer.json`
5. Click **Import Now**.

## 2. Assembling the Page

1. Open your target page (e.g., `duplicate1-page`) in the **Elementor Editor**.
2. Click the **Folder Icon** (Add Template) in the editing area.
3. Go to the **My Templates** tab.
4. Find your imported templates and click **Insert** for each, following the original page order.

## 3. Editing Content

The migrated sections use a combination of standard Elementor widgets and **HTML Widgets** for complex layouts and animations.

### Editing Standard Widgets (Headings, Text):
- Click on the element in the Elementor preview.
- Update the text in the left-hand sidebar.

### Editing HTML Widgets (Hero, Heal, Stories):
Complex sections use an HTML widget to ensure design parity and animations.
1. Click on the HTML widget in the Elementor navigator or preview.
2. In the **HTML Code** box on the left, you can modify:
   - **Text:** Look for tags like `<h1>`, `<h3>`, or `<p>` and change the text within them.
   - **Images:** Look for `src='...'` and replace the URL with your uploaded image link from the WordPress Media Library.
   - **Links:** Look for `href='#'` and replace with your target URL.

## 4. Section Specifics

### Hero Section
- **Animations:** The fade-in and bounce effects are handled via CSS within the HTML widget.
- **Background Image:** To change the background, find the `<img src='...'>` tag inside the `stillness-hero-bg` div.

### Heal Section
- **Grid Layout:** The 4-column layout is forced via CSS grid. On mobile, it automatically collapses to 1 column.
- **Icons:** Icons are provided as SVG code for maximum sharpness.

### Stories Section
- **Article Data:** To add or remove articles, you can duplicate the `<div class='article-card'>` blocks within the HTML widget.

## 5. Global Styles

Ensure your Elementor Global Colors and Fonts are set to:
- **Stone:** `#0E1B30`
- **Cream:** `#F7F0EC`
- **Breeze:** `#D9E8EB`
- **Heading Font:** Cormorant Garamond
- **Body Font:** Lato

For any technical issues, refer to the `conductor/` track documentation.
