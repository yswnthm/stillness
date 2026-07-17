<?php
add_shortcode('stillness_featured_event', 'stillness_render_featured_event');
add_shortcode('stillness_event_grid', 'stillness_render_event_grid');

function stillness_get_events_query($limit = 1, $in_stock_only = false)
{
  $args = array(
    'post_type' => 'product',
    'post_status' => 'publish',
    'posts_per_page' => absint($limit),
    'orderby' => 'date',
    'order' => 'DESC',
    'tax_query' => array(
      array(
        'taxonomy' => 'product_cat',
        'field' => 'slug',
        'terms' => 'events',
      ),
    ),
  );

  if ($in_stock_only) {
    $args['meta_query'] = array(
      array(
        'key' => '_stock_status',
        'value' => 'instock',
      ),
    );
  }

  return new WP_Query($args);
}

function stillness_get_event_attribute($product, $label)
{
  if (!$product) {
    return '';
  }

  $value = $product->get_attribute($label);
  if ($value) {
    return $value;
  }

  $target = sanitize_title($label);

  foreach ($product->get_attributes() as $attribute) {
    $name = $attribute->get_name();
    $display_label = function_exists('wc_attribute_label') ? wc_attribute_label($name, $product) : $name;
    $matches_name = sanitize_title($name) === $target;
    $matches_label = sanitize_title($display_label) === $target;

    if ($matches_name || $matches_label) {
      return $product->get_attribute($name);
    }
  }

  return '';
}

function stillness_get_event_meta_items($product)
{
  $items = array(
    'Dates' => stillness_get_event_attribute($product, 'Event Dates'),
    'Duration' => stillness_get_event_attribute($product, 'Duration'),
    'Sanctuary' => stillness_get_event_attribute($product, 'Sanctuary'),
  );

  return array_filter($items);
}

function stillness_get_event_image_url($product, $size = 'large')
{
  if (!$product) {
    return '';
  }

  $image_id = $product->get_image_id();
  if ($image_id) {
    return wp_get_attachment_image_url($image_id, $size);
  }

  return function_exists('wc_placeholder_img_src') ? wc_placeholder_img_src($size) : '';
}

function stillness_render_featured_event()
{
  $query = stillness_get_events_query(1, true);

  if (!$query->have_posts()) {
    return stillness_render_featured_waitlist();
  }

  $query->the_post();
  $product = wc_get_product(get_the_ID());

  if (!$product) {
    wp_reset_postdata();
    return '';
  }

  $in_stock = $product->is_in_stock();
  $title = get_the_title();
  $permalink = get_permalink();
  $image = stillness_get_event_image_url($product, 'large');
  $short_desc = $product->get_short_description();
  $meta_items = stillness_get_event_meta_items($product);
  $sold_out_class = $in_stock ? '' : ' is-sold-out';
  $cta_html = $in_stock
    ? '<a href="' . esc_url($permalink) . '" class="stillness-feat-btn">Reserve Your Space</a>'
    : '<a href="#notify" class="stillness-feat-btn stillness-feat-btn--waitlist">Join Waitlist</a>';

  wp_reset_postdata();

  ob_start();
  ?>
  <div id="events" class="stillness-featured-event<?php echo esc_attr($sold_out_class); ?>">
    <div class="stillness-feat-img-wrap">
      <img class="stillness-feat-img" src="<?php echo esc_url($image); ?>" alt="<?php echo esc_attr($title); ?>">
      <?php if (!$in_stock): ?>
        <span class="stillness-feat-sold-badge">Sold Out</span>
      <?php endif; ?>
    </div>
    <div class="stillness-feat-text">
      <span class="stillness-feat-label">Next Available Session</span>
      <h2 class="stillness-feat-title"><?php echo esc_html($title); ?></h2>
      <?php if ($meta_items): ?>
        <div class="stillness-feat-attrs">
          <?php foreach ($meta_items as $label => $value): ?>
            <div class="stillness-feat-attr">
              <span><?php echo esc_html($label); ?></span>
              <strong><?php echo esc_html($value); ?></strong>
            </div>
          <?php endforeach; ?>
        </div>
      <?php endif; ?>
      <?php if ($short_desc): ?>
        <div class="stillness-feat-desc"><?php echo wp_kses_post(wpautop($short_desc)); ?></div>
      <?php endif; ?>
      <?php echo $cta_html; ?>
    </div>
  </div>
  <?php
  return ob_get_clean();
}

function stillness_render_featured_waitlist()
{
  ob_start();
  ?>
  <div id="events" class="stillness-featured-event stillness-featured-event--waitlist">
    <div class="stillness-feat-waitlist-panel">
      <span>New Dates</span>
    </div>
    <div class="stillness-feat-text">
      <span class="stillness-feat-label">Next Available Session</span>
      <h2 class="stillness-feat-title">New Retreat Dates Coming Soon</h2>
      <div class="stillness-feat-desc">
        <p>New retreat dates are being curated with care.</p>
        <p>Join the waitlist to be notified when the next Stillness immersion opens.</p>
      </div>
      <a href="#notify" class="stillness-feat-btn stillness-feat-btn--waitlist">Join Waitlist</a>
    </div>
  </div>
  <?php
  return ob_get_clean();
}

