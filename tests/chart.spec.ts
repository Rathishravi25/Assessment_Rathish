import { test, expect } from '@playwright/test';
import { ChartPage } from '../pages/ChartPage';
import { logger } from '../utils/logger';

test.describe('Chart Page Validation', () => {
  test('TC06 - Open NIFTY chart and verify chart canvas loads', async ({ page }) => {
    logger.info('Starting TC06: Chart page load validation');
    const chartPage = new ChartPage(page);

    await chartPage.openChart('NSE:NIFTY');
    await chartPage.verifyChartElementsPresent();
    await chartPage.verifySymbolInTitle(/NIFTY/i);

    logger.info('TC06 completed successfully');
  });

  test('TC07 - Verify chart page URL contains symbol parameter', async ({ page }) => {
    logger.info('Starting TC07: Chart URL validation');
    const chartPage = new ChartPage(page);
    const symbol = 'NSE:NIFTY';

    await chartPage.openChart(symbol);
    const url = await chartPage.getCurrentUrl();

    expect(url).toMatch(/chart/);
    expect(url.toLowerCase()).toContain('nifty');
    logger.info('TC07 completed successfully');
  });
});
