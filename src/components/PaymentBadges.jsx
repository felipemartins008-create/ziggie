import React from 'react';
import { ShieldCheck, Award, Lock, FileText, CheckCircle2 } from 'lucide-react';

/* ==========================================================================
   OFFICIAL PAYMENT LOGOS (High-Fidelity Vectors)
   ========================================================================== */

export function PixLogo({ className = "h-4" }) {
  return (
    <svg viewBox="0 0 512 512" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill="#32BCAD" d="M112.5 130.6l70.1-70.1c18.7-18.7 49.1-18.7 67.9 0l6.9 6.9 6.9-6.9c18.7-18.7 49.1-18.7 67.9 0l70.1 70.1c18.7 18.7 18.7 49.1 0 67.9l-6.9 6.9 6.9 6.9c18.7 18.7 18.7 49.1 0 67.9l-70.1 70.1c-18.7 18.7-49.1 18.7-67.9 0l-6.9-6.9-6.9 6.9c-18.7 18.7-49.1 18.7-67.9 0l-70.1-70.1c-18.7-18.7-18.7-49.1 0-67.9l6.9-6.9-6.9-6.9c-18.7-18.7-18.7-49.1 0-67.9zm136.9 14.8l-54.7 54.7c-4.7 4.7-4.7 12.3 0 17l54.7 54.7c4.7 4.7 12.3 4.7 17 0l54.7-54.7c4.7-4.7 4.7-12.3 0-17l-54.7-54.7c-4.7-4.7-12.3-4.7-17 0z"/>
    </svg>
  );
}

export function VisaLogo({ className = "h-4" }) {
  return (
    <svg viewBox="0 0 48 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="32" rx="4" fill="#0E4595" />
      <path d="M19.8 21.5h-2.9l1.8-11h2.9l-1.8 11zm11.7-10.7c-.6-.2-1.5-.5-2.6-.5-2.9 0-4.9 1.5-4.9 3.7 0 1.6 1.5 2.5 2.6 3 1.1.5 1.5.9 1.5 1.4 0 .7-.9 1.1-1.7 1.1-1.1 0-1.8-.2-2.7-.6l-.4-.2-.4 2.5c.7.3 1.9.6 3.2.6 3.1 0 5.1-1.5 5.1-3.8 0-1.3-.8-2.2-2.5-3-1-.5-1.7-.9-1.7-1.4 0-.5.6-1 1.8-1 .9 0 1.6.2 2.1.4l.3.1.6-2.3zm8.3 0h-2.3c-.7 0-1.3.2-1.5 1l-4.4 9.7h3.1l.6-1.7h3.8l.4 1.7h2.7l-2.4-10.7zm-3.6 6.8l1.6-4.3.9 4.3h-2.5zm-16.7-6.8l-2.8 7.5-.3-1.5c-.5-1.7-2.1-3.6-3.9-4.5l2.5 9.5h3.1l4.7-11h-3.3z" fill="#FFFFFF"/>
      <path d="M9.8 10.8H5.1l-.1.4c3.9 1 6.5 3.4 7.6 6.2l-1.1-5.6c-.2-.7-.7-1-1.7-1z" fill="#F7B600"/>
    </svg>
  );
}

export function MastercardLogo({ className = "h-4" }) {
  return (
    <svg viewBox="0 0 48 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="32" rx="4" fill="#222325" />
      <circle cx="19" cy="16" r="9" fill="#EB001B" />
      <circle cx="29" cy="16" r="9" fill="#F79E1B" fillOpacity="0.95" />
      <path d="M24 9.6a9 9 0 0 0 0 12.8 9 9 0 0 0 0-12.8z" fill="#FF5F00" />
    </svg>
  );
}

export function EloLogo({ className = "h-4" }) {
  return (
    <svg viewBox="0 0 48 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="32" rx="4" fill="#000000" />
      <circle cx="16" cy="16" r="4.5" fill="#EF4123" />
      <circle cx="24" cy="16" r="4.5" fill="#FFCC00" />
      <circle cx="32" cy="16" r="4.5" fill="#00A4E8" />
      <text x="24" y="27" fill="#FFFFFF" fontSize="6.5" fontWeight="900" textAnchor="middle" fontFamily="system-ui, sans-serif">elo</text>
    </svg>
  );
}

