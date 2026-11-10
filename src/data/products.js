import shopifyMapping from './shopify_mapping.json' with { type: 'json' };

const BASE_PRODUCTS = [
  // =========================================================================
  // 1. IMPRESSORAS 3D CONSOLIDADAS COM SELETOR DE VOLTAGEM (110V / 220V)
  // =========================================================================
  {
    "id": "bambu-a1-standalone",
    "name": "BAMBU A1 BRA 100-240V",
    "category": "Impressoras 3D",
    "subCategory": "Bedslinger",
    "brand": "Bambu Lab",
    "price": 2999,
    "oldPrice": 3529,
    "installments": 12,
    "installmentValue": 249.92,
    "pixDiscountPercent": 10,
    "pixPrice": 2699.1,
    "image": "/images/printer-bambu-a1.png",
    "badge": "BLACK FRIDAY −15%",
    "promoTag": "black-friday",
    "rating": 5,
    "reviewsCount": 112,
    "inStock": true,
    "sku": "PF002-A-US2",
    "defaultVoltage": "100-240V Bivolt",
    "voltageVariants": [
      {
        "voltage": "100-240V Bivolt",
        "sku": "PF002-A-US2"
      }
    ],
    "specs": {
      "voltage": "100-240V Bivolt",
      "ams": "Sem AMS (Compatível com AMS Lite)",
      "volume": "256 x 256 x 256 mm",
      "speed": "500 mm/s"
    },
    "description": "Impressora 3D Bambu A1 BRA 100-240V padrão Brasil. Máxima velocidade com cancelamento ativo de ruído dos motores e calibração de fluxo em tempo real."
  },

  {
    "id": "bambu-a1-combo",
    "name": "BAMBU A1 COMBO EU 100-240V",
    "category": "Impressoras 3D",
    "subCategory": "Multimaterial",
    "brand": "Bambu Lab",
    "price": 4499,
    "oldPrice": 5299,
    "installments": 12,
    "installmentValue": 374.92,
    "pixDiscountPercent": 10,
    "pixPrice": 4049.1,
    "image": "/images/printer-bambu-a1.png",
    "badge": "BLACK FRIDAY −15%",
    "promoTag": "black-friday",
    "rating": 5,
    "reviewsCount": 184,
    "inStock": true,
    "sku": "PF002-A+SA005-EU2",
    "defaultVoltage": "100-240V Bivolt",
    "voltageVariants": [
      {
        "voltage": "100-240V Bivolt",
        "sku": "PF002-A+SA005-EU2"
      }
    ],
    "specs": {
      "voltage": "100-240V Bivolt",
      "ams": "Com AMS lite incluso (4 cores)",
      "volume": "256 x 256 x 256 mm",
      "speed": "500 mm/s"
    },
    "description": "A impressora 3D multicolorida mais vendida do Brasil. Acompanha o alimentador automático AMS Lite para até 4 filamentos simultâneos."
  },

  {
    "id": "bambu-a1-mini-standalone",
    "name": "BAMBU A1 MINI",
    "category": "Impressoras 3D",
    "subCategory": "Bedslinger Compacta",
    "brand": "Bambu Lab",
    "price": 2179,
    "oldPrice": 2319,
    "installments": 12,
    "installmentValue": 181.58,
    "pixDiscountPercent": 10,
    "pixPrice": 1961.1,
    "image": "/images/printer-bambu-a1-mini.png",
    "badge": "OFERTA",
    "promoTag": "black-friday",
    "rating": 4.9,
    "reviewsCount": 96,
    "inStock": true,
    "sku": "PF002-M-EU",
    "defaultVoltage": "220V",
    "voltageVariants": [
      {
        "voltage": "220V (Padrão EU)",
        "sku": "PF002-M-EU"
      },
      {
        "voltage": "110V / 127V (LV)",
        "sku": "PF002-M-LV"
      }
    ],
    "specs": {
      "voltage": "110V ou 220V",
      "ams": "Sem AMS (Compatível com AMS Lite)",
      "volume": "180 x 180 x 180 mm",
      "speed": "500 mm/s"
    },
    "description": "Bambu A1 Mini com calibração totalmente automatizada, sensor de fluxo tangencial e operação ultra silenciosa (<48 dB)."
  },

  {
    "id": "bambu-a1-mini-combo",
    "name": "BAMBU A1 MINI COMBO EU 100-240V",
    "category": "Impressoras 3D",
    "subCategory": "Multimaterial Compacta",
    "brand": "Bambu Lab",
    "price": 3599,
    "oldPrice": 4159,
    "installments": 12,
    "installmentValue": 299.92,
    "pixDiscountPercent": 10,
    "pixPrice": 3239.1,
    "image": "/images/printer-bambu-a1-mini.png",
    "badge": "BLACK FRIDAY −15%",
    "promoTag": "black-friday",
    "rating": 5,
    "reviewsCount": 142,
    "inStock": true,
    "sku": "PF002-M+SA005-EU",
    "defaultVoltage": "100-240V Bivolt",
    "voltageVariants": [
      {
        "voltage": "100-240V Bivolt",
        "sku": "PF002-M+SA005-EU"
      }
    ],
    "specs": {
      "voltage": "100-240V Bivolt",
      "ams": "Com AMS lite incluso (4 cores)",
      "volume": "180 x 180 x 180 mm",
      "speed": "500 mm/s"
    },
    "description": "Bambu A1 Mini Combo com alimentador AMS Lite incluso. O ponto de entrada ideal e confiável no ecossistema de impressão 3D multicor."
  },

  {
    "id": "bambu-a2l",
    "name": "BAMBU A2L COMBO",
    "category": "Impressoras 3D",
    "subCategory": "CoreXY Industrial",
    "brand": "Bambu Lab",
    "price": 6899,
    "oldPrice": null,
    "installments": 12,
    "installmentValue": 574.92,
    "pixDiscountPercent": 10,
    "pixPrice": 6209.1,
    "image": "/images/printer-bambu-a2l.png",
    "badge": "LANÇAMENTO COMBO",
    "promoTag": "black-november",
    "rating": 5,
    "reviewsCount": 29,
    "inStock": true,
    "sku": "PF005-HV+SA005",
    "defaultVoltage": "220V",
    "voltageVariants": [
      {
        "voltage": "220V (BRA-HV)",
        "sku": "PF005-HV+SA005"
      },
      {
        "voltage": "110V / 127V (BRA-LV)",
        "sku": "PF005-L+SA005-BRALV"
      }
    ],
    "specs": {
      "voltage": "110V ou 220V",
      "ams": "Com AMS Incluso",
      "volume": "256 x 256 x 256 mm",
      "speed": "600 mm/s"
    },
    "description": "Bambu A2L Combo de nova geração CoreXY com máxima estabilidade cinemática, sistema de troca de filamento inteligente e chassi blindado."
  },

  {
    "id": "bambu-h2c-combo-hv-220v",
    "name": "BAMBU H2C COMBO",
    "category": "Impressoras 3D",
    "subCategory": "Farm & Produção Contínua",
    "brand": "Bambu Lab",
    "price": 28999,
    "oldPrice": null,
    "installments": 12,
    "installmentValue": 2416.58,
    "pixDiscountPercent": 10,
    "pixPrice": 26099.1,
    "image": "/images/printer-bambu-h2c.png",
    "badge": "FLAGSHIP FARM",
    "promoTag": "black-friday",
    "rating": 5,
    "reviewsCount": 16,
    "inStock": true,
    "sku": "PF003-C+SA007-HV",
    "defaultVoltage": "220V",
    "voltageVariants": [
      {
        "voltage": "220V (HV)",
        "sku": "PF003-C+SA007-HV"
      },
      {
        "voltage": "127V / 110V (LV)",
        "sku": "PF003-C+SA007-LV"
      }
    ],
    "specs": {
      "voltage": "110V ou 220V",
      "ams": "Com AMS Incluso (4 cores)",
      "volume": "350 x 350 x 350 mm",
      "speed": "700 mm/s"
    },
    "description": "Solução máxima para fazendas de impressão e prototipagem industrial contínua com câmara aquecida e controle redundante."
  },

  {
    "id": "bambu-h2c-laser-10w-110v",
    "name": "BAMBU H2C FULL COMBO LASER (10W / 40W)",
    "category": "Impressoras 3D",
    "subCategory": "Híbrida 3D + Laser",
    "brand": "Bambu Lab",
    "price": 36999,
    "oldPrice": null,
    "installments": 12,
    "installmentValue": 3083.25,
    "pixDiscountPercent": 10,
    "pixPrice": 33299.1,
    "image": "/images/printer-bambu-h2c.png",
    "badge": "LASER HÍBRIDA",
    "promoTag": "black-friday",
    "rating": 5,
    "reviewsCount": 12,
    "inStock": true,
    "sku": "PF003-N+SA007-US",
    "defaultVoltage": "110V (Laser 10W)",
    "voltageVariants": [
      {
        "voltage": "110V (Laser 10W)",
        "sku": "PF003-N+SA007-US",
        "price": 36999
      },
      {
        "voltage": "110V (Laser 40W Ultra)",
        "sku": "PF003-N+SA007-US-40W",
        "price": 42999
      }
    ],
    "specs": {
      "voltage": "110V / 127V",
      "ams": "Com AMS Incluso + Kit Laser",
      "volume": "350 x 350 x 350 mm",
      "speed": "700 mm/s"
    },
    "description": "Estação industrial completa com impressão 3D de altíssima precisão e módulo laser para corte e gravação profissional."
  },

  {
    "id": "bambu-h2d-combo-hv-220v",
    "name": "BAMBU H2D COMBO",
    "category": "Impressoras 3D",
    "subCategory": "Dual Extruder CoreXY",
    "brand": "Bambu Lab",
    "price": 22999,
    "oldPrice": 25899,
    "installments": 12,
    "installmentValue": 1916.58,
    "pixDiscountPercent": 10,
    "pixPrice": 20699.1,
    "image": "/images/printer-bambu-h2d.png",
    "badge": "DUAL HEAD",
    "promoTag": "black-friday",
    "rating": 5,
    "reviewsCount": 27,
    "inStock": true,
    "sku": "PF003-D+SA007-HV1",
    "defaultVoltage": "220V",
    "voltageVariants": [
      {
        "voltage": "220V (HV)",
        "sku": "PF003-D+SA007-HV1"
      },
      {
        "voltage": "127V / 110V (LV)",
        "sku": "PF003-D+SA007-LV"
      }
    ],
    "specs": {
      "voltage": "110V ou 220V",
      "ams": "Com AMS Incluso",
      "volume": "320 x 320 x 320 mm",
      "speed": "600 mm/s"
    },
    "description": "Bambu H2D com dois cabeçotes independentes para impressão simultânea de materiais incompatíveis (como PLA + PVA solúvel) sem contaminação."
  },

  {
    "id": "bambu-h2d-laser-10w-127v",
    "name": "BAMBU H2D FULL COMBO LASER (10W / 40W)",
    "category": "Impressoras 3D",
    "subCategory": "Dual Extruder + Laser",
    "brand": "Bambu Lab",
    "price": 30999,
    "oldPrice": null,
    "installments": 12,
    "installmentValue": 2583.25,
    "pixDiscountPercent": 10,
    "pixPrice": 27899.1,
    "image": "/images/printer-bambu-h2d.png",
    "badge": "DUAL + LASER",
    "promoTag": "black-friday",
    "rating": 5,
    "reviewsCount": 14,
    "inStock": true,
    "sku": "PF003-M+SA007-LV1",
    "defaultVoltage": "127V (Laser 10W)",
    "voltageVariants": [
      {
        "voltage": "127V / 110V (Laser 10W)",
        "sku": "PF003-M+SA007-LV1",
        "price": 30999
      },
      {
        "voltage": "127V / 110V (Laser 40W Ultra)",
        "sku": "PF003-M+SA007-LV1-40W",
        "price": 36999
      }
    ],
    "specs": {
      "voltage": "127V / 110V",
      "ams": "Com AMS Incluso + Kit Laser",
      "volume": "320 x 320 x 320 mm",
      "speed": "600 mm/s"
    },
    "description": "Equipamento topo de linha integrando extrusão dupla de alta precisão com sistema integrado de corte e gravação a laser."
  },

  {
    "id": "bambu-h2s-combo-hv-220v",
    "name": "BAMBU H2S COMBO",
    "category": "Impressoras 3D",
    "subCategory": "Gabinete Fechado Alta Performance",
    "brand": "Bambu Lab",
    "price": 16999,
    "oldPrice": 19299,
    "installments": 12,
    "installmentValue": 1416.58,
    "pixDiscountPercent": 10,
    "pixPrice": 15299.1,
    "image": "/images/printer-bambu-h2s.png",
    "badge": "COREXY PRO",
    "promoTag": "black-friday",
    "rating": 5,
    "reviewsCount": 31,
    "inStock": true,
    "sku": "PF003-S+SA007-HV1",
    "defaultVoltage": "220V",
    "voltageVariants": [
      {
        "voltage": "220V (HV)",
        "sku": "PF003-S+SA007-HV1"
      },
      {
        "voltage": "127V / 110V (LV)",
        "sku": "PF003-S+SA007-LV"
      }
    ],
    "specs": {
      "voltage": "110V ou 220V",
      "ams": "Com AMS Incluso",
      "volume": "300 x 300 x 300 mm",
      "speed": "600 mm/s"
    },
    "description": "Impressora robusta com gabinete totalmente fechado, controle térmico ativo e sistema de alimentação inteligente."
  },

  {
    "id": "bambu-h2s-laser-10w-220v",
    "name": "BAMBU H2S FULL COMBO LASER 10W",
    "category": "Impressoras 3D",
    "subCategory": "CoreXY + Laser",
    "brand": "Bambu Lab",
    "price": 24999,
    "oldPrice": null,
    "installments": 12,
    "installmentValue": 2083.25,
    "pixDiscountPercent": 10,
    "pixPrice": 22499.1,
    "image": "/images/printer-bambu-h2s.png",
    "badge": "COMBO LASER 10W",
    "promoTag": "black-friday",
    "rating": 5,
    "reviewsCount": 19,
    "inStock": true,
    "sku": "PF003-L+SA007-EU",
    "defaultVoltage": "220V",
    "voltageVariants": [
      {
        "voltage": "220V (Padrão EU)",
        "sku": "PF003-L+SA007-EU"
      },
      {
        "voltage": "127V / 110V (LV)",
        "sku": "PF003-L+SA007-LV"
      }
    ],
    "specs": {
      "voltage": "110V ou 220V",
      "ams": "Com AMS Incluso + Kit Laser 10W",
      "volume": "300 x 300 x 300 mm",
      "speed": "600 mm/s"
    },
    "description": "Combo completo Bambu H2S com módulo laser oficial de 10W e sistema multimaterial automático."
  },

  {
    "id": "bambu-p2s-combo-eu-220v",
    "name": "BAMBU P2S COMBO",
    "category": "Impressoras 3D",
    "subCategory": "Gabinete Fechado CoreXY",
    "brand": "Bambu Lab",
    "price": 9399,
    "oldPrice": 10999,
    "installments": 12,
    "installmentValue": 783.25,
    "pixDiscountPercent": 10,
    "pixPrice": 8459.1,
    "image": "/images/printer-bambu-p2s.png",
    "badge": "BLACK FRIDAY −15%",
    "promoTag": "black-friday",
    "rating": 5,
    "reviewsCount": 168,
    "inStock": true,
    "sku": "PF004-U+SA007-EU1",
    "defaultVoltage": "220V",
    "voltageVariants": [
      {
        "voltage": "220V (Padrão EU/HV)",
        "sku": "PF004-U+SA007-EU1"
      },
      {
        "voltage": "110V / 127V (Padrão US)",
        "sku": "PF004-U+SA007-US1"
      }
    ],
    "specs": {
      "voltage": "110V ou 220V",
      "ams": "Com AMS Incluso (4 cores)",
      "volume": "256 x 256 x 256 mm",
      "speed": "500 mm/s"
    },
    "description": "O cavalo de batalha da Bambu Lab com gabinete fechado para filamentos técnicos (ABS, ASA, PETG-CF) e alimentador AMS de 4 cores."
  },

  {
    "id": "bambu-x1e-combo",
    "name": "BAMBU X1E COMBO ENTERPRISE",
    "category": "Impressoras 3D",
    "subCategory": "Corporativa & Engenharia",
    "brand": "Bambu Lab",
    "price": 22490,
    "oldPrice": null,
    "installments": 12,
    "installmentValue": 1874.17,
    "pixDiscountPercent": 10,
    "pixPrice": 20241,
    "image": "/images/printer-bambu-x2d.png",
    "badge": "ENTERPRISE",
    "promoTag": "black-friday",
    "rating": 5,
    "reviewsCount": 22,
    "inStock": true,
    "sku": "PF001-E+SA001",
    "defaultVoltage": "100-240V Bivolt",
    "voltageVariants": [
      {
        "voltage": "100-240V Bivolt",
        "sku": "PF001-E+SA001"
      }
    ],
    "specs": {
      "voltage": "100-240V Bivolt",
      "ams": "Com AMS Incluso",
      "volume": "256 x 256 x 256 mm",
      "speed": "500 mm/s"
    },
    "description": "Modelo Enterprise com conexão Ethernet dedicada, controle de rede seguro WPA2-Enterprise, câmara ativamente aquecida até 60°C e filtragem de ar G3."
  },

  {
    "id": "bambu-x2d-combo-hv-220v",
    "name": "BAMBU X2D COMBO",
    "category": "Impressoras 3D",
    "subCategory": "Dual LiDAR Industrial",
    "brand": "Bambu Lab",
    "price": 11699,
    "oldPrice": 13999,
    "installments": 12,
    "installmentValue": 974.92,
    "pixDiscountPercent": 10,
    "pixPrice": 10529.1,
    "image": "/images/printer-bambu-x2d.png",
    "badge": "BLACK FRIDAY −16%",
    "promoTag": "black-friday",
    "rating": 5,
    "reviewsCount": 204,
    "inStock": true,
    "sku": "PF004-P+SA007-HV",
    "defaultVoltage": "220V",
    "voltageVariants": [
      {
        "voltage": "220V (HV)",
        "sku": "PF004-P+SA007-HV"
      },
      {
        "voltage": "110V / 127V (LV/US)",
        "sku": "PF004-P+SA007-LV"
      }
    ],
    "specs": {
      "voltage": "110V ou 220V",
      "ams": "Com AMS Incluso (4 cores)",
      "volume": "256 x 256 x 256 mm",
      "speed": "500 mm/s"
    },
    "description": "Topo de linha com sistema de calibração dupla por sensor LiDAR, IA para detecção precoce de espaguete e gabinete em liga aeroespacial."
  },

  {
    "id": "snapmaker-u1",
    "name": "SNAPMAKER U1 4-HEAD",
    "category": "Impressoras 3D",
    "subCategory": "Multi-Toolhead 4 Cabeçotes",
    "brand": "Snapmaker",
    "price": 10990,
    "oldPrice": 12990,
    "installments": 12,
    "installmentValue": 915.83,
    "pixDiscountPercent": 10,
    "pixPrice": 9891,
    "image": "/images/printer-snapmaker-u1.png?v=card3",
    "badge": "BLACK NOVEMBER −15%",
    "promoTag": "black-november",
    "rating": 5,
    "reviewsCount": 54,
    "inStock": true,
    "sku": "SM-U1-MULTITOOL",
    "defaultVoltage": "100-240V Bivolt",
    "voltageVariants": [
      {
        "voltage": "100-240V Bivolt Automático",
        "sku": "SM-U1-MULTITOOL"
      }
    ],
    "specs": {
      "voltage": "100-240V Bivolt Automático",
      "ams": "4 Cabeçotes Independentes",
      "volume": "300 x 300 x 330 mm",
      "speed": "600 mm/s",
      "accel": "20.000 mm/s²",
      "waste": "Sem torre de purga (-90% desperdício)"
    },
    "description": "Inovação radical em impressão multicolorida: 4 ferramentas dedicadas que trocam em milissegundos sem misturar materiais nem desperdiçar filamento."
  },

  {
    "id": "bambu-a1-refurbished",
    "name": "BAMBU A1 100-240V (RECONDICIONADA)",
    "category": "Impressoras 3D",
    "subCategory": "Recondicionada Oficial",
    "brand": "Bambu Lab",
    "price": 1999,
    "oldPrice": null,
    "installments": 12,
    "installmentValue": 166.58,
    "pixDiscountPercent": 10,
    "pixPrice": 1799.1,
    "image": "/images/printer-bambu-a1.png",
    "badge": "RECONDICIONADA",
    "promoTag": "black-friday",
    "rating": 4.8,
    "reviewsCount": 38,
    "inStock": true,
    "sku": "PF002-A",
    "defaultVoltage": "100-240V Bivolt",
    "voltageVariants": [
      {
        "voltage": "100-240V Bivolt",
        "sku": "PF002-A"
      }
    ],
    "specs": {
      "voltage": "100-240V Bivolt",
      "ams": "Sem AMS",
      "volume": "256 x 256 x 256 mm",
      "speed": "500 mm/s"
    },
    "description": "Impressora 3D Bambu A1 100-240V Recondicionada oficial de fábrica. Sem alimentador AMS. Alto custo-benefício com certificação e garantia de bancada."
  },

  {
    "id": "bambu-a1-combo-refurbished",
    "name": "BAMBU A1 COMBO EU 100-240V (RECONDICIONADA)",
    "category": "Impressoras 3D",
    "subCategory": "Recondicionada Oficial",
    "brand": "Bambu Lab",
    "price": 3899,
    "oldPrice": null,
    "installments": 12,
    "installmentValue": 324.92,
    "pixDiscountPercent": 10,
    "pixPrice": 3509.1,
    "image": "/images/printer-bambu-a1.png",
    "badge": "RECONDICIONADA",
    "promoTag": "black-friday",
    "rating": 4.9,
    "reviewsCount": 45,
    "inStock": true,
    "sku": "PF002-A-EU2",
    "defaultVoltage": "100-240V Bivolt",
    "voltageVariants": [
      {
        "voltage": "100-240V Bivolt",
        "sku": "PF002-A-EU2"
      }
    ],
    "specs": {
      "voltage": "100-240V Bivolt",
      "ams": "Com AMS lite incluso (4 cores)",
      "volume": "256 x 256 x 256 mm",
      "speed": "500 mm/s"
    },
    "description": "Bambu A1 Combo Recondicionada oficial de fábrica com alimentador AMS Lite incluso. Totalmente inspecionada com garantia nacional."
  },

  {
    "id": "bambu-a1-mini-refurbished",
    "name": "BAMBU A1 MINI 100-240V (RECONDICIONADA)",
    "category": "Impressoras 3D",
    "subCategory": "Recondicionada Oficial",
    "brand": "Bambu Lab",
    "price": 1699,
    "oldPrice": null,
    "installments": 12,
    "installmentValue": 141.58,
    "pixDiscountPercent": 10,
    "pixPrice": 1529.1,
    "image": "/images/printer-bambu-a1-mini.png",
    "badge": "RECONDICIONADA",
    "promoTag": "black-friday",
    "rating": 4.8,
    "reviewsCount": 33,
    "inStock": true,
    "sku": "PF002-M EURF",
    "defaultVoltage": "100-240V Bivolt",
    "voltageVariants": [
      {
        "voltage": "100-240V Bivolt",
        "sku": "PF002-M EURF"
      }
    ],
    "specs": {
      "voltage": "100-240V Bivolt",
      "ams": "Sem AMS",
      "volume": "180 x 180 x 180 mm",
      "speed": "500 mm/s"
    },
    "description": "Bambu A1 Mini Recondicionada de fábrica. Revisão técnica completa, calibração milimétrica e menor custo de entrada para o ecossistema."
  },

  // =========================================================================
  // 2. FILAMENTOS TÉCNICOS & ESPECIAIS (ORGANIZADOS POR MATERIAL E EFEITO)
  // =========================================================================
  {
    "id": "filament-bambu-pla-lite",
    "name": "Filamento Bambu PLA Lite 1.75mm 1Kg (Carretel & Refil)",
    "category": "Filamentos",
    "subCategory": "PLA Lite (RFID)",
    "brand": "Bambu Lab",
    "polymerType": "PLA",
    "price": 119,
    "oldPrice": 139,
    "installments": 6,
    "installmentValue": 19.83,
    "pixDiscountPercent": 10,
    "pixPrice": 107.1,
    "image": "/images/filaments/bambu-pla-lite.png",
    "badge": "MAIS VENDIDO",
    "promoTag": "black-november",
    "rating": 5,
    "reviewsCount": 148,
    "inStock": true,
    "sku": "BL-PLA-LITE",
    "specs": {
      "rfid": "Sim (Auto-identificação AMS)",
      "material": "PLA Biodegradável de Alta Fluidez",
      "diameter": "1.75 mm ± 0.03 mm",
      "temp": "190 - 220 °C"
    },
    "colors": [
      {
        "name": "Branco White",
        "hex": "#FFFFFF"
      },
      {
        "name": "Preto Black",
        "hex": "#111111"
      },
      {
        "name": "Cinza Gray",
        "hex": "#7F8388"
      },
      {
        "name": "Azul Cyan",
        "hex": "#19B6EC"
      },
      {
        "name": "Azul Marinho",
        "hex": "#1B294B"
      },
      {
        "name": "Amarelo Yellow",
        "hex": "#F6D334"
      },
      {
        "name": "Laranja Orange",
        "hex": "#EE7B23"
      },
      {
        "name": "Vermelho Red",
        "hex": "#D22630"
      },
      {
        "name": "Verde Green",
        "hex": "#008751"
      },
      {
        "name": "Rosa Pink",
        "hex": "#E75480"
      },
      {
        "name": "Marrom Cocoa",
        "hex": "#4B3621"
      },
      {
        "name": "Roxo Purple",
        "hex": "#6A0DAD"
      },
      {
        "name": "Bege Skin",
        "hex": "#F5DEB3"
      }
    ],
    "description": "Filamento oficial Bambu Lab com chip RFID integrado. A impressora detecta a cor, temperatura e quantidade restante automaticamente no sistema AMS. Excelente fluidez para alta velocidade sem entupimentos."
  },

  {
    "id": "filament-bambu-pla-basic",
    "name": "Filamento Bambu PLA Basic 1.75mm 1Kg (30 Cores)",
    "category": "Filamentos",
    "subCategory": "PLA Basic (RFID)",
    "brand": "Bambu Lab",
    "polymerType": "PLA",
    "price": 152.1,
    "oldPrice": 169,
    "installments": 6,
    "installmentValue": 25.35,
    "pixDiscountPercent": 10,
    "pixPrice": 136.89,
    "image": "/images/filaments/bambu-pla-basic.png",
    "badge": "CHIP RFID OFICIAL",
    "promoTag": "black-friday",
    "rating": 5,
    "reviewsCount": 162,
    "inStock": true,
    "sku": "BL-PLA-BASIC",
    "specs": {
      "rfid": "Sim (Auto-identificação AMS)",
      "material": "PLA Virgem Premium Alta Precisão",
      "diameter": "1.75 mm ± 0.02 mm",
      "temp": "190 - 230 °C"
    },
    "colors": [
      {
        "name": "Jade White",
        "hex": "#FFFFFF"
      },
      {
        "name": "Black",
        "hex": "#111111"
      },
      {
        "name": "Bambu Green",
        "hex": "#00AE42"
      },
      {
        "name": "Blue",
        "hex": "#0047AB"
      },
      {
        "name": "Cyan",
        "hex": "#00B7EB"
      },
      {
        "name": "Red",
        "hex": "#E32636"
      },
      {
        "name": "Yellow",
        "hex": "#FFD700"
      },
      {
        "name": "Orange",
        "hex": "#FF6600"
      },
      {
        "name": "Silver",
        "hex": "#C0C0C0"
      },
      {
        "name": "Gold",
        "hex": "#CFB53B"
      },
      {
        "name": "Bronze",
        "hex": "#CD7F32"
      },
      {
        "name": "Pink",
        "hex": "#FF69B4"
      },
      {
        "name": "Magenta",
        "hex": "#FF00FF"
      },
      {
        "name": "Purple",
        "hex": "#800080"
      },
      {
        "name": "Brown",
        "hex": "#5C4033"
      },
      {
        "name": "Beige",
        "hex": "#F5F5DC"
      },
      {
        "name": "Dark Gray",
        "hex": "#333333"
      },
      {
        "name": "Light Gray",
        "hex": "#A8A8A8"
      },
      {
        "name": "Mistletoe Green",
        "hex": "#2E5A36"
      },
      {
        "name": "Cobalt Blue",
        "hex": "#002060"
      }
    ],
    "description": "Filamento de referência global com a maior fidelidade dimensional da categoria. Calibrado para acelerações de até 20.000 mm/s² com acabamento acetinado de fábrica."
  },

  {
    "id": "filament-bambu-pla-matte",
    "name": "Filamento Bambu PLA Matte Fosco Acetinado 1.75mm 1Kg",
    "category": "Filamentos",
    "subCategory": "PLA Matte (RFID)",
    "brand": "Bambu Lab",
    "polymerType": "PLA",
    "price": 143.65,
    "oldPrice": 169,
    "installments": 6,
    "installmentValue": 23.94,
    "pixDiscountPercent": 10,
    "pixPrice": 129.28,
    "image": "/images/filaments/bambu-pla-matte.webp",
    "badge": "ACABAMENTO FOSCO",
    "promoTag": "black-november",
    "rating": 5,
    "reviewsCount": 119,
    "inStock": true,
    "sku": "BL-PLA-MATTE",
    "specs": {
      "rfid": "Sim (Auto-identificação AMS)",
      "finish": "Fosco Anti-reflexo Aveludado",
      "diameter": "1.75 mm",
      "temp": "190 - 230 °C"
    },
    "colors": [
      {
        "name": "Ivory White",
        "hex": "#FFFFF0"
      },
      {
        "name": "Charcoal Preto",
        "hex": "#222222"
      },
      {
        "name": "Ash Gray",
        "hex": "#B2BEB5"
      },
      {
        "name": "Nardo Gray",
        "hex": "#686C70"
      },
      {
        "name": "Marine Blue",
        "hex": "#013A63"
      },
      {
        "name": "Sky Blue",
        "hex": "#87CEEB"
      },
      {
        "name": "Ice Blue",
        "hex": "#A5F2F3"
      },
      {
        "name": "Dark Green",
        "hex": "#1B5E20"
      },
      {
        "name": "Scarlet Red",
        "hex": "#FF2400"
      },
      {
        "name": "Dark Red",
        "hex": "#8B0000"
      },
      {
        "name": "Lemon Yellow",
        "hex": "#FFF44F"
      },
      {
        "name": "Mandarin Orange",
        "hex": "#FF7518"
      },
      {
        "name": "Terracotta",
        "hex": "#E2725B"
      },
      {
        "name": "Sakura Pink",
        "hex": "#FFB7C5"
      },
      {
        "name": "Lilac Purple",
        "hex": "#C8A2C8"
      },
      {
        "name": "Latte Brown",
        "hex": "#C5A059"
      },
      {
        "name": "Dark Brown",
        "hex": "#3E2723"
      },
      {
        "name": "Dark Blue",
        "hex": "#002366"
      }
    ],
    "description": "Acabamento acetinado fosco espetacular que mascara completamente as linhas de camada. Textura aveludada preferida por arquitetos, designers e colecionadores."
  },

  {
    "id": "filament-bambu-pla-silk",
    "name": "Filamento Bambu PLA Silk & Silk+ Alto Brilho 1Kg",
    "category": "Filamentos",
    "subCategory": "PLA Silk Efeito Seda",
    "brand": "Bambu Lab",
    "polymerType": "PLA",
    "price": 143.65,
    "oldPrice": 169,
    "installments": 6,
    "installmentValue": 23.94,
    "pixDiscountPercent": 10,
    "pixPrice": 129.28,
    "image": "/images/filaments/bambu-pla-silk.webp",
    "badge": "BRILHO ESPELHADO",
    "promoTag": "black-november",
    "rating": 5,
    "reviewsCount": 84,
    "inStock": true,
    "sku": "BL-PLA-SILK",
    "specs": {
      "rfid": "Sim (Auto-identificação AMS)",
      "material": "PLA Seda com Reflexo Perolado",
      "diameter": "1.75 mm",
      "temp": "210 - 230 °C"
    },
    "colors": [
      {
        "name": "Dourado Gold",
        "hex": "#FFD700"
      },
      {
        "name": "Prata Silver",
        "hex": "#E0E0E0"
      },
      {
        "name": "Rose Gold",
        "hex": "#B76E79"
      },
      {
        "name": "Titan Gray",
        "hex": "#708090"
      },
      {
        "name": "Champagne",
        "hex": "#F7E7CE"
      },
      {
        "name": "Candy Red",
        "hex": "#D2143A"
      },
      {
        "name": "Blue Hawaii",
        "hex": "#0077BE"
      },
      {
        "name": "Aurora Purple",
        "hex": "#7B1FA2"
      },
      {
        "name": "Neon City",
        "hex": "#00E5FF"
      },
      {
        "name": "Velvet Eclipse",
        "hex": "#4A0E17"
      }
    ],
    "description": "Filamento de seda premium com reflexo perolado brilhante. Dá aspecto metálico nobre para troféus, esculturas e peças decorativas."
  },

  {
    "id": "filament-bambu-pla-marble",
    "name": "Filamento Bambu PLA Marble (Efeito Mármore & Granito) 1Kg",
    "category": "Filamentos",
    "subCategory": "PLA Marble Mármore",
    "brand": "Bambu Lab",
    "polymerType": "PLA",
    "price": 184.8,
    "oldPrice": 219,
    "installments": 6,
    "installmentValue": 30.8,
    "pixDiscountPercent": 10,
    "pixPrice": 166.32,
    "image": "/images/filaments/bambu-pla-marble.webp",
    "badge": "EFEITO ROCHA",
    "promoTag": "black-november",
    "rating": 5,
    "reviewsCount": 62,
    "inStock": true,
    "sku": "A07-R5-1.75-1000-SPL",
    "specs": {
      "rfid": "Sim (Auto-identificação AMS)",
      "finish": "Cargas Minerais Simulam Rocha Polida",
      "diameter": "1.75 mm",
      "temp": "200 - 225 °C"
    },
    "colors": [
      {
        "name": "Mármore Branco Carrara",
        "hex": "#F5F5F5"
      },
      {
        "name": "Granito Cinza Rocha",
        "hex": "#9E9E9E"
      },
      {
        "name": "Granito Vermelho Terracota",
        "hex": "#8B3A3A"
      }
    ],
    "description": "Composto aditivado com micropartículas minerais que reproduzem com fidelidade visual a textura de mármore e granito polido. Ocre e manchas naturais sem necessidade de pós-processamento."
  },

  {
    "id": "filament-bambu-pla-galaxy",
    "name": "Filamento Bambu PLA Galaxy & Sparkle (Efeito Cósmico) 1Kg",
    "category": "Filamentos",
    "subCategory": "PLA Galaxy Cósmico",
    "brand": "Bambu Lab",
    "polymerType": "PLA",
    "price": 184.8,
    "oldPrice": 219,
    "installments": 6,
    "installmentValue": 30.8,
    "pixDiscountPercent": 10,
    "pixPrice": 166.32,
    "image": "/images/filaments/bambu-pla-galaxy.webp",
    "badge": "GLITTER CÓSMICO",
    "promoTag": "black-november",
    "rating": 5,
    "reviewsCount": 57,
    "inStock": true,
    "sku": "A04-K0-1.75-1000-SPL",
    "specs": {
      "rfid": "Sim (Auto-identificação AMS)",
      "finish": "Glitter Reflexivo de Alta Dispersão",
      "diameter": "1.75 mm",
      "temp": "205 - 225 °C"
    },
    "colors": [
      {
        "name": "Galaxy Black Ônix",
        "hex": "#1A1A1A"
      },
      {
        "name": "Galaxy Nebula Roxo",
        "hex": "#4A154B"
      },
      {
        "name": "Galaxy Pine Green",
        "hex": "#1F4E38"
      },
      {
        "name": "Sparkle Ouro Real",
        "hex": "#CFB53B"
      },
      {
        "name": "Sparkle Prata Estelar",
        "hex": "#C0C0C0"
      }
    ],
    "description": "Carga brilhante de glitter reflexivo que confere aspecto de céu estrelado profundo. Esconde imperfeições de camada e brilha intensamente sob a luz."
  },

  {
    "id": "filament-bambu-pla-glow",
    "name": "Filamento Bambu PLA Glow (Brilha no Escuro Fosforescente) 1Kg",
    "category": "Filamentos",
    "subCategory": "PLA Glow Fosforescente",
    "brand": "Bambu Lab",
    "polymerType": "PLA",
    "price": 189,
    "oldPrice": 229,
    "installments": 6,
    "installmentValue": 31.5,
    "pixDiscountPercent": 10,
    "pixPrice": 170.1,
    "image": "/images/filaments/bambu-pla-glow.jpg",
    "badge": "FOSFORESCENTE",
    "promoTag": "black-friday",
    "rating": 5,
    "reviewsCount": 49,
    "inStock": true,
    "sku": "A05-G0-1.75-1000-SPL",
    "specs": {
      "rfid": "Sim (Auto-identificação AMS)",
      "glow": "Fosforescência Prolongada de Alta Intensidade",
      "diameter": "1.75 mm",
      "temp": "200 - 225 °C"
    },
    "colors": [
      {
        "name": "Glow Verde Neon",
        "hex": "#39FF14"
      },
      {
        "name": "Glow Azul Turquesa",
        "hex": "#00FFFF"
      },
      {
        "name": "Glow Laranja Fogo",
        "hex": "#FF6700"
      }
    ],
    "description": "Filamento fosforescente que absorve luz natural ou UV e brilha intensamente na escuridão por horas. Perfeito para brinquedos, decorações temáticas e sinalizações noturnas."
  },

  {
    "id": "filament-bambu-pla-wood",
    "name": "Filamento Bambu PLA Wood Madeira Real 1.75mm 1Kg",
    "category": "Filamentos",
    "subCategory": "Madeira Natural",
    "brand": "Bambu Lab",
    "polymerType": "PLA",
    "price": 175.2,
    "oldPrice": 209,
    "installments": 6,
    "installmentValue": 29.2,
    "pixDiscountPercent": 10,
    "pixPrice": 157.68,
    "image": "/images/filaments/bambu-pla-wood.webp",
    "badge": "MADEIRA REAL",
    "promoTag": "black-friday",
    "rating": 5,
    "reviewsCount": 46,
    "inStock": true,
    "sku": "A15-W0-1.75-1000-SPL",
    "specs": {
      "rfid": "Sim (Auto-identificação AMS)",
      "composition": "30% Pó de Madeira Natural Reciclada",
      "diameter": "1.75 mm",
      "temp": "200 - 225 °C"
    },
    "colors": [
      {
        "name": "Carvalho Claro",
        "hex": "#D2B48C"
      },
      {
        "name": "Bambu Natural",
        "hex": "#DEB887"
      },
      {
        "name": "Nogueira Escura",
        "hex": "#8B5A2B"
      },
      {
        "name": "Mogno Avermelhado",
        "hex": "#6E260E"
      },
      {
        "name": "Ébano Rústico",
        "hex": "#3B2F2F"
      },
      {
        "name": "Cedro Nobre",
        "hex": "#A0522D"
      }
    ],
    "description": "Contém pó de madeira natural na fórmula, permitindo lixar, envernizar e pintar com acabamento idêntico a madeira de verdade. Odor natural suave de serragem ao imprimir."
  },

  {
    "id": "filament-bambu-petg-hf",
    "name": "Filamento Bambu PETG Basic & PETG HF Alta Velocidade 1Kg",
    "category": "Filamentos",
    "subCategory": "PETG Técnico",
    "brand": "Bambu Lab",
    "polymerType": "PETG",
    "price": 152.1,
    "oldPrice": 179,
    "installments": 6,
    "installmentValue": 25.35,
    "pixDiscountPercent": 10,
    "pixPrice": 136.89,
    "image": "/images/filaments/bambu-petg-basic.webp",
    "badge": "RESISTENTE",
    "promoTag": "black-friday",
    "rating": 5,
    "reviewsCount": 92,
    "inStock": true,
    "sku": "BL-PETG-BASIC",
    "specs": {
      "rfid": "Sim (Auto-identificação AMS)",
      "material": "Glicol Modificado Alta Tenacidade",
      "tempResist": "Até 75 °C",
      "diameter": "1.75 mm",
      "temp": "230 - 250 °C"
    },
    "colors": [
      {
        "name": "Preto",
        "hex": "#111111"
      },
      {
        "name": "Branco",
        "hex": "#FFFFFF"
      },
      {
        "name": "Cinza",
        "hex": "#808080"
      },
      {
        "name": "Vermelho",
        "hex": "#C62928"
      },
      {
        "name": "Azul Real",
        "hex": "#0055A5"
      },
      {
        "name": "Laranja Solar",
        "hex": "#FF7518"
      },
      {
        "name": "Amarelo Ouro",
        "hex": "#FFD700"
      },
      {
        "name": "Verde Floresta",
        "hex": "#228B22"
      }
    ],
    "description": "Combina a facilidade do PLA com resistência mecânica e química muito superior. Ideal para peças funcionais, suportes mecânicos, carcaças e aplicações com contato com água."
  },

  {
    "id": "filament-bambu-petg-translucent",
    "name": "Filamento Bambu PETG Translucent (Translúcido Efeito Vidro) 1Kg",
    "category": "Filamentos",
    "subCategory": "PETG Translúcido",
    "brand": "Bambu Lab",
    "polymerType": "PETG",
    "price": 169,
    "oldPrice": 199,
    "installments": 6,
    "installmentValue": 28.17,
    "pixDiscountPercent": 10,
    "pixPrice": 152.1,
    "image": "/images/filaments/bambu-petg-translucent.webp",
    "badge": "EFEITO VIDRO",
    "promoTag": "black-november",
    "rating": 5,
    "reviewsCount": 51,
    "inStock": true,
    "sku": "G01-D0-1.75-1000-SPL",
    "specs": {
      "rfid": "Sim (Auto-identificação AMS)",
      "finish": "Transparência Alta & Difusão de Luz",
      "diameter": "1.75 mm",
      "temp": "230 - 255 °C"
    },
    "colors": [
      {
        "name": "Cristal Transparente",
        "hex": "#E8F4F8"
      },
      {
        "name": "Azul Translúcido",
        "hex": "#0077BE"
      },
      {
        "name": "Laranja Translúcido",
        "hex": "#FF7518"
      },
      {
        "name": "Fumê Cinza",
        "hex": "#4A4A4A"
      },
      {
        "name": "Verde Esmeralda",
        "hex": "#50C878"
      }
    ],
    "description": "Alta transmitância de luz e resistência ao impacto. Perfeito para luminárias, abajures com difusores de LED, recipientes estanques e visores técnicos."
  },

  {
    "id": "filament-bambu-abs-asa",
    "name": "Filamento Bambu ABS & ASA Resistência Mecânica/UV 1Kg",
    "category": "Filamentos",
    "subCategory": "ABS & ASA Engenharia",
    "brand": "Bambu Lab",
    "polymerType": "ABS",
    "price": 111.2,
    "oldPrice": 143.65,
    "installments": 6,
    "installmentValue": 18.53,
    "pixDiscountPercent": 10,
    "pixPrice": 100.08,
    "image": "/images/filaments/bambu-abs.webp",
    "badge": "CALOR ATÉ 100°C",
    "promoTag": "black-friday",
    "rating": 4.9,
    "reviewsCount": 67,
    "inStock": true,
    "sku": "BL-ABS-ASA",
    "specs": {
      "rfid": "Sim (Auto-identificação AMS)",
      "tempResist": "Até 100 °C contínuos",
      "uvResist": "ASA com bloqueio UV total",
      "diameter": "1.75 mm",
      "temp": "240 - 270 °C"
    },
    "colors": [
      {
        "name": "Preto Puro",
        "hex": "#111111"
      },
      {
        "name": "Branco Neve",
        "hex": "#FFFFFF"
      },
      {
        "name": "Cinza Industrial",
        "hex": "#666666"
      },
      {
        "name": "Azul Marinho",
        "hex": "#002060"
      },
      {
        "name": "Vermelho Fogo",
        "hex": "#CC0000"
      },
      {
        "name": "Amarelo Tráfego",
        "hex": "#FFCC00"
      },
      {
        "name": "Verde Militar",
        "hex": "#4B5320"
      },
      {
        "name": "Laranja Segurança",
        "hex": "#FF5F1F"
      }
    ],
    "description": "Materiais de engenharia pura para peças técnicas sujeitas a calor e atrito. O ASA oferece bloqueio UV total para componentes externos automotivos e de aviação."
  },

  {
    "id": "filament-bambu-carbon-fiber-engineering",
    "name": "Filamentos Bambu Carbon Fiber (PLA-CF, PETG-CF, PA6-CF, PAHT-CF)",
    "category": "Filamentos",
    "subCategory": "Fibra de Carbono",
    "brand": "Bambu Lab",
    "polymerType": "CARBON_FIBER",
    "price": 203.15,
    "oldPrice": 249,
    "installments": 6,
    "installmentValue": 33.86,
    "pixDiscountPercent": 10,
    "pixPrice": 182.84,
    "image": "/images/filaments/bambu-pla-cf.webp",
    "badge": "RIGIDEZ MÁXIMA",
    "promoTag": "black-friday",
    "rating": 5,
    "reviewsCount": 94,
    "inStock": true,
    "sku": "BL-CF-SERIES",
    "specs": {
      "rfid": "Sim (Auto-identificação AMS)",
      "fiber": "Reforço com Fibras Curtas de Carbono",
      "finish": "Matte Acetinado Técnico Texturizado",
      "diameter": "1.75 mm",
      "nozzle": "Requer Bico de Aço Endurecido"
    },
    "colors": [
      {
        "name": "Preto Grafite Carbono",
        "hex": "#1C1C1C"
      },
      {
        "name": "Cinza Ardósia",
        "hex": "#474747"
      },
      {
        "name": "Azul Denim Escuro",
        "hex": "#1E2D42"
      },
      {
        "name": "Verde Tático",
        "hex": "#2A3428"
      },
      {
        "name": "Borgonha Escuro",
        "hex": "#3B1720"
      },
      {
        "name": "Laranja Queimado",
        "hex": "#8B4000"
      },
      {
        "name": "Lavanda Cinzento",
        "hex": "#5D536B"
      }
    ],
    "description": "Filamentos reforçados com fibra de carbono real. Garantem rigidez estrutural incomparável, mínima retração térmica e acabamento superficial fosco com camuflagem perfeita de linhas."
  },

  {
    "id": "filament-bambu-tpu-flexible",
    "name": "Filamento Bambu TPU Flexível (85A, 90A, 95A HF & for AMS)",
    "category": "Filamentos",
    "subCategory": "TPU Flexível Emborrachado",
    "brand": "Bambu Lab",
    "polymerType": "ESPECIAIS",
    "price": 313.65,
    "oldPrice": 359,
    "installments": 6,
    "installmentValue": 52.28,
    "pixDiscountPercent": 10,
    "pixPrice": 282.28,
    "image": "/images/filament-bambulab-pla-lite.png",
    "badge": "EMBORRACHADO",
    "promoTag": "black-friday",
    "rating": 5,
    "reviewsCount": 38,
    "inStock": true,
    "sku": "BL-TPU-SERIES",
    "specs": {
      "hardness": "Dureza Shore 85A / 90A / 95A HF",
      "elongation": "Alongamento até a ruptura > 450%",
      "diameter": "1.75 mm",
      "temp": "220 - 240 °C"
    },
    "colors": [
      {
        "name": "Preto Emborrachado",
        "hex": "#111111"
      },
      {
        "name": "Branco Puro",
        "hex": "#FFFFFF"
      },
      {
        "name": "Cinza Espacial",
        "hex": "#555555"
      },
      {
        "name": "Azul Elétrico",
        "hex": "#0066FF"
      },
      {
        "name": "Vermelho Vivo",
        "hex": "#FF0033"
      },
      {
        "name": "Amarelo Neon",
        "hex": "#FFFF00"
      },
      {
        "name": "Laranja Vibrante",
        "hex": "#FF6600"
      }
    ],
    "description": "Poliuretano termoplástico de alta elasticidade e absorção de choques. Ideal para pneus de robótica, gaxetas vedantes, capas de proteção e solados flexíveis."
  },

  {
    "id": "filament-bambu-support-pva",
    "name": "Filamentos Bambu Suporte Removível & PVA Solúvel em Água",
    "category": "Filamentos",
    "subCategory": "Suporte & PVA",
    "brand": "Bambu Lab",
    "polymerType": "ESPECIAIS",
    "price": 125.1,
    "oldPrice": 149,
    "installments": 6,
    "installmentValue": 20.85,
    "pixDiscountPercent": 10,
    "pixPrice": 112.59,
    "image": "/images/filament-bambulab-pla-lite.png",
    "badge": "SOLÚVEL & DESCOLÁVEL",
    "promoTag": "black-november",
    "rating": 5,
    "reviewsCount": 33,
    "inStock": true,
    "sku": "BL-SUPPORT-SERIES",
    "specs": {
      "rfid": "Sim (Auto-identificação AMS)",
      "removal": "PVA (Dissolve em água morna) ou Support for PLA (Destaque manual)",
      "diameter": "1.75 mm",
      "temp": "190 - 220 °C"
    },
    "colors": [
      {
        "name": "Support for PLA (Branco Destaque Fácil)",
        "hex": "#F8F9FA"
      },
      {
        "name": "Support for PA/PET (Cinza Claro)",
        "hex": "#D6D8DB"
      },
      {
        "name": "PVA Solúvel em Água Natural",
        "hex": "#FFFDD0"
      },
      {
        "name": "Support for ABS (Verde Menta)",
        "hex": "#98FF98"
      }
    ],
    "description": "Interface de suporte que se desprende com facilidade milimétrica da peça ou dissolve totalmente em água (PVA), eliminando cicatrizes de contato em pontes e saliências."
  },

  {
    "id": "filament-polymaker-panchroma",
    "name": "Filamento Polymaker Panchroma (Matte, Silk, Galaxy & Gradient)",
    "category": "Filamentos",
    "subCategory": "Polymaker Criativo",
    "brand": "Polymaker",
    "polymerType": "PLA",
    "price": 99.59,
    "oldPrice": 117.17,
    "installments": 6,
    "installmentValue": 16.6,
    "pixDiscountPercent": 10,
    "pixPrice": 89.63,
    "image": "/images/filaments/polymaker-panchroma.webp",
    "badge": "PROMOÇÃO IMPERDÍVEL",
    "promoTag": "black-friday",
    "rating": 5,
    "reviewsCount": 71,
    "inStock": true,
    "sku": "POLY-PANCHROMA",
    "specs": {
      "brand": "Polymaker Oficial",
      "jamFree": "Tecnologia patenteada Jam-Free",
      "diameter": "1.75 mm ± 0.02 mm",
      "temp": "190 - 225 °C"
    },
    "colors": [
      {
        "name": "Electric Magenta",
        "hex": "#FF007F"
      },
      {
        "name": "Ash Grey Fosco",
        "hex": "#708090"
      },
      {
        "name": "Starlight Comet",
        "hex": "#4B0082"
      },
      {
        "name": "Silk Bronze Metálico",
        "hex": "#CD7F32"
      },
      {
        "name": "Pastel Peanut",
        "hex": "#D2B48C"
      },
      {
        "name": "Teal Oceano",
        "hex": "#008080"
      },
      {
        "name": "Gradient Sunset",
        "hex": "#FF4500"
      }
    ],
    "description": "Linha artística conceituada da Polymaker com fórmulas patenteadas que evitam entupimento e conferem cores exóticas e gradientes bicolores cinematográficos."
  },

  {
    "id": "filament-polymaker-fiberon-industrial",
    "name": "Filamento Polymaker Fiberon (ASA-CF, PA-CF, PET-CF, PPS-CF)",
    "category": "Filamentos",
    "subCategory": "Engenharia Industrial",
    "brand": "Polymaker",
    "polymerType": "CARBON_FIBER",
    "price": 130.45,
    "oldPrice": 159,
    "installments": 6,
    "installmentValue": 21.74,
    "pixDiscountPercent": 10,
    "pixPrice": 117.41,
    "image": "/images/filaments/bambu-asa-cf.webp",
    "badge": "AEROESPACIAL",
    "promoTag": "black-friday",
    "rating": 5,
    "reviewsCount": 39,
    "inStock": true,
    "sku": "POLY-FIBERON",
    "specs": {
      "strength": "Resistência à Tração Superior a 105 MPa",
      "hdt": "Resistência Térmica até 180 °C",
      "diameter": "1.75 mm",
      "nozzle": "Bico de Aço Endurecido Mandatório"
    },
    "colors": [
      {
        "name": "Preto Carbono Industrial",
        "hex": "#111111"
      },
      {
        "name": "Cinza Aço Titânio",
        "hex": "#43464B"
      },
      {
        "name": "Azul Marinho Tático",
        "hex": "#1B263B"
      },
      {
        "name": "Verde Oliva Profundo",
        "hex": "#354230"
      },
      {
        "name": "Terracota Estrutural",
        "hex": "#7A3828"
      }
    ],
    "description": "Projetado para substituir alumínio e ligas metálicas em gabaritos de usinagem, drones de alta velocidade e componentes automotivos de alta carga."
  },

  {
    "id": "filament-sunlu-high-speed-matte",
    "name": "Filamento SUNLU PLA High Speed, PLA Matte & PLA+ Silk",
    "category": "Filamentos",
    "subCategory": "Alta Velocidade & Silk",
    "brand": "SUNLU",
    "polymerType": "PLA",
    "price": 93.58,
    "oldPrice": 110.09,
    "installments": 6,
    "installmentValue": 15.6,
    "pixDiscountPercent": 10,
    "pixPrice": 84.22,
    "image": "/images/filaments/sunlu-pla.webp",
    "badge": "MELHOR CUSTO-BENEFÍCIO",
    "promoTag": "black-friday",
    "rating": 4.9,
    "reviewsCount": 153,
    "inStock": true,
    "sku": "SL-HS-SERIES",
    "specs": {
      "speed": "Testado até 600 mm/s em CoreXY",
      "fluidity": "Alta vazão volumétrica (até 32 mm³/s)",
      "diameter": "1.75 mm ± 0.02 mm",
      "temp": "200 - 230 °C"
    },
    "colors": [
      {
        "name": "Branco Neve",
        "hex": "#FFFFFF"
      },
      {
        "name": "Preto Profundo",
        "hex": "#111111"
      },
      {
        "name": "Cinza Prata",
        "hex": "#A9A9A9"
      },
      {
        "name": "Vermelho Ferrari",
        "hex": "#FF2800"
      },
      {
        "name": "Azul Cobalto",
        "hex": "#0047AB"
      },
      {
        "name": "Amarelo Canário",
        "hex": "#FFEF00"
      },
      {
        "name": "Verde Neon",
        "hex": "#39FF14"
      },
      {
        "name": "Laranja Solar",
        "hex": "#FF7900"
      }
    ],
    "description": "Filamento de altíssima vazão volumétrica perfeito para impressoras de alta aceleração. Excelente aderência entre camadas com valor altamente competitivo."
  },

  {
    "id": "filament-esun-special",
    "name": "Filamento eSun (PLA HS, PLA-Silk Magic Bicolor & TPU)",
    "category": "Filamentos",
    "subCategory": "eSun Especiais",
    "brand": "eSun",
    "polymerType": "ESPECIAIS",
    "price": 124.93,
    "oldPrice": 149,
    "installments": 6,
    "installmentValue": 20.82,
    "pixDiscountPercent": 10,
    "pixPrice": 112.44,
    "image": "/images/filament-bambulab-pla-lite.png",
    "badge": "BICOLOR & HS",
    "promoTag": "black-november",
    "rating": 4.9,
    "reviewsCount": 42,
    "inStock": true,
    "sku": "ESUN-SPECIAL",
    "specs": {
      "brand": "eSun Oficial",
      "effect": "Fórmula High-Speed & Coextrusão Bicolor",
      "diameter": "1.75 mm",
      "temp": "210 - 230 °C"
    },
    "colors": [
      {
        "name": "PLA HS Branco",
        "hex": "#FFFFFF"
      },
      {
        "name": "PLA HS Preto",
        "hex": "#111111"
      },
      {
        "name": "Silk Magic Ouro-Vermelho",
        "hex": "#B8860B"
      },
      {
        "name": "eTPU-95A Translúcido",
        "hex": "#E0FFFF"
      }
    ],
    "description": "Linha consagrada globalmente da eSun trazendo os novos compostos ePLA-HS para alta velocidade e filamentos coextrusados bicolores com transição de cor em 360°."
  },

  {
    "id": "filament-printalot-pla",
    "name": "Filamento Printalot PLA Premium 1.75mm 1Kg",
    "category": "Filamentos",
    "subCategory": "PLA Premium",
    "brand": "Printalot",
    "polymerType": "PLA",
    "price": 129.9,
    "oldPrice": 145,
    "installments": 6,
    "installmentValue": 21.65,
    "pixDiscountPercent": 10,
    "pixPrice": 116.91,
    "image": "/images/filaments/printalot-pla.webp",
    "badge": "QUALIDADE VIRGEM",
    "promoTag": "black-friday",
    "rating": 4.8,
    "reviewsCount": 57,
    "inStock": true,
    "sku": "PRT-PLA-1KG",
    "specs": {
      "resin": "100% Ingeo NatureWorks USA",
      "diameter": "1.75 mm ± 0.02 mm",
      "temp": "195 - 220 °C"
    },
    "colors": [
      {
        "name": "Preto Puro",
        "hex": "#111111"
      },
      {
        "name": "Vermelho Fogo",
        "hex": "#C62928"
      },
      {
        "name": "Chocolate Marrom",
        "hex": "#4E3524"
      },
      {
        "name": "Amarelo Ouro",
        "hex": "#F6D334"
      },
      {
        "name": "Verde Militar",
        "hex": "#4D5932"
      }
    ],
    "description": "Polímero 100% virgem NatureWorks Ingeo de alta estabilidade geométrica, excelente aderência à mesa e carretel ecológico sustentável."
  },

];

export const ALL_PRODUCTS = BASE_PRODUCTS.map(p => {
  const mapData = shopifyMapping[p.id];
  const realPrice = mapData?.price ? parseFloat(mapData.price) : p.price;
  const realOldPrice = mapData?.oldPrice ? parseFloat(mapData.oldPrice) : (p.oldPrice || null);
  const pixPrice = +(realPrice * 0.90).toFixed(2);
  return {
    ...p,
    price: realPrice,
    oldPrice: realOldPrice,
    installmentValue: p.installments ? +(realPrice / p.installments).toFixed(2) : 0,
    pixDiscountPercent: 10,
    pixPrice: pixPrice,
    shopifyVariantId: mapData ? String(mapData.shopifyVariantId) : undefined,
    shopifyProductId: mapData ? String(mapData.shopifyProductId) : undefined,
    colorVariants: mapData?.colorVariants || [],
    handle: mapData ? mapData.handle : undefined
  };
});

export const FILAMENTS = ALL_PRODUCTS.filter(p => p.category === 'Filamentos');
export const PRINTERS = ALL_PRODUCTS.filter(p => p.category === 'Impressoras 3D');

export default ALL_PRODUCTS;
