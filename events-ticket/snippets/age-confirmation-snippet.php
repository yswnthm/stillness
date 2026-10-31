<?php
/**
 * Stillness Co. - WooCommerce Age Confirmation Checkbox (August 21 Event)
 *
 * Requirements:
 * - Appears ONLY for the specified August 21 Event Product ID.
 * - Displays required checkbox: "By checking this, you verify that you and all your other guests (if any) belong in the age group 18–29."
 * - Server-side validation prevents adding to cart without confirmation.
 * - Saves confirmation into cart item data & order line item meta for client record keeping.
 * - Leaves all other products completely untouched.
 * - Easily removable after August 21.
 *
 * How to find your Product ID in WordPress:
 * 1. Go to WP Admin > Products.
 * 2. Hover over the August 21 Event product name.
 * 3. The ID is shown next to the title (e.g., ID: 1234) or in the URL (post=1234).
 * 4. Update AUGUST_21_EVENT_PRODUCT_ID constant below with that numeric ID.
 */

if ( ! defined( 'AUGUST_21_EVENT_PRODUCT_ID' ) ) {
    define( 'AUGUST_21_EVENT_PRODUCT_ID', 7061 ); // Product ID for August 21 Event
}

/**
 * 1. Display Age Confirmation Checkbox on Product Page
 */
add_action( 'woocommerce_before_add_to_cart_button', 'stillness_display_age_confirmation_checkbox', 15 );
function stillness_display_age_confirmation_checkbox() {
    global $product;

    if ( ! $product ) {
        return;
    }

    $product_id = $product->get_id();

    // Show only for the August 21 Event
    if ( (int) $product_id !== (int) AUGUST_21_EVENT_PRODUCT_ID ) {
        return;
    }

    $checked = isset( $_POST['stillness_age_confirmation'] ) && $_POST['stillness_age_confirmation'] === '1' ? 'checked' : '';
    ?>
    <div class="stillness-age-confirmation-wrapper">
        <label for="stillness_age_confirmation" class="stillness-age-confirmation-label">
            <input type="checkbox" 
                   name="stillness_age_confirmation" 
                   id="stillness_age_confirmation" 
                   value="1" 
                   required 
                   <?php echo $checked; ?> />
            <span>By checking this, you verify that you and all your other guests (if any) belong in the age group 18–29. <span class="required">*</span></span>
        </label>
    </div>
    <?php
}

/**
 * 2. Server-Side Add to Cart Validation
 */
add_filter( 'woocommerce_add_to_cart_validation', 'stillness_validate_age_confirmation', 10, 3 );
function stillness_validate_age_confirmation( $passed, $product_id, $quantity ) {
    if ( (int) $product_id === (int) AUGUST_21_EVENT_PRODUCT_ID ) {
        if ( empty( $_POST['stillness_age_confirmation'] ) ) {
            wc_add_notice( __( 'Please verify that you and all your guests (if any) belong to the 18–29 age group before booking.', 'woocommerce' ), 'error' );
            return false;
        }
    }
    return $passed;
}

/**
 * 3. Store Confirmation in Cart Item Data
 */
add_filter( 'woocommerce_add_cart_item_data', 'stillness_add_age_confirmation_to_cart_item', 10, 3 );
function stillness_add_age_confirmation_to_cart_item( $cart_item_data, $product_id, $variation_id ) {
    if ( (int) $product_id === (int) AUGUST_21_EVENT_PRODUCT_ID && ! empty( $_POST['stillness_age_confirmation'] ) ) {
        $cart_item_data['stillness_age_confirmation'] = 'Verified (18–29 Age Group)';
    }
    return $cart_item_data;
}

/**
 * 4. Display Confirmation in Cart & Checkout Item Meta
 */
add_filter( 'woocommerce_get_item_data', 'stillness_display_age_confirmation_in_cart', 10, 2 );
function stillness_display_age_confirmation_in_cart( $item_data, $cart_item ) {
    if ( isset( $cart_item['stillness_age_confirmation'] ) ) {
        $item_data[] = array(
            'key'   => __( 'Age Group Confirmation', 'woocommerce' ),
            'value' => wc_clean( $cart_item['stillness_age_confirmation'] ),
        );
    }
    return $item_data;
}

/**
 * 5. Save Confirmation to WooCommerce Order Line Item Meta
 */
add_action( 'woocommerce_checkout_create_order_line_item', 'stillness_save_age_confirmation_to_order_item', 10, 4 );
function stillness_save_age_confirmation_to_order_item( $item, $cart_item_key, $values, $order ) {
    if ( isset( $values['stillness_age_confirmation'] ) ) {
        $item->add_meta_data( __( 'Age Group Confirmation', 'woocommerce' ), $values['stillness_age_confirmation'], true );
    }
}

/**
 * 6. Scoped Styling for Age Confirmation Checkbox
 */
add_action( 'wp_head', 'stillness_age_confirmation_styles' );
function stillness_age_confirmation_styles() {
    if ( ! is_product() ) {
        return;
    }
    global $post;
    if ( ! $post || (int) $post->ID !== (int) AUGUST_21_EVENT_PRODUCT_ID ) {
        return;
    }
    ?>
    <style id="stillness-age-confirmation-css">
        .stillness-age-confirmation-wrapper {
            margin: 18px 0 22px 0;
            padding: 16px 18px;
            background: #F7F0EC;
            border: 1px solid rgba(196, 187, 180, 0.6);
            border-radius: 4px;
        }

        .stillness-age-confirmation-label {
            display: flex !important;
            align-items: flex-start !important;
            gap: 12px !important;
            cursor: pointer !important;
            margin: 0 !important;
            font-family: 'Jost', sans-serif !important;
            font-size: 13px !important;
            line-height: 1.55 !important;
            color: #0E1B30 !important;
            font-weight: 400 !important;
            letter-spacing: normal !important;
            text-transform: none !important;
        }

        .stillness-age-confirmation-label input[type="checkbox"] {
            margin-top: 2px !important;
            accent-color: #688F9D !important;
            width: 17px !important;
            height: 17px !important;
            flex-shrink: 0 !important;
            cursor: pointer !important;
        }

        .stillness-age-confirmation-label .required {
            color: #C4935A !important;
            font-weight: 600 !important;
            text-decoration: none !important;
        }
    </style>
    <?php
}
