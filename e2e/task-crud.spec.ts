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

  // MEMO: Toggle task completed
  // await expect(taskList.first().getByRole('checkbox')).not.toBeChecked();
  // await taskList.first().getByRole('checkbox').click();
  // await expect(taskList.first().getByRole('checkbox')).toBeChecked();
  // await taskList.first().getByRole('checkbox').click();
  // await expect(taskList.first().getByRole('checkbox')).not.toBeChecked();
});

test('should task dynamic segment works property', async ({ page }) => {
  const TASK_ID_1 = '4dd0db39-f099-a513-732e-12297a854a1f';
  const TASK_ID_2 = '6fc76eff-a023-ff4a-350f-fbf002b6bf7e';
  await page.goto('/task-crud');
  await expect(page.getByRole('heading')).toHaveText(
    'Click a title on the left to view detail !'
  );

  // MEMO: Read task (Task 1)
  // await page.getByRole('link', { name: 'Task 1' }).click();
  // await page.waitForURL(`http://localhost:3000/task-crud/${TASK_ID_1}`);
  // expect(page.url()).toBe(`http://localhost:3000/task-crud/${TASK_ID_1}`);
  // await expect(page.getByTestId('title-dynamic-segment')).toHaveText(
  //   'Title: Task 1'
  // );

  // MEMO: Read task (Task 2)
  // await page.getByRole('link', { name: 'Task 2' }).click();
  // await page.waitForURL(`http://localhost:3000/task-crud/${TASK_ID_2}`);
  // expect(page.url()).toBe(`http://localhost:3000/task-crud/${TASK_ID_2}`);
  // await expect(page.getByTestId('title-dynamic-segment')).toHaveText(
  //   'Title: Task 2'
  // );
});
