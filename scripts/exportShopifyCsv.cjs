const fs = require('fs');
const path = require('path');
const { ALL_PRODUCTS } = require('../src/data/products.js');

const BASE_URL = 'https://ziggie-emjt.vercel.app';

function escapeCsv(val) {
  if (val === null || val === undefined) return '';
  const str = String(val);
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

const headers = [
  'Handle',
  'Title',
  'Body (HTML)',
  'Vendor',
  'Product Category',
  'Type',
  'Tags',
  'Published',
  'Option1 Name',
  'Option1 Value',
  'Option2 Name',
  'Option2 Value',
  'Option3 Name',
  'Option3 Value',
  'Variant SKU',
  'Variant Grams',
  'Variant Inventory Tracker',
  'Variant Inventory Qty',
  'Variant Inventory Policy',
  'Variant Fulfillment Service',
  'Variant Price',
  'Variant Compare At Price',
  'Variant Requires Shipping',
  'Variant Taxable',
  'Variant Barcode',
  'Image Src',
  'Image Position',
  'Image Alt Text',
  'Gift Card',
  'SEO Title',
  'SEO Description',
  'Status'
];

const rows = [headers.join(',')];

ALL_PRODUCTS.forEach(product => {
  const handle = product.id.replace(/_/g, '-');
  const title = product.name;
  const bodyHtml = '<p>' + (product.description || '') + '</p>';
  const vendor = product.brand || 'Bambu Lab';
  const type = product.category || 'Impressoras 3D';
  const tags = [product.brand, product.category, product.badge, 'Ziggie', 'Pronta Entrega'].filter(Boolean).join(', ');
  const published = 'TRUE';
  const status = 'active';

  const imageUrl = product.image ? (product.image.startsWith('http') ? product.image : BASE_URL + product.image) : '';

  // Case 1: Product with voltage variants (Printers)
  if (product.voltageVariants && product.voltageVariants.length > 0) {
    product.voltageVariants.forEach((v, index) => {
      const isFirst = index === 0;
      const price = (v.price !== undefined && v.price !== null) ? v.price : product.price;
      const oldPrice = (v.oldPrice !== undefined && v.oldPrice !== null) ? v.oldPrice : product.oldPrice;

      const row = [
        escapeCsv(handle),
        escapeCsv(isFirst ? title : ''),
        escapeCsv(isFirst ? bodyHtml : ''),
        escapeCsv(isFirst ? vendor : ''),
        escapeCsv(isFirst ? 'Hardware > Printers, Copiers & Scanners > 3D Printers' : ''),
        escapeCsv(isFirst ? type : ''),
        escapeCsv(isFirst ? tags : ''),
        escapeCsv(isFirst ? published : ''),
        escapeCsv('Voltagem'),
        escapeCsv(v.voltage),
        '', '', '', '',
        escapeCsv(v.sku || product.sku || (handle + '-' + v.voltage)),
        escapeCsv(type === 'Filamentos' ? 1000 : 15000),
        escapeCsv('shopify'),
        escapeCsv(10),
        escapeCsv('continue'),
        escapeCsv('manual'),
        escapeCsv(Number(price).toFixed(2)),
        escapeCsv(oldPrice ? Number(oldPrice).toFixed(2) : ''),
        escapeCsv('TRUE'),
        escapeCsv('TRUE'),
        '',
        escapeCsv(isFirst ? imageUrl : ''),
        escapeCsv(isFirst ? 1 : ''),
        escapeCsv(isFirst ? title : ''),
        escapeCsv('FALSE'),
        escapeCsv(isFirst ? title + ' | Ziggie 3D' : ''),
        escapeCsv(isFirst ? product.description : ''),
        escapeCsv(status)
      ];
      rows.push(row.join(','));
    });
  } 
  // Case 2: Product with color variants (Filaments)
  else if (product.colors && product.colors.length > 0) {
    product.colors.forEach((c, index) => {
      const isFirst = index === 0;
      const cv = product.colorVariants ? product.colorVariants.find(x => x.name === c.name || x.hex === c.hex) : null;
      const price = (cv && cv.price !== undefined && cv.price !== null) ? cv.price : product.price;
      const oldPrice = (cv && cv.oldPrice !== undefined && cv.oldPrice !== null) ? cv.oldPrice : product.oldPrice;
      const sku = product.sku ? (product.sku + '-' + c.name.replace(/\s+/g, '-').toUpperCase()) : (handle + '-' + c.name);

      const row = [
        escapeCsv(handle),
        escapeCsv(isFirst ? title : ''),
        escapeCsv(isFirst ? bodyHtml : ''),
        escapeCsv(isFirst ? vendor : ''),
        escapeCsv(isFirst ? 'Business & Industrial > 3D Printer Materials' : ''),
        escapeCsv(isFirst ? type : ''),
        escapeCsv(isFirst ? tags : ''),
        escapeCsv(isFirst ? published : ''),
        escapeCsv('Cor'),
        escapeCsv(c.name),
        '', '', '', '',
        escapeCsv(sku),
        escapeCsv(1000),
        escapeCsv('shopify'),
        escapeCsv(25),
        escapeCsv('continue'),
        escapeCsv('manual'),
        escapeCsv(Number(price).toFixed(2)),
        escapeCsv(oldPrice ? Number(oldPrice).toFixed(2) : ''),
        escapeCsv('TRUE'),
        escapeCsv('TRUE'),
        '',
        escapeCsv(isFirst ? imageUrl : ''),
        escapeCsv(isFirst ? 1 : ''),
        escapeCsv(isFirst ? title : ''),
        escapeCsv('FALSE'),
        escapeCsv(isFirst ? title + ' | Ziggie 3D' : ''),
        escapeCsv(isFirst ? product.description : ''),
        escapeCsv(status)
      ];
      rows.push(row.join(','));
    });
  }
  // Case 3: Single item
  else {
    const row = [
      escapeCsv(handle),
      escapeCsv(title),
      escapeCsv(bodyHtml),
      escapeCsv(vendor),
      escapeCsv('Hardware > Printers, Copiers & Scanners > 3D Printers'),
      escapeCsv(type),
      escapeCsv(tags),
      escapeCsv(published),
      escapeCsv('Title'),
      escapeCsv('Default Title'),
      '', '', '', '',
      escapeCsv(product.sku || handle),
      escapeCsv(15000),
      escapeCsv('shopify'),
      escapeCsv(10),
      escapeCsv('continue'),
      escapeCsv('manual'),
      escapeCsv(Number(product.price).toFixed(2)),
      escapeCsv(product.oldPrice ? Number(product.oldPrice).toFixed(2) : ''),
      escapeCsv('TRUE'),
      escapeCsv('TRUE'),
      '',
      escapeCsv(imageUrl),
      escapeCsv(1),
      escapeCsv(title),
      escapeCsv('FALSE'),
      escapeCsv(title + ' | Ziggie 3D'),
      escapeCsv(product.description),
      escapeCsv(status)
    ];
    rows.push(row.join(','));
  }
});

const csvContent = '\uFEFF' + rows.join('\r\n');
const outputPath = path.resolve(__dirname, '../shopify_produtos_ziggie.csv');
fs.writeFileSync(outputPath, csvContent, 'utf8');
console.log('Arquivo gerado com sucesso em: ' + outputPath);
console.log('Total de produtos: ' + ALL_PRODUCTS.length);
console.log('Total de linhas de variantes: ' + (rows.length - 1));
