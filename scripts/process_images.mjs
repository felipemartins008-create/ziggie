import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const userUploadedDir = 'C:/Users/ACER/.gemini/antigravity/brain/c368de48-47c7-49c5-a52f-61f227d9630b/.user_uploaded';
const outputDir = 'e:/APLICATIVOS/3D/public/images';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function processAll() {
  console.log('Processing images...');

  // 1. Process Brand Identity (Ziggie)
  const brandImg = path.join(userUploadedDir, 'media_1792413003328_0491f1e6.jpg');
  
  // Entire Brand Sheet
  await sharp(brandImg).toFile(path.join(outputDir, 'ziggie-brand-identity.jpg'));

  // Main Ziggie Logo cropped (Center)
  await sharp(brandImg)
    .extract({ left: 220, top: 320, width: 510, height: 350 })
    .toFile(path.join(outputDir, 'ziggie-logo-cropped.png'));

  // Zi icon
  await sharp(brandImg)
    .extract({ left: 50, top: 160, width: 100, height: 140 })
    .toFile(path.join(outputDir, 'ziggie-icon-zi.png'));

  // Ziggie branded spool
  await sharp(brandImg)
    .extract({ left: 740, top: 50, width: 250, height: 280 })
    .toFile(path.join(outputDir, 'ziggie-filament-spool.png'));

  // Ziggie branded box
  await sharp(brandImg)
    .extract({ left: 750, top: 370, width: 240, height: 260 })
    .toFile(path.join(outputDir, 'ziggie-box-packaging.png'));

  // ZG Extrusion graphic
  await sharp(brandImg)
    .extract({ left: 760, top: 670, width: 230, height: 240 })
    .toFile(path.join(outputDir, 'ziggie-extrusion-zg.png'));

  // 2. Banner Showcase (Snapmaker U1)
  const bannerImg = path.join(userUploadedDir, 'media_1792412454871_90363c41.png');
  await sharp(bannerImg).toFile(path.join(outputDir, 'snapmaker-u1-banner.png'));

  // 3. Category Feature Cards (Bambu Lab & Snapmaker)
  const catImg = path.join(userUploadedDir, 'media_1792412433425_3784556e.png');
  await sharp(catImg).toFile(path.join(outputDir, 'featured-brands-banner.png'));

  // 4. Printers 6-Grid (1024x748)
  const printers6Img = path.join(userUploadedDir, 'media_1792412440949_63a8f6e2.png');
  // Row 1 (height ~360)
  await sharp(printers6Img)
    .extract({ left: 75, top: 10, width: 275, height: 355 })
    .toFile(path.join(outputDir, 'printer-bambu-a2l.png'));
  await sharp(printers6Img)
    .extract({ left: 370, top: 10, width: 280, height: 355 })
    .toFile(path.join(outputDir, 'printer-bambu-a1.png'));
  await sharp(printers6Img)
    .extract({ left: 670, top: 10, width: 275, height: 355 })
    .toFile(path.join(outputDir, 'printer-bambu-a1-mini.png'));

  // Row 2 (top ~375, height ~360)
  await sharp(printers6Img)
    .extract({ left: 75, top: 375, width: 275, height: 360 })
    .toFile(path.join(outputDir, 'printer-bambu-x2d.png'));
  await sharp(printers6Img)
    .extract({ left: 370, top: 375, width: 280, height: 360 })
    .toFile(path.join(outputDir, 'printer-bambu-h2d.png'));
  await sharp(printers6Img)
    .extract({ left: 670, top: 375, width: 275, height: 360 })
    .toFile(path.join(outputDir, 'printer-bambu-h2s.png'));

  // 5. Printers 2-Grid (1024x545)
  const printers2Img = path.join(userUploadedDir, 'media_1792412448890_475e9e41.png');
  await sharp(printers2Img)
    .extract({ left: 140, top: 60, width: 345, height: 420 })
    .toFile(path.join(outputDir, 'printer-bambu-h2c.png'));
  await sharp(printers2Img)
    .extract({ left: 520, top: 60, width: 345, height: 420 })
    .toFile(path.join(outputDir, 'printer-bambu-p2s.png'));


  // 6. Filaments: Bambu Lab PLA Lite (remove watermarks at bottom)
  const bambuFilament = path.join(userUploadedDir, 'media_1792412462975_6d0ee640.png');
  await sharp(bambuFilament)
    .extract({ left: 10, top: 10, width: 990, height: 860 }) // removes bottom watermark & 1000x1000 tag
    .toFile(path.join(outputDir, 'filament-bambulab-pla-lite.png'));

  // 7. Filaments: PrintaLot PLA Preto (REMOVED competitor ecommerce pricing & text!)
  const printalotImg = path.join(userUploadedDir, 'media_1792412491848_77286890.png');
  await sharp(printalotImg)
    .extract({ left: 15, top: 90, width: 524, height: 500 }) // cropped cleanly, no text below!
    .toFile(path.join(outputDir, 'filament-printalot-pla-preto.png'));

  // 8. Filaments: Sunlu
  const sunluImg = path.join(userUploadedDir, 'media_1792412497928_6ae7c42d.png');
  await sharp(sunluImg)
    .toFile(path.join(outputDir, 'filament-sunlu-white.png'));

  // 9. Filaments: Panchroma Magenta
  const panchromaImg = path.join(userUploadedDir, 'media_1792412512134_d7101a5f.png');
  await sharp(panchromaImg)
    .toFile(path.join(outputDir, 'filament-panchroma-magenta.png'));

  console.log('All images processed successfully!');
}

processAll().catch(console.error);
