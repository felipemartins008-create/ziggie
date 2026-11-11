import React, { useState } from 'react';
import { X, ArrowRight, Check } from 'lucide-react';
import { buildShopifyCheckoutUrl } from '../services/shopify';
import { trackBeginCheckout } from '../utils/analytics';
import { 
  PixLogo, 
  VisaLogo, 
  MastercardLogo, 
  EloLogo, 
  ApplePayLogo, 
  GooglePayLogo,
  NubankLogo,
  ItauLogo,
  BradescoLogo
} from './PaymentBadges';

export function ProductDetailModal({ product, onClose, onAddToCart }) {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(
    product.colors ? product.colors[0]?.hex : null
  );
  const [selectedVoltage, setSelectedVoltage] = useState(
    product.selectedVoltage || product.defaultVoltage || product.voltageVariants?.[0]?.voltage || null
  );

  // Active voltage variant (for printers with 110V/220V or laser options)
  const activeVoltageVariant = product.voltageVariants?.find(
    v => v.voltage === selectedVoltage
  );

  // Get active variant based on selected color for dynamic price reflection
  const selectedVariant = product.colorVariants?.find(
    c => c.hex === selectedColor || c.name === selectedColor
  );

  const basePrice = typeof activeVoltageVariant?.price === 'number'
    ? activeVoltageVariant.price
    : (typeof selectedVariant?.price === 'number' ? selectedVariant.price : product.price);

  const activePrice = basePrice;
  const activeOldPrice = activeVoltageVariant?.oldPrice ?? (selectedVariant?.oldPrice ?? product.oldPrice);
  const activePixPrice = typeof activeVoltageVariant?.pixPrice === 'number'
    ? activeVoltageVariant.pixPrice
    : (typeof selectedVariant?.pixPrice === 'number' 
        ? selectedVariant.pixPrice 
        : +(activePrice * 0.90).toFixed(2));

  const getCurrentVariantId = () => {
    if (activeVoltageVariant && activeVoltageVariant.shopifyVariantId) {
      return activeVoltageVariant.shopifyVariantId;
    }
    if (selectedVariant && selectedVariant.shopifyVariantId) {
      return selectedVariant.shopifyVariantId;
    }
    return product.shopifyVariantId;
  };

  const handleBuyNow = () => {
    const variantId = getCurrentVariantId();
    const colorName = product.colors?.find(c => c.hex === selectedColor)?.name;
    const checkoutProduct = { 
      ...product, 
      price: activePrice,
      oldPrice: activeOldPrice,
      pixPrice: activePixPrice,
      quantity, 
      selectedColor, 
      selectedColorName: colorName,
      selectedVoltage,
      sku: activeVoltageVariant?.sku || product.sku,
      shopifyVariantId: variantId 
    };
    onAddToCart(checkoutProduct);
    trackBeginCheckout([checkoutProduct], checkoutProduct.price * checkoutProduct.quantity);
    const directCheckoutUrl = buildShopifyCheckoutUrl([checkoutProduct]);
    if (directCheckoutUrl && directCheckoutUrl !== '#') {
      window.open(directCheckoutUrl, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-3xl bg-[#0d0d10] border border-white/[0.1] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 z-20 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full bg-black/60 hover:bg-white text-zinc-400 hover:text-black transition-colors cursor-pointer"
          aria-label="Fechar detalhes"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="overflow-y-auto p-4 sm:p-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
            
            {/* Left: Product Image */}
            <div className="md:col-span-5 bg-white rounded-2xl p-4 sm:p-6 flex items-center justify-center min-h-[220px] sm:min-h-[280px]">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-56 sm:max-h-64 w-full object-contain"
              />
            </div>

            {/* Right: Info, Specs & Actions */}
            <div className="md:col-span-7 space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="text-xs uppercase tracking-wider font-semibold text-zinc-400">
                    {product.brand} • {product.category}
                  </span>
                  {product.badge && (
                    <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-red-600 text-white tracking-wide shadow-xs">
                      {product.badge}
                    </span>
                  )}
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white font-['Space_Grotesk'] tracking-tight">
                  {product.name}
                </h2>
                
                <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Color Selector */}
              {product.colors && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-zinc-400">
                      Cor Selecionada
                    </span>
                    <span className="text-xs font-bold text-white font-mono">
                      {product.colors.find(c => c.hex === selectedColor)?.name || ''}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {product.colors.map((c, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedColor(c.hex)}
                        className={`w-8 h-8 sm:w-7 sm:h-7 rounded-full border transition-all cursor-pointer flex items-center justify-center relative ${
                          selectedColor === c.hex 
                            ? 'border-[#ff5500] scale-110 shadow-md ring-2 ring-[#ff5500]/40' 
                            : 'border-white/20 hover:border-white/60 active:scale-95'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                        aria-label={c.name}
                      >
                        {selectedColor === c.hex && (
                          <Check className={`w-3.5 h-3.5 ${c.hex === '#FFFFFF' || c.hex === '#FAFAFA' || c.hex === '#F6D334' ? 'text-black' : 'text-white'}`} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Voltage Selector for Printers */}
              {product.voltageVariants && product.voltageVariants.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-zinc-400">
                      Voltagem Residencial
                    </span>
                    <span className="text-xs font-bold text-amber-400 font-mono">
                      {selectedVoltage || product.voltageVariants[0]?.voltage}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.voltageVariants.map((v, i) => {
                      const isSel = (selectedVoltage || product.voltageVariants[0]?.voltage) === v.voltage;
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setSelectedVoltage(v.voltage)}
                          className={`px-3.5 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                            isSel
                              ? 'border-amber-400 bg-amber-400/15 text-white ring-2 ring-amber-400/30 shadow-md'
                              : 'border-white/10 bg-zinc-900/60 text-zinc-300 hover:border-white/30 hover:bg-zinc-900'
                          }`}
                        >
                          <span className="font-mono">{v.voltage}</span>
                          {isSel && <Check className="w-4 h-4 text-amber-400" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Technical Specifications */}
              <div className="bg-black/50 border border-white/[0.06] rounded-2xl p-4">
                <span className="text-[10px] uppercase tracking-widest font-mono text-zinc-500 block mb-2">
                  Especificações Técnicas
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {selectedVoltage && (
                    <div>
                      <span className="text-zinc-500 text-[10px] uppercase font-mono block">Voltagem Selecionada</span>
                      <span className="text-amber-400 font-bold font-mono">{selectedVoltage}</span>
                    </div>
                  )}
                  {Object.entries(product.specs || {}).filter(([k]) => k !== 'voltage' || !selectedVoltage).map(([key, val]) => (
                    <div key={key}>
                      <span className="text-zinc-500 text-[10px] uppercase font-mono block">{key}</span>
                      <span className="text-zinc-200 font-medium">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & Discounts */}
              <div className="pt-2">
                {activeOldPrice && (
                  <div className="text-xs text-zinc-500 line-through font-mono">
                    R$ {Number(activeOldPrice).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                )}
                <div className="flex items-baseline gap-2">
                  <div className="text-2xl font-bold text-white font-['Space_Grotesk']">
                    R$ {Number(activePixPrice).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-2 py-0.5 rounded">
                    10% OFF NO PIX
                  </span>
                </div>
                <div className="text-xs text-zinc-400 mt-1">
                  ou R$ {Number(activePrice).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} em até 12x
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-[#151518] border border-white/[0.08] rounded-full px-2 py-1 shrink-0">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 sm:w-7 sm:h-7 flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer active:bg-white/10 rounded-full"
                      aria-label="Diminuir quantidade"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-xs font-mono font-bold text-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 sm:w-7 sm:h-7 flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer active:bg-white/10 rounded-full"
                      aria-label="Aumentar quantidade"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      const variantId = getCurrentVariantId();
                      const colorName = product.colors?.find(c => c.hex === selectedColor)?.name;
                      onAddToCart({ 
                        ...product, 
                        price: activePrice,
                        oldPrice: activeOldPrice,
                        pixPrice: activePixPrice,
                        quantity, 
                        selectedColor, 
                        selectedColorName: colorName,
                        selectedVoltage,
                        sku: activeVoltageVariant?.sku || product.sku,
                        shopifyVariantId: variantId 
                      });
                      onClose();
                    }}
                    className="flex-1 py-3.5 sm:py-3 px-4 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-white font-semibold text-xs border border-white/[0.1] transition-colors cursor-pointer text-center active:scale-98 min-h-[44px] flex items-center justify-center"
                  >
                    Adicionar ao Carrinho
                  </button>
                </div>

                <button
                  onClick={handleBuyNow}
                  className="w-full sm:flex-1 py-3.5 sm:py-3 px-5 rounded-full bg-[#ff5500] hover:bg-[#e64c00] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-[#ff5500]/25 active:scale-98 min-h-[44px]"
                >
                  <span>Comprar Agora</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Payment Methods Strip */}
              <div className="pt-2 border-t border-white/[0.06] text-center sm:text-left">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-medium">
                    Formas de Pagamento & Bancos:
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono font-bold">PIX 10% OFF</span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  <div title="Pix (-10% OFF)"><PixLogo className="w-8 h-5 rounded" /></div>
                  <div title="Visa"><VisaLogo className="w-8 h-5 rounded" /></div>
                  <div title="Mastercard"><MastercardLogo className="w-8 h-5 rounded" /></div>
                  <div title="Elo"><EloLogo className="w-8 h-5 rounded" /></div>
                  <div title="Apple Pay"><ApplePayLogo className="w-8 h-5 rounded" /></div>
                  <div title="Google Pay"><GooglePayLogo className="w-8 h-5 rounded" /></div>
                  <div title="Nubank"><NubankLogo className="w-8 h-5 rounded" /></div>
                  <div title="Itaú"><ItauLogo className="w-8 h-5 rounded" /></div>
                  <div title="Bradesco"><BradescoLogo className="w-8 h-5 rounded" /></div>
                  <span className="text-[10px] text-zinc-400 font-medium pl-1">em até 12x</span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