function stillness_render_event_grid($atts)
{
  $atts = shortcode_atts(array('limit' => 3), $atts, 'stillness_event_grid');
  $query = stillness_get_events_query($atts['limit']);

  if (!$query->have_posts()) {
    return '<div class="stillness-events-empty"><h3>New immersions are being planned.</h3><p>Join the waitlist below to be the first to know when new dates are released.</p></div>';
  }

  ob_start();
  ?>
  <div class="stillness-event-grid">
    <?php while ($query->have_posts()):
      $query->the_post(); ?>
      <?php
      $product = wc_get_product(get_the_ID());
      if (!$product) {
        continue;
      }

      $title = get_the_title();
      $permalink = get_permalink();
      $image = stillness_get_event_image_url($product, 'medium_large');
      $in_stock = $product->is_in_stock();
      $meta_items = stillness_get_event_meta_items($product);
      $excerpt = wp_trim_words(wp_strip_all_tags($product->get_short_description()), 22, '...');
      ?>
      <a class="stillness-event-card<?php echo $in_stock ? '' : ' is-sold-out'; ?>"
        href="<?php echo esc_url($permalink); ?>">
        <div class="stillness-card-img-wrap">
          <img class="stillness-card-img" src="<?php echo esc_url($image); ?>" alt="<?php echo esc_attr($title); ?>">
          <?php if (!$in_stock): ?>
            <span class="stillness-card-sold-badge">Sold Out</span>
          <?php endif; ?>
        </div>
        <div class="stillness-card-content">
          <?php if ($meta_items): ?>
            <div class="stillness-card-meta">
              <?php foreach ($meta_items as $label => $value): ?>
                <span><em><?php echo esc_html($label); ?></em><?php echo esc_html($value); ?></span>
              <?php endforeach; ?>
            </div>
          <?php endif; ?>
          <h3 class="stillness-card-title"><?php echo esc_html($title); ?></h3>
          <?php if ($excerpt): ?>
            <p class="stillness-card-desc"><?php echo esc_html($excerpt); ?></p>
          <?php endif; ?>
          <div class="stillness-card-footer">
            <span class="stillness-card-price"><?php echo wp_kses_post($product->get_price_html()); ?></span>
            <span class="stillness-card-cta"><?php echo $in_stock ? 'View Details &rarr;' : 'Sold Out'; ?></span>
          </div>
        </div>
      </a>
    <?php endwhile; ?>
  </div>
  <?php
  wp_reset_postdata();

  return ob_get_clean();
}

// =========================================================
// PHASE 3: Single Event Page - Warm Band
// Reads WC custom attributes and renders a styled 3-col strip
// Hooks before the product title on the single product page.
// =========================================================
add_action('woocommerce_before_single_product_summary', 'stillness_render_warm_band', 5);

function stillness_render_warm_band()
{
  // Only run on single event products
  if (!is_product())
    return;
  if (!has_term('events', 'product_cat'))
    return;

  global $product;
  if (!$product)
    $product = wc_get_product(get_the_ID());

  $dates = $product->get_attribute('Event Dates');
  $duration = $product->get_attribute('Duration');
  $sanctuary = $product->get_attribute('Sanctuary');

  // If none of the attributes are set, don't output the band at all
  if (!$dates && !$duration && !$sanctuary)
    return;

  ?>
  <div class="stillness-warm-band">
    <?php if ($dates): ?>
      <div class="stillness-warm-item">
        <span class="stillness-warm-num">I</span>
        <span class="stillness-warm-title">Dates</span>
        <span class="stillness-warm-body"><?php echo esc_html($dates); ?></span>
      </div>
    <?php endif; ?>
    <?php if ($duration): ?>
      <div class="stillness-warm-item">
        <span class="stillness-warm-num">II</span>
        <span class="stillness-warm-title">Duration</span>
        <span class="stillness-warm-body"><?php echo esc_html($duration); ?></span>
      </div>
    <?php endif; ?>
    <?php if ($sanctuary): ?>
      <div class="stillness-warm-item">
        <span class="stillness-warm-num">III</span>
        <span class="stillness-warm-title">Sanctuary</span>
        <span class="stillness-warm-body"><?php echo esc_html($sanctuary); ?></span>
      </div>
    <?php endif; ?>
  </div>
  <?php
}

// =========================================================
// PHASE 3: Rename "Add to Cart" to "Book Ticket" on events
// =========================================================
add_filter('woocommerce_product_single_add_to_cart_text', 'stillness_rename_book_ticket');

function stillness_rename_book_ticket($text)
{
  if (is_product() && has_term('events', 'product_cat')) {
    return 'Book Ticket';
  }
  return $text;
}

// =========================================================
// PHASE 4: Strip checkout fields for virtual-only carts
// =========================================================
add_filter('woocommerce_checkout_fields', 'stillness_simplify_virtual_checkout');

function stillness_simplify_virtual_checkout($fields)
{
  $has_physical = false;
  foreach (WC()->cart->get_cart() as $cart_item) {
    if (!$cart_item['data']->is_virtual()) {
      $has_physical = true;
      break;
    }
  }

  if (!$has_physical) {
    unset($fields['billing']['billing_company']);
    unset($fields['billing']['billing_address_1']);
    unset($fields['billing']['billing_address_2']);
    unset($fields['billing']['billing_city']);
    unset($fields['billing']['billing_postcode']);
    unset($fields['billing']['billing_country']);
    unset($fields['billing']['billing_state']);
    unset($fields['billing']['billing_phone']);
    unset($fields['shipping']);
  }

  return $fields;
}

// =========================================================
// PHASE 3: Single Event Page CSS - injected via wp_head
// Scoped to body.product_cat-events - retail shop safe
// =========================================================
add_action('wp_head', 'stillness_single_event_styles');

