const selectors = require('../selectors.json');

class CareerPage {
    constructor(
        url = "https://www.epam.com/careers"
    ) { this.url = url}

    async navigate() {
        await page.goto(this.url);
    }

    async handleCookie() {
        const acceptButton = await page.locator(selectors["Cookie Accept Button"]);
        await acceptButton.click();
    }

    async isCareerPageLoaded() {
        const currentURL = await page.url();
        const headerLogo = await page.locator(selectors["Header Logo"]);
        return currentURL.includes(this.url) && await headerLogo.isVisible();
    }

    async isSearchFormLoaded() {
        const element = await page.locator(selectors["Search Form"]);
        return element.isVisible();
    }

    async isGivenApplyButtonVisible(positionName) {
        const applyElementSelector = `//li[@class=\"search-result__item\"][.//a[@class=\"search-result__item-name\"][contains(text(),\"${positionName}\")]]//a[contains(@class,\"search-result__item-apply\")]`;
        const element = await page.locator(applyElementSelector);
        return element.isVisible();
    }
}

module.exports = CareerPage;