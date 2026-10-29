import shopifyMapping from './shopify_mapping.json';

const BASE_PRODUCTS = [
  // --- IMPRESSORAS 3D (COM COMBOS E MODELOS STANDALONE) ---
  {
    id: 'bambu-a1-combo',
    name: 'Impressora 3D Bambu Lab A1 com AMS Lite Combo',
    category: 'Impressoras 3D',
    subCategory: 'Multimaterial',
    brand: 'Bambu Lab',
    price: 4498.50,
    oldPrice: 5299.00,
    installments: 12,
    installmentValue: 374.88,
    pixDiscountPercent: 5,
    image: '/images/printer-bambu-a1.png',
    badge: 'COMBO 4 CORES',
    rating: 5.0,
    reviewsCount: 184,
    inStock: true,
    sku: 'BL-A1-AMS-COMBO',
    specs: {
      volume: '256 x 256 x 256 mm',
      speed: '500 mm/s',
      accel: '10.000 mm/s²',
      nozzle: '0.4mm Aço Inox Quick-Swap',
      bed: 'Até 100°C Texturizada PEI',
      multimaterial: 'AMS Lite incluso (4 bobinas ativas)'
    },
    description: 'A impressora 3D multicolorida mais vendida do Brasil. Acompanha o alimentador automático AMS Lite para até 4 filamentos simultâneos com calibração 100% autônoma.'
  },
  {
    id: 'bambu-a1-standalone',
    name: 'Impressora 3D Bambu Lab A1',
    shortTitle: '3D Bambu Lab',
    modelAccent: 'A1',
    category: 'Impressoras 3D',
    subCategory: 'Bedslinger',
    brand: 'Bambu Lab',
    price: 1961.10,
    oldPrice: 2490.00,
    installments: 12,
    installmentValue: 163.42,
    pixDiscountPercent: 5,
    image: '/images/printer-bambu-a1.png',
    badge: 'POPULAR',
    rating: 4.9,
    reviewsCount: 112,
    inStock: true,
    sku: 'BL-A1-STANDALONE',
    specPills: [
      { val: 'Aço', label: 'Chassi' },
      { val: 'Metal', label: 'Hotend' },
      { val: '1080p', label: 'Câmera' }
    ],
    specs: {
      volume: '256 x 256 x 256 mm',
      speed: '500 mm/s',
      accel: '10.000 mm/s²',
      nozzle: '0.4mm Quick-Swap',
      bed: 'Até 100°C',
      multimaterial: 'Compatível com AMS Lite'
    },
    description: 'Versão standalone de bancada da Bambu Lab A1. Máxima velocidade com cancelamento ativo de ruído dos motores e calibração de fluxo em tempo real.'
  },
  {
    id: 'bambu-a1-mini-standalone',
    name: 'Impressora 3D Bambu Lab A1 MINI',
    category: 'Impressoras 3D',
    subCategory: 'Compacta',
    brand: 'Bambu Lab',
    price: 2178.50,
    oldPrice: 2319.00,
    installments: 12,
    installmentValue: 181.54,
    pixDiscountPercent: 5,
    image: '/images/printer-bambu-a1-mini.png',
    badge: 'MELHOR CUSTO-BENEFÍCIO',
    rating: 4.9,
    reviewsCount: 96,
    inStock: true,
    sku: 'BL-A1-MINI',
    specs: {
      volume: '180 x 180 x 180 mm',
      speed: '500 mm/s',
      accel: '10.000 mm/s²',
      nozzle: '0.4mm Inox',
      bed: 'Até 80°C',
      multimaterial: 'Compatível com AMS Lite'
    },
    description: 'A porta de entrada perfeita para a impressão 3D profissional. Silenciosa (<48dB), ultracompacta e pronta para imprimir 20 minutos após sair da caixa.'
  },
  {
    id: 'bambu-a1-mini-combo',
    name: 'Impressora 3D Bambu Lab A1 MINI AMS Lite Combo',
    category: 'Impressoras 3D',
    subCategory: 'Multimaterial',
    brand: 'Bambu Lab',
    price: 3598.50,
    oldPrice: 4159.00,
    installments: 12,
    installmentValue: 299.88,
    pixDiscountPercent: 5,
    image: '/images/printer-bambu-a1-mini.png',
    badge: 'MINI + 4 CORES',
    rating: 5.0,
    reviewsCount: 145,
    inStock: true,
    sku: 'BL-A1-MINI-COMBO',
    specs: {
      volume: '180 x 180 x 180 mm',
      speed: '500 mm/s',
      accel: '10.000 mm/s²',
      nozzle: '0.4mm Inox Quick-Swap',
      bed: 'Até 80°C',
      multimaterial: 'AMS Lite incluso'
    },
    description: 'O combo multicolorido mais acessível do mercado global. A1 Mini acoplada ao sistema AMS Lite de 4 cores.'
  },
  {
    id: 'bambu-a2l',
    name: 'Impressora 3D Bambu Lab A2L CoreXY',
    category: 'Impressoras 3D',
    subCategory: 'CoreXY',
    brand: 'Bambu Lab',
    price: 3890.00,
    oldPrice: 4290.00,
    installments: 12,
    installmentValue: 324.16,
    pixDiscountPercent: 5,
    image: '/images/printer-bambu-a2l.png',
    badge: 'LANÇAMENTO',
    rating: 4.9,
    reviewsCount: 42,
    inStock: true,
    sku: 'BL-A2L-COREXY',
    specs: {
      volume: '256 x 256 x 256 mm',
      speed: '500 mm/s',
      accel: '20.000 mm/s²',
      nozzle: '0.4mm Aço Endurecido',
      bed: 'Até 100°C',
      multimaterial: 'Compatível com AMS'
    },
    description: 'Chassi CoreXY com sensor ativo de ressonância mecânica e estrutura modular de alta rigidez para acabamento superficial espelhado.'
  },
  {
    id: 'bambu-p2s',
    name: 'Impressora 3D Bambu Lab P2S Enclosed',
    category: 'Impressoras 3D',
    subCategory: 'Gabinete Fechado',
    brand: 'Bambu Lab',
    price: 6490.00,
    oldPrice: 7190.00,
    installments: 12,
    installmentValue: 540.83,
    pixDiscountPercent: 5,
    image: '/images/printer-bambu-p2s.png',
    badge: 'BEST-SELLER FECHADA',
    rating: 5.0,
    reviewsCount: 168,
    inStock: true,
    sku: 'BL-P2S-ENCLOSED',
    specs: {
      volume: '256 x 256 x 256 mm',
      speed: '500 mm/s',
      accel: '20.000 mm/s²',
      nozzle: '0.4mm Aço Endurecido',
      bed: 'Até 100°C',
      enclosure: 'Gabinete totalmente fechado para ABS/ASA'
    },
    description: 'A máquina ideal para polímeros técnicos que exigem retenção de calor e zero empenamento como ABS, ASA e PETG com fibra de vidro.'
  },
  {
    id: 'bambu-x2d',
    name: 'Impressora 3D Bambu Lab X2D Industrial Dual Lidar',
    category: 'Impressoras 3D',
    subCategory: 'Gabinete Fechado',
    brand: 'Bambu Lab',
    price: 12900.00,
    oldPrice: 14200.00,
    installments: 12,
    installmentValue: 1075.00,
    pixDiscountPercent: 5,
    image: '/images/printer-bambu-x2d.png',
    badge: 'FLAGSHIP INDUSTRIAL',
    rating: 5.0,
    reviewsCount: 38,
    inStock: true,
    sku: 'BL-X2D-INDUSTRIAL',
    specs: {
      volume: '300 x 300 x 300 mm',
      speed: '600 mm/s',
      accel: '25.000 mm/s²',
      nozzle: '0.4mm Carboneto de Tungstênio',
      bed: 'Até 120°C',
      chamber: 'Câmara aquecida ativa 65°C + Filtro HEPA H13'
    },
    description: 'Potência máxima para engenharia. Câmara ativamente aquecida até 65°C, bico a 350°C para PEEK, PA-CF, PC e inspeção micro-dimensional via Dual Lidar.'
  },
  {
    id: 'bambu-h2s',
    name: 'Impressora 3D Bambu Lab H2S',
    shortTitle: '3D Bambu Lab',
    modelAccent: 'H2S',
    category: 'Impressoras 3D',
    subCategory: 'Gabinete Fechado',
    brand: 'Bambu Lab',
    price: 12959.10,
    oldPrice: 14500.00,
    installments: 12,
    installmentValue: 1079.92,
    pixDiscountPercent: 5,
    image: '/images/printer-bambu-h2s.png',
    badge: 'POPULAR',
    rating: 4.9,
    reviewsCount: 42,
    inStock: true,
    sku: 'BL-H2S-PRO',
    specPills: [
      { val: 'Aço', label: 'Chassi' },
      { val: 'Metal', label: 'Hotend' },
      { val: '1080p', label: 'Câmera' }
    ],
    specs: {
      volume: '280 x 280 x 280 mm',
      speed: '500 mm/s',
      accel: '20.000 mm/s²',
      nozzle: '0.4mm Aço Endurecido',
      enclosure: 'Gabinete Fechado Ativo'
    },
    description: 'A máquina definitiva para prototipagem rápida e peças de precisão com câmara fechada de alta estabilidade térmica.'
  },
  {
    id: 'bambu-h2d',
    name: 'Impressora 3D Bambu Lab H2D Duplo Cabeçote Pro',
    shortTitle: '3D Bambu Lab',
    modelAccent: 'H2D',
    category: 'Impressoras 3D',
    subCategory: 'Duplo Cabeçote',
    brand: 'Bambu Lab',
    price: 17999.10,
    oldPrice: 19500.00,
    installments: 12,
    installmentValue: 1499.92,
    pixDiscountPercent: 5,
    image: '/images/printer-bambu-h2d.png',
    badge: 'DUAL EXTRUDER',
    rating: 5.0,
    reviewsCount: 38,
    inStock: true,
    sku: 'BL-H2D-DUAL',
    specPills: [
      { val: 'Aço', label: 'Chassi' },
      { val: 'Metal', label: 'Hotend' },
      { val: '1080p', label: 'Câmera' }
    ],
    specs: {
      volume: '280 x 280 x 280 mm',
      speed: '500 mm/s',
      accel: '20.000 mm/s²',
      nozzle: 'Dual 0.4mm Aço Endurecido',
      multimaterial: 'AMS 2.0 integrado'
    },
    description: 'Dois extrusores independentes para impressão combinada de material estrutural + suporte solúvel (PVA) com zero troca mecânica.'
  },
  {
    id: 'snapmaker-u1',
    name: 'Impressora 3D Snapmaker U1 Multi-Toolhead 4 Bicos',
    category: 'Impressoras 3D',
    subCategory: 'Multi-Toolhead',
    brand: 'Snapmaker',
    price: 15900.00,
    oldPrice: 17500.00,
    installments: 12,
    installmentValue: 1325.00,
    pixDiscountPercent: 5,
    image: '/images/snapmaker-u1-banner.png',
    badge: 'TROCA RÁPIDA 4 BICOS',
    rating: 5.0,
    reviewsCount: 54,
    inStock: true,
    sku: 'SM-U1-MULTITOOL',
    specs: {
      volume: '300 x 300 x 330 mm',
      speed: '600 mm/s',
      accel: '20.000 mm/s²',
      nozzle: '4x Cabeçotes Independentes',
      waste: 'Sem torre de purga (-90% desperdício)'
    },
    description: 'Inovação radical em impressão multicolorida: 4 ferramentas dedicadas que trocam em milissegundos sem misturar materiais nem desperdiçar filamento.'
  },

  // --- CATÁLOGO OFICIAL DE FILAMENTOS ---
  {
    id: 'filament-bambu-pla-lite',
    name: 'Filamento Bambu PLA Lite 1.75mm 1Kg',
    category: 'Filamentos',
    subCategory: 'PLA Lite (RFID)',
    brand: 'Bambu Lab',
    price: 120.00,
    oldPrice: 139.00,
    installments: 6,
    installmentValue: 20.00,
    pixDiscountPercent: 5,
    image: '/images/filament-bambulab-pla-lite.png',
    badge: '7 CORES DISPONÍVEIS',
    rating: 5.0,
    reviewsCount: 142,
    inStock: true,
    sku: 'BL-PLA-LITE',
    specs: {
      material: 'PLA Lite Original',
      diameter: '1.75 mm (±0.02 mm)',
      weight: '1.0 kg Líquido',
      temp: '190 - 220 °C',
      rfid: 'Sim (Auto Reconhecido no AMS)'
    },
    colors: [
      { name: 'Branco', hex: '#FFFFFF' },
      { name: 'Preto', hex: '#111111' },
      { name: 'Azul Marinho', hex: '#1B294B' },
      { name: 'Amarelo', hex: '#F6D334' },
      { name: 'Azul Cyan', hex: '#19B6EC' },
      { name: 'Cinza', hex: '#7F8388' },
      { name: 'Laranja', hex: '#EE7B23' }
    ],
    description: 'Filamento Bambu PLA Lite original com chip RFID integrado. Enrolamento impecável, alta precisão geométrica e reconhecimento automático no sistema AMS.'
  },
  {
    id: 'filament-bambu-pla-basic',
    name: 'Filamento Bambu PLA Basic 1.75mm 1Kg',
    category: 'Filamentos',
    subCategory: 'PLA Basic (RFID)',
    brand: 'Bambu Lab',
    price: 140.00,
    oldPrice: 159.00,
    installments: 6,
    installmentValue: 23.33,
    pixDiscountPercent: 5,
    image: '/images/filament-bambulab-pla-lite.png',
    badge: '3 CORES DISPONÍVEIS',
    rating: 5.0,
    reviewsCount: 98,
    inStock: true,
    sku: 'BL-PLA-BASIC',
    specs: {
      material: 'PLA Basic Original',
      diameter: '1.75 mm (±0.02 mm)',
      weight: '1.0 kg Líquido',
      temp: '190 - 220 °C',
      rfid: 'Sim (Auto Reconhecido no AMS)'
    },
    colors: [
      { name: 'Marrom Cacau', hex: '#4E3524' },
      { name: 'Pink', hex: '#E13988' },
      { name: 'Verde Milestone', hex: '#3C8349' }
    ],
    description: 'Filamento Bambu PLA Basic de acabamento brilhante premium com chip RFID integrado. Máxima facilidade de impressão e resistência mecânica superior.'
  },
  {
    id: 'filament-bambu-petg',
    name: 'Filamento Bambu PETG 1.75mm 1Kg',
    category: 'Filamentos',
    subCategory: 'PETG Técnico',
    brand: 'Bambu Lab',
    price: 140.00,
    oldPrice: 159.00,
    installments: 6,
    installmentValue: 23.33,
    pixDiscountPercent: 5,
    image: '/images/filament-bambulab-pla-lite.png',
    badge: '1 COR DISPONÍVEL',
    rating: 4.9,
    reviewsCount: 64,
    inStock: true,
    sku: 'BL-PETG',
    specs: {
      material: 'PETG de Engenharia',
      diameter: '1.75 mm (±0.02 mm)',
      weight: '1.0 kg Líquido',
      temp: '220 - 250 °C',
      resistance: 'Alta Resistência a Impacto e Calor'
    },
    colors: [
      { name: 'Vermelho', hex: '#C62928' }
    ],
    description: 'Filamento Bambu PETG com alta resistência a impacto e temperatura, ideal para peças funcionais, utilitárias e protótipos mecânicos de longa durabilidade.'
  },
  {
    id: 'filament-sanlu-pla-plus',
    name: 'Filamento Sanlu PLA+ 1.75mm 1Kg',
    category: 'Filamentos',
    subCategory: 'PLA+',
    brand: 'Sanlu',
    price: 110.00,
    oldPrice: 129.00,
    installments: 6,
    installmentValue: 18.33,
    pixDiscountPercent: 5,
    image: '/images/filament-sunlu-white.png',
    badge: '2 CORES DISPONÍVEIS',
    rating: 4.8,
    reviewsCount: 115,
    inStock: true,
    sku: 'SL-PLA-PLUS',
    specs: {
      material: 'PLA+ Alta Tenacidade',
      diameter: '1.75 mm (±0.02 mm)',
      weight: '1.0 kg Líquido',
      temp: '200 - 230 °C',
      impact: 'Até 10x mais resistente ao impacto'
    },
    colors: [
      { name: 'Amarelo', hex: '#F6D334' },
      { name: 'Preto', hex: '#111111' }
    ],
    description: 'Fórmula enriquecida PLA+ de alta tenacidade e baixo encolhimento. Até 10x mais resistente ao impacto que o PLA convencional com carretel MasterSpool.'
  },
  {
    id: 'filament-printalot-pla',
    name: 'Filamento Printalot PLA Premium 1.75mm 1Kg',
    category: 'Filamentos',
    subCategory: 'PLA Premium',
    brand: 'Printalot',
    price: 129.90,
    oldPrice: 145.00,
    installments: 6,
    installmentValue: 21.65,
    pixDiscountPercent: 5,
    image: '/images/filament-printalot-pla-preto.png',
    badge: '4 CORES DISPONÍVEIS',
    rating: 4.9,
    reviewsCount: 88,
    inStock: true,
    sku: 'PL-PLA-PREMIUM',
    specs: {
      material: 'PLA Virgem Grau Ingeo',
      diameter: '1.75 mm (±0.02 mm)',
      weight: '1.0 kg Líquido',
      temp: '195 - 225 °C',
      spool: 'Carretel de Papelão Reciclável'
    },
    colors: [
      { name: 'Vermelho', hex: '#C62928' },
      { name: 'Chocolate', hex: '#4E3524' },
      { name: 'Amarelo', hex: '#F6D334' },
      { name: 'Verde Militar', hex: '#4D5932' }
    ],
    description: 'Polímero 100% virgem NatureWorks Ingeo de alta estabilidade geométrica, excelente aderência à mesa e carretel ecológico sustentável.'
  },
  {
    id: 'filament-panchona-matte',
    name: 'Filamento Panchona Matte 1.75mm 1Kg',
    category: 'Filamentos',
    subCategory: 'Matte Fosco',
    brand: 'Panchona',
    price: 130.00,
    oldPrice: 149.00,
    installments: 6,
    installmentValue: 21.66,
    pixDiscountPercent: 5,
    image: '/images/filament-panchroma-magenta.png',
    badge: '2 CORES DISPONÍVEIS',
    rating: 5.0,
    reviewsCount: 52,
    inStock: true,
    sku: 'PC-MATTE',
    specs: {
      material: 'Matte PLA Especial',
      diameter: '1.75 mm (±0.02 mm)',
      weight: '1.0 kg Líquido',
      temp: '190 - 220 °C',
      effect: 'Disfarça 100% as linhas de camada'
    },
    colors: [
      { name: 'Vermelho Mate', hex: '#9D3333' },
      { name: 'Verde Mate', hex: '#3D624A' }
    ],
    description: 'Acabamento acetinado fosco espetacular que mascara completamente as linhas de camada. Textura aveludada preferida por designers e artesãos.'
  }
];

export const ALL_PRODUCTS = BASE_PRODUCTS.map(p => {
  const mapData = shopifyMapping[p.id];
  const realPrice = mapData?.price ? parseFloat(mapData.price) : p.price;
  return {
    ...p,
    price: realPrice,
    oldPrice: p.oldPrice,
    installmentValue: p.installments ? +(realPrice / p.installments).toFixed(2) : 0,
    shopifyVariantId: mapData ? String(mapData.shopifyVariantId) : undefined,
    shopifyProductId: mapData ? String(mapData.shopifyProductId) : undefined,
    colorVariants: mapData?.colorVariants || [],
    handle: mapData ? mapData.handle : undefined
  };
});

export const FILAMENTS = ALL_PRODUCTS.filter(p => p.category === 'Filamentos');
export const PRINTERS = ALL_PRODUCTS.filter(p => p.category === 'Impressoras 3D');
