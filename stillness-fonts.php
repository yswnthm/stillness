<?php
/**
 * Plugin Name: Stillness Custom Fonts Enqueue
 * Description: Enqueues Lato and Cormorant Garamond Google Fonts required by Stillness Elementor HTML widgets.
 * Version: 1.0.0
 * Author: Stillness
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Enqueue Google Fonts for the frontend.
 */
function stillness_enqueue_custom_fonts() {
    // Enqueue Cormorant Garamond (400, 500, 600, 700) and Lato (300, 400, 700)
    wp_enqueue_style( 'stillness-google-fonts', 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Lato:wght@300;400;700&display=swap', array(), null );
}

add_action( 'wp_enqueue_scripts', 'stillness_enqueue_custom_fonts' );
