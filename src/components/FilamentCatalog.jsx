import React, { useState } from 'react';
import { FILAMENTS } from '../data/products';
import { ArrowRight } from 'lucide-react';

export function FilamentCatalog({ onAddToCart, onOpenDetail }) {
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedColors, setSelectedColors] = useState({});

  const handleColorChange = (productId, colorHex, e) => {
    e.stopPropagation();
    setSelectedColors(prev => ({ ...prev, [productId]: colorHex }));
  };

  const filteredFilaments = FILAMENTS.filter(item => {
    if (selectedBrand === 'all') return true;
    if (selectedBrand === 'ziggie') return item.brand === 'Ziggie 3D';
    if (selectedBrand === 'bambu') return item.brand === 'Bambu Lab';
    if (selectedBrand === 'printalot') return item.brand === 'PrintaLot';
    if (selectedBrand === 'sunlu') return item.brand === 'SUNLU';
    if (selectedBrand === 'panchroma') return item.brand === 'Panchroma';
    return true;
  });

  return (
    <section id="filaments" className="py-24 bg-black border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-[#ff5500] mb-2">
              <span>04</span>
              <span className="text-zinc-600">/</span>
              <span>MATERIAIS DE ALTA PRECISÃO</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
              Biblioteca de Filamentos Premium
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl font-normal leading-relaxed">
              Tolerância milimétrica de ±0.015mm inspecionada a laser contínuo, enrolamento impecável e carretéis sustentáveis.
            </p>
          </div>

          {/* Minimalist Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#0b0b0e] p-1.5 rounded-full border border-white/[0.08]">
            <button
              onClick={() => setSelectedBrand('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                selectedBrand === 'all'
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Todos ({FILAMENTS.length})
            </button>
            <button
              onClick={() => setSelectedBrand('ziggie')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                selectedBrand === 'ziggie'
                  ? 'bg-[#ff5500] text-white font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Linha Ziggie
            </button>
            <button
              onClick={() => setSelectedBrand('bambu')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                selectedBrand === 'bambu'
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Bambu Lab (RFID)
            </button>
            <button
              onClick={() => setSelectedBrand('printalot')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                selectedBrand === 'printalot'
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              PrintaLot
            </button>
            <button
              onClick={() => setSelectedBrand('sunlu')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                selectedBrand === 'sunlu'
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              SUNLU
            </button>
            <button
              onClick={() => setSelectedBrand('panchroma')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                selectedBrand === 'panchroma'
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Panchroma
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {filteredFilaments.map((filament) => {
            const activeColor = selectedColors[filament.id] || (filament.colors && filament.colors[0]?.hex);

            return (
              <div
                key={filament.id}
                onClick={() => onOpenDetail(filament)}
                className="group cursor-pointer flex flex-col rounded-3xl overflow-hidden border border-white/[0.08] hover:border-white/25 transition-all duration-300 bg-[#0c0d10] hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
              >
                {/* Clean Product Canvas */}
                <div className="relative bg-white pt-8 pb-6 px-4 flex items-center justify-center min-h-[220px]">
                  
                  {/* Subtle Brand Tag */}
                  <div className="absolute top-3 left-3">
                    <span className="text-[9px] font-mono uppercase tracking-wider font-semibold text-zinc-600 bg-black/[0.04] px-2 py-0.5 rounded">
                      {filament.specs.material.split(' ')[0]}
                    </span>
                  </div>

                  <img
                    src={filament.image}
                    alt={filament.name}
                    className="w-full h-40 object-contain group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Info Container */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="text-[11px] font-mono tracking-wide text-zinc-500 mb-1">
                      {filament.brand}
                    </div>
                    <h3 className="text-white font-bold text-sm tracking-tight leading-snug line-clamp-2 font-['Space_Grotesk'] group-hover:text-[#ff5500] transition-colors">
                      {filament.name}
                    </h3>
                  </div>

                  {/* Discrete Color Swatches */}
                  {filament.colors && filament.colors.length > 0 && (
                    <div className="flex items-center gap-1.5 pt-1">
                      {filament.colors.map((c, i) => (
                        <button
                          key={i}
                          onClick={(e) => handleColorChange(filament.id, c.hex, e)}
                          className={`w-4 h-4 rounded-full border transition-all cursor-pointer flex items-center justify-center ${
                            activeColor === c.hex 
                              ? 'border-[#ff5500] scale-125' 
                              : 'border-white/20 hover:border-white/60'
                          }`}
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        />
                      ))}
                    </div>
                  )}

                  {/* Price & Action */}
                  <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                    <div>
                      <div className="text-base font-extrabold text-white font-['Space_Grotesk']">
                        R$ {filament.price.toFixed(2)}
                      </div>
                      <div className="text-[10px] text-zinc-500 font-mono">
                        R$ {(filament.price * 0.95).toFixed(2)} no Pix
                      </div>
                    </div>

                    <div className="w-7 h-7 rounded-full bg-white/[0.08] group-hover:bg-[#ff5500] group-hover:text-white text-zinc-300 flex items-center justify-center transition-colors">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
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
