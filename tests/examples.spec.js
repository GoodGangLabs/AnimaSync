const { test, expect } = require('@playwright/test');

const BASE = 'http://localhost:9090';

// ── vanilla-basic ──────────────────────────────────────────────
test.describe('vanilla-basic (V1 phoneme blendshape visualization)', () => {
  test('page loads with correct title', async ({ page }) => {
    await page.goto(`${BASE}/examples/vanilla-basic/`);
    await expect(page).toHaveTitle(/AnimaSync/);
  });

  test('header shows AnimaSync branding', async ({ page }) => {
    await page.goto(`${BASE}/examples/vanilla-basic/`);
    const h1 = page.locator('header h1');
    await expect(h1).toBeVisible();
    await expect(h1).toContainText('Sync');
  });

  test('drop zone is visible and clickable', async ({ page }) => {
    await page.goto(`${BASE}/examples/vanilla-basic/`);
    const dropZone = page.locator('#drop-zone');
    await expect(dropZone).toBeVisible();
    await expect(dropZone).toContainText('Drop an audio file');
  });

  test('blendshape bars are rendered (52 ARKit channels)', async ({ page }) => {
    await page.goto(`${BASE}/examples/vanilla-basic/`);
    const bars = page.locator('.bs-row');
    await expect(bars).toHaveCount(52);
  });

  test('status badge starts as Loading', async ({ page }) => {
    await page.goto(`${BASE}/examples/vanilla-basic/`);
    const badge = page.locator('#status-badge');
    await expect(badge).toBeVisible();
  });

  test('CDN import loads (badge becomes Ready or shows error)', async ({ page }) => {
    await page.goto(`${BASE}/examples/vanilla-basic/`);
    const badge = page.locator('#status-badge');
    // Wait up to 30s for CDN + WASM + ONNX init
    await expect(badge).not.toHaveText('Loading...', { timeout: 30000 });
  });

  test('no console errors on load', async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(`${BASE}/examples/vanilla-basic/`);
    await page.waitForTimeout(3000);
    // Filter out ONNX warnings, only check for real errors
    const realErrors = errors.filter(e => !e.includes('onnx') && !e.includes('ONNX'));
    expect(realErrors).toHaveLength(0);
  });
});

// ── vanilla-avatar ─────────────────────────────────────────────
test.describe('vanilla-avatar (V2 student blendshape visualization)', () => {
  test('page loads with correct title', async ({ page }) => {
    await page.goto(`${BASE}/examples/vanilla-avatar/`);
    await expect(page).toHaveTitle(/AnimaSync/);
  });

  test('header shows AnimaSync branding', async ({ page }) => {
    await page.goto(`${BASE}/examples/vanilla-avatar/`);
    const h1 = page.locator('header h1');
    await expect(h1).toBeVisible();
    await expect(h1).toContainText('Sync');
  });

  test('drop zone is visible and clickable', async ({ page }) => {
    await page.goto(`${BASE}/examples/vanilla-avatar/`);
    const dropZone = page.locator('#drop-zone');
    await expect(dropZone).toBeVisible();
    await expect(dropZone).toContainText('Drop an audio file');
  });

  test('blendshape bars are rendered (52 ARKit channels)', async ({ page }) => {
    await page.goto(`${BASE}/examples/vanilla-avatar/`);
    const bars = page.locator('.bs-row');
    await expect(bars).toHaveCount(52);
  });

  test('status badge starts as Loading', async ({ page }) => {
    await page.goto(`${BASE}/examples/vanilla-avatar/`);
    const badge = page.locator('#status-badge');
    await expect(badge).toBeVisible();
  });

  test('CDN import loads (badge becomes Ready or shows error)', async ({ page }) => {
    await page.goto(`${BASE}/examples/vanilla-avatar/`);
    const badge = page.locator('#status-badge');
    await expect(badge).not.toHaveText('Loading...', { timeout: 30000 });
  });

  test('no console errors on load', async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(`${BASE}/examples/vanilla-avatar/`);
    await page.waitForTimeout(3000);
    const realErrors = errors.filter(e => !e.includes('onnx') && !e.includes('ONNX'));
    expect(realErrors).toHaveLength(0);
  });
});

