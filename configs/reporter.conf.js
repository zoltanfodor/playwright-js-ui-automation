const reporter = require('cucumber-html-reporter');

const options = {
	theme: 'bootstrap',
	jsonFile: 'report/cucumber_report.json',
	reportSuiteAsScenarios: true,
	scenarioTimestamp: true,
	launchReport: true,
	output: 'report/cucumber_report.html',
	screenshotsDirectory: 'screenshots/',
	storeScreenshots: true,
	metadata: {
		"Test Environment": "LOCAL",
		"Browser": "Chrome Version 107.0.5304.88",
		"Platform": "Windows 10"
	}
};

reporter.generate(options);