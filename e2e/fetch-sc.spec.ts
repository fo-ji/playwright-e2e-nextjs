import { test, expect } from '@playwright/test';

test('Should fetched data not visible without session token', async ({
  page,
  context,
}) => {
  await context.clearCookies();
  await page.goto('/fetch-sc');
  await expect(page.getByText('Data fetching in server failed')).toBeVisible();
  await expect(page.getByText('Note 1')).not.toBeVisible();
});

test('Should fetched data visible with session token', async ({ page }) => {
  await page.goto('/fetch-sc');
  await expect(page.getByRole('heading')).toHaveText('Notes page by SC', {
    timeout: 10000,
  });
  await expect(page.getByText('Note 1')).toBeVisible();
});
