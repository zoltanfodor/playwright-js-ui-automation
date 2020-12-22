'use strict';
require('chromedriver');
const {Given, When} = require("cucumber");
const EpamCareers = require("../po/pages/career/index");
const Career = new EpamCareers("https://www.epam.com/careers");
const Element = require("../support/helpers");

Given(/^The Epam Career page is opened$/, async () => {
    await Career.navigate();
    await Career.handleCookie();
});

When(/^Click on ([^"]+)$/, async elementName => {
    await Career.clickOnElement(elementName);
});

When(/^Apply button of ([^"]+) is clicked$/, async positionName => {
    const applyElement = await Element.findElementWithWaitXpath(`.//li[contains(@class,\"search-result__item\")][.//a[contains(@class,\"search-result__item-name\")][contains(text(),\"${positionName}\")]]//a[contains(@class,\"search-result__item-apply\")]`)
    await applyElement.click();
});

When(/^Select `([^"]+)` \/ `([^"]+)`$/, async (countryName, cityName) => {
    await Career.selectLocation(countryName, cityName);
});

When(/^Select ([^"]+) element$/, async elementName => {
    const selectedElementSelector = `//span[contains(@class, 'checkbox-custom-label')][contains(text(), '${elementName}')]`;
    const selectedElement = await Element.waitUntilElementIsVisibleXpath(selectedElementSelector);
    await selectedElement.click();
});

When(/^I wait (\d+) seconds?$/, async number => {
    await driver.sleep(number * 1000);
});
