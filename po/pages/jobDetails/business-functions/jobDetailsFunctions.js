import * as selectors from '../selectors.json';

exports.JobDetailsFunctions = class JobDetailsFunctions {
	constructor(page) {
		this.page = page;
	}

	/**
	 * Returns if the given element contains the given text
	 *
	 * @param elementName Name of the element
	 * @param text The text that should be contained in the element
	 */
	async isElementContainText(elementName, text) {
		const elementText = await this.page.locator(selectors[`${elementName}`]).textContent();
		return elementText.includes(text);
	}

	/**
	 * Returns the given position based element contains the given text
	 *
	 * @param positionName Name of the position
	 * @param text The text that should be contained in the element
	 */
	async isPositionContainText(positionName, text) {
		const elementText = await this.page.locator(
			`//li[@class=\"search-result__item\"][.//a[@class=\"search-result__item-name\"][contains(text(),\"${positionName}\")]]//*[@class="search-result__location"]`
		).textContent();
		return elementText.includes(text);
	}
}
