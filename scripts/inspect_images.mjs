import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const userUploadedDir = 'C:/Users/ACER/.gemini/antigravity/brain/c368de48-47c7-49c5-a52f-61f227d9630b/.user_uploaded';

async function inspect() {
  const files = fs.readdirSync(userUploadedDir);
  for (const f of files) {
    const fullPath = path.join(userUploadedDir, f);
    const meta = await sharp(fullPath).metadata();
    console.log(`${f}: ${meta.width}x${meta.height} format=${meta.format}`);
  }
}

inspect().catch(console.error);
