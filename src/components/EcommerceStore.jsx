import React, { useState, useMemo, useEffect } from 'react';
import { ALL_PRODUCTS } from '../data/products';
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

  // Sync when activeCategory changes from header navigation
  useEffect(() => {
    setSelectedCategory(activeCategory);
  }, [activeCategory]);

  // Filter products cleanly without cluttered sidebar
  const filteredProducts = useMemo(() => {
    let list = [...ALL_PRODUCTS];

    // Priority ordering so the favorites from the screenshot appear right at the top:
    // A1, H2S, H2D, X2D, A1 Mini, Snapmaker U1, Combos, Filamentos
    const priorityOrder = [
      'bambu-a1-standalone',
      'bambu-h2s',
      'bambu-h2d',
      'bambu-x2d',
      'bambu-a1-combo',
      'bambu-a1-mini-standalone',
      'snapmaker-u1',
      'bambu-p2s',
      'ziggie-tough-pla-preto',
      'filament-printalot-pla-preto',
      'filament-bambulab-pla-lite'
    ];

    list.sort((a, b) => {
      const idxA = priorityOrder.indexOf(a.id);
      const idxB = priorityOrder.indexOf(b.id);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
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
        if (selectedCategory === 'Impressoras 3D' && product.category !== 'Impressoras 3D') return false;
        if (selectedCategory === 'Filamentos' && product.category !== 'Filamentos') return false;
        if (selectedCategory === 'Combos' && !product.name.includes('Combo')) return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory]);

  // Helper to extract clean model and 3 spec metrics
  const getProductDisplayData = (product) => {
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
    let brandPrefix = product.shortTitle || '3D ' + (product.brand || 'Bambu Lab');
    let modelHighlight = product.modelAccent;

    if (!modelHighlight) {
      if (product.name.includes('A1 MINI')) modelHighlight = 'A1 Mini';
      else if (product.name.includes('A1')) modelHighlight = 'A1';
      else if (product.name.includes('H2S')) modelHighlight = 'H2S';
      else if (product.name.includes('H2D')) modelHighlight = 'H2D';
      else if (product.name.includes('X2D')) modelHighlight = 'X2D';
      else if (product.name.includes('P2S')) modelHighlight = 'P2S';
      else if (product.name.includes('U1')) modelHighlight = 'U1 4-Head';
      else modelHighlight = 'Pro';
    }

    // Spec pills logic (matches exact reference layout: 3 columns)
    let specs = product.specPills;
    if (!specs || specs.length < 3) {
      specs = [
        { val: 'Aço', label: 'Chassi' },
        { val: 'Metal', label: 'Hotend' },
        { val: '1080p', label: 'Câmera' }
      ];
    }

    return { brandPrefix, modelHighlight, specs };
  };

  return (
    <section className="bg-white text-zinc-900 py-16 sm:py-24 font-sans min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= 1. MINIMALIST CENTERED HEADER (MATCHES REFERENCE) ================= */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-semibold tracking-wide text-[#8B5CF6] uppercase block mb-3 font-sans">
            Mais Populares
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-900 tracking-tight leading-[1.15] font-['Space_Grotesk']">
            Os Favoritos da Comunidade Maker
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-3 font-normal max-w-xl mx-auto">
            Seleção exclusiva de equipamentos de alta precisão e materiais técnicos homologados pela Ziggie 3D.
          </p>

          {/* Minimalist Pill Filter Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {[
              { id: 'all', label: 'Todos os Modelos' },
              { id: 'Impressoras 3D', label: 'Impressoras 3D' },
              { id: 'Combos', label: 'Combos Multicolor AMS' },
              { id: 'Filamentos', label: 'Filamentos Premium' }
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
              const { brandPrefix, modelHighlight, specs } = getProductDisplayData(product);
              const formattedPrice = product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 });

              return (
                <div
                  key={product.id}
                  onClick={() => onOpenDetail(product)}
                  className="bg-[#F8FAFC] rounded-[32px] p-6 sm:p-7 border border-zinc-100/90 hover:border-zinc-200 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group cursor-pointer relative"
                >
                  
                  {/* Inner White Product Canvas Card (Reference card-within-card) */}
                  <div className="bg-white rounded-2xl p-6 mb-6 h-64 sm:h-72 flex items-center justify-center shadow-xs group-hover:scale-[1.03] transition-transform duration-300 relative overflow-hidden">
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
                        onAddToCart(product);
                      }}
                      className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-zinc-900 hover:bg-[#8B5CF6] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-md transform translate-y-2 group-hover:translate-y-0 cursor-pointer"
                      title="Adicionar ao carrinho"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Title & Price Section */}
                  <div className="text-center mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight font-['Space_Grotesk'] leading-snug">
                      {brandPrefix}{' '}
                      <span className="text-[#8B5CF6] font-extrabold">{modelHighlight}</span>
                    </h2>

                    <p className="text-xs sm:text-sm text-zinc-500 font-medium mt-1">
                      A partir de R$ {formattedPrice}
                    </p>
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
