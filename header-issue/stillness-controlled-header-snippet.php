/**
 * Stillness - Controlled Header Source
 *
 * Add with Code Snippets as a frontend-only PHP snippet.
 * Purpose:
 * - Render one known Stillness header outside Astra's header wrapper.
 * - Suppress Astra/native header output.
 * - Hide/remove any stale duplicate Stillness header markup.
 */

add_filter( 'astra_header_enabled', '__return_false', 999 );
add_action( 'template_redirect', 'stillness_disable_theme_header_hooks', 1 );
function stillness_disable_theme_header_hooks() {
    remove_action( 'astra_header', 'astra_header_markup' );
    remove_action( 'astra_masthead', 'astra_masthead_primary_template' );
}

add_action( 'wp_head', 'stillness_controlled_header_styles', 20 );
function stillness_controlled_header_styles() {
    if ( is_admin() ) {
        return;
    }
    ?>
    <style id="stillness-controlled-header-css">
        :root {
            --stillness-stone: #0E1B30;
            --stillness-seafoam: #688F9D;
            --stillness-cream: #FFFFFF;
            --stillness-mobile-bg: #F7F0EC;
        }

        #masthead,
        .site-header,
        .ast-mobile-header-wrap,
        .ast-primary-header-bar,
        .main-header-bar {
            display: none !important;
        }

        #stillness-header:not([data-stillness-controlled-header="true"]) {
            display: none !important;
        }

        #stillness-header[data-stillness-controlled-header="true"] {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100px;
            display: flex;
            align-items: center;
            z-index: 9999 !important;
            background: transparent;
        }

        body.admin-bar #stillness-header[data-stillness-controlled-header="true"] {
            top: 32px;
        }

        .stillness-header-inner {
            max-width: 1400px;
            width: 100%;
            margin: 0 auto;
            padding: 0 60px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-sizing: border-box;
        }

        .stillness-header-logo,
        .stillness-header-logo:visited,
        .stillness-header-logo:active,
        .stillness-header-logo:focus {
            font-family: "Cormorant Garamond", serif;
            font-size: 32px;
            font-weight: 500;
            text-decoration: none;
            color: var(--stillness-cream) !important;
            z-index: 10001;
            outline: none;
        }

        body:not(.home) #stillness-header .stillness-header-logo,
        body:not(.home) #stillness-header .stillness-header-logo:visited,
        body.mobile-menu-open .stillness-header-logo,
        body.mobile-menu-open .stillness-header-logo:visited {
            color: var(--stillness-stone) !important;
        }

        .stillness-desktop-nav {
            display: flex;
            align-items: center;
            gap: 40px;
        }

        .stillness-nav-link,
        .stillness-nav-link:visited,
        .stillness-nav-link:active,
        .stillness-nav-link:focus {
            font-family: "Lato", sans-serif;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.18em;
            text-decoration: none;
            color: var(--stillness-cream) !important;
            transition: color 0.3s ease;
            outline: none;
        }

        .stillness-nav-link:hover {
            color: var(--stillness-seafoam) !important;
        }

        body:not(.home) #stillness-header .stillness-nav-link,
        body:not(.home) #stillness-header .stillness-nav-link:visited {
            color: var(--stillness-stone) !important;
        }

        .stillness-book-btn,
        .stillness-book-btn:visited {
            font-family: "Lato", sans-serif;
            padding: 11px 30px;
            border: 1px solid var(--stillness-cream);
            border-radius: 100px;
            color: var(--stillness-cream) !important;
            text-decoration: none;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.18em;
            transition: all 0.4s ease;
        }

        .stillness-book-btn:hover {
            background: var(--stillness-cream);
            color: var(--stillness-stone) !important;
        }

        body:not(.home) #stillness-header .stillness-book-btn,
        body:not(.home) #stillness-header .stillness-book-btn:visited {
            border-color: var(--stillness-stone);
            color: var(--stillness-stone) !important;
        }

        .stillness-mobile-toggle {
            display: none;
            background: none;
            border: none;
            cursor: pointer;
            width: 28px;
            height: 20px;
            padding: 0;
            flex-direction: column;
            justify-content: space-between;
            z-index: 10001;
        }

        .stillness-mobile-toggle .stillness-bar {
            display: block;
            width: 100%;
            height: 1.5px;
            background: var(--stillness-cream);
            transition: all 0.3s ease;
        }

        body:not(.home) #stillness-header .stillness-mobile-toggle .stillness-bar {
            background: var(--stillness-stone);
        }

        .stillness-mobile-toggle.is-active .stillness-bar-1 {
            transform: translateY(9px) rotate(45deg);
            background: var(--stillness-stone) !important;
        }

        .stillness-mobile-toggle.is-active .stillness-bar-2 {
            opacity: 0;
        }

        .stillness-mobile-toggle.is-active .stillness-bar-3 {
            transform: translateY(-9px) rotate(-45deg);
            background: var(--stillness-stone) !important;
        }

        .stillness-mobile-menu {
            position: fixed !important;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: var(--stillness-mobile-bg);
            display: none;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 32px;
            z-index: 10000 !important;
        }

        .stillness-mobile-menu.is-open {
            display: flex !important;
        }

        .stillness-mobile-nav-link,
        .stillness-mobile-nav-link:visited {
            font-family: "Cormorant Garamond", serif;
            font-size: 32px;
            color: var(--stillness-stone) !important;
            text-decoration: none;
        }

        .stillness-mobile-book-btn,
        .stillness-mobile-book-btn:visited {
            font-family: "Lato", sans-serif;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.18em;
            padding: 16px 40px;
            border: 1px solid var(--stillness-stone);
            border-radius: 100px;
            color: var(--stillness-stone) !important;
            text-decoration: none;
        }

        body.mobile-menu-open {
            overflow: hidden !important;
        }

        @media (max-width: 991px) {
            .stillness-desktop-nav {
                display: none;
            }

            .stillness-mobile-toggle {
                display: flex;
            }
        }

        @media (max-width: 782px) {
            body.admin-bar #stillness-header[data-stillness-controlled-header="true"] {
                top: 46px;
            }
        }

        @media (max-width: 768px) {
            .stillness-header-inner {
                padding: 0 24px;
            }
        }
    </style>
    <?php
}

