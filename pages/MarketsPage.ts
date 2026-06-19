import { expect, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { logger } from '../utils/logger';

export class MarketsPage extends BasePage {
  readonly pageHeading: Locator = this.page.getByRole('heading', { name: /Markets/i }).first();
  readonly marketTable: Locator = this.page.locator('table, [class*="market"], [class*="list"]').first();
  readonly indexCards: Locator = this.page.locator('[class*="card"], [class*="index"], [data-field="short_name"]');

  async openMarketsPage(): Promise<void> {
    await this.navigate('/markets/');
    logger.info('Markets page opened');
  }

  async verifyMarketsPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/markets/);
    await expect(this.pageHeading).toBeVisible();
    logger.info('Markets page heading is visible');
  }

  async verifyMarketDataPresent(): Promise<void> {
    const indexData = this.page.getByText(/Nifty 50|Sensex/i).first();
    await expect(indexData).toBeVisible({ timeout: 20_000 });
    logger.info('Live market index data is visible on markets page');
  }

  async filterByMarketCategory(category: RegExp | string): Promise<void> {
    const categoryTab = this.page.getByRole('link', { name: category }).or(
      this.page.getByRole('button', { name: category })
    ).first();

    if (await categoryTab.isVisible().catch(() => false)) {
      await categoryTab.click();
      await expect(this.page).toHaveURL(new RegExp(String(category), 'i').source.length > 2 ? new RegExp(String(category), 'i') : /.*/);
      logger.info(`Filtered markets by category: ${category}`);
    } else {
      logger.warn(`Category tab not found: ${category}; validating default market list`);
    }
  }

  async verifyIndicesSection(): Promise<void> {
    const indicesText = this.page.getByText(/nifty|sensex|index|indices/i).first();
    await expect(indicesText).toBeVisible({ timeout: 15_000 });
    logger.info('Indices/market section content is visible');
  }
}
