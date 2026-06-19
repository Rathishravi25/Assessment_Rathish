import { expect, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { logger } from '../utils/logger';

export class ChartPage extends BasePage {
  readonly chartContainer: Locator = this.page.locator('[data-qa-id="chart-container"]');
  readonly chartCanvas: Locator = this.page.locator('canvas[data-name="pane-canvas"]').first();
  readonly symbolTitle: Locator = this.page.getByText(/Nifty 50 Index|RELIANCE/i).first();

  private timeframeButton(label: string): Locator {
    return this.page.locator('button').filter({ hasText: new RegExp(`^${label}$`) }).first();
  }

  async openChart(symbolSlug: string): Promise<void> {
    await this.navigate(`/chart/?symbol=${encodeURIComponent(symbolSlug)}`);
    await this.waitForChartLoaded();
    logger.info(`Chart opened for symbol: ${symbolSlug}`);
  }

  async waitForChartLoaded(): Promise<void> {
    await expect(this.chartContainer).toBeVisible({ timeout: 30_000 });
    await expect(this.chartCanvas).toBeVisible({ timeout: 30_000 });
    await expect(this.timeframeButton('1D')).toBeVisible({ timeout: 30_000 });
    logger.info('Chart canvas/container is visible');
  }

  async verifySymbolInTitle(expectedText: RegExp | string): Promise<void> {
    const titleLocator = this.page.locator('body');
    await expect(titleLocator).toContainText(expectedText, { timeout: 15_000 });
    logger.info(`Verified symbol text on chart page: ${expectedText}`);
  }

  async changeTimeframe(timeframe: string): Promise<void> {
    const intervalButton = this.timeframeButton(timeframe);
    await expect(intervalButton).toBeVisible({ timeout: 15_000 });
    await intervalButton.click();
    await this.waitForChartLoaded();
    logger.info(`Changed timeframe to: ${timeframe}`);
  }

  async verifyTimeframeActive(timeframe: string): Promise<void> {
    const intervalButton = this.timeframeButton(timeframe);
    await expect(intervalButton).toBeVisible();
    logger.info(`Timeframe ${timeframe} is available on chart toolbar`);
  }

  async verifyChartElementsPresent(): Promise<void> {
    await expect(this.chartContainer).toBeVisible();
    await expect(this.chartCanvas).toBeVisible();
    logger.info('Chart structural elements validated');
  }
}
