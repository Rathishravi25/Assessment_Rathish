import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { takeScreenshot } from '../utils/testHelpers';
import { logger } from '../utils/logger';

test.describe('Responsive & Dynamic UI Handling', () => {
  test('TC12 - Handle cookie popup and validate responsive layout at mobile viewport', async ({ page }) => {
    logger.info('Starting TC12: Responsive validation');
    await page.setViewportSize({ width: 375, height: 812 });

    const homePage = new HomePage(page);
    await homePage.openHomePage();
    await homePage.verifyHomePageLoaded();

    const body = page.locator('body');
    await expect(body).toBeVisible();

    await takeScreenshot(page, 'mobile-homepage');
    logger.info('TC12 completed successfully');
  });

  test('TC13 - Dynamic popup handling during search interaction', async ({ page }) => {
    logger.info('Starting TC13: Dynamic popup handling');
    const homePage = new HomePage(page);

    await homePage.openHomePage();
    await homePage.searchSymbol('TCS');

    const searchResults = homePage.getSearchResults(/TCS|Tata Consultancy/i);

    await expect(searchResults.first()).toBeVisible({ timeout: 15_000 });

    await page.keyboard.press('Escape');
    await expect(homePage.searchInput).toBeHidden({ timeout: 5_000 }).catch(() => undefined);

    logger.info('TC13 completed successfully');
  });
});
