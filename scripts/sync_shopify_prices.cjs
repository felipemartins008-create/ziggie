const fs = require('fs');
const path = require('path');
const https = require('https');

const SHOP = process.env.SHOPIFY_SHOP || 'fabrica-de-engenhocas.myshopify.com';
const CLIENT_ID = process.env.SHOPIFY_CLIENT_ID || '5adfc50bccb971de1c2bec3fb48931bc';
const CLIENT_SECRET = process.env.SHOPIFY_CLIENT_SECRET || '';

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

async function getAccessToken() {
  const postData = JSON.stringify({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: 'client_credentials'
  });

  const res = await httpsRequest({
    hostname: SHOP,
    port: 443,
    path: '/admin/oauth/access_token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  }, postData);

  return res.access_token;
}

async function fetchShopifyProducts(token) {
  const res = await httpsRequest({
    hostname: SHOP,
    port: 443,
    path: '/admin/api/2024-10/products.json?limit=250',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': token
    }
  });

  return res.products || [];
}

async function main() {
  console.log('🔄 Conectando à Shopify para sincronizar preços...');
  try {
    const token = await getAccessToken();
    console.log('✅ Autenticado com sucesso via Admin API.');

    const products = await fetchShopifyProducts(token);
    console.log(`📦 Encontrados ${products.length} produtos na Shopify.`);

    const mappingPath = path.join(__dirname, '../src/data/shopify_mapping.json');
    let currentMapping = {};
    if (fs.existsSync(mappingPath)) {
      currentMapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));
    }

    let updatedCount = 0;

    for (const sp of products) {
      const v = sp.variants && sp.variants[0];
      if (!v) continue;

      // Find matching key in current mapping by product id or variant id or handle
      let matchedKey = null;
      for (const [key, item] of Object.entries(currentMapping)) {
        if (
          String(item.shopifyProductId) === String(sp.id) ||
          String(item.shopifyVariantId) === String(v.id) ||
          item.handle === sp.handle
        ) {
          matchedKey = key;
          break;
        }
      }

      if (matchedKey) {
        const oldP = currentMapping[matchedKey].price;
        const newP = parseFloat(v.price).toFixed(2);
        const oldComp = currentMapping[matchedKey].oldPrice;
        const newComp = v.compare_at_price ? parseFloat(v.compare_at_price).toFixed(2) : null;

        if (oldP !== newP || oldComp !== newComp) {
          console.log(`⚡ Preço atualizado: [${matchedKey}] ${sp.title}: De R$ ${oldP} -> Para R$ ${newP}`);
          updatedCount++;
        }

        currentMapping[matchedKey].price = newP;
        currentMapping[matchedKey].oldPrice = newComp;
        currentMapping[matchedKey].shopifyProductId = sp.id;
        currentMapping[matchedKey].shopifyVariantId = v.id;
        currentMapping[matchedKey].title = sp.title;
        currentMapping[matchedKey].handle = sp.handle;
      }
    }

    fs.writeFileSync(mappingPath, JSON.stringify(currentMapping, null, 2), 'utf8');
    console.log(`\n🎉 Sincronização concluída! ${updatedCount} produto(s) tiveram preços atualizados.`);
    console.log(`💾 Arquivo src/data/shopify_mapping.json salvo.`);
  } catch (err) {
    console.error('❌ Erro na sincronização:', err);
    process.exit(1);
  }
}

main();
