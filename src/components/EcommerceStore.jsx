import React, { useState, useMemo, useEffect } from 'react';
import { useLiveProducts } from '../services/livePrices';
import { 
  ShoppingCart, 
  Eye, 
  Sparkles, 
  ArrowRight,
  Check,
  Search
} from 'lucide-react';

export function EcommerceStore({ onAddToCart, onOpenDetail, searchQuery = '', activeCategory = 'all' }) {
  const [selectedCategory, setSelectedCategory] = useState(activeCategory);
  const [selectedVoltages, setSelectedVoltages] = useState({});
  const [filamentFilter, setFilamentFilter] = useState('all');
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
        
        {/* ================= 1. MINIMALIST CENTERED HEADER (MATCHES REFERENCE) ================= */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-semibold tracking-wide text-[#ff5500] uppercase block mb-3 font-sans">
            🔥 Especial Black Friday & Black November
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-900 tracking-tight leading-[1.15] font-['Space_Grotesk']">
            Os Favoritos da Comunidade Maker
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-3 font-normal max-w-xl mx-auto">
            Ofertas oficiais com até 20% de desconto e 10% adicional no pagamento via PIX à vista.
          </p>

          {/* Minimalist Pill Filter Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {[
              { id: 'all', label: 'Todos os Modelos' },
              { id: 'black-friday', label: '🔥 Ofertas Black Friday' },
              { id: 'Impressoras 3D', label: 'Impressoras 3D' },
              { id: 'Combos', label: 'Combos Multicolor AMS' },
              { id: 'Filamentos', label: 'Filamentos Técnicos' },
              { id: 'Peças e Acessórios', label: 'Peças & Acessórios' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                  selectedCategory === tab.id
                    ? 'bg-zinc-900 text-white shadow-md'
                    : 'bg-[#F8FAFC] text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 border border-zinc-200/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Filament Polymer Sub-Filters Bar (When Filamentos is selected) */}
          {selectedCategory === 'Filamentos' && (
            <div className="mt-5 flex flex-wrap items-center justify-center gap-1.5 animate-fade-in">
              {[
                { id: 'all', label: 'Todos os Filamentos (19)' },
                { id: 'PLA', label: '🟢 PLA (Fácil & Visual)' },
                { id: 'PETG', label: '🔵 PETG (Resistente & Água)' },
                { id: 'ABS', label: '🟠 ABS & ASA (Calor & Sol)' },
                { id: 'CARBON_FIBER', label: '⚫ Fibra de Carbono' },
                { id: 'ESPECIAIS', label: '🟣 Flexíveis (TPU) & Suporte' }
              ].map(sub => (
                <button
                  key={sub.id}
                  onClick={() => setFilamentFilter(sub.id)}
                  className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold font-mono transition-all cursor-pointer ${
                    filamentFilter === sub.id
                      ? 'bg-amber-400 text-black shadow-sm ring-1 ring-amber-400'
                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 border border-zinc-200'
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>
          )}

          {/* Educational Guide Card: "Qual Filamento Escolher?" */}
          {selectedCategory === 'Filamentos' && (
            <div className="mt-8 mb-4 max-w-5xl mx-auto bg-gradient-to-br from-zinc-900 to-black text-white rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block mb-1">
                    Guia Didático Maker
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-['Space_Grotesk'] text-white">
                    Qual filamento escolher para o seu projeto?
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 w-fit">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Chip RFID: Leitura automática no AMS</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* PLA */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                      <h4 className="font-bold text-sm text-white font-['Space_Grotesk']">PLA (Iniciantes & Visual)</h4>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      O filamento mais fácil de imprimir e sem odor. Perfeito para miniaturas, action figures, vasos, maquetes e acabamentos com textura fosca, seda, mármore ou madeira real.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-emerald-400 font-mono font-semibold">
                    ✔ Zero empenamento • Fácil de imprimir
                  </div>
                </div>

                {/* PETG */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
                      <h4 className="font-bold text-sm text-white font-['Space_Grotesk']">PETG (Resistência & Utilidades)</h4>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      Une a facilidade do PLA com resistência ao impacto e à umidade. Ideal para suportes de parede, potes, peças do dia a dia, recipientes estanques e peças mecânicas moderadas.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-cyan-400 font-mono font-semibold">
                    ✔ Resistente a água • Não racha com impacto
                  </div>
                </div>

                {/* ABS & ASA */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                      <h4 className="font-bold text-sm text-white font-['Space_Grotesk']">ABS & ASA (Calor & Uso Externo)</h4>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      Suporta temperaturas de até 100°C. O ASA oferece proteção total contra raios UV (sol e chuva). Essencial para peças automotivas, maquinários e áreas externas.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-amber-400 font-mono font-semibold">
                    ✔ Calor até 100°C • Proteção solar UV
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

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

      </div>
    </section>
  );
}

export default EcommerceStore;