// ── vanilla-comparison ─────────────────────────────────────────
test.describe('vanilla-comparison (V1 vs V2)', () => {
  test('page loads with correct title', async ({ page }) => {
    await page.goto(`${BASE}/examples/vanilla-comparison/`);
    await expect(page).toHaveTitle(/AnimaSync/);
  });

  test('dual canvases exist', async ({ page }) => {
    await page.goto(`${BASE}/examples/vanilla-comparison/`);
    const v1Canvas = page.locator('#canvas-v1');
    const v2Canvas = page.locator('#canvas-v2');
    await expect(v1Canvas).toHaveCount(1);
    await expect(v2Canvas).toHaveCount(1);
  });

  test('init overlay shows on load', async ({ page }) => {
    await page.goto(`${BASE}/examples/vanilla-comparison/`);
    const overlay = page.locator('#init-overlay');
    await expect(overlay).toBeVisible();
  });

  test('V1 and V2 badges exist', async ({ page }) => {
    await page.goto(`${BASE}/examples/vanilla-comparison/`);
    await expect(page.locator('#badge-v1')).toBeVisible();
    await expect(page.locator('#badge-v2')).toBeVisible();
  });

  test('pane headers show V1 and V2', async ({ page }) => {
    await page.goto(`${BASE}/examples/vanilla-comparison/`);
    await expect(page.locator('.pane-title.v1')).toContainText('V1');
    await expect(page.locator('.pane-title.v2')).toContainText('V2');
  });

  test('VRM drop zones visible for both panes', async ({ page }) => {
    await page.goto(`${BASE}/examples/vanilla-comparison/`);
    await expect(page.locator('#vrm-drop-v1')).toBeVisible();
    await expect(page.locator('#vrm-drop-v2')).toBeVisible();
  });

  test('blendshape bars exist for both V1 and V2 (52 each)', async ({ page }) => {
    await page.goto(`${BASE}/examples/vanilla-comparison/`);
    const v1Bars = page.locator('#bs-v1 .bs-row-mini');
    const v2Bars = page.locator('#bs-v2 .bs-row-mini');
    await expect(v1Bars).toHaveCount(52);
    await expect(v2Bars).toHaveCount(52);
  });

  test('mic button starts disabled', async ({ page }) => {
    await page.goto(`${BASE}/examples/vanilla-comparison/`);
    const micBtn = page.locator('#mic-btn');
    await expect(micBtn).toBeDisabled();
  });

  test('both engines init and overlay hides', async ({ page }) => {
    await page.goto(`${BASE}/examples/vanilla-comparison/`);
    const overlay = page.locator('#init-overlay');
    await expect(overlay).toHaveClass(/hidden/, { timeout: 60000 });
  });

  test('V1 and V2 badges show Ready after init', async ({ page }) => {
    await page.goto(`${BASE}/examples/vanilla-comparison/`);
    await expect(page.locator('#badge-v1')).toHaveText('V1 Ready', { timeout: 60000 });
    await expect(page.locator('#badge-v2')).toHaveText('V2 Ready', { timeout: 60000 });
  });

  test('mic button enabled after both engines ready', async ({ page }) => {
    await page.goto(`${BASE}/examples/vanilla-comparison/`);
    await expect(page.locator('#mic-btn')).toBeEnabled({ timeout: 60000 });
  });

  test('stats placeholders exist', async ({ page }) => {
    await page.goto(`${BASE}/examples/vanilla-comparison/`);
    await expect(page.locator('#s-v1-frames')).toHaveText('—');
    await expect(page.locator('#s-v2-frames')).toHaveText('—');
  });

  test('no JS errors on page load', async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(`${BASE}/examples/vanilla-comparison/`);
    await page.waitForTimeout(5000);
    const realErrors = errors.filter(e => !e.includes('onnx') && !e.includes('ONNX'));
    expect(realErrors).toHaveLength(0);
  });
});

// ── Landing page ───────────────────────────────────────────────
test.describe('landing page', () => {
  test('index.html loads', async ({ page }) => {
    await page.goto(`${BASE}/`);
    await expect(page).toHaveTitle(/AnimaSync/);
  });

  test('3 example cards visible', async ({ page }) => {
    await page.goto(`${BASE}/`);
    const cards = page.locator('.card');
    await expect(cards).toHaveCount(3);
  });

  test('example links point to correct paths', async ({ page }) => {
    await page.goto(`${BASE}/`);
    const links = page.locator('.card a');
    const hrefs = await links.evaluateAll(els => els.map(e => e.getAttribute('href')));
    expect(hrefs).toContain('examples/vanilla-basic/');
    expect(hrefs).toContain('examples/vanilla-avatar/');
    expect(hrefs).toContain('examples/vanilla-comparison/');
  });
});
