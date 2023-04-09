import { test, expect } from '@playwright/test';

test('should fetched data not visible without session token', async ({
  page,
  context,
}) => {
  await context.clearCookies();
  await page.goto('/fetch-sc');
  await expect(page.getByText('Data fetching in server failed')).toBeVisible();
  await expect(page.getByText('Note 1')).not.toBeVisible();
});

test('should fetched data visible with session token', async ({ page }) => {
  await page.goto('/fetch-sc');
  await expect(page.getByRole('heading')).toHaveText('Notes page by SC');
  await expect(page.getByText('Note 1')).toBeVisible();
});
