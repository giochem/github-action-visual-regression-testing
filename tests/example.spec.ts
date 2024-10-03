import { test, expect } from '@playwright/test';

test('renders a button', async ({ page }) => {
  await page.goto('/iframe.html?args=&id=button--primary&viewMode=story');

  await page.waitForSelector('glide-core-button');

  await expect(page).toHaveScreenshot(['button.test.png']);
});
