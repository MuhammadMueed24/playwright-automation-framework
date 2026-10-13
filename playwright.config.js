import 'dotenv/config';
import { defineConfig, devices } from '@playwright/test';

const isCI = Boolean(process.env.CI);

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 2 : undefined,

  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },

  reporter: [['list'], ['html', { outputFolder: 'playwright-report', open: 'never' }]],

  outputDir: 'test-results',

  use: {
    baseURL: process.env.BASE_URL || 'https://www.automationexercise.com',
    ...devices['Desktop Chrome'],
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    actionTimeout: 10_000,
    navigationTimeout: 15_000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
