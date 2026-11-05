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
      let productChanged = false;
      let newPrice = p.price;
      let newOldPrice = p.oldPrice;
      let newPix = p.pixPrice;
      let newInstallment = p.installmentValue;

      // 1. Update individual color variants if present
      let updatedColorVariants = p.colorVariants;
      if (p.colorVariants && p.colorVariants.length > 0) {
        let variantMinPrice = Infinity;
        let variantMinCompareAt = null;

        updatedColorVariants = p.colorVariants.map(cv => {
          const vMatch = pricesMap[String(cv.shopifyVariantId)];
          if (vMatch && typeof vMatch.price === 'number') {
            if (vMatch.price < variantMinPrice) {
              variantMinPrice = vMatch.price;
              variantMinCompareAt = vMatch.oldPrice;
            }
            if (cv.price !== vMatch.price || cv.oldPrice !== vMatch.oldPrice) {
              productChanged = true;
              return {
                ...cv,
                price: vMatch.price,
                oldPrice: vMatch.oldPrice,
                pixPrice: vMatch.pixPrice
              };
            }
          }
          return cv;
        });

        // Set card price to lowest available variant price
        if (variantMinPrice !== Infinity && variantMinPrice !== newPrice) {
          newPrice = variantMinPrice;
          newOldPrice = variantMinCompareAt !== null ? variantMinCompareAt : newOldPrice;
          newPix = +(newPrice * 0.90).toFixed(2);
          newInstallment = p.installments ? +(newPrice / p.installments).toFixed(2) : 0;
          productChanged = true;
        }
      }

      // 2. Update standalone or single-variant product
      const match = pricesMap[String(p.shopifyVariantId)] ||
                    pricesMap[String(p.shopifyProductId)] ||
                    pricesMap[p.handle] ||
                    pricesMap[p.id];

      if (match && typeof match.price === 'number') {
        if (!p.colorVariants || p.colorVariants.length === 0) {
          if (p.price !== match.price || p.oldPrice !== match.oldPrice) {
            newPrice = match.price;
            newOldPrice = match.oldPrice || p.oldPrice;
            newPix = match.pixPrice || +(newPrice * 0.90).toFixed(2);
            newInstallment = p.installments ? +(newPrice / p.installments).toFixed(2) : 0;
            productChanged = true;
          }
        }
      }

      if (productChanged) {
        hasChanges = true;
        return {
          ...p,
          price: newPrice,
          oldPrice: newOldPrice,
          pixPrice: newPix,
          installmentValue: newInstallment,
          colorVariants: updatedColorVariants
        };
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
