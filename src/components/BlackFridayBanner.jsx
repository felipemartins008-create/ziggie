import React from 'react';
import { Sparkles, Flame, ArrowRight, Zap, ShieldCheck } from 'lucide-react';
import { useLiveProducts } from '../services/livePrices';

const FEATURED_MACHINES = [
  {
    id: 'bambu-a1-combo',
    name: 'Bambu Lab A1 Combo',
    discount: '-15%',
    oldPrice: 'R$ 5.299,00',
    price: 'R$ 4.499,00',
    image: '/images/printer-bambu-a1.png',
    neonColor: 'rgba(239, 68, 68, 0.9)',
    neonBorder: '#ef4444',
  },
  {
    id: 'snapmaker-u1',
    name: 'Snapmaker U1',
    badge: 'BLACK NOVEMBER',
    discount: '-15%',
    oldPrice: 'R$ 12.990,00',
    price: 'R$ 10.990,00',
    image: '/images/printer-snapmaker-u1.png?v=card3',
    neonColor: 'rgba(234, 179, 8, 0.9)',
    neonBorder: '#eab308',
  },
  {
    id: 'bambu-p2s',
    name: 'Bambu Lab P2S Combo',
    discount: '-15%',
    oldPrice: 'R$ 10.999,00',
    price: 'R$ 9.399,00',
    image: '/images/printer-bambu-p2s.png',
    neonColor: 'rgba(168, 85, 247, 0.9)',
    neonBorder: '#a855f7',
  },
  {
    id: 'bambu-x2d',
    name: 'Bambu Lab X2D Combo',
    discount: '-16%',
    oldPrice: 'R$ 13.999,00',
    price: 'R$ 11.699,00',
    image: '/images/printer-bambu-x2d.png',
    neonColor: 'rgba(56, 189, 248, 0.9)',
    neonBorder: '#38bdf8',
  },
];