export function HipercardLogo({ className = "h-4" }) {
  return (
    <svg viewBox="0 0 48 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="32" rx="4" fill="#A6192E" />
      <text x="24" y="19" fill="#FFFFFF" fontSize="7.5" fontWeight="900" fontStyle="italic" textAnchor="middle" fontFamily="system-ui, sans-serif">Hipercard</text>
    </svg>
  );
}

export function AmexLogo({ className = "h-4" }) {
  return (
    <svg viewBox="0 0 48 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="32" rx="4" fill="#006FCF" />
      <text x="24" y="19.5" fill="#FFFFFF" fontSize="8.5" fontWeight="900" letterSpacing="0.8" textAnchor="middle" fontFamily="system-ui, sans-serif">AMEX</text>
    </svg>
  );
}

export function BoletoLogo({ className = "h-4" }) {
  return (
    <svg viewBox="0 0 48 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="32" rx="4" fill="#FAFAFA" stroke="#E4E4E7" />
      <g fill="#27272A">
        <rect x="8" y="8" width="2.5" height="16" />
        <rect x="12" y="8" width="1.5" height="16" />
        <rect x="15" y="8" width="3" height="16" />
        <rect x="20" y="8" width="1.5" height="16" />
        <rect x="23" y="8" width="4" height="16" />
        <rect x="29" y="8" width="1.5" height="16" />
        <rect x="32" y="8" width="2.5" height="16" />
        <rect x="36" y="8" width="1.5" height="16" />
        <rect x="39" y="8" width="2" height="16" />
      </g>
    </svg>
  );
}

export function ApplePayLogo({ className = "h-4" }) {
  return (
    <svg viewBox="0 0 48 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="32" rx="4" fill="#000000" />
      <path d="M15.5 13.6c-.4.5-1 .8-1.6.8-.1-.6.2-1.2.6-1.7.4-.5 1-.8 1.6-.7.1.6-.2 1.1-.6 1.6zm.6 1.4c-.9 0-1.6.5-2 .5-.5 0-1.1-.5-1.9-.5-1 0-1.9.6-2.4 1.5-1 1.7-.3 4.3.7 5.7.5.7 1.1 1.5 1.9 1.5.7 0 1-.5 1.9-.5s1.1.5 1.9.5c.8 0 1.4-.7 1.9-1.5.6-.9.8-1.7.8-1.8-.1 0-1.5-.6-1.5-2.2 0-1.3 1.1-2 1.2-2.1-.6-.9-1.6-1-1.9-1z" fill="#FFFFFF"/>
      <text x="29" y="20.5" fill="#FFFFFF" fontSize="9" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">Pay</text>
    </svg>
  );
}

export function GooglePayLogo({ className = "h-4" }) {
  return (
    <svg viewBox="0 0 48 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="32" rx="4" fill="#FFFFFF" stroke="#E4E4E7" />
      <g transform="translate(4, 2)">
        <path d="M14 14c0-.4 0-.8-.1-1.1H9v2.1h2.8c-.1.7-.5 1.3-1 1.7v1.4h1.7c1-.9 1.5-2.3 1.5-4.1z" fill="#4285F4"/>
        <path d="M9 19.1c1.4 0 2.6-.5 3.5-1.3l-1.7-1.4c-.5.3-1.1.5-1.8.5-1.4 0-2.5-.9-2.9-2.2H4.4v1.4c.9 1.8 2.7 3 4.6 3z" fill="#34A853"/>
        <path d="M6.1 14.7c-.1-.3-.2-.7-.2-1.1 0-.4.1-.8.2-1.1v-1.4H4.4C4 11.9 3.8 12.9 3.8 14s.2 2.1.6 2.9l1.7-1.4z" fill="#FBBC05"/>
        <path d="M9 10.4c.8 0 1.5.3 2 .8l1.5-1.5C11.6 8.8 10.4 8.3 9 8.3c-1.9 0-3.7 1.2-4.6 3l1.7 1.4c.4-1.3 1.5-2.3 2.9-2.3z" fill="#EA4335"/>
        <text x="23" y="17" fill="#5F6368" fontSize="9" fontWeight="600" fontFamily="system-ui, sans-serif">Pay</text>
      </g>
    </svg>
  );
}

