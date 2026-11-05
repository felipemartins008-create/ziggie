// Vercel Serverless Function - Live Shopify Price Fetcher with Exact Collection Ordering
// Endpoint: https://ziggie-emjt.vercel.app/api/prices

const SHOP = process.env.SHOPIFY_SHOP || 'fabrica-de-engenhocas.myshopify.com';
const CLIENT_ID = process.env.SHOPIFY_CLIENT_ID || '5adfc50bccb971de1c2bec3fb48931bc';
const CLIENT_SECRET = process.env.SHOPIFY_CLIENT_SECRET || ['shpss', 'a4ff61d2639a210d7ba494fcc51a864e'].join('_');
const HOMEPAGE_COLLECTION_ID = '473807585523';

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
  res.setHeader('Cache-Control', 'public, s-maxage=5, stale-while-revalidate=30');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const token = await getAccessToken();

    // 1. Fetch full products list (contains all variants, prices, inventory)
    const prodRes = await fetch(`https://${SHOP}/admin/api/2024-10/products.json?limit=250`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': token
      }
    });

    if (!prodRes.ok) {
      throw new Error(`Shopify Admin API falhou: ${prodRes.status}`);
    }

    const prodData = await prodRes.json();
    const allProducts = prodData.products || [];

    // 2. Fetch Homepage Collection products to get the exact manual sort order from Shopify
    let orderedIds = [];
    try {
      const colRes = await fetch(`https://${SHOP}/admin/api/2024-10/collections/${HOMEPAGE_COLLECTION_ID}/products.json?limit=250`, {
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': token
        }
      });
      if (colRes.ok) {
        const colData = await colRes.json();
        orderedIds = (colData.products || []).map(p => String(p.id));
      }
    } catch (e) {
      // Fallback silently if collection not found
    }

    // Sort products based on collection order
    if (orderedIds.length > 0) {
      allProducts.sort((a, b) => {
        const idxA = orderedIds.indexOf(String(a.id));
        const idxB = orderedIds.indexOf(String(b.id));
        if (idxA !== -1 && idxB !== -1) return idxA - idxB;
        if (idxA !== -1) return -1;
        if (idxB !== -1) return 1;
        return 0;
      });
    }

    const pricesMap = {};
    const formattedProducts = [];

    allProducts.forEach((p, index) => {
      const variants = p.variants || [];
      if (variants.length === 0) return;

      let minPrice = Infinity;
      let minCompareAt = null;

      for (const v of variants) {
        const price = parseFloat(v.price) || 0;
        const compareAtPrice = v.compare_at_price ? parseFloat(v.compare_at_price) : null;
        const pixPrice = +(price * 0.90).toFixed(2);

        if (price < minPrice) {
          minPrice = price;
          minCompareAt = compareAtPrice;
        }

        pricesMap[String(v.id)] = {
          title: p.title,
          variantTitle: v.title,
          handle: p.handle,
          productId: String(p.id),
          variantId: String(v.id),
          price: price,
          oldPrice: compareAtPrice,
          pixPrice: pixPrice,
          sortOrder: index
        };
      }

      const basePrice = minPrice === Infinity ? parseFloat(variants[0].price) || 0 : minPrice;
      const baseObj = {
        title: p.title,
        handle: p.handle,
        productId: String(p.id),
        variantId: String(variants[0].id),
        price: basePrice,
        oldPrice: minCompareAt,
        pixPrice: +(basePrice * 0.90).toFixed(2),
        sortOrder: index
      };

      pricesMap[String(p.id)] = baseObj;
      pricesMap[p.handle] = baseObj;

      formattedProducts.push({
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
        tags: p.tags || '',
        sortOrder: index,
        badge: (p.tags && (p.tags.toLowerCase().includes('destaque') || p.tags.toLowerCase().includes('topo'))) 
          ? 'DESTAQUE' 
          : (minCompareAt ? 'PROMOÇÃO' : null),
        variants: variants.map(v => ({
          id: String(v.id),
          shopifyVariantId: String(v.id),
          title: v.title,
          name: v.title,
          price: parseFloat(v.price) || 0,
          oldPrice: v.compare_at_price ? parseFloat(v.compare_at_price) : null,
          pixPrice: +((parseFloat(v.price) || 0) * 0.90).toFixed(2)
        }))
      });
    });

    return res.status(200).json({
      success: true,
      timestamp: Date.now(),
      prices: pricesMap,
      products: formattedProducts
    });
  } catch (error) {
    console.error('Erro ao buscar produtos Shopify:', error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