function stillness_single_event_styles()
{
  if (!is_product() || !has_term('events', 'product_cat'))
    return;
  ?>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

    /* --- HERO GALLERY --- */
    body.product_cat-events .woocommerce-product-gallery {
      width: 100% !important;
      max-width: 100% !important;
      margin: 0 !important;
    }

    body.product_cat-events .woocommerce-product-gallery__wrapper img {
      width: 100% !important;
      max-height: 580px !important;
      object-fit: cover !important;
      border-radius: 0 !important;
      animation: sp-slowzoom 16s ease forwards !important;
    }

    @keyframes sp-slowzoom {
      from {
        transform: scale(1.06);
      }

      to {
        transform: scale(1.0);
      }
    }

    body.product_cat-events .woocommerce-product-gallery__trigger,
    body.product_cat-events .flex-control-thumbs {
      display: none !important;
    }

    /* --- WARM BAND --- */
    .stillness-warm-band {
      display: grid !important;
      grid-template-columns: repeat(3, 1fr) !important;
      padding: 44px 0 !important;
      background: #F0E4D0 !important;
      border-top: 0.5px solid rgba(196, 187, 180, 0.5) !important;
      border-bottom: 0.5px solid rgba(196, 187, 180, 0.5) !important;
    }

    .stillness-warm-item {
      padding: 0 44px !important;
      border-right: 0.5px solid rgba(196, 149, 90, 0.25) !important;
      display: flex !important;
      flex-direction: column !important;
      gap: 4px !important;
    }

    .stillness-warm-item:first-child {
      padding-left: 4rem !important;
    }

    .stillness-warm-item:last-child {
      border-right: none !important;
    }

    .stillness-warm-num {
      font-family: 'Cormorant Garamond', serif !important;
      font-size: 11px !important;
      color: #C4935A !important;
      letter-spacing: 0.2em !important;
      font-weight: 500 !important;
    }

    .stillness-warm-title {
      font-family: 'Cormorant Garamond', serif !important;
      font-size: 20px !important;
      font-weight: 300 !important;
      color: #0E1B30 !important;
      line-height: 1.3 !important;
    }

    .stillness-warm-body {
      font-family: 'Jost', sans-serif !important;
      font-size: 12px !important;
      line-height: 1.6 !important;
      color: #3D4F57 !important;
      letter-spacing: 0.02em !important;
    }

    /* --- PRODUCT TITLE --- */
    body.product_cat-events .product_title.entry-title {
      font-family: 'Cormorant Garamond', serif !important;
      font-size: clamp(32px, 4vw, 52px) !important;
      font-weight: 300 !important;
      color: #0E1B30 !important;
      line-height: 1.1 !important;
      margin-bottom: 16px !important;
    }

    /* --- PRICE --- */
    body.product_cat-events p.price {
      font-family: 'Jost', sans-serif !important;
      font-size: 20px !important;
      font-weight: 400 !important;
      color: #688F9D !important;
      margin-bottom: 24px !important;
    }

    /* --- SHORT DESCRIPTION --- */
    body.product_cat-events .woocommerce-product-details__short-description {
      font-family: 'Jost', sans-serif !important;
      font-size: 13px !important;
      line-height: 2 !important;
      color: rgba(14, 27, 48, 0.65) !important;
      margin-bottom: 32px !important;
    }

    body.product_cat-events .woocommerce-product-details__short-description p {
      margin: 0 !important;
    }

    /* --- LONG DESCRIPTION --- */
    body.product_cat-events .woocommerce-Tabs-panel--description p {
      font-family: 'Jost', sans-serif !important;
      font-size: 14px !important;
      line-height: 1.95 !important;
      color: #3D4F57 !important;
      margin-bottom: 1.2rem !important;
    }

    body.product_cat-events .woocommerce-Tabs-panel--description h2,
    body.product_cat-events .woocommerce-Tabs-panel--description h3 {
      font-family: 'Cormorant Garamond', serif !important;
      font-weight: 300 !important;
      color: #0E1B30 !important;
      margin-top: 2rem !important;
      margin-bottom: 0.75rem !important;
    }

    /* --- QUANTITY SELECTOR --- */
    body.product_cat-events #se-wc-form-inject form.cart {
      display: flex !important;
      flex-direction: column !important;
      gap: 16px !important;
      align-items: flex-start !important;
      margin-bottom: 24px !important;
      width: 100% !important;
    }

    body.product_cat-events #se-wc-form-inject form.cart .quantity.stillness-handled {
      display: none !important;
      visibility: hidden !important;
      width: 0 !important;
      height: 0 !important;
      min-width: 0 !important;
      min-height: 0 !important;
      overflow: hidden !important;
      opacity: 0 !important;
      margin: 0 !important;
      padding: 0 !important;
      border: 0 !important;
      pointer-events: none !important;
    }

    body.product_cat-events #se-wc-form-inject form.cart .quantity.stillness-handled input.qty {
      display: none !important;
      visibility: hidden !important;
      background: transparent !important;
      color: transparent !important;
      border: 0 !important;
      box-shadow: none !important;
    }

    body.product_cat-events #se-wc-form-inject .stillness-pristine-wrapper {
      display: flex !important;
      flex-direction: column !important;
      gap: 8px !important;
      width: 120px !important;
      max-width: 100% !important;
      margin: 0 !important;
      padding: 0 !important;
    }

    body.product_cat-events #se-wc-form-inject .pristine-label {
      font-family: 'Jost', sans-serif !important;
      font-size: 9px !important;
      letter-spacing: 0.15em !important;
      text-transform: uppercase !important;
      color: #7A8F96 !important;
      font-weight: 500 !important;
    }

    body.product_cat-events #se-wc-form-inject .pristine-selectors {
      display: flex !important;
      border: 0.5px solid rgba(14, 27, 48, 0.15) !important;
      border-radius: 2px !important;
      overflow: hidden !important;
      width: 120px !important;
      height: 40px !important;
      margin: 0 !important;
      padding: 0 !important;
      box-sizing: border-box !important;
      background: transparent !important;
    }

    body.product_cat-events #se-wc-form-inject .pristine-btn {
      width: 40px !important;
      height: 40px !important;
      border: none !important;
      background: transparent !important;
      color: #0E1B30 !important;
      cursor: pointer !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      font-size: 14px !important;
      transition: background 0.2s !important;
      padding: 0 !important;
      margin: 0 !important;
      box-sizing: border-box !important;
    }

    body.product_cat-events #se-wc-form-inject .pristine-btn:hover:not(:disabled) {
      background: rgba(217, 232, 235, 0.3) !important;
    }

    body.product_cat-events #se-wc-form-inject .pristine-btn:disabled {
      color: rgba(14, 27, 48, 0.25) !important;
      cursor: not-allowed !important;
    }

    body.product_cat-events #se-wc-form-inject .pristine-display {
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      width: 40px !important;
      height: 40px !important;
      border: none !important;
      border-left: 0.5px solid rgba(14, 27, 48, 0.15) !important;
      border-right: 0.5px solid rgba(14, 27, 48, 0.15) !important;
      text-align: center !important;
      font-family: 'Jost', sans-serif !important;
      font-size: 13px !important;
      font-weight: 400 !important;
      color: #0E1B30 !important;
      background: transparent !important;
      padding: 0 !important;
      margin: 0 !important;
      flex: 1 !important;
      box-sizing: border-box !important;
    }


    /* --- BOOK TICKET BUTTON --- */
    body.product_cat-events .single_add_to_cart_button {
      background: #0E1B30 !important;
      color: #F7F0EC !important;
      border: none !important;
      border-radius: 2px !important;
      padding: 16px 40px !important;
      font-family: 'Jost', sans-serif !important;
      font-size: 10px !important;
      font-weight: 500 !important;
      letter-spacing: 0.25em !important;
      text-transform: uppercase !important;
      transition: background 0.3s ease, transform 0.2s ease !important;
      line-height: 1 !important;
      width: 100% !important;
      text-align: center !important;
    }

    body.product_cat-events .single_add_to_cart_button:hover {
      background: #1D3152 !important;
      transform: translateY(-2px) !important;
    }

    /* --- SOLD OUT / IN STOCK STATES --- */
    body.product_cat-events .stock.out-of-stock {
      font-family: 'Jost', sans-serif !important;
      font-size: 9px !important;
      letter-spacing: 0.25em !important;
      text-transform: uppercase !important;
      color: #A4B2BA !important;
    }

    body.product_cat-events .stock.in-stock {
      font-family: 'Jost', sans-serif !important;
      font-size: 9px !important;
      letter-spacing: 0.2em !important;
      text-transform: uppercase !important;
      color: #688F9D !important;
    }

    /* --- HIDE RETAIL ELEMENTS --- */
    body.product_cat-events .product_meta,
    body.product_cat-events .woocommerce-tabs .tabs,
    body.product_cat-events .star-rating,
    body.product_cat-events .woocommerce-review-link {
      display: none !important;
    }

    /* Show description panel without tab nav */
    body.product_cat-events .woocommerce-tabs .woocommerce-Tabs-panel--description {
      display: block !important;
      border: none !important;
      padding: 0 !important;
      margin-top: 2rem !important;
    }

    /* --- RELATED EVENTS --- */
    body.product_cat-events .related.products h2 {
      font-family: 'Cormorant Garamond', serif !important;
      font-size: 28px !important;
      font-weight: 300 !important;
      color: #0E1B30 !important;
      text-align: center !important;
      margin-bottom: 32px !important;
    }

    /* --- RESPONSIVE --- */
    @media (max-width: 768px) {
      .stillness-warm-band {
        grid-template-columns: 1fr !important;
        padding: 32px 1.5rem !important;
      }

      .stillness-warm-item {
        padding: 0 !important;
        border-right: none !important;
        border-bottom: 0.5px solid rgba(196, 149, 90, 0.15) !important;
        padding-bottom: 20px !important;
        margin-bottom: 20px !important;
      }

      .stillness-warm-item:last-child {
        border-bottom: none !important;
        padding-bottom: 0 !important;
        margin-bottom: 0 !important;
      }

      body.product_cat-events .product_title.entry-title {
        font-size: 30px !important;
      }

      body.product_cat-events .woocommerce-product-gallery__wrapper img {
        max-height: 300px !important;
      }
    }
  </style>
  <script>
    (function () {
      var installQueued = false;

      function isRealNumber(value) {
        return typeof value === 'number' && isFinite(value);
      }

      function numberFromAttr(value, fallback) {
        var number = parseFloat(value);
        return isRealNumber(number) ? number : fallback;
      }

      function getCurrentQuantity(input) {
        var min = numberFromAttr(input.getAttribute('min'), 1);
        return numberFromAttr(input.value, min);
      }

      function installPristineQuantities() {
        if (!document.body.classList.contains('product_cat-events')) return;

        var scope = document.getElementById('se-wc-form-inject') || document.querySelector('.se-card-form');
        if (!scope) return;

        var qtyWrappers = scope.querySelectorAll('form.cart .quantity');
        qtyWrappers.forEach(function (qtyDiv) {
          var input = qtyDiv.querySelector('input.qty, input[name="quantity"]');
          if (!input) return;

          var form = qtyDiv.closest('form.cart');
          if (!form) return;

          qtyDiv.classList.add('stillness-handled');
          qtyDiv.classList.add('styled');
          qtyDiv.style.setProperty('display', 'none', 'important');
          qtyDiv.style.setProperty('visibility', 'hidden', 'important');

          var wrapper = qtyDiv.previousElementSibling;
          if (!wrapper || !wrapper.classList.contains('stillness-pristine-wrapper')) {
            wrapper = document.createElement('div');
            wrapper.className = 'stillness-pristine-wrapper';
            qtyDiv.parentNode.insertBefore(wrapper, qtyDiv);
          }

          Array.prototype.slice.call(form.querySelectorAll('.stillness-pristine-wrapper')).forEach(function (candidate) {
            if (candidate !== wrapper) candidate.remove();
          });

          if (wrapper.stillnessQtyInput === input && typeof wrapper.stillnessSyncDisplay === 'function') {
            wrapper.stillnessSyncDisplay();
            return;
          }

          wrapper.innerHTML = '<span class="pristine-label">Quantity</span><div class="pristine-selectors"><button type="button" class="pristine-btn pristine-btn-minus" aria-label="Decrease quantity">-</button><div class="pristine-display" aria-live="polite"></div><button type="button" class="pristine-btn pristine-btn-plus" aria-label="Increase quantity">+</button></div>';

          var btnMinus = wrapper.querySelector('.pristine-btn-minus');
          var btnPlus = wrapper.querySelector('.pristine-btn-plus');
          var displayVal = wrapper.querySelector('.pristine-display');

          function syncDisplay() {
            var min = numberFromAttr(input.getAttribute('min'), 1);
            var max = numberFromAttr(input.getAttribute('max'), Infinity);
            var current = getCurrentQuantity(input);

            if (current < min) current = min;
            if (current > max) current = max;

            input.value = String(current);
            displayVal.textContent = String(current);
            btnMinus.disabled = current <= min;
            btnPlus.disabled = current >= max;
          }

          function setQuantity(nextValue) {
            var min = numberFromAttr(input.getAttribute('min'), 1);
            var max = numberFromAttr(input.getAttribute('max'), Infinity);
            var step = numberFromAttr(input.getAttribute('step'), 1);
            var next = isRealNumber(nextValue) ? nextValue : min;

            if (step > 0) {
              next = Math.round(next / step) * step;
            }

            if (next < min) next = min;
            if (next > max) next = max;

            input.value = String(next);
            input.dispatchEvent(new Event('input', { bubbles: true }));
            input.dispatchEvent(new Event('change', { bubbles: true }));
            syncDisplay();
          }

          btnMinus.addEventListener('click', function (event) {
            event.preventDefault();
            var step = numberFromAttr(input.getAttribute('step'), 1);
            setQuantity(getCurrentQuantity(input) - step);
          });

          btnPlus.addEventListener('click', function (event) {
            event.preventDefault();
            var step = numberFromAttr(input.getAttribute('step'), 1);
            setQuantity(getCurrentQuantity(input) + step);
          });

          input.addEventListener('change', syncDisplay);
          input.addEventListener('input', syncDisplay);
          wrapper.stillnessQtyInput = input;
          wrapper.stillnessSyncDisplay = syncDisplay;
          syncDisplay();
        });
      }

      function queueInstall() {
        if (installQueued) return;
        installQueued = true;
        var frame = window.requestAnimationFrame || function (callback) {
          return window.setTimeout(callback, 16);
        };

        frame(function () {
          installQueued = false;
          installPristineQuantities();
        });
      }

      function startObserver() {
        if (startObserver.started || !window.MutationObserver || !document.body) return;
        startObserver.started = true;
        var observer = new MutationObserver(queueInstall);
        observer.observe(document.body, { childList: true, subtree: true });
      }

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', queueInstall);
        document.addEventListener('DOMContentLoaded', startObserver);
      } else {
        queueInstall();
        startObserver();
      }

      window.addEventListener('load', queueInstall);
      [100, 300, 800, 1500, 3000].forEach(function (delay) {
        window.setTimeout(queueInstall, delay);
      });
    })();
  </script>
  <?php
}

