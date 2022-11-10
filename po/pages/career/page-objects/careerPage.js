import * as selectors from '../selectors.json';

exports.CareerPage = class CareerPage {
    constructor(page) {
        this.page = page;
        this.url = 'https://www.epam.com/careers';
    }

    async navigate() {
        await this.page.goto(this.url);
    }

    async handleCookie() {
        const acceptButton = await this.page.locator(selectors['Cookie Accept Button']);
        await acceptButton.click();
    }

    async isCareerPageLoaded() {
        const currentURL = await this.page.url();
        return currentURL.includes(this.url) && await this.page.isVisible(selectors['Filter Container']);
    }

    async isGivenApplyButtonVisible(positionName) {
        const applyElementSelector = `//li[@class=\"search-result__item\"][.//a[@class=\"search-result__item-name\"][contains(text(),\"${positionName}\")]]//a[contains(@class,\"search-result__item-apply\")]`;
        const element = await this.page.locator(applyElementSelector);
        return element.isVisible();
    }

    /**
     * Returns the given position based element contains the given text
     *
     * @param positionName Name of the position
     * @param text The text that should be contained in the element
     */
    async isPositionContainText(positionName, text) {
        const elementText = await this.page.locator(
            `//li[@class="search-result__item"][.//a[@class="search-result__item-name"][contains(text(),"${positionName}")]]//*[@class="search-result__location"]`
        ).textContent();
        return elementText.includes(text);
    }

    async scrollToTheBottom() {
        await this.page.mouse.wheel(0, 15000);
        if (await this.page.locator(selectors["View More Button"]).isVisible()) {
            await this.scrollToTheBottom();
        }
        return 0;
    }
}