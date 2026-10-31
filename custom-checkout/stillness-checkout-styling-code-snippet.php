<?php
/**
 * Stillness Co. - WooCommerce Checkout Styling
 *
 * Presentation redesign for the classic WooCommerce checkout.
 * Keeps the native checkout fields, order data, and payment processing.
 */

add_action('wp_head', 'stillness_checkout_styling_snippet', 99);
add_action('woocommerce_before_checkout_form', 'stillness_checkout_header', 5);
add_action('wp_footer', 'stillness_checkout_interactions', 99);
add_filter('woocommerce_order_button_text', 'stillness_checkout_order_button_text', 20);
add_filter('woocommerce_cart_item_name', 'stillness_checkout_event_item_details', 20, 3);
add_filter('woocommerce_checkout_coupon_message', 'stillness_checkout_coupon_message');

function stillness_checkout_header() {
  echo '<div class="stillness-checkout-header" role="group" aria-label="Secure checkout"><span class="stillness-checkout-wordmark">Stillness.</span><span class="stillness-checkout-secure"><span class="stillness-checkout-lock" aria-hidden="true">🔒</span> Secure checkout</span></div>';
}

function stillness_checkout_order_button_text($button_text) {
  if (!function_exists('WC') || !WC()->cart || WC()->cart->is_empty()) {
    return $button_text;
  }

  foreach (WC()->cart->get_cart() as $cart_item) {
    $product_id = isset($cart_item['product_id']) ? (int) $cart_item['product_id'] : 0;
    if (!$product_id || !has_term('events', 'product_cat', $product_id)) {
      return $button_text;
    }
  }

  $cart_total = WC()->cart->get_total('edit');
  return sprintf('Reserve my seat · %s', wp_strip_all_tags(wc_price($cart_total)));
}

function stillness_checkout_event_item_details($item_name, $cart_item, $cart_item_key) {
  if (
    !function_exists('is_checkout') ||
    !is_checkout() ||
    (function_exists('is_order_received_page') && is_order_received_page())
  ) {
    return $item_name;
  }

  $details = '';
  $product_id = isset($cart_item['product_id']) ? (int) $cart_item['product_id'] : 0;

  if ($product_id && has_term('events', 'product_cat', $product_id)) {
    $product = isset($cart_item['data']) && is_a($cart_item['data'], 'WC_Product')
      ? $cart_item['data']
      : wc_get_product($product_id);
    $attribute_product = $product;

    if ($product && $product->is_type('variation')) {
      $parent_product = wc_get_product($product->get_parent_id());
      if ($parent_product) {
        $attribute_product = $parent_product;
      }
    }

    if ($attribute_product) {
      $duration = trim($attribute_product->get_attribute('Duration'));
      $dates = trim($attribute_product->get_attribute('Event Dates'));
      $time = trim($attribute_product->get_attribute('Event Time'));
      $location = trim($attribute_product->get_attribute('Sanctuary'));
      $meta_lines = array();

      $schedule = implode(', ', array_filter(array($duration, $dates)));
      if ($schedule !== '') {
        $meta_lines[] = $schedule;
      }

      $venue = implode(' · ', array_filter(array($time, $location)));
      if ($venue !== '') {
        $meta_lines[] = $venue;
      }

      if ($meta_lines) {
        $details = '<span class="stillness-event-details">';
        foreach ($meta_lines as $meta_line) {
          $details .= '<span class="stillness-event-meta-line">' . esc_html($meta_line) . '</span>';
        }
        $details .= '</span>';
      }
    }
  }

  return '<span class="stillness-cart-item-name">' . $item_name . '</span>' . $details;
}

function stillness_checkout_coupon_message($message) {
  if (
    !function_exists('is_checkout') ||
    !is_checkout() ||
    (function_exists('is_order_received_page') && is_order_received_page())
  ) {
    return $message;
  }

  return 'Have a gift or promo code? <a href="#" class="showcoupon">Apply it</a>';
}