export function ShopPayLogo({ className = "h-4" }) {
  return (
    <svg viewBox="0 0 48 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="32" rx="4" fill="#5A31F4" />
      <text x="24" y="19" fill="#FFFFFF" fontSize="7.5" fontWeight="800" textAnchor="middle" fontFamily="system-ui, sans-serif">shop pay</text>
    </svg>
  );
}

/* ==========================================================================
   OFFICIAL BANK BADGES (Selos dos Principais Bancos do Brasil)
   ========================================================================== */

export function NubankLogo({ className = "h-4" }) {
  return (
    <svg viewBox="0 0 48 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="32" rx="4" fill="#820AD1" />
      <text x="24" y="20.5" fill="#FFFFFF" fontSize="13" fontWeight="900" letterSpacing="-0.5" textAnchor="middle" fontFamily="system-ui, sans-serif">nu</text>
    </svg>
  );
}

export function ItauLogo({ className = "h-4" }) {
  return (
    <svg viewBox="0 0 48 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="32" rx="4" fill="#EC7000" />
      <rect x="13" y="8" width="22" height="16" rx="3" fill="#003399" />
      <text x="24" y="19.5" fill="#FFCC00" fontSize="8" fontWeight="900" fontStyle="italic" textAnchor="middle" fontFamily="system-ui, sans-serif">Itaú</text>
    </svg>
  );
}

export function BradescoLogo({ className = "h-4" }) {
  return (
    <svg viewBox="0 0 48 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="32" rx="4" fill="#CC092F" />
      <g transform="translate(24, 16) scale(0.65)">
        <circle cx="-6" cy="-4" r="3.5" fill="#FFFFFF" />
        <circle cx="6" cy="-4" r="3.5" fill="#FFFFFF" />
        <path d="M-10 6c0-6 4-10 10-10s10 4 10 10h-3.5c0-4-3-6.5-6.5-6.5s-6.5 2.5-6.5 6.5H-10z" fill="#FFFFFF"/>
      </g>
    </svg>
  );
}

export function BancoDoBrasilLogo({ className = "h-4" }) {
  return (
    <svg viewBox="0 0 48 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="32" rx="4" fill="#FFED00" />
      <rect x="6" y="6" width="36" height="20" rx="2" fill="#003882" />
      <text x="24" y="20" fill="#FFED00" fontSize="10" fontWeight="900" textAnchor="middle" fontFamily="system-ui, sans-serif">BB</text>
    </svg>
  );
}

export function SantanderLogo({ className = "h-4" }) {
  return (
    <svg viewBox="0 0 48 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="32" rx="4" fill="#EC0000" />
      <g transform="translate(24, 15) scale(0.75)" fill="#FFFFFF">
        <path d="M-6 4c1-3 3-5 6-7 3 2 5 4 6 7-2 1-4 1-6 0-2 1-4 1-6 0z" />
        <circle cx="0" cy="-6" r="2" />
      </g>
    </svg>
  );
}

export function InterLogo({ className = "h-4" }) {
  return (
    <svg viewBox="0 0 48 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="32" rx="4" fill="#FF7A00" />
      <text x="24" y="20" fill="#FFFFFF" fontSize="9" fontWeight="900" textAnchor="middle" fontFamily="system-ui, sans-serif">inter</text>
    </svg>
  );
}

/* ==========================================================================
   COMPREHENSIVE PREMIUM PAYMENT BADGES BLOCK
   ========================================================================== */

