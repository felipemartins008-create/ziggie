const fs = require('fs');
const sharp = require('sharp');

const symSvg = fs.readFileSync('public/images/ziggie-symbol.svg', 'utf8');
const wordSvg = fs.readFileSync('public/images/ziggie-wordmark.svg', 'utf8');

const symMatch = symSvg.match(/<path\s+d="([^"]+)"/);
const wordMatch = wordSvg.match(/<path\s+d="([^"]+)"/);

if (!symMatch || !wordMatch) {
  console.error('Could not find paths!');
  process.exit(1);
}

const symPath = symMatch[1];
const wordPath = wordMatch[1];

// Generate Light Logo (White text, Orange 3D Symbol)
const lightSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 860 275" width="860" height="275" fill="none">
  <defs>
    <linearGradient id="ziggieOrangeGradLight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF7A00" />
      <stop offset="55%" stop-color="#FF5500" />
      <stop offset="100%" stop-color="#E63900" />
    </linearGradient>
    <filter id="subtleGlow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#FF5500" flood-opacity="0.25" />
    </filter>
  </defs>

  <!-- 3D Symbol (Isometric layered Z ribbon in vibrant orange gradient) -->
  <g transform="translate(5, 5)" filter="url(#subtleGlow)">
    <path d="${symPath}" fill="url(#ziggieOrangeGradLight)" fill-rule="evenodd" />
  </g>

  <!-- Wordmark (Ziggie + IMPRESSÃO 3D) in Pure Crisp White -->
  <g transform="translate(268, 18)">
    <path d="${wordPath}" fill="#FFFFFF" fill-rule="evenodd" />
  </g>
</svg>
`.trim();

// Generate Dark Logo (Dark Zinc text, Orange 3D Symbol)
const darkSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 860 275" width="860" height="275" fill="none">
  <defs>
    <linearGradient id="ziggieOrangeGradDark" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF7A00" />
      <stop offset="55%" stop-color="#FF5500" />
      <stop offset="100%" stop-color="#E63900" />
    </linearGradient>
  </defs>

  <!-- 3D Symbol (Isometric layered Z ribbon in vibrant orange gradient) -->
  <g transform="translate(5, 5)">
    <path d="${symPath}" fill="url(#ziggieOrangeGradDark)" fill-rule="evenodd" />
  </g>

  <!-- Wordmark (Ziggie + IMPRESSÃO 3D) in Rich Dark Graphite -->
  <g transform="translate(268, 18)">
    <path d="${wordPath}" fill="#18181B" fill-rule="evenodd" />
  </g>
</svg>
`.trim();

fs.writeFileSync('public/images/ziggie-logo-light.svg', lightSvg);
fs.writeFileSync('public/images/ziggie-logo-dark.svg', darkSvg);
console.log('Saved ziggie-logo-light.svg and ziggie-logo-dark.svg');
