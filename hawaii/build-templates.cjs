const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'index.html');
const outDir = path.join(__dirname, 'hawaii-templates');

const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

const styleMatch = htmlContent.match(/<style>([\s\S]*?)<\/style>/);
let fullCss = styleMatch ? styleMatch[1] : '';

// ─────────────────────────────────────────────────────────────
// STEP 1: SAFE TRANSFORMS ON RAW CSS BEFORE PREFIXING
// ─────────────────────────────────────────────────────────────

// Remove global resets — these WILL break WordPress/Elementor if left in
fullCss = fullCss.replace(/\*,\*::before,\*::after\s*\{[^\}]+\}/g, '');
// Remove html{} global
fullCss = fullCss.replace(/(?<![-\w])html\s*\{[^\}]+\}\n?/g, '');
// Replace body{} with .hw-wrapper{} — scoped, not global
fullCss = fullCss.replace(/(?<![-\w])body\s*\{([^\}]+)\}/g, '.hw-wrapper{$1}');
// Remove overflow-x:hidden from .hw-wrapper — it breaks position:sticky children
fullCss = fullCss.replace(/(\.hw-wrapper\{[^\}]*)overflow-x:hidden;?/, '$1');

// ─────────────────────────────────────────────────────────────
// STEP 2: PREFIX ALL CSS CLASSES SAFELY
// Prefix only class selectors (starting with .) NOT element/pseudo selectors.
// The regex below targets .classname but NOT things like body, nav, h2, etc.
// Also correctly handles compound selectors like .glass-body
// ─────────────────────────────────────────────────────────────
fullCss = fullCss.replace(/\.([-a-zA-Z_][-a-zA-Z0-9_]*)/g, '.hw-$1');

// ─────────────────────────────────────────────────────────────
// STEP 3: FIX ELEMENT-LEVEL SELECTORS IN COMPONENT CSS
// The original CSS uses bare element selectors like "nav{}", "h2{}" scoped
// inside component blocks. We need to scope them to .hw-wrapper to avoid
// polluting the global WordPress page.
// ─────────────────────────────────────────────────────────────
// Scope bare nav, h2 etc. that were NOT already prefixed
fullCss = fullCss.replace(/^nav\{/gm, '.hw-wrapper nav{');
fullCss = fullCss.replace(/^nav\./gm, '.hw-wrapper nav.');
// Scope bare element selectors used inside section CSS blocks
fullCss = fullCss.replace(/\.hw-crisis-content h2\b/g, '.hw-crisis-content h2');
fullCss = fullCss.replace(/\.hw-crisis-content h2 em\b/g, '.hw-crisis-content h2 em');

// ─────────────────────────────────────────────────────────────
// STEP 4: ADD !important TO FONT-FAMILY ONLY (per Elementor guide)
// ─────────────────────────────────────────────────────────────
fullCss = fullCss.replace(/font-family:([^;!}]+);/g, 'font-family:$1 !important;');

// ─────────────────────────────────────────────────────────────
// STEP 5: EXTRACT SECTION-SPECIFIC CSS BLOCKS
// Split by the comment markers in the original CSS
// ─────────────────────────────────────────────────────────────
const cssBlocks = fullCss.split(/\/\*\s*───\s*(.*?)\s*───\s*\*\//g);

let globalCss = cssBlocks[0].trim();
let cssSections = {};

// Separate out media queries from the last block
let lastContent = cssBlocks[cssBlocks.length - 1] || '';
let mediaQueries = '';
const mqMatch = lastContent.match(/([\s\S]*?)(@media[\s\S]*)/);
if (mqMatch) {
  cssBlocks[cssBlocks.length - 1] = mqMatch[1];
  mediaQueries = mqMatch[2];
}

for (let i = 1; i < cssBlocks.length; i += 2) {
  const name = cssBlocks[i].trim();
  const content = (cssBlocks[i + 1] || '').trim();
  if (name && content) {
    cssSections[name] = content;
  }
}

// ─────────────────────────────────────────────────────────────
// STEP 6: EXTRACT HTML SECTIONS
// ─────────────────────────────────────────────────────────────
const sectionsRegex = /<!-- (.*?) -->\n([\s\S]*?)(?=<!--|<\/body>|<script>)/g;
let match;
const sections = [];
while ((match = sectionsRegex.exec(htmlContent)) !== null) {
  const title = match[1].trim();
  const content = match[2].trim();
  if (content) {
    sections.push({ title, content });
  }
}

// ─────────────────────────────────────────────────────────────
// STEP 7: MAP SECTIONS TO THEIR CSS COMMENT KEYS
// ─────────────────────────────────────────────────────────────
const sectionMap = {
  nav: 'NAV',
  hero: 'HERO',
  crisis: 'QUIET CRISIS',
  pillars: 'PROTOCOL PILLARS',
  strip: 'VISUAL STRIP',
  itinerary: 'ITINERARY',
  dashboard: 'BIOMETRIC TRACKING',
  inclusions: 'INCLUSIONS',
  application: 'APPLICATION FORM',
  closing: 'CLOSING CTA',
  footer: 'FOOTER',
};

function getShortTitle(title) {
  if (title.includes('Fixed Navigation')) return 'nav';
  if (title.includes('Hero')) return 'hero';
  if (title.includes('Quiet Crisis')) return 'crisis';
  if (title.includes('Protocol Pillars')) return 'pillars';
  if (title.includes('Visual Strip')) return 'strip';
  if (title.includes('Itinerary')) return 'itinerary';
  if (title.includes('Biometric')) return 'dashboard';
  if (title.includes('Inclusions')) return 'inclusions';
  if (title.includes('Application Form')) return 'application';
  if (title.includes('Closing CTA')) return 'closing';
  if (title.includes('Footer')) return 'footer';
  return title.split(' ')[0].replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
}

// ─────────────────────────────────────────────────────────────
// STEP 8: PREFIX HTML CLASSES IN CONTENT
// ─────────────────────────────────────────────────────────────
function prefixHtmlClasses(html) {
  // Prefix class attributes — handles multiple classes per element
  return html.replace(/\bclass="([^"]+)"/g, (fullMatch, classList) => {
    const prefixed = classList
      .split(/\s+/)
      .filter(Boolean)
      .map(c => `hw-${c}`)
      .join(' ');
    return `class="${prefixed}"`;
  });
}