export function PremiumPaymentMethods() {
  return (
    <div className="space-y-4">
      {/* 1. Special Offer Highlights: PIX -10% + 12x Sem Juros */}
      <div className="space-y-2">
        {/* PIX Highlight Card */}
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50/80 border border-emerald-200/90 shadow-xs">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500 text-white flex items-center justify-center shadow-xs">
              <PixLogo className="w-4 h-4 fill-white" />
            </div>
            <div>
              <div className="text-xs font-black text-emerald-950 font-['Space_Grotesk'] leading-none">
                PIX com 10% OFF
              </div>
              <div className="text-[10px] text-emerald-700 font-medium mt-0.5">
                Aprovação e compensação imediata
              </div>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-600 text-white shadow-xs">
            -10%
          </span>
        </div>

        {/* Cartão de Crédito 12x */}
        <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-200/80 text-xs">
          <span className="font-bold text-zinc-800 font-['Space_Grotesk']">
            Cartão de Crédito até 12x
          </span>
          <span className="text-[10px] font-bold text-zinc-500 font-mono">
            Sem Juros
          </span>
        </div>
      </div>

      {/* 2. Flag Cards & Digital Wallets */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold text-zinc-700 uppercase tracking-wider font-['Space_Grotesk'] block">
          Bandeiras & Carteiras Digitais:
        </span>
        <div className="grid grid-cols-5 gap-1.5 items-center">
          <div title="Pix Banco Central" className="hover:scale-105 transition-transform"><PixLogo className="w-full h-7 rounded" /></div>
          <div title="Visa" className="hover:scale-105 transition-transform"><VisaLogo className="w-full h-7 rounded" /></div>
          <div title="Mastercard" className="hover:scale-105 transition-transform"><MastercardLogo className="w-full h-7 rounded" /></div>
          <div title="Elo" className="hover:scale-105 transition-transform"><EloLogo className="w-full h-7 rounded" /></div>
          <div title="American Express" className="hover:scale-105 transition-transform"><AmexLogo className="w-full h-7 rounded" /></div>
          <div title="Hipercard" className="hover:scale-105 transition-transform"><HipercardLogo className="w-full h-7 rounded" /></div>
          <div title="Boleto Bancário" className="hover:scale-105 transition-transform"><BoletoLogo className="w-full h-7 rounded" /></div>
          <div title="Apple Pay" className="hover:scale-105 transition-transform"><ApplePayLogo className="w-full h-7 rounded" /></div>
          <div title="Google Pay" className="hover:scale-105 transition-transform"><GooglePayLogo className="w-full h-7 rounded" /></div>
          <div title="Shop Pay" className="hover:scale-105 transition-transform"><ShopPayLogo className="w-full h-7 rounded" /></div>
        </div>
      </div>

      {/* 3. Official Bank Badges (Selos dos Bancos) */}
      <div className="space-y-2 pt-2 border-t border-zinc-200/70">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-zinc-700 uppercase tracking-wider font-['Space_Grotesk']">
            Bancos & Emissores Homologados:
          </span>
          <span className="text-[10px] text-zinc-400 font-medium">PIX & Débito</span>
        </div>
        <div className="grid grid-cols-6 gap-1.5 items-center">
          <div title="Nubank" className="hover:scale-105 transition-transform"><NubankLogo className="w-full h-6 rounded" /></div>
          <div title="Itaú" className="hover:scale-105 transition-transform"><ItauLogo className="w-full h-6 rounded" /></div>
          <div title="Bradesco" className="hover:scale-105 transition-transform"><BradescoLogo className="w-full h-6 rounded" /></div>
          <div title="Banco do Brasil" className="hover:scale-105 transition-transform"><BancoDoBrasilLogo className="w-full h-6 rounded" /></div>
          <div title="Santander" className="hover:scale-105 transition-transform"><SantanderLogo className="w-full h-6 rounded" /></div>
          <div title="Banco Inter" className="hover:scale-105 transition-transform"><InterLogo className="w-full h-6 rounded" /></div>
        </div>
      </div>

      {/* 4. Security & Trust Seals */}
      <div className="space-y-2 pt-2.5 border-t border-zinc-200/70">
        <span className="text-[11px] font-bold text-zinc-700 uppercase tracking-wider font-['Space_Grotesk'] block">
          Segurança & Certificações:
        </span>
        <div className="grid grid-cols-2 gap-2 text-[10px]">
          <div className="flex items-center gap-1.5 p-2 rounded-lg bg-emerald-50/70 border border-emerald-200/80 text-emerald-900 font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <div>
              <div className="leading-tight">SSL 256-Bit</div>
              <div className="text-[9px] font-normal text-emerald-700">100% Criptografado</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 p-2 rounded-lg bg-amber-50/70 border border-amber-200/80 text-amber-950 font-bold">
            <Award className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <div>
              <div className="leading-tight">Oficial Brasil</div>
              <div className="text-[9px] font-normal text-amber-700">Garantia Nacional</div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-1">
          <div className="flex items-center gap-1">
            <FileText className="w-3.5 h-3.5 text-zinc-400" />
            <span>Nota Fiscal Eletrônica (NF-e)</span>
          </div>
          <div className="flex items-center gap-1 text-emerald-600 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Loja Verificada</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PremiumPaymentMethods;
