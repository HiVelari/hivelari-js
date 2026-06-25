const btnPing = document.getElementById('btn-ping') as HTMLButtonElement;
const btnListProducts = document.getElementById(
  'btn-list-products',
) as HTMLButtonElement;
const btnRunE2E = document.getElementById('btn-run-e2e') as HTMLButtonElement;
const testModeToggle = document.getElementById(
  'test-mode-toggle',
) as HTMLInputElement;
const searchInput = document.getElementById('search-input') as HTMLInputElement;
const limitSelect = document.getElementById(
  'limit-select',
) as HTMLSelectElement;
const productList = document.getElementById('product-list') as HTMLDivElement;
const noProductsMsg = document.getElementById(
  'no-products-msg',
) as HTMLDivElement;
const codeBlock = document.getElementById('code-block') as HTMLPreElement;
const terminalBlock = document.getElementById(
  'terminal-block',
) as HTMLDivElement;
const emptyInspector = document.getElementById(
  'empty-inspector',
) as HTMLDivElement;
const inspectorBadge = document.getElementById(
  'inspector-badge',
) as HTMLDivElement;
const methodTag = document.getElementById('method-tag') as HTMLSpanElement;
const urlTag = document.getElementById('url-tag') as HTMLSpanElement;
const statusTag = document.getElementById('status-tag') as HTMLSpanElement;
const latencyTag = document.getElementById('latency-tag') as HTMLSpanElement;
const serverStatusPill = document.getElementById(
  'server-status-pill',
) as HTMLDivElement;
const btnCopyJson = document.getElementById(
  'btn-copy-json',
) as HTMLButtonElement;
const editorFilename = document.getElementById(
  'editor-filename',
) as HTMLSpanElement;
const valSpace = document.getElementById('val-space') as HTMLSpanElement;
const valUrl = document.getElementById('val-url') as HTMLSpanElement;

interface ProductItem {
  id: string;
  name: string;
  type: string;
  originalPrice: number;
  currency: string;
}

interface FetchResult {
  success: boolean;
  status: number;
  latency: number;
  data: unknown;
}

let lastRawResponseData: unknown = null;

// JSON Syntax Highlighting helper
function syntaxHighlight(json: unknown): string {
  let str = typeof json !== 'string' ? JSON.stringify(json, null, 2) : json;
  str = str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return str.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
    (match) => {
      let cls = 'json-number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'json-key';
        } else {
          cls = 'json-string';
        }
      } else if (/true|false/.test(match)) {
        cls = 'json-boolean';
      } else if (/null/.test(match)) {
        cls = 'json-null';
      }
      return `<span class="${cls}">${match}</span>`;
    },
  );
}

// Show JSON response in the inspector viewport
function inspect(
  method: string,
  url: string,
  status: number,
  latency: number,
  data: unknown,
) {
  lastRawResponseData = data;

  emptyInspector.style.display = 'none';
  terminalBlock.style.display = 'none';
  codeBlock.style.display = 'block';
  btnCopyJson.style.display = 'inline-flex';
  editorFilename.textContent = 'response.json';

  inspectorBadge.style.display = 'flex';
  methodTag.textContent = method;
  urlTag.textContent = url;

  statusTag.textContent = `${status} ${status >= 200 && status < 300 ? 'OK' : 'Error'}`;
  statusTag.className = `badge-status ${status >= 200 && status < 300 ? 'status-2xx' : 'status-err'}`;
  latencyTag.textContent = `${latency.toFixed(0)}ms`;

  codeBlock.innerHTML = syntaxHighlight(data);
}

