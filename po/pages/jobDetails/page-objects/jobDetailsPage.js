const selectors = require('../selectors.json');

class JobDetailsPage {
    constructor(
        url = "https://www.epam.com/careers/job-listings/job"
    ) { this.url = url };

    async isJobDetailsPageLoaded() {
        const currentURL = await page.url();
        const jobDescription = await page.locator(selectors["Job Description"]);
        const isDescriptionVisible = await jobDescription.isVisible();
        // console.log('\n[isDescriptionVisible]: ' + isDescriptionVisible);
        // console.log('\n[includeURL]: ' + currentURL.includes(this.url));

        return (isDescriptionVisible && currentURL.includes(this.url));
    }
}

module.exports = JobDetailsPage;