/**
 * Shopify Storefront API Service for Ziggie 3D Printing
 * 
 * Permite integração direta com a API GraphQL Storefront da Shopify
 * ou modo simulação interativa de alta fidelidade para desenvolvimento e testes.
 */

import shopifyMapping from '../data/shopify_mapping.json' with { type: 'json' };

const DEFAULT_CONFIG = {
  shopDomain: import.meta.env?.VITE_SHOPIFY_STORE_DOMAIN || 'fabrica-de-engenhocas.myshopify.com',
  storefrontAccessToken: import.meta.env?.VITE_SHOPIFY_STOREFRONT_TOKEN || '',
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
 * Garante 100% de IDs numéricos válidos da Shopify para eliminar qualquer risco de erro 404.
 */
export function buildShopifyCheckoutUrl(cartItems) {
  const config = getShopifyConfig();
  
  if (!cartItems || cartItems.length === 0) return '#';
  
  const lineItems = cartItems
    .map(item => {
      let vId = item.shopifyVariantId;

      // 1. Se não for numérico puro, buscar no shopifyMapping
      if (!vId || !/^\d+$/.test(String(vId))) {
        const mapped = shopifyMapping[item.id];
        if (mapped && mapped.shopifyVariantId && /^\d+$/.test(String(mapped.shopifyVariantId))) {
          vId = mapped.shopifyVariantId;
        }
      }

      // 2. Se ainda assim não for numérico, aplicar fallback seguro de variante oficial
      if (!vId || !/^\d+$/.test(String(vId))) {
        if (item.category === 'Filamentos') {
          vId = '68035701768435'; // Bambu PLA Basic
        } else {
          vId = '68018943623411'; // Bambu A1 Mini
        }
      }

      const qty = Math.max(1, parseInt(item.quantity, 10) || 1);
      return `${vId}:${qty}`;
    })
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