// Robust fetch helper that logs API latency and handles empty/bad response streams
async function safeFetch(
  url: string,
  init?: RequestInit,
): Promise<FetchResult> {
  const start = performance.now();
  try {
    const res = await fetch(url, init);
    const end = performance.now();
    const latency = end - start;
    const contentType = res.headers.get('content-type');

    if (contentType?.includes('application/json')) {
      const text = await res.text();
      if (!text || text.trim() === '') {
        return {
          success: res.ok,
          status: res.status,
          latency,
          data: {
            info: 'Empty Stream',
            message:
              'The server returned an empty body with application/json header.',
          },
        };
      }
      try {
        const parsed = JSON.parse(text);
        return { success: res.ok, status: res.status, latency, data: parsed };
      } catch (jsonErr) {
        return {
          success: false,
          status: res.status,
          latency,
          data: {
            error: 'JSON Parse Error',
            message: (jsonErr as Error).message,
            rawBody: text.substring(0, 500),
          },
        };
      }
    }

    const textBody = await res.text();
    return {
      success: false,
      status: res.status,
      latency,
      data: {
        error: `Server responded with ${contentType || 'text/plain'}`,
        statusText: res.statusText,
        body: textBody.substring(0, 500),
      },
    };
  } catch (error: unknown) {
    const end = performance.now();
    const latency = end - start;
    const err = error as Error;
    return {
      success: false,
      status: 0,
      latency,
      data: {
        error: 'Proxy Connection Failed',
        message: err.message,
        suggestion:
          'Ensure the playground backend server is running: run "pnpm run server" in your terminal.',
      },
    };
  }
}

// Fetch SDK configuration settings
async function loadStatus() {
  const result = await safeFetch('/api/status');
  if (result.success) {
    serverStatusPill.classList.add('online');
    serverStatusPill.textContent = 'SDK ONLINE';

    const statusData = result.data as {
      spaceId: string;
      isTestMode: boolean;
      baseUrl: string;
    };

    valSpace.textContent = statusData.spaceId;
    valUrl.textContent = statusData.baseUrl.replace('https://', '');
    testModeToggle.checked = statusData.isTestMode;
  } else {
    serverStatusPill.classList.remove('online');
    serverStatusPill.textContent = 'SDK OFFLINE';
    valSpace.textContent = '...';
    valUrl.textContent = '...';
  }
}

// Handle Mock Mode toggle change
testModeToggle.addEventListener('change', async () => {
  testModeToggle.disabled = true;
  const result = await safeFetch('/api/toggle-test-mode', { method: 'POST' });
  if (result.success) {
    const data = result.data as { isTestMode: boolean };
    testModeToggle.checked = data.isTestMode;
  }
  testModeToggle.disabled = false;
  await loadStatus();
});

// Copy response payload to Clipboard
btnCopyJson.addEventListener('click', async () => {
  if (!lastRawResponseData) return;
  try {
    await navigator.clipboard.writeText(
      JSON.stringify(lastRawResponseData, null, 2),
    );
    const originalText = btnCopyJson.innerHTML;
    btnCopyJson.innerHTML = `<span style="font-size: 0.7rem; color: var(--emerald); font-weight: 600;">Copied!</span>`;
    setTimeout(() => {
      btnCopyJson.innerHTML = originalText;
    }, 2000);
  } catch (err) {
    console.error('Clipboard copy failed:', err);
  }
});

// Dispatch single handshake ping
btnPing.addEventListener('click', async () => {
  btnPing.disabled = true;
  btnPing.textContent = 'Pinging...';

  const result = await safeFetch('/api/ping');
  inspect('GET', '/api/ping', result.status, result.latency, result.data);

  await loadStatus();
  btnPing.disabled = false;
  btnPing.textContent = 'Dispatch Handshake Ping';
});

