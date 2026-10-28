const fs = require('fs');
const path = require('path');

const mapping = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/shopify_mapping.json'), 'utf8'));
let productsFile = fs.readFileSync(path.join(__dirname, '../src/data/products.js'), 'utf8');

for (const [id, data] of Object.entries(mapping)) {
  const targetRegex = new RegExp(`(id:\\s*'${id}',)`, 'g');
  if (targetRegex.test(productsFile)) {
    // Add shopifyVariantId right after id if not already present
    if (!productsFile.includes(`shopifyVariantId: '${data.shopifyVariantId}'`)) {
      productsFile = productsFile.replace(
        `id: '${id}',`,
        `id: '${id}',\n    shopifyVariantId: '${data.shopifyVariantId}',\n    shopifyProductId: '${data.shopifyProductId}',`
      );
    }
  }
}

fs.writeFileSync(path.join(__dirname, '../src/data/products.js'), productsFile, 'utf8');
console.log('✅ products.js updated with shopifyVariantId and shopifyProductId');
