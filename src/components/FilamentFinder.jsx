import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight, Layers, Flame, Sun, Cog } from 'lucide-react';

export function FilamentFinder({ onAddToCart, onSelectCategory }) {
  const [selectedUse, setSelectedUse] = useState('art');

  const recommendations = {
    art: {
      title: 'Decoração, Cosplay & Miniaturas',
      material: 'Ziggie Tough PLA ou PLA Matte',
      easyRating: 'Fácil (10/10)',
      tempPrint: '205 - 220 °C',
      tempBed: '45 - 60 °C (não necessita gabinete)',
      speed: 'Até 500 mm/s',
      highlight: 'Zero empenamento (warping), cores vibrantes e acabamento fosco sem linhas visíveis.',
      recommendedProduct: {
        id: 'ziggie-tough-pla-preto',
        name: 'Filamento Ziggie Pro Tough PLA 1.75mm 1kg',
        category: 'Filamentos',
        brand: 'Ziggie 3D',
        price: 119.90,
        image: '/images/ziggie-filament-spool.png',
        badge: 'Recomendado'
      }
    },
    mechanic: {
      title: 'Peças Funcionais & Resistência a Impacto',
      material: 'PETG Pro ou Tough PLA Reforçado',
      easyRating: 'Médio (8/10)',
      tempPrint: '235 - 250 °C',
      tempBed: '70 - 80 °C',
      speed: 'Até 300 mm/s',
      highlight: 'Excelente adesão interlaminar, resistência à tração e flexibilidade para absorver choques.',
      recommendedProduct: {
        id: 'filament-printalot-pla-preto',
        name: 'Filamento PrintaLot PLA Alta Resistência 1kg',
        category: 'Filamentos',
        brand: 'PrintaLot',
        price: 139.00,
        image: '/images/filament-printalot-pla-preto.png',
        badge: 'Ultra Forte'
      }
    },
    outdoor: {
      title: 'Uso Externo, Sol, Chuva e Alta Temperatura',
      material: 'ABS / ASA com Proteção UV',
      easyRating: 'Avançado (7/10 - Requer Gabinete Fechado)',
      tempPrint: '250 - 270 °C',
      tempBed: '90 - 110 °C',
      speed: 'Até 350 mm/s',
      highlight: 'Resiste a temperaturas de até 100°C sem amolecer e não degrada com radiação solar.',
      recommendedProduct: {
        id: 'filament-sunlu-white',
        name: 'Filamento Técnico SUNLU Alta Temperatura 1kg',
        category: 'Filamentos',
        brand: 'SUNLU',
        price: 149.00,
        image: '/images/filament-sunlu-white.png',
        badge: 'Grau Engenharia'
      }
    }
  };

  const current = recommendations[selectedUse];

  return (
    <div className="my-10 bg-white rounded-3xl border border-zinc-200/90 p-6 sm:p-8 shadow-xs">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-100">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ff5500] uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Consultoria Técnica Automática</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-zinc-900 font-['Space_Grotesk'] tracking-tight">
            Guia Visual de Filamento Perfeito
          </h3>
          <p className="text-xs text-zinc-500">
            Selecione o objetivo da sua peça e descubra o material com os parâmetros ideais de impressão.
          </p>
        </div>

        {/* 3 Selector Tabs */}
        <div className="flex bg-zinc-100 p-1 rounded-2xl border border-zinc-200">
          <button
            onClick={() => setSelectedUse('art')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedUse === 'art' ? 'bg-white text-zinc-900 shadow-xs' : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-[#ff5500]" />
            <span>Decoração / Miniaturas</span>
          </button>

          <button
            onClick={() => setSelectedUse('mechanic')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedUse === 'mechanic' ? 'bg-white text-zinc-900 shadow-xs' : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Cog className="w-3.5 h-3.5 text-[#ff5500]" />
            <span>Peças Mecânicas</span>
          </button>

          <button
            onClick={() => setSelectedUse('outdoor')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedUse === 'outdoor' ? 'bg-white text-zinc-900 shadow-xs' : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Sun className="w-3.5 h-3.5 text-[#ff5500]" />
            <span>Uso Externo / Calor</span>
          </button>
        </div>
      </div>

      {/* Result Card Layout */}
      <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left: Material Specs */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center gap-2">
            <span className="bg-[#ff5500] text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md">
              Material Recomendado
            </span>
            <span className="text-sm font-black text-zinc-900 font-['Space_Grotesk']">
              {current.material}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
            {current.highlight}
          </p>

          {/* Technical Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-3">
              <span className="text-[10px] font-bold text-zinc-400 block uppercase font-mono">Facilidade</span>
              <span className="text-xs font-extrabold text-zinc-800">{current.easyRating}</span>
            </div>

            <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-3">
              <span className="text-[10px] font-bold text-zinc-400 block uppercase font-mono">Bico (Nozzle)</span>
              <span className="text-xs font-extrabold text-zinc-800 font-mono">{current.tempPrint}</span>
            </div>

            <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-3">
              <span className="text-[10px] font-bold text-zinc-400 block uppercase font-mono">Mesa (Bed)</span>
              <span className="text-xs font-extrabold text-zinc-800 font-mono">{current.tempBed}</span>
            </div>

            <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-3">
              <span className="text-[10px] font-bold text-zinc-400 block uppercase font-mono">Velocidade</span>
              <span className="text-xs font-extrabold text-zinc-800 font-mono">{current.speed}</span>
            </div>
          </div>
        </div>

        {/* Right: Quick Buy Recommended Filament Spool */}
        <div className="lg:col-span-4 bg-gradient-to-br from-zinc-50 to-orange-50/30 border border-zinc-200 rounded-2xl p-4 flex items-center justify-between gap-4">
          <div className="w-20 h-20 flex-shrink-0 flex items-center justify-center">
            <img
              src={current.recommendedProduct.image}
              alt={current.recommendedProduct.name}
              className="max-h-full max-w-full object-contain filter drop-shadow-sm"
            />
          </div>

          <div className="flex-1 space-y-1">
            <h4 className="text-xs font-bold text-zinc-900 line-clamp-1 font-['Space_Grotesk']">
              {current.recommendedProduct.name}
            </h4>
            <div className="text-base font-black text-zinc-900 font-mono">
              R$ {current.recommendedProduct.price.toFixed(2).replace('.', ',')}
            </div>
            <button
              onClick={() => onAddToCart(current.recommendedProduct)}
              className="w-full py-1.5 px-3 bg-[#ff5500] hover:bg-[#e64c00] text-white text-[11px] font-bold rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Adicionar ao Carrinho</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
