const CareerPage = require('../po/pages/career/page-objects/careerPage');
const CareerFunctions = require('../po/pages/career/business-functions/careerFunctions');
const { Given, When } = require("@cucumber/cucumber");
const careerPage = new CareerPage();
const careerFunctions = new CareerFunctions();

Given(/^The Epam Career page is opened$/, async () => {
    await careerPage.navigate();
    await careerPage.handleCookie();
});

When(/^The "([^"]+)" is clicked$/, async elementName => {
    await careerFunctions.clickOnElement(elementName);
});

When(/^Apply button of "([^"]+)" is clicked$/, async positionName => {
    await careerFunctions.clickOnApplyButton(positionName);
});

When(/^The "([^"]+)" \/ "([^"]+)" is selected$/, async (countryName, cityName) => {
    await careerFunctions.selectLocation(countryName, cityName);
});

When(/^The "([^"]+)" skill is selected$/, async elementName => {
    const selectedElementSelector = `//span[contains(@class, 'checkbox-custom-label')][contains(text(), '${elementName}')]`;
    const selectedElement = await page.locator(selectedElementSelector);
    await selectedElement.click();
});

// When(/^I wait (\d+) seconds?$/, async number => {
//     await page.waitFor(number * 1000);
// });