export function BlackFridayBanner({ onBannerClick }) {
  const liveProducts = useLiveProducts();

  const featuredMachines = FEATURED_MACHINES.map(machine => {
    const live = liveProducts.find(p => p.id === machine.id);
    if (!live) return machine;
    return {
      ...machine,
      price: 'R$ ' + Number(live.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 }),
      oldPrice: live.oldPrice ? 'R$ ' + Number(live.oldPrice).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : machine.oldPrice
    };
  });

  const handleClick = (e, targetId) => {
    e.stopPropagation();
    if (onBannerClick) {
      onBannerClick(targetId);
    }
  };

  return (
    <section 
      onClick={(e) => handleClick(e, 'all')}
      className="w-full relative overflow-hidden bg-[#06060a] border-b border-white/[0.08] cursor-pointer group select-none"
      title="Clique para conferir as ofertas de Black Friday"
    >
      {/* Dynamic Ambient Glow & Neon Laser Beams */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Left Red Neon Laser Beam */}
        <div 
          className="absolute -top-32 -left-16 w-[450px] h-[700px] opacity-35 blur-[50px] transform -rotate-12"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(239, 68, 68, 0.45) 0%, rgba(220, 38, 38, 0.15) 50%, transparent 75%)'
          }}
        />

        {/* Diagonal Sharp Laser Beam (Red) */}
        <div 
          className="absolute top-0 left-[28%] w-[1.5px] h-[600px] transform -rotate-[32deg] origin-top opacity-60"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(255, 42, 75, 0.8) 40%, rgba(255, 42, 75, 0.1) 85%, transparent 100%)',
            boxShadow: '0 0 10px #ff2a4b, 0 0 20px #ff2a4b'
          }}
        />

        {/* Right Purple/Cyan Neon Laser Beam */}
        <div 
          className="absolute -top-32 right-0 w-[550px] h-[700px] opacity-40 blur-[60px]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(168, 85, 247, 0.4) 0%, rgba(56, 189, 248, 0.15) 50%, transparent 75%)'
          }}
        />

        {/* Diagonal Sharp Laser Beam (Purple / Blue) */}
        <div 
          className="absolute top-0 right-[25%] w-[1.5px] h-[600px] transform rotate-[28deg] origin-top opacity-70"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(168, 85, 247, 0.9) 35%, rgba(56, 189, 248, 0.6) 70%, transparent 100%)',
            boxShadow: '0 0 12px #a855f7, 0 0 24px #38bdf8'
          }}
        />

        {/* Glowing Ember Particles */}
        <div className="absolute bottom-12 left-[48%] w-1.5 h-1.5 rounded-full bg-amber-400 opacity-75 shadow-[0_0_8px_#f59e0b] animate-ping" />
        <div className="absolute top-20 right-[42%] w-1 h-1 rounded-full bg-rose-400 opacity-60 shadow-[0_0_6px_#f43f5e]" />
        <div className="absolute bottom-24 right-[15%] w-1.5 h-1.5 rounded-full bg-cyan-300 opacity-70 shadow-[0_0_8px_#38bdf8]" />

        {/* Dark Metallic Floor with subtle horizon line */}
        <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-black via-zinc-950/70 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 via-red-500/20 to-transparent" />
      </div>

      {/* Main Content Container (Edge-to-Edge with Max Content Spread) */}
      <div className="relative z-10 w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12 py-7 sm:py-8 lg:py-9">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">

          {/* Left Column: 100% Vector Crisp Typography & CTA (5 cols on large) */}
          <div className="lg:col-span-5 flex flex-col items-start justify-center">
            
            {/* Top Amber Pill Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-amber-400 text-black font-extrabold text-[11px] sm:text-xs tracking-wider uppercase shadow-md shadow-amber-400/20">
              <Sparkles className="w-3.5 h-3.5 fill-black stroke-none" />
              <span>OFERTAS IMPERDÍVEIS</span>
            </div>

            {/* Neon Giant Title: BLACK FRIDAY */}
            <div className="mt-3 font-['Space_Grotesk'] font-black tracking-tight leading-[0.88] select-none">
              {/* BLACK (Red Neon Glow) */}
              <div 
                className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl tracking-tight text-transparent font-black"
                style={{
                  WebkitTextStroke: '2.5px #ff2a4b',
                  filter: 'drop-shadow(0 0 16px rgba(255, 42, 75, 0.85)) drop-shadow(0 0 35px rgba(255, 42, 75, 0.35))'
                }}
              >
                BLACK
              </div>
              {/* FRIDAY (Violet/Purple Neon Glow) */}
              <div 
                className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl tracking-tight text-transparent font-black mt-1"
                style={{
                  WebkitTextStroke: '2.5px #a855f7',
                  filter: 'drop-shadow(0 0 16px rgba(168, 85, 247, 0.85)) drop-shadow(0 0 35px rgba(168, 85, 247, 0.35))'
                }}
              >
                FRIDAY
              </div>
            </div>

            {/* Secondary Badge: + BLACK NOVEMBER */}
            <div className="mt-3.5 inline-flex items-center gap-1.5 px-3.5 py-1 rounded bg-white text-zinc-950 font-black text-xs sm:text-sm tracking-widest uppercase shadow-xl">
              <span className="text-red-600 font-extrabold">+</span>
              <span>BLACK NOVEMBER</span>
            </div>

            {/* Subtitle */}
            <p className="mt-3 text-zinc-300 font-medium text-sm sm:text-base leading-snug max-w-md">
              Impressoras 3D e filamentos com preços especiais
            </p>

            {/* 3D Glossy Red Button: ATÉ 20% OFF */}
            <div className="mt-4 inline-flex items-center gap-2.5 px-6 sm:px-7 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-red-600 via-rose-500 to-red-600 text-white font-black text-base sm:text-lg tracking-wider uppercase shadow-[0_0_28px_rgba(239,68,68,0.7),inset_0_1px_2px_rgba(255,255,255,0.45)] border border-red-400/50 group-hover:brightness-110 group-hover:scale-[1.03] transition-all duration-300">
              <Flame className="w-5 h-5 fill-white stroke-none animate-pulse" />
              <span>ATÉ 20% OFF</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>

            {/* Disclaimer */}
            <div className="mt-2.5 flex items-center gap-2 text-[11px] sm:text-xs text-zinc-400 font-semibold tracking-wider uppercase">
              <span>VÁLIDO ATÉ 30/11</span>
              <span>•</span>
              <span>SUJEITO A ESTOQUE</span>
            </div>
          </div>

          {/* Right Column: 4 Featured Machines on Glowing Stage (7 cols on large) */}
          <div className="lg:col-span-7">
            
            {/* Grid of 4 Featured Machines with Floating Price Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 items-end">
              {featuredMachines.map((machine) => (
                <div
                  key={machine.id}
                  onClick={(e) => handleClick(e, machine.id)}
                  className="group/item relative flex flex-col items-center justify-end transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                >
                  {/* Floating Deal Glass Card */}
                  <div 
                    className="w-full bg-zinc-950/85 backdrop-blur-md border border-white/10 rounded-xl p-2.5 shadow-2xl transition-all duration-300 group-hover/item:border-white/25 group-hover/item:bg-zinc-900/90"
                    style={{
                      boxShadow: `0 8px 24px -6px ${machine.neonColor}`
                    }}
                  >
                    {/* Discount & Badge Tag */}
                    <div className="flex items-center justify-between gap-1 mb-1.5">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-amber-400 text-black">
                        {machine.discount}
                      </span>
                      {machine.badge && (
                        <span className="text-[9px] font-bold text-red-400 tracking-wider uppercase truncate">
                          {machine.badge}
                        </span>
                      )}
                    </div>

                    {/* Machine Name */}
                    <h3 className="text-xs sm:text-[13px] font-extrabold text-white truncate font-['Space_Grotesk']">
                      {machine.name}
                    </h3>

                    {/* Old Price */}
                    <div className="text-[10px] text-zinc-400 line-through font-mono mt-0.5">
                      De {machine.oldPrice}
                    </div>

                    {/* Promo Price */}
                    <div className="text-xs sm:text-sm font-black text-amber-400 font-mono tracking-tight">
                      {machine.price}
                    </div>
                  </div>

                  {/* Machine Visual on Neon Pedestal */}
                  <div className="relative mt-2 w-full flex flex-col items-center justify-center">
                    
                    {/* Product Image */}
                    <div className="h-32 sm:h-36 md:h-40 lg:h-44 w-full flex items-center justify-center overflow-hidden">
                      <img
                        src={machine.image}
                        alt={machine.name}
                        className="max-h-full max-w-full object-contain filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.8)] group-hover/item:scale-105 transition-transform duration-300"
                        loading="eager"
                      />
                    </div>

                    {/* Neon Pedestal Base */}
                    <div 
                      className="w-4/5 h-2 rounded-full blur-[1px] -mt-1 transition-all duration-300 group-hover/item:h-2.5"
                      style={{
                        background: `radial-gradient(ellipse at center, ${machine.neonColor} 0%, transparent 75%)`,
                        boxShadow: `0 0 12px ${machine.neonBorder}`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Feature Strip Below Machines */}
            <div className="mt-5 pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px] sm:text-xs text-zinc-400 font-medium">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Garantia Oficial no Brasil</span>
              </div>
              <div className="flex items-center gap-1 text-zinc-300">
                <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>Pronta Entrega com Envio Imediato</span>
              </div>
              <div className="hidden sm:inline-block font-mono text-zinc-400">
                PIX com 10% OFF
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default BlackFridayBanner;