// =========================================================
// PHASE 5: Custom Event Email Confirmation
// Replaces WooCommerce customer order emails with a branded
// Stillness email for orders containing Events products.
// Works entirely via Code Snippets — no template file needed.
// =========================================================

/**
 * Check if an order contains an 'Events' product.
 */
function stillness_order_has_event( $order ) {
	if ( ! $order ) {
		return false;
	}
	foreach ( $order->get_items() as $item ) {
		$product = $item->get_product();
		if ( $product && has_term( 'events', 'product_cat', $product->get_id() ) ) {
			return true;
		}
	}
	return false;
}

/**
 * Get the first event product from an order.
 */
function stillness_get_first_event_from_order( $order ) {
	if ( ! $order ) {
		return null;
	}
	foreach ( $order->get_items() as $item ) {
		$product = $item->get_product();
		if ( $product && has_term( 'events', 'product_cat', $product->get_id() ) ) {
			return array(
				'product' => $product,
				'item'    => $item,
			);
		}
	}
	return null;
}

/**
 * Build the full branded Stillness event email HTML.
 * Uses the design from events-ticket/snippets/email-template.html.
 */
function stillness_build_event_email_html( $order ) {
	// 1. Get first name with safe fallbacks.
	$first_name = $order->get_billing_first_name();
	if ( empty( $first_name ) ) {
		$first_name = $order->get_formatted_billing_full_name();
	}
	if ( empty( $first_name ) ) {
		$first_name = 'there';
	}

	// 2. Get event details from the first event product.
	$event_data      = stillness_get_first_event_from_order( $order );
	$order_item_name = '';
	$event_date      = '';
	$event_time      = '';
	$event_location  = '';

	if ( $event_data ) {
		$item    = $event_data['item'];
		$product = $event_data['product'];

		$order_item_name = $item->get_name();

		if ( function_exists( 'stillness_get_event_attribute' ) && $product ) {
			$event_date     = stillness_get_event_attribute( $product, 'Event Dates' );
			$event_time     = stillness_get_event_attribute( $product, 'Event Time' );
			$event_location = stillness_get_event_attribute( $product, 'Sanctuary' );
		}
	}

	// Fallback: if product was deleted, item name is still stored on the order item.
	if ( empty( $order_item_name ) ) {
		foreach ( $order->get_items() as $fallback_item ) {
			$order_item_name = $fallback_item->get_name();
			if ( ! empty( $order_item_name ) ) {
				break;
			}
		}
	}

	// Format Date & Time safely — no dangling comma.
	$date_time_display = '';
	if ( $event_date && $event_time ) {
		$date_time_display = esc_html( $event_date ) . ', ' . esc_html( $event_time );
	} elseif ( $event_date ) {
		$date_time_display = esc_html( $event_date );
	} elseif ( $event_time ) {
		$date_time_display = esc_html( $event_time );
	}

	// 3. Order details.
	$order_number = $order->get_order_number();
	$order_total  = $order->get_formatted_order_total();

	// 4. Build the email HTML using output buffering.
	ob_start();
	?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Stillness — Booking Confirmation</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Jost:wght@300;400;500&display=swap');

  body, table, td, p, a {
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
  }
  body {
    margin: 0;
    padding: 0;
    background-color: #C4BBB4;
    font-family: 'Jost', Helvetica, Arial, sans-serif;
  }
  .heading-font {
    font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
  }
  a { text-decoration: none; }

  @media only screen and (max-width: 600px) {
    .container { width: 100% !important; }
    .px { padding-left: 24px !important; padding-right: 24px !important; }
    .hero-line { font-size: 28px !important; line-height: 36px !important; }
  }
</style>
</head>
<body style="margin:0; padding:0; background-color:#C4BBB4;">

  <!-- Outer wrapper -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#C4BBB4;">
    <tr>
      <td align="center" style="padding: 32px 16px;">

        <!-- Email container -->
        <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px; max-width:600px; background-color:#FFFFFF;">

          <!-- Header -->
          <tr>
            <td align="center" style="padding: 40px 40px 28px 40px;">
              <div class="heading-font" style="font-size: 30px; line-height: 1; letter-spacing: 0.06em; color:#1D3152; font-weight:500;">
                Stillness<span style="color:#688F9D;">.</span>
              </div>
              <div style="margin-top: 10px; font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color:#688F9D; font-weight:400;">
                A Sanctuary for the Modern Mind
              </div>
            </td>
          </tr>

          <!-- Ripple divider -->
          <tr>
            <td style="line-height:0; font-size:0;">
              <svg viewBox="0 0 600 48" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" style="display:block; width:100%; height:48px;">
                <path d="M0,22 C100,40 200,4 300,20 C400,36 500,6 600,24 L600,48 L0,48 Z" fill="#D9E8EB"/>
                <path d="M0,30 C120,12 240,42 360,26 C460,12 540,34 600,22 L600,48 L0,48 Z" fill="#A4B2BA" opacity="0.55"/>
              </svg>
            </td>
          </tr>

          <!-- Hero message -->
          <tr>
            <td align="center" class="px" style="padding: 36px 48px 12px 48px; background-color:#FFFFFF;">
              <div class="heading-font hero-line" style="font-size: 34px; line-height: 42px; font-style: italic; font-weight: 500; color:#1D3152;">
                Your space has been held.
              </div>
              <p style="margin: 16px 0 0 0; font-size: 15px; line-height: 26px; color:#1D3152;">
                Thank you, <?php echo esc_html( $first_name ); ?>, for choosing to return to your center.
                Below are the details of your reservation.
              </p>
            </td>
          </tr>

          <!-- Order details card -->
          <tr>
            <td class="px" style="padding: 24px 48px 8px 48px; background-color:#FFFFFF;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#D9E8EB; border:1px solid #C4BBB4; border-radius:6px;">
                <tr>
                  <td style="padding: 24px 28px;">

                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="padding-bottom: 14px;">
                          <div style="font-size:10px; letter-spacing:0.18em; text-transform:uppercase; color:#688F9D; font-weight:500;">Session</div>
                          <div class="heading-font" style="font-size:20px; color:#1D3152; font-weight:500; margin-top:2px;"><?php echo esc_html( $order_item_name ); ?></div>
                        </td>
                      </tr>
                      <?php if ( $date_time_display ) : ?>
                      <tr>
                        <td style="padding-bottom: 14px;">
                          <div style="font-size:10px; letter-spacing:0.18em; text-transform:uppercase; color:#688F9D; font-weight:500;">Date &amp; Time</div>
                          <div style="font-size:15px; color:#1D3152; margin-top:2px;"><?php echo wp_kses_post( $date_time_display ); ?></div>
                        </td>
                      </tr>
                      <?php endif; ?>
                      <?php if ( $event_location ) : ?>
                      <tr>
                        <td style="padding-bottom: 14px;">
                          <div style="font-size:10px; letter-spacing:0.18em; text-transform:uppercase; color:#688F9D; font-weight:500;">Sanctuary</div>
                          <div style="font-size:15px; color:#1D3152; margin-top:2px;"><?php echo esc_html( $event_location ); ?></div>
                        </td>
                      </tr>
                      <?php endif; ?>
                      <tr>
                        <td style="border-top:1px solid #C4BBB4; padding-top:14px;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="font-size:13px; color:#1D3152;">Order #<?php echo esc_html( $order_number ); ?></td>
                              <td align="right" style="font-size:15px; color:#1D3152; font-weight:500;"><?php echo wp_kses_post( $order_total ); ?></td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Gentle notes -->
          <tr>
            <td class="px" style="padding: 28px 48px 40px 48px; background-color:#FFFFFF;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid #D9E8EB;">
                <tr>
                  <td style="padding-top:24px;">
                    <div style="font-size:10px; letter-spacing:0.18em; text-transform:uppercase; color:#688F9D; font-weight:500; margin-bottom:10px;">
                      A Few Things to Hold
                    </div>
                    <p style="margin:0 0 8px 0; font-size:14px; line-height:24px; color:#1D3152;">
                      Arrive ten minutes early to settle in. Wear something soft and comfortable. Bring water, and an open mind.
                    </p>
                    <p style="margin:0; font-size:14px; line-height:24px; color:#1D3152;">
                      If anything changes, simply reply to this email. We will take care of it.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Closing line -->
          <tr>
            <td align="center" style="padding: 0 48px 40px 48px; background-color:#FFFFFF;">
              <div class="heading-font" style="font-size:18px; font-style:italic; color:#688F9D; line-height:28px;">
                Stillness is not a luxury.<br>It is where you begin again.
              </div>
            </td>
          </tr>

          <!-- Ripple divider, inverted -->
          <tr>
            <td style="line-height:0; font-size:0;">
              <svg viewBox="0 0 600 36" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" style="display:block; width:100%; height:36px;">
                <path d="M0,10 C150,28 300,2 450,16 C500,21 550,12 600,14 L600,0 L0,0 Z" fill="#0E1B30"/>
                <path d="M0,18 C140,4 320,30 480,12 C520,8 560,16 600,10 L600,0 L0,0 Z" fill="#1D3152" opacity="0.5"/>
              </svg>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 28px 40px 36px 40px; background-color:#0E1B30;">
              <div class="heading-font" style="font-size:18px; color:#FFFFFF; letter-spacing:0.05em; margin-bottom:10px;">
                Stillness Curated Retreats
              </div>
              <div style="font-size:12px; line-height:22px; color:#A4B2BA;">
                Vancouver, BC &nbsp;&middot;&nbsp; info@wearestillness.com
              </div>
              <div style="margin-top:14px; font-size:11px; letter-spacing:0.1em; text-transform:uppercase;">
                <a href="https://www.instagram.com/stillnessco/" style="color:#688F9D;">Instagram</a>
                <span style="color:#1D3152;">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                <a href="https://wearestillness.substack.com/" style="color:#688F9D;">Journal</a>
              </div>
              <div style="margin-top:18px; font-size:11px; line-height:18px; color:#1D3152;">
                You're receiving this email because of a recent booking with Stillness.
              </div>
            </td>
          </tr>

        </table>
        <!-- End email container -->

      </td>
    </tr>
  </table>

</body>
</html>
	<?php
	return ob_get_clean();
}

