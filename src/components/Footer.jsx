import React, { useState } from 'react';
import { Logo } from './Logo';
import { ArrowRight, Check } from 'lucide-react';

export function Footer({ onOpenShopifyConfig }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 3000);
    }
  };

  return (
    <footer className="bg-black border-t border-white/[0.08] text-zinc-500 text-xs">
      {/* Newsletter Curated Bar */}
      <div className="border-b border-white/[0.06] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#ff5500]">
                COMUNICADOS TÉCNICOS & LANÇAMENTOS
              </span>
              <h3 className="text-2xl font-bold text-white font-['Space_Grotesk'] tracking-tight">
                Receba novidades sobre novos materiais e firmwares
              </h3>
            </div>

            <form onSubmit={handleSubscribe} className="flex w-full lg:max-w-md gap-2">
              <input
                type="email"
                required
                placeholder="Seu e-mail corporativo ou pessoal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-[#0c0d10] text-xs text-white placeholder-zinc-500 px-4 py-3 rounded-full border border-white/[0.1] focus:outline-none focus:border-white/30 transition-all font-sans"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-white text-black hover:bg-zinc-200 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer flex-shrink-0"
              >
                {subscribed ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Inscrito</span>
                  </>
                ) : (
                  <>
                    <span>Assinar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Logo className="h-11" />
            <p className="text-zinc-400 text-xs leading-relaxed max-w-sm font-normal">
              Ziggie 3D Printing. Distribuidor oficial e manufatura aditiva com inspeção dimensional a laser duplo em circuito fechado.
            </p>
            <div className="text-[11px] text-zinc-500 font-mono space-y-1">
              <div>SAC & ENGENHARIA: CONTATO@ZIGGIE3D.COM.BR</div>
              <div>HUB LOGÍSTICO: SÃO PAULO, BRASIL</div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4 font-mono">
              Impressoras 3D
            </h4>
            <ul className="space-y-2.5 text-zinc-400">
              <li><a href="#printers" className="hover:text-white transition-colors">Bambu Lab A1 Mini</a></li>
              <li><a href="#printers" className="hover:text-white transition-colors">Bambu Lab A1</a></li>
              <li><a href="#printers" className="hover:text-white transition-colors">Bambu Lab A2L CoreXY</a></li>
              <li><a href="#printers" className="hover:text-white transition-colors">Bambu Lab P2S</a></li>
              <li><a href="#printers" className="hover:text-white transition-colors">Bambu Lab X2D</a></li>
              <li><a href="#snapmaker" className="hover:text-white transition-colors">Snapmaker U1 Multi-Toolhead</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4 font-mono">
              Filamentos
            </h4>
            <ul className="space-y-2.5 text-zinc-400">
              <li><a href="#filaments" className="hover:text-white transition-colors">Linha Ziggie Pro High-Speed</a></li>
              <li><a href="#filaments" className="hover:text-white transition-colors">Bambu Lab PLA Lite RFID</a></li>
              <li><a href="#filaments" className="hover:text-white transition-colors">PrintaLot PLA Premium</a></li>
              <li><a href="#filaments" className="hover:text-white transition-colors">SUNLU PLA+ Reutilizável</a></li>
              <li><a href="#filaments" className="hover:text-white transition-colors">Panchroma Matte Velvet</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4 font-mono">
              E-commerce & Suporte
            </h4>
            <ul className="space-y-2.5 text-zinc-400">
              <li>
                <button 
                  onClick={onOpenShopifyConfig}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Conexão Shopify Storefront
                </button>
              </li>
              <li><a href="#" className="hover:text-white transition-colors">Prazos e Frete Blindado</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Garantia Nacional 12 Meses</a></li>
              <li><a href="#calculator" className="hover:text-white transition-colors">Calculadora de Custos 3D</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-600">
          <div>
            © {new Date().getFullYear()} Ziggie 3D Printing. Todos os direitos reservados. CNPJ: 00.000.000/0001-00.
          </div>
          <div className="flex items-center gap-3 font-mono text-[10px] text-zinc-500">
            <span>PIX DIRETO (-5%)</span>
            <span>•</span>
            <span>CARTÃO EM ATÉ 12X</span>
            <span>•</span>
            <span>CHECKOUT NATIVO SHOPIFY</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
