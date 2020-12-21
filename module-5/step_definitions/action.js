'use strict';
require('chromedriver');
const {Given, When, BeforeAll, AfterAll, setDefaultTimeout} = require("cucumber");
const {Builder, By} = require('selenium-webdriver');
const EpamCareers = require("../po/pages/career/index");
const Career = new EpamCareers("https://www.epam.com/careers");
const Element = require("../support/helpers");

setDefaultTimeout(30 * 1000);

BeforeAll(async () => {
    global.driver = new Builder()
        .forBrowser('chrome')
        .build();
    await driver.manage().window().maximize();
});

AfterAll(() => driver.quit());

Given(/^The Epam Career page is opened$/, async () => {
    Career.navigate();
    await Career.handleCookie();
});

When(/^Click on ([^"]+)$/, async elementName => {
    await Career.clickOnElement(elementName);
});

When(/^Apply button of ([^"]+) is clicked$/, async positionName => {
    const applyElement = driver.findElement(By.xpath(`.//li[contains(@class,\"search-result__item\")][.//a[contains(@class,\"search-result__item-name\")][contains(text(),\"${positionName}\")]]//a[contains(@class,\"search-result__item-apply\")]`));
    await driver.wait(() => {
        return applyElement.isDisplayed();
    });
    await applyElement.click();
});

When(/^Select `([^"]+)` \/ `([^"]+)`$/, async (countryName, cityName) => {
    await Career.selectLocation(countryName, cityName);
});

When(/^I wait (\d+) seconds?$/, async number => {
    await driver.sleep(number * 1000);
});

When(/^Select ([^"]+) element$/, async elementName => {
    const selectedElementSelector = `//span[contains(@class, 'checkbox-custom-label')][contains(text(), '${elementName}')]`;
    const selectedElement = await Element.waitUntilElementIsVisibleXpath(selectedElementSelector);
    return selectedElement.click();
});