/**
 * Track whether the current email being sent is for an event order.
 * WooCommerce calls trigger() → get_content() → send() in sequence.
 * We hook into the email trigger to capture context before send() runs.
 */
add_action( 'woocommerce_email_before_order_table', 'stillness_capture_event_email_context', 10, 4 );
function stillness_capture_event_email_context( $order, $sent_to_admin, $plain_text, $email ) {
	// Only capture for customer-facing processing/completed emails.
	if ( $sent_to_admin ) {
		return;
	}
	if ( ! in_array( $email->id, array( 'customer_processing_order', 'customer_completed_order', 'customer_on_hold_order', 'customer_invoice' ), true ) ) {
		return;
	}
	if ( stillness_order_has_event( $order ) ) {
		// Store the order for the mail_content filter to pick up.
		$GLOBALS['stillness_event_email_order'] = $order;
	}
}

/**
 * Replace the entire email HTML right before WooCommerce sends it.
 * woocommerce_mail_content fires in WC_Email::send() after style_inline().
 * It receives the full rendered HTML as its only argument.
 */
add_filter( 'woocommerce_mail_content', 'stillness_replace_event_email_content' );
function stillness_replace_event_email_content( $message ) {
	if ( ! isset( $GLOBALS['stillness_event_email_order'] ) ) {
		return $message;
	}

	$order = $GLOBALS['stillness_event_email_order'];

	// Clear immediately to prevent leaking into subsequent emails.
	unset( $GLOBALS['stillness_event_email_order'] );

	// Safety: verify the order is valid.
	if ( ! $order || ! is_a( $order, 'WC_Order' ) ) {
		return $message;
	}

	return stillness_build_event_email_html( $order );
}

