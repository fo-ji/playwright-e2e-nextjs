import { test, expect } from '@playwright/test';

test('should fetched data not visible without session token', async ({
  page,
  context,
}) => {
  await context.clearCookies();
  await page.goto('/task-crud');

  await expect(page.getByText('Data fetching in server failed')).toBeVisible();
  await expect(page.getByText('Task 1')).not.toBeVisible();
  await expect(page.getByText('Task 2')).not.toBeVisible();
});

test('should crud operation works property', async ({ page }) => {
  await page.goto('/task-crud');

  // MEMO: Read tasks
  await expect(page.getByRole('heading')).toHaveText(
    'Click a title on the left to view detail !'
  );
  const initialItemNumber = 2;
  await expect(page.getByRole('listitem')).toHaveCount(initialItemNumber);
  const firstTask = page.getByRole('listitem').nth(0);
  await expect(firstTask).toHaveText('Task 1');

  // MEMO: Create task
  await page.getByRole('textbox').fill('Task new');
  await page.getByRole('button', { name: 'Create' }).click();
  await expect(page.getByRole('listitem')).toHaveCount(initialItemNumber + 1);
  const newTask = page.getByRole('listitem').nth(-1);
  await expect(newTask).toHaveText('Task new');

  // MEMO: Update task
  await page.getByTestId('task-edit-icon').nth(-1).click();
  await page.getByRole('textbox').fill('Task new updated');
  await page.getByRole('button', { name: 'Update' }).click();
  const updatedTask = page.getByRole('listitem').nth(-1);
  await expect(updatedTask).toHaveText('Task new updated');

  // MEMO: Delete task
  await page.getByTestId('task-delete-icon').nth(-1).click();
  const taskList = page.getByRole('listitem');
  await expect(taskList).toHaveCount(2);
});