// ─────────────────────────────────────────────────────────────
// STEP 9: BUILD AND WRITE TEMPLATES
// ─────────────────────────────────────────────────────────────
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir);
}

// Validate: check for broken class names (double-prefix artifacts)
function validateCss(css, filename) {
  const broken = css.match(/\.hw-[a-zA-Z0-9_-]*\.hw-wrapper/);
  if (broken) {
    console.error(`  ❌ BROKEN CLASS DETECTED in ${filename}: ${broken[0]}`);
    return false;
  }
  return true;
}

const fontImport = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Jost:wght@200;300;400;500&display=swap');`;

// ─── Shared reset included in every template (safe, scoped)
const scopedReset = `
*,*::before,*::after{box-sizing:border-box !important}
:root{
  --stone: #0E1B30;
  --cream: #F7F0EC;
  --warm: #F2E8DF;
  --seafoam: #688F9D;
  --wave: #A4B2BA;
  --sand: #C4BBB4;
  --amber: #C4935A;
  --midnight: #1D3152;
  --breeze: #D9E8EB;
  --text-body: #3D4F57;
}
.hw-wrapper{
  background:var(--cream);
  color:var(--stone);
  font-family:'Jost',sans-serif !important;
  font-weight:300;
}`;

sections.forEach((sec, index) => {
  const idxStr = String(index + 1).padStart(2, '0');
  const shortTitle = getShortTitle(sec.title);
  const filename = `template-hawaii-${idxStr}-${shortTitle}.json`;

  // Find the matching CSS block
  const cssKey = sectionMap[shortTitle];
  let matchingCss = '';
  if (cssKey) {
    for (const [key, val] of Object.entries(cssSections)) {
      if (key.toUpperCase().includes(cssKey.toUpperCase())) {
        matchingCss = `\n/* ─── ${key} ─── */\n${val}`;
        break;
      }
    }
  }

  // Also include @keyframes fadeUp in hero template
  let extraCss = '';
  if (shortTitle === 'hero') {
    extraCss = '\n@keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}';
  }
  if (shortTitle === 'hero') {
    extraCss += '\n@keyframes slowzoom{from{transform:scale(1.06)}to{transform:scale(1.0)}}';
  }

  const finalCss = [fontImport, scopedReset, matchingCss, extraCss, mediaQueries]
    .filter(Boolean)
    .join('\n');

  // Validate before writing
  validateCss(finalCss, filename);

  const styleBlock = `<style>\n${finalCss.trim()}\n</style>`;
  const prefixedHtml = prefixHtmlClasses(sec.content);
  const finalHtml = `<div class="hw-wrapper">\n${prefixedHtml}\n</div>\n\n${styleBlock}`;

  const templateObj = {
    content: [
      {
        id: `hawaii_${idxStr}`,
        elType: 'container',
        settings: {
          content_width: 'full',
          padding: { unit: 'px', top: '0', right: '0', bottom: '0', left: '0', isLinked: true },
        },
        elements: [
          {
            id: `hawaii_html_${idxStr}`,
            elType: 'widget',
            settings: { html: finalHtml },
            widgetType: 'html',
          },
        ],
      },
    ],
    page_settings: [],
    version: '0.4',
    title: `Hawaii — ${sec.title}`,
    type: 'section',
  };

  fs.writeFileSync(path.join(outDir, filename), JSON.stringify(templateObj, null, 2));
  console.log(`  ✅ ${filename}`);
});

console.log('\nAll templates built successfully.');