/**
 * Override the email subject line for event orders.
 * Makes the subject say "Your space has been held" instead of the
 * default WooCommerce "Your {site_title} order has been received!".
 */
add_filter( 'woocommerce_email_subject_customer_processing_order', 'stillness_event_email_subject', 10, 2 );
add_filter( 'woocommerce_email_subject_customer_completed_order', 'stillness_event_email_subject', 10, 2 );
add_filter( 'woocommerce_email_subject_customer_on_hold_order', 'stillness_event_email_subject', 10, 2 );
function stillness_event_email_subject( $subject, $order ) {
	if ( stillness_order_has_event( $order ) ) {
		return 'Your space has been held — Stillness';
	}
	return $subject;
}

// =========================================================
// PHASE 5: Elementor Single Event Template — PHP Shortcodes
// Used inside HTML widgets in the Elementor Theme Builder
// Single Product template sections. Elementor processes
// do_shortcode() on every HTML widget on the front-end, so
// these render server-side — no JavaScript required.
// =========================================================

add_shortcode('se_event_title', function () {
  return esc_html(get_the_title());
});

add_shortcode('se_event_image', function () {
  global $product;
  if (!$product) {
    $product = wc_get_product(get_the_ID());
  }
  return $product ? esc_url(stillness_get_event_image_url($product, 'full')) : '';
});

