import React, { useState, useEffect } from 'react';
import { EcommerceHeader } from './components/EcommerceHeader';
import { EcommerceStore } from './components/EcommerceStore';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { EcommerceFooter } from './components/EcommerceFooter';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { ShopifySettingsModal } from './components/ShopifySettingsModal';
import { getShopifyConfig } from './services/shopify';
import { CheckCircle2 } from 'lucide-react';

export function App() {
  // Cart state persisted to localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('ziggie_cart');
      return saved ? JSON.parse(saved) : [];
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
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.id === product.id && item.selectedColor === product.selectedColor
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += qty;
        return updated;
      } else {
        return [...prevCart, { ...product, quantity: qty }];
      }
    });

    showToast(`"${product.name}" adicionado ao carrinho!`);
  };

  const handleUpdateQuantity = (id, newQty, color) => {
    if (newQty <= 0) {
      handleRemoveItem(id, color);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.selectedColor === color
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const handleRemoveItem = (id, color) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.id === id && item.selectedColor === color))
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
        onSelectCategory={setActiveCategory}
      />

      {/* 2. Main E-Commerce Catalog & Store Experience */}
      <main>
        <EcommerceStore
          onAddToCart={handleAddToCart}
          onOpenDetail={(product) => setSelectedProductDetail(product)}
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
