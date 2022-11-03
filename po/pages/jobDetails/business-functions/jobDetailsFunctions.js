const selectors = require('../selectors.json');

class JobDetailsFunctions {
	constructor() { }

	/**
	 * Returns if the given element contains the given text
	 *
	 * @param elementName Name of the element
	 * @param text The text that should be contained in the element
	 */
	async isElementContainText(elementName, text) {
		const elementText = await page.locator(selectors[`${elementName}`]).textContent();
		return elementText.includes(text);
	}
}

module.exports = JobDetailsFunctions;
