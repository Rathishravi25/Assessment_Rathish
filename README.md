# TradingView India - Playwright Automation Assessment

Playwright automation framework for [TradingView India](https://in.tradingview.com/) built with TypeScript, Page Object Model (POM), and Allure reporting.

## Framework Structure

```
├── pages/
│   ├── BasePage.ts
│   ├── HomePage.ts
│   ├── ChartPage.ts
│   └── MarketsPage.ts
├── tests/
│   ├── homepage.spec.ts
│   ├── search.spec.ts
│   ├── chart.spec.ts
│   ├── timeframe.spec.ts
│   ├── markets.spec.ts
│   └── responsive.spec.ts
├── utils/
│   ├── logger.ts
│   ├── testHelpers.ts
│   └── apiHelper.ts
├── playwright.config.ts
├── package.json
└── README.md
```

## Test Scenarios (13 Test Cases)

| ID | Scenario | File |
|----|----------|------|
| TC01 | Homepage loads with core UI elements | homepage.spec.ts |
| TC02 | Homepage navigation links are accessible | homepage.spec.ts |
| TC03 | Symbol search for NIFTY returns results | search.spec.ts |
| TC04 | API vs UI validation for symbol search | search.spec.ts |
| TC05 | Search result navigates to chart page | search.spec.ts |
| TC06 | NIFTY chart canvas loads successfully | chart.spec.ts |
| TC07 | Chart URL contains symbol parameter | chart.spec.ts |
| TC08 | Chart timeframe change (5D) | timeframe.spec.ts |
| TC09 | Multiple timeframe switches (1D, 5D, 1M) | timeframe.spec.ts |
| TC10 | Markets page loads with live data | markets.spec.ts |
| TC11 | Indices section displayed on markets page | markets.spec.ts |
| TC12 | Responsive layout at mobile viewport | responsive.spec.ts |
| TC13 | Dynamic search popup handling | responsive.spec.ts |

## Prerequisites

- Node.js 18+ 
- npm
- Java 8+ (required for Allure report generation)

## Setup

```bash
git clone <repository-url>
cd assessment
npm install
npm run install:browsers
```

## Run Tests (Headless)

```bash
npm test
```

## Run Tests (Headed Mode)

```bash
npm run test:headed
```

## Generate & View Allure Report

```bash
npm run report:generate
npm run report:open
npm run report
```

## View Playwright HTML Report

```bash
npx playwright show-report
```

## Design Decisions

- **POM Pattern**: Each page has reusable locators and methods; tests contain only business flow and assertions.
- **Dynamic Waits**: Uses Playwright auto-waiting (`expect().toBeVisible()`, `toHaveURL()`) — no `waitForTimeout()`.
- **Logging**: Structured console logging via `utils/logger.ts` for traceability during execution.
- **API Validation**: TC04 validates TradingView symbol search API response against UI results.
- **Headless Execution**: Configured in `playwright.config.ts` with screenshot/video on failure.

## Reports Generated After Execution

| Report | Location |
|--------|----------|
| Allure Results | `allure-results/` |
| Allure HTML Report | `allure-report/` |
| Playwright HTML Report | `playwright-report/` |
| Screenshots (on failure) | `test-results/` |

## Technology Stack

- Playwright + TypeScript
- Allure Playwright Reporter
- Page Object Model (POM)