add_shortcode('se_event_attr', function ($atts) {
  $atts = shortcode_atts(['name' => ''], $atts);
  if (!$atts['name'])
    return '';
  global $product;
  if (!$product) {
    $product = wc_get_product(get_the_ID());
  }
  return $product ? esc_html(stillness_get_event_attribute($product, $atts['name'])) : '';
});

add_shortcode('se_event_price', function () {
  global $product;
  if (!$product) {
    $product = wc_get_product(get_the_ID());
  }
  return $product ? wp_kses_post($product->get_price_html()) : '';
});

add_shortcode('se_event_stock', function () {
  global $product;
  if (!$product) {
    $product = wc_get_product(get_the_ID());
  }
  if (!$product)
    return '';
  if (!$product->is_in_stock()) {
    return '<span class="se-stock-badge se-stock-sold-out">SOLD OUT</span>';
  }
  $qty = $product->get_stock_quantity();
  if ($qty !== null && $qty > 0) {
    return '<span class="se-stock-badge se-stock-limited"><span class="se-badge-dot"></span>Only ' . absint($qty) . ' spots remaining</span>';
  }
  return '<span class="se-stock-badge se-stock-avail"><span class="se-badge-dot"></span>Spots Available</span>';
});

add_shortcode('se_event_short_desc', function () {
  global $product;
  if (!$product) {
    $product = wc_get_product(get_the_ID());
  }
  return $product ? wp_kses_post($product->get_short_description()) : '';
});

add_shortcode('se_event_desc', function () {
  global $product;
  if (!$product) {
    $product = wc_get_product(get_the_ID());
  }
  return $product ? wp_kses_post($product->get_description()) : '';
});

add_shortcode('se_event_add_to_cart_form', function () {
  global $product;
  if (!$product) {
    $product = wc_get_product(get_the_ID());
  }
  if (!$product)
    return '';

  ob_start();
  woocommerce_template_single_add_to_cart();
  return ob_get_clean();
});

// =========================================================
// PHASE 5: Events Catalog - Past Events Counter Ribbon
// Dynamic data: 59 + count of published events
// =========================================================
add_shortcode('stillness_past_events_counter', function () {
  $args = array(
    'post_type' => 'product',
    'post_status' => 'publish',
    'posts_per_page' => -1,
    'fields' => 'ids',
    'tax_query' => array(
      array(
        'taxonomy' => 'product_cat',
        'field' => 'slug',
        'terms' => 'events',
      ),
    ),
  );
  $query = new WP_Query($args);
  $current_events_count = $query->found_posts;
  $total_events = 59 + $current_events_count;

  ob_start();
  ?>
  <section class="ec-counter-ribbon ec-reveal">
    <div class="ec-counter-content">
      <span class="ec-counter-num"><?php echo esc_html($total_events); ?>+</span>
      <span class="ec-counter-text">Events Hosted</span>
    </div>
  </section>
  <?php
  return ob_get_clean();
});

