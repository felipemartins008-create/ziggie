import React, { useState } from 'react';
import { Check, Copy, Calculator, Sparkles } from 'lucide-react';

export function PrintCostCalculator() {
  const [weightGrams, setWeightGrams] = useState(120);
  const [filamentPrice, setFilamentPrice] = useState(139);
  const [printHours, setPrintHours] = useState(4.5);
  const [marginPercent, setMarginPercent] = useState(100);
  const [copied, setCopied] = useState(false);

  // Cálculos precisos
  const materialCost = (weightGrams / 1000) * filamentPrice;
  const energyCost = (150 / 1000) * printHours * 0.92; // 150W médios
  const machineDepreciation = printHours * 1.50; // Desgaste bico e mecânica
  const totalCost = materialCost + energyCost + machineDepreciation;
  const suggestedPrice = totalCost * (1 + marginPercent / 100);

  const handleCopyBudget = () => {
    const text = `Orçamento Ziggie 3D:\n• Peso: ${weightGrams}g\n• Tempo: ${printHours}h\n• Custo de Produção: R$ ${totalCost.toFixed(2)}\n• Preço Sugerido: R$ ${suggestedPrice.toFixed(2)}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="calculator" className="py-16 bg-[#f8fafc] border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mb-10">
          <div className="inline-flex items-center gap-2 bg-[#ff5500]/10 text-[#ff5500] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Ferramenta Exclusiva Maker</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight font-['Space_Grotesk']">
            Calculadora de Custo de Impressão 3D
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 mt-1 font-normal leading-relaxed">
            Simule em tempo real o custo exato de produção e precifique suas peças com base nos filamentos Ziggie e máquinas CoreXY.
          </p>
        </div>

        {/* Clean Instrument Panel */}
        <div className="max-w-4xl bg-white border border-zinc-200 rounded-3xl p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Sliders Column */}
            <div className="lg:col-span-7 space-y-5">
              
              <div>
                <div className="flex justify-between text-xs text-zinc-600 mb-1.5 font-medium">
                  <span className="uppercase text-[11px] tracking-wider text-zinc-500 font-bold">Peso do Modelo (Slicer)</span>
                  <span className="text-zinc-900 font-mono font-bold">{weightGrams} gramas</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="1000"
                  step="5"
                  value={weightGrams}
                  onChange={(e) => setWeightGrams(Number(e.target.value))}
                  className="w-full accent-[#ff5500] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-zinc-600 mb-1.5 font-medium">
                  <span className="uppercase text-[11px] tracking-wider text-zinc-500 font-bold">Valor do Carretel (1Kg)</span>
                  <span className="text-zinc-900 font-mono font-bold">R$ {filamentPrice.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="80"
                  max="350"
                  step="5"
                  value={filamentPrice}
                  onChange={(e) => setFilamentPrice(Number(e.target.value))}
                  className="w-full accent-[#ff5500] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-zinc-600 mb-1.5 font-medium">
                  <span className="uppercase text-[11px] tracking-wider text-zinc-500 font-bold">Tempo de Máquina</span>
                  <span className="text-zinc-900 font-mono font-bold">{printHours} h</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="36"
                  step="0.5"
                  value={printHours}
                  onChange={(e) => setPrintHours(Number(e.target.value))}
                  className="w-full accent-[#ff5500] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-zinc-600 mb-1.5 font-medium">
                  <span className="uppercase text-[11px] tracking-wider text-zinc-500 font-bold">Margem Comercial de Lucro</span>
                  <span className="text-zinc-900 font-mono font-bold">{marginPercent}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="300"
                  step="10"
                  value={marginPercent}
                  onChange={(e) => setMarginPercent(Number(e.target.value))}
                  className="w-full accent-[#ff5500] cursor-pointer"
                />
              </div>

            </div>

            {/* Readout Summary Column */}
            <div className="lg:col-span-5 bg-zinc-50 border border-zinc-200 rounded-2xl p-6 space-y-5">
              <div className="space-y-2 text-xs text-zinc-600">
                <div className="flex justify-between">
                  <span>Custo de Filamento:</span>
                  <span className="font-mono font-bold text-zinc-900">R$ {materialCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Energia & Desgaste:</span>
                  <span className="font-mono font-bold text-zinc-900">R$ {(energyCost + machineDepreciation).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-zinc-900 font-bold pt-2 border-t border-zinc-200">
                  <span>Custo Total de Produção:</span>
                  <span className="font-mono text-[#ff5500]">R$ {totalCost.toFixed(2)}</span>
                </div>
              </div>

              <div className="pt-2 text-center bg-white p-4 rounded-xl border border-zinc-200">
                <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 mb-1">
                  PREÇO SUGERIDO AO CLIENTE
                </div>
                <div className="text-3xl font-black text-zinc-900 font-['Space_Grotesk'] tracking-tight">
                  R$ {suggestedPrice.toFixed(2)}
                </div>
                <div className="text-[11px] text-emerald-600 font-mono font-bold mt-1">
                  Lucro Líquido: R$ {(suggestedPrice - totalCost).toFixed(2)}
                </div>
              </div>

              <button
                onClick={handleCopyBudget}
                className="w-full py-3 rounded-xl bg-zinc-900 hover:bg-black text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Orçamento Copiado!' : 'Copiar Orçamento'}</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
