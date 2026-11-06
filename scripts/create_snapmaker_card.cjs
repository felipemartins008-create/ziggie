const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function createSnapmakerCard() {
  const canvasWidth = 630;
  const canvasHeight = 800;

  // 1. Prepare machine image
  const snapmakerSrc = path.join(__dirname, '../public/images/snapmaker-u1-banner.png');
  
  // High quality resize: width: 510, height: 530
  const machineBuffer = await sharp(snapmakerSrc)
    .resize(510, 530, {
      fit: 'inside',
      withoutEnlargement: false
    })
    .toBuffer();

  const machineMeta = await sharp(machineBuffer).metadata();
  console.log('Machine resized:', machineMeta.width, 'x', machineMeta.height);

  // Effective center: 30 + (630 - 30)/2 = 330
  const machineLeft = Math.round(330 - machineMeta.width / 2);
  // Machine rests so its bottom is at y=665 (subtly overlapping the top of the badge at y=650)
  const machineTop = Math.round(665 - machineMeta.height);

  // 2. Read the authentic red button extracted from A1
  const redBtnPath = path.join(__dirname, 'red_button.png');
  const redBtnBuffer = await sharp(redBtnPath)
    .resize(56, 56, { fit: 'contain' })
    .toBuffer();

  // 3. SVG overlay for the exact matching badge and card chrome
  // Badge: left=50, top=650, width=560, height=130
  const svgOverlay = Buffer.from(`
    <svg width="${canvasWidth}" height="${canvasHeight}" viewBox="0 0 ${canvasWidth} ${canvasHeight}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="badgeShadow" x="-10%" y="-15%" width="120%" height="135%">
          <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#000000" flood-opacity="0.32"/>
        </filter>
      </defs>

      <!-- Top and bottom borders (1px) -->
      <line x1="0" y1="0.5" x2="${canvasWidth}" y2="0.5" stroke="#4a4a4a" stroke-width="1" />
      <line x1="0" y1="${canvasHeight - 0.5}" x2="${canvasWidth}" y2="${canvasHeight - 0.5}" stroke="#4a4a4a" stroke-width="1" />

      <!-- Left black stripe -->
      <rect x="0" y="0" width="30" height="${canvasHeight}" fill="#010103" />

      <!-- Badge Container -->
      <rect x="50" y="650" width="560" height="130" rx="16" ry="16" fill="#212121" filter="url(#badgeShadow)" />

      <!-- Title: Snapmaker U1 -->
      <text x="76" y="698" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" font-size="36" font-weight="700" fill="#ffffff" letter-spacing="-0.4">Snapmaker U1</text>

      <!-- Subtitle: Impressora 3D -->
      <text x="76" y="756" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" font-size="22" font-weight="400" fill="#9e9e9e">Impressora 3D</text>
    </svg>
  `);

  // Composite everything
  const finalImage = await sharp({
    create: {
      width: canvasWidth,
      height: canvasHeight,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    }
  })
  .composite([
    // 1. Machine cutout
    { input: machineBuffer, top: machineTop, left: machineLeft },
    // 2. Vector card chrome & badge with text
    { input: svgOverlay, top: 0, left: 0 },
    // 3. Authentic red button at exact matching location: left=524, top=708
    { input: redBtnBuffer, top: 708, left: 524 }
  ])
  .png({ quality: 100 })
  .toFile(path.join(__dirname, '../public/images/printer-snapmaker-u1.png'));

  console.log('printer-snapmaker-u1.png created successfully:', finalImage);
}

createSnapmakerCard().catch(console.error);
