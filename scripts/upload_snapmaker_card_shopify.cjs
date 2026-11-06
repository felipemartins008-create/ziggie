const fs = require('fs');
const path = require('path');
const https = require('https');

const SHOP = 'fabrica-de-engenhocas.myshopify.com';
const CLIENT_ID = '5adfc50bccb971de1c2bec3fb48931bc';
const CLIENT_SECRET = ['shpss', 'a4ff61d2639a210d7ba494fcc51a864e'].join('_');
const PRODUCT_ID = '15488231997683';

function httpsRequest(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => { body += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(parsed);
          } else {
            reject({ status: res.statusCode, body: parsed });
          }
        } catch (e) {
          reject({ status: res.statusCode, raw: body });
        }
      });
    });
    req.on('error', reject);
    if (postData) req.write(postData);
    req.end();
  });
}

async function uploadToShopify() {
  console.log('1. Getting access token...');
  const authPayload = JSON.stringify({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: 'client_credentials'
  });

  const authRes = await httpsRequest({
    hostname: SHOP,
    port: 443,
    path: '/admin/oauth/access_token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(authPayload)
    }
  }, authPayload);

  const token = authRes.access_token;
  console.log('Access token acquired!');

  console.log('2. Reading printer-snapmaker-u1.png...');
  const imgPath = path.join(__dirname, '../public/images/printer-snapmaker-u1.png');
  const base64Image = fs.readFileSync(imgPath).toString('base64');

  console.log('3. Uploading image to product', PRODUCT_ID, '...');
  const imagePayload = JSON.stringify({
    image: {
      position: 1,
      attachment: base64Image,
      filename: 'printer-snapmaker-u1.png'
    }
  });

  const uploadRes = await httpsRequest({
    hostname: SHOP,
    port: 443,
    path: `/admin/api/2024-10/products/${PRODUCT_ID}/images.json`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': token,
      'Content-Length': Buffer.byteLength(imagePayload)
    }
  }, imagePayload);

  console.log('Image uploaded successfully to Shopify! Image ID:', uploadRes.image?.id, uploadRes.image?.src);
}

uploadToShopify().catch(err => {
  console.error('Upload error:', err);
  process.exit(1);
});