function stillness_checkout_interactions() {
  if (
    !function_exists('is_checkout') ||
    !is_checkout() ||
    (function_exists('is_order_received_page') && is_order_received_page())
  ) {
    return;
  }
  ?>
  <script id="stillness-checkout-interactions">
    (function () {
      var walletSelectors = [
        '.wc-stripe-payment-request-wrapper',
        '#wc-stripe-payment-request-wrapper',
        '.wcpay-payment-request-wrapper',
        '#wcpay-payment-request-wrapper',
        '.wc-payment-request-wrapper',
        '#wc-payment-request-wrapper'
      ];

      function moveExpressPay(form) {
        var wrappers = [];
        walletSelectors.forEach(function (selector) {
          form.querySelectorAll(selector).forEach(function (wrapper) {
            if (!wrapper.closest('.stillness-express-pay')) {
              wrappers.push(wrapper);
            }
          });
        });

        wrappers = wrappers.filter(function (wrapper, index) {
          return wrappers.indexOf(wrapper) === index && !wrappers.some(function (other) {
            return other !== wrapper && other.contains(wrapper);
          });
        });

        if (!wrappers.length) {
          return;
        }

        var expressPay = form.querySelector('.stillness-express-pay');
        if (!expressPay) {
          expressPay = document.createElement('div');
          expressPay.className = 'stillness-express-pay';
          expressPay.setAttribute('aria-label', 'Express checkout options');
          var divider = document.createElement('div');
          divider.className = 'stillness-payment-divider';
          divider.textContent = 'or pay with card';
          expressPay.appendChild(divider);
          form.appendChild(expressPay);
        }

        wrappers.forEach(function (wrapper) {
          var buttons = wrapper.querySelectorAll('button, iframe, .payment-request-button').length;
          wrapper.setAttribute('data-wallet-buttons', String(buttons));
          expressPay.insertBefore(wrapper, expressPay.firstChild);
        });

        expressPay.setAttribute(
          'data-wallet-count',
          String(expressPay.querySelectorAll(walletSelectors.join(',')).length)
        );
      }

      function addOrderNoteToggle(form) {
        var section = form.querySelector('.woocommerce-additional-fields');
        var field = section && section.querySelector('#order_comments_field');
        var heading = section && section.querySelector('h3');

        if (!field) {
          return;
        }

        if (!section.querySelector('.stillness-note-toggle')) {
          var toggle = document.createElement('button');
          toggle.type = 'button';
          toggle.className = 'stillness-note-toggle';
          toggle.setAttribute('aria-expanded', 'false');
          toggle.textContent = '+ Add a note (injuries, mobility, questions)';
          field.hidden = true;
          if (heading) {
            heading.hidden = true;
            heading.insertAdjacentElement('afterend', toggle);
          } else {
            section.insertBefore(toggle, section.firstChild);
          }

          toggle.addEventListener('click', function () {
            var isOpen = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
            toggle.textContent = isOpen
              ? '+ Add a note (injuries, mobility, questions)'
              : '− Hide note';
            field.hidden = isOpen;
          });
        }

        var payment = form.querySelector('#payment');
        if (payment && section.parentElement !== form) {
          form.appendChild(section);
        }
      }

      function movePlaceOrderButton(form) {
        var buttons = form.querySelectorAll('#place_order');
        if (!buttons.length) {
          return;
        }

        var submitArea = form.querySelector('.stillness-checkout-actions');
        if (!submitArea) {
          submitArea = document.createElement('div');
          submitArea.className = 'stillness-checkout-actions';
          form.appendChild(submitArea);
        }

        var placeOrder = buttons[0];
        for (var index = 1; index < buttons.length; index += 1) {
          buttons[index].remove();
        }
        if (placeOrder.parentElement !== submitArea) {
          submitArea.appendChild(placeOrder);
        }
      }

      function moveNewsletterOptIn(form) {
        var submitArea = form.querySelector('.stillness-checkout-actions');
        if (!submitArea) {
          return;
        }

        var newsletter = Array.prototype.find.call(
          form.querySelectorAll('input[type="checkbox"]'),
          function (checkbox) {
            var id = checkbox.getAttribute('id') || '';
            var label = checkbox.closest('label');
            if (!label && id) {
              label = Array.prototype.find.call(form.querySelectorAll('label[for]'), function (candidate) {
                return candidate.getAttribute('for') === id;
              });
            }
            var parent = checkbox.closest('[class]');
            var details = [
              checkbox.getAttribute('name') || '',
              id,
              parent ? parent.className : '',
              label ? label.textContent : ''
            ].join(' ');
            return /newsletter|mailing\s*list|email\s*updates|\bnews\b/i.test(details);
          }
        );

        if (!newsletter) {
          return;
        }

        var field = newsletter.closest(
          '.form-row, .woocommerce-form-row, .mailchimp-newsletter, .woocommerce-mailchimp-newsletter, .wc-mailchimp-newsletter, .newsletter'
        ) || newsletter.closest('p') || newsletter.closest('label') || newsletter.parentElement;

        if (field && !submitArea.contains(field)) {
          submitArea.insertBefore(field, submitArea.firstChild);
        }
      }

      function enhanceCheckout() {
        var form = document.querySelector('form.checkout');
        if (!form) {
          return;
        }
        var cartItems = form.querySelectorAll('#order_review tr.cart_item').length;
        form.classList.toggle('stillness-multi-item', cartItems > 1);
        moveExpressPay(form);
        addOrderNoteToggle(form);
        movePlaceOrderButton(form);
        moveNewsletterOptIn(form);
      }

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', enhanceCheckout);
      } else {
        enhanceCheckout();
      }

      if (window.jQuery) {
        window.jQuery(document.body).on('updated_checkout', enhanceCheckout);
      }

      var checkoutForm = document.querySelector('form.checkout');
      if (checkoutForm && window.MutationObserver) {
        var observer = new MutationObserver(function () {
          enhanceCheckout();
        });
        observer.observe(checkoutForm, { childList: true, subtree: true });
      }
    }());
  </script>
  <?php
}

