import React from 'react';
import { ArrowDown } from 'lucide-react';

export function BlackFridayBanner({ onBannerClick }) {
  return (
    <section className="w-full bg-[#08080a] border-b border-white/[0.08] relative overflow-hidden">
      {/* Main Banner Visual Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-5">
        <div 
          onClick={onBannerClick}
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-purple-500/30 shadow-[0_0_50px_rgba(168,85,247,0.2)] group cursor-pointer transition-all duration-300 hover:border-red-500/50 hover:shadow-[0_0_60px_rgba(239,68,68,0.25)]"
        >
          <img 
            src="/images/black-friday-banner.png" 
            alt="Black Friday + Black November Ziggie 3D" 
            className="w-full h-auto object-cover sm:object-contain block transition-transform duration-500 group-hover:scale-[1.01]"
          />

          {/* Subtle hover overlay indicator */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-600 to-purple-600 text-white text-xs font-bold shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200">
              <span>Conferir Ofertas da Tabela Oficial</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BlackFridayBanner;
