import { test, expect } from '@playwright/test';

const BASE_URL = 'https://avito-tech-internship-psi.vercel.app';

test('Найти задачу на доске и открыть карточку', async ({ page }) => {
  const taskTitle = 'EGG';

  await page.goto(BASE_URL);

  const boardContainer = page.locator('div:has-text("Список задач")').first();
  await expect(boardContainer).toBeVisible({ timeout: 10000 });

  const taskCard = page.locator(`h6:has-text("${taskTitle}")`).first();
  await expect(taskCard).toBeVisible({ timeout: 10000 });

  await taskCard.click();

  const modalHeader = page.locator('h5:has-text("Редактирование задачи")');
  await expect(modalHeader).toBeVisible({ timeout: 5000 });

  const modal = modalHeader.locator('..'); 
  await expect(modal).toBeVisible();

  const modalTitle = modal.locator(`input[value="${taskTitle}"]`);
  await expect(modalTitle).toBeVisible();

});
