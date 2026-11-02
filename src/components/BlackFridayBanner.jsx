import React from 'react';
import { Sparkles, ArrowDown, Tag } from 'lucide-react';

export function BlackFridayBanner({ onBannerClick }) {
  return (
    <section className="w-full bg-[#08080a] border-b border-white/[0.08] relative overflow-hidden">
      {/* Top micro-ticker */}
      <div className="bg-gradient-to-r from-red-950/80 via-black to-amber-950/80 border-b border-red-500/20 py-2 px-4 text-center">
        <div className="flex items-center justify-center gap-2 text-[11px] sm:text-xs font-bold tracking-wider uppercase text-amber-300 font-['Space_Grotesk']">
          <Tag className="w-3.5 h-3.5 text-red-500 animate-pulse" />
          <span>BLACK FRIDAY & BLACK NOVEMBER OFICIAL</span>
          <span className="text-zinc-500">•</span>
          <span className="text-white">ATÉ 20% OFF EM IMPRESSORAS E FILAMENTOS</span>
          <span className="text-zinc-500">•</span>
          <span className="text-emerald-400 font-mono">+10% DE DESCONTO NO PIX</span>
        </div>
      </div>

      {/* Main Banner Visual Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div 
          onClick={onBannerClick}
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-red-500/30 shadow-[0_0_50px_rgba(239,68,68,0.15)] group cursor-pointer transition-all duration-300 hover:border-amber-500/50 hover:shadow-[0_0_60px_rgba(245,158,11,0.2)]"
        >
          <img 
            src="/images/black-friday-banner.png" 
            alt="Black Friday + Black November Ziggie 3D" 
            className="w-full h-auto object-cover sm:object-contain block transition-transform duration-500 group-hover:scale-[1.01]"
          />

          {/* Subtle hover overlay indicator */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-red-600 text-white text-xs font-bold shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200">
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
