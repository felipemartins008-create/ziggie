/**
 * Shopify Storefront API Service for Ziggie 3D Printing
 * 
 * Permite integração direta com a API GraphQL Storefront da Shopify
 * ou modo simulação interativa de alta fidelidade para desenvolvimento e testes.
 */

const DEFAULT_CONFIG = {
  shopDomain: import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || 'fabrica-de-engenhocas.myshopify.com',
  storefrontAccessToken: import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || '',
  apiVersion: '2024-10',
  isLiveSync: false
};

// Carrega configurações persistidas no localStorage se houver
export const getShopifyConfig = () => {
  try {
    const saved = localStorage.getItem('ziggie_shopify_config');
    return saved ? { ...DEFAULT_CONFIG, ...JSON.parse(saved) } : DEFAULT_CONFIG;
  } catch {
    return DEFAULT_CONFIG;
  }
};

export const saveShopifyConfig = (config) => {
  localStorage.setItem('ziggie_shopify_config', JSON.stringify(config));
};

/**
 * Executa queries GraphQL na Shopify Storefront API
 */
export async function shopifyFetch({ query, variables = {} }) {
  const config = getShopifyConfig();

  if (!config.storefrontAccessToken) {
    console.warn('[Shopify Service] Sem Storefront Access Token configurado. Operando em modo Mock Interativo.');
    return null;
  }

  const endpoint = `https://${config.shopDomain}/api/${config.apiVersion}/graphql.json`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': config.storefrontAccessToken,
      },
      body: JSON.stringify({ query, variables }),
    });

    return await response.json();
  } catch (error) {
    console.error('[Shopify Service Error]', error);
    throw error;
  }
}

/**
 * Cria ou recupera link direto de Checkout da Shopify preservando parâmetros do Google Ads (UTMs & GCLID)
 */
export function buildShopifyCheckoutUrl(cartItems) {
  const config = getShopifyConfig();
  
  // Formato nativo da Shopify: /cart/{variantId}:{quantity},{variantId}:{quantity}
  if (!cartItems || cartItems.length === 0) return '#';
  
  const lineItems = cartItems
    .map(item => `${item.shopifyVariantId || item.id}:${item.quantity}`)
    .join(',');

  let url = `https://${config.shopDomain}/cart/${lineItems}`;

  // Preservação de parâmetros Google Ads e UTMs para atribuição de tráfego pago
  try {
    const rawTraffic = sessionStorage.getItem('ziggie_traffic_source');
    if (rawTraffic) {
      const traffic = JSON.parse(rawTraffic);
      const searchParams = new URLSearchParams();
      Object.keys(traffic).forEach(k => {
        if (traffic[k]) searchParams.set(k, traffic[k]);
      });
      const qs = searchParams.toString();
      if (qs) {
        url += `?${qs}`;
      }
    }
  } catch (e) {}

  return url;
}
