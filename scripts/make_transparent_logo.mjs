import sharp from 'sharp';
import path from 'path';

const brandImg = 'C:/Users/ACER/.gemini/antigravity/brain/c368de48-47c7-49c5-a52f-61f227d9630b/.user_uploaded/media_1792413003328_0491f1e6.jpg';
const outputDir = 'e:/APLICATIVOS/3D/public/images';

async function makeTransparentLogos() {
  // 1. Crop accurately the center logo (Ziggie + 3D PRINTING + nozzle)
  // Let's get raw pixel buffer
  const { data, info } = await sharp(brandImg)
    .extract({ left: 240, top: 360, width: 480, height: 290 })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const channels = info.channels; // 4 (RGBA)

  // We want to make the background transparent, while keeping:
  // - Orange text / nozzle / lines (high red, low blue)
  // - White text "3D PRINTING" (high R, G, B)
  // Background is grayish dark (~40, ~45, ~50) with grid lines (~50, ~60, ~70)
  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const isOrange = (r > 130 && r > g * 1.3 && b < 100);
    const isWhite = (r > 160 && g > 160 && b > 160);

    if (isOrange || isWhite) {
      // Keep foreground
      data[i + 3] = 255;
    } else {
      // Check if it's antialiasing edge of orange or white
      const isOrangeEdge = (r > 80 && r > g * 1.2 && b < 80);
      const isWhiteEdge = (r > 110 && g > 110 && b > 110 && Math.abs(r - g) < 20 && Math.abs(g - b) < 20);
      
      if (isOrangeEdge) {
        data[i + 3] = Math.min(255, Math.floor((r - 50) * 3));
      } else if (isWhiteEdge) {
        data[i + 3] = Math.min(255, Math.floor((r - 80) * 3));
      } else {
        // Transparent
        data[i + 3] = 0;
      }
    }
  }

  // Save transparent PNG
  await sharp(data, {
    raw: {
      width,
      height,
      channels: 4
    }
  })
  .trim() // automatically trims transparent edges
  .toFile(path.join(outputDir, 'ziggie-logo-official-transparent.png'));

  console.log('Official transparent logo created!');

  // 2. Also create the exact "zi" symbol transparent
  const { data: ziData, info: ziInfo } = await sharp(brandImg)
    .extract({ left: 60, top: 180, width: 85, height: 110 })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < ziData.length; i += ziInfo.channels) {
    const r = ziData[i];
    const g = ziData[i + 1];
    const b = ziData[i + 2];

    const isOrange = (r > 130 && r > g * 1.3 && b < 100);
    const isWhite = (r > 160 && g > 160 && b > 160);

    if (isOrange || isWhite) {
      ziData[i + 3] = 255;
    } else {
      const isOrangeEdge = (r > 80 && r > g * 1.2 && b < 80);
      const isWhiteEdge = (r > 110 && g > 110 && b > 110);
      if (isOrangeEdge || isWhiteEdge) {
        ziData[i + 3] = 160;
      } else {
        ziData[i + 3] = 0;
      }
    }
  }

  await sharp(ziData, {
    raw: {
      width: ziInfo.width,
      height: ziInfo.height,
      channels: 4
    }
  })
  .trim()
  .toFile(path.join(outputDir, 'ziggie-zi-symbol-transparent.png'));

  console.log('Zi symbol transparent created!');
}

makeTransparentLogos().catch(console.error);
