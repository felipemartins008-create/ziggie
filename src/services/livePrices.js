import { useState, useEffect } from 'react';
import { ALL_PRODUCTS } from '../data/products';

let globalProductsCache = [...ALL_PRODUCTS];
let listeners = new Set();

function notifyListeners() {
  listeners.forEach(fn => fn([...globalProductsCache]));
}

// Function to fetch live prices and products from /api/products
export async function refreshLivePrices() {
  try {
    let res = await fetch('/api/products?_t=' + Date.now());
    if (!res.ok) {
      res = await fetch('/api/prices?_t=' + Date.now());
    }
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

      // Check if product has updated tags in Shopify
      let updatedTags = p.tags || '';
      let updatedBadge = p.badge;
      const spMatch = data.products?.find(
        x => String(x.shopifyProductId) === String(p.shopifyProductId) || x.handle === p.handle
      );
      if (spMatch && spMatch.tags) {
        updatedTags = spMatch.tags;
        if (updatedTags.toLowerCase().includes('destaque') || updatedTags.toLowerCase().includes('topo')) {
          updatedBadge = 'DESTAQUE';
        }
        if (p.tags !== updatedTags || p.badge !== updatedBadge) {
          productChanged = true;
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
          colorVariants: updatedColorVariants,
          tags: updatedTags,
          badge: updatedBadge
        };
      }
      return p;
    });

    // 3. Automatically ingest brand new products created on Shopify Admin
    if (data.products && Array.isArray(data.products)) {
      const existingIds = new Set();
      for (const p of updated) {
        if (p.shopifyProductId) existingIds.add(String(p.shopifyProductId));
        if (p.handle) existingIds.add(p.handle);
      }

      for (const sp of data.products) {
        if (!existingIds.has(String(sp.shopifyProductId)) && !existingIds.has(sp.handle)) {
          const colors = (sp.variants || []).map(v => ({
            name: v.title,
            hex: getColorHex(v.title)
          }));

          const isDestaque = sp.tags && (sp.tags.toLowerCase().includes('destaque') || sp.tags.toLowerCase().includes('topo'));

          const newProduct = {
            id: `shopify-${sp.shopifyProductId}`,
            name: sp.name,
            brand: sp.brand || 'Ziggie 3D',
            category: sp.category || 'Impressoras 3D',
            subCategory: 'Lançamento',
            price: sp.price,
            oldPrice: sp.oldPrice,
            pixPrice: sp.pixPrice,
            installments: 12,
            installmentValue: +(sp.price / 12).toFixed(2),
            image: sp.image,
            tags: sp.tags || '',
            badge: isDestaque ? 'DESTAQUE' : (sp.badge || 'NOVO'),
            rating: 5.0,
            reviewsCount: 1,
            inStock: true,
            description: sp.description || 'Produto oficial Ziggie 3D com garantia e nota fiscal.',
            shopifyProductId: sp.shopifyProductId,
            shopifyVariantId: sp.shopifyVariantId,
            handle: sp.handle,
            colors: colors.length > 1 ? colors : undefined,
            colorVariants: (sp.variants || []).map(v => ({
              name: v.title,
              hex: getColorHex(v.title),
              shopifyVariantId: v.shopifyVariantId,
              price: v.price,
              oldPrice: v.oldPrice,
              pixPrice: v.pixPrice
            }))
          };

          updated.push(newProduct);
          existingIds.add(String(sp.shopifyProductId));
          existingIds.add(sp.handle);
          hasChanges = true;
        }
      }
    }

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

function getColorHex(name = '') {
  const n = String(name).toLowerCase();
  if (n.includes('preto') || n.includes('black')) return '#111111';
  if (n.includes('branco') || n.includes('white')) return '#F3F4F6';
  if (n.includes('cinza') || n.includes('grey') || n.includes('gray')) return '#6B7280';
  if (n.includes('vermelho') || n.includes('red')) return '#DC2626';
  if (n.includes('azul') || n.includes('blue')) return '#2563EB';
  if (n.includes('verde') || n.includes('green')) return '#16A34A';
  if (n.includes('amarelo') || n.includes('yellow')) return '#EAB308';
  if (n.includes('laranja') || n.includes('orange')) return '#EA580C';
  if (n.includes('roxo') || n.includes('purple')) return '#9333EA';
  if (n.includes('rosa') || n.includes('pink')) return '#EC4899';
  if (n.includes('marrom') || n.includes('chocolate') || n.includes('brown')) return '#5C3826';
  return '#888888';
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
