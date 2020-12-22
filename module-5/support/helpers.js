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
     * @returns {Promise}
     */
    async findElementWithWaitCss(selector) {
        return driver.wait(until.elementLocated(By.css(selector)), constants.waitTimeOut);
    }

    /**
     * Returns the element of the given Xpath selector.
     *
     * @param selector
     * @returns {Promise}
     */
    async findElementWithWaitXpath(selector) {
        return driver.wait(until.elementLocated(By.xpath(selector)), constants.waitTimeOut);
    }

    /**
     * Wait and returns the element of the given Xpath selector.
     *
     * @param selector
     * @returns {Promise}
     */
    async waitUntilElementIsVisibleXpath(selector) {
        return driver.wait(until.elementIsVisible(driver.findElement(By.xpath(selector))), constants.waitTimeOut);
    }

    /**
     * Returns the element of the given selector.
     *
     * @param selector
     * @returns {Promise}
     */
    async findElementByCss(selector) {
        return driver.findElement(By.css(selector));
    }
}

module.exports = new Elements();
