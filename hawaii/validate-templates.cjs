const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'hawaii-templates');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json')).sort();
let allPassed = true;

files.forEach(f => {
  const raw = fs.readFileSync(path.join(dir, f), 'utf-8');
  const json = JSON.parse(raw);
  const html = json.content[0].elements[0].settings.html;
  const issues = [];

  // Extract CSS block
  const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
  const css = styleMatch ? styleMatch[1] : '';
  // Remove @import lines before checking CSS classes
  const cssNoImport = css.replace(/@import[^;]+;/g, '');

  // Check 1: Broken double-prefix artifact (e.g. .hw-glass-.hw-wrapper)
  const broken = cssNoImport.match(/\.hw-[a-zA-Z0-9_-]+\.hw-wrapper/);
  if (broken) issues.push('BROKEN CLASS (double-prefix): ' + broken[0]);

  // Check 2: Bare body or html global selectors
  if (/(?:^|\n|\s)body\s*\{/.test(cssNoImport)) issues.push('GLOBAL: bare body{} selector');
  if (/(?:^|\n|\s)html\s*\{/.test(cssNoImport)) issues.push('GLOBAL: bare html{} selector');

  // Check 3: font-family without !important
  const badFont = cssNoImport.match(/font-family:[^;!}]+;/g);
  if (badFont && badFont.length) issues.push('MISSING !important on: ' + badFont[0]);

  // Check 4: Unprefixed CSS class selectors
  const classSelectors = cssNoImport.match(/\.[a-zA-Z][a-zA-Z0-9_-]*/g) || [];
  const unprefixedCss = [...new Set(classSelectors.filter(c => !c.startsWith('.hw-')))];
  if (unprefixedCss.length) issues.push('UNPREFIXED CSS CLASS: ' + unprefixedCss.slice(0,3).join(', '));

  // Check 5: hw-wrapper div exists
  if (html.indexOf('class="hw-wrapper"') === -1) issues.push('MISSING hw-wrapper div');

  // Check 6: Unprefixed HTML class attributes
  const htmlOnly = html.replace(/<style>[\s\S]*?<\/style>/g, '');
  const classAttrRe = /class="([^"]+)"/g;
  let classMatch;
  const unprefixedHtml = [];
  while ((classMatch = classAttrRe.exec(htmlOnly)) !== null) {
    const classes = classMatch[1].split(/\s+/).filter(Boolean);
    const bad = classes.filter(c => !c.startsWith('hw-'));
    if (bad.length) bad.forEach(b => unprefixedHtml.push(b));
  }
  if (unprefixedHtml.length) {
    issues.push('UNPREFIXED HTML CLASS: ' + [...new Set(unprefixedHtml)].slice(0,4).join(', '));
  }

  // Check 7: JSON structure validity
  if (json.version !== '0.4') issues.push('WRONG version (not 0.4)');
  if (json.type !== 'section') issues.push('WRONG type (not section)');
  const widget = json.content && json.content[0] && json.content[0].elements && json.content[0].elements[0];
  if (!widget || widget.widgetType !== 'html') issues.push('WRONG widgetType');

  if (issues.length) {
    console.log('FAIL: ' + f);
    issues.forEach(i => console.log('  -> ' + i));
    allPassed = false;
  } else {
    console.log('PASS: ' + f);
  }
});

console.log('');
console.log(allPassed ? 'ALL CLEAR - safe to import' : 'ISSUES FOUND - do NOT import yet');
