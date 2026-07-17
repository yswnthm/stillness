<?php
/**
 * Stillness Co. - WooCommerce Checkout Styling
 *
 * Add this as a PHP snippet in the Code Snippets plugin.
 * Scope: visual styling only for the WooCommerce checkout page.
 * Does not change fields, shipping behavior, newsletter behavior, payment logic,
 * cart behavior, or the order received page.
 */

add_action('wp_head', 'stillness_checkout_styling_snippet', 99);
add_action('woocommerce_before_checkout_form', 'stillness_checkout_back_button', 5);

function stillness_checkout_back_button() {
  echo '<a href="javascript:history.back()" class="stillness-back-button">&larr; Back</a>';
}

function stillness_checkout_styling_snippet()
{
  if (!function_exists('is_checkout') || !is_checkout()) {
    return;
  }

  ?>
  <style id="stillness-checkout-styling">
    body.woocommerce-checkout {
      background: linear-gradient(180deg, #FFFFFF 0%, #F7F0EC 48%, #D9E8EB 100%) !important;
      color: #0E1B30 !important;
    }

    body.woocommerce-checkout .site-main,
    body.woocommerce-checkout #primary,
    body.woocommerce-checkout .entry-content {
      background: transparent !important;
    }

    body.woocommerce-checkout .woocommerce {
      max-width: 1180px !important;
      margin: 0 auto !important;
      padding: 96px 28px 110px !important;
      font-family: 'Jost', Arial, sans-serif !important;
      color: #0E1B30 !important;
    }

    body.woocommerce-checkout .woocommerce::before,
    body.woocommerce-checkout .woocommerce::after,
    body.woocommerce-checkout form.checkout::before,
    body.woocommerce-checkout form.checkout::after {
      content: none !important;
      display: none !important;
    }

    body.woocommerce-checkout .woocommerce-form-coupon-toggle {
      margin: 0 0 24px !important;
    }

    body.woocommerce-checkout .woocommerce-info,
    body.woocommerce-checkout .woocommerce-message,
    body.woocommerce-checkout .woocommerce-error {
      border: 1px solid rgba(104, 143, 157, 0.28) !important;
      border-left: 3px solid #688F9D !important;
      border-radius: 4px !important;
      background: #FFFFFF !important;
      color: #1D3152 !important;
      font-family: 'Jost', Arial, sans-serif !important;
      font-size: 14px !important;
      line-height: 1.65 !important;
      padding: 16px 18px 16px 52px !important;
      box-shadow: 0 14px 36px rgba(14, 27, 48, 0.05) !important;
    }

    body.woocommerce-checkout .woocommerce-error {
      border-left-color: #1D3152 !important;
    }

    body.woocommerce-checkout .woocommerce-info::before,
    body.woocommerce-checkout .woocommerce-message::before,
    body.woocommerce-checkout .woocommerce-error::before {
      color: #688F9D !important;
      top: 17px !important;
      left: 20px !important;
    }

    body.woocommerce-checkout .woocommerce-error::before {
      color: #1D3152 !important;
    }

    body.woocommerce-checkout .woocommerce a {
      color: #688F9D !important;
      text-decoration: none !important;
    }

    body.woocommerce-checkout .woocommerce a:hover {
      color: #1D3152 !important;
    }

    body.woocommerce-checkout form.checkout {
      display: grid !important;
      grid-template-columns: minmax(0, 1fr) minmax(380px, 460px) !important;
      gap: 32px !important;
      align-items: start !important;
      margin: 0 !important;
    }

    body.woocommerce-checkout #customer_details {
      grid-column: 1 !important;
      grid-row: 1 / span 2 !important;
      display: block !important;
      width: 100% !important;
      margin: 0 !important;
      padding: 0 !important;
    }

    body.woocommerce-checkout #customer_details .col-1,
    body.woocommerce-checkout #customer_details .col-2 {
      float: none !important;
      width: 100% !important;
      max-width: none !important;
      margin: 0 !important;
      padding: 0 !important;
    }

    body.woocommerce-checkout #customer_details .col-2 {
      margin-top: 24px !important;
    }

    body.woocommerce-checkout .woocommerce-billing-fields,
    body.woocommerce-checkout .woocommerce-shipping-fields,
    body.woocommerce-checkout .woocommerce-additional-fields,
    body.woocommerce-checkout #order_review,
    body.woocommerce-checkout form.checkout_coupon {
      background: #FFFFFF !important;
      border: 1px solid rgba(196, 187, 180, 0.45) !important;
      border-radius: 4px !important;
      box-shadow: 0 18px 48px rgba(14, 27, 48, 0.07) !important;
    }

    body.woocommerce-checkout .woocommerce-billing-fields,
    body.woocommerce-checkout .woocommerce-shipping-fields,
    body.woocommerce-checkout .woocommerce-additional-fields {
      padding: 30px !important;
    }

    body.woocommerce-checkout form.checkout_coupon {
      margin: 0 0 28px !important;
      padding: 22px !important;
    }

    body.woocommerce-checkout .woocommerce-billing-fields h3,
    body.woocommerce-checkout .woocommerce-shipping-fields h3,
    body.woocommerce-checkout .woocommerce-additional-fields h3,
    body.woocommerce-checkout #order_review_heading {
      font-family: 'Cormorant Garamond', Georgia, serif !important;
      font-size: clamp(28px, 3vw, 40px) !important;
      font-weight: 300 !important;
      line-height: 1.08 !important;
      color: #0E1B30 !important;
      margin: 0 0 24px !important;
      letter-spacing: 0 !important;
    }

    body.woocommerce-checkout #order_review_heading {
      grid-column: 2 !important;
      grid-row: 1 !important;
      align-self: start !important;
      display: none !important;
    }

    body.woocommerce-checkout #order_review {
      grid-column: 2 !important;
      grid-row: 1 !important;
      padding: 26px !important;
      margin: 0 !important;
      float: none !important;
      clear: none !important;
      width: 100% !important;
      max-width: none !important;
      min-width: 0 !important;
      box-sizing: border-box !important;
      position: sticky !important;
      top: 94px !important;
      background: #0E1B30 !important;
      border-color: rgba(104, 143, 157, 0.35) !important;
      border-radius: 4px !important;
      box-shadow: 0 18px 48px rgba(14, 27, 48, 0.11) !important;
    }

    body.woocommerce-checkout #order_review::before {
      content: "Your order" !important;
      display: block !important;
      font-family: 'Cormorant Garamond', Georgia, serif !important;
      font-size: clamp(30px, 3vw, 42px) !important;
      font-weight: 300 !important;
      line-height: 1.08 !important;
      color: #F7F0EC !important;
      margin: 0 0 22px !important;
      padding: 0 0 20px !important;
      border-bottom: 1px solid rgba(217, 232, 235, 0.16) !important;
      letter-spacing: 0 !important;
    }

    body.woocommerce-checkout .form-row {
      margin: 0 0 18px !important;
      padding: 0 !important;
    }

    body.woocommerce-checkout .form-row-first,
    body.woocommerce-checkout .form-row-last {
      width: calc(50% - 8px) !important;
      overflow: visible !important;
    }

    body.woocommerce-checkout .form-row-first {
      margin-right: 16px !important;
    }

    body.woocommerce-checkout label {
      font-family: 'Jost', Arial, sans-serif !important;
      font-size: 11px !important;
      font-weight: 500 !important;
      line-height: 1.35 !important;
      letter-spacing: 0.13em !important;
      text-transform: uppercase !important;
      color: rgba(14, 27, 48, 0.72) !important;
      margin: 0 0 7px !important;
    }

    body.woocommerce-checkout abbr.required,
    body.woocommerce-checkout .required {
      color: #688F9D !important;
      text-decoration: none !important;
    }

    body.woocommerce-checkout .optional {
      color: rgba(14, 27, 48, 0.42) !important;
      font-weight: 400 !important;
      letter-spacing: 0.08em !important;
    }

    body.woocommerce-checkout input[type="text"],
    body.woocommerce-checkout input[type="email"],
    body.woocommerce-checkout input[type="tel"],
    body.woocommerce-checkout input[type="number"],
    body.woocommerce-checkout input[type="password"],
    body.woocommerce-checkout textarea,
    body.woocommerce-checkout select,
    body.woocommerce-checkout .select2-container--default .select2-selection--single {
      width: 100% !important;
      min-height: 48px !important;
      border: 1px solid rgba(14, 27, 48, 0.14) !important;
      border-radius: 3px !important;
      background: #FFFFFF !important;
      color: #0E1B30 !important;
      font-family: 'Jost', Arial, sans-serif !important;
      font-size: 15px !important;
      font-weight: 300 !important;
      line-height: 1.45 !important;
      padding: 13px 14px !important;
      box-shadow: none !important;
      outline: none !important;
      transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease !important;
    }

    body.woocommerce-checkout textarea {
      min-height: 112px !important;
      resize: vertical !important;
    }

    body.woocommerce-checkout input::placeholder,
    body.woocommerce-checkout textarea::placeholder {
      color: rgba(14, 27, 48, 0.36) !important;
      opacity: 1 !important;
    }

    body.woocommerce-checkout input:focus,
    body.woocommerce-checkout textarea:focus,
    body.woocommerce-checkout select:focus,
    body.woocommerce-checkout .select2-container--open .select2-selection--single {
      border-color: #688F9D !important;
      background: #FFFFFF !important;
      box-shadow: 0 0 0 3px rgba(104, 143, 157, 0.13) !important;
    }

    body.woocommerce-checkout .woocommerce-invalid input,
    body.woocommerce-checkout .woocommerce-invalid textarea,
    body.woocommerce-checkout .woocommerce-invalid select,
    body.woocommerce-checkout .woocommerce-invalid .select2-selection {
      border-color: #1D3152 !important;
      box-shadow: 0 0 0 3px rgba(29, 49, 82, 0.12) !important;
    }

    body.woocommerce-checkout .select2-container {
      width: 100% !important;
    }

    body.woocommerce-checkout .select2-container--default .select2-selection--single {
      height: 48px !important;
      padding: 0 !important;
    }

    body.woocommerce-checkout .select2-container--default .select2-selection--single .select2-selection__rendered {
      color: #0E1B30 !important;
      line-height: 48px !important;
      padding-left: 14px !important;
      padding-right: 34px !important;
      font-family: 'Jost', Arial, sans-serif !important;
      font-size: 15px !important;
      font-weight: 300 !important;
    }

    body.woocommerce-checkout .select2-container--default .select2-selection--single .select2-selection__arrow {
      height: 48px !important;
      right: 10px !important;
    }

    body.woocommerce-checkout .select2-dropdown {
      border-color: rgba(14, 27, 48, 0.18) !important;
      border-radius: 3px !important;
      font-family: 'Jost', Arial, sans-serif !important;
      color: #0E1B30 !important;
    }

    body.woocommerce-checkout .select2-results__option--highlighted[aria-selected],
    body.woocommerce-checkout .select2-results__option--highlighted[data-selected] {
      background: #688F9D !important;
      color: #FFFFFF !important;
    }

    body.woocommerce-checkout #ship-to-different-address {
      margin: 0 0 20px !important;
      padding: 0 !important;
    }

    body.woocommerce-checkout #ship-to-different-address label,
    body.woocommerce-checkout .woocommerce-form__label-for-checkbox {
      display: flex !important;
      align-items: center !important;
      gap: 10px !important;
      font-size: 12px !important;
      letter-spacing: 0.08em !important;
      color: #0E1B30 !important;
      cursor: pointer !important;
    }

    body.woocommerce-checkout input[type="checkbox"],
    body.woocommerce-checkout input[type="radio"] {
      accent-color: #688F9D !important;
      width: 16px !important;
      height: 16px !important;
      margin: 0 !important;
      flex: 0 0 auto !important;
    }

    body.woocommerce-checkout #order_review table.shop_table {
      border: none !important;
      margin: 0 0 22px !important;
      border-collapse: collapse !important;
      width: 100% !important;
      table-layout: auto !important;
      font-family: 'Jost', Arial, sans-serif !important;
    }

    body.woocommerce-checkout #order_review table.shop_table th,
    body.woocommerce-checkout #order_review table.shop_table td {
      border: none !important;
      border-bottom: 1px solid rgba(217, 232, 235, 0.16) !important;
      padding: 16px 0 !important;
      color: #F7F0EC !important;
      font-size: 14px !important;
      line-height: 1.5 !important;
      vertical-align: top !important;
    }

    body.woocommerce-checkout #order_review table.shop_table th {
      font-size: 10px !important;
      font-weight: 500 !important;
      letter-spacing: 0.16em !important;
      text-transform: uppercase !important;
      color: #A4B2BA !important;
    }

    body.woocommerce-checkout #order_review table.shop_table .product-name {
      color: #FFFFFF !important;
      font-weight: 400 !important;
      width: 68% !important;
      overflow-wrap: anywhere !important;
      word-break: normal !important;
    }

    body.woocommerce-checkout #order_review table.shop_table .product-total,
    body.woocommerce-checkout #order_review table.shop_table td:last-child,
    body.woocommerce-checkout #order_review table.shop_table th:last-child {
      width: 32% !important;
      text-align: right !important;
      white-space: nowrap !important;
    }

    body.woocommerce-checkout #order_review table.shop_table .order-total th,
    body.woocommerce-checkout #order_review table.shop_table .order-total td {
      border-bottom: none !important;
      padding-top: 19px !important;
      color: #F7F0EC !important;
      font-size: 17px !important;
    }

    body.woocommerce-checkout #order_review table.shop_table .order-total strong,
    body.woocommerce-checkout #order_review table.shop_table .order-total .amount {
      font-family: 'Cormorant Garamond', Georgia, serif !important;
      font-size: 28px !important;
      font-weight: 400 !important;
      color: #FFFFFF !important;
    }

    body.woocommerce-checkout #payment {
      background: #FFFFFF !important;
      border: 1px solid rgba(196, 187, 180, 0.45) !important;
      border-radius: 4px !important;
      padding: 18px !important;
      margin: 0 !important;
    }

    body.woocommerce-checkout #payment ul.payment_methods {
      border: none !important;
      padding: 0 0 16px !important;
      margin: 0 0 16px !important;
      border-bottom: 1px solid rgba(196, 187, 180, 0.45) !important;
    }

    body.woocommerce-checkout #payment ul.payment_methods li {
      margin: 0 !important;
      color: #0E1B30 !important;
      font-family: 'Jost', Arial, sans-serif !important;
      font-size: 14px !important;
      line-height: 1.55 !important;
    }

    body.woocommerce-checkout #payment div.payment_box {
      background: #FFFFFF !important;
      border: 1px solid rgba(14, 27, 48, 0.08) !important;
      border-radius: 3px !important;
      color: #1D3152 !important;
      margin: 14px 0 0 !important;
      padding: 16px !important;
    }

    body.woocommerce-checkout #payment div.payment_box::before {
      border-bottom-color: #FFFFFF !important;
    }

    body.woocommerce-checkout .woocommerce-privacy-policy-text {
      color: #A4B2BA !important;
      font-family: 'Jost', Arial, sans-serif !important;
      font-size: 12px !important;
      line-height: 1.75 !important;
      margin: 18px 0 !important;
    }

    body.woocommerce-checkout button.button,
    body.woocommerce-checkout a.button,
    body.woocommerce-checkout input.button,
    body.woocommerce-checkout #place_order {
      border: none !important;
      border-radius: 3px !important;
      background: #688F9D !important;
      color: #F7F0EC !important;
      font-family: 'Jost', Arial, sans-serif !important;
      font-size: 11px !important;
      font-weight: 500 !important;
      letter-spacing: 0.18em !important;
      line-height: 1 !important;
      text-transform: uppercase !important;
      padding: 16px 22px !important;
      min-height: 48px !important;
      text-align: center !important;
      box-shadow: none !important;
      transition: background 0.2s ease, transform 0.2s ease, opacity 0.2s ease !important;
    }

    body.woocommerce-checkout button.button:hover,
    body.woocommerce-checkout a.button:hover,
    body.woocommerce-checkout input.button:hover,
    body.woocommerce-checkout #place_order:hover {
      background: #D9E8EB !important;
      color: #0E1B30 !important;
      transform: translateY(-1px) !important;
    }

    body.woocommerce-checkout button.button:disabled,
    body.woocommerce-checkout button.button:disabled[disabled],
    body.woocommerce-checkout #place_order:disabled {
      opacity: 0.55 !important;
      cursor: not-allowed !important;
      transform: none !important;
    }

    body.woocommerce-checkout #place_order {
      width: 100% !important;
      margin-top: 6px !important;
    }

    body.woocommerce-checkout .checkout_coupon .form-row {
      margin-bottom: 0 !important;
    }

    body.woocommerce-checkout .checkout_coupon .form-row-first {
      width: calc(100% - 170px) !important;
      margin-right: 14px !important;
    }

    body.woocommerce-checkout .checkout_coupon .form-row-last {
      width: 156px !important;
    }

    body.woocommerce-checkout .checkout_coupon button.button {
      width: 100% !important;
      padding-left: 14px !important;
      padding-right: 14px !important;
    }

    body.woocommerce-checkout .blockUI.blockOverlay {
      background: rgba(247, 240, 236, 0.7) !important;
      border-radius: 4px !important;
    }

    @media (max-width: 1024px) {
      body.woocommerce-checkout .woocommerce {
        padding: 82px 24px 88px !important;
      }

      body.woocommerce-checkout form.checkout {
        grid-template-columns: 1fr !important;
        gap: 24px !important;
      }

      body.woocommerce-checkout #customer_details,
      body.woocommerce-checkout #order_review_heading,
      body.woocommerce-checkout #order_review {
        grid-column: 1 !important;
        grid-row: auto !important;
      }

      body.woocommerce-checkout #order_review {
        position: static !important;
      }
    }

    @media (max-width: 768px) {
      body.woocommerce-checkout .woocommerce {
        padding: 72px 18px 76px !important;
      }

      body.woocommerce-checkout .woocommerce-billing-fields,
      body.woocommerce-checkout .woocommerce-shipping-fields,
      body.woocommerce-checkout .woocommerce-additional-fields,
      body.woocommerce-checkout #order_review,
      body.woocommerce-checkout form.checkout_coupon {
        padding: 22px !important;
      }

      body.woocommerce-checkout .form-row-first,
      body.woocommerce-checkout .form-row-last,
      body.woocommerce-checkout .checkout_coupon .form-row-first,
      body.woocommerce-checkout .checkout_coupon .form-row-last {
        float: none !important;
        width: 100% !important;
        margin-right: 0 !important;
      }

      body.woocommerce-checkout .checkout_coupon .form-row-first {
        margin-bottom: 12px !important;
      }

      body.woocommerce-checkout input[type="text"],
      body.woocommerce-checkout input[type="email"],
      body.woocommerce-checkout input[type="tel"],
      body.woocommerce-checkout input[type="number"],
      body.woocommerce-checkout input[type="password"],
      body.woocommerce-checkout textarea,
      body.woocommerce-checkout select,
      body.woocommerce-checkout .select2-container--default .select2-selection--single {
        min-height: 50px !important;
        font-size: 16px !important;
      }

      body.woocommerce-checkout #order_review table.shop_table th,
      body.woocommerce-checkout #order_review table.shop_table td {
        font-size: 13px !important;
      }

      body.woocommerce-checkout #place_order {
        min-height: 52px !important;
      }
    }

    @media (max-width: 480px) {
      body.woocommerce-checkout .woocommerce {
        padding-left: 14px !important;
        padding-right: 14px !important;
      }

      body.woocommerce-checkout .woocommerce-billing-fields h3,
      body.woocommerce-checkout .woocommerce-shipping-fields h3,
      body.woocommerce-checkout .woocommerce-additional-fields h3,
      body.woocommerce-checkout #order_review_heading {
        font-size: 30px !important;
      }

      body.woocommerce-checkout .woocommerce-billing-fields,
      body.woocommerce-checkout .woocommerce-shipping-fields,
      body.woocommerce-checkout .woocommerce-additional-fields,
      body.woocommerce-checkout #order_review,
      body.woocommerce-checkout form.checkout_coupon {
        padding: 18px !important;
      }
    }

    /* --- Back Button --- */
    body.woocommerce-checkout .stillness-back-button {
      display: inline-flex !important;
      align-items: center !important;
      font-family: 'Jost', Arial, sans-serif !important;
      font-size: 14px !important;
      font-weight: 500 !important;
      color: #688F9D !important;
      text-decoration: none !important;
      text-transform: uppercase !important;
      letter-spacing: 0.1em !important;
      margin-bottom: 24px !important;
      transition: color 0.2s ease, transform 0.2s ease !important;
    }

    body.woocommerce-checkout .stillness-back-button:hover {
      color: #1D3152 !important;
      transform: translateX(-4px) !important;
    }

    /* --- Order Confirmation Page --- */
    body.woocommerce-checkout .woocommerce-order {
      background: #FFFFFF !important;
      border: 1px solid rgba(196, 187, 180, 0.45) !important;
      border-radius: 4px !important;
      box-shadow: 0 18px 48px rgba(14, 27, 48, 0.07) !important;
      padding: 40px !important;
      max-width: 800px !important;
      margin: 0 auto !important;
    }

    body.woocommerce-checkout .woocommerce-order > p.woocommerce-notice {
      font-family: 'Cormorant Garamond', Georgia, serif !important;
      font-size: clamp(24px, 3vw, 32px) !important;
      font-weight: 300 !important;
      line-height: 1.2 !important;
      color: #688F9D !important;
      text-align: center !important;
      margin-bottom: 32px !important;
    }

    body.woocommerce-checkout .woocommerce-order ul.order_details {
      display: flex !important;
      flex-wrap: wrap !important;
      gap: 24px !important;
      list-style: none !important;
      padding: 0 !important;
      margin: 0 0 32px !important;
      border-bottom: 1px solid rgba(196, 187, 180, 0.45) !important;
      padding-bottom: 24px !important;
    }

    body.woocommerce-checkout .woocommerce-order ul.order_details li {
      flex: 1 1 min-content !important;
      font-family: 'Jost', Arial, sans-serif !important;
      font-size: 11px !important;
      font-weight: 500 !important;
      letter-spacing: 0.13em !important;
      text-transform: uppercase !important;
      color: rgba(14, 27, 48, 0.72) !important;
      border: none !important;
      margin: 0 !important;
      padding: 0 !important;
    }

    body.woocommerce-checkout .woocommerce-order ul.order_details li strong {
      display: block !important;
      margin-top: 8px !important;
      font-size: 15px !important;
      font-weight: 400 !important;
      color: #0E1B30 !important;
      text-transform: none !important;
      letter-spacing: normal !important;
    }

    body.woocommerce-checkout .woocommerce-order h2 {
      font-family: 'Cormorant Garamond', Georgia, serif !important;
      font-size: clamp(24px, 3vw, 32px) !important;
      font-weight: 300 !important;
      color: #0E1B30 !important;
      margin: 0 0 20px !important;
    }

    body.woocommerce-checkout .woocommerce-order table.woocommerce-table--order-details,
    body.woocommerce-checkout .woocommerce-order table.woocommerce-table--customer-details {
      width: 100% !important;
      border-collapse: collapse !important;
      margin-bottom: 32px !important;
      font-family: 'Jost', Arial, sans-serif !important;
    }

    body.woocommerce-checkout .woocommerce-order table th,
    body.woocommerce-checkout .woocommerce-order table td {
      border: none !important;
      border-bottom: 1px solid rgba(196, 187, 180, 0.25) !important;
      padding: 16px 0 !important;
      color: #0E1B30 !important;
      font-size: 15px !important;
      line-height: 1.5 !important;
    }

    body.woocommerce-checkout .woocommerce-order table th {
      font-weight: 500 !important;
      text-align: left !important;
    }

    body.woocommerce-checkout .woocommerce-order table td {
      text-align: right !important;
    }

    body.woocommerce-checkout .woocommerce-order table .product-name {
      text-align: left !important;
    }
    
    body.woocommerce-checkout .woocommerce-order table tfoot th,
    body.woocommerce-checkout .woocommerce-order table tfoot td {
      border-top: 1px solid rgba(196, 187, 180, 0.45) !important;
      font-weight: 500 !important;
    }

    body.woocommerce-checkout .woocommerce-customer-details address {
      font-style: normal !important;
      color: #0E1B30 !important;
      font-size: 15px !important;
      line-height: 1.6 !important;
      border: 1px solid rgba(196, 187, 180, 0.25) !important;
      border-radius: 4px !important;
      padding: 20px !important;
      background: #FAFAFA !important;
    }
    
    @media (max-width: 768px) {
      body.woocommerce-checkout .woocommerce-order {
        padding: 24px !important;
      }
      
      body.woocommerce-checkout .woocommerce-order ul.order_details {
        flex-direction: column !important;
        gap: 16px !important;
      }
    }
  </style>
  <?php
}