function stillness_checkout_styling_snippet() {
  if (
    !function_exists('is_checkout') ||
    !is_checkout() ||
    (function_exists('is_order_received_page') && is_order_received_page())
  ) {
    return;
  }
  ?>
  <style id="stillness-checkout-styling">
    body.woocommerce-checkout:not(.woocommerce-order-received) {
      --stillness-cream: #F7F0EC;
      --stillness-navy: #0E1B30;
      --stillness-blue: #1D3152;
      --stillness-seafoam: #688F9D;
      --stillness-white: #FFFFFF;
      --stillness-muted: #7C7C7C;
      background: var(--stillness-cream) !important;
      color: var(--stillness-navy) !important;
      font-family: 'Jost', Arial, sans-serif !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) *,
    body.woocommerce-checkout:not(.woocommerce-order-received) *::before,
    body.woocommerce-checkout:not(.woocommerce-order-received) *::after {
      box-sizing: border-box !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) .site-main,
    body.woocommerce-checkout:not(.woocommerce-order-received) #primary,
    body.woocommerce-checkout:not(.woocommerce-order-received) .entry-content {
      background: var(--stillness-cream) !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) .elementor-widget-woocommerce-checkout-page,
    body.woocommerce-checkout:not(.woocommerce-order-received) .elementor-widget-woocommerce-checkout-page > .elementor-widget-container,
    body.woocommerce-checkout:not(.woocommerce-order-received) .elementor-widget-container:has(> .woocommerce form.checkout) {
      margin-block: 0 !important;
      padding-block: 0 !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) .elementor-section:has(.woocommerce form.checkout),
    body.woocommerce-checkout:not(.woocommerce-order-received) .e-con:has(.woocommerce form.checkout) {
      height: auto !important;
      min-height: 0 !important;
      margin-block: 0 !important;
      padding-block: 0 !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) .elementor-location-header,
    body.woocommerce-checkout:not(.woocommerce-order-received) .site-header,
    body.woocommerce-checkout:not(.woocommerce-order-received) #masthead,
    body.woocommerce-checkout:not(.woocommerce-order-received) .elementor-location-footer,
    body.woocommerce-checkout:not(.woocommerce-order-received) .site-footer,
    body.woocommerce-checkout:not(.woocommerce-order-received) #colophon {
      display: none !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce {
      display: flex !important;
      flex-direction: column !important;
      gap: 0 !important;
      width: 100% !important;
      max-width: 1120px !important;
      margin: 0 auto !important;
      padding: 32px 28px 30px !important;
      background: var(--stillness-cream) !important;
      color: var(--stillness-navy) !important;
      font-family: 'Jost', Arial, sans-serif !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce::before,
    body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce::after {
      content: none !important;
      display: none !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) .stillness-checkout-header {
      order: 0 !important;
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
      gap: 12px !important;
      margin: 0 0 26px !important;
      padding: 0 !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) .stillness-checkout-wordmark {
      color: var(--stillness-navy) !important;
      font-family: 'Cormorant Garamond', Georgia, serif !important;
      font-size: clamp(34px, 4.6vw, 46px) !important;
      font-weight: 400 !important;
      line-height: 0.95 !important;
      letter-spacing: -0.04em !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) .stillness-checkout-secure {
      display: inline-flex !important;
      align-items: center !important;
      gap: 8px !important;
      color: var(--stillness-seafoam) !important;
      font-size: 13px !important;
      font-weight: 500 !important;
      line-height: 1.2 !important;
      letter-spacing: 0.12em !important;
      text-transform: uppercase !important;
      white-space: nowrap !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) .stillness-checkout-lock {
      font-size: 15px !important;
      letter-spacing: 0 !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce-notices-wrapper,
    body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce-form-login-toggle {
      order: 1 !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) form.checkout {
      order: 2 !important;
      display: grid !important;
      grid-template-columns: minmax(0, 1.05fr) minmax(390px, 0.95fr) !important;
      grid-template-rows: auto auto auto auto auto auto !important;
      column-gap: 28px !important;
      row-gap: 0 !important;
      min-width: 0 !important;
      margin: 0 !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce-form-coupon-toggle {
      order: 3 !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) form.checkout_coupon {
      order: 4 !important;
      width: 100% !important;
      margin: 0 !important;
      padding: 16px !important;
      border: 1px solid rgba(14, 27, 48, 0.12) !important;
      border-radius: 14px !important;
      background: var(--stillness-white) !important;
      box-shadow: 0 8px 24px rgba(14, 27, 48, 0.04) !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce-info,
    body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce-message,
    body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce-error {
      position: relative !important;
      margin: 0 0 10px !important;
      padding: 12px 14px 12px 40px !important;
      border: 1px solid rgba(104, 143, 157, 0.25) !important;
      border-left: 3px solid var(--stillness-seafoam) !important;
      border-radius: 8px !important;
      background: var(--stillness-white) !important;
      box-shadow: none !important;
      color: var(--stillness-blue) !important;
      font-size: 14px !important;
      line-height: 1.5 !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce-info::before,
    body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce-message::before,
    body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce-error::before {
      top: 12px !important;
      left: 14px !important;
      color: var(--stillness-seafoam) !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce a {
      color: var(--stillness-seafoam) !important;
      text-decoration: none !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce a:hover {
      color: var(--stillness-blue) !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) #customer_details {
      grid-column: 1 !important;
      grid-row: 1 / span 4 !important;
      display: grid !important;
      align-content: start !important;
      gap: 10px !important;
      width: 100% !important;
      min-width: 0 !important;
      margin: 0 !important;
      padding: 0 !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) #customer_details .col-1,
    body.woocommerce-checkout:not(.woocommerce-order-received) #customer_details .col-2 {
      float: none !important;
      width: 100% !important;
      max-width: none !important;
      margin: 0 !important;
      padding: 0 !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) #customer_details .col-2 {
      display: grid !important;
      gap: 10px !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce-billing-fields,
    body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce-shipping-fields {
      width: 100% !important;
      min-width: 0 !important;
      padding: 22px !important;
      border: 0 !important;
      border-radius: 20px !important;
      background: var(--stillness-white) !important;
      box-shadow: 0 8px 26px rgba(14, 27, 48, 0.035) !important;
    }

    /* WooCommerce can leave an empty shipping wrapper in virtual carts. */
    body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce-shipping-fields:not(:has(input:not([type="hidden"]), select, textarea)),
    body.woocommerce-checkout:not(.woocommerce-order-received) #customer_details .col-2:not(:has(input:not([type="hidden"]), select, textarea)) {
      display: none !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce-additional-fields {
      grid-column: 1 / -1 !important;
      grid-row: 5 !important;
      width: 100% !important;
      margin: 0 !important;
      padding: 0 !important;
      border: 0 !important;
      border-radius: 0 !important;
      background: transparent !important;
      box-shadow: none !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) .stillness-checkout-actions {
      display: grid !important;
      grid-template-columns: minmax(0, 1fr) !important;
      gap: 8px !important;
      grid-column: 1 / -1 !important;
      grid-row: 6 !important;
      width: 100% !important;
      margin: 0 !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce-billing-fields h3,
    body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce-shipping-fields h3 {
      margin: 0 0 18px !important;
      color: var(--stillness-navy) !important;
      font-family: 'Cormorant Garamond', Georgia, serif !important;
      font-size: 32px !important;
      font-weight: 400 !important;
      line-height: 1.05 !important;
      letter-spacing: 0 !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce-billing-fields h3 {
      display: none !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) #customer_details .col-1 > .woocommerce-billing-fields::before {
      content: "Your details" !important;
      display: block !important;
      margin: 0 0 18px !important;
      color: var(--stillness-navy) !important;
      font-family: 'Cormorant Garamond', Georgia, serif !important;
      font-size: 32px !important;
      font-weight: 400 !important;
      line-height: 1.05 !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce-billing-fields__field-wrapper,
    body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce-shipping-fields__field-wrapper {
      display: grid !important;
      grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
      column-gap: 12px !important;
      align-items: start !important;
      min-width: 0 !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce-billing-fields__field-wrapper .form-row,
    body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce-shipping-fields__field-wrapper .form-row,
    body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce-additional-fields__field-wrapper .form-row {
      float: none !important;
      width: 100% !important;
      min-width: 0 !important;
      margin: 0 0 10px !important;
      padding: 0 !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce-billing-fields__field-wrapper .form-row-wide,
    body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce-shipping-fields__field-wrapper .form-row-wide,
    body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce-additional-fields__field-wrapper .form-row {
      grid-column: 1 / -1 !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce-billing-fields__field-wrapper .clear,
    body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce-shipping-fields__field-wrapper .clear {
      display: none !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) .form-row label {
      display: block !important;
      margin: 0 0 6px !important;
      color: var(--stillness-navy) !important;
      font-size: 16px !important;
      font-weight: 500 !important;
      line-height: 1.3 !important;
      letter-spacing: 0 !important;
      text-transform: none !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) .required {
      color: var(--stillness-seafoam) !important;
      text-decoration: none !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) .optional {
      color: var(--stillness-muted) !important;
      font-weight: 400 !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) input[type="text"],
    body.woocommerce-checkout:not(.woocommerce-order-received) input[type="email"],
    body.woocommerce-checkout:not(.woocommerce-order-received) input[type="tel"],
    body.woocommerce-checkout:not(.woocommerce-order-received) input[type="number"],
    body.woocommerce-checkout:not(.woocommerce-order-received) input[type="password"],
    body.woocommerce-checkout:not(.woocommerce-order-received) textarea,
    body.woocommerce-checkout:not(.woocommerce-order-received) select,
    body.woocommerce-checkout:not(.woocommerce-order-received) .select2-container--default .select2-selection--single {
      display: block !important;
      width: 100% !important;
      min-width: 0 !important;
      min-height: 62px !important;
      padding: 12px 16px !important;
      border: 1px solid rgba(14, 27, 48, 0.2) !important;
      border-radius: 14px !important;
      background: var(--stillness-white) !important;
      box-shadow: none !important;
      color: var(--stillness-navy) !important;
      font-family: 'Jost', Arial, sans-serif !important;
      font-size: 17px !important;
      font-weight: 400 !important;
      line-height: 1.4 !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce-input-wrapper,
    body.woocommerce-checkout:not(.woocommerce-order-received) .select2-container {
      display: block !important;
      width: 100% !important;
      min-width: 0 !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) #billing_email_field::after {
      content: "Your confirmation and receipt go here." !important;
      display: block !important;
      margin-top: 8px !important;
      color: var(--stillness-muted) !important;
      font-size: 15px !important;
      line-height: 1.4 !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) textarea {
      min-height: 96px !important;
      resize: vertical !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) input::placeholder,
    body.woocommerce-checkout:not(.woocommerce-order-received) textarea::placeholder {
      color: rgba(14, 27, 48, 0.42) !important;
      opacity: 1 !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) input:focus,
    body.woocommerce-checkout:not(.woocommerce-order-received) textarea:focus,
    body.woocommerce-checkout:not(.woocommerce-order-received) select:focus,
    body.woocommerce-checkout:not(.woocommerce-order-received) .select2-container--open .select2-selection--single {
      border-color: var(--stillness-seafoam) !important;
      box-shadow: 0 0 0 3px rgba(104, 143, 157, 0.15) !important;
      outline: none !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce-invalid input,
    body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce-invalid textarea,
    body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce-invalid select,
    body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce-invalid .select2-selection {
      border-color: var(--stillness-blue) !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) .select2-container--default .select2-selection--single {
      height: 62px !important;
      padding: 0 !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) .select2-container--default .select2-selection--single .select2-selection__rendered {
      padding: 0 38px 0 16px !important;
      color: var(--stillness-navy) !important;
      font: inherit !important;
      line-height: 60px !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) .select2-container--default .select2-selection--single .select2-selection__arrow {
      top: 4px !important;
      right: 8px !important;
      height: 52px !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) .select2-dropdown {
      overflow: hidden !important;
      border: 1px solid rgba(14, 27, 48, 0.18) !important;
      border-radius: 10px !important;
      background: var(--stillness-white) !important;
      color: var(--stillness-navy) !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) #ship-to-different-address {
      margin: 0 0 10px !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) #ship-to-different-address label,
    body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce-form__label-for-checkbox {
      display: flex !important;
      align-items: center !important;
      gap: 12px !important;
      min-height: 44px !important;
      margin: 0 !important;
      padding: 6px 0 !important;
      color: var(--stillness-navy) !important;
      font-size: 16px !important;
      font-weight: 400 !important;
      line-height: 1.45 !important;
      letter-spacing: 0 !important;
      text-transform: none !important;
      cursor: pointer !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) input[type="checkbox"],
    body.woocommerce-checkout:not(.woocommerce-order-received) input[type="radio"] {
      flex: 0 0 20px !important;
      width: 20px !important;
      height: 20px !important;
      margin: 0 !important;
      accent-color: var(--stillness-seafoam) !important;
    }

    /* Navy reservation summary */
    body.woocommerce-checkout:not(.woocommerce-order-received) #order_review {
      display: contents !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) #order_review_heading {
      grid-column: 2 !important;
      grid-row: 1 !important;
      display: block !important;
      float: none !important;
      width: 100% !important;
      max-width: none !important;
      margin: 0 !important;
      padding: 20px 24px 0 !important;
      border: 0 !important;
      border-radius: 20px 20px 0 0 !important;
      background: var(--stillness-navy) !important;
      color: transparent !important;
      font-size: 0 !important;
      line-height: 0 !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) #order_review_heading::before {
      content: "YOU'RE RESERVING" !important;
      display: block !important;
      color: #A4B2BA !important;
      font-family: 'Jost', Arial, sans-serif !important;
      font-size: 13px !important;
      font-weight: 500 !important;
      line-height: 1.4 !important;
      letter-spacing: 0.18em !important;
      text-transform: uppercase !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) #order_review table.shop_table {
      grid-column: 2 !important;
      grid-row: 2 !important;
      display: table !important;
      float: none !important;
      width: 100% !important;
      max-width: none !important;
      margin: 0 0 12px !important;
      padding: 0 !important;
      border: 0 !important;
      border-radius: 0 0 20px 20px !important;
      border-collapse: separate !important;
      border-spacing: 0 !important;
      background: var(--stillness-navy) !important;
      box-shadow: 0 14px 32px rgba(14, 27, 48, 0.1) !important;
      color: var(--stillness-white) !important;
      font-family: 'Jost', Arial, sans-serif !important;
      table-layout: fixed !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) #order_review table.shop_table thead,
    body.woocommerce-checkout:not(.woocommerce-order-received) #order_review table.shop_table .cart-subtotal,
    body.woocommerce-checkout:not(.woocommerce-order-received) #order_review table.shop_table .cart_item td.product-total {
      display: none !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) #order_review table.shop_table th,
    body.woocommerce-checkout:not(.woocommerce-order-received) #order_review table.shop_table td {
      border: 0 !important;
      background: var(--stillness-navy) !important;
      color: var(--stillness-white) !important;
      font-size: 15px !important;
      line-height: 1.5 !important;
      vertical-align: top !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) #order_review table.shop_table td.product-name {
      width: 100% !important;
      padding: 12px 24px 14px !important;
      border-bottom: 1px solid rgba(217, 232, 235, 0.2) !important;
      color: var(--stillness-white) !important;
      font-family: 'Cormorant Garamond', Georgia, serif !important;
      font-size: clamp(26px, 4vw, 34px) !important;
      font-weight: 400 !important;
      line-height: 1.08 !important;
      overflow-wrap: anywhere !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) #order_review table.shop_table td.product-name a {
      color: var(--stillness-white) !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) #order_review table.shop_table .product-quantity {
      color: #D9E8EB !important;
      font-family: 'Jost', Arial, sans-serif !important;
      font-size: 13px !important;
      white-space: nowrap !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) .stillness-event-details {
      display: block !important;
      margin-top: 16px !important;
      color: #D9E8EB !important;
      font-family: 'Jost', Arial, sans-serif !important;
      font-size: 16px !important;
      line-height: 1.55 !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) .stillness-event-meta-line {
      display: block !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) #order_review table.shop_table .order-total th,
    body.woocommerce-checkout:not(.woocommerce-order-received) #order_review table.shop_table .order-total td {
      padding: 16px 24px 18px !important;
      background: var(--stillness-navy) !important;
      color: #F7F0EC !important;
      font-family: 'Jost', Arial, sans-serif !important;
      font-size: 16px !important;
      font-weight: 400 !important;
      vertical-align: middle !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) #order_review table.shop_table .order-total td {
      text-align: right !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) #order_review table.shop_table .order-total .amount,
    body.woocommerce-checkout:not(.woocommerce-order-received) #order_review table.shop_table .order-total strong {
      color: var(--stillness-white) !important;
      font-family: 'Cormorant Garamond', Georgia, serif !important;
      font-size: 34px !important;
      font-weight: 400 !important;
      white-space: nowrap !important;
    }

    /* Wallets are only displayed when the active gateway supplies them. */
    body.woocommerce-checkout:not(.woocommerce-order-received) .stillness-express-pay {
      grid-column: 2 !important;
      grid-row: 3 !important;
      display: grid !important;
      grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
      gap: 14px !important;
      min-width: 0 !important;
      margin: 0 0 18px !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) .stillness-express-pay .wc-stripe-payment-request-wrapper,
    body.woocommerce-checkout:not(.woocommerce-order-received) .stillness-express-pay #wc-stripe-payment-request-wrapper,
    body.woocommerce-checkout:not(.woocommerce-order-received) .stillness-express-pay .wcpay-payment-request-wrapper,
    body.woocommerce-checkout:not(.woocommerce-order-received) .stillness-express-pay #wcpay-payment-request-wrapper,
    body.woocommerce-checkout:not(.woocommerce-order-received) .stillness-express-pay .wc-payment-request-wrapper,
    body.woocommerce-checkout:not(.woocommerce-order-received) .stillness-express-pay #wc-payment-request-wrapper {
      display: grid !important;
      grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
      gap: 14px !important;
      width: 100% !important;
      margin: 0 !important;
      padding: 0 !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) .stillness-express-pay[data-wallet-count="1"] > .wc-stripe-payment-request-wrapper,
    body.woocommerce-checkout:not(.woocommerce-order-received) .stillness-express-pay[data-wallet-count="1"] > #wc-stripe-payment-request-wrapper,
    body.woocommerce-checkout:not(.woocommerce-order-received) .stillness-express-pay[data-wallet-count="1"] > .wcpay-payment-request-wrapper,
    body.woocommerce-checkout:not(.woocommerce-order-received) .stillness-express-pay[data-wallet-count="1"] > #wcpay-payment-request-wrapper,
    body.woocommerce-checkout:not(.woocommerce-order-received) .stillness-express-pay[data-wallet-count="1"] > .wc-payment-request-wrapper,
    body.woocommerce-checkout:not(.woocommerce-order-received) .stillness-express-pay[data-wallet-count="1"] > #wc-payment-request-wrapper {
      grid-column: 1 / -1 !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) .stillness-express-pay > [data-wallet-buttons="1"] {
      grid-template-columns: minmax(0, 1fr) !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) .stillness-express-pay button {
      min-height: 62px !important;
      border: 0 !important;
      border-radius: 14px !important;
      background: var(--stillness-navy) !important;
      color: var(--stillness-white) !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) .stillness-payment-divider {
      grid-column: 1 / -1 !important;
      display: flex !important;
      align-items: center !important;
      gap: 14px !important;
      color: var(--stillness-muted) !important;
      font-size: 15px !important;
      line-height: 1.4 !important;
      text-align: center !important;
      white-space: nowrap !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) .stillness-payment-divider::before,
    body.woocommerce-checkout:not(.woocommerce-order-received) .stillness-payment-divider::after {
      content: "" !important;
      flex: 1 1 auto !important;
      height: 1px !important;
      background: rgba(14, 27, 48, 0.22) !important;
    }

    /* Payment card and native WooCommerce gateway controls */
    body.woocommerce-checkout:not(.woocommerce-order-received) #payment {
      grid-column: 2 !important;
      grid-row: 4 !important;
      float: none !important;
      width: 100% !important;
      min-width: 0 !important;
      margin: 0 0 18px !important;
      padding: 20px !important;
      border: 0 !important;
      border-radius: 20px !important;
      background: var(--stillness-white) !important;
      box-shadow: 0 8px 26px rgba(14, 27, 48, 0.035) !important;
      color: var(--stillness-navy) !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) #payment::before {
      content: "Payment" !important;
      display: block !important;
      margin: 0 0 12px !important;
      color: var(--stillness-navy) !important;
      font-family: 'Cormorant Garamond', Georgia, serif !important;
      font-size: 32px !important;
      font-weight: 400 !important;
      line-height: 1.05 !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) #payment ul.payment_methods {
      margin: 0 0 12px !important;
      padding: 0 0 12px !important;
      border: 0 !important;
      border-bottom: 1px solid rgba(196, 187, 180, 0.5) !important;
      list-style: none !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) #payment ul.payment_methods li {
      margin: 0 !important;
      color: var(--stillness-navy) !important;
      font-size: 14px !important;
      line-height: 1.5 !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) #payment ul.payment_methods li label {
      display: flex !important;
      align-items: center !important;
      gap: 10px !important;
      min-height: 44px !important;
      cursor: pointer !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) #payment div.payment_box {
      width: 100% !important;
      margin: 8px 0 0 !important;
      padding: 0 !important;
      border: 0 !important;
      border-radius: 12px !important;
      background: var(--stillness-white) !important;
      color: var(--stillness-blue) !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) #payment div.payment_box::before {
      border-bottom-color: var(--stillness-white) !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) #payment iframe {
      display: block !important;
      width: 100% !important;
      max-width: 100% !important;
      border-radius: 12px !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce-privacy-policy-text,
    body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce-terms-and-conditions-wrapper {
      margin: 10px 0 !important;
      color: var(--stillness-muted) !important;
      font-size: 12px !important;
      line-height: 1.55 !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) button.button,
    body.woocommerce-checkout:not(.woocommerce-order-received) a.button,
    body.woocommerce-checkout:not(.woocommerce-order-received) input.button,
    body.woocommerce-checkout:not(.woocommerce-order-received) #place_order {
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      min-height: 54px !important;
      padding: 12px 18px !important;
      border: 0 !important;
      border-radius: 12px !important;
      background: var(--stillness-navy) !important;
      box-shadow: none !important;
      color: var(--stillness-white) !important;
      font-family: 'Jost', Arial, sans-serif !important;
      font-size: 14px !important;
      font-weight: 600 !important;
      line-height: 1.35 !important;
      letter-spacing: 0.03em !important;
      text-align: center !important;
      text-transform: none !important;
      transition: background-color 0.18s ease, color 0.18s ease !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) #place_order {
      width: 100% !important;
      min-height: 72px !important;
      margin-top: 8px !important;
      border-radius: 16px !important;
      font-size: 18px !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) button.button:hover,
    body.woocommerce-checkout:not(.woocommerce-order-received) a.button:hover,
    body.woocommerce-checkout:not(.woocommerce-order-received) input.button:hover,
    body.woocommerce-checkout:not(.woocommerce-order-received) #place_order:hover {
      background: var(--stillness-blue) !important;
      color: var(--stillness-white) !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) button.button:disabled,
    body.woocommerce-checkout:not(.woocommerce-order-received) button.button:disabled[disabled],
    body.woocommerce-checkout:not(.woocommerce-order-received) #place_order:disabled {
      opacity: 0.55 !important;
      cursor: not-allowed !important;
    }

    /* Optional note disclosure and coupon prompt */
    body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce-additional-fields h3[hidden],
    body.woocommerce-checkout:not(.woocommerce-order-received) #order_comments_field[hidden] {
      display: none !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) .stillness-note-toggle {
      display: inline-flex !important;
      align-items: center !important;
      min-height: 44px !important;
      margin: 0 0 10px !important;
      padding: 0 4px !important;
      border: 0 !important;
      border-radius: 0 !important;
      background: transparent !important;
      box-shadow: none !important;
      color: var(--stillness-blue) !important;
      font-family: 'Jost', Arial, sans-serif !important;
      font-size: 16px !important;
      font-weight: 600 !important;
      line-height: 1.4 !important;
      letter-spacing: 0 !important;
      text-align: left !important;
      text-transform: none !important;
      cursor: pointer !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce-form-coupon-toggle {
      margin: 12px 0 0 !important;
      text-align: center !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce-form-coupon-toggle .woocommerce-info {
      display: block !important;
      margin: 0 !important;
      padding: 0 !important;
      border: 0 !important;
      border-radius: 0 !important;
      background: var(--stillness-cream) !important;
      box-shadow: none !important;
      color: var(--stillness-muted) !important;
      font-size: 15px !important;
      text-align: center !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce-form-coupon-toggle .woocommerce-info::before {
      display: none !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce-form-coupon-toggle .woocommerce-info > a.showcoupon {
      color: var(--stillness-navy) !important;
      text-decoration: underline !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) form.checkout_coupon::before {
      content: "Apply a coupon" !important;
      display: block !important;
      margin: 0 0 10px !important;
      color: var(--stillness-navy) !important;
      font-family: 'Cormorant Garamond', Georgia, serif !important;
      font-size: 26px !important;
      line-height: 1.1 !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) form.checkout_coupon .form-row {
      float: none !important;
      width: 100% !important;
      margin: 0 0 10px !important;
      padding: 0 !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) form.checkout_coupon button.button {
      width: 100% !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) a:focus-visible,
    body.woocommerce-checkout:not(.woocommerce-order-received) button:focus-visible,
    body.woocommerce-checkout:not(.woocommerce-order-received) input:focus-visible,
    body.woocommerce-checkout:not(.woocommerce-order-received) select:focus-visible,
    body.woocommerce-checkout:not(.woocommerce-order-received) textarea:focus-visible {
      outline: 2px solid var(--stillness-seafoam) !important;
      outline-offset: 3px !important;
    }

    @media (max-width: 980px) {
      body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce {
        max-width: 680px !important;
        padding: 26px clamp(18px, 4vw, 26px) 22px !important;
      }

      body.woocommerce-checkout:not(.woocommerce-order-received) .stillness-checkout-header {
        margin-bottom: 26px !important;
        padding: 0 10px !important;
      }

      body.woocommerce-checkout:not(.woocommerce-order-received) .stillness-checkout-wordmark {
        font-size: 38px !important;
      }

      body.woocommerce-checkout:not(.woocommerce-order-received) form.checkout {
        grid-template-columns: minmax(0, 1fr) !important;
        grid-template-rows: auto auto auto auto auto auto auto !important;
        column-gap: 0 !important;
        row-gap: 0 !important;
      }

      body.woocommerce-checkout:not(.woocommerce-order-received) #order_review_heading {
        grid-column: 1 !important;
        grid-row: 1 !important;
        padding: 18px 22px 0 !important;
      }

      body.woocommerce-checkout:not(.woocommerce-order-received) #order_review table.shop_table {
        grid-column: 1 !important;
        grid-row: 2 !important;
        margin-bottom: 14px !important;
      }

      body.woocommerce-checkout:not(.woocommerce-order-received) #order_review table.shop_table .order-total th,
      body.woocommerce-checkout:not(.woocommerce-order-received) #order_review table.shop_table .order-total td {
        padding: 16px 22px 18px !important;
      }

      body.woocommerce-checkout:not(.woocommerce-order-received) .stillness-express-pay {
        grid-column: 1 !important;
        grid-row: 3 !important;
      }

      body.woocommerce-checkout:not(.woocommerce-order-received) #customer_details {
        grid-column: 1 !important;
        grid-row: 4 !important;
        margin: 0 0 12px !important;
      }

      body.woocommerce-checkout:not(.woocommerce-order-received) #payment {
        grid-column: 1 !important;
        grid-row: 5 !important;
        margin-bottom: 12px !important;
      }

      body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce-additional-fields {
        grid-column: 1 !important;
        grid-row: 6 !important;
      }

      body.woocommerce-checkout:not(.woocommerce-order-received) .stillness-checkout-actions {
        grid-column: 1 !important;
        grid-row: 7 !important;
      }

      body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce-billing-fields,
      body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce-shipping-fields,
      body.woocommerce-checkout:not(.woocommerce-order-received) #payment {
        padding: 22px !important;
      }

      body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce-billing-fields h3,
      body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce-shipping-fields h3 {
        margin-bottom: 22px !important;
      }

      body.woocommerce-checkout:not(.woocommerce-order-received) input[type="text"],
      body.woocommerce-checkout:not(.woocommerce-order-received) input[type="email"],
      body.woocommerce-checkout:not(.woocommerce-order-received) input[type="tel"],
      body.woocommerce-checkout:not(.woocommerce-order-received) input[type="number"],
      body.woocommerce-checkout:not(.woocommerce-order-received) input[type="password"],
      body.woocommerce-checkout:not(.woocommerce-order-received) textarea,
      body.woocommerce-checkout:not(.woocommerce-order-received) select,
      body.woocommerce-checkout:not(.woocommerce-order-received) .select2-container--default .select2-selection--single {
        min-height: 64px !important;
      }
    }

    @media (max-width: 600px) {
      body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce {
        padding: 18px 12px 20px !important;
      }

      body.woocommerce-checkout:not(.woocommerce-order-received) .stillness-checkout-header {
        margin-bottom: 20px !important;
        padding: 0 6px !important;
      }

      body.woocommerce-checkout:not(.woocommerce-order-received) .stillness-checkout-wordmark {
        font-size: 36px !important;
      }

      body.woocommerce-checkout:not(.woocommerce-order-received) .stillness-checkout-secure {
        gap: 6px !important;
        font-size: 11px !important;
        letter-spacing: 0.1em !important;
      }

      body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce-billing-fields,
      body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce-shipping-fields,
      body.woocommerce-checkout:not(.woocommerce-order-received) #payment {
        padding: 18px !important;
        border-radius: 18px !important;
      }

      body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce-billing-fields h3,
      body.woocommerce-checkout:not(.woocommerce-order-received) #customer_details .col-1 > .woocommerce-billing-fields::before,
      body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce-shipping-fields h3,
      body.woocommerce-checkout:not(.woocommerce-order-received) #payment::before {
        font-size: 29px !important;
      }

      body.woocommerce-checkout:not(.woocommerce-order-received) #order_review_heading {
        padding: 16px 18px 0 !important;
      }

      body.woocommerce-checkout:not(.woocommerce-order-received) #order_review table.shop_table td.product-name {
        padding: 10px 18px 12px !important;
      }

      body.woocommerce-checkout:not(.woocommerce-order-received) #order_review table.shop_table .order-total th,
      body.woocommerce-checkout:not(.woocommerce-order-received) #order_review table.shop_table .order-total td {
        padding: 14px 18px 16px !important;
      }

      body.woocommerce-checkout:not(.woocommerce-order-received) #order_review table.shop_table .order-total .amount,
      body.woocommerce-checkout:not(.woocommerce-order-received) #order_review table.shop_table .order-total strong {
        font-size: 26px !important;
      }

      body.woocommerce-checkout:not(.woocommerce-order-received) input[type="text"],
      body.woocommerce-checkout:not(.woocommerce-order-received) input[type="email"],
      body.woocommerce-checkout:not(.woocommerce-order-received) input[type="tel"],
      body.woocommerce-checkout:not(.woocommerce-order-received) input[type="number"],
      body.woocommerce-checkout:not(.woocommerce-order-received) input[type="password"],
      body.woocommerce-checkout:not(.woocommerce-order-received) textarea,
      body.woocommerce-checkout:not(.woocommerce-order-received) select,
      body.woocommerce-checkout:not(.woocommerce-order-received) .select2-container--default .select2-selection--single {
        min-height: 64px !important;
        padding: 10px 14px !important;
        font-size: 17px !important;
      }

      body.woocommerce-checkout:not(.woocommerce-order-received) .select2-container--default .select2-selection--single {
        height: 64px !important;
      }

      body.woocommerce-checkout:not(.woocommerce-order-received) .select2-container--default .select2-selection--single .select2-selection__rendered {
        line-height: 62px !important;
      }

      body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce-form-coupon-toggle {
        margin-top: 16px !important;
      }
    }

    @media (max-width: 380px) {
      body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce {
        padding-top: 18px !important;
        padding-right: 10px !important;
        padding-left: 10px !important;
      }

      body.woocommerce-checkout:not(.woocommerce-order-received) .stillness-checkout-header {
        margin-bottom: 18px !important;
      }

      body.woocommerce-checkout:not(.woocommerce-order-received) .stillness-checkout-wordmark {
        font-size: 33px !important;
      }

      body.woocommerce-checkout:not(.woocommerce-order-received) .stillness-checkout-secure {
        gap: 4px !important;
        font-size: 9px !important;
      }

      body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce-billing-fields,
      body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce-shipping-fields,
      body.woocommerce-checkout:not(.woocommerce-order-received) #payment {
        padding: 16px !important;
      }

      body.woocommerce-checkout:not(.woocommerce-order-received) input[type="text"],
      body.woocommerce-checkout:not(.woocommerce-order-received) input[type="email"],
      body.woocommerce-checkout:not(.woocommerce-order-received) input[type="tel"],
      body.woocommerce-checkout:not(.woocommerce-order-received) input[type="number"],
      body.woocommerce-checkout:not(.woocommerce-order-received) input[type="password"],
      body.woocommerce-checkout:not(.woocommerce-order-received) textarea,
      body.woocommerce-checkout:not(.woocommerce-order-received) select,
      body.woocommerce-checkout:not(.woocommerce-order-received) .select2-container--default .select2-selection--single {
        min-height: 60px !important;
      }

      body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce-billing-fields__field-wrapper,
      body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce-shipping-fields__field-wrapper {
        grid-template-columns: minmax(0, 1fr) !important;
      }

      body.woocommerce-checkout:not(.woocommerce-order-received) #order_review table.shop_table td.product-name {
        font-size: 22px !important;
        line-height: 1.2 !important;
      }

      body.woocommerce-checkout:not(.woocommerce-order-received) .stillness-express-pay .wc-stripe-payment-request-wrapper,
      body.woocommerce-checkout:not(.woocommerce-order-received) .stillness-express-pay #wc-stripe-payment-request-wrapper,
      body.woocommerce-checkout:not(.woocommerce-order-received) .stillness-express-pay .wcpay-payment-request-wrapper,
      body.woocommerce-checkout:not(.woocommerce-order-received) .stillness-express-pay #wcpay-payment-request-wrapper,
      body.woocommerce-checkout:not(.woocommerce-order-received) .stillness-express-pay .wc-payment-request-wrapper,
      body.woocommerce-checkout:not(.woocommerce-order-received) .stillness-express-pay #wc-payment-request-wrapper {
        gap: 8px !important;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce *,
      body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce *::before,
      body.woocommerce-checkout:not(.woocommerce-order-received) .woocommerce *::after {
        transition: none !important;
        animation: none !important;
      }
    }

    /* Multi-product carts use a denser summary so every item stays scannable. */
    body.woocommerce-checkout:not(.woocommerce-order-received) form.checkout.stillness-multi-item #order_review_heading {
      padding: 14px 20px 0 !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) form.checkout.stillness-multi-item #order_review table.shop_table {
      margin-bottom: 12px !important;
      border-radius: 0 0 16px 16px !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) form.checkout.stillness-multi-item #order_review table.shop_table td.product-name {
      padding: 10px 20px 12px !important;
      font-size: 22px !important;
      line-height: 1.22 !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) form.checkout.stillness-multi-item #order_review table.shop_table .product-quantity {
      display: inline !important;
      font-size: 12px !important;
      line-height: inherit !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) form.checkout.stillness-multi-item .stillness-event-details {
      margin-top: 8px !important;
      font-size: 14px !important;
      line-height: 1.4 !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) form.checkout.stillness-multi-item #order_review table.shop_table .order-total th,
    body.woocommerce-checkout:not(.woocommerce-order-received) form.checkout.stillness-multi-item #order_review table.shop_table .order-total td {
      padding: 14px 20px 18px !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) form.checkout.stillness-multi-item #order_review table.shop_table .order-total .amount,
    body.woocommerce-checkout:not(.woocommerce-order-received) form.checkout.stillness-multi-item #order_review table.shop_table .order-total strong {
      font-size: 27px !important;
    }

    /* Order summary redesign: a simple navy title bar over a light item list. */
    body.woocommerce-checkout:not(.woocommerce-order-received) #order_review_heading {
      padding: 18px 22px 12px !important;
      border-radius: 16px 16px 0 0 !important;
      background: var(--stillness-navy) !important;
      box-shadow: none !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) #order_review_heading::before {
      content: "Order summary" !important;
      color: var(--stillness-white) !important;
      font-family: 'Cormorant Garamond', Georgia, serif !important;
      font-size: 26px !important;
      font-weight: 400 !important;
      line-height: 1.1 !important;
      letter-spacing: 0 !important;
      text-transform: none !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) #order_review table.shop_table {
      margin-top: 0 !important;
      border-radius: 0 0 16px 16px !important;
      background: var(--stillness-white) !important;
      box-shadow: 0 10px 26px rgba(14, 27, 48, 0.07) !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) #order_review table.shop_table th,
    body.woocommerce-checkout:not(.woocommerce-order-received) #order_review table.shop_table td {
      padding: 12px 22px !important;
      border: 0 !important;
      background: var(--stillness-white) !important;
      color: var(--stillness-navy) !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) #order_review table.shop_table td.product-name {
      padding: 12px 22px !important;
      border-bottom: 1px solid rgba(14, 27, 48, 0.1) !important;
      color: var(--stillness-navy) !important;
      font-family: 'Cormorant Garamond', Georgia, serif !important;
      font-size: clamp(22px, 2.2vw, 27px) !important;
      line-height: 1.2 !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) #order_review table.shop_table td.product-name a {
      color: var(--stillness-navy) !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) #order_review table.shop_table .product-quantity {
      display: inline !important;
      color: var(--stillness-seafoam) !important;
      font-family: 'Jost', Arial, sans-serif !important;
      font-size: 13px !important;
      white-space: nowrap !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) .stillness-event-details {
      margin-top: 6px !important;
      color: var(--stillness-blue) !important;
      font-size: 14px !important;
      line-height: 1.45 !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) #order_review table.shop_table .order-total th,
    body.woocommerce-checkout:not(.woocommerce-order-received) #order_review table.shop_table .order-total td {
      padding: 14px 22px 16px !important;
      border-top: 1px solid rgba(104, 143, 157, 0.28) !important;
      background: #F7FAFB !important;
      color: var(--stillness-navy) !important;
      font-size: 15px !important;
      vertical-align: middle !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) #order_review table.shop_table .order-total th {
      border-radius: 0 0 0 16px !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) #order_review table.shop_table .order-total td {
      border-radius: 0 0 16px 0 !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) #order_review table.shop_table .order-total td {
      text-align: right !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) #order_review table.shop_table .order-total .amount,
    body.woocommerce-checkout:not(.woocommerce-order-received) #order_review table.shop_table .order-total strong {
      color: var(--stillness-navy) !important;
      font-family: 'Cormorant Garamond', Georgia, serif !important;
      font-size: 28px !important;
      font-weight: 500 !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) form.checkout.stillness-multi-item .stillness-event-details {
      color: var(--stillness-blue) !important;
    }

    @media (max-width: 600px) {
      body.woocommerce-checkout:not(.woocommerce-order-received) #order_review_heading {
        padding: 16px 18px 10px !important;
      }

      body.woocommerce-checkout:not(.woocommerce-order-received) #order_review_heading::before {
        font-size: 23px !important;
      }

      body.woocommerce-checkout:not(.woocommerce-order-received) #order_review table.shop_table th,
      body.woocommerce-checkout:not(.woocommerce-order-received) #order_review table.shop_table td {
        padding-right: 18px !important;
        padding-left: 18px !important;
      }

      body.woocommerce-checkout:not(.woocommerce-order-received) #order_review table.shop_table .order-total .amount,
      body.woocommerce-checkout:not(.woocommerce-order-received) #order_review table.shop_table .order-total strong {
        font-size: 25px !important;
      }
    }

    @media (max-width: 380px) {
      body.woocommerce-checkout:not(.woocommerce-order-received) #order_review table.shop_table td.product-name {
        font-size: 20px !important;
      }
    }

    /* Multi-item rows keep the product name and quantity visually separate. */
    body.woocommerce-checkout:not(.woocommerce-order-received) form.checkout.stillness-multi-item #order_review table.shop_table td.product-name {
      display: grid !important;
      grid-template-columns: minmax(0, 1fr) auto !important;
      grid-template-rows: auto auto auto !important;
      align-items: start !important;
      column-gap: 12px !important;
      row-gap: 4px !important;
      padding: 12px 20px !important;
      font-family: 'Jost', Arial, sans-serif !important;
      font-size: 16px !important;
      font-weight: 500 !important;
      line-height: 1.4 !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) form.checkout.stillness-multi-item .stillness-cart-item-name {
      grid-column: 1 !important;
      grid-row: 1 !important;
      display: block !important;
      min-width: 0 !important;
      color: var(--stillness-navy) !important;
      overflow-wrap: anywhere !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) form.checkout.stillness-multi-item .stillness-cart-item-name a {
      color: var(--stillness-navy) !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) form.checkout.stillness-multi-item #order_review table.shop_table .product-quantity {
      grid-column: 2 !important;
      grid-row: 1 !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      margin: 0 !important;
      padding: 2px 8px !important;
      border-radius: 999px !important;
      background: #D9E8EB !important;
      color: var(--stillness-navy) !important;
      font-family: 'Jost', Arial, sans-serif !important;
      font-size: 12px !important;
      font-weight: 500 !important;
      line-height: 1.3 !important;
      white-space: nowrap !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) form.checkout.stillness-multi-item .stillness-event-details {
      grid-column: 1 / -1 !important;
      grid-row: 2 !important;
      margin: 0 !important;
      color: var(--stillness-blue) !important;
      font-size: 13px !important;
      font-weight: 400 !important;
      line-height: 1.4 !important;
    }

    body.woocommerce-checkout:not(.woocommerce-order-received) form.checkout.stillness-multi-item #order_review table.shop_table dl.variation {
      grid-column: 1 / -1 !important;
      grid-row: 2 / span 2 !important;
      margin: 2px 0 0 !important;
      color: var(--stillness-blue) !important;
      font-family: 'Jost', Arial, sans-serif !important;
      font-size: 13px !important;
      line-height: 1.4 !important;
    }

    @media (max-width: 600px) {
      body.woocommerce-checkout:not(.woocommerce-order-received) form.checkout.stillness-multi-item #order_review table.shop_table td.product-name {
        column-gap: 8px !important;
        padding: 10px 16px !important;
        font-size: 15px !important;
      }
    }
  </style>
  <?php
}
