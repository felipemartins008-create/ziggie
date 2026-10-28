import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Flame, Zap, ShoppingBag } from 'lucide-react';

export function BentoGridHero({ onAddToCart, onOpenDetail, onSelectCategory }) {
  const a1ComboProduct = {
    id: 'bambu-a1-combo',
    name: 'Bambu Lab A1 com AMS Lite Combo',
    category: 'Impressoras 3D',
    brand: 'Bambu Lab',
    price: 4299.00,
    oldPrice: 4899.00,
    image: '/images/printer-bambu-a1.png',
    badge: 'Mais Vendido 2026',
    rating: 4.9,
    reviewsCount: 128,
    installments: 12,
    installmentValue: 358.25,
    description: 'A impressora 3D multicolorida mais aclamada do mundo. O combo inclui o sistema AMS Lite de 4 cores com calibração ativa de fluxo totalmente automática.',
    specs: {
      volume: '256 x 256 x 256 mm',
      speed: '500 mm/s',
      accel: '10.000 mm/s²',
      nozzle: 'Troca Rápida 0.4mm Aço Inox',
      colors: 'Até 4 cores simultâneas (AMS Lite incluso)'
    }
  };

  const ziggieFilament = {
    id: 'ziggie-tough-pla-preto',
    name: 'Filamento Ziggie Pro Tough PLA 1.75mm 1kg',
    category: 'Filamentos',
    brand: 'Ziggie 3D',
    price: 119.90,
    oldPrice: 139.90,
    image: '/images/ziggie-filament-spool.png',
    badge: 'Linha Oficial Pro',
    rating: 4.9,
    reviewsCount: 89,
    description: 'Desenvolvido especialmente para impressão de alta velocidade com resistência mecânica aprimorada e bobinamento de precisão computadorizada.',
    specs: {
      diameter: '1.75 mm ± 0.02 mm',
      tempPrint: '200 - 230 °C',
      tempBed: '45 - 60 °C',
      speed: 'Até 500 mm/s'
    }
  };

  return (
    <div className="mb-10">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#ff5500]/10 text-[#ff5500] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ecossistema Ziggie 3D • Coleção 2026</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 font-['Space_Grotesk'] tracking-tight">
            Tecnologia de Ponta para Criadores e Indústria
          </h2>
        </div>

        <div className="flex items-center gap-4 text-xs font-medium text-zinc-500">
          <span className="flex items-center gap-1.5 text-zinc-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Estoque Pronta Entrega Brasil
          </span>
          <span>•</span>
          <span className="text-zinc-700 font-semibold">Garantia Nacional de 1 Ano</span>
        </div>
      </div>

      {/* Bento Grid: 1 Large Card + 2 Stacked Lateral Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* ================= HERO CARD 1 (LARGE - 7 COLS) ================= */}
        <div className="lg:col-span-7 bg-gradient-to-br from-white via-zinc-50 to-orange-50/20 rounded-3xl border border-zinc-200/90 p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          
          {/* Top Row: Badges */}
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="bg-zinc-900 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full tracking-wider shadow-xs">
                Combo Multicolor
              </span>
              <span className="bg-emerald-500 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md">
                Pronta Entrega
              </span>
            </div>
            
            <div className="text-xs font-bold text-zinc-400 font-mono">
              ★ 4.9 (128 avaliações)
            </div>
          </div>

          {/* Main Visual & Info Area */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center my-4 z-10">
            
            {/* Info */}
            <div className="sm:col-span-7 space-y-3">
              <span className="text-[11px] font-mono uppercase text-[#ff5500] font-bold tracking-wider">
                BAMBU LAB • OFICIAL BRASIL
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-zinc-900 font-['Space_Grotesk'] leading-tight group-hover:text-[#ff5500] transition-colors">
                Bambu Lab A1 com AMS Lite Combo
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Impressão multicolorida com 4 bobinas ativas, calibração automática de fluxo e bico de troca rápida sem ferramentas.
              </p>

              {/* Quick Tech Specs */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="text-[10px] font-mono font-bold bg-white border border-zinc-200 px-2 py-0.5 rounded-md text-zinc-700">
                  ⚡ 500 mm/s
                </span>
                <span className="text-[10px] font-mono font-bold bg-white border border-zinc-200 px-2 py-0.5 rounded-md text-zinc-700">
                  🎨 4 Cores
                </span>
                <span className="text-[10px] font-mono font-bold bg-white border border-zinc-200 px-2 py-0.5 rounded-md text-zinc-700">
                  📐 256³ mm
                </span>
              </div>
            </div>

            {/* Product Image */}
            <div 
              onClick={() => onOpenDetail(a1ComboProduct)}
              className="sm:col-span-5 flex items-center justify-center cursor-pointer p-2"
            >
              <img
                src="/images/printer-bambu-a1.png"
                alt="Bambu Lab A1 Combo"
                className="max-h-56 sm:max-h-64 object-contain group-hover:scale-105 transition-transform duration-300 filter drop-shadow-md"
              />
            </div>

          </div>

          {/* Bottom Row: Price & Actions */}
          <div className="pt-4 border-t border-zinc-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 z-10">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xs text-zinc-400 line-through font-mono">R$ 4.899,00</span>
                <span className="text-2xl font-black text-zinc-900 font-['Space_Grotesk']">R$ 4.299,00</span>
              </div>
              <div className="text-xs font-bold text-emerald-600 font-mono">
                R$ 4.084,05 no Pix (-5%) • 12x de R$ 358,25 sem juros
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenDetail(a1ComboProduct)}
                className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Detalhes
              </button>
              <button
                onClick={() => onAddToCart(a1ComboProduct)}
                className="px-5 py-2 bg-[#ff5500] hover:bg-[#e64c00] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Comprar Combo</span>
              </button>
            </div>
          </div>

        </div>

        {/* ================= RIGHT COLUMN (5 COLS): 2 STACKED CARDS ================= */}
        <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
          
          {/* Card 2: Filamentos Ziggie Pro */}
          <div className="bg-white rounded-3xl border border-zinc-200/90 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between gap-4 group">
            <div className="space-y-2 flex-1">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#ff5500] bg-orange-50 px-2 py-0.5 rounded-md">
                <Flame className="w-3 h-3" />
                <span>Fabricação Própria Ziggie</span>
              </div>
              <h3 className="text-base font-bold text-zinc-900 font-['Space_Grotesk'] group-hover:text-[#ff5500] transition-colors">
                Filamentos Ziggie Pro Tough PLA
              </h3>
              <p className="text-xs text-zinc-500 line-clamp-2">
                Tolerância laser ±0.02mm, alta fluidez para até 500 mm/s e acabamento fosco premium.
              </p>
              <div className="pt-1 flex items-baseline gap-2">
                <span className="text-lg font-black text-zinc-900 font-mono">R$ 119,90</span>
                <span className="text-[11px] font-bold text-emerald-600 font-mono">no Pix à vista</span>
              </div>
              <button
                onClick={() => onSelectCategory('Filamentos')}
                className="text-xs font-bold text-[#ff5500] hover:underline flex items-center gap-1 pt-1 cursor-pointer"
              >
                <span>Ver toda a linha de cores</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div 
              onClick={() => onOpenDetail(ziggieFilament)}
              className="w-28 sm:w-32 h-28 sm:h-32 flex-shrink-0 flex items-center justify-center cursor-pointer p-1"
            >
              <img
                src="/images/ziggie-filament-spool.png"
                alt="Filamento Ziggie 3D"
                className="max-h-full max-w-full object-contain group-hover:rotate-6 transition-transform duration-300 filter drop-shadow-sm"
              />
            </div>
          </div>

          {/* Card 3: Snapmaker U1 4-Head Banner Callout */}
          <div className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 text-white rounded-3xl p-5 sm:p-6 shadow-sm flex items-center justify-between gap-4 group relative overflow-hidden">
            <div className="space-y-2 flex-1 z-10">
              <span className="text-[10px] font-mono uppercase tracking-wider text-orange-400 font-bold block">
                NOVIDADE MUNDIAL
              </span>
              <h3 className="text-base font-bold text-white font-['Space_Grotesk']">
                Snapmaker U1 Multi-Toolhead
              </h3>
              <p className="text-xs text-zinc-300">
                4 bicos dedicados e zero torre de purga. Economize 90% em filamento.
              </p>
              <div className="pt-1">
                <a
                  href="#snapmaker"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ff5500] hover:text-orange-300 transition-colors"
                >
                  <span>Conhecer tecnologia</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="w-24 sm:w-28 h-24 sm:h-28 flex-shrink-0 flex items-center justify-center z-10">
              <img
                src="/images/snapmaker-u1-banner.png"
                alt="Snapmaker U1"
                className="max-h-full max-w-full object-contain filter drop-shadow-lg group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Subtle glow effect */}
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#ff5500]/20 to-transparent pointer-events-none"></div>
          </div>

        </div>

      </div>
    </div>
  );
}
