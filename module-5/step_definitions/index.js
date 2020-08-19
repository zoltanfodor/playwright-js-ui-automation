'use strict';
require('chromedriver');
const {Given, When, Then, BeforeAll, AfterAll, setDefaultTimeout} = require("cucumber");
const {Builder, By, until} = require('selenium-webdriver');

let driver;
setDefaultTimeout(30 * 1000);

BeforeAll(async () => {
    driver = new Builder()
        .forBrowser('chrome')
        .build();
    await driver.manage().window().maximize();
});

// AfterAll(() => driver.quit());

Given(/^The Epam Career page is opened$/, async () => {
    driver.get('https://www.epam.com/careers');
    const cookieElements = await driver.findElements(By.css('.cookie-disclaimer__button'));
    if (cookieElements.length) {
        await driver.wait(() => {
            return cookieElements[0].isDisplayed();
        });
        await cookieElements[0].click();
    }
});

Then(/^The page is opened$/, async () => {
    const currentURL = await driver.getCurrentUrl();

    return (currentURL.includes("/careers") && driver.findElement(By.css('.header__logo')).isDisplayed());
});

Then(/^The search form is visible$/, async () => {
    const searchFormSelector = '.job-search';

    return driver.wait(until.elementLocated(By.css(searchFormSelector)), 5000).isDisplayed();
});

When(/^Click on (Location filter box|Department filter box|Search button)$/, async element => {
    let selector;
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
            console.log(`The ${element} is not implemented`);
            return 0;
    }
    await driver.wait(until.elementLocated(By.css(selector)), 5000).click();
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
        await driver.wait(until.elementLocated(By.xpath(countrySelector)), 5000).click();
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

    return elementText.includes(text);
});

When(/^Select ([^"]+) element$/, async elementName => {
    const selectedElementSelector = `//span[contains(@class, 'checkbox-custom-label')][contains(text(), '${elementName}')]`;
    const selectedElement = driver.findElement(By.xpath(selectedElementSelector));
    await driver.wait(() => {
        return selectedElement.isDisplayed();
    }, 5000);
    await driver.wait(until.elementLocated(By.xpath(selectedElementSelector)), 5000).click();
});

Then(/^The Department filter box should contain "([^"]+)" tile$/, async title => {
    const titleSelector = ".job-search__departments";
    const elementText = await driver.wait(until.elementLocated(By.css(titleSelector)), 5000).getText();

    return elementText === title;
});

Then(/^The `([^"]+)` position should be visible$/, async positionName => {
    const resultItemSelector = ".search-result__item-name";
    const selectedPositionText = await driver.wait(until.elementLocated(By.css(resultItemSelector)), 5000).getText();

    return positionName === selectedPositionText;
});

Then(/^The department of the position should be `([^"]+)`$/, async departmentName => {
    const departmentSelector = ".selected-items .filter-tag";
    const selectedDepartmentText = await driver.wait(until.elementIsVisible(driver.findElement(By.css(departmentSelector))), 5000).getText();

    return departmentName === selectedDepartmentText;
});

Then(/^The location of the position should be `([^"]+)`, `([^"]+)`$/, async (cityName, countryName) => {
    const locationSelector = ".search-result__location";
    const locationText = await driver.wait(until.elementIsVisible(driver.findElement(By.css(locationSelector))), 5000).getText();

    return (cityName + ", " + countryName) === locationText;
});

Then(/^There should be an Apply button for the `([^"]+)` position$/, async positionName => {
    const applyElementSelector = `.//li[contains(@class,\"search-result__item\")][.//a[contains(@class,\"search-result__item-name\")][contains(text(),\"${positionName}\")]]//a[contains(@class,\"search-result__item-apply\")]`;

    return driver.wait(until.elementIsVisible(driver.findElement(By.xpath(applyElementSelector))), 5000).isDisplayed();
});

Then(/^The job description should contain `([^"]+)` text$/, async cityName => {
    const descriptionElementSelector = ".recruiting-page__top-description";
    const description = await driver.wait(until.elementIsVisible(driver.findElement(By.css(descriptionElementSelector))), 5000).getText();

    return description.includes(cityName);
});