// Load storefront products catalog list
async function queryCatalog() {
  btnListProducts.disabled = true;
  btnListProducts.textContent = 'Querying...';

  const search = encodeURIComponent(searchInput.value);
  const limit = limitSelect.value;
  const url = `/api/products?search=${search}&per_page=${limit}`;

  const result = await safeFetch(url);
  inspect('GET', url, result.status, result.latency, result.data);

  if (result.success) {
    const payload = result.data as {
      success: boolean;
      data?: { data?: ProductItem[] };
    };
    const items = payload.data?.data || [];

    if (items.length === 0) {
      productList.style.display = 'none';
      noProductsMsg.style.display = 'block';
    } else {
      noProductsMsg.style.display = 'none';
      productList.style.display = 'flex';
      productList.innerHTML = '';

      for (const product of items) {
        const row = document.createElement('div');
        row.className = 'product-row';
        row.innerHTML = `
          <div class="product-meta-desc">
            <span class="product-title">${product.name}</span>
            <span class="product-type-badge">${product.type}</span>
          </div>
          <span class="product-price-tag">${product.originalPrice} ${product.currency}</span>
        `;
        row.addEventListener('click', () => loadProductDetail(product.id));
        productList.appendChild(row);
      }
    }
  } else {
    productList.style.display = 'none';
    noProductsMsg.style.display = 'block';
    noProductsMsg.textContent = 'Query error: Failed to query catalog items.';
  }

  btnListProducts.disabled = false;
  btnListProducts.textContent = 'Query';
}

// Load a single product's detail specs
async function loadProductDetail(id: string) {
  const url = `/api/products/${id}`;
  const result = await safeFetch(url);
  inspect('GET', url, result.status, result.latency, result.data);
}

btnListProducts.addEventListener('click', queryCatalog);

// Run programmatic storefront E2E flow
btnRunE2E.addEventListener('click', async () => {
  btnRunE2E.disabled = true;
  btnRunE2E.textContent = 'Running simulation...';

  // Prep Inspector view for console output
  emptyInspector.style.display = 'none';
  codeBlock.style.display = 'none';
  btnCopyJson.style.display = 'none';
  terminalBlock.style.display = 'flex';
  terminalBlock.innerHTML = '';
  editorFilename.textContent = 'e2e-suite.log';

  inspectorBadge.style.display = 'flex';
  methodTag.textContent = 'POST';
  urlTag.textContent = '/api/run-e2e';

  const result = await safeFetch('/api/run-e2e', { method: 'POST' });

  statusTag.textContent = `${result.status} ${result.success ? 'OK' : 'Error'}`;
  statusTag.className = `badge-status ${result.success ? 'status-2xx' : 'status-err'}`;
  latencyTag.textContent = `${result.latency.toFixed(0)}ms`;

  if (result.success) {
    const payload = result.data as { success: boolean; logs: string[] };
    const logs = payload.logs || [];

    // Animate line logging into the terminal box
    let lineIdx = 0;
    function printNextLine() {
      if (lineIdx < logs.length) {
        const line = logs[lineIdx];
        const lineDiv = document.createElement('div');
        lineDiv.className = 'terminal-line';
        lineDiv.textContent = line;

        // Highlight terms for premium aesthetics
        if (
          line.includes('❌') ||
          line.includes('failed') ||
          line.includes('Failed')
        ) {
          lineDiv.classList.add('error');
        } else if (
          line.includes('✅') ||
          line.includes('🎉') ||
          line.includes('SUCCESSFULLY')
        ) {
          lineDiv.classList.add('success');
        } else if (line.startsWith('Step') || line.startsWith('[STEP')) {
          lineDiv.classList.add('step');
        } else if (
          line.startsWith('===') ||
          line.startsWith('🚀') ||
          line.includes('STARTING')
        ) {
          lineDiv.classList.add('header');
        } else if (line.startsWith('[CONFIG]')) {
          lineDiv.classList.add('info');
        }

        terminalBlock.appendChild(lineDiv);
        terminalBlock.scrollTop = terminalBlock.scrollHeight;
        lineIdx++;
        setTimeout(printNextLine, 35);
      } else {
        btnRunE2E.disabled = false;
        btnRunE2E.textContent = 'Run E2E storefront flow';
      }
    }

    printNextLine();
  } else {
    // Show connection error in terminal
    const errDiv = document.createElement('div');
    errDiv.className = 'terminal-line error';
    errDiv.textContent = `❌ Connection Error: Could not run E2E flow simulation.\n${JSON.stringify(result.data, null, 2)}`;
    terminalBlock.appendChild(errDiv);

    btnRunE2E.disabled = false;
    btnRunE2E.textContent = 'Run E2E storefront flow';
  }
});

// Trigger load initial configuration state
loadStatus();
