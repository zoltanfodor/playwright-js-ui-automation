'use strict'
const {By} = require('selenium-webdriver');
const Elements = require("../../../support/helpers");
const selectors = require("./selectors.json");

class EpamCareers {
    constructor(url) {
        this.url = url;
    }

    navigate() {
        return driver.get(this.url);
    }

    async handleCookie() {
        const cookieElements = await driver.findElements(By.css(selectors["Cookie Accept Button"]));
        if (cookieElements.length) {
            await driver.wait(() => {
                return cookieElements[0].isDisplayed();
            });
            await cookieElements[0].click();
        }
    }

    async isCareerPageLoaded() {
        const currentURL = await driver.getCurrentUrl();
        const element = await Elements.findElementByCss(selectors["Header Logo"]);
        return currentURL.includes(this.url) && await element.isDisplayed();
    }

    async isSearchFormLoaded() {
        const element = await Elements.findElementWithWaitCss(selectors["Search Form"]);
        return element.isDisplayed();
    }

    async clickOnElement(elementName) {
        const element = await Elements.findElementWithWaitCss(selectors[elementName]);
        return element.click();
    }

    async isGivenApplyButtonVisible(positionName) {
        const applyElementSelector = `.//li[contains(@class,\"search-result__item\")][.//a[contains(@class,\"search-result__item-name\")][contains(text(),\"${positionName}\")]]//a[contains(@class,\"search-result__item-apply\")]`;
        const element = await Elements.findElementWithWaitXpath(applyElementSelector);
        return element.isDisplayed();
    }

    async isElementVisibleCss(elementName) {
        const element = await Elements.findElementWithWaitCss(selectors[elementName]);
        return element.isDisplayed();
    }

    async isElementVisibleXpath(elementName) {
        const element = await Elements.findElementWithWaitXpath(selectors[elementName]);
        return element.isDisplayed();
    }

    async findElementByElementName(elementName) {
        const element = await Elements.findElementWithWaitCss(selectors[elementName]);
        return element;
    }

    async selectLocation(countryName, cityName) {
        const fullSelector = `//li[contains(@class,"select2-results__option dropdown-cities")][@aria-label=\"${countryName}\"]//ul//li[contains(text(), \"${cityName}\")]`;
        const countrySelector = `//li[@aria-label=\"${countryName}\"]`;
        const expandedElement = await Elements.findElementWithWaitCss(selectors["Expand Country Button"]);
        const expandedElementText = await expandedElement.getText();
        if (expandedElementText !== countryName) {
            await driver.sleep(1000);
            const countryElement = await Elements.findElementWithWaitXpath(countrySelector);
            await countryElement.click();
            await driver.sleep(1000);
        }
        try {
            const fullElement = await Elements.waitUntilElementIsVisibleXpath(fullSelector);
            await fullElement.click();
        } catch (e) {
            throw new Error(`The item located ${fullSelector} cannot be clicked!\nError message: ${e.message}`);

        }
    }
}

module.exports = EpamCareers;
