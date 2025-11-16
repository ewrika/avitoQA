import { test, expect } from '@playwright/test';

const BASE_URL = 'https://avito-tech-internship-psi.vercel.app';

test('Поиск задачи на доске', async ({ page }) => {
  const taskTitle = 'EGG'; 

  await page.goto(BASE_URL);

  const searchInput = page.getByPlaceholder('Поиск');
  await expect(searchInput).toBeVisible({ timeout: 10000 });

  await searchInput.fill(taskTitle);

  const taskCard = page.locator(`h6:has-text("${taskTitle}")`).first();
  await expect(taskCard).toBeVisible({ timeout: 5000 });

  await taskCard.click();

  const modalHeader = page.locator('h5:has-text("Редактирование задачи")');
  await expect(modalHeader).toBeVisible({ timeout: 5000 });

  const modal = modalHeader.locator('..');
  const modalTitle = modal.locator(`input[value="${taskTitle}"]`);
  await expect(modalTitle).toBeVisible();
});