// =========================================================
// Ensure category class is added to body on single product pages
// =========================================================
add_filter('body_class', 'stillness_add_category_body_class');
function stillness_add_category_body_class($classes)
{
  if (is_product()) {
    global $post;
    if (isset($post->ID)) {
      $terms = get_the_terms($post->ID, 'product_cat');
      if ($terms && !is_wp_error($terms)) {
        foreach ($terms as $term) {
          $classes[] = 'product_cat-' . $term->slug;
        }
      }
    }
  }
  return $classes;
}

// =========================================================
// PHASE 5: Single Event FAQ Shortcode
// Dynamically generates FAQ from WooCommerce product attributes (Q1/A1, Q2/A2...)
// =========================================================
add_shortcode('stillness_event_faq', function() {
    global $product;
    if (!$product) {
        $product = wc_get_product(get_the_ID());
    }
    if (!$product) {
        return '';
    }

    $faqs = [];
    for ($i = 1; $i <= 30; $i++) {
        $q = stillness_get_event_attribute($product, 'Q' . $i);
        $a = stillness_get_event_attribute($product, 'A' . $i);
        
        if (!empty(trim($q)) && !empty(trim($a))) {
            $faqs[] = [
                'q' => trim($q),
                'a' => trim($a),
                'num' => str_pad($i, 2, '0', STR_PAD_LEFT)
            ];
        }
    }

    if (empty($faqs)) {
        return '';
    }

    ob_start();
    ?>
    <section class="stillness-event-faq">
      <div class="stillness-event-faq__container">
        <div class="stillness-event-faq__header">
          <h2>Frequently Asked <em>Questions</em></h2>
        </div>
        
        <div class="stillness-event-faq__list">
          <?php foreach ($faqs as $faq): ?>
          <div class="stillness-event-faq__item">
            <div class="stillness-event-faq__num"><?php echo esc_html($faq['num']); ?></div>
            <div class="stillness-event-faq__content">
              <h4><?php echo esc_html($faq['q']); ?></h4>
              <p><?php echo wp_kses_post($faq['a']); ?></p>
            </div>
          </div>
          <?php endforeach; ?>
        </div>
      </div>
    </section>

    <style>
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Jost:wght@200;300;400;500;600&display=swap');

    :root {
      --event-stone: #0E1B30;
      --event-seafoam: #688F9D;
      --event-wave: #A4B2BA;
      --event-breeze: #D9E8EB;
      --event-cream: #F7F0EC;
      --event-midnight: #1D3152;
    }

    .stillness-event-faq {
      padding: 160px 0 !important;
      background: var(--event-stone) !important;
      width: 100vw !important;
      position: relative !important;
      left: 50% !important;
      right: 50% !important;
      margin-left: -50vw !important;
      margin-right: -50vw !important;
    }

    .stillness-event-faq,
    .stillness-event-faq * {
      box-sizing: border-box !important;
    }

    .stillness-event-faq__container {
      max-width: 900px !important;
      margin: 0 auto !important;
      padding: 0 4rem !important;
    }

    .stillness-event-faq__header {
      margin-bottom: 80px !important;
    }

    .stillness-event-faq__header h2 {
      font-family: 'Cormorant Garamond', serif !important;
      font-size: clamp(36px, 5vw, 56px) !important;
      font-weight: 300 !important;
      color: var(--event-cream) !important;
      line-height: 1.1 !important;
      margin: 0 !important;
    }

    .stillness-event-faq__header h2 em {
      font-style: italic !important;
      color: var(--event-seafoam) !important;
    }

    .stillness-event-faq__list {
      display: flex !important;
      flex-direction: column !important;
    }

    .stillness-event-faq__item {
      border-bottom: 0.5px solid var(--event-midnight) !important;
      padding: 48px 0 !important;
      display: grid !important;
      grid-template-columns: 60px 1fr !important;
      gap: 24px !important;
      transition: all 0.5s ease !important;
    }

    .stillness-event-faq__item:first-child {
      border-top: 0.5px solid var(--event-midnight) !important;
    }

    .stillness-event-faq__item:hover {
      border-bottom-color: var(--event-seafoam) !important;
    }

    .stillness-event-faq__num {
      font-family: 'Jost', sans-serif !important;
      font-size: 13px !important;
      font-weight: 400 !important;
      color: var(--event-seafoam) !important;
      letter-spacing: 0.15em !important;
      margin-top: 8px !important;
    }

    .stillness-event-faq__content h4 {
      font-family: 'Cormorant Garamond', serif !important;
      font-size: 28px !important;
      font-weight: 300 !important;
      color: var(--event-cream) !important;
      margin: 0 0 16px 0 !important;
      transition: color 0.4s ease !important;
      line-height: 1.3 !important;
    }

    .stillness-event-faq__item:hover .stillness-event-faq__content h4 {
      color: var(--event-seafoam) !important;
    }

    .stillness-event-faq__content p {
      font-family: 'Jost', sans-serif !important;
      font-size: 16px !important;
      line-height: 1.9 !important;
      color: var(--event-wave) !important;
      font-weight: 300 !important;
      max-width: 700px !important;
      margin: 0 !important;
    }

    @media(max-width: 768px) {
      .stillness-event-faq {
        padding: 80px 24px !important;
      }
      .stillness-event-faq__container {
        padding: 0 !important;
      }
      .stillness-event-faq__item {
        grid-template-columns: 1fr !important;
        gap: 16px !important;
        padding: 40px 0 !important;
      }
      .stillness-event-faq__num {
        margin-top: 0 !important;
      }
      .stillness-event-faq__content h4 {
        font-size: 24px !important;
      }
    }
    </style>
    <?php
    return ob_get_clean();
});
