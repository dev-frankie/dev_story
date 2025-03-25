// tests/homepage.spec.ts
import { test, expect } from '@playwright/test';

test('블로그 타이틀 확인', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Frankie Blog/);
});
