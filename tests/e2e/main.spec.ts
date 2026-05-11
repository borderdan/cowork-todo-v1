import { test, expect } from '@playwright/test';

test.describe('Todo Application E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('should display initial todos', async ({ page }) => {
    await expect(page.locator('.group')).toHaveCount(3);
    await expect(page.getByText('Welcome to Cowork Todo')).toBeVisible();
    await expect(page.getByText('Review PR #42')).toBeVisible();
    await expect(page.getByText('Schedule weekly sync')).toBeVisible();
  });

  test('should add a new todo', async ({ page }) => {
    const todoTitle = 'Complete Playwright Tests';
    await page.getByPlaceholder('Add a new todo...').fill(todoTitle);
    await page.getByRole('button', { name: 'Add Todo' }).click();

    // Verify it was added
    await expect(page.getByText(todoTitle)).toBeVisible();
    await expect(page.locator('.group')).toHaveCount(4);

    // Verify input is cleared
    await expect(page.getByPlaceholder('Add a new todo...')).toHaveValue('');
  });

  test('should mark a todo as complete', async ({ page }) => {
    const todoTitle = 'Review PR #42';

    // Checkbox is within the flex container next to the title
    const todoItem = page.locator('.group').filter({ hasText: todoTitle });
    const checkbox = todoItem.getByRole('checkbox');

    // Ensure it's not checked initially (from App.tsx initial state)
    await expect(checkbox).not.toBeChecked();

    // Click it
    await checkbox.click();

    // Verify it's checked
    await expect(checkbox).toBeChecked();

    // Verify visual change (line-through text style)
    const titleText = todoItem.locator('p').first();
    await expect(titleText).toHaveClass(/line-through/);
  });

  test('should filter todos by status', async ({ page }) => {
    // We start with 1 completed ("Schedule weekly sync") and 2 active

    // Filter Active
    await page.getByRole('button', { name: /^Active/ }).click();
    await expect(page.locator('.group')).toHaveCount(2);
    await expect(page.getByText('Schedule weekly sync')).not.toBeVisible();

    // Filter Completed
    await page.getByRole('button', { name: 'Completed' }).click();
    await expect(page.locator('.group')).toHaveCount(1);
    await expect(page.getByText('Schedule weekly sync')).toBeVisible();

    // Filter All
    await page.getByRole('button', { name: 'All' }).click();
    await expect(page.locator('.group')).toHaveCount(3);
  });

  test('should delete a todo', async ({ page }) => {
    const todoTitle = 'Welcome to Cowork Todo';
    const todoItem = page.locator('.group').filter({ hasText: todoTitle });
    const deleteButton = todoItem.getByRole('button', { name: 'Delete todo' });

    await deleteButton.click();

    // Verify it's deleted
    await expect(page.getByText(todoTitle)).not.toBeVisible();
    await expect(page.locator('.group')).toHaveCount(2);
  });
});
