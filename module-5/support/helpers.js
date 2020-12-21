"use strict";

const {By, until} = require('selenium-webdriver');
const constants = require("../data/constants.json");

class Elements {
    constructor() {
    }

    /**
     * Returns the element of the given Css selector.
     *
     * @param selector
     * @returns {Promise<[]>}
     */
    async findElementWithWaitCss(selector) {
        const element = await driver.wait(until.elementLocated(By.css(selector)), constants.waitTimeOut);
        return element;
    }

    /**
     * Returns the element of the given Xpath selector.
     *
     * @param selector
     * @returns {Promise<[]>}
     */
    async findElementWithWaitXpath(selector) {
        const element = await driver.wait(until.elementLocated(By.xpath(selector)), constants.waitTimeOut);
        return element;
    }

    /**
     * Wait and returns the element of the given Xpath selector.
     *
     * @param selector
     * @returns {Promise<[]>}
     */
    async waitUntilElementIsVisibleXpath(selector) {
        const element = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath(selector))), constants.waitTimeOut);
        return element;
    }

    /**
     * Returns the element of the given selector.
     *
     * @param selector
     * @returns {Promise<[]>}
     */
    async findElementByCss(selector) {
        const element = await driver.findElement(By.css(selector));
        return element;
    }
}

module.exports = new Elements();
