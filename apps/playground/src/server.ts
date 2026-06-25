import http from 'node:http';
import url from 'node:url';
import { client, isTestMode, toggleTestMode } from './client.js';

// Central E2E flow runner that compiles logs rather than exiting
async function runStorefrontE2EFlowInternal(): Promise<{
  success: boolean;
  logs: string[];
}> {
  const logs: string[] = [];
  const log = (msg: string) => {
    console.log(msg);
    logs.push(msg);
  };

  log('==================================================');
  log('🚀 STARTING PROGRAMMATIC E2E STOREFRONT FLOW');
  log('==================================================');
  log(`[CONFIG] SDK Test Mode: ${isTestMode}`);
  log(`[CONFIG] Base URL: ${client.baseUrl}`);
  log(`[CONFIG] Space ID: ${client.spaceId}`);

  try {
    // Step 1: Handshake Ping
    log('\n[STEP 1] Dispatching Handshake Ping...');
    const pingResponse = await client.ping();
    if (!pingResponse.success) {
      throw new Error(`Handshake failed with status: ${pingResponse.status}`);
    }
    log('✅ Handshake succeeded!');
    log(`   Response: "${pingResponse.data.message}"`);
    log(`   Space ID confirmed: "${pingResponse.data.space}"`);

    // Step 2: Fetch storefront catalog
    log('\n[STEP 2] Fetching Storefront Product Catalog...');
    const catalogResponse = await client.commerce.listProducts({ per_page: 5 });
    if (!catalogResponse.success) {
      throw new Error(
        `Failed to load product catalog: ${catalogResponse.status}`,
      );
    }
    const products = catalogResponse.data.data;
    log('✅ Loaded catalog successfully!');
    log(
      `   Found ${products.length} products (Total in DB: ${catalogResponse.data.meta.total})`,
    );

    if (products.length === 0) {
      log('⚠️ No products available in this space. Ending E2E flow early.');
      return { success: true, logs };
    }

    for (const product of products) {
      log(
        `   - [ID: ${product.id}] ${product.name} (${product.originalPrice} ${product.currency})`,
      );
    }

    // Step 3: Search/Filter Products
    const firstProd = products[0];
    const searchKeyword = firstProd?.name.split(' ')[0] || 'Product';
    log(`\n[STEP 3] Searching catalog for keyword: "${searchKeyword}"...`);
    const searchResponse = await client.commerce.listProducts({
      search: searchKeyword,
    });
    if (!searchResponse.success) {
      throw new Error(`Failed searching products: ${searchResponse.status}`);
    }
    log(
      `✅ Search complete! Found ${searchResponse.data.data.length} matches.`,
    );

    // Step 4: Fetch detailed product information
    const targetProductId = firstProd?.id || '';
    log(
      `\n[STEP 4] Fetching detailed product info for ID: "${targetProductId}"...`,
    );
    const productResponse = await client.commerce.getProduct(targetProductId);
    if (!productResponse.success) {
      throw new Error(
        `Failed to load product details: ${productResponse.status}`,
      );
    }
    const product = productResponse.data;
    log('✅ Product details loaded successfully!');
    log(`   Name: ${product.name}`);
    log(`   Price: ${product.originalPrice} ${product.currency}`);
    log(`   Type: ${product.type}`);
    log(`   Description: "${product.description || 'No description'}"`);

    log('\n==================================================');
    log('🎉 E2E STOREFRONT FLOW COMPLETED SUCCESSFULLY!');
    log('==================================================');
    return { success: true, logs };
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    log(`\n❌ E2E Flow Failed: ${errMsg}`);
    log('==================================================');
    return { success: false, logs };
  }
}

const server = http.createServer(async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url || '', true);
  const path = parsedUrl.pathname || '';

  try {
    // 1. Get current configuration status
    if (path === '/api/status' && req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          spaceId: client.spaceId,
          isTestMode: isTestMode,
          baseUrl: client.baseUrl,
        }),
      );
      return;
    }

    // 2. Toggle mock/test mode dynamically
    if (path === '/api/toggle-test-mode' && req.method === 'POST') {
      toggleTestMode();
      console.log(`🔌 SDK test mode toggled to: ${isTestMode}`);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          success: true,
          isTestMode: isTestMode,
        }),
      );
      return;
    }

    // 3. Run storefront E2E flow
    if (path === '/api/run-e2e' && req.method === 'POST') {
      console.log('⚡ POST /api/run-e2e -> Executing storefront simulation');
      const result = await runStorefrontE2EFlowInternal();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result));
      return;
    }

    // 4. central SDK ping
    if (path === '/api/ping') {
      console.log('📬 GET /api/ping -> Calling SDK client.ping()');
      const response = await client.ping();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(response));
      return;
    }

    // 5. commerce listProducts
    if (path === '/api/products') {
      const search = parsedUrl.query.search as string | undefined;
      const perPage = parsedUrl.query.per_page
        ? Number.parseInt(parsedUrl.query.per_page as string, 10)
        : undefined;
      console.log(
        `📬 GET /api/products -> Calling SDK client.commerce.listProducts() (search: "${search || ''}", per_page: ${perPage || 'default'})`,
      );
      const response = await client.commerce.listProducts({
        search,
        per_page: perPage,
      });
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(response));
      return;
    }

    // 6. commerce getProduct
    const productDetailMatch = path.match(/^\/api\/products\/([^/]+)$/);
    if (productDetailMatch?.[1]) {
      const productId = productDetailMatch[1];
      console.log(
        `📬 GET /api/products/${productId} -> Calling SDK client.commerce.getProduct()`,
      );
      const response = await client.commerce.getProduct(productId);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(response));
      return;
    }

    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  } catch (error: unknown) {
    const err = error as { message?: string; status?: number };
    console.error('❌ API Server Error:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        error: err.message || 'Internal Server Error',
        status: err.status,
      }),
    );
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`\n🚀 Playground API Server running at http://localhost:${PORT}`);
  console.log(`   Configured SDK Space ID: ${client.spaceId}`);
  console.log(`   Configured SDK Test Mode: ${isTestMode}`);
  console.log(`   Configured SDK Base URL: ${client.baseUrl}\n`);
});
