// Vercel Serverless Function - Shopify Webhook Receiver
// Endpoint: https://ziggie-emjt.vercel.app/api/webhook

export default async function handler(req, res) {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Shopify-Topic, X-Shopify-Hmac-Sha256, X-Shopify-Shop-Domain');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET request (Health check / browser visit)
  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'active',
      service: 'Ziggie 3D Shopify Webhook Receiver',
      timestamp: new Date().toISOString()
    });
  }

  // POST request from Shopify
  if (req.method === 'POST') {
    try {
      const topic = req.headers['x-shopify-topic'] || 'products/update';
      const shop = req.headers['x-shopify-shop-domain'] || 'fabrica-de-engenhocas.myshopify.com';
      const payload = req.body;

      console.log(`[Shopify Webhook] Recebido evento: ${topic} de ${shop}`);

      if (payload && payload.id) {
        const title = payload.title || 'Produto sem título';
        const variants = payload.variants || [];
        const firstVariant = variants[0] || {};
        const price = firstVariant.price;
        const compareAtPrice = firstVariant.compare_at_price;

        console.log(`[Shopify Webhook] Produto: "${title}" (ID: ${payload.id})`);
        console.log(`[Shopify Webhook] Novo Preço: R$ ${price} | De: R$ ${compareAtPrice || 'N/A'}`);

        // Return immediate 200 OK so Shopify registers delivery success
        return res.status(200).json({
          success: true,
          message: 'Webhook processado com sucesso',
          productId: payload.id,
          title: title,
          price: price,
          compareAtPrice: compareAtPrice
        });
      }

      return res.status(200).json({ success: true, message: 'Payload recebido' });
    } catch (error) {
      console.error('[Shopify Webhook] Erro ao processar:', error);
      // Still return 200 to prevent Shopify webhook retry storms
      return res.status(200).json({ success: false, error: error.message });
    }
  }

  return res.status(405).json({ error: 'Método não permitido' });
}
