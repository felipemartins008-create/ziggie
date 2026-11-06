const sharp = require('sharp');
const path = require('path');

async function measureBody() {
  const { data, info } = await sharp(path.join(__dirname, '../public/images/snapmaker-u1-banner.png'))
    .raw()
    .toBuffer({ resolveWithObject: true });

  // In the mid section of the printer body (y: 600 to 900)
  // Let's find where the white cube body is
  let cubeMinX = 9999, cubeMaxX = 0;
  for (let y = 650; y < 900; y++) {
    for (let x = 0; x < info.width; x++) {
      const idx = (y * info.width + x) * info.channels;
      const r = data[idx], g = data[idx+1], b = data[idx+2], a = data[idx+3];
      // White / off-white printer casing (r > 200, g > 200, b > 200, a > 200)
      if (a > 200 && r > 210 && g > 210 && b > 210) {
        if (x < cubeMinX) cubeMinX = x;
        if (x > cubeMaxX) cubeMaxX = x;
      }
    }
  }

  console.log(`Cube body: x=${cubeMinX}..${cubeMaxX}, width=${cubeMaxX - cubeMinX}, center=${(cubeMinX + cubeMaxX) / 2}`);
  
  // Left spool sticks out at x around 200 to cubeMinX
  // Right spool sticks out at x around cubeMaxX to 1100
  // Left spool outer edge:
  let leftSpoolX = 9999;
  for (let y = 400; y < 1000; y++) {
    for (let x = 0; x < cubeMinX; x++) {
      const idx = (y * info.width + x) * info.channels;
      if (data[idx+3] > 150) {
        if (x < leftSpoolX) leftSpoolX = x;
      }
    }
  }

  let rightSpoolX = 0;
  for (let y = 400; y < 1000; y++) {
    for (let x = cubeMaxX; x < info.width; x++) {
      const idx = (y * info.width + x) * info.channels;
      if (data[idx+3] > 150) {
        if (x > rightSpoolX) rightSpoolX = x;
      }
    }
  }

  console.log(`Left spool edge: x=${leftSpoolX}`);
  console.log(`Right spool edge: x=${rightSpoolX}`);
  console.log(`Hardware bounds (without shadow): x=${leftSpoolX}..${rightSpoolX}, center=${(leftSpoolX + rightSpoolX) / 2}`);
}

measureBody().catch(console.error);
