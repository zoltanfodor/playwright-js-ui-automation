const selectors = require('../selectors.json');

class CareerFunctions {
    constructor() { }

    async clickOnElement(elementName) {
        const element = await page.locator(selectors[elementName]);
        return element.click();
    }

    async scrollToTheBottom() {
        page.mouse.wheel(0, 15000);
        if (await page.locator(selectors["View More Button"]).isVisible()) {
            await this.scrollToTheBottom();
        }
        return 0;
    }

    async clickOnApplyButton(positionName) {
        const applyButton = await page.locator(`//li[contains(@class,\"search-result__item\")][.//a[contains(@class,\"search-result__item-name\")][contains(text(),\"${positionName}\")]]//a[contains(@class,\"search-result__item-apply\")]`)
        return applyButton.click();
    }

    /**
     * Selects the Country and City from the dropdown
     *
     * @param countryName Name of the Country
     * @param cityName Name of the City
     */
    async selectLocation(countryName, cityName) {
        const fullSelector = `//li[contains(@class,"select2-results__option dropdown-cities")][@aria-label=\"${countryName}\"]//ul//li[contains(text(), \"${cityName}\")]`;
        const countrySelector = `//li[@aria-label=\"${countryName}\"]`;
        const expandedElementText = await page.locator(selectors["Expand Country Button"]).textContent();
        if (expandedElementText !== countryName) {
            const countryElement = await page.locator(countrySelector);
            await countryElement.click();
        }
        try {
            const fullElement = await page.locator(fullSelector);
            await fullElement.click();
        } catch (e) {
            throw new Error(`The item located ${fullSelector} cannot be clicked!\nError message: ${e.message}`);
        }
    }
}

module.exports = CareerFunctions;
