import { expect, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { logger } from '../utils/logger';

export class HomePage extends BasePage {
  readonly logo: Locator = this.page.getByRole('link', { name: /TradingView main page/i }).first();
  readonly searchButton: Locator = this.page.getByRole('button', { name: 'Search' });
  readonly searchInput: Locator = this.page.getByPlaceholder('Symbol, ISIN, or CUSIP');
  readonly mainNavigation: Locator = this.page.getByRole('navigation').first();
  readonly heroSection: Locator = this.page.getByRole('main', { name: 'Main content' });
  readonly heroHeading: Locator = this.page.getByRole('heading', { level: 1 });
  readonly marketsLink: Locator = this.page.getByRole('link', { name: /Markets Markets menu/i });
  readonly productsLink: Locator = this.page.getByRole('link', { name: /Products Products menu/i });

  async openHomePage(): Promise<void> {
    await this.navigate('/');
    logger.info('Home page opened');
  }

  async verifyHomePageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/tradingview\.com/);
    await expect(this.heroHeading).toBeVisible();
    await expect(this.heroHeading).toContainText(/trades require research/i);
    logger.info('Home page core layout is visible');
  }

  async verifyHeaderElements(): Promise<void> {
    await expect(this.logo).toBeVisible();
    await expect(this.searchButton).toBeVisible();
    await expect(this.mainNavigation).toBeVisible();
    logger.info('Header section is visible');
  }

  async openSearch(): Promise<void> {
    if (!(await this.searchInput.isVisible().catch(() => false))) {
      await this.searchButton.click();
    }
    await expect(this.searchInput).toBeVisible();
    logger.info('Search dialog opened');
  }

  async searchSymbol(symbol: string): Promise<void> {
    await this.openSearch();
    await this.searchInput.fill(symbol);
    logger.info(`Searching for symbol: ${symbol}`);
  }

  async selectSearchResult(symbolName: RegExp | string): Promise<void> {
    const result = this.getSearchResults(symbolName).first();
    await expect(result).toBeVisible({ timeout: 15_000 });
    await result.click();
    logger.info(`Selected search result matching: ${symbolName}`);
  }

  getSearchResults(symbolName: RegExp | string): Locator {
    return this.page.locator('[class*="symbol"]').filter({ hasText: symbolName });
  }

  async navigateToMarkets(): Promise<void> {
    if (await this.marketsLink.isVisible().catch(() => false)) {
      await this.marketsLink.click();
    } else {
      await this.navigate('/markets/');
    }
    await expect(this.page).toHaveURL(/markets/);
    logger.info('Navigated to Markets page');
  }

  async navigateToChart(symbolPath = '/chart/'): Promise<void> {
    await this.navigate(symbolPath);
    logger.info(`Navigated to chart: ${symbolPath}`);
  }
}
