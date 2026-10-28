import React from 'react';

export function ZiggieBrandStory() {
  return (
    <section id="ziggie-brand" className="py-28 bg-black border-b border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-[#ff5500]">
            <span>05</span>
            <span className="text-zinc-600">/</span>
            <span>IDENTIDADE & ENGENHARIA PRÓPRIA</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
            Manufatura Aditiva Ziggie 3D
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-normal">
            Formulação proprietária desenvolvida para extrair a máxima velocidade da nova geração de impressoras CoreXY. Controle laser em circuito fechado, ausência total de nós e carretéis sustentáveis.
          </p>
        </div>

        {/* 3 Balanced Gallery Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="rounded-3xl border border-white/[0.08] bg-[#0c0c0e] p-8 sm:p-10 flex flex-col justify-between hover:border-white/20 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
            <div className="bg-black/50 rounded-2xl p-6 flex items-center justify-center mb-8 min-h-[220px]">
              <img
                src="/images/ziggie-filament-spool.png"
                alt="Carretel Oficial Ziggie"
                className="max-h-48 object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
              />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#ff5500] uppercase tracking-widest block mb-1">
                TOLERÂNCIA ±0.015MM
              </span>
              <h3 className="text-xl font-bold text-white mb-2 font-['Space_Grotesk']">
                Carretel Transparente Otimizado
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                Visualização contínua do filamento restante e enrolamento perfeito livre de nós, ideal para alimentadores automáticos AMS de alta velocidade.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-3xl border border-white/[0.08] bg-[#0c0c0e] p-8 sm:p-10 flex flex-col justify-between hover:border-white/20 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
            <div className="bg-black/50 rounded-2xl p-6 flex items-center justify-center mb-8 min-h-[220px]">
              <img
                src="/images/ziggie-box-packaging.png"
                alt="Embalagem Ziggie Eco Box"
                className="max-h-48 object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
              />
            </div>
            <div>
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block mb-1">
                ECO PACKAGING
              </span>
              <h3 className="text-xl font-bold text-white mb-2 font-['Space_Grotesk']">
                Embalagem Sustentável
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                Caixa ecológica reforçada com grafismos em camadas de impressão 3D e selagem hermética a vácuo com dessecante duplo contra umidade.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-3xl border border-white/[0.08] bg-[#0c0c0e] p-8 sm:p-10 flex flex-col justify-between hover:border-white/20 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
            <div className="bg-black/50 rounded-2xl p-6 flex items-center justify-center mb-8 min-h-[220px]">
              <img
                src="/images/ziggie-extrusion-zg.png"
                alt="Extrusão de Alta Fluidez"
                className="max-h-48 object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
              />
            </div>
            <div>
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block mb-1">
                HIGH-FLOW ATÉ 600 MM/S
              </span>
              <h3 className="text-xl font-bold text-white mb-2 font-['Space_Grotesk']">
                Fusão Ultrarrápida
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                Índice de fluidez balanceado para manter a integridade estrutural e adesão interlaminar impecável mesmo em acelerações extremas de 20.000 mm/s².
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
