import sharp from 'sharp';
import path from 'path';

const userUploadedDir = 'C:/Users/ACER/.gemini/antigravity/brain/c368de48-47c7-49c5-a52f-61f227d9630b/.user_uploaded';
const outputDir = 'e:/APLICATIVOS/3D/public/images';

async function cropCards() {
  const catImg = path.join(userUploadedDir, 'media_1792412433425_3784556e.png');
  await sharp(catImg)
    .extract({ left: 125, top: 48, width: 425, height: 430 })
    .toFile(path.join(outputDir, 'brand-card-bambulab.png'));

  await sharp(catImg)
    .extract({ left: 565, top: 48, width: 425, height: 430 })
    .toFile(path.join(outputDir, 'brand-card-snapmaker.png'));

  console.log('Brand cards cropped!');
}

cropCards().catch(console.error);
