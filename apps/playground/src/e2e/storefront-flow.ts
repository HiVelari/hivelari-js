import { client, isTestMode } from '../client.js';

async function runStorefrontE2EFlow() {
  console.log('==================================================');
  console.log('🚀 STARTING E2E STOREFRONT FLOW SIMULATION');
  console.log('==================================================');
  console.log(`Test Mode Active: ${isTestMode}`);
  console.log(`Base URL: ${client.baseUrl}`);
  console.log(`Space ID: ${client.spaceId}`);

  // Step 1: Handshake Ping
  console.log('\nStep 1: Dispatching Handshake Ping...');
  const pingResponse = await client.ping();
  if (!pingResponse.success) {
    throw new Error(`Handshake failed with status: ${pingResponse.status}`);
  }
  console.log('✅ Handshake succeeded!');
  console.log(`   Message: "${pingResponse.data.message}"`);
  console.log(`   Space ID confirmed: "${pingResponse.data.space}"`);

  // Step 2: Fetch full Product catalog
  console.log('\nStep 2: Fetching Storefront Product Catalog...');
  const catalogResponse = await client.commerce.listProducts({ per_page: 5 });
  if (!catalogResponse.success) {
    throw new Error(
      `Failed to load product catalog: ${catalogResponse.status}`,
    );
  }
  const products = catalogResponse.data.data;
  console.log('✅ Loaded catalog successfully!');
  console.log(
    `   Found ${products.length} products (Total in database: ${catalogResponse.data.meta.total})`,
  );

  if (products.length === 0) {
    console.log('⚠️ No products available in this space. Ending E2E flow.');
    return;
  }

  // Print summary of catalog products
  for (const product of products) {
    console.log(
      `   - [ID: ${product.id}] ${product.name} (${product.originalPrice} ${product.currency}) [Type: ${product.type}]`,
    );
  }

  // Step 3: Search/Filter Products
  const firstProd = products[0];
  const searchKeyword = firstProd?.name.split(' ')[0] || 'Product';
  console.log(`\nStep 3: Searching catalog for keyword "${searchKeyword}"...`);
  const searchResponse = await client.commerce.listProducts({
    search: searchKeyword,
  });
  if (!searchResponse.success) {
    throw new Error(`Failed searching products: ${searchResponse.status}`);
  }
  console.log(
    `✅ Search complete! Found ${searchResponse.data.data.length} matches.`,
  );

  // Step 4: Fetch detailed product information
  const targetProductId = firstProd?.id || '';
  console.log(
    `\nStep 4: Fetching detailed product information for ID: "${targetProductId}"...`,
  );
  const productResponse = await client.commerce.getProduct(targetProductId);
  if (!productResponse.success) {
    throw new Error(
      `Failed to load product details: ${productResponse.status}`,
    );
  }
  const product = productResponse.data;
  console.log('✅ Product details loaded successfully!');
  console.log(`   Name: ${product.name}`);
  console.log(`   Price: ${product.originalPrice} ${product.currency}`);
  console.log(`   Type: ${product.type}`);
  console.log(
    `   Description: "${product.description || 'No description provided'}"`,
  );

  if (product.physicalUnit) {
    console.log(
      `   Physical Unit: ${product.physicalUnit} (Available stock: ${product.physicalQuantityAvailable})`,
    );
  }
  if (product.images && product.images.length > 0) {
    console.log(`   Images: ${product.images.length} image(s) attached.`);
  }

  console.log('\n==================================================');
  console.log('🎉 E2E STOREFRONT FLOW COMPLETED SUCCESSFULLY!');
  console.log('==================================================');
}

runStorefrontE2EFlow().catch((error) => {
  console.error('\n❌ E2E Flow Failed:', error);
  process.exit(1);
});