add_action( 'wp_body_open', 'stillness_render_controlled_header', 1 );
function stillness_render_controlled_header() {
    if ( is_admin() ) {
        return;
    }
    ?>
    <header id="stillness-header" class="header-root" data-stillness-controlled-header="true">
        <div class="stillness-header-inner">
            <a href="/" class="stillness-header-logo">Stillness.</a>
            <nav class="stillness-desktop-nav" aria-label="Primary navigation">
                <a href="/corporate" class="stillness-nav-link">Corporate</a>
                <a href="/sacred-offerings" class="stillness-nav-link">Sacred Offerings</a>
                <a href="/shop" class="stillness-nav-link">Shop</a>
                <a href="/blogs" class="stillness-nav-link">Blog</a>
                <a href="/about" class="stillness-nav-link">About</a>
                <a href="/reserve" class="stillness-book-btn">Book</a>
            </nav>
            <button id="stillness-mobile-toggle" class="stillness-mobile-toggle" aria-label="Toggle menu" aria-expanded="false" type="button">
                <span class="stillness-bar stillness-bar-1"></span>
                <span class="stillness-bar stillness-bar-2"></span>
                <span class="stillness-bar stillness-bar-3"></span>
            </button>
        </div>
        <nav id="stillness-mobile-menu" class="stillness-mobile-menu" aria-label="Mobile navigation">
            <a href="/#intro" class="stillness-mobile-nav-link">Philosophy</a>
            <a href="/sacred-offerings" class="stillness-mobile-nav-link">Sacred Offerings</a>
            <a href="/shop" class="stillness-mobile-nav-link">Shop</a>
            <a href="/blogs" class="stillness-mobile-nav-link">Blog</a>
            <a href="/about" class="stillness-mobile-nav-link">About</a>
            <a href="/reserve" class="stillness-mobile-book-btn">Book Session</a>
        </nav>
    </header>
    <?php
}

add_action( 'wp_footer', 'stillness_controlled_header_script', 100 );
function stillness_controlled_header_script() {
    if ( is_admin() ) {
        return;
    }
    ?>
    <script id="stillness-controlled-header-js">
    (function () {
        function setupStillnessHeader() {
            var controlledHeader = document.querySelector('#stillness-header[data-stillness-controlled-header="true"]');
            if (!controlledHeader) return;

            document.querySelectorAll('#stillness-header:not([data-stillness-controlled-header="true"])').forEach(function (node) {
                node.remove();
            });

            var toggle = document.getElementById('stillness-mobile-toggle');
            var menu = document.getElementById('stillness-mobile-menu');
            var body = document.body;

            if (window.location.pathname === '/' || body.classList.contains('home')) {
                body.classList.add('home');
            }

            if (!toggle || !menu) return;

            toggle.onclick = function (event) {
                event.preventDefault();
                menu.classList.toggle('is-open');
                toggle.classList.toggle('is-active');
                body.classList.toggle('mobile-menu-open');
                toggle.setAttribute('aria-expanded', menu.classList.contains('is-open') ? 'true' : 'false');
            };

            menu.querySelectorAll('a').forEach(function (link) {
                link.onclick = function () {
                    menu.classList.remove('is-open');
                    toggle.classList.remove('is-active');
                    body.classList.remove('mobile-menu-open');
                    toggle.setAttribute('aria-expanded', 'false');
                };
            });
        }

        setupStillnessHeader();
        window.addEventListener('load', setupStillnessHeader);
        setTimeout(setupStillnessHeader, 1000);
    })();
    </script>
    <?php
}
