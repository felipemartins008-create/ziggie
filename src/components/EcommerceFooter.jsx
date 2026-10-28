import React from 'react';
import { Logo } from './Logo';
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 border-b border-zinc-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-zinc-50 border border-zinc-100">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#ff5500] flex items-center justify-center flex-shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-zinc-900 text-xs font-['Space_Grotesk']">Frete Grátis Sul & Sudeste</h3>
              <p className="text-[11px] text-zinc-500">Em compras a partir de R$ 400 em filamentos</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-zinc-50 border border-zinc-100">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-zinc-900 text-xs font-['Space_Grotesk']">Até 12x Sem Juros</h3>
              <p className="text-[11px] text-zinc-500">Ou 5% de desconto à vista via Pix imediato</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-zinc-50 border border-zinc-100">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-zinc-900 text-xs font-['Space_Grotesk']">Garantia Nacional 1 Ano</h3>
              <p className="text-[11px] text-zinc-500">Suporte técnico especializado em Bambu & Snapmaker</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-zinc-50 border border-zinc-100">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-zinc-900 text-xs font-['Space_Grotesk']">Envio Rápido 24h</h3>
              <p className="text-[11px] text-zinc-500">Estoque no Brasil com NF-e e pronta entrega</p>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Main Institutional Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Logo className="h-10 sm:h-11" variant="dark" />
            <p className="text-xs text-zinc-500 leading-relaxed max-w-sm">
              A <strong>Ziggie 3D Printing</strong> é referência nacional na distribuição oficial de impressoras 3D de alta performance Bambu Lab, Snapmaker e filamentos técnicos certificados. Tecnologia e inovação para makers e indústrias.
            </p>
            <div className="pt-2 text-xs space-y-1.5 text-zinc-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#ff5500] flex-shrink-0" />
                <span>Av. Paulista, 1000 - Bela Vista, São Paulo - SP</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#ff5500] flex-shrink-0" />
                <span>(11) 4003-3D3D / WhatsApp (11) 9999-9999</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#ff5500] flex-shrink-0" />
                <span>atendimento@ziggie3d.com.br</span>
              </div>
            </div>
          </div>

          {/* Col 2: Departamentos */}
          <div className="space-y-3">
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

          {/* Col 3: Institucional */}
          <div className="space-y-3">
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

          {/* Col 4: Integração & Meios de Pagamento */}
          <div className="space-y-4">
            <h4 className="font-extrabold text-zinc-900 text-xs font-['Space_Grotesk'] uppercase tracking-wider">
              Pagamento & Segurança
            </h4>
            
            {/* Payment badges */}
            <div className="space-y-2">
              <span className="text-[11px] font-semibold text-zinc-500 block">Formas de Pagamento Aceitas:</span>
              <div className="flex flex-wrap gap-1.5 text-[10px] font-bold font-mono">
                <span className="px-2 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded">PIX (-5%)</span>
                <span className="px-2 py-1 bg-zinc-100 text-zinc-700 border border-zinc-200 rounded">CARTÃO ATÉ 12X</span>
                <span className="px-2 py-1 bg-zinc-100 text-zinc-700 border border-zinc-200 rounded">VISA</span>
                <span className="px-2 py-1 bg-zinc-100 text-zinc-700 border border-zinc-200 rounded">MASTERCARD</span>
                <span className="px-2 py-1 bg-zinc-100 text-zinc-700 border border-zinc-200 rounded">ELO</span>
                <span className="px-2 py-1 bg-zinc-100 text-zinc-700 border border-zinc-200 rounded">HIPERCARD</span>
                <span className="px-2 py-1 bg-zinc-100 text-zinc-700 border border-zinc-200 rounded">AMEX</span>
                <span className="px-2 py-1 bg-zinc-100 text-zinc-700 border border-zinc-200 rounded">BOLETO</span>
                <span className="px-2 py-1 bg-sky-50 text-sky-700 border border-sky-200 rounded">APPLE PAY</span>
                <span className="px-2 py-1 bg-sky-50 text-sky-700 border border-sky-200 rounded">GOOGLE PAY</span>
                <span className="px-2 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded">SHOP PAY</span>
              </div>
            </div>

            {/* Security Seals */}
            <div className="space-y-2 pt-2 border-t border-zinc-100">
              <span className="text-[11px] font-semibold text-zinc-500 block">Certificados:</span>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 px-2 py-1 rounded bg-zinc-100 text-[10px] font-bold text-zinc-600 border border-zinc-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>SSL 256-Bit</span>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 rounded bg-zinc-100 text-[10px] font-bold text-zinc-600 border border-zinc-200">
                  <Award className="w-3.5 h-3.5 text-[#ff5500]" />
                  <span>Distribuidor Oficial</span>
                </div>
              </div>
            </div>

            {/* Shopify button */}
            <div className="pt-2">
              <button
                onClick={onOpenShopifyConfig}
                className="w-full text-left py-2 px-3 bg-zinc-100 hover:bg-zinc-200 rounded-xl text-[11px] font-mono text-zinc-700 flex items-center justify-between cursor-pointer"
              >
                <span>Conexão Shopify Storefront</span>
                <ExternalLink className="w-3 h-3 text-zinc-400" />
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* 3. Bottom Legal Bar */}
      <div className="bg-zinc-100 border-t border-zinc-200 text-zinc-500 text-[11px] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} Ziggie 3D Comércio de Tecnologia Ltda. CNPJ: 45.123.890/0001-44. Todos os direitos reservados.
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
