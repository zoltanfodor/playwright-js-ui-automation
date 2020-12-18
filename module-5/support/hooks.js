'use strict';
require('chromedriver');
const {BeforeAll, AfterAll, setDefaultTimeout} = require("cucumber");
const {Builder} = require('selenium-webdriver');

let driver;
setDefaultTimeout(30 * 1000);

BeforeAll(async () => {
    driver = new Builder()
        .forBrowser('chrome')
        .build();
    await driver.manage().window().maximize();
    module.exports = driver;
});

AfterAll(() => driver.quit());
