import { useState, useEffect } from 'react';
import { ALL_PRODUCTS } from '../data/products';

let globalProductsCache = [...ALL_PRODUCTS];
let listeners = new Set();

function notifyListeners() {
  listeners.forEach(fn => fn([...globalProductsCache]));
}

// Function to fetch live prices from /api/prices
export async function refreshLivePrices() {
  try {
    const res = await fetch('/api/prices?_t=' + Date.now());
    if (!res.ok) return null;
    const data = await res.json();
    if (!data || !data.success || !data.prices) return null;

    const pricesMap = data.prices;
    let hasChanges = false;

    const updated = globalProductsCache.map(p => {
      // Find matching price in map
      const match = pricesMap[String(p.shopifyVariantId)] ||
                    pricesMap[String(p.shopifyProductId)] ||
                    pricesMap[p.handle] ||
                    pricesMap[p.id];

      if (match && typeof match.price === 'number') {
        const newPrice = match.price;
        const newOldPrice = match.oldPrice || p.oldPrice;
        const newPix = match.pixPrice || +(newPrice * 0.90).toFixed(2);
        const newInstallment = p.installments ? +(newPrice / p.installments).toFixed(2) : 0;

        if (p.price !== newPrice || p.oldPrice !== newOldPrice) {
          hasChanges = true;
          return {
            ...p,
            price: newPrice,
            oldPrice: newOldPrice,
            pixPrice: newPix,
            installmentValue: newInstallment
          };
        }
      }
      return p;
    });

    if (hasChanges) {
      globalProductsCache = updated;
      notifyListeners();
    }
    return globalProductsCache;
  } catch (err) {
    // Fail silently in development/offline and retain current cached products
    return null;
  }
}

// React Hook for components to consume live synchronized products
export function useLiveProducts() {
  const [products, setProducts] = useState(globalProductsCache);

  useEffect(() => {
    listeners.add(setProducts);

    // Fetch on initial mount
    refreshLivePrices();

    // Poll every 45 seconds to keep fresh if tab is left open
    const interval = setInterval(refreshLivePrices, 45000);

    return () => {
      listeners.delete(setProducts);
      clearInterval(interval);
    };
  }, []);

  return products;
}
