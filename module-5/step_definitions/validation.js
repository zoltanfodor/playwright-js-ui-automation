'use strict';
require('chromedriver');
const {Then} = require("cucumber");
const {By, until} = require('selenium-webdriver');
const {expect} = require('chai');
const EpamCareers = require("../po/pages/career/index");
const JobDetailed = require("../po/pages/jobList/index");
const Career = new EpamCareers("https://www.epam.com/careers");
const Detailed = new JobDetailed("/job-listings/job");


Then(/^The page is opened$/, async () => {
    return expect(await Career.isCareerPageLoaded()).to.be.true;
});

Then(/^The search form is visible$/, async () => {
    return expect(await Career.isSearchFormLoaded()).to.be.true;
});

Then(/^The ([^"]+) should contain "([^"]+)"$/, async (elementName, text) => {
    const element = await Career.findElementByElementName(elementName);
    return expect(await element.getText()).to.equal(text);
});

Then(/^The Department filter box should contain "([^"]+)" tile$/, async title => {
    const titleSelector = ".job-search__departments";
    const elementText = await driver.wait(until.elementLocated(By.css(titleSelector)), 5000).getText();

    return expect(elementText).to.be.equal(title);
});

Then(/^The `([^"]+)` position should be visible$/, async positionName => {
    const element = await Career.findElementByElementName("Position Name");
    expect(await element.getText()).to.contain(positionName);
});

Then(/^The department of the position should be `([^"]+)`$/, async departmentName => {
    const selectedDepartment = await Career.findElementByElementName("Selected Department");

    return expect(await selectedDepartment.getText()).to.be.equal(departmentName.toUpperCase());
});

Then(/^The location of the position should be `([^"]+)`, `([^"]+)`$/, async (cityName, countryName) => {
    const location = await Career.findElementByElementName("Position Location");

    return expect((cityName + ", " + countryName + " OR REMOTE").toUpperCase()).to.be.equal(await location.getText());
});

Then(/^There should be an Apply button for the `([^"]+)` position$/, async positionName => {
    return expect(await Career.isGivenApplyButtonVisible(positionName)).to.be.true;
});

Then(/^The "([^"]+)" should contain "([^"]+)" text$/, async (elementName, text) => {
    return expect(await Detailed.getElementText(elementName)).to.contain(text);
});

Then(/^The "Detailed" page should be opened$/, async () => {
    return expect(await Detailed.isPageOpened()).to.be.true;
});

// Then(/^"([^"]+)" page should be opened$/, async pageName => {
//     return expect(await [pageName].isPageOpened()).to.be.true;
// });
