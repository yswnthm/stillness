<?php
/**
 * Stillness Co. — Header Script & Theme Overrides
 *
 * ADD THIS TO: wp-content/themes/YOUR-THEME/functions.php
 * (or a child theme's functions.php)
 *
 * This file handles:
 *  1. Injecting the header scroll/mobile JS via wp_footer
 *  2. Detecting page type and setting body class (dark-hero vs light-page)
 *  3. Suppressing the native theme header so it doesn't stack above Elementor
 */

// ── 1. Inject header behaviour JS on every page ───────────────────────────
add_action( 'wp_footer', 'stillness_header_script', 100 );
function stillness_header_script() {
    ?>
    <script>
    (function () {
        var header     = document.getElementById('stillness-header');
        var toggle     = document.getElementById('mobile-toggle');
        var mobileMenu = document.getElementById('mobile-menu');

        if (!header) return;

        // ── Scroll detection ──
        function onScroll() {
            header.classList.toggle('is-scrolled', window.scrollY > 50);
        }
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll(); // run immediately so state is correct at load

        // ── Mobile menu toggle ──
        if (toggle && mobileMenu) {
            toggle.addEventListener('click', function () {
                mobileMenu.classList.toggle('is-open');
            });
            mobileMenu.querySelectorAll('a').forEach(function (link) {
                link.addEventListener('click', function () {
                    mobileMenu.classList.remove('is-open');
                });
            });
        }
    })();
    </script>
    <?php
}

// ── 2. Add body class: dark-hero (home) vs light-page (all others) ────────
// CSS reads these to decide text colour on the transparent header.
add_filter( 'body_class', 'stillness_header_body_classes' );
function stillness_header_body_classes( $classes ) {
    if ( is_front_page() || is_home() ) {
        $classes[] = 'dark-hero';   // White text on dark hero
    } else {
        $classes[] = 'light-page';  // Dark text on light inner pages
    }
    return $classes;
}

// ── 3. Suppress native theme header (Hello/Storefront/Astra/OceanWP) ──────
// Elementor replaces the header visually, but some themes still render
// their default header markup. This removes it cleanly.
add_action( 'init', 'stillness_suppress_theme_header' );
function stillness_suppress_theme_header() {
    // Hello Elementor theme
    remove_action( 'hello_elementor_header', 'hello_elementor_header_callback' );
    // Storefront theme
    remove_action( 'storefront_header', 'storefront_header_container',       0  );
    remove_action( 'storefront_header', 'storefront_site_branding',          20 );
    remove_action( 'storefront_header', 'storefront_primary_navigation',     30 );
    remove_action( 'storefront_header', 'storefront_header_container_close', 41 );
}
