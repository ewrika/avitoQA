import { test, expect } from "@playwright/test";

const BASE_URL = 'https://avito-tech-internship-psi.vercel.app';

test('Создание задачи', async ({ page }) => {
  await page.goto(BASE_URL);

  const createButton = page.getByText('Создать задачу').nth(1);
  await expect(createButton).toBeVisible({ timeout: 10000 });
  await createButton.click();

  const title = 'Test issue ' + Date.now();
  const titleInput = page.locator('div.MuiInputBase-root:has(span:has-text("Название")) input').first();
  await titleInput.fill(title);

  const descriptionInput = page.locator('div.MuiInputBase-root:has(span:has-text("Описание")) textarea').first();
  await descriptionInput.fill('Описание задачи');

  const projectDropdown = page.locator('div.MuiSelect-root:has(legend span:text("Проект")) div[role="combobox"]');
  await projectDropdown.click();
  await page.getByRole('option', { name: 'Редизайн карточки товара' }).click();

  const priorityDropdown = page.locator('div.MuiSelect-root:has(legend span:text("Приоритет")) div[role="combobox"]');
  await priorityDropdown.click();
  await page.getByRole('option', { name: 'Low' }).click();

  const assigneeDropdown = page.locator('div.MuiSelect-root:has(legend span:text("Исполнитель")) div[role="combobox"]');
  await assigneeDropdown.click();

  await page.getByRole('option', { name: 'Александра Ветрова' }).click();

  const submitButton = page.getByRole('button', { name: /создать/i });
  await expect(submitButton).toBeEnabled({ timeout: 10000 });
  await submitButton.click();

  await expect(page.getByText(title)).toBeVisible();
});

