import React, { useState, useMemo, useEffect } from 'react';
import { useLiveProducts } from '../services/livePrices';
import { 
  ShoppingCart, 
  Eye, 
  Sparkles, 
  ArrowRight,
  Check,
  Search,
  ChevronDown,
  HelpCircle,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Zap,
  Info
} from 'lucide-react';

export function EcommerceStore({ onAddToCart, onOpenDetail, searchQuery = '', activeCategory = 'all' }) {
  const [selectedCategory, setSelectedCategory] = useState(activeCategory);
  const [selectedVoltages, setSelectedVoltages] = useState({});
  const [filamentFilter, setFilamentFilter] = useState('all');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const products = useLiveProducts();

  // Sync when activeCategory changes from header navigation
  useEffect(() => {
    setSelectedCategory(activeCategory);
    setFilamentFilter('all');
  }, [activeCategory]);

  // Filter products cleanly without cluttered sidebar
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Priority ordering with the 4 featured Black Friday cards from the banner up top:
    // A1 Combo, P2S Combo, Snapmaker U1, X2D Combo, followed by A1, A1 Mini, H2S, H2D, etc.
    const priorityOrder = [
      'bambu-a1-combo',
      'bambu-p2s',
      'snapmaker-u1',
      'bambu-x2d',
      'bambu-a1-standalone',
      'bambu-a1-mini-combo',
      'bambu-a1-mini-standalone',
      'bambu-h2s',
      'bambu-h2d',
      'bambu-a2l',
      'filament-bambu-pla-lite',
      'filament-bambu-pla-basic',
      'filament-bambu-petg',
      'filament-sanlu-pla-plus',
      'filament-printalot-pla',
      'filament-panchona-matte'
    ];

    list.sort((a, b) => {
      // 1. Tag or badge priority: 'destaque', 'topo', or badge 'DESTAQUE' always appear at the top!
      const isFeaturedA = (a.tags && (a.tags.toLowerCase().includes('destaque') || a.tags.toLowerCase().includes('topo'))) || 
                          (a.badge && a.badge.toLowerCase().includes('destaque'));
      const isFeaturedB = (b.tags && (b.tags.toLowerCase().includes('destaque') || b.tags.toLowerCase().includes('topo'))) || 
                          (b.badge && b.badge.toLowerCase().includes('destaque'));
      if (isFeaturedA && !isFeaturedB) return -1;
      if (!isFeaturedA && isFeaturedB) return 1;

      // 2. Sort according to Shopify Collection Order (drag & drop from admin)
      const orderA = typeof a.sortOrder === 'number' ? a.sortOrder : priorityOrder.indexOf(a.id);
      const orderB = typeof b.sortOrder === 'number' ? b.sortOrder : priorityOrder.indexOf(b.id);

      if (orderA !== -1 && orderB !== -1) return orderA - orderB;
      if (orderA !== -1) return -1;
      if (orderB !== -1) return 1;
      return 0;
    });

    return list.filter(product => {
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesBrand = product.brand?.toLowerCase().includes(query);
        const matchesCat = product.category?.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand && !matchesCat) return false;
      }

      // Category
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'black-friday' && !product.badge?.includes('BLACK') && !product.promoTag && !product.badge?.includes('PROMO') && !product.badge?.includes('OFERTA')) return false;
        if (selectedCategory === 'Impressoras 3D' && product.category !== 'Impressoras 3D' && !product.category?.includes('Combo')) return false;
        if (selectedCategory === 'Filamentos') {
          if (product.category !== 'Filamentos') return false;
          if (filamentFilter !== 'all' && product.polymerType !== filamentFilter) return false;
        }
        if (selectedCategory === 'Combos' && !product.name.toLowerCase().includes('combo') && !product.category?.toLowerCase().includes('combo')) return false;
        if (selectedCategory === 'Peças e Acessórios' && product.category !== 'Peças e Acessórios' && product.category !== 'Acessórios') return false;
      }

      return true;
    });
  }, [products, searchQuery, selectedCategory, filamentFilter]);

  // Helper to extract clean model and 3 spec metrics
  const getProductDisplayData = (product, currentVoltage) => {
    // Dynamic products created on Shopify Admin by the store owner
    if (product.id?.startsWith('shopify-')) {
      const parts = (product.name || product.title || '').trim().split(' ');
      let brandPrefix = '';
      let modelHighlight = '';
      if (parts.length > 1) {
        modelHighlight = parts.pop();
        brandPrefix = parts.join(' ');
      } else {
        brandPrefix = parts[0] || product.name;
        modelHighlight = '';
      }

      let specs = [
        { val: 'Pronta', label: 'Entrega' },
        { val: '100%', label: 'Garantia' },
        { val: 'Oficial', label: 'Ziggie' }
      ];

      if (product.category === 'Filamentos') {
        const colorCount = product.colors ? product.colors.length : (product.colorVariants ? product.colorVariants.length : 1);
        specs = [
          { val: `${colorCount} ${colorCount === 1 ? 'Cor' : 'Cores'}`, label: 'Disponíveis' },
          { val: '1.75 mm', label: 'Diâmetro' },
          { val: '1.0 kg', label: 'Carretel' }
        ];
      }

      return { brandPrefix, modelHighlight, specs };
    }

    if (product.category === 'Filamentos') {
      const brandPrefix = 'Filamento ' + (product.brand || '');
      const modelHighlight = product.subCategory ? product.subCategory.replace(' (RFID)', '') : 'PLA';
      const colorCount = product.colors ? product.colors.length : 1;
      const specs = [
        { val: `${colorCount} ${colorCount === 1 ? 'Cor' : 'Cores'}`, label: 'Disponíveis' },
        { val: '1.75 mm', label: 'Diâmetro' },
        { val: '1.0 kg', label: 'Carretel' }
      ];
      return { brandPrefix, modelHighlight, specs };
    }

    // Brand & Model title logic for printers
    let brandPrefix = product.shortTitle || (product.brand === 'Snapmaker' ? '3D Snapmaker' : '3D Bambu Lab');
    let modelHighlight = product.modelAccent;

    if (!modelHighlight) {
      const isRefurb = product.name.includes('RECONDICIONADA') || product.subCategory === 'Recondicionada Oficial';
      const isLaser10W = product.name.includes('10W');
      const isLaser40W = product.name.includes('40W');
      const laserTag = isLaser40W ? ' Laser 40W' : (isLaser10W ? ' Laser 10W' : '');
      const refurbTag = isRefurb ? ' (Recond.)' : '';

      if (product.name.includes('A1 MINI') && (product.name.includes('COMBO') || product.name.includes('Combo'))) {
        modelHighlight = `A1 Mini Combo${refurbTag}`;
      } else if (product.name.includes('A1 MINI')) {
        modelHighlight = `A1 Mini${refurbTag}`;
      } else if (product.name.includes('A1') && (product.name.includes('COMBO') || product.name.includes('Combo'))) {
        modelHighlight = `A1 Combo${refurbTag}`;
      } else if (product.name.includes('A1')) {
        modelHighlight = `A1${refurbTag}`;
      } else if (product.name.includes('A2L')) {
        modelHighlight = 'A2L Combo';
      } else if (product.name.includes('H2S')) {
        modelHighlight = `H2S${laserTag || ' Combo'}`;
      } else if (product.name.includes('H2D')) {
        modelHighlight = `H2D${laserTag || ' Combo'}`;
      } else if (product.name.includes('H2C')) {
        modelHighlight = `H2C${laserTag || ' Combo'}`;
      } else if (product.name.includes('X1E')) {
        modelHighlight = 'X1E Enterprise Combo';
      } else if (product.name.includes('X2D')) {
        modelHighlight = 'X2D Combo';
      } else if (product.name.includes('P2S')) {
        modelHighlight = 'P2S Combo';
      } else if (product.name.includes('U1') || product.brand === 'Snapmaker') {
        brandPrefix = '3D Snapmaker';
        modelHighlight = 'U1 4-Head';
      } else {
        modelHighlight = product.modelAccent || 'Pro';
      }
    }

    // Spec pills logic (matches exact reference layout: 3 columns)
    let specs = product.specPills;
    if (!specs || specs.length < 3) {
      if (product.category === 'Impressoras 3D') {
        const vText = currentVoltage || product.defaultVoltage || product.specs?.voltage || 'Bivolt';
        const volt = vText.includes('220V') ? '220V' : vText.includes('110V') || vText.includes('127V') ? '110V' : 'Bivolt';
        const ams = product.specs?.ams 
          ? (product.specs.ams.includes('Com AMS') || product.specs.ams.includes('incluso') ? 'Com AMS' : product.specs.ams.includes('4 Cabeçotes') ? '4 Heads' : 'Sem AMS') 
          : (product.name.includes('COMBO') || product.name.includes('Combo') ? 'Com AMS' : 'Sem AMS');
        const cond = product.specs?.condition?.includes('Recondicionada') || product.subCategory?.includes('Recondicionada') ? 'Revisada' : 'Oficial 1 Ano';
        specs = [
          { val: volt, label: 'Voltagem' },
          { val: ams, label: 'Alimentador' },
          { val: cond, label: 'Garantia' }
        ];
      } else if (product.name.includes('Combo')) {
        specs = [
          { val: 'AMS Lite', label: 'Multicolor' },
          { val: '4 Cores', label: 'Simultâneas' },
          { val: '1080p', label: 'Câmera' }
        ];
      } else {
        specs = [
          { val: 'Aço', label: 'Chassi' },
          { val: 'Metal', label: 'Hotend' },
          { val: '1080p', label: 'Câmera' }
        ];
      }
    }

    return { brandPrefix, modelHighlight, specs };
  };

  return (
    <section id="ofertas" className="bg-white text-zinc-900 py-16 sm:py-24 font-sans min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= 1. MINIMALIST CENTERED HEADER ================= */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          {selectedCategory === 'Filamentos' ? (
            <>
              <span className="text-xs sm:text-sm font-bold tracking-wider text-emerald-600 uppercase block mb-2 font-mono">
                ✦ Linha Oficial Bambu Lab, Polymaker & Sunlu
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-900 tracking-tight leading-[1.15] font-['Space_Grotesk']">
                Filamentos para Impressoras 3D
              </h1>
              <p className="text-xs sm:text-sm text-zinc-500 mt-3 font-normal max-w-xl mx-auto leading-relaxed">
                Confira aqui todos os modelos com chip RFID oficial, alta velocidade e envio imediato com pronta entrega para todo o Brasil.
              </p>
            </>
          ) : (
            <>
              <span className="text-xs sm:text-sm font-semibold tracking-wide text-[#ff5500] uppercase block mb-3 font-sans">
                🔥 Especial Black Friday & Black November
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-900 tracking-tight leading-[1.15] font-['Space_Grotesk']">
                Os Favoritos da Comunidade Maker
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-3 font-normal max-w-xl mx-auto">
                Ofertas oficiais com até 20% de desconto e 10% adicional no pagamento via PIX à vista.
              </p>
            </>
          )}
        </div>

        {/* ================= 1.1 ZYNTRIA-STYLE CATEGORY SHOWCASE CARDS (When Filamentos is active) ================= */}
        {selectedCategory === 'Filamentos' && (
          <div className="mb-12 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold block">
                  Navegue por Categoria
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-['Space_Grotesk'] text-zinc-900">
                  Confira aqui todos os modelos
                </h3>
              </div>
              <span className="text-xs text-zinc-500 hidden sm:inline-block">
                19 opções disponíveis em estoque
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Card 1: PLA */}
              <div 
                onClick={() => {
                  setFilamentFilter('PLA');
                  document.getElementById('produtos-grid')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`group relative bg-white rounded-3xl p-6 border transition-all duration-300 cursor-pointer hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between ${
                  filamentFilter === 'PLA' 
                    ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-md' 
                    : 'border-zinc-200/80 hover:border-emerald-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      11 opções
                    </span>
                    <span className="text-[11px] text-zinc-400 font-medium">Iniciantes & Visual</span>
                  </div>
                  
                  <div className="h-40 flex items-center justify-center my-2 p-2">
                    <img 
                      src="/images/filaments/bambu-pla-basic.png" 
                      alt="Filamento PLA" 
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
                    />
                  </div>

                  <h4 className="text-lg font-bold text-zinc-900 font-['Space_Grotesk'] mt-2">
                    Filamentos PLA
                  </h4>
                  <p className="text-xs text-zinc-500 mt-1 line-clamp-2">
                    Fácil de imprimir, zero warping e sem odor. Disponível em Basic, Matte, Silk, Wood e Marble.
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-zinc-100">
                  <span className="text-[11px] text-zinc-400 block font-medium">A Partir de</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg font-black text-zinc-900 font-['Space_Grotesk']">R$ 93,58</span>
                    <span className="text-[11px] text-emerald-600 font-bold font-mono">R$ 84,22 no PIX</span>
                  </div>
                  <button className="w-full mt-3 py-2 px-3 rounded-xl bg-zinc-900 text-white text-xs font-bold group-hover:bg-emerald-600 transition-colors flex items-center justify-center gap-1.5">
                    <span>Ver opções de PLA</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Card 2: PETG */}
              <div 
                onClick={() => {
                  setFilamentFilter('PETG');
                  document.getElementById('produtos-grid')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`group relative bg-white rounded-3xl p-6 border transition-all duration-300 cursor-pointer hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between ${
                  filamentFilter === 'PETG' 
                    ? 'border-sky-500 ring-2 ring-sky-500/20 shadow-md' 
                    : 'border-zinc-200/80 hover:border-sky-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-sky-50 text-sky-700 border border-sky-200">
                      2 opções
                    </span>
                    <span className="text-[11px] text-zinc-400 font-medium">Equilíbrio & Resistência</span>
                  </div>
                  
                  <div className="h-40 flex items-center justify-center my-2 p-2">
                    <img 
                      src="/images/filaments/bambu-petg-translucent.webp" 
                      alt="Filamento PETG" 
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
                    />
                  </div>

                  <h4 className="text-lg font-bold text-zinc-900 font-['Space_Grotesk'] mt-2">
                    Filamentos PETG
                  </h4>
                  <p className="text-xs text-zinc-500 mt-1 line-clamp-2">
                    Resistente ao impacto, atrito e à água. Ideal para peças funcionais, suportes e utilidades.
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-zinc-100">
                  <span className="text-[11px] text-zinc-400 block font-medium">A Partir de</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg font-black text-zinc-900 font-['Space_Grotesk']">R$ 152,10</span>
                    <span className="text-[11px] text-emerald-600 font-bold font-mono">R$ 136,89 no PIX</span>
                  </div>
                  <button className="w-full mt-3 py-2 px-3 rounded-xl bg-zinc-900 text-white text-xs font-bold group-hover:bg-sky-600 transition-colors flex items-center justify-center gap-1.5">
                    <span>Ver opções de PETG</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Card 3: ABS & ASA */}
              <div 
                onClick={() => {
                  setFilamentFilter('ABS');
                  document.getElementById('produtos-grid')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`group relative bg-white rounded-3xl p-6 border transition-all duration-300 cursor-pointer hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between ${
                  filamentFilter === 'ABS' 
                    ? 'border-amber-500 ring-2 ring-amber-500/20 shadow-md' 
                    : 'border-zinc-200/80 hover:border-amber-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                      Técnico
                    </span>
                    <span className="text-[11px] text-zinc-400 font-medium">Calor 100°C & UV</span>
                  </div>
                  
                  <div className="h-40 flex items-center justify-center my-2 p-2">
                    <img 
                      src="/images/filaments/bambu-abs.webp" 
                      alt="Filamento ABS" 
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
                    />
                  </div>

                  <h4 className="text-lg font-bold text-zinc-900 font-['Space_Grotesk'] mt-2">
                    Filamentos ABS & ASA
                  </h4>
                  <p className="text-xs text-zinc-500 mt-1 line-clamp-2">
                    Suporta temperaturas até 100°C e radiação solar UV. Indicado para setor automotivo e peças externas.
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-zinc-100">
                  <span className="text-[11px] text-zinc-400 block font-medium">A Partir de</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg font-black text-zinc-900 font-['Space_Grotesk']">R$ 111,20</span>
                    <span className="text-[11px] text-emerald-600 font-bold font-mono">R$ 100,08 no PIX</span>
                  </div>
                  <button className="w-full mt-3 py-2 px-3 rounded-xl bg-zinc-900 text-white text-xs font-bold group-hover:bg-amber-600 transition-colors flex items-center justify-center gap-1.5">
                    <span>Ver opções de ABS</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Card 4: Fibra de Carbono & Especiais */}
              <div 
                onClick={() => {
                  setFilamentFilter('CARBON_FIBER');
                  document.getElementById('produtos-grid')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`group relative bg-white rounded-3xl p-6 border transition-all duration-300 cursor-pointer hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between ${
                  filamentFilter === 'CARBON_FIBER' || filamentFilter === 'ESPECIAIS'
                    ? 'border-purple-500 ring-2 ring-purple-500/20 shadow-md' 
                    : 'border-zinc-200/80 hover:border-purple-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                      5 especiais
                    </span>
                    <span className="text-[11px] text-zinc-400 font-medium">CF, TPU & Solúvel</span>
                  </div>
                  
                  <div className="h-40 flex items-center justify-center my-2 p-2">
                    <img 
                      src="/images/filaments/bambu-pla-cf.webp" 
                      alt="Filamentos Especiais" 
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
                    />
                  </div>

                  <h4 className="text-lg font-bold text-zinc-900 font-['Space_Grotesk'] mt-2">
                    Fibra de Carbono & Especiais
                  </h4>
                  <p className="text-xs text-zinc-500 mt-1 line-clamp-2">
                    Microfibras de carbono aeroespaciais, TPU flexível emborrachado e suportes solúveis PVA.
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-zinc-100">
                  <span className="text-[11px] text-zinc-400 block font-medium">A Partir de</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg font-black text-zinc-900 font-['Space_Grotesk']">R$ 124,93</span>
                    <span className="text-[11px] text-emerald-600 font-bold font-mono">R$ 112,43 no PIX</span>
                  </div>
                  <button className="w-full mt-3 py-2 px-3 rounded-xl bg-zinc-900 text-white text-xs font-bold group-hover:bg-purple-600 transition-colors flex items-center justify-center gap-1.5">
                    <span>Ver filamentos especiais</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= 1.2 SEGMENTED FILTER BAR ================= */}
        {selectedCategory === 'Filamentos' && (
          <div id="produtos-grid" className="mb-10 text-center animate-fade-in scroll-mt-24">
            <div className="inline-flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-zinc-100/90 rounded-2xl border border-zinc-200/80 shadow-xs max-w-full">
              {[
                { id: 'all', label: 'Todos os Filamentos', count: 19 },
                { id: 'PLA', label: 'PLA', dot: 'bg-emerald-500 ring-emerald-500/30', count: 11 },
                { id: 'PETG', label: 'PETG', dot: 'bg-sky-500 ring-sky-500/30', count: 2 },
                { id: 'ABS', label: 'ABS & ASA', dot: 'bg-amber-500 ring-amber-500/30', count: 1 },
                { id: 'CARBON_FIBER', label: 'Fibra de Carbono', dot: 'bg-zinc-800 ring-zinc-500/30', count: 2 },
                { id: 'ESPECIAIS', label: 'Flexíveis & TPU', dot: 'bg-purple-500 ring-purple-500/30', count: 3 }
              ].map(sub => {
                const isActive = filamentFilter === sub.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => setFilamentFilter(sub.id)}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-zinc-950 text-white shadow-sm ring-1 ring-zinc-900'
                        : 'text-zinc-600 hover:text-zinc-950 hover:bg-white/80'
                    }`}
                  >
                    {sub.dot && (
                      <span className={`w-2 h-2 rounded-full ring-2 ${sub.dot} shrink-0`} />
                    )}
                    <span>{sub.label}</span>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full transition-colors ${
                        isActive
                          ? 'bg-white/20 text-white font-bold'
                          : 'bg-zinc-200/80 text-zinc-500'
                      }`}
                    >
                      {sub.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Context Hint */}
            <p className="text-xs text-zinc-500 mt-3 max-w-xl mx-auto flex items-center justify-center gap-1.5 font-medium">
              {filamentFilter === 'all' && 'Exibindo todos os 19 filamentos oficiais compatíveis com sistema AMS.'}
              {filamentFilter === 'PLA' && 'Fácil de imprimir, zero odor e acabamento estético impecável para qualquer projeto.'}
              {filamentFilter === 'PETG' && 'Alta resistência mecânica, química e à água para utilidades e peças duráveis.'}
              {filamentFilter === 'ABS' && 'Resistente a calor até 100°C com proteção solar UV para áreas externas.'}
              {filamentFilter === 'CARBON_FIBER' && 'Reforçado com microfibras de carbono para máxima rigidez estrutural.'}
              {filamentFilter === 'ESPECIAIS' && 'Filamentos flexíveis emborrachados (TPU) e suportes solúveis em água.'}
            </p>
          </div>
        )}

        {/* ================= 2. MINIMALIST PRODUCT GRID (EXACT REFERENCE DESIGN) ================= */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-[#F8FAFC] rounded-3xl border border-zinc-100 max-w-lg mx-auto p-8">
            <p className="text-sm text-zinc-500 mb-4">Nenhum modelo encontrado para essa busca.</p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="px-5 py-2.5 bg-[#8B5CF6] text-white text-xs font-bold rounded-xl shadow-xs"
            >
              Ver Todos os Modelos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 items-stretch">
            {filteredProducts.map((product) => {
              const currentVoltage = selectedVoltages[product.id] || product.defaultVoltage || product.voltageVariants?.[0]?.voltage || 'Bivolt';
              const activeVoltageVariant = product.voltageVariants?.find(v => v.voltage === currentVoltage);
              const activePrice = activeVoltageVariant?.price || product.price;
              const activeOldPrice = activeVoltageVariant?.oldPrice ?? product.oldPrice;
              const activePixPrice = activeVoltageVariant?.pixPrice || (product.pixPrice ? product.pixPrice : +(activePrice * 0.90).toFixed(2));
              const formattedPrice = activePrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
              const formattedPix = activePixPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 });

              const { brandPrefix, modelHighlight, specs } = getProductDisplayData(product, currentVoltage);

              const productWithSelected = {
                ...product,
                selectedVoltage: currentVoltage,
                price: activePrice,
                oldPrice: activeOldPrice,
                pixPrice: activePixPrice,
                sku: activeVoltageVariant?.sku || product.sku
              };

              return (
                <div
                  key={product.id}
                  onClick={() => onOpenDetail(productWithSelected)}
                  className="bg-[#F8FAFC] rounded-[32px] p-6 sm:p-7 border border-zinc-100/90 hover:border-zinc-200 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group cursor-pointer relative"
                >
                  
                  {/* Inner White Product Canvas Card (Reference card-within-card) */}
                  <div className="bg-white rounded-2xl p-6 mb-4 h-64 sm:h-72 flex items-center justify-center shadow-xs group-hover:scale-[1.03] transition-transform duration-300 relative overflow-hidden">
                    {/* Promo Badge Tag */}
                    {product.badge && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-red-600 text-white shadow-xs z-10 font-mono">
                        {product.badge}
                      </span>
                    )}

                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain filter drop-shadow-md"
                      loading="lazy"
                    />

                    {/* Quick Add To Cart Button (Floating on hover) */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(productWithSelected);
                      }}
                      className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-zinc-900 hover:bg-[#ff5500] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-md transform translate-y-2 group-hover:translate-y-0 cursor-pointer"
                      title="Adicionar ao carrinho"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Interactive Voltage Selector Pills (For multi-voltage printers) */}
                  {product.voltageVariants && product.voltageVariants.length > 1 && (
                    <div className="flex items-center justify-center gap-1.5 mb-2.5" onClick={(e) => e.stopPropagation()}>
                      <span className="text-[10px] font-semibold text-zinc-400 font-mono uppercase tracking-wider">Voltagem:</span>
                      {product.voltageVariants.map(v => {
                        const isSel = currentVoltage === v.voltage;
                        const label = v.voltage.includes('220V') ? '220V' : v.voltage.includes('110V') || v.voltage.includes('127V') ? '110V' : v.voltage;
                        return (
                          <button
                            key={v.voltage}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedVoltages(prev => ({ ...prev, [product.id]: v.voltage }));
                            }}
                            className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold tracking-tight border transition-all cursor-pointer ${
                              isSel
                                ? 'bg-zinc-900 text-white border-zinc-900 shadow-xs scale-105 ring-1 ring-zinc-900/20'
                                : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50'
                            }`}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Title & Price Section */}
                  <div className="text-center mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight font-['Space_Grotesk'] leading-snug">
                      {brandPrefix}{' '}
                      <span className="text-[#8B5CF6] font-extrabold">{modelHighlight}</span>
                    </h3>

                    <div className="mt-2 flex flex-col items-center justify-center">
                      {activeOldPrice && (
                        <span className="text-[11px] text-zinc-400 line-through font-mono">
                          R$ {Number(activeOldPrice).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                      )}
                      <p className="text-sm sm:text-base text-zinc-900 font-extrabold font-['Space_Grotesk']">
                        R$ {formattedPrice}
                      </p>
                      {formattedPix && (
                        <p className="text-xs text-emerald-600 font-bold mt-0.5 font-mono">
                          ou R$ {formattedPix} no PIX (-10%)
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Minimalist 3-Column Specs Divider (Exact Reference Layout) */}
                  <div className="grid grid-cols-3 divide-x divide-zinc-200 text-center pt-4 border-t border-zinc-200/60">
                    <div className="px-2">
                      <span className="block text-xs sm:text-sm font-bold text-zinc-800 font-sans">
                        {specs[0].val}
                      </span>
                      <span className="block text-[11px] text-zinc-400 font-medium mt-0.5">
                        {specs[0].label}
                      </span>
                    </div>

                    <div className="px-2">
                      <span className="block text-xs sm:text-sm font-bold text-zinc-800 font-sans">
                        {specs[1].val}
                      </span>
                      <span className="block text-[11px] text-zinc-400 font-medium mt-0.5">
                        {specs[1].label}
                      </span>
                    </div>

                    <div className="px-2">
                      <span className="block text-xs sm:text-sm font-bold text-zinc-800 font-sans">
                        {specs[2].val}
                      </span>
                      <span className="block text-[11px] text-zinc-400 font-medium mt-0.5">
                        {specs[2].label}
                      </span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* ================= 3. ZYNTRIA-STYLE EDUCATIONAL GUIDE & FAQ (When Filamentos is active) ================= */}
        {selectedCategory === 'Filamentos' && (
          <div className="mt-20 border-t border-zinc-200/80 pt-16">
            
            {/* 3.1 Educational Guide: "Qual Filamento Escolher?" */}
            <div className="max-w-5xl mx-auto mb-20">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-600 font-bold block mb-2">
                  Guia Didático Maker
                </span>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black font-['Space_Grotesk'] text-zinc-900 tracking-tight">
                  Qual Filamento Escolher?
                </h3>
                <p className="text-xs sm:text-sm text-zinc-500 mt-3 leading-relaxed">
                  Escolher o filamento ideal depende diretamente do tipo de peça que você deseja imprimir. Abaixo você entende de forma simples qual filamento faz mais sentido para o seu projeto.
                </p>
              </div>

              {/* 3 Cards Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* PLA */}
                <div className="bg-white rounded-3xl p-6 border border-zinc-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20"></span>
                      <h4 className="text-base font-bold text-zinc-900 font-['Space_Grotesk']">
                        PLA (Iniciantes e Visual)
                      </h4>
                    </div>
                    <p className="text-xs text-zinc-600 leading-relaxed mb-4">
                      O PLA é o filamento mais fácil de imprimir e o mais utilizado por iniciantes. Oferece excelente qualidade estética e baixa chance de falhas.
                    </p>

                    <div className="mb-4">
                      <span className="text-[11px] font-bold text-zinc-900 block mb-1.5 uppercase tracking-wider font-mono">
                        Escolha se você quer:
                      </span>
                      <ul className="text-xs text-zinc-600 space-y-1">
                        <li className="flex items-center gap-1.5">• Action figures e decorativas</li>
                        <li className="flex items-center gap-1.5">• Protótipos visuais e maquetes</li>
                        <li className="flex items-center gap-1.5">• Impressões com acabamento bonito</li>
                        <li className="flex items-center gap-1.5">• Facilidade de uso e sem odores</li>
                      </ul>
                    </div>

                    <div className="mb-4">
                      <span className="text-[11px] font-bold text-emerald-700 block mb-1 uppercase tracking-wider font-mono">
                        Vantagens:
                      </span>
                      <p className="text-xs text-zinc-600 leading-relaxed">
                        Fácil de imprimir, baixo odor, pouco warping e acabamento estético impecável.
                      </p>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold text-amber-700 block mb-1 uppercase tracking-wider font-mono">
                        Pontos de atenção:
                      </span>
                      <p className="text-xs text-zinc-500 leading-relaxed">
                        Menor resistência térmica (acima de 55°C) e não é ideal para esforço mecânico contínuo.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between text-[11px]">
                    <span className="text-zinc-500">Dificuldade:</span>
                    <span className="font-bold text-emerald-600 font-mono">⭐ Muito Fácil</span>
                  </div>
                </div>

                {/* PETG */}
                <div className="bg-white rounded-3xl p-6 border border-zinc-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-3 h-3 rounded-full bg-sky-500 ring-4 ring-sky-500/20"></span>
                      <h4 className="text-base font-bold text-zinc-900 font-['Space_Grotesk']">
                        PETG (Equilíbrio e Resistência)
                      </h4>
                    </div>
                    <p className="text-xs text-zinc-600 leading-relaxed mb-4">
                      Combina a facilidade do PLA com uma resistência mecânica muito maior. Um dos materiais mais versáteis, ideal para peças funcionais.
                    </p>

                    <div className="mb-4">
                      <span className="text-[11px] font-bold text-zinc-900 block mb-1.5 uppercase tracking-wider font-mono">
                        Escolha se você quer:
                      </span>
                      <ul className="text-xs text-zinc-600 space-y-1">
                        <li className="flex items-center gap-1.5">• Peças funcionais e suportes</li>
                        <li className="flex items-center gap-1.5">• Organizadores e potes resistentes</li>
                        <li className="flex items-center gap-1.5">• Uso externo moderado e umidade</li>
                        <li className="flex items-center gap-1.5">• Maior durabilidade sem trincar</li>
                      </ul>
                    </div>

                    <div className="mb-4">
                      <span className="text-[11px] font-bold text-sky-700 block mb-1 uppercase tracking-wider font-mono">
                        Vantagens:
                      </span>
                      <p className="text-xs text-zinc-600 leading-relaxed">
                        Alta resistência mecânica, resistente à água e impacto. Muito mais simples de imprimir que o ABS.
                      </p>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold text-amber-700 block mb-1 uppercase tracking-wider font-mono">
                        Pontos de atenção:
                      </span>
                      <p className="text-xs text-zinc-500 leading-relaxed">
                        Pode gerar pequenos fios (stringing) se não calibrado e exige desidratação preventiva.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between text-[11px]">
                    <span className="text-zinc-500">Dificuldade:</span>
                    <span className="font-bold text-sky-600 font-mono">⭐⭐ Médio</span>
                  </div>
                </div>

                {/* ABS & ASA */}
                <div className="bg-white rounded-3xl p-6 border border-zinc-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-3 h-3 rounded-full bg-amber-500 ring-4 ring-amber-500/20"></span>
                      <h4 className="text-base font-bold text-zinc-900 font-['Space_Grotesk']">
                        ABS & ASA (Aplicações Técnicas)
                      </h4>
                    </div>
                    <p className="text-xs text-zinc-600 leading-relaxed mb-4">
                      Voltado para projetos técnicos exigentes. Alta resistência mecânica e térmica, amplamente utilizado no setor automotivo e industrial.
                    </p>

                    <div className="mb-4">
                      <span className="text-[11px] font-bold text-zinc-900 block mb-1.5 uppercase tracking-wider font-mono">
                        Escolha se você quer:
                      </span>
                      <ul className="text-xs text-zinc-600 space-y-1">
                        <li className="flex items-center gap-1.5">• Peças técnicas e ferramentas</li>
                        <li className="flex items-center gap-1.5">• Componentes automotivos</li>
                        <li className="flex items-center gap-1.5">• Proteção solar UV (filamento ASA)</li>
                        <li className="flex items-center gap-1.5">• Acabamento espelhado em acetona</li>
                      </ul>
                    </div>

                    <div className="mb-4">
                      <span className="text-[11px] font-bold text-amber-700 block mb-1 uppercase tracking-wider font-mono">
                        Vantagens:
                      </span>
                      <p className="text-xs text-zinc-600 leading-relaxed">
                        Suporta calor contínuo até 100°C, absorve fortes impactos e permite vapor químico.
                      </p>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold text-amber-700 block mb-1 uppercase tracking-wider font-mono">
                        Pontos de atenção:
                      </span>
                      <p className="text-xs text-zinc-500 leading-relaxed">
                        Mais difícil de imprimir, exige mesa aquecida e impressora com câmara fechada.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between text-[11px]">
                    <span className="text-zinc-500">Dificuldade:</span>
                    <span className="font-bold text-amber-600 font-mono">⭐⭐⭐ Avançado</span>
                  </div>
                </div>
              </div>

              {/* Simple Decision Summary Box */}
              <div className="mt-8 bg-zinc-900 text-white rounded-3xl p-6 sm:p-8">
                <h4 className="text-lg font-bold font-['Space_Grotesk'] text-white mb-3">
                  Resumindo de forma simples:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-zinc-300">
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                    <span className="font-bold text-emerald-400 block mb-1 text-sm">Escolha PLA se:</span>
                    Você quer facilidade máxima, qualidade visual impecável e praticidade para maquetes e cosméticos.
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                    <span className="font-bold text-sky-400 block mb-1 text-sm">Escolha PETG se:</span>
                    Você quer resistência física e à água sem abrir mão da facilidade de impressão no dia a dia.
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                    <span className="font-bold text-amber-400 block mb-1 text-sm">Escolha ABS/ASA se:</span>
                    Você precisa de resistência térmica (até 100°C), mecânica industrial e proteção UV para sol e chuva.
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-white/10 text-xs text-zinc-400 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span>
                    💡 <strong>Ainda está em dúvida?</strong> Comece com PLA ➔ Evolua para PETG ➔ Migre para ABS/CF conforme a necessidade do seu projeto.
                  </span>
                  <button
                    onClick={() => {
                      setFilamentFilter('PLA');
                      document.getElementById('produtos-grid')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-4 py-2 bg-emerald-500 text-black font-bold rounded-xl text-xs hover:bg-emerald-400 transition-colors shrink-0"
                  >
                    Começar com PLA
                  </button>
                </div>
              </div>
            </div>

            {/* 3.2 FAQ: Perguntas Frequentes sobre Filamentos (Zyntria-style) */}
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 font-bold block mb-1">
                  FAQ Técnico
                </span>
                <h3 className="text-2xl sm:text-3xl font-black font-['Space_Grotesk'] text-zinc-900">
                  Perguntas Frequentes sobre Filamentos
                </h3>
                <p className="text-xs sm:text-sm text-zinc-500 mt-2">
                  Tire suas dúvidas técnicas sobre compatibilidade, armazenamento e sistemas AMS.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    q: 'Qual a diferença entre PLA, PETG e ABS?',
                    a: 'São os três filamentos mais usados na impressão 3D, cada um com foco diferente. O PLA é o mais fácil de imprimir e ideal para iniciantes, peças decorativas e protótipos visuais. O PETG equilibra facilidade de impressão com resistência mecânica e à água, sendo ótimo para peças funcionais. O ABS é o mais resistente ao calor e ao impacto, indicado para peças técnicas, automotivas e industriais.'
                  },
                  {
                    q: 'Qual filamento devo escolher para começar?',
                    a: 'Se você está começando na impressão 3D, o PLA é a melhor escolha absoluta. Ele possui taxa mínima de erros, não exige impressora fechada, não solta cheiro e entrega um acabamento estético impecável já nas primeiras peças.'
                  },
                  {
                    q: 'Os filamentos são compatíveis com qualquer impressora 3D?',
                    a: 'Sim. Todos os filamentos com diâmetro padrão de 1,75mm são compatíveis com qualquer impressora FDM do mercado (Creality, Anycubic, Snapmaker, Prusa, etc.). Nas impressoras Bambu Lab, os carretéis oficiais possuem o benefício adicional do chip RFID para sincronização e calibração 100% automáticas.'
                  },
                  {
                    q: 'O que significa o chip RFID no carretel Bambu Lab?',
                    a: 'O chip RFID integrado permite que as impressoras Bambu Lab e o alimentador AMS reconheçam automaticamente o tipo de material, a cor exata e os parâmetros ideais de velocidade e temperatura assim que o carretel é colocado, eliminando ajustes manuais.'
                  },
                  {
                    q: 'Preciso de impressora fechada para usar ABS?',
                    a: 'Sim. O ABS é bastante sensível a correntes de ar e variações de temperatura ambiente, o que pode causar warping (empenamento da base) e delaminação das camadas em impressoras abertas. Para impressoras abertas como a Bambu A1 ou A1 Mini, utilize preferencialmente PLA ou PETG.'
                  },
                  {
                    q: 'Qual filamento aguenta mais calor?',
                    a: 'O ABS e o ASA possuem a maior resistência térmica entre os polímeros convencionais, suportando até 100°C contínuos sem amolecer. O PETG suporta até cerca de 70°C, enquanto o PLA começa a perder rigidez por volta de 55°C (não devendo ser deixado dentro de veículos fechados no sol).'
                  },
                  {
                    q: 'Posso usar o filamento PETG para peças externas ou em contato com água?',
                    a: 'Sim! O PETG possui excelente resistência à umidade, à água e ao desgaste natural do ambiente, sendo uma escolha de destaque para vasos, suportes de banheiro, organizadores de cozinha e peças utilitárias.'
                  },
                  {
                    q: 'O filamento com Fibra de Carbono (CF) desgasta o bico da impressora?',
                    a: 'Sim. Filamentos aditivados com fibra de carbono (como PLA-CF, PETG-CF e ASA-CF) são abrasivos e desgastam rapidamente bicos comuns de latão (brass). É indispensável utilizar bico de aço endurecido (Hardened Steel Nozzle), item que já vem instalado de série nas linhas P1S, P2S, X1C, H2S e H2D.'
                  },
                  {
                    q: 'Como devo armazenar os filamentos para não estragar?',
                    a: 'Filamentos absorvem umidade do ar ao longo do tempo (principalmente PETG, TPU e Nylon), o que gera estalos e falhas na extrusão. O ideal é mantê-los em sacos herméticos selados com sílica gel ou utilizar caixas secadoras dedicadas antes de imprimir.'
                  }
                ].map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div 
                      key={idx}
                      className="bg-white rounded-2xl border border-zinc-200/80 overflow-hidden transition-all duration-200"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-zinc-50/80 transition-colors"
                      >
                        <span className="text-sm font-bold text-zinc-900 font-['Space_Grotesk']">
                          {faq.q}
                        </span>
                        <ChevronDown 
                          className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
                            isOpen ? 'rotate-180 text-emerald-600' : ''
                          }`}
                        />
                      </button>
                      
                      {isOpen && (
                        <div className="px-6 pb-5 pt-1 text-xs text-zinc-600 leading-relaxed border-t border-zinc-100 bg-zinc-50/40">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}

export default EcommerceStore;
