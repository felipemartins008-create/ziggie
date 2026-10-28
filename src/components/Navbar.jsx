import React, { useState } from 'react';
import { Logo } from './Logo';
import { ShoppingCart, Search, Menu, X, SlidersHorizontal, Sparkles } from 'lucide-react';

export function Navbar({ 
  cartCount = 0, 
  onOpenCart, 
  onOpenShopifyConfig, 
  isShopifyConnected = false,
  searchQuery = '',
  onSearchChange
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-black/85 backdrop-blur-2xl border-b border-white/[0.07] transition-all">
      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          
          {/* Brand Logo */}
          <a href="#" className="flex-shrink-0 py-1 transition-opacity hover:opacity-90">
            <Logo className="h-11 sm:h-12" />
          </a>

          {/* Desktop Nav Links - Sophisticated Spacing & Micro-Pills */}
          <nav className="hidden lg:flex items-center gap-8 text-[13px] tracking-tight font-medium text-zinc-300">
            <a 
              href="#printers" 
              className="hover:text-white transition-colors relative py-1 group"
            >
              <span>Impressoras 3D</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#ff5500] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a 
              href="#filaments" 
              className="hover:text-white transition-colors relative py-1 group"
            >
              <span>Filamentos</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#ff5500] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a 
              href="#brands" 
              className="hover:text-white transition-colors relative py-1 group"
            >
              <span>Marcas</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#ff5500] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a 
              href="#snapmaker" 
              className="hover:text-white transition-colors relative py-1 group flex items-center gap-1.5"
            >
              <span>Snapmaker U1</span>
              <span className="text-[9px] uppercase tracking-wider font-mono font-bold text-[#ff5500] bg-[#ff5500]/10 px-1.5 py-0.5 rounded border border-[#ff5500]/25">
                NOVO
              </span>
            </a>
            <a 
              href="#ziggie-brand" 
              className="hover:text-white transition-colors relative py-1 group"
            >
              <span>Linha Ziggie</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#ff5500] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a 
              href="#calculator" 
              className="hover:text-white text-zinc-400 transition-colors relative py-1 group"
            >
              <span>Calculadora</span>
            </a>
          </nav>

          {/* Minimalist Search */}
          <div className="hidden md:flex flex-1 max-w-[260px] relative">
            <Search className="w-3.5 h-3.5 absolute left-3.5 top-3 text-zinc-500" />
            <input
              type="text"
              placeholder="Buscar modelos ou insumos..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-[#0c0d10] text-xs text-zinc-200 placeholder-zinc-500 pl-9 pr-3 py-2.5 rounded-full border border-white/[0.08] focus:outline-none focus:border-white/25 transition-all font-sans"
            />
          </div>

          {/* User & Cart Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenShopifyConfig}
              className="p-2.5 text-zinc-400 hover:text-white rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] transition-colors cursor-pointer"
              title="Configurações Shopify"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>

            {/* Cart Pill - Quiet Luxury Design */}
            <button
              onClick={onOpenCart}
              className="group flex items-center gap-2.5 bg-white text-black hover:bg-zinc-200 px-4 py-2.5 rounded-full text-xs font-bold tracking-tight transition-all cursor-pointer shadow-[0_4px_20px_rgba(255,255,255,0.1)] active:scale-95"
            >
              <ShoppingCart className="w-3.5 h-3.5 text-black" />
              <span>Carrinho</span>
              <span className="w-4 h-4 rounded-full bg-black text-white text-[10px] font-mono flex items-center justify-center">
                {cartCount}
              </span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-zinc-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/[0.08] bg-black/95 px-6 py-6 space-y-4">
          <div className="relative mb-4">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-zinc-500" />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-[#111111] text-sm text-zinc-200 placeholder-zinc-500 pl-10 pr-4 py-2.5 rounded-xl border border-white/[0.08]"
            />
          </div>

          <div className="flex flex-col space-y-3 text-sm font-medium text-zinc-300">
            <a href="#printers" onClick={() => setMobileMenuOpen(false)} className="py-1">Impressoras 3D</a>
            <a href="#filaments" onClick={() => setMobileMenuOpen(false)} className="py-1">Filamentos</a>
            <a href="#brands" onClick={() => setMobileMenuOpen(false)} className="py-1">Marcas Parceiras</a>
            <a href="#snapmaker" onClick={() => setMobileMenuOpen(false)} className="py-1">Snapmaker U1</a>
            <a href="#ziggie-brand" onClick={() => setMobileMenuOpen(false)} className="py-1">Linha Oficial Ziggie</a>
            <a href="#calculator" onClick={() => setMobileMenuOpen(false)} className="py-1">Calculadora 3D</a>
          </div>
        </div>
      )}
    </header>
  );
}
