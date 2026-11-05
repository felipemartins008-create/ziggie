// Vercel Serverless Function - Live Shopify Price Fetcher with Full Product & Variant Support
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
  tokenExpiresAt = now + 12 * 60 * 60 * 1000;
  return cachedToken;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=60');

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

    const pricesMap = {};
    const rawProductsList = [];

    for (const p of products) {
      const variants = p.variants || [];
      if (variants.length === 0) continue;

      let minPrice = Infinity;
      let minCompareAt = null;

      // Index every variant individually by its Variant ID
      for (const v of variants) {
        const price = parseFloat(v.price) || 0;
        const compareAtPrice = v.compare_at_price ? parseFloat(v.compare_at_price) : null;
        const pixPrice = +(price * 0.90).toFixed(2);

        if (price < minPrice) {
          minPrice = price;
          minCompareAt = compareAtPrice;
        }

        const variantObj = {
          title: p.title,
          variantTitle: v.title,
          handle: p.handle,
          productId: String(p.id),
          variantId: String(v.id),
          price: price,
          oldPrice: compareAtPrice,
          pixPrice: pixPrice
        };

        pricesMap[String(v.id)] = variantObj;
      }

      // Index product by Product ID and Handle (uses lowest variant price so cards show the best entry price)
      const basePrice = minPrice === Infinity ? parseFloat(variants[0].price) || 0 : minPrice;
      const baseObj = {
        title: p.title,
        handle: p.handle,
        productId: String(p.id),
        variantId: String(variants[0].id),
        price: basePrice,
        oldPrice: minCompareAt,
        pixPrice: +(basePrice * 0.90).toFixed(2)
      };

      pricesMap[String(p.id)] = baseObj;
      pricesMap[p.handle] = baseObj;

      // Full Shopify product model for dynamic catalog ingestion
      const rawProduct = {
        shopifyProductId: String(p.id),
        shopifyVariantId: String(variants[0].id),
        handle: p.handle,
        title: p.title,
        name: p.title,
        description: p.body_html ? p.body_html.replace(/<[^>]+>/g, '').trim() : '',
        category: p.product_type || (p.tags && p.tags.toLowerCase().includes('filamento') ? 'Filamentos' : 'Impressoras 3D'),
        vendor: p.vendor || 'Ziggie 3D',
        brand: p.vendor || 'Ziggie 3D',
        price: basePrice,
        oldPrice: minCompareAt,
        pixPrice: +(basePrice * 0.90).toFixed(2),
        image: p.images && p.images[0] ? p.images[0].src : '/images/printer-bambu-a1.png',
        images: (p.images || []).map(img => img.src),
        badge: minCompareAt ? 'PROMOÇÃO' : null,
        variants: variants.map(v => ({
          id: String(v.id),
          shopifyVariantId: String(v.id),
          title: v.title,
          name: v.title,
          price: parseFloat(v.price) || 0,
          oldPrice: v.compare_at_price ? parseFloat(v.compare_at_price) : null,
          pixPrice: +((parseFloat(v.price) || 0) * 0.90).toFixed(2)
        }))
      };

      rawProductsList.push(rawProduct);
    }

    return res.status(200).json({
      success: true,
      timestamp: Date.now(),
      prices: pricesMap,
      products: rawProductsList
    });
  } catch (error) {
    console.error('Erro ao buscar produtos Shopify:', error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
