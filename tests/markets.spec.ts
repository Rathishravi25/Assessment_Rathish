import { test } from '@playwright/test';
import { MarketsPage } from '../pages/MarketsPage';
import { logger } from '../utils/logger';

test.describe('Markets Page Validation', () => {
  test('TC10 - Verify markets page loads with live market data', async ({ page }) => {
    logger.info('Starting TC10: Markets page validation');
    const marketsPage = new MarketsPage(page);

    await marketsPage.openMarketsPage();
    await marketsPage.verifyMarketsPageLoaded();
    await marketsPage.verifyMarketDataPresent();

    logger.info('TC10 completed successfully');
  });

  test('TC11 - Verify indices section is displayed on markets page', async ({ page }) => {
    logger.info('Starting TC11: Indices section validation');
    const marketsPage = new MarketsPage(page);

    await marketsPage.openMarketsPage();
    await marketsPage.verifyIndicesSection();

    logger.info('TC11 completed successfully');
  });
});
