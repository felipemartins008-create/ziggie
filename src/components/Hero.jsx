import React, { Suspense, lazy } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

const PrinterScene = lazy(() => import('./PrinterScene'));

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-black border-b border-white/[0.06]">
      {/* Subtle ambient luxury light */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-gradient-to-b from-[#ff5500]/10 to-transparent blur-[160px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-18 lg:pb-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">

          {/* Left: Editorial Headline */}
          <div className="lg:col-span-6 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-[11px] font-mono tracking-wider text-zinc-300">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff5500]"></span>
              <span>MANUFATURA ADITIVA DE ALTA PRECISÃO</span>
            </div>

            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-white tracking-tight leading-[1.04] font-['Space_Grotesk']">
              Precisão cirúrgica em <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
                cada camada impressa.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Equipamentos de alta velocidade Bambu Lab e Snapmaker, integrados à linha proprietária de filamentos de tolerância micrométrica Ziggie Pro.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <a
                href="#printers"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-black hover:bg-zinc-200 px-7 py-3 rounded-full font-semibold text-xs uppercase tracking-wider transition-all shadow-[0_4px_25px_rgba(255,255,255,0.12)] active:scale-95"
              >
                <span>Ver Impressoras 3D</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="#filaments"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white px-7 py-3 rounded-full font-semibold text-xs uppercase tracking-wider border border-white/[0.1] transition-all"
              >
                <span>Catálogo de Filamentos</span>
              </a>
            </div>
          </div>

          {/* Right: Live 3D Printing Animation */}
          <div className="lg:col-span-6">
            <div className="relative h-[420px] sm:h-[500px] lg:h-[540px] rounded-3xl border border-white/[0.08] bg-[#070708] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
              <Suspense
                fallback={
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="w-6 h-6 rounded-full border-2 border-white/10 border-t-[#ff5500] animate-spin" />
                  </div>
                }
              >
                <PrinterScene />
              </Suspense>
            </div>
          </div>

        </div>

        {/* Curated Technical Strip */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-left border-t border-white/[0.06] pt-8">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-1">
              Velocidade de Avanço
            </span>
            <span className="text-white font-bold text-sm sm:text-base font-['Space_Grotesk']">
              Até 600 mm/s
            </span>
            <span className="text-zinc-500 text-[11px] block mt-0.5">Cinemática CoreXY pura</span>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-1">
              Tolerância de Diâmetro
            </span>
            <span className="text-white font-bold text-sm sm:text-base font-['Space_Grotesk']">
              ±0.015 mm
            </span>
            <span className="text-zinc-500 text-[11px] block mt-0.5">Inspeção a laser duplo</span>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-1">
              Garantia Nacional
            </span>
            <span className="text-white font-bold text-sm sm:text-base font-['Space_Grotesk']">
              12 Meses
            </span>
            <span className="text-zinc-500 text-[11px] block mt-0.5">Peças & suporte técnico SP</span>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-1">
              Logística Integrada
            </span>
            <span className="text-white font-bold text-sm sm:text-base font-['Space_Grotesk']">
              Despacho em 24h
            </span>
            <span className="text-zinc-500 text-[11px] block mt-0.5">Embalagens herméticas a vácuo</span>
          </div>
        </div>

      </div>
    </section>
  );
}
