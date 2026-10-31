<?php
/**
 * Stillness Diagnostic Quiz — private WordPress configuration
 *
 * Paste this as a separate PHP snippet in Code Snippets. Run everywhere.
 * Replace the two quoted placeholder values in WordPress only. Do not commit
 * live credentials to this repository.
 */

if (!defined('STILLNESS_MAILERLITE_KEY')) {
    define('STILLNESS_MAILERLITE_KEY', 'PASTE_MAILERLITE_API_TOKEN_HERE');
}

if (!defined('STILLNESS_MAILERLITE_GROUP')) {
    define('STILLNESS_MAILERLITE_GROUP', 'PASTE_MAILERLITE_GROUP_ID_HERE');
}

/* Only change this if the result page does not use the `your-prescription` slug. */
if (!defined('STILLNESS_QUIZ_RESULT_URL')) {
    define('STILLNESS_QUIZ_RESULT_URL', 'https://stillnesscuratedretreats.com/your-prescription/');
}
