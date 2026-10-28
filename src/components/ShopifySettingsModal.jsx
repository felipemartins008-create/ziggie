import React, { useState, useEffect } from 'react';
import { X, Check, ExternalLink, ShieldCheck, Cpu, Key, Globe, Sparkles } from 'lucide-react';
import { getShopifyConfig, saveShopifyConfig } from '../services/shopify';

export function ShopifySettingsModal({ isOpen, onClose, onConfigSaved }) {
  if (!isOpen) return null;

  const [config, setConfig] = useState({
    shopDomain: '',
    storefrontAccessToken: '',
    apiVersion: '2024-10',
    isLiveSync: false
  });
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    const current = getShopifyConfig();
    setConfig(current);
  }, [isOpen]);

  const handleSave = (e) => {
    e.preventDefault();
    saveShopifyConfig(config);
    setSavedSuccess(true);
    if (onConfigSaved) onConfigSaved(config);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-[#12141c] border border-[#272b38] rounded-3xl shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-lg bg-[#181a24] hover:bg-[#202432]"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 text-xs font-bold text-[#ff5500] uppercase tracking-wider mb-2">
          <Cpu className="w-4 h-4" />
          <span>Configuração da Nuvem Shopify</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-white font-['Space_Grotesk'] mb-2">
          Integração Shopify Storefront
        </h3>

        <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
          Conecte este front-end diretamente à sua loja Shopify para sincronização de carrinho, variantes, inventário e checkout nativo.
        </p>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#ff5500]" />
              <span>Domínio da Loja Shopify</span>
            </label>
            <input
              type="text"
              placeholder="ex: ziggie3d.myshopify.com"
              value={config.shopDomain}
              onChange={(e) => setConfig({ ...config, shopDomain: e.target.value })}
              className="w-full bg-[#181a24] text-xs text-zinc-200 placeholder-zinc-500 px-3.5 py-2.5 rounded-xl border border-[#272b38] focus:outline-none focus:border-[#ff5500]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-[#1677b2]" />
              <span>Storefront Access Token (Opcional para Mock)</span>
            </label>
            <input
              type="password"
              placeholder="shpat_xxxxxxxxxxxxxxxxxxxxxxxx"
              value={config.storefrontAccessToken}
              onChange={(e) => setConfig({ ...config, storefrontAccessToken: e.target.value })}
              className="w-full bg-[#181a24] text-xs text-zinc-200 placeholder-zinc-500 px-3.5 py-2.5 rounded-xl border border-[#272b38] focus:outline-none focus:border-[#ff5500] font-mono"
            />
            <span className="text-[10px] text-zinc-500 mt-1 block">
              Gerado no Shopify Admin &rarr; Configurações &rarr; Apps e canais de vendas &rarr; Desenvolver apps.
            </span>
          </div>

          <div className="bg-[#181a24] p-3 rounded-xl border border-[#232734] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-300 font-medium">Modo de Operação</span>
              <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
                config.storefrontAccessToken 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                  : 'bg-[#ff5500]/10 text-[#ff5500] border border-[#ff5500]/20'
              }`}>
                {config.storefrontAccessToken ? 'API Storefront Conectada' : 'Modo Demonstração Interativo'}
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-normal">
              Mesmo sem o token cadastrado agora, o front-end funciona 100% com dados reais, carrinho reativo, cálculo de frete, cupom e simulação de checkout!
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#ff5500] hover:bg-[#e64c00] text-white font-bold text-xs tracking-wide transition-all shadow-lg shadow-[#ff5500]/25 flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            {savedSuccess ? <Check className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
            <span>{savedSuccess ? 'Configurações Salvas com Sucesso!' : 'Salvar Configurações'}</span>
          </button>
        </form>

      </div>
    </div>
  );
}
