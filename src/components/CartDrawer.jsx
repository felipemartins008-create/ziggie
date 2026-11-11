import React, { useState } from 'react';
import { X, Trash2, ArrowRight } from 'lucide-react';
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

export function CartDrawer({ isOpen, onClose, items = [], onUpdateQuantity, onRemoveItem, onClearCart }) {
  if (!isOpen) return null;

  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discountRate = appliedCoupon ? 0.10 : 0;
  const discountValue = subtotal * discountRate;
  const total = subtotal - discountValue;
  const pixTotal = total * 0.90;

  const freeShippingThreshold = 499;
  const missingForFreeShipping = Math.max(0, freeShippingThreshold - total);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim().toUpperCase() === 'ZIGGIE10') {
      setAppliedCoupon('ZIGGIE10');
      setCouponError('');
    } else {
      setCouponError('Cupom inválido. Tente "ZIGGIE10"');
    }
  };

  const handleCheckout = () => {
    trackBeginCheckout(items, total);
    const checkoutUrl = buildShopifyCheckoutUrl(items);
    if (checkoutUrl && checkoutUrl !== '#') {
      window.open(checkoutUrl, '_blank');
    } else {
      alert('Redirecionando para o ambiente de pagamento 100% seguro.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-full sm:max-w-md bg-[#0a0a0c] border-l border-white/[0.08] shadow-2xl flex flex-col justify-between z-10">
          
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-white/[0.06] flex items-center justify-between">
            <h3 className="text-base font-bold text-white font-['Space_Grotesk']">
              Carrinho ({items.reduce((acc, i) => acc + i.quantity, 0)})
            </h3>
            <button
              onClick={onClose}
              className="min-w-[40px] min-h-[40px] flex items-center justify-center p-2 rounded-full hover:bg-white/[0.08] text-zinc-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Fechar carrinho"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Minimalist Free Shipping Notification */}
          <div className="bg-[#101014] px-4 sm:px-6 py-2.5 sm:py-3 border-b border-white/[0.05] text-xs text-zinc-300">
            {missingForFreeShipping === 0 ? (
              <span className="text-emerald-400 font-medium">Frete Grátis ativado para este pedido.</span>
            ) : (
              <span>Adicione mais <strong className="text-white">R$ {missingForFreeShipping.toFixed(2)}</strong> para Frete Grátis</span>
            )}
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-20 text-zinc-500 text-xs">
                Seu carrinho está vazio no momento.
              </div>
            ) : (
              items.map((item) => (
                <div 
                  key={`${item.id}-${item.selectedColor || ''}-${item.selectedVoltage || ''}`}
                  className="flex gap-4 p-3 rounded-2xl bg-[#111114] border border-white/[0.06] items-center"
                >
                  <div className="w-16 h-16 bg-white rounded-xl p-1 flex-shrink-0 flex items-center justify-center">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-white truncate font-['Space_Grotesk']">
                      {item.name}
                    </h4>

                    {item.selectedVoltage && (
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                          {item.selectedVoltage}
                        </span>
                      </div>
                    )}

                    {item.selectedColorName && (
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span 
                          className="w-2.5 h-2.5 rounded-full border border-white/20 inline-block"
                          style={{ backgroundColor: item.selectedColor }}
                        />
                        <span className="text-[11px] text-zinc-400 font-mono">
                          Cor: {item.selectedColorName}
                        </span>
                      </div>
                    )}
                    
                    <div className="text-xs text-zinc-400 mt-0.5">
                      R$ {item.price.toFixed(2)}
                    </div>

                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center bg-black/60 border border-white/[0.08] rounded-full px-1.5 sm:px-2 py-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1, item.selectedColor, item.selectedVoltage)}
                          className="text-zinc-400 hover:text-white w-7 h-7 sm:w-6 sm:h-6 flex items-center justify-center text-xs active:bg-white/10 rounded-full transition-colors cursor-pointer"
                          aria-label="Diminuir quantidade"
                        >
                          -
                        </button>
                        <span className="text-xs font-mono font-medium text-white px-2">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1, item.selectedColor, item.selectedVoltage)}
                          className="text-zinc-400 hover:text-white w-7 h-7 sm:w-6 sm:h-6 flex items-center justify-center text-xs active:bg-white/10 rounded-full transition-colors cursor-pointer"
                          aria-label="Aumentar quantidade"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id, item.selectedColor, item.selectedVoltage)}
                        className="text-zinc-500 hover:text-red-400 p-2 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg active:bg-red-500/10 transition-colors ml-auto cursor-pointer"
                        title="Remover item"
                        aria-label="Remover item"
                      >
                        <Trash2 className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary */}
          {items.length > 0 && (
            <div className="p-4 sm:p-6 pb-6 sm:pb-6 border-t border-white/[0.06] bg-[#0c0c0e] space-y-3 sm:space-y-4">
              
              {/* Coupon */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Cupom (ex: ZIGGIE10)"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="flex-1 bg-[#141418] text-xs text-white placeholder-zinc-500 px-3 py-2 rounded-xl border border-white/[0.08] uppercase font-mono focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-white/[0.08] hover:bg-white text-zinc-300 hover:text-black rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                >
                  Aplicar
                </button>
              </form>

              {appliedCoupon && (
                <div className="text-xs text-emerald-400 flex justify-between">
                  <span>Cupom {appliedCoupon} aplicado</span>
                  <span>-10%</span>
                </div>
              )}

              {/* Totals */}
              <div className="space-y-1 text-xs text-zinc-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-zinc-200">R$ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white font-bold text-base pt-2 border-t border-white/[0.06]">
                  <span>Total</span>
                  <span className="font-mono font-['Space_Grotesk']">R$ {total.toFixed(2)}</span>
                </div>
                <div className="text-right text-[11px] text-[#ff5500]">
                  R$ {pixTotal.toFixed(2)} no Pix (-10%)
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full py-3.5 min-h-[48px] rounded-full bg-[#ff5500] hover:bg-[#e64c00] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#ff5500]/20 active:scale-95"
              >
                <span>Finalizar Compra Segura</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Payment Methods Accepted */}
              <div className="pt-2 text-center">
                <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium block mb-2">
                  Pagamento 100% Criptografado & Seguro
                </span>
                <div className="flex flex-wrap items-center justify-center gap-1.5">
                  <div title="Pix (-10% OFF)"><PixLogo className="w-8 h-5 rounded" /></div>
                  <div title="Visa"><VisaLogo className="w-8 h-5 rounded" /></div>
                  <div title="Mastercard"><MastercardLogo className="w-8 h-5 rounded" /></div>
                  <div title="Elo"><EloLogo className="w-8 h-5 rounded" /></div>
                  <div title="Apple Pay"><ApplePayLogo className="w-8 h-5 rounded" /></div>
                  <div title="Google Pay"><GooglePayLogo className="w-8 h-5 rounded" /></div>
                  <div title="Nubank"><NubankLogo className="w-8 h-5 rounded" /></div>
                  <div title="Itaú"><ItauLogo className="w-8 h-5 rounded" /></div>
                  <div title="Bradesco"><BradescoLogo className="w-8 h-5 rounded" /></div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
