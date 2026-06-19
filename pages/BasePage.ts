import { Page, Locator } from '@playwright/test';
import { dismissCookieBanner, waitForPageReady } from '../utils/testHelpers';
import { logger } from '../utils/logger';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(path = '/'): Promise<void> {
    logger.info(`Navigating to ${path}`);
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
    await dismissCookieBanner(this.page);
    await waitForPageReady(this.page);
  }

  protected locator(selector: string): Locator {
    return this.page.locator(selector);
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }
}
