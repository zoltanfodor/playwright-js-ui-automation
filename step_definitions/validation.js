const { Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const CareerPage = require('../po/pages/career/page-objects/careerPage');
const CareerFunctions = require('../po/pages/career/business-functions/careerFunctions');
const careerSelectors = require('../po/pages/career/selectors.json');
const JobDetailsPage = require('../po/pages/jobDetails/page-objects/jobDetailsPage');
const JobDetailsFunctions = require('../po/pages/jobDetails/business-functions/jobDetailsFunctions');
const careerPage = new CareerPage();
const careerFunctions = new CareerFunctions();
const jobDetailsPage = new JobDetailsPage();
const jobDetailsFunctions = new JobDetailsFunctions();

Then(/^The page is opened$/, async () => {
    expect(await careerPage.isCareerPageLoaded()).toBe(true);
});

Then(/^The search form is visible$/, async () => {
    expect(await careerPage.isSearchFormLoaded()).toBe(true);
});

Then(/^The "([^"]+)" text should (be|contain) "([^"]+)"$/, async (elementName, type, text) => {
    const elementText = await page.locator(careerSelectors[elementName]);

    switch (type) {
        case 'contain': await expect(elementText).toContainText(text);
        break;
        default: await expect(elementText).toHaveText(text);
    }
});

Then(/^The "([^"]+)" position should be visible$/, async positionName => {
    const element = await page.locator(`//li[@class=\"search-result__item\"][.//a[@class=\"search-result__item-name\"][contains(text(),\"${positionName}\")]]//*[@class="search-result__item-name"]`);
    await careerFunctions.scrollToTheBottom();
    await expect(element).toHaveText(positionName);
});

Then(/^The location of the "([^"]+)" position should contain "([^"]+)", "([^"]+)"$/, async (positionName, cityName, countryName) => {
    const location = await page.locator(`//li[@class=\"search-result__item\"][.//a[@class=\"search-result__item-name\"][contains(text(),\"${positionName}\")]]//*[@class="search-result__location"]`);

    await expect(location).toContainText((cityName + ", " + countryName));
});

Then(/^The Apply button for the "([^"]+)" position should be visible$/, async positionName => {
    expect(await careerPage.isGivenApplyButtonVisible(positionName)).toBe(true);
});

Then(/^The Job Detailed page should be opened$/, async () => {
    expect(await jobDetailsPage.isJobDetailsPageLoaded()).toBe(true);
});

Then(/^The "([^"]+)" should contain "([^"]+)" text$/, async (elementName, text) => {
    expect(await jobDetailsFunctions.isElementContainText(elementName, text)).toBe(true);
});

// Then(/^The Department filter box should contain "([^"]+)" tile$/, async title => {
//     const titleSelector = ".job-search__departments";
//     const elementText = await driver.wait(until.elementLocated(By.css(titleSelector)), 5000).getText();
//
//     expect(elementText).to.be.equal(title);
// });
//