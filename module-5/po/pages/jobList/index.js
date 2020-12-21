'use strict'
const Elements = require("../../../support/helpers");
const selectors = require("./selectors.json");

class JobDetailed {
    constructor(url) {
        this.url = url;
    }

    async isPageOpened() {
        await Elements.findElementWithWaitCss(selectors["Job Description"]);
        const currentUrl = await driver.getCurrentUrl();
        return currentUrl.includes(this.url);
    }

    async getElementText(elementName) {
        const element = await Elements.findElementWithWaitCss(selectors[elementName]);
        return element.getText();
    }
}

module.exports = JobDetailed;
