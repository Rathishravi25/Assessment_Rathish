import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { logger } from '../utils/logger';

test.describe('Homepage Validation', () => {
  test('TC01 - Verify TradingView India homepage loads with core UI elements', async ({ page }) => {
    logger.info('Starting TC01: Homepage validation');
    const homePage = new HomePage(page);

    await homePage.openHomePage();
    await homePage.verifyHomePageLoaded();
    await homePage.verifyHeaderElements();

    await expect(page).toHaveTitle(/TradingView/i);
    logger.info('TC01 completed successfully');
  });

  test('TC02 - Verify homepage navigation links are accessible', async ({ page }) => {
    logger.info('Starting TC02: Navigation links validation');
    const homePage = new HomePage(page);

    await homePage.openHomePage();

    await expect(page.getByRole('link', { name: /Markets Markets menu/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Products Products menu/i })).toBeVisible();
    logger.info('TC02 completed successfully');
  });
});
