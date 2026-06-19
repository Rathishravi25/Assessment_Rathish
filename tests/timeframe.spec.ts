import { test } from '@playwright/test';
import { ChartPage } from '../pages/ChartPage';
import { logger } from '../utils/logger';

test.describe('Chart Timeframe Changes', () => {
  test('TC08 - Change chart timeframe and verify chart reloads', async ({ page }) => {
    logger.info('Starting TC08: Timeframe change validation');
    const chartPage = new ChartPage(page);

    await chartPage.openChart('NSE:NIFTY');
    await chartPage.changeTimeframe('5D');
    await chartPage.verifyTimeframeActive('5D');
    await chartPage.verifyChartElementsPresent();

    logger.info('TC08 completed successfully');
  });

  test('TC09 - Switch between multiple timeframes on chart', async ({ page }) => {
    logger.info('Starting TC09: Multiple timeframe switches');
    const chartPage = new ChartPage(page);

    await chartPage.openChart('NSE:NIFTY');

    for (const timeframe of ['1D', '5D', '1M']) {
      await chartPage.changeTimeframe(timeframe);
      await chartPage.verifyChartElementsPresent();
      logger.info(`Verified chart after switching to ${timeframe}`);
    }

    logger.info('TC09 completed successfully');
  });
});
