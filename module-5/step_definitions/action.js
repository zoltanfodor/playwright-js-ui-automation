'use strict';

require('chromedriver');
const {Given, When} = require("cucumber");
const {By, until} = require('selenium-webdriver');
const driver = require("../support/hooks");
const EpamCareers = require("../po/pages/epamCareers");
const career = new EpamCareers(driver, "https://www.epam.com/careers");

Given(/^The Epam Career page is opened$/, () => {
    career.navigate();
    career.handleCookie();
});

When(/^Click on (Location filter box|Department filter box|Search button)$/, async element => {
    let selector;

    // todo let buttons = {
    //     "Location filter box": {
    //             selector: ".select2-selection__arrow"
    //     }
    // todo }
    // todo buttons[element];

    switch (element) {
        case "Location filter box":
            selector = ".select2-selection__arrow";
            break;
        case "Department filter box":
            selector = ".job-search__departments";
            break;
        case "Search button":
            selector = ".recruiting-search__submit";
            break;
        default:
            throw new Error(`The ${element} is not implemented`);
    }
    await driver.wait(until.elementLocated(By.css(selector)), constants.waitTimeOut).click();
});

When(/^Click on Apply button of ([^"]+)$/, async positionName => {
    const applyElement = driver.findElement(By.xpath(`.//li[contains(@class,\"search-result__item\")][.//a[contains(@class,\"search-result__item-name\")][contains(text(),\"${positionName}\")]]//a[contains(@class,\"search-result__item-apply\")]`));
    await driver.wait(() => {
        return applyElement.isDisplayed();
    });
    await applyElement.click();
});

When(/^Select `([^"]+)` \/ `([^"]+)`$/, async (countryName, cityName) => {
    const fullSelector = `//li[contains(@class,"select2-results__option dropdown-cities")][@aria-label=\"${countryName}\"]//ul//li[contains(text(), \"${cityName}\")]`;
    const countrySelector = `//li[@aria-label=\"${countryName}\"]`;
    const expandedSelector = "//li[@class='select2-results__option dropdown-cities']//strong";
    const expandedBoxSelector = "//span[contains(@class,'select2-selection select2-selection--single')][contains(@aria-expanded,\"true\")]";
    const expandedDropDown = ".form-component__field.select2-container--open";

    // const fullElement = driver.findElement(By.xpath(fullSelector));
    // const countryElement = driver.findElement(By.xpath(countrySelector));
    const expandedElement = driver.findElement(By.xpath(expandedSelector));
    const expandedElementText = await expandedElement.getText();

    // console.log(`Expanded Element Text: ${expandedElementText}`);
    // console.log(`City Name: ${countryName}`);
    if (expandedElementText !== countryName) {
        // await driver.wait(() => {
        //     return countryElement.isDisplayed();
        // })
        // await driver.wait(until.elementIsEnabled(countryElement), 5000);
        // await driver.wait(until.elementIsVisible(countryElement), 5000).click();
        // await driver.wait(until.elementLocated(By.xpath(expandedBoxSelector)), 5000);
        // await driver.wait(until.elementLocated(By.css(expandedDropDown)), 5000);
        // await driver.wait(async () => {
        //     const value = await driver.findElement(By.css('.select2-container--open .select2-selection__arrow')).getCssValue("transform");
        //     console.log(value);
        //     return value === "rotate(180deg)";
        // });
        await driver.sleep(1000);
        // await driver.wait(() => {
        //     return driver.findElement(By.xpath(countrySelector)).isDisplayed();
        // }, 5000);
        await Elements.findElementWithWait(xpath, countrySelector);
        // await driver.wait(until.elementIsVisible(driver.findElement(By.xpath(countrySelector))), 5000).click();
    }
    try {
        await driver.wait(until.elementIsVisible(driver.findElement(By.xpath(fullSelector))), 5000).click();
    } catch (e) {
        console.log(`The item located ${fullSelector} cannot be clicked!\nError message: ${e.message}`);
    }
});

When(/^I wait (\d+) seconds?$/, async number => {
    await driver.sleep(number * 1000);
});

When(/^Select ([^"]+) element$/, async elementName => {
    const selectedElementSelector = `//span[contains(@class, 'checkbox-custom-label')][contains(text(), '${elementName}')]`;
    const selectedElement = driver.findElement(By.xpath(selectedElementSelector));
    await driver.wait(() => {
        return selectedElement.isDisplayed();
    }, 5000);
    await driver.wait(until.elementLocated(By.xpath(selectedElementSelector)), 5000).click();
});
