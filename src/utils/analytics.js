// Google Ads & Google Analytics 4 (GA4) Conversion Tracking Helper
// Sends e-commerce events to window.dataLayer for Google Tag Manager (GTM) or gtag.js

export function getStoredTrafficSource() {
  try {
    const raw = sessionStorage.getItem('ziggie_traffic_source');
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

// 1. View Item (Product Details Opened)
export function trackViewItem(product) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];

  const item = {
    item_id: product.sku || product.id,
    item_name: product.name || product.title,
    item_brand: product.brand || 'Ziggie 3D',
    item_category: product.category || 'Impressoras 3D',
    price: product.price,
    quantity: 1
  };

  window.dataLayer.push({
    event: 'view_item',
    ecommerce: {
      currency: 'BRL',
      value: product.price,
      items: [item]
    }
  });

  if (typeof window.gtag === 'function') {
    window.gtag('event', 'view_item', {
      currency: 'BRL',
      value: product.price,
      items: [item]
    });
  }
}

// 2. Add To Cart
export function trackAddToCart(product, quantity = 1) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];

  const item = {
    item_id: product.sku || product.id,
    item_name: product.name || product.title,
    item_brand: product.brand || 'Ziggie 3D',
    item_category: product.category || 'Impressoras 3D',
    price: product.price,
    quantity: quantity
  };

  window.dataLayer.push({
    event: 'add_to_cart',
    ecommerce: {
      currency: 'BRL',
      value: product.price * quantity,
      items: [item]
    }
  });

  if (typeof window.gtag === 'function') {
    window.gtag('event', 'add_to_cart', {
      currency: 'BRL',
      value: product.price * quantity,
      items: [item]
    });
  }
}

// 3. Begin Checkout
export function trackBeginCheckout(cartItems, totalValue) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];

  const items = cartItems.map(item => ({
    item_id: item.sku || item.id,
    item_name: item.name || item.title,
    item_brand: item.brand || 'Ziggie 3D',
    item_category: item.category || 'Impressoras 3D',
    price: item.price,
    quantity: item.quantity || 1
  }));

  const traffic = getStoredTrafficSource();

  window.dataLayer.push({
    event: 'begin_checkout',
    traffic_source: traffic,
    ecommerce: {
      currency: 'BRL',
      value: totalValue,
      items: items
    }
  });

  if (typeof window.gtag === 'function') {
    window.gtag('event', 'begin_checkout', {
      currency: 'BRL',
      value: totalValue,
      items: items
    });
  }
}

// 4. WhatsApp Lead Click (Google Ads Lead Conversion)
export function trackWhatsAppLead(source = 'floating_button') {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];

  const traffic = getStoredTrafficSource();

  window.dataLayer.push({
    event: 'generate_lead',
    lead_type: 'whatsapp',
    lead_source: source,
    traffic_source: traffic
  });

  if (typeof window.gtag === 'function') {
    window.gtag('event', 'generate_lead', {
      lead_type: 'whatsapp',
      lead_source: source
    });
  }
}
