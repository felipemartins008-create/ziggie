import React, { useState } from 'react';
import { X, ArrowRight, Check } from 'lucide-react';
import { buildShopifyCheckoutUrl } from '../services/shopify';

export function ProductDetailModal({ product, onClose, onAddToCart }) {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(
    product.colors ? product.colors[0]?.hex : null
  );

  const pixPrice = product.pixPrice || (product.price * 0.95);

  const handleBuyNow = () => {
    onAddToCart({ ...product, quantity, selectedColor });
    const directCheckoutUrl = buildShopifyCheckoutUrl([{ ...product, quantity }]);
    if (directCheckoutUrl && directCheckoutUrl !== '#') {
      window.open(directCheckoutUrl, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-3xl bg-[#0d0d10] border border-white/[0.1] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2 rounded-full bg-black/60 hover:bg-white text-zinc-400 hover:text-black transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="overflow-y-auto p-6 sm:p-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left: Product Image */}
            <div className="md:col-span-5 bg-white rounded-2xl p-6 flex items-center justify-center min-h-[280px]">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-64 w-full object-contain"
              />
            </div>

            {/* Right: Info, Specs & Actions */}
            <div className="md:col-span-7 space-y-5">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-zinc-400 block mb-1">
                  {product.brand} • {product.category}
                </span>

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
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-zinc-400 block mb-2">
                    Cores Disponíveis
                  </span>
                  <div className="flex items-center gap-2">
                    {product.colors.map((c, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedColor(c.hex)}
                        className={`w-6 h-6 rounded-full border transition-all cursor-pointer flex items-center justify-center ${
                          selectedColor === c.hex 
                            ? 'border-[#ff5500] scale-125' 
                            : 'border-white/20 hover:border-white/60'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      >
                        {selectedColor === c.hex && (
                          <Check className={`w-3 h-3 ${c.hex === '#FFFFFF' || c.hex === '#FAFAFA' ? 'text-black' : 'text-white'}`} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Technical Specifications */}
              <div className="bg-black/50 border border-white/[0.06] rounded-2xl p-4">
                <span className="text-[10px] uppercase tracking-widest font-mono text-zinc-500 block mb-2">
                  Especificações Técnicas
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {Object.entries(product.specs || {}).map(([key, val]) => (
                    <div key={key}>
                      <span className="text-zinc-500 text-[10px] uppercase font-mono block">{key}</span>
                      <span className="text-zinc-200 font-medium">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="pt-2">
                <div className="text-2xl font-bold text-white font-['Space_Grotesk']">
                  R$ {pixPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  <span className="text-xs font-normal text-[#ff5500] ml-2">no Pix</span>
                </div>
                <div className="text-xs text-zinc-400 mt-0.5">
                  ou R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} em até 12x
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-2">
                <div className="flex items-center bg-[#151518] border border-white/[0.08] rounded-full px-2 py-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 flex items-center justify-center text-zinc-400 hover:text-white"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-mono font-bold text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 flex items-center justify-center text-zinc-400 hover:text-white"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => {
                    onAddToCart({ ...product, quantity, selectedColor });
                    onClose();
                  }}
                  className="flex-1 py-3 px-5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-white font-semibold text-xs border border-white/[0.1] transition-colors cursor-pointer"
                >
                  Adicionar ao Carrinho
                </button>

                <button
                  onClick={handleBuyNow}
                  className="flex-1 py-3 px-5 rounded-full bg-[#ff5500] hover:bg-[#e64c00] text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Comprar Agora</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
