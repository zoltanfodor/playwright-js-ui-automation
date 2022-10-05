'use strict';
require('chromedriver');
const {BeforeAll, AfterAll, setDefaultTimeout} = require("cucumber");
const {Builder} = require('selenium-webdriver');

setDefaultTimeout(30 * 1000);

BeforeAll(async () => {
    global.driver = new Builder()
        .forBrowser('chrome')
        .build();
    await driver.manage().window().maximize();
});

AfterAll(() => driver.quit());
