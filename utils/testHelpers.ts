import { Page, Locator, expect } from '@playwright/test';
import { logger } from './logger';

export async function dismissCookieBanner(page: Page): Promise<void> {
  const acceptButtons = [
    page.getByRole('button', { name: /accept all|accept/i }),
    page.locator('button:has-text("Accept all")'),
    page.locator('[data-name="accept-all"]'),
  ];

  for (const button of acceptButtons) {
    if (await button.first().isVisible().catch(() => false)) {
      logger.info('Dismissing cookie consent banner');
      await button.first().click();
      await expect(button.first()).toBeHidden({ timeout: 5_000 }).catch(() => undefined);
      return;
    }
  }
}

export async function waitForPageReady(page: Page): Promise<void> {
  await page.waitForLoadState('domcontentloaded');
  await page.waitForLoadState('networkidle').catch(() => {
    logger.warn('Network did not reach idle state; continuing with domcontentloaded');
  });
}

export async function assertVisible(locator: Locator, description: string): Promise<void> {
  logger.info(`Asserting visibility: ${description}`);
  await expect(locator).toBeVisible();
}

export async function takeScreenshot(page: Page, name: string): Promise<void> {
  const path = `test-results/screenshots/${name}-${Date.now()}.png`;
  await page.screenshot({ path, fullPage: false });
  logger.info(`Screenshot saved: ${path}`);
}
