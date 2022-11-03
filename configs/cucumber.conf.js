const {Before, BeforeAll, AfterAll, After, setDefaultTimeout, Status} = require('@cucumber/cucumber');
const {chromium} = require('playwright');
const fs = require('fs');
const path = require("path");
const screenshotPath = ('./report/screenshots');
const htmlReportPath = ('./report/cucumber_report.html');

setDefaultTimeout(60000);

// launch the browser
BeforeAll(async function () {
	global.browser = await chromium.launch({
		headless: false,
		slowMo: 1000,
	});
});

// close the browser
AfterAll(async function () {
	await global.browser.close();
});

// Create a new browser context and page per scenario
Before(async function () {
	// Delete screenshots if exist
	if (fs.existsSync(screenshotPath)) {
		fs.readdir(screenshotPath, (err, files) => {
			if (err) throw err;

			files.map(file => {
				fs.rm(path.join(screenshotPath, file), (err) => {
					if (err) throw err;
				});
			})
		});
	}

	// Delete html report if exist
	if (fs.existsSync(htmlReportPath)) {
		fs.rm(htmlReportPath, (err) => {
			if (err) throw err;
		});
	}

	global.context = await global.browser.newContext();
	global.page = await global.context.newPage();
});

// Cleanup after each scenario
After(async function (testCase) {
	if (testCase.result.status === Status.FAILED) {
		await page.screenshot({path: `report/screenshots/${testCase.pickle.name}.png`});
	}

	await global.page.close();
	await global.context.close();
});