const sharp = require('sharp');
const path = require('path');

async function analyzeVisualCenter() {
  const snapmakerSrc = path.join(__dirname, '../public/images/snapmaker-u1-banner.png');
  const { data, info } = await sharp(snapmakerSrc)
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Find where the white body / main frame is (not just any faint shadow alpha > 10)
  // Shadow has low opacity (alpha < 100 or rgb close to white/grey with low saturation)
  // Solid machine has alpha > 200 and solid colors
  let solidMinX = info.width, solidMaxX = 0, solidMinY = info.height, solidMaxY = 0;
  
  // Also calculate weighted center of mass (visual centroid)
  let totalWeight = 0;
  let weightedX = 0;
  let weightedY = 0;

  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const idx = (y * info.width + x) * info.channels;
      const alpha = info.channels === 4 ? data[idx + 3] : 255;
      
      if (alpha > 150) {
        if (x < solidMinX) solidMinX = x;
        if (x > solidMaxX) solidMaxX = x;
        if (y < solidMinY) solidMinY = y;
        if (y > solidMaxY) solidMaxY = y;

        // Weight by opacity and darkness (dark/dense parts have more visual weight)
        const brightness = (data[idx] + data[idx+1] + data[idx+2]) / 3;
        const weight = (alpha / 255) * (1 - brightness / 400); // darker pixels have more visual weight
        totalWeight += weight;
        weightedX += x * weight;
        weightedY += y * weight;
      }
    }
  }

  const centroidX = weightedX / totalWeight;
  const centroidY = weightedY / totalWeight;

  console.log(`Solid machine bounds: x=${solidMinX}..${solidMaxX} (w=${solidMaxX - solidMinX + 1}), y=${solidMinY}..${solidMaxY}`);
  console.log(`Solid center X: ${(solidMinX + solidMaxX) / 2}`);
  console.log(`Visual Centroid X: ${centroidX.toFixed(1)}, Y: ${centroidY.toFixed(1)}`);
  console.log(`Original full image center X: ${info.width / 2}`);
}

analyzeVisualCenter().catch(console.error);
