import { APIRequestContext, expect } from '@playwright/test';
import { logger } from './logger';

export interface SymbolSearchResult {
  symbol: string;
  description?: string;
}

export async function searchSymbolViaApi(
  request: APIRequestContext,
  query: string
): Promise<SymbolSearchResult[]> {
  const response = await request.get(
    `https://symbol-search.tradingview.com/symbol_search/?text=${encodeURIComponent(query)}&lang=en`,
    {
      headers: {
        Origin: 'https://www.tradingview.com',
        Referer: 'https://www.tradingview.com/',
      },
    }
  );

  expect(response.ok()).toBeTruthy();
  const data = (await response.json()) as Array<{
    symbol: string;
    description: string;
  }>;

  logger.info(`API returned ${data.length} results for query: ${query}`);
  return data.map((item) => ({
    symbol: item.symbol,
    description: item.description,
  }));
}

export async function validateSymbolInApiResults(
  results: SymbolSearchResult[],
  expectedPattern: RegExp
): Promise<void> {
  const match = results.some(
    (r) => expectedPattern.test(r.symbol) || (r.description && expectedPattern.test(r.description))
  );
  expect(match).toBeTruthy();
  logger.info(`API results contain match for pattern: ${expectedPattern}`);
}
