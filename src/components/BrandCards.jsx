import React from 'react';
import { ChevronRight } from 'lucide-react';

export function BrandCards({ onSelectBrand }) {
  return (
    <section id="brands" className="py-20 bg-black border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-[#ff5500] mb-2">
              <span>01</span>
              <span className="text-zinc-600">/</span>
              <span>PARCERIAS ESTRATÉGICAS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight font-['Space_Grotesk']">
              Líderes Mundiais em Manufatura Aditiva
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-md font-normal leading-relaxed">
            Distribuição autorizada com garantia de fábrica, peças de reposição originais e homologação direta no Brasil.
          </p>
        </div>

        {/* The 2 Iconic Feature Cards - Faithful to reference image 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Bambu Lab */}
          <div 
            onClick={() => onSelectBrand('Bambu Lab')}
            className="group relative rounded-3xl overflow-hidden cursor-pointer border border-white/[0.08] hover:border-[#ff5500]/60 transition-all duration-500 bg-[#0a0a0c] min-h-[400px] sm:min-h-[460px] flex flex-col justify-between p-8 sm:p-12 shadow-2xl hover:shadow-[0_10px_40px_rgba(255,85,0,0.15)]"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src="/images/brand-card-bambulab.png"
                alt="Bambu Lab"
                className="w-full h-full object-cover object-center opacity-85 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
            </div>

            {/* Top Tag & Title */}
            <div className="relative z-10">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block mb-1">
                Ecossistema CoreXY
              </span>
              <h3 className="text-3xl sm:text-5xl font-extrabold text-white font-['Space_Grotesk'] tracking-tight">
                Bambu Lab
              </h3>
            </div>

            {/* Bottom Subtitle & Saiba mais */}
            <div className="relative z-10 space-y-3">
              <p className="text-zinc-300 text-sm sm:text-base font-normal max-w-sm">
                Performance para todos os níveis
              </p>
              
              <div className="inline-flex items-center gap-1.5 text-[#ff4422] font-semibold text-sm group-hover:translate-x-2 transition-transform">
                <span>Saiba mais</span>
                <ChevronRight className="w-4 h-4 stroke-[2.5]" />
              </div>
            </div>
          </div>

          {/* Card 2: Snapmaker */}
          <div 
            onClick={() => {
              const el = document.getElementById('snapmaker');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative rounded-3xl overflow-hidden cursor-pointer border border-white/[0.08] hover:border-[#ff5500]/60 transition-all duration-500 bg-[#0a0a0c] min-h-[400px] sm:min-h-[460px] flex flex-col justify-between p-8 sm:p-12 shadow-2xl hover:shadow-[0_10px_40px_rgba(255,85,0,0.15)]"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src="/images/brand-card-snapmaker.png"
                alt="Snapmaker"
                className="w-full h-full object-cover object-center opacity-85 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
            </div>

            {/* Top Tag & Title */}
            <div className="relative z-10">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block mb-1">
                Multi-Toolhead Revolution
              </span>
              <h3 className="text-3xl sm:text-5xl font-extrabold text-white font-['Space_Grotesk'] tracking-tight">
                Snapmaker
              </h3>
            </div>

            {/* Bottom Subtitle & Saiba mais */}
            <div className="relative z-10 space-y-3">
              <p className="text-zinc-300 text-sm sm:text-base font-normal max-w-sm">
                Impressão multi colorida com o mínimo de perda
              </p>
              
              <div className="inline-flex items-center gap-1.5 text-[#ff4422] font-semibold text-sm group-hover:translate-x-2 transition-transform">
                <span>Saiba mais</span>
                <ChevronRight className="w-4 h-4 stroke-[2.5]" />
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
