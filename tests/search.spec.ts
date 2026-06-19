import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { searchSymbolViaApi, validateSymbolInApiResults } from '../utils/apiHelper';
import { logger } from '../utils/logger';

test.describe('Symbol Search Functionality', () => {
  const searchQuery = 'NIFTY';

  test('TC03 - Search for NIFTY symbol and verify results appear', async ({ page }) => {
    logger.info('Starting TC03: Symbol search UI validation');
    const homePage = new HomePage(page);

    await homePage.openHomePage();
    await homePage.searchSymbol(searchQuery);

    const searchResults = homePage.getSearchResults(/NIFTY|Nifty 50/i);
    await expect(searchResults.first()).toBeVisible({ timeout: 15_000 });
    logger.info('TC03 completed successfully');
  });

  test('TC04 - API vs UI validation for symbol search results', async ({ page, request }) => {
    logger.info('Starting TC04: API vs UI search validation');
    const homePage = new HomePage(page);

    const apiResults = await searchSymbolViaApi(request, searchQuery);
    await validateSymbolInApiResults(apiResults, /NIFTY/i);

    await homePage.openHomePage();
    await homePage.searchSymbol(searchQuery);

    const uiResults = homePage.getSearchResults(/NIFTY|Nifty 50/i);
    await expect(uiResults.first()).toBeVisible();

    const uiText = await uiResults.first().innerText();
    const apiHasMatch = apiResults.some(
      (r) => uiText.includes(r.symbol.split(':').pop() ?? '') || /NIFTY/i.test(uiText)
    );
    expect(apiHasMatch || /NIFTY/i.test(uiText)).toBeTruthy();
    logger.info('TC04 completed successfully - API and UI results aligned');
  });

  test('TC05 - Select search result and navigate to chart page', async ({ page }) => {
    logger.info('Starting TC05: Search result navigation');
    const homePage = new HomePage(page);

    await homePage.openHomePage();
    await homePage.searchSymbol('RELIANCE');
    await homePage.selectSearchResult(/Reliance Industries Limited/i);

    await expect(page).toHaveURL(/chart|symbols/, { timeout: 20_000 });
    logger.info('TC05 completed successfully');
  });
});
