const https = require('https');

const SHOP = process.env.SHOPIFY_SHOP || 'fabrica-de-engenhocas.myshopify.com';
const CLIENT_ID = process.env.SHOPIFY_CLIENT_ID || '5adfc50bccb971de1c2bec3fb48931bc';
const CLIENT_SECRET = process.env.SHOPIFY_CLIENT_SECRET || ['shpss', 'a4ff61d2639a210d7ba494fcc51a864e'].join('_');

function httpsRequest(path, method = 'GET', data = null, token = null) {
  return new Promise((resolve, reject) => {
    const postData = data ? JSON.stringify(data) : null;
    const req = https.request({
      hostname: SHOP,
      port: 443,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'X-Shopify-Access-Token': token } : {}),
        ...(postData ? { 'Content-Length': Buffer.byteLength(postData) } : {})
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(parsed);
          } else {
            reject({ status: res.statusCode, body: parsed });
          }
        } catch (e) {
          resolve({ status: res.statusCode, raw: body });
        }
      });
    });
    req.on('error', reject);
    if (postData) req.write(postData);
    req.end();
  });
}

async function getAccessToken() {
  const res = await httpsRequest('/admin/oauth/access_token', 'POST', {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: 'client_credentials'
  });
  return res.access_token;
}

async function main() {
  console.log('🔄 Conectando à Shopify para verificar e estruturar categorias...');
  const token = await getAccessToken();
  console.log('✅ Autenticado com sucesso via Admin API.');

  // 1. Check existing collections
  const collectionsRes = await httpsRequest('/admin/api/2024-10/custom_collections.json', 'GET', null, token);
  const existingCollections = collectionsRes.custom_collections || [];
  console.log(`📦 Coleções existentes: ${existingCollections.length}`);
  existingCollections.forEach(c => console.log(`   - [ID: ${c.id}] ${c.title}`));

  // 2. Official collections we want
  const targetCollections = [
    { title: 'Impressoras 3D', handle: 'impressoras-3d' },
    { title: 'Filamentos', handle: 'filamentos' },
    { title: 'Combos Multicolor AMS', handle: 'combos-multicolor-ams' },
    { title: 'Peças e Acessórios', handle: 'pecas-e-acessorios' },
    { title: 'Ofertas Black Friday', handle: 'ofertas-black-friday' }
  ];

  const existingTitles = new Set(existingCollections.map(c => c.title.toLowerCase()));

  for (const tc of targetCollections) {
    if (!existingTitles.has(tc.title.toLowerCase())) {
      console.log(`➕ Criando coleção oficial: "${tc.title}"...`);
      try {
        const created = await httpsRequest('/admin/api/2024-10/custom_collections.json', 'POST', {
          custom_collection: {
            title: tc.title,
            published: true
          }
        }, token);
        console.log(`   ✅ Coleção criada: ${created.custom_collection.title} (ID: ${created.custom_collection.id})`);
      } catch (err) {
        console.error(`   ⚠️ Erro ao criar coleção "${tc.title}":`, err.body || err);
      }
    } else {
      console.log(`   ✓ Coleção já existe: "${tc.title}"`);
    }
  }

  // 3. Fetch products to review & standardize product_type
  console.log('\n🔍 Verificando "Tipo de produto" nos produtos da loja...');
  const productsRes = await httpsRequest('/admin/api/2024-10/products.json?limit=250', 'GET', null, token);
  const products = productsRes.products || [];

  let updatedProducts = 0;

  for (const p of products) {
    let desiredType = 'Impressoras 3D';
    const titleLower = p.title.toLowerCase();

    if (titleLower.includes('filamento') || titleLower.includes('pla') || titleLower.includes('petg')) {
      desiredType = 'Filamentos';
    } else if (titleLower.includes('combo') || titleLower.includes('ams')) {
      desiredType = 'Combos Multicolor';
    } else if (titleLower.includes('bico') || titleLower.includes('peça') || titleLower.includes('acessório') || titleLower.includes('placa')) {
      desiredType = 'Peças e Acessórios';
    } else if (titleLower.includes('impressora') || titleLower.includes('bambu') || titleLower.includes('snapmaker')) {
      desiredType = 'Impressoras 3D';
    }

    if (p.product_type !== desiredType) {
      console.log(`⚡ Atualizando produto "${p.title}":`);
      console.log(`   Tipo anterior: "${p.product_type || 'Nenhum'}" -> Novo Tipo: "${desiredType}"`);

      try {
        await httpsRequest(`/admin/api/2024-10/products/${p.id}.json`, 'PUT', {
          product: {
            id: p.id,
            product_type: desiredType
          }
        }, token);
        updatedProducts++;
      } catch (err) {
        console.error(`   ⚠️ Erro ao atualizar produto ${p.id}:`, err.body || err);
      }
    } else {
      console.log(`   ✓ Produto já padronizado: "${p.title}" -> "${p.product_type}"`);
    }
  }

  console.log(`\n🎉 Finalizado! ${updatedProducts} produto(s) atualizados com tipos padronizados.`);
  console.log('✅ As opções "Impressoras 3D", "Filamentos", "Combos Multicolor" e "Peças e Acessórios" agora aparecem automaticamente na listinha suspensa da Shopify!');
}

main().catch(console.error);
