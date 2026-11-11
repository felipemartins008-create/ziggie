import React from 'react';
import { Logo } from './Logo';
import { PremiumPaymentMethods } from './PaymentBadges';
import { 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  Clock, 
  Phone, 
  Mail, 
  MapPin, 
  Award,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export function EcommerceFooter({ onOpenShopifyConfig }) {
  return (
    <footer className="bg-white text-zinc-700 border-t border-zinc-200 font-sans text-xs pt-12 pb-8">
      
      {/* 1. Value Propositions Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-10 border-b border-zinc-200">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3.5 p-3 rounded-xl bg-zinc-50 border border-zinc-100">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-orange-100 text-[#ff5500] flex items-center justify-center flex-shrink-0">
              <Truck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h3 className="font-bold text-zinc-900 text-xs font-['Space_Grotesk'] leading-tight">Frete Grátis Sul & Sudeste</h3>
              <p className="text-[10px] sm:text-[11px] text-zinc-500 mt-0.5">A partir de R$ 400</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3.5 p-3 rounded-xl bg-zinc-50 border border-zinc-100">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h3 className="font-bold text-zinc-900 text-xs font-['Space_Grotesk'] leading-tight">Até 12x Sem Juros</h3>
              <p className="text-[10px] sm:text-[11px] text-zinc-500 mt-0.5">Ou -10% via Pix à vista</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3.5 p-3 rounded-xl bg-zinc-50 border border-zinc-100">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h3 className="font-bold text-zinc-900 text-xs font-['Space_Grotesk'] leading-tight">Garantia 1 Ano</h3>
              <p className="text-[10px] sm:text-[11px] text-zinc-500 mt-0.5">Suporte oficial nacional</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3.5 p-3 rounded-xl bg-zinc-50 border border-zinc-100">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h3 className="font-bold text-zinc-900 text-xs font-['Space_Grotesk'] leading-tight">Envio Rápido 24h</h3>
              <p className="text-[10px] sm:text-[11px] text-zinc-500 mt-0.5">Estoque Brasil com NF-e</p>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Main Institutional Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Col 1: Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Logo className="h-10 sm:h-11" variant="dark" />
            <p className="text-xs text-zinc-500 leading-relaxed max-w-sm">
              A <strong>Ziggie 3D Printing</strong> é referência nacional na distribuição oficial de impressoras 3D de alta performance Bambu Lab, Snapmaker e filamentos técnicos certificados. Tecnologia e inovação para makers e indústrias.
            </p>
            <div className="pt-2 text-xs space-y-2 text-zinc-600">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#ff5500] flex-shrink-0" />
                <a href="mailto:contato@ziggie.com.br" className="hover:text-[#ff5500] transition-colors font-medium">contato@ziggie.com.br</a>
              </div>
            </div>
          </div>

          {/* Col 2: Departamentos (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-extrabold text-zinc-900 text-xs font-['Space_Grotesk'] uppercase tracking-wider">
              Departamentos
            </h4>
            <ul className="space-y-2 text-zinc-600">
              <li><a href="#printers" className="hover:text-[#ff5500] transition-colors">Impressoras 3D Bambu Lab</a></li>
              <li><a href="#printers" className="hover:text-[#ff5500] transition-colors">Snapmaker U1 4-Head</a></li>
              <li><a href="#filaments" className="hover:text-[#ff5500] transition-colors">Filamentos PLA / Tough</a></li>
              <li><a href="#filaments" className="hover:text-[#ff5500] transition-colors">Combos AMS Multicolor</a></li>
              <li><a href="#filaments" className="hover:text-[#ff5500] transition-colors">Peças de Reposição & Bicos</a></li>
              <li><a href="#filaments" className="hover:text-[#ff5500] transition-colors">Hotends & Placas PEI</a></li>
            </ul>
          </div>

          {/* Col 3: Institucional (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-extrabold text-zinc-900 text-xs font-['Space_Grotesk'] uppercase tracking-wider">
              Institucional
            </h4>
            <ul className="space-y-2 text-zinc-600">
              <li><a href="#about" className="hover:text-[#ff5500] transition-colors">Sobre a Ziggie 3D</a></li>
              <li><a href="#calculator" className="hover:text-[#ff5500] transition-colors">Calculadora de Custos 3D</a></li>
              <li><a href="#warranty" className="hover:text-[#ff5500] transition-colors">Termos de Garantia Oficial</a></li>
              <li><a href="#shipping" className="hover:text-[#ff5500] transition-colors">Políticas de Envio & Frete</a></li>
              <li><a href="#returns" className="hover:text-[#ff5500] transition-colors">Trocas e Devoluções</a></li>
              <li><a href="#privacy" className="hover:text-[#ff5500] transition-colors">Política de Privacidade LGPD</a></li>
            </ul>
          </div>

          {/* Col 4: Integração & Meios de Pagamento Premium (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-extrabold text-zinc-900 text-xs font-['Space_Grotesk'] uppercase tracking-wider flex items-center justify-between">
              <span>Pagamento & Segurança</span>
              <span className="text-[10px] text-emerald-600 font-mono font-bold">Ambiente Seguro</span>
            </h4>
            
            {/* Premium Payment & Bank Badges Block */}
            <PremiumPaymentMethods />

          </div>

        </div>
      </div>

      {/* 3. Bottom Legal Bar */}
      <div className="bg-zinc-100 border-t border-zinc-200 text-zinc-500 text-[11px] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} Ziggie 3D Printing. Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-4 text-zinc-600 font-medium">
            <a href="#terms" className="hover:underline">Termos e Condições</a>
            <span>•</span>
            <a href="#privacy" className="hover:underline">Privacidade</a>
            <span>•</span>
            <a href="#map" className="hover:underline">Mapa do Site</a>
          </div>
        </div>
      </div>

    </footer>
  );
}
