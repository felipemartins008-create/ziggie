import React, { useState } from 'react';
import { PRINTERS } from '../data/products';
import { ArrowRight } from 'lucide-react';

export function PrinterCatalog({ onAddToCart, onOpenDetail, selectedBrandFilter }) {
  const [activeTab, setActiveTab] = useState('all');

  const filteredPrinters = PRINTERS.filter(printer => {
    if (selectedBrandFilter && printer.brand !== selectedBrandFilter) return false;
    
    if (activeTab === 'serie-a') {
      return printer.id.includes('a1') || printer.id.includes('a2l');
    }
    if (activeTab === 'serie-h') {
      return printer.id.includes('h2');
    }
    if (activeTab === 'closed') {
      return printer.id.includes('x2') || printer.id.includes('p2s');
    }
    return true;
  });

  return (
    <section id="printers" className="py-24 bg-black border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-[#ff5500] mb-2">
              <span>02</span>
              <span className="text-zinc-600">/</span>
              <span>VITRINE FLAGSHIP COREXY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
              Impressoras 3D Bambu Lab
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl font-normal leading-relaxed">
              Equipamentos CoreXY de alta velocidade com calibração automática por IA e ecossistema multicolorido.
            </p>
          </div>

          {/* Minimalist Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#0b0b0e] p-1.5 rounded-full border border-white/[0.08]">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Todas ({PRINTERS.length})
            </button>
            <button
              onClick={() => setActiveTab('serie-a')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'serie-a'
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Série A (A1 / A1 Mini / A2L)
            </button>
            <button
              onClick={() => setActiveTab('serie-h')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'serie-h'
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Série H (Dual / Farm)
            </button>
            <button
              onClick={() => setActiveTab('closed')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'closed'
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Gabinete Fechado (P2S / X2D)
            </button>
          </div>
        </div>

        {/* Clean, Architectural Product Grid - Reference images 2 & 3 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrinters.map((printer) => {
            return (
              <div
                key={printer.id}
                onClick={() => onOpenDetail(printer)}
                className="group cursor-pointer flex flex-col rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 border border-transparent hover:border-white/[0.12] hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
              >
                {/* Pristine White Canvas with Printer Image */}
                <div className="relative bg-white pt-10 pb-8 px-6 flex items-center justify-center min-h-[310px] overflow-hidden">
                  
                  {/* Subtle technical tag at top left */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="text-[10px] font-mono tracking-wider font-semibold text-zinc-600 uppercase bg-black/[0.04] px-2 py-0.5 rounded">
                      {printer.specs.volume.split('x')[0]}³
                    </span>
                    <span className="text-[10px] font-mono tracking-wider font-semibold text-zinc-600 uppercase bg-black/[0.04] px-2 py-0.5 rounded">
                      {printer.specs.speed}
                    </span>
                  </div>

                  <img
                    src={printer.image}
                    alt={printer.name}
                    className="w-full h-56 object-contain group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Signature Bottom Capsule - Reference images 2 & 3 */}
                <div className="bg-[#18191e] px-6 py-4 flex items-center justify-between border-t border-white/[0.04]">
                  <div>
                    <h3 className="text-white font-bold text-lg font-['Space_Grotesk'] tracking-tight group-hover:text-[#ff5500] transition-colors leading-tight">
                      {printer.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-zinc-400 mt-1">
                      <span>{printer.category}</span>
                      <span className="text-zinc-600">•</span>
                      <span className="text-zinc-200 font-semibold font-mono">
                        R$ {printer.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>

                  {/* Red/Coral Action Arrow Square Button */}
                  <div
                    className="w-9 h-9 rounded-xl bg-[#e53e3e] group-hover:bg-[#ff5500] text-white flex items-center justify-center transition-all duration-300 group-hover:translate-x-1 shadow-md flex-shrink-0"
                    title="Ver especificações e comprar"
                  >
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
