import sharp from 'sharp';
import path from 'path';

const brandImg = 'C:/Users/ACER/.gemini/antigravity/brain/c368de48-47c7-49c5-a52f-61f227d9630b/.user_uploaded/media_1792413003328_0491f1e6.jpg';
const outputDir = 'e:/APLICATIVOS/3D/public/images';

async function cropExactLogos() {
  const meta = await sharp(brandImg).metadata();
  console.log('Brand image metadata:', meta);

  // 1. Crop the main center logo: "Ziggie 3D PRINTING" with the extruder nozzle and flowing lines
  // Let's crop slightly wider first to see the exact bounding box
  await sharp(brandImg)
    .extract({ left: 230, top: 350, width: 495, height: 300 })
    .toFile(path.join(outputDir, 'ziggie-main-logo-raw.png'));

  // 2. Crop the top-left icon "zi"
  await sharp(brandImg)
    .extract({ left: 60, top: 170, width: 85, height: 125 })
    .toFile(path.join(outputDir, 'ziggie-zi-symbol-raw.png'));

  console.log('Raw crops created!');
}

cropExactLogos().catch(console.error);
