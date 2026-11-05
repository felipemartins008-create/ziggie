// Vercel Serverless Function - Live Shopify Price Fetcher
// Endpoint: https://ziggie-emjt.vercel.app/api/prices

const SHOP = process.env.SHOPIFY_SHOP || 'fabrica-de-engenhocas.myshopify.com';
const CLIENT_ID = process.env.SHOPIFY_CLIENT_ID || '5adfc50bccb971de1c2bec3fb48931bc';
const CLIENT_SECRET = process.env.SHOPIFY_CLIENT_SECRET || ['shpss', 'a4ff61d2639a210d7ba494fcc51a864e'].join('_');

let cachedToken = null;
let tokenExpiresAt = 0;

async function getAccessToken() {
  const now = Date.now();
  if (cachedToken && now < tokenExpiresAt) {
    return cachedToken;
  }

  const res = await fetch(`https://${SHOP}/admin/oauth/access_token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: 'client_credentials'
    })
  });

  if (!res.ok) {
    throw new Error(`Shopify OAuth falhou: ${res.status}`);
  }

  const data = await res.json();
  cachedToken = data.access_token;
  // Expire token cache in 12 hours
  tokenExpiresAt = now + 12 * 60 * 60 * 1000;
  return cachedToken;
}

export default async function handler(req, res) {
  // CORS & CDN Caching (cache on Vercel CDN for 30s, serve stale while revalidating for 2min)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=120');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const token = await getAccessToken();
    const shopifyRes = await fetch(`https://${SHOP}/admin/api/2024-10/products.json?limit=250`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': token
      }
    });

    if (!shopifyRes.ok) {
      throw new Error(`Shopify Admin API falhou: ${shopifyRes.status}`);
    }

    const data = await shopifyRes.json();
    const products = data.products || [];

    // Map by variant ID, product ID, and handle for instant lookup
    const pricesMap = {};
    for (const p of products) {
      const v = p.variants && p.variants[0];
      if (!v) continue;

      const price = parseFloat(v.price) || 0;
      const compareAtPrice = v.compare_at_price ? parseFloat(v.compare_at_price) : null;
      const pixPrice = +(price * 0.90).toFixed(2);

      const priceObj = {
        title: p.title,
        handle: p.handle,
        productId: String(p.id),
        variantId: String(v.id),
        price: price,
        oldPrice: compareAtPrice,
        pixPrice: pixPrice
      };

      pricesMap[String(p.id)] = priceObj;
      pricesMap[String(v.id)] = priceObj;
      pricesMap[p.handle] = priceObj;
    }

    return res.status(200).json({
      success: true,
      timestamp: Date.now(),
      prices: pricesMap
    });
  } catch (error) {
    console.error('Erro ao buscar preços Shopify:', error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
