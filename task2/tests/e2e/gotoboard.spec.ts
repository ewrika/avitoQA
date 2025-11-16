import { test, expect } from '@playwright/test';

const BASE_URL = 'https://avito-tech-internship-psi.vercel.app';
const BOARD_URL = 'https://avito-tech-internship-psi.vercel.app/board/1';

test('Переход на доску задачи', async ({ page }) => {
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

  const goToBoardButton = page.getByRole('link', { name: 'Перейти на доску' });
  await expect(goToBoardButton).toBeVisible({ timeout: 5000 });
  await goToBoardButton.click();

  await expect(page).toHaveURL(BOARD_URL, { timeout: 5000 });

});
