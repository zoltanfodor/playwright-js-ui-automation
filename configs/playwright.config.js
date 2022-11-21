const config = {
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  testDir: '../tests',
  testMatch: [
    '**/tests/*.spec.js'
  ],
  fullyParallel: true,
  reporter: [
    ['list', { outputFolder: '../reports', open: 'never' }],
    ['html', { outputFolder: '../reports', open: 'never' }]
  ],
  use: {
    browserName: 'chromium',
    headless: false,
    actionTimeout: 0,
    viewport: { width: 1366, height: 768 },
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure'
  }
};

module.exports = config;
