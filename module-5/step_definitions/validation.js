'use strict';
require('chromedriver');
const {Then} = require("cucumber");
const {By, until} = require('selenium-webdriver');
const {driver} = require("../support/hooks");
const {elements} = require("../support/helpers");
const Career = require("../po/pages/epamCareers");


Then(/^The page is opened$/, () => {
    return expect(Career.isCareerPageLoaded()).toBeTruthy();
});

Then(/^The search form is visible$/, async () => {
    const searchFormSelector = '.job-search';
// todo PO pattern, selector kiszervezés
    return expect(elements.findElementWithWait(By.css('.job-search')).isDisplayed()).to.be.true;
});

Then(/^The ([^"]+) should contain ([^"]+)$/, async (elementName, text) => {
    let selector;
    switch (elementName) {
        case "Location filter box":
            selector = ".select2-selection__arrow";
            break;
        case "Job description":
            selector = ".recruiting-page__top-description";
            break;
        default:
            console.log(`The ${element} is not implemented`);
            return 0;
    }
    const elementText = await driver.wait(until.elementLocated(By.css(selector))).getText();

    return expect(elementText).toContain(text);
});

Then(/^The Department filter box should contain "([^"]+)" tile$/, async title => {
    const titleSelector = ".job-search__departments";
    const elementText = await driver.wait(until.elementLocated(By.css(titleSelector)), 5000).getText();

    return expect(elementText).to.be.equal(title);
});

Then(/^The `([^"]+)` position should be visible$/, async positionName => {
    const resultItemSelector = ".search-result__item-name";
    const selectedPositionText = await driver.wait(until.elementLocated(By.css(resultItemSelector)), 5000).getText();

    return expect(positionName).to.be.equal(selectedPositionText);
});

Then(/^The department of the position should be `([^"]+)`$/, async departmentName => {
    const departmentSelector = ".selected-items .filter-tag";
    const selectedDepartmentText = await driver.wait(until.elementIsVisible(driver.findElement(By.css(departmentSelector))), 5000).getText();

    return expect(departmentName).to.be.equal(selectedDepartmentText);
});

Then(/^The location of the position should be `([^"]+)`, `([^"]+)`$/, async (cityName, countryName) => {
    const locationSelector = ".search-result__location";
    const locationText = await driver.wait(until.elementIsVisible(driver.findElement(By.css(locationSelector))), 5000).getText();

    return expect((cityName + ", " + countryName)).to.be.equal(locationText);
});

Then(/^There should be an Apply button for the `([^"]+)` position$/, async positionName => {
    const applyElementSelector = `.//li[contains(@class,\"search-result__item\")][.//a[contains(@class,\"search-result__item-name\")][contains(text(),\"${positionName}\")]]//a[contains(@class,\"search-result__item-apply\")]`;

    return expect(driver.wait(until.elementIsVisible(driver.findElement(By.xpath(applyElementSelector))), 5000).isDisplayed()).to.be.true;
});

Then(/^The job description should contain `([^"]+)` text$/, async cityName => {
    const descriptionElementSelector = ".recruiting-page__top-description";
    const description = await driver.wait(until.elementIsVisible(driver.findElement(By.css(descriptionElementSelector))), 5000).getText();

    return expect(description).toContain(cityName);
});
