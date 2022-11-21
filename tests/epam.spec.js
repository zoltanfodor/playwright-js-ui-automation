import {test, expect} from '@playwright/test';
import { CareerPage } from '../po/pages/career/page-objects/careerPage';
import { CareerFunctions } from '../po/pages/career/business-functions/careerFunctions';
import { JobDetailsPage } from '../po/pages/jobDetails/page-objects/jobDetailsPage';
import { JobDetailsFunctions } from '../po/pages/jobDetails/business-functions/jobDetailsFunctions';
import * as selectors from '../po/pages/career/selectors.json';
import * as testData from './testData.json';
let careerPage;
let careerFunctions;
let jobDetailsPage;
let jobDetailsFunctions;

test.beforeEach(async ({ page }) => {
  careerPage = new CareerPage(page);
  careerFunctions = new CareerFunctions(page);
  jobDetailsPage = new JobDetailsPage(page);
  jobDetailsFunctions = new JobDetailsFunctions(page);

  await careerPage.navigate();
  await careerPage.handleCookie();
  await careerPage.isCareerPageLoaded();
});

test.describe('Epam career\'s page job selection should work', async () => {
  test('First scenario', async ({ page }) => {
    await careerFunctions.clickOnElement('Location Filter Box');
    await careerFunctions.selectLocation(testData.first.country, testData.first.city);
    expect(await page.textContent(selectors['Location Filter Box'])).toBe(testData.first.city);

    await careerFunctions.clickOnElement('Skills Filter Box');
    await careerFunctions.selectSkill(testData.first.skill);
    expect(await page.textContent(selectors['Skills Filter Box Label'])).toBe(testData.first.skillLabel + '1');

    await careerFunctions.clickOnElement('Search Button');
    await careerPage.scrollToTheBottom();
    expect(await careerPage.isPositionContainText(testData.first.position, testData.first.city)).toBe(true);
    expect(await careerPage.isGivenApplyButtonVisible(testData.first.position)).toBe(true);

    await careerFunctions.clickOnApplyButton(testData.first.position);
    expect(await jobDetailsPage.isJobDetailsPageLoaded()).toBe(true);
    expect(await page.textContent(selectors['Job Description'])).toContain(testData.first.position);
  });

  test('Second scenario', async ({ page }) => {
    await careerFunctions.clickOnElement('Location Filter Box');
    await careerFunctions.selectLocation(testData.second.country, testData.second.city);
    expect(await page.textContent(selectors['Location Filter Box'])).toBe(testData.second.city);

    await careerFunctions.clickOnElement('Skills Filter Box');
    await careerFunctions.selectSkill(testData.second.skill);
    expect(await page.textContent(selectors['Skills Filter Box Label'])).toBe(testData.second.skillLabel + '1');

    await careerFunctions.clickOnElement('Search Button');
    await careerPage.scrollToTheBottom();
    expect(await careerPage.isPositionContainText(testData.second.position, testData.second.city)).toBe(true);
    expect(await careerPage.isGivenApplyButtonVisible(testData.second.position)).toBe(true);

    await careerFunctions.clickOnApplyButton(testData.second.position);
    expect(await jobDetailsPage.isJobDetailsPageLoaded()).toBe(true);
    expect(await page.textContent(selectors['Job Description'])).toContain(testData.second.position);
  });
});