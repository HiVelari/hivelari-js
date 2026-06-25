import { client, isTestMode } from './client.js';

console.log('--- Initializing Velari SDK Playground ---');
console.log(`Test Mode Active: ${isTestMode}`);
console.log(`Base URL: ${client.baseUrl}`);
console.log(`Space ID: ${client.spaceId}`);
console.log('Sending handshake ping request...');

try {
  const response = await client.ping();

  console.log('\n--- Handshake Response Received ---');
  console.log(`Success: ${response.success}`);
  console.log(`HTTP Status: ${response.status}`);
  console.log(`Payload Type: ${response.data.constructor.name}`);
  console.log(`Status Field: ${response.data.status}`);
  console.log(`Message: ${response.data.message}`);
  console.log(`Space: ${response.data.space}`);

  console.log('\n--- Fetching Storefront Products ---');
  const productsResponse = await client.commerce.listProducts({ per_page: 5 });
  console.log(`Success: ${productsResponse.success}`);
  console.log(`Count: ${productsResponse.data.data.length}`);
  console.log(`Total count in meta: ${productsResponse.data.meta.total}`);

  if (productsResponse.data.data.length > 0) {
    const firstProduct = productsResponse.data.data[0];
    console.log(`First product name: ${firstProduct.name}`);
    console.log(
      `First product price: ${firstProduct.originalPrice} ${firstProduct.currency}`,
    );
    console.log(`First product type: ${firstProduct.type}`);

    console.log(`\n--- Fetching Single Product (ID: ${firstProduct.id}) ---`);
    const productResponse = await client.commerce.getProduct(firstProduct.id);
    console.log(`Success: ${productResponse.success}`);
    console.log(`Name: ${productResponse.data.name}`);
    console.log(`Description: ${productResponse.data.description}`);
  }
} catch (error) {
  console.error('\n❌ Request Failed:', error);
}
