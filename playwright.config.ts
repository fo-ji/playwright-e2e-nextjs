import { PlaywrightTestConfig, devices } from '@playwright/test';
import path from 'path';

// Use process.env.PORT by default and fallback to port 3000
const PORT = process.env.PORT || 3000;

// Set webServer.url and use.baseURL with the location of the WebServer respecting the correct set port
const baseURL = `http://localhost:${PORT}`;

const config: PlaywrightTestConfig = {
  timeout: 5 * 1000,
  testDir: path.join(__dirname, 'e2e'),
  retries: 0,
  webServer: {
    command: 'yarn dev',
    url: baseURL,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  globalSetup: './e2e/config/globalSetup.ts',
  use: {
    baseURL,
    storageState: './e2e/config/storageState.json',
  },
  reporter: [['html', { open: 'never' }]],
  projects: [
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
};

export default config;
