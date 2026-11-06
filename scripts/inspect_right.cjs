const sharp = require('sharp');
const path = require('path');

async function inspectRightSide() {
  const { data, info } = await sharp(path.join(__dirname, '../public/images/snapmaker-u1-banner.png'))
    .raw()
    .toBuffer({ resolveWithObject: true });

  // For columns x = 800 to 1200, find what pixels are there
  for (let x = 850; x < info.width; x += 30) {
    let solidPixels = 0;
    let shadowPixels = 0;
    for (let y = 0; y < info.height; y++) {
      const idx = (y * info.width + x) * info.channels;
      const alpha = data[idx + 3];
      if (alpha > 200) solidPixels++;
      else if (alpha > 10) shadowPixels++;
    }
    console.log(`Column x=${x}: solid=${solidPixels}, shadow=${shadowPixels}`);
  }
}

inspectRightSide().catch(console.error);
