import React, { useState, useEffect } from 'react';
import { EcommerceHeader } from './components/EcommerceHeader';
import { BlackFridayBanner } from './components/BlackFridayBanner';
import { EcommerceStore } from './components/EcommerceStore';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { EcommerceFooter } from './components/EcommerceFooter';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { ShopifySettingsModal } from './components/ShopifySettingsModal';
import { getShopifyConfig } from './services/shopify';
import { useLiveProducts } from './services/livePrices';
import { ALL_PRODUCTS } from './data/products';
import { trackAddToCart, trackViewItem } from './utils/analytics';
import { CheckCircle2 } from 'lucide-react';

export function App() {
  const products = useLiveProducts();
  // Cart state persisted to localStorage with automatic ID sanitization
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('ziggie_cart');
      const parsed = saved ? JSON.parse(saved) : [];
      return parsed.map(item => {
        const prod = ALL_PRODUCTS.find(p => p.id === item.id);
        if (prod && (!item.shopifyVariantId || !/^\d+$/.test(String(item.shopifyVariantId)))) {
          return { ...item, shopifyVariantId: prod.shopifyVariantId };
        }
        return item;
      });
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isShopifyConfigOpen, setIsShopifyConfigOpen] = useState(false);
  const [shopifyConfig, setShopifyConfig] = useState(getShopifyConfig());
  const [selectedProductDetail, setSelectedProductDetail] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  const handleSelectCategory = (category) => {
    setActiveCategory(category);
    // Smoothly scroll to the catalog section so mobile and desktop users immediately see the new category
    setTimeout(() => {
      const el = document.getElementById('ofertas');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  // Sync cart to localStorage
  useEffect(() => {
    localStorage.setItem('ziggie_cart', JSON.stringify(cart));
  }, [cart]);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddToCart = (product) => {
    const qty = product.quantity || 1;
    trackAddToCart(product, qty);
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => 
          item.id === product.id && 
          item.selectedColor === product.selectedColor &&
          item.selectedVoltage === product.selectedVoltage
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += qty;
        return updated;
      } else {
        return [...prevCart, { ...product, quantity: qty }];
      }
    });

    const voltInfo = product.selectedVoltage ? ` (${product.selectedVoltage})` : '';
    showToast(`"${product.name}${voltInfo}" adicionado ao carrinho!`);
  };

  const handleUpdateQuantity = (id, newQty, color, voltage) => {
    if (newQty <= 0) {
      handleRemoveItem(id, color, voltage);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.selectedColor === color && item.selectedVoltage === voltage
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const handleRemoveItem = (id, color, voltage) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.id === id && item.selectedColor === color && item.selectedVoltage === voltage))
    );
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartValue = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-[#f5f6f8] text-zinc-900 font-sans selection:bg-[#ff5500] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-zinc-900 border border-[#ff5500] text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-md">
          <div className="w-7 h-7 rounded-full bg-[#ff5500]/20 flex items-center justify-center text-[#ff5500]">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold font-['Space_Grotesk']">{toastMessage}</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="ml-2 text-xs font-bold text-[#ff5500] underline hover:text-[#ff7733]"
          >
            Ver Carrinho
          </button>
        </div>
      )}

      {/* 1. Header (Reference 3D Prime style: Top ticker, Search bar, Account, Cart value, Dark Subnav) */}
      <EcommerceHeader
        cartCount={totalCartItems}
        cartTotal={totalCartValue}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenShopifyConfig={() => setIsShopifyConfigOpen(true)}
        isShopifyConnected={!!shopifyConfig.storefrontAccessToken}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
      />

      {/* 2. Official Black Friday & Black November Banner (Directly below header) */}
      <BlackFridayBanner
        onBannerClick={(targetId) => {
          setActiveCategory('black-friday');
          if (targetId && targetId !== 'all') {
            const found = products.find((p) => p.id === targetId);
            if (found) {
              trackViewItem(found);
              setSelectedProductDetail(found);
              return;
            }
          }
          const el = document.getElementById('ofertas');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 3. Main E-Commerce Catalog & Store Experience */}
      <main>
        <EcommerceStore
          onAddToCart={handleAddToCart}
          onOpenDetail={(product) => {
            trackViewItem(product);
            setSelectedProductDetail(product);
          }}
          searchQuery={searchQuery}
          activeCategory={activeCategory}
        />
      </main>

      {/* 3. Floating WhatsApp & Social Rail */}
      <FloatingWhatsApp />

      {/* 4. Complete E-Commerce Institutional Footer */}
      <EcommerceFooter onOpenShopifyConfig={() => setIsShopifyConfigOpen(true)} />

      {/* 5. Modals & Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      <ProductDetailModal
        product={selectedProductDetail}
        onClose={() => setSelectedProductDetail(null)}
        onAddToCart={handleAddToCart}
      />

      <ShopifySettingsModal
        isOpen={isShopifyConfigOpen}
        onClose={() => setIsShopifyConfigOpen(false)}
        onConfigSaved={(newConfig) => setShopifyConfig(newConfig)}
      />
    </div>
  );
}

export default App;
