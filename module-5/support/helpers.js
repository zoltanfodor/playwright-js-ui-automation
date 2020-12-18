"use strict";
const {By, until} = require('selenium-webdriver');
const driver = require("../support/hooks");
const constants = require("../data/constants.json");

class Elements {
    constructor() {
    }

    /**
     * Returns the element of the given selector.
     *
     * @param selectorType
     * @param selector
     * @returns {Promise<[]>}
     */
    async findElementWithWait(selectorType, selector) {
        return driver.wait(until.elementLocated(`By.${selectorType}(${selector})`), constants.waitTimeOut);
    }

    /**
     * Returns the element of the given selector.
     *
     * @param selector
     * @returns {Promise<[]>}
     */
    async findElementByCss(selector) {
        return driver.findElement(By.css(selector));
    }

}

module.exports = new Elements();
