import React, { useState, useRef, useEffect } from 'react';
import { Logo } from './Logo';
import { 
  Search, 
  ShoppingCart, 
  ChevronDown, 
  Menu, 
  X,
  User,
  Heart,
  Sparkles,
  SlidersHorizontal
} from 'lucide-react';

export function EcommerceHeader({ 
  cartCount = 0, 
  cartTotal = 0,
  onOpenCart, 
  onOpenShopifyConfig,
  isShopifyConnected = false,
  searchQuery = '',
  onSearchChange,
  activeCategory = 'all',
  onSelectCategory
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modelosDropdownOpen, setModelosDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const handleSelectModel = (modelKeyword) => {
    onSearchChange(modelKeyword);
    setModelosDropdownOpen(false);
  };

  return (
    <header className="w-full bg-black text-white border-b border-white/[0.08] sticky top-0 z-50 backdrop-blur-md bg-black/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* ================= LEFT: OFFICIAL ZIGGIE BRAND LOGO ================= */}
          <div className="flex items-center">
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                onSelectCategory('all');
                onSearchChange('');
              }}
              className="flex-shrink-0 flex items-center py-1"
            >
              <Logo className="h-10 sm:h-12 md:h-13" variant="light" />
            </a>
          </div>

          {/* ================= RIGHT: MINIMALIST NAVIGATION (MATCHES REFERENCE) ================= */}
          <div className="hidden lg:flex items-center gap-8">
            
            {/* Main Menu Links: IMPRESSORAS | FILAMENTOS | MODELOS ⌄ */}
            <nav className="flex items-center gap-7 text-xs sm:text-[13px] font-bold tracking-wider uppercase font-sans">
              
              {/* 1. IMPRESSORAS */}
              <button
                onClick={() => {
                  onSelectCategory('Impressoras 3D');
                  onSearchChange('');
                }}
                className={`transition-colors duration-200 cursor-pointer py-1 ${
                  activeCategory === 'Impressoras 3D' 
                    ? 'text-[#ff5500] font-extrabold' 
                    : 'text-zinc-200 hover:text-[#ff5500]'
                }`}
              >
                IMPRESSORAS
              </button>

              {/* 2. FILAMENTOS */}
              <button
                onClick={() => {
                  onSelectCategory('Filamentos');
                  onSearchChange('');
                }}
                className={`transition-colors duration-200 cursor-pointer py-1 ${
                  activeCategory === 'Filamentos' 
                    ? 'text-[#ff5500] font-extrabold' 
                    : 'text-zinc-200 hover:text-[#ff5500]'
                }`}
              >
                FILAMENTOS
              </button>

              {/* 3. MODELOS ⌄ (Dropdown) */}
              <div 
                className="relative"
                onMouseEnter={() => setModelosDropdownOpen(true)}
                onMouseLeave={() => setModelosDropdownOpen(false)}
              >
                <button
                  onClick={() => setModelosDropdownOpen(!modelosDropdownOpen)}
                  className="flex items-center gap-1.5 py-1 text-zinc-200 hover:text-[#ff5500] transition-colors duration-200 cursor-pointer"
                >
                  <span>MODELOS</span>
                  <ChevronDown 
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      modelosDropdownOpen ? 'rotate-180 text-[#ff5500]' : 'text-zinc-400'
                    }`} 
                  />
                </button>

                {/* Dropdown Menu (Dark Glassmorphism) */}
                {modelosDropdownOpen && (
                  <div className="absolute top-full right-0 w-64 bg-[#0d0e12] border border-white/[0.12] rounded-2xl shadow-2xl py-2 z-50 backdrop-blur-xl animate-fade-in">
                    <div className="px-3 py-1.5 text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                      Linhas em Destaque
                    </div>

                    <button
                      onClick={() => handleSelectModel('Bambu Lab A1')}
                      className="w-full text-left px-4 py-2.5 text-xs text-zinc-200 hover:text-white hover:bg-white/[0.06] flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <span>Bambu Lab A1 Combo</span>
                      <span className="text-[10px] bg-[#ff5500]/20 text-[#ff5500] px-1.5 py-0.5 rounded font-bold">AMS Lite</span>
                    </button>

                    <button
                      onClick={() => handleSelectModel('A1 Mini')}
                      className="w-full text-left px-4 py-2.5 text-xs text-zinc-200 hover:text-white hover:bg-white/[0.06] flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <span>Bambu Lab A1 Mini</span>
                      <span className="text-[10px] text-zinc-400 font-mono">Iniciante</span>
                    </button>

                    <button
                      onClick={() => handleSelectModel('X2D')}
                      className="w-full text-left px-4 py-2.5 text-xs text-zinc-200 hover:text-white hover:bg-white/[0.06] flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <span>Bambu Lab X2D Carbon</span>
                      <span className="text-[10px] text-zinc-400 font-mono">CoreXY</span>
                    </button>

                    <button
                      onClick={() => handleSelectModel('Snapmaker U1')}
                      className="w-full text-left px-4 py-2.5 text-xs text-zinc-200 hover:text-white hover:bg-white/[0.06] flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <span>Snapmaker U1 4-Head</span>
                      <span className="text-[10px] bg-[#ff5500] text-white px-1.5 py-0.5 rounded font-bold">NOVO</span>
                    </button>

                    <div className="border-t border-white/[0.08] my-1"></div>

                    <button
                      onClick={() => {
                        onSelectCategory('all');
                        setModelosDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-[#ff5500] hover:bg-[#ff5500]/10 cursor-pointer"
                    >
                      Ver Todos os Modelos →
                    </button>
                  </div>
                )}
              </div>
            </nav>

            <div className="h-5 w-px bg-white/[0.15]"></div>

            {/* Quick Utility Actions: Search, Account, Cart */}
            <div className="flex items-center gap-3">
              
              {/* Expandable Search Input */}
              <div className="relative flex items-center">
                {searchOpen ? (
                  <div className="flex items-center bg-white/[0.08] border border-white/[0.2] rounded-full pl-3 pr-1 py-1 transition-all w-56 sm:w-64">
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Buscar produto..."
                      value={searchQuery}
                      onChange={(e) => onSearchChange(e.target.value)}
                      className="w-full bg-transparent text-xs text-white placeholder-zinc-400 focus:outline-none"
                    />
                    <button
                      onClick={() => setSearchOpen(false)}
                      className="p-1 text-zinc-400 hover:text-white cursor-pointer"
                      title="Fechar busca"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setSearchOpen(true)}
                    className="p-2 text-zinc-300 hover:text-white hover:bg-white/[0.08] rounded-full transition-colors cursor-pointer"
                    title="Buscar na loja"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Cart Pill Button with real BRL value */}
              <button
                onClick={onOpenCart}
                className="flex items-center gap-2.5 bg-white/[0.08] hover:bg-[#ff5500] border border-white/[0.15] hover:border-[#ff5500] text-white px-3.5 py-2 rounded-full cursor-pointer transition-all duration-200 group active:scale-95 shadow-xs"
                title="Abrir carrinho"
              >
                <div className="relative">
                  <ShoppingCart className="w-4 h-4 text-zinc-200 group-hover:text-white transition-colors" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-[#ff5500] group-hover:bg-black text-white text-[9px] font-bold flex items-center justify-center font-mono">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="font-mono text-xs font-bold tracking-tight">
                  R$ {cartTotal.toFixed(2).replace('.', ',')}
                </span>
              </button>

            </div>

          </div>

          {/* ================= MOBILE CONTROLS ================= */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={onOpenCart}
              className="relative p-2 text-white"
              title="Carrinho"
            >
              <ShoppingCart className="w-5 h-5 text-[#ff5500]" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-[#ff5500] text-white text-[9px] font-bold flex items-center justify-center font-mono">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* ================= MOBILE EXPANDED MENU ================= */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0d0e12] border-t border-white/[0.08] px-6 py-6 space-y-4">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Buscar impressoras, filamentos..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-white/[0.08] text-white text-xs px-4 py-2.5 rounded-xl border border-white/[0.15] focus:outline-none"
            />
            <Search className="w-4 h-4 absolute right-3 top-3 text-zinc-400" />
          </div>

          <div className="flex flex-col space-y-3 text-sm font-bold tracking-wider uppercase">
            <button 
              onClick={() => { onSelectCategory('all'); setMobileMenuOpen(false); }} 
              className="text-left py-1 text-white hover:text-[#ff5500]"
            >
              TODOS OS PRODUTOS
            </button>
            <button 
              onClick={() => { onSelectCategory('Impressoras 3D'); setMobileMenuOpen(false); }} 
              className="text-left py-1 text-white hover:text-[#ff5500]"
            >
              IMPRESSORAS
            </button>
            <button 
              onClick={() => { onSelectCategory('Filamentos'); setMobileMenuOpen(false); }} 
              className="text-left py-1 text-white hover:text-[#ff5500]"
            >
              FILAMENTOS
            </button>
            <button 
              onClick={() => { onSelectCategory('Combos'); setMobileMenuOpen(false); }} 
              className="text-left py-1 text-white hover:text-[#ff5500]"
            >
              COMBOS MULTICOLOR
            </button>
            <button 
              onClick={() => { onOpenShopifyConfig(); setMobileMenuOpen(false); }} 
              className="text-left py-1 text-[#ff5500] text-xs font-mono"
            >
              SHOPIFY STOREFRONT {isShopifyConnected ? '● CONECTADO' : '○ CONFIGURAR'}
            </button>
          </div>
        </div>
      )}

    </header>
  );
}

export default EcommerceHeader;
