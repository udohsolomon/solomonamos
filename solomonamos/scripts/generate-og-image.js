const sharp = require('sharp');

const width = 1200;
const height = 630;

// Create SVG with terminal aesthetic
const svg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0a0a0a"/>
      <stop offset="100%" style="stop-color:#111111"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#00d9ff"/>
      <stop offset="100%" style="stop-color:#00d9ff;stop-opacity:0.6"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="${width}" height="${height}" fill="url(#bg)"/>

  <!-- Grid pattern -->
  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1a1a1a" stroke-width="0.5"/>
  </pattern>
  <rect width="${width}" height="${height}" fill="url(#grid)"/>

  <!-- Border -->
  <rect x="40" y="40" width="${width - 80}" height="${height - 80}" fill="none" stroke="#222" stroke-width="1"/>

  <!-- Terminal header bar -->
  <rect x="40" y="40" width="${width - 80}" height="50" fill="#111"/>
  <line x1="40" y1="90" x2="${width - 40}" y2="90" stroke="#222" stroke-width="1"/>

  <!-- Terminal dots -->
  <circle cx="75" cy="65" r="7" fill="#ff5f57" opacity="0.8"/>
  <circle cx="100" cy="65" r="7" fill="#febc2e" opacity="0.8"/>
  <circle cx="125" cy="65" r="7" fill="#28c840" opacity="0.8"/>

  <!-- Terminal title -->
  <text x="160" y="70" font-family="monospace" font-size="14" fill="#666">solomon.amos</text>

  <!-- Main content -->
  <text x="80" y="180" font-family="monospace" font-size="16" fill="#00d9ff">$ whoami</text>

  <text x="80" y="240" font-family="sans-serif" font-size="48" fill="#fafafa" font-weight="600">Solomon Amos</text>

  <text x="80" y="300" font-family="sans-serif" font-size="28" fill="#888">AI &amp; Technology Consultant</text>

  <!-- Accent line -->
  <rect x="80" y="330" width="200" height="3" fill="url(#accent)"/>

  <text x="80" y="380" font-family="monospace" font-size="16" fill="#555">// AI Strategy | Software Engineering | Automation</text>

  <!-- Bottom section -->
  <text x="80" y="440" font-family="monospace" font-size="14" fill="#00d9ff">&gt; </text>
  <text x="100" y="440" font-family="monospace" font-size="14" fill="#888">Helping businesses leverage emerging technologies</text>

  <!-- URL -->
  <text x="80" y="550" font-family="monospace" font-size="16" fill="#444">solomonamos.com</text>

  <!-- Cursor blink -->
  <rect x="100" y="460" width="10" height="20" fill="#00d9ff" opacity="0.8"/>
</svg>`;

sharp(Buffer.from(svg))
  .png()
  .toFile('public/og-image.png')
  .then(() => console.log('OG image generated at public/og-image.png'))
  .catch((err) => console.error('Error generating OG image:', err));
