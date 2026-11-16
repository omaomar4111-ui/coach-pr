import { test, expect } from '@playwright/test';

test.describe('CoachPRB End-to-End Journey', () => {
  test('Client Journey: Landing -> Quiz -> Book -> PWA', async ({ page }) => {
    // 1. Visit athlete intake quiz
    await page.goto('https://pr-agent-ai.vercel.app/quiz');
    await expect(page.locator('header')).toBeVisible();

    // 2. Step 1: Goal selection
    const goalBtn = page.locator('button:has-text("تضخيم وبناء عضلات صافية")');
    if (await goalBtn.isVisible()) {
      await goalBtn.click();
    }

    // 3. Check Booking page
    await page.goto('https://pr-agent-ai.vercel.app/book');
    await expect(page.locator('h1')).toBeVisible();

    // 4. Test PWA Manifest
    const manifestResponse = await page.request.get('https://pr-agent-ai.vercel.app/manifest.json');
    expect(manifestResponse.status()).toBe(200);
    const manifest = await manifestResponse.json();
    expect(manifest.name).toContain('CoachPRB');
  });

  test('Pilot Application Journey: /apply page', async ({ page }) => {
    const res = await page.request.get('https://pr-agent-ai.vercel.app/apply');
    expect(res.status()).toBe(200);
  });
});
