import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, Zap, ShieldCheck } from 'lucide-react';

export function SnapmakerShowcase({ onAddToCart, onOpenDetail }) {
  const snapmakerProduct = {
    id: 'snapmaker-u1',
    name: 'Snapmaker U1 Multi-Toolhead',
    category: 'Impressora 3D',
    brand: 'Snapmaker',
    price: 15900.00,
    oldPrice: 17500.00,
    image: '/images/snapmaker-u1-banner.png',
    badge: 'Revolução Multi-Bico',
    rating: 5.0,
    reviewsCount: 42,
    description: 'Sistema inovador com múltiplos cabeçotes independentes dedicados para cada cor/material. Elimina a torre de purga e reduz o desperdício em até 90%.',
    features: [
      'Troca ativa de ferramentas sem torre de purga',
      'Zero contaminação cruzada entre cores e materiais flexíveis/rígidos',
      'Volume massivo e câmara com temperatura estabilizada',
      'Compatível com impressão de compósitos de alta performance'
    ],
    specs: {
      volume: '300 x 300 x 330 mm',
      speed: '600 mm/s',
      accel: '20.000 mm/s²',
      nozzle: 'Multi-Toolhead 4x Bicos Dedicados',
      tempMax: '320 °C',
      bedMax: '110 °C',
      connectivity: 'Wi-Fi / Touch 7" / Ethernet'
    }
  };

  return (
    <section id="snapmaker" className="py-16 bg-white border-y border-zinc-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Flagship Product Showcase Banner */}
        <div className="bg-gradient-to-br from-zinc-50 via-white to-orange-50/30 rounded-3xl border border-zinc-200 p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Product Information & Value Proposition */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="inline-flex items-center gap-2 bg-[#ff5500]/10 border border-[#ff5500]/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#ff5500] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Lançamento Exclusivo Ziggie 3D</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 tracking-tight leading-[1.1] font-['Space_Grotesk']">
                Snapmaker U1 <br />
                <span className="text-[#ff5500]">Multi-Toolhead</span>
              </h2>

              <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
                Revolucione sua produção multimaterial. O sistema com <strong>4 cabeçotes dedicados</strong> troca de ferramenta diretamente no ar, eliminando a torre de purga e reduzindo o tempo de impressão e o desperdício de filamento em até 90%.
              </p>

              {/* Feature Pills */}
              <div className="grid grid-cols-2 gap-3 text-xs text-zinc-700 pt-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="font-medium">4 Bicos Independentes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="font-medium">Zero Torre de Purga</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="font-medium">Até 600 mm/s de Velocidade</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="font-medium">Volume 300 × 300 × 330 mm</span>
                </div>
              </div>

              {/* Pricing & CTA */}
              <div className="pt-4 border-t border-zinc-200/80 flex flex-col sm:flex-row sm:items-center gap-6">
                <div>
                  <div className="text-xs text-zinc-400 line-through font-mono">
                    R$ 17.500,00
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-zinc-900 font-['Space_Grotesk']">
                    R$ 15.900,00
                  </div>
                  <div className="text-xs font-semibold text-emerald-600 font-mono">
                    R$ 15.105,00 à vista no Pix (-5%)
                  </div>
                  <div className="text-[11px] text-zinc-500">
                    💳 ou 12x de R$ 1.325,00 sem juros
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => onAddToCart(snapmakerProduct)}
                    className="px-6 py-3 bg-[#ff5500] hover:bg-[#e64c00] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Comprar Agora</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onOpenDetail(snapmakerProduct)}
                    className="px-5 py-3 bg-white hover:bg-zinc-100 text-zinc-800 border border-zinc-300 font-bold text-xs rounded-xl transition-colors cursor-pointer text-center"
                  >
                    Ver Ficha Técnica
                  </button>
                </div>
              </div>

            </div>

            {/* Right Column: Clean High-Resolution Machine Presentation */}
            <div className="lg:col-span-6 flex justify-center items-center">
              <div className="relative w-full max-w-lg p-4">
                <img
                  src="/images/snapmaker-u1-banner.png"
                  alt="Snapmaker U1 Multi-Toolhead"
                  className="w-full h-auto object-contain drop-shadow-xl hover:scale-102 transition-transform duration-300"
                />
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
