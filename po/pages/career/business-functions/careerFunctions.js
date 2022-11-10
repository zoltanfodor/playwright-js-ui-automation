import * as selectors from '../selectors.json';

exports.CareerFunctions = class CareerFunctions {
    constructor(page) {
        this.page = page;
    }

    async clickOnElement(elementName) {
        const element = await this.page.locator(selectors[elementName]);
        return element.click();
    }

    async scrollToTheBottom() {
        await this.page.mouse.wheel(0, 15000);
        if (await this.page.locator(selectors["View More Button"]).isVisible()) {
            return this.scrollToTheBottom();
        }
        return 0;
    }

    async clickOnApplyButton(positionName) {
        const applyButton = await this.page.locator(`//li[contains(@class,\"search-result__item\")][.//a[contains(@class,\"search-result__item-name\")][contains(text(),\"${positionName}\")]]//a[contains(@class,\"search-result__item-apply\")]`)
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
        const expandedElementText = await this.page.locator(selectors["Expand Country Button"]).textContent();
        if (expandedElementText !== countryName) {
            const countryElement = await this.page.locator(countrySelector);
            await countryElement.click();
        }
        try {
            const fullElement = await this.page.locator(fullSelector);
            await fullElement.click();
        } catch (e) {
            throw new Error(`The item located ${fullSelector} cannot be clicked!\nError message: ${e.message}`);
        }
    }

    /**
     * Selects the Skill from the popup
     *
     * @param skillType Name of the skill
     */
    async selectSkill(skillType) {
        const selectedElementSelector = `//span[contains(@class, 'checkbox-custom-label')][contains(text(), '${skillType}')]`;
        const selectedElement = await this.page.locator(selectedElementSelector);
        await selectedElement.click();
    }
}
